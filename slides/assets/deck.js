/*
 * slides/assets/deck.js — run v1 / N5
 * 導覽、圖表與互動工具。所有數值都呼叫 lab/*.js（經 C3 測試）的 DLab 函式，這裡不重寫任何公式。
 * 這裡出現的數字只有：顯示設定（滑桿範圍、初始示意輸入、座標軸範圍）與 wiki 範例數字（標註出處）。
 */
(function () {
  'use strict';
  var L = window.DLab;
  var css = getComputedStyle(document.documentElement);
  function tok(n) { return css.getPropertyValue(n).trim(); }
  function $(id) { return document.getElementById(id); }
  var NS = 'http://www.w3.org/2000/svg';
  function el(tag, attrs, text) {
    var e = document.createElementNS(NS, tag);
    for (var k in attrs) e.setAttribute(k, attrs[k]);
    if (text != null) e.textContent = text;
    return e;
  }
  function f2(x) { return isFinite(x) ? x.toFixed(2) : '—'; }
  function f4(x) { return isFinite(x) ? x.toFixed(4) : '—'; }
  function pct(x) { return isFinite(x) ? (x * 100).toFixed(2) + '%' : '—'; }
  function setPct(input) {
    var p = (input.value - input.min) / (input.max - input.min) * 100;
    input.style.setProperty('--pct', p + '%');
  }
  function log(box, html) {
    if (!box) return;
    var d = document.createElement('div'); d.innerHTML = '&gt; ' + html; box.appendChild(d);
    while (box.children.length > 4) box.removeChild(box.firstChild);
  }

  /* ───────── 導覽 ───────── */
  var slides = Array.prototype.slice.call(document.querySelectorAll('.slide'));
  var dots = $('dots'), cur = 0, drawn = {};
  slides.forEach(function (s, i) {
    var b = document.createElement('button');
    b.type = 'button'; b.setAttribute('aria-label', '第 ' + (i + 1) + ' 頁');
    b.addEventListener('click', function () { go(i); });
    dots.appendChild(b);
  });
  function go(i, noHash) {
    cur = Math.max(0, Math.min(slides.length - 1, i));
    slides.forEach(function (s, j) { s.classList.toggle('show', j === cur); });
    Array.prototype.forEach.call(dots.children, function (b, j) {
      b.classList.toggle('now', j === cur);
      if (j === cur) b.setAttribute('aria-current', 'page'); else b.removeAttribute('aria-current');
    });
    $('prev').disabled = cur === 0; $('next').disabled = cur === slides.length - 1;
    if (!noHash && location.hash !== '#' + slides[cur].id) history.replaceState(null, '', '#' + slides[cur].id);
    var id = slides[cur].id;
    if (!drawn[id] && INIT[id]) { INIT[id](); drawn[id] = true; }
    window.scrollTo(0, 0);
  }
  $('prev').addEventListener('click', function () { go(cur - 1); });
  $('next').addEventListener('click', function () { go(cur + 1); });
  document.addEventListener('keydown', function (e) {
    var t = e.target.tagName;
    if (t === 'INPUT' || t === 'SELECT' || t === 'TEXTAREA' || (e.target.classList && e.target.classList.contains('surf'))) return;
    var k = e.key;
    if (k === 'ArrowRight') go(cur + 1);
    else if (k === 'ArrowLeft') go(cur - 1);
    else if (k === 'n' || k === 'N') { var n = slides[cur].querySelector('.notes'); if (n) n.open = !n.open; }
    else if (k === 'a' || k === 'A') { var a = slides[cur].querySelector('.tn'); if (a) a.open = !a.open; }
  });
  window.addEventListener('hashchange', function () { goHash(); });
  function goHash() {
    var h = location.hash.replace('#', '');
    var i = slides.findIndex(function (s) { return s.id === h; });
    go(i >= 0 ? i : 0, true);
  }

  /* ───────── 共用：2D 圖（終端機與淺色） ───────── */
  function chart(svg, o) {
    // o: {xMin,xMax,yMin,yMax, series:[{cls, pts:[[x,y]]}], xTicks:[[v,label]], yTicks:[[v,label]], vlines:[{x,cls}], cursor:{x,y}, xLabel, yLabel, pad}
    while (svg.firstChild) svg.removeChild(svg.firstChild);
    var vb = svg.viewBox.baseVal, W = vb.width, H = vb.height;
    var pl = 46, pr = 12, pt = 12, pb = 34;
    function X(x) { return pl + (x - o.xMin) / (o.xMax - o.xMin) * (W - pl - pr); }
    function Y(y) { return H - pb - (y - o.yMin) / (o.yMax - o.yMin) * (H - pt - pb); }
    (o.yTicks || []).forEach(function (t) {
      svg.appendChild(el('line', { 'class': o.gridCls || 'gr', x1: pl, x2: W - pr, y1: Y(t[0]), y2: Y(t[0]) }));
      svg.appendChild(el('text', { x: pl - 6, y: Y(t[0]) + 4, 'text-anchor': 'end' }, t[1]));
    });
    (o.xTicks || []).forEach(function (t) {
      svg.appendChild(el('text', { x: X(t[0]), y: H - pb + 16, 'text-anchor': 'middle' }, t[1]));
    });
    svg.appendChild(el('line', { 'class': o.axCls || 'ax', x1: pl, x2: W - pr, y1: H - pb, y2: H - pb }));
    svg.appendChild(el('line', { 'class': o.axCls || 'ax', x1: pl, x2: pl, y1: pt, y2: H - pb }));
    if (o.zeroLine && o.yMin < 0 && o.yMax > 0) svg.appendChild(el('line', { 'class': o.axCls || 'ax', x1: pl, x2: W - pr, y1: Y(0), y2: Y(0) }));
    (o.vlines || []).forEach(function (v) {
      svg.appendChild(el('line', { 'class': v.cls, x1: X(v.x), x2: X(v.x), y1: pt, y2: H - pb }));
      if (v.label) svg.appendChild(el('text', { x: X(v.x) + 4, y: pt + 10 }, v.label));
    });
    (o.series || []).forEach(function (s) {
      var d = s.pts.map(function (p, i) { return (i ? 'L' : 'M') + X(p[0]).toFixed(1) + ' ' + Y(p[1]).toFixed(1); }).join(' ');
      svg.appendChild(el('path', { 'class': s.cls, d: d }));
      if (s.label) svg.appendChild(el('text', { 'class': s.tcls || '', x: X(s.label[0]), y: Y(s.label[1]) - 6, 'text-anchor': 'middle' }, s.label[2]));
    });
    if (o.cursor) {
      svg.appendChild(el('line', { 'class': 'cur', x1: X(o.cursor.x), x2: X(o.cursor.x), y1: pt, y2: H - pb }));
      (o.cursor.ys || []).forEach(function (y) { svg.appendChild(el('rect', { 'class': 'curd', x: X(o.cursor.x) - 4, y: Y(y) - 4, width: 8, height: 8 })); });
    }
    if (o.xLabel) svg.appendChild(el('text', { x: W - pr, y: H - 4, 'text-anchor': 'end' }, o.xLabel));
    if (o.yLabel) svg.appendChild(el('text', { x: pl + 6, y: pt + 10 }, o.yLabel));
  }
  function range(a, b, n) { var r = []; for (var i = 0; i <= n; i++) r.push(a + (b - a) * i / n); return r; }

  /* ───────── 共用：滑桿組 ───────── */
  function sliders(box, defs, onchange) {
    var vals = {};
    defs.forEach(function (d) {
      var row = document.createElement('div');
      row.innerHTML = '<div class="tl"><label for="' + d.id + '">' + d.label + '</label><span class="tv" id="' + d.id + '-v"></span></div>' +
        '<input id="' + d.id + '" type="range" min="' + d.min + '" max="' + d.max + '" step="' + d.step + '" value="' + d.value + '">';
      box.appendChild(row);
      var inp = row.querySelector('input');
      var show = function () { vals[d.key] = +inp.value; $(d.id + '-v').textContent = d.fmt ? d.fmt(+inp.value) : inp.value; setPct(inp); };
      inp.addEventListener('input', function () { show(); onchange(vals, d.key); });
      show();
    });
    return vals;
  }
  var BS_DEFS = function (p) {
    return [
      { id: p + '-S', key: 'S', label: 'S 標的現價', min: 50, max: 150, step: 1, value: 100 },
      { id: p + '-K', key: 'K', label: 'K 履約價', min: 50, max: 150, step: 1, value: 100 },
      { id: p + '-T', key: 'T', label: 'T 到期時間（年）', min: 0.05, max: 3, step: 0.05, value: 1, fmt: function (v) { return v.toFixed(2); } },
      { id: p + '-r', key: 'r', label: 'r 無風險利率', min: 0, max: 0.10, step: 0.005, value: 0.05, fmt: pct },
      { id: p + '-sig', key: 'sigma', label: 'σ 波動率', min: 0.05, max: 1, step: 0.01, value: 0.2, fmt: pct }
    ];
  };

  /* ───────── 3D 曲面（canvas，畫家演算法） ───────── */
  function hexRgb(h) { h = h.replace('#', ''); return [parseInt(h.substr(0, 2), 16), parseInt(h.substr(2, 2), 16), parseInt(h.substr(4, 2), 16)]; }
  function surface(canvas, o) {
    // o: {iv(k,t), kMin,kMax,tMin,tMax,nk,nt, lo,hi, yaw,pitch, light}
    var ctx = canvas.getContext('2d'), W = canvas.width, H = canvas.height;
    var c0 = hexRgb(tok('--surf-lo')), c1 = hexRgb(tok('--call-dk'));
    var grid = [], i, j;
    for (i = 0; i <= o.nk; i++) {
      grid.push([]);
      for (j = 0; j <= o.nt; j++) {
        var k = o.kMin + (o.kMax - o.kMin) * i / o.nk, t = o.tMin + (o.tMax - o.tMin) * j / o.nt;
        grid[i].push({ k: k, t: t, v: o.iv(k, t) });
      }
    }
    function draw() {
      var cy = Math.cos(o.yaw), sy = Math.sin(o.yaw), cp = Math.cos(o.pitch), sp = Math.sin(o.pitch);
      var sc = Math.min(W, H) * 0.36;
      function P(k, t, v) {
        var x = (k - (o.kMin + o.kMax) / 2) / (o.kMax - o.kMin) * 2;
        var z = (t - (o.tMin + o.tMax) / 2) / (o.tMax - o.tMin) * 2;
        var y = ((v - o.lo) / (o.hi - o.lo) - 0.5) * 1.1;
        var x1 = x * cy - z * sy, z1 = x * sy + z * cy;
        var y2 = y * cp - z1 * sp, z2 = y * sp + z1 * cp;
        return { x: W / 2 + x1 * sc, y: H * 0.52 - y2 * sc, d: z2 };
      }
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = tok(o.bg || '--t-pane'); ctx.fillRect(0, 0, W, H);
      var quads = [];
      for (i = 0; i < o.nk; i++) for (j = 0; j < o.nt; j++) {
        var a = grid[i][j], b = grid[i + 1][j], c = grid[i + 1][j + 1], d = grid[i][j + 1];
        var pa = P(a.k, a.t, a.v), pb = P(b.k, b.t, b.v), pc = P(c.k, c.t, c.v), pd = P(d.k, d.t, d.v);
        quads.push({ p: [pa, pb, pc, pd], d: (pa.d + pb.d + pc.d + pd.d) / 4, v: (a.v + b.v + c.v + d.v) / 4 });
      }
      quads.sort(function (q1, q2) { return q2.d - q1.d; });
      ctx.lineWidth = 0.6; ctx.strokeStyle = tok('--t-line-2');
      quads.forEach(function (q) {
        var u = Math.max(0, Math.min(1, (q.v - o.lo) / (o.hi - o.lo)));
        ctx.fillStyle = 'rgb(' + c0.map(function (x, n) { return Math.round(x + (c1[n] - x) * u); }).join(',') + ')';
        ctx.beginPath(); ctx.moveTo(q.p[0].x, q.p[0].y);
        for (var n = 1; n < 4; n++) ctx.lineTo(q.p[n].x, q.p[n].y);
        ctx.closePath(); ctx.fill(); ctx.stroke();
      });
      // 軸
      ctx.strokeStyle = tok('--t-muted'); ctx.lineWidth = 1; ctx.fillStyle = tok('--t-muted');
      ctx.font = '12px ' + tok('--mono');
      var o0 = P(o.kMin, o.tMin, o.lo), ok = P(o.kMax, o.tMin, o.lo), ot = P(o.kMin, o.tMax, o.lo), ov = P(o.kMin, o.tMin, o.hi);
      [[ok, o.xLabel], [ot, o.zLabel], [ov, o.yLabel]].forEach(function (a) {
        ctx.beginPath(); ctx.moveTo(o0.x, o0.y); ctx.lineTo(a[0].x, a[0].y); ctx.stroke();
        ctx.fillText(a[1], a[0].x + 4, a[0].y + 4);
      });
      if (o.note) { ctx.fillStyle = tok('--t-cursor'); ctx.fillText(o.note, 8, 16); }
    }
    // 互動：拖曳、鍵盤
    if (o.rotate) {
      var drag = null;
      canvas.addEventListener('pointerdown', function (e) { drag = { x: e.clientX, y: e.clientY, yaw: o.yaw, pitch: o.pitch }; canvas.setPointerCapture(e.pointerId); });
      canvas.addEventListener('pointermove', function (e) {
        if (!drag) return;
        o.yaw = drag.yaw + (e.clientX - drag.x) * 0.01;
        o.pitch = Math.max(0.1, Math.min(1.3, drag.pitch + (e.clientY - drag.y) * 0.01));
        draw();
      });
      canvas.addEventListener('pointerup', function () { drag = null; });
      canvas.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowLeft') { o.yaw -= 0.1; draw(); e.preventDefault(); }
        if (e.key === 'ArrowRight') { o.yaw += 0.1; draw(); e.preventDefault(); }
        if (e.key === 'ArrowUp') { o.pitch = Math.min(1.3, o.pitch + 0.05); draw(); e.preventDefault(); }
        if (e.key === 'ArrowDown') { o.pitch = Math.max(0.1, o.pitch - 0.05); draw(); e.preventDefault(); }
      });
    }
    draw();
    return { draw: draw };
  }
  // 顯示範圍（顯示設定）
  var KR = [-0.6, 0.4], TR = [0.1, 2];
  function ivRange() {
    var lo = Infinity, hi = -Infinity;
    range(KR[0], KR[1], 20).forEach(function (k) { range(TR[0], TR[1], 20).forEach(function (t) { var v = L.impliedVol(k, t); if (v < lo) lo = v; if (v > hi) hi = v; }); });
    return [lo, hi];
  }
  function surfOpts(extra) {
    var r = ivRange();
    var o = { iv: function (k, t) { return L.impliedVol(k, t); }, kMin: KR[0], kMax: KR[1], tMin: TR[0], tMax: TR[1], nk: 24, nt: 18,
      lo: r[0], hi: r[1], yaw: -0.6, pitch: 0.55, rotate: true, xLabel: '履約價 K →', zLabel: '到期時間 T', yLabel: '隱含波動率' };
    for (var k in extra) o[k] = extra[k];
    return o;
  }

  /* ───────── 各頁初始化 ───────── */
  var INIT = {};

  INIT.S01 = function () {
    var svg = $('waves'), d = '';
    for (var i = 0; i < 40; i++) {
      var amp = 40 + i * 2.2, ph = i * 0.11, y0 = 380 + i * 4.5, p = 'M0 ' + (y0 + Math.sin(ph) * amp).toFixed(1);
      for (var px = 20; px <= 1280; px += 20) { var py = y0 + Math.sin(px / 210 + ph) * amp + Math.sin(px / 97 + ph * 1.7) * amp * 0.35 - px * 0.18; p += ' L' + px + ' ' + py.toFixed(1); }
      d += '<path d="' + p + '"/>';
    }
    svg.innerHTML = d;
    surface($('surf-s01'), surfOpts({ note: '示意參數' }));
  };

  INIT.S03 = function () {
    var svg = $('fig3-svg');
    var steps = [
      ['價平', '標的現價等於履約價（S1, p.13）', 200],
      ['價內', 'Call 價內：現價高於履約價；put 價內：現價低於履約價（S1, p.13）', 300],
      ['價外', '價外：call 的履約價高於現價，或 put 的履約價低於現價（S1, p.14）', 100],
      ['例子', '例：XYZ 股價 $43 時，XYZ 40 call 價內 $3（S1, p.13）', 260]
    ];
    svg.appendChild(el('rect', { x: 200, y: 22, width: 180, height: 26, 'class': 'tc', opacity: 0.13 }));
    svg.appendChild(el('rect', { x: 20, y: 22, width: 180, height: 26, 'class': 'tp', opacity: 0.13 }));
    svg.appendChild(el('text', { x: 290, y: 40, 'text-anchor': 'middle', 'class': 'tc' }, 'S > K：call 價內'));
    svg.appendChild(el('text', { x: 110, y: 40, 'text-anchor': 'middle', 'class': 'tp' }, 'S < K：put 價內'));
    svg.appendChild(el('line', { 'class': 'axis', x1: 20, x2: 380, y1: 60, y2: 60 }));
    svg.appendChild(el('line', { 'class': 'kref', x1: 200, x2: 200, y1: 14, y2: 76 }));
    var kt = el('text', { 'class': 'tk', x: 200, y: 92, 'text-anchor': 'middle' }, 'K');
    svg.appendChild(kt);
    var sm = el('g', {});
    sm.appendChild(el('line', { x1: 0, x2: 0, y1: 52, y2: 68, stroke: tok('--navy'), 'stroke-width': 2 }));
    var st = el('text', { 'class': 'tk', x: 0, y: 106, 'text-anchor': 'middle' }, 'S');
    sm.appendChild(st);
    svg.appendChild(sm);
    var dotsBox = $('fig3-dots'), stp = 0;
    steps.forEach(function () { dotsBox.appendChild(document.createElement('i')); });
    function show(n) {
      stp = Math.max(0, Math.min(steps.length - 1, n));
      $('fig3-h').textContent = steps[stp][0]; $('fig3-p').textContent = steps[stp][1];
      sm.setAttribute('transform', 'translate(' + steps[stp][2] + ',0)');
      kt.textContent = stp === 3 ? 'K = $40' : 'K';
      st.textContent = stp === 3 ? 'S = $43' : 'S';
      Array.prototype.forEach.call(dotsBox.children, function (d, i) { d.classList.toggle('now', i === stp); });
      $('fig3-back').disabled = stp === 0; $('fig3-next').disabled = stp === steps.length - 1;
    }
    $('fig3-back').addEventListener('click', function () { show(stp - 1); });
    $('fig3-next').addEventListener('click', function () { show(stp + 1); });
    show(0);
  };

  INIT.S04 = function () {
    // Fig. 4.1：XYZ 50 call 權利金 4（S1, p.64）、XYZ 50 put 權利金 3（S1, p.65）
    var svg = $('fig4-svg');
    function mini(x0, type, prem) {
      var w = 185, h = 150, y0 = 14, xs = range(30, 70, 40);
      function X(s) { return x0 + 22 + (s - 30) / 40 * (w - 30); }
      function Y(v) { return y0 + h - (v + 6) / 24 * h; }
      svg.appendChild(el('line', { 'class': 'axis', x1: X(30), x2: X(70), y1: Y(0), y2: Y(0) }));
      svg.appendChild(el('line', { 'class': 'axis', x1: X(30), x2: X(30), y1: Y(18), y2: Y(-6) }));
      svg.appendChild(el('line', { 'class': 'kref', x1: X(50), x2: X(50), y1: Y(18), y2: Y(-6) }));
      var fn = type === 'c' ? L.callBuyerPnL : L.putBuyerPnL;
      var d = xs.map(function (s, i) { return (i ? 'L' : 'M') + X(s).toFixed(1) + ' ' + Y(fn(s, 50, prem)).toFixed(1); }).join(' ');
      svg.appendChild(el('path', { 'class': type === 'c' ? 'lc' : 'lp', d: d }));
      svg.appendChild(el('text', { x: X(50), y: y0 + h + 14, 'text-anchor': 'middle', 'class': 'tk' }, 'K = $50'));
      svg.appendChild(el('text', { x: X(30) + 4, y: Y(0) - 4 }, '0'));
      svg.appendChild(el('text', { x: X(type === 'c' ? 68 : 32), y: Y(-prem) + 14, 'text-anchor': type === 'c' ? 'end' : 'start', 'class': type === 'c' ? 'tc' : 'tp' }, '−$' + prem));
      svg.appendChild(el('text', { x: x0 + w / 2, y: y0 + h + 32, 'text-anchor': 'middle', 'class': type === 'c' ? 'tc' : 'tp' }, type === 'c' ? 'XYZ 50 call' : 'XYZ 50 put'));
    }
    mini(0, 'c', 4); mini(205, 'p', 3);

    // 損益滑桿
    var st = $('pay-st'), k = $('pay-k'), pc = $('pay-pc'), pp = $('pay-pp');
    function upd() {
      var S = +st.value, K = +k.value, Pc = Math.max(0, +pc.value || 0), Pp = Math.max(0, +pp.value || 0);
      setPct(st); setPct(k);
      $('pay-st-v').textContent = '$' + S.toFixed(1); $('pay-k-v').textContent = '$' + K;
      var c = L.callBuyerPnL(S, K, Pc), p = L.putBuyerPnL(S, K, Pp);
      $('pay-c').textContent = (c >= 0 ? '+' : '') + f2(c); $('pay-p').textContent = (p >= 0 ? '+' : '') + f2(p);
      function led(id, type) {
        var e = $(id), itm = type === 'c' ? S > K : S < K;
        e.className = 'led' + (S === K ? '' : itm ? ' ok' : '');
        e.querySelector('b').textContent = S === K ? 'ATM 價平' : itm ? 'ITM 價內' : 'OTM 價外';
      }
      led('pay-cs', 'c'); led('pay-ps', 'p');
      var xs = range(20, 80, 60);
      chart($('pay-chart'), { xMin: 20, xMax: 80, yMin: -20, yMax: 40, zeroLine: true,
        yTicks: [[-20, '−20'], [0, '0'], [20, '20'], [40, '40']], xTicks: [[20, '20'], [50, '50'], [80, '80']],
        vlines: [{ x: K, cls: 'k', label: 'K' }],
        series: [{ cls: 'lc', pts: xs.map(function (s) { return [s, L.callBuyerPnL(s, K, Pc)]; }) },
                 { cls: 'lp', pts: xs.map(function (s) { return [s, L.putBuyerPnL(s, K, Pp)]; }) }],
        cursor: { x: S, ys: [c, p] }, xLabel: 'S_T', yLabel: '損益' });
    }
    [st, k, pc, pp].forEach(function (e) { e.addEventListener('input', upd); });
    upd();
  };

  INIT.S06 = function () {
    var box = $('b1-log'), last = '';
    var v = sliders($('b1-in'), BS_DEFS('b1'), function () { upd(); });
    function upd() {
      var c = L.bsCall(v.S, v.K, v.T, v.r, v.sigma), p = L.bsPut(v.S, v.K, v.T, v.r, v.sigma);
      $('b1-call').textContent = f4(c); $('b1-put').textContent = f4(p);
      var line = 'S=' + v.S + ' K=' + v.K + ' σ=' + pct(v.sigma) + ' → <span class="c">C ' + f4(c) + '</span>';
      if (line !== last) { log(box, line); last = line; }
    }
    upd();
  };

  INIT.S07 = function () {
    var defs = BS_DEFS('b2').slice(0, 4), method = 'bisection', cm = $('b2-cm');
    var v = sliders($('b2-in'), defs, function () { upd(); });
    cm.value = L.bsCall(v.S, v.K, v.T, v.r, 0.2).toFixed(4); // 示意輸入：以 σ = 20% 算出的 call 價格
    Array.prototype.forEach.call(document.querySelectorAll('#S07 .tseg button'), function (b) {
      b.addEventListener('click', function () {
        method = b.dataset.m;
        Array.prototype.forEach.call(b.parentNode.children, function (x) { x.setAttribute('aria-pressed', String(x === b)); });
        upd();
      });
    });
    cm.addEventListener('input', upd);
    function upd() {
      var c = +cm.value, b = L.callPriceBounds(v.S, v.K, v.T, v.r);
      $('b2-bounds').textContent = f4(b.lower) + ' < C_mkt < ' + f4(b.upper);
      var r = method === 'newton' ? L.impliedVolNewton(c, v.S, v.K, v.T, v.r) : L.impliedVolBisection(c, v.S, v.K, v.T, v.r);
      var led = $('b2-st');
      if (isFinite(r.sigma)) {
        $('b2-sig').textContent = pct(r.sigma);
        led.className = 'led ok'; led.querySelector('b').textContent = r.method + ' · ' + r.iterations + ' 次';
      } else {
        $('b2-sig').textContent = '無解';
        led.className = 'led bad'; led.querySelector('b').textContent = '市價超出上下界';
      }
      log($('b2-log'), 'C_mkt=' + f4(c) + ' → σ̂=' + (isFinite(r.sigma) ? pct(r.sigma) : '無解'));
    }
    upd();
  };

  INIT.S08 = function () {
    var r = ivRange();
    var s0 = L.SSVI_PARAMS.sigma0;
    surface($('surf-flat'), surfOpts({ iv: function () { return s0; }, lo: r[0], hi: r[1], rotate: false, nk: 12, nt: 10, xLabel: 'K', zLabel: 'T', yLabel: 'IV' }));
    surface($('surf-mkt'), surfOpts({ lo: r[0], hi: r[1], rotate: false, nk: 12, nt: 10, xLabel: 'K', zLabel: 'T', yLabel: 'IV', note: '示意參數' }));
  };

  function sliceT(svg, t, kLabels) {
    var ks = range(KR[0], KR[1], 60), ivs = ks.map(function (k) { return L.impliedVol(k, t) * 100; });
    var lo = Math.floor(Math.min.apply(null, ivs) - 1), hi = Math.ceil(Math.max.apply(null, ivs) + 1);
    chart(svg, { xMin: KR[0], xMax: KR[1], yMin: lo, yMax: hi,
      yTicks: [[lo, lo + '%'], [(lo + hi) / 2, ((lo + hi) / 2).toFixed(1) + '%'], [hi, hi + '%']],
      xTicks: kLabels || [[KR[0], '低履約價'], [0, '價平'], [KR[1], '高履約價']],
      vlines: [{ x: 0, cls: 'k' }], series: [{ cls: 'ln', pts: ks.map(function (k, i) { return [k, ivs[i]]; }) }],
      xLabel: '', yLabel: 'IV' });
  }
  function sliceK(svg, k) {
    var ts = range(TR[0], TR[1], 60), ivs = ts.map(function (t) { return L.impliedVol(k, t) * 100; });
    var lo = Math.floor(Math.min.apply(null, ivs) - 1), hi = Math.ceil(Math.max.apply(null, ivs) + 1);
    chart(svg, { xMin: TR[0], xMax: TR[1], yMin: lo, yMax: hi,
      yTicks: [[lo, lo + '%'], [hi, hi + '%']], xTicks: [[TR[0], TR[0]], [1, '1'], [TR[1], TR[1]]],
      series: [{ cls: 'ln', pts: ts.map(function (t, i) { return [t, ivs[i]]; }) }], xLabel: 'T（年）', yLabel: 'IV' });
  }

  INIT.S09 = function () {
    var sel = $('a9-t-sel');
    function upd() {
      var t = +sel.value;
      sliceT($('a9-chart'), t);
      $('a9-lo').textContent = pct(L.impliedVol(-0.3, t)); $('a9-atm').textContent = pct(L.impliedVol(0, t)); $('a9-hi').textContent = pct(L.impliedVol(0.3, t));
    }
    sel.addEventListener('change', upd); upd();
  };

  INIT.S10 = function () {
    var sel = $('a10-k-sel');
    function upd() {
      var k = +sel.value;
      sliceK($('a10-chart'), k);
      $('a10-s').textContent = pct(L.impliedVol(k, TR[0])); $('a10-l').textContent = pct(L.impliedVol(k, TR[1]));
    }
    sel.addEventListener('change', upd); upd();
  };

  INIT.S12 = function () {
    var cv = $('surf-s12'), ch = $('a12-chart'), sel = $('a12-sel'), view = '3d';
    surface(cv, surfOpts({ note: '示意參數' }));
    // 無套利檢查（F14、F15、F16），網格為顯示設定
    var kg = range(KR[0], KR[1], 50), tg = range(TR[0], TR[1], 38);
    var inc = L.calendarMinIncrement(kg, tg);
    var gmin = Infinity; [0.25, 0.5, 1, 2].forEach(function (t) { kg.forEach(function (k) { var g = L.butterflyG(k, t); if (g < gmin) gmin = g; }); });
    var cond = L.ssviConditions(tg.map(function (t) { return L.thetaT(t); }));
    function led(id, ok, txt) { var e = $(id); e.className = 'led ' + (ok ? 'ok' : 'bad'); e.querySelector('b').textContent = (ok ? '通過 · ' : '不通過 · ') + txt; }
    led('a12-f14', inc >= 0, 'w 最小增量 ' + inc.toExponential(2));
    led('a12-f15', gmin >= 0, 'g(k) 最小 ' + gmin.toFixed(3));
    led('a12-f16', cond.all, cond.all ? '四個條件成立' : '有條件不成立');
    function setView(v) {
      view = v;
      Array.prototype.forEach.call(document.querySelectorAll('#S12 .tseg button'), function (b) { b.setAttribute('aria-pressed', String(b.dataset.v === v)); });
      cv.hidden = v !== '3d'; ch.hidden = v === '3d'; sel.disabled = v === '3d';
      sel.innerHTML = v === 't' ? ['0.25', '0.5', '1', '2'].map(function (t) { return '<option value="' + t + '"' + (t === '1' ? ' selected' : '') + '>T = ' + t + ' 年</option>'; }).join('')
        : v === 'k' ? ['-0.3', '-0.15', '0', '0.15', '0.3'].map(function (k) { return '<option value="' + k + '"' + (k === '0' ? ' selected' : '') + '>k = ' + k + '</option>'; }).join('') : '';
      draw2d();
      log($('a12-log'), '檢視：' + (v === '3d' ? '3D 曲面' : v === 't' ? '固定到期日' : '固定 k'));
    }
    function draw2d() {
      if (view === 't') sliceT(ch, +sel.value, [[KR[0], 'k = ' + KR[0]], [0, 'k = 0'], [KR[1], 'k = ' + KR[1]]]);
      if (view === 'k') sliceK(ch, +sel.value);
    }
    Array.prototype.forEach.call(document.querySelectorAll('#S12 .tseg button'), function (b) { b.addEventListener('click', function () { setView(b.dataset.v); }); });
    sel.addEventListener('change', draw2d);
    setView('3d');
  };

  INIT.S13 = function () {
    var S = 100, K = 100, T = 1, r = 0.05; // 顯示設定（示意輸入）
    var sig = $('b3-sig');
    $('b3-fixed').textContent = 'S=' + S + ' K=' + K + ' T=' + T + ' r=' + pct(r);
    var ss = range(0.05, 1, 60);
    function upd() {
      var s = +sig.value; setPct(sig); $('b3-sig-v').textContent = pct(s);
      var c = L.bsCall(S, K, T, r, s), p = L.bsPut(S, K, T, r, s);
      $('b3-call').textContent = f4(c); $('b3-put').textContent = f4(p); $('b3-vega').textContent = f4(L.vegaPct(S, K, T, r, s));
      chart($('b3-chart'), { xMin: 0.05, xMax: 1, yMin: 0, yMax: 45, yTicks: [[0, '0'], [20, '20'], [40, '40']],
        xTicks: [[0.05, '5%'], [0.5, '50%'], [1, '100%']],
        series: [{ cls: 'lc', pts: ss.map(function (x) { return [x, L.bsCall(S, K, T, r, x)]; }), label: [0.9, L.bsCall(S, K, T, r, 0.9), 'CALL'], tcls: 'tc' },
                 { cls: 'lp', pts: ss.map(function (x) { return [x, L.bsPut(S, K, T, r, x)]; }), label: [0.7, L.bsPut(S, K, T, r, 0.7), 'PUT'], tcls: 'tp' }],
        cursor: { x: s, ys: [c, p] }, xLabel: 'σ', yLabel: '價格' });
    }
    sig.addEventListener('input', upd); upd();
  };

  INIT.S15 = function () {
    var defs = [
      { id: 'd-S', key: 'S', label: 'S 期初股價', min: 50, max: 150, step: 1, value: 100 },
      { id: 'd-K', key: 'K', label: 'K 履約價', min: 50, max: 150, step: 1, value: 90 },
      { id: 'd-T', key: 'T', label: 'T 期間（年）', min: 0.25, max: 3, step: 0.25, value: 1, fmt: function (x) { return x.toFixed(2); } },
      { id: 'd-r', key: 'r', label: 'r 無風險利率', min: 0, max: 0.10, step: 0.005, value: 0.03, fmt: pct },
      { id: 'd-sig', key: 'sigma', label: 'σ 波動率', min: 0.05, max: 1, step: 0.01, value: 0.3, fmt: pct },
      { id: 'd-N', key: 'N', label: 'N 面額', min: 100, max: 10000, step: 100, value: 100 }
    ];
    var v = sliders($('d-in'), defs, function () { upd(); });
    function upd() {
      var parts = L.elnFairCouponParts(v.S, v.K, v.T, v.r, v.sigma, v.N), C = L.elnFairCoupon(v.S, v.K, v.T, v.r, v.sigma, v.N);
      $('d-c').textContent = f2(C); $('d-int').textContent = f2(parts.interest); $('d-put').textContent = f2(parts.putPremium);
      var xs = range(0, 2 * v.K, 80);
      var top = (v.N + C) * 1.15;
      chart($('d-chart'), { xMin: 0, xMax: 2 * v.K, yMin: 0, yMax: top,
        yTicks: [[0, '0'], [v.N + C, 'N+C*']], xTicks: [[0, '0'], [v.K, 'K'], [2 * v.K, '2K']],
        vlines: [{ x: v.K, cls: 'k' }],
        series: [{ cls: 'ln', pts: xs.map(function (s) { return [s, L.elnPayoff(s, v.N, C, v.K)]; }) }],
        xLabel: 'S_T', yLabel: '到期報償' });
    }
    upd();
  };

  INIT.S16 = function () {
    // S8, §cover：發行價（面額 100%）$1,000、估計價值 $962.10
    var svg = $('fig16-svg');
    function bar(y, val, txt, label, cls) {
      var w = val / 1000 * 300;
      svg.appendChild(el('rect', { x: 110, y: y, width: w, height: 34, 'class': cls }));
      svg.appendChild(el('text', { 'class': 'bt', x: 100, y: y + 23, 'text-anchor': 'end' }, label));
      svg.appendChild(el('text', { 'class': 'ctt', x: 110 + w + 8, y: y + 23 }, txt));
    }
    bar(30, 1000, '$1,000', '發行價', 'bh');
    bar(90, 962.10, '$962.10', '估計價值', 'ctr');
    svg.appendChild(el('text', { 'class': 'lab lab-s', x: 110, y: 160 }, 'Source：S8, §cover'));
  };

  INIT.S18 = function () {
    var Q = [
      ['Q1', 'L1', '買進 call，到期時標的價格低於履約價，這張 call 的到期價值是？', ['零', '履約價減標的價格', '權利金'], 0, '只有標的價格高於 K，call 才有到期價值（S12, p.4）；價外到期就沒有價值（S1, p.7；p.14）'],
      ['Q2', 'L2', '隱含波動率是怎麼得到的？', ['用過去的股價算', '把選擇權市價代回 Black-Scholes 反推', '交易所公布'], 1, '讓 Black-Scholes 價值等於市價的那個波動率（S11, p.2）；用過去股價算的是歷史波動率（S5, p.15）'],
      ['Q3', 'L3', '如果 Black-Scholes 完全正確，同一到期日、不同履約價的隱含波動率應該？', ['都相同', '低履約價較高', '高履約價較高'], 0, 'BS 若完全正確，所有履約價的隱含波動率都相同（S13, p.18）'],
      ['Q4', 'L3', '股價指數選擇權中，低履約價的隱含波動率比較高，這叫？', ['期限結構', '負偏斜', '買賣權平價'], 1, '波動率與履約價反向變動，稱為負偏斜（S10, p.3；S11, p.2）'],
      ['Q5', 'L4', '簡化 ELN 的票息高於無風險利息的部分，來自？', ['發行機構的補貼', '投資人賣出 put 收到的權利金', '股利'], 1, '推導：F17（eln-simplified）；簡化 ELN 本來就忽略股利（GRAPH_SPEC §2.5）'],
      ['Q6', 'L4', '標榜「保本」的結構型債券，什麼情況下仍可能虧損？', ['不可能虧損', '發行機構破產，或到期前賣出', '只有標的上漲時'], 1, '發行機構破產可能損失全部資金（S7, §How Do These Notes Protect）；到期前賣出可能低於買價（S6, §Questions to Ask）']
    ];
    var box = $('quiz'), score = {};
    Q.forEach(function (q, i) {
      var d = document.createElement('fieldset'); d.className = 'q'; d.style.border = '0'; d.style.margin = '0';
      d.innerHTML = '<legend class="qh"><span>' + q[0] + ' · ' + q[1] + '</span>' + q[2] + '</legend>' +
        q[3].map(function (o, j) { return '<label><input type="radio" name="q' + i + '" value="' + j + '">(' + 'ABC'[j] + ') ' + o + '</label>'; }).join('') +
        '<div class="fb" aria-live="polite"></div>';
      box.appendChild(d);
      Array.prototype.forEach.call(d.querySelectorAll('input'), function (inp) {
        inp.addEventListener('change', function () {
          var ok = +inp.value === q[4], fb = d.querySelector('.fb');
          fb.className = 'fb ' + (ok ? 'ok' : 'no');
          fb.textContent = (ok ? '答對。' : '再想想：正解是 (' + 'ABC'[q[4]] + ')。') + q[5];
          score[i] = ok;
          var n = Object.keys(score).filter(function (k) { return score[k]; }).length;
          $('q-score').textContent = '答對 ' + n + ' / ' + Q.length;
        });
      });
    });
  };

  /* KaTeX（auto-render 載入後呼叫） */
  window.renderMath = function () {
    if (window.renderMathInElement) renderMathInElement(document.body, { delimiters: [{ left: '\\(', right: '\\)', display: false }, { left: '\\[', right: '\\]', display: true }], throwOnError: false });
  };

  goHash();
})();
