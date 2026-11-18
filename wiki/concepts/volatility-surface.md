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

## 相關頁面

- [[volatility-smile-skew|波動率微笑與偏斜]]
- [[volatility-term-structure|波動率期限結構]]
- [[implied-volatility|隱含波動率]]
- [[bs-assumptions-limitations|Black-Scholes 的假設與限制]]

## 來源

- [[s10-derman-laughter-in-the-dark|S10]]：Derman, *Laughter in the Dark — The Problem of the Volatility Smile*（2003）

## 待補

- 曲面的參數化與無套利條件，待 S4 補上。
- S10 的曲面圖（Figure 2）沒有附數據。簡報中的曲面圖必須由 `lab/` 程式依 S4 的示意參數產生，並標註「示意參數」。
