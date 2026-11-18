# 術語表

依英文字母排序。格式見 `AGENTS.md` §8.3。

| 中文 | English | 定義 | 出處 | 主要頁面 |
|---|---|---|---|---|
| 美式選擇權 | American-style option | 到期前任何時間都可以履約的選擇權 | （S1, p.7） | [[strike-maturity-moneyness]] |
| 套利 | arbitrage | 不用先投入資金、也不用承擔風險就能獲利的機會；定價理論假設它不存在 | （S13, p.6） | [[no-arbitrage-surface]] |
| 指派 | assignment | 買方履約後，由 OCC 與券商依規則指定某位賣方履行義務 | （S1, p.9） | [[call-put-option]] |
| 價平 | at the money | 標的現價等於履約價 | （S1, p.13） | [[strike-maturity-moneyness]] |
| 自動提前出場 | automatic call / autocall | 標的在觀察日達到約定水準時，結構型債券依條款自動提前贖回 | （S8, p.PS-2） | [[autocallable]] |
| 障礙價 | barrier level | 結構型債券條款中預先訂定的標的價位；到期時標的低於它，本金就會跟著虧損 | （S8, p.PS-2） | [[autocallable]] |
| 二分法 | bisection method | 反推隱含波動率的方法：先找一個把解夾住的 σ 區間，每次取中點試算並把區間減半，直到小於容許誤差 | （推導；iv-inversion-algorithm §2） | [[iv-inversion-algorithm]] |
| Black-Scholes 公式 | Black-Scholes formula | 以標的現價、履約價、到期時間、無風險利率與波動率計算歐式選擇權理論價格的公式（F03–F05） | （S12, p.19） | [[black-scholes-model]] |
| 疊券 | bond-pledged leveraged purchase | 把持有的債券抵押、借出現金再去買結構型商品，等於加大槓桿（英文為本 wiki 的意譯，S9 沒有英文名稱） | （S9, §只要沒確定下市） | [[s9-wealth-smci-structured-products]] |
| 蝶式套利 | butterfly arbitrage | 同一到期日的曲面切片所隱含的機率密度出現負值時存在的套利 | （S4, p.4） | [[no-arbitrage-surface]] |
| 日曆價差套利 | calendar spread arbitrage | 相同 moneyness 下，到期日較長的選擇權總隱含變異數反而較小時存在的套利 | （S4, p.3–4） | [[no-arbitrage-surface]] |
| 買權 | call option | 給予買方「買進」標的之權利的選擇權 | （S1, p.3） | [[call-put-option]] |
| 提前贖回條款 | call provision | 允許發行機構在到期前贖回結構型債券的條款 | （S6, §Call risk） | [[s6-sec-structured-notes]] |
| 現金擔保賣出賣權 | cash-secured put | 賣出 put 的同時，把等於履約價的現金存在券商作為擔保 | （S1, p.65） | [[s1-occ-characteristics-risks]] |
| 現金結算 | cash-settled | 履約時不交付標的，而是依標的價值與履約價的差額收付現金 | （S1, p.3） | [[call-put-option]] |
| 平倉交易 | closing transaction | 到期前做一筆與原部位相反的交易，把原來的買方或賣方部位沖銷掉 | （S1, p.12） | [[call-put-option]] |
| 有條件配息 | contingent coupon | 只有在觀察日標的不低於配息障礙價時才發放的配息 | （S8, p.PS-2） | [[autocallable]] |
| 票息 | coupon | 結構型債券支付的利息；在簡化 ELN 中指到期時支付的固定金額 C | （GRAPH_SPEC §2.5；S7, §Calculate the Return） | [[eln-simplified]] |
| 信用風險（發行機構） | credit risk (issuer) | 發行機構違約時，投資人可能損失部分或全部本金與其他應得款項的風險 | （S6, §Credit risk） | [[issuer-credit-risk]] |
| 累積分布函數 | cumulative distribution function | 標準常態分布的累積機率 N(x)，Black-Scholes 公式中用它計算 | （S12, p.19） | [[black-scholes-model]] |
| Delta | delta | 標的股價每變動 1 點時，選擇權價格的預期變動 | （S5, p.9） | [[delta]] |
| ELN | equity-linked note (ELN) | 股權連結結構型商品；S9 報導中與 FCN 並列的結構型商品名稱 | （S9, §只要沒確定下市） | [[structured-note-architecture]] |
| 估計價值 | estimated value | 發行機構在公開說明書封面揭露的結構型債券價值估計，通常低於發行價 | （S6, §Issuance price and note value） | [[estimated-value-vs-issue-price]] |
| 歐式選擇權 | European-style option | 只能在到期前的特定期間（目前都是到期日當天）履約的選擇權 | （S1, p.7） | [[strike-maturity-moneyness]] |
| 履約 | exercise | 買方行使選擇權所賦予的權利 | （S1, p.9） | [[call-put-option]] |
| 履約價（K） | exercise price / strike price | 買方有權買進或賣出標的的價格 | （S1, p.7） | [[strike-maturity-moneyness]] |
| 到期日 | expiration date | 選擇權失效的日子 | （S1, p.7） | [[strike-maturity-moneyness]] |
| 公平票息 | fair coupon | 以面額發行且沒有費用時，使簡化 ELN 理論價值剛好等於面額的票息 C*（F17） | （推導；F17） | [[eln-simplified]] |
| 固定配息結構型商品（FCN） | fixed coupon note | 股價不跌時支付固定配息、股價跌破約定程度時投資人須以執行價接下股票的不保本結構型商品 | （S9, §與投行對賭股價） | [[structured-note-architecture]] |
| 遠期價格（F） | forward price | 不發股利的股票，F = S e^(rT)；SVI 的 log-strike 以它為基準 | （S13, p.11；S4, p.2） | [[svi-parameterization]] |
| Gamma | gamma | 標的股價變動 $1.00 時，delta 的預期變動 | （S5, p.13） | [[gamma]] |
| Greeks | Greeks | 衡量選擇權價值對各個定價因素敏感度的一組理論指標 | （S5, p.6；p.7） | [[greeks-overview]] |
| 隱藏成本 | hidden / imputed costs | 包在結構型債券發行價裡、對投資人不透明的成本，例如避險成本與發行機構利潤 | （S7, §Other Costs or Tradeoffs） | [[estimated-value-vs-issue-price]] |
| 歷史波動率 | historical volatility | 股票過去的波動率；是統計事實，不是預測 | （S5, p.15） | [[implied-volatility]] |
| 買方 | holder | 買下選擇權所賦予權利的人；其部位稱為 long | （S1, p.6；p.13） | [[call-put-option]] |
| 隱含波動率 | implied volatility | 讓 Black-Scholes 公式算出的價值等於選擇權市價的那個波動率；它反映選擇權權利金所隱含的、對標的未來波動率的預測 | （S11, p.2；S1, p.27） | [[implied-volatility]] |
| 隱含波動率曲面 | implied volatility surface | 隱含波動率對履約價與到期日畫成的曲面 | （S10, p.3） | [[volatility-surface]] |
| 價內 | in the money | Call：標的現價高於履約價；put：標的現價低於履約價 | （S1, p.13） | [[strike-maturity-moneyness]] |
| 內含價值 | intrinsic value | 選擇權處於價內的金額；價外時為零 | （S1, p.14） | [[strike-maturity-moneyness]] |
| 發行價 | issue price | 投資人在發行時買進結構型債券所支付的價格；通常高於發行機構揭露的估計價值 | （S6, §Issuance price and note value） | [[estimated-value-vs-issue-price]] |
| 跳躍擴散模型 | jump-diffusion model | 在 Black-Scholes 的連續價格變動之外，加入價格跳躍與崩跌的模型 | （S10, p.10） | [[s10-derman-laughter-in-the-dark]] |
| 觸及價 | knock-in / barrier / trigger | 預先設定的價位；參考資產跌破它時，結構型債券的報償方式會改變 | （S6, §Knock-in feature） | [[structured-note-architecture]] |
| 槓桿 | leverage | 用同樣的資金，透過選擇權控制比直接買進更多數量的標的；獲利與虧損都因此放大 | （S1, p.61） | [[call-put-option]] |
| 流動性風險 | liquidity risk | 到期前想賣出時，可能只能以低於買進價的價格賣出、甚至賣不掉的風險 | （S6, §Liquidity；§Questions to Ask） | [[liquidity-risk]] |
| 局部波動率 | local volatility | 同時取決於股價與時間的波動率函數，用來取代 Black-Scholes 的常數波動率 | （S11, p.4） | [[s11-derman-kani-smile-implied-tree]] |
| Log-strike（k） | log-strike / log-moneyness | 履約價相對於遠期價格的對數，k = ln(K/F) | （S4, p.2） | [[svi-parameterization]] |
| 對數常態 | lognormal | 價格取對數後服從常態分布；Black-Scholes 的主要假設 | （S13, p.14；p.19） | [[bs-assumptions-limitations]] |
| 保證金 | margin | 選擇權賣方存放在券商、作為履行義務擔保的現金或證券 | （S1, p.58） | [[call-put-option]] |
| 乘數 | multiplier | 現金結算選擇權用來把每一點差額換算成金額的倍數 | （S1, p.8） | [[payoff-diagram]] |
| 近期／次近期 | near-term / next-term | VIX 計算時選出的兩組到期日，一前一後夾住 30 天的目標期限 | （S2, p.5–6） | [[volatility-term-structure]] |
| 負偏斜 | negative skew | 隱含波動率隨履約價升高而下降的型態，常見於股價指數選擇權 | （S10, p.3） | [[volatility-smile-skew]] |
| Newton 法 | Newton's method | 反推隱含波動率的方法：每一步用 vega（價格對 σ 的斜率）修正 σ；vega 太小或跑出區間時改用二分法 | （推導；iv-inversion-algorithm §4） | [[iv-inversion-algorithm]] |
| 觀察日 | observation date | 結構型債券條款中用來判斷是否配息或提前出場的日期 | （S8, p.PS-2） | [[autocallable]] |
| 選擇權 | option | 在到期日之前，以固定履約價買進或賣出特定數量標的的權利 | （S1, p.3） | [[call-put-option]] |
| 價外 | out of the money | Call：履約價高於標的現價；put：履約價低於標的現價 | （S1, p.14） | [[strike-maturity-moneyness]] |
| 參與率 | participation rate | 參考資產的漲幅中，付給結構型債券投資人的固定比例 | （S6, §Participation rates） | [[principal-protected-note]] |
| 到期報償 | payoff | 衍生性商品到期時支付的金額 | （S12, p.4；p.8） | [[payoff-diagram]] |
| 實物交割 | physical delivery | 履約時實際交付或收取標的 | （S1, p.3） | [[call-put-option]] |
| 權利金 | premium | 買方付出、賣方收到的選擇權價格 | （S1, p.11） | [[call-put-option]] |
| 定價補充文件 | pricing supplement (424B2) | 發行機構向 SEC 申報、載明某一檔結構型債券確定條款與估計價值的文件 | （S8, §cover） | [[estimated-value-vs-issue-price]] |
| 面額 | principal amount / face value | 結構型債券每張的本金金額；配息與到期付款以它為基準計算 | （S8, §cover） | [[eln-simplified]] |
| 保本 | principal protection | 結構型債券約定到期時返還本金；仍受發行機構信用風險影響 | （S6, §Market risk） | [[principal-protected-note]] |
| 賣權 | put option | 給予買方「賣出」標的之權利的選擇權 | （S1, p.3） | [[call-put-option]] |
| 買賣權平價 | put-call parity | 相同履約價與到期日的歐式 call 與 put 價格之間的關係（F06） | （S11, p.6；F06 推導） | [[put-call-parity]] |
| 實現波動率 | realized volatility | 標的在一段期間內實際發生的波動率，由歷史數值計算 | （S1, p.27） | [[implied-volatility]] |
| 複製投資組合 | replicating portfolio | 到期報償與某個衍生性商品完全相同的投資組合；衍生性商品現在的價格等於它現在的價格 | （S12, p.8） | [[black-scholes-model]] |
| Rho | rho | 無風險利率變動時，選擇權價值的預期變動 | （S5, p.6） | [[greeks-overview]] |
| 風險中立機率 | risk neutral probability | 從市場價格推出來的機率，也就是由市場賠率決定的機率；不等於事件實際發生的機率 | （S13, p.5；p.7） | [[black-scholes-model]] |
| 無風險利率（r） | risk-free interest rate | 無風險貨幣市場帳戶的利率，Black-Scholes 公式的輸入之一 | （S12, p.9） | [[black-scholes-model]] |
| 次級市場 | secondary market | 買賣雙方可以在到期前用反向交易了結部位的市場 | （S1, p.4） | [[liquidity-risk]] |
| 賣出賣權 | sell put (short put) | 賣出 put 選擇權：收取權利金，並承擔標的下跌時以履約價買進的義務 | （S9, §只要沒確定下市；S1, p.65） | [[eln-simplified]] |
| 簡化 ELN | simplified equity-linked note | 本專案為教學定義的結構：到期時股價不低於履約價則取回面額加票息，否則取得等值於 N·S_T/K 的股票加票息 | （GRAPH_SPEC §2.5；F08） | [[eln-simplified]] |
| 偏斜 | skew | 隱含波動率隨履約價變動的不對稱；指數選擇權通常是履約價越高、隱含波動率越低 | （S11, p.2） | [[volatility-smile-skew]] |
| 切片 | slice | 固定到期日時，總隱含變異數對 log-strike 的函數 | （S4, p.2） | [[volatility-surface]] |
| 靜態套利 | static arbitrage | 日曆價差套利與蝶式套利的合稱；曲面兩者皆無才算沒有靜態套利 | （S4, p.3） | [[no-arbitrage-surface]] |
| SVI | stochastic volatility inspired (parameterization) | 用五個參數描述單一到期日隱含波動率微笑的公式（F11） | （S4, p.1；p.5） | [[svi-parameterization]] |
| 隨機波動率模型 | stochastic volatility model | 假設波動率本身也在波動、並會回歸長期平均的模型 | （S10, p.9） | [[s10-derman-laughter-in-the-dark]] |
| 執行價 | strike price (as used in S9) | S9 報導的用語，意思同履約價 | （S9, §與投行對賭股價） | [[strike-maturity-moneyness]] |
| 結構型債券 | structured note | 金融機構發行、由債券部分與內嵌衍生性商品組成、報酬連結到參考資產的證券 | （S6, §What are Structured Notes?） | [[structured-note-architecture]] |
| SSVI | Surface SVI | 以價平總隱含變異數為參數、可保證無靜態套利的 SVI 曲面形式（F12） | （S4, p.10–11） | [[svi-parameterization]] |
| 期限結構 | term structure (of volatility) | 價平選擇權的隱含波動率隨到期時間的變化 | （S11, p.2） | [[volatility-term-structure]] |
| Theta | theta | 每經過 1 個日曆天，選擇權價值的預期耗損 | （S5, p.20） | [[theta]] |
| 時間價值 | time value | 權利金超過內含價值的部分 | （S1, p.14） | [[strike-maturity-moneyness]] |
| 總隱含變異數（w） | total implied variance | 隱含波動率的平方乘以到期時間，w = σ²t | （S4, p.2） | [[svi-parameterization]] |
| 標的 | underlying interest | 選擇權所約定買賣的資產（股票、指數、債券、外匯等） | （S1, p.3） | [[call-put-option]] |
| 契約單位 | unit of trading / contract size | 一口實物交割選擇權履約時買賣的標的數量；多數股票選擇權是 100 股 | （S1, p.8） | [[call-put-option]] |
| 無擔保債權人 | unsecured creditor | 發行機構破產時，沒有擔保品可優先受償的債權人；結構型債券的持有人屬於此類 | （S7, §How Do These Notes Protect） | [[issuer-credit-risk]] |
| Vega | vega | 隱含波動率變動 1 個百分點時，選擇權價值的預期變動 | （S5, p.18） | [[vega]] |
| VIX 指數 | VIX Index (Cboe Volatility Index) | 衡量市場對美國股市未來 30 天波動率預期的指數，由 S&P 500 指數選擇權價格算出 | （S2, p.3） | [[implied-volatility]] |
| 波動率（σ） | volatility | Black-Scholes 公式的輸入之一；模型假設到期時標的價格的對數是常態分布，其變異數為 Tσ² | （S13, p.14；p.16） | [[black-scholes-model]] |
| 波動率微笑 | volatility smile | 隱含波動率隨履約價（與到期日）變動、不是平的這個現象 | （S10, p.1；p.3） | [[volatility-smile-skew]] |
| 賣方 | writer | 賣出選擇權、被指派時有義務履行的人；其部位稱為 short | （S1, p.6；p.13） | [[call-put-option]] |
| 零息債券 | zero-coupon bond | 到期前不付息的債券；保本型結構型債券的債券部分通常是它 | （S7, §What Are） | [[principal-protected-note]] |
