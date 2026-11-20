// runs/v2.1/c5_capture.mjs — C5 呈現檢查的自動化部分（run v2.1）
// 由 runs/v2/c5_capture.mjs 複製（GRAPH_SPEC §8「v2.1 的做法」）：PER_SLIDE 的判定邏輯（字數、要點、圖片、字級、KaTeX、水平捲動）、
// TOOL_TESTS 與截圖流程不變。v2.1 只改：①輸出路徑（runs/v2.1/）②Chrome 改用 SwiftShader 以支援 WebGL（three.js 曲面）
// ③字級量測略過 WebGL canvas（曲面上沒有畫文字，軸說明改為 HTML 圖例）④新增 style.md v2 檢查：宋體只用於字重 ≥ 700（§3）、
// 曲面高度與 LabSVI.impliedVol 一致（§7.4）。
// 用 Chrome DevTools Protocol 開啟 slides/index.html：1440 與 390（手機模擬）兩種寬度，逐頁
//   C5-1 收集 console 錯誤與例外；C5-2 檢查圖片；C5-3 計算重點帶字數與要點數；C5-4 檢查 KaTeX；
//   C5-5 操作互動工具並與 lab/ 函式比對；C5-6 檢查水平捲動；C5-7 存全頁截圖到 runs/v2.1/screenshots/。
// 需要：Node 22 以上（內建 WebSocket）、Chrome、在專案根目錄啟動的靜態伺服器（http://127.0.0.1:8765/）。
// 執行：node runs/v2.1/c5_capture.mjs   → 輸出 runs/v2.1/c5_results.json
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Z]:)/, '$1')), '..', '..');
const OUT = path.join(ROOT, 'runs', 'v2.1', 'screenshots');
const URL0 = 'http://127.0.0.1:8765/slides/index.html';
const CHROME = process.env.CHROME || 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const PORT = 9333;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
fs.mkdirSync(OUT, { recursive: true });

