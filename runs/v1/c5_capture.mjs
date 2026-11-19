// runs/v1/c5_capture.mjs — C5 呈現檢查的自動化部分（run v1）
// 用 Chrome DevTools Protocol 開啟 slides/index.html：1440 與 390（手機模擬）兩種寬度，逐頁
//   C5-1 收集 console 錯誤與例外；C5-2 檢查圖片；C5-3 計算重點帶字數與要點數；C5-4 檢查 KaTeX；
//   C5-5 操作互動工具並與 lab/ 函式比對；C5-6 檢查水平捲動；C5-7 存全頁截圖到 runs/v1/screenshots/。
// 需要：Node 22 以上（內建 WebSocket）、Chrome、在專案根目錄啟動的靜態伺服器（http://127.0.0.1:8765/）。
// 執行：node runs/v1/c5_capture.mjs   → 輸出 runs/v1/c5_results.json
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Z]:)/, '$1')), '..', '..');
const OUT = path.join(ROOT, 'runs', 'v1', 'screenshots');
const URL0 = 'http://127.0.0.1:8765/slides/index.html';
const CHROME = process.env.CHROME || 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const PORT = 9333;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
fs.mkdirSync(OUT, { recursive: true });

const prof = fs.mkdtempSync(path.join(os.tmpdir(), 'c5prof-'));
const ch = spawn(CHROME, ['--headless=new', '--disable-gpu', `--remote-debugging-port=${PORT}`, `--user-data-dir=${prof}`, '--hide-scrollbars', 'about:blank'], { stdio: 'ignore' });

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
  s.querySelectorAll('canvas').forEach((c) => { if (!c.clientWidth) return; const fs = Math.max(12, Math.ceil(11.5 * c.width / c.clientWidth)); const px = fs * c.clientWidth / c.width; if (minFont === null || px < minFont) minFont = px; });
  return { id, W, SW, overflowX: SW > W, cjk, points: pts, imgs, minFontPx: minFont === null ? null : +minFont.toFixed(1),
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
const TOOL_TESTS = {
  S04: `(async () => { const set=(id,v)=>{const e=document.getElementById(id); e.value=v; e.dispatchEvent(new Event('input'));};
    const r=[]; for (const [st,k,pc,pp] of [[50,50,4,3],[63,50,4,3],[41.5,45,2.5,6]]) { set('pay-st',st); set('pay-k',k); set('pay-pc',pc); set('pay-pp',pp);
      const c=+document.getElementById('pay-c').textContent, p=+document.getElementById('pay-p').textContent;
      r.push({in:[st,k,pc,pp], shown:[c,p], lab:[+DLab.callBuyerPnL(st,k,pc).toFixed(2), +DLab.putBuyerPnL(st,k,pp).toFixed(2)]}); } return r; })()`,
  S06: `(async () => { const set=(id,v)=>{const e=document.getElementById(id); e.value=v; e.dispatchEvent(new Event('input'));};
    const r=[]; for (const [S,K,T,rr,s] of [[100,100,1,0.05,0.2],[120,90,0.5,0.02,0.45],[60,140,2.5,0.08,0.9]]) { set('b1-S',S); set('b1-K',K); set('b1-T',T); set('b1-r',rr); set('b1-sig',s);
      r.push({in:[S,K,T,rr,s], shown:[document.getElementById('b1-call').textContent, document.getElementById('b1-put').textContent], lab:[DLab.bsCall(S,K,T,rr,s).toFixed(4), DLab.bsPut(S,K,T,rr,s).toFixed(4)]}); } return r; })()`,
  S07: `(async () => { const set=(id,v)=>{const e=document.getElementById(id); e.value=v; e.dispatchEvent(new Event('input'));};
    const r=[]; const btn=(m)=>document.querySelector('#S07 .tseg button[data-m="'+m+'"]').click();
    for (const [m,c] of [['bisection',10.4506],['newton',10.4506],['newton',15],['bisection',150]]) { set('b2-S',100); set('b2-K',100); set('b2-T',1); set('b2-r',0.05); btn(m); set('b2-cm',c);
      const lab = m==='newton'?DLab.impliedVolNewton(c,100,100,1,0.05):DLab.impliedVolBisection(c,100,100,1,0.05);
      r.push({in:[m,c], shown:document.getElementById('b2-sig').textContent, lab:isFinite(lab.sigma)?(lab.sigma*100).toFixed(2)+'%':'無解'}); } return r; })()`,
  S09: `(async () => { const sel=document.getElementById('a9-t-sel'); const r=[]; for (const t of ['0.25','2']) { sel.value=t; sel.dispatchEvent(new Event('change'));
      r.push({in:t, shown:[document.getElementById('a9-lo').textContent,document.getElementById('a9-atm').textContent,document.getElementById('a9-hi').textContent], lab:[-0.3,0,0.3].map(k=>(DLab.impliedVol(k,+t)*100).toFixed(2)+'%')}); } return r; })()`,
  S10: `(async () => { const sel=document.getElementById('a10-k-sel'); const r=[]; for (const k of ['-0.3','0']) { sel.value=k; sel.dispatchEvent(new Event('change'));
      r.push({in:k, shown:[document.getElementById('a10-s').textContent,document.getElementById('a10-l').textContent], lab:[0.1,2].map(t=>(DLab.impliedVol(+k,t)*100).toFixed(2)+'%')}); } return r; })()`,
  S12: `(async () => { const leds=['a12-f14','a12-f15','a12-f16'].map(id=>document.querySelector('#'+id+' b').textContent);
      document.querySelector('#S12 .tseg button[data-v="t"]').click(); const chartPaths=document.querySelectorAll('#a12-chart path').length;
      document.querySelector('#S12 .tseg button[data-v="3d"]').click(); return {leds, sliceChartPaths:chartPaths}; })()`,
  S13: `(async () => { const e=document.getElementById('b3-sig'); const r=[]; for (const s of [0.1,0.55,1]) { e.value=s; e.dispatchEvent(new Event('input'));
      r.push({in:s, shown:['b3-call','b3-put','b3-vega'].map(id=>document.getElementById(id).textContent), lab:[DLab.bsCall(100,100,1,0.05,s),DLab.bsPut(100,100,1,0.05,s),DLab.vegaPct(100,100,1,0.05,s)].map(x=>x.toFixed(4))}); } return r; })()`,
  S15: `(async () => { const set=(id,v)=>{const e=document.getElementById(id); e.value=v; e.dispatchEvent(new Event('input'));};
    const r=[]; for (const [S,K,T,rr,s,N] of [[100,90,1,0.03,0.3,100],[100,90,1,0.03,0.6,100],[80,80,2,0.05,0.25,1000]]) { set('d-S',S); set('d-K',K); set('d-T',T); set('d-r',rr); set('d-sig',s); set('d-N',N);
      const p=DLab.elnFairCouponParts(S,K,T,rr,s,N);
      r.push({in:[S,K,T,rr,s,N], shown:['d-c','d-int','d-put'].map(id=>document.getElementById(id).textContent), lab:[DLab.elnFairCoupon(S,K,T,rr,s,N),p.interest,p.putPremium].map(x=>x.toFixed(2))}); } return r; })()`,
  S18: `(async () => { const qs=document.querySelectorAll('#quiz fieldset'); const ans=[0,1,0,1,1,1]; qs.forEach((q,i)=>{const inp=q.querySelectorAll('input')[ans[i]]; inp.checked=true; inp.dispatchEvent(new Event('change'));});
      return {score:document.getElementById('q-score').textContent, fb:Array.from(qs).map(q=>q.querySelector('.fb').className)}; })()`
};
for (const [id, js] of Object.entries(TOOL_TESTS)) {
  await evaluate(`location.hash = '#${id}'`); await sleep(1200);
  results.tools[id] = await evaluate(js); harvest(`tool-${id}`);
}
harvest('end');
fs.writeFileSync(path.join(ROOT, 'runs', 'v1', 'c5_results.json'), JSON.stringify(results, null, 1));
ws.close(); ch.kill();
console.log('screenshots:', fs.readdirSync(OUT).length, 'consoleErrors:', consoleErrors.length);
