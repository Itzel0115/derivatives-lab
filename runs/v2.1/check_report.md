# check_report｜run v2.1

- 規格：`GRAPH_SPEC.md` 版本紀錄 v2.1（commit `e58e1e5`）；`style.md` v2（commit `bc4985b`）。分支 `style-v2`。
- 做法（§8「v2.1 的做法」）：只換呈現。輸入沿用 run v2 的成品：wiki、`slides/outline.md`、`slides/slides.md`（C4 第 2 輪通過，`79432b9`）、`lab/*.js`（C3 通過，`704bf04`）都沒有修改。依 `style.md` v2 只重跑 N5 → C5 → N6 → C6。**v2.1 不列入 v0／v1／v2 的錯誤統計比較**（`runs/v2/comparison.md`）。
- 成品：`slides/index.html`、`slides/assets/deck.css`、`deck.js`、`surface3d.js`（N5，commit `89ccf56`）；`trace.md`（N6，commit `e608776`）
- 日期：2026-11-20
- **狀態：PASS**（§6：所有檢查都通過）

---

## 1. 節點總表

| 節點 | 輪數 | 每輪問題數 | 結果 | 跳轉 |
|---|---|---|---|---|
| 規格與選樣（graph 之外） | — | — | `style.md` v2 經 Itzel 核准（三輪選樣，見 `docs/agents-md-decisions.md` §11） | → N5 |
| N1–N4、C1–C4、H1 | 0（沿用 v2） | — | 沿用 `runs/v2/` 的報告 | — |
| N5 HTML → C5 | 1 | 0 | PASS | → N6 |
| N6 Trace → C6 | 1 | 0 | PASS | → 完成 |

**總修正輪數：0**。BUDGET 上限 12，未觸發；沒有任何 loop 達到 MAX-ROUNDS；沒有 STOP-REGRESSION、STOP-DATA、STOP-SCOPE。

## 2. 錯誤統計（§7.2）

| 錯誤類別 | v2.1 |
|---|---|
| E1–E10 | 0 |
| 無對應 E 類別 | 0 |

C5 第 1 輪沒有抓到問題，原因有兩個：
1. N5 只換外觀，輸入的文字與數值都已在 v2 通過 C4、C3。
2. N5 撰寫期間先用同一支 C5 腳本自我檢查過（記在 `C5_report.md`「程序紀錄」）。

所以「0」只代表這一輪成品沒有殘留問題，不能拿來和 v1、v2 的過程數字比較。

## 3. 這次改版在 graph 上的意義（反思用）

- **問題出在 graph 之外的前置步驟。** `style.md` v1 只用一張 S03 範例頁核准；19 頁的整體節奏和封面效果，要到整份簡報做完才看得到。
- **檢查往前移：** v2.1 在改 `style.md` 之前先做多頁型樣本，經三輪核准：
  1. A／B／C 三個方向，每個都含封面、卡片、宣言、工具四種頁型。
  2. A 的藍金三變體。
  3. 定稿 v3（只有粗體標題用宋體）。

  這和 v2 把術語檢查移到 C2、字數檢查移到 C4 是同一個做法：在修改成本最低的地方先看到問題。
- **graph 的結構讓這次改版很便宜。** 內容（wiki → 大綱 → slides.md，由 C2、C4 把關）與呈現（style.md → N5，由 C5 把關）是分開的，所以只換外觀時只需要重跑 N5 之後的四個節點，C2–C4 的結果全部保留。
- Itzel 決定不在 graph 加「H0 視覺核准」節點，只在 `GRAPH_SPEC.md` 版本紀錄說明改版起因（`docs/agents-md-decisions.md` §11.3）。

## 4. 各節點報告

- `C5_report.md`：C5-1～C5-7 與 `style.md` v2 的檢查；工具比對；程序紀錄。
- `C6_report.md`：完整性。
- `c5_capture.mjs`、`c5_results.json`、`screenshots/`（44 張）、`n5_build.py`、`n6_trace.py`。
