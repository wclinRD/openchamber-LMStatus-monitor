// Parses LM Studio server logs for prefill and generate progress.
// Uses LM Studio CLI `lms log stream --source server --json` as the primary method,
// with file-based parsing as a fallback for older LM Studio versions.

import { execFile, spawn, type ChildProcess } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

interface LmLogEntry {
  timestamp: Date;
  model: string;
  type: 'prefill-progress' | 'chat-end' | 'model-input' | 'model-output' | 'server-event';
  progress?: number;
  outputTokens?: number;
}

/** Statistics for log events */
export interface LmLogStats {
  totalEvents: number;
  byLevel: Record<string, number>;
  byType: Record<string, number>;
  sensitiveMarkers: number;
  prefillProgressEvents: number;
  chatEndEvents: number;
}

let currentPrefillProgress: number = 0;
let currentGenerateTokens: number = 0;
let generatedPacketCount: number = 0;
let logWatcher: ChildProcess | null = null;

/** Log event statistics */
const logStats: LmLogStats = {
  totalEvents: 0,
  byLevel: {},
  byType: {},
  sensitiveMarkers: 0,
  prefillProgressEvents: 0,
  chatEndEvents: 0,
};

/** Current log watcher state for debugging */
export interface LogWatcherState {
  isWatching: boolean;
  method: 'cli' | 'file' | 'none';
  latestLogFile: string | null;
  error?: string;
}

let watcherState: LogWatcherState = {
  isWatching: false,
  method: 'none',
  latestLogFile: null,
};

/**
 * Gets the current log statistics.
 */
export function getLogStats(): LmLogStats {
  return { ...logStats };
}

/**
 * Gets the current log watcher state for debugging.
 */
export function getLogWatcherState(): LogWatcherState {
  return { ...watcherState };
}

/**
 * Sets the log watcher state.
 */
function setWatcherState(state: Omit<LogWatcherState, 'isWatching'> & Partial<LogWatcherState>): void {
  watcherState = { ...watcherState, ...state };
}

/**
 * Resets the log statistics.
 */
export function resetLogStats(): void {
  logStats.totalEvents = 0;
  logStats.byLevel = {};
  logStats.byType = {};
  logStats.sensitiveMarkers = 0;
  logStats.prefillProgressEvents = 0;
  logStats.chatEndEvents = 0;
}

/**
 * Increments statistics for a log event.
 */
function recordLogEvent(level: string | null, type: string): void {
  logStats.totalEvents++;
  
  if (level) {
    logStats.byLevel[level] = (logStats.byLevel[level] || 0) + 1;
  }
  
  logStats.byType[type] = (logStats.byType[type] || 0) + 1;
  
  if (type === 'prefill-progress') {
    logStats.prefillProgressEvents++;
  } else if (type === 'chat-end') {
    logStats.chatEndEvents++;
  }
}

/**
 * Checks if a message contains sensitive markers.
 */
function hasSensitiveMarkers(message: string): boolean {
  return message.includes('[Sensitive]') || 
         message.includes('REDACTED') || 
         message.includes('PII') ||
         message.toLowerCase().includes('sensitive');
}

/**
 * Auto-detects the LM Studio CLI (lms) location.
 * Checks common locations in order:
 * 1. ~/.cache/lm-studio/bin/lms
 * 2. ~/.lmstudio/bin/lms
 * 3. System PATH (lms command)
 */
function findLmsCli(): string | null {
  const home = process.env.HOME ?? '/Users/wclin';
  const candidates = [
    path.join(home, '.cache', 'lm-studio', 'bin', 'lms'),
    path.join(home, '.lmstudio', 'bin', 'lms'),
  ];

  for (const candidate of candidates) {
    try {
      fs.accessSync(candidate, fs.constants.F_OK | fs.constants.X_OK);
      return candidate;
    } catch {
      // Continue to next candidate
    }
  }

  // Try system PATH by checking 'lms' command
  try {
    const whichResult = execFileSync('which', ['lms'], { timeout: 3000 });
    const lmsPath = whichResult.trim();
    if (lmsPath) {
      fs.accessSync(lmsPath, fs.constants.F_OK | fs.constants.X_OK);
      return lmsPath;
    }
  } catch {
    // Not in PATH
  }

  return null;
}

