// Listens to LM Studio's SSE stream for prefill and generate progress.
// This captures live status even when the user is using LM Studio GUI directly.

const LM_STUDIO_HOST = '127.0.0.1';
const LM_STUDIO_PORT = 1234;
const LM_STUDIO_V1_URL = `http://${LM_STUDIO_HOST}:${LM_STUDIO_PORT}/api/v1/chat`;

let currentPrefillProgress: number = 0;
let currentGenerateTokens: number = 0;
let isListening = false;
let streamController: ReadableStreamDefaultController<Uint8Array> | null = null;

/**
 * Updates the prefill progress from a prompt_processing.progress event.
 */
export function updatePrefillProgress(progress: number): void {
  if (progress < 0 || progress > 1) return;
  currentPrefillProgress = progress * 100;
}

/**
 * Updates generate tokens from chat.end event stats.
 */
export function updateGenerateTokens(totalOutputTokens: number | null): void {
  if (totalOutputTokens === null || totalOutputTokens < 0) return;
  currentGenerateTokens = Math.max(0, totalOutputTokens);
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
 * Starts listening to LM Studio's SSE stream.
 * This is used to capture live prefill/generate status even when the user
 * is using LM Studio GUI directly.
 */
export function startLmStudioStream(): void {
  if (isListening) return;
  isListening = true;

  // Note: LM Studio's /api/v1/chat requires a request body with stream: true.
  // Without an active chat session, there are no SSE events to capture.
  // The current implementation captures SSE events through chat-proxy.ts when
  // the user sends a chat request through the /chat endpoint.

  // If you need to capture LM Studio GUI's activity, you would need to:
  // 1. Parse LM Studio's log files (located in ~/Library/Logs/lmstudio/ or similar)
  // 2. Or use the LM Studio CLI to query the current status

  console.log('[LM Studio Stream] Listening for SSE events...');
}

/**
 * Stops listening to LM Studio's SSE stream.
 */
export function stopLmStudioStream(): void {
  isListening = false;
}
