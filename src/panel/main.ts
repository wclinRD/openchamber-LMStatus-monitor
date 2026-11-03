import { connectHost } from '@openchamber/sdk';
import { applyHostReady } from '@openchamber/sdk/ui';

import { mountChart } from '../shared/chart.ts';
import { FAILURE_TEXT, POLL_MS, portButton, requestStop, startPolling, type PollFailure, type StopRequest } from '../shared/client.ts';
import {
  COLORS,
  GROUP_LABELS,
  SERVER_ORIGIN,
  formatBytes,
  formatPercent,
  formatPrefillPercent,
  formatUptime,
  jobDetail,
  platformName,
  processLabel,
  setLocale,
} from '../shared/format.ts';
import { el } from '../shared/dom.ts';
import { BASE_STYLE, PANEL_STYLE } from '../shared/style.ts';
import { HISTORY_POINTS, type DevServer, type GroupId, type Job, type ProcessGroup, type ProcessRow, type Snapshot } from '../shared/snapshot.ts';

const host = connectHost();
const root = document.querySelector<HTMLElement>('#root');
if (!root) throw new Error('Missing #root');
const style = document.createElement('style');
style.textContent = BASE_STYLE + PANEL_STYLE;
document.head.append(style);

const INTERVAL_SECONDS = POLL_MS / 1000;

// ----- Skeleton, built once -----

const banner = el('div', 'banner');
banner.hidden = true;

const hostName = el('div', 'host-name', 'This machine');
const hostMeta = el('div', 'host-meta', 'Reading…');
const live = el('div', 'live stale', 'Starting');
const head = el('div', 'head');
head.append(el('div', 'titles', '', [hostName, hostMeta]), live);

const statCard = (label: string, color: string, format: (value: number) => string) => {
  const value = el('span', 'big num', '–');
  const side = el('span', 'sub num');
  const top = el('div', 'card-top', '', [el('span', 'label', label), el('span', 'grow'), side]);
  const chart = mountChart({ color, height: 56, capacity: HISTORY_POINTS, format, intervalSeconds: INTERVAL_SECONDS });
  const sub = el('div', 'sub num');
  const card = el('div', 'card', '', [top, value, chart.element, sub]);
  return { card, value, side, sub, chart };
};

const cpu = statCard('CPU', COLORS.cpu, formatPercent);
const memory = statCard('Memory', COLORS.memory, formatBytes);
const grid = el('div', 'grid', '', [cpu.card, memory.card]);

const appValue = el('span', 'big num', '–');
const appCpuValue = el('span', 'sub num');
const appChart = mountChart({ color: COLORS.app, height: 44, capacity: HISTORY_POINTS, format: formatBytes, intervalSeconds: INTERVAL_SECONDS });
const appStack = el('div', 'stack');
const appLegend = el('div', 'legend');
const appCard = el('div', 'card', '', [
  el('div', 'card-top', '', [el('span', 'label', 'OpenChamber'), el('span', 'grow'), appCpuValue]),
  appValue,
  el('div', 'sub', 'The app, OpenCode, and everything they started'),
  appChart.element,
  appStack,
  appLegend,
]);

// ----- LM Studio -----

const lmStateValue = el('span', 'big num lm-state', '—');
const lmSpecContext = el('div', 'lm-spec-context');
const lmPrefillValue = el('span', 'sub num');
const lmGenerateValue = el('span', 'sub num');
const lmDetail = el('div', 'lm-detail');
const lmCard = el('div', 'card', '', [
  el('div', 'card-top', '', [el('span', 'label', 'LM Studio'), el('span', 'grow')]),
  lmStateValue,
  el('div', 'lm-row', '', [el('span', 'lm-label', 'Prefill'), lmPrefillValue]),
  el('div', 'lm-row', '', [el('span', 'lm-label', 'Generate'), lmGenerateValue]),
  lmSpecContext,
  lmDetail,
]);

// Every row is name · action · CPU · memory, so Stop sits centred beside the numbers.
const columns = (): HTMLElement => el('div', 'cols', '', [el('span'), el('span'), el('span', 'cell', 'CPU'), el('span', 'cell', 'Memory')]);
const actionCell = (button?: HTMLElement): HTMLElement => el('span', 'action', '', button ? [button] : []);

