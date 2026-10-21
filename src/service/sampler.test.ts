import { expect, test } from 'bun:test';

import type { RawProcess } from './parse.ts';
import { Sampler } from './sampler.ts';
import type { ProcessSource } from './sources.ts';

const MB = 1024 * 1024;

test('a failed process read keeps the last OpenChamber numbers instead of zeros', async () => {
  let fail = false;
  let cpuSeconds = 0;
  const source: ProcessSource = {
    list: async () => {
      if (fail) throw new Error('ps timed out');
      cpuSeconds += 1;
      const rows: RawProcess[] = [
        { pid: 100, ppid: 1, name: 'OpenChamber', memory: 300 * MB, cpuSeconds },
        { pid: 200, ppid: 100, name: 'opencode', memory: 200 * MB, cpuSeconds },
      ];
      return rows;
    },
    commands: async () => new Map(),
    ports: async () => new Map(),
    memoryUsed: async () => 8 * 1024 * MB,
    close: () => undefined,
  };
  const sampler = new Sampler(source, 100, 999);
  await sampler.sample();
  await new Promise((resolve) => setTimeout(resolve, 20));
  const good = await sampler.sample();
  expect(good.app.memory).toBe(500 * MB);
  const appPoints = good.history.app.memory.length;

  fail = true;
  const failed = await sampler.sample();
  expect(failed.warnings).toContain('processes-unavailable');
  expect(failed.app.memory).toBe(500 * MB);
  expect(failed.history.app.memory).toHaveLength(appPoints);

  fail = false;
  await new Promise((resolve) => setTimeout(resolve, 20));
  const recovered = await sampler.sample();
  // CPU still has a reading to compare with, so no process falls back to "no number".
  expect(recovered.app.groups.flatMap((group) => group.processes).every((row) => row.cpu !== null)).toBe(true);
});
