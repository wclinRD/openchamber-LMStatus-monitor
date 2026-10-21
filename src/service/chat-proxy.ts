// src/service/chat-proxy.ts
// Chat proxy that forwards user chat requests to LM Studio and captures SSE events.
// Only enabled when the requested model is an LM Studio local model.

import http from "node:http";
import { fetchLmStudioStatus } from './lmstudio.ts';

const LM_STUDIO_HOST = "127.0.0.1";
const LM_STUDIO_PORT = 1234;
const LM_STUDIO_V1_URL = `http://${LM_STUDIO_HOST}:${LM_STUDIO_PORT}/api/v1/chat`;

interface ChatRequest {
  model: string;
  messages: Array<{ role: string; content: string }>;
  stream?: boolean;
  [key: string]: any;
}

interface LmModelInfo {
  id: string;
  state: 'loaded' | 'not-loaded' | 'loading';
  type: string;
  max_context_length?: number;
}

let currentPrefillProgress: number = 0;
let currentGenerateTokens: number = 0;

/**
 * Checks if the requested model is an LM Studio local model that is currently loaded.
 */
async function isLmStudioModel(modelId: string): Promise<boolean> {
  try {
    const response = await fetch(`http://${LM_STUDIO_HOST}:${LM_STUDIO_PORT}/api/v0/models`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) return false;

    const data = await response.json() as { data?: LmModelInfo[] };
    const models = data.data ?? [];

    // Check if the model exists and is loaded
    const matchedModel = models.find((m) => m.id === modelId || m.id.endsWith(modelId));
    return matchedModel !== undefined && matchedModel.state === 'loaded';
  } catch {
    return false;
  }
}

/**
 * Updates the prefill progress from a prompt_processing.progress event.
 */
export function updatePrefillProgress(progress: number): void {
  if (progress < 0 || progress > 1) return;
  currentPrefillProgress = Math.round(progress * 100);
}

/**
 * Updates generate tokens from chat.end event stats.
 */
export function updateGenerateTokens(totalOutputTokens: number | null): void {
  if (totalOutputTokens === null || totalOutputTokens < 0) return;
  currentGenerateTokens = Math.max(0, totalOutputTokens);
}

/**
 * Forwards a chat request to LM Studio and streams the SSE response back to the client.
 * This allows the monitoring service to capture real-time inference stats.
 */
export async function proxyChatRequest(
  req: http.IncomingMessage,
  res: http.ServerResponse,
  body: string
): Promise<void> {
  let chatRequest: ChatRequest;
  try {
    chatRequest = JSON.parse(body) as ChatRequest;
  } catch {
    res.writeHead(400, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "bad-request" }));
    return;
  }

  if (!chatRequest.model || !Array.isArray(chatRequest.messages)) {
    res.writeHead(400, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "invalid-request" }));
    return;
  }

  // Only proxy chat requests for LM Studio local models
  const isLmStudio = await isLmStudioModel(chatRequest.model);
  if (!isLmStudio) {
    res.writeHead(400, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ 
      error: "not-lm-studio-model",
      message: "Chat proxy only supports LM Studio local models. Cloud LLM requests are not proxied."
    }));
    return;
  }

  // Convert OpenAI-compatible format (messages) to LM Studio native format (input)
  // LM Studio's /api/v1/chat endpoint requires 'input' instead of 'messages'
  // and does not support including assistant messages
  let lmStudioBody: any = {
    model: chatRequest.model,
    stream: true,
  };

  if (chatRequest.input) {
    // Already in LM Studio native format
    lmStudioBody.input = chatRequest.input;
  } else if (Array.isArray(chatRequest.messages) && chatRequest.messages.length > 0) {
    // Convert OpenAI messages to LM Studio input format
    // Extract the last user message as input (LM Studio manages conversation history)
    const userMessages = chatRequest.messages.filter((m: any) => m.role === 'user');
    if (userMessages.length > 0) {
      const lastUserMessage = userMessages[userMessages.length - 1];
      lmStudioBody.input = lastUserMessage?.content ?? '';
    } else {
      // No user messages, use the last message content
      const lastMessage = chatRequest.messages[chatRequest.messages.length - 1];
      lmStudioBody.input = lastMessage?.content ?? '';
    }
  }

  // Forward additional parameters if present
  if (chatRequest.temperature !== undefined) lmStudioBody.temperature = chatRequest.temperature;
  if (chatRequest.max_tokens !== undefined) lmStudioBody.max_tokens = chatRequest.max_tokens;
  if (chatRequest.context_length !== undefined) lmStudioBody.context_length = chatRequest.context_length;
  if (chatRequest.store !== undefined) lmStudioBody.store = chatRequest.store;

  try {
    const response = await fetch(LM_STUDIO_V1_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(lmStudioBody),
    });

    if (!response.ok) {
      res.writeHead(response.status, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "lm-studio-error", status: response.status }));
      return;
    }

    const reader = response.body?.getReader();
    if (!reader) {
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "no-stream" }));
      return;
    }

    // Set SSE response headers
    res.writeHead(200, {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      "Connection": "keep-alive",
    });

    const decoder = new TextDecoder();
    let buffer = "";

    const sendEvent = (eventType: string, data: any) => {
      res.write(`event: ${eventType}\n`);
      res.write(`data: ${JSON.stringify(data)}\n\n`);
    };

    const processEvents = async () => {
      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          // Forward raw chunk to client
          if (value) {
            res.write(value);
          }

          buffer += decoder.decode(value, { stream: true });
          const events = buffer.split(/\r?\n\r?\n/);
          buffer = events.pop() ?? "";

          for (const event of events) {
            if (!event.startsWith("event: ") || !event.includes("data: ")) continue;

            const lines = event.split(/\r?\n/);
            let eventType = "";
            let data = "";

            for (const line of lines) {
              if (line.startsWith("event: ")) eventType = line.slice(7).trim();
              if (line.startsWith("data: ")) data = line.slice(6).trim();
            }

            if (eventType === "chat.start" && data) {
              // Reset stats for new chat
              currentGenerateTokens = 0;
              currentPrefillProgress = 0;
            } else if (eventType === "prompt_processing.progress" && data) {
              try {
                const parsed = JSON.parse(data) as { progress?: number };
                if (typeof parsed.progress === "number") {
                  updatePrefillProgress(parsed.progress);
                  sendEvent("prefill.progress", { progress: parsed.progress });
                }
              } catch {}
            } else if (eventType === "chat.end" && data) {
              try {
                const parsed = JSON.parse(data) as { result?: { stats?: { total_output_tokens?: number } } };
                if (parsed.result?.stats?.total_output_tokens !== undefined) {
                  updateGenerateTokens(parsed.result.stats.total_output_tokens);
                }
                sendEvent("chat.end", parsed);
              } catch {}
            } else if (eventType === "prompt_processing.end" || eventType === "chat.end") {
              currentPrefillProgress = 0;
            } else if (eventType) {
              try {
                sendEvent(eventType, JSON.parse(data));
              } catch {}
            }
          }
        }
      } catch (error) {
        console.error("[Chat Proxy] Stream error:", error);
      } finally {
        res.end();
      }
    };

    // Start processing events (handles both capture and forwarding)
    void processEvents();

  } catch (error) {
    console.error("[Chat Proxy] Error:", error);
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "proxy-failed" }));
  }
}

/**
 * Gets the current prefill progress.
 */
export function getPrefillProgress(): number {
  return currentPrefillProgress;
}

/**
 * Gets the current generate tokens.
 */
export function getGenerateTokens(): number {
  return currentGenerateTokens;
}
