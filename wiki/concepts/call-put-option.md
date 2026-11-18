# 買權與賣權（Call and Put Options）

> 選擇權是「可以做、但不一定要做」的權利：買權是買進的權利，賣權是賣出的權利；買方付權利金取得權利，賣方收權利金承擔義務。

## 重點主張

### 定義

- `[事實]` 選擇權（option）是一種權利：在到期日之前，以固定的履約價買進或賣出特定數量的標的（underlying interest）。（S1, p.3）
  > "An option is the right to buy or sell a specified amount or value of a particular underlying interest at a fixed exercise price"
- `[事實]` 給予「買進」權利的是買權（call option），給予「賣出」權利的是賣權（put option）。（S1, p.3）
  > "An option that gives the right to buy is a call option, and an option that gives a right to sell is a put option."
- `[事實]` Call 和 put 是兩種各自獨立的選擇權，買賣其中一種並不牽涉另一種。（S1, p.3）
  > "Calls and puts are distinct types of options, and buying or selling of one type does not involve the other."
- `[範例]` 以特定履約價買進 100 股 XYZ 公司普通股的選擇權，是 XYZ call；以特定履約價賣出 100 股 XYZ 公司普通股的選擇權，是 XYZ put。（S1, p.3）

### 買方的權利、賣方的義務

- `[事實]` 買方（option holder）是買下選擇權所賦予權利的人。（S1, p.6）
  > "The option holder is the person who buys the right conveyed by the option."
- `[事實]` 賣方（option writer，也稱 option seller）在被指派履約（assigned an exercise）時，有義務依選擇權條款履行。（S1, p.6）
  > "The option writer is obligated--if and when assigned an exercise--to perform according to the terms of the option."
- `[範例]` 實物交割的 XYZ call 被履約時，被指派的賣方必須交付規定數量的 XYZ 股票，並且只能收到履約價，不論當時市價是多少。（S1, p.6）
- `[事實]` 實物交割的 put 被履約時，被指派的賣方必須以履約價買進規定數量的股票，不論當時市價是多少。（S1, p.6）
  > "the assigned writer must purchase the required number of shares at the specified exercise price regardless of their current market price"
- `[事實]` 持有選擇權的部位稱為 long，賣出選擇權的部位稱為 short。（S1, p.13）
  > "The word long refers to a person's position as the holder of an option, and the word short refers to a person's position as the writer of an option."

### 權利金

- `[事實]` 權利金（premium）是買方付出、賣方收到的價格，用來交換選擇權所賦予的權利。（S1, p.11）
  > "The premium is the price that the holder of an option pays and the writer of an option receives for the rights conveyed by the option."
- `[事實]` 權利金不是訂金，付出後不會退還。（S1, p.11–12）
  > "a nonrefundable payment in full--from the option holder to the option writer--for the rights conveyed by the option."
- `[事實]` 權利金不是交易所或 OCC 訂的，而是隨市場與經濟因素持續變動。（S1, p.12）
  > "The premium is not fixed by the options markets or by OCC. Premiums are subject to continuous change in response to market and economic forces"
- `[範例]` 多數股票選擇權的契約單位是 100 股。若權利金是每股 $4，一口選擇權的總權利金是 $400。（S1, p.8）

### 交割方式

- `[事實]` 選擇權分為實物交割（physical delivery）與現金結算（cash-settled）兩種。實物交割的 call 買方履約時收到標的，put 買方履約時交出標的。（S1, p.3）
  > "A physical delivery option gives its owner the right to receive physical delivery (if it is a call), or to make physical delivery (if it is a put)"
- `[事實]` 現金結算的選擇權，買方履約時收到的是現金，金額依履約時標的價值與履約價的差額計算。（S1, p.3）
  > "a cash payment based on the difference between a determined value of the underlying interest at the time the option is exercised and the fixed exercise price"

### 買賣雙方的主要風險

- `[事實]` 買方可能在很短的時間內賠光全部權利金。（S1, p.61）
  > "An option holder runs the risk of losing the entire amount paid for the option in a relatively short period of time."
- `[事實]` 買方不只要看對標的價格的方向，還要看對時間。（S1, p.61）
  > "must not only be right about the direction of an anticipated price change in the underlying interest, but she must also be right about when"
- `[事實]` 賣出沒有持有標的的 call（uncovered call），潛在損失沒有上限。（S1, p.64）
  > "For the writer of an uncovered call (other than a binary call), the potential loss is unlimited."
- `[事實]` 賣出 put 的人承擔標的價格下跌的風險，最壞情況是跌到零。（S1, p.65）
  > "The writer of a put bears the risk of a decline in the price of the underlying interest--potentially to zero"

## 相關頁面

- [[strike-maturity-moneyness|履約價、到期日與價內外]]
- [[payoff-diagram|到期價值與損益]]

## 來源

- [[s1-occ-characteristics-risks|S1]]：OCC, *Characteristics and Risks of Standardized Options*（June 2024）
