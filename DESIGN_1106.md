# Design: Prefill & Generate 資料取得方案調整 (11/06)

## 1. 目前狀況調查結果

### 1.1 目前有三套獨立狀態維護

- **`chat-proxy.ts`**：攔截 OpenAI `/chat` 轉發請求，從 LM Studio SSE (`prompt_processing.progress`、`message.delta`、`chat.end`) 取得即時數字。
- **`lm-studio-log-parser.ts`**：透過 `lms log stream --source server --json` 或直接監聽 `~/.lmstudio/server-logs/*.log`，以 regex 解析。
- **`lmstudio.ts`**：讀取 LM Studio REST `/api/v0/models`，取得模型狀態，原本嘗試使用 SSE `usage`，但已註記不再實際使用。

三套檔案各自維護 `currentPrefillProgress`、`currentGenerateTokens`、`tokensPerSecond` 等全域變數，彼此不同步。

### 1.2 sampler.ts 的優先決策邏輯冗餘且易誤導

目前 `sampler.ts` 第 220–239 行根據 `logActive` 判斷採用哪一套資料：

```ts
let prefillProgress = lmStudioBase.prefillProgress;
if (logActive) {
  prefillProgress = logPrefill;
} else if (logPrefill > 0) {
  prefillProgress = logPrefill;
} else if (proxyPrefill > 0) {
  prefillProgress = proxyPrefill;
}
```

- 若 `logActive === true`，則後面的 `logPrefill > 0` 永遠不會執行。
- 若 Log Parser 背景活躍但未產生新輸出，可能拿到過期的 log 數字。
- Generate 部分也有類似冗餘分支，且在 `logActive && logGenerate === 0 && prefillProgress === 0` 時強制設 0，容易誤殺已完成的 proxy 狀態。

### 1.3 LM Studio SSE / Log 的即時性與精確度限制

從實際 `~/.lmstudio/server-logs/2026-11/2026-11-06.1.log` 與 `lms log stream` 的觀察：

1. **Prefill 更新頻率低**：`Prompt processing progress` 大約每 3–4 秒才出現一次，並非每個 token 都輸出。即使 proxy 透過 SSE 收到 `prompt_processing.progress`，LM Studio 本身也是以低頻率發送。
2. **Generated packet ≠ token 數**：log 中只有 `Generated packet: [Sensitive]`，看不見每包實際包含多少 token。例如同一秒內可能出現 10–24 包，但無法確定是幾個 token。以包數估算 token 會產生不準確。
3. **`lms log stream --source model --filter output --json` 沒穩定輸出 JSON stats**：
   - 預設 `--source server --json` 只是包裹在 `data` 中的普通 server log，不包含 `outputTokens`、`tokensPerSecond` 等欄位。
   - `--source model --filter output --json` 在未生成時無輸出，生成時也可能不輸出期待的 JSON 格式。
4. **直接 GUI 聊天不經過 proxy**：使用者如果在 LM Studio GUI 聊天，OpenChamber 的 proxy 收不到 SSE，只能靠 log 檔案，延遲與精度更差。

### 1.4 TPS 計算容易跳動

- proxy 使用指數移動平均 (EMA)：`tps = old * 0.7 + instant * 0.3`。
- log parser 使用「自生成開始後累計 token / 秒數」，但 log 寫入速率並非真實 token 發射速度。
- 兩套數字基準不同，且 LM Studio SSE 的 `message.delta` 發送間隔不穩定，因此 TPS 數字會跳動。

---

## 2. 設計目標

1. **建立單一狀態源（Single Source of Truth）**，取代多個獨立的全域變數。
2. **明確選擇可靠資料來源**，在 Proxy 模式下以 SSE 為主，Log Parser 為背景備援。
3. **精確計算預處理與生成狀態**，減少數值跳動與過期。
4. **統一 Token 與 TPS 計算方式**，確保顯示結果與實際生成一致。

---

## 3. 方案設計

### 3.1 新增 `lm-studio-state.ts`（狀態中心）

建立一個集中管理狀態的模組，提供統一的方法更新與查詢：

```ts
export interface LmStudioRunState {
  prefillProgress: number;
  generateTokens: number;
  tokensPerSecond?: number;
  prefillTokensPerSecond?: number;
  state: 'idle' | 'prefill' | 'generate';
  lastUpdateAt: number;
  source: 'proxy' | 'log_parser' | 'rest_api';
}

export function updateFromProxy(
  prefill: number,
  generate: number,
  tps?: number,
  pps?: number
): void;

export function updateFromLog(
  prefill: number,
  generate: number,
  tps?: number,
  pps?: number
): void;

export function getLmStudioRunState(): LmStudioRunState;
export function resetLmStudioRunState(): void;
```

原則：
- 任何時候只更新這一份狀態，不另維護多套變數。
- `state` 依 `prefill` 與 `generate` 推斷：`generate > 0 ? 'generate' : (prefill > 0 ? 'prefill' : 'idle')`。
- `lastUpdateAt` 記錄最後更新時間。

### 3.2 修改 `chat-proxy.ts`

