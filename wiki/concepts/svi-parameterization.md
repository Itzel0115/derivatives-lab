# SVI 參數化（SVI Parameterization）

> SVI 用少數幾個參數描述一條波動率微笑；SSVI 進一步用一條公式描述整張曲面，並且有明確的條件可以保證沒有套利。本專案的曲面圖用 SSVI 產生。

**符號提醒**：raw SVI 公式中的 $\sigma$ 是一個形狀參數，不是波動率。

## 重點主張

### 座標：log-strike 與總隱含變異數

- `[事實]` S4 不直接用履約價與隱含波動率，而是用 log-strike $k$（履約價為 $F_t e^k$，$F_t$ 是遠期價格）和總隱含變異數 $w$。（S4, p.2）
  > "define the total implied variance by"
- `[事實]` 把 $(k, t)$ 對應到 $w(k, t)$ 的二維函數稱為波動率曲面；固定到期日 $t$ 的 $k \mapsto w(k, t)$ 稱為一個切片（slice）。（S4, p.2）
  > "will represent a slice"
- `[事實]` 不發股利的股票，今天的價格等於未來價值的風險中立期望值折現，所以遠期價格是 $F = S e^{rT}$。（S13, p.11）
  > "if a non-divided paying stock will be worth X at time T"

### Raw SVI：一條微笑

- `[事實]` SVI 參數化最早於 1999 年在 Merrill Lynch 提出，後來受到實務界歡迎。（S4, p.1）
  > "The stochastic volatility inspired or SVI parameterization of the implied volatility smile was originally devised at Merrill Lynch in 1999"
- `[事實]` 增加 $a$：整體變異數水準上升，微笑垂直平移。（S4, p.5）
  > "Increasing a increases the general level of variance, a vertical translation of the smile"
- `[事實]` 增加 $b$：put 側與 call 側兩翼的斜率都變大，微笑收緊。（S4, p.5）
  > "Increasing b increases the slopes of both the put and call wings, tightening the smile"
- `[事實]` 增加 $\rho$：左翼斜率變小、右翼斜率變大，微笑逆時針旋轉。（S4, p.5）
  > "decreases (increases) the slope of the left(right) wing, a counter-clockwise rotation of the smile"
- `[事實]` 增加 $m$：微笑向右平移。（S4, p.6）
  > "Increasing m translates the smile to the right"
- `[事實]` 增加 $\sigma$：價平附近的曲率變小。（S4, p.6）
  > "reduces the at-the-money (ATM) curvature of the smile"
- `[事實]` SVI 微笑有可能含有套利；對 raw SVI，很難找到能排除套利的精確參數條件。（S4, p.1；p.5）
  > "However it is well-known that SVI smiles may be arbitrageable."
- `[範例]` 一組有蝶式套利的 raw SVI 參數（出自 Axel Vogt）：$(a, b, m, \rho, \sigma) = (-0.0410, 0.1331, 0.3586, 0.3060, 0.4153)$，$t = 1$。用這組參數畫出的 $g$ 函數有一段是負的，代表機率密度為負。（S4, p.10）

### SSVI：一張曲面

- `[事實]` SSVI 用價平總隱含變異數 $\theta_t$ 作為曲面的參數；這個量可以從市場價格直接觀察到。（S4, p.11）
  > "this parameter is directly observable given market prices for a finite set of expiries"
- `[事實]` 在 SSVI 中，微笑對稱於價平的充要條件是 $\rho = 0$。（S4, p.11）
  > "Furthermore the smile is symmetric around at-the-money if and only if"
- `[事實]` 採用 F13 的 $\varphi$ 時，只要 $\eta(1 + |\rho|) \le 2$，整張曲面就完全沒有靜態套利。（S4, p.17）
  > "gives a surface that is completely free of static arbitrage provided that"

## 公式卡

> **F10｜Log-strike 與總隱含變異數** `[事實]`
> $$k = \ln\!\left(\frac{K}{F_t}\right), \qquad w(k, t) = \sigma_{BS}^2(k, t)\, t$$
> 符號定義：$K$＝履約價；$F_t$＝到期日為 $t$ 的遠期價格；$\sigma_{BS}(k, t)$＝Black-Scholes 隱含波動率；$t$＝距離到期的時間（年）；$w$＝總隱含變異數。
> 適用假設：無。這是座標的定義。
> 出處：（S4, p.2）。S4 把履約價寫成 $F_t e^k$，此處改寫成 $k$ 的定義式。
> 附註：由 $w$ 還原隱含波動率：$\sigma_{BS} = \sqrt{w / t}$。

> **F11｜Raw SVI（單一到期日的切片）** `[事實]`
> $$w(k) = a + b\left\{\rho\,(k - m) + \sqrt{(k - m)^2 + \sigma^2}\right\}$$
> 符號定義：$a, b, \rho, m, \sigma$ 是五個形狀參數（這裡的 $\sigma$ **不是**波動率）；$k$、$w$ 同 F10。
> 適用假設：$a \in \mathbb{R}$、$b \ge 0$、$|\rho| < 1$、$m \in \mathbb{R}$、$\sigma > 0$，且 $a + b\,\sigma\sqrt{1 - \rho^2} \ge 0$（保證 $w(k) \ge 0$）。這些條件**不能**保證沒有套利。
> 出處：（S4, p.5），式 (3.1)。

