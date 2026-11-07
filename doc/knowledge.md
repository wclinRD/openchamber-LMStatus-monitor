# OpenChamber LM Studio Monitor Extension 知識筆記

## 1. 專案結構概覽

此專案是 OpenChamber 的擴充套件（Extension），用來監控系統資源與 LM Studio 狀態。

```
openchamber-LMStatus-monitor/
├── package.json        # 擴充套件設定（manifest）、版本、建置腳本
├── scripts/build.ts    # 使用 esbuild/bun 建置
├── src/
│   ├── shared/         # 跨模組共用型別、格式化、樣式、client 等
│   │   ├── snapshot.ts # 核心資料結構（Snapshot）
│   │   ├── client.ts   # 與 service 通訊、polling 邏輯
│   │   ├── format.ts   # 格式化工具（bytes、percent、time）
│   │   ├── style.ts    # 共用 CSS
│   │   └── dom.ts      # DOM 工具
│   ├── service/        # 本地 Node 服務（在 OpenChamber 啟動的子程序中執行）
│   │   ├── main.ts     # HTTP 服務入口（/snapshot, /stop, /chat, /lm-studio-events, /log-status）
│   │   ├── sampler.ts  # 彙整系統資訊與 LM Studio 狀態，產出 Snapshot
│   │   ├── sources.ts  # 跨平台行程資訊來源
│   │   ├── tree.ts     # 行程樹建構與分類
│   │   ├── lmstudio.ts # LM Studio API（/api/v0/models, /api/v1/models）
│   │   ├── chat-proxy.ts # OpenChamber chat 請求轉發至 LM Studio 並擷取 SSE
│   │   ├── lm-studio-log-parser.ts # 從 lms CLI 或 log 檔解析 prefill/generate/tokens/s
│   │   ├── lm-studio-stream.ts     # SSE 相關工具
│   │   └── lm-studio-events.ts     # 推播 LM Studio 事件給 SSE clients
│   ├── panel/          # Rail Panel UI（完整資源監控面板）
│   │   └── main.ts
│   └── status/         # Work Status Panel UI（簡短狀態欄）
│       └── main.ts
├── panel/main.js       # 建置產出
├── status/main.js
└── service/main.js
```

## 2. 架構設計重點

### 2.1 雙 UI + 本地服務
- **Service**：由 OpenChamber 啟動，監聽在 `127.0.0.1` 上，透過 `OPENCHAMBER_SERVICE_PORT` 和 `OPENCHAMBER_SERVICE_TOKEN` 驗證。負責讀取系統資訊、與 LM Studio 通訊。
- **Panel**：Rail Panel，顯示詳細資訊（系統、OpenChamber 行程樹、Dev Servers、LM Studio 完整資訊）。
- **Status**：Work Status 區塊，顯示精簡的即時狀態。
- 兩個 UI 都透過 `@openchamber/sdk` 的 `connectHost()` 取得 host 實例，並用 `host.serviceRequest()` 呼叫 service。

### 2.2 Snapshot 設計
`src/shared/snapshot.ts` 定義所有 UI 共用的資料結構。Service 負責產出，UI 負責渲染。

關鍵結構：
- `Snapshot`：最上層，包含 `system`, `app`, `outside`, `servers`, `history`, `warnings`, `lmStudio`
- `LmStudioStatus`：LM Studio 狀態，包含 `modelName`, `state`, `prefillProgress`, `generateTokens`, `tokensPerSecond`, `prefillTokensPerSecond`, `models` 等
- `LmStudioModelDetail`：單一模型的詳細資訊（來自 `/api/v0/models` 和 `/api/v1/models` 合併）

### 2.3 行程樹與資源監控
- `sampler.ts` 每 2 秒採樣一次（`SAMPLE_INTERVAL_MS = 2000`）
- `tree.ts` 根據 `process.ppid` 建構樹，找出 OpenChamber 子樹、OpenCode、終端機等
- CPU 計算需兩次採樣才能算出百分比（Activity Monitor 風格，每核心 100%）
- 記憶體為 Resident Memory（RSS）
- 只在 panel/status 可見時才持續採樣，20 秒無請求就會自動停止以節省資源

