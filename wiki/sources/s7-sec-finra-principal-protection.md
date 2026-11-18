# S7｜SEC／FINRA 投資人警示：保本型結構型債券（Structured Notes with Principal Protection: Note the Terms of Your Investment）

> FINRA 與 SEC 投資人教育與倡導辦公室聯合發布的投資人警示。說明名稱帶有「保本」字樣的結構型債券並非沒有風險：保本取決於發行機構的信用、可能有條件或只保一部分、通常要持有到期才算數，而且有不易看見的成本。

## 來源資料

| 欄位 | 內容 |
|---|---|
| 來源 ID | S7 |
| 標題 | Structured Notes with Principal Protection: Note the Terms of Your Investment |
| 作者／機構 | FINRA 與 U.S. Securities and Exchange Commission, Office of Investor Education and Advocacy |
| 發布日期 | June 2, 2011 |
| URL | https://www.investor.gov/introduction-investing/general-resources/news-alerts/alerts-bulletins/investor-bulletins/structured |
| 取得日期 | 2026-11-18 |
| 原始檔路徑 | `raw/s7-sec-finra-principal-protection.html` |
| SHA-256 | `88e8ded906e80e49e0fc5d13c5773a6cd92ca8e7400b09a2c462247683d314b1` |
| 是否 commit | 是（刊登於 SEC 的 Investor.gov，依 `AGENTS.md` §7） |
| 取得狀態 | `ok`（自動下載） |

**出處寫法**：網頁沒有頁碼，引用時用警示內的小標題（縮寫），例如 `（S7, §How Do These Notes Protect）`。

**授權備註**：這份警示由 FINRA 與 SEC 共同發布。SEC 是聯邦機關；FINRA 是自律組織，不是政府機關。`AGENTS.md` §7 把 S7 列為預設 commit，本次照辦。Itzel 若認為共同作者中有非政府機關就不該 commit，可以把原檔移出 git，只留 MANIFEST 紀錄。

**使用注意**：原始檔是整個網頁，包含網站的導覽列與頁尾推廣區塊；那些不屬於警示本文，本 wiki 沒有引用。

## 來源重點摘要

- `[事實]` 名稱帶有「保本」「資本保證」「絕對報酬」「最低報酬」等字樣的結構型債券，並不是沒有風險。（S7, §Introduction）
  > "they are not risk-free"
- `[事實]` 任何返還本金的承諾，都取決於發行機構的信用；發行機構破產時，投資人可能損失全部資金。（S7, §Introduction）
  > "you could lose all of your money if the issuer of your note goes bankrupt"
- `[事實]` 保本型結構型債券通常是零息債券與選擇權（或其他衍生性商品）的組合。（S7, §What Are）
  > "the combination of a zero-coupon bond, which pays no interest until the bond matures, with an option or other derivative product"
- `[事實]` 通常要持有到期，發行機構才提供保本。（S7, §Introduction）
  > "you typically will receive principal protection from the issuer only if you hold your note until maturity"
- `[事實]` 這類商品可能有隱藏或內含的成本，金額可能相當高，而且不易理解。（S7, §Introduction）
  > "may have hidden or imputed costs that can be relatively high and difficult to understand"
- `[事實]` 警示聲明這份資料是對投資人的服務，不是法律解釋，也不是 SEC 的政策聲明。（S7, §Additional Resources）
  > "It is neither a legal interpretation nor a statement of SEC policy."

## 由本來源支撐的 wiki 頁

- [[principal-protected-note|保本型商品]]
- [[issuer-credit-risk|發行機構信用風險]]
- [[common-misconceptions|常見誤解]]
- [[estimated-value-vs-issue-price|估計價值與發行價]]
- [[liquidity-risk|流動性風險]]
- [[structured-note-architecture|結構型商品的組成]]
- [[eln-simplified|簡化 ELN]]
- [[glossary|術語表]]

## 可支撐其他頁的主張

### 提前贖回（供 autocallable）

- `[事實]` 提前贖回風險是指發行機構可能在到期前贖回債券。（S7, §Can I Get My Money）
  > "the possibility that the issuer could call or redeem your note before maturity"
- `[事實]` 債券本金雖然提早返還，投資人卻可能找不到收益率一樣好的類似投資。（S7, §Can I Get My Money）
  > "you might be unable to find a similar investment with as attractive a yield"

### 稅務（本次簡報不使用）

- `[事實]` 多數情況下，持有保本型結構型債券期間就必須繳聯邦稅，即使還沒收到任何現金。（S7, §How Are These Products Taxed）
  > "even if you haven't received any cash payments"

## 來源衝突紀錄

無。S6 與 S7 都有參與率的數字範例，但用的是不同的假設數字（S6：參與率 50%、漲 20%；S7：參與率 75%、漲 10%），不是衝突。

## 本來源沒有的內容

- 沒有說明零息債券與選擇權各佔多少比例、怎麼定價。
- 沒有估計價值與發行價差距的具體數字。
- 沒有提到 ELN 或不保本的結構型債券。
