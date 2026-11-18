# 結構型商品的組成（Structured Note Architecture）

> 結構型債券＝一張債券＋一個內嵌的衍生性商品。債券部分決定到期能拿回多少本金，衍生性商品部分決定報酬怎麼跟著標的走。

**提醒**：本頁是教學說明，內容整理自 SEC 的投資人公告，**不構成投資建議**。

## 重點主張

### 兩個組成部分

- `[事實]` 結構型債券有固定的到期日，由兩個部分組成：債券部分，以及內嵌的衍生性商品。（S6, §What are Structured Notes?）
  > "include two components - a bond component and an embedded derivative"
- `[事實]` 它的報酬「連結」到某個參考資產或指數的表現。（S6, §What are Structured Notes?）
  > "your return is "linked" to the performance of a reference asset or index"
- `[事實]` 報酬可以連結的對象包括股價指數、單一股票、一籃子股票、利率、商品、外匯。（S6, §What are Structured Notes?）
  > "Structured notes are securities issued by financial institutions whose returns are based on, among other things, equity indexes, a single equity security, a basket of equity securities"

### 誰設計、誰銷售

- `[事實]` 通常由金融機構設計並發行，再由券商賣給個人投資人。（S6, §What are Structured Notes?）
  > "Financial institutions typically design and issue structured notes, and broker-dealers sell them to individual investors."
- `[事實]` 賣給個人投資人的常見類型：保本型、reverse convertible、加強參與或槓桿型，以及混合多種特性的類型。（S6, §What are Structured Notes?）
  > "principal protected notes, reverse convertible notes, enhanced participation or leveraged notes, and hybrid notes that combine multiple characteristics"

### 報償結構可以很複雜

- `[事實]` 報償的計算可能包含對標的表現的槓桿、對標的下跌的保護，以及費用。（S6, §Complexity）
  > "protection from losses should the reference asset or index produce negative returns, and fees"
- `[事實]` 報償結構可以是槓桿、反向或反向槓桿，可能放大報酬或損失。（S6, §Payoff structure）
  > "Payoff structures can be leveraged, inverse, or inverse-leveraged, which may result in larger returns or losses for you."
- `[範例]` 參與率：若參與率是 50%，而參考資產或指數上漲 20%，付給投資人的報酬是 10%（20% 的 50%）。（S6, §Participation rates）
- `[範例]` 報酬上限：某債券兩年後返還 100% 的投入資金，另加 S&P 500 的漲幅，但上限 20%。若 S&P 500 兩年漲了 25%，投資人只得到 20%。（S6, §Capped maximum returns）
- `[事實]` 觸及價（knock-in）：若參考資產在存續期間跌破預先設定的水準，投資人到期時可能損失部分或全部本金。（S6, §Knock-in feature）
  > "you may lose some or all of your principal investment at maturity and also could lose coupon payments"
- `[事實]` 某些結構型債券到期時交付給投資人的，是已經下跌的參考資產本身。（S6, §Knock-in feature）
  > "you may actually receive the reference asset that has declined in value during the term of the note"

### 可以自己拆開來買嗎

- `[事實]` SEC 建議投資人問的問題之一：能不能分別買進結構型債券的部分或全部組成，而且價格更好。（S6, §Questions to Ask）
  > "can I purchase some or all of the components of the structured note separately for a better price?"

## 相關頁面

- [[eln-simplified|簡化 ELN]]
- [[estimated-value-vs-issue-price|估計價值與發行價]]
- [[principal-protected-note|保本型商品]]
- [[issuer-credit-risk|發行機構信用風險]]
- [[liquidity-risk|流動性風險]]
- [[call-put-option|買權與賣權]]

## 來源

- [[s6-sec-structured-notes|S6]]：SEC, *Investor Bulletin: Structured Notes*（2015）

## 待補

- 頁首的一句話摘要中，「債券部分決定本金、衍生性商品部分決定報酬」是把 S6 的兩個組成對應到功能的說法。S6 只說有這兩個部分，沒有逐一說明各自的功能；[[eln-simplified|簡化 ELN]] 的 F08 用一個具體例子呈現這個拆解。
- S6 沒有說明內嵌的衍生性商品是哪一種選擇權。
