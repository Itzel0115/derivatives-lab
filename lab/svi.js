/*
 * lab/svi.js — SSVI 示意曲面與無套利檢查（run v2 / N3）
 * 公式卡：F10、F12、F13（wiki/concepts/svi-parameterization.md）
 *         F14、F15、F16（wiki/concepts/no-arbitrage-surface.md）
 * 示意參數：照抄 svi-parameterization「示意參數（Itzel 已於 2026-11-18 核准）」表，不得更動：
 *   θ_t = σ₀² t，σ₀ = 0.20；ρ = −0.7；η = 1.0；γ = 0.5
 * 這些不是來源數字，也不是市場數據；用它畫的圖都要標註「示意參數」。
 * 導數（F15 的 w′、w″，F16 條件 2 的 ∂θ）一律用中央差分計算，不另外推導解析式。
 * 瀏覽器：window.LabSVI；Node：module.exports。
 */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.LabSVI = factory();
}(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  var PARAMS = Object.freeze({ sigma0: 0.20, rho: -0.7, eta: 1.0, gamma: 0.5 });

  // F12（θ_t 的定義）＋示意參數：價平總隱含變異數 θ_t = σ₀² t
  function thetaT(t) {
    return PARAMS.sigma0 * PARAMS.sigma0 * t;
  }

  // F13：φ(θ) = η / (θ^γ (1 + θ)^(1 − γ))
  function phi(theta) {
    return PARAMS.eta / (Math.pow(theta, PARAMS.gamma) * Math.pow(1 + theta, 1 - PARAMS.gamma));
  }

  // F12：w(k, θ_t) = θ_t/2 · {1 + ρ φ k + √((φ k + ρ)² + (1 − ρ²))}
  function totalVariance(k, t) {
    var th = thetaT(t), p = phi(th), rho = PARAMS.rho;
    return 0.5 * th * (1 + rho * p * k + Math.sqrt((p * k + rho) * (p * k + rho) + (1 - rho * rho)));
  }

  // F10：σ_BS = √(w / t)
  function impliedVol(k, t) {
    return Math.sqrt(totalVariance(k, t) / t);
  }

  // F10：k = ln(K / F_t)（F_t 由呼叫者提供）
  function logStrike(K, F) {
    return Math.log(K / F);
  }

  // F10：由 k 還原履約價 K = F_t e^k
  function strikeFromLog(k, F) {
    return F * Math.exp(k);
  }

  // F14：同一 k 下，相鄰 t 的 w 增量；回傳整個網格上的最小增量（≥ 0 表示沒有日曆價差套利）
  function calendarMinIncrement(kGrid, tGrid) {
    var min = Infinity;
    for (var i = 0; i < kGrid.length; i++) {
      var prev = totalVariance(kGrid[i], tGrid[0]);
      for (var j = 1; j < tGrid.length; j++) {
        var w = totalVariance(kGrid[i], tGrid[j]);
        if (w - prev < min) min = w - prev;
        prev = w;
      }
    }
    return min;
  }

  // F15：g(k) = (1 − k w′/(2w))² − (w′²/4)(1/w + 1/4) + w″/2（固定 t；w′、w″ 以中央差分計算）
  function butterflyG(k, t) {
    var h = 1e-4;
    var w = totalVariance(k, t), wp = totalVariance(k + h, t), wm = totalVariance(k - h, t);
    var w1 = (wp - wm) / (2 * h), w2 = (wp - 2 * w + wm) / (h * h);
    var a = 1 - k * w1 / (2 * w);
    return a * a - (w1 * w1 / 4) * (1 / w + 0.25) + w2 / 2;
  }

  // F16：SSVI 沒有靜態套利的充分條件 1–4，在給定的 θ 序列（依 t 遞增排列）上逐點檢查
  function ssviConditions(thetas) {
    var rho = PARAMS.rho, ar = Math.abs(rho), failures = [];
    for (var i = 0; i < thetas.length; i++) {
      var th = thetas[i], p = phi(th);
      if (i > 0 && !(th >= thetas[i - 1])) failures.push({ cond: 1, theta: th });
      var h = 1e-6 * th;
      var d = ((th + h) * phi(th + h) - (th - h) * phi(th - h)) / (2 * h);
      var cap = (1 / (rho * rho)) * (1 + Math.sqrt(1 - rho * rho)) * p;
      if (!(d >= 0 && d <= cap)) failures.push({ cond: 2, theta: th, value: d, cap: cap });
      if (!(th * p * (1 + ar) < 4)) failures.push({ cond: 3, theta: th, value: th * p * (1 + ar) });
      if (!(th * p * p * (1 + ar) <= 4)) failures.push({ cond: 4, theta: th, value: th * p * p * (1 + ar) });
    }
    return { all: failures.length === 0, failures: failures };
  }

  return {
    PARAMS: PARAMS, thetaT: thetaT, phi: phi, totalVariance: totalVariance, impliedVol: impliedVol,
    logStrike: logStrike, strikeFromLog: strikeFromLog,
    calendarMinIncrement: calendarMinIncrement, butterflyG: butterflyG, ssviConditions: ssviConditions
  };
}));
