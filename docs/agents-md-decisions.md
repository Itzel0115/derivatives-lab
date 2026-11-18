# AGENTS.md 決策紀錄

日期：2026-11-18
對象：`AGENTS.md` 第一版

本檔記錄建立 `AGENTS.md` 時問了什麼、Itzel 選了什麼，以及哪些規則和 Karpathy 的
LLM Wiki 原版（`llm-wiki.md`）不同。

## 1. 沒有問、直接沿用 GRAPH_SPEC.md 的部分

以下已在 `GRAPH_SPEC.md` §0–2 定好，`AGENTS.md` 只引用、不重新定義：

- 主張類型標籤 `[事實]`／`[範例]`／`[觀點]`／`[推導]` 與出處格式（§2.1）
- 公式卡格式（§2.2）
- 來源清單 S1–S9（§2.3）
- Wiki 頁面清單與檔名（§2.4）
- 簡化 ELN 定義與免責標註（§2.5）
- 資料夾結構（§1）

## 2. 問了什麼、選了什麼

| # | 問題 | 選項 | Itzel 的選擇 |
|---|---|---|---|
| 1 | Ingest 要不要先討論重點 | 全自動＋事後摘要／先討論再寫入／混合 | **混合**：第一份來源先討論，其餘全自動＋事後摘要 |
| 2 | Wiki 連結格式 | Obsidian 短連結／含路徑連結／標準 Markdown 相對路徑 | **Obsidian 短連結**（`[[implied-volatility\|隱含波動率]]`），外加一條自訂例外（見第 3 節） |
| 3 | Wiki 內文語言 | 繁中＋關鍵主張附英文短引／純繁中／英文為主 | **繁中＋關鍵主張附英文短引** |
| 4 | 來源說法衝突 | 並列＋標記不裁決／並列＋依優先序暫定／立即停止詢問 | **並列＋標記，不裁決** |
| 5 | log.md 與 index.md 欄位 | 完整欄位／完整＋YAML frontmatter／精簡 | **完整欄位**（不用 frontmatter） |
| 6 | raw/ 是否 commit | 公部門 commit、其餘只留清單／全部 commit／全部不 commit | **公部門 commit，其餘只留清單** |
| 7 | Query 與 Lint | 答案不存頁、lint 自動跑只回報／答案存 wiki/queries/／都只在要求時做 | **答案不存頁；lint 自動跑但只回報** |
| 8 | 檔名與規格不符 | 兩個都改名／只改 CLAUDE.md.md／都不改 | **兩個都改名**（`graph-spec.md` → `GRAPH_SPEC.md`、`CLAUDE.md.md` → `CLAUDE.md`） |

## 3. Itzel 特別要求的規則

這一條不在選項裡，是 Itzel 在回答第 2 題時自己加的：

- **`wiki/index.md` 與 `trace.md` 改用標準 Markdown 相對路徑連結**，其他 wiki 頁維持 Obsidian 短連結。
  - 理由：助教會在 GitHub 網頁上瀏覽，這兩個入口必須能點；GitHub 不會把 `[[ ]]` 變成連結。
  - 落實位置：`AGENTS.md` §3；`GRAPH_SPEC.md` N6 也加了一行註記。
  - Lint 第 3 項會檢查這兩個檔案有沒有誤用 `[[ ]]`。

## 4. Claude 自行補上、經 Itzel 確認草稿時一併同意的規則

這些不是選擇題的結果，是寫草稿時補的，草稿送審時有特別標出：

| 規則 | 位置 | 說明 |
|---|---|---|
| raw/ 授權分類比選項描述更保守 | §7 | 選項裡寫「arXiv 論文可 commit」，這不準確：arXiv 預設授權不含第三方再散布。改為只有 S6、S7 預設 commit；S4、S8 在 ingest 時確認授權，不確定就不 commit |
| F10 起的公式卡編號 | §4.3 | 規格只定了 F01–F09，SVI 公式卡沒有 ID。規定從 F10 起依序編號並登記在 index |
| `pre-run` | §5、§12 | 不屬於任何 run 的 ingest，報告放 `runs/pre-run/`，commit 前綴 `[pre-run]` |
| 短引長度上限 | §4.1 | 英文 ≤ 30 字；中文來源（S9）≤ 50 字 |
| 空白骨架檔 | — | 第一次 commit 就建立 `wiki/index.md`、`log.md`、`glossary.md`、`raw/MANIFEST.md` 的表頭 |

## 5. 和 Karpathy 原版不同的地方

