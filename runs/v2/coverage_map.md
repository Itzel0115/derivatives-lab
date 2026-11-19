# N1 覆蓋對照｜run v2

- 輸入：`GRAPH_SPEC.md`（v2）§0 學習目標 L1–L4、§3 大綱、§2.4 頁面清單
- 讀取的 wiki 狀態：分支 `run-v2`，`wiki/` 已還原到 commit `75a35ef`（`[v2][setup]` 4e628cd；`git diff 75a35ef -- wiki/` 為空），與 run v1 的 N1 輸入完全相同
- 日期：2026-11-19
- 本節點只做對照、不修改 wiki
- 因為 §0、§2.4、§3 與 wiki 都和 run v1 相同，第 1–4 節的對照結果與 `runs/v1/coverage_map.md` 一致；本節點重新執行 `tools/lint.py` 與主張標籤計數核對過，數字沒有差異。第 5 節新增 v2 才有的注意事項（第 6–8 點）

---

## 1. 學習目標 → wiki 頁與公式卡

| 目標 | 內容 | 需要的 wiki 頁（本次相關） | 公式卡 | 對應大綱頁（§3） |
|---|---|---|---|---|
| **L1** | 看懂選擇權的履約價 K、到期日 T 與損益圖 | call-put-option、strike-maturity-moneyness、payoff-diagram | F01、F02 | S03、S04、S18 |
| **L2** | 說出「隱含波動率」是從市場價格反推出來的 | black-scholes-model、put-call-parity、implied-volatility、iv-inversion-algorithm | F03、F04、F05、F06；反推演算法另用 F07 | S05、S06、S07、S18 |
| **L3** | 解釋波動率曲面為什麼不是平的（skew、期限結構） | bs-assumptions-limitations、volatility-smile-skew、volatility-term-structure、why-skew-exists、volatility-surface、svi-parameterization、no-arbitrage-surface | F10、F11、F12、F13、F14、F15、F16 | S08–S12、S17、S18 |
| **L4** | 說明簡化 ELN 的票息從哪裡來、投資人承擔什麼風險 | vega、structured-note-architecture、eln-simplified、estimated-value-vs-issue-price、issuer-credit-risk、liquidity-risk、common-misconceptions | F07、F08、F09、F17（F09、F17 另用 F04） | S13–S18 |

- 不屬於單一目標的頁：S01（volatility-surface）、S02（學習目標）、S19（index）。
- 延伸頁（greeks-overview、delta、gamma、theta、principal-protected-note、autocallable）不列入需要清單；§3 只在 S19「延伸閱讀＋期末延伸預告」可能提到。

## 2. §2.4「本次相關」頁 × §3 大綱

| # | wiki 頁 | 存在 | §3 大綱中的頁 | 備註 |
|---|---|---|---|---|
| 1 | concepts/call-put-option | ✅ | S03 | |
| 2 | concepts/strike-maturity-moneyness | ✅ | S03 | |
| 3 | concepts/payoff-diagram | ✅ | S04 | index 狀態為「草稿」（待補：損益圖需由程式依 F01、F02 產生；買方損益的單一原句） |
| 4 | concepts/black-scholes-model | ✅ | S05、S06 | |
| 5 | concepts/bs-assumptions-limitations | ✅ | S08 | |
| 6 | concepts/put-call-parity | ✅ | **無** | §3 表格的「主要 wiki 頁」欄沒有列出此頁，但 §2.4 標為本次相關、C6-2 會檢查。見第 5 節 |
| 7 | concepts/implied-volatility | ✅ | S07 | |
| 8 | concepts/iv-inversion-algorithm | ✅ | S07 | |
| 9 | concepts/volatility-smile-skew | ✅ | S09 | |
| 10 | concepts/volatility-term-structure | ✅ | S10 | |
| 11 | concepts/why-skew-exists | ✅ | S11 | |
| 12 | concepts/volatility-surface | ✅ | S01、S12 | |
| 13 | concepts/svi-parameterization | ✅ | S12 | |
| 14 | concepts/no-arbitrage-surface | ✅ | S12 | |
| 15 | concepts/vega | ✅ | S13 | |
| 16 | products/structured-note-architecture | ✅ | S14 | |
| 17 | products/eln-simplified | ✅ | S15 | |
| 18 | products/estimated-value-vs-issue-price | ✅ | S16 | |
| 19 | risks/issuer-credit-risk | ✅ | S17 | |
| 20 | risks/liquidity-risk | ✅ | S17 | |
| 21 | risks/common-misconceptions | ✅ | S17 | |

本次相關頁共 21 頁，全部存在。

## 3. 互動工具 → 公式卡

| 工具（§3） | 出現頁 | 需要的公式卡 | 所在 wiki 頁 | 預定程式（N3） |
|---|---|---|---|---|
| 損益滑桿 | S04 | F01、F02 | payoff-diagram | 由 N3 決定放在哪個檔（§1 只列 bs.js、iv.js、svi.js、eln.js） |
| B 定價器 | S06 | F03、F04、F05 | black-scholes-model | `lab/bs.js` |
| B 反推模式 | S07 | F03、F05、F07（Newton 法）；二分法步驟 | black-scholes-model、vega、iv-inversion-algorithm | `lab/iv.js` |
| B（拉 σ） | S13 | F03、F04、F05、F07 | black-scholes-model、vega | `lab/bs.js` |
| A 曲面（只旋轉／切面／完整） | S01、S09、S10、S12 | F10、F12、F13；檢查用 F14、F15、F16；示意參數 σ₀ = 0.20、ρ = −0.7、η = 1.0、γ = 0.5（已核准） | svi-parameterization、no-arbitrage-surface | `lab/svi.js` |
| D ELN 模擬器 | S15 | F08、F09、F17（F09、F17 呼叫 F04） | eln-simplified、black-scholes-model | `lab/eln.js` |
| 測驗互動 | S18 | 無 | — | — |

