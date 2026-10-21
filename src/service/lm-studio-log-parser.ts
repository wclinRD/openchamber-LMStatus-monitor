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

/**
 * Gets the current log statistics.
 */
export function getLogStats(): LmLogStats {
  return { ...logStats };
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
    
    // Extract log level
    const level = typeof parsed.level === 'string' ? parsed.level.toLowerCase() : null;
    
    // Extract message
    const message = typeof parsed.message === 'string' ? parsed.message : '';
    
    // Determine the final event type first
    let eventType: 'prefill-progress' | 'model-output' | 'model-input' | 'chat-end' | 'server-event' = 'server-event';
    
    // Handle model prediction output with stats (generate token counts)
    if (parsed.type === 'llm.prediction.output') {
      eventType = 'model-output';
    } else if (parsed.type === 'llm.prediction.input') {
      eventType = 'model-input';
    } else {
      // Check for prefill progress in message
      const prefillMatch = message.match(/Prompt processing progress:\s*([\d.]+)%/);
      if (prefillMatch?.[1]) {
        const progress = parseFloat(prefillMatch[1]);
        if (!isNaN(progress) && progress >= 0 && progress <= 100) {
          eventType = 'prefill-progress';
        }
      } else if (message.includes('chat completion') || message.includes('generation complete') || message.includes('Prompt processing complete')) {
        eventType = 'chat-end';
      } else if (level === 'info' || level === 'warning' || level === 'error' || level === 'debug') {
        eventType = 'server-event';
      }
    }
    
    // Record statistics for all events with the correct type
    recordLogEvent(level, eventType);
    
    // Check for sensitive markers
    if (hasSensitiveMarkers(message)) {
      logStats.sensitiveMarkers++;
    }

    // Handle model prediction output with stats (generate token counts)
    if (eventType === 'model-output') {
      // Clear prefill progress when transitioning to generate phase
      if (currentPrefillProgress > 0) {
        currentPrefillProgress = 0;
        console.log('[LM Log Parser] Transitioned from prefill to generate phase, cleared prefill progress');
      }
      
      // Extract model identifier
      const model = typeof parsed.modelIdentifier === 'string' ? parsed.modelIdentifier : 
                    typeof parsed.identifier === 'string' ? parsed.identifier :
                    typeof parsed.model === 'string' ? parsed.model : 'unknown';

      // Extract stats object
      const stats = typeof parsed.stats === 'object' && parsed.stats !== null ? parsed.stats as Record<string, unknown> : null;
      
      // Try to find token count in various possible locations
      let outputTokens: number | null = null;
      
      // Direct tokens field
      if (typeof parsed.tokens === 'number') {
        outputTokens = parsed.tokens;
      } else if (typeof parsed.outputTokens === 'number') {
        outputTokens = parsed.outputTokens;
      } else if (typeof parsed.total_output_tokens === 'number') {
        outputTokens = parsed.total_output_tokens;
      } else if (typeof parsed.generated_tokens === 'number') {
        outputTokens = parsed.generated_tokens;
      } else if (stats) {
        // Check inside stats object
        if (typeof stats.tokensPerSecond === 'number') {
          // tokensPerSecond is rate, not count - but indicates generation completed
        }
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

      // If no token count but we have output message, still record as model-output
      return {
        timestamp: new Date(),
        model,
        type: 'model-output',
      };
    }
    
    // Check for prefill progress in message (already determined above)
    if (eventType === 'prefill-progress') {
      const prefillMatch = message.match(/Prompt processing progress:\s*([\d.]+)%/);
      if (prefillMatch?.[1]) {
        const progress = parseFloat(prefillMatch[1]);
        return {
          timestamp: new Date(),
          model: typeof parsed.model === 'string' ? parsed.model : (typeof parsed.modelIdentifier === 'string' ? parsed.modelIdentifier : 'unknown'),
          type: 'prefill-progress',
          progress,
        };
      }
    }

    // Check for chat end / generation complete (already determined above)
    if (eventType === 'chat-end') {
      // Reset prefill and generate stats when generation completes
      resetLmStudioStats();
      return {
        timestamp: new Date(),
        model: typeof parsed.model === 'string' ? parsed.model : (typeof parsed.modelIdentifier === 'string' ? parsed.modelIdentifier : 'unknown'),
        type: 'chat-end',
      };
    }

    // Handle model input events (already determined above)
    if (eventType === 'model-input') {
      return {
        timestamp: new Date(),
        model: typeof parsed.modelIdentifier === 'string' ? parsed.modelIdentifier : (typeof parsed.model === 'string' ? parsed.model : 'unknown'),
        type: 'model-input',
      };
    }

    // Handle server events with specific levels or sensitive markers
    if (eventType === 'server-event') {
      return {
        timestamp: new Date(),
        model: typeof parsed.model === 'string' ? parsed.model : 'unknown',
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
    startCliLogWatcher(lmsCli);
  } else {
    console.log('[LM Log Watcher] LM Studio CLI not found, falling back to file-based log parsing');
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
    const cliArgs = ['log', 'stream', '--source', 'model', '--filter', 'output', '--stats', '--json'];
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
      stopLogWatcher();
      startFileLogWatcher();
    });

    logWatcher.on('exit', (code, signal) => {
      console.log(`[LM CLI Watcher] exited with code ${code}, signal ${signal}`);
      clearTimeout(fallbackTimeout);
      stopLogWatcher();
      startFileLogWatcher();
    });
  } catch (error) {
    console.error('[LM CLI Watcher] Failed to start CLI watcher:', (error as Error).message);
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
    const latestLog = getLatestLogFile(logDir);
    if (!latestLog) {
      console.log('[LM Log Watcher] No log files found in', logDir);
      return;
    }

    const watcher = fs.watchFile(latestLog, { persistent: true, interval: 1000 }, () => {
      try {
        const content = fs.readFileSync(latestLog, 'utf8');
        const lines = content.split('\n').filter(Boolean);
        
        // Find the latest prefill progress line by scanning all lines
        let latestPrefillProgress: number | null = null;
        for (let i = lines.length - 1; i >= 0; i--) {
          const line = lines[i];
          if (!line) continue;
          const entry = parseLogLine(line);
          if (entry?.type === 'prefill-progress' && entry.progress !== undefined) {
            latestPrefillProgress = entry.progress;
            break;
          }
        }
        
        if (latestPrefillProgress !== null) {
          updatePrefillProgressFromLog(latestPrefillProgress);
          console.log(`[LM File Watcher] prefill_progress: ${latestPrefillProgress}%`);
        }
        
        // Count generated packets in real-time
        let packetCount = 0;
        for (const line of lines) {
          if (line && line.includes('Generated packet')) {
            packetCount++;
          }
        }
        
        if (packetCount > 0) {
          generatedPacketCount = packetCount;
          currentGenerateTokens = packetCount;
          console.log(`[LM File Watcher] generated_packets: ${packetCount}`);
        }
      } catch {
        // Ignore read errors
      }
    });

    logWatcher = {
      stdout: { on: () => {} },
      stderr: { on: () => {} },
      on: () => {},
      kill: () => { fs.unwatchFile(latestLog); },
    } as unknown as ChildProcess;
  } catch {
    console.error('[LM File Watcher] Failed to start file watcher');
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
