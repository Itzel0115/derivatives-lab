# S10｜黑暗中的笑聲：波動率微笑的問題（Laughter in the Dark — The Problem of the Volatility Smile）

> Emanuel Derman 2003 年的演講稿，回顧波動率微笑在 1987 年股災後出現、擴散到各個市場，以及業界 15 年來嘗試用各種模型解釋它的經過。

## 來源資料

| 欄位 | 內容 |
|---|---|
| 來源 ID | S10 |
| 標題 | Laughter in the Dark — The Problem of the Volatility Smile |
| 作者／機構 | Emanuel Derman（Euronext Options Conference, Amsterdam 的演講） |
| 發布日期 | May 26, 2003 |
| URL | 頁面：https://emanuelderman.com/?p=5654 ；檔案：https://emanuelderman.com/wp-content/uploads/2003/04/Amsterdam.pdf |
| 取得日期 | 2026-11-18 |
| 原始檔路徑 | `raw/s10-derman-laughter-in-the-dark.pdf`（13 頁） |
| SHA-256 | `112c601653ee7764f180837a5fb2d3d3b4f68772efb0154d540913c155b5a3dd` |
| 是否 commit | 否，只留本機（作者網站公開，未見授權條款） |
| 取得狀態 | `ok`（自動下載） |

**頁碼說明**：文件沒有印頁碼，引用時使用 PDF 頁序（p.1–13）。

**加入經過**：本來源不在 `GRAPH_SPEC.md` 原始清單中，2026-11-18 經 Itzel 核准加入，用來補 S3 缺少的講義內容。

## 來源重點摘要

- `[事實]` 依照古典理論，選擇權的 Black-Scholes 隱含波動率應該與履約價、到期日無關，畫成曲面應該是平的。（S10, p.1）
  > "the Black-Scholes implied volatility of an option should be independent of its strike and expiration"
- `[事實]` 1987 年 10 月股災之前，指數選擇權的波動率曲面確實相當平；股災之後變得偏斜。（S10, p.1）
  > "Since the crash, the volatility surface of index options has become skewed."
- `[事實]` 微笑現象後來擴散到個股、利率、外匯等幾乎所有選擇權市場，各市場的形狀不同。（S10, p.1）
  > "The smile phenomenon has spread to stock options, interest-rate options, currency"
- `[事實]` 15 年後，業界對哪個模型才正確仍然沒有共識。（S10, p.1）
  > "After 15 years, there is still no overwhelming consensus as to the correct model."
- `[事實]` 文件後半介紹三類解釋微笑的模型：局部波動率、隨機波動率、跳躍擴散，各有優缺點。（S10, p.6–11）
  > "The earliest models of the smile were what are now called local volatility models."
- `[觀點]` Derman 認為，所有金融模型都是錯的，頂多在人們改變行為之前暫時成立。（S10, p.13）
  > "All financial models are wrong, or at best hold only for a little while until people change their behavior."

## 由本來源支撐的 wiki 頁

- [[volatility-smile-skew|波動率微笑與偏斜]]
- [[why-skew-exists|為什麼會有偏斜]]
- [[volatility-surface|波動率曲面]]
- [[bs-assumptions-limitations|Black-Scholes 的假設與限制]]
- [[glossary|術語表]]

## 可支撐其他頁的主張

### 微笑對實務的影響（供 estimated-value-vs-issue-price、簡報講者備註）

- `[事實]` 如果 Black-Scholes 無法解釋隱含波動率，它就給不出可靠的避險比率。（S10, p.3）
  > "we needed a model to hedge it"
- `[事實]` 每個履約價的隱含波動率不同，就產生一個難題：評價內含多個履約價的新奇選擇權時，該用哪一個波動率。（S10, p.3）
  > "What volatility should you use? It was a serious dilemma."
- `[觀點]` Derman 認為，模型風險最嚴重的領域就是波動率微笑的建模。（S10, p.4）
  > "there is no area where model risk is more of an issue than in the modeling of the volatility smile"

### 三類模型（延伸，本次簡報不使用）

- `[事實]` 局部波動率模型把 Black-Scholes 的常數波動率，推廣為隨股價變動的波動率。（S10, p.6）
  > "to a process with a stock-price-dependent volatility"
- `[事實]` 隨機波動率模型假設波動率本身也在波動，並會回歸長期平均。（S10, p.9）
  > "fluctuating but reverting towards a long-term mean"
- `[事實]` 跳躍擴散模型在 Black-Scholes 的連續擴散之外，加入價格的跳躍與崩跌。（S10, p.10）
  > "practitioners have added jumps and crashes to the standard"

## 來源衝突紀錄

無。來源內部有一處不一致，不屬於來源之間的衝突：正文說作者是在 1990 年 12 月於東京第一次看到 Nikkei 選擇權的偏斜（p.2），但 Figure 1 的圖說寫的是「late 1994」的典型微笑（p.2）。本 wiki 引用時分別照抄，不合併。

## 本來源沒有的內容

- 沒有 Black-Scholes 公式本身，也沒有隱含波動率的正式定義。
- 圖中的數值只能從圖上讀，文件沒有提供數據表；本 wiki 只引用正文與圖說中寫出的數字。
- 沒有期限結構的專門說明，只提到曲面的高度隨到期日變化。