## 3. LM Studio 整合方式

### 3.1 模型資訊
- **雙 API 合併**：同時呼叫 `GET /api/v0/models` 和 `GET /api/v1/models`，用 `id`/`key` 對應合併
- **優先順序**：以 `/api/v1/models` 的較完整資訊為主（`display_name`, `params_string`, `size_bytes`, `quantization.bits_per_weight`, `capabilities` 物件結構）
- **顯示策略**：標題用 `displayName`，只顯示已載入模型清單，已載入模型標題用較淡的顏色

### 3.2 即時推論狀態（prefill/generate）
有兩條路徑，`sampler.ts` 會選擇較新/較活躍的來源：

**路徑 A：Chat Proxy（透過 OpenChamber chat）**
- 檔案：`src/service/chat-proxy.ts`
- 監聽 LM Studio `/api/v1/chat` 的 SSE 事件：`chat.start`, `prompt_processing.start/progress/end`, `message.delta`, `reasoning.delta`, `chat.end`
- 在 `message.delta` 時累加 token 計數並計算即時 `tokens/s`（平滑處理）
- 在 `chat.end` 拿 `result.stats.total_output_tokens` 做校正並算平均 `tokens/s`
- 只在使用者透過 OpenChamber 的 `/chat` 且目標是已載入的 LM Studio 模型時才會觸發

**路徑 B：Log Parser（直接用 LM Studio GUI）**
- 檔案：`src/service/lm-studio-log-parser.ts`
- 優先使用 LM Studio CLI `lms log stream --source server --json`
- 找不到 CLI 則退回讀取 `~/.lmstudio/server-logs/YYYY-MM/*.log`（每秒輪詢最新 log 檔）
- 從 log 中解析 `Prompt processing progress: XX%`、`Generated packet` 等關鍵字
- 從 log 中嘗試抓取 `tokens/s`、`Prompt eval rate`、`Processed X tokens in Y seconds` 等資訊
- 記錄 `lastLogUpdateAt` 判斷是否近期有活動，避免誤用舊的 proxy 快取值

**彙整邏輯（sampler.ts）**
```ts
const logActive = hasRecentLogActivity(15000);
// log 近期有活動就優先用 log parser 的值
// 避免用 `||` 偷用舊的 chat-proxy 值
```

### 3.3 tokens/s 計算
- **Generate**：用「累計 token 數 ÷ 從第一顆生成 token 起到現在的秒數」計算平均速度（`generateStartAt`），prefill 時間不列入；chat-proxy 的 delta 瞬時速度作為過渡值。結束時用 `chat.end` 的總 token 數校正。Log parser 也會嘗試從 log 計算。
- **Prefill**：從 log 解析速度資訊（`tokens/s`、`Prompt eval rate`、`Processed ... tokens in ... seconds`）
- **UI 顯示**：在 generate 階段，Prefill 顯示 `100% · XXX tok/s`（如果有抓到 prefill 速度）；Generate 顯示 `XXXX tokens · XX.X tok/s`

## 4. UI 設計規範

### 4.1 Panel（Rail Panel）
- 使用卡片式設計，間距 `gap: 14px`，卡片有圓角和半透明背景
- LM Studio 卡片結構：標題（label）→ 模型名稱（大字）→ Prefill/Generate 列 → 規格摘要與 Context 同一行 → 已載入模型清單
- 已載入模型標題用較淡顏色（`lm-state-dim`）
- 模型清單只顯示已載入的模型，顯示：名稱（displayName）、規格（參數量、量化、格式、架構、大小）、能力標籤（VISION/TOOL/REASON）、狀態 pill、Context（K）、實例數（如果 > 1）

### 4.2 Status（Work Status）
- 簡短的列式設計，每行：標籤、meter（或空白）、數值
- LM Studio 相關：LLM Status、Prefill、Generate
- 已載入模型名稱用淡色

