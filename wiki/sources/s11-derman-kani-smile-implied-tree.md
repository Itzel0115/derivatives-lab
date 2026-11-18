# S11｜波動率微笑與隱含樹（The Volatility Smile and Its Implied Tree）

> Derman 與 Kani 1994 年在 Goldman Sachs 發表的研究報告。前幾頁說明 Black-Scholes 的常數波動率假設、隱含波動率的意義，以及市場上觀察到的 skew 與期限結構；其餘篇幅介紹他們提出的「隱含樹」模型。

## 來源資料

| 欄位 | 內容 |
|---|---|
| 來源 ID | S11 |
| 標題 | The Volatility Smile and Its Implied Tree（Goldman Sachs Quantitative Strategies Research Notes） |
| 作者／機構 | Emanuel Derman、Iraj Kani；Goldman, Sachs & Co. |
| 發布日期 | January 1994 |
| URL | 頁面：https://emanuelderman.com/the-volatility-smile-and-its-implied-tree/ ；檔案：https://emanuelderman.com/wp-content/uploads/1994/01/gs-volatility_smile.pdf |
| 取得日期 | 2026-11-18 |
| 原始檔路徑 | `raw/s11-derman-kani-smile-implied-tree.pdf`（26 頁） |
| SHA-256 | `e9310ec93be94e610eb0a9ecf0467f07ee10e216da593065e770da3b3d7d9556` |
| 是否 commit | 否，只留本機（Copyright 1994 Goldman, Sachs & Co. All rights reserved；作者網站公開） |
| 取得狀態 | `ok`（自動下載） |

**頁碼說明**：引用時使用頁面上印的頁碼。正文第 1 頁是 PDF 第 6 頁（PDF 頁序＝印刷頁碼＋5）。正文之前的摘要頁印的是 -2、-1，引用時寫成 `§Summary`。

**加入經過**：本來源不在 `GRAPH_SPEC.md` 原始清單中，2026-11-18 經 Itzel 核准加入，用來補 S3 缺少的講義內容。

## 來源重點摘要

- `[事實]` 股價指數選擇權的市場隱含波動率常呈現偏斜的結構，一般稱為「波動率微笑」。（S11, §Summary）
  > "The market implied volatilities of stock index options often have a skewed structure, commonly called "the volatility smile.""
- `[事實]` 本文的目的，是延伸 Black-Scholes 模型，使它與微笑一致。（S11, §Summary）
  > "we show how to extend the Black-Scholes model so as to make it consistent with the smile"
- `[事實]` 隱含波動率是讓 Black-Scholes 公式算出的價值等於市價的那個波動率；交易員用它來報價。（S11, p.2）
  > "has led traders to quote a call option's market price in terms of whatever constant local volatility"
- `[事實]` 隱含波動率隨履約價下降的不對稱稱為 skew，隨到期時間的變化稱為期限結構；本文把兩者合稱為 smile。（S11, p.2）
  > "In this paper we will refer to them collectively as the volatility "smile.""
- `[事實]` 作者的做法是用市場上的微笑，反推出一棵與所有選擇權價格一致的二項樹，稱為隱含樹。（S11, §Summary）
  > "We call this the implied tree."

章節結構：摘要（§Summary）、Black-Scholes 理論及其不足（p.1–3）、隱含樹（p.4）、建構方法（p.5–9）、詳細範例（p.10–13）、分布（p.14）、結論（p.15）、附錄：連續時間理論（p.16–20）。

## 由本來源支撐的 wiki 頁

- [[implied-volatility|隱含波動率]]
- [[volatility-smile-skew|波動率微笑與偏斜]]
- [[volatility-term-structure|波動率期限結構]]
- [[bs-assumptions-limitations|Black-Scholes 的假設與限制]]
- [[put-call-parity|買賣權平價]]（引用 p.6）
- [[glossary|術語表]]

## 可支撐其他頁的主張

### put-call parity（供 put-call-parity）

- `[事實]` 相同履約價的 put 與 call 透過 put-call parity 互相關聯。本文只提到這個關係，沒有寫出公式。（S11, p.6）
  > "puts and calls with the same strike are related through put-call parity"

### 延伸模型（延伸，本次簡報不使用）

- `[事實]` 延伸 Black-Scholes 來解釋微笑的做法，有的加入隨機波動率因子，有的允許股價不連續跳躍。（S11, p.3）
  > "There have been various attempts to extend the BS theory to account for the volatility smile."
- `[事實]` 作者的模型把常數波動率換成同時取決於股價與時間的局部波動率函數。（S11, p.4）
  > "is the local volatility function that is dependent on both stock price and time"

## 來源衝突紀錄

無。用詞上有一點需要留意：S11 把 skew 與期限結構合稱為 smile（p.2），S10 則用 smile 泛指曲面不平的現象。兩者不矛盾，但本 wiki 把「隨履約價變動」寫在 volatility-smile-skew，把「隨到期日變動」寫在 volatility-term-structure。

## 本來源沒有的內容

- 沒有寫出 Black-Scholes 公式的完整形式，只用 $C_{BS}(S, \sigma, r, t, K)$ 表示（p.1）。
- 沒有寫出 put-call parity 的公式。
- 圖中的隱含波動率數值只能從圖上讀，本 wiki 只引用正文與圖說寫出的內容。
- p.5–20 的隱含樹建構方法、數值範例與連續時間推導，超出本次簡報範圍，沒有寫入 wiki。
