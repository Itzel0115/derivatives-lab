# AGENTS.md — Derivatives Lab Wiki 規則

> 每次工作前先讀本檔與 `GRAPH_SPEC.md`。本檔管 Wiki 怎麼寫、怎麼維護；
> `GRAPH_SPEC.md` 管簡報生成流程。兩者衝突時以 `GRAPH_SPEC.md` 為準，並停止回報衝突。
> 兩份檔案都沒有涵蓋的情況：停止並詢問，不得自行決定。

## 1. 三層架構與權限

| 層 | 位置 | agent 權限 |
|---|---|---|
| 原始來源 | `raw/` | 只能新增與讀取，不得修改或刪除既有檔案 |
| Wiki | `wiki/` | 由 agent 撰寫與維護 |
| 規則 | `AGENTS.md`、`GRAPH_SPEC.md`、`style.md` | 只有 Itzel 明確要求時才能修改 |

- 資料夾結構依 `GRAPH_SPEC.md` §1。
- Wiki 頁面只限 `GRAPH_SPEC.md` §2.4 清單，加上 `index.md`、`log.md`、`glossary.md`、`sources/` 各頁。
  需要清單以外的頁面 → STOP-SCOPE。

## 2. 檔名

- 一律小寫英文 kebab-case，副檔名 `.md`；檔名全庫不得重複（短連結靠它解析）。
- concepts / products / risks：使用 §2.4 指定的檔名，不得更改。
- 來源頁：`wiki/sources/<id>-<機構或作者>-<主題>.md`，例如 `s1-occ-characteristics-risks.md`。
- 原始檔：`raw/<與來源頁相同的主檔名>.<原副檔名>`，例如 `raw/s1-occ-characteristics-risks.pdf`。
  網頁來源存 `.html` 原檔。

## 3. 連結格式

- **Wiki 頁之間**：Obsidian 短連結，中文顯示名用別名。
  `[[implied-volatility|隱含波動率]]`、`[[s3-derman-volatility-smile|S3]]`
- **例外：`wiki/index.md` 與 `trace.md`** 一律使用標準 Markdown 相對路徑連結，
  因為助教會在 GitHub 網頁上瀏覽，這兩個入口必須能點。
  - `wiki/index.md` 內：`[隱含波動率](concepts/implied-volatility.md)`
  - `trace.md`（位於專案根目錄）內：`[隱含波動率](wiki/concepts/implied-volatility.md)`
- `slides/outline.md` 依 `GRAPH_SPEC.md` N2 使用 `[[頁名]]`。
- 連結目標必須存在；不得留下指向不存在頁面的連結。

## 4. 頁面寫法

### 4.1 語言
- 正文繁體中文；術語第一次出現時附英文，並收錄到 `glossary.md`。
- `[事實]`、`[觀點]` 類關鍵主張，在主張下方附一段來源原句短引（英文來源 ≤ 30 個英文字；
  中文來源 ≤ 50 字），用來查核翻譯有沒有失真。不得整段照抄來源。
- `[範例]` 的數字逐字照抄，不換算、不四捨五入。

### 4.2 主張格式（標籤定義依 `GRAPH_SPEC.md` §2.1）

```
- `[事實]` 隱含波動率是把市場價格代回模型反推出來的波動率。（S3, p.12）
  > "…來源原句短引…"
- `[範例]` …數字照抄…（S5, p.3）
- `[觀點]` Derman 認為 …（S3, §2）
  > "…來源原句短引…"
- `[推導]` …結論…（推導步驟見下；測試：C3-9）
```

- 每個數字、公式、關鍵主張都要有出處：`（S5, p.3）` 或 `（S4, §2）`。
- 來源沒有一般頁碼時：
  - 網頁：用文中的小標題，例如 `（S6, §Credit risk）`、`（S9, §導言）`。
  - 文件用自己的頁碼格式：照抄，例如 `（S8, p.PS-4）`。
  - 沒有印頁碼的封面或摘要頁：`（S8, §cover）`、`（S11, §Summary）`。
  - PDF 沒有印頁碼：用 PDF 頁序，並在來源頁註明。
- 每個來源頁都要有一段「頁碼說明」或「出處寫法」，寫明採用哪一種。
- `[推導]` 必須附完整推導步驟，並寫出對應的 C3 測試編號。
- 來源沒寫的內容不得憑記憶或常識補上；缺資料就留空並在頁尾「待補」列出。

