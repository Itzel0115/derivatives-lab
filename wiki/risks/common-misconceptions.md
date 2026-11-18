# 常見誤解（Common Misconceptions）

> 三個容易混淆的說法，以及來源實際上怎麼說：隱含波動率高不代表會漲或會跌；保本不代表不會虧；票息高不代表報酬高。

**提醒**：本頁是教學說明，**不構成投資建議**。

**關於「常見」**：這三個誤解是 `GRAPH_SPEC.md` §2.4 指定要整理的。目前的來源沒有統計過它們有多普遍；本頁只整理「這個說法為什麼不對」的依據。

## 重點主張

### 誤解一：隱含波動率高，代表市場看漲（或看跌）

- `[事實]` 其他定價因素不變時，隱含波動率上升，call 和 put 的價格都會上升。（S5, p.17）
  > "both call and put prices will increase"
- `[事實]` Call 和 put 的 vega 都是正的。（S5, p.18）
  > "Calls and puts both have positive Vega"
- `[事實]` 隱含波動率反映的是市場預期的標的「波動」程度。（S5, p.16）
  > "Reflects underlying stock volatility expected by marketplace"
- `[事實]` 波動類指數歷史上傾向和參考指數反向變動，但這個關係不一定成立；參考指數上漲時，波動類指數也可能同時上升。（S1, p.26）
  > "a variability index may be rising at a time when its reference index or the price of its reference security is also rising"

整理：隱含波動率上升會讓看漲的 call 和看跌的 put 同時變貴，所以它本身不指出方向，只反映預期的波動幅度。

### 誤解二：保本，所以不會虧

- `[事實]` 保本受發行機構的信用風險影響。（S6, §Market risk）
  > "This principal protection is subject to the credit risk of the issuing financial institution."
- `[事實]` 發行機構的付款承諾，包括任何保本條款，都只跟發行機構的財務健全程度一樣可靠。（S6, §Credit risk）
  > "are only as good as the financial health of the structured note issuer"
- `[事實]` 到期前想賣出，可能得接受低於買進價的價格，也可能根本賣不掉。（S6, §Questions to Ask）
  > "you might have to do so at a price less than the amount you paid for it, or you may not be able to sell it at all"
- `[事實]` 投資人在發行時支付的價格，很可能高於該債券在發行日的公平價值。（S6, §Issuance price and note value）
  > "The price you will pay for a structured note at issuance will likely be higher than the fair value of the structured note on the date of issuance."

整理：保本是發行機構的承諾，不是保證。發行機構違約、到期前賣出，或是把買進時多付的成本算進去，都可能讓投資人虧損。

### 誤解三：票息（配息）高，所以報酬高

- `[事實]` 買進結構型債券並不保證有正報酬。（S6, §Questions to Ask）
  > "Purchasing a structured note does not guarantee positive returns."
- `[事實]` 不保本的結構型債券，連結資產的表現可能讓投資人損失部分或全部本金。（S6, §Market risk）
  > "the performance of the linked asset or index may cause you to lose some, or all, of your principal"
- `[事實]` 某些結構型債券到期時交付給投資人的，是已經下跌的參考資產本身。（S6, §Knock-in feature）
  > "you may actually receive the reference asset that has declined in value during the term of the note"
- `[範例]` XYZ 股價 $50 時，投資人賣出一口 XYZ 50 put，收到權利金 $300（每股 $3）。之後股價跌到 $40 並被指派履約，她必須以 $50 買進股票；扣掉每股 $3 權利金後有效成本是 $47，仍遠高於 $40 的市價。（S1, p.65）
- `[推導]` 在簡化 ELN 中，票息高於無風險利息的部分，來自投資人賣出 put 所收的權利金（F17）；標的波動越大，這筆權利金越高，票息也越高。推導見 [[eln-simplified|簡化 ELN]]；測試：C3-10。（S13, p.11）

整理：高票息是承擔下跌風險的報酬，不是白拿的。票息越高，通常代表賣出的 put 越值錢，也就是市場認為大跌的風險越大。

## 相關頁面

- [[implied-volatility|隱含波動率]]
- [[vega|Vega]]
- [[eln-simplified|簡化 ELN]]
- [[principal-protected-note|保本型商品]]
- [[issuer-credit-risk|發行機構信用風險]]
- [[liquidity-risk|流動性風險]]
- [[estimated-value-vs-issue-price|估計價值與發行價]]

## 來源

- [[s1-occ-characteristics-risks|S1]]：OCC, *Characteristics and Risks of Standardized Options*（June 2024）
- [[s5-oic-understanding-greeks|S5]]：OCC／OIC, *Making More Informed Decisions: Understanding Greeks*（2023）
- [[s6-sec-structured-notes|S6]]：SEC, *Investor Bulletin: Structured Notes*（2015）
- [[s13-mit-18440-risk-neutral-black-scholes|S13]]：MIT OpenCourseWare 18.440 Lecture 36, Sheffield（Spring 2014）

## 待補

- 三段「整理」是把上面各條主張串起來的說明，不是來源原句。簡報引用時應引用個別主張，不是「整理」那一段。
- 誤解三最後一句「票息越高，通常代表市場認為大跌的風險越大」是由 F17 與 vega 為正推出來的，只在簡化 ELN 的模型內成立；對真實商品沒有來源支撐。
- S7（保本型商品警示）與 S9（台灣案例）尚未 ingest，預期會補充誤解二與誤解三的實例。
