# 隱含波動率（Implied Volatility）

> 隱含波動率是從選擇權的市場價格推出來的、對標的未來波動率的預期。VIX 指數是一個例子。

## 重點主張

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

## 來源

- [[s1-occ-characteristics-risks|S1]]：OCC, *Characteristics and Risks of Standardized Options*（June 2024）
- [[s2-cboe-vix-methodology|S2]]：Cboe, *Cboe Volatility Index — Methodology*（Version 6.0, 2026）

## 待補

- 目前沒有來源定義「把市場價格代回定價模型、反推出波動率」這個做法。S1 與 S2 只說波動率的預期「隱含在」選擇權價格中。學習目標 L2 需要的這個定義，預期由 S3 提供。
- VIX 是把許多選擇權的價格彙總成一個數字，不是用單一選擇權反推。S2 沒有比較這兩種做法；簡報把 VIX 當作隱含波動率的例子時，措辭不能超出上面幾條主張。
- 引用 S2 的內容是否可公開，待 Itzel 決定（見 [[s2-cboe-vix-methodology|S2]] 的使用限制）。
