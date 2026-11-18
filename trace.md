# Trace｜run v1｜投影片 → wiki 頁 → 原始來源

> run v1 / N6 產出。依據：`slides/slides.md`（C4 第 3 輪通過，commit `11a2d3c`）與 `wiki/index.md`；成品 `slides/index.html`（C5 第 2 輪通過，commit `ccdf3df`）。
> 連結使用標準 Markdown 相對路徑（`AGENTS.md` §3），可在 GitHub 網頁上直接點選。
> 「引用的 wiki 頁」欄括號內的來源 ID：該 wiki 頁的來源（`wiki/index.md`「來源」欄）中，確實在這一頁投影片的出處括號裡出現的那些。
> 「補充」欄：C4 第 1 輪報告 §5.2 指出，這些主張在 wiki 中的對應句位於另一個頁面，但該頁沒有列在投影片的引用清單中；這裡補上，讓追溯不斷鏈。
> 自行推導的主張（出處寫成「推導：F08」等）追溯到對應 wiki 頁的推導區塊與 C3 測試，見 `runs/v1/C3_report.md`。

## 1. 逐頁追溯

| 頁 | 標題 | 引用的 wiki 頁（本頁引用的來源） | 補充：對應句所在頁 | 本頁引用的全部來源 |
|---|---|---|---|---|
| S01 | Derivatives Lab｜波動率為什麼不是一個數字？ | [波動率曲面](wiki/concepts/volatility-surface.md)（S10）<br>[隱含波動率](wiki/concepts/implied-volatility.md)（S1、S11、S13）<br>[買權與賣權](wiki/concepts/call-put-option.md)（S1）<br>[結構型商品的組成](wiki/products/structured-note-architecture.md)（S7）<br>[SVI 參數化](wiki/concepts/svi-parameterization.md)（S13） | [簡化 ELN](wiki/products/eln-simplified.md)（S1、S7、S8、S13） | S1、S7、S8、S10、S11、S13 |
| S02 | 這堂課的四個目標 | [到期價值與損益](wiki/concepts/payoff-diagram.md)（—）<br>[隱含波動率](wiki/concepts/implied-volatility.md)（S11）<br>[波動率微笑與偏斜](wiki/concepts/volatility-smile-skew.md)（S11）<br>[波動率期限結構](wiki/concepts/volatility-term-structure.md)（S11）<br>[簡化 ELN](wiki/products/eln-simplified.md)（—） | [術語表](wiki/glossary.md)（—） | S11 |
| S03 | 一張選擇權：Call／Put、K、T | [買權與賣權](wiki/concepts/call-put-option.md)（S1）<br>[履約價、到期日與價內外](wiki/concepts/strike-maturity-moneyness.md)（S1） | [術語表](wiki/glossary.md)（—）<br>[Black-Scholes 模型](wiki/concepts/black-scholes-model.md)（S12） | S1、S12 |
| S04 | 損益圖 | [到期價值與損益](wiki/concepts/payoff-diagram.md)（S1、S12）<br>[買權與賣權](wiki/concepts/call-put-option.md)（S1） | [常見誤解](wiki/risks/common-misconceptions.md)（S1）<br>[術語表](wiki/glossary.md)（—） | S1、S12 |
| S05 | 價格由什麼決定：只有 σ 看不到 | [Black-Scholes 模型](wiki/concepts/black-scholes-model.md)（S12、S13）<br>[隱含波動率](wiki/concepts/implied-volatility.md)（S1、S13） | [術語表](wiki/glossary.md)（—）<br>[Black-Scholes 的假設與限制](wiki/concepts/bs-assumptions-limitations.md)（S1、S12、S13） | S1、S12、S13 |
| S06 | Black-Scholes | [Black-Scholes 模型](wiki/concepts/black-scholes-model.md)（S12、S13）<br>[Black-Scholes 的假設與限制](wiki/concepts/bs-assumptions-limitations.md)（S10、S11、S12、S13）<br>[買賣權平價](wiki/concepts/put-call-parity.md)（S11、S12） | — | S10、S11、S12、S13 |
| S07 | 隱含波動率：從價格反推 σ | [隱含波動率](wiki/concepts/implied-volatility.md)（S1、S2、S5、S11、S13）<br>[隱含波動率的反推演算法](wiki/concepts/iv-inversion-algorithm.md)（S1、S5、S11、S13） | — | S1、S2、S5、S11、S13 |
| S08 | 如果 BS 是對的，曲面應該是平的 | [Black-Scholes 的假設與限制](wiki/concepts/bs-assumptions-limitations.md)（S10、S13）<br>[隱含波動率](wiki/concepts/implied-volatility.md)（S13） | [波動率曲面](wiki/concepts/volatility-surface.md)（S10） | S10、S13 |
| S09 | 固定 T、改變 K：微笑與偏斜 | [波動率微笑與偏斜](wiki/concepts/volatility-smile-skew.md)（S10、S11） | — | S10、S11 |
| S10 | 固定在價平、改變 T：期限結構 | [波動率期限結構](wiki/concepts/volatility-term-structure.md)（S2、S11）<br>[SVI 參數化](wiki/concepts/svi-parameterization.md)（—） | — | S2、S11 |
| S11 | 為什麼會有偏斜 | [為什麼會有偏斜](wiki/concepts/why-skew-exists.md)（S2、S10） | — | S2、S10 |
| S12 | 回到開場那張圖：曲面不能有套利 | [波動率曲面](wiki/concepts/volatility-surface.md)（S10、S4）<br>[SVI 參數化](wiki/concepts/svi-parameterization.md)（S4、S13）<br>[無套利曲面](wiki/concepts/no-arbitrage-surface.md)（S4、S13） | — | S4、S10、S13 |
| S13 | Vega：波動率一變，價格跟著變 | [Vega](wiki/concepts/vega.md)（S5）<br>[簡化 ELN](wiki/products/eln-simplified.md)（S5） | — | S5 |
| S14 | 結構型商品＝債券＋選擇權 | [結構型商品的組成](wiki/products/structured-note-architecture.md)（S6、S7、S9）<br>[發行機構信用風險](wiki/risks/issuer-credit-risk.md)（S6、S7） | — | S6、S7、S9 |
| S15 | 簡化 ELN：票息從哪裡來 | [簡化 ELN](wiki/products/eln-simplified.md)（S1、S6、S7、S8、S9、S13）<br>[常見誤解](wiki/risks/common-misconceptions.md)（S1、S6、S7、S8、S9、S13） | [術語表](wiki/glossary.md)（—）<br>[結構型商品的組成](wiki/products/structured-note-architecture.md)（S6、S7、S9） | S1、S6、S7、S8、S9、S13 |
| S16 | 真實商品：估計價值低於發行價 | [估計價值與發行價](wiki/products/estimated-value-vs-issue-price.md)（S6、S7、S8） | [術語表](wiki/glossary.md)（—）<br>[流動性風險](wiki/risks/liquidity-risk.md)（S1、S6、S7、S8） | S1、S6、S7、S8 |
| S17 | 三個常見誤解＋風險 | [常見誤解](wiki/risks/common-misconceptions.md)（S1、S5、S6、S7、S9）<br>[發行機構信用風險](wiki/risks/issuer-credit-risk.md)（S1、S6、S7）<br>[流動性風險](wiki/risks/liquidity-risk.md)（S1、S6、S7、S9） | — | S1、S5、S6、S7、S9 |
| S18 | 小測驗 | [到期價值與損益](wiki/concepts/payoff-diagram.md)（S1、S12）<br>[隱含波動率](wiki/concepts/implied-volatility.md)（S1、S5、S11、S13）<br>[Black-Scholes 的假設與限制](wiki/concepts/bs-assumptions-limitations.md)（S1、S10、S11、S12、S13）<br>[波動率微笑與偏斜](wiki/concepts/volatility-smile-skew.md)（S10、S11）<br>[簡化 ELN](wiki/products/eln-simplified.md)（S1、S5、S6、S7、S12、S13）<br>[常見誤解](wiki/risks/common-misconceptions.md)（S1、S5、S6、S7、S13） | — | S1、S5、S6、S7、S10、S11、S12、S13 |
| S19 | 總結＋延伸閱讀＋期末延伸預告 | [Wiki 索引](wiki/index.md)（—）<br>[術語表](wiki/glossary.md)（—）<br>[隱含波動率](wiki/concepts/implied-volatility.md)（S5、S11）<br>[波動率曲面](wiki/concepts/volatility-surface.md)（S10）<br>[簡化 ELN](wiki/products/eln-simplified.md)（S5、S7、S8）<br>[Greeks 總覽](wiki/concepts/greeks-overview.md)（S5）<br>[保本型商品](wiki/products/principal-protected-note.md)（S7）<br>[自動提前出場型商品](wiki/products/autocallable.md)（S7、S8） | [Delta](wiki/concepts/delta.md)（S5）<br>[Gamma](wiki/concepts/gamma.md)（S5）<br>[Theta](wiki/concepts/theta.md)（S5） | S5、S7、S8、S10、S11 |

