# 無套利曲面（No-Arbitrage Surface）

> 波動率曲面不能隨便畫。如果形狀不對，就會出現不用承擔風險也能獲利的價格組合。沒有靜態套利的曲面要滿足兩件事：到期日越長總變異數不能變小（沒有日曆價差套利），而且每個到期日隱含的機率密度不能是負的（沒有蝶式套利）。

## 重點主張

### 什麼是套利

- `[事實]` 套利是指不用先投入資金、也不用承擔風險就能獲利；「沒有套利」是定價理論的基本假設。（S13, p.6）
  > "no risk free profit with zero upfront investment"

### 兩種靜態套利

- `[事實]` 波動率曲面沒有靜態套利的充要條件：沒有日曆價差套利，而且每個到期日的切片都沒有蝶式套利。（S4, p.3）
  > "A volatility surface is free of static arbitrage if and only if the following conditions are satisfied"
- `[事實]` 沒有蝶式套利，保證存在一個非負的機率密度；沒有日曆價差套利，代表選擇權價格對到期日是單調的。（S4, p.3）
  > "absence of butterfly arbitrage ensures the existence of a (non-negative) probability density, and absence of calendar spread arbitrage implies monotonicity of option prices with respect to the maturity"

### 日曆價差套利

- `[事實]` 股利與股價成比例時，固定 moneyness，選擇權價格不會隨到期時間拉長而下降。（S4, p.4）
  > "option prices are non-decreasing in time to expiration"
- `[事實]` 因此，固定 $k$ 時，總隱含變異數 $w(k, t)$ 必須不隨 $t$ 遞減。（S4, p.4）
  > "A volatility surface w is free of calendar spread arbitrage if"

### 蝶式套利

- `[事實]` 一個切片沒有蝶式套利，是指它對應的機率密度非負。（S4, p.4）
  > "A slice is said to be free of butterfly arbitrage if the corresponding density is non-negative."
- `[事實]` 依靜態套利的定義，沒有蝶式套利對應到 call 價格是履約價的遞減凸函數。（S4, p.2）
  > "being decreasing and convex functions of the strike"
- `[範例]` 一組有蝶式套利的 raw SVI 參數：$(a, b, m, \rho, \sigma) = (-0.0410, 0.1331, 0.3586, 0.3060, 0.4153)$，$t = 1$。它的 $g$ 函數有一段是負的。（S4, p.10）

### SSVI 的無套利條件

- `[事實]` S4 給出 SSVI 曲面沒有靜態套利的四個充分條件（F16）。（S4, p.16）
  > "The SSVI surface (4.1) is free of static arbitrage if the following"
- `[推導]` 本專案的示意參數形式（$\theta_t = \sigma_0^2 t$、F13 取 $\gamma = 1/2$、$\eta(1 + |\rho|) \le 2$、$\eta \le 2$）滿足 F16 的全部四個條件。推導見下；測試：C3-6、C3-7、C3-8。（S4, p.16）

## 公式卡

> **F14｜沒有日曆價差套利的條件** `[事實]`
> $$\partial_t\, w(k, t) \ge 0 \quad \text{對所有 } k \in \mathbb{R},\ t > 0$$
> 符號定義：$w(k, t)$＝總隱含變異數（F10）。
> 適用假設：股利與股價成比例（S4 的 Lemma 2.1 在此假設下證明這是充要條件）。
> 出處：（S4, p.3–4），Lemma 2.1 與 Definition 2.2。對應測試 C3-7。

