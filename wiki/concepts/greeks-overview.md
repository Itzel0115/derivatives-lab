# Greeks 總覽（Greeks Overview）

> Greeks 是一組敏感度指標，各自回答一個問題：某一個因素變動一點，選擇權的價值預期會變多少。

**範圍**：延伸頁，供期末擴充。本次簡報只使用 [[vega|Vega]]。

## 重點主張

- `[事實]` Delta：標的股價變動時，選擇權價值的預期變動。（S5, p.6）
  > "Expected change in option value with changing underlying stock price"
- `[事實]` Gamma：標的股價變動時，選擇權 delta 的預期變動。（S5, p.6）
  > "Expected change in option delta with changing underlying stock price"
- `[事實]` Theta：時間經過時，選擇權價值的預期變動（時間耗損）。（S5, p.6）
  > "Expected change in option value with passage of time (time decay)"
- `[事實]` Vega：隱含波動率變動時，選擇權價值的預期變動。（S5, p.6）
  > "Expected change in option value with changing implied volatility"
- `[事實]` Rho：無風險利率變動時，選擇權價值的預期變動。（S5, p.6）
  > "Expected change in option value with changing risk free interest rate"
- `[事實]` Greeks 是理論上的衡量值，和理論價格一樣不是保證。（S5, p.7）
  > "Greeks are theoretical measurements"
- `[事實]` 每個 Greek 只隔離出單一定價因素的風險，並假設其他因素不變。（S5, p.7）
  > "Each Greek isolates risk from a single pricing factor"

## 相關頁面

- [[vega|Vega]]
- [[delta|Delta]]
- [[gamma|Gamma]]
- [[theta|Theta]]
- [[black-scholes-model|Black-Scholes 模型]]

## 來源

- [[s5-oic-understanding-greeks|S5]]：OCC／OIC, *Making More Informed Decisions: Understanding Greeks*（2023）

## 待補

- S5 沒有 Rho 的專門說明；§2.4 也沒有 Rho 的頁面。
