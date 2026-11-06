// src/service/chat-proxy.ts
// Chat proxy that forwards user chat requests to LM Studio and captures SSE events.
// Only enabled when the requested model is an LM Studio local model.

import http from "node:http";
import { randomUUID } from "node:crypto";
import { fetchLmStudioStatus } from './lmstudio.ts';
import { pushLmStudioEvent } from './lm-studio-events.ts';
import { updateFromProxy, updateGenerateOnlyFromProxy, updatePrefillOnlyFromProxy, updateLogPrefillOnly, updateLogGenerateOnly, resetLmStudioRunState, setChatStartAt, getLmStudioRunState, getLmStudioRunStatePlain } from './lm-studio-state.ts';
import type { LmStudioRunState } from './lm-studio-state.ts';

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

interface ActiveRequest {
  id: string;
  model?: string | null;
  modelDisplayName?: string | null;
  state: 'prefill' | 'generate' | 'idle';
  prefillProgress: number;
  generateTokens: number;
  tokensPerSecond: number;
  prefillTokensPerSecond: number;
  startedAt: number;
  lastGenAt: number;
  lastGenTokens: number;
  genStartAt: number;
}

const activeRequests = new Map<string, ActiveRequest>();

export function getActiveRequests() {
  const arr: any[] = [];
  for (const req of activeRequests.values()) {
    arr.push({
      id: req.id,
      model: req.model,
      modelDisplayName: req.modelDisplayName,
      state: req.state,
      prefillProgress: req.prefillProgress,
      generateTokens: req.generateTokens,
      tokensPerSecond: req.tokensPerSecond > 0 ? req.tokensPerSecond : undefined,
      prefillTokensPerSecond: req.prefillTokensPerSecond > 0 ? req.prefillTokensPerSecond : undefined,
      startedAt: req.startedAt,
    });
  }
  return arr;
}

export function getActiveRequestCount() {
  return activeRequests.size;
}

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

    const matchedModel = models.find((m) => m.id === modelId || m.id.endsWith(modelId) || modelId.endsWith(m.id) || m.id.includes(modelId) || modelId.includes(m.id));
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
  // Keep one decimal place of precision so the UI shows smooth increments (e.g. 99.9%)
  // rather than rounding to 100% early.
  updatePrefillOnlyFromProxy(Math.round(progress * 1000) / 10);
}

/**
 * Updates generate tokens from chat.end event stats.
 */
