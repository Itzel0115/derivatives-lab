/*
 * lab/tests/c3.test.js — GRAPH_SPEC §5 C3 單元測試（C3-1～C3-10、C3-12）
 * C3-11（與 OIC 選擇權計算器對照）需要用瀏覽器操作外部網站，不在本檔，結果另記於 runs/<run-id>/C3_report.md。
 *
 * 執行：node lab/tests/c3.test.js   （全部通過時結束代碼 0，否則 1）
 *
 * 測試參數（設計選擇，不是來源數字，也不會出現在簡報中）：
 *   - 亂數種子固定（mulberry32, seed = 20261119），結果可重現。
 *   - DOMAIN_WIDE：S ∈ [50, 150]、K ∈ [50, 150]、T ∈ [0.05, 3]、r ∈ [0, 0.10]、σ ∈ [0.05, 1.0]
 *   - DOMAIN_IV：K/S ∈ [0.8, 1.25]、T ∈ [0.25, 2]（反推與 vega 測試用；理由見 C3-4 註解）
 *
 * 數值容差（Itzel 2026-11-19 決定：比照 tools/precheck_formulas.py；見 runs/v1/C3_report.md 第 2 輪）：
 *   - C3-2 價格邊界：容許 1e-12（lower − 1e-12 ≤ C ≤ S + 1e-12）
 *   - C3-3、C3-10「遞增」：判定為不遞減，容許 1e-9 的下降；另統計沒有嚴格上升的次數與最大下降
 *   - C3-4 來回測試：只計 vega > 1e-3 的參數；其餘只統計、不判定
 */
'use strict';
var path = require('path');
var fs = require('fs');
var bs = require('../bs.js');
var iv = require('../iv.js');
var svi = require('../svi.js');
var eln = require('../eln.js');

