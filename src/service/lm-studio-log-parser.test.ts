import { describe, expect, it, beforeEach } from 'bun:test';
import {
  parseJsonLogLine,
  getLogStats,
  resetLogStats,
  updatePrefillProgressFromLog,
  updateGenerateTokensFromLog,
  getPrefillProgress,
  getGenerateTokens,
} from './lm-studio-log-parser.ts';

describe('LM Studio Log Parser', () => {
  beforeEach(() => {
    resetLogStats();
  });

  it('should parse JSON log line with prefill progress', () => {
    const json = '{"level":"info","message":"Prompt processing progress: 45%","timestamp":"2026-10-22T10:00:00Z"}';
    const entry = parseJsonLogLine(json);
    expect(entry).not.toBeNull();
    expect(entry?.type).toBe('prefill-progress');
    expect(entry?.progress).toBe(45);
  });

  it('should parse JSON log line with model output and tokens', () => {
    const json = '{"timestamp":"2026-10-22T10:00:00Z","type":"llm.prediction.output","modelIdentifier":"qwen3.6-35b-a3b-brainwaves-nex-uncensored-qx64-hi-mlx","output":"Hello world","stats":{"outputTokens":150,"tokensPerSecond":12.5}}';
    const entry = parseJsonLogLine(json);
    expect(entry).not.toBeNull();
    expect(entry?.type).toBe('model-output');
    expect(entry?.outputTokens).toBe(150);
  });

  it('should parse JSON log line with server event and sensitive markers', () => {
    const json = '{"level":"info","message":"[Sensitive] User data REDACTED PII","timestamp":"2026-10-22T10:00:00Z"}';
    const entry = parseJsonLogLine(json);
    expect(entry).not.toBeNull();
    expect(entry?.type).toBe('server-event');
  });

  it('should track statistics correctly', () => {
    parseJsonLogLine('{"level":"info","message":"Prompt processing progress: 45%"}');
    parseJsonLogLine('{"level":"info","message":"[Sensitive] REDACTED"}');
    parseJsonLogLine('{"level":"warning","message":"Server error"}');

    const stats = getLogStats();
    expect(stats.totalEvents).toBe(3);
    expect(stats.byLevel.info).toBe(2);
    expect(stats.byLevel.warning).toBe(1);
    expect(stats.byType['prefill-progress']).toBe(1);
    expect(stats.byType['server-event']).toBe(2);
    expect(stats.sensitiveMarkers).toBe(1);
  });

  it('should update and get prefill progress', () => {
    updatePrefillProgressFromLog(75);
    expect(getPrefillProgress()).toBe(75);

    updatePrefillProgressFromLog(120); // Invalid, should ignore
    expect(getPrefillProgress()).toBe(75);
  });

  it('should update and get generate tokens', () => {
    updateGenerateTokensFromLog(200);
    expect(getGenerateTokens()).toBe(200);

    updateGenerateTokensFromLog(-50); // Invalid, should ignore
    expect(getGenerateTokens()).toBe(200);
  });

  it('should reset statistics', () => {
    parseJsonLogLine('{"level":"info","message":"Test"}');
    expect(getLogStats().totalEvents).toBe(1);

    resetLogStats();
    expect(getLogStats().totalEvents).toBe(0);
  });
});
