/*
 * lab/eln.js — 簡化 ELN（教學用簡化結構，忽略發行機構信用風險、費用與股利；不構成投資建議）
 * run v1 / N3 產出。條款依 GRAPH_SPEC §2.5；公式卡 F08、F09、F17 → wiki/products/eln-simplified.md
 * 符號：N 面額、C 票息（金額）、K 履約價、ST 到期股價、S 標的現價、T 期間（年）、r 無風險利率、sigma 波動率。
 * 需要先載入 lab/bs.js（F04）。
 */
(function (root, factory) {
  var bs = (typeof module === 'object' && module.exports) ? require('./bs.js') : root.DLab;
  var api = factory(bs);
  if (typeof module === 'object' && module.exports) { module.exports = api; }
  root.DLab = root.DLab || {};
  for (var k in api) { root.DLab[k] = api[k]; }
})(typeof globalThis !== 'undefined' ? globalThis : this, function (bs) {
  'use strict';

  // F08：Payoff = (N + C) − (N/K) max(K − S_T, 0)
  function elnPayoff(ST, N, C, K) {
    return (N + C) - (N / K) * Math.max(K - ST, 0);
  }

  // F09：V = (N + C) e^(−rT) − (N/K) P_BS(K, T, σ)，P_BS 為 F04
  function elnValue(S, K, T, r, sigma, N, C) {
    return (N + C) * Math.exp(-r * T) - (N / K) * bs.bsPut(S, K, T, r, sigma);
  }

  // F17：C* = N(e^(rT) − 1) + (N/K) P_BS(K, T, σ) e^(rT)
  function elnFairCoupon(S, K, T, r, sigma, N) {
    return N * (Math.exp(r * T) - 1) + (N / K) * bs.bsPut(S, K, T, r, sigma) * Math.exp(r * T);
  }

  // F17 的兩個組成（eln-simplified「推導 / F17」）：本金利息 N(e^(rT) − 1)、賣出 put 權利金滾到到期 (N/K) P_BS e^(rT)
  function elnFairCouponParts(S, K, T, r, sigma, N) {
    var interest = N * (Math.exp(r * T) - 1);
    var premium = (N / K) * bs.bsPut(S, K, T, r, sigma) * Math.exp(r * T);
    return { interest: interest, putPremium: premium, total: interest + premium };
  }

  return {
    elnPayoff: elnPayoff,
    elnValue: elnValue,
    elnFairCoupon: elnFairCoupon,
    elnFairCouponParts: elnFairCouponParts
  };
});
