# C5 呈現檢查報告｜run v2.1

---

## C5 呈現檢查｜run v2.1｜第 1 輪
狀態：**PASS**（0 個問題）

檢查對象：`slides/index.html`、`slides/assets/deck.css`、`slides/assets/deck.js`、`slides/assets/surface3d.js`（commit `89ccf56`）
檢查方式：
- 自動：`runs/v2.1/c5_capture.mjs`，由 `runs/v2/c5_capture.mjs` 複製。字數、要點、圖片、字級、KaTeX、水平捲動的判定邏輯，以及 TOOL_TESTS、截圖流程都不變（`GRAPH_SPEC.md` §8「v2.1 的做法」）。v2.1 只改了四處：
  1. 輸出路徑改為 `runs/v2.1/`。
  2. Chrome 改用 SwiftShader，讓無頭瀏覽器支援 WebGL（three.js 曲面）。
  3. 字級量測略過 WebGL canvas：曲面上不畫文字，軸的說明改為 HTML 圖例，由一般文字的字級規則管。
  4. 新增 `style.md` v2 的兩項檢查：宋體只用於字重 ≥ 700（§3）；曲面高度與 `LabSVI.impliedVol` 一致（§7.4）。

  開啟方式同 v2：本機靜態伺服器、1440 寬與 390 寬（mobile = true）逐頁檢查。結果在 `runs/v2.1/c5_results.json`。
- 手動：逐張目視截圖（1440、390）；在內建瀏覽器重新讀出狀態燈與測驗文字（見「程序紀錄」）。

| # | 通過條件 | 結果 | 依據 |
|---|---|---|---|
| C5-1 | 瀏覽器實際開啟，console 沒有錯誤 | 通過 | 兩種寬度、19 頁、Technical Note 展開與工具操作過程中，console 錯誤／警告 0 筆；three.js 與 WebGL 正常建立（S01、S12 各 1 個 WebGL canvas） |
| C5-2 | 所有圖片都能載入 | 通過 | 簡報沒有 `<img>`；圖表全由 SVG、canvas、WebGL 程式繪製。`slides/assets/` 的 deck.css、deck.js、surface3d.js 與 `../lab/*.js` 都以相對路徑載入成功 |
| C5-3 | 每頁主文 ≤ 120 中文字、≤ 5 要點 | 通過 | 依 `style.md` §12。兩種寬度相同，每頁字數與要點數與 v2 完全一致（`slides.md` 沒有修改）：最多 S10 115 字；S17、S19 各 5 點 |
| C5-4 | LaTeX 正確顯示 | 通過 | 6 頁共 117 個 KaTeX 元素（與 v2 相同），`.katex-error` 0 個；Technical Note 展開截圖 `*_1440_tn.png` 目視無紅字 |
| C5-5 | 互動工具改變輸入時輸出更新，數值與 lab/ 一致 | 通過 | 見下表。21 組輸入，加上 S12、S18 與兩個曲面的高度檢查，畫面數值與直接呼叫 lab/ 函式完全相同 |
| C5-6 | 1440 與 390 寬不破版 | 通過 | 兩種寬度 19 頁皆沒有水平捲動；SVG 內文字實際字級最小 1440 寬 12px、390 寬 11.6px（`style.md` §4：≥ 11px）；目視截圖無重疊溢出 |
| C5-7 | 每頁截圖存到 runs/v2.1/screenshots/ | 通過 | 19 頁 × 2 種寬度，加上 6 張 Technical Note 展開，共 44 張 |

### C5-5 工具比對（摘自 c5_results.json）