### 4.3 樣式
- 顏色來自 OpenChamber 的 `--oc-*` CSS 變數，支援明暗主題
- 使用 `font-variant-numeric: tabular-nums` 讓數字對齊
- `color-mix(in srgb, ...)` 做半透明效果

## 5. 開發流程

### 5.1 建置
```bash
bun install
bun run build   # 執行 scripts/build.ts，輸出 panel/main.js, status/main.js, service/main.js
bun run typecheck
```

`package.json` 中的版本號要更新才能在 OpenChamber 觸發擴充套件更新。

### 5.2 本地測試
- 需要在 OpenChamber 環境中安裝此擴充套件（透過 Git URL 或本地路徑）
- Service 需要 LM Studio 運行在 `127.0.0.1:1234`
- 可以用 `curl http://127.0.0.1:1234/api/v0/models` 和 `http://127.0.0.1:1234/api/v1/models` 檢查 API 回應結構

### 5.3 擴充建議
1. **擴充 Snapshot 型別**：所有新欄位都要先加到 `src/shared/snapshot.ts`
2. **Service 先處理資料**：在 `lmstudio.ts`、`sampler.ts` 等 service 端取得並正規化資料
3. **UI 再渲染**：Panel/Status 只負責顯示，不要直接打 LM Studio API
4. **跨平台考量**：`sources.ts` 處理不同作業系統（macOS/Linux/Windows）的行程資訊
5. **錯誤處理**：LM Studio 可能沒開啟、API 格式不同都要有 fallback
6. **避免誤用快取**：像 prefill/generate 這種即時狀態要注意舊值被誤用的問題（參考 sampler.ts 的 logActive 邏輯）

## 6. 常見陷阱

- **delta 計數不等於 token 數**：不要直接用 `message.delta` 次數當作 token 數，最準的是用 `chat.end` 的 `total_output_tokens`
- **log 格式因版本而異**：LM Studio 不同版本的 log 訊息可能不同，要用多種 regex pattern 去匹配
- **CLI 路徑不同**：要嘗試多個可能路徑（`~/.cache/lm-studio/bin/lms`, `~/.lmstudio/bin/lms`, PATH）
- **檔案監控不穩定**：`fs.watchFile` 是 polling，可能有延遲
- **proxy vs 直接使用**：Chat proxy 只在透過 OpenChamber 發送請求時才會更新，直接用 LM Studio GUI 要靠 log parser
- **`||` 運算子會偷用舊值**：要用明確的條件判斷（有近期活動才優先用某個來源）
- **建置產出要 commit**：這個專案把 `panel/main.js`, `status/main.js`, `service/main.js` 都 commit 進 git，OpenChamber 不會建置擴充套件

## 7. 更詳細的實作細節

### 7.1 Service HTTP API

`src/service/main.ts` 提供以下 endpoints：

| Endpoint | 方法 | 說明 |
|---|---|---|
| `/health` | GET | 健康檢查 |
| `/snapshot` | GET | 取得完整 Snapshot（需 token 驗證） |
| `/stop` | POST | 停止程序/終端機工作（需 token 驗證） |
| `/chat` | POST | Chat proxy，轉發請求到 LM Studio（僅限已載入的 LM Studio 模型） |
| `/lm-studio-events` | GET | SSE 推播 LM Studio 即時事件 |
| `/log-status` | GET | 回傳 log watcher 狀態（`method`: cli/file/none, `isWatching`, `latestLogFile`） |

認證方式：`Authorization: Bearer <OPENCHAMBER_SERVICE_TOKEN>`

### 7.2 Client 與 Polling

`src/shared/client.ts`：
- `startPolling(host, root, onSnapshot, onFailure)`：定期呼叫 `/snapshot`
- 只有在頁面可見且有尺寸時才會持續輪詢（`document.hidden` 或 `getBoundingClientRect().width === 0` 會暫停）
- 當有即時生成活動（`prefillProgress > 0` 或 `generateTokens > 0`）時，輪詢間隔會加快到 100ms
- 閒置 20 秒（`IDLE_STOP_MS`）後 service 會自動停止

### 7.3 LM Studio API 詳細欄位