/** Helper to run a command synchronously and return stdout */
function execFileSync(file: string, args: string[], options: { timeout: number }): string {
  return new Promise<string>((resolve, reject) => {
    execFile(file, args, { timeout: options.timeout, maxBuffer: 1024 * 1024 }, (error, stdout) => {
      if (error && (error as NodeJS.ErrnoException).code === 'ENOENT') {
        reject(new Error(`Command not found: ${file}`));
      } else if (error) {
        // Some commands return non-zero exit codes but still output useful info
        if (stdout) resolve(stdout);
        else reject(error);
      } else {
        resolve(stdout);
      }
    });
  }).catch((err) => { throw err; }) as any;
}

/**
 * Updates the prefill progress from a log entry.
 */
export function updatePrefillProgressFromLog(progress: number): void {
  if (progress < 0 || progress > 100) return;
  currentPrefillProgress = Math.round(progress);
}

/**
 * Updates generate tokens from a log entry.
 */
export function updateGenerateTokensFromLog(tokens: number): void {
  if (tokens < 0) return;
  currentGenerateTokens = Math.max(0, tokens);
}

/**
 * Resets the prefill progress and generate tokens when generation completes or becomes idle.
 */
export function resetLmStudioStats(): void {
  currentPrefillProgress = 0;
  currentGenerateTokens = 0;
  generatedPacketCount = 0;
}

/**
 * Gets the current prefill progress.
 */
export function getPrefillProgress(): number {
  return currentPrefillProgress;
}

/**
 * Gets the current generate tokens.
 */
export function getGenerateTokens(): number {
  return currentGenerateTokens;
}

/**
 * Parses a JSON log line from `lms log stream --source model --filter output --stats --json`.
 * Expected format (example):
 * {"timestamp":"...","type":"llm.prediction.output","modelIdentifier":"gpt-oss-20b-mlx","output":"...","stats":{"tokensPerSecond":15.5}}
 * {"level":"info","message":"[API] /v1/chat/completions request received","timestamp":"..."}
 */
