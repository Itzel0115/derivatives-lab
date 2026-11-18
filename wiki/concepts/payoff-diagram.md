# 到期價值與損益（Payoff at Expiration）

> 選擇權到期時值多少錢，只看到期時的標的價格 $S_T$ 和履約價 $K$ 的差距；再扣掉一開始付的權利金，就是買方的損益。

## 重點主張

- `[事實]` 歐式 call 在到期時支付 max(S−K, 0)。（S12, p.4）
  > "European Call option pays max(S-K,0) at time T"
- `[事實]` 歐式 put 在到期時支付 max(K−S, 0)。（S12, p.5）
  > "European Put option pays max(K-S,0) at time T"
- `[事實]` 現金結算的 call，結算金額是標的結算價超過履約價的部分（再乘上乘數）。（S1, p.9）
  > "the amount by which the exercise settlement value of the underlying interest of a cash-settled call exceeds the exercise price"
- `[事實]` 現金結算的 put，結算金額是履約價超過標的結算價的部分（再乘上乘數）。（S1, p.9）
  > "the amount by which the exercise price of a cash-settled put exceeds the exercise settlement value of the underlying interest, multiplied by the multiplier for the option"
- `[範例]` 履約價 80 的 XYZ 指數 call，在指數結算價為 85 時履約。乘數是 100 時，買方收到的現金結算金額是 $500（$85 減 $80，乘以 100）。（S1, p.9）
- `[範例]` 同上，若乘數是 1，現金結算金額是 $5（$85 減 $80，乘以 1）。（S1, p.9）
- `[事實]` 價外的選擇權內含價值是零；到期時沒有履約的選擇權不再有價值。（S1, p.14；p.7）
  > "An option that is out of the money would have an intrinsic value of zero."
- `[事實]` 賣出現金結算 call 的損失，是現金結算金額扣掉收到的權利金。（S1, p.64）
  > "the loss will be the cash settlement amount reduced by the premium"
- `[範例]` 投資人賣出一口未持有標的的 XYZ 50 call，收到每股 $4 權利金，之後股價在接近到期時跳漲到 $69。若他以 $19 買回平倉，損失是 $1,500（買回付出 $1,900，減掉當初收到的 $400 權利金）。（S1, p.64）
- `[範例]` 投資人在 XYZ 股價 $50 時賣出 XYZ 50 call（持有股票），收到每股 $4 權利金。接近到期時股價漲到 $58 並被指派履約，他得到的是 $50 履約價加 $4 權利金，比不賣選擇權、直接以 $58 賣股少 $4。（S1, p.64）

## 公式卡

> **F01｜Call 到期價值** `[事實]`
> $$\text{Payoff}_{\text{call}} = \max(S_T - K,\ 0)$$
> 符號定義：$S_T$＝到期時的標的價格（S1 稱 exercise settlement value）；$K$＝履約價（exercise price）。以每一單位標的計；一口契約的金額要再乘上契約單位或乘數。
> 適用假設：一般的 call（不含 binary、range、capped 選擇權）；不計權利金、稅、交易成本與保證金。
> 出處：（S12, p.4）直接寫出此式；另見 S1 的文字定義（S1, p.9；p.14）。
> 附註：買方到期損益＝$\max(S_T - K, 0) - \text{權利金}$；賣方到期損益＝$\text{權利金} - \max(S_T - K, 0)$。（S1, p.11–12；p.64）

> **F02｜Put 到期價值** `[事實]`
> $$\text{Payoff}_{\text{put}} = \max(K - S_T,\ 0)$$
> 符號定義：同 F01。
> 適用假設：一般的 put（不含 binary、range、capped 選擇權）；不計權利金、稅、交易成本與保證金。
> 出處：（S12, p.5）直接寫出此式；另見 S1 的文字定義（S1, p.9；p.14）。
> 附註：買方到期損益＝$\max(K - S_T, 0) - \text{權利金}$；賣方到期損益＝$\text{權利金} - \max(K - S_T, 0)$。（S1, p.11–12；p.65）

## 相關頁面

- [[call-put-option|買權與賣權]]
- [[strike-maturity-moneyness|履約價、到期日與價內外]]
- [[black-scholes-model|Black-Scholes 模型]]

## 來源

- [[s1-occ-characteristics-risks|S1]]：OCC, *Characteristics and Risks of Standardized Options*（June 2024）
- [[s12-mit-18s096-black-scholes|S12]]：MIT OpenCourseWare 18.S096 Lecture 19, Strela（Fall 2013）

## 待補

- S12 的投影片有 call 與 put 的價值圖（p.4、p.5），但依規定不得使用來源圖片。圖形需由 N3 的程式依 F01、F02 產生。
- S1 沒有「買方到期損益＝到期價值−權利金」的單一原句；F01、F02 附註是由權利金定義（p.11–12）與賣方損失的說法（p.64、p.65）對應而來。若後續來源（S3、S5）有直接寫出的句子，應補上出處。
