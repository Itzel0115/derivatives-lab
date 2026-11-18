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
