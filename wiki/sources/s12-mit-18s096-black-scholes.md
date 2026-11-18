# S12｜風險中立定價與 Black-Scholes 公式（MIT 18.S096 Lecture 19）

> MIT 開放課程 18.S096 第 19 講的投影片，講者是 Vasily Strela。從複製投資組合與風險中立評價出發，推出 Black-Scholes 方程式，並給出歐式 call 與 put 的公式解。

## 來源資料

| 欄位 | 內容 |
|---|---|
| 來源 ID | S12 |
| 標題 | Risk Neutral Pricing, Black-Scholes Formula（Lecture 19） |
| 作者／機構 | Dr. Vasily Strela（Morgan Stanley and MIT）；MIT OpenCourseWare, 18.S096 Topics in Mathematics with Applications in Finance |
| 發布日期 | Fall 2013 |
| URL | https://ocw.mit.edu/courses/18-s096-topics-in-mathematics-with-applications-in-finance-fall-2013/resources/mit18_s096f13_lecnote19/ |
| 取得日期 | 2026-11-18 |
| 原始檔路徑 | `raw/s12-mit-18s096-black-scholes.pdf`（26 頁） |
| SHA-256 | `2c44262f18243a3f0b0231393bfc6e62421be1a9f5683070b5a9df5e9373d03c` |
| 是否 commit | 否，只留本機（MIT OpenCourseWare，使用條款見 ocw.mit.edu/terms） |
| 取得狀態 | `ok`（自動下載） |

**頁碼說明**：引用時使用投影片右下角的編號，與 PDF 頁序相同（第 1 張標題頁沒有印編號）。

**加入經過**：本來源不在 `GRAPH_SPEC.md` 原始清單中，2026-11-18 經 Itzel 核准加入，用來補 S3 缺少的講義內容。

**使用注意**：
- 公式是對照 PDF 第 19 頁的原圖抄錄的；轉出的文字檔中公式符號不完整，不能直接使用。
- 第 23 張投影片是一張標示資料來源為 Bloomberg 的圖。依 `GRAPH_SPEC.md` §9 的禁止事項，本 wiki 沒有引用、描述或重製這張圖的任何內容。
- 第 25 張是 Morgan Stanley 的免責聲明，聲明內容僅供參考、不構成買賣要約。

## 來源重點摘要

- `[事實]` 歐式 call 在到期時支付 max(S−K, 0)，歐式 put 支付 max(K−S, 0)。（S12, p.4；p.5）
  > "European Call option pays max(S-K,0) at time T"
- `[事實]` 衍生性商品目前的價格，由一個能完全複製其到期報償的投資組合的目前價格決定。（S12, p.8）
  > "Current price of a derivative claim is determined by current price of a portfolio which exactly replicates the payoff of the derivative at the maturity"
- `[事實]` 推導 Black-Scholes 方程式時，假設股票價格服從對數常態的動態。（S12, p.13）
  > "Assume that the stock has log-normal dynamics"
- `[事實]` 對歐式 call 與 put，Black-Scholes 方程式有解析解。（S12, p.19）
  > "For European Call/Put the equation can be solved analytically"
- `[事實]` 較複雜的選擇權或較一般的假設，必須用數值方法：有限差分、樹狀方法、Monte Carlo 模擬。（S12, p.21）
  > "For more complicated options or more general assumptions numerical methods have to be used"

## 由本來源支撐的 wiki 頁

- [[black-scholes-model|Black-Scholes 模型]]
- [[put-call-parity|買賣權平價]]
- [[payoff-diagram|到期價值與損益]]
- [[bs-assumptions-limitations|Black-Scholes 的假設與限制]]（引用 p.19）
- [[iv-inversion-algorithm|隱含波動率的反推演算法]]（引用 p.19）
- [[glossary|術語表]]

## 來源衝突紀錄

無。

## 本來源沒有的內容

- 沒有提到隱含波動率、微笑或偏斜。
- 沒有明說「無股利」這個假設；公式中沒有股利項。
- 沒有寫出 put-call parity。本 wiki 的 F06 是由這份來源的 call 與 put 公式相減推導而來。
- 沒有 Greeks（包括 vega）的公式。
