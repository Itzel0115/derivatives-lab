# S1｜選擇權的特性與風險（Characteristics and Risks of Standardized Options）

> 美國選擇權市場依 SEC 規定編製、券商必須交付給投資人的選擇權揭露文件（俗稱 ODD），說明上市選擇權的條款、用語與主要風險。

## 來源資料

| 欄位 | 內容 |
|---|---|
| 來源 ID | S1 |
| 標題 | Characteristics and Risks of Standardized Options |
| 作者／機構 | 美國各選擇權交易所與 The Options Clearing Corporation（OCC）共同編製 |
| 發布日期 | June 2024 版 |
| URL | https://www.theocc.com/components/docs/riskstoc.pdf |
| 取得日期 | 2026-11-18 |
| 原始檔路徑 | `raw/s1-occ-characteristics-risks.pdf`（96 頁） |
| SHA-256 | `8325c286c06acdd7ac871874c9b071a123bac83a5baf678bc79bb19cd20e6a49` |
| 是否 commit | 否，只留本機（版權頁標示 All rights reserved） |
| 取得狀態 | `ok`（網站有機器人驗證，由 Itzel 手動下載） |

**頁碼換算**：本 wiki 引用 S1 時一律使用頁面底部的印刷頁碼。PDF 頁序＝印刷頁碼＋2（例：印刷 p.61 是 PDF 第 63 頁）。

## 來源重點摘要

- `[事實]` 本文件只涵蓋 OCC 發行的選擇權。（S1, p.3）
  > "This document relates solely to options issued by The Options Clearing Corporation (OCC)"
- `[事實]` 本文件依 SEC Rule 9b-1 編製，目的是簡要說明選擇權的特性與風險，不是公開說明書。（S1, p.87）
  > "This document has been prepared by the U.S. options markets for distribution pursuant to the requirements of SEC Rule 9b-1"
- `[事實]` 本文件不構成投資建議，也不是買賣任何選擇權的推薦或要約。（S1, p.87）
  > "Nothing in this document should be construed as furnishing investment advice or as being a recommendation, solicitation or offer to buy or sell any option"
- `[事實]` 文件中的範例都是假設數值，不代表實際成交價格。（S1, p.89）
  > "All examples in this document are based on hypothetical values that are not necessarily indicative of the prices in an actual transaction."
- `[事實]` 為了簡化，文件中的範例不計稅負、交易成本與保證金。（S1, p.58）
  > "for the sake of simplicity, the examples in this document do not take these matters into account"

章節結構：I 導論（p.3–5）、II 用語（p.6–17）、III 股票選擇權（p.18–23）、IV 指數選擇權（p.24–34）、V 債務與信用違約選擇權（p.35–43）、VI 外匯選擇權（p.44–51）、VII 彈性條款選擇權（p.52–54）、VIII 履約與交割（p.55–57）、IX 稅、交易成本與保證金（p.58–59）、X 主要風險（p.60–86）、XI 本文件的範圍與限制（p.87–89）。

## 由本來源支撐的 wiki 頁

- [[call-put-option|買權與賣權]]
- [[strike-maturity-moneyness|履約價、到期日與價內外]]
- [[payoff-diagram|到期價值與損益]]
- [[implied-volatility|隱含波動率]]（2026-11-18 於 S2 ingest 時建立，引用 p.12、p.15、p.27）
- [[bs-assumptions-limitations|Black-Scholes 的假設與限制]]（引用 p.12）
- [[why-skew-exists|為什麼會有偏斜]]（引用 p.26）
- [[iv-inversion-algorithm|隱含波動率的反推演算法]]（引用 p.15）
- [[glossary|術語表]]

## 可支撐其他頁的主張

以下主張對應的頁面尚未建立（主要來源是其他份），先記在這裡，等那些頁建立時再引用。

### 波動率與權利金（供 implied-volatility、black-scholes-model、bs-assumptions-limitations）

- `[事實]` 影響權利金的因素之一，是市場參與者各自對標的未來波動率的估計。（S1, p.12）
  > "the individual estimates of market participants of the future volatility of the underlying interest"
- `[事實]` 其他條件相同時，標的波動越大，選擇權權利金越高。（S1, p.15）
  > "options on more volatile interests command higher premiums than options on less volatile interests"
- `[事實]` 權利金不一定符合任何理論定價公式。（S1, p.12）
  > "Readers should not assume that options premiums will necessarily conform or correlate with any theoretical options pricing formula"
