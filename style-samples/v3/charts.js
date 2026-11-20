/*
 * style-samples/v3/charts.js — 視覺樣本共用：S04 損益滑桿、S08 理論 vs 市場兩條線
 * 數值一律呼叫 lab/bs.js（LabBS）與 lab/svi.js（LabSVI）；本檔只負責畫 SVG。
 * 外觀全部用 class，顏色由各樣本的 CSS token 決定。
 */
(function () {
  'use strict';
  var NS = 'http://www.w3.org/2000/svg';

  function el(tag, attrs, parent) {
    var n = document.createElementNS(NS, tag);
    for (var k in attrs) n.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(n);
    return n;
  }
  function path(pts, sx, sy) {
    return pts.map(function (p, i) { return (i ? 'L' : 'M') + sx(p[0]).toFixed(1) + ' ' + sy(p[1]).toFixed(1); }).join('');
  }

  // ---------- S04 損益滑桿 ----------
  window.mountPayoff = function (root) {
    var q = function (s) { return root.querySelector(s); };
    var svg = q('svg.payoff'), W = 600, H = 340, P = { l: 46, r: 16, t: 18, b: 38 };
    svg.setAttribute('viewBox', '0 0 ' + W + ' ' + H);
    var state = { type: 'call', role: 'buyer' };

    root.querySelectorAll('[data-type]').forEach(function (b) {
      b.addEventListener('click', function () { state.type = b.dataset.type; sync(); });
    });
    root.querySelectorAll('[data-role]').forEach(function (b) {
      b.addEventListener('click', function () { state.role = b.dataset.role; sync(); });
    });
    ['K', 'ST', 'prem'].forEach(function (id) { q('[name=' + id + ']').addEventListener('input', sync); });

    function sync() {
      var K = +q('[name=K]').value, ST = +q('[name=ST]').value, prem = +q('[name=prem]').value;
      root.querySelectorAll('[data-type]').forEach(function (b) { b.setAttribute('aria-pressed', b.dataset.type === state.type); });
      root.querySelectorAll('[data-role]').forEach(function (b) { b.setAttribute('aria-pressed', b.dataset.role === state.role); });
      root.querySelectorAll('input[type=range]').forEach(function (r) {
        r.style.setProperty('--pct', ((r.value - r.min) / (r.max - r.min) * 100) + '%');
      });
      q('[data-out=K]').textContent = K;
      q('[data-out=ST]').textContent = ST;

      var payoffFn = state.type === 'call' ? LabBS.callPayoff : LabBS.putPayoff;
      var profitFn = state.role === 'buyer' ? LabBS.buyerProfit : LabBS.writerProfit;
      var xs = [], pts = [];
      for (var s = 0; s <= 200; s += 2) { xs.push(s); pts.push([s, profitFn(state.type, s, K, prem)]); }
      var ys = pts.map(function (p) { return p[1]; });
      var y0 = Math.min.apply(null, ys.concat([-prem * 2])), y1 = Math.max.apply(null, ys.concat([prem * 2]));
      var sx = function (x) { return P.l + (x / 200) * (W - P.l - P.r); };
      var sy = function (y) { return P.t + (1 - (y - y0) / (y1 - y0)) * (H - P.t - P.b); };

      svg.innerHTML = '';
      el('line', { x1: P.l, x2: W - P.r, y1: sy(0), y2: sy(0), class: 'axis' }, svg);
      el('line', { x1: P.l, x2: P.l, y1: P.t, y2: H - P.b, class: 'axis' }, svg);
      el('line', { x1: sx(K), x2: sx(K), y1: P.t, y2: H - P.b, class: 'kline' }, svg);
      var kl = el('text', { x: sx(K) + 6, y: P.t + 14, class: 'lbl' }, svg); kl.textContent = 'K';
      var gain = pts.map(function (p) { return [p[0], Math.max(p[1], 0)]; });
      el('path', { d: path(gain, sx, sy) + 'L' + sx(200) + ' ' + sy(0) + 'L' + sx(0) + ' ' + sy(0) + 'Z', class: 'area ' + state.type }, svg);
      el('path', { d: path(pts, sx, sy), class: 'curve ' + state.type }, svg);
      var p = profitFn(state.type, ST, K, prem);
      el('line', { x1: sx(ST), x2: sx(ST), y1: P.t, y2: H - P.b, class: 'cursor-line' }, svg);
      el('circle', { cx: sx(ST), cy: sy(p), r: 6, class: 'cursor' }, svg);
      var xl = el('text', { x: W - P.r, y: H - 10, class: 'lbl', 'text-anchor': 'end' }, svg); xl.textContent = '到期標的價格 S_T →';
      var yl = el('text', { x: P.l + 6, y: P.t + 14, class: 'lbl' }, svg); yl.textContent = '損益';

      q('[data-out=payoff]').textContent = payoffFn(ST, K).toFixed(2);
      q('[data-out=profit]').textContent = (p >= 0 ? '+' : '') + p.toFixed(2);
      var m = ST === K ? 'atm' : ((state.type === 'call') === (ST > K) ? 'itm' : 'otm');
      var st = q('[data-out=money]');
      st.textContent = { itm: '價內', atm: '價平', otm: '價外' }[m];
      st.dataset.state = m;
      root.dataset.type = state.type;
    }
    sync();
  };

  // ---------- S08 理論（平）vs 示意市場型態（彎） ----------
  window.mountFlatVsSmile = function (svg, opts) {
    opts = opts || {};
    var W = 600, H = 320, P = { l: 30, r: 20, t: 24, b: 36 }, t = 0.5;  // t 取 S09 工具 A 的預設值 0.5
    svg.setAttribute('viewBox', '0 0 ' + W + ' ' + H);
    var ks = [], pts = [];
    for (var k = -0.5; k <= 0.5001; k += 0.01) { ks.push(k); pts.push([k, LabSVI.impliedVol(k, t)]); }
    var atm = LabSVI.impliedVol(0, t);
    var ys = pts.map(function (p) { return p[1]; });
    var y0 = Math.min.apply(null, ys) * 0.92, y1 = Math.max.apply(null, ys) * 1.04;
    var sx = function (x) { return P.l + (x + 0.5) * (W - P.l - P.r); };
    var sy = function (y) { return P.t + (1 - (y - y0) / (y1 - y0)) * (H - P.t - P.b); };
    el('line', { x1: P.l, x2: W - P.r, y1: H - P.b, y2: H - P.b, class: 'axis' }, svg);
    el('line', { x1: P.l, x2: P.l, y1: P.t, y2: H - P.b, class: 'axis' }, svg);
    var flat = el('path', { d: 'M' + sx(-0.5) + ' ' + sy(atm) + 'L' + sx(0.5) + ' ' + sy(atm), class: 'flat' }, svg);
    var smile = el('path', { d: path(pts, sx, sy), class: 'smile', pathLength: 1 }, svg);
    var a = el('text', { x: sx(0.5), y: sy(atm) - 10, class: 'lbl flat-lbl', 'text-anchor': 'end' }, svg); a.textContent = 'Black-Scholes 預測';
    var b = el('text', { x: sx(-0.5) + 8, y: sy(pts[0][1]) + 4, class: 'lbl smile-lbl' }, svg); b.textContent = '示意的市場型態';
    var c = el('text', { x: W - P.r, y: H - 10, class: 'lbl', 'text-anchor': 'end' }, svg); c.textContent = '履約價（低 → 高）';
    var d = el('text', { x: W - P.r, y: P.t - 6, class: 'lbl tag', 'text-anchor': 'end' }, svg); d.textContent = '示意參數';
    return { flat: flat, smile: smile };
  };
})();
