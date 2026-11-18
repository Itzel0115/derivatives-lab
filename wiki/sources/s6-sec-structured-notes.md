# S6｜SEC 投資人公告：結構型債券（Investor Bulletin: Structured Notes）

> 美國證管會（SEC）投資人教育與倡導辦公室寫給一般投資人的公告，說明結構型債券是什麼、有哪些風險，以及投資前該問的問題。

## 來源資料

| 欄位 | 內容 |
|---|---|
| 來源 ID | S6 |
| 標題 | Investor Bulletin: Structured Notes |
| 作者／機構 | U.S. Securities and Exchange Commission, Office of Investor Education and Advocacy |
| 發布日期 | Jan. 12, 2015 |
| URL | https://investor.gov/additional-resources/news-alerts/alerts-bulletins/investor-bulletin-structured-notes （會轉址到 https://www.investor.gov/introduction-investing/general-resources/news-alerts/alerts-bulletins/investor-bulletins-76） |
| 取得日期 | 2026-11-18 |
| 原始檔路徑 | `raw/s6-sec-structured-notes.html` |
| SHA-256 | `ce95b6abe261458f2b542575db44ddc00ad3d433dc76ac58e0ee1b1f02546467` |
| 是否 commit | 是（美國聯邦政府機關發布的投資人公告，依 `AGENTS.md` §7） |
| 取得狀態 | `ok`（自動下載） |

**出處寫法**：網頁沒有頁碼，引用時用公告內的小標題，例如 `（S6, §Credit risk）`。

**使用注意**：原始檔是整個網頁，包含網站的導覽列與頁尾推廣區塊；那些不屬於公告本文，本 wiki 沒有引用。

## 來源重點摘要

- `[事實]` 結構型債券是金融機構發行的證券，報酬連結到股價指數、單一股票、一籃子股票、利率、商品或外匯等。（S6, §What are Structured Notes?）
  > "Structured notes are securities issued by financial institutions whose returns are based on, among other things, equity indexes, a single equity security, a basket of equity securities"
- `[事實]` 結構型債券有固定的到期日，由兩個部分組成：債券部分，以及內嵌的衍生性商品。（S6, §What are Structured Notes?）
  > "include two components - a bond component and an embedded derivative"
- `[事實]` 這類商品可能非常複雜，並有重大的投資風險。（S6, §Introduction）
  > "these products can be very complex and have significant investment risks"
- `[事實]` 公告列出的風險與注意事項包括：複雜性、市場風險、發行價與價值的差距、流動性、報償結構、信用風險、提前贖回風險、稅務。（S6, §Risks and Other Considerations）
  > "Risks and Other Considerations with Structured Notes"
- `[事實]` 公告聲明這份資料是對投資人的服務，不是法律解釋，也不是 SEC 的政策聲明。（S6, §Related Information）
  > "It is neither a legal interpretation nor a statement of SEC policy."

## 由本來源支撐的 wiki 頁

- [[structured-note-architecture|結構型商品的組成]]
- [[eln-simplified|簡化 ELN]]
- [[estimated-value-vs-issue-price|估計價值與發行價]]
- [[principal-protected-note|保本型商品]]
- [[issuer-credit-risk|發行機構信用風險]]
- [[liquidity-risk|流動性風險]]
- [[common-misconceptions|常見誤解]]
- [[glossary|術語表]]

## 可支撐其他頁的主張

### 提前贖回（供 autocallable）

- `[事實]` 有些結構型債券有提前贖回條款，發行機構可以自行決定在到期前贖回，價格可能高於、低於或等於面額。（S6, §Call risk）
  > "allow the issuer, at its sole discretion, to redeem the note before it matures"
- `[事實]` 被提前贖回後，投資人可能無法以原本的報酬率再投資。（S6, §Call risk）
  > "investors may not be able to reinvest their money at the same rate of return"

## 來源衝突紀錄

無。

## 本來源沒有的內容

- 沒有提到「ELN」或「股權連結債券」這個名稱。公告列出 reverse convertible notes 是常見類型之一，但沒有定義它。
- 沒有任何定價公式，也沒有說明內嵌的衍生性商品具體是哪一種選擇權。
- 沒有估計價值與發行價差距的具體數字。
