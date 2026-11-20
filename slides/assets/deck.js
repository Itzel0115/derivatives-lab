/* slides/assets/deck.js — run v2.1 / N5（由 v2 修改：導覽改為每頁頁首按鈕與章節分頁；工具 A 曲面改用 surface3d.js）。導覽、KaTeX、逐步標註、圖表與互動工具。
 * 所有數值都由 lab/*.js（C3 測試過的函式）計算；本檔不重寫任何公式，只負責繪圖與介面。 */
(function () {
  'use strict';
  var DLab = window.DLab = Object.assign({}, window.LabBS, window.LabIV, window.LabSVI, window.LabELN);
  var NS = 'http://www.w3.org/2000/svg';
  var $ = function (id) { return document.getElementById(id); };
  var css = function (name) { return getComputedStyle(document.documentElement).getPropertyValue(name).trim(); };
  var pct = function (x, d) { return (x * 100).toFixed(d == null ? 2 : d) + '%'; };
  var range = function (a, b, n) { var r = []; for (var i = 0; i < n; i++) r.push(a + (b - a) * i / (n - 1)); return r; };

  /* ---------------- 導覽 ---------------- */
  var slides = Array.prototype.slice.call(document.querySelectorAll('.slide'));
  var ids = slides.map(function (s) { return s.id; });
  var drawn = {};
  function show(id) {
    if (ids.indexOf(id) < 0) id = ids[0];
    slides.forEach(function (s) { s.classList.toggle('show', s.id === id); });
    var i = ids.indexOf(id);
    slides[i].querySelectorAll('.prev').forEach(function (b) { b.disabled = i === 0; });
    slides[i].querySelectorAll('.next').forEach(function (b) { b.disabled = i === ids.length - 1; });
    if (!drawn[id] && INIT[id]) { drawn[id] = true; INIT[id](); }
    window.scrollTo(0, 0);
  }
  function go(d) { var i = ids.indexOf(location.hash.slice(1)); if (i < 0) i = 0; i = Math.max(0, Math.min(ids.length - 1, i + d)); location.hash = '#' + ids[i]; }
  window.addEventListener('hashchange', function () { show(location.hash.slice(1)); });
  document.querySelectorAll('.phead .prev').forEach(function (b) { b.addEventListener('click', function () { go(-1); }); });
  document.querySelectorAll('.phead .next').forEach(function (b) { b.addEventListener('click', function () { go(1); }); });
  document.addEventListener('keydown', function (e) {
    var t = e.target; if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.tagName === 'SELECT' || t.tagName === 'CANVAS')) return;
    if (e.key === 'ArrowRight') go(1);
    else if (e.key === 'ArrowLeft') go(-1);
    else if (e.key === 'n' || e.key === 'N') toggleAll('details.notes');
    else if (e.key === 'a' || e.key === 'A') toggleAll('details.tn');
  });
  function toggleAll(sel) {
    var s = document.querySelector('.slide.show'); if (!s) return;
    s.querySelectorAll(sel).forEach(function (d) { d.open = !d.open; });
  }

  /* ---------------- 滑桿外觀與讀數 ---------------- */
  function bindRange(id, fmt, cb) {
    var el = $(id); if (!el) return;
    var upd = function () {
      var v = +el.value, p = (v - el.min) / (el.max - el.min) * 100;
      el.style.setProperty('--pct', p + '%');
      var out = $(id + '-v'); if (out) out.textContent = fmt ? fmt(v) : String(v);
      if (cb) cb();
    };
    el.addEventListener('input', upd); upd();
  }
  function bindSeg(id, cb) {
    var g = $(id); if (!g) return;
    var bs = g.querySelectorAll('button');
    bs.forEach(function (b, i) {
      if (i === 0) b.classList.add('on');
      b.addEventListener('click', function () { bs.forEach(function (x) { x.classList.toggle('on', x === b); x.setAttribute('aria-pressed', x === b); }); cb(b.dataset.v); });
    });
  }
  function segVal(id) { var b = document.querySelector('#' + id + ' button.on'); return b ? b.dataset.v : null; }

  /* ---------------- SVG 小工具 ---------------- */
  function el(tag, attrs, parent, text) {
    var e = document.createElementNS(NS, tag);
    for (var k in attrs) e.setAttribute(k, attrs[k]);
    if (text != null) e.textContent = text;
    if (parent) parent.appendChild(e);
    return e;
  }
  // 折線圖：opts = {xs:[min,max], ys:[min,max], series:[{pts:[[x,y]],cls,label,lx}], dark, xlab, ylab, refx, curx, illus}
  function chart(svg, o) {
    while (svg.firstChild) svg.removeChild(svg.firstChild);
    var vb = svg.viewBox.baseVal, W = vb.width, H = vb.height, L = 40, R = 20, T = 30, B = 46;
    var X = function (x) { return L + (x - o.xs[0]) / (o.xs[1] - o.xs[0]) * (W - L - R); };
    var Y = function (y) { return H - B - (y - o.ys[0]) / (o.ys[1] - o.ys[0]) * (H - T - B); };
    var pre = o.dark ? 'tsv-' : 'sv-';
    for (var g = 1; g < 4; g++) el('line', { 'class': pre + 'grid', x1: L, x2: W - R, y1: T + g * (H - T - B) / 4, y2: T + g * (H - T - B) / 4 }, svg);
    el('path', { 'class': pre + 'axis', d: 'M' + L + ' ' + T + ' V' + (H - B) + ' H' + (W - R) }, svg);
    if (o.zero != null) el('line', { 'class': pre + 'grid', x1: L, x2: W - R, y1: Y(0), y2: Y(0), style: 'stroke-width:1.5' }, svg);
    if (o.refx != null) { el('line', { 'class': o.dark ? 'tsv-ref' : 'sv-ref', x1: X(o.refx), x2: X(o.refx), y1: T, y2: H - B }, svg); el('text', { 'class': pre + 'lab', x: X(o.refx), y: T - 8, 'text-anchor': 'middle' }, svg, o.refLabel || 'K'); }
    o.series.forEach(function (s) {
      var d = s.pts.map(function (p, i) { return (i ? 'L' : 'M') + X(p[0]).toFixed(1) + ' ' + Y(p[1]).toFixed(1); }).join(' ');
      var path = el('path', { 'class': (o.dark ? 'tsv-line ' : 'sv-line ') + s.cls, d: d }, svg);
      if (s.step) path.setAttribute('data-step', s.step);
      if (s.label) {
        var lp = s.pts[Math.round((s.lx == null ? 0.85 : s.lx) * (s.pts.length - 1))];
        var t = el('text', { 'class': o.dark ? 'tsv-lab' : 'sv-lab-cjk', x: X(lp[0]), y: Y(lp[1]) + (s.ldy || -12), 'text-anchor': s.anchor || 'middle', style: s.lstyle || '' }, svg, s.label);
        if (s.step) t.setAttribute('data-step', s.step);
      }
    });
    if (o.curx != null) {
      el('line', { 'class': 'tsv-cur', x1: X(o.curx), x2: X(o.curx), y1: T, y2: H - B }, svg);
      if (o.cury != null) el('circle', { 'class': 'tf-cur', cx: X(o.curx), cy: Y(o.cury), r: 6 }, svg);
    }
    el('text', { 'class': o.dark ? 'tsv-lab' : 'sv-lab-cjk', x: W - R, y: H - 10, 'text-anchor': 'end' }, svg, o.xlab || '');
    el('text', { 'class': o.dark ? 'tsv-lab' : 'sv-lab-cjk', x: L + 6, y: T - 8 }, svg, o.ylab || '');
    if (o.illus) el('text', { 'class': o.dark ? 'tsv-lab' : 'sv-lab-cjk', x: W - R, y: T - 8, 'text-anchor': 'end', style: o.dark ? 'fill:var(--t-cursor)' : 'fill:var(--slate)' }, svg, '示意參數');
    return { X: X, Y: Y };
  }
  function ext(pts, pad) {
    var lo = Infinity, hi = -Infinity;
    pts.forEach(function (p) { if (p[1] < lo) lo = p[1]; if (p[1] > hi) hi = p[1]; });
    var d = (hi - lo) || Math.abs(hi) || 1; return [lo - d * (pad || 0.12), hi + d * (pad || 0.12)];
  }

  /* ---------------- 3D 曲面（工具 A）：surface3d.js（three.js），高度只呼叫 LabSVI.impliedVol ---------------- */
  DLab.surfaces = {};
  function surface(host, opts) {
    var sf = window.Surface3D.mount(host, opts);
    DLab.surfaces[host.id] = sf;
    return sf;
  }

  /* ---------------- 逐步標註 ---------------- */
  function steppers() {
    document.querySelectorAll('.stepper').forEach(function (sp) {
      var n = +sp.dataset.n, cur = 1, fig = sp.closest('.fig');
      var cards = sp.querySelectorAll('.card'), ds = sp.querySelectorAll('.sd span');
      var back = sp.querySelector('.sb'), next = sp.querySelector('.sn');
      function upd() {
        cards.forEach(function (c, i) { c.hidden = i !== cur - 1; });
        ds.forEach(function (d, i) { d.classList.toggle('on', i === cur - 1); });
        back.disabled = cur === 1; next.disabled = cur === n;
        var tagged = fig.querySelectorAll('[data-step]');
        var any = fig.querySelector('[data-step="' + cur + '"]');
        tagged.forEach(function (g) { // 該步沒有對應的圖形元素時，全部顯示
          var on = !any || g.getAttribute('data-step') === String(cur);
          g.classList.toggle('dim', !on); g.classList.toggle('undim', on);
        });
      }
      back.addEventListener('click', function () { if (cur > 1) { cur--; upd(); } });
      next.addEventListener('click', function () { if (cur < n) { cur++; upd(); } });
      upd();
    });
  }

  /* ---------------- 各頁的圖與工具 ---------------- */
  var INIT = {};
  INIT.S01 = function () {
    var c = $('a1-stage'); if (!c) return;
    surface(c, { dist: 4.1, onHover: function (v) { $('a1-read').textContent = v == null ? '—' : pct(v); } });
  };
  INIT.S04 = function () {
    var upd = function () {
      var type = segVal('pay-type'), side = segVal('pay-side'), K = +$('pay-k').value, ST = +$('pay-st').value, prem = Math.max(0, +$('pay-prem').value || 0);
      var f = side === 'buyer' ? DLab.buyerProfit : DLab.writerProfit;
      var val = type === 'call' ? DLab.callPayoff(ST, K) : DLab.putPayoff(ST, K), pnl = f(type, ST, K, prem);
      $('pay-val').textContent = val.toFixed(2); $('pay-pnl').textContent = pnl.toFixed(2);
      var pts = range(0, 200, 201).map(function (x) { return [x, f(type, x, K, prem)]; });
      chart($('pay-chart'), { dark: true, xs: [0, 200], ys: ext(pts), zero: 0, series: [{ pts: pts, cls: type === 'call' ? 'tsv-call' : 'tsv-put', label: type === 'call' ? 'Call' : 'Put', lx: 0.95 }],
        refx: K, curx: ST, cury: pnl, xlab: 'S_T', ylab: (side === 'buyer' ? '買方' : '賣方') + '到期損益' });
      var itm = type === 'call' ? ST > K : ST < K, atm = ST === K;
      var led = $('pay-led'); led.className = 'led ' + (atm ? 'atm' : itm ? type : '');
      $('pay-led-nm').textContent = type === 'call' ? 'Call' : 'Put'; $('pay-led-nm').className = type === 'call' ? 'nm-c' : 'nm-p';
      $('pay-led-st').textContent = atm ? '價平' : itm ? '價內' : '價外';
    };
    bindSeg('pay-type', upd); bindSeg('pay-side', upd);
    bindRange('pay-k', null, upd); bindRange('pay-st', null, upd);
    $('pay-prem').addEventListener('input', upd); upd();
  };
  INIT.S06 = function () {
    var upd = function () {
      var S = +$('b1-S').value, K = +$('b1-K').value, T = +$('b1-T').value, r = +$('b1-r').value, s = +$('b1-sig').value;
      $('b1-call').textContent = DLab.bsCall(S, K, T, r, s).toFixed(4); $('b1-put').textContent = DLab.bsPut(S, K, T, r, s).toFixed(4);
    };
    bindRange('b1-S', null, upd); bindRange('b1-K', null, upd); bindRange('b1-T', function (v) { return v.toFixed(2); }, upd);
    bindRange('b1-r', function (v) { return v.toFixed(3); }, upd); bindRange('b1-sig', function (v) { return v.toFixed(2); }, upd); upd();
  };
  INIT.S07 = function () {
    var logs = [];
    var upd = function () {
      var S = +$('b2-S').value, K = +$('b2-K').value, T = +$('b2-T').value, r = +$('b2-r').value, c = +$('b2-cm').value, m = segVal('b2-m');
      var b = DLab.callBounds(S, K, T, r);
      $('b2-lo').textContent = b.lower.toFixed(4); $('b2-hi').textContent = b.upper.toFixed(4);
      var res = m === 'newton' ? DLab.impliedVolNewton(c, S, K, T, r) : DLab.impliedVolBisection(c, S, K, T, r);
      $('b2-sig').textContent = res.ok ? pct(res.sigma) : '無解';
      $('b2-meth').textContent = res.method === 'newton' ? 'Newton 法' : '二分法'; $('b2-it').textContent = String(res.iterations);
      $('b2-led').className = 'led' + (res.ok ? ' on' : ''); $('b2-st').textContent = res.ok ? '有解' : '無解';
      if (res.reason) { logs.push('> ' + res.reason); logs = logs.slice(-6); }
      $('b2-log').textContent = logs.join('\n');
    };
    ['b2-S', 'b2-K'].forEach(function (id) { bindRange(id, null, upd); });
    bindRange('b2-T', function (v) { return v.toFixed(2); }, upd); bindRange('b2-r', function (v) { return v.toFixed(3); }, upd);
    bindSeg('b2-m', upd); $('b2-cm').addEventListener('input', upd);
    // 預設 Newton 法（slides.md：預設 Newton 法）
    document.querySelector('#b2-m button[data-v="newton"]').click();
  };
  INIT.S08 = function () {
    var t = 0.5, ks = range(-0.5, 0.5, 101), atm = DLab.impliedVol(0, t);
    var curve = ks.map(function (k) { return [k, DLab.impliedVol(k, t)]; }), flat = ks.map(function (k) { return [k, atm]; });
    var ys = ext(curve, 0.2);
    chart($('f8-chart'), { xs: [-0.5, 0.5], ys: ys, illus: true, xlab: '履約價（低 → 高）', ylab: '隱含波動率',
      series: [{ pts: flat, cls: 'sv-slate sv-dash', label: 'Black-Scholes 預測', lx: 0.12, ldy: -12, anchor: 'start' },
               { pts: curve, cls: 'sv-navy draw', label: '示意的市場型態', lx: 0.08, ldy: -14, anchor: 'start' }] });
  };
  INIT.S09 = function () {
    var upd = function () {
      var t = +$('a9-t').value, ks = range(-0.5, 0.5, 101), pts = ks.map(function (k) { return [k, DLab.impliedVol(k, t)]; });
      chart($('a9-chart'), { dark: true, xs: [-0.5, 0.5], ys: ext(pts, 0.2), illus: true, series: [{ pts: pts, cls: 'tsv-text' }], xlab: '履約價（低 → 高）', ylab: '隱含波動率' });
      $('a9-lo').textContent = pct(DLab.impliedVol(-0.5, t)); $('a9-hi').textContent = pct(DLab.impliedVol(0.5, t));
    };
    bindRange('a9-t', function (v) { return v.toFixed(2); }, upd);
  };
  INIT.S10 = function () {
    var ts = range(0.1, 2, 96), pts = ts.map(function (t) { return [t, DLab.impliedVol(0, t)]; });
    var y = pts[0][1];
    chart($('a10-chart'), { dark: true, xs: [0.1, 2], ys: [y * 0.5, y * 1.5], illus: true, series: [{ pts: pts, cls: 'tsv-text', label: '價平', lx: 0.5 }], xlab: '到期時間（短 → 長）', ylab: '隱含波動率' });
    $('a10-s').textContent = pct(DLab.impliedVol(0, 0.1)); $('a10-l').textContent = pct(DLab.impliedVol(0, 2));
  };
  INIT.S11 = function () {
    var t = 0.5, ks = range(-0.5, 0.5, 101), pts = ks.map(function (k) { return [k, DLab.impliedVol(k, t)]; });
    var svg = $('f11-chart'), m = chart(svg, { xs: [-0.5, 0.5], ys: ext(pts, 0.35), illus: true, series: [{ pts: pts, cls: 'sv-navy draw' }], xlab: '履約價（低 → 高）', ylab: '隱含波動率' });
    var a = pts[4], b = pts[96];
    var g1 = el('g', { 'data-step': '1' }, svg);
    el('text', { 'class': 'sv-lab-cjk', x: m.X(a[0]) + 6, y: m.Y(a[1]) + 52, style: 'fill:var(--put)' }, g1, '低履約價 put：保護下跌');
    el('path', { d: 'M' + (m.X(a[0]) + 30) + ' ' + (m.Y(a[1]) + 30) + ' L' + (m.X(a[0]) + 4) + ' ' + (m.Y(a[1]) + 6), 'class': 'flow flow-put' }, g1);
    var g2 = el('g', {}, svg);
    el('text', { 'class': 'sv-lab-cjk', x: m.X(b[0]) - 6, y: m.Y(b[1]) - 30, 'text-anchor': 'end', style: 'fill:var(--call)' }, g2, '高履約價 call');
    el('path', { d: 'M' + (m.X(b[0]) - 30) + ' ' + (m.Y(b[1]) - 24) + ' L' + (m.X(b[0]) - 4) + ' ' + (m.Y(b[1]) - 6), 'class': 'flow sv-call' }, g2);
  };
  INIT.S12 = function () {
    var cv = $('a12-stage'), svg = $('a12-chart'), sf = surface(cv, { dist: 4.4, label: '完整隱含波動率曲面（示意參數），可拖曳或用方向鍵旋轉', onHover: function (v) { if (segVal('a12-mode') === '3d') $('a12-read').textContent = v == null ? '—' : pct(v); } });
    // 無套利檢查（F14、F15、F16），網格同曲面
    var minInc = DLab.calendarMinIncrement(sf.K, sf.T), gmin = Infinity;
    sf.T.forEach(function (t) { sf.K.forEach(function (k) { gmin = Math.min(gmin, DLab.butterflyG(k, t)); }); });
    var cond = DLab.ssviConditions(sf.T.map(DLab.thetaT));
    var led = function (id, ok, txt) { $(id).className = 'led' + (ok ? ' on' : ''); $(id).querySelector('b').textContent = txt; };
    led('a12-f14', minInc >= 0, minInc >= 0 ? '無套利' : '有套利');
    led('a12-f15', gmin >= 0, gmin >= 0 ? '無套利' : '有套利');
    led('a12-f16', cond.all, cond.all ? '成立' : '不成立');
    var upd = function () {
      var mode = segVal('a12-mode'), pos = +$('a12-pos').value;
      $('a12-pos').disabled = mode === '3d';
      cv.classList.toggle('sliced', mode !== '3d');
      if (mode === '3d') { sf.setSlice(null); svg.style.display = 'none'; $('a12-pos-v').textContent = '—'; $('a12-read').textContent = '—'; return; }
      svg.style.display = 'block';
      if (mode === 't') {
        var i = Math.round(pos * (sf.T.length - 1)), t = sf.T[i];
        sf.setSlice({ type: 't', idx: i });
        var pts = sf.K.map(function (k) { return [k, DLab.impliedVol(k, t)]; });
        chart(svg, { dark: true, xs: [-0.5, 0.5], ys: ext(pts, 0.2), illus: true, series: [{ pts: pts, cls: 'tsv-text' }], xlab: '履約價（低 → 高）', ylab: '隱含波動率' });
        $('a12-pos-v').textContent = 't ' + t.toFixed(2); $('a12-read').textContent = pct(DLab.impliedVol(0, t)) + '（價平）';
      } else {
        var j = Math.round(pos * (sf.K.length - 1)), k = sf.K[j];
        sf.setSlice({ type: 'k', idx: j });
        var pts2 = sf.T.map(function (t) { return [t, DLab.impliedVol(k, t)]; });
        chart(svg, { dark: true, xs: [0.1, 2], ys: ext(pts2, 0.6), illus: true, series: [{ pts: pts2, cls: 'tsv-text' }], xlab: '到期時間（短 → 長）', ylab: '隱含波動率' });
        $('a12-pos-v').textContent = 'k ' + k.toFixed(3); $('a12-read').textContent = pct(DLab.impliedVol(k, 1));
      }
    };
    bindSeg('a12-mode', upd); bindRange('a12-pos', null, upd);
  };
  INIT.S13 = function () {
    var S = 100, K = 100, T = 1, r = 0.03, sg = range(0.05, 1, 96);
    var cp = sg.map(function (s) { return [s, DLab.bsCall(S, K, T, r, s)]; }), pp = sg.map(function (s) { return [s, DLab.bsPut(S, K, T, r, s)]; });
    var upd = function () {
      var s = +$('b3-sig').value, c = DLab.bsCall(S, K, T, r, s);
      $('b3-call').textContent = c.toFixed(4); $('b3-put').textContent = DLab.bsPut(S, K, T, r, s).toFixed(4);
      $('b3-vega').textContent = DLab.vegaPerPoint(S, K, T, r, s).toFixed(4);
      chart($('b3-chart'), { dark: true, xs: [0.05, 1], ys: ext(cp.concat(pp), 0.08), series: [{ pts: cp, cls: 'tsv-call', label: 'Call', lx: 0.9, ldy: -14 }, { pts: pp, cls: 'tsv-put', label: 'Put', lx: 0.9, ldy: 30 }],
        curx: s, cury: c, xlab: 'σ', ylab: '價格' });
    };
    bindRange('b3-sig', function (v) { return v.toFixed(2); }, upd);
  };
  INIT.S15 = function () {
    var S = 100, T = 1, r = 0.03, N = 1000;
    var upd = function () {
      var s = +$('d-sig').value, K = +$('d-K').value;
      var c = DLab.elnFairCoupon(S, K, T, r, s, N), p = DLab.elnFairCouponParts(S, K, T, r, s, N);
      $('d-c').textContent = c.toFixed(2); $('d-int').textContent = p.interest.toFixed(2); $('d-put').textContent = p.putPremium.toFixed(2);
      $('d-V').textContent = DLab.elnValue(S, K, T, r, s, N, c).toFixed(2);
      $('d-bar1').style.width = (p.interest / c * 100) + '%'; $('d-bar2').style.width = (p.putPremium / c * 100) + '%';
      var pts = range(0, 150, 151).map(function (x) { return [x, DLab.elnPayoff(x, N, c, K)]; });
      chart($('d-chart'), { dark: true, xs: [0, 150], ys: [0, ext(pts, 0.1)[1]], series: [{ pts: pts, cls: 'tsv-text' }], refx: K, xlab: 'S_T', ylab: '到期報償' });
    };
    bindRange('d-sig', function (v) { return v.toFixed(2); }, upd); bindRange('d-K', null, upd);
  };
  INIT.S18 = function () {
    var fs = Array.prototype.slice.call(document.querySelectorAll('#quiz fieldset')), cur = 0, res = {};
    var goals = fs.map(function (f) { return f.querySelector('.qtag').textContent.match(/L\d/)[0]; });
    function upd() {
      fs.forEach(function (f, i) { f.classList.toggle('cur', i === cur); });
      $('q-prog').textContent = 'Q' + (cur + 1) + ' / ' + fs.length;
      var n = Object.keys(res).length, ok = Object.keys(res).filter(function (k) { return res[k]; }).length;
      $('q-score').textContent = ok + ' / ' + fs.length;
      var g = {}; goals.forEach(function (l, i) { if (!g[l]) g[l] = [0, 0]; g[l][1]++; if (res[i]) g[l][0]++; });
      $('q-goals').textContent = n === fs.length ? Object.keys(g).sort().map(function (l) { return '> ' + l + '：' + g[l][0] + ' / ' + g[l][1]; }).join('\n') : '';
      $('q-next').disabled = cur === fs.length - 1;
    }
    fs.forEach(function (f, i) {
      f.querySelectorAll('input').forEach(function (inp) {
        inp.addEventListener('change', function () {
          var ok = +inp.value === +f.dataset.ans; res[i] = ok;
          var fb = f.querySelector('.fb'); fb.className = 'fb ' + (ok ? 'ok' : 'ng');
          fb.firstChild.textContent = (ok ? '答對。' : '答錯。') + '正確答案：' + 'ABC'[+f.dataset.ans];
          upd();
        });
      });
    });
    $('q-next').addEventListener('click', function () { if (cur < fs.length - 1) { cur++; upd(); } });
    upd();
  };

  function boot() {
    if (window.renderMathInElement) {
      renderMathInElement(document.body, { delimiters: [{ left: '\\[', right: '\\]', display: true }, { left: '\\(', right: '\\)', display: false }], throwOnError: false });
    }
    steppers();
    document.querySelectorAll('.draw').forEach(function (p) { if (p.getTotalLength) p.style.setProperty('--len', Math.ceil(p.getTotalLength())); });
    show(location.hash.slice(1) || ids[0]);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
})();
