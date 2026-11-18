# tools/ — Wiki 檢查腳本

這些腳本用來檢查 `wiki/`，都在專案根目錄執行。它們只讀取 `wiki/` 與 `raw/`，不修改任何 wiki 檔案。

| 腳本 | 做什麼 | 對應規則 |
|---|---|---|
| `check_quotes.py` | 每條主張有沒有出處與短引；短引是否逐字出現在來源中、頁碼對不對；連結是否有效 | GRAPH_SPEC C0-3、C0-4、C0-5；AGENTS §10 第 1–3 項 |
| `lint.py` | 孤立頁、index 一致性、公式卡編號、術語表、來源頁欄位、禁止內容等 | AGENTS §10 第 4–10 項 |
| `precheck_formulas.py` | 照 wiki 的公式卡用 Python 計算，檢查抄錄與推導有沒有錯 | 不對應任何檢查節點；**不是 C3** |
| `html2txt.py` | 把 HTML 轉成純文字（由 `check_quotes.py` 呼叫） | — |

## 執行

```
python tools/check_quotes.py
python tools/lint.py
python tools/precheck_formulas.py
```

在 Windows 上若 `python` 指向 Microsoft Store 的空殼，改用 `py`。

## 需要的環境

- Python 3.9 以上，只用標準函式庫。
- `check_quotes.py` 需要 poppler 的 `pdftotext`，用來把 `raw/` 的 PDF 轉成文字。
- `check_quotes.py` 需要 `raw/` 中有原始檔。多數原檔依 `AGENTS.md` §7 只留本機、不在 git 裡；
  在另一台電腦上要先依 `raw/MANIFEST.md` 的網址重新下載，並核對 SHA-256。
  缺少原檔的來源會被略過，並在輸出最後列出。

## 輸出與結束代碼

- `check_quotes.py`：逐行列出問題，最後一行是統計。有問題時結束代碼為 1。
- `lint.py`：分段列出各項檢查結果。它只回報，不判定通過與否，結束代碼一律為 0。
  依 `AGENTS.md` §10，把結果整理成 `runs/<run-id>/lint_report.md`，並在 `wiki/log.md` 記一筆 `lint`。
- `precheck_formulas.py`：每項一行「通過／不通過」。有不通過時結束代碼為 1。

`check_quotes.py` 會把來源文字快取在 `.cache/source-text/`（已列入 `.gitignore`）。原檔更新後會自動重新轉換。

## 檢查不到的部分

這些腳本通過，不代表 wiki 沒有問題。已知的盲點（詳見 `runs/pre-run/lint_report.md` L-08）：

1. 沒有短引的 `[範例]`、`[推導]` 與術語表條目，頁碼無法核對。
2. 出處寫成 `§小標題`、`p.PS-n`、`§cover`、`§Summary` 時，只確認短引出現在來源中，不核對位置。
3. `[範例]` 的數字是否抄對。
4. 中文短引的 50 字上限。
5. 中文改寫是否忠於原意。
6. `lint.py` 的術語檢查是拿一份候選清單比對，不是完整的斷詞分析。

## 維護時要注意

- `check_quotes.py` 的 `PAGE_OFFSET`：來源的印刷頁碼與 PDF 頁序不同時要在這裡登記（目前 S1、S11）。
- `lint.py` 的 `EXPECTED`：是 `GRAPH_SPEC.md` §2.4 的頁面清單，§2.4 有變動時要同步更新。
- `precheck_formulas.py` 每個函式上方的註解標出對應的公式卡 ID；公式卡修改時要同步更新，
  示意參數（`precheck_svi` 中）要與 `wiki/concepts/svi-parameterization.md` 一致。
- 腳本開頭不要加 `#!/usr/bin/env python3`。Windows 的 `py` 啟動器會依這一行去找 `python3`，
  找到 Microsoft Store 的空殼後直接以代碼 49 結束、沒有任何輸出。

## `precheck_formulas.py` 與 C3 的關係

`GRAPH_SPEC.md` 的 C3 測的是 N3 產出的 `lab/*.js`。這支腳本是另一份獨立的 Python 實作，
只在 ingest 之後、N3 之前用來確認公式卡本身沒有錯。它不能取代 C3，C3 也不應該引用它的結果。

它目前揭露了兩件 C3 需要留意的事：

- **vega（對應 C3-5）**：解析解對數值微分（h = 1e-4）的最大相對誤差約 5.6e-4，已接近門檻 1e-3。
  vega 很小的參數下，數值微分本身的誤差可能超標。
- **對 σ 的單調性（對應 C3-3）**：2000 組隨機參數中有 23 組，σ 增加 0.01 後 call 價格沒有嚴格上升
  （相等，或低 2e-15 左右）。原因是深度價內／價外時 vega 趨近 0，加上 F03 兩項相減的捨入誤差。
  C3-3 若要求嚴格遞增且「全部成立」，需要容許數值誤差，或限制測試參數的範圍。
