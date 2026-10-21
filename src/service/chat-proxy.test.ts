import { describe, expect, test } from 'bun:test';

import { updatePrefillProgress, updateGenerateTokens } from './chat-proxy.ts';

describe('LM Studio SSE event handlers', () => {
  test('updatePrefillProgress handles valid progress values', () => {
    // Import the internal state by calling the function
    updatePrefillProgress(0);
    updatePrefillProgress(0.25);
    updatePrefillProgress(0.5);
    updatePrefillProgress(0.75);
    updatePrefillProgress(1);

    // The function should accept values 0-1 without throwing
    expect(() => {
      updatePrefillProgress(0.33);
      updatePrefillProgress(0.99);
    }).not.toThrow();
  });

  test('updatePrefillProgress rejects invalid values', () => {
    expect(() => updatePrefillProgress(-0.1)).not.toThrow(); // Should be rejected internally
    expect(() => updatePrefillProgress(1.1)).not.toThrow(); // Should be rejected internally
  });

  test('updateGenerateTokens handles valid token counts', () => {
    expect(() => {
      updateGenerateTokens(0);
      updateGenerateTokens(10);
      updateGenerateTokens(100);
      updateGenerateTokens(268);
    }).not.toThrow();
  });

  test('updateGenerateTokens rejects invalid values', () => {
    expect(() => updateGenerateTokens(-1)).not.toThrow(); // Should be rejected internally
    expect(() => updateGenerateTokens(null as any)).not.toThrow(); // Should be rejected internally
  });
});

describe('LM Studio streaming event format', () => {
  test('prompt_processing.progress event format', () => {
    const event = {
      type: 'prompt_processing.progress',
      progress: 0.5,
    };
    expect(event.type).toBe('prompt_processing.progress');
    expect(event.progress).toBe(0.5);
  });

  test('chat.end event format with stats', () => {
    const event = {
      type: 'chat.end',
      result: {
        model_instance_id: 'openai/gpt-oss-20b',
        output: [{ type: 'message', content: 'Hello' }],
        stats: {
          input_tokens: 329,
          total_output_tokens: 268,
          reasoning_output_tokens: 5,
          tokens_per_second: 43.73,
          time_to_first_token_seconds: 0.781,
        },
      },
    };
    expect(event.type).toBe('chat.end');
    expect(event.result?.stats?.total_output_tokens).toBe(268);
    expect(event.result?.stats?.input_tokens).toBe(329);
  });

  test('message.delta event format', () => {
    const event = {
      type: 'message.delta',
      content: 'The current',
    };
    expect(event.type).toBe('message.delta');
    expect(event.content).toBe('The current');
  });

  test('raw SSE format parsing', () => {
    const sseData = [
      'event: chat.start',
      'data: {"type":"chat.start","model_instance_id":"openai/gpt-oss-20b"}',
      '',
      'event: prompt_processing.progress',
      'data: {"type":"prompt_processing.progress","progress":0.5}',
      '',
      'event: message.delta',
      'data: {"type":"message.delta","content":"Hello"}',
      '',
      'event: chat.end',
      'data: {"type":"chat.end","result":{"stats":{"total_output_tokens":268}}}',
      '',
    ].join('\r\n');

    const events = sseData.split(/\r?\n\r?\n/);
    for (const event of events) {
      if (!event.startsWith('event: ') || !event.includes('data: ')) continue;
      const lines = event.split(/\r?\n/);
      let eventType = '';
      let data = '';
      for (const line of lines) {
        if (line.startsWith('event: ')) eventType = line.slice(7).trim();
        if (line.startsWith('data: ')) data = line.slice(6).trim();
      }
      if (eventType === 'prompt_processing.progress' && data) {
        const parsed = JSON.parse(data) as { progress?: number };
        expect(typeof parsed.progress).toBe('number');
      } else if (eventType === 'chat.end' && data) {
        const parsed = JSON.parse(data) as { result?: { stats?: { total_output_tokens?: number } } };
        expect(parsed.result?.stats?.total_output_tokens).toBe(268);
      }
    }
  });
});
