# 簡報大綱｜Derivatives Lab｜波動率為什麼不是一個數字？

> 副標：從一張選擇權，到一張結構型商品的定價實驗室
> run v1 / N2 產出。結構依 `GRAPH_SPEC.md` §3；覆蓋對照見 `runs/v1/coverage_map.md`。

**讀法**
- 每個重點前的 ①②③ 是深度層次：① 直覺（白話＋圖）、② 公式（可摺疊「進階」區塊）、③ 動手（互動工具）。
- 每個重點後的 `[[頁名]]` 是支撐它的 wiki 頁。
- 大綱中出現的數字都是 wiki 中的 `[事實]`／`[範例]`，括號內是來源 ID。N4 寫內文時，計算結果一律用 `{{calc:…}}` 佔位。
- 互動工具 A 的曲面一律由程式依已核准的示意參數產生，畫面上標註「示意參數」。

## 總表

| 頁 | 標題 | 目標 | 互動工具 | 深度 | 主要 wiki 頁 |
|---|---|---|---|---|---|
| S01 | 開場：交易室裡的 3D 圖 | — | A 曲面（只旋轉） | ① | volatility-surface |
| S02 | 這堂課的四個目標 | — | — | ① | （各目標的主要頁） |
| S03 | 一張選擇權：Call／Put、K、T | L1 | — | ① | call-put-option, strike-maturity-moneyness |
| S04 | 損益圖 | L1 | 損益滑桿 | ①②③ | payoff-diagram |
| S05 | 價格由什麼決定：只有 σ 看不到 | L2 | — | ① | black-scholes-model, implied-volatility |
| S06 | Black-Scholes | L2 | B 定價器 | ①②③ | black-scholes-model, put-call-parity |
| S07 | 隱含波動率：從價格反推 σ | L2 | B 反推模式 | ①②③ | implied-volatility, iv-inversion-algorithm |
| S08 | 如果 BS 是對的，曲面應該是平的 | L3 | — | ① | bs-assumptions-limitations, implied-volatility |
| S09 | 固定 T、改變 K：微笑與偏斜 | L3 | A 切面 | ①③ | volatility-smile-skew |
| S10 | 固定在價平、改變 T：期限結構 | L3 | A 切面 | ①③ | volatility-term-structure |
| S11 | 為什麼會有偏斜 | L3 | — | ① | why-skew-exists |
| S12 | 回到開場那張圖：曲面不能有套利 | L3 | A 完整 | ①②③ | volatility-surface, svi-parameterization, no-arbitrage-surface |
| S13 | Vega：波動率一變，價格跟著變 | L4 | B（拉 σ） | ①②③ | vega |
| S14 | 結構型商品＝債券＋選擇權 | L4 | — | ① | structured-note-architecture |
| S15 | 簡化 ELN：票息從哪裡來 | L4 | D ELN 模擬器 | ①②③ | eln-simplified |
| S16 | 真實商品：估計價值低於發行價 | L4 | — | ① | estimated-value-vs-issue-price |
| S17 | 三個常見誤解＋風險 | L3, L4 | — | ① | common-misconceptions, issuer-credit-risk, liquidity-risk |
| S18 | 小測驗 | L1–L4 | 測驗互動 | ③ | （每題各自標註） |
| S19 | 總結＋延伸閱讀＋期末延伸預告 | — | — | ① | index |

共 19 頁。

---

## S01｜開場：交易室裡的 3D 圖
- **目標**：—（引出核心問題，對應 L3）
- **互動工具**：A 曲面（只旋轉）
- **深度**：①
- **重點**
  1. ① 業界把隱含波動率同時對履約價與到期日畫出來，稱為「隱含波動率曲面」 [[volatility-surface]]
  2. ① 核心問題：如果 Black-Scholes 是對的，這張圖應該是平的；市場上的卻是彎的，而且隨時間變動 [[volatility-surface]]
  3. ① 畫面上的曲面由程式依已核准的示意參數產生，標註「示意參數」 [[svi-parameterization]]

