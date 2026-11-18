# Black-Scholes 的假設與限制（Black-Scholes Assumptions and Limitations）

> Black-Scholes 模型建立在一組簡化的假設上。這些假設在現實中並不完全成立，所以模型算出的價格與市場價格會有落差。

## 重點主張

### 模型都是簡化

- `[觀點]` Derman 認為，金融模型背後的假設沒有一個是真正成立的，也沒有任何金融模型是真正正確的。（S3, p.1）
  > "No assumptions behind financial models are genuinely true, and no financial models are really correct"
- `[觀點]` Derman 認為，要會用 Black-Scholes-Merton 模型，光是知道方程式和它的解並不夠。（S3, p.1）
  > "There's more to it than just knowing the equation and its solution."
- `[事實]` 選擇權的權利金不一定符合任何理論定價公式。（S1, p.12）
  > "Readers should not assume that options premiums will necessarily conform or correlate with any theoretical options pricing formula"

- `[觀點]` Derman 認為，所有金融模型都是錯的，頂多在人們改變行為之前暫時成立。（S10, p.13）
  > "All financial models are wrong, or at best hold only for a little while until people change their behavior."

### 常數波動率假設

- `[事實]` Black-Scholes 模型假設標的股票走的是理想化的連續布朗運動，任何時候都只有一個固定的波動率，並且可以連續避險、沒有交易成本。（S10, p.5）
  > "The Black-Scholes model assumes for the underlying stock an idealized continuous Brownian motion with a single constant volatility at all times"
- `[事實]` 古典 Black-Scholes 模型在所有時間、所有價位都給標的同一個對數常態波動率。（S10, p.3）
  > "attributed a single lognormal volatility to an underlier at all times and all levels"

- `[事實]` Black-Scholes 模型假設指數水準以固定的波動率做隨機漫步。（S11, §Summary）
  > "The Black-Scholes model assumes that the index level executes a random walk with a constant volatility."
- `[事實]` Black-Scholes 理論假設股價在任何時間、任何價位都以固定的局部波動率做對數常態演變。（S11, p.1）
  > "stock prices evolve lognormally with a constant local volatility"
- `[事實]` Black-Scholes 理論的另一個特點是與投資人的風險偏好無關：評價選擇權時，可以把標的股票的預期報酬當成無風險報酬。（S11, p.1）
  > "you can value an option as though the underlying stock's expected return is riskless"

- `[事實]` Black-Scholes 的主要假設：在風險中立機率下，資產在未來某個固定時間的價格取對數後是常態分布（也就是價格本身是對數常態分布）。（S13, p.14；p.19）
  > "Main Black-Scholes assumption: risk neutral probability densities are lognormal."

### 其他假設

- `[事實]` S13 的推導採用固定的到期時間與固定的利率。（S13, p.9）
  > "fixed interest rate r in this lecture"
- `[事實]` S13 以不發股利的股票為例，說明股票今天的價格等於未來價值的風險中立期望值折現。（S13, p.11）
  > "if a non-divided paying stock will be worth X at time T"
- `[事實]` Black-Scholes 公式的解析解適用於歐式 call 與 put。（S12, p.19）
  > "For European Call/Put the equation can be solved analytically"

### 假設與市場的落差

- `[事實]` 從 call 報價反推出來的機率分布，實際上並不完全是對數常態：尾部太肥。Black-Scholes 的主要假設只是近似正確。（S13, p.18）
  > "Tails are too fat. Main Black-Scholes assumption is only approximately correct."
- `[事實]` 假設不成立的地方：每天的波動幅度並不固定，價格也可能出現大幅跳動。（S13, p.19）
  > "Fluctuation sizes vary from day to day. Prices can have big jumps."
- `[事實]` 修正的方向包括：會變動的波動率、隨機利率、跳躍。（S13, p.19）
  > "Fixes: variable volatility, random interest rates,"

- `[觀點]` Derman 與 Kani 認為，繼續用 Black-Scholes 等價波動率來報價或許方便，但用 Black-Scholes 公式來計算選擇權價格很可能是不正確的。（S11, p.3）
  > "it is probably incorrect to calculate options prices using the BS formula"
- `[事實]` 依照古典理論，選擇權的 Black-Scholes 隱含波動率應該與履約價、到期日無關。（S10, p.1）
  > "the Black-Scholes implied volatility of an option should be independent of its strike and expiration"
- `[事實]` Black-Scholes 的結果與大多數市場觀察到的微笑不一致。（S10, p.5）
  > "its results are inconsistent with observed smiles in most markets"
- `[事實]` 因為 Black-Scholes 模型無法解釋微笑，交易部門開始改用更複雜的模型來評價與避險。（S10, p.1）
  > "trading desks have begun to use more complex models to value"
- `[觀點]` Derman 認為，應該把 Black-Scholes 隱含波動率看成一種略嫌簡化的報價慣例。（S10, p.5）
  > "You should think of Black-Scholes implied volatilities as a somewhat simplistic quoting convention"

## 相關頁面

- [[implied-volatility|隱含波動率]]
- [[volatility-smile-skew|波動率微笑與偏斜]]
- [[volatility-surface|波動率曲面]]
- [[why-skew-exists|為什麼會有偏斜]]
- [[black-scholes-model|Black-Scholes 模型]]

## 來源

- [[s1-occ-characteristics-risks|S1]]：OCC, *Characteristics and Risks of Standardized Options*（June 2024）
- [[s3-derman-volatility-smile|S3]]：Derman, *An Introduction to the Volatility Smile*（課程大綱，2013）
- [[s10-derman-laughter-in-the-dark|S10]]：Derman, *Laughter in the Dark — The Problem of the Volatility Smile*（2003）
- [[s11-derman-kani-smile-implied-tree|S11]]：Derman & Kani, *The Volatility Smile and Its Implied Tree*（1994）
- [[s12-mit-18s096-black-scholes|S12]]：MIT OpenCourseWare 18.S096 Lecture 19, Strela（Fall 2013）
- [[s13-mit-18440-risk-neutral-black-scholes|S13]]：MIT OpenCourseWare 18.440 Lecture 36, Sheffield, *Risk Neutral Probability and Black-Scholes*（Spring 2014）

## 待補

- 「無股利」沒有任何來源把它明列為 Black-Scholes 公式的假設。目前的依據是：S12 的公式沒有股利項，S13 的定價例子用的是不發股利的股票（p.11）。簡報若要寫「假設無股利」，措辭要對應這個程度的支撐。
