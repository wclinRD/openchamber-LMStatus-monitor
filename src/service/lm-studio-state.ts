// Centralized state for LM Studio Prefill & Generate data.
// This module provides a single source of truth for current request statistics,
// updated by either chat-proxy (SSE) or lm-studio-log-parser (log-based).

export interface LmStudioRunState {
  prefillProgress: number;
  generateTokens: number;
  tokensPerSecond?: number;
  prefillTokensPerSecond?: number;
  state: 'idle' | 'prefill' | 'generate';
  lastUpdateAt: number;
  chatStartAt: number;
  source: 'proxy' | 'log_parser' | 'rest_api';
}

const defaultState: LmStudioRunState = {
  prefillProgress: 0,
  generateTokens: 0,
  state: 'idle',
  lastUpdateAt: 0,
  chatStartAt: 0,
  source: 'rest_api',
};

let state: LmStudioRunState = { ...defaultState };

function inferState(prefill: number, generate: number): 'idle' | 'prefill' | 'generate' {
  if (generate > 0) return 'generate';
  if (prefill > 0) return 'prefill';
  return 'idle';
}

function computeTokensPerSecond(generateTokens: number, state: LmStudioRunState): number | undefined {
  if (generateTokens <= 0) return undefined;
  const now = Date.now();
  const startAt = state.chatStartAt > 0 ? state.chatStartAt : state.lastUpdateAt;
  const elapsed = startAt > 0 ? (now - startAt) / 1000 : 0;
  return elapsed > 0 ? generateTokens / elapsed : undefined;
}

function writeState(input: Partial<LmStudioRunState>): LmStudioRunState {
  // Omit undefined values so we don't accidentally overwrite existing fields.
  const safeInput: Partial<LmStudioRunState> = {};
  for (const [key, value] of Object.entries(input)) {
    if (value !== undefined) {
      safeInput[key as keyof LmStudioRunState] = value;
    }
  }
  state = {
    ...state,
    ...safeInput,
    state: inferState(
      input.prefillProgress ?? state.prefillProgress,
      input.generateTokens ?? state.generateTokens,
    ),
    lastUpdateAt: Date.now(),
  };
  return state;
}

/** Update state from a SSE-based proxy request (the primary real-time source). */
export function updateFromProxy(
  prefillProgress: number,
  generateTokens: number,
  tokensPerSecond?: number,
  prefillTokensPerSecond?: number,
): void {
  writeState({
    prefillProgress,
    generateTokens,
    tokensPerSecond,
    prefillTokensPerSecond,
    source: 'proxy',
  });
}

/** Update state from the log parser (used as a fallback for direct GUI chats). */
export function updateFromLog(
  prefillProgress: number,
  generateTokens: number,
  tokensPerSecond?: number,
  prefillTokensPerSecond?: number,
): void {
  writeState({
    prefillProgress,
    generateTokens,
    tokensPerSecond,
    prefillTokensPerSecond,
    source: 'log_parser',
  });
}

/**
 * Reset state when a new request begins (called on chat.start).
 * Clears everything and returns to idle/rest-api baseline.
 */
export function resetLmStudioRunState(): void {
  state = { ...defaultState };
}

/**
 * Set the chat start time when a new request begins.
 */
export function setChatStartAt(): void {
  state = { ...state, chatStartAt: Date.now(), lastUpdateAt: Date.now(), state: 'prefill' };
}

/** Read the unified state. */
export function getLmStudioRunState(): Readonly<LmStudioRunState> {
  return { ...state };
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
export function getLmStudioRunStatePlain(): Omit<LmStudioRunState, 'source'> {
  const base = getLmStudioRunState();
  const { source, ...rest } = base;
  return { ...rest, state: inferState(base.prefillProgress, base.generateTokens) };
}
