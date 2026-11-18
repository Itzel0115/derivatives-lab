/*
 * lab/iv.js — 隱含波動率反推（二分法、Newton 法）
 * run v1 / N3 產出。演算法與設計參數依 wiki/concepts/iv-inversion-algorithm.md（`[推導]`）。
 * 要解的方程式：C_BS(S, K, T, r, σ) = C_mkt，C_BS 為 F03。Newton 法另用 F07。
 * 需要先載入 lab/bs.js。
 */
(function (root, factory) {
  var bs = (typeof module === 'object' && module.exports) ? require('./bs.js') : root.DLab;
  var api = factory(bs);
  if (typeof module === 'object' && module.exports) { module.exports = api; }
  root.DLab = root.DLab || {};
  for (var k in api) { root.DLab[k] = api[k]; }
})(typeof globalThis !== 'undefined' ? globalThis : this, function (bs) {
  'use strict';

  // 設計參數（不是來源數字；見 iv-inversion-algorithm 第 3、4 節）
  var DESIGN = {
    sigmaLow: 0.0001,  // 初始區間下端
    sigmaHigh: 5,      // 初始區間上端
    tol: 1e-8,         // 容許誤差
    maxIter: 100,      // 最大迭代次數
    newtonStart: 0.2,  // Newton 初始值
    vegaFloor: 1e-8    // Vega 下限，低於此值改用二分法
  };

  // F03 推導的上下界（iv-inversion-algorithm 第 1 節）：max(S − Ke^(−rT), 0) < C_mkt < S
  function callPriceBounds(S, K, T, r) {
    return { lower: Math.max(S - K * Math.exp(-r * T), 0), upper: S };
  }

  // F03：以二分法解 C_BS(σ) = C_mkt（iv-inversion-algorithm 第 2 節）
  // 回傳 { sigma, iterations, method } ；無解時 sigma 為 NaN，並附 reason。
  function impliedVolBisection(cMkt, S, K, T, r) {
    var b = callPriceBounds(S, K, T, r);
    if (!(cMkt > b.lower && cMkt < b.upper)) {
      return { sigma: NaN, iterations: 0, method: 'bisection', reason: 'price-out-of-bounds' };
    }
    var lo = DESIGN.sigmaLow, hi = DESIGN.sigmaHigh;
    if (!(bs.bsCall(S, K, T, r, lo) < cMkt && cMkt < bs.bsCall(S, K, T, r, hi))) {
      return { sigma: NaN, iterations: 0, method: 'bisection', reason: 'not-bracketed' };
    }
    var it = 0;
    while (hi - lo >= DESIGN.tol && it < DESIGN.maxIter) {
      var mid = (lo + hi) / 2;
      if (bs.bsCall(S, K, T, r, mid) > cMkt) { hi = mid; } else { lo = mid; }
      it++;
    }
    return { sigma: (lo + hi) / 2, iterations: it, method: 'bisection' };
  }

  // F03、F07：Newton 法 σ_{n+1} = σ_n − (C_BS(σ_n) − C_mkt) / Vega(σ_n)（iv-inversion-algorithm 第 4 節）
  // 保護措施：Vega 太小或 σ 跑出初始區間 → 改用二分法。
  function impliedVolNewton(cMkt, S, K, T, r) {
    var b = callPriceBounds(S, K, T, r);
    if (!(cMkt > b.lower && cMkt < b.upper)) {
      return { sigma: NaN, iterations: 0, method: 'newton', reason: 'price-out-of-bounds' };
    }
    var s = DESIGN.newtonStart;
    for (var it = 1; it <= DESIGN.maxIter; it++) {
      var v = bs.vega(S, K, T, r, s);
      if (!(v >= DESIGN.vegaFloor)) { return fallback(it); }
      var next = s - (bs.bsCall(S, K, T, r, s) - cMkt) / v;
      if (!(next >= DESIGN.sigmaLow && next <= DESIGN.sigmaHigh)) { return fallback(it); }
      if (Math.abs(next - s) < DESIGN.tol) {
        return { sigma: next, iterations: it, method: 'newton' };
      }
      s = next;
    }
    return fallback(DESIGN.maxIter);

    // F03：保護措施，改用二分法解 C_BS(σ) = C_mkt（iv-inversion-algorithm 第 4 節第 5 步）
    function fallback(used) {
      var res = impliedVolBisection(cMkt, S, K, T, r);
      res.method = 'newton→bisection';
      res.newtonIterations = used;
      return res;
    }
  }

  return {
    IV_DESIGN: DESIGN,
    callPriceBounds: callPriceBounds,
    impliedVolBisection: impliedVolBisection,
    impliedVolNewton: impliedVolNewton
  };
});
