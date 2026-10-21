// src/service/chat-proxy.ts
// Chat proxy that forwards user chat requests to LM Studio and captures SSE events.
// Only enabled when the requested model is an LM Studio local model.

import http from "node:http";
import { fetchLmStudioStatus } from './lmstudio.ts';
import { pushLmStudioEvent } from './lm-studio-events.ts';

const LM_STUDIO_HOST = "127.0.0.1";
const LM_STUDIO_PORT = 1234;
const LM_STUDIO_V1_URL = `http://${LM_STUDIO_HOST}:${LM_STUDIO_PORT}/api/v1/chat`;

interface ChatRequest {
  model: string;
  messages: Array<{ role: string; content: string }>;
  stream?: boolean;
  input?: string;
  temperature?: number;
  max_tokens?: number;
  context_length?: number;
  store?: boolean;
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
 * Converts between OpenAI format (client) and LM Studio native format (server).
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
  let lmStudioBody: any = {
    model: chatRequest.model,
    stream: true,
  };

  if (chatRequest.input) {
    lmStudioBody.input = chatRequest.input;
  } else if (Array.isArray(chatRequest.messages) && chatRequest.messages.length > 0) {
    const userMessages = chatRequest.messages.filter((m: any) => m.role === 'user');
    if (userMessages.length > 0) {
      const lastUserMessage = userMessages[userMessages.length - 1];
      lmStudioBody.input = lastUserMessage?.content ?? '';
    } else {
      const lastMessage = chatRequest.messages[chatRequest.messages.length - 1];
      lmStudioBody.input = lastMessage?.content ?? '';
    }
  }

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

    // Set SSE response headers (OpenAI format)
    res.writeHead(200, {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      "Connection": "keep-alive",
    });

    const decoder = new TextDecoder();
    let buffer = "";

    const processEvents = async () => {
      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

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

            if (eventType === "chat.start") {
              currentGenerateTokens = 0;
              currentPrefillProgress = 0;
              console.log("[LM Stat Log] chat_start: generation started");
              pushLmStudioEvent({ type: 'chat-start', prefillProgress: 0, generateTokens: 0 });
            } else if (eventType === "prompt_processing.start" && data) {
              console.log("[LM Stat Log] prompt_processing_start: processing prompt");
            } else if (eventType === "prompt_processing.progress" && data) {
              try {
                const parsed = JSON.parse(data) as { progress?: number };
                if (typeof parsed.progress === "number") {
                  updatePrefillProgress(parsed.progress);
                  // Log prefill progress for monitoring
                  console.log(`[LM Stat Log] prefill_progress: ${Math.round(parsed.progress * 100)}%`);
                  pushLmStudioEvent({ type: 'prefill-progress', prefillProgress: Math.round(parsed.progress * 100) });
                }
              } catch {}
            } else if (eventType === "message.delta" && data) {
              currentGenerateTokens += 1;
              try {
                const parsed = JSON.parse(data) as { content?: string };
                if (parsed.content) {
                  // Convert to OpenAI format
                  res.write(`data: ${JSON.stringify({ choices: [{ delta: { content: parsed.content } }] })}\n\n`);
                  // Log current generate token count
                  console.log(`[LM Stat Log] generate_tokens: ${currentGenerateTokens}`);
                  pushLmStudioEvent({ type: 'generate-tokens', generateTokens: currentGenerateTokens });
                }
              } catch {}
            } else if (eventType === "reasoning.delta" && data) {
              try {
                const parsed = JSON.parse(data) as { content?: string };
                if (parsed.content) {
                  // Convert to OpenAI format
                  res.write(`data: ${JSON.stringify({ choices: [{ delta: { reasoning_content: parsed.content } }] })}\n\n`);
                }
              } catch {}
            } else if (eventType === "chat.end" && data) {
              try {
                const parsed = JSON.parse(data) as { result?: { stats?: { total_output_tokens?: number } } };
                if (parsed.result?.stats?.total_output_tokens !== undefined) {
                  updateGenerateTokens(parsed.result.stats.total_output_tokens);
                  console.log(`[LM Stat Log] chat_end: total_output_tokens=${parsed.result.stats.total_output_tokens}`);
                  pushLmStudioEvent({ type: 'chat-end', generateTokens: parsed.result.stats.total_output_tokens });
                } else {
                  console.log(`[LM Stat Log] chat_end: total_output_tokens=unknown`);
                  pushLmStudioEvent({ type: 'chat-end', generateTokens: currentGenerateTokens });
                }
                // Send final chunk with finish_reason
                res.write(`data: ${JSON.stringify({ choices: [{ delta: {}, finish_reason: "stop" }] })}\n\n`);
                res.write(`data: [DONE]\n\n`);
              } catch {}
            } else if (eventType === "prompt_processing.end") {
              currentPrefillProgress = 0;
              console.log("[LM Stat Log] prompt_processing_end: prefill completed");
            } else if (eventType === "chat.end") {
              currentPrefillProgress = 0;
            }
          }
        }
      } catch (error) {
        console.error("[Chat Proxy] Stream error:", error);
      } finally {
        res.end();
      }
    };

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