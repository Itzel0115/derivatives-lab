# 簡化 ELN（Simplified Equity-Linked Note）

> 教學用簡化結構，忽略發行機構信用風險、費用與股利；**不構成投資建議**。

> 簡化 ELN 可以拆成「一筆到期拿回本金加票息的存款」減去「賣出一批 put」。票息比一般存款高，是因為投資人實際上賣出了 put、收了權利金；代價是股價大跌時要用履約價接下股票。

**本頁的性質**：這個商品結構是 `GRAPH_SPEC.md` §2.5 為教學而定義的，不是任何來源描述的實際商品。來源提供的是它的組成原理（S6）與賣出 put 的風險（S1）；拆解公式與定價公式是自行推導。

## 條款（依 GRAPH_SPEC §2.5）

- 面額 $N$，到期期間 $T$，履約價 $K$（通常設在期初股價附近或以下），票息 $C$。
- 到期時：
  - 若 $S_T \ge K$：取回 $N + C$。
  - 若 $S_T < K$：取得價值 $N \cdot S_T / K$ 的股票（或等值現金），加上 $C$。

也就是說，股價跌破履約價時，投資人等於用每股 $K$ 的價格買進 $N/K$ 股。

## 重點主張

### 來源提供的背景

- `[事實]` 結構型債券由兩個部分組成：債券部分，以及內嵌的衍生性商品。（S6, §What are Structured Notes?）
  > "include two components - a bond component and an embedded derivative"
- `[事實]` 某些結構型債券到期時交付給投資人的，是已經下跌的參考資產本身。（S6, §Knock-in feature）
  > "you may actually receive the reference asset that has declined in value during the term of the note"
- `[事實]` 不保本的結構型債券，連結資產的表現可能讓投資人損失部分或全部本金。（S6, §Market risk）
  > "the performance of the linked asset or index may cause you to lose some, or all, of your principal"
- `[事實]` 賣出 put 的人承擔標的價格下跌的風險，最壞情況是跌到零。（S1, p.65）
  > "The writer of a put bears the risk of a decline in the price of the underlying interest--potentially to zero"
- `[範例]` 現金擔保賣出 put：投資人賣出一口剩六個月到期的 XYZ 50 put，收到權利金 $500，並把 $5,000 存在券商買國庫券，六個月可賺利息 $250。若到期前沒有被指派，總報酬是 $750。若 XYZ 股價跌破 $42-1/2 且被指派，她會有淨損失。（S1, p.66）
- `[事實]` 在沒有套利的情況下，到期支付 $X$ 的契約，今天的價格是 $X$ 的風險中立期望值折現。（S13, p.11）
  > "in absence of arbitrage, price of contract that pays X at time T should be"

- `[事實]` 連結股票或指數的結構型債券，通常不包含標的原本會配發的股利。（S7, §Other Costs or Tradeoffs）
  > "typically exclude dividends"
- `[事實]` 結構型債券到期前的價值，會隨當時的利率與標的的波動率等因素變動。（S7, §Can I Get My Money）
  > "(including prevailing interest rates and the volatility of the underlying asset, index or benchmark)"

### 拆解與定價（自行推導）

- `[推導]` 簡化 ELN 的到期報償等於 $(N + C) - \frac{N}{K}\max(K - S_T, 0)$（F08）：一筆固定金額，減去 $N/K$ 單位 put 的到期價值。推導見下；測試：C3-9。（S12, p.5）
- `[推導]` 因此投資人的部位等於：持有一張到期支付 $N + C$ 的零息債券，同時賣出 $N/K$ 單位、履約價 $K$ 的歐式 put。（S12, p.5）
- `[推導]` 在 Black-Scholes 模型下，簡化 ELN 的理論價值是 $(N + C)e^{-rT} - \frac{N}{K}P_{BS}(K, T, \sigma)$（F09）。推導見下；測試：C3-10。（S13, p.11）
- `[推導]` 若以面額 $N$ 發行且沒有任何費用，使理論價值等於 $N$ 的公平票息是 $C^* = N(e^{rT} - 1) + \frac{N}{K}P_{BS}\,e^{rT}$（F17）：一部分是本金的利息，另一部分是賣出 put 收到的權利金。（S13, p.11）
- `[推導]` 其他條件不變時，$\sigma$ 越高，$P_{BS}$ 越大（F07 的 vega 為正），所以理論價值越低、公平票息越高。測試：C3-10。（S5, p.18）

## 公式卡

> **F08｜簡化 ELN 到期報償** `[推導]`
> $$\text{Payoff} = (N + C) - \frac{N}{K}\max(K - S_T,\ 0)$$
> 符號定義：$N$＝面額；$C$＝票息（金額）；$K$＝履約價；$S_T$＝到期時的股價。
> 適用假設：條款如上；忽略發行機構信用風險、費用與股利。
> 出處：由條款與 F02 推導；對應測試 C3-9。

