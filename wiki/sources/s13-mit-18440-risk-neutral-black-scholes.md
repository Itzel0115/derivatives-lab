# S13｜風險中立機率與 Black-Scholes（MIT 18.440 Lecture 36）

> MIT 開放課程 18.440（機率與隨機變數）第 36 講的投影片，講者是 Scott Sheffield。用大學機率課的語言說明風險中立機率、Black-Scholes 的主要假設與公式，並用兩張投影片解釋隱含波動率與模型為什麼不完全正確。

## 來源資料

| 欄位 | 內容 |
|---|---|
| 來源 ID | S13 |
| 標題 | 18.440: Lecture 36 — Risk Neutral Probability and Black-Scholes |
| 作者／機構 | Scott Sheffield；MIT OpenCourseWare, 18.440 Probability and Random Variables |
| 發布日期 | Spring 2014 |
| URL | https://ocw.mit.edu/courses/18-440-probability-and-random-variables-spring-2014/4583e12e3e052256867388dd86eb5b8b_MIT18_440S14_Lecture36.pdf |
| 取得日期 | 2026-11-18 |
| 原始檔路徑 | `raw/s13-mit-18440-risk-neutral-black-scholes.pdf`（20 頁） |
| SHA-256 | `f9da142d028c5bdab91d0247f910320c80576c5410062468ad4c341dfa527706` |
| 是否 commit | 否，只留本機（MIT OpenCourseWare，使用條款見 ocw.mit.edu/terms） |
| 取得狀態 | `ok`（自動下載） |

**頁碼說明**：引用時使用投影片右下角的編號，與 PDF 頁序相同。

**加入經過**：本來源不在 `GRAPH_SPEC.md` 原始清單中，2026-11-18 經 Itzel 核准加入，用來補 S3 缺少的講義內容。

**使用注意**：公式是對照 PDF 第 16 頁的原圖核對的；轉出的文字檔中希臘字母遺失。

## 來源重點摘要

- `[事實]` 風險中立機率是可以從價格推出來的機率，也就是由市場賠率決定的機率。（S13, p.5）
  > "Risk neutral probability is the probability determined by the market betting odds."
- `[事實]` Black-Scholes 的主要假設：在風險中立機率下，資產在未來某個固定時間的價格取對數後是常態分布。（S13, p.14）
  > "the log of an asset price X at fixed future time T is a normal random variable"
- `[事實]` 歐式 call 的價格是 $\Phi(d_1)X_0 - \Phi(d_2)Ke^{-rT}$，其中 $T$ 是距離到期的時間、$X_0$ 是標的現價、$K$ 是履約價、$r$ 是無風險利率、$\sigma$ 是波動率。（S13, p.16）
  > "Let T be time to maturity, X0 current price of underlying asset, K strike price, r risk free interest rate"
- `[事實]` 隱含波動率是代入 Black-Scholes 公式（連同其他已知參數）後，能算出目前市價的那個波動率。（S13, p.18）
  > "(when plugged into Black-Scholes formula along with known parameters) predicts the current market price"
- `[事實]` 如果 Black-Scholes 完全正確，同一檔股票、同一個到期日，所有履約價的隱含波動率都會相同；實際上並不是常數。（S13, p.18）
  > "If Black-Scholes were completely correct, then given a stock and an expiration date, the implied volatility would be the same for all strike prices."

## 由本來源支撐的 wiki 頁

- [[implied-volatility|隱含波動率]]
- [[iv-inversion-algorithm|隱含波動率的反推演算法]]
- [[bs-assumptions-limitations|Black-Scholes 的假設與限制]]
- [[black-scholes-model|Black-Scholes 模型]]
- [[svi-parameterization|SVI 參數化]]（引用 p.11）
- [[no-arbitrage-surface|無套利曲面]]（引用 p.6）
- [[glossary|術語表]]

## 可支撐其他頁的主張

### 從 call 報價反推機率分布（延伸，本次簡報不使用）

- `[事實]` 從不同履約價的 call 報價，可以反推出標的在到期時的風險中立機率分布。（S13, p.17）
  > "Determining risk neutral probability from call quotes"

## 來源衝突紀錄

無。

## 本來源沒有的內容

- 沒有 put 的公式，也沒有 put-call parity。
- 沒有說明怎麼用數值方法求出隱含波動率。
- 沒有期限結構、曲面或 Greeks。