function mulberry32(a) {
  return function () {
    a |= 0; a = a + 0x6D2B79F5 | 0;
    var t = Math.imul(a ^ a >>> 15, 1 | a);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}
var rand = mulberry32(20261119);
function U(a, b) { return a + (b - a) * rand(); }
function wide() { return { S: U(50, 150), K: U(50, 150), T: U(0.05, 3), r: U(0, 0.10), sigma: U(0.05, 1.0) }; }
function ivDomain() { var S = U(50, 150); return { S: S, K: S * U(0.8, 1.25), T: U(0.25, 2), r: U(0, 0.10) }; }
function sigmaGrid(step) { var g = []; for (var i = 0; ; i++) { var s = +(0.05 + i * step).toFixed(10); if (s > 1.0 + 1e-12) break; g.push(s); } return g; }

var results = [];
function record(id, name, pass, detail) {
  results.push({ id: id, name: name, pass: pass, detail: detail });
  console.log((pass ? 'PASS ' : 'FAIL ') + id + '  ' + name + '  —  ' + detail);
}

// ---- C3-1 Put-call parity（F06）：|C − P − (S − Ke^(−rT))| < 1e-8，隨機 100 組 ----
(function () {
  var maxErr = 0, worst = null;
  for (var i = 0; i < 100; i++) {
    var p = wide();
    var lhs = bs.bsCall(p.S, p.K, p.T, p.r, p.sigma) - bs.bsPut(p.S, p.K, p.T, p.r, p.sigma);
    var rhs = p.S - p.K * Math.exp(-p.r * p.T);
    var e = Math.abs(lhs - rhs);
    if (e > maxErr) { maxErr = e; worst = p; }
  }
  record('C3-1', 'Put-call parity（F06）', maxErr < 1e-8, '100 組，最大誤差 ' + maxErr.toExponential(3) + '（門檻 1e-8）');
})();

// ---- C3-2 價格邊界：max(S − Ke^(−rT), 0) ≤ C ≤ S ----
(function () {
  var n = 2000, fails = [], minLow = Infinity, minUp = Infinity;
  for (var i = 0; i < n; i++) {
    var p = wide();
    var C = bs.bsCall(p.S, p.K, p.T, p.r, p.sigma);
    var lower = Math.max(p.S - p.K * Math.exp(-p.r * p.T), 0);
    var gLow = C - lower, gUp = p.S - C;
    if (gLow < minLow) minLow = gLow;
    if (gUp < minUp) minUp = gUp;
    if (!(gLow >= -1e-12 && gUp >= -1e-12)) fails.push({ p: p, C: C, lower: lower });
  }
  record('C3-2', '價格邊界', fails.length === 0,
    n + ' 組，不成立 ' + fails.length + ' 組（容差 1e-12）；C − 下界 最小 ' + minLow.toExponential(3) + '，S − C 最小 ' + minUp.toExponential(3));
  if (fails.length) console.log('      例：' + JSON.stringify(fails[0]));
})();

// ---- C3-3 單調性：C 隨 σ 遞增（σ 網格 0.05～1.00，步長 0.01） ----
(function () {
  var sets = 500, grid = sigmaGrid(0.01), tolFail = 0, dec = 0, flat = 0, maxDrop = 0, ex = null;
  for (var i = 0; i < sets; i++) {
    var p = wide();
    var prev = bs.bsCall(p.S, p.K, p.T, p.r, grid[0]);
    for (var j = 1; j < grid.length; j++) {
      var c = bs.bsCall(p.S, p.K, p.T, p.r, grid[j]);
      if (c < prev) { dec++; if (prev - c > maxDrop) { maxDrop = prev - c; ex = { p: p, s0: grid[j - 1], s1: grid[j], c0: prev, c1: c }; } }
      else if (c === prev) { flat++; }
      if (!(c >= prev - 1e-9)) tolFail++;
      prev = c;
    }
  }
  var pairs = sets * (grid.length - 1);
  record('C3-3', '單調性：C 隨 σ 遞增（不遞減，容差 1e-9）', tolFail === 0,
    sets + ' 組 × ' + (grid.length - 1) + ' 個相鄰 σ = ' + pairs + ' 對；下降超過 1e-9 的 ' + tolFail + ' 對；參考：下降 ' + dec + ' 對（最大下降 ' + maxDrop.toExponential(3) + '）；相等 ' + flat + ' 對');
  if (ex) console.log('      例：' + JSON.stringify(ex));
})();

// ---- C3-4 IV 來回測試：σ → 價格 → σ̂，σ ∈ [0.05, 1.0]，|σ̂ − σ| < 1e-6 ----
// 參數用 DOMAIN_IV：深度價內／價外且短到期時，call 價格對 σ 幾乎不敏感（vega → 0），
// 價格在浮點精度下已無法分辨 σ，反推本身是病態問題，與程式是否正確無關。
(function () {
  var sets = 200, grid = sigmaGrid(0.05), skipped = 0, skippedBad = 0, maxB = 0, maxN = 0, fails = [], fallbacks = 0, minVega = Infinity;
  for (var i = 0; i < sets; i++) {
    var p = ivDomain();
    for (var j = 0; j < grid.length; j++) {
      var s = grid[j];
      var c = bs.bsCall(p.S, p.K, p.T, p.r, s);
      var v = bs.vega(p.S, p.K, p.T, p.r, s);
      if (v < minVega) minVega = v;
      var b = iv.impliedVolBisection(c, p.S, p.K, p.T, p.r);
      var nw = iv.impliedVolNewton(c, p.S, p.K, p.T, p.r);
      if (nw.method !== 'newton') fallbacks++;
      var eb = Math.abs(b.sigma - s), en = Math.abs(nw.sigma - s);
      if (!(v > 1e-3)) { skipped++; if (!(eb < 1e-6) || !(en < 1e-6)) skippedBad++; continue; }
      if (!(eb < 1e-6) || !(en < 1e-6)) fails.push({ p: p, sigma: s, bis: b.sigma, newton: nw.sigma });
      if (eb > maxB) maxB = eb;
      if (en > maxN) maxN = en;
    }
  }
  record('C3-4', 'IV 來回測試（二分法與 Newton 法）', fails.length === 0,
    sets + ' 組 × ' + grid.length + ' 個 σ；二分法最大誤差 ' + maxB.toExponential(3) + '，Newton 最大誤差 ' + maxN.toExponential(3) +
    '（門檻 1e-6，只計 vega > 1e-3）；vega ≤ 1e-3 不判定 ' + skipped + ' 次（其中誤差超過 1e-6 的 ' + skippedBad + ' 次）；Newton 退回二分法 ' + fallbacks + ' 次；最小 vega ' + minVega.toExponential(3));
  if (fails.length) console.log('      例：' + JSON.stringify(fails[0]));
})();

// ---- C3-5 Vega（F07）：解析解 vs 中央差分（h = 1e-4），相對誤差 < 1e-3 ----
(function () {
  var sets = 2000, h = 1e-4, maxRel = 0, fails = 0, ex = null;
  for (var i = 0; i < sets; i++) {
    var p = ivDomain(); p.sigma = U(0.05, 1.0);
    var a = bs.vega(p.S, p.K, p.T, p.r, p.sigma);
    var num = (bs.bsCall(p.S, p.K, p.T, p.r, p.sigma + h) - bs.bsCall(p.S, p.K, p.T, p.r, p.sigma - h)) / (2 * h);
    var rel = Math.abs(a - num) / Math.abs(a);
    if (rel > maxRel) { maxRel = rel; ex = { p: p, analytic: a, numeric: num }; }
    if (!(rel < 1e-3)) fails++;
  }
  record('C3-5', 'Vega（F07）解析解 vs 數值微分', fails === 0,
    sets + ' 組（DOMAIN_IV），最大相對誤差 ' + maxRel.toExponential(3) + '（門檻 1e-3）');
})();

// 曲面測試共用的網格
var kGrid = []; for (var kk = -3; kk <= 3 + 1e-9; kk += 0.01) kGrid.push(+kk.toFixed(4));
var tGrid = []; for (var tt = 0.01; tt <= 5 + 1e-9; tt += 0.01) tGrid.push(+tt.toFixed(4));

// ---- C3-6 SSVI 曲面（F12、F13）：total variance ≥ 0 ----
(function () {
  var min = Infinity, neg = 0;
  for (var i = 0; i < kGrid.length; i++) for (var j = 0; j < tGrid.length; j++) {
    var w = svi.totalVariance(kGrid[i], tGrid[j]);
    if (w < min) min = w;
    if (!(w >= 0)) neg++;
  }
  record('C3-6', 'SSVI total variance ≥ 0（F12、F13，示意參數）', neg === 0,
    kGrid.length + ' × ' + tGrid.length + ' 個 (k, t)，k ∈ [−3, 3]、t ∈ [0.01, 5]；最小值 ' + min.toExponential(3) + '，負值 ' + neg + ' 個');
})();

// ---- C3-7 Calendar 無套利（F14）：同一 k 下，total variance 隨 T 不遞減 ----
(function () {
  var minInc = svi.calendarMinIncrement(kGrid, tGrid);
  var cond = svi.ssviConditions(tGrid.map(function (t) { return svi.thetaT(t); }));
  record('C3-7', 'Calendar 無套利（F14）', minInc >= 0,
    '同上網格，相鄰 t 的 w 最小增量 ' + minInc.toExponential(3) + '；F16 條件 1–4 逐點檢查：' + (cond.all ? '全部成立' : '不成立 ' + JSON.stringify(cond.failures.slice(0, 3))));
})();

// ---- C3-8 Butterfly 無套利（F15）：call 價格對 K 的二階差分 ≥ −1e-10 ----
// r = 0，所以遠期價格 F = S e^(rT) = S（svi-parameterization：S13, p.11），k = ln(K/S)（F10）。
// 每個 K 的波動率取 SSVI 示意曲面的 σ_BS(k, t)（F10），call 價格用 F03。
(function () {
  var S = 100, r = 0, dK = 0.5, Ts = [0.1, 0.25, 0.5, 1, 2, 5], minD2 = Infinity, fails = 0, cnt = 0, gMin = Infinity;
  for (var a = 0; a < Ts.length; a++) {
    var T = Ts[a], prices = [], Ks = [];
    for (var K = 20; K <= 300 + 1e-9; K += dK) {
      var k = svi.logStrike(K, S);
      prices.push(bs.bsCall(S, K, T, r, svi.impliedVol(k, T)));
      Ks.push(K);
      var g = svi.butterflyG(k, T);
      if (g < gMin) gMin = g;
    }
    for (var i = 1; i < prices.length - 1; i++) {
      var d2 = prices[i - 1] - 2 * prices[i] + prices[i + 1];
      cnt++;
      if (d2 < minD2) minD2 = d2;
      if (!(d2 >= -1e-10)) fails++;
    }
  }
  record('C3-8', 'Butterfly 無套利（F15）', fails === 0,
    'S = 100、r = 0、K ∈ [20, 300] 步長 0.5、T ∈ {' + Ts.join(', ') + '}，共 ' + cnt + ' 個二階差分；最小值 ' + minD2.toExponential(3) +
    '，小於 −1e-10 的 ' + fails + ' 個；參考：F15 的 g(k) 最小值 ' + gMin.toExponential(3));
})();

// ---- C3-9 ELN（F08）：S_T = K 連續；S_T ≥ K 為 N + C；S_T = 0 為 C ----
(function () {
  var cases = [[100, 5, 100], [1000, 80, 950], [1, 0.03, 0.9], [100, 0, 120]], bad = [];
  cases.forEach(function (cs) {
    var N = cs[0], C = cs[1], K = cs[2];
    var atK = eln.elnPayoff(K, N, C, K);
    var below = eln.elnPayoff(K * (1 - 1e-12), N, C, K);
    if (Math.abs(atK - (N + C)) > 1e-12 * (N + C) || Math.abs(below - atK) > 1e-9 * (N + C)) bad.push(['連續', cs, atK, below]);
    [K, K * 1.01, K * 2, K * 100].forEach(function (ST) { if (eln.elnPayoff(ST, N, C, K) !== N + C) bad.push(['≥K', cs, ST]); });
    if (Math.abs(eln.elnPayoff(0, N, C, K) - C) > 1e-12 * (N + C)) bad.push(['0', cs, eln.elnPayoff(0, N, C, K)]);
    [0.1, 0.5, 0.9].forEach(function (f) { var ST = K * f; var e = Math.abs(eln.elnPayoff(ST, N, C, K) - (N * ST / K + C)); if (e > 1e-9 * (N + C)) bad.push(['條款', cs, ST, e]); });
  });
  record('C3-9', 'ELN 到期報償（F08）', bad.length === 0, cases.length + ' 組 (N, C, K)；不成立 ' + bad.length + ' 項' + (bad.length ? ' ' + JSON.stringify(bad[0]) : '') +
    '；另核對 S_T < K 時等於條款 N·S_T/K + C');
})();

// ---- C3-10 ELN（F09、F17）：發行價固定時，σ 越高，公平票息越高 ----
(function () {
  var sets = 200, grid = sigmaGrid(0.01), tolFail = 0, nonInc = 0, maxRoundTrip = 0, ex = null;
  for (var i = 0; i < sets; i++) {
    var S = U(50, 150), p = { S: S, K: S * U(0.7, 1.1), T: U(0.25, 3), r: U(0, 0.10), N: U(100, 10000) };
    var prev = -Infinity;
    for (var j = 0; j < grid.length; j++) {
      var c = eln.elnFairCoupon(p.S, p.K, p.T, p.r, grid[j], p.N);
      if (!(c > prev)) { nonInc++; if (!ex) ex = { p: p, sigma: grid[j], c: c, prev: prev }; }
      if (!(c >= prev - 1e-9)) tolFail++;
      prev = c;
      var V = eln.elnValue(p.S, p.K, p.T, p.r, grid[j], p.N, c);
      var rt = Math.abs(V - p.N) / p.N;
      if (rt > maxRoundTrip) maxRoundTrip = rt;
    }
  }
  record('C3-10', 'ELN 公平票息隨 σ 遞增（F09、F17；不遞減，容差 1e-9）', tolFail === 0 && maxRoundTrip < 1e-12,
    sets + ' 組 × ' + grid.length + ' 個 σ；下降超過 1e-9 的 ' + tolFail + ' 處；參考：沒有嚴格上升的 ' + nonInc + ' 處；把 C* 代回 F09 得到 V 與面額 N 的最大相對差 ' + maxRoundTrip.toExponential(3));
  if (ex) console.log('      例：' + JSON.stringify(ex));
})();

// ---- C3-12 lab/ 中每個函式都有公式 ID，而且該公式卡存在 ----
// 檢查範圍：lab/*.js 中所有具名的 function 宣告。每個檔案最外層的兩個匿名包裝函式（模組載入用）不計。
// 「有公式 ID」= 函式宣告的上一行起、往上連續的註解行中出現 Fxx。
(function () {
  var root = path.join(__dirname, '..', '..');
  var cards = {};
  function walk(dir) {
    fs.readdirSync(dir, { withFileTypes: true }).forEach(function (d) {
      var f = path.join(dir, d.name);
      if (d.isDirectory()) walk(f);
      else if (d.name.endsWith('.md')) {
        var txt = fs.readFileSync(f, 'utf8'), m, re = /^> \*\*(F\d\d)｜/gm;
        while ((m = re.exec(txt))) cards[m[1]] = path.relative(root, f);
      }
    });
  }
  walk(path.join(root, 'wiki'));
  var labDir = path.join(root, 'lab'), missing = [], unknown = [], total = 0;
  fs.readdirSync(labDir).filter(function (f) { return f.endsWith('.js'); }).forEach(function (f) {
    var lines = fs.readFileSync(path.join(labDir, f), 'utf8').split(/\r?\n/);
    lines.forEach(function (ln, i) {
      var m = ln.match(/^\s*function\s+([A-Za-z_$][\w$]*)\s*\(/);
      if (!m) return;
      total++;
      var ids = [];
      for (var j = i - 1; j >= 0 && /^\s*\/\//.test(lines[j]); j--) {
        var found = lines[j].match(/F\d\d/g);
        if (found) ids = ids.concat(found);
      }
      if (!ids.length) missing.push(f + ':' + (i + 1) + ' ' + m[1]);
      ids.forEach(function (id) { if (!cards[id]) unknown.push(f + ':' + (i + 1) + ' ' + m[1] + ' → ' + id); });
    });
  });
  record('C3-12', '每個函式都有公式 ID 且公式卡存在', missing.length === 0 && unknown.length === 0,
    total + ' 個具名函式；缺公式 ID ' + missing.length + ' 個' + (missing.length ? '（' + missing.join('；') + '）' : '') +
    '；ID 對不到公式卡 ' + unknown.length + ' 個' + (unknown.length ? '（' + unknown.join('；') + '）' : '') +
    '；wiki 中找到的公式卡 ' + Object.keys(cards).sort().join(' '));
})();

var failed = results.filter(function (r) { return !r.pass; });
console.log('\n' + (results.length - failed.length) + ' / ' + results.length + ' 通過（C3-11 另行手動對照）');
process.exitCode = failed.length ? 1 : 0;
