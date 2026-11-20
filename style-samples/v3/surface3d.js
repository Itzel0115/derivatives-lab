/*
 * style-samples/v3/surface3d.js — 視覺樣本共用：以 three.js 畫工具 A 的隱含波動率曲面
 * 高度一律由 LabSVI.impliedVol(k, t) 計算（lab/svi.js，示意參數），本檔不含任何公式。
 * 網格沿用 slides.md S01：k ∈ [−0.5, 0.5]、41 點；t ∈ [0.1, 2] 年、20 點。
 * 顏色從 CSS token 讀取（--surf-lo、--surf-hi、--surf-line），HTML／JS 不寫死色碼。
 */
(function () {
  'use strict';

  function cssColor(el, name, fallback) {
    var v = getComputedStyle(el).getPropertyValue(name).trim();
    return new THREE.Color(v || fallback);
  }

  function range(a, b, n) {
    var out = [];
    for (var i = 0; i < n; i++) out.push(a + (b - a) * i / (n - 1));
    return out;
  }

  window.mountSurface = function (host, opts) {
    opts = opts || {};
    if (!window.THREE || !window.LabSVI) return null;
    var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;

    var renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    host.appendChild(renderer.domElement);
    renderer.domElement.setAttribute('role', 'img');
    renderer.domElement.setAttribute('aria-label', '隱含波動率曲面（示意參數），可拖曳旋轉');
    renderer.domElement.tabIndex = 0;

    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(opts.fov || 32, 1, 0.1, 100);

    // ---- 幾何：k 對應 x、t 對應 z、隱含波動率對應 y ----
    var ks = range(-0.5, 0.5, 41), ts = range(0.1, 2, 20);
    var iv = [], lo = Infinity, hi = -Infinity;
    ts.forEach(function (t, j) {
      iv[j] = ks.map(function (k) {
        var v = LabSVI.impliedVol(k, t);
        if (v < lo) lo = v; if (v > hi) hi = v;
        return v;
      });
    });
    var W = 2.2, D = 1.6, H = opts.height || 0.9;
    var geo = new THREE.PlaneGeometry(W, D, ks.length - 1, ts.length - 1);
    geo.rotateX(-Math.PI / 2);
    var pos = geo.attributes.position, colors = [];
    var cLo = cssColor(host, '--surf-lo', '#1B2B45'), cHi = cssColor(host, '--surf-hi', '#8FB3E8');
    for (var j = 0; j < ts.length; j++) {
      for (var i = 0; i < ks.length; i++) {
        var idx = j * ks.length + i;
        var u = (iv[j][i] - lo) / (hi - lo);
        pos.setY(idx, u * H);
        var c = cLo.clone().lerp(cHi, u);
        colors.push(c.r, c.g, c.b);
      }
    }
    geo.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    geo.computeVertexNormals();

    var group = new THREE.Group();
    var mat = opts.flat
      ? new THREE.MeshBasicMaterial({ vertexColors: true, side: THREE.DoubleSide, transparent: true, opacity: opts.opacity || 0.95 })
      : new THREE.MeshStandardMaterial({ vertexColors: true, side: THREE.DoubleSide, roughness: 0.55, metalness: 0.15 });
    group.add(new THREE.Mesh(geo, mat));
    if (opts.wire !== false) {
      var wire = new THREE.LineSegments(new THREE.WireframeGeometry(geo),
        new THREE.LineBasicMaterial({ color: cssColor(host, '--surf-line', '#ffffff'), transparent: true, opacity: opts.wireOpacity || 0.18 }));
      wire.position.y = 0.002;
      group.add(wire);
    }
    // 底面外框：讓「平面」的參考感出來
    var base = new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.PlaneGeometry(W, D).rotateX(-Math.PI / 2)),
      new THREE.LineBasicMaterial({ color: cssColor(host, '--surf-line', '#ffffff'), transparent: true, opacity: 0.35 }));
    group.add(base);
    group.position.y = -H / 2;
    scene.add(group);

    scene.add(new THREE.AmbientLight(0xffffff, 0.55));
    var key = new THREE.DirectionalLight(0xffffff, 0.9); key.position.set(2, 3, 2); scene.add(key);
    var rim = new THREE.DirectionalLight(0xffffff, 0.35); rim.position.set(-2, 1, -3); scene.add(rim);

    // ---- 視角：拖曳旋轉；未操作時緩慢自轉（reduced-motion 時關閉） ----
    var yaw = opts.yaw != null ? opts.yaw : -0.75, pitch = opts.pitch != null ? opts.pitch : 0.52, dist = opts.dist || 4.2;
    var drag = null, idle = 0;
    function place() {
      camera.position.set(Math.sin(yaw) * Math.cos(pitch) * dist, Math.sin(pitch) * dist, Math.cos(yaw) * Math.cos(pitch) * dist);
      camera.lookAt(0, opts.lookY || 0, 0);
    }
    var el = renderer.domElement;
    el.style.touchAction = 'pan-y';
    el.addEventListener('pointerdown', function (e) { drag = [e.clientX, e.clientY]; el.setPointerCapture(e.pointerId); });
    el.addEventListener('pointerup', function () { drag = null; idle = 0; });
    el.addEventListener('pointermove', function (e) {
      if (!drag) return;
      yaw -= (e.clientX - drag[0]) * 0.008;
      pitch = Math.max(0.12, Math.min(1.25, pitch + (e.clientY - drag[1]) * 0.006));
      drag = [e.clientX, e.clientY];
    });
    el.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft') yaw += 0.1; else if (e.key === 'ArrowRight') yaw -= 0.1;
      else if (e.key === 'ArrowUp') pitch = Math.min(1.25, pitch + 0.08); else if (e.key === 'ArrowDown') pitch = Math.max(0.12, pitch - 0.08);
      else return;
      e.preventDefault(); idle = 0;
    });

    function resize() {
      var w = host.clientWidth, h = host.clientHeight;
      if (!w || !h) return;
      renderer.setSize(w, h, false);
      el.style.width = '100%'; el.style.height = '100%';
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    }
    window.addEventListener('resize', resize);
    resize();

    function frame() {
      if (!drag && !reduce) { idle++; if (idle > 30) yaw += opts.spin || 0.0018; }
      place();
      renderer.render(scene, camera);
      requestAnimationFrame(frame);
    }
    frame();
    return { renderer: renderer, range: [lo, hi] };
  };
})();