const serversCount = el('span', 'count');
const serversList = el('div', 'list');
const serversEmpty = el('div', 'empty', 'No dev servers right now. Servers started by an agent, a project action, or the terminal show up here with their ports.');
const serversSection = el('section', 'section', '', [
  el('div', 'section-head', '', [el('span', 'label', 'Dev servers'), serversCount]),
  serversList,
  serversEmpty,
]);

const groupsBox = el('div', 'list');
const processesSection = el('section', 'section', '', [
  el('div', 'section-head', '', [el('span', 'label', 'Processes')]),
  columns(),
  groupsBox,
]);

const outsideBox = el('div', 'list');
const outsideSection = el('section', 'section', '', [
  el('div', 'section-head', '', [el('span', 'label', 'OpenCode outside OpenChamber')]),
  outsideBox,
]);
outsideSection.hidden = true;

const footnote = el('div', 'footnote', 'Process CPU counts 100% per core, as Activity Monitor does; the CPU card above is the whole machine. Memory is resident memory: pages a process shares with others count in each of them.');

root.append(banner, head, grid, appCard, lmCard, serversSection, processesSection, outsideSection, footnote);

// ----- Stop -----

let refresh: () => void = () => undefined;

/**
 * A text button that asks once before it acts: the first click turns it
 * into "Stop …?", the second stops. It settles back after a few seconds.
 */
const stopButton = (label: string, question: string, target: StopRequest): HTMLButtonElement => {
  const button = el('button', 'stop', label);
  button.type = 'button';
  let armed = false;
  let timer: ReturnType<typeof setTimeout> | undefined;
  const disarm = (): void => {
    armed = false;
    button.classList.remove('armed');
    button.textContent = label;
  };
  button.addEventListener('click', (event) => {
    // Inside a summary or a clickable row, the click is the button's alone.
    event.preventDefault();
    event.stopPropagation();
    if (button.disabled) return;
    if (!armed) {
      armed = true;
      button.classList.add('armed');
      button.textContent = question;
      clearTimeout(timer);
      timer = setTimeout(disarm, 4_000);
      return;
    }
    clearTimeout(timer);
    button.disabled = true;
    button.textContent = 'Stopping…';
    void requestStop(host, target).then((ok) => {
      if (!ok) showStopError();
      refresh();
    });
  });
  return button;
};

// ----- Rows -----

// Below one percent of a core a number is noise; it stays readable but recedes.
const cpuCell = (value: number | null): HTMLElement => el('span', value !== null && value >= 1 ? 'cell num' : 'cell num quiet', formatPercent(value));
const memoryCell = (value: number): HTMLElement => el('span', 'cell num', formatBytes(value));

const textBlock = (title: string, detail: string): HTMLElement => {
  const titleLine = el('span', 'title-line', '', [el('span', 'pname', title)]);
  const block = el('div', 'who', '', [titleLine]);
  if (detail) block.append(el('span', 'pdetail', detail));
  return block;
};

const processRow = (process: ProcessRow, role: 'root' | 'self' | 'other', className = 'row'): HTMLElement => {
  const { title, detail } = processLabel(process, role);
  const row = el('div', className, '', [textBlock(title, detail), actionCell(), cpuCell(process.cpu), memoryCell(process.memory)]);
  row.title = `${process.name} · pid ${process.pid}${process.command ? `\n${process.command}` : ''}`;
  return row;
};

const openJobs = new Set<number>();

