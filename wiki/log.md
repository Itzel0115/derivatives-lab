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