export function parseJsonLogLine(line: string): LmLogEntry | null {
  try {
    const parsed = JSON.parse(line) as Record<string, unknown>;

    // LM Studio's CLI wraps each server log entry as
    // { timestamp, data: { type: "server.log", level, content } }.
    // Unwrap it so the rest of the parser can work on the human-readable content.
    const data = (typeof parsed.data === 'object' && parsed.data !== null)
      ? parsed.data as Record<string, unknown>
      : null;

    const level = (typeof parsed.level === 'string')
      ? parsed.level.toLowerCase()
      : (typeof data?.level === 'string' ? (data.level as string).toLowerCase() : null);

    const content = (typeof parsed.message === 'string')
      ? parsed.message
      : (typeof data?.content === 'string')
        ? data.content as string
        : (typeof parsed.content === 'string' ? parsed.content as string : '');

    const structuredType = (typeof parsed.type === 'string')
      ? parsed.type
      : (typeof data?.type === 'string' ? data.type as string : '');

    // Determine the final event type.
    let eventType: 'prefill-progress' | 'model-output' | 'model-input' | 'chat-end' | 'server-event' = 'server-event';

    // Direct structured model prediction output (older/direct LM Studio JSON).
    if (structuredType === 'llm.prediction.output') {
      eventType = 'model-output';
    } else if (structuredType === 'llm.prediction.input') {
      eventType = 'model-input';
    } else {
      const prefillMatch = content.match(/Prompt processing progress:\s*([\d.]+)%/);
      if (prefillMatch?.[1]) {
        const progress = parseFloat(prefillMatch[1]);
        if (!isNaN(progress) && progress >= 0 && progress <= 100) {
          eventType = 'prefill-progress';
          if (currentGenerateTokens > 0 || generatedPacketCount > 0) {
            currentGenerateTokens = 0;
            generatedPacketCount = 0;
            console.log('[LM Log Parser] Switched back to prefill phase, cleared generate counter');
          }
        }
      } else if (
        content.includes('chat completion') ||
        content.includes('generation complete') ||
        content.includes('Prompt processing complete') ||
        content.includes('Finished streaming response')
      ) {
        eventType = 'chat-end';
      } else if (content.includes('Generated packet') || content.includes('llm.prediction.output')) {
        eventType = 'model-output';
      } else if (level === 'info' || level === 'warning' || level === 'error' || level === 'debug') {
        eventType = 'server-event';
      }
    }

    // Record statistics for all events with the correct type
    recordLogEvent(level, eventType);

    // Check for sensitive markers
    if (hasSensitiveMarkers(content)) {
      logStats.sensitiveMarkers++;
    }

    // Model identifier extraction
    const model = (typeof parsed.modelIdentifier === 'string')
      ? parsed.modelIdentifier
      : (typeof parsed.identifier === 'string')
        ? parsed.identifier
        : (typeof parsed.model === 'string')
          ? parsed.model
          : (typeof data?.modelIdentifier === 'string')
            ? data.modelIdentifier as string
            : 'unknown';

    if (eventType === 'model-output') {
      // Clear prefill progress when transitioning to generate phase
      if (currentPrefillProgress > 0) {
        currentPrefillProgress = 0;
        console.log('[LM Log Parser] Transitioned from prefill to generate phase, cleared prefill progress');
      }

      // Extract stats object (direct structured JSON)
      const stats = (typeof parsed.stats === 'object' && parsed.stats !== null)
        ? parsed.stats as Record<string, unknown>
        : null;

      // Try to find token count in various possible locations
      let outputTokens: number | null = null;
      if (typeof parsed.tokens === 'number') {
        outputTokens = parsed.tokens;
      } else if (typeof parsed.outputTokens === 'number') {
        outputTokens = parsed.outputTokens;
      } else if (typeof parsed.total_output_tokens === 'number') {
        outputTokens = parsed.total_output_tokens;
      } else if (typeof parsed.generated_tokens === 'number') {
        outputTokens = parsed.generated_tokens;
      } else if (stats) {
        if (typeof stats.outputTokens === 'number') {
          outputTokens = stats.outputTokens;
        } else if (typeof stats.total_output_tokens === 'number') {
          outputTokens = stats.total_output_tokens;
        } else if (typeof stats.generatedTokens === 'number') {
          outputTokens = stats.generatedTokens;
        } else if (typeof stats.tokens === 'number') {
          outputTokens = stats.tokens;
        }
      }

      if (outputTokens !== null && outputTokens >= 0) {
        updateGenerateTokensFromLog(outputTokens);
        return {
          timestamp: new Date(),
          model,
          type: 'model-output',
          outputTokens,
        };
      }

      // Fallback: count "Generated packet" lines in real time.
      if (content.includes('Generated packet')) {
        generatedPacketCount++;
        updateGenerateTokensFromLog(generatedPacketCount);
        return {
          timestamp: new Date(),
          model,
          type: 'model-output',
          outputTokens: generatedPacketCount,
        };
      }

      // If no token count but we have output, still record as model-output
      return {
        timestamp: new Date(),
        model,
        type: 'model-output',
      };
    }

    if (eventType === 'prefill-progress') {
      const prefillMatch = content.match(/Prompt processing progress:\s*([\d.]+)%/);
      if (prefillMatch?.[1]) {
        const progress = parseFloat(prefillMatch[1]);
        updatePrefillProgressFromLog(progress);
        return {
          timestamp: new Date(),
          model,
          type: 'prefill-progress',
          progress,
        };
      }
    }

    if (eventType === 'chat-end') {
      resetLmStudioStats();
      return {
        timestamp: new Date(),
        model,
        type: 'chat-end',
      };
    }

    if (eventType === 'model-input') {
      return {
        timestamp: new Date(),
        model,
        type: 'model-input',
      };
    }

    if (eventType === 'server-event') {
      return {
        timestamp: new Date(),
        model,
        type: 'server-event',
      };
    }

    return null;
  } catch {
    // Not a JSON line or unparseable
    return null;
  }
}