## S02｜這堂課的四個目標
- **目標**：—
- **互動工具**：—
- **深度**：①
- **重點**
  1. ① L1：看懂選擇權的履約價 K、到期日 T 與損益圖 [[call-put-option]] [[payoff-diagram]]
  2. ① L2：說出隱含波動率是從市場價格反推出來的 [[implied-volatility]]
  3. ① L3：解釋波動率曲面為什麼不是平的（偏斜、期限結構） [[volatility-surface]]
  4. ① L4：說明簡化 ELN 的票息從哪裡來、投資人承擔什麼風險 [[eln-simplified]]

## S03｜一張選擇權：Call／Put、K、T
- **目標**：L1
- **互動工具**：—
- **深度**：①
- **重點**
  1. ① 選擇權是一種權利：在到期日之前，以固定的履約價買進或賣出標的；買進的權利是 call，賣出的權利是 put [[call-put-option]]
  2. ① 買方付權利金取得權利；賣方收權利金，被指派履約時有義務履行 [[call-put-option]]
  3. ① 履約價 K 是買方有權買賣的價格；到期日是選擇權失效的日子，歐式選擇權只能在到期日履約 [[strike-maturity-moneyness]]
  4. ① 標的現價 S 和 K 的相對位置，決定價內、價平、價外 [[strike-maturity-moneyness]]

## S04｜損益圖
- **目標**：L1
- **互動工具**：損益滑桿
- **深度**：①②③
- **重點**
  1. ① Call 到期時，只有標的價格高於 K 才有價值；put 相反，只有低於 K 才有價值 [[payoff-diagram]]
  2. ① 買方的損益＝到期價值減去當初付的權利金；價外到期，權利金全部賠掉 [[payoff-diagram]] [[call-put-option]]
  3. ② 進階：F01 call 到期價值、F02 put 到期價值 [[payoff-diagram]]
  4. ③ 損益滑桿：改變 K 與到期標的價格，看 call／put 的損益線怎麼移動 [[payoff-diagram]]

## S05｜價格由什麼決定：只有 σ 看不到
- **目標**：L2
- **互動工具**：—
- **深度**：①
- **重點**
  1. ① Black-Scholes 用五個輸入算出歐式選擇權的理論價格：S、K、T、r、σ [[black-scholes-model]]
  2. ① 波動率以外的輸入都是已知參數（S13 的說法） [[black-scholes-model]]
  3. ① σ 要的是標的「未來」的波動；權利金反映的是市場參與者各自對未來波動率的估計 [[implied-volatility]]
  4. ① 其他條件相同時，標的波動越大，權利金越高 [[implied-volatility]]

## S06｜Black-Scholes
- **目標**：L2
- **互動工具**：B 定價器
- **深度**：①②③
- **重點**
  1. ① 想法：衍生性商品今天的價格，由一個能完全複製它到期報償的投資組合的價格決定 [[black-scholes-model]]
  2. ① 主要假設：股價對數常態、波動率與利率固定；解析解適用於歐式 call 與 put [[black-scholes-model]]
  3. ① 相同履約價的 call 與 put，價格彼此相關（買賣權平價） [[put-call-parity]]
  4. ② 進階：F03 call 價格、F04 put 價格、F05 d₁、d₂ 與 N(x) [[black-scholes-model]]
  5. ② 進階：由 F03、F04 推得 F06：C − P = S − Ke^(−rT) [[put-call-parity]]
  6. ③ B 定價器：輸入 S、K、T、r、σ，看 call 與 put 的價格 [[black-scholes-model]]

