// Centralized state for LM Studio Prefill & Generate data.
// This module provides a single source of truth for current request statistics,
// updated by either chat-proxy (SSE) or lm-studio-log-parser (log-based).
// Prefill data prefers the log parser (more real-time), while generate tokens
// keep the current proxy (SSE) approach.

export interface LmStudioRunState {
  prefillProgress: number;
  generateTokens: number;
  tokensPerSecond?: number;
  prefillTokensPerSecond?: number;
  state: 'idle' | 'prefill' | 'generate';
  lastUpdateAt: number;
  chatStartAt: number;
  prefillSource: 'proxy' | 'log_parser' | 'rest_api';
  generateSource: 'proxy' | 'log_parser' | 'rest_api';
  tpsSource?: 'proxy' | 'log_parser' | 'rest_api';
  prefillTpsSource?: 'proxy' | 'log_parser' | 'rest_api';
}

const baseDefault = {
  prefillProgress: 0,
  generateTokens: 0,
};

interface ProxyState {
  prefillProgress: number;
  generateTokens: number;
  tokensPerSecond?: number;
  prefillTokensPerSecond?: number;
  lastUpdateAt: number;
  chatStartAt: number;
  lastPrefillAt: number;
  lastGenerateAt: number;
  lastTpsAt?: number;
  lastPrefillTpsAt?: number;
  prefillSource: 'proxy' | 'rest_api';
  generateSource: 'proxy' | 'rest_api';
  tpsSource?: 'proxy' | 'rest_api';
  prefillTpsSource?: 'proxy' | 'rest_api';
}

interface LogState {
  prefillProgress: number;
  generateTokens: number;
  tokensPerSecond?: number;
  prefillTokensPerSecond?: number;
  lastUpdateAt: number;
  chatStartAt: number;
  lastPrefillAt: number;
  lastGenerateAt: number;
  lastTpsAt?: number;
  lastPrefillTpsAt?: number;
  prefillSource: 'log_parser' | 'rest_api';
  generateSource: 'log_parser' | 'rest_api';
  tpsSource?: 'log_parser' | 'rest_api';
  prefillTpsSource?: 'log_parser' | 'rest_api';
}

const defaultProxyState: ProxyState = {
  ...baseDefault,
  lastUpdateAt: 0,
  chatStartAt: 0,
  lastPrefillAt: 0,
  lastGenerateAt: 0,
  prefillSource: 'rest_api',
  generateSource: 'rest_api',
};

const defaultLogState: LogState = {
  ...baseDefault,
  lastUpdateAt: 0,
  chatStartAt: 0,
  lastPrefillAt: 0,
  lastGenerateAt: 0,
  prefillSource: 'rest_api',
  generateSource: 'rest_api',
};

let proxyState: ProxyState = { ...defaultProxyState };
let logState: LogState = { ...defaultLogState };

function inferState(prefill: number, generate: number): 'idle' | 'prefill' | 'generate' {
  if (generate > 0) return 'generate';
  if (prefill > 0) return 'prefill';
  return 'idle';
}

function computeTokensPerSecond(generateTokens: number, state: Pick<LmStudioRunState, 'chatStartAt' | 'lastUpdateAt'>): number | undefined {
  if (generateTokens <= 0) return undefined;
  const now = Date.now();
  const startAt = state.chatStartAt > 0 ? state.chatStartAt : state.lastUpdateAt;
  const elapsed = startAt > 0 ? (now - startAt) / 1000 : 0;
  return elapsed > 0 ? generateTokens / elapsed : undefined;
}

function updateProxyState(
  prefillProgress: number,
  generateTokens: number,
  tokensPerSecond?: number,
  prefillTokensPerSecond?: number,
): void {
  const now = Date.now();
  const newProxy: Partial<ProxyState> = {
    prefillProgress,
    lastPrefillAt: now,
    generateTokens,
    lastGenerateAt: now,
    lastUpdateAt: now,
  };
  if (tokensPerSecond !== undefined) {
    newProxy.tokensPerSecond = tokensPerSecond;
    newProxy.lastTpsAt = now;
    newProxy.tpsSource = 'proxy';
  }
  if (prefillTokensPerSecond !== undefined) {
    newProxy.prefillTokensPerSecond = prefillTokensPerSecond;
    newProxy.lastPrefillTpsAt = now;
    newProxy.prefillTpsSource = 'proxy';
  }
  proxyState = { ...proxyState, ...newProxy };
}

function updateLogState(
  prefillProgress: number,
  generateTokens: number,
  tokensPerSecond?: number,
  prefillTokensPerSecond?: number,
): void {
  const now = Date.now();
  const newLog: Partial<LogState> = {
    prefillProgress,
    lastPrefillAt: now,
    generateTokens,
    lastGenerateAt: now,
    lastUpdateAt: now,
  };
  if (tokensPerSecond !== undefined) {
    newLog.tokensPerSecond = tokensPerSecond;
    newLog.lastTpsAt = now;
    newLog.tpsSource = 'log_parser';
  }
  if (prefillTokensPerSecond !== undefined) {
    newLog.prefillTokensPerSecond = prefillTokensPerSecond;
    newLog.lastPrefillTpsAt = now;
    newLog.prefillTpsSource = 'log_parser';
  }
  logState = { ...logState, ...newLog };
}

