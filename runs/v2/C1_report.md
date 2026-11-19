# C1 覆蓋檢查報告｜run v2

---

## C1 覆蓋檢查｜run v2｜第 1 輪
狀態：PASS（0 個問題）

檢查方式：以 shell 計數每個本次相關頁的 `[事實]`／`[範例]`／`[推導]` 標籤；以 `tools/lint.py` 確認頁面清單與公式卡；公式卡內容與 `[推導]` 對應的測試編號人工逐條核對。對照表見 `runs/v2/coverage_map.md`。

檢查對象：分支 `run-v2`，N1 commit 之後的狀態；`wiki/` 與 `75a35ef` 相同，所以下方表 A、表 B 的數字與 run v1 C1 第 1 輪相同（本輪以 shell 重新計數、重新列出全部 `[推導]` 行核對過，沒有差異）。

| # | 通過條件 | 結果 | 依據 |
|---|---|---|---|
| C1-1 | 所有標記「本次相關」的頁面都存在 | 通過 | §2.4 的 21 個本次相關頁全部存在；`tools/lint.py` 第 9 項：missing none（expected 27，含延伸頁） |
| C1-2 | 每個相關頁至少有 1 條 `[事實]` 或 `[範例]` | 通過 | 見下方表 A；最少的是 put-call-parity（1 條事實） |
| C1-3 | 公式卡 F01–F17 全部存在，且有出處或完整推導 | 通過 | 12 張 `[事實]` 卡都有出處行；5 張 `[推導]` 卡（F06、F07、F08、F09、F17）所在頁都有「## 推導」區塊並寫出逐步推導；lint 第 6 項無重複、無跳號、無未登記 |
| C1-4 | 每個 `[推導]` 都列在 C3 的測試清單中 | 通過 | 見下方表 B：19 條 `[推導]`（14 條主張、5 張公式卡）都對應到 C3-1～C3-10 中的至少一項 |

### 表 A：本次相關頁的主張數

| 頁 | 事實 | 範例 | 觀點 | 推導 |
|---|---|---|---|---|
| call-put-option | 16 | 3 | 0 | 0 |
| strike-maturity-moneyness | 13 | 7 | 0 | 0 |
| payoff-diagram | 8 | 4 | 0 | 0 |
| black-scholes-model | 15 | 0 | 0 | 0 |
| bs-assumptions-limitations | 16 | 0 | 5 | 0 |
| put-call-parity | 1 | 0 | 0 | 2 |
| implied-volatility | 20 | 1 | 0 | 0 |
| iv-inversion-algorithm | 5 | 0 | 0 | 5 |
| volatility-smile-skew | 12 | 3 | 0 | 0 |
| volatility-term-structure | 6 | 3 | 0 | 0 |
| why-skew-exists | 4 | 0 | 7 | 0 |
| volatility-surface | 9 | 0 | 0 | 0 |
| svi-parameterization | 17 | 1 | 0 | 0 |
| no-arbitrage-surface | 11 | 1 | 0 | 1 |
| vega | 6 | 0 | 0 | 3 |
| structured-note-architecture | 16 | 2 | 0 | 0 |
| eln-simplified | 12 | 2 | 2 | 8 |
| estimated-value-vs-issue-price | 18 | 2 | 0 | 0 |
| issuer-credit-risk | 13 | 0 | 0 | 0 |
| liquidity-risk | 15 | 0 | 1 | 0 |
| common-misconceptions | 20 | 2 | 3 | 1 |

（推導欄的計數包含公式卡標題上的 `[推導]` 標籤。）

### 表 B：`[推導]` → C3 測試

