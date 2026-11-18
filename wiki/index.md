# Wiki 索引

所有 wiki 頁的清單。格式見 `AGENTS.md` §8.1；本檔連結使用標準 Markdown 相對路徑。

其他入口：[術語表](glossary.md)、[紀錄](log.md)

## Sources

| 頁面 | 摘要 | 來源 | 公式卡 | 範圍 | 狀態 | 更新 |
|---|---|---|---|---|---|---|
| [S1｜選擇權的特性與風險](sources/s1-occ-characteristics-risks.md) | OCC 與美國各選擇權交易所的揭露文件：選擇權條款、用語與主要風險 | S1 | — | 本次相關 | 完整 | 2026-11-18 |
| [S2｜Cboe 波動率指數編製方法](sources/s2-cboe-vix-methodology.md) | Cboe 的 VIX 官方方法文件：目標、計算步驟與範例 | S2 | — | 本次相關 | 完整 | 2026-11-18 |
| [S3｜波動率微笑導論：課程大綱](sources/s3-derman-volatility-smile.md) | Derman 2013 香港短期課程的 3 頁目標與大綱，沒有講義本文 | S3 | — | 本次相關 | 完整 | 2026-11-18 |
| [S4｜無套利的 SVI 波動率曲面](sources/s4-gatheral-jacquier-svi.md) | Gatheral & Jacquier：SVI 與 SSVI 參數化、靜態套利的條件 | S4 | — | 本次相關 | 完整 | 2026-11-18 |
| [S10｜黑暗中的笑聲：波動率微笑的問題](sources/s10-derman-laughter-in-the-dark.md) | Derman 2003 演講稿：微笑的出現、各市場的形狀、三類模型 | S10 | — | 本次相關 | 完整 | 2026-11-18 |
| [S11｜波動率微笑與隱含樹](sources/s11-derman-kani-smile-implied-tree.md) | Derman & Kani 1994：常數波動率假設、隱含波動率定義、skew 與期限結構、隱含樹模型 | S11 | — | 本次相關 | 完整 | 2026-11-18 |
| [S12｜風險中立定價與 Black-Scholes 公式](sources/s12-mit-18s096-black-scholes.md) | MIT 18.S096 第 19 講投影片：複製組合、BS 方程式、歐式 call／put 公式 | S12 | — | 本次相關 | 完整 | 2026-11-18 |
| [S13｜風險中立機率與 Black-Scholes](sources/s13-mit-18440-risk-neutral-black-scholes.md) | MIT 18.440 第 36 講投影片：BS 主要假設、call 公式、隱含波動率的白話定義 | S13 | — | 本次相關 | 完整 | 2026-11-18 |

## Concepts

| 頁面 | 摘要 | 來源 | 公式卡 | 範圍 | 狀態 | 更新 |
|---|---|---|---|---|---|---|
| [買權與賣權](concepts/call-put-option.md) | Call／put 定義、買方權利與賣方義務、權利金、主要風險 | S1 | — | 本次相關 | 完整 | 2026-11-18 |
| [履約價、到期日與價內外](concepts/strike-maturity-moneyness.md) | K、到期日、美式／歐式、價內價平價外、內含價值與時間價值 | S1 | — | 本次相關 | 完整 | 2026-11-18 |
| [到期價值與損益](concepts/payoff-diagram.md) | Call／put 到期價值公式與買賣雙方損益 | S1, S12 | F01, F02 | 本次相關 | 草稿 | 2026-11-18 |
| [Black-Scholes 模型](concepts/black-scholes-model.md) | 五個輸入、歐式 call／put 價格公式、模型假設 | S12, S13 | F03, F04, F05 | 本次相關 | 完整 | 2026-11-18 |
| [買賣權平價](concepts/put-call-parity.md) | C − P = S − Ke^(−rT)，由 F03、F04 推導 | S11, S12 | F06 | 本次相關 | 完整 | 2026-11-18 |
| [Black-Scholes 的假設與限制](concepts/bs-assumptions-limitations.md) | 常數波動率與對數常態假設，以及它們與市場的落差 | S1, S3, S10, S11, S12, S13 | — | 本次相關 | 完整 | 2026-11-18 |
| [波動率微笑與偏斜](concepts/volatility-smile-skew.md) | 固定到期日時，隱含波動率隨履約價變動的型態；各市場形狀不同 | S10, S11 | — | 本次相關 | 完整 | 2026-11-18 |
| [為什麼會有偏斜](concepts/why-skew-exists.md) | Derman 對偏斜成因的看法（作者觀點） | S1, S2, S10 | — | 本次相關 | 完整 | 2026-11-18 |
| [波動率曲面](concepts/volatility-surface.md) | 隱含波動率對履約價與到期日的曲面；BS 預測為平的；曲面須無靜態套利 | S10, S4 | — | 本次相關 | 完整 | 2026-11-18 |
| [SVI 參數化](concepts/svi-parameterization.md) | Raw SVI 與 SSVI 公式、參數意義；示意參數提案尚待核准 | S4, S13 | F10, F11, F12, F13 | 本次相關 | 草稿 | 2026-11-18 |
| [無套利曲面](concepts/no-arbitrage-surface.md) | 日曆價差與蝶式套利的條件；SSVI 的無套利條件與驗算 | S4, S13 | F14, F15, F16 | 本次相關 | 完整 | 2026-11-18 |
| [隱含波動率](concepts/implied-volatility.md) | 讓 BS 公式等於市價的那個波動率；VIX 是例子 | S1, S2, S11, S13 | — | 本次相關 | 完整 | 2026-11-18 |
| [隱含波動率的反推演算法](concepts/iv-inversion-algorithm.md) | 用二分法解 C_BS(σ) = 市價（自行推導）。Newton 法待 F07 | S1, S4, S11, S12, S13 | — | 本次相關 | 草稿 | 2026-11-18 |
| [波動率期限結構](concepts/volatility-term-structure.md) | 價平隱含波動率隨到期時間的變化；1993 年 S&P 500 與 VIX 計算的例子 | S2, S11 | — | 本次相關 | 完整 | 2026-11-18 |

## Products

| 頁面 | 摘要 | 來源 | 公式卡 | 範圍 | 狀態 | 更新 |
|---|---|---|---|---|---|---|

## Risks

| 頁面 | 摘要 | 來源 | 公式卡 | 範圍 | 狀態 | 更新 |
|---|---|---|---|---|---|---|
