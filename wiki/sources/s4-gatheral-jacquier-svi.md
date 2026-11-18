# S4｜無套利的 SVI 波動率曲面（Arbitrage-free SVI Volatility Surfaces）

> Gatheral 與 Jacquier 的論文。說明業界常用的 SVI 參數化如何描述隱含波動率微笑、什麼條件下曲面沒有靜態套利，並提出一類保證無套利、有封閉形式的曲面（SSVI）。

## 來源資料

| 欄位 | 內容 |
|---|---|
| 來源 ID | S4 |
| 標題 | Arbitrage-free SVI volatility surfaces |
| 作者／機構 | Jim Gatheral（Baruch College, CUNY）、Antoine Jacquier（Imperial College London） |
| 發布日期 | arXiv:1204.0646v4，21 Mar 2013（v1 於 2012-04-03 提交） |
| URL | https://arxiv.org/pdf/1204.0646 |
| 取得日期 | 2026-11-18 |
| 原始檔路徑 | `raw/s4-gatheral-jacquier-svi.pdf`（27 頁） |
| SHA-256 | `d4f938b8b988dbd594160a791df5ef5dd9a1740287f26f6f8034258e3c21c7cc` |
| 是否 commit | 否，只留本機 |
| 取得狀態 | `ok`（自動下載） |

**頁碼說明**：引用時使用頁面底部印的頁碼，與 PDF 頁序相同（第 1 頁沒有印頁碼）。

**授權確認**：arXiv 摘要頁標示的授權是 arXiv.org perpetual, non-exclusive license（nonexclusive-distrib/1.0）。這個授權只允許 arXiv 散布，不授權第三方再散布，所以原檔依 `AGENTS.md` §7 只留本機。

**使用注意**：
- PDF 首頁印的日期「November 27, 2024」是 arXiv 重新編譯 PDF 的日期，不是論文版本日期；版本日期以首頁邊欄的「21 Mar 2013」為準。
- 公式是對照 PDF 第 2–5、10–12、14、16–17 頁的原圖抄錄的；轉出的文字檔中希臘字母與數學符號遺失，不能直接使用。
- 論文中的 $\sigma$ 有兩種意思：在 raw SVI 中是一個形狀參數（F11），在其他地方是波動率。本 wiki 在公式卡中分別註明。

## 來源重點摘要

- `[事實]` SVI（stochastic volatility inspired）參數化最早於 1999 年在 Merrill Lynch 提出。（S4, p.1）
  > "The stochastic volatility inspired or SVI parameterization of the implied volatility smile was originally devised at Merrill Lynch in 1999"
- `[事實]` SVI 微笑有可能含有套利。（S4, p.1）
  > "However it is well-known that SVI smiles may be arbitrageable."
- `[事實]` 沒有靜態套利的曲面要同時滿足兩個條件：沒有日曆價差套利，而且每個到期日的切片都沒有蝶式套利。（S4, p.3）
  > "A volatility surface is free of static arbitrage if and only if the following conditions are satisfied"
- `[事實]` 對原始的 raw SVI 形式，很難（看起來不可能）找到能排除套利的精確參數條件。（S4, p.5）
  > "to find precise conditions on the parameters to prevent arbitrage"
- `[事實]` 論文提出一類稱為 SSVI 的曲面，並給出保證它沒有靜態套利的條件。（S4, p.10；p.16）
  > "We now introduce a class of SVI volatility surfaces"
- `[範例]` 校準範例使用 2011 年 9 月 15 日下午 3 點的 SPX 選擇權報價，共 14 個到期日；除了第一個到期日（隔天早上開盤到期）以外，擬合品質幾乎完美。（S4, p.23）

章節結構：1 導論（p.1–2）、2 靜態套利的刻畫（p.3–5）、3 SVI 的三種形式（p.5–10）、4 SSVI（p.10–19）、5 數值與校準方法（p.19–23）、6 結論（p.24）、參考文獻（p.25–27）。

## 由本來源支撐的 wiki 頁

- [[svi-parameterization|SVI 參數化]]
- [[no-arbitrage-surface|無套利曲面]]
- [[volatility-surface|波動率曲面]]
- [[iv-inversion-algorithm|隱含波動率的反推演算法]]（引用 p.4）
- [[glossary|術語表]]

## 可支撐其他頁的主張

### 延伸內容（本次簡報不使用）

- `[事實]` SVI 另有 natural 與 SVI-Jump-Wings 兩種等價的參數形式；後者的參數對交易員比較直觀。（S4, p.6–7）
  > "Neither the raw SVI nor the natural SVI parameterizations are intuitive to traders"
- `[事實]` 論文給出把 SVI 校準到市場隱含波動率的步驟，以及在到期日之間做無套利內插與外插的方法。（S4, p.21–23）
  > "An example SVI calibration recipe"

## 來源衝突紀錄

無。

## 本來源沒有的內容

- 沒有任何一組「保證無套利」的具體參數數值。唯一寫出數值的參數組是 Example 3.1（p.10），而它是用來示範「有蝶式套利」的反例。
- 圖 3、圖 4 的校準結果只有圖，沒有參數表。
- 沒有說明微笑或偏斜的經濟成因。