const prof = fs.mkdtempSync(path.join(os.tmpdir(), 'c5prof-'));
const ch = spawn(CHROME, ['--headless=new', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', `--remote-debugging-port=${PORT}`, `--user-data-dir=${prof}`, '--hide-scrollbars', 'about:blank'], { stdio: 'ignore' });

let list;
for (let i = 0; i < 50; i++) { try { list = await (await fetch(`http://127.0.0.1:${PORT}/json/list`)).json(); if (list.length) break; } catch { } await sleep(200); }
const page = list.find((t) => t.type === 'page');
const ws = new WebSocket(page.webSocketDebuggerUrl);
await new Promise((r) => ws.addEventListener('open', r, { once: true }));
let seq = 0; const pending = new Map(); const events = [];
ws.addEventListener('message', (m) => {
  const d = JSON.parse(m.data);
  if (d.id && pending.has(d.id)) { pending.get(d.id)(d); pending.delete(d.id); } else if (d.method) events.push(d);
});
const send = (method, params = {}) => new Promise((res) => { const id = ++seq; pending.set(id, res); ws.send(JSON.stringify({ id, method, params })); });
// 載入簡報並確認真的渲染出來（本機伺服器偶爾回 ERR_CONNECTION_RESET，失敗就重試，最多 3 次）
async function loadDeck(tag) {
  for (let i = 1; i <= 3; i++) {
    await send('Page.navigate', { url: URL0 + '#S01' }); await sleep(3500);
    const ok = await evaluate(`!!(window.DLab && document.querySelector('.slide.show'))`);
    if (ok === true) { if (i > 1) consoleErrors.push({ tag, kind: 'harness', text: `deck loaded on attempt ${i}` }); return; }
    events.length = 0; // 丟棄失敗那次載入的錯誤頁事件
  }
  throw new Error('deck failed to load 3 times (' + tag + ')');
}
const evaluate = async (expr) => { const r = await send('Runtime.evaluate', { expression: expr, awaitPromise: true, returnByValue: true }); if (r.result?.exceptionDetails) return { __error: r.result.exceptionDetails.text + ' ' + (r.result.exceptionDetails.exception?.description || '') }; return r.result?.result?.value; };

await send('Page.enable'); await send('Runtime.enable'); await send('Log.enable');

const consoleErrors = [];
function harvest(tag) {
  while (events.length) {
    const e = events.shift();
    if (e.method === 'Runtime.exceptionThrown') consoleErrors.push({ tag, kind: 'exception', text: e.params.exceptionDetails.exception?.description || e.params.exceptionDetails.text });
    if (e.method === 'Runtime.consoleAPICalled' && (e.params.type === 'error' || e.params.type === 'warning')) consoleErrors.push({ tag, kind: 'console.' + e.params.type, text: e.params.args.map((a) => a.value ?? a.description).join(' ') });
    if (e.method === 'Log.entryAdded' && (e.params.entry.level === 'error' || e.params.entry.level === 'warning')) consoleErrors.push({ tag, kind: 'log.' + e.params.entry.level, text: e.params.entry.text + ' ' + (e.params.entry.url || '') });
  }
}

const SLIDES = Array.from({ length: 19 }, (_, i) => 'S' + String(i + 1).padStart(2, '0'));
const PER_SLIDE = `(() => {
  const s = document.querySelector('.slide.show'); const id = s.id;
  const W = document.documentElement.clientWidth, SW = document.documentElement.scrollWidth;
  const band = s.querySelector('.band') || s.querySelector('.cover .ttl');
  let txt = '', pts = 0;
  if (band) {
    const c = band.cloneNode(true); c.querySelectorAll('cite,.sub,h1').forEach((e) => e.remove());
    txt = Array.from(c.querySelectorAll('.lede,li')).map((e) => e.textContent).join(' ');
    pts = band.querySelectorAll('li').length;
  }
  const cjk = (txt.match(/[\\u4e00-\\u9fff]/g) || []).length;
  const imgs = Array.from(s.querySelectorAll('img')).map((i) => ({ src: i.getAttribute('src'), ok: i.complete && i.naturalWidth > 0 }));
  // style.md §4：SVG／canvas 內文字的實際顯示大小（px）
  let minFont = null;
  s.querySelectorAll('svg').forEach((svg) => { const vb = svg.viewBox && svg.viewBox.baseVal; if (!vb || !vb.width) return; const sc = svg.getBoundingClientRect().width / vb.width; if (!sc) return;
    svg.querySelectorAll('text').forEach((t) => { const px = parseFloat(getComputedStyle(t).fontSize) * sc; if (minFont === null || px < minFont) minFont = px; }); });
  s.querySelectorAll('canvas:not([data-gl])').forEach((c) => { if (!c.clientWidth) return; const fs = Math.max(12, Math.ceil(11.5 * c.width / c.clientWidth)); const px = fs * c.clientWidth / c.width; if (minFont === null || px < minFont) minFont = px; });
  // style.md v2 §3：宋體只用於字重 ≥ 700 的文字
  const serifLight = Array.from(s.querySelectorAll('*')).filter((e) => { const cs = getComputedStyle(e); if (!/Serif/.test(cs.fontFamily.split(',')[0])) return false;
    if (+cs.fontWeight >= 700) return false; return Array.from(e.childNodes).some((n) => n.nodeType === 3 && n.textContent.trim()); }).map((e) => e.tagName + '.' + e.className);
  return { id, W, SW, overflowX: SW > W, cjk, points: pts, imgs, minFontPx: minFont === null ? null : +minFont.toFixed(1), serifLight,
    katex: s.querySelectorAll('.katex').length, katexErr: s.querySelectorAll('.katex-error').length };
})()`;

const results = { generated: new Date().toISOString(), url: URL0, widths: {}, tools: {}, consoleErrors };
for (const [W, H, mobile] of [[1440, 900, false], [390, 844, true]]) {
  await send('Emulation.setDeviceMetricsOverride', { width: W, height: H, deviceScaleFactor: 1, mobile });
  await loadDeck(`load@${W}`); harvest(`load@${W}`);
  results.widths[W] = [];
  for (const id of SLIDES) {
    await evaluate(`location.hash = '#${id}'`); await sleep(1300); harvest(`${id}@${W}`);
    const r = await evaluate(PER_SLIDE); results.widths[W].push(r);
    const m = await send('Page.getLayoutMetrics'); const ch2 = Math.ceil(m.result.cssContentSize.height);
    const shot = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: true, clip: { x: 0, y: 0, width: W, height: ch2, scale: 1 } });
    fs.writeFileSync(path.join(OUT, `${id}_${W}.png`), Buffer.from(shot.result.data, 'base64'));
  }
  // Technical Note 展開版（只在 1440，供 C5-4 目視 LaTeX）
  if (W === 1440) for (const id of ['S04', 'S06', 'S07', 'S12', 'S13', 'S15']) {
    await evaluate(`location.hash = '#${id}'; document.querySelector('#${id} .tn').open = true`); await sleep(900); harvest(`${id}-tn@${W}`);
    const m = await send('Page.getLayoutMetrics'); const ch2 = Math.ceil(m.result.cssContentSize.height);
    const shot = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: true, clip: { x: 0, y: 0, width: W, height: ch2, scale: 1 } });
    fs.writeFileSync(path.join(OUT, `${id}_${W}_tn.png`), Buffer.from(shot.result.data, 'base64'));
    await evaluate(`document.querySelector('#${id} .tn').open = false`);
  }
}

