# Black-Scholes 模型（Black-Scholes Model）

> Black-Scholes 模型用五個輸入算出歐式選擇權的理論價格：標的現價 $S$、履約價 $K$、距離到期的時間 $T$、無風險利率 $r$、波動率 $\sigma$。

**符號說明**：本 wiki 用 $T$ 表示距離到期的時間（年）。S12 的投影片把目前時間寫成 $t$、到期時間寫成 $T$，所以它的 $T-t$ 就是本頁的 $T$。

## 重點主張

### 模型在算什麼

- `[事實]` 給定股票目前的價格，以及對股價動態的假設，衍生性商品的價格就沒有不確定性。（S12, p.6）
  > "there is no uncertainty about the price of a derivative"
- `[事實]` 這個價格只由股票的價格決定，與市場參與者的風險偏好無關。（S12, p.6）
  > "The price is defined only by the price of the stock and not by the risk preferences of the market participants"
- `[事實]` 衍生性商品目前的價格，由一個能完全複製其到期報償的投資組合的目前價格決定。（S12, p.8）
  > "Current price of a derivative claim is determined by current price of a portfolio which exactly replicates the payoff of the derivative at the maturity"
- `[事實]` Black-Scholes 方程式與股票實際的漂移率（預期報酬）無關。（S12, p.17）
  > "There is no dependence on actual drift"

### 假設

- `[事實]` 推導時假設股票價格服從對數常態的動態。（S12, p.13）
  > "Assume that the stock has log-normal dynamics"
- `[事實]` 模型中的經濟體包含股票、利率為 $r$ 的無風險貨幣市場帳戶，以及衍生性商品。（S12, p.9）
  > "riskless money market account B with interest rate r"
- `[事實]` 解析解適用於歐式 call 與 put。（S12, p.19）
  > "For European Call/Put the equation can be solved analytically"
- `[事實]` 較複雜的選擇權或較一般的假設，必須改用數值方法。（S12, p.21）
  > "For more complicated options or more general assumptions numerical methods have to be used"

### 歷史

- `[事實]` Fischer Black 與 Myron Scholes 的論文發表於 1973 年；Myron Scholes 與 Robert Merton 於 1997 年獲得諾貝爾獎。（S12, p.16）
  > "Nobel Prize 1997"

## 公式卡

> **F03｜Black-Scholes call 價格** `[事實]`
> $$C = S\,N(d_1) - K e^{-rT} N(d_2)$$
> 符號定義：$C$＝歐式 call 的價格；$S$＝標的現價；$K$＝履約價；$r$＝無風險利率（連續複利）；$T$＝距離到期的時間（年）；$N(\cdot)$ 與 $d_1$、$d_2$ 見 F05。
> 適用假設：歐式選擇權；股價服從對數常態動態、波動率 $\sigma$ 為常數；利率 $r$ 為常數；公式不含股利項。
> 出處：（S12, p.19）。S12 寫成 $C_t = e^{-r(T-t)}\left(e^{r(T-t)} S N(d_1) - K N(d_2)\right)$，此處把括號乘開，並把 $T-t$ 改記為 $T$，沒有加入新的推論。

> **F04｜Black-Scholes put 價格** `[事實]`
> $$P = K e^{-rT} N(-d_2) - S\,N(-d_1)$$
> 符號定義：$P$＝歐式 put 的價格；其餘同 F03。
> 適用假設：同 F03。
> 出處：（S12, p.19）。S12 寫成 $P_t = e^{-r(T-t)}\left(K N(-d_2) - e^{r(T-t)} S N(-d_1)\right)$，改寫方式同 F03。

> **F05｜$d_1$、$d_2$ 與 $N(x)$** `[事實]`
> $$d_1 = \frac{\ln(S/K) + (r + \sigma^2/2)\,T}{\sigma\sqrt{T}}, \qquad d_2 = \frac{\ln(S/K) + (r - \sigma^2/2)\,T}{\sigma\sqrt{T}}$$
> $$N(x) = \frac{1}{\sqrt{2\pi}} \int_{-\infty}^{x} e^{-u^2/2}\,du$$
> 符號定義：$\sigma$＝波動率（年化）；$N(x)$＝標準常態分布的累積分布函數；其餘同 F03。
> 適用假設：同 F03；需要 $\sigma > 0$ 且 $T > 0$。
> 出處：（S12, p.19）。把 S12 的 $T-t$ 改記為 $T$。由定義可得 $d_2 = d_1 - \sigma\sqrt{T}$。

## 相關頁面

- [[payoff-diagram|到期價值與損益]]
- [[put-call-parity|買賣權平價]]
- [[bs-assumptions-limitations|Black-Scholes 的假設與限制]]
- [[implied-volatility|隱含波動率]]

## 來源

- [[s12-mit-18s096-black-scholes|S12]]：MIT OpenCourseWare 18.S096 Lecture 19, Strela, *Black-Scholes Formula & Risk-neutral Valuation*（Fall 2013）

## 待補

- 簡報 S05 打算講「價格由什麼決定：只有 σ 看不到」。S12 沒有這樣的句子；S13 ingest 時確認有沒有來源支撐。
- S12 沒有明說「無股利」假設。F03 的適用假設只寫「公式不含股利項」；若 S13 有明確說法再補上出處。
- 公式是對照 PDF 原圖人工抄錄的，尚待 C3 的程式測試（C3-1、C3-2、C3-3、C3-11）驗證。