## S07｜隱含波動率：從價格反推 σ
- **目標**：L2
- **互動工具**：B 反推模式
- **深度**：①②③
- **重點**
  1. ① 隱含波動率是「讓 Black-Scholes 算出的價值等於市價」的那個波動率；本質上是一種報價方式 [[implied-volatility]]
  2. ① 歷史波動率是過去的統計事實，不是預測；隱含波動率反映市場對未來波動的預期 [[implied-volatility]]
  3. ① 例子：VIX 用 S&P 500 選擇權的價格，衡量市場對未來 30 天波動率的預期（S2） [[implied-volatility]]
  4. ① 反推的做法是不斷調整 σ，直到公式算出的價格等於市價 [[iv-inversion-algorithm]]
  5. ② 進階：價格隨 σ 遞增，所以解是唯一的，可用二分法或 Newton 法求出；市價必須落在上下界之間才有解 [[iv-inversion-algorithm]]
  6. ③ B 反推模式：輸入市價，得到隱含波動率 [[iv-inversion-algorithm]]

## S08｜如果 BS 是對的，曲面應該是平的
- **目標**：L3
- **互動工具**：—
- **深度**：①
- **重點**
  1. ① Black-Scholes 假設標的在任何時間、任何價位都只有一個固定的波動率 [[bs-assumptions-limitations]]
  2. ① 所以同一檔股票、同一個到期日，所有履約價反推出的隱含波動率都應該相同；畫成曲面應該是平的 [[implied-volatility]] [[bs-assumptions-limitations]]
  3. ① 實際上，隱含波動率隨履約價改變，不是常數 [[implied-volatility]]
  4. ① 假設與市場的落差：分布的尾部太肥、每天的波動幅度不固定、價格會大幅跳動 [[bs-assumptions-limitations]]
  5. ① Derman 認為，應該把 Black-Scholes 隱含波動率看成一種略嫌簡化的報價慣例 [[bs-assumptions-limitations]]

## S09｜固定 T、改變 K：微笑與偏斜
- **目標**：L3
- **互動工具**：A 切面（固定到期日）
- **深度**：①③
- **重點**
  1. ① 固定到期日、只改變履約價，各選擇權的隱含波動率並不相同；這條不平的曲線稱為波動率微笑（smile） [[volatility-smile-skew]]
  2. ① 股價指數的典型形狀：低履約價的隱含波動率較高、高履約價較低，稱為（負）偏斜（skew） [[volatility-smile-skew]]
  3. ① 例子：S&P 選擇權的隱含波動率隨履約價不同，大約從 14% 到 24%（S10） [[volatility-smile-skew]]
  4. ① 1987 年 10 月股災之前，指數選擇權的曲面相當平；之後才變得偏斜（S10） [[volatility-smile-skew]]
  5. ③ A 切面：固定到期日，看隱含波動率隨履約價的形狀（示意參數） [[volatility-smile-skew]]

## S10｜固定在價平、改變 T：期限結構
- **目標**：L3
- **互動工具**：A 切面（固定價平）
- **深度**：①③
- **重點**
  1. ① 價平選擇權的隱含波動率隨到期時間的變化，稱為期限結構 [[volatility-term-structure]]
  2. ① 例子：1993 年 5 月 5 日的 S&P 500 指數選擇權，價平隱含波動率隨到期時間拉長而上升（S11） [[volatility-term-structure]]
  3. ① VIX 的計算本身就用到兩個到期日，兩者各自算出的變異數並不相等（S2） [[volatility-term-structure]]
  4. ① Derman 與 Kani 把偏斜與期限結構合稱為波動率「smile」 [[volatility-term-structure]]
  5. ③ A 切面：固定在價平，看隱含波動率隨到期時間的變化（示意參數） [[volatility-term-structure]]

> 附註：§3 的寫法是「固定 K」；wiki 的定義是固定在價平（S11）。本大綱採 wiki 的寫法，工具 A 以 log-strike k = 0 呈現。

## S11｜為什麼會有偏斜
- **目標**：L3
- **互動工具**：—
- **深度**：①
- **重點**
  1. ① 背景事實：微笑最早在 1987 年股災之後出現；波動率與股市報酬呈負相關 [[why-skew-exists]]
  2. ① Derman 認為：大盤單日暴跌的可能性比較高，所以保護下跌的低履約價 put，應該比高履約價的 call 值錢 [[why-skew-exists]]
  3. ① Derman 認為：指數向下跳空的傾向大於向上，個股則比較對稱，這或許是個股微笑比較對稱的原因 [[why-skew-exists]]
  4. ① 成因沒有定論：微笑出現 15 年後，業界對哪個模型才正確仍沒有共識（S10） [[why-skew-exists]]