### 4.3 公式卡（格式依 `GRAPH_SPEC.md` §2.2）
- F01–F09 的編號與所在頁依 `GRAPH_SPEC.md` §2.4、§2.5。
- 其他公式卡（例如 SVI）從 F10 起依序編號，新編號要登記在 `index.md` 的公式卡欄。目前已編到 F17；下一張新卡是 F18。
- 公式卡 ID 一經使用不得改號或重複使用。

### 4.4 頁面骨架

```
# 中文標題（English Title）
> 一句話摘要
（eln-simplified 等商品頁：此處放 §2.5 規定的免責標註）

## 重點主張
## 公式卡            ← 沒有就省略
## 推導              ← 沒有就省略
## ⚠ 來源衝突        ← 沒有就省略
## 相關頁面
## 來源
## 待補              ← 沒有就省略
```

- 不使用 YAML frontmatter；頁面中繼資料統一記在 `index.md`。
- 每個 concepts / products / risks 頁的「來源」區都要連回對應的來源頁。

### 4.5 來源頁（`wiki/sources/`）
必備欄位：標題、作者／機構、發布日期、URL、取得日期、原始檔路徑、SHA-256、
是否 commit 進 git、取得狀態（`ok`／`ingest-failed`＋原因）、來源重點摘要、
由此來源支撐的 wiki 頁清單。

## 5. Ingest 流程（對應 GRAPH_SPEC N0／C0）

1. 下載原檔存入 `raw/`，計算 SHA-256，更新 `raw/MANIFEST.md`。
   無法取得 → 標記 `ingest-failed`，記錄原因，不得憑記憶補內容。
2. 完整讀過來源。
3. **討論關卡（只限第一份來源）**：列出重點主張、預計新增／更新的頁面、預計的公式卡，
   等 Itzel 確認寫法與粒度後才寫入。第二份起全自動，沿用第一份確認過的寫法。
4. 建立來源頁；新增或更新 concepts / products / risks 頁；更新 `glossary.md`、`index.md`、`log.md`。
5. 執行 C0 檢查並輸出報告（不通過最多修 2 輪，依 `GRAPH_SPEC.md`）。
6. Commit。
7. **事後摘要**（每份來源都要，在對話中回報）：來源重點 3–5 條、新增頁、更新頁、
   新公式卡、新術語、發現的衝突、待補事項。

- 一次只 ingest 一份來源，一份一個 commit。
- 不在任何 run 內的 ingest：報告放 `runs/pre-run/`，log 的 run 欄寫 `pre-run`。

## 6. 來源衝突

不同來源對同一件事說法不一致時：
1. 兩種說法都保留，各附出處，寫在該頁的「⚠ 來源衝突」區塊。
2. **agent 不裁決、不選邊、不自行調和。**
3. 在 `log.md` 該筆紀錄的「衝突」欄，以及兩份來源頁中各記一筆。
4. Ingest 繼續進行；在事後摘要中提醒 Itzel 裁決。
5. Itzel 裁決前，簡報不得引用該主張。
6. 裁決後：把裁決結果與日期寫進衝突區塊，保留原本兩種說法的紀錄，並在 log 記一筆 `resolve`。

```
## ⚠ 來源衝突
- **爭點**：…
- 說法 A：…（S3, p.20）
- 說法 B：…（S9, §3）
- 狀態：待裁決 ｜ 已裁決（2026-11-20，採 A，理由：…）
```

## 7. raw/ 與著作權

- `raw/` 內既有檔案不得修改。
- 預設分類如下；ingest 時仍要逐份確認授權，**不確定就不 commit**。

| 來源 | 處理 |
|---|---|
| S6（SEC 投資人公告） | commit |
| S7（FINRA 與 SEC 聯合發布，刊登於 Investor.gov） | commit。FINRA 不是政府機關，Itzel 可改為只留本機 |
| S4（arXiv，nonexclusive-distrib 授權） | 只留本機：授權不含第三方再散布 |
| S8（EDGAR 申報文件） | 只留本機：發行機構撰寫，沒有再散布授權 |
| S1、S2、S3、S5、S9、S10、S11、S12、S13 | 只留本機（列入 `.gitignore`） |

