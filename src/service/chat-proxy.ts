// src/service/chat-proxy.ts
// Chat proxy that forwards user chat requests to LM Studio and captures SSE events.

import http from "node:http";

const LM_STUDIO_HOST = "127.0.0.1";
const LM_STUDIO_PORT = 1234;
const LM_STUDIO_V1_URL = `http://${LM_STUDIO_HOST}:${LM_STUDIO_PORT}/api/v1/chat`;

interface ChatRequest {
  model: string;
  messages: Array<{ role: string; content: string }>;
  stream?: boolean;
  [key: string]: any;
}

interface ChatResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: Array<{ index: number; message: { role: string; content: string } }>;
  usage?: { prompt_tokens: number; completion_tokens: number; total_tokens: number };
  stats?: {
    tokens_per_second: number;
    time_to_first_token: number;
    generation_time: number;
    stop_reason: string;
  };
}

let currentPrefillProgress: number | null = null;
let currentGenerateTokens: number = 0;

/**
 * Updates the prefill progress from a prompt_processing.progress event.
 */
export function updatePrefillProgress(progress: number | null): void {
  if (progress === null || progress < 0 || progress > 1) return;
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

  try {
    const response = await fetch(LM_STUDIO_V1_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...chatRequest,
        stream: true,
      }),
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

          if (eventType === "prompt_processing.progress" && data) {
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
            currentPrefillProgress = null;
          } else if (eventType) {
            sendEvent(eventType, JSON.parse(data));
          }
        }
      }
    };

    // Start processing events
    void processEvents();

    // Forward the SSE stream to the client
    const stream = response.body as any;
    stream.on("data", (chunk: Buffer) => {
      const text = decoder.decode(chunk, { stream: true });
      const chunks = text.split(/\r?\n\r?\n/);
      for (const chunkText of chunks) {
        if (chunkText) {
          res.write(chunkText + "\n\n");
        }
      }
    });

    stream.on("end", () => {
      res.end();
    });

    stream.on("error", (error: any) => {
      console.error("[Chat Proxy] Stream error:", error);
      res.end();
    });

  } catch (error) {
    console.error("[Chat Proxy] Error:", error);
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "proxy-failed" }));
  }
}

/**
 * Gets the current prefill progress.
 */
export function getPrefillProgress(): number | null {
  return currentPrefillProgress;
}

/**
 * Gets the current generate tokens.
 */
export function getGenerateTokens(): number {
  return currentGenerateTokens;
}
