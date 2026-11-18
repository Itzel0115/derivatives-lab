# 自動提前出場型商品（Autocallable）

> 這類結構型債券設有觀察日：只要標的在某個觀察日達到約定的水準，債券就自動提前贖回，投資人拿回本金與當期配息，之後不再有任何收入。沒有提前出場的話，到期時標的若跌破障礙價，本金會跟著虧損。

**範圍**：延伸頁，供期末擴充。依 `GRAPH_SPEC.md` §2.4，本次簡報只放一頁靜態案例（S16），不做互動工具。

**提醒**：本頁以一檔 2015 年發行、已到期的真實商品為例，只用來說明條款長什麼樣子，**不構成投資建議**。指數點數等市場數據一律沒有抄錄（見 [[s8-barclays-phoenix-autocallable-424b2|S8]] 的使用注意）。

## 重點主張

### 案例條款：Barclays Phoenix AutoCallable Notes（2015）

- `[範例]` 發行機構 Barclays Bank PLC；定價日 2015 年 12 月 7 日，到期日 2018 年 12 月 12 日；連結 S&P 500、Russell 2000、NASDAQ-100 三個指數中表現最差的一個；每張面額 $1,000。（S8, §cover）
- `[範例]` 有條件配息：每張每月 $5.20833（面額的 0.520833%）。某個觀察日三個指數的收盤都不低於各自的配息障礙價（期初水準的 65%）才發放，否則該月沒有配息。（S8, p.PS-2）
- `[事實]` 自動提前出場：自第六個觀察日（2016 年 6 月）起，若某個觀察日三個指數的收盤都不低於各自的期初水準，債券自動贖回。（S8, p.PS-2）
  > "the Notes will be automatically called for a cash payment per $1,000 principal amount Note equal to the applicable Redemption Price"
- `[範例]` 贖回價是每張 $1,000 加上當期的有條件配息。（S8, p.PS-2）
- `[範例]` 到期時若未曾提前出場：表現最差的指數期末不低於障礙價（期初水準的 60%），取回 $1,000；低於障礙價，則取回 $1,000 ＋［$1,000 × 該指數的報酬率］。（S8, §cover；p.PS-2）

### 文件自己舉的假設範例

- `[範例]` 假設債券在第六個觀察日被提前出場：投資人收到贖回價每張 $1,005.20833，之後不再有任何付款；文件稱總投資報酬約 1.5625%。（S8, p.PS-6）
- `[範例]` 假設未提前出場，且表現最差的指數期末下跌 70%：到期每張取回 $1,000 ＋［$1,000 × −70.00%］＝ $300.00，而且沒有最後一期配息。（S8, p.PS-10）

### 風險

- `[事實]` 這檔債券不保證返還本金。（S8, p.PS-13）
  > "The Notes do not guarantee any return of principal."
- `[事實]` 正報酬以有條件配息為限；即使指數上漲，投資人也不參與漲幅。（S8, p.PS-13）
  > "You will not participate in any appreciation in the level of any Index"
- `[事實]` 債券的存續期間可能短到大約六個月。（S8, p.PS-13）
  > "the term of the Notes may be as short as approximately six months"
- `[事實]` 被提前贖回後，投資人可能找不到風險與收益相當的投資來再投入。（S8, p.PS-13）
  > "You may not be able to reinvest any amounts received on the Call Settlement Date in a comparable investment with similar risk and yield."
- `[事實]` 持有這檔債券沒有指數成分股的股利或投票權。（S8, p.PS-14）
  > "you will not have voting rights or rights to receive cash dividends"

### 發行機構可贖回與自動提前出場的差別

- `[事實]` 有些結構型債券有提前贖回條款，由發行機構自行決定是否在到期前贖回。（S6, §Call risk）
  > "allow the issuer, at its sole discretion, to redeem the note before it matures"
- `[事實]` 提前贖回通常發生在對發行機構（而不是投資人）有利的時候。（S7, §Can I Get My Money）
  > "This generally happens when it is in the issuer's"

S8 這檔是依預先訂好的條件自動觸發，不是由發行機構裁量；S6、S7 描述的是發行機構有裁量權的情況。三份來源都指出同一個後果：錢提早回來時，投資人面臨再投資的問題。

## 相關頁面

- [[structured-note-architecture|結構型商品的組成]]
- [[estimated-value-vs-issue-price|估計價值與發行價]]
- [[eln-simplified|簡化 ELN]]
- [[issuer-credit-risk|發行機構信用風險]]
- [[liquidity-risk|流動性風險]]

## 來源

- [[s6-sec-structured-notes|S6]]：SEC, *Investor Bulletin: Structured Notes*（2015）
- [[s7-sec-finra-principal-protection|S7]]：FINRA／SEC, *Structured Notes with Principal Protection: Note the Terms of Your Investment*（2011）
- [[s8-barclays-phoenix-autocallable-424b2|S8]]：Barclays Bank PLC, *Pricing Supplement — Phoenix AutoCallable Notes due December 12, 2018*（424B2, 2015）

## 待補

- 沒有 autocallable 的定價公式或公式卡；它是延伸頁，`lab/` 不實作。
- 「發行機構可贖回與自動提前出場的差別」最後一段是把三份來源並列後的整理，沒有來源直接比較這兩種機制。
- 這檔商品實際上有沒有被提前出場、到期結果如何，文件發行時無從得知，本 wiki 也沒有後續資料。
