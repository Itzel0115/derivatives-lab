# 波動率期限結構（Volatility Term Structure）

> 固定在價平、只改變到期時間時，隱含波動率也會跟著變。這個隨到期時間的變化稱為波動率的期限結構。

## 重點主張

### 定義

- `[事實]` 價平選擇權的隱含波動率隨到期時間的變化，一般稱為波動率的「期限結構」。（S11, p.2）
  > "This variation is generally called the volatility "term structure.""
- `[範例]` 1993 年 5 月 5 日的 S&P 500 指數選擇權：價平選擇權的隱含波動率隨到期時間拉長而上升。圖中使用的是價平 call 與 put 隱含波動率的平均。（S11, p.2）
- `[事實]` 作者把 skew 與期限結構合稱為波動率「smile」。（S11, p.2）
  > "In this paper we will refer to them collectively as the volatility "smile.""

### VIX 計算中的兩個到期日

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
- [[volatility-smile-skew|波動率微笑與偏斜]]
- [[volatility-surface|波動率曲面]]

## 來源

- [[s2-cboe-vix-methodology|S2]]：Cboe, *Cboe Volatility Index — Methodology*（Version 6.0, 2026）
- [[s11-derman-kani-smile-implied-tree|S11]]：Derman & Kani, *The Volatility Smile and Its Implied Tree*（1994）

## 待補

- 目前只有「1993 年 5 月 5 日隱含波動率隨到期時間上升」這一個方向的範例。沒有來源說明期限結構也可能向下，或它為什麼會有斜率；簡報不得自行補充。