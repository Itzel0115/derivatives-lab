# Wiki 紀錄

只能往下新增。格式見 `AGENTS.md` §8.2。

## [2026-11-18] ingest | S1 OCC Characteristics and Risks of Standardized Options
- run/節點：pre-run / N0
- 狀態：ok（C0 r1 FAIL 7 項 → r2 PASS）
- 新增頁：s1-occ-characteristics-risks, call-put-option, strike-maturity-moneyness, payoff-diagram
- 更新頁：glossary, index
- 公式卡：F01, F02
- 新術語：美式選擇權, 指派, 價平, 買權, 現金擔保賣出賣權, 現金結算, 歐式選擇權, 履約, 履約價, 到期日, 買方, 價內, 內含價值, 乘數, 選擇權, 價外, 實物交割, 權利金, 賣權, 時間價值, 標的, 契約單位, 賣方
- 衝突：無
- 備註：第一份來源，寫入前經 Itzel 確認寫法。F01、F02 標為 `[事實]`（S1 文字定義的符號化改寫）。S1 沒有 put-call parity，`put-call-parity.md` 未建立，待 S3。原檔由 Itzel 手動下載（網站有機器人驗證）。

## [2026-11-18] ingest | S2 Cboe Volatility Index Methodology
- run/節點：pre-run / N0
- 狀態：ok（C0 r1 FAIL 1 項 → r2 PASS）
- 新增頁：s2-cboe-vix-methodology, implied-volatility, volatility-term-structure
- 更新頁：s1-occ-characteristics-risks, glossary, index
- 公式卡：無（p.5 的 VIX 通用公式未抄錄，理由見來源頁）
- 新術語：隱含波動率, 近期／次近期, 實現波動率, VIX 指數
- 衝突：無
- 備註：全自動 ingest。S2 的免責聲明禁止未經書面同意的複製、散布與衍生作品，wiki 內容能否公開待 Itzel 決定。implied-volatility 同時引用了先前記在 S1 來源頁的主張。兩個新概念頁都是草稿，缺定義，待 S3。附錄 4、5 的報價與貢獻度表格只掃過文字行，未逐格閱讀。

## [2026-11-18] update | S2 使用限制的決定
- run/節點：pre-run / N0
- 狀態：ok
- 更新頁：s2-cboe-vix-methodology, implied-volatility, volatility-term-structure, index
- 衝突：無
- 備註：Itzel 決定維持 S2 現行引用方式（改寫＋短引＋少量範例數字）。移除相關頁面的「待決定」註記。

## [2026-11-18] ingest | S3 Derman An Introduction to the Volatility Smile（暫停）
- run/節點：pre-run / N0
- 狀態：暫停，等待 Itzel 決定（尚未寫入任何 wiki 頁）
- 新增頁：無
- 更新頁：無
- 公式卡：無
- 衝突：無
- 備註：規格指定的網址只提供一份 3 頁的課程目標與大綱，沒有講義本文。其中沒有 Black-Scholes 公式、假設、put-call parity、隱含波動率定義，也沒有 smile／skew／期限結構的說明。§2.4 中以 S3 為主要來源的頁面目前都沒有可用的支撐。原檔已存入 raw/ 並登記 MANIFEST。

## [2026-11-18] update | 來源清單新增 S10–S13
- run/節點：pre-run / N0
- 狀態：ok
- 更新頁：無（修改的是 GRAPH_SPEC.md §2.3、§2.4 與 raw/MANIFEST.md）
- 衝突：無
- 備註：S3 指定網址只有課程大綱。Itzel 核准加入四份替代來源：S10 Derman (2003)、S11 Derman & Kani (1994)、S12 MIT 18.S096 Lecture 19、S13 MIT 18.440 Lecture 36。§2.4 各頁的主要來源欄已對應更新；put-call-parity 改為由 F03、F04 推導。

