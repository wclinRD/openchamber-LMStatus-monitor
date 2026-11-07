// Centralized state for LM Studio Prefill & Generate data.
// This module provides a per-request source of truth for concurrent inference.
// Each request has its own state, updated by either chat-proxy (SSE) or
// lm-studio-log-parser (log-based). Aggregation is computed from active requests.

export interface LmStudioRunState {
  prefillProgress: number;
  generateTokens: number;
  tokensPerSecond?: number;
  prefillTokensPerSecond?: number;
  state: 'idle' | 'prefill' | 'generate';
  lastUpdateAt: number;
  chatStartAt: number;
  /** When the first output token arrived; generate TPS is measured from here. 0 before generation. */
  generateStartAt: number;
  prefillSource: 'proxy' | 'log_parser' | 'rest_api';
  generateSource: 'proxy' | 'log_parser' | 'rest_api';
  tpsSource?: 'proxy' | 'log_parser' | 'rest_api';
  prefillTpsSource?: 'proxy' | 'log_parser' | 'rest_api';
}

export interface RequestState extends Omit<LmStudioRunState, 'state'> {
  reqId: string;
  state: 'idle' | 'prefill' | 'generate';
  lastPrefillAt: number;
  lastGenerateAt: number;
  lastTpsAt?: number;
  lastPrefillTpsAt?: number;
}

const baseDefault = {
  prefillProgress: 0,
  generateTokens: 0,
};

/** Per-request state map, keyed by request ID. */
const requestStates = new Map<string, RequestState>();

/** Create an empty request state with defaults. */
function createEmptyRequestState(reqId: string): RequestState {
  const now = Date.now();
  return {
    ...baseDefault,
    reqId,
    state: 'idle',
    lastUpdateAt: now,
    chatStartAt: now,
    generateStartAt: 0,
    lastPrefillAt: now,
    lastGenerateAt: now,
    prefillSource: 'rest_api',
    generateSource: 'rest_api',
  };
}

function inferState(prefill: number, generate: number): 'idle' | 'prefill' | 'generate' {
  if (generate > 0) return 'generate';
  if (prefill > 0) return 'prefill';
  return 'idle';
}

function computeTokensPerSecond(generateTokens: number, state: Pick<LmStudioRunState, 'generateStartAt' | 'lastUpdateAt'>): number | undefined {
  if (generateTokens <= 0) return undefined;
  const now = Date.now();
  // Measure from the first generated token, not from chat start: prefill time
  // must not dilute the generate speed.
  const startAt = state.generateStartAt > 0 ? state.generateStartAt : state.lastUpdateAt;
  const elapsed = startAt > 0 ? (now - startAt) / 1000 : 0;
  return elapsed > 0 ? generateTokens / elapsed : undefined;
}

/** Internal function: update a specific request's state. */
function updateRequestStateInternal(
  reqId: string,
  prefillProgress: number,
  generateTokens: number,
  tokensPerSecond?: number,
  prefillTokensPerSecond?: number,
  sourceType: 'proxy' | 'log_parser' = 'proxy',
): void {
  const now = Date.now();
  const state = requestStates.get(reqId) ?? createEmptyRequestState(reqId);
  state.prefillProgress = prefillProgress;
  state.lastPrefillAt = now;
  state.generateTokens = generateTokens;
  if (generateTokens > 0) {
    if (state.generateStartAt === 0) state.generateStartAt = now;
  } else {
    state.generateStartAt = 0;
  }
  state.lastGenerateAt = now;
  state.lastUpdateAt = now;
  state.state = inferState(prefillProgress, generateTokens);

  if (tokensPerSecond !== undefined) {
    state.tokensPerSecond = tokensPerSecond;
    state.lastTpsAt = now;
    state.tpsSource = sourceType;
  }
  if (prefillTokensPerSecond !== undefined) {
    state.prefillTokensPerSecond = prefillTokensPerSecond;
    state.lastPrefillTpsAt = now;
    state.prefillTpsSource = sourceType;
  }
  state.prefillSource = sourceType;
  state.generateSource = sourceType;
  requestStates.set(reqId, state);
}

/** Internal: update only prefill progress for a specific request. */
function updateRequestPrefillOnlyInternal(
  reqId: string,
  prefillProgress: number,
): void {
  const now = Date.now();
  const state = requestStates.get(reqId) ?? createEmptyRequestState(reqId);
  state.prefillProgress = prefillProgress;
  state.lastPrefillAt = now;
  state.lastUpdateAt = now;
  state.state = inferState(prefillProgress, state.generateTokens);
  state.prefillSource = state.prefillSource || 'rest_api';
  requestStates.set(reqId, state);
}