- `[事實]` 利率上升通常使 call 權利金上升、put 權利金下降。（S1, p.15）
  > "Increases in prevailing interest rates tend to cause higher premiums for calls and lower premiums for puts"
- `[事實]` 股票選擇權一般不因普通現金股利而調整條款。（S1, p.18）
  > "As a general rule, no adjustment is made for ordinary cash dividends or cash distributions."

### 隱含波動率指數（供 implied-volatility、volatility-smile-skew）

- `[事實]` 隱含波動率指數反映的是對標的未來波動率的預測，這個預測是從選擇權目前的權利金推出來的。（S1, p.27）
  > "An implied volatility index reflects predictions about the future volatility of the reference interest as those predictions are implied by reported current premium values for options on the reference interest."
- `[事實]` 估計隱含波動率的方法不只一種，不同方法可能得到不同的估計值。（S1, p.27）
  > "There are various methods of estimating implied volatility, and different methods may provide different estimates."
- `[事實]` 標的實際實現的波動率不一定符合隱含波動率的預測。（S1, p.27）
  > "The realized volatility of the reference interest may not conform to those predictions."
- `[事實]` 以股票為基礎的波動類指數，歷史上傾向和其參考指數反向變動，但這個關係不一定成立。（S1, p.26）
  > "Variability indexes based on equity securities have historically tended to move inversely to their reference indexes"

### 賣出 put 的風險（供 eln-simplified、common-misconceptions）

- `[事實]` 賣出 put 的人承擔標的價格下跌的風險，最壞情況是跌到零。（S1, p.65）
  > "The writer of a put bears the risk of a decline in the price of the underlying interest--potentially to zero"
- `[範例]` XYZ 股價 $50 時，投資人賣出一口 XYZ 50 put，收到權利金 $300（每股 $3）。之後股價跌到 $40 並被指派履約，她必須以 $50 買進股票；扣掉每股 $3 權利金後有效成本是 $47，仍遠高於 $40 的市價。（S1, p.65）
- `[事實]` 現金擔保賣出 put（cash-secured put）：賣方把等於履約價的現金存在券商，就不必再繳保證金，但標的下跌時仍會虧損。（S1, p.65）
  > "a cash-secured put writer is still subject to a risk of loss if the value of the underlying interest declines"
- `[範例]` 投資人賣出一口剩六個月到期的 XYZ 50 put，收到權利金 $500，並把 $5,000 存在券商買國庫券，六個月可賺利息 $250。若到期前沒有被指派，總報酬是 $750（權利金 $500＋利息 $250）。若 XYZ 股價跌破 $42-1/2 且被指派，她會有淨損失。（S1, p.66）

### 槓桿範例（供 common-misconceptions）

- `[範例]` 投資人 A、B、C 各有 $5,000，XYZ 股價 $50。A 買 100 股；B 花 $500 買一口 XYZ 50 call（每股權利金 $5），其餘 $4,500 放在年利率 3.25% 的無風險投資，六個月約賺 $73 利息；C 把 $5,000 全部買 10 口 XYZ 50 call。六個月後到期時的損益如下。（S1, p.61）

  | 到期時 XYZ 股價 | A 損益 | A 報酬率 | B 損益 | B 報酬率 | C 損益 | C 報酬率 |
  |---|---|---|---|---|---|---|
  | 62 | + 1,200 | + 24% | + 773 | + 15.5% | + 7,000 | + 140% |
  | 58 | + 800 | + 16% | + 373 | + 7.5% | + 3,000 | + 60% |
  | 54 | + 400 | + 8% | -27 | - 0.5% | - 1,000 | - 20% |
  | 50 | 0 | 0 | -427 | - 8.5% | - 5,000 | - 100% |
  | 46 | - 400 | -8% | -427 | - 8.5% | - 5,000 | - 100% |
  | 42 | - 800 | - 16% | -427 | - 8.5% | - 5,000 | - 100% |
  | 38 | - 1,200 | - 24% | -427 | - 8.5% | - 5,000 | - 100% |

  （此表已對照 PDF 第 63 頁原圖逐格核對。）

## 來源衝突紀錄

無。

## 本來源沒有的內容

- 沒有以符號寫成的損益公式（只有文字定義），也沒有任何損益圖。
- 沒有提到 put-call parity。
- 沒有使用 moneyness 一詞，也沒有使用 S、K、T 等符號。