## [2026-11-18] ingest | S3 Derman An Introduction to the Volatility Smile（課程大綱）
- run/節點：pre-run / N0
- 狀態：ok（C0 r1 PASS）
- 新增頁：s3-derman-volatility-smile, bs-assumptions-limitations
- 更新頁：s1-occ-characteristics-risks, index
- 公式卡：無
- 新術語：無
- 衝突：無
- 備註：全自動 ingest。只有 3 頁課程大綱，可用的只有兩句作者觀點。bs-assumptions-limitations 先建立為草稿，並引用 S1 p.12。

## [2026-11-18] ingest | S10 Derman Laughter in the Dark
- run/節點：pre-run / N0
- 狀態：ok（C0 r1 PASS）
- 新增頁：s10-derman-laughter-in-the-dark, volatility-smile-skew, why-skew-exists, volatility-surface
- 更新頁：bs-assumptions-limitations, s1-occ-characteristics-risks, s2-cboe-vix-methodology, glossary, index
- 公式卡：無
- 新術語：隱含波動率曲面, 負偏斜, 波動率微笑
- 衝突：無（來源內部有一處日期不一致，已記在來源頁）
- 備註：全自動 ingest。why-skew-exists 的成因主張全部標為 `[觀點]`。文件沒有印頁碼，引用使用 PDF 頁序。

## [2026-11-18] ingest | S11 Derman & Kani The Volatility Smile and Its Implied Tree
- run/節點：pre-run / N0
- 狀態：ok（C0 r1 PASS）
- 新增頁：s11-derman-kani-smile-implied-tree
- 更新頁：implied-volatility, volatility-smile-skew, volatility-term-structure, bs-assumptions-limitations, glossary, index
- 公式卡：無
- 新術語：偏斜, 期限結構（並更新「隱含波動率」的定義）
- 衝突：無（S10 與 S11 對「smile」一詞的涵蓋範圍略有不同，已記在來源頁，不視為衝突）
- 備註：全自動 ingest。補上 L2 需要的隱含波動率定義。p.5–20 的隱含樹建構與連續時間推導超出本次範圍，沒有寫入 wiki。

## [2026-11-18] ingest | S12 MIT 18.S096 Lecture 19 Black-Scholes Formula
- run/節點：pre-run / N0
- 狀態：ok（C0 r1 PASS）
- 新增頁：s12-mit-18s096-black-scholes, black-scholes-model, put-call-parity
- 更新頁：payoff-diagram, s11-derman-kani-smile-implied-tree, glossary, index
- 公式卡：F03, F04, F05, F06
- 新術語：Black-Scholes 公式, 買賣權平價, 無風險利率
- 衝突：無
- 備註：全自動 ingest。F03–F05 對照 PDF 第 19 頁原圖抄錄，並把 S12 的 T−t 改記為 T。F06 標為 `[推導]`，由 F03、F04 相減得到，對應 C3-1。F01、F02 的出處改為 S12 直接寫出的式子。第 23 張投影片的圖標示資料來源為 Bloomberg，沒有使用。

## [2026-11-18] ingest | S13 MIT 18.440 Lecture 36 Risk Neutral Probability and Black-Scholes
- run/節點：pre-run / N0
- 狀態：ok（C0 r1 PASS）
- 新增頁：s13-mit-18440-risk-neutral-black-scholes, iv-inversion-algorithm
- 更新頁：implied-volatility, bs-assumptions-limitations, black-scholes-model, s1-occ-characteristics-risks, s11-derman-kani-smile-implied-tree, s12-mit-18s096-black-scholes, glossary, index
- 公式卡：無新增（F03、F05 增加 S13 作為第二出處）
- 新術語：波動率（σ）
- 衝突：無（S12 與 S13 的 call 公式與 d1、d2 寫法一致）
- 備註：全自動 ingest。iv-inversion-algorithm 的演算法部分標為 `[推導]`，目前只有二分法；Newton 法需要 F07，待 S5。演算法的初始區間、容許誤差、最大迭代次數是設計參數，頁面中已標明不是來源數字。

