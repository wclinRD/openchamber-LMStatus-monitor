import { afterEach, describe, expect, test } from 'bun:test';

import {
  getLmStudioRunState,
  getLmStudioRunStateWithComputedTps,
  resetAllRequestStates,
  setChatStartAtForRequest,
  updateRequestGenerateOnlyFromProxy,
  updateRequestPrefillOnlyFromProxy,
} from './lm-studio-state.ts';

const sleep = (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms));

// The state module is process-wide, so leave no request behind for other test files.
afterEach(() => {
  resetAllRequestStates();
});

describe('generate TPS timing', () => {
  test('starts the clock at the first generated token, not at chat start', async () => {
    resetAllRequestStates();
    const reqId = 'req-tps';

    setChatStartAtForRequest(reqId);
    updateRequestPrefillOnlyFromProxy(reqId, 50);
    // Prompt processing takes time; it must not count towards generate speed.
    await sleep(60);

    const prefilling = getLmStudioRunState();
    expect(prefilling.state).toBe('prefill');
    expect(prefilling.generateStartAt).toBe(0);

    updateRequestGenerateOnlyFromProxy(reqId, 10);
    const started = getLmStudioRunState();
    expect(started.generateStartAt).toBeGreaterThan(started.chatStartAt);

    await sleep(60);
    updateRequestGenerateOnlyFromProxy(reqId, 20);

    const state = getLmStudioRunStateWithComputedTps();
    const tps = state.tokensPerSecond;
    expect(tps).toBeGreaterThan(0);

    const generationElapsed = (Date.now() - state.generateStartAt) / 1000;
    const chatElapsed = (Date.now() - state.chatStartAt) / 1000;
    // Prefill ran before generation, so the two clocks must differ.
    expect(generationElapsed).toBeLessThan(chatElapsed);
    // TPS is tokens over generation time, not over chat time.
    expect(Math.abs(tps! - state.generateTokens / generationElapsed)).toBeLessThan(tps! * 0.2);
    expect(tps!).toBeGreaterThan(state.generateTokens / chatElapsed);
  });

  test('resets the generate clock for each new chat', () => {
    resetAllRequestStates();
    const reqId = 'req-reset';

    setChatStartAtForRequest(reqId);
    updateRequestGenerateOnlyFromProxy(reqId, 5);
    expect(getLmStudioRunState().generateStartAt).toBeGreaterThan(0);

    setChatStartAtForRequest(reqId);
    expect(getLmStudioRunState().generateStartAt).toBe(0);
  });

  test('clears the generate clock when generation returns to zero', () => {
    resetAllRequestStates();
    const reqId = 'req-clear';

    setChatStartAtForRequest(reqId);
    updateRequestPrefillOnlyFromProxy(reqId, 100);
    updateRequestGenerateOnlyFromProxy(reqId, 5);
    expect(getLmStudioRunState().generateStartAt).toBeGreaterThan(0);

    updateRequestGenerateOnlyFromProxy(reqId, 0);
    expect(getLmStudioRunState().state).toBe('prefill');
    expect(getLmStudioRunState().generateStartAt).toBe(0);
  });
});
