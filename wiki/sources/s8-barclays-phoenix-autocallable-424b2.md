# S8｜Barclays Phoenix AutoCallable Notes 定價補充文件（424B2 Pricing Supplement）

> Barclays Bank PLC 在 2015 年 12 月向美國 SEC 申報的一份真實結構型債券定價補充文件。這檔三年期債券連結三個股價指數中表現最差的一個，有條件配息、自動提前出場、不保本。封面揭露發行機構自己的估計價值低於發行價。

## 來源資料

| 欄位 | 內容 |
|---|---|
| 來源 ID | S8 |
| 標題 | Pricing Supplement — Phoenix AutoCallable Notes due December 12, 2018, Linked to the Least Performing Index of the S&P 500 Index, the Russell 2000 Index and the NASDAQ-100 Index |
| 作者／機構 | Barclays Bank PLC（發行機構）；經 SEC EDGAR 系統申報，表格類型 424B2，Registration No. 333-190038 |
| 發布日期 | Pricing Supplement dated December 7, 2015 |
| URL | https://www.sec.gov/Archives/edgar/data/312070/000119312515398608/d101037d424b2.htm |
| 取得日期 | 2026-11-18 |
| 原始檔路徑 | `raw/s8-barclays-phoenix-autocallable-424b2.htm` |
| SHA-256 | `6e0d0b8eb4d653a875f21fbcacd0b8239d7ca3b1a698a8280b56dd745e466d7b` |
| 是否 commit | 否，只留本機 |
| 取得狀態 | `ok`（自動下載） |

**頁碼說明**：引用時使用文件中印的頁碼（PS-2 至 PS-22），寫成 `p.PS-4`。第一頁（封面）沒有印頁碼，寫成 `§cover`。

**授權確認**：這是發行機構向 SEC 申報的公開文件，可以在 EDGAR 自由查閱，但文件本身由 Barclays 撰寫，沒有授權第三方再散布的聲明。依 `AGENTS.md` §7（「無明確再散布授權則只留本機」），原檔不 commit。

**來源選擇**：`GRAPH_SPEC.md` §2.3 寫「選 1–2 份」並附這份作為範例。Itzel 於 2026-11-18 指定使用這一份。

**使用注意（重要）**：
- 文件中的指數水準（期初水準、障礙價的點數、歷史高低收盤表與走勢圖）註明取自 Bloomberg（S8, p.PS-17 起）。依 `GRAPH_SPEC.md` §9 的禁止事項，**本 wiki 沒有抄錄任何指數點數、代號或歷史數據**，只使用發行機構自己訂定的條款（百分比、每張金額、估計價值、佣金）與文件中以假設水準 100 計算的範例。
- 這是一檔 2015 年發行、2018 年到期的商品，早已不存在。本 wiki 只把它當作「真實文件長什麼樣子」的靜態案例，**不構成投資建議**，也不代表目前市場上的商品條件。
- 這檔商品的條款比簡化 ELN 複雜得多（三個指數取最差、每月觀察、有條件配息、自動提前出場、60% 障礙價）。它不是簡化 ELN 的實例。

## 來源重點摘要

- `[事實]` 發行機構以內部定價模型估計，這檔債券在期初評價日的價值是每張 $962.10，低於發行價。（S8, §cover）
  > "Our estimated value of the Notes on the Initial Valuation Date, based on our internal pricing models, is $962.10 per Note."
- `[範例]` 每張面額 $1,000，公開發行價為面額的 100%；承銷商佣金 2.15%（每張 $21.50）；發行機構實收 97.85%。（S8, §cover）
- `[事實]` 這檔債券不保本：若未被提前出場，且表現最差的指數在期末低於障礙價，投資人完全承擔該指數的跌幅，最多可能損失全部本金。（S8, §cover）
  > "You may lose up to 100% of the principal amount of your Notes."
- `[事實]` 正報酬以有條件配息為限；投資人不參與任何指數的上漲。（S8, p.PS-13）
  > "The positive return on the Notes is limited to the Contingent Coupons"
- `[事實]` 自動提前出場：自第六個觀察日起，若每個指數的收盤水準都不低於各自的期初水準，債券自動被贖回。（S8, p.PS-2）
  > "the Notes will be automatically called for a cash payment per $1,000 principal amount Note equal to the applicable Redemption Price"
- `[事實]` 所有付款都沒有第三方保證，取決於發行機構的信用。（S8, §cover）
  > "is not guaranteed by any third party and is subject to both the creditworthiness of the Issuer"

章節結構：封面與條款（§cover、p.PS-2）、附加條款（p.PS-3）、估計價值的補充說明與英國 bail-in 權力（p.PS-4）、配息的假設範例（p.PS-5）、提前出場與到期的假設範例（p.PS-6 至 PS-10）、購買考量與稅務（p.PS-11 至 PS-12）、風險考量（p.PS-13 至 PS-16）、指數資訊與歷史表現（p.PS-17 至 PS-21）、承銷（p.PS-22）。

## 由本來源支撐的 wiki 頁

- [[estimated-value-vs-issue-price|估計價值與發行價]]
- [[autocallable|自動提前出場型商品]]
- [[eln-simplified|簡化 ELN]]
- [[issuer-credit-risk|發行機構信用風險]]
- [[liquidity-risk|流動性風險]]
- [[common-misconceptions|常見誤解]]
- [[glossary|術語表]]

## 可支撐其他頁的主張

### 英國 bail-in 權力（本次簡報不使用）

- `[事實]` 投資人購買時即同意受英國主管機關的 bail-in 權力約束；該權力行使時，應付金額可能被註銷或轉換成其他證券。（S8, p.PS-4）
  > "you acknowledge, agree to be bound by, and consent to the exercise of any U.K. Bail-in Power"

### 利益衝突（本次簡報不使用）

- `[事實]` 發行機構與關係企業自行訂定發行價，沒有經過獨立的查證或評價。（S8, p.PS-15）
  > "the offering price is not based upon any independent verification or valuation"

## 來源衝突紀錄

無。S8 與 S6、S7 對「估計價值低於發行價及其原因」的說法一致。

## 本來源沒有的內容

- 沒有說明估計價值用的是哪一種定價模型、什麼波動率數值；只說模型考慮波動率、利率與內部資金利率。
- 沒有把估計價值拆成「債券部分」與「選擇權部分」各多少。
- 配息金額是怎麼決定的，文件沒有說明。