export function updateGenerateTokens(totalOutputTokens: number | null): void {
  if (totalOutputTokens === null || totalOutputTokens < 0) return;
  updateGenerateOnlyFromProxy(Math.max(0, totalOutputTokens));
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
  const reqId = randomUUID();
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
  const lmStatusForModel = await (async () => {
    try {
      const { fetchLmStudioStatus } = await import('./lmstudio.ts');
      const s = await fetchLmStudioStatus();
      return s;
    } catch {
      return null;
    }
  })();
  const isLmStudio = await isLmStudioModel(chatRequest.model);
  if (!isLmStudio) {
    res.writeHead(400, { "Content-Type": "application/json" });
    res.end(JSON.stringify({
      error: "not-lm-studio-model",
      message: "Chat proxy only supports LM Studio local models. Cloud LLM requests are not proxied."
    }));
    return;
  }

  const now = Date.now();
  activeRequests.set(reqId, {
    id: reqId,
    model: chatRequest.model,
    modelDisplayName: lmStatusForModel?.models?.find((m: any) => m.id === chatRequest.model)?.displayName || chatRequest.model,
    state: 'prefill',
    prefillProgress: 0,
    generateTokens: 0,
    tokensPerSecond: 0,
    prefillTokensPerSecond: 0,
    startedAt: now,
    lastGenAt: now,
    lastGenTokens: 0,
    genStartAt: now,
  });

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
        let currentGenerateTokens = 0;
        let lastGenerateTokens = 0;
        let lastGenerateAt = 0;
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
              const ar = activeRequests.get(reqId);
              if (ar) {
                ar.state = 'prefill';
                ar.prefillProgress = 0;
                ar.generateTokens = 0;
                ar.genStartAt = Date.now();
                ar.lastGenAt = Date.now();
                ar.lastGenTokens = 0;
                ar.tokensPerSecond = 0;
              }
              console.log("[LM Stat Log] chat_start: generation started");
              pushLmStudioEvent({ type: 'chat-start', prefillProgress: 0, generateTokens: 0 });
            } else if (eventType === "prompt_processing.start" && data) {
              console.log("[LM Stat Log] prompt_processing_start: processing prompt");
            } else if (eventType === "prompt_processing.progress" && data) {
              try {
                const parsed = JSON.parse(data) as { progress?: number };
                if (typeof parsed.progress === "number") {
                  const pp = Math.round(parsed.progress * 1000) / 10;
                  // Use log-state update to avoid SSE proxy's timestamp overtaking the log parser's progress.
                  updateLogPrefillOnly(pp);
                  const ar = activeRequests.get(reqId);
                  if (ar) {
                    ar.state = 'prefill';
                    ar.prefillProgress = pp;
                  }
                  // Log prefill progress for monitoring
                  console.log(`[LM Stat Log] prefill_progress: ${pp}%`);
                  pushLmStudioEvent({ type: 'prefill-progress', prefillProgress: pp });
                }
              } catch {}
            } else if (eventType === "message.delta" && data) {
              const now = Date.now();
              currentGenerateTokens += 1;
              let instantTps: number | undefined = undefined;
              if (lastGenerateAt > 0) {
                const deltaTime = (now - lastGenerateAt) / 1000;
                const deltaTokens = currentGenerateTokens - lastGenerateTokens;
                if (deltaTime > 0 && deltaTokens > 0) {
                  instantTps = deltaTokens / deltaTime;
                }
              }
              lastGenerateTokens = currentGenerateTokens;
              lastGenerateAt = now;
              updateGenerateOnlyFromProxy(currentGenerateTokens, instantTps);
              const ar = activeRequests.get(reqId);
              if (ar) {
                // In multi-thread/concurrent inference, a model may still be prefilling while generating new tokens.
                // Keep prefillProgress from the latest prompt_processing.progress and do not set it to 100 here.
                ar.state = 'generate';
                ar.generateTokens = currentGenerateTokens;
                ar.tokensPerSecond = instantTps ?? 0;
                ar.lastGenTokens = currentGenerateTokens;
                ar.lastGenAt = now;
              }
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
                let finalTokens = currentGenerateTokens;
                if (parsed.result?.stats?.total_output_tokens !== undefined) {
                  finalTokens = parsed.result.stats.total_output_tokens;
                  updateGenerateOnlyFromProxy(finalTokens);
                  console.log(`[LM Stat Log] chat_end: total_output_tokens=${finalTokens}`);
                } else {
                  updateGenerateOnlyFromProxy(currentGenerateTokens);
                  console.log(`[LM Stat Log] chat_end: total_output_tokens=unknown`);
                }
                const state = getLmStudioRunStatePlain();
                const ar = activeRequests.get(reqId);
                if (ar) {
                  ar.state = 'generate';
                  ar.generateTokens = finalTokens;
                  ar.tokensPerSecond = state.tokensPerSecond ?? 0;
                }
                pushLmStudioEvent({ type: 'chat-end', generateTokens: finalTokens });
                // Send final chunk with finish_reason
                res.write(`data: ${JSON.stringify({ choices: [{ delta: {}, finish_reason: "stop" }] })}\n\n`);
                res.write(`data: [DONE]\n\n`);
                setTimeout(() => {
                  activeRequests.delete(reqId);
                  if (activeRequests.size === 0) {
                    resetLmStudioRunState();
                    setChatStartAt();
                  }
                }, 2000);
              } catch {
                activeRequests.delete(reqId);
                if (activeRequests.size === 0) {
                  resetLmStudioRunState();
                  setChatStartAt();
                }
              }
            } else if (eventType === "prompt_processing.end") {
              const ar = activeRequests.get(reqId);
              if (ar) {
                ar.prefillProgress = 100;
                ar.state = 'generate';
              }
              console.log("[LM Stat Log] prompt_processing_end: prefill completed");
            } else if (eventType === "chat.end") {
              const ar = activeRequests.get(reqId);
              if (ar) {
                // Don't force prefillProgress to 100 here; keep it from prompt_processing.end or log parser.
                ar.state = 'generate';
              }
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
    activeRequests.delete(reqId);
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "proxy-failed" }));
  }
}