**/api/v0/models** 回傳結構：
```json
{
  "data": [{
    "id": "...",
    "object": "model",
    "type": "llm" | "vlm" | "embeddings",
    "publisher": "...",
    "arch": "...",
    "compatibility_type": "mlx" | "gguf",
    "quantization": "4bit" | "Q4_K_M" | {...},
    "state": "loaded" | "not-loaded" | "loading",
    "max_context_length": 262144,
    "loaded_context_length": 200000,
    "capabilities": ["tool_use"] | {"vision": true, ...}
  }]
}
```

**/api/v1/models** 回傳結構（較完整）：
```json
{
  "models": [{
    "type": "...",
    "publisher": "...",
    "key": "...",
    "display_name": "...",
    "architecture": "...",
    "quantization": {"name": "4bit", "bits_per_weight": 4},
    "size_bytes": 17762323424,
    "params_string": "35B-A3B",
    "loaded_instances": [{"id": "...", "config": {"contextLength": 200000}}],
    "max_context_length": 262144,
    "format": "mlx" | "gguf",
    "capabilities": {"vision": true, "tool_use": true, "reasoning": false}
  }]
}
```

合併邏輯（`lmstudio.ts`）：
- 用 `v0.id` 對應 `v1.key` 或 `v1.id`
- `display_name`、`params_string`、`size_bytes` 優先用 v1
- `quantization.bits_per_weight` 優先用 v1
- `capabilities` 優先用 v1（通常是物件結構）
- `loaded_instances` 只在 v1 有的時候才會有

### 7.4 Log Parser 詳細邏輯

**findLmsCli()** 搜尋順序：
1. `~/.cache/lm-studio/bin/lms`
2. `~/.lmstudio/bin/lms`
3. `which lms`

**startCliLogWatcher**：
- 使用 `lms log stream --source server --json`
- 3 秒內沒收到輸出就 fallback 到檔案模式
- stdout 逐行解析 JSON，若解析失敗嘗試用純文字解析
- stderr 只記錄不影響主流程

**startFileLogWatcher**：
- 路徑：`~/.lmstudio/server-logs/YYYY-MM/`
- 用 `getLatestLogFile()` 找當月最新的 `.log` 檔案（按檔名排序）
- 用 `fs.watchFile` 每秒輪詢讀取整個檔案
- 從檔案尾端往前掃描找最新的 prefill 或 chat-end 事件
- 從 prefill 行之後開始計數 `Generated packet`
- 收到 chat-end 時呼叫 `resetLmStudioStats()`

**parseJsonLogLine**：
- 處理 CLI 的包裝結構：`{ timestamp, data: { type: "server.log", level, content } }`
- 偵測 `llm.prediction.output`、`llm.prediction.input`
- 從 `content` 匹配 `Prompt processing progress: X%`
- 從 `content` 匹配結束關鍵字：`Finished streaming response`, `chat completion`, `generation complete`, `Prompt processing complete`
- 從結構化 JSON 的 `stats` 提取 `outputTokens`/`total_output_tokens`/`generated_tokens`
- 嘗試匹配 tokens/s：`prompt.*tokens/s`, `prefill.*tokens/s`, `Prompt eval rate`, `Processed .* tokens in .* seconds`

### 7.5 Chat Proxy 詳細邏輯

**請求轉換**（OpenAI 格式 → LM Studio 原生格式）：
- 只代理已載入的 LM Studio 模型（透過 `/api/v0/models` 檢查）
- 將 `messages` 陣列轉換成單一 `input` 字串（優先取最後一則 user message）
- 傳遞 `temperature`, `max_tokens`, `context_length`, `store` 等參數
- 發送到 `POST http://127.0.0.1:1234/api/v1/chat` 並設定 `stream: true`

