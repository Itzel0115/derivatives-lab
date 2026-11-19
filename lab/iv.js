/*
 * lab/iv.js — 由 call 市價反推隱含波動率（run v2 / N3）
 * 依 wiki/concepts/iv-inversion-algorithm.md 的推導步驟（第 1–4 節）。
 * 公式卡：F03、F05（價格與上下界）、F07（Newton 法的斜率）。
 * 設計參數（不是來源數字）照抄該頁第 3、4 節的表：
 *   初始區間 [0.0001, 5]、容許誤差 1e-8、最大迭代 100；Newton 初始值 0.2、vega 下限 1e-8。
 * 瀏覽器：window.LabIV（需要先載入 bs.js）；Node：module.exports。
 */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory(require('./bs.js'));
  else root.LabIV = factory(root.LabBS);
}(typeof self !== 'undefined' ? self : this, function (bs) {
  'use strict';

  var SIGMA_L = 0.0001, SIGMA_H = 5, TOL = 1e-8, MAX_ITER = 100;
  var NEWTON_START = 0.2, VEGA_MIN = 1e-8;

  // F03、F05：call 價格的上下界 max(S − Ke^(−rT), 0) 與 S（推導第 1 節）
  function callBounds(S, K, T, r) {
    return { lower: Math.max(S - K * Math.exp(-r * T), 0), upper: S };
  }

  // F03：二分法（推導第 2 節）。回傳 { sigma, method, ok, iterations, reason }
  function impliedVolBisection(price, S, K, T, r) {
    var b = callBounds(S, K, T, r);
    if (!(price > b.lower && price < b.upper)) {
      return { sigma: NaN, method: 'bisection', ok: false, iterations: 0, reason: '市價不在上下界之間，無解' };
    }
    var lo = SIGMA_L, hi = SIGMA_H;
    if (!(bs.bsCall(S, K, T, r, lo) < price && price < bs.bsCall(S, K, T, r, hi))) {
      return { sigma: NaN, method: 'bisection', ok: false, iterations: 0, reason: '初始區間沒有夾住市價，無解' };
    }
    var it = 0;
    while (hi - lo >= TOL && it < MAX_ITER) {
      var mid = 0.5 * (lo + hi);
      if (bs.bsCall(S, K, T, r, mid) > price) hi = mid; else lo = mid;
      it++;
    }
    return { sigma: 0.5 * (lo + hi), method: 'bisection', ok: true, iterations: it, reason: '' };
  }

  // F03、F07：Newton 法（推導第 4 節）；vega 太小或跑出區間時改用二分法
  function impliedVolNewton(price, S, K, T, r) {
    var b = callBounds(S, K, T, r);
    if (!(price > b.lower && price < b.upper)) {
      return { sigma: NaN, method: 'newton', ok: false, iterations: 0, reason: '市價不在上下界之間，無解' };
    }
    var s = NEWTON_START;
    for (var it = 1; it <= MAX_ITER; it++) {
      var v = bs.vega(S, K, T, r, s);
      if (!(v >= VEGA_MIN)) return bisectionFallback(price, S, K, T, r, 'vega 太小');
      var next = s - (bs.bsCall(S, K, T, r, s) - price) / v;
      if (!(next >= SIGMA_L && next <= SIGMA_H)) return bisectionFallback(price, S, K, T, r, '跑出區間');
      if (Math.abs(next - s) < TOL) return { sigma: next, method: 'newton', ok: true, iterations: it, reason: '' };
      s = next;
    }
    return bisectionFallback(price, S, K, T, r, '超過最大迭代次數');
  }

  // F03：Newton 法失敗時改用二分法，並記下原因
  function bisectionFallback(price, S, K, T, r, why) {
    var res = impliedVolBisection(price, S, K, T, r);
    res.method = 'bisection';
    res.reason = 'Newton 法' + why + '，改用二分法' + (res.reason ? '；' + res.reason : '');
    return res;
  }

  return { callBounds: callBounds, impliedVolBisection: impliedVolBisection, impliedVolNewton: impliedVolNewton };
}));
