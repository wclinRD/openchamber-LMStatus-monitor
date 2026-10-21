// Queries LM Studio's REST API for model load state and inference stats.
// LM Studio exposes models via GET /api/v0/models at http://localhost:1234.
// Models have a "state" field: "loaded", "not-loaded", or "loading".
// Inference stats (prefill progress, token counts) come from streaming events
// or the usage/stats fields in chat/completion responses.

const LM_STUDIO_HOST = '127.0.0.1';
const LM_STUDIO_PORT = 1234;
const LM_STUDIO_URL = `http://${LM_STUDIO_HOST}:${LM_STUDIO_PORT}`;

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
  prefillProgress: number | null;
  generateTokens: number;
}

let currentStatus: LmStudioStatus = {
  modelName: null,
  state: 'unloaded',
  prefillProgress: null,
  generateTokens: 0,
};

/**
 * Updates the current status from a chat/completion API response.
 * The response includes `usage` (prompt_tokens, completion_tokens) and
 * streaming events include `prompt_processing.progress`.
 */
export function updateFromUsage(usage: { prompt_tokens?: number; completion_tokens?: number } | null): void {
  if (!usage) return;
  currentStatus.generateTokens = Math.max(0, usage.completion_tokens ?? 0);
}

/**
 * Updates the prefill progress from a prompt_processing.progress event.
 * Progress is a float between 0 and 1; we convert to percentage (0-100).
 */
export function updatePrefillProgress(progress: number | null): void {
  if (progress === null || progress < 0 || progress > 1) return;
  currentStatus.prefillProgress = Math.round(progress * 100);
}

/**
 * Resets prefill progress when a new generation starts or completes.
 */
export function resetPrefill(): void {
  currentStatus.prefillProgress = null;
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
export function formatPrefillProgress(progress: number | null): string {
  if (progress === null) return '—';
  return `${progress}%`;
}

/**
 * Formats the generate token count for display.
 */
export function formatGenerateTokens(tokens: number): string {
  if (tokens === 0) return '0';
  return tokens.toLocaleString();
}