## S12｜回到開場那張圖：曲面不能有套利
- **目標**：L3
- **互動工具**：A 完整
- **深度**：①②③
- **重點**
  1. ① 把兩個方向合起來，隱含波動率是履約價與到期日的函數，形成一張曲面 [[volatility-surface]]
  2. ① 曲面可以用少數幾個參數描述；開場那張圖就是這樣畫出來的 [[svi-parameterization]]
  3. ① 曲面不能隨便畫：到期越長，總變異數不能變小（沒有日曆價差套利）；每個到期日隱含的機率密度不能是負的（沒有蝶式套利） [[no-arbitrage-surface]]
  4. ② 進階：F10 座標、F12 SSVI 曲面、F13 φ 函數 [[svi-parameterization]]
  5. ② 進階：F14 日曆條件、F15 蝶式條件、F16 SSVI 的充分條件；示意參數滿足 F16 [[no-arbitrage-surface]]
  6. ③ A 完整：旋轉並切換切面，看完整的曲面（示意參數） [[volatility-surface]]

## S13｜Vega：波動率一變，價格跟著變
- **目標**：L4
- **互動工具**：B（拉 σ）
- **深度**：①②③
- **重點**
  1. ① Vega 是選擇權價值對隱含波動率的敏感度：隱含波動率變動 1 個百分點，選擇權價值的預期變動 [[vega]]
  2. ① 隱含波動率上升，call 和 put 的價格都會上升；兩者的 vega 都是正的 [[vega]]
  3. ① 和 L4 的關係：波動率越高，put 越值錢；後面的 ELN 就內含賣出的 put [[eln-simplified]]
  4. ② 進階：F07 vega [[vega]]
  5. ③ B（拉 σ）：只改變 σ，看 call 與 put 價格怎麼變 [[vega]]

## S14｜結構型商品＝債券＋選擇權
- **目標**：L4
- **互動工具**：—
- **深度**：①
- **重點**
  1. ① 結構型債券由兩個部分組成：債券部分，以及內嵌的衍生性商品；報酬連結到某個參考資產或指數 [[structured-note-architecture]]
  2. ① 通常由金融機構設計並發行，再由券商賣給個人投資人 [[structured-note-architecture]]
  3. ① 它不代表持有任何資產組合，而是發行機構的付款承諾 [[structured-note-architecture]]
  4. ① 報償可以加上參與率、上限、觸及價等設計；例：參與率 50%、參考資產上漲 20%，投資人拿到 10%（S6） [[structured-note-architecture]]
  5. ① 台灣常見的包裝名稱：FCN、ELN（S9） [[structured-note-architecture]]
- **必備標註**：教學說明，不構成投資建議 [[structured-note-architecture]]

## S15｜簡化 ELN：票息從哪裡來
- **目標**：L4
- **互動工具**：D ELN 模擬器
- **深度**：①②③
- **頁首標註**：教學用簡化結構，忽略發行機構信用風險、費用與股利；不構成投資建議 [[eln-simplified]]
- **重點**
  1. ① 條款：到期時股價不低於 K，拿回面額加票息；低於 K，拿到價值 N·S_T/K 的股票加票息 [[eln-simplified]]
  2. ① 拆開來看：一張到期支付「面額＋票息」的零息債券，加上賣出 N/K 單位的 put [[eln-simplified]]
  3. ① 票息高於無風險利息的部分，就是賣出 put 收到的權利金；波動率越高，公平票息越高 [[eln-simplified]]
  4. ① 財訊報導引述的專家認為，台灣連結美超微的這類商品，其實就是賣出賣權的做法（S9） [[eln-simplified]]
  5. ② 進階：F08 到期報償、F09 理論價值、F17 公平票息 [[eln-simplified]]
  6. ③ D ELN 模擬器：調整 σ 與 K，看公平票息與到期報償怎麼變 [[eln-simplified]]

