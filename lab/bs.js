/*
 * lab/bs.js — 到期價值與 Black-Scholes 定價（run v2 / N3）
 * 公式卡：F01、F02（wiki/concepts/payoff-diagram.md）
 *         F03、F04、F05（wiki/concepts/black-scholes-model.md）
 *         F07（wiki/concepts/vega.md）
 * 只實作公式卡中的式子；N(x) 以數值積分計算 F05 的定義式。
 * 瀏覽器：window.LabBS；Node：module.exports。
 */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.LabBS = factory();
}(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  // F01：call 到期價值 max(S_T − K, 0)
  function callPayoff(ST, K) {
    return Math.max(ST - K, 0);
  }

  // F02：put 到期價值 max(K − S_T, 0)
  function putPayoff(ST, K) {
    return Math.max(K - ST, 0);
  }

  // F01、F02 附註：買方到期損益 = 到期價值 − 權利金（type 為 'call' 或 'put'）
  function buyerProfit(type, ST, K, premium) {
    return (type === 'call' ? callPayoff(ST, K) : putPayoff(ST, K)) - premium;
  }

  // F01、F02 附註：賣方到期損益 = 權利金 − 到期價值
  function writerProfit(type, ST, K, premium) {
    return premium - (type === 'call' ? callPayoff(ST, K) : putPayoff(ST, K));
  }

  // F07：標準常態機率密度 n(x) = e^(−x²/2) / √(2π)
  function normPdf(x) {
    return Math.exp(-0.5 * x * x) / Math.sqrt(2 * Math.PI);
  }

  // 10 點 Gauss–Legendre 求積的節點與權重（數值積分的常數，不是公式）
  var GL_X = [0.1488743389816312, 0.4333953941292472, 0.6794095682990244, 0.8650633666889845, 0.9739065285171717];
  var GL_W = [0.2955242247147529, 0.2692667193099963, 0.2190863625159820, 0.1494513491505806, 0.0666713443086881];

  // F05：上尾機率 Q(x) = ∫_x^∞ n(u) du（x ≥ 0），即 1 − N(x)。
  // 令 u = x + t：Q(x) = n(x) ∫_0^∞ e^(−x t − t²/2) dt，被積函數平滑遞減，
  // 在 [0, L] 上分段做 Gauss–Legendre 求積；L 之外的部分小於 e^(−60)，略去。
  function upperTail(x) {
    var L = x > 5 ? 60 / x : 12, panels = 24, h = L / panels, hh = 0.5 * h, sum = 0;
    for (var p = 0; p < panels; p++) {
      var mid = (p + 0.5) * h;
      for (var i = 0; i < 5; i++) {
        var t1 = mid - hh * GL_X[i], t2 = mid + hh * GL_X[i];
        sum += GL_W[i] * (Math.exp(-x * t1 - 0.5 * t1 * t1) + Math.exp(-x * t2 - 0.5 * t2 * t2));
      }
    }
    return normPdf(x) * sum * hh;
  }

  // F05：標準常態累積分布函數 N(x)；x ≥ 0 時為 1 − Q(x)，x < 0 時為 Q(−x)
  function normCdf(x) {
    if (x !== x) return NaN;
    return x >= 0 ? 1 - upperTail(x) : upperTail(-x);
  }

  // F05：d₁、d₂（需要 σ > 0、T > 0）
  function d1d2(S, K, T, r, sigma) {
    var sq = sigma * Math.sqrt(T);
    var d1 = (Math.log(S / K) + (r + 0.5 * sigma * sigma) * T) / sq;
    var d2 = (Math.log(S / K) + (r - 0.5 * sigma * sigma) * T) / sq;
    return { d1: d1, d2: d2 };
  }

  // F03：C = S N(d₁) − K e^(−rT) N(d₂)
  function bsCall(S, K, T, r, sigma) {
    var d = d1d2(S, K, T, r, sigma);
    return S * normCdf(d.d1) - K * Math.exp(-r * T) * normCdf(d.d2);
  }

  // F04：P = K e^(−rT) N(−d₂) − S N(−d₁)
  function bsPut(S, K, T, r, sigma) {
    var d = d1d2(S, K, T, r, sigma);
    return K * Math.exp(-r * T) * normCdf(-d.d2) - S * normCdf(-d.d1);
  }

  // F07：Vega = S n(d₁) √T（σ 以小數表示、每變動 1 的價值變動）
  function vega(S, K, T, r, sigma) {
    return S * normPdf(d1d2(S, K, T, r, sigma).d1) * Math.sqrt(T);
  }

  // F07 單位說明：每 1 個百分點的 vega = S n(d₁) √T / 100
  function vegaPerPoint(S, K, T, r, sigma) {
    return vega(S, K, T, r, sigma) / 100;
  }

  return {
    callPayoff: callPayoff, putPayoff: putPayoff, buyerProfit: buyerProfit, writerProfit: writerProfit,
    normPdf: normPdf, normCdf: normCdf, d1d2: d1d2,
    bsCall: bsCall, bsPut: bsPut, vega: vega, vegaPerPoint: vegaPerPoint
  };
}));