/**
 * Parses a raw log line for prefill progress, completion, or generate phase (fallback method).
 */
export function parseLogLine(line: string): LmLogEntry | null {
  // Check for prefill progress
  const prefillMatch = line.match(/Prompt processing progress: ([\d.]+)%/);
  if (prefillMatch?.[1]) {
    const progress = parseFloat(prefillMatch[1]);
    if (!isNaN(progress)) {
      // Clear generate counter when switching back to prefill phase
      if (currentGenerateTokens > 0 || generatedPacketCount > 0) {
        currentGenerateTokens = 0;
        generatedPacketCount = 0;
        console.log('[LM Log Parser] Switched back to prefill phase via plain text log, cleared generate counter');
      }
      return {
        timestamp: new Date(),
        model: 'unknown',
        type: 'prefill-progress',
        progress,
      };
    }
  }
  
  // Check for completion events
  if (line.includes('Finished streaming response') || 
      line.includes('chat completion') || 
      line.includes('generation complete') ||
      line.includes('Prompt processing complete')) {
    return {
      timestamp: new Date(),
      model: 'unknown',
      type: 'chat-end',
    };
  }
  
  // Check for generate phase start (Generated packet indicates model output)
  if (line.includes('Generated packet') || line.includes('llm.prediction.output')) {
    // Clear prefill progress when transitioning to generate phase
    if (currentPrefillProgress > 0) {
      currentPrefillProgress = 0;
      console.log('[LM Log Parser] Transitioned from prefill to generate phase via plain text log, cleared prefill progress');
    }
    
    // Count generated packets in real-time
    generatedPacketCount++;
    currentGenerateTokens = generatedPacketCount;
    console.log(`[LM Log Parser] Generated packet count: ${generatedPacketCount}`);
    
    return {
      timestamp: new Date(),
      model: 'unknown',
      type: 'model-output',
      outputTokens: generatedPacketCount,
    };
  }
  
  return null;
}

/**
 * Starts watching LM Studio server logs via the `lms log stream` CLI.
 * Falls back to file-based watching if CLI is not available.
 */
export function startLogWatcher(): void {
  if (logWatcher) return;

  const lmsCli = findLmsCli();
  if (lmsCli) {
    setWatcherState({ method: 'cli', latestLogFile: null, isWatching: true });
    console.log('[LM Log Watcher] Starting CLI log watcher using:', lmsCli);
    startCliLogWatcher(lmsCli);
  } else {
    console.log('[LM Log Watcher] LM Studio CLI not found, falling back to file-based log parsing');
    setWatcherState({ method: 'file', latestLogFile: null, isWatching: true });
    startFileLogWatcher();
  }
}

/**
 * Starts watching logs via the LM Studio CLI `lms log stream`.
 * Uses --source model --filter output --stats --json for generate token stats.
 * Falls back to server logs if model source is not available or CLI doesn't produce JSON.
 */
