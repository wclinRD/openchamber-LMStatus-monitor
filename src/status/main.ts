// Status section for the Work Status panel: shows system resources and LM Studio LLM status.
import type { GuestStatusControl, GuestStatusControlEvent } from '@openchamber/sdk';
import { connectHost } from '@openchamber/sdk';
import { applyHostReady } from '@openchamber/sdk/ui';

import { POLL_MS, portButton, type PollFailure } from '../shared/client.ts';
import { formatBytes, formatNetworkSpeed, formatPercent, formatPrefillPercent } from '../shared/format.ts';
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
const prefillMeter = meter('var(--oc-success)');

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
const networkRow = lineRow('Network', null, '—', 'Upload and download speed from active interfaces.');

// ----- LM Studio rows -----

const lmStateRow = lineRow('LLM Status', null, '—', 'Model load state: mounted (loaded) or unmounted (unloaded).');
const prefillRow = lineRow('Prefill', prefillMeter.element, '—', 'Prompt processing progress percentage.');
const generateRow = lineRow('Generate', null, '—', 'Number of tokens generated in the current run.');

// ----- Dev servers ports -----

const portsRow = lineRow('Dev servers', null, '');
const portsList = el('div', 'ports');

// ----- Build the DOM -----

const note = el('div', 'note', 'Reading…');
root.append(note, openchamberRow, cpuRow, memoryRow, networkRow, lmStateRow, prefillRow, generateRow, portsRow);

const hideAll = (): void => {
  for (const row of [openchamberRow, cpuRow, memoryRow, networkRow, lmStateRow, prefillRow, generateRow, portsRow]) {
    row.hidden = true;
  }
};

const showRows = (): void => {
  openchamberRow.hidden = false;
  cpuRow.hidden = false;
  memoryRow.hidden = false;
  networkRow.hidden = false;
};

// ----- Status controls (Refresh button in the section header) -----

let statusControlsSupported = false;
let publishedControls: GuestStatusControl[] | null = null;

const statusControls = (): GuestStatusControl[] => [
  { kind: 'button', id: 'refresh-build', label: 'Refresh' },
];

