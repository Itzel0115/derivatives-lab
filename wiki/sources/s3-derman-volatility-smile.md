# S3｜波動率微笑導論：課程大綱（An Introduction to the Volatility Smile）

> Emanuel Derman 2013 年在香港短期課程的課程目標與大綱，只有 3 頁。它列出課程要談的主題，但沒有講義本文。

## 來源資料

| 欄位 | 內容 |
|---|---|
| 來源 ID | S3 |
| 標題 | An Introduction to the Volatility Smile（Hong Kong 2013） |
| 作者／機構 | Emanuel Derman；由香港中文大學 Centre for Financial Engineering 公告 |
| 發布日期 | 2013（課程年份；活動頁最後更新 2019-06-24） |
| URL | 活動頁：https://www.cfe.cuhk.edu.hk/?p=4264 ；檔案：https://www.cfe.cuhk.edu.hk/wp-content/uploads/2019/06/Volatility-Smile-Derman-Hong-Kong.pdf |
| 取得日期 | 2026-11-18 |
| 原始檔路徑 | `raw/s3-derman-volatility-smile.pdf`（3 頁） |
| SHA-256 | `8338a43c21b2e210db812017effe7cc8bbef938322b5b6621d11dc5af0af3f33` |
| 是否 commit | 否，只留本機 |
| 取得狀態 | `ok`，但內容與規格原先的預期不同（見下） |

**頁碼說明**：使用頁尾的「Page n of 3」，與 PDF 頁序相同。

**重要限制**：`GRAPH_SPEC.md` 原本把 S3 當作「講義」，預期它支撐 Black-Scholes 假設、隱含波動率、smile 與 skew 成因等內容。實際上指定網址只有這份大綱：第 1 頁是課程目標，第 2–3 頁是條列的主題標題。這些內容已改由 S10–S13 支撐（2026-11-18 經 Itzel 核准）。活動頁上的原始檔案連結主機（cfe01.se.cuhk.edu.hk）已無法解析，檔案是從同路徑的 www 主機取得。

## 來源重點摘要

- `[事實]` 課程的主題包括：理解 Black-Scholes-Merton 模型的實務用法、它的成功與限制、波動率微笑，以及為了解釋微笑而對模型做的延伸。（S3, p.1）
  > "Understanding the successes and limitations of the Black-Scholes model."
- `[觀點]` Derman 認為，金融模型背後的假設沒有一個是真正成立的，也沒有任何金融模型是真正正確的，所以重要的是清楚自己在做什麼、為什麼這樣做。（S3, p.1）
  > "No assumptions behind financial models are genuinely true, and no financial models are really correct"
- `[觀點]` Derman 認為，要會用 Black-Scholes-Merton 模型，光是知道方程式和它的解並不夠。（S3, p.1）
  > "There's more to it than just knowing the equation and its solution."
- `[事實]` 大綱列出的主題中，與本專案相關的有：各市場的 smile、smile 的成因、smile 大小的無套利界限。這些只有標題，沒有內容。（S3, p.2）
  > "No-riskless-arbitrage bounds on the size of the smile"

## 由本來源支撐的 wiki 頁

- [[bs-assumptions-limitations|Black-Scholes 的假設與限制]]

## 來源衝突紀錄

無。

## 本來源沒有的內容

- 沒有 Black-Scholes 公式、任何假設的具體說明、put-call parity、隱含波動率的定義。
- 沒有 smile、skew、期限結構的描述或成因，只有主題標題。
