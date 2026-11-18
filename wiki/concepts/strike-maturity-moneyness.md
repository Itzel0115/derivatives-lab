# 履約價、到期日與價內外（Strike, Maturity and Moneyness）

> 每張選擇權都有兩個關鍵條款：履約價 K（用什麼價格買賣）和到期日（權利到什麼時候為止）。標的現價和 K 的相對位置，決定選擇權是價內、價平還是價外。

**符號說明**：本 wiki 用 $K$ 表示履約價、$T$ 表示距離到期的時間、$S$ 表示標的現價。這些符號是本 wiki 的慣例，S1 原文沒有使用符號，也沒有使用 moneyness 一詞。

## 重點主張

### 履約價 K

- `[事實]` 履約價（exercise price，也稱 strike price）是買方有權買進或賣出標的的價格。（S1, p.7）
  > "the exercise price (which is sometimes called the "strike price") is the price at which the option holder has the right either to purchase or to sell the underlying interest"
- `[範例]` 實物交割的 XYZ 40 call，讓買方有權以每股 $40 的履約價買進 100 股 XYZ 股票；XYZ 40 put 則讓買方有權以每股 $40 賣出 100 股。（S1, p.7）
- `[事實]` 交易所推出新的選擇權序列時，履約價通常設在當時標的市價的上方和下方。（S1, p.7）
  > "are generally set at levels above and below the then market value of the underlying interest"

### 到期日與 T

- `[事實]` 到期日（expiration date）是選擇權失效的日子。到期前沒有履約的選擇權就不再存在，買方不再有任何權利，選擇權也不再有價值。（S1, p.7）
  > "If an option has not been exercised prior to its expiration, it ceases to exist--that is, the option holder no longer has any rights"
- `[事實]` 美式（American-style）選擇權在到期前任何時間都可以履約。（S1, p.7）
  > "Each American-style option other than a delayed start option may be exercised at any time prior to its expiration."
- `[事實]` 歐式（European-style）選擇權只能在到期前的特定期間履約；文件發布時交易中的歐式選擇權都只能在到期日履約。（S1, p.7）
  > "Every European-style option being traded at the date of this document is exercisable only on its expiration date."

### 價內、價平、價外

- `[事實]` 價平（at the money）：標的現價等於履約價。（S1, p.13）
  > "the current market value of the underlying interest is the same as the exercise price of the option"
- `[事實]` Call 價內（in the money）：標的現價高於履約價。（S1, p.13）
  > "A call option is said to be in the money if the current market value of the underlying interest is above the exercise price of the option."
- `[事實]` Put 價內：標的現價低於履約價。（S1, p.13）
  > "A put option is said to be in the money if the current market value of the underlying interest is below the exercise price of the option."
- `[事實]` 價外（out of the money）：call 的履約價高於標的現價，或 put 的履約價低於標的現價。（S1, p.14）
  > "the exercise price of a call is above the current market value of the underlying interest, or if the exercise price of a put is below the current market value"
- `[範例]` XYZ 股價 $43 時，XYZ 40 call 為價內 $3。（S1, p.13）
- `[範例]` XYZ 股價 $40 時，履約價 $45 的 call 為價外 $5；履約價 $35 的 put 也是價外 $5。（S1, p.14）

| | Call | Put |
|---|---|---|
| 價內 | $S > K$ | $S < K$ |
| 價平 | $S = K$ | $S = K$ |
| 價外 | $S < K$ | $S > K$ |

（上表是把以上四條定義改用符號整理，內容同 S1, p.13–14。）

### 內含價值與時間價值

- `[事實]` 權利金可以看成兩個部分：內含價值（intrinsic value）與時間價值（time value）。（S1, p.14）
  > "It is sometimes useful to consider the premium of an option as consisting of two components: intrinsic value and time value."
- `[事實]` 內含價值是選擇權處於價內的金額；價外的選擇權內含價值是零。（S1, p.14）
  > "intrinsic value reflects the amount, if any, by which the option is in the money. An option that is out of the money would have an intrinsic value of zero."
- `[事實]` 時間價值是權利金超過內含價值的部分。（S1, p.14）
  > "Time value is whatever the premium of the option is in addition to its intrinsic value."
- `[範例]` XYZ 股價 $46 時，XYZ 40 call 的內含價值是每股 $6；股價跌到 $44，內含價值只剩 $4；股價跌到 $40 或以下，就沒有內含價值。（S1, p.14）
- `[範例]` XYZ 股價 $46 時，XYZ 50 put 的內含價值是每股 $4；股價漲到 $50 或以上，就沒有內含價值。（S1, p.15）
- `[範例]` XYZ 股價 $40 時，XYZ 40 call 的市價可能是每股 $2，這 $2 全部是時間價值。（S1, p.15）
- `[範例]` XYZ 股價 $45 時，XYZ 40 call 的市價可能是每股 $6，其中內含價值 $5、時間價值 $1。（S1, p.15）
- `[事實]` 其他條件不變時，時間價值通常隨到期日接近而減少，而且越接近到期減少得越快。（S1, p.15）
  > "the time value of an option usually decreases as the option approaches expiration, and this decrease accelerates as the time to expiration shortens"

## 相關頁面

- [[call-put-option|買權與賣權]]
- [[payoff-diagram|到期價值與損益]]

## 來源

- [[s1-occ-characteristics-risks|S1]]：OCC, *Characteristics and Risks of Standardized Options*（June 2024）