const publishStatusControls = async (): Promise<void> => {
  if (!statusControlsSupported) return;
  const controls = statusControls();
  await host.setStatusControls(controls).catch(() => undefined);
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
  memoryRow.querySelector<HTMLElement>('.value')!.textContent = `${formatBytes(system.memoryUsed)} / ${formatBytes(system.memoryTotal)} · ${formatPercent(memoryPct)}`;

  // Network
  networkRow.hidden = false;
  const networkValueEl = networkRow.querySelector<HTMLElement>('.value')!;
  networkValueEl.textContent = formatNetworkSpeed(system.networkSpeedUp, system.networkSpeedDown);

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
  const currentModel = Array.isArray(lmStudio.models) ? lmStudio.models.find((m) => m.id === lmStudio.modelName) : undefined;
  const currentDisplay = currentModel?.displayName || lmStudio.modelName;
  let stateLabel: string;
  if (lmStudio.modelName) {
    switch (lmStudio.state) {
      case 'loaded':
        stateLabel = currentDisplay ?? '—';
        break;
      case 'loading':
        stateLabel = `${currentDisplay} · 載入中 ${formatPrefillPercent(lmStudio.prefillProgress)}`;
        break;
      case 'unloaded':
        stateLabel = currentDisplay ? `${currentDisplay} · 卸載` : '卸載';
        break;
      case 'error':
        stateLabel = currentDisplay ? `${currentDisplay} · 錯誤` : '錯誤';
        break;
      default:
        stateLabel = currentDisplay ?? '—';
    }
  } else {
    switch (lmStudio.state) {
      case 'loaded':
        stateLabel = '掛載';
        break;
      case 'unloaded':
        stateLabel = '卸載';
        break;
      case 'loading':
        stateLabel = `載入中 ${formatPrefillPercent(lmStudio.prefillProgress)}`;
        break;
      case 'error':
        stateLabel = '錯誤';
        break;
      default:
        stateLabel = '—';
    }
  }
  const stateValueEl = lmStateRow.querySelector<HTMLElement>('.value')!;
  stateValueEl.textContent = stateLabel;
  // Add state-specific color class
  stateValueEl.className = lmStudio.state === 'loaded' ? 'value num lm-state-loaded lm-state-dim' : `value num lm-state-${lmStudio.state}`;

  const prefillValue = prefillRow.querySelector<HTMLElement>('.value')!;
  const generateValue = generateRow.querySelector<HTMLElement>('.value')!;

  // Only show prefill/generate values when there's an active generation.
  // When idle, show "—" to indicate no active inference.
  const isGenerating = lmStudio.prefillProgress > 0 || lmStudio.generateTokens > 0 || (lmStudio.tokensPerSecond && lmStudio.tokensPerSecond > 0);
  if (isGenerating) {
    // Prompt processing may still be under way (and concurrent inference can
    // keep prefilling while another slot generates), so show the real progress
    // until it reaches 100. Only a completed prefill reads 100%.
    const prefillDisplay = lmStudio.prefillProgress > 0 && lmStudio.prefillProgress < 100
      ? lmStudio.prefillProgress
      : 100;
    const ppTps = lmStudio.prefillTokensPerSecond;
    prefillValue.textContent = ppTps && ppTps > 0 ? `${formatPrefillPercent(prefillDisplay)} · ${ppTps.toFixed(1)} tok/s` : formatPrefillPercent(prefillDisplay);
    prefillMeter.set(prefillDisplay);
    const tps = lmStudio.tokensPerSecond;
    if (tps && tps > 0) {
      const tokens = lmStudio.generateTokens > 0 ? `${lmStudio.generateTokens.toLocaleString()} tokens · ` : '';
      generateValue.textContent = `${tokens}${tps.toFixed(1)} tok/s`;
    } else if (lmStudio.generateTokens > 0) {
      generateValue.textContent = lmStudio.generateTokens.toLocaleString();
    } else {
      generateValue.textContent = '—';
    }
  } else {
    prefillValue.textContent = '—';
    prefillMeter.set(0);
    generateValue.textContent = '—';
  }

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

// ----- Build trigger and polling integration -----

let pollController: { refresh: () => void } | null = null;

const startBuildAndRefresh = async (): Promise<void> => {
  try {
    const result = await host.serviceRequest({ method: 'POST', path: '/build' });
    if (result.status === 200) {
      void pollController?.refresh();
    } else {
      const error = result.body ? JSON.parse(result.body) as { error?: string } : null;
      if (!pollController?.refresh) await host.toast({ kind: 'error', message: error?.error ?? 'Build failed' });
    }
  } catch {
    // No immediate feedback; subsequent polling will surface a failure if relevant.
  }
};

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

  statusControlsSupported = context.features?.statusControls === true;
  publishStatusControls();
  host.onStatusControl((event) => {
    if (event.id === 'refresh-build') startBuildAndRefresh();
  });

  // Start polling the service for snapshots
  const { startPolling } = await import('../shared/client.ts');
  pollController = startPolling(host, root, (snapshot) => {
    render(snapshot);
  }, showFailure);

  // Initial fetch
  void pollController?.refresh();

  // Re-publish controls when directory or session changes, so the host refresh button stays visible across context switches.
  let previousDirectory: string | null = null;
  host.onDirectory((dir) => {
    if (previousDirectory !== dir) {
      previousDirectory = dir;
      void publishStatusControls();
    }
  });

  let previousSessionId: string | null = null;
  host.onSession((session) => {
    const id = session?.id ?? '';
    if (previousSessionId !== id) {
      previousSessionId = id;
      void publishStatusControls();
    }
  });
});

// ----- Resize handling & re-publish controls when section becomes visible again -----

let lastHeight = -1;
new ResizeObserver(() => {
  const height = Math.ceil(root.getBoundingClientRect().height);
  if (height === lastHeight) return;
  lastHeight = height;
  void host.setHeight(height).catch(() => undefined);
  // If the section header was collapsed and now has positive height, re-publish controls so host shows them.
  if (statusControlsSupported && lastHeight > 0) void publishStatusControls();
}).observe(root);

// Also re-publish controls when coming back from hidden document state.
document.addEventListener('visibilitychange', () => {
  if (statusControlsSupported && document.visibilityState === 'visible') void publishStatusControls();
});

// Re-publish controls right after they have been set on ready.
publishStatusControls().catch(() => undefined);