function startCliLogWatcher(lmsCli: string): void {
  try {
    console.log(`[LM Log Watcher] Using LM Studio CLI: ${lmsCli}`);
    // Try model source with stats first (for generate token counts)
    const cliArgs = ['log', 'stream', '--source', 'server', '--json'];
    logWatcher = spawn(lmsCli, cliArgs, {
      stdio: ['ignore', 'pipe', 'pipe'],
      env: { ...process.env },
    });

    let buffer = '';
    let hasOutput = false;
    
    // Set a timeout: if no JSON output is received within 3 seconds, fall back to file watcher
    const fallbackTimeout = setTimeout(() => {
      if (!hasOutput) {
        console.log('[LM CLI Watcher] No JSON output received within 3s, falling back to file-based watcher');
        setWatcherState({ method: 'file', latestLogFile: null, isWatching: true });
        stopLogWatcher();
        startFileLogWatcher();
      }
    }, 3000);

    logWatcher.stdout?.on('data', (chunk: Buffer) => {
      hasOutput = true;
      clearTimeout(fallbackTimeout);
      buffer += chunk.toString('utf8');
      const lines = buffer.split('\n');
      buffer = lines.pop() ?? ''; // Keep incomplete line in buffer

      for (const line of lines) {
        if (!line.trim()) continue;
        const entry = parseJsonLogLine(line);
        if (entry?.type === 'prefill-progress' && entry.progress !== undefined) {
          updatePrefillProgressFromLog(entry.progress);
          console.log(`[LM CLI Watcher] prefill_progress: ${entry.progress}%`);
        } else if (entry?.type === 'chat-end') {
          console.log('[LM CLI Watcher] chat_end detected');
        } else if (entry?.type === 'model-output') {
          console.log('[LM CLI Watcher] model-output detected');
        } else if (entry === null && line.trim().startsWith('[')) {
          // Fallback: try parsing as plain text log line
          const textEntry = parseLogLine(line);
          if (textEntry?.type === 'prefill-progress' && textEntry.progress !== undefined) {
            updatePrefillProgressFromLog(textEntry.progress);
            console.log(`[LM CLI Watcher] prefill_progress (plain text): ${textEntry.progress}%`);
          } else if (textEntry?.type === 'model-output') {
            console.log(`[LM CLI Watcher] model-output detected (generated packets: ${generatedPacketCount})`);
          } else if (textEntry?.type === 'chat-end') {
            console.log('[LM CLI Watcher] chat_end detected (plain text)');
          }
        }
      }
    });

    logWatcher.stderr?.on('data', (chunk: Buffer) => {
      console.error(`[LM CLI Watcher] stderr: ${chunk.toString('utf8').trim()}`);
    });

    logWatcher.on('error', (error) => {
      console.error('[LM CLI Watcher] Error starting CLI watcher:', error.message);
      clearTimeout(fallbackTimeout);
      setWatcherState({ method: 'file', latestLogFile: null, isWatching: true });
      stopLogWatcher();
      startFileLogWatcher();
    });

    logWatcher.on('exit', (code, signal) => {
      console.log(`[LM CLI Watcher] exited with code ${code}, signal ${signal}`);
      clearTimeout(fallbackTimeout);
      setWatcherState({ method: 'file', latestLogFile: null, isWatching: true });
      stopLogWatcher();
      startFileLogWatcher();
    });
  } catch (error) {
    console.error('[LM CLI Watcher] Failed to start CLI watcher:', (error as Error).message);
    setWatcherState({ method: 'file', latestLogFile: null, isWatching: true });
    stopLogWatcher();
    startFileLogWatcher();
  }
}

/**
 * Starts watching the LM Studio server logs via file system (fallback method).
 */