/**
 * Gets the current prefill progress.
 */
export function getPrefillProgress(): number {
  return getLmStudioRunState().prefillProgress;
}

/**
 * Gets the current generate tokens.
 */
export function getGenerateTokens(): number {
  return getLmStudioRunState().generateTokens;
}

/**
 * Gets tokens per second for current generation.
 */
export function getTokensPerSecond(): number {
  return getLmStudioRunState().tokensPerSecond ?? 0;
}

/**
 * Aggregates per-request states from the activeRequests Map into a unified state.
 * Used when concurrent inference is enabled to avoid global state overwriting.
 */
export function getAggregateRunStateFromActiveRequests(): LmStudioRunState {
  const arr = getActiveRequests();
  if (arr.length === 0) {
    return getLmStudioRunState();
  }
  let maxPrefill = 0;
  let sumGenerate = 0;
  let sumTps = 0;
  let maxPrefillTps = 0;
  let state: 'idle' | 'prefill' | 'generate' = 'idle';
  let chatStartAt = 0;
  let lastUpdateAt = 0;
  for (const r of arr) {
    if (r.state === 'prefill') {
      if (r.prefillProgress > maxPrefill) maxPrefill = r.prefillProgress;
      if (r.prefillTokensPerSecond && r.prefillTokensPerSecond > 0) {
        if (r.prefillTokensPerSecond > maxPrefillTps) maxPrefillTps = r.prefillTokensPerSecond;
      }
    } else if (r.state === 'generate') {
      sumGenerate += r.generateTokens;
      if (r.tokensPerSecond && r.tokensPerSecond > 0) sumTps += r.tokensPerSecond;
      if (r.lastGenAt && r.lastGenAt > lastUpdateAt) lastUpdateAt = r.lastGenAt;
      state = 'generate';
    } else if (r.state === 'idle' && state !== 'generate') {
      if (r.lastGenAt && r.lastGenAt > lastUpdateAt) lastUpdateAt = r.lastGenAt;
    }
    if (r.startedAt && r.startedAt > chatStartAt) chatStartAt = r.startedAt;
  }
  // Use global state's prefill progress if any request is in prefill phase,
  // because the log parser continuously updates the global state for concurrent requests.
  const globalState = getLmStudioRunState();
  const hasPrefill = arr.some(r => r.state === 'prefill');
  const finalPrefillProgress = hasPrefill ? Math.max(maxPrefill, globalState.prefillProgress) : maxPrefill;
  const finalPrefillTps = hasPrefill ? (globalState.prefillTokensPerSecond ?? maxPrefillTps) : maxPrefillTps;
  return {
    state,
    prefillProgress: finalPrefillProgress,
    generateTokens: sumGenerate,
    tokensPerSecond: sumTps > 0 ? sumTps : undefined,
    prefillTokensPerSecond: finalPrefillTps > 0 ? finalPrefillTps : undefined,
    lastUpdateAt,
    chatStartAt,
    prefillSource: hasPrefill ? globalState.prefillSource : 'proxy',
    generateSource: 'proxy',
    tpsSource: sumTps > 0 ? 'proxy' : undefined,
    prefillTpsSource: finalPrefillTps > 0 ? globalState.prefillTpsSource ?? 'proxy' : undefined,
  };
}
