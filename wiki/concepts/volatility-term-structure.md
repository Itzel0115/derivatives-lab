# 波動率期限結構（Volatility Term Structure）

> 以 VIX 的計算為例：同一個標的、兩個不同到期日的選擇權，各自算出的變異數並不相同。（期限結構的正式定義待 S3 補上。）

## 重點主張

- `[事實]` VIX 的目標期限固定為 30 天，計算時要選出「近期」與「次近期」兩組不同到期日的選擇權。（S2, p.4；p.6）
  > "apply the rules for selecting the correct near- and next-terms"
- `[事實]` 兩組到期日各自計算一個變異數。（S2, p.6）
  > "the variances for the near- and next-terms can be calculated"
- `[事實]` 兩組到期日甚至可能使用不同的無風險利率。（S2, p.6）
  > "the VIX Index calculation may use different risk-free interest rates for near- and next-term options"
- `[範例]` Cboe 的假設性計算範例中，近期選擇權還有 24 個日曆天到期，次近期選擇權還有 31 個日曆天到期。（S2, p.9）
- `[範例]` 同一範例中，近期的變異數算出來是 0.019233906，次近期是 0.019423884，兩者不相等。（S2, p.13）
- `[事實]` VIX 的最後一步，是把兩個到期日的變異數依 30 天加權平均，再開根號、乘以 100。（S2, p.14）
  > "Then take the square root of that value and multiply by 100"

## 相關頁面

- [[implied-volatility|隱含波動率]]
- [[strike-maturity-moneyness|履約價、到期日與價內外]]

## 來源

- [[s2-cboe-vix-methodology|S2]]：Cboe, *Cboe Volatility Index — Methodology*（Version 6.0, 2026）

## 待補

- 本頁目前只有「不同到期日算出的數值不同」的一個範例，還沒有期限結構的定義、常見形狀或成因。這些預期由 S3 提供。