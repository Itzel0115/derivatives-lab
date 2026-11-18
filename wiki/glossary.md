# 術語表

依英文字母排序。格式見 `AGENTS.md` §8.3。

| 中文 | English | 定義 | 出處 | 主要頁面 |
|---|---|---|---|---|
| 美式選擇權 | American-style option | 到期前任何時間都可以履約的選擇權 | （S1, p.7） | [[strike-maturity-moneyness]] |
| 指派 | assignment | 買方履約後，由 OCC 與券商依規則指定某位賣方履行義務 | （S1, p.9） | [[call-put-option]] |
| 價平 | at the money | 標的現價等於履約價 | （S1, p.13） | [[strike-maturity-moneyness]] |
| 買權 | call option | 給予買方「買進」標的之權利的選擇權 | （S1, p.3） | [[call-put-option]] |
| 現金擔保賣出賣權 | cash-secured put | 賣出 put 的同時，把等於履約價的現金存在券商作為擔保 | （S1, p.65） | [[s1-occ-characteristics-risks]] |
| 現金結算 | cash-settled | 履約時不交付標的，而是依標的價值與履約價的差額收付現金 | （S1, p.3） | [[call-put-option]] |
| 歐式選擇權 | European-style option | 只能在到期前的特定期間（目前都是到期日當天）履約的選擇權 | （S1, p.7） | [[strike-maturity-moneyness]] |
| 履約 | exercise | 買方行使選擇權所賦予的權利 | （S1, p.9） | [[call-put-option]] |
| 履約價（K） | exercise price / strike price | 買方有權買進或賣出標的的價格 | （S1, p.7） | [[strike-maturity-moneyness]] |
| 到期日 | expiration date | 選擇權失效的日子 | （S1, p.7） | [[strike-maturity-moneyness]] |
| 買方 | holder | 買下選擇權所賦予權利的人；其部位稱為 long | （S1, p.6；p.13） | [[call-put-option]] |
| 隱含波動率 | implied volatility | 讓 Black-Scholes 公式算出的價值等於選擇權市價的那個波動率；它反映選擇權權利金所隱含的、對標的未來波動率的預測 | （S11, p.2；S1, p.27） | [[implied-volatility]] |
| 隱含波動率曲面 | implied volatility surface | 隱含波動率對履約價與到期日畫成的曲面 | （S10, p.3） | [[volatility-surface]] |
| 價內 | in the money | Call：標的現價高於履約價；put：標的現價低於履約價 | （S1, p.13） | [[strike-maturity-moneyness]] |
| 內含價值 | intrinsic value | 選擇權處於價內的金額；價外時為零 | （S1, p.14） | [[strike-maturity-moneyness]] |
| 乘數 | multiplier | 現金結算選擇權用來把每一點差額換算成金額的倍數 | （S1, p.8） | [[payoff-diagram]] |
| 近期／次近期 | near-term / next-term | VIX 計算時選出的兩組到期日，一前一後夾住 30 天的目標期限 | （S2, p.5–6） | [[volatility-term-structure]] |
| 負偏斜 | negative skew | 隱含波動率隨履約價升高而下降的型態，常見於股價指數選擇權 | （S10, p.3） | [[volatility-smile-skew]] |
| 選擇權 | option | 在到期日之前，以固定履約價買進或賣出特定數量標的的權利 | （S1, p.3） | [[call-put-option]] |
| 價外 | out of the money | Call：履約價高於標的現價；put：履約價低於標的現價 | （S1, p.14） | [[strike-maturity-moneyness]] |
| 實物交割 | physical delivery | 履約時實際交付或收取標的 | （S1, p.3） | [[call-put-option]] |
| 權利金 | premium | 買方付出、賣方收到的選擇權價格 | （S1, p.11） | [[call-put-option]] |
| 賣權 | put option | 給予買方「賣出」標的之權利的選擇權 | （S1, p.3） | [[call-put-option]] |
| 實現波動率 | realized volatility | 標的在一段期間內實際發生的波動率，由歷史數值計算 | （S1, p.27） | [[implied-volatility]] |
| 偏斜 | skew | 隱含波動率隨履約價變動的不對稱；指數選擇權通常是履約價越高、隱含波動率越低 | （S11, p.2） | [[volatility-smile-skew]] |
| 期限結構 | term structure (of volatility) | 價平選擇權的隱含波動率隨到期時間的變化 | （S11, p.2） | [[volatility-term-structure]] |
| 時間價值 | time value | 權利金超過內含價值的部分 | （S1, p.14） | [[strike-maturity-moneyness]] |
| 標的 | underlying interest | 選擇權所約定買賣的資產（股票、指數、債券、外匯等） | （S1, p.3） | [[call-put-option]] |
| 契約單位 | unit of trading / contract size | 一口實物交割選擇權履約時買賣的標的數量；多數股票選擇權是 100 股 | （S1, p.8） | [[call-put-option]] |
| VIX 指數 | VIX Index (Cboe Volatility Index) | 衡量市場對美國股市未來 30 天波動率預期的指數，由 S&P 500 指數選擇權價格算出 | （S2, p.3） | [[implied-volatility]] |
| 波動率微笑 | volatility smile | 隱含波動率隨履約價（與到期日）變動、不是平的這個現象 | （S10, p.1；p.3） | [[volatility-smile-skew]] |
| 賣方 | writer | 賣出選擇權、被指派時有義務履行的人；其部位稱為 short | （S1, p.6；p.13） | [[call-put-option]] |