/** Internal: update only generate tokens for a specific request. */
function updateRequestGenerateOnlyInternal(
  reqId: string,
  generateTokens: number,
  tokensPerSecond?: number,
): void {
  const now = Date.now();
  const state = requestStates.get(reqId) ?? createEmptyRequestState(reqId);
  state.generateTokens = generateTokens;
  if (generateTokens > 0) {
    if (state.generateStartAt === 0) state.generateStartAt = now;
  } else {
    state.generateStartAt = 0;
  }
  state.lastGenerateAt = now;
  state.lastUpdateAt = now;
  state.state = inferState(state.prefillProgress, generateTokens);
  state.generateSource = state.generateSource || 'rest_api';

  if (tokensPerSecond !== undefined) {
    state.tokensPerSecond = tokensPerSecond;
    state.lastTpsAt = now;
    state.tpsSource = state.tpsSource || 'rest_api';
  }
  requestStates.set(reqId, state);
}

/**
 * Update a specific request's state from a SSE-based proxy request.
 */
export function updateRequestStateFromProxy(
  reqId: string,
  prefillProgress: number,
  generateTokens: number,
  tokensPerSecond?: number,
  prefillTokensPerSecond?: number,
): void {
  updateRequestStateInternal(reqId, prefillProgress, generateTokens, tokensPerSecond, prefillTokensPerSecond, 'proxy');
}

/**
 * Update only generate tokens and tokens per second for a specific SSE-based proxy request, preserving prefillProgress.
 */
export function updateRequestGenerateOnlyFromProxy(
  reqId: string,
  generateTokens: number,
  tokensPerSecond?: number,
): void {
  updateRequestGenerateOnlyInternal(reqId, generateTokens, tokensPerSecond);
}

/**
 * Update only prefill progress for a specific SSE-based proxy request, preserving generateTokens.
 */
export function updateRequestPrefillOnlyFromProxy(
  reqId: string,
  prefillProgress: number,
  tokensPerSecond?: number,
  prefillTokensPerSecond?: number,
): void {
  const now = Date.now();
  const state = requestStates.get(reqId) ?? createEmptyRequestState(reqId);
  state.prefillProgress = prefillProgress;
  state.lastPrefillAt = now;
  state.lastUpdateAt = now;
  state.state = inferState(prefillProgress, state.generateTokens);

  if (tokensPerSecond !== undefined) {
    state.tokensPerSecond = tokensPerSecond;
    state.lastTpsAt = now;
    state.tpsSource = state.tpsSource || 'proxy';
  }
  if (prefillTokensPerSecond !== undefined) {
    state.prefillTokensPerSecond = prefillTokensPerSecond;
    state.lastPrefillTpsAt = now;
    state.prefillTpsSource = state.prefillTpsSource || 'proxy';
  }
  state.prefillSource = state.prefillSource || 'proxy';
  requestStates.set(reqId, state);
}

/**
 * Update a specific request's state from the log parser (used as a fallback for direct GUI chats).
 */
export function updateRequestStateFromLog(
  reqId: string,
  prefillProgress: number,
  generateTokens: number,
  tokensPerSecond?: number,
  prefillTokensPerSecond?: number,
): void {
  updateRequestStateInternal(reqId, prefillProgress, generateTokens, tokensPerSecond, prefillTokensPerSecond, 'log_parser');
}

/**
 * Update only prefill progress from log parser for a specific request, preserving generateTokens and lastGenerateAt.
 */
export function updateRequestLogPrefillOnly(
  reqId: string,
  prefillProgress: number,
): void {
  updateRequestPrefillOnlyInternal(reqId, prefillProgress);
}

/**
 * Update only generate tokens from log parser for a specific request, preserving prefillProgress and lastPrefillAt.
 */
export function updateRequestLogGenerateOnly(
  reqId: string,
  generateTokens: number,
): void {
  updateRequestGenerateOnlyInternal(reqId, generateTokens);
}

/**
 * Update prefill tokens per second from log-based parsing (fallback for direct GUI chats).
 */
export function updatePrefillTokensPerSecond(prefillTokensPerSecond: number): void {
  if (prefillTokensPerSecond <= 0) return;
  const state = getLmStudioRunState();
  // global fallback only, no reqId for direct GUI mode
  updateRequestStateInternal('global-fallback', state.prefillProgress, state.generateTokens, undefined, prefillTokensPerSecond, 'log_parser');
}

/**
 * Get all active request states.
 */
export function getActiveRequestStates(): RequestState[] {
  return Array.from(requestStates.values()).filter(s => s.state !== 'idle');
}

/**
 * Aggregate state from all active request states.
 * For concurrent inference: prefillProgress = max, generateTokens = sum, tps = sum.
 */
