# LMStatus Monitor 知識筆記

## 架構概覽
- 兩套抓取機制：Chat Proxy（僅透過 OpenChamber /chat 走 LM Studio API 時有效）與 Log Parser（直接用 LM Studio GUI 時主要靠此機制）
- `sampler.ts` 彙整資料，需避免用 `||` 偷用舊的 chat-proxy 快取值
- LM Studio 資訊與程序樹無關，需透過 HTTP API（`/api/v0/models`, `/api/v1/models`）與日誌取得

## Prefill/Generate 抓取
- 優先使用 log parser，並以「最近有更新」判斷是否活躍
- 進入 generate 階段即代表 prefill 完成，UI 顯示 prefill 為 100%
- Generate/prefill tokens/s 需從 delta、packet 或 log 關鍵字計算

## UI 調整
- Panel 加入 LM Studio 卡片，顯示 displayName、規格摘要（參數量/量化/格式/大小）、Context（已載入/最大）
- 只顯示已載入模型清單，含能力標籤與實例數
- Generate 顯示 `tokens · tok/s`，Prefill 顯示 `% · tok/s`（如有）
- 已載入模型名稱顏色較淡

## API 資訊
- `/api/v0/models`：基礎模型資訊（state, max_context_length, loaded_context_length, capabilities）
- `/api/v1/models`：較完整（display_name, params_string, size_bytes, quantization(bits_per_weight), format, capabilities 物件, loaded_instances）
