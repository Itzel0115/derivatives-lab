/*
 * lab/eln.js — 簡化 ELN（run v2 / N3）
 * 公式卡：F08、F09、F17（wiki/products/eln-simplified.md）；F04（put 價格，由 bs.js 提供）
 * 教學用簡化結構，忽略發行機構信用風險、費用與股利；不構成投資建議。
 * 瀏覽器：window.LabELN（需要先載入 bs.js）；Node：module.exports。
 */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory(require('./bs.js'));
  else root.LabELN = factory(root.LabBS);
}(typeof self !== 'undefined' ? self : this, function (bs) {
  'use strict';

  // F08：到期報償 (N + C) − (N/K) max(K − S_T, 0)
  function elnPayoff(ST, N, C, K) {
    return (N + C) - (N / K) * Math.max(K - ST, 0);
  }

  // F09：理論價值 V = (N + C) e^(−rT) − (N/K) P_BS(K, T, σ)；P_BS 用 F04
  function elnValue(S, K, T, r, sigma, N, C) {
    return (N + C) * Math.exp(-r * T) - (N / K) * bs.bsPut(S, K, T, r, sigma);
  }

  // F17：公平票息 C* = N(e^(rT) − 1) + (N/K) P_BS(K, T, σ) e^(rT)；P_BS 用 F04
  function elnFairCoupon(S, K, T, r, sigma, N) {
    var g = Math.exp(r * T);
    return N * (g - 1) + (N / K) * bs.bsPut(S, K, T, r, sigma) * g;
  }

  // F17：公平票息拆成兩部分：本金的利息 N(e^(rT) − 1)，與賣出 put 的權利金滾到到期 (N/K) P_BS e^(rT)
  function elnFairCouponParts(S, K, T, r, sigma, N) {
    var g = Math.exp(r * T);
    return { interest: N * (g - 1), putPremium: (N / K) * bs.bsPut(S, K, T, r, sigma) * g };
  }

  return { elnPayoff: elnPayoff, elnValue: elnValue, elnFairCoupon: elnFairCoupon, elnFairCouponParts: elnFairCouponParts };
}));