- 引入 `lm-studio-state.ts` 的 `updateFromProxy`、`resetLmStudioRunState`。
- `chat.start`：呼叫 `resetLmStudioRunState()`。
- `prompt_processing.progress`：呼叫 `updateFromProxy(Math.round(progress * 100), 0)`。
- `message.delta`：根據累積生成 token 與即時 TPS，呼叫 `updateFromProxy(100, currentGenerateTokens, computedTps)`。
- `chat.end`：若有 `stats.total_output_tokens`，以官方統計值呼叫 `updateFromProxy(100, totalOutputTokens, finalTps)`；若無，用 `updateFromProxy(100, currentGenerateTokens)`。

保留原有 `getPrefillProgress()`、`getGenerateTokens()`、`getTokensPerSecond()`，但改為讀取 `getLmStudioRunState()`，避免改變匯入 API。

### 3.3 修改 `lm-studio-log-parser.ts`

- 引入 `updateFromLog`、`resetLmStudioRunState`。
- `updatePrefillProgressFromLog(progress)` → `updateFromLog(progress, currentGenerateTokens)`。
- `updateGenerateTokensFromLog(tokens)` → 計算 TPS 後呼叫 `updateFromLog(currentPrefillProgress, tokens, computedTps)`。
- `resetLmStudioStats()` → `resetLmStudioRunState()`。

保留原有 `getPrefillProgress()`、`getGenerateTokens()`、`getTokensPerSecondFromLog()`，改為讀取 `getLmStudioRunState()`。

### 3.4 簡化 `sampler.ts` 的 LM Studio 合併邏輯

不再根據 `logActive` 作選擇，直接從狀態中心讀取最新結果：

```ts
import { getLmStudioRunState } from './lm-studio-state.ts';

const lmStudioBase = await fetchLmStudioStatus();
const runState = getLmStudioRunState();

const lmStudio = {
  ...lmStudioBase,
  prefillProgress: runState.prefillProgress,
  generateTokens: runState.generateTokens,
  tokensPerSecond: runState.tokensPerSecond,
  prefillTokensPerSecond: runState.prefillTokensPerSecond,
  state: runState.state === 'idle' ? (lmStudioBase.state as any) : runState.state,
  logStats: getLogStats(),
  requests: getActiveRequests(),
  parallel,
  activeRequestCount: getActiveRequestCount(),
};
```

- `runState.lastUpdateAt` 可用來判斷狀態新鮮度（例如超過一定時間未更新時，面板顯示提示）。
- 不需要的 `logActive` 判斷移除，減少複雜度。

### 3.5 統一 TPS 計算方式

推薦方式：**生成中時使用「累計總 token ÷ 從 `chat.start` 到當前的秒數」**。
- 優點：不會因為單次 packet 的時間差產生極端跳動。
- 可在 UI 上另外顯示「即時 TPS」作為選填，但若 LM Studio SSE 不穩定，則不建議作為主要顯示。

在 `chat-proxy.ts` 與 `lm-studio-log-parser.ts` 中：
- 收到 `chat.start` 時記錄 `chatStartAt`。
- 每次更新時計算 `totalTokens / (now - chatStartAt)`。
- 若 `totalTokens === 0`，不顯示 TPS。

### 3.6 明確重置條件

任何新 `chat.start` 時（無論從 proxy 或 log parser），都必須呼叫 `resetLmStudioRunState()`，確保舊請求不殘留狀態。

---

## 4. 預計效益

1. **無衝突顯示**：不管 proxy 還是 log parser，面板只會看到一套最後更新的數字，避免數字打架。
2. **減少延遲與誤殺**：移除了 `logActive` 冗餘判斷，不再因背景 log 活躍而錯過 proxy 的最新即時數據。
3. **提高生成狀態可信度**：以 SSE 為主、log 檔案為輔，proxy 模式下即時性接近 LM Studio 實際輸出。
4. **TPS 穩定**：以總 token / 總時間計算，降低跳動。

---

## 5. 待補強事項

- 目前 LM Studio SSE 的 `message.delta` 並不一定每 token 發送一次，可能批次輸出。
- Log 檔案的 `Generated packet` 無法精確等於 token，只能作為直接 GUI 聊天時的備援。
- 如果使用者從 LM Studio GUI 直接聊天，OpenChamber 只能仰賴 log parser，即時性較差。建議鼓勵使用者透過 OpenChamber 的 `/chat` 發送請求。

---

## 6. 修改清單建議

- [ ] 建立 `src/service/lm-studio-state.ts`
- [ ] 修改 `src/service/chat-proxy.ts`，使用 `updateFromProxy` / `resetLmStudioRunState`
- [ ] 修改 `src/service/lm-studio-log-parser.ts`，使用 `updateFromLog` / `resetLmStudioRunState`
- [ ] 簡化 `src/service/sampler.ts`，改為直接讀取 `getLmStudioRunState()`
- [ ] 更新 `src/shared/snapshot.ts` 的 `LmStudioStatus` 中不需要的欄位（如有需要）
- [ ] 更新相關測試，確保狀態重置與同步一致
- [ ] 考慮調整 Panel/Status UI，對「狀態已超過 X 秒未更新」給予提示