> **F09｜簡化 ELN 理論價值** `[推導]`
> $$V = (N + C)\,e^{-rT} - \frac{N}{K}\,P_{BS}(K, T, \sigma)$$
> 符號定義：$P_{BS}(K, T, \sigma)$＝F04 的歐式 put 價格（標的現價 $S$、利率 $r$ 為其另外兩個輸入）；$r$＝無風險利率；其餘同 F08。
> 適用假設：同 F03、F08。特別注意：以無風險利率折現，等於假設發行機構一定會付款。
> 出處：由 F08、F04 與風險中立定價（S13, p.11）推導；對應測試 C3-10。

> **F17｜簡化 ELN 的公平票息** `[推導]`
> $$C^* = N\left(e^{rT} - 1\right) + \frac{N}{K}\,P_{BS}(K, T, \sigma)\,e^{rT}$$
> 符號定義：$C^*$＝使 F09 的 $V$ 等於發行價 $N$ 的票息；其餘同 F09。
> 適用假設：同 F09；以面額發行，沒有費用與利潤。
> 出處：由 F09 令 $V = N$ 解出；對應測試 C3-10。

## 推導

### F08

把條款的兩種情況分別代入 $(N + C) - \frac{N}{K}\max(K - S_T, 0)$：

- $S_T \ge K$：$\max(K - S_T, 0) = 0$，結果是 $N + C$。與條款一致。
- $S_T < K$：$\max(K - S_T, 0) = K - S_T$，結果是 $N + C - \frac{N}{K}(K - S_T) = N \cdot \frac{S_T}{K} + C$。與條款一致。

兩種情況都相符。$\max(K - S_T, 0)$ 正是 F02 的 put 到期價值，所以報償＝固定金額 $N + C$ 減去 $N/K$ 單位 put 的到期價值。

由此可以直接讀出三個性質（即 C3-9 的檢查項目）：$S_T = K$ 時兩種情況都給 $N + C$，報償連續；$S_T \ge K$ 時報償固定為 $N + C$；$S_T = 0$ 時報償為 $C$。

### F09

到期支付 $X$ 的契約，今天的價格是 $e^{-rT}E_{RN}[X]$（S13, p.11）。期望值是線性的，所以對 F08 的報償：

$$V = e^{-rT}(N + C) - \frac{N}{K}\,e^{-rT}E_{RN}\big[\max(K - S_T, 0)\big]$$

第二項中的 $e^{-rT}E_{RN}[\max(K - S_T, 0)]$ 就是歐式 put 今天的價格；在 Black-Scholes 模型下它等於 F04 的 $P_{BS}$。代入即得 F09。

### F17

令 F09 的 $V = N$：

$$(N + C^*)\,e^{-rT} = N + \frac{N}{K}P_{BS} \quad\Longrightarrow\quad C^* = N\left(e^{rT} - 1\right) + \frac{N}{K}P_{BS}\,e^{rT}$$

第一項是把 $N$ 以無風險利率存到期的利息；第二項是賣出 $N/K$ 單位 put 收到的權利金，滾到到期日的金額。

因為 $\partial P_{BS}/\partial\sigma = \text{Vega} > 0$（F07），$C^*$ 隨 $\sigma$ 遞增，$V$ 隨 $\sigma$ 遞減。

## 相關頁面

- [[structured-note-architecture|結構型商品的組成]]
- [[payoff-diagram|到期價值與損益]]
- [[black-scholes-model|Black-Scholes 模型]]
- [[vega|Vega]]
- [[estimated-value-vs-issue-price|估計價值與發行價]]
- [[issuer-credit-risk|發行機構信用風險]]
- [[common-misconceptions|常見誤解]]

## 來源

- [[s1-occ-characteristics-risks|S1]]：OCC, *Characteristics and Risks of Standardized Options*（June 2024）
- [[s5-oic-understanding-greeks|S5]]：OCC／OIC, *Making More Informed Decisions: Understanding Greeks*（2023）
- [[s6-sec-structured-notes|S6]]：SEC, *Investor Bulletin: Structured Notes*（2015）
- [[s7-sec-finra-principal-protection|S7]]：FINRA／SEC, *Structured Notes with Principal Protection: Note the Terms of Your Investment*（2011）
- [[s12-mit-18s096-black-scholes|S12]]：MIT OpenCourseWare 18.S096 Lecture 19, Strela（Fall 2013）
- [[s13-mit-18440-risk-neutral-black-scholes|S13]]：MIT OpenCourseWare 18.440 Lecture 36, Sheffield（Spring 2014）

## 待補

- 沒有來源描述過和本頁條款完全相同的商品。S6 沒有提到「ELN」這個名稱；它與實際商品（例如 reverse convertible）的對應關係，本 wiki 沒有來源支撐，簡報不得宣稱兩者相同。
- 台灣的實際案例（S9）尚未 ingest。
- F17 是規格 §2.5 沒有列出的新公式卡。加它的原因是 C3-10 要測「公平票息隨 σ 上升」，而 C3-12 要求 `lab/` 的每個函式都對應一張公式卡。
- F08、F09、F17 的推導只經過人工檢查，要等 C3-9、C3-10 才算驗證。
- 真實商品的票息與 F17 的公平票息會有差距，因為發行價包含了費用與避險成本（見 [[estimated-value-vs-issue-price|估計價值與發行價]]）。差多少，本 wiki 沒有數字。