const jobRow = (job: Job, stoppable: boolean): HTMLElement => {
  // A job with nothing worth unfolding is one plain row.
  const foldable = job.members.length > 0 && job.count > 1;
  const open = foldable && openJobs.has(job.pid);
  const detail = jobDetail(job);
  const stop = stoppable ? stopButton('Stop', `Stop ${job.title}?`, { kind: 'job', pid: job.pid, name: job.name }) : undefined;
  const line = el('div', foldable ? 'row job foldable' : 'row job', '', [textBlock(job.title, detail), actionCell(stop), cpuCell(job.cpu), memoryCell(job.memory)]);
  line.title = job.command || job.title;
  line.classList.toggle('open', open);
  // Unfolded, commands wrap in full instead of ending in an ellipsis.
  const wrapper = el('div', open ? 'job-wrap open' : 'job-wrap', '', [line]);
  if (foldable) {
    line.tabIndex = 0;
    line.setAttribute('role', 'button');
    line.setAttribute('aria-expanded', String(open));
    const toggle = (): void => {
      if (openJobs.has(job.pid)) openJobs.delete(job.pid);
      else openJobs.add(job.pid);
      if (lastSnapshot) render(lastSnapshot);
    };
    line.addEventListener('click', toggle);
    line.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        toggle();
      }
    });
  }
  if (open) {
    const members = el('div', 'members', '', job.members.map((member) => processRow(member, 'other', 'row member')));
    const quiet = job.count - job.members.length;
    if (quiet > 0) members.append(el('div', 'more', quiet === 1 ? '1 more process, idle' : `${quiet} more processes, idle`));
    wrapper.append(members);
  }
  return wrapper;
};

// Groups start unfolded; the ones the user folds are remembered on this device.
const COLLAPSED_KEY = 'collapsed-groups';
const collapsedGroups = new Set<GroupId>();
let deviceStorage = false;

const saveCollapsed = (): void => {
  if (!deviceStorage) return;
  void host.storage.set(COLLAPSED_KEY, [...collapsedGroups], { scope: 'device' }).catch(() => undefined);
};

const loadCollapsed = async (): Promise<void> => {
  if (!deviceStorage) return;
  try {
    const stored = await host.storage.get(COLLAPSED_KEY, { scope: 'device' });
    if (!Array.isArray(stored)) return;
    for (const id of stored) if (id === 'app' || id === 'opencode' || id === 'terminals') collapsedGroups.add(id);
    if (lastSnapshot) render(lastSnapshot);
  } catch {
    // Unreadable preference: groups stay unfolded.
  }
};

const groupBlock = (group: ProcessGroup, roleOf: (row: ProcessRow) => 'root' | 'self' | 'other'): HTMLElement => {
  const dot = el('span', 'dot');
  dot.style.background = COLORS[group.id];
  const stopAll = group.id === 'terminals' && group.jobs.length > 0
    ? stopButton('Stop all', 'Stop everything running in the terminal?', { kind: 'terminals' })
    : undefined;
  const name = el('span', 'gname', '', [dot, el('b', '', GROUP_LABELS[group.id]), el('span', 'count', String(group.count))]);
  const collapsed = collapsedGroups.has(group.id);
  const header = el('div', collapsed ? 'group-head foldable' : 'group-head foldable open', '', [name, actionCell(stopAll), cpuCell(group.cpu), memoryCell(group.memory)]);
  header.tabIndex = 0;
  header.setAttribute('role', 'button');
  header.setAttribute('aria-expanded', String(!collapsed));
  const toggle = (): void => {
    if (collapsedGroups.has(group.id)) collapsedGroups.delete(group.id);
    else collapsedGroups.add(group.id);
    saveCollapsed();
    if (lastSnapshot) render(lastSnapshot);
  };
  header.addEventListener('click', toggle);
  header.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      toggle();
    }
  });
  // Terminal jobs can be stopped; an agent's job only while it serves a port,
  // since OpenCode's provider CLIs and MCP servers are jobs too.
  const stoppable = (job: Job): boolean => group.id === 'terminals' || (group.id === 'opencode' && job.ports.length > 0);
  const block = el('div', 'group', '', collapsed ? [header] : [
    header,
    ...group.processes.map((process) => processRow(process, roleOf(process))),
    ...group.jobs.map((job) => jobRow(job, stoppable(job))),
  ]);
  block.style.setProperty('--group-color', COLORS[group.id]);
  return block;
};

