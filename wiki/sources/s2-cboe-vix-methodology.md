# S2｜Cboe 波動率指數編製方法（Cboe Volatility Index Methodology）

> Cboe 說明 VIX 指數如何編製的官方方法文件：VIX 的目標、使用哪些選擇權、四個計算步驟，以及一個完整的計算範例。

## 來源資料

| 欄位 | 內容 |
|---|---|
| 來源 ID | S2 |
| 標題 | Cboe Volatility Index — Methodology |
| 作者／機構 | Cboe Global Indices, LLC |
| 發布日期 | Version 6.0，Last Revised Date February 26, 2026（S2, p.9） |
| URL | https://cdn.cboe.com/resources/vix/VIX_Methodology.pdf |
| 取得日期 | 2026-11-18 |
| 原始檔路徑 | `raw/s2-cboe-vix-methodology.pdf`（26 頁） |
| SHA-256 | `5e0e8dd278a5e4c2e0315ff573b60a314d31946841e6fc67eac784dfba729622` |
| 是否 commit | 否，只留本機 |
| 取得狀態 | `ok`（自動下載） |

**頁碼說明**：引用時使用頁面右下角的「Page n」，Page 1–23 與 PDF 頁序相同。最後三頁（PDF 第 24–26 頁）是免責聲明，頁碼重新從 Page 1 起算，引用時寫成 `§Disclosures`。

**使用限制（Itzel 已於 2026-11-18 決定：維持現狀）**：文件末的免責聲明寫明，未經 Cboe 書面同意，不得複製、重製、散布文件內容或存入資料庫，也不得用來製作衍生作品；免責聲明頁的頁尾另印有「CONFIDENTIAL」字樣（S2, §Disclosures）。這份文件是從 Cboe 公開的網址下載的。本 wiki 目前只做摘要改寫、短引，並抄錄少量範例數字，沒有轉載表格或整段內容。Itzel 決定維持這個引用方式（改寫＋短引＋少量範例數字），不另外刪減；之後引用 S2 時也不得超出這個範圍（不轉載表格、不整段照抄）。

## 來源重點摘要

- `[事實]` VIX 指數的目標，是衡量市場對美國股市未來 30 天波動率的預期，這個預期由 S&P 500 指數選擇權的價格傳達。（S2, p.3）
  > "The Cboe Volatility Index (VIX) is designed to measure the market's expectation of 30-day forward looking volatility of the U.S. equity market, as conveyed by S&P 500 Index option prices."
- `[事實]` VIX 是由選擇權（而不是股票）組成的指數，每個選擇權的價格都反映市場對未來波動率的預期。（S2, p.4）
  > "The VIX Index is a volatility index comprised of options rather than stocks, with the price of each option reflecting the market's expectation of future volatility."
- `[事實]` VIX 把一大段履約價範圍內的 S&P 500 put 與 call 價格加權彙總，來估計預期波動率。（S2, p.3）
  > "estimates expected volatility by aggregating the weighted prices of S&P 500 Index puts and calls"
- `[事實]` 計算的輸入是 SPX 與 SPXW 選擇權的市場價格，以及美國公債殖利率曲線。（S2, p.5）
  > "The calculation takes as input the market prices of SPX options and SPXW options as well as U.S. Treasury yield curve rates."
- `[事實]` 計算分四步：選出近期與次近期兩組到期日、算利率、分別算兩組的變異數、合成 VIX。（S2, p.5–6）
  > "The VIX Index value can be obtained by following the four steps below"
- `[事實]` 詳細的數學步驟不在本文件，而在另一份《Cboe Volatility Index Mathematics Methodology》。（S2, p.3）
  > "This methodology should be read in conjunction with the following documents"

章節結構：1 導論（p.3）、2 指數組成（p.4）、3 指數計算（p.4–8）、4 計算與發布（p.8）、5 指數資訊（p.8）、附錄 1–2 變更與版本（p.9）、附錄 3 計算範例（p.9–14）、附錄 4 範例使用的完整選擇權報價（p.14–18）、附錄 5 各履約價的貢獻（p.19–23）、免責聲明（§Disclosures）。

## 由本來源支撐的 wiki 頁

- [[implied-volatility|隱含波動率]]
- [[volatility-term-structure|波動率期限結構]]
- [[glossary|術語表]]

## 可支撐其他頁的主張

### VIX 的歷史（供簡報 S07 的例子）

- `[事實]` VIX 於 1993 年推出，最初是用價平的 S&P 100 指數選擇權價格，衡量市場對 30 天波動率的預期。（S2, p.3）
  > "Originally designed to measure the market's expectation of 30-day volatility implied by at-the-money S&P 100"
- `[事實]` 2003 年 Cboe 與 Goldman Sachs 合作更新 VIX，改以 S&P 500 指數為基礎。（S2, p.3）
  > "Ten years later in 2003, Cboe collaborated with Goldman Sachs to update the VIX Index."
- `[事實]` VIX 常被稱為「恐慌指標」。（S2, p.3）
  > "the VIX Index is often referred to as the "fear gauge.""
- `[事實]` VIX 指數的第一個數值日期是 1990 年 1 月，現行指數於 2003 年 9 月 22 日推出。（S2, p.8）
  > "September 22, 2003"

### 波動率與股市報酬的關係（供 why-skew-exists、volatility-smile-skew）

- `[事實]` 波動率與股市報酬呈負相關，這一點已有充分的文獻紀錄。（S2, p.3）
  > "The negative correlation of volatility to stock market returns is well-documented"

### VIX 如何使用不同履約價的選擇權（供 volatility-smile-skew、volatility-surface）

- `[事實]` 計算時，履約價低於 $K_0$ 的用價外 put，高於 $K_0$ 的用價外 call，等於 $K_0$ 的 put 和 call 都用。（S2, p.5）
  > "call if Ki > K0 and a put if Ki< K0; both put and call if"
- `[事實]` 即時 VIX 用買賣報價的中間價計算，而且只納入買價不為零的選擇權。（S2, p.6）
  > "only options that have a non-zero bid price are included"
- `[事實]` 單一選擇權對 VIX 的貢獻，與該選擇權的價格成正比，與履約價的平方成反比。（S2, p.12）
  > "inversely proportional to the square of the option's strike price"

### 免責聲明

- `[事實]` 文件聲明其內容不應被視為投資建議。（S2, §Disclosures）
  > "Nothing herein should be construed as investment advice."

## 來源衝突紀錄

無。

## 本來源沒有的內容

- 沒有「隱含波動率」的一般定義，也沒有提到 Black-Scholes 或從單一選擇權價格反推波動率的做法。VIX 是把許多選擇權的價格彙總成一個數字，和「把一個價格代回模型反推」是不同的做法；本文件沒有比較兩者。
- p.5 有 VIX 的通用公式，但本 wiki 沒有抄錄成公式卡：簡報大綱沒有 VIX 計算工具，`lab/` 也不需要它。若日後需要，應從 p.5 與 p.13 的原圖抄錄並編為新的公式卡。
- 沒有說明「不同到期日的隱含波動率為什麼不同」，只在範例中呈現兩個到期日算出的數值不同。