export function getAggregateRunStateFromRequestStates(): LmStudioRunState {
  const states = getActiveRequestStates();
  if (states.length === 0) {
    return getBaselineState();
  }

  let maxPrefill = 0;
  let sumGenerate = 0;
  let sumTps = 0;
  let maxPrefillTps = 0;
  let state: 'idle' | 'prefill' | 'generate' = 'idle';
  let chatStartAt = 0;
  let generateStartAt = 0;
  let lastUpdateAt = 0;
  let finalPrefillSource: RequestState['prefillSource'] = 'rest_api';
  let finalGenerateSource: RequestState['generateSource'] = 'rest_api';
  let finalTpsSource: RequestState['tpsSource'] | undefined = undefined;
  let finalPrefillTpsSource: RequestState['prefillTpsSource'] | undefined = undefined;

  for (const s of states) {
    // Prefill progress survives the switch to generate: a generating request has
    // already finished prompt processing, and concurrent slots may still prefill.
    if (s.prefillProgress > maxPrefill) {
      maxPrefill = s.prefillProgress;
      finalPrefillSource = s.prefillSource ?? 'proxy';
    }
    if (s.prefillTokensPerSecond && s.prefillTokensPerSecond > maxPrefillTps) {
      maxPrefillTps = s.prefillTokensPerSecond;
      finalPrefillTpsSource = s.prefillTpsSource ?? 'proxy';
    }

    if (s.state === 'prefill') {
      if (s.lastPrefillAt && s.lastPrefillAt > lastUpdateAt) lastUpdateAt = s.lastPrefillAt;
      if (s.chatStartAt && s.chatStartAt < chatStartAt || chatStartAt === 0) chatStartAt = s.chatStartAt;
      if (state !== 'generate') state = 'prefill';
    } else if (s.state === 'generate') {
      sumGenerate += s.generateTokens;
      if (s.generateStartAt > 0 && (generateStartAt === 0 || s.generateStartAt < generateStartAt)) {
        generateStartAt = s.generateStartAt;
      }
      if (s.tokensPerSecond && s.tokensPerSecond > 0) {
        sumTps += s.tokensPerSecond;
        finalTpsSource = s.tpsSource ?? 'proxy';
      }
      if (s.lastGenerateAt && s.lastGenerateAt > lastUpdateAt) lastUpdateAt = s.lastGenerateAt;
      state = 'generate';
    }
    if (s.lastUpdateAt && s.lastUpdateAt > lastUpdateAt) lastUpdateAt = s.lastUpdateAt;
  }

  return {
    state,
    prefillProgress: maxPrefill,
    generateTokens: sumGenerate,
    tokensPerSecond: sumTps > 0 ? sumTps : undefined,
    prefillTokensPerSecond: maxPrefillTps > 0 ? maxPrefillTps : undefined,
    lastUpdateAt,
    chatStartAt,
    generateStartAt,
    prefillSource: finalPrefillSource,
    generateSource: finalGenerateSource,
    tpsSource: finalTpsSource,
    prefillTpsSource: finalPrefillTpsSource,
  };
}

/** Get baseline state when no active requests. */
function getBaselineState(): LmStudioRunState {
  return {
    state: 'idle',
    prefillProgress: 0,
    generateTokens: 0,
    lastUpdateAt: Date.now(),
    chatStartAt: 0,
    generateStartAt: 0,
    prefillSource: 'rest_api',
    generateSource: 'rest_api',
  };
}

/** Clear a specific request's state. */
export function clearRequestState(reqId: string): void {
  requestStates.delete(reqId);
}

/** Reset all request states (when no concurrent requests active). */
export function resetAllRequestStates(): void {
  requestStates.clear();
}

/** Set chat start time for a specific request. */
export function setChatStartAtForRequest(reqId: string): void {
  const now = Date.now();
  const state = requestStates.get(reqId) ?? createEmptyRequestState(reqId);
  state.chatStartAt = now;
  state.generateStartAt = 0;
  state.lastUpdateAt = now;
  state.lastPrefillAt = now;
  state.prefillSource = state.prefillSource === 'rest_api' ? 'proxy' : state.prefillSource;
  requestStates.set(reqId, state);
}

/** Read the unified state, computed from active request states or baseline. */
export function getLmStudioRunState(): Readonly<LmStudioRunState> {
  return getAggregateRunStateFromRequestStates();
}

/** Read the unified state with computed tokens per second. */
export function getLmStudioRunStateWithComputedTps(): Readonly<LmStudioRunState> {
  const base = getLmStudioRunState();
  return {
    ...base,
    tokensPerSecond: computeTokensPerSecond(base.generateTokens, base),
  };
}

/** Read the unified state as an object (useful for spreading). */
export function getLmStudioRunStatePlain(): Omit<LmStudioRunState, 'source' | 'prefillSource' | 'generateSource' | 'tpsSource' | 'prefillTpsSource'> {
  const base = getLmStudioRunState();
  const { prefillSource, generateSource, tpsSource, prefillTpsSource, ...rest } = base;
  return { ...rest, state: inferState(base.prefillProgress, base.generateTokens) };
}