## [2026-11-18] ingest | S4 Gatheral & Jacquier Arbitrage-free SVI volatility surfaces
- run/節點：pre-run / N0
- 狀態：ok（C0 r1 PASS）
- 新增頁：s4-gatheral-jacquier-svi, svi-parameterization, no-arbitrage-surface
- 更新頁：volatility-surface, iv-inversion-algorithm, s13-mit-18440-risk-neutral-black-scholes, glossary, index
- 公式卡：F10, F11, F12, F13, F14, F15, F16
- 新術語：蝶式套利, 日曆價差套利, Log-strike, 切片, SSVI, 靜態套利, SVI, 總隱含變異數
- 衝突：無
- 備註：全自動 ingest。公式對照 PDF 原圖抄錄。S4 沒有提供任何無套利的具體參數數值，svi-parameterization 中的示意參數是提案，標為「尚待 Itzel 核准」，核准前 N3 不得使用。no-arbitrage-surface 有一條 `[推導]`，驗算示意參數形式滿足 S4 Corollary 4.1。arXiv 授權不含再散布，原檔只留本機。

## [2026-11-18] update | 示意參數核准
- run/節點：pre-run / N0
- 狀態：ok
- 更新頁：svi-parameterization, no-arbitrage-surface, volatility-surface, index
- 衝突：無
- 備註：Itzel 核准 SSVI 示意參數：σ₀ = 0.20、ρ = −0.7、η = 1.0、γ = 0.5。核准時已告知兩點取捨：偏斜較陡（三個月期 k = −0.2／0／+0.2 約為 32%／20%／15%），以及價平期限結構為平的。

## [2026-11-18] ingest | S5 OCC/OIC Understanding Greeks
- run/節點：pre-run / N0
- 狀態：ok（C0 r1 PASS）
- 新增頁：s5-oic-understanding-greeks, vega, greeks-overview, delta, gamma, theta
- 更新頁：iv-inversion-algorithm, implied-volatility, black-scholes-model, s1-occ-characteristics-risks, s12-mit-18s096-black-scholes, glossary, index
- 公式卡：F07
- 新術語：Delta, Gamma, Greeks, 歷史波動率, Rho, Theta, Vega
- 衝突：無
- 備註：全自動 ingest。S5 沒有任何公式，F07 標為 `[推導]`，由 F03、F05、F06 推導，對應 C3-5。iv-inversion-algorithm 補上 Newton 法。greeks-overview、delta、gamma、theta 是延伸頁。S5 有與 S2 類似的使用限制聲明，比照 Itzel 對 S2 的決定處理；Itzel 沒有另外就 S5 決定。

## [2026-11-18] ingest | S6 SEC Investor Bulletin: Structured Notes
- run/節點：pre-run / N0
- 狀態：ok（C0 r1 FAIL 1 項 → r2 PASS）
- 新增頁：s6-sec-structured-notes, structured-note-architecture, eln-simplified, estimated-value-vs-issue-price, principal-protected-note, issuer-credit-risk, liquidity-risk, common-misconceptions
- 更新頁：s1-occ-characteristics-risks, s5-oic-understanding-greeks, s12-mit-18s096-black-scholes, s13-mit-18440-risk-neutral-black-scholes, glossary, index
- 公式卡：F08, F09, F17
- 新術語：提前贖回條款, 簡化 ELN, 估計價值, 觸及價, 參與率, 保本, 結構型債券
- 衝突：無
- 備註：全自動 ingest。原始檔是 SEC 公告，依 AGENTS.md §7 commit 進 git。eln-simplified 的條款依 GRAPH_SPEC §2.5；F08、F09 與新增的 F17（公平票息）都是 `[推導]`。F17 不在規格 §2.5 中，加它是因為 C3-10 要測公平票息、C3-12 要求每個函式對應公式卡。網頁沒有頁碼，出處用小標題。

## [2026-11-18] ingest | S7 SEC/FINRA Structured Notes with Principal Protection
- run/節點：pre-run / N0
- 狀態：ok（C0 r1 PASS）
- 新增頁：s7-sec-finra-principal-protection
- 更新頁：principal-protected-note, issuer-credit-risk, liquidity-risk, estimated-value-vs-issue-price, structured-note-architecture, eln-simplified, common-misconceptions, glossary, index
- 公式卡：無
- 新術語：無擔保債權人, 隱藏成本, 零息債券
- 衝突：無（S6 與 S7 的參與率範例用不同的假設數字，不是衝突）
- 備註：全自動 ingest。原始檔 commit 進 git；S7 由 FINRA（非政府機關）與 SEC 共同發布，已在來源頁與 MANIFEST 註明，Itzel 可改為只留本機。principal-protected-note、issuer-credit-risk 由草稿改為完整。

