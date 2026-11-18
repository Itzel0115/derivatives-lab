# 買賣權平價（Put-Call Parity）

> 在 Black-Scholes 公式下，相同標的、相同履約價、相同到期日的歐式 call 與 put，價格之間有一個固定的關係：call 減 put，等於標的現價減去履約價的現值。

## 重點主張

- `[事實]` 相同履約價的 put 與 call 透過 put-call parity 互相關聯。（S11, p.6）
  > "puts and calls with the same strike are related through put-call parity"
- `[推導]` 在 Black-Scholes 模型下，歐式 call 與 put 的價格滿足 $C - P = S - K e^{-rT}$。推導步驟見下；測試：C3-1。（S12, p.19）

## 公式卡

> **F06｜Put-call parity** `[推導]`
> $$C - P = S - K e^{-rT}$$
> 符號定義：$C$、$P$＝相同標的、相同履約價 $K$、相同到期時間 $T$ 的歐式 call 與 put 價格；$S$＝標的現價；$r$＝無風險利率（連續複利）。
> 適用假設：同 F03（歐式、常數波動率與利率、公式不含股利項）。
> 出處：由 F03、F04、F05 推導（S12, p.19）；對應測試 C3-1。

## 推導

1. 由 F03 與 F04：
   $$C - P = \left[S N(d_1) - K e^{-rT} N(d_2)\right] - \left[K e^{-rT} N(-d_2) - S N(-d_1)\right]$$
2. 整理成 $S$ 與 $K e^{-rT}$ 兩組：
   $$C - P = S\left[N(d_1) + N(-d_1)\right] - K e^{-rT}\left[N(d_2) + N(-d_2)\right]$$
3. $N(x)$ 是標準常態分布的累積分布函數（F05）。標準常態分布的密度對稱於 0，所以對任何 $x$ 都有 $N(x) + N(-x) = 1$。
4. 代入第 2 步，兩個中括號都等於 1：
   $$C - P = S - K e^{-rT}$$

這個推導只用到 F03–F05 的代數形式，與 $\sigma$ 的數值無關：等式右邊沒有 $\sigma$。

## 相關頁面

- [[black-scholes-model|Black-Scholes 模型]]
- [[call-put-option|買權與賣權]]

## 來源

- [[s11-derman-kani-smile-implied-tree|S11]]：Derman & Kani, *The Volatility Smile and Its Implied Tree*（1994）
- [[s12-mit-18s096-black-scholes|S12]]：MIT OpenCourseWare 18.S096 Lecture 19, Strela（Fall 2013）

## 待補

- 目前沒有任何來源直接寫出 put-call parity 的公式；F06 是由 Black-Scholes 公式推導而來。本 wiki 沒有來源支撐它在其他模型或條件下是否成立，所以簡報只能說「在 Black-Scholes 公式下成立」。
- 第 3 步用到的 $N(x) + N(-x) = 1$ 是標準常態分布的數學性質，沒有另外引用來源；C3-1 的數值測試會一併驗證。
