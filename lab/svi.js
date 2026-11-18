/*
 * lab/svi.js — SSVI 波動率曲面（示意參數）
 * run v1 / N3 產出。公式卡所在頁：
 *   F10、F12、F13 → wiki/concepts/svi-parameterization.md
 *   F14、F15、F16 → wiki/concepts/no-arbitrage-surface.md
 * 座標：k = log-strike（F10），t = 距離到期的時間（年），w = 總隱含變異數。
 */
(function (root, factory) {
  var api = factory();
  if (typeof module === 'object' && module.exports) { module.exports = api; }
  root.DLab = root.DLab || {};
  for (var k in api) { root.DLab[k] = api[k]; }
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  // 已核准的示意參數（Itzel 2026-11-18；wiki/concepts/svi-parameterization.md「示意參數」表）。
  // 不是來源數字，也不是市場數據；用它畫的圖都要標註「示意參數」。
  var SSVI_PARAMS = Object.freeze({ sigma0: 0.20, rho: -0.7, eta: 1.0, gamma: 0.5 });

  // F12（符號定義）：θ_t = σ_BS²(0, t)·t；示意參數取價平波動率固定為 σ0，所以 θ_t = σ0²·t
  function thetaT(t, p) {
    p = p || SSVI_PARAMS;
    return p.sigma0 * p.sigma0 * t;
  }

  // F13：φ(θ) = η / (θ^γ (1 + θ)^(1−γ))
  function phi(theta, p) {
    p = p || SSVI_PARAMS;
    return p.eta / (Math.pow(theta, p.gamma) * Math.pow(1 + theta, 1 - p.gamma));
  }

  // F12：w(k, θ_t) = (θ_t/2) {1 + ρ φ(θ_t) k + √((φ(θ_t) k + ρ)² + (1 − ρ²))}
  function totalVariance(k, t, p) {
    p = p || SSVI_PARAMS;
    var th = thetaT(t, p);
    var f = phi(th, p);
    var rho = p.rho;
    return th / 2 * (1 + rho * f * k + Math.sqrt((f * k + rho) * (f * k + rho) + (1 - rho * rho)));
  }

  // F10：k = ln(K / F_t)
  function logStrike(K, F) {
    return Math.log(K / F);
  }

  // F10（附註）：σ_BS = √(w / t)
  function impliedVol(k, t, p) {
    return Math.sqrt(totalVariance(k, t, p) / t);
  }

  // F14：∂_t w(k, t) ≥ 0。以前向差分檢查固定 k 時 w 對 t 不遞減；回傳最小增量
  function calendarMinIncrement(kGrid, tGrid, p) {
    var min = Infinity;
    for (var i = 0; i < kGrid.length; i++) {
      for (var j = 1; j < tGrid.length; j++) {
        var inc = totalVariance(kGrid[i], tGrid[j], p) - totalVariance(kGrid[i], tGrid[j - 1], p);
        if (inc < min) min = inc;
      }
    }
    return min;
  }

  // F15：g(k) = (1 − k w'/(2w))² − (w'²/4)(1/w + 1/4) + w''/2；w'、w'' 以中央差分計算（步長 dk）
  function butterflyG(k, t, p, dk) {
    dk = dk || 1e-4;
    var w0 = totalVariance(k, t, p);
    var wp = totalVariance(k + dk, t, p);
    var wm = totalVariance(k - dk, t, p);
    var w1 = (wp - wm) / (2 * dk);
    var w2 = (wp - 2 * w0 + wm) / (dk * dk);
    var a = 1 - k * w1 / (2 * w0);
    return a * a - (w1 * w1 / 4) * (1 / w0 + 1 / 4) + w2 / 2;
  }

  // F16：SSVI 沒有靜態套利的四個充分條件，在 θ 網格上逐點檢查；∂_θ(θφ) 以中央差分計算
  function ssviConditions(thetaGrid, p) {
    p = p || SSVI_PARAMS;
    var rho = p.rho, ar = Math.abs(rho);
    var res = { c1: true, c2: true, c3: true, c4: true, failures: [] };
    for (var i = 0; i < thetaGrid.length; i++) {
      var th = thetaGrid[i];
      var f = phi(th, p);
      var h = th * 1e-5;
      var dthphi = ((th + h) * phi(th + h, p) - (th - h) * phi(th - h, p)) / (2 * h);
      var upper = rho === 0 ? Infinity : (1 + Math.sqrt(1 - rho * rho)) / (rho * rho) * f;
      if (!(dthphi >= 0 && dthphi <= upper)) { res.c2 = false; res.failures.push(['c2', th]); }
      if (!(th * f * (1 + ar) < 4)) { res.c3 = false; res.failures.push(['c3', th]); }
      if (!(th * f * f * (1 + ar) <= 4)) { res.c4 = false; res.failures.push(['c4', th]); }
    }
    // 條件 1：∂_t θ_t ≥ 0。θ_t = σ0² t，∂_t θ_t = σ0² ≥ 0
    res.c1 = p.sigma0 * p.sigma0 >= 0;
    res.all = res.c1 && res.c2 && res.c3 && res.c4;
    return res;
  }

  return {
    SSVI_PARAMS: SSVI_PARAMS,
    thetaT: thetaT,
    phi: phi,
    totalVariance: totalVariance,
    logStrike: logStrike,
    impliedVol: impliedVol,
    calendarMinIncrement: calendarMinIncrement,
    butterflyG: butterflyG,
    ssviConditions: ssviConditions
  };
});
