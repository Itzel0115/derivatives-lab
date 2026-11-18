# Vega

> Vega 衡量選擇權價值對隱含波動率的敏感度：其他條件不變時，隱含波動率變動一個百分點，選擇權價值大約變動多少。Call 和 put 的 vega 都是正的。

## 重點主張

### 定義（來源提供）

- `[事實]` Vega 是選擇權價值對波動率的敏感度。（S5, p.18）
  > "Vega: Option value's sensitivity to volatility"
- `[事實]` 它表示隱含波動率變動 1 個百分點時，選擇權價值的預期變動。（S5, p.18）
  > "With a 1%-point change in implied volatility (IV)"
- `[事實]` 這個數字代表每單位選擇權的現金金額，並假設其他定價因素都不變。（S5, p.18）
  > "Represents cash amount per option"
- `[事實]` Call 和 put 的 vega 都是正的。（S5, p.18）
  > "Calls and puts both have positive Vega"
- `[事實]` 其他定價因素不變時，隱含波動率上升，call 與 put 的價格都會上升；隱含波動率下降，兩者都會下降。（S5, p.17）
  > "both call and put prices will increase"
- `[事實]` Greeks 是理論上的衡量值；市場價格不一定照它們所示變動。（S5, p.7）
  > "Market prices may or may not perform as indicated"

### 公式（自行推導）

- `[推導]` 在 Black-Scholes 模型下，歐式 call 與 put 的 vega 相同，都是 $S\,n(d_1)\sqrt{T}$（F07）。推導見下；測試：C3-5。（S12, p.19）
- `[推導]` F07 恆為正（因為 $S > 0$、$n(d_1) > 0$、$T > 0$），所以 Black-Scholes 價格隨 $\sigma$ 嚴格遞增。這與 S5「call 和 put 的 vega 都是正的」一致。測試：C3-3。（S12, p.19）

## 公式卡

> **F07｜Black-Scholes vega** `[推導]`
> $$\text{Vega} = \frac{\partial C}{\partial \sigma} = \frac{\partial P}{\partial \sigma} = S\, n(d_1)\, \sqrt{T}, \qquad n(x) = \frac{1}{\sqrt{2\pi}}\, e^{-x^2/2}$$
> 符號定義：$n(x)$＝標準常態分布的機率密度函數，也就是 F05 中 $N(x)$ 的導數；其餘同 F03、F05。
> 適用假設：同 F03。
> 單位：上式是 $\sigma$ 以小數表示時，每變動 1（也就是 100 個百分點）的價值變動。S5 定義的 vega 是「每 1 個百分點」，所以要除以 100：$\text{Vega}_{1\%} = S\,n(d_1)\sqrt{T}\,/\,100$。
> 出處：由 F03、F05、F06 推導（S12, p.19）；對應測試 C3-5。

## 推導

**第 1 步：對 F03 微分。** 由 $C = S N(d_1) - K e^{-rT} N(d_2)$，且 $N'(x) = n(x)$：
$$\frac{\partial C}{\partial \sigma} = S\, n(d_1)\, \frac{\partial d_1}{\partial \sigma} - K e^{-rT}\, n(d_2)\, \frac{\partial d_2}{\partial \sigma}$$

**第 2 步：$d_1$ 與 $d_2$ 導數的關係。** 由 F05，$d_2 = d_1 - \sigma\sqrt{T}$，所以
$$\frac{\partial d_2}{\partial \sigma} = \frac{\partial d_1}{\partial \sigma} - \sqrt{T}$$

**第 3 步：證明 $S\,n(d_1) = K e^{-rT}\, n(d_2)$。**
$$\frac{n(d_2)}{n(d_1)} = \exp\!\left(\frac{d_1^2 - d_2^2}{2}\right), \qquad d_1^2 - d_2^2 = (d_1 - d_2)(d_1 + d_2)$$
由 F05，$d_1 - d_2 = \sigma\sqrt{T}$，$d_1 + d_2 = \dfrac{2\ln(S/K) + 2rT}{\sigma\sqrt{T}}$，相乘得 $d_1^2 - d_2^2 = 2\ln(S/K) + 2rT$。所以
$$\frac{n(d_2)}{n(d_1)} = \exp\big(\ln(S/K) + rT\big) = \frac{S}{K}\, e^{rT} \quad\Longrightarrow\quad K e^{-rT}\, n(d_2) = S\, n(d_1)$$

**第 4 步：代回第 1 步。**
$$\frac{\partial C}{\partial \sigma} = S\, n(d_1)\left[\frac{\partial d_1}{\partial \sigma} - \left(\frac{\partial d_1}{\partial \sigma} - \sqrt{T}\right)\right] = S\, n(d_1)\, \sqrt{T}$$

**第 5 步：put 的 vega。** 由 F06，$C - P = S - K e^{-rT}$，右邊不含 $\sigma$，所以 $\dfrac{\partial C}{\partial \sigma} = \dfrac{\partial P}{\partial \sigma}$。

## 相關頁面

- [[black-scholes-model|Black-Scholes 模型]]
- [[implied-volatility|隱含波動率]]
- [[iv-inversion-algorithm|隱含波動率的反推演算法]]
- [[greeks-overview|Greeks 總覽]]

## 來源

- [[s5-oic-understanding-greeks|S5]]：OCC／OIC, *Making More Informed Decisions: Understanding Greeks*（2023）
- [[s12-mit-18s096-black-scholes|S12]]：MIT OpenCourseWare 18.S096 Lecture 19, Strela（Fall 2013）

## 待補

- 沒有任何來源寫出 vega 的公式；F07 是推導而來，要等 C3-5（解析解對數值微分）才算驗證。
- S5 沒有 vega 的數值範例。簡報 S13 要呈現「σ 一變、價格跟著變」的數字，只能用 `{{calc:...}}` 由 `lab/` 程式計算。
- 單位換算（除以 100）是依 S5 的定義所做的對應，簡報顯示 vega 數值時必須說明用的是哪一種單位。