**SSE 事件處理**：
- `chat.start`：重置計數器、記錄開始時間
- `prompt_processing.start`：記錄開始
- `prompt_processing.progress`：更新 prefill 進度（0-1 轉換成 0-100）
- `message.delta`：每次 +1 計數，計算瞬時 tokens/s；`sampler.ts` 再用 `generateStartAt` 算平均速度（不含 prefill 時間），轉換成 OpenAI 格式發送給客戶端
- `reasoning.delta`：轉換成 OpenAI 的 `reasoning_content`
- `prompt_processing.end`：清除 prefill 進度
- `chat.end`：從 stats 取得 `total_output_tokens` 做校正，用總耗時計算平均 tokens/s，發送 `finish_reason: "stop"` 和 `[DONE]`

### 7.6 Panel UI 渲染細節

**LM Studio 卡片 DOM 結構**：
```js
lmCard
├── card-top (label "LM Studio")
├── lmStateValue (模型名稱或狀態)
├── lm-row (Prefill: 值)
├── lm-row (Generate: 值)
├── lmSpecContext (規格 + Context，同一行)
└── lmDetail (已載入模型清單)
```

**渲染邏輯**：
1. 找到當前模型：`models.find(m => m.id === lmStudio.modelName)`
2. 標題用 `displayName || modelName`，已載入時用 `lm-state-dim`
3. Prefill/Generate：生成中且有 tokens/s 就顯示 `XXXX tokens · XX.X tok/s`，預設顯示 tokens
4. 進入 generate 階段時若 prefill < 100 自動顯示 100%
5. 規格摘要：`paramsString · quantization/bitsPerWeight · format · sizeGB`
6. Context：`Context: loadedK / maxK` 或 `Context: maxK`
7. 模型清單：只顯示 `state === 'loaded'`，每列顯示名稱、meta（規格+能力標籤）、右側 pills（狀態、context、實例數）

**能力標籤對應**：
- `vision` 或 `capabilities.vision === true` → `VISION`
- `tool_use`/`function_calling` → `TOOL`
- `reasoning` → `REASON`

### 7.7 型別定義完整

```typescript
// src/shared/snapshot.ts
export type LmModelState = 'loaded' | 'unloaded' | 'loading' | 'error';

export interface LmStudioModelDetail {
  id: string;
  state: 'loaded' | 'not-loaded' | 'loading';
  type?: string;
  publisher?: string;
  arch?: string;
  compatibilityType?: string;
  quantization?: string;
  maxContextLength?: number;
  loadedContextLength?: number;
  capabilities?: string[] | Record<string, boolean>;
  displayName?: string;
  paramsString?: string;
  sizeBytes?: number;
  bitsPerWeight?: number;
  format?: string;
  loadedInstances?: Array<{ id?: string; config?: { contextLength?: number } }>;
}

export interface LmStudioStatus {
  modelName: string | null;
  state: LmModelState;
  prefillProgress: number;
  generateTokens: number;
  tokensPerSecond?: number;
  prefillTokensPerSecond?: number;
  logStats?: {...};
  models?: LmStudioModelDetail[];
}
```

### 7.8 建置設定

`scripts/build.ts` 使用 esbuild 建置三個檔案：
- `src/panel/main.ts` → `panel/main.js`（IIFE 格式）
- `src/status/main.ts` → `status/main.js`
- `src/service/main.ts` → `service/main.js`

`package.json` 中：
```json
{
  "main": "panel/main.js",
  "scripts": {
    "build": "bun run scripts/build.ts",
    "test": "bun test",
    "typecheck": "tsc --noEmit"
  }
}
```

OpenChamber 會根據 `package.json` 載入擴充套件，並啟動 `service/main.js` 作為本地服務。

### 7.9 除錯技巧

- 檢查 log watcher 狀態：`GET /log-status`
- 查看 LM Studio API：`curl http://127.0.0.1:1234/api/v0/models | jq`、`curl http://127.0.0.1:1234/api/v1/models | jq`
- 追蹤 log 檔案：`tail -f ~/.lmstudio/server-logs/$(date +%Y-%m)/*.log`
- 測試 CLI：`lms log stream --source server --json 2>&1 | head -20`
- 檢查 service 日誌：在 OpenChamber 的開發者工具或 console 查看 `[LM Log Parser]`, `[LM CLI Watcher]`, `[LM Stat Log]` 等訊息
