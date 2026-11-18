# 波動率微笑與偏斜（Volatility Smile and Skew）

> 固定到期日、只改變履約價時，各選擇權的隱含波動率並不相同。這條不平的曲線稱為波動率微笑；股價指數的典型形狀是低履約價較高、高履約價較低，稱為（負）偏斜。

## 重點主張

### 現象

- `[事實]` 依照 Black-Scholes，所有履約價的選擇權應該有相同的波動率；但實際上同一個標的的每個選擇權，反映出來的波動率都不同。（S10, p.3）
  > "According to Black-Scholes, options of all strikes should have the same volatility."
- `[事實]` 1987 年 10 月股災之前，指數選擇權的波動率曲面相當平；股災之後變得偏斜。（S10, p.1）
  > "Prior to the stock market crash of October 1987, the volatility surface of index options was indeed fairly flat."
- `[事實]` Derman 記述，東京的交易員給他看 Nikkei 選擇權的隱含波動率：三個月期、低履約價的選擇權，隱含波動率遠高於三個月期、高履約價的選擇權。（S10, p.2）
  > "three-month options of low strike had much higher implied volatilities than three-month options of high strike"
- `[事實]` 這種偏斜在 1987 年 10 月 19 日股災之前並不存在，之後才在全球各地的指數市場出現。（S10, p.2）
  > "had begun to appear shortly afterwards, in index markets all over the world"
- `[範例]` S&P 選擇權的隱含波動率，隨履約價不同，大約從 14% 到 24%。（S10, p.3）

### 名稱

- `[事實]` 「微笑」這個名稱來自外匯市場，那裡的曲線真的像微微上揚的嘴角。（S10, p.3）
  > "because in the currency world it really did resemble a slight upturned curve of the lips"
- `[事實]` 指數的偏斜被稱為「負」偏斜，因為波動率與履約價反向變動。（S10, p.3）
  > "for indexes, the skew was described as negative, since volatilities were anti-correlated with strike prices"

### 不同市場的形狀不同

- `[事實]` 個股的微笑通常比指數對稱，更像一個笑容。（S10, p.4）
  > "the volatility smile for single stocks often looks like Figure 3, more symmetric and smile-like"
- `[事實]` 外匯市場的微笑可以更對稱，兩種貨幣實力相當時尤其如此。（S10, p.4）
  > "In FX markets, the smile can be even more symmetrical"
- `[事實]` 黃金市場近年出現過正偏斜。（S10, p.4）
  > "a positive volatility skew has occurred in that market"

## 相關頁面

- [[implied-volatility|隱含波動率]]
- [[why-skew-exists|為什麼會有偏斜]]
- [[volatility-surface|波動率曲面]]
- [[volatility-term-structure|波動率期限結構]]
- [[bs-assumptions-limitations|Black-Scholes 的假設與限制]]

## 來源

- [[s10-derman-laughter-in-the-dark|S10]]：Derman, *Laughter in the Dark — The Problem of the Volatility Smile*（2003）

## 待補

- 「skew」的正式定義與有日期的市場範例，待 S11 補上。