| 項目 | Karpathy 原版 | 本專案 | 原因 |
|---|---|---|---|
| Ingest 參與度 | 偏好逐份討論、全程參與 | 只有第一份討論，其餘全自動＋事後摘要 | Itzel 的選擇；`GRAPH_SPEC.md` 規定人工關卡只有 H1 |
| 好答案存回 wiki | 鼓勵把 query 的答案存成新頁，讓知識累積 | 不存新頁，只能提議併入既有頁面 | `GRAPH_SPEC.md` §9 禁止新增 §2.4 以外的頁面 |
| Wiki 頁面範圍 | agent 可自由新增實體頁、概念頁 | 頁面清單固定，超出即 STOP-SCOPE | 簡報的範圍事先定好，v0／v1／v2 要用同一份 wiki 比較 |
| 來源衝突 | 由 LLM 標記矛盾並更新綜合結論 | 只並列標記，agent 不裁決，裁決前簡報不得引用 | Itzel 的選擇 |
| Lint | 找出問題，也建議新問題與新來源 | 自動執行但只回報、不自動修；不主動擴充範圍 | Itzel 的選擇；配合「只修報告列出的問題」原則 |
| 連結 | 以 Obsidian 為主，未規定格式 | 短連結為主，`index.md`、`trace.md` 例外用相對路徑 | Itzel 特別要求（助教在 GitHub 上看） |
| 主張標註 | 回答時附引用即可 | 每條關鍵主張都要有類型標籤、出處頁碼、原句短引 | `GRAPH_SPEC.md` §2.1 與 C0／C4 檢查需要逐句對照 |
| 公式 | 未提及 | 公式卡加唯一 ID，並對應到 `lab/` 程式與 C3 測試 | `GRAPH_SPEC.md` §2.2 |
| 憑記憶補內容 | 未禁止；lint 甚至建議用網路搜尋補資料 | 明確禁止，缺資料就留空並列入「待補」 | `GRAPH_SPEC.md` §2.3、STOP-DATA |
| log.md | 一行前綴加自由文字 | 沿用同樣的前綴格式，另加固定欄位（run／節點、狀態、公式卡、術語、衝突） | Itzel 的選擇 |
| index.md | 連結＋一句話摘要，中繼資料可有可無 | 表格，固定七欄 | Itzel 的選擇；C1、C6 可直接讀 index |
| YAML frontmatter／Dataview | 列為可選技巧 | 不使用 | Itzel 的選擇；避免 index 和 frontmatter 兩處不同步 |
| raw/ 與 git | 整個 wiki 就是一個 git repo，未談著作權 | 受著作權保護的原檔只留本機，另以 MANIFEST 記 URL 與 SHA-256 | repo 會公開在 GitHub Pages |
| 語言 | 未提及 | 繁中正文＋關鍵主張附原文短引 | 讀者是中文使用者，來源多為英文 |

## 6. 沿用 Karpathy 原版的部分

- 三層架構：raw（不可改）／wiki（agent 維護）／schema（`AGENTS.md`）
- `index.md` 管內容、`log.md` 管時間順序
- log 標題列用固定前綴，方便 grep
- 一次 ingest 一份來源
- Query 時先讀 index 再讀頁面
- 用 git 當版本紀錄

## 7. 第一版之後的決定

`AGENTS.md` 第一版寫入之後、到全部來源 ingest 完成為止，陸續做的決定。逐筆經過記在 `wiki/log.md`。

| 日期 | 決定 | 由誰 |
|---|---|---|
| 2026-11-18 | S2 的文件聲明禁止未經同意的複製與衍生作品；維持現行引用方式（改寫＋短引＋少量範例數字） | Itzel |
| 2026-11-18 | S3 指定網址只有 3 頁課程大綱，新增 S10–S13 補上講義內容，並修改 `GRAPH_SPEC.md` §2.3、§2.4 | Itzel 核准 Claude 找的候選 |
| 2026-11-18 | 核准 SSVI 示意參數 σ₀ = 0.20、ρ = −0.7、η = 1.0、γ = 0.5 | Itzel |
| 2026-11-18 | S8 採用規格中作為範例的那一份 424B2 | Itzel |
| 2026-11-18 | S9 採用搜尋到的 Yahoo 股市轉載文 | Itzel 確認 Claude 找的候選 |
| 2026-11-18 | 修正第一次 lint 的 L-01、L-02、L-03 | Itzel |
| 2026-11-18 | 更新 `GRAPH_SPEC.md`（七處）、`AGENTS.md`（三處）與本檔，使規則檔與 wiki 現況一致 | Itzel 核准草稿 |
| 2026-11-18 | 新增 `tools/` 資料夾，把引文比對、lint、公式卡數值預檢腳本收進 repo；`GRAPH_SPEC.md` §1 的資料夾結構同步補上 | Itzel |
| 2026-11-18 | 新增 `.gitattributes`，關閉 `raw/` 原檔的換行轉換，確保 checkout 出來的檔案與 MANIFEST 的 SHA-256 相符 | Itzel |

## 8. Claude 自行決定、尚未經 Itzel 明確同意的事項

以下做法都已在當時的事後摘要中回報，但 Itzel 沒有逐項表示同意或反對。列在這裡，方便日後檢視或推翻。

| 事項 | 做法 | 記在哪裡 |
|---|---|---|
| 新增公式卡 F17（公平票息） | 規格 §2.5 原本只有 F08、F09。因為 C3-10 要測公平票息、C3-12 要求每個函式對應公式卡，所以加了 F17。本次規則檔更新已把它寫進 §2.5 | `wiki/products/eln-simplified.md` |
| S5 的使用限制 | 比照 Itzel 對 S2 的決定處理 | `wiki/sources/s5-oic-understanding-greeks.md` |
| S7 原檔 commit 進 git | 依 `AGENTS.md` §7 的預設分類；但共同發布者 FINRA 不是政府機關 | `raw/MANIFEST.md` |
| F13 固定使用 γ = 1/2 | S4 沒有明寫 γ 的允許範圍，只在討論 γ = 1/2 的段落提出式 (4.5) | `wiki/concepts/svi-parameterization.md` |
| 反推演算法的設計參數 | 初始區間 [0.0001, 5]、容許誤差 1e-8、最大迭代 100、Newton 初始值 0.2、vega 下限 1e-8；都不是來源數字 | `wiki/concepts/iv-inversion-algorithm.md` |
| Bloomberg 來源的數據 | 一律不抄進 wiki；但含這類內容的 S8、S12 原檔留在本機 `raw/`（沒有 commit） | `runs/pre-run/lint_report.md` L-07 |

## 9. 仍待決定的事項

- `GRAPH_SPEC.md` §9 的 Bloomberg 條款要不要補充說明（lint L-07）。
