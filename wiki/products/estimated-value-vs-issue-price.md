# 估計價值與發行價（Estimated Value vs. Issue Price）

> 投資人買結構型債券付的價格，通常高於它在發行當天的公平價值。差額來自發行機構把銷售、設計與避險的成本算進了發行價。

**提醒**：本頁是教學說明，**不構成投資建議**。

## 重點主張

- `[事實]` 投資人在發行時支付的價格，很可能高於該結構型債券在發行日的公平價值。（S6, §Issuance price and note value）
  > "The price you will pay for a structured note at issuance will likely be higher than the fair value of the structured note on the date of issuance."
- `[事實]` 發行機構現在會在公開說明書的封面揭露結構型債券的估計價值，讓投資人衡量它與發行價的差距。（S6, §Issuance price and note value）
  > "Issuers now disclose an estimated value of the structured note on the cover page of the offering prospectus"
- `[事實]` 估計價值很可能低於發行價，原因是發行機構把銷售、設計結構與避險的成本算進了初始價格。（S6, §Issuance price and note value）
  > "issuers include the costs for selling, structuring or hedging the exposure on the note in the initial price of their notes"
- `[事實]` 發行之後，結構型債券可能無法每天轉售，加上結構複雜，所以不容易評價。（S6, §Issuance price and note value）
  > "may be difficult to value given their complexity"
- `[事實]` SEC 建議投資人問：我付的價格比發行機構的估計價值高出多少。（S6, §Questions to Ask）
  > "How much above an issuer's estimated value of a structured note will I be paying for the structured note?"

### 差額是怎麼來的（S7）

- `[事實]` 發行時，每一檔債券依其結構都有一個估計的公平價值。（S7, §Other Costs or Tradeoffs）
  > "At issuance, any given note will have an estimated fair value based on its structure."
- `[事實]` 發行機構通常在這個價值上加一段價差，得出商品的發行價。（S7, §Other Costs or Tradeoffs）
  > "The issuer generally raises this value by a spread to arrive at the offering price of the product"
- `[事實]` 這段價差涵蓋發行機構在債券存續期間的成本（例如避險成本），以及發行機構的利潤。（S7, §Other Costs or Tradeoffs）
  > "such as costs of hedging, as well as the issuer's profit"
- `[事實]` 這些成本對投資人通常是不透明的。（S7, §Other Costs or Tradeoffs）
  > "These costs generally are not transparent to investors."
- `[事實]` 買結構型商品的隱藏成本，包括投資人原本可以自己用更低的成本組出類似的投資組合。（S7, §Other Costs or Tradeoffs）
  > "you could have assembled a similar bundle of investments on your own at a lower cost"
- `[事實]` 幾乎每一種投資都有明示或隱含的費用。（S7, §Fees）
  > "Virtually every investment has either implicit or explicit fees"

### 一份真實文件怎麼寫（S8）

以下是 Barclays 2015 年一檔自動提前出場型債券的定價補充文件。它是已到期的商品，只當作靜態案例。

- `[範例]` 每張面額 $1,000，公開發行價是面額的 100%。（S8, §cover）
- `[事實]` 發行機構以內部定價模型估計，這檔債券在期初評價日的價值是每張 $962.10。（S8, §cover）
  > "Our estimated value of the Notes on the Initial Valuation Date, based on our internal pricing models, is $962.10 per Note."
- `[事實]` 文件直接寫明：估計價值低於發行價。（S8, §cover）
  > "The estimated value is less than the initial issue price of the Notes."
- `[範例]` 承銷商 Barclays Capital Inc. 收取面額 2.15% 的佣金，即每張 $21.50；發行機構實收面額的 97.85%。（S8, §cover）
- `[事實]` 差額的來源包括：銷售佣金、發行機構預期賺取的利潤、預估的避險成本，以及開發等其他成本。（S8, p.PS-4）
  > "the estimated profit that we or any of our affiliates expect to earn in connection with structuring the Notes"
- `[事實]` 內部定價模型考慮的變數通常包括波動率、利率，以及發行機構的內部資金利率。（S8, p.PS-4）
  > "typically including volatility, interest rates, and our internal funding rates"
- `[事實]` 這些變數與假設沒有經過獨立的評估或查證；其他金融機構的模型可能算出不同的結果。（S8, p.PS-15）
  > "These variables and assumptions are not evaluated or verified on an independent basis."
- `[事實]` 估計價值不是對次級市場成交價的預測。（S8, p.PS-4）
  > "Our estimated value on the Initial Valuation Date is not a prediction of the price at which the Notes may trade in the secondary market"
- `[事實]` 次級市場的價格很可能低於發行價。（S8, p.PS-15）
  > "secondary market prices of your Notes will likely be lower than the initial issue price of your Notes"

## 相關頁面

- [[structured-note-architecture|結構型商品的組成]]
- [[eln-simplified|簡化 ELN]]
- [[liquidity-risk|流動性風險]]
- [[autocallable|自動提前出場型商品]]
- [[vega|Vega]]

## 來源

- [[s6-sec-structured-notes|S6]]：SEC, *Investor Bulletin: Structured Notes*（2015）
- [[s7-sec-finra-principal-protection|S7]]：FINRA／SEC, *Structured Notes with Principal Protection: Note the Terms of Your Investment*（2011）
- [[s8-barclays-phoenix-autocallable-424b2|S8]]：Barclays Bank PLC, *Pricing Supplement — Phoenix AutoCallable Notes due December 12, 2018*（424B2, 2015）

## 待補

- 本頁只有 S8 這一個真實案例。它說明「文件會這樣揭露」，不代表一般商品的差距大小。
- 發行價與估計價值的差額（$1,000 與 $962.10 相減）以及它佔面額的比例，文件沒有直接寫出。簡報若要呈現這個差額，應並列兩個原始數字，或用 `{{calc:...}}` 計算，不得自行寫出結果。
- 估計價值用的是哪一種模型、什麼波動率數值，S6、S7、S8 都沒有說明；S8 只說模型會考慮波動率。
- 佣金（2.15%）只是差額的一部分；其餘部分各佔多少，文件沒有拆分。
- S7 談的是保本型結構型債券；本頁假設同樣的定價方式（公平價值加價差）也適用於其他結構型債券，這與 S6 對一般結構型債券的說法一致，但 S7 本身沒有這樣說。