| 位置 | 內容 | C3 測試 | 測試編號寫在哪裡 |
|---|---|---|---|
| put-call-parity 主張 | C − P = S − Ke^(−rT) | C3-1 | 主張本身 |
| F06 | Put-call parity | C3-1 | 公式卡出處行 |
| vega 主張 1 | call、put vega 相同，為 S n(d₁)√T | C3-5 | 主張本身 |
| vega 主張 2 | F07 恆正，價格隨 σ 嚴格遞增 | C3-3 | 主張本身 |
| F07 | BS vega | C3-5 | 公式卡出處行 |
| iv-inversion-algorithm 主張 1 | 反推＝解 C_BS(σ) = C_mkt | C3-4 | 主張本身 |
| iv-inversion-algorithm 主張 2 | 遞增 → 唯一解、可用二分法 | C3-3、C3-4 | 主張本身 |
| iv-inversion-algorithm 主張 3 | 市價須在上下界之間 | C3-2 | 主張本身 |
| iv-inversion-algorithm 主張 4 | Newton 法 | C3-4 | 主張本身 |
| no-arbitrage-surface 主張 | 示意參數滿足 F16 | C3-6、C3-7、C3-8 | 主張本身 |
| eln-simplified 主張 1 | 到期報償＝F08 | C3-9 | 主張本身 |
| eln-simplified 主張 2 | 部位＝零息債券＋賣出 N/K 單位 put | C3-9（F08 的兩項）、C3-10（F09 對這兩項定價） | **未寫**（見判定說明 1） |
| eln-simplified 主張 3 | 理論價值＝F09 | C3-10 | 主張本身 |
| eln-simplified 主張 4 | 公平票息＝F17 | C3-10（§5 C3-10 明列 F17） | **主張未寫**，F17 公式卡出處行有寫（見判定說明 1） |
| eln-simplified 主張 5 | σ 越高，公平票息越高 | C3-10 | 主張本身 |
| F08 | 簡化 ELN 到期報償 | C3-9 | 公式卡出處行 |
| F09 | 簡化 ELN 理論價值 | C3-10 | 公式卡出處行 |
| F17 | 公平票息 | C3-10 | 公式卡出處行 |
| common-misconceptions 主張 | 高出無風險利息的票息來自賣 put 權利金 | C3-10 | 主張本身 |

（iv-inversion-algorithm 第 5 行的「閱讀提醒」是說明文字，不是主張，不計入。）

### 判定說明

1. **C1-4 的判定粒度**：C1-4 問的是「每個 `[推導]` 是否被 C3 的測試清單涵蓋」，本報告以此判定，兩條都涵蓋，所以通過。
   但 `AGENTS.md` §4.2 另外要求「`[推導]` 必須……寫出對應的 C3 測試編號」，eln-simplified 主張 2、主張 4 這兩條在主張行內沒有寫測試編號（主張 4 的編號只寫在 F17 公式卡上）。
   這是 wiki 格式規則，不屬於 C1 的通過條件，依「每輪只修報告列出的問題」本輪不修改 wiki；記錄在此供 Itzel 決定是否在下一次 lint 處理。
   （run v1 結案後已在 `052cb17` 補上；v2 的 wiki 還原到 `75a35ef`，所以這兩條在 v2 又回到未寫編號的狀態。依 §8，v2 不沿用 v1 執行中對 wiki 的修改，本輪同樣不修。）
2. **payoff-diagram 狀態為「草稿」**：C1 沒有要求頁面狀態為「完整」；它有 8 條事實、4 條範例，C1-2 通過。

### 這次檢查沒有涵蓋的部分

- C1 不檢查推導本身是否正確；推導正確性由 C3 驗證。`tools/precheck_formulas.py`（不是 C3）在 run-v2 分支重新執行：全部通過，僅供參考。
- 主張與來源原文是否相符屬於 C0 範圍；`tools/check_quotes.py` 在 run-v2 分支重新執行：468 條主張、407 段短引、0 個問題（13 份來源都有比對）。

### 跳轉

C1 通過 → N2。

---

## C1 覆蓋檢查｜run v2｜第 2 輪
狀態：PASS（0 個問題）

檢查對象：commit `0171775`（N1 r2：依 C2-v2-r1-01～13 在 `glossary.md` 補 13 個術語，`log.md` 記一筆 `update`）。

依 §4 graph，N1 之後經 C1 再到 N2，所以重跑 C1。自第 1 輪以來 `wiki/` 只改了 `glossary.md` 與 `log.md`（`git diff --stat 864d61c 0171775 -- wiki/`），兩者都不是 C1-1～C1-4 檢查的對象。

| # | 通過條件 | 結果 | 依據 |
|---|---|---|---|
| C1-1 | 所有標記「本次相關」的頁面都存在 | 通過 | `tools/lint.py` 第 9 項：missing none |
| C1-2 | 每個相關頁至少有 1 條 `[事實]` 或 `[範例]` | 通過 | concepts／products／risks 頁沒有變動，表 A 不變 |
| C1-3 | 公式卡 F01–F17 全部存在，且有出處或完整推導 | 通過 | `tools/lint.py` 第 6 項：無重複、無跳號、無未登記 |
| C1-4 | 每個 `[推導]` 都列在 C3 的測試清單中 | 通過 | `[推導]` 所在頁沒有變動，表 B 不變 |

另外確認：`tools/lint.py` 的 glossary 排序檢查 98 列、沒有順序錯誤、沒有重複英文名稱；glossary 的連結都有效；log.md 23 筆標題格式都正確。

### 跳轉

C1 通過 → N2（修 C2-v2-r1-14，並更新術語表的 glossary 欄）。
