# 隱含波動率（Implied Volatility）

> 隱含波動率是從選擇權的市場價格推出來的、對標的未來波動率的預期。VIX 指數是一個例子。

## 重點主張

### 定義：從市場價格反推

- `[事實]` 交易員報選擇權的市價時，用的是「讓 Black-Scholes 公式算出的價值等於市價」的那個波動率。（S11, p.2）
  > "has led traders to quote a call option's market price in terms of whatever constant local volatility"
- `[事實]` 這個波動率稱為 Black-Scholes 等價波動率，或隱含波動率。（S11, p.2）
  > "the Black-Scholes-equivalent or implied volatility"
- `[事實]` 本質上，隱含波動率是一種報價的方式。（S11, p.2）
  > "is a means of quoting prices"
- `[事實]` 市場上的選擇權價格，與 Black-Scholes 公式算出的理論價格並不完全一致。（S11, p.2）
  > "Market options prices are not exactly consistent with theoretical prices derived from the BS formula."

- `[事實]` 換一個說法：隱含波動率是代入 Black-Scholes 公式（連同其他已知參數）後，能算出目前市價的那個波動率。（S13, p.18）
  > "(when plugged into Black-Scholes formula along with known parameters) predicts the current market price"

- `[事實]` 隱含波動率是能解釋選擇權價格的波動率水準，可以用選擇權定價模型（計算器）求出。（S5, p.16）
  > "Can be determined via option pricing model (calculator)"

### 歷史波動率與隱含波動率

- `[事實]` 歷史波動率是股票過去的波動率，可以觀察與量化；它是統計事實，不是預測。（S5, p.15）
  > "A statistic, or a fact-- not a prediction"
- `[事實]` 隱含波動率反映市場預期的標的波動率，是所有市場參與者的共識。（S5, p.16）
  > "Reflects underlying stock volatility expected by marketplace"
- `[事實]` 標的歷史波動率的變化不一定會影響選擇權的市價；但其他因素不變時，隱含波動率的變化一定會影響選擇權價格。（S5, p.17）
  > "A change in underlying stock historical volatility may or may not affect an option's market price."

### 如果 Black-Scholes 是對的

- `[事實]` 如果 Black-Scholes 完全正確，同一檔股票、同一個到期日，所有履約價的隱含波動率都會相同。（S13, p.18）
  > "If Black-Scholes were completely correct, then given a stock and an expiration date, the implied volatility would be the same for all strike prices."
- `[事實]` 實際上，把隱含波動率看成履約價的函數時（有時稱為「波動率微笑」），它並不是常數。（S13, p.18）
  > "In practice, when the implied volatility is viewed as a function of strike price (sometimes called the "volatility smile"), it is not constant."

### 波動率藏在選擇權價格裡

- `[事實]` 影響權利金的因素之一，是市場參與者各自對標的未來波動率的估計。（S1, p.12）
  > "the individual estimates of market participants of the future volatility of the underlying interest"
- `[事實]` 其他條件相同時，標的波動越大，選擇權權利金越高。（S1, p.15）
  > "options on more volatile interests command higher premiums than options on less volatile interests"
- `[事實]` 隱含波動率指數反映的是對標的未來波動率的預測，這個預測是從選擇權目前的權利金推出來的。（S1, p.27）
  > "An implied volatility index reflects predictions about the future volatility of the reference interest as those predictions are implied by reported current premium values for options on the reference interest."
- `[事實]` 每個選擇權的價格都反映市場對未來波動率的預期。（S2, p.4）
  > "with the price of each option reflecting the market's expectation of future volatility"

### 隱含波動率是預測，而且算法不只一種

- `[事實]` 估計隱含波動率的方法不只一種，不同方法可能得到不同的估計值。（S1, p.27）
  > "There are various methods of estimating implied volatility, and different methods may provide different estimates."
- `[事實]` 標的事後實際實現的波動率，不一定符合隱含波動率的預測。（S1, p.27）
  > "The realized volatility of the reference interest may not conform to those predictions."

### 例子：VIX 指數

- `[事實]` VIX 指數的目標，是衡量市場對美國股市未來 30 天波動率的預期，這個預期由 S&P 500 指數選擇權的價格傳達。（S2, p.3）
  > "The Cboe Volatility Index (VIX) is designed to measure the market's expectation of 30-day forward looking volatility of the U.S. equity market, as conveyed by S&P 500 Index option prices."
- `[事實]` VIX 把一大段履約價範圍內的 S&P 500 put 與 call 價格加權彙總，來估計預期波動率。（S2, p.3）
  > "estimates expected volatility by aggregating the weighted prices of S&P 500 Index puts and calls"
- `[事實]` VIX 常被稱為「恐慌指標」。（S2, p.3）
  > "the VIX Index is often referred to as the "fear gauge.""
- `[範例]` Cboe 的假設性計算範例：以 2022 年 9 月 27 日上午 10:45:15（美東時間）的選擇權報價計算，得到 VIX = 100 × 0.13927842 = 13.93。（S2, p.9；p.14）

## 相關頁面

- [[call-put-option|買權與賣權]]
- [[strike-maturity-moneyness|履約價、到期日與價內外]]
- [[volatility-term-structure|波動率期限結構]]
- [[volatility-smile-skew|波動率微笑與偏斜]]
- [[bs-assumptions-limitations|Black-Scholes 的假設與限制]]
- [[iv-inversion-algorithm|隱含波動率的反推演算法]]
- [[black-scholes-model|Black-Scholes 模型]]
- [[vega|Vega]]

## 來源

- [[s1-occ-characteristics-risks|S1]]：OCC, *Characteristics and Risks of Standardized Options*（June 2024）
- [[s2-cboe-vix-methodology|S2]]：Cboe, *Cboe Volatility Index — Methodology*（Version 6.0, 2026）
- [[s5-oic-understanding-greeks|S5]]：OCC／OIC, *Making More Informed Decisions: Understanding Greeks*（2023）
- [[s11-derman-kani-smile-implied-tree|S11]]：Derman & Kani, *The Volatility Smile and Its Implied Tree*（1994）
- [[s13-mit-18440-risk-neutral-black-scholes|S13]]：MIT OpenCourseWare 18.440 Lecture 36, Sheffield, *Risk Neutral Probability and Black-Scholes*（Spring 2014）

## 待補

- VIX 是把許多選擇權的價格彙總成一個數字，不是用單一選擇權反推。S2 沒有比較這兩種做法；簡報把 VIX 當作隱含波動率的例子時，措辭不能超出上面幾條主張。