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
  type?: string;
  publisher?: string;
  arch?: string;
  compatibility_type?: string;
  quantization?: string | { name?: string; bits_per_weight?: number };
  max_context_length?: number;
  loaded_context_length?: number;
  capabilities?: string[] | Record<string, boolean>;
  display_name?: string;
  key?: string;
  params_string?: string;
  size_bytes?: number;
  format?: string;
  loaded_instances?: Array<{ id?: string; config?: { contextLength?: number } }>;
}

export interface LmStudioStatus {
  modelName: string | null;
  state: LmModelState;
  prefillProgress: number;
  generateTokens: number;
  models?: Array<{
    id: string;
    state: 'loaded' | 'not-loaded' | 'loading';
    type?: string;
    publisher?: string;
    arch?: string;
    compatibilityType?: string;
    quantization?: string;
    maxContextLength?: number;
    loadedContextLength?: number;
    capabilities?: string[] | Record<string, boolean>;
    displayName?: string;
    paramsString?: string;
    sizeBytes?: number;
    bitsPerWeight?: number;
    format?: string;
    loadedInstances?: Array<{ id?: string; config?: { contextLength?: number } }>;
  }>;
}

let currentStatus: LmStudioStatus = {
  modelName: null,
  state: 'unloaded',
  prefillProgress: 0,
  generateTokens: 0,
  models: [],
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
    const [v0Response, v1Response] = await Promise.all([
      fetch(`${LM_STUDIO_URL}/api/v0/models`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      }),
      fetch(`${LM_STUDIO_URL}/api/v1/models`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      }).catch(() => null),
    ]);

    if (!v0Response.ok) {
      currentStatus.state = 'error';
      return { ...currentStatus };
    }

    const data = await v0Response.json() as { data?: LmModelInfo[] };
    const models = data.data ?? [];

    let v1Models: LmModelInfo[] = [];
    if (v1Response && v1Response.ok) {
      try {
        const v1Data = await v1Response.json() as { models?: LmModelInfo[] };
        v1Models = v1Data.models ?? [];
      } catch {
        v1Models = [];
      }
    }

    const v1Map = new Map<string, LmModelInfo>();
    for (const m of v1Models) {
      const key = m.key ?? m.id;
      if (key) v1Map.set(key, m);
    }

    currentStatus.models = models.map((m) => {
      const v1 = v1Map.get(m.id) ?? v1Map.get(m.key ?? m.id);
      const quant = typeof m.quantization === 'object' && m.quantization ? m.quantization.name : (typeof m.quantization === 'string' ? m.quantization : undefined);
      const v1Quant = v1 && typeof v1.quantization === 'object' && v1.quantization ? v1.quantization.name : (typeof v1?.quantization === 'string' ? v1.quantization : undefined);
      const bits = typeof m.quantization === 'object' && m.quantization ? m.quantization.bits_per_weight : (typeof v1?.quantization === 'object' && v1.quantization ? v1.quantization.bits_per_weight : undefined);
      return {
        id: m.id,
        state: m.state,
        type: m.type ?? v1?.type,
        publisher: m.publisher ?? v1?.publisher,
        arch: m.arch ?? v1?.arch ?? v1?.architecture,
        compatibilityType: m.compatibility_type ?? v1?.compatibility_type ?? v1?.format,
        quantization: v1Quant ?? quant,
        maxContextLength: m.max_context_length ?? v1?.max_context_length,
        loadedContextLength: m.loaded_context_length ?? v1?.loaded_context_length,
        capabilities: v1?.capabilities ?? m.capabilities,
        displayName: v1?.display_name,
        paramsString: v1?.params_string,
        sizeBytes: v1?.size_bytes,
        bitsPerWeight: bits,
        format: v1?.format ?? m.format,
        loadedInstances: v1?.loaded_instances ?? (v1 ? (v1 as any).loadedInstances : undefined),
      };
    });

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
    currentStatus.models = currentStatus.models ?? [];
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
