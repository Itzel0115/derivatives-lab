/*
 * lab/bs.js — 到期價值與 Black-Scholes 定價
 * run v1 / N3 產出。每個函式上方註解標出對應的公式卡 ID（GRAPH_SPEC §2.2、C3-12）。
 * 公式卡所在頁：
 *   F01、F02 → wiki/concepts/payoff-diagram.md
 *   F03、F04、F05 → wiki/concepts/black-scholes-model.md
 *   F07 → wiki/concepts/vega.md
 * 符號：S 標的現價、K 履約價、T 距離到期的時間（年）、r 無風險利率（連續複利）、sigma 波動率（年化、小數）。
 * 可在瀏覽器（掛到全域 DLab）與 Node（module.exports）使用。
 */
(function (root, factory) {
  var api = factory();
  if (typeof module === 'object' && module.exports) { module.exports = api; }
  root.DLab = root.DLab || {};
  for (var k in api) { root.DLab[k] = api[k]; }
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  var INV_SQRT_2PI = 1 / Math.sqrt(2 * Math.PI);

  // F07（符號定義）：n(x) = (1/√(2π)) e^(−x²/2)，標準常態機率密度
  function normPdf(x) {
    return INV_SQRT_2PI * Math.exp(-x * x / 2);
  }

  // F05：N(x) = (1/√(2π)) ∫_{−∞}^{x} e^(−u²/2) du
  // 實作方式：N(x) = 1/2 ± (1/√(2π)) ∫_0^{|x|} e^(−u²/2) du，對 F05 的被積函數做複合 Simpson 數值積分
  // （步長 ≤ 0.002，Kahan 補償加總）。這是直接計算 F05 的積分，沒有使用其他近似公式。
  // |x| > 12 時尾端機率小於 1e-32，直接回傳 0 或 1。
  function normCdf(x) {
    if (x !== x) return NaN;
    if (x === 0) return 0.5;
    var a = Math.abs(x);
    if (a > 12) return x > 0 ? 1 : 0;
    var n = 2 * Math.ceil(a / 0.004); // 偶數個區間，步長 h = a/n ≤ 0.002
    var h = a / n;
    var sum = 0, c = 0;
    for (var i = 0; i <= n; i++) {
      var w = (i === 0 || i === n) ? 1 : (i % 2 === 1 ? 4 : 2);
      var u = i * h;
      var term = w * Math.exp(-u * u / 2) - c; // Kahan 補償加總
      var t = sum + term;
      c = (t - sum) - term;
      sum = t;
    }
    var half = INV_SQRT_2PI * sum * h / 3;
    return x > 0 ? 0.5 + half : 0.5 - half;
  }

  // F05：d1 = [ln(S/K) + (r + σ²/2)T] / (σ√T)，d2 = [ln(S/K) + (r − σ²/2)T] / (σ√T)
  // 適用假設：σ > 0 且 T > 0（F05）
  function d1d2(S, K, T, r, sigma) {
    var sq = sigma * Math.sqrt(T);
    var lnSK = Math.log(S / K);
    return {
      d1: (lnSK + (r + sigma * sigma / 2) * T) / sq,
      d2: (lnSK + (r - sigma * sigma / 2) * T) / sq
    };
  }

  // F01：Payoff_call = max(S_T − K, 0)
  function callPayoff(ST, K) {
    return Math.max(ST - K, 0);
  }

  // F02：Payoff_put = max(K − S_T, 0)
  function putPayoff(ST, K) {
    return Math.max(K - ST, 0);
  }

  // F01 附註：買方到期損益 = max(S_T − K, 0) − 權利金
  function callBuyerPnL(ST, K, premium) {
    return callPayoff(ST, K) - premium;
  }

  // F02 附註：買方到期損益 = max(K − S_T, 0) − 權利金
  function putBuyerPnL(ST, K, premium) {
    return putPayoff(ST, K) - premium;
  }

  // F03：C = S N(d1) − K e^(−rT) N(d2)
  function bsCall(S, K, T, r, sigma) {
    var d = d1d2(S, K, T, r, sigma);
    return S * normCdf(d.d1) - K * Math.exp(-r * T) * normCdf(d.d2);
  }

  // F04：P = K e^(−rT) N(−d2) − S N(−d1)
  function bsPut(S, K, T, r, sigma) {
    var d = d1d2(S, K, T, r, sigma);
    return K * Math.exp(-r * T) * normCdf(-d.d2) - S * normCdf(-d.d1);
  }

  // F07：Vega = ∂C/∂σ = ∂P/∂σ = S n(d1) √T（σ 以小數表示時，每變動 1 的價值變動）
  function vega(S, K, T, r, sigma) {
    var d = d1d2(S, K, T, r, sigma);
    return S * normPdf(d.d1) * Math.sqrt(T);
  }

  // F07（單位）：Vega_1% = S n(d1) √T / 100（S5 的定義：隱含波動率每變動 1 個百分點）
  function vegaPct(S, K, T, r, sigma) {
    return vega(S, K, T, r, sigma) / 100;
  }

  return {
    normPdf: normPdf,
    normCdf: normCdf,
    d1d2: d1d2,
    callPayoff: callPayoff,
    putPayoff: putPayoff,
    callBuyerPnL: callBuyerPnL,
    putBuyerPnL: putBuyerPnL,
    bsCall: bsCall,
    bsPut: bsPut,
    vega: vega,
    vegaPct: vegaPct
  };
});