| 頁 | 工具 | 輸入組數 | 結果 |
|---|---|---|---|
| S01 | A 曲面（只旋轉） | 41 × 20 網格 | WebGL 建立成功；網格 k ∈ [−0.5, 0.5]、t ∈ [0.1, 2]；曲面高度所用的 Z 與 `impliedVol(k, t)` 的最大差 0 |
| S04 | 損益滑桿 | 4（call／put × 買方／賣方） | 到期價值與 `callPayoff`／`putPayoff`、損益與 `buyerProfit`／`writerProfit` 一致；狀態燈依序為價內、價內、價外、價平，正確 |
| S06 | B 定價器 | 3 | call／put 與 `bsCall`／`bsPut` 一致（4 位小數） |
| S07 | B 反推 | 4 | 二分法、Newton 法的 σ̂ 與 `impliedVolBisection`／`impliedVolNewton` 一致；市價超出上界時顯示「無解」 |
| S09 | A 切面（固定到期日） | 2 | 低／高履約價端讀數與 `impliedVol` 一致 |
| S10 | A 切面（固定價平） | 1 | 短期／長期端讀數與 `impliedVol` 一致 |
| S12 | A 完整 | 41 × 20 網格 | 曲面高度與 `impliedVol` 最大差 0；F14、F15、F16 三燈依序為無套利、無套利、成立；切換到兩種切面時圖有更新（各 2 條路徑） |
| S13 | B（拉 σ） | 3 | call、put、vega（每 1 百分點）與 `bsCall`、`bsPut`、`vegaPerPoint` 一致 |
| S15 | D ELN | 4 | C*、本金利息、put 權利金、理論價值 V 與 `elnFairCoupon`、`elnFairCouponParts`、`elnValue` 一致 |
| S18 | 測驗 | 6 題 | 選正解後 6 題都顯示答對，計分 6 / 6；各目標答對情形為 L1 1/1、L2 1/1、L3 2/2、L4 2/2 |

### style.md v2 的檢查（依 `GRAPH_SPEC.md` §8，不符時列為 C5 版面問題）

| 項目 | 結果 |
|---|---|
| §3 宋體只用於字重 ≥ 700 | 通過：兩種寬度 19 頁，字重 < 700 而字體堆疊第一個是宋體的文字元素 0 個 |
| §7.4 曲面高度只來自 `LabSVI.impliedVol` | 通過：見上表 S01、S12；`surface3d.js` 只呼叫 `LabSVI.impliedVol`，沒有其他公式 |
| §1.2 頁型 | 通過：19 頁的 `data-ptype` 與 §1.2 對照表一致（S18 為全寬變體） |
| §2.6 對比 | 通過：使用的文字顏色組合都是 §2.6 已計算的組合；淺色頁的小字金色用 `--gold-ink` |
| §8 動畫 | 通過：曲面在沒有操作時緩慢自轉、拖曳即停；`prefers-reduced-motion` 時關閉動畫與自轉 |

### 程序紀錄

- `c5_results.json` 中狀態燈、測驗目標等中文字串顯示為亂碼。v2 的 `runs/v2/c5_results.json` 也一樣，是腳本取回字串時的編碼問題，不影響判定。所以這些文字另外在內建瀏覽器重新讀出（S04 四組、S12 三燈、S18 目標統計），結果記在上表。
- N5 撰寫期間，Claude 用同一支 `runs/v2.1/c5_capture.mjs` 先跑過一次（未 commit 的工作版本），結果 0 個問題。之後在 N5 commit 前只改了一處：宣言大標題加上 `text-wrap: balance`，避免 S13、S19 的長標題在最後只剩一兩個字換行。這是目視調整，不是腳本抓到的問題。

### 觀察（不計入問題）

- `style.md` 沒有涵蓋、沿用最接近元件的地方（依 `style.md` 檔首）：
  - S01 封面的 6 個名詞放在可收合的「本頁名詞」（比照講者備註的收合元件）。
  - 各頁保留 v2 的頁尾（Wiki 頁與來源），放在章節分頁列上方。
- S04 的工具在 1440 寬時，圖窗格約佔面板的 40%，圖偏小但可讀；工具面板的三窗格比例沿用 v2。
- 封面在桌機版時，曲面位於右側約 72% 的範圍，S01 第 4 點「右圖由程式依示意參數產生」與畫面一致；手機版曲面在文字上方，情況同 v1、v2（`docs/agents-md-decisions.md` §11.3）。
- 自動截圖用 SwiftShader 軟體算圖，曲面的光影會比實際 GPU 算圖略平；實際瀏覽器（內建瀏覽器）中顯示正常。
