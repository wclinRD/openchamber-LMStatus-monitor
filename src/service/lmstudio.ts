// Queries LM Studio's REST API for model load state and inference stats.
// LM Studio exposes models via GET /api/v0/models at http://localhost:1234.
// Models have a "state" field: "loaded", "not-loaded", or "loading".
// Inference stats (prefill progress, token counts) come from streaming events
// via POST /api/v1/chat with stream: true (Server-Sent Events).

const LM_STUDIO_HOST = '127.0.0.1';
const LM_STUDIO_PORT = 1234;
const LM_STUDIO_URL = `http://${LM_STUDIO_HOST}:${LM_STUDIO_PORT}`;
const LM_STUDIO_V1_URL = `${LM_STUDIO_URL}/api/v1/chat`;

export type LmModelState = 'loaded' | 'unloaded' | 'loading' | 'error';

export interface LmModelInfo {
  id: string;
  state: 'loaded' | 'not-loaded' | 'loading';
  type: string;
  max_context_length?: number;
}

export interface LmStudioStatus {
  modelName: string | null;
  state: LmModelState;
  prefillProgress: number;
  generateTokens: number;
}

let currentStatus: LmStudioStatus = {
  modelName: null,
  state: 'unloaded',
  prefillProgress: 0,
  generateTokens: 0,
};

/**
 * Updates the current status from a chat/completion API response.
 * The response includes `usage` (prompt_tokens, completion_tokens).
 * Note: Prefill progress and generate tokens are now handled by chat-proxy.ts
 * for actual user chat requests, not by this file's SSE listener.
 */
export function updateFromUsage(usage: { prompt_tokens?: number; completion_tokens?: number } | null): void {
  if (!usage) return;
  currentStatus.generateTokens = Math.max(0, usage.completion_tokens ?? 0);
}

/**
 * Fetches the current model list and determines the active/loaded model state.
 * Returns the latest LmStudioStatus.
 */
export async function fetchLmStudioStatus(): Promise<LmStudioStatus> {
  try {
    const response = await fetch(`${LM_STUDIO_URL}/api/v0/models`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      currentStatus.state = 'error';
      return { ...currentStatus };
    }

    const data = await response.json() as { data?: LmModelInfo[] };
    const models = data.data ?? [];

    // Find the loaded model (state === 'loaded')
    const loadedModel = models.find((m) => m.state === 'loaded');
    if (loadedModel) {
      currentStatus.modelName = loadedModel.id;
      currentStatus.state = 'loaded';
    } else {
      // Check for loading model
      const loadingModel = models.find((m) => m.state === 'loading');
      if (loadingModel) {
        currentStatus.modelName = loadingModel.id;
        currentStatus.state = 'loading';
      } else {
        // No loaded model; pick the most recently used or first available
        const notLoaded = models.find((m) => m.state === 'not-loaded');
        currentStatus.modelName = notLoaded?.id ?? null;
        currentStatus.state = 'unloaded';
      }
    }

    return { ...currentStatus };
  } catch {
    currentStatus.state = 'error';
    return { ...currentStatus };
  }
}

/**
 * Determines the display state string in Traditional Chinese.
 */
export function stateLabel(state: LmModelState): string {
  switch (state) {
    case 'loaded':
      return '掛載';
    case 'unloaded':
      return '卸載';
    case 'loading':
      return '載入中';
    case 'error':
      return '錯誤';
    default:
      return '未知';
  }
}

/**
 * Formats the prefill progress for display.
 */
export function formatPrefillProgress(progress: number): string {
  return `${progress}%`;
}

/**
 * Formats the generate token count for display.
 */
export function formatGenerateTokens(tokens: number): string {
  if (tokens === 0) return '0';
  return tokens.toLocaleString();
}
