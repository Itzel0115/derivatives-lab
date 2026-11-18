# 波動率曲面（Volatility Surface）

> 把隱含波動率同時對履約價和到期日畫出來，得到一張曲面。Black-Scholes 預測它是平的，市場上的卻是彎的，而且隨時間變動。

## 重點主張

- `[事實]` 各個到期日都有類似但不完全相同的偏斜型態，所以業界開始說「隱含波動率曲面」：它的高度是履約價與到期日的函數。（S10, p.3）
  > "an implied volatility surface whose height varied as a function of strike and expiration"
- `[事實]` 依照古典理論，Black-Scholes 隱含波動率應該與履約價、到期日無關，畫成曲面應該是平的。（S10, p.1）
  > "Plotted as a surface, it should be flat"
- `[事實]` 古典 Black-Scholes 模型給標的單一的波動率，因此預測的是一片沒有起伏的平台。（S10, p.3）
  > "predicted a dull featureless plateau-like implied volatility surface"
- `[事實]` 市場上的曲面會隨時間改變；任一時刻，它的高度都隨履約價與到期日而不同。（S10, p.1）
  > "Its level at any instant is a varying function of strike and expiration"
- `[事實]` S&P 500 選擇權的曲面形狀大致固定，但細節每一刻、每一天都在變。（S10, p.3）
  > "The shape is fairly typical, but the exact details change from moment to moment and day to day."

### 曲面的數學描述

- `[事實]` S4 把 $(k, t)$ 對應到總隱含變異數 $w(k, t)$ 的二維函數稱為波動率曲面，其中 $k$ 是 log-strike、$t$ 是到期時間（F10）。（S4, p.2）
  > "define the total implied variance by"
- `[事實]` 固定到期日的那一條 $k \mapsto w(k, t)$ 稱為切片（slice）；曲面可以看成一組切片，每個到期日一條。（S4, p.2；p.9）
  > "A volatility surface is thus understood as a (discrete) collection of slices, with a different set of parameters for each expiry."
- `[事實]` 曲面不能任意設定：沒有靜態套利的曲面必須沒有日曆價差套利，而且每個切片都沒有蝶式套利。（S4, p.3）
  > "A volatility surface is free of static arbitrage if and only if the following conditions are satisfied"
- `[事實]` SSVI 是一類有封閉形式、可以保證沒有靜態套利的曲面（F12、F16）。（S4, p.24）
  > "We have found and described a large class of arbitrage-free SVI volatility surfaces with a simple closed-form representation."

## 相關頁面

- [[svi-parameterization|SVI 參數化]]
- [[no-arbitrage-surface|無套利曲面]]
- [[volatility-smile-skew|波動率微笑與偏斜]]
- [[volatility-term-structure|波動率期限結構]]
- [[implied-volatility|隱含波動率]]
- [[bs-assumptions-limitations|Black-Scholes 的假設與限制]]

## 來源

- [[s10-derman-laughter-in-the-dark|S10]]：Derman, *Laughter in the Dark — The Problem of the Volatility Smile*（2003）
- [[s4-gatheral-jacquier-svi|S4]]：Gatheral & Jacquier, *Arbitrage-free SVI volatility surfaces*（arXiv:1204.0646v4, 2013）

## 待補

- S10 的曲面圖（Figure 2）沒有附數據。簡報中的曲面圖必須由 `lab/` 程式依 [[svi-parameterization|SVI 參數化]] 的示意參數產生，並標註「示意參數」。示意參數目前尚待 Itzel 核准。