function merge(): LmStudioRunState {
  return {
    state: inferState(
      Math.max(logState.prefillProgress, proxyState.prefillProgress),
      Math.max(proxyState.generateTokens, logState.generateTokens)
    ),
    prefillProgress: logState.lastPrefillAt > proxyState.lastPrefillAt ? logState.prefillProgress : proxyState.prefillProgress,
    generateTokens: proxyState.lastGenerateAt > logState.lastGenerateAt ? proxyState.generateTokens : logState.generateTokens,
    tokensPerSecond: (() => {
      let mergedTpsSource: 'proxy' | 'log_parser' | 'rest_api' | undefined;
      let mergedTps: number | undefined;
      if (proxyState.lastTpsAt && proxyState.lastTpsAt > (logState.lastTpsAt ?? 0)) {
        mergedTpsSource = proxyState.tpsSource ?? 'proxy';
        mergedTps = proxyState.tokensPerSecond;
      } else if (logState.lastTpsAt) {
        mergedTpsSource = logState.tpsSource ?? 'log_parser';
        mergedTps = logState.tokensPerSecond;
      }
      return { mergedTpsSource, mergedTps };
    })().mergedTps,
    prefillTokensPerSecond: (() => {
      let mergedPrefillTpsSource: 'proxy' | 'log_parser' | 'rest_api' | undefined;
      let mergedPrefillTps: number | undefined;
      if (logState.lastPrefillTpsAt && logState.lastPrefillTpsAt > (proxyState.lastPrefillTpsAt ?? 0)) {
        mergedPrefillTpsSource = logState.prefillTpsSource ?? 'log_parser';
        mergedPrefillTps = logState.prefillTokensPerSecond;
      } else if (proxyState.lastPrefillTpsAt) {
        mergedPrefillTpsSource = proxyState.prefillTpsSource ?? 'proxy';
        mergedPrefillTps = proxyState.prefillTokensPerSecond;
      }
      return { mergedPrefillTpsSource, mergedPrefillTps };
    })().mergedPrefillTps,
    lastUpdateAt: Math.max(proxyState.lastUpdateAt, logState.lastUpdateAt),
    chatStartAt: Math.max(proxyState.chatStartAt, logState.chatStartAt),
    prefillSource: logState.lastPrefillAt > proxyState.lastPrefillAt ? 'log_parser' : 'proxy',
    generateSource: proxyState.lastGenerateAt > logState.lastGenerateAt ? 'proxy' : 'log_parser',
    tpsSource: (() => {
      if (proxyState.lastTpsAt && proxyState.lastTpsAt > (logState.lastTpsAt ?? 0)) {
        return proxyState.tpsSource ?? 'proxy';
      }
      if (logState.lastTpsAt) {
        return logState.tpsSource ?? 'log_parser';
      }
      return undefined;
    })(),
    prefillTpsSource: (() => {
      if (logState.lastPrefillTpsAt && logState.lastPrefillTpsAt > (proxyState.lastPrefillTpsAt ?? 0)) {
        return logState.prefillTpsSource ?? 'log_parser';
      }
      if (proxyState.lastPrefillTpsAt) {
        return proxyState.prefillTpsSource ?? 'proxy';
      }
      return undefined;
    })(),
  };
}

/** Update state from a SSE-based proxy request (the primary real-time source). */
export function updateFromProxy(
  prefillProgress: number,
  generateTokens: number,
  tokensPerSecond?: number,
  prefillTokensPerSecond?: number,
): void {
  updateProxyState(prefillProgress, generateTokens, tokensPerSecond, prefillTokensPerSecond);
}

/** Update state from the log parser (used as a fallback for direct GUI chats). */
export function updateFromLog(
  prefillProgress: number,
  generateTokens: number,
  tokensPerSecond?: number,
  prefillTokensPerSecond?: number,
): void {
  updateLogState(prefillProgress, generateTokens, tokensPerSecond, prefillTokensPerSecond);
}

/**
 * Update prefill tokens per second from log-based parsing (fallback for direct GUI chats).
 */
export function updatePrefillTokensPerSecond(prefillTokensPerSecond: number): void {
  if (prefillTokensPerSecond <= 0) return;
  const state = getLmStudioRunState();
  updateLogState(
    state.prefillProgress,
    state.generateTokens,
    undefined,
    prefillTokensPerSecond,
  );
}

/**
 * Reset state when a new request begins (called on chat.start).
 * Clears everything and returns to idle/rest-api baseline.
 */
export function resetLmStudioRunState(): void {
  proxyState = { ...defaultProxyState };
  logState = { ...defaultLogState };
}

/**
 * Set the chat start time when a new request begins.
 */
export function setChatStartAt(): void {
  const now = Date.now();
  proxyState = {
    ...proxyState,
    chatStartAt: now,
    lastUpdateAt: now,
    lastPrefillAt: now,
    prefillSource: proxyState.prefillSource === 'rest_api' ? 'proxy' : proxyState.prefillSource,
  };
  logState = {
    ...logState,
    chatStartAt: now,
    lastUpdateAt: now,
    lastPrefillAt: now,
    prefillSource: logState.prefillSource === 'rest_api' ? 'log_parser' : logState.prefillSource,
  };
}

/** Read the unified state. */
export function getLmStudioRunState(): Readonly<LmStudioRunState> {
  return merge();
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
