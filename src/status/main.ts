// Status section for the Work Status panel: shows system resources and LM Studio LLM status.
import { connectHost } from '@openchamber/sdk';
import { applyHostReady } from '@openchamber/sdk/ui';

import { POLL_MS, portButton, type PollFailure } from '../shared/client.ts';
import { formatBytes, formatPercent } from '../shared/format.ts';
import { el } from '../shared/dom.ts';
import { BASE_STYLE, PANEL_STYLE, STATUS_STYLE } from '../shared/style.ts';
import { HISTORY_POINTS, type Snapshot } from '../shared/snapshot.ts';
import { mountChart } from '../shared/chart.ts';

const host = connectHost();
const root = document.querySelector<HTMLElement>('#root');
if (!root) throw new Error('Missing #root');

const style = document.createElement('style');
style.textContent = BASE_STYLE + PANEL_STYLE + STATUS_STYLE;
document.head.append(style);

const INTERVAL_SECONDS = POLL_MS / 1000;

// ----- Chart and meters -----

const chart = mountChart({ color: 'var(--oc-primary)', height: 18, capacity: HISTORY_POINTS, format: (v) => `${v}ms`, intervalSeconds: INTERVAL_SECONDS });

const meter = (color: string): { element: HTMLElement; set: (pct: number) => void } => {
  const inner = el('span', 'meter-fill');
  inner.style.background = color;
  const wrapper = el('div', 'meter', '', [inner]);
  return {
    element: wrapper,
    set: (pct: number) => {
      inner.style.width = `${Math.min(100, Math.max(0, pct))}%`;
    },
  };
};

const cpuMeter = meter('var(--oc-info)');
const memoryMeter = meter('var(--oc-success)');

// ----- Status rows -----

const lineRow = (label: string, meterEl: HTMLElement | null, value: string, title?: string): HTMLElement => {
  const row = el('div', 'line', '', [
    el('span', 'what', label),
    meterEl ?? el('div', 'meter-empty'),
    el('span', 'value num', value),
  ]);
  if (title) row.title = title;
  return row;
};

const openchamberRow = lineRow(
  'OpenChamber',
  chart.element,
  '–',
  'Memory and CPU of OpenChamber, OpenCode, and everything they started. CPU counts 100% per core.',
);

const cpuRow = lineRow('CPU', cpuMeter.element, '–');
const memoryRow = lineRow('Memory', memoryMeter.element, '–');

// ----- LM Studio rows -----

const lmStateRow = lineRow('LLM Status', null, '—', 'Model load state: mounted (loaded) or unmounted (unloaded).');
const prefillRow = lineRow('Prefill', null, '—', 'Prompt processing progress percentage.');
const generateRow = lineRow('Generate', null, '—', 'Number of tokens generated in the current run.');

// ----- Dev servers ports -----

const portsRow = lineRow('Dev servers', null, '');
const portsList = el('div', 'ports');

// ----- Build the DOM -----

const note = el('div', 'note', 'Reading…');
root.append(note, openchamberRow, cpuRow, memoryRow, lmStateRow, prefillRow, generateRow, portsRow);

const hideAll = (): void => {
  for (const row of [openchamberRow, cpuRow, memoryRow, lmStateRow, prefillRow, generateRow, portsRow]) {
    row.hidden = true;
  }
};

const showRows = (): void => {
  openchamberRow.hidden = false;
  cpuRow.hidden = false;
  memoryRow.hidden = false;
};

// ----- Rendering -----

