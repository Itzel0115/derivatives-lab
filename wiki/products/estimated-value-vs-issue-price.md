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

## 相關頁面

- [[structured-note-architecture|結構型商品的組成]]
- [[eln-simplified|簡化 ELN]]
- [[liquidity-risk|流動性風險]]

## 來源

- [[s6-sec-structured-notes|S6]]：SEC, *Investor Bulletin: Structured Notes*（2015）
- [[s7-sec-finra-principal-protection|S7]]：FINRA／SEC, *Structured Notes with Principal Protection: Note the Terms of Your Investment*（2011）

## 待補

- 沒有任何具體數字。真實商品的估計價值與發行價各是多少，要等 S8（EDGAR 的 pricing supplement）ingest。簡報 S16 需要的數字只能來自 S8。
- 估計價值是怎麼算出來的（用什麼模型、什麼波動率），S6 與 S7 都沒有說明。
- S7 談的是保本型結構型債券；本頁假設同樣的定價方式（公平價值加價差）也適用於其他結構型債券，這與 S6 對一般結構型債券的說法一致，但 S7 本身沒有這樣說。