- 上表是 2026-11-18 全部 ingest 完成後的實際結果。之後新增來源時，仍要在 ingest 時確認授權。
- S2、S5 的文件自身聲明禁止未經同意的使用；wiki 只做改寫、短引與少量範例數字（Itzel 2026-11-18 就 S2 決定，S5 比照辦理）。

- 所有來源（不論是否 commit）都要登記在 `raw/MANIFEST.md`：
  ID、檔名、URL、取得日期、SHA-256、是否 commit、授權說明。
- C0-1「`raw/` 中有原檔」以本機檔案＋MANIFEST 紀錄為準。

## 8. index.md、log.md、glossary.md

### 8.1 `wiki/index.md`
- 依 sources / concepts / products / risks 分區，每區一張表，每頁一列。
- 連結用標準 Markdown 相對路徑（§3 例外）。
- 每次新增或修改頁面都要同步更新。

| 頁面 | 摘要 | 來源 | 公式卡 | 範圍 | 狀態 | 更新 |
|---|---|---|---|---|---|---|
| [損益圖](concepts/payoff-diagram.md) | 到期損益公式 | S1 | F01, F02 | 本次相關 | 完整 | 2026-11-18 |

- 範圍：`本次相關`／`延伸`（依 §2.4）。
- 狀態：`未建立`／`草稿`（還有待補）／`完整`／`有衝突`。

### 8.2 `wiki/log.md`
- 只能往下新增，不得改寫舊紀錄。
- 標題列格式固定，方便 grep：`## [YYYY-MM-DD] <操作> | <標題>`
- 操作類型：`ingest`、`update`、`query`、`lint`、`resolve`。

```
## [2026-11-18] ingest | S1 OCC Characteristics and Risks
- run/節點：pre-run / N0
- 狀態：ok（C0 r1 PASS）
- 新增頁：call-put-option, payoff-diagram
- 更新頁：glossary
- 公式卡：F01, F02
- 新術語：履約價, 權利金
- 衝突：無
```

### 8.3 `wiki/glossary.md`
每個術語一列：中文、英文、一句話定義、出處、主要頁面。依英文字母排序。

## 9. Query

- 先讀 `index.md` 找相關頁，再讀頁面作答；答案附 wiki 頁與來源 ID。
- 只根據 wiki 回答。wiki 沒有的內容要明說「wiki 中沒有」，不得用常識補。
- 答案只在對話中回覆，**不另存新頁**；在 `log.md` 記一筆 `query`（問題、引用的頁面）。
- 若答案值得保留，只能**提議**併入既有頁面，Itzel 同意後才修改。

## 10. Lint

- 每批 ingest 結束後自動執行一次；Itzel 也可隨時要求。
- **只回報，不自動修正。** 報告存 `runs/<run-id>/lint_report.md`，並在 log 記一筆 `lint`。
- 檢查項目：
  1. 主張缺標籤或缺出處
  2. 關鍵主張缺原句短引
  3. 失效連結；`index.md`／`trace.md` 誤用 `[[ ]]`，或其他頁誤用相對路徑
  4. 沒有任何頁面連入的孤立頁
  5. `index.md` 與實際檔案不一致
  6. 公式卡 ID 重複、跳號或未登記
  7. 術語已使用但未收錄在 glossary
  8. 尚未裁決的來源衝突
  9. §2.4 清單中尚未建立的頁面
  10. 禁止內容（見 §11）

## 11. 禁止事項（與 GRAPH_SPEC §9 一致）

- 不得修改 `raw/` 中的原始檔。
- 不得放入 Bloomberg 截圖或資料、非公開實習資訊、API key、個人資料。含這類內容的公開文件原檔只能留在本機 `raw/`，不得 commit，也不得抄進 wiki（`GRAPH_SPEC.md` §9）。
- 不得使用網路圖片。
- 不得自行編造數字、來源、引言、頁碼或測試結果。
- 不得新增 §2.4 以外的頁面、§3 以外的概念或工具。
- 每輪只修檢查報告列出的問題（例外見 `GRAPH_SPEC.md` C4）。

## 12. Commit

- run 內依 `GRAPH_SPEC.md` §7.3：`[v1][N0] ingest S3`。
- run 外的 wiki 工作用 `[pre-run]` 前綴：`[pre-run][N0] ingest S1`、`[pre-run][lint] 報告`。
- 一份來源一個 commit；每輪檢查一個 commit。
