# 保本型商品（Principal Protected Note）

> 「保本」是指條款約定到期時返還本金。但這個約定仍然取決於發行機構還不還得出錢，所以保本不等於不會虧。

**範圍**：延伸頁，供期末擴充。本次簡報只在「常見誤解」中提到保本。

**提醒**：本頁是教學說明，**不構成投資建議**。

## 重點主張

- `[事實]` 有些結構型債券約定到期時返還本金，這通常稱為「保本」。（S6, §Market risk）
  > "Some structured notes provide for the repayment of principal at maturity, which is often referred to as "principal protection.""
- `[事實]` 這個保本受發行機構的信用風險影響。（S6, §Market risk）
  > "This principal protection is subject to the credit risk of the issuing financial institution."
- `[事實]` 許多結構型債券並沒有保本的設計。（S6, §Market risk）
  > "Many structured notes do not offer this feature."
- `[事實]` 保本型債券是賣給個人投資人的常見結構型債券類型之一。（S6, §What are Structured Notes?）
  > "principal protected notes, reverse convertible notes, enhanced participation or leveraged notes, and hybrid notes that combine multiple characteristics"
- `[事實]` 有些結構型債券除了返還本金，還會依參考資產的漲幅乘上一個固定比例（參與率）給付額外報酬。（S6, §Participation rates）
  > "This percentage is often called the participation rate."
- `[範例]` 若參與率是 50%，而參考資產或指數上漲 20%，付給投資人的報酬是 10%（20% 的 50%）。（S6, §Participation rates）

### 怎麼組成（S7）

- `[事實]` 保本型結構型債券通常是零息債券與選擇權（或其他衍生性商品）的組合；零息債券到期前不付息。（S7, §What Are）
  > "the combination of a zero-coupon bond, which pays no interest until the bond matures, with an option or other derivative product"
- `[事實]` 結構型商品並不代表持有任何資產組合，而是發行機構的付款承諾。（S7, §What Are）
  > "do not represent ownership of any portfolio of assets but rather are promises to pay made by the product issuers"

### 保本的程度與條件（S7）

- `[事實]` 名稱帶有「保本」等字樣的結構型債券，並不是沒有風險。（S7, §Introduction）
  > "they are not risk-free"
- `[事實]` 保本的程度不一：有的到期返還 100% 本金，有的只返還 10%。（S7, §How Do These Notes Protect）
  > "While some products return 100 percent of principal at maturity, others return as little as 10 percent."
- `[事實]` 有些保本附有條件（contingent protection），條件不成立時可能完全沒有保護。（S7, §How Do These Notes Protect）
  > "so it may provide no protection at all, even if the sales materials suggest otherwise"
- `[事實]` 通常要持有到期，發行機構才提供保本。（S7, §Introduction）
  > "you typically will receive principal protection from the issuer only if you hold your note until maturity"
- `[事實]` 保本通常指名目本金，不提供通膨保護。（S7, §Other Costs or Tradeoffs）
  > "the principal protection generally relates to nominal principal and does not offer inflation protection"

### 保本的代價（S7）

- `[事實]` 這類債券的表現可能不如一般固定利率債券，甚至持有到期也完全沒有報酬。（S7, §Introduction）
  > "could earn no return for the entire term of the note, even if you hold the note to maturity"
- `[事實]` 上漲的參與可能受限或有上限，這通常是提供保本的交換條件。（S7, §Calculate the Return）
  > "your upside exposure to the underlying asset, index or benchmark is limited or capped, which is generally a tradeoff for offering the principal protection"
- `[範例]` 參與率：若參與率是 75%，而標的上漲 10%，記入債券的報酬是 7.5%。（S7, §Calculate the Return）
- `[範例]` 最低保證報酬：到期返還 100% 本金、最低保證報酬 2% 的債券，不論標的表現如何，到期支付原始投資的 102%。（S7, §Calculate the Return）
- `[範例]` 「鯊魚鰭」報償的假設例子：保本 10%；指數漲幅在 40% 以內時 100% 參與；指數在存續期間任何時候漲超過 40%，到期一律返還 110%。結果是指數漲 40% 時返還本金的 140%，但漲 41%（任何時候達到）到期只返還 110%。（S7, §Calculate the Return）
- `[範例]` 同一個假設例子中，指數到期時下跌 15%，債券損失 5%，返還本金的 95%；指數下跌 75%，債券損失 65%，返還本金的 35%。（S7, §Calculate the Return）

## 相關頁面

- [[structured-note-architecture|結構型商品的組成]]
- [[issuer-credit-risk|發行機構信用風險]]
- [[common-misconceptions|常見誤解]]

## 來源

- [[s6-sec-structured-notes|S6]]：SEC, *Investor Bulletin: Structured Notes*（2015）
- [[s7-sec-finra-principal-protection|S7]]：FINRA／SEC, *Structured Notes with Principal Protection: Note the Terms of Your Investment*（2011）

## 待補

- S7 說明保本型商品是「零息債券＋選擇權」，但沒有說明兩者各佔多少、選擇權是買進還是賣出、如何定價。本 wiki 沒有保本型商品的公式卡。