- F11（raw SVI）沒有工具直接使用；它是 S4 反例（[範例]）與 C3 之外的說明用公式。F06 由 C3-1 測試，不對應工具。
- 損益滑桿的程式檔歸屬是 N3 的事，本節點只記錄 §1 沒有列出對應檔名。

## 4. 公式卡 F01–F17

| ID | 名稱 | 所在頁 | 標籤 | 出處／推導 | C3 測試 |
|---|---|---|---|---|---|
| F01 | Call 到期價值 | payoff-diagram | 事實 | （S12, p.4）；S1 p.9、p.14 | 沒有直接對應的 C3 測試（`[事實]`，不需要） |
| F02 | Put 到期價值 | payoff-diagram | 事實 | （S12, p.5）；S1 p.9、p.14 | C3-9（經 F08） |
| F03 | BS call 價格 | black-scholes-model | 事實 | （S12, p.19）；（S13, p.16） | C3-1、2、3、4、11 |
| F04 | BS put 價格 | black-scholes-model | 事實 | （S12, p.19） | C3-1、C3-10 |
| F05 | d₁、d₂、N(x) | black-scholes-model | 事實 | （S12, p.19）；（S13, p.16） | 經 F03、F04 |
| F06 | Put-call parity | put-call-parity | 推導 | 由 F03、F04、F05 推導；推導區塊完整 | C3-1 |
| F07 | BS vega | vega | 推導 | 由 F03、F05、F06 推導；推導區塊完整 | C3-5 |
| F08 | 簡化 ELN 到期報償 | eln-simplified | 推導 | 由條款與 F02 推導；推導區塊完整 | C3-9 |
| F09 | 簡化 ELN 理論價值 | eln-simplified | 推導 | 由 F08、F04 與（S13, p.11）推導；推導區塊完整 | C3-10 |
| F10 | log-strike 與總變異數 | svi-parameterization | 事實 | （S4, p.2） | 經 C3-6 |
| F11 | Raw SVI | svi-parameterization | 事實 | （S4, p.5） | 無工具使用 |
| F12 | SSVI | svi-parameterization | 事實 | （S4, p.11） | C3-6、C3-7、C3-8 |
| F13 | SSVI 的 φ | svi-parameterization | 事實 | （S4, p.17） | C3-6、C3-7、C3-8 |
| F14 | 日曆價差無套利 | no-arbitrage-surface | 事實 | （S4, p.3–4） | C3-7 |
| F15 | 蝶式無套利 | no-arbitrage-surface | 事實 | （S4, p.4） | C3-8 |
| F16 | SSVI 無靜態套利充分條件 | no-arbitrage-surface | 事實 | （S4, p.16） | 經 C3-6、7、8 |
| F17 | 簡化 ELN 公平票息 | eln-simplified | 推導 | 由 F09 令 V = N 解出；推導區塊完整 | C3-10 |

`tools/lint.py`（2026-11-19，run-v2 分支重新執行）：F01–F17 全部有定義、沒有重複、沒有跳號、全部登記在 index。

## 5. 需要在後續節點注意的事

1. **put-call-parity 不在 §3 大綱的「主要 wiki 頁」欄**。§2.4 標為本次相關，C6-2 會檢查是否被引用；§3 的 S06（Black-Scholes，公式放進階區塊）同時涵蓋 call 與 put 的公式（F03、F04），是唯一自然的位置。N2 預定把它放在 S06 的進階區塊，作為 F03 與 F04 之間的關係，不另開頁。是否算超出 §3 範圍，由 C2-6 判定、H1 確認。（run v1 的 H1 已核准這個安排，見 `docs/agents-md-decisions.md`；v2 沿用 v1 核准的大綱內容。）
2. **payoff-diagram 狀態為「草稿」**。待補的兩項（圖由程式產生；買方損益沒有單一原句）不影響 C1 條件；N4 引用「買方損益＝到期價值−權利金」時要用 F01／F02 附註的出處寫法。
3. **why-skew-exists 的主張大多是 `[觀點]`**（7 條觀點、4 條事實）。N4 必須寫明「Derman 認為」（C4-3）。
4. **S17、S18 的 L3**：§3 把 S17 標為 L3、L4。L3 的部分只能來自 common-misconceptions 的「誤解一：隱含波動率高代表看漲／看跌」，這一段的 wiki 依據是 S5、S1 的事實。
5. **沒有尚未裁決的來源衝突**（lint 第 8 項：none）。簡報引用不受 `AGENTS.md` §6 第 5 點限制。
6. **（v2）glossary 是 `75a35ef` 的版本，共 85 個術語**，沒有 run v1 在 N1 r2（`91893c9`）與結案後補上的 ELN、二分法、Newton 法、遠期價格、公平票息、信用風險（發行機構）、發行價、流動性風險這 8 個條目。N2 的術語首次出現表與 C2-7 要以這個版本判定；缺漏依 §5 C2 的規則回 N1 補（有 wiki 依據）或回 N2 改寫（沒有依據）。
7. **（v2）`tools/lint.py` 第 7 項（啟發式）列出的 wiki 已使用、glossary 未收錄的詞**：複委託、bail-in、布朗運動、漂移。四個詞都不在 v1 核准的大綱文字中；這只是提醒，是否列入術語表由 N2 依計數規則 6 判定。
8. **（v2）eln-simplified 主張 2、主張 4 的行內沒有寫 C3 測試編號**（run v1 在結案後的 `052cb17` 補上，該修改不在 `75a35ef` 中）。不屬於 C1 條件，見 C1 報告。
