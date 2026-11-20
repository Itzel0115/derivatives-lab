/* slides/assets/surface3d.js — run v2.1 / N5。工具 A 的 3D 曲面（style.md §7.4）。
 * 以 three.js r128 繪製；高度只呼叫 LabSVI.impliedVol(k, t)（lab/svi.js，C3 測試過），本檔不含任何公式。
 * 網格沿用 slides.md：k ∈ [−0.5, 0.5]、41 點；t ∈ [0.1, 2] 年、20 點。
 * 顏色從 CSS token 讀取（--surf-lo、--surf-hi、--surf-line、--cursor）。 */
(function () {
  'use strict';
  function range(a, b, n) { var r = []; for (var i = 0; i < n; i++) r.push(a + (b - a) * i / (n - 1)); return r; }
  function tok(el, name, fb) { var v = getComputedStyle(el).getPropertyValue(name).trim(); return v || fb; }

  window.Surface3D = {
    mount: function (host, opts) {
      opts = opts || {};
      var K = range(-0.5, 0.5, 41), T = range(0.1, 2, 20);
      var Z = T.map(function (t) { return K.map(function (k) { return LabSVI.impliedVol(k, t); }); });
      var zmin = Infinity, zmax = -Infinity;
      Z.forEach(function (r) { r.forEach(function (z) { zmin = Math.min(zmin, z); zmax = Math.max(zmax, z); }); });
      var api = { K: K, T: T, Z: Z, setSlice: function () {}, ok: false };
      var renderer;
      try {
        if (!window.THREE) throw new Error('three.js 未載入');
        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      } catch (e) {
        var msg = document.createElement('p');
        msg.className = 'gl-fallback';
        msg.textContent = '這個瀏覽器無法顯示 3D 曲面（需要 WebGL）。';
        host.appendChild(msg);
        return api;
      }
      var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      var cv = renderer.domElement;
      cv.setAttribute('data-gl', '1');
      cv.setAttribute('role', 'img');
      cv.setAttribute('aria-label', opts.label || '隱含波動率曲面（示意參數），可拖曳或用方向鍵旋轉');
      cv.tabIndex = 0;
      host.appendChild(cv);

      var scene = new THREE.Scene();
      var camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);
      var W = 2.2, D = 1.6, H = opts.height || 1.0;
      var geo = new THREE.PlaneGeometry(W, D, K.length - 1, T.length - 1);
      geo.rotateX(-Math.PI / 2);
      var pos = geo.attributes.position, cols = [];
      var cLo = new THREE.Color(tok(host, '--surf-lo', '#2E4466')), cHi = new THREE.Color(tok(host, '--surf-hi', '#D4B962'));
      // PlaneGeometry 的頂點順序：列 = 深度方向（到期 T），行 = 寬度方向（履約價 K）
      for (var i = 0; i < T.length; i++) for (var j = 0; j < K.length; j++) {
        var u = (Z[i][j] - zmin) / (zmax - zmin), idx = i * K.length + j;
        pos.setY(idx, u * H);
        var c = cLo.clone().lerp(cHi, u); cols.push(c.r, c.g, c.b);
      }
      geo.setAttribute('color', new THREE.Float32BufferAttribute(cols, 3));
      geo.computeVertexNormals();
      var group = new THREE.Group();
      var mesh = new THREE.Mesh(geo, new THREE.MeshStandardMaterial({ vertexColors: true, side: THREE.DoubleSide, roughness: 0.55, metalness: 0.15 }));
      group.add(mesh);
      var lineCol = new THREE.Color(tok(host, '--surf-line', '#F2F2F2'));
      var wire = new THREE.LineSegments(new THREE.WireframeGeometry(geo), new THREE.LineBasicMaterial({ color: lineCol, transparent: true, opacity: 0.22 }));
      wire.position.y = 0.002; group.add(wire);
      group.add(new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.PlaneGeometry(W, D).rotateX(-Math.PI / 2)),
        new THREE.LineBasicMaterial({ color: lineCol, transparent: true, opacity: 0.35 })));
      var curCol = new THREE.Color(tok(host, '--cursor', '#F4E3A6'));
      var marker = new THREE.Mesh(new THREE.SphereGeometry(0.03, 16, 12), new THREE.MeshBasicMaterial({ color: curCol }));
      marker.visible = false; group.add(marker);
      var sliceLine = null;
      group.position.y = -H / 2;
      scene.add(group);
      scene.add(new THREE.AmbientLight(0xffffff, 0.55));
      var key = new THREE.DirectionalLight(0xffffff, 0.9); key.position.set(2, 3, 2); scene.add(key);
      var rim = new THREE.DirectionalLight(0xffffff, 0.35); rim.position.set(-2, 1, -3); scene.add(rim);

      var yaw = opts.yaw != null ? opts.yaw : -0.9, pitch = opts.pitch != null ? opts.pitch : 0.46, dist = opts.dist || 4.1;
      var drag = null, idle = 0, dirty = true;
      function vertex(i, j) { var p = new THREE.Vector3(); p.fromBufferAttribute(pos, i * K.length + j); return p; }
      cv.style.touchAction = 'pan-y';
      cv.addEventListener('pointerdown', function (e) { drag = [e.clientX, e.clientY]; cv.setPointerCapture(e.pointerId); });
      cv.addEventListener('pointerup', function () { drag = null; idle = 0; });
      var ray = new THREE.Raycaster(), mouse = new THREE.Vector2();
      cv.addEventListener('pointermove', function (e) {
        if (drag) {
          yaw -= (e.clientX - drag[0]) * 0.008;
          pitch = Math.max(0.12, Math.min(1.25, pitch + (e.clientY - drag[1]) * 0.006));
          drag = [e.clientX, e.clientY]; dirty = true; return;
        }
        var r = cv.getBoundingClientRect();
        mouse.set((e.clientX - r.left) / r.width * 2 - 1, -(e.clientY - r.top) / r.height * 2 + 1);
        ray.setFromCamera(mouse, camera);
        var hit = ray.intersectObject(mesh)[0];
        if (hit) {
          var lp = group.worldToLocal(hit.point.clone());
          var j = Math.round((lp.x / W + 0.5) * (K.length - 1)), i = Math.round((lp.z / D + 0.5) * (T.length - 1));
          i = Math.max(0, Math.min(T.length - 1, i)); j = Math.max(0, Math.min(K.length - 1, j));
          marker.position.copy(vertex(i, j)); marker.visible = true;
          if (opts.onHover) opts.onHover(Z[i][j]);
        } else { marker.visible = false; if (opts.onHover) opts.onHover(null); }
        dirty = true;
      });
      cv.addEventListener('pointerleave', function () { marker.visible = false; if (opts.onHover) opts.onHover(null); dirty = true; });
      cv.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowLeft') yaw += 0.1; else if (e.key === 'ArrowRight') yaw -= 0.1;
        else if (e.key === 'ArrowUp') pitch = Math.min(1.25, pitch + 0.08); else if (e.key === 'ArrowDown') pitch = Math.max(0.12, pitch - 0.08);
        else return;
        e.preventDefault(); idle = 0; dirty = true;
      });

      function resize() {
        var w = host.clientWidth, h = host.clientHeight;
        if (!w || !h) return;
        renderer.setSize(w, h, false);
        cv.style.width = '100%'; cv.style.height = '100%';
        camera.aspect = w / h; camera.updateProjectionMatrix(); dirty = true;
      }
      if (window.ResizeObserver) new ResizeObserver(resize).observe(host); else window.addEventListener('resize', resize);
      resize();

      // 切面：沿固定到期日（type 't'，第 idx 列）或固定履約價位置（type 'k'，第 idx 行）畫游標色線
      api.setSlice = function (s) {
        if (sliceLine) { group.remove(sliceLine); sliceLine.geometry.dispose(); sliceLine = null; }
        if (s) {
          var pts = [];
          if (s.type === 't') for (var j = 0; j < K.length; j++) pts.push(vertex(s.idx, j));
          else for (var i = 0; i < T.length; i++) pts.push(vertex(i, s.idx));
          pts.forEach(function (p) { p.y += 0.01; });
          sliceLine = new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), new THREE.LineBasicMaterial({ color: curCol, linewidth: 3 }));
          group.add(sliceLine);
        }
        dirty = true;
      };
      api.ok = true;

      function frame() {
        var visible = host.offsetParent !== null;
        if (visible) {
          if (!drag && !reduce) { idle++; if (idle > 30) { yaw += 0.0018; dirty = true; } }
          if (dirty) {
            camera.position.set(Math.sin(yaw) * Math.cos(pitch) * dist, Math.sin(pitch) * dist, Math.cos(yaw) * Math.cos(pitch) * dist);
            camera.lookAt(0, opts.lookY || -0.05, 0);
            renderer.render(scene, camera); dirty = false;
          }
        }
        requestAnimationFrame(frame);
      }
      frame();
      return api;
    }
  };
})();