## 2. 覆蓋率

本次相關頁（`GRAPH_SPEC.md` §2.4，共 21 頁）中，被投影片引用清單列出的：**21 / 21**。

| 本次相關頁 | 引用它的投影片 |
|---|---|
| [買權與賣權](wiki/concepts/call-put-option.md) | S01、S03、S04 |
| [履約價、到期日與價內外](wiki/concepts/strike-maturity-moneyness.md) | S03 |
| [到期價值與損益](wiki/concepts/payoff-diagram.md) | S02、S04、S18 |
| [Black-Scholes 模型](wiki/concepts/black-scholes-model.md) | S05、S06 |
| [Black-Scholes 的假設與限制](wiki/concepts/bs-assumptions-limitations.md) | S06、S08、S18 |
| [買賣權平價](wiki/concepts/put-call-parity.md) | S06 |
| [隱含波動率](wiki/concepts/implied-volatility.md) | S01、S02、S05、S07、S08、S18、S19 |
| [隱含波動率的反推演算法](wiki/concepts/iv-inversion-algorithm.md) | S07 |
| [波動率微笑與偏斜](wiki/concepts/volatility-smile-skew.md) | S02、S09、S18 |
| [波動率期限結構](wiki/concepts/volatility-term-structure.md) | S02、S10 |
| [為什麼會有偏斜](wiki/concepts/why-skew-exists.md) | S11 |
| [波動率曲面](wiki/concepts/volatility-surface.md) | S01、S12、S19 |
| [SVI 參數化](wiki/concepts/svi-parameterization.md) | S01、S10、S12 |
| [無套利曲面](wiki/concepts/no-arbitrage-surface.md) | S12 |
| [Vega](wiki/concepts/vega.md) | S13 |
| [結構型商品的組成](wiki/products/structured-note-architecture.md) | S01、S14 |
| [簡化 ELN](wiki/products/eln-simplified.md) | S02、S13、S15、S18、S19 |
| [估計價值與發行價](wiki/products/estimated-value-vs-issue-price.md) | S16 |
| [發行機構信用風險](wiki/risks/issuer-credit-risk.md) | S14、S17 |
| [流動性風險](wiki/risks/liquidity-risk.md) | S17 |
| [常見誤解](wiki/risks/common-misconceptions.md) | S15、S17、S18 |

沒有未引用的本次相關頁。

延伸頁（不要求出現在簡報）：greeks-overview、principal-protected-note、autocallable 列在 S19 的引用清單；delta、gamma、theta 出現在 S19 的表格，列在補充欄。

## 3. 來源使用情形

| 來源 | 被引用的投影片 |
|---|---|
| S1 | S01、S03、S04、S05、S07、S15、S16、S17、S18 |
| S2 | S07、S10、S11 |
| S3 | — |
| S4 | S12 |
| S5 | S07、S13、S17、S18、S19 |
| S6 | S14、S15、S16、S17、S18 |
| S7 | S01、S14、S15、S16、S17、S18、S19 |
| S8 | S01、S15、S16、S19 |
| S9 | S14、S15、S17 |
| S10 | S01、S06、S08、S09、S11、S12、S18、S19 |
| S11 | S01、S02、S06、S07、S09、S10、S18、S19 |
| S12 | S03、S04、S05、S06、S18 |
| S13 | S01、S05、S06、S07、S08、S12、S15、S18 |

S3（Derman 課程大綱）沒有被簡報引用：它在 wiki 中只支撐 bs-assumptions-limitations 的兩條 `[觀點]`，簡報改用 S10 的 Derman 觀點。