function startFileLogWatcher(): void {
  const home = process.env.HOME ?? '/Users/wclin';
  const logDir = path.join(home, '.lmstudio', 'server-logs');

  try {
    // Watch the latest log file in the log directory
    const latestLogFile = getLatestLogFile(logDir);
    if (!latestLogFile) {
      console.log('[LM File Watcher] No log files found in', logDir);
      setWatcherState({ method: 'file', latestLogFile: null, error: 'No log files found' });
      return;
    }

    setWatcherState({ latestLogFile: latestLogFile, method: 'file', isWatching: true });
    console.log(`[LM File Watcher] Watching log file: ${latestLogFile}`);

    const watcher = fs.watchFile(latestLogFile, { persistent: true, interval: 1000 }, () => {
      try {
        const content = fs.readFileSync(latestLogFile, 'utf8');
        const lines = content.split('\n').filter(Boolean);
        
        // Find the latest completion or prefill line by scanning from the end
        let latestEventType: 'chat-end' | 'prefill-progress' | null = null;
        let latestPrefillProgress: number | null = null;
        let latestPrefillIndex = -1;
        
        for (let i = lines.length - 1; i >= 0; i--) {
          const line = lines[i];
          if (!line) continue;
          
          // Check for completion events first
          if (line.includes('Finished streaming response') || 
              line.includes('chat completion') || 
              line.includes('generation complete') ||
              line.includes('Prompt processing complete')) {
            latestEventType = 'chat-end';
            break;
          }
          
          const entry = parseLogLine(line);
          if (entry?.type === 'prefill-progress' && entry.progress !== undefined) {
            latestEventType = 'prefill-progress';
            latestPrefillProgress = entry.progress;
            latestPrefillIndex = i;
            break;
          }
        }
        
        if (latestEventType === 'chat-end') {
          // Clear all stats when a conversation ends
          resetLmStudioStats();
          console.log('[LM File Watcher] chat-end detected, cleared all stats');
        } else if (latestEventType === 'prefill-progress') {
          updatePrefillProgressFromLog(latestPrefillProgress!);
          console.log(`[LM File Watcher] prefill_progress: ${latestPrefillProgress}%`);
          
          // Clear generate counter when switching back to prefill phase
          if (currentGenerateTokens > 0 || generatedPacketCount > 0) {
            currentGenerateTokens = 0;
            generatedPacketCount = 0;
            console.log('[LM File Watcher] Switched back to prefill phase, cleared generate counter');
          }
        }
        
        // Count generated packets only from the current active session
        let packetCount = 0;
        if (latestEventType === 'prefill-progress' || latestEventType === null) {
          // Count from the latest prefill progress line onwards
          const startIndex = latestPrefillIndex >= 0 ? latestPrefillIndex : 0;
          for (let i = startIndex; i < lines.length; i++) {
            const line = lines[i];
            if (line && line.includes('Generated packet')) {
              packetCount++;
            }
          }
        }
        
        if (packetCount > 0) {
          generatedPacketCount = packetCount;
          currentGenerateTokens = packetCount;
          console.log(`[LM File Watcher] generated_packets: ${packetCount}`);
        } else if (latestEventType === 'chat-end') {
          // Ensure stats are cleared after chat-end
          generatedPacketCount = 0;
          currentGenerateTokens = 0;
        }
      } catch (error) {
        console.error('[LM File Watcher] Error reading log file:', (error as Error).message);
      }
    });

    logWatcher = {
      stdout: { on: () => {} },
      stderr: { on: () => {} },
      on: () => {},
      kill: () => { fs.unwatchFile(latestLogFile); },
    } as unknown as ChildProcess;
  } catch (error) {
    console.error('[LM File Watcher] Failed to start file watcher:', (error as Error).message);
    setWatcherState({ method: 'file', latestLogFile: null, error: (error as Error).message });
  }
}

/**
 * Stops watching the LM Studio server logs.
 */
export function stopLogWatcher(): void {
  if (logWatcher) {
    try {
      logWatcher.kill();
    } catch {
      // Ignore cleanup errors
    }
    logWatcher = null;
  }
  setWatcherState({ isWatching: false, method: 'none', latestLogFile: null });
}

/**
 * Gets the latest log file in the log directory.
 */
function getLatestLogFile(logDir: string): string | null {
  try {
    const now = new Date();
    const yearMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
    const dir = path.join(logDir, yearMonth);
    const files = fs.readdirSync(dir).filter((f): f is string => typeof f === 'string' && f.endsWith('.log')).sort().reverse();
    if (files.length === 0) return null;
    const latestFile = files[0];
    if (!latestFile) return null;
    return path.join(dir, latestFile);
  } catch {
    return null;
  }
}