// C5-5：操作工具，比對輸出與 lab/ 函式
await send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false });
await loadDeck('tools-load'); harvest('tools-load');
const SURF_TEST = (stage) => `(async () => { const sf = DLab.surfaces['${stage}']; if (!sf) return { error: 'no surface' };
      let maxDiff = 0; sf.T.forEach((t, i) => sf.K.forEach((k, j) => { maxDiff = Math.max(maxDiff, Math.abs(sf.Z[i][j] - DLab.impliedVol(k, t))); }));
      return { webgl: sf.ok, grid: [sf.K.length, sf.T.length], kRange: [sf.K[0], sf.K[sf.K.length - 1]], tRange: [sf.T[0], sf.T[sf.T.length - 1]], maxDiffVsImpliedVol: maxDiff,
        canvases: document.querySelectorAll('#${stage} canvas[data-gl]').length }; })()`;
const TOOL_TESTS = {
  S01: SURF_TEST('a1-stage'),
  S04: `(async () => { const set=(id,v)=>{const e=document.getElementById(id); e.value=v; e.dispatchEvent(new Event('input'));}; const seg=(g,v)=>document.querySelector('#'+g+' button[data-v="'+v+'"]').click();
    const r=[]; for (const [ty,sd,st,k,pr] of [['call','buyer',120,100,5],['put','buyer',63,80,2.5],['call','writer',41,45,3],['put','writer',100,100,4]]) { seg('pay-type',ty); seg('pay-side',sd); set('pay-k',k); set('pay-st',st); set('pay-prem',pr);
      const f = sd==='buyer'?DLab.buyerProfit:DLab.writerProfit; const val = ty==='call'?DLab.callPayoff(st,k):DLab.putPayoff(st,k);
      r.push({in:[ty,sd,st,k,pr], shown:[document.getElementById('pay-val').textContent, document.getElementById('pay-pnl').textContent, document.getElementById('pay-led-st').textContent], lab:[val.toFixed(2), f(ty,st,k,pr).toFixed(2)]}); } return r; })()`,
  S06: `(async () => { const set=(id,v)=>{const e=document.getElementById(id); e.value=v; e.dispatchEvent(new Event('input'));};
    const r=[]; for (const [S,K,T,rr,s] of [[100,100,1,0.05,0.2],[120,90,0.5,0.02,0.45],[60,140,2,0.08,0.9]]) { set('b1-S',S); set('b1-K',K); set('b1-T',T); set('b1-r',rr); set('b1-sig',s);
      r.push({in:[S,K,T,rr,s], shown:[document.getElementById('b1-call').textContent, document.getElementById('b1-put').textContent], lab:[DLab.bsCall(S,K,T,rr,s).toFixed(4), DLab.bsPut(S,K,T,rr,s).toFixed(4)]}); } return r; })()`,
  S07: `(async () => { const set=(id,v)=>{const e=document.getElementById(id); e.value=v; e.dispatchEvent(new Event('input'));};
    const r=[]; const btn=(m)=>document.querySelector('#b2-m button[data-v="'+m+'"]').click();
    for (const [m,c] of [['bisection',10.4506],['newton',10.4506],['newton',15],['bisection',150]]) { set('b2-S',100); set('b2-K',100); set('b2-T',1); set('b2-r',0.05); btn(m); set('b2-cm',c);
      const lab = m==='newton'?DLab.impliedVolNewton(c,100,100,1,0.05):DLab.impliedVolBisection(c,100,100,1,0.05);
      r.push({in:[m,c], shown:document.getElementById('b2-sig').textContent, lab:lab.ok?(lab.sigma*100).toFixed(2)+'%':'無解'}); } return r; })()`,
  S09: `(async () => { const e=document.getElementById('a9-t'); const r=[]; for (const t of [0.25,2]) { e.value=t; e.dispatchEvent(new Event('input'));
      r.push({in:t, shown:[document.getElementById('a9-lo').textContent,document.getElementById('a9-hi').textContent], lab:[-0.5,0.5].map(k=>(DLab.impliedVol(k,t)*100).toFixed(2)+'%')}); } return r; })()`,
  S10: `(async () => [{shown:[document.getElementById('a10-s').textContent,document.getElementById('a10-l').textContent], lab:[0.1,2].map(t=>(DLab.impliedVol(0,t)*100).toFixed(2)+'%')}])()`,
  S12surf: SURF_TEST('a12-stage'),
  S12: `(async () => { const leds=['a12-f14','a12-f15','a12-f16'].map(id=>document.querySelector('#'+id+' b').textContent);
      document.querySelector('#a12-mode button[data-v="t"]').click(); const tPaths=document.querySelectorAll('#a12-chart path').length;
      document.querySelector('#a12-mode button[data-v="k"]').click(); const kPaths=document.querySelectorAll('#a12-chart path').length;
      document.querySelector('#a12-mode button[data-v="3d"]').click(); return {leds, sliceChartPaths:[tPaths,kPaths]}; })()`,
  S13: `(async () => { const e=document.getElementById('b3-sig'); const r=[]; for (const s of [0.1,0.55,1]) { e.value=s; e.dispatchEvent(new Event('input'));
      r.push({in:s, shown:['b3-call','b3-put','b3-vega'].map(id=>document.getElementById(id).textContent), lab:[DLab.bsCall(100,100,1,0.03,s),DLab.bsPut(100,100,1,0.03,s),DLab.vegaPerPoint(100,100,1,0.03,s)].map(x=>x.toFixed(4))}); } return r; })()`,
  S15: `(async () => { const set=(id,v)=>{const e=document.getElementById(id); e.value=v; e.dispatchEvent(new Event('input'));};
    const r=[]; for (const [s,K] of [[0.3,90],[0.6,90],[0.05,60],[1,100]]) { set('d-sig',s); set('d-K',K);
      const p=DLab.elnFairCouponParts(100,K,1,0.03,s,1000), c=DLab.elnFairCoupon(100,K,1,0.03,s,1000);
      r.push({in:[s,K], shown:['d-c','d-int','d-put','d-V'].map(id=>document.getElementById(id).textContent), lab:[c,p.interest,p.putPremium,DLab.elnValue(100,K,1,0.03,s,1000,c)].map(x=>x.toFixed(2))}); } return r; })()`,
  S18: `(async () => { const qs=document.querySelectorAll('#quiz fieldset'); const ans=Array.from(qs).map(q=>+q.dataset.ans); qs.forEach((q,i)=>{const inp=q.querySelectorAll('input')[ans[i]]; inp.checked=true; inp.dispatchEvent(new Event('change'));});
      return {ans, score:document.getElementById('q-score').textContent, goals:document.getElementById('q-goals').textContent, fb:Array.from(qs).map(q=>q.querySelector('.fb').className)}; })()`
};
for (const [id, js] of Object.entries(TOOL_TESTS)) {
  await evaluate(`location.hash = '#${id.slice(0, 3)}'`); await sleep(1200);
  results.tools[id] = await evaluate(js); harvest(`tool-${id}`);
}
harvest('end');
fs.writeFileSync(path.join(ROOT, 'runs', 'v2.1', 'c5_results.json'), JSON.stringify(results, null, 1));
ws.close(); ch.kill();
console.log('screenshots:', fs.readdirSync(OUT).length, 'consoleErrors:', consoleErrors.length);