> **F12｜SSVI（整張曲面）** `[事實]`
> $$w(k, \theta_t) = \frac{\theta_t}{2}\left\{1 + \rho\,\varphi(\theta_t)\,k + \sqrt{\big(\varphi(\theta_t)\,k + \rho\big)^2 + (1 - \rho^2)}\right\}$$
> 符號定義：$\theta_t = \sigma_{BS}^2(0, t)\,t$＝價平總隱含變異數；$\rho$＝偏斜參數，$|\rho| < 1$；$\varphi(\cdot)$＝決定曲率的函數（本專案用 F13）；$k$、$w$ 同 F10。
> 適用假設：$\varphi$ 為正值的平滑函數。是否無套利由 F16 的條件決定。
> 出處：（S4, p.11），式 (4.1)。
> 附註：$k = 0$ 時 $w = \theta_t$，所以 $\theta_t$ 就是價平的總隱含變異數。

> **F13｜SSVI 的 $\varphi$ 函數（修正的冪次形式）** `[事實]`
> $$\varphi(\theta) = \frac{\eta}{\theta^{\gamma}\,(1 + \theta)^{1 - \gamma}}$$
> 符號定義：$\eta > 0$、$\gamma$ 為參數；$\theta$ 同 F12。
> 適用假設：S4 指出只要 $\eta(1 + |\rho|) \le 2$，曲面就完全沒有靜態套利。S4 是在討論 $\gamma = 1/2$ 的段落中提出這個式子的，沒有明確寫出 $\gamma$ 的允許範圍；本專案固定使用 $\gamma = 1/2$，並在 [[no-arbitrage-surface|無套利曲面]] 中另外驗算這個情況。
> 出處：（S4, p.17），式 (4.5)。

## 示意參數（Itzel 已於 2026-11-18 核准）

**狀態：已核准。N3 產生曲面時必須使用下表的數值，不得更動。**

S4 沒有提供任何一組無套利的具體參數（見來源頁）。產生示意曲面需要一組數值，以下是經核准的設定。這些數字**不是來源中的數字，也不是市場數據**，只是符合 S4 無套利條件的示意值；簡報中所有用它畫的圖都必須標註「示意參數」。

| 參數 | 核准值 | 作用 | 限制條件與出處 |
|---|---|---|---|
| 曲面形式 | SSVI（F12）＋ F13 | | |
| $\theta_t$ | $\sigma_0^2\, t$，$\sigma_0 = 0.20$ | 價平隱含波動率固定為 20%，期限結構是平的 | 需要 $\partial_t \theta_t \ge 0$（S4, p.16）；S4 自己也用過 $\theta_t := \sigma^2 t$ 這個簡單情況（S4, p.16） |
| $\rho$ | $-0.7$ | 負偏斜：低履約價的隱含波動率較高 | $|\rho| < 1$（S4, p.11） |
| $\eta$ | $1.0$ | 微笑的彎曲程度 | $\eta(1 + |\rho|) = 1.7 \le 2$（S4, p.17） |
| $\gamma$ | $0.5$ | 偏斜隨到期日衰減的速度 | 見 F13 的適用假設 |

這組參數的取捨（核准時已告知）：

- **價平期限結構是平的。** 這讓 S10 那一頁（固定 K、改變 T）在價平處看不到變化，只在價外處看得到。若希望價平也有期限結構，需要改用隨 $t$ 變動的 $\sigma_0$，並重新確認 $\theta_t$ 遞增。
- **$\rho = -0.7$、$\eta = 1.0$** 只是為了讓偏斜在圖上夠明顯，沒有對應任何特定市場或日期。

## 相關頁面

- [[volatility-surface|波動率曲面]]
- [[no-arbitrage-surface|無套利曲面]]
- [[volatility-smile-skew|波動率微笑與偏斜]]
- [[implied-volatility|隱含波動率]]

## 來源

- [[s4-gatheral-jacquier-svi|S4]]：Gatheral & Jacquier, *Arbitrage-free SVI volatility surfaces*（arXiv:1204.0646v4, 2013）
- [[s13-mit-18440-risk-neutral-black-scholes|S13]]：MIT OpenCourseWare 18.440 Lecture 36, Sheffield（Spring 2014）

## 待補

- 公式 F10–F13 是對照 PDF 原圖人工抄錄的 LaTeX，要等 C3-6、C3-7、C3-8 的數值測試才算驗證。
- 由 $w$ 換算成選擇權價格的做法：先用 F10 還原 $K = F e^k$ 與 $\sigma_{BS} = \sqrt{w/t}$，再代入 F03。這個換算沒有另立公式卡。