> **F15｜沒有蝶式套利的條件** `[事實]`
> $$g(k) = \left(1 - \frac{k\,w'(k)}{2\,w(k)}\right)^2 - \frac{w'(k)^2}{4}\left(\frac{1}{w(k)} + \frac{1}{4}\right) + \frac{w''(k)}{2} \ \ge\ 0 \quad \text{對所有 } k \in \mathbb{R}$$
> 並且 $\displaystyle\lim_{k \to +\infty} d_+(k) = -\infty$，其中 $d_\pm(k) = -\dfrac{k}{\sqrt{w(k)}} \pm \dfrac{\sqrt{w(k)}}{2}$。
> 符號定義：$w(k)$＝固定到期日的切片（F10）；$w'$、$w''$＝對 $k$ 的一階、二階導數。
> 適用假設：$w$ 對 $k$ 至少二階連續可微。
> 出處：（S4, p.4），式 (2.1) 與 Lemma 2.2。對應測試 C3-8（C3-8 改用 call 價格對 $K$ 的二階差分來檢查，兩者檢查的是同一件事：機率密度非負）。

> **F16｜SSVI 沒有靜態套利的充分條件** `[事實]`
> 1. $\partial_t \theta_t \ge 0$，對所有 $t > 0$
> 2. $0 \le \partial_\theta\big(\theta\varphi(\theta)\big) \le \dfrac{1}{\rho^2}\left(1 + \sqrt{1 - \rho^2}\right)\varphi(\theta)$，對所有 $\theta > 0$
> 3. $\theta\varphi(\theta)\,(1 + |\rho|) < 4$，對所有 $\theta > 0$
> 4. $\theta\varphi(\theta)^2\,(1 + |\rho|) \le 4$，對所有 $\theta > 0$
>
> 符號定義：同 F12。
> 適用假設：曲面為 SSVI 形式（F12）。條件 1、2 排除日曆價差套利，條件 3、4 排除蝶式套利。
> 出處：（S4, p.16），Corollary 4.1；條件 1–2 另見 Theorem 4.1（S4, p.12），條件 3–4 另見 Theorem 4.2（S4, p.14）。

## 推導

驗算：$\theta_t = \sigma_0^2 t$（$\sigma_0 > 0$）、$\varphi(\theta) = \dfrac{\eta}{\theta^{1/2}(1 + \theta)^{1/2}}$（F13 取 $\gamma = 1/2$）、$|\rho| < 1$、$\eta > 0$，是否滿足 F16。

先算 $\theta\varphi(\theta) = \eta\sqrt{\dfrac{\theta}{1 + \theta}}$。

**條件 1**：$\partial_t \theta_t = \sigma_0^2 > 0$。成立。

**條件 2**：
$$\ln\big(\theta\varphi(\theta)\big) = \ln\eta + \tfrac{1}{2}\ln\theta - \tfrac{1}{2}\ln(1 + \theta)$$
兩邊對 $\theta$ 微分：
$$\frac{\partial_\theta\big(\theta\varphi\big)}{\theta\varphi} = \frac{1}{2\theta} - \frac{1}{2(1 + \theta)} = \frac{1}{2\theta(1 + \theta)}$$
所以
$$\frac{\partial_\theta\big(\theta\varphi\big)}{\varphi} = \frac{1}{2(1 + \theta)} \in \left(0, \tfrac{1}{2}\right)$$
下界：大於 0，成立。上界：需要 $\dfrac{1}{2(1 + \theta)} \le \dfrac{1 + \sqrt{1 - \rho^2}}{\rho^2}$。因為 $|\rho| < 1$，右邊 $\ge \dfrac{1}{\rho^2} > 1 > \dfrac{1}{2}$；$\rho = 0$ 時上界為無限大（S4, p.12）。成立。

**條件 3**：$\theta\varphi(\theta)(1 + |\rho|) = \eta\sqrt{\dfrac{\theta}{1 + \theta}}\,(1 + |\rho|) < \eta(1 + |\rho|)$。只要 $\eta(1 + |\rho|) \le 2$，就小於 4。成立。

**條件 4**：$\theta\varphi(\theta)^2(1 + |\rho|) = \dfrac{\eta^2}{1 + \theta}(1 + |\rho|) < \eta \cdot \eta(1 + |\rho|) \le 2\eta$。只要再有 $\eta \le 2$，就不超過 4。成立。

結論：在 $\eta(1 + |\rho|) \le 2$ 且 $\eta \le 2$ 之下，四個條件都成立。因為 $1 + |\rho| \ge 1$，$\eta(1 + |\rho|) \le 2$ 本身就推得 $\eta \le 2$，所以只需要 $\eta(1 + |\rho|) \le 2$ 一個條件，與 S4 在 p.17 的說法一致。

代入提案的示意參數（$\rho = -0.7$、$\eta = 1.0$）：$\eta(1 + |\rho|) = 1.0 \times 1.7 = 1.7 \le 2$。成立。

## 相關頁面

- [[svi-parameterization|SVI 參數化]]
- [[volatility-surface|波動率曲面]]

## 來源

- [[s4-gatheral-jacquier-svi|S4]]：Gatheral & Jacquier, *Arbitrage-free SVI volatility surfaces*（arXiv:1204.0646v4, 2013）
- [[s13-mit-18440-risk-neutral-black-scholes|S13]]：MIT OpenCourseWare 18.440 Lecture 36, Sheffield（Spring 2014）

## 待補

- 上面的推導只經過人工檢查，要等 C3-6、C3-7、C3-8 的數值測試才算驗證。
- F14 的適用假設是「股利與股價成比例」。本專案的示意設定是無股利（比例為零），屬於這個假設的特例；這一點是推論，沒有來源原句。
