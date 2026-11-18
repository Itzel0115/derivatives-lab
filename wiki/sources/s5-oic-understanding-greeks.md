# S5｜認識 Greeks（Making More Informed Decisions: Understanding Greeks）

> OCC 投資人教育部門（OIC）與 Fidelity 合辦講座的教學投影片。用白話定義五個 Greeks，並說明歷史波動率與隱含波動率的差別。沒有任何數學公式。

## 來源資料

| 欄位 | 內容 |
|---|---|
| 來源 ID | S5 |
| 標題 | Making More Informed Decisions: Understanding Greeks |
| 作者／機構 | Edward J Modla（OCC 投資人教育執行董事）、Konstantin Vrandopulo（Fidelity Investments）；The Options Clearing Corporation／The Options Industry Council |
| 發布日期 | 2023（投影片版權年份；PDF 建立於 2023-02） |
| URL | https://fidelity.com/bin-public/060_www_fidelity_com/documents/learning-center/understanding-greeks-OIC-slides.pdf |
| 取得日期 | 2026-11-18 |
| 原始檔路徑 | `raw/s5-oic-understanding-greeks.pdf`（21 頁） |
| SHA-256 | `fc532b5e5cb5f2533cfbdf68de92afdef6b154764d69f0c9bb34757a83491cba` |
| 是否 commit | 否，只留本機 |
| 取得狀態 | `ok`（自動下載） |

**頁碼說明**：投影片沒有印頁碼，引用時使用 PDF 頁序（p.1–21）。

**使用限制**：第 2 頁的聲明寫明內容為 OCC 所有或授權，未經 OCC 書面同意禁止未授權使用；部分頁尾標有「Business Sensitive」（S5, p.2）。這和 S2 的情況相同。本頁比照 Itzel 2026-11-18 對 S2 的決定處理：只做中文改寫與短引，不轉載整頁內容或圖片。這是比照辦理，Itzel 沒有另外就 S5 做過決定，可以推翻。

## 來源重點摘要

- `[事實]` 五個 Greeks 各自衡量選擇權價值對一個因素的預期變動：Delta 對標的股價、Gamma 是 Delta 對標的股價、Theta 對時間經過、Vega 對隱含波動率、Rho 對無風險利率。（S5, p.6）
  > "Expected change in option value with changing implied volatility"
- `[事實]` Greeks 是理論上的衡量值，不是保證；市場價格不一定照它們所示變動。（S5, p.7）
  > "Greeks are theoretical measurements"
- `[事實]` 每個 Greek 只隔離出單一定價因素的風險，並假設其他因素不變。（S5, p.7）
  > "Each Greek isolates risk from a single pricing factor"
- `[事實]` 歷史波動率是股票過去的波動率，是統計事實而不是預測；隱含波動率是能解釋選擇權價格的波動率水準，反映市場預期。（S5, p.15；p.16）
  > "Volatility level that justifies an options price"
- `[事實]` 投影片聲明其中的策略與範例只供說明與教育用途，不應視為買賣證券的推薦。（S5, p.2）
  > "strictly for illustrative and educational purposes"

## 由本來源支撐的 wiki 頁

- [[vega|Vega]]
- [[greeks-overview|Greeks 總覽]]
- [[delta|Delta]]
- [[gamma|Gamma]]
- [[theta|Theta]]
- [[implied-volatility|隱含波動率]]
- [[glossary|術語表]]

## 來源衝突紀錄

無。

## 本來源沒有的內容

- 沒有任何 Greek 的數學公式。本 wiki 的 F07（vega 公式）是由 F03、F05 推導而來，不是引自 S5。
- 沒有數值範例。大綱頁提到 Vega 有「Example」，但投影片中沒有對應的範例頁。
- 沒有 Rho 的專門說明，只在總覽頁有一行定義。