## S16｜真實商品：估計價值低於發行價
- **目標**：L4
- **互動工具**：—
- **深度**：①
- **重點**
  1. ① 發行機構在估計的公平價值上加一段價差，得出發行價；價差涵蓋避險等成本與利潤，對投資人通常不透明 [[estimated-value-vs-issue-price]]
  2. ① 真實案例：Barclays 2015 年一檔債券，每張面額 $1,000、以面額的 100% 發行，發行機構估計的價值是每張 $962.10（S8） [[estimated-value-vs-issue-price]]
  3. ① 文件寫明的差額來源：銷售佣金、預期利潤、預估的避險成本與其他成本 [[estimated-value-vs-issue-price]]
  4. ① 估計價值來自發行機構的內部模型，變數包括波動率與利率；它不是對次級市場成交價的預測 [[estimated-value-vs-issue-price]]
- **必備標註**：已到期商品的靜態案例；教學說明，不構成投資建議 [[estimated-value-vs-issue-price]]

## S17｜三個常見誤解＋風險
- **目標**：L3、L4
- **互動工具**：—
- **深度**：①
- **重點**
  1. ① 誤解一（L3）：隱含波動率高 ≠ 看漲或看跌。隱含波動率上升會讓 call 和 put 同時變貴，它只反映預期的波動幅度 [[common-misconceptions]]
  2. ① 誤解二（L4）：保本 ≠ 不會虧。保本是發行機構的承諾；Lehman Brothers 的保本型債券就是實例 [[common-misconceptions]] [[issuer-credit-risk]]
  3. ① 誤解三（L4）：高票息 ≠ 高報酬。高票息是承擔下跌風險的報酬，可能賺了利息、賠了本金 [[common-misconceptions]]
  4. ① 信用風險：結構型債券是發行機構的無擔保債務，所有付款都取決於發行機構的信用 [[issuer-credit-risk]]
  5. ① 流動性風險：多數沒有掛牌，到期前可能只能折價賣出或賣不掉，要有持有到期的準備 [[liquidity-risk]]
- **必備標註**：教學說明，不構成投資建議 [[common-misconceptions]]

## S18｜小測驗
- **目標**：L1–L4（每題標註）
- **互動工具**：測驗互動
- **深度**：③
- **題目**
  1. ③ Q1（L1）：買進 call，到期時標的價格低於履約價，這張 call 的到期價值是多少？ [[payoff-diagram]]
  2. ③ Q2（L2）：隱含波動率是怎麼得到的？（用過去的股價算／從選擇權市價代回 Black-Scholes 反推） [[implied-volatility]]
  3. ③ Q3（L3）：如果 Black-Scholes 完全正確，同一到期日、不同履約價的隱含波動率應該怎樣？ [[bs-assumptions-limitations]]
  4. ③ Q4（L3）：股價指數選擇權中，低履約價的隱含波動率比較高，這個現象叫什麼？ [[volatility-smile-skew]]
  5. ③ Q5（L4）：簡化 ELN 的票息高於無風險利息的部分，從哪裡來？ [[eln-simplified]]
  6. ③ Q6（L4）：標榜「保本」的結構型債券，在什麼情況下仍可能虧損？ [[common-misconceptions]]

## S19｜總結＋延伸閱讀＋期末延伸預告
- **目標**：—
- **互動工具**：—
- **深度**：①
- **重點**
  1. ① 總結：價格裡看不到的 σ 要從市價反推（L2）；反推出的隱含波動率隨履約價與到期日變動，是一張曲面（L3）；簡化 ELN 的票息有一部分是賣出 put 的權利金（L4） [[implied-volatility]] [[volatility-surface]] [[eln-simplified]]
  2. ① 延伸閱讀：wiki 索引與術語表 [[index]] [[glossary]]
  3. ① 期末延伸預告：其他 Greeks（delta、gamma、theta）、保本型商品、自動提前出場型商品 [[greeks-overview]] [[principal-protected-note]] [[autocallable]]
