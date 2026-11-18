# 術語表

依英文字母排序。格式見 `AGENTS.md` §8.3。

| 中文 | English | 定義 | 出處 | 主要頁面 |
|---|---|---|---|---|
| 美式選擇權 | American-style option | 到期前任何時間都可以履約的選擇權 | （S1, p.7） | [[strike-maturity-moneyness]] |
| 指派 | assignment | 買方履約後，由 OCC 與券商依規則指定某位賣方履行義務 | （S1, p.9） | [[call-put-option]] |
| 價平 | at the money | 標的現價等於履約價 | （S1, p.13） | [[strike-maturity-moneyness]] |
| Black-Scholes 公式 | Black-Scholes formula | 以標的現價、履約價、到期時間、無風險利率與波動率計算歐式選擇權理論價格的公式（F03–F05） | （S12, p.19） | [[black-scholes-model]] |
| 蝶式套利 | butterfly arbitrage | 同一到期日的曲面切片所隱含的機率密度出現負值時存在的套利 | （S4, p.4） | [[no-arbitrage-surface]] |
| 日曆價差套利 | calendar spread arbitrage | 相同 moneyness 下，到期日較長的選擇權總隱含變異數反而較小時存在的套利 | （S4, p.3–4） | [[no-arbitrage-surface]] |
| 買權 | call option | 給予買方「買進」標的之權利的選擇權 | （S1, p.3） | [[call-put-option]] |
| 現金擔保賣出賣權 | cash-secured put | 賣出 put 的同時，把等於履約價的現金存在券商作為擔保 | （S1, p.65） | [[s1-occ-characteristics-risks]] |
| 現金結算 | cash-settled | 履約時不交付標的，而是依標的價值與履約價的差額收付現金 | （S1, p.3） | [[call-put-option]] |
| Delta | delta | 標的股價每變動 1 點時，選擇權價格的預期變動 | （S5, p.9） | [[delta]] |
| 歐式選擇權 | European-style option | 只能在到期前的特定期間（目前都是到期日當天）履約的選擇權 | （S1, p.7） | [[strike-maturity-moneyness]] |
| 履約 | exercise | 買方行使選擇權所賦予的權利 | （S1, p.9） | [[call-put-option]] |
| 履約價（K） | exercise price / strike price | 買方有權買進或賣出標的的價格 | （S1, p.7） | [[strike-maturity-moneyness]] |
| 到期日 | expiration date | 選擇權失效的日子 | （S1, p.7） | [[strike-maturity-moneyness]] |
| Gamma | gamma | 標的股價變動 $1.00 時，delta 的預期變動 | （S5, p.13） | [[gamma]] |
| Greeks | Greeks | 衡量選擇權價值對各個定價因素敏感度的一組理論指標 | （S5, p.6；p.7） | [[greeks-overview]] |
| 歷史波動率 | historical volatility | 股票過去的波動率；是統計事實，不是預測 | （S5, p.15） | [[implied-volatility]] |
| 買方 | holder | 買下選擇權所賦予權利的人；其部位稱為 long | （S1, p.6；p.13） | [[call-put-option]] |
| 隱含波動率 | implied volatility | 讓 Black-Scholes 公式算出的價值等於選擇權市價的那個波動率；它反映選擇權權利金所隱含的、對標的未來波動率的預測 | （S11, p.2；S1, p.27） | [[implied-volatility]] |
| 隱含波動率曲面 | implied volatility surface | 隱含波動率對履約價與到期日畫成的曲面 | （S10, p.3） | [[volatility-surface]] |
| 價內 | in the money | Call：標的現價高於履約價；put：標的現價低於履約價 | （S1, p.13） | [[strike-maturity-moneyness]] |
| 內含價值 | intrinsic value | 選擇權處於價內的金額；價外時為零 | （S1, p.14） | [[strike-maturity-moneyness]] |
| Log-strike（k） | log-strike / log-moneyness | 履約價相對於遠期價格的對數，k = ln(K/F) | （S4, p.2） | [[svi-parameterization]] |
| 乘數 | multiplier | 現金結算選擇權用來把每一點差額換算成金額的倍數 | （S1, p.8） | [[payoff-diagram]] |
| 近期／次近期 | near-term / next-term | VIX 計算時選出的兩組到期日，一前一後夾住 30 天的目標期限 | （S2, p.5–6） | [[volatility-term-structure]] |
| 負偏斜 | negative skew | 隱含波動率隨履約價升高而下降的型態，常見於股價指數選擇權 | （S10, p.3） | [[volatility-smile-skew]] |
| 選擇權 | option | 在到期日之前，以固定履約價買進或賣出特定數量標的的權利 | （S1, p.3） | [[call-put-option]] |
| 價外 | out of the money | Call：履約價高於標的現價；put：履約價低於標的現價 | （S1, p.14） | [[strike-maturity-moneyness]] |
| 實物交割 | physical delivery | 履約時實際交付或收取標的 | （S1, p.3） | [[call-put-option]] |
| 權利金 | premium | 買方付出、賣方收到的選擇權價格 | （S1, p.11） | [[call-put-option]] |
| 賣權 | put option | 給予買方「賣出」標的之權利的選擇權 | （S1, p.3） | [[call-put-option]] |
| 買賣權平價 | put-call parity | 相同履約價與到期日的歐式 call 與 put 價格之間的關係（F06） | （S11, p.6；F06 推導） | [[put-call-parity]] |
| 實現波動率 | realized volatility | 標的在一段期間內實際發生的波動率，由歷史數值計算 | （S1, p.27） | [[implied-volatility]] |
| Rho | rho | 無風險利率變動時，選擇權價值的預期變動 | （S5, p.6） | [[greeks-overview]] |
| 無風險利率（r） | risk-free interest rate | 無風險貨幣市場帳戶的利率，Black-Scholes 公式的輸入之一 | （S12, p.9） | [[black-scholes-model]] |
| 切片 | slice | 固定到期日時，總隱含變異數對 log-strike 的函數 | （S4, p.2） | [[volatility-surface]] |
| 偏斜 | skew | 隱含波動率隨履約價變動的不對稱；指數選擇權通常是履約價越高、隱含波動率越低 | （S11, p.2） | [[volatility-smile-skew]] |
| SSVI | Surface SVI | 以價平總隱含變異數為參數、可保證無靜態套利的 SVI 曲面形式（F12） | （S4, p.10–11） | [[svi-parameterization]] |
| 靜態套利 | static arbitrage | 日曆價差套利與蝶式套利的合稱；曲面兩者皆無才算沒有靜態套利 | （S4, p.3） | [[no-arbitrage-surface]] |
| SVI | stochastic volatility inspired (parameterization) | 用五個參數描述單一到期日隱含波動率微笑的公式（F11） | （S4, p.1；p.5） | [[svi-parameterization]] |
| 期限結構 | term structure (of volatility) | 價平選擇權的隱含波動率隨到期時間的變化 | （S11, p.2） | [[volatility-term-structure]] |
| Theta | theta | 每經過 1 個日曆天，選擇權價值的預期耗損 | （S5, p.20） | [[theta]] |
| 時間價值 | time value | 權利金超過內含價值的部分 | （S1, p.14） | [[strike-maturity-moneyness]] |
| 總隱含變異數（w） | total implied variance | 隱含波動率的平方乘以到期時間，w = σ²t | （S4, p.2） | [[svi-parameterization]] |
| 標的 | underlying interest | 選擇權所約定買賣的資產（股票、指數、債券、外匯等） | （S1, p.3） | [[call-put-option]] |
| 契約單位 | unit of trading / contract size | 一口實物交割選擇權履約時買賣的標的數量；多數股票選擇權是 100 股 | （S1, p.8） | [[call-put-option]] |
| Vega | vega | 隱含波動率變動 1 個百分點時，選擇權價值的預期變動 | （S5, p.18） | [[vega]] |
| VIX 指數 | VIX Index (Cboe Volatility Index) | 衡量市場對美國股市未來 30 天波動率預期的指數，由 S&P 500 指數選擇權價格算出 | （S2, p.3） | [[implied-volatility]] |
| 波動率（σ） | volatility | Black-Scholes 公式的輸入之一；模型假設到期時標的價格的對數是常態分布，其變異數為 Tσ² | （S13, p.14；p.16） | [[black-scholes-model]] |
| 波動率微笑 | volatility smile | 隱含波動率隨履約價（與到期日）變動、不是平的這個現象 | （S10, p.1；p.3） | [[volatility-smile-skew]] |
| 賣方 | writer | 賣出選擇權、被指派時有義務履行的人；其部位稱為 short | （S1, p.6；p.13） | [[call-put-option]] |
