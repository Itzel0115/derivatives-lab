# 隱含波動率的反推演算法（IV Inversion Algorithm）

> 隱含波動率沒有公式可以直接算出來，只能反過來「試」：不斷調整 $\sigma$，直到 Black-Scholes 公式算出的價格等於市價。本頁用二分法說明這個過程。

**閱讀提醒**：本頁的演算法步驟是自行推導（`[推導]`），不是來源原文。來源只提供隱含波動率的定義。

## 重點主張

### 要解的問題（來源提供）

- `[事實]` 隱含波動率是代入 Black-Scholes 公式（連同其他已知參數）後，能算出目前市價的那個波動率。（S13, p.18）
  > "(when plugged into Black-Scholes formula along with known parameters) predicts the current market price"
- `[事實]` 交易員報選擇權的市價時，用的是「讓 Black-Scholes 公式算出的價值等於市價」的那個波動率。（S11, p.2）
  > "has led traders to quote a call option's market price in terms of whatever constant local volatility"
- `[事實]` 其他條件相同時，標的波動越大，選擇權權利金越高。（S1, p.15）
  > "options on more volatile interests command higher premiums than options on less volatile interests"

- `[事實]` Black-Scholes 的（未折現）選擇權價值，對總隱含變異數是嚴格遞增的。（S4, p.4）
  > "strictly increasing in its second argument"

### 演算法（自行推導）

- `[推導]` 反推隱含波動率，就是解方程式 $C_{BS}(S, K, T, r, \sigma) = C_{mkt}$ 中的未知數 $\sigma$，其中 $C_{BS}$ 是 F03、$C_{mkt}$ 是市場價格。這是把上面的定義直接寫成方程式。測試：C3-4。（S13, p.18）
- `[推導]` 因為 F03 的 call 價格隨 $\sigma$ 遞增，所以這個方程式最多只有一個解，而且可以用二分法求解。遞增性由 C3-3 測試；二分法的正確性由 C3-4 的來回測試驗證。（S13, p.18）
- `[推導]` 市價必須落在 $\max(S - Ke^{-rT},\,0) < C_{mkt} < S$ 之間才有解。這兩個界限是 F03 在 $\sigma \to 0$ 與 $\sigma \to \infty$ 時的極限，見下方推導。測試：C3-2。（S12, p.19）

## 推導

### 1. 價格的上下界

由 F05，$d_1 = \dfrac{\ln(S/K) + rT}{\sigma\sqrt{T}} + \dfrac{\sigma\sqrt{T}}{2}$，$d_2 = d_1 - \sigma\sqrt{T}$。

- 當 $\sigma \to \infty$：$d_1 \to +\infty$、$d_2 \to -\infty$，所以 $N(d_1) \to 1$、$N(d_2) \to 0$，由 F03 得 $C \to S$。
- 當 $\sigma \to 0$：令 $m = \ln(S/K) + rT$。
  - 若 $m > 0$（即 $S > Ke^{-rT}$）：$d_1, d_2 \to +\infty$，$C \to S - Ke^{-rT}$。
  - 若 $m < 0$：$d_1, d_2 \to -\infty$，$C \to 0$。
  - 若 $m = 0$（即 $S = Ke^{-rT}$）：$d_1, d_2 \to 0$，$C \to (S - Ke^{-rT})/2 = 0$。
  - 合起來：$C \to \max(S - Ke^{-rT},\,0)$。

所以只要 $C_{mkt}$ 落在這兩個極限之間，就存在一個 $\sigma$ 使 $C_{BS} = C_{mkt}$。

### 2. 二分法步驟

輸入：$S$、$K$、$T$、$r$、市價 $C_{mkt}$。

1. 檢查 $\max(S - Ke^{-rT}, 0) < C_{mkt} < S$。不成立就回報「無解」，不繼續。
2. 設定搜尋區間 $[\sigma_L, \sigma_H]$，使 $C_{BS}(\sigma_L) < C_{mkt} < C_{BS}(\sigma_H)$。
3. 取中點 $\sigma_M = (\sigma_L + \sigma_H)/2$，用 F03 算 $C_{BS}(\sigma_M)$。
4. 若 $C_{BS}(\sigma_M) > C_{mkt}$，表示 $\sigma_M$ 太大，令 $\sigma_H = \sigma_M$；否則令 $\sigma_L = \sigma_M$。
5. 重複第 3–4 步，直到 $\sigma_H - \sigma_L$ 小於容許誤差。
6. 回傳 $(\sigma_L + \sigma_H)/2$ 作為隱含波動率。

每做一輪，區間長度減半，所以一定會收斂。

### 3. 演算法設計參數

以下數值是演算法的設計選擇，**不是來源中的數字**，也不是市場數據：

| 參數 | 設計值 | 理由 |
|---|---|---|
| 初始區間 $[\sigma_L, \sigma_H]$ | $[0.0001,\ 5]$ | 需涵蓋 C3-4 的測試範圍 $\sigma \in [0.05, 1.0]$，並留有餘裕 |
| 容許誤差 | $10^{-8}$ | C3-4 要求 $|\hat\sigma - \sigma| < 10^{-6}$，取更嚴的值 |
| 最大迭代次數 | 100 | 區間每輪減半，約 30 輪即可達到容許誤差；100 是保險上限 |

若初始區間的兩端沒有把 $C_{mkt}$ 夾住（第 2 步不成立），同樣回報「無解」。

## 相關頁面

- [[implied-volatility|隱含波動率]]
- [[black-scholes-model|Black-Scholes 模型]]

## 來源

- [[s1-occ-characteristics-risks|S1]]：OCC, *Characteristics and Risks of Standardized Options*（June 2024）
- [[s4-gatheral-jacquier-svi|S4]]：Gatheral & Jacquier, *Arbitrage-free SVI volatility surfaces*（arXiv:1204.0646v4, 2013）
- [[s11-derman-kani-smile-implied-tree|S11]]：Derman & Kani, *The Volatility Smile and Its Implied Tree*（1994）
- [[s12-mit-18s096-black-scholes|S12]]：MIT OpenCourseWare 18.S096 Lecture 19, Strela（Fall 2013）
- [[s13-mit-18440-risk-neutral-black-scholes|S13]]：MIT OpenCourseWare 18.440 Lecture 36, Sheffield（Spring 2014）

## 待補

- Newton 法需要 vega（F07），而 F07 還沒有建立，要等 S5 ingest。規格 §2.4 寫的是「二分法／Newton」，目前只完成二分法。
- 「call 價格隨 σ 遞增」的依據：S4 指出 Black-Scholes 價值對總隱含變異數嚴格遞增（p.4），而固定 $T$ 時總變異數 $\sigma^2 T$ 隨 $\sigma$ 遞增。另有 S1 的定性說法（p.15）與 C3-3 的數值測試。
- put 的反推做法相同，把 F03 換成 F04、把界限換成 put 的界限即可；本頁沒有另外推導 put 的界限。