## [2026-11-18] ingest | S8 Barclays Phoenix AutoCallable Notes 424B2
- run/節點：pre-run / N0
- 狀態：ok（C0 r1 PASS）
- 新增頁：s8-barclays-phoenix-autocallable-424b2, autocallable
- 更新頁：estimated-value-vs-issue-price, eln-simplified, issuer-credit-risk, liquidity-risk, common-misconceptions, structured-note-architecture, s6-sec-structured-notes, s7-sec-finra-principal-protection, glossary, index
- 公式卡：無
- 新術語：自動提前出場, 有條件配息, 定價補充文件
- 衝突：無
- 備註：全自動 ingest。來源由 Itzel 指定為規格中的範例那一份。文件中的指數點數、代號與歷史數據註明取自 Bloomberg，依 GRAPH_SPEC §9 一律沒有抄進 wiki；只使用發行機構訂定的條款與以假設水準 100 計算的範例。estimated-value-vs-issue-price 由草稿改為完整。發行價與估計價值的差額沒有寫成數字，留給簡報並列或用 calc 計算。

## [2026-11-18] ingest | S9 財訊／Yahoo 股市 從美超微下市風波 看懂結構型商品的高息陷阱
- run/節點：pre-run / N0
- 狀態：ok（C0 r1 PASS）
- 新增頁：s9-wealth-smci-structured-products
- 更新頁：eln-simplified, common-misconceptions, structured-note-architecture, liquidity-risk, glossary, index
- 公式卡：無
- 新術語：固定配息結構型商品（FCN）, 賣出賣權
- 衝突：無
- 備註：全自動 ingest。規格沒有給網址，這篇由搜尋取得、經 Itzel 確認。文章是對財訊報導的轉述，專家與銀行人士都沒有具名；「就是賣出賣權」標為 `[觀點]`。報導中「每個月約10-15%」的配息數字看起來不尋常，wiki 沒有引用為主張，只在來源頁註明照原文、不解讀。eln-simplified、common-misconceptions 由草稿改為完整。這是來源清單的最後一份。

## [2026-11-18] lint | 來源清單 S1–S13 全部 ingest 後的第一次 lint
- run/節點：pre-run / lint
- 狀態：完成，只回報、未修正
- 更新頁：無
- 衝突：無
- 備註：報告在 `runs/pre-run/lint_report.md`。§10 的十項檢查中九項通過；第 7 項（術語未收錄）有問題。另外回報：glossary 排序有 8 處顛倒、iv-inversion-algorithm 列了 S5 但沒有引用、payoff-diagram 仍是草稿、52 條待補中有 11 條會限制簡報措辭、GRAPH_SPEC 與 AGENTS 有幾處與 wiki 現況對不上、本機 raw 中 S8 與 S12 含 Bloomberg 來源的內容、程式檢查的四個盲點、raw 原檔換行轉換的風險。

## [2026-11-18] update | 修正 lint 的整理類問題（L-01、L-02、L-03）
- run/節點：pre-run / lint
- 狀態：ok
- 更新頁：glossary, iv-inversion-algorithm, s5-oic-understanding-greeks
- 新術語：套利, 障礙價, 平倉交易, 票息, 累積分布函數, 疊券, 跳躍擴散模型, 槓桿, 局部波動率, 對數常態, 保證金, 觀察日, 到期報償, 面額, 複製投資組合, 風險中立機率, 次級市場, 隨機波動率模型, 執行價
- 衝突：無
- 備註：依 Itzel 要求。術語表重新依英文字母排序（85 列）；iv-inversion-algorithm 補上引用 S5 的主張；補上 19 個有來源定義的術語。布朗運動、漂移、避險、機率密度、複委託、bail-in 因來源沒有定義而未補。處理紀錄附在 `runs/pre-run/lint_report.md` 末尾。L-04 至 L-09 未處理。