const serverRow = (server: DevServer): HTMLElement => {
  const ports = server.ports.map((port) => portButton(host, port));
  const title = el('div', 'title-line', '', [...ports, el('span', 'pname strong', server.name), el('span', 'origin', SERVER_ORIGIN[server.group])]);
  const stop = server.job ? stopButton('Stop', `Stop ${server.job.title}?`, { kind: 'job', pid: server.job.pid, name: server.job.name }) : undefined;
  const who = el('div', 'who', '', [title]);
  const detail = server.job?.title ?? '';
  if (detail) who.append(el('span', 'pdetail', detail));
  const row = el('div', 'row server', '', [who, actionCell(stop), cpuCell(server.cpu), memoryCell(server.memory)]);
  row.title = `pid ${server.pid}${server.command ? `\n${server.command}` : ''}`;
  return row;
};

const renderStack = (target: HTMLElement, parts: { value: number; color: string; label: string }[], total: number): void => {
  target.replaceChildren(...parts.filter((part) => part.value > 0).map((part) => {
    const span = el('span');
    span.style.width = `${Math.min(100, (part.value / Math.max(1, total)) * 100)}%`;
    span.style.background = part.color;
    span.title = part.label;
    return span;
  }));
};

const WARNING_TEXT = {
  'processes-unavailable': 'The process list could not be read just now. OpenChamber\'s numbers are from the last reading that worked.',
  'ports-unavailable': 'Listening ports could not be read, so dev servers are not detected.',
} as const;

const groupColor = (id: GroupId): string => COLORS[id];

let failure: PollFailure | null = null;
let stopError = false;
let stopErrorTimer: ReturnType<typeof setTimeout> | undefined;
let problems: string[] = [];
let lastSnapshot: Snapshot | null = null;

/** One banner, most urgent first: the service is unreachable, a Stop failed, a reading is partial. */
const updateBanner = (): void => {
  const text = failure !== null
    ? FAILURE_TEXT[failure]
    : stopError
      ? 'Could not stop it. It may have ended already, or it is not something this panel stops.'
      : problems.join(' ');
  banner.hidden = text === '';
  banner.classList.toggle('error', failure !== null || stopError);
  banner.textContent = text;
};

function showStopError(): void {
  stopError = true;
  clearTimeout(stopErrorTimer);
  stopErrorTimer = setTimeout(() => {
    stopError = false;
    updateBanner();
  }, 6_000);
  updateBanner();
}

