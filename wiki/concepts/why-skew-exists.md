# 為什麼會有偏斜（Why Skew Exists）

> 偏斜的成因沒有定論。本頁整理 Derman 的看法：1987 年股災讓市場意識到大盤可能一天暴跌，所以保護下跌的低履約價 put 變得比較貴。這些是作者觀點，不是已證明的事實。

**閱讀提醒**：本頁的 `[觀點]` 都是 Emanuel Derman 的看法。簡報引用時必須寫明「Derman 認為」。

## 重點主張

### 背景事實

- `[事實]` 微笑最早是在 1987 年股災之後出現的。（S10, p.3）
  > "The smile first appeared after the 1987 crash"
- `[事實]` 波動率與股市報酬呈負相關，這一點已有充分的文獻紀錄。（S2, p.3）
  > "The negative correlation of volatility to stock market returns is well-documented"
- `[事實]` 以股票為基礎的波動類指數，歷史上傾向和其參考指數反向變動，但這個關係不一定成立。（S1, p.26）
  > "Variability indexes based on equity securities have historically tended to move inversely to their reference indexes"

### Derman 的看法

- `[觀點]` Derman 認為，考慮到大盤單日暴跌 20% 以上的可能性比較高，低履約價的 put 顯然應該比高履約價的 call 值錢。（S10, p.4）
  > "Clearly low-strike puts should be worth more than high-strike calls when you thought about the higher probabilities associated with that kind of move."
- `[觀點]` Derman 認為，從行為的角度看，隱含波動率最高的地方，很可能就是市場變動最會造成震撼的地方；對指數來說是下跌那一側。（S10, p.4）
  > "it seems likely that implied volatilities are greatest where market movements are likely to cause the greatest shock and awe"
- `[觀點]` Derman 認為，指數向下跳空的傾向大於向上，個股則上下比較對稱，這或許是個股微笑比較對稱的原因。（S10, p.4）
  > "Though indexes tend to jump down more than they jump up, single stocks have more symmetric jumps up and down."
- `[觀點]` Derman 認為，在股價指數市場，短期內跳空以及對跳空的恐懼確實很重要。（S10, p.13）
  > "In equity index markets jumps and the fear of jumps are certainly important in the short term."
- `[觀點]` Derman 認為，對信用較差的個股，股價越低代表公司槓桿越高、波動越大、違約可能性越高。（S10, p.12）
  > "low equity levels correspond to greater firm leverage, higher volatility and the increased likelihood of default"
- `[觀點]` Derman 認為，微笑是市場成熟的象徵：選擇權市場對可能發生的衝擊越有經驗，隱含波動率的型態就越複雜。（S10, p.5）
  > "The smile is a sign of market sophistication."

### 沒有共識

- `[事實]` 微笑出現 15 年後，業界對哪個模型才正確仍然沒有共識。（S10, p.1）
  > "After 15 years, there is still no overwhelming consensus as to the correct model."

## 相關頁面

- [[volatility-smile-skew|波動率微笑與偏斜]]
- [[bs-assumptions-limitations|Black-Scholes 的假設與限制]]

## 來源

- [[s1-occ-characteristics-risks|S1]]：OCC, *Characteristics and Risks of Standardized Options*（June 2024）
- [[s2-cboe-vix-methodology|S2]]：Cboe, *Cboe Volatility Index — Methodology*（Version 6.0, 2026）
- [[s10-derman-laughter-in-the-dark|S10]]：Derman, *Laughter in the Dark — The Problem of the Volatility Smile*（2003）