const render = (snapshot: Snapshot): void => {
  const { system, app } = snapshot;

  // System CPU and memory
  cpuRow.hidden = false;
  memoryRow.hidden = false;
  const cpuPct = system.cpu ?? 0;
  cpuMeter.set(system.cpu !== null ? cpuPct : 0);
  cpuRow.querySelector<HTMLElement>('.value')!.textContent = formatPercent(system.cpu);

  const memoryPct = Math.round((system.memoryUsed / Math.max(1, system.memoryTotal)) * 100);
  memoryMeter.set(memoryPct);
  memoryRow.querySelector<HTMLElement>('.value')!.textContent = `${formatBytes(system.memoryUsed)} / ${formatBytes(system.memoryTotal)}`;

  // OpenChamber row
  openchamberRow.hidden = snapshot.warnings.includes('processes-unavailable');
  const ocValue = openchamberRow.querySelector<HTMLElement>('.value')!;
  ocValue.textContent = `${formatBytes(app.memory)} · ${formatPercent(app.cpu)}`;
  chart.update(snapshot.history.app.memory, Math.max(app.memory, ...snapshot.history.app.memory) * 1.15);

  // LM Studio status
  lmStateRow.hidden = false;
  prefillRow.hidden = false;
  generateRow.hidden = false;

  const { lmStudio } = snapshot;
  const stateLabel = lmStudio.state === 'loaded' ? '掛載' : lmStudio.state === 'unloaded' ? '卸載' : lmStudio.state === 'loading' ? '載入中' : '錯誤';
  const stateValueEl = lmStateRow.querySelector<HTMLElement>('.value')!;
  stateValueEl.textContent = stateLabel;
  // Add state-specific color class
  stateValueEl.className = `value num lm-state-${lmStudio.state}`;

  const prefillValue = prefillRow.querySelector<HTMLElement>('.value')!;
  if (lmStudio.prefillProgress !== null) {
    prefillValue.textContent = `${lmStudio.prefillProgress}%`;
  } else {
    prefillValue.textContent = '—';
  }

  const generateValue = generateRow.querySelector<HTMLElement>('.value')!;
  generateValue.textContent = lmStudio.generateTokens.toLocaleString();

  // Dev servers ports
  const allPorts = [...new Set(snapshot.servers.flatMap((s) => s.ports))].sort((a, b) => a - b);
  if (allPorts.length > 0 && !snapshot.warnings.includes('processes-unavailable')) {
    portsRow.hidden = false;
    portsList.replaceChildren(...allPorts.slice(0, 6).map((port) => portButton(host, port)));
    const portsValue = portsRow.querySelector<HTMLElement>('.value')!;
    portsValue.replaceChildren(...portsList.children);
    if (allPorts.length > 6) {
      portsValue.appendChild(el('span', 'muted', ` +${allPorts.length - 6}`));
    }
  } else {
    portsRow.hidden = true;
  }

  // Note/banner for warnings
  const hasProcessWarning = snapshot.warnings.includes('processes-unavailable');
  note.hidden = !hasProcessWarning;
  note.className = hasProcessWarning ? 'note error' : 'note';
  note.textContent = hasProcessWarning ? 'Could not read the process list; showing system totals only.' : '';
};

// ----- Polling -----

const FAILURE_TEXT: Record<string, string> = {
  'needs-approval': 'Allow the local service for LM Studio monitor in Settings → Extensions.',
  'paused': 'LM Studio monitor is paused in Settings → Extensions.',
  'service-failed': 'The monitoring service stopped. It restarts on the next refresh.',
  'unreachable': 'Could not reach the LM Studio service.',
  'bad-answer': 'The monitoring service answered with something unexpected.',
};

function showFailure(failure: PollFailure): void {
  note.hidden = false;
  note.className = 'note error';
  note.textContent = FAILURE_TEXT[failure] ?? 'Could not reach the monitoring service.';
  hideAll();
}

let started = false;
host.onReady(async (context) => {
  applyHostReady(context, document.documentElement);
  if (started) return;
  started = true;

  // Start polling the service for snapshots
  const { startPolling } = await import('../shared/client.ts');
  const { refresh } = startPolling(host, root, (snapshot) => {
    render(snapshot);
  }, showFailure);

  // Initial fetch
  void refresh();
});

// ----- Resize handling -----

let lastHeight = -1;
new ResizeObserver(() => {
  const height = Math.ceil(root.getBoundingClientRect().height);
  if (height === lastHeight) return;
  lastHeight = height;
  void host.setHeight(height).catch(() => undefined);
}).observe(root);