const render = (snapshot: Snapshot): void => {
  lastSnapshot = snapshot;
  const { system, app } = snapshot;

  hostName.textContent = system.hostname;
  hostMeta.textContent = [platformName(system.platform), system.arch, system.cpuModel, `up ${formatUptime(system.uptimeSeconds)}`].filter(Boolean).join(' · ');
  live.textContent = `Live · every ${INTERVAL_SECONDS} s`;
  live.classList.remove('stale');

  cpu.value.textContent = formatPercent(system.cpu);
  cpu.side.textContent = `${system.cores} cores`;
  cpu.sub.textContent = system.load ? `Load ${system.load.map((value) => value.toFixed(2)).join(' · ')}` : 'All cores together';
  cpu.chart.update(snapshot.history.system.cpu, 100);

  memory.value.textContent = formatBytes(system.memoryUsed);
  memory.side.textContent = formatPercent((system.memoryUsed / Math.max(1, system.memoryTotal)) * 100);
  memory.sub.textContent = `of ${formatBytes(system.memoryTotal)} · ${formatBytes(Math.max(0, system.memoryTotal - system.memoryUsed))} free`;
  memory.chart.update(snapshot.history.system.memory, system.memoryTotal);

  appValue.textContent = formatBytes(app.memory);
  appCpuValue.textContent = `${formatPercent(app.cpu)} CPU`;
  appChart.update(snapshot.history.app.memory, Math.max(app.memory, ...snapshot.history.app.memory) * 1.15);
  renderStack(appStack, app.groups.map((group) => ({ value: group.memory, color: groupColor(group.id), label: GROUP_LABELS[group.id] })), app.memory);
  appLegend.replaceChildren(...app.groups.map((group) => {
    const swatch = el('span', 'swatch');
    swatch.style.background = groupColor(group.id);
    return el('div', 'legend-row', '', [
      swatch,
      el('span', 'name', GROUP_LABELS[group.id], [el('span', 'muted', ` · ${group.count} ${group.count === 1 ? 'process' : 'processes'}`)]),
      el('span', 'value num muted', formatPercent(group.cpu)),
      el('span', 'value num', formatBytes(group.memory)),
    ]);
  }));

  // LM Studio status
  const { lmStudio } = snapshot;
  const currentModel = Array.isArray(lmStudio.models) ? lmStudio.models.find((m) => m.id === lmStudio.modelName) : undefined;
  const currentDisplay = currentModel?.displayName || lmStudio.modelName;
  let stateLabel: string;
  if (lmStudio.modelName) {
    switch (lmStudio.state) {
      case 'loaded':
        stateLabel = currentDisplay;
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
        stateLabel = currentDisplay;
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
  lmStateValue.textContent = stateLabel;
  lmStateValue.className = lmStudio.state === 'loaded' ? 'big num lm-state lm-state-loaded lm-state-dim' : `big num lm-state lm-state-${lmStudio.state}`;

  const specParts: string[] = [];
  if (currentModel?.paramsString) specParts.push(currentModel.paramsString);
  if (currentModel?.bitsPerWeight) specParts.push(`${currentModel.bitsPerWeight}bit`);
  else if (currentModel?.quantization) specParts.push(currentModel.quantization);
  if (currentModel?.format) specParts.push(currentModel.format.toUpperCase());
  if (typeof currentModel?.sizeBytes === 'number' && currentModel.sizeBytes > 0) {
    specParts.push(`${(currentModel.sizeBytes / 1024 / 1024 / 1024).toFixed(1)}GB`);
  }
  const ctxLoaded = currentModel?.loadedContextLength;
  const ctxMax = currentModel?.maxContextLength;
  let ctxText = '';
  if (ctxLoaded && ctxMax) {
    ctxText = `Context: ${Math.round(ctxLoaded / 1024)}K / ${Math.round(ctxMax / 1024)}K`;
  } else if (ctxMax) {
    ctxText = `Context: ${Math.round(ctxMax / 1024)}K`;
  }
  const parts = [...specParts];
  if (ctxText) parts.push(ctxText);
  lmSpecContext.textContent = parts.join(' · ');
  lmSpecContext.hidden = parts.length === 0;

  const isGenerating = lmStudio.prefillProgress > 0 || lmStudio.generateTokens > 0;
  if (isGenerating) {
    const prefillDisplay = lmStudio.prefillProgress > 0 ? lmStudio.prefillProgress : 100;
    const ppTps = lmStudio.prefillTokensPerSecond;
    if (ppTps && ppTps > 0) {
      lmPrefillValue.textContent = `${formatPrefillPercent(prefillDisplay)} · ${ppTps.toFixed(1)} tok/s`;
    } else {
      lmPrefillValue.textContent = formatPrefillPercent(prefillDisplay);
    }
    const tps = lmStudio.tokensPerSecond;
    if (tps && tps > 0) {
      const tokens = lmStudio.generateTokens > 0 ? `${lmStudio.generateTokens.toLocaleString()} tokens · ` : '';
      lmGenerateValue.textContent = `${tokens}${tps.toFixed(1)} tok/s`;
    } else if (lmStudio.generateTokens > 0) {
      lmGenerateValue.textContent = `${lmStudio.generateTokens.toLocaleString()} tokens`;
    } else {
      lmGenerateValue.textContent = '—';
    }
  } else if (lmStudio.prefillProgress > 0 && lmStudio.prefillProgress < 100) {
    const ppTps = lmStudio.prefillTokensPerSecond;
    if (ppTps && ppTps > 0) {
      lmPrefillValue.textContent = `${formatPrefillPercent(lmStudio.prefillProgress)} · ${ppTps.toFixed(1)} tok/s`;
    } else {
      lmPrefillValue.textContent = formatPrefillPercent(lmStudio.prefillProgress);
    }
    lmGenerateValue.textContent = '—';
  } else {
    lmPrefillValue.textContent = '—';
    lmGenerateValue.textContent = '—';
  }

  lmDetail.replaceChildren();
  if (Array.isArray(lmStudio.models) && lmStudio.models.length > 0) {
    const loaded = lmStudio.models.filter((m) => m.state === 'loaded');
    if (loaded.length > 0) {
      for (const model of loaded.slice(0, 8)) {
        const row = el('div', 'lm-model-row');
        const name = el('div', 'lm-model-name');
        name.textContent = model.displayName || model.id;
        const metaParts: string[] = [];
        if (model.paramsString) metaParts.push(model.paramsString);
        if (model.quantization) metaParts.push(model.bitsPerWeight ? `${model.bitsPerWeight}bit` : model.quantization);
        if (model.format) metaParts.push(model.format.toUpperCase());
        if (model.arch) metaParts.push(model.arch);
        if (typeof model.sizeBytes === 'number' && model.sizeBytes > 0) {
          metaParts.push(`${(model.sizeBytes / 1024 / 1024 / 1024).toFixed(1)}GB`);
        }
        const caps = model.capabilities;
        if (Array.isArray(caps)) {
          if (caps.includes('vision')) metaParts.push('VISION');
          if (caps.includes('tool_use') || caps.includes('function_calling')) metaParts.push('TOOL');
          if (caps.includes('reasoning')) metaParts.push('REASON');
        } else if (caps && typeof caps === 'object') {
          if ((caps as any).vision) metaParts.push('VISION');
          if ((caps as any).function_calling || (caps as any).tool_use) metaParts.push('TOOL');
          if ((caps as any).reasoning) metaParts.push('REASON');
        }
        const meta = el('div', 'lm-model-meta');
        meta.textContent = metaParts.join(' · ');
        const right = el('div', 'lm-model-right');
        const state = el('span', `lm-pill lm-pill-${model.state}`);
        state.textContent = model.state === 'loaded' ? '載入' : model.state === 'loading' ? '載入中' : '未載入';
        const ctx = el('span', 'lm-pill lm-pill-ctx');
        const ctxVal = model.loadedContextLength ?? model.maxContextLength;
        ctx.textContent = ctxVal ? `${Math.round(ctxVal / 1024)}K` : '—';
        right.append(state, ctx);
        if (Array.isArray(model.loadedInstances) && model.loadedInstances.length > 1) {
          const inst = el('span', 'lm-pill lm-pill-ctx');
          inst.textContent = `x${model.loadedInstances.length}`;
          right.append(inst);
        }
        const info = el('div', 'lm-model-info');
        info.append(name, meta);
        row.append(info, right);
        lmDetail.append(row);
      }
      if (loaded.length > 8) {
        const more = el('div', 'lm-more');
        more.textContent = `+${loaded.length - 8} 個已載入模型`;
        lmDetail.append(more);
      }
    }
  }

  serversCount.textContent = snapshot.servers.length > 0 ? String(snapshot.servers.length) : '';
  serversList.replaceChildren(...snapshot.servers.map(serverRow));
  serversList.hidden = snapshot.servers.length === 0;
  serversEmpty.hidden = snapshot.servers.length > 0;

  const roleOf = (row: ProcessRow): 'root' | 'self' | 'other' => (row.pid === app.rootPid ? 'root' : row.label === 'Resource Monitor' && row.ppid === app.rootPid ? 'self' : 'other');
  groupsBox.replaceChildren(...app.groups.map((group) => groupBlock(group, roleOf)));
  // Folded state for jobs that ended would only grow.
  const livePids = new Set(app.groups.flatMap((group) => group.jobs.map((job) => job.pid)));
  for (const pid of openJobs) if (!livePids.has(pid)) openJobs.delete(pid);

  outsideSection.hidden = snapshot.outside.length === 0;
  outsideBox.replaceChildren(...snapshot.outside.map((row) => processRow(row, 'other')));

  problems = snapshot.warnings.map((warning) => WARNING_TEXT[warning]);
  updateBanner();
};

const showFailure = (next: PollFailure): void => {
  failure = next;
  updateBanner();
  live.textContent = 'Paused';
  live.classList.add('stale');
};

let started = false;
host.onReady((context) => {
  applyHostReady(context, document.documentElement);
  setLocale(context.locale);
  if (context.features?.deviceStorage === true && !deviceStorage) {
    deviceStorage = true;
    void loadCollapsed();
  }
  if (started) return;
  started = true;
  ({ refresh } = startPolling(host, root, (snapshot) => {
    failure = null;
    render(snapshot);
  }, showFailure));
});
