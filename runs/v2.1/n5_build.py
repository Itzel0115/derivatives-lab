# runs/v2.1/n5_build.py — N5：由 slides/slides.md 產生 slides/index.html（run v2.1，依 style.md v2）
# 由 runs/v2/n5_build.py 複製：文字解析、靜態圖、條款表、工具面板內容不變；改的是頁型、頁首、章節分頁與封面（style.md v2 §1.2、§5）。
# 用法：py runs/v2.1/n5_build.py
# 文字一律取自 slides.md（主文、名詞、逐步標註、出處、免責、進階、講者備註、測驗）；
# 圖形與工具的版面在本檔與 slides/assets/deck.js；數值只由 lab/*.js 計算（deck.js 呼叫）。
import re, html, os

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
SRC = open(os.path.join(ROOT, 'slides', 'slides.md'), encoding='utf-8').read()

CIT = re.compile(r"S\d+|GRAPH_SPEC|§|推導|[a-z]+-[a-z]+|\bindex\b|\bglossary\b|F\d\d")
PAREN = re.compile(r"（[^（）]*）")
PARTS = {'S01': '開場', 'S02': '學習目標', 'S03': 'Part 1 選擇權', 'S04': 'Part 1 選擇權',
         'S05': 'Part 2 隱含波動率', 'S06': 'Part 2 隱含波動率', 'S07': 'Part 2 隱含波動率',
         'S08': 'Part 3 波動率曲面', 'S09': 'Part 3 波動率曲面', 'S10': 'Part 3 波動率曲面',
         'S11': 'Part 3 波動率曲面', 'S12': 'Part 3 波動率曲面', 'S13': 'Part 4 結構型商品',
         'S14': 'Part 4 結構型商品', 'S15': 'Part 4 結構型商品', 'S16': 'Part 4 結構型商品',
         'S17': 'Part 4 結構型商品', 'S18': '小測驗', 'S19': '總結'}
DECK = 'Derivatives Lab｜波動率為什麼不是一個數字？'


def esc(s):
    return html.escape(s, quote=False)


def inline(s, cite=True):
    """行內格式：`code`、**粗體**、出處括號 → <cite>。LaTeX 原樣保留給 KaTeX。"""
    out = esc(s)
    out = re.sub(r'`\[(推導|事實|範例|觀點)\]`', r'<span class="dtag">\1</span>', out)
    out = re.sub(r'`([^`]+)`', r'<code>\1</code>', out)
    out = re.sub(r'\*\*(.+?)\*\*', r'<b>\1</b>', out)
    if cite:
        out = PAREN.sub(lambda m: '<cite>' + m.group(0) + '</cite>' if CIT.search(m.group(0)) else m.group(0), out)
    return out


def sections(page):
    d = {}
    for m in re.finditer(r'^### (.+?)\n(.*?)(?=^### |\Z)', page, re.S | re.M):
        d[m.group(1).strip()] = m.group(2)
    return d


def field(block, name):
    m = re.search(r'^- ' + re.escape(name) + r'：(.*)$', block, re.M)
    return m.group(1).strip() if m else None


def fields(block, name):
    return [m.group(1).strip() for m in re.finditer(r'^- ' + re.escape(name) + r'：(.*)$', block, re.M)]


def bullets(block):
    """頂層「- 」條目，縮排兩格的行併入同一條。"""
    items = []
    for line in block.splitlines():
        if line.startswith('- '):
            items.append([line[2:]])
        elif line.startswith('  ') and items:
            items[-1].append(line.strip())
    return items


# ---------------- 靜態圖（SVG） ----------------
def svg_s03():
    # 價內／價平／價外數線：上列 Call、下列 Put；K 在中間
    return '''<svg viewBox="0 0 600 250" role="img" aria-label="價格數線：中間為履約價 K；上列 Call 在 K 右側為價內，下列 Put 在 K 左側為價內">
<line class="sv-axis" x1="30" y1="125" x2="570" y2="125"/>
<line class="sv-ref" x1="300" y1="30" x2="300" y2="220"/>
<text class="sv-lab" x="300" y="245" text-anchor="middle">K</text>
<text class="sv-lab-cjk" x="585" y="132" text-anchor="end" style="font-size:16px">現價 S →</text>
<g data-step="1"><text class="f-call" x="30" y="40" style="font-family:var(--sans);font-size:22px;font-weight:700">Call</text>
<rect class="f-call-tint" x="304" y="55" width="266" height="46"/>
<text class="sv-lab-cjk" x="437" y="86" text-anchor="middle" style="fill:var(--call)">價內</text>
<text class="sv-lab-cjk" x="300" y="86" text-anchor="middle">價平</text>
<text class="sv-lab-cjk" x="165" y="86" text-anchor="middle" style="fill:var(--ink-3)">價外</text></g>
<g data-step="2"><text class="f-put" x="30" y="226" style="font-family:var(--sans);font-size:22px;font-weight:700">Put</text>
<rect class="f-put-tint" x="30" y="148" width="266" height="46"/>
<text class="sv-lab-cjk" x="163" y="179" text-anchor="middle" style="fill:var(--put)">價內</text>
<text class="sv-lab-cjk" x="300" y="179" text-anchor="middle">價平</text>
<text class="sv-lab-cjk" x="435" y="179" text-anchor="middle" style="fill:var(--ink-3)">價外</text></g>
<g data-step="3"><circle class="f-navy" cx="300" cy="125" r="6"/></g>
</svg>'''


def svg_s05():
    names = ['現價 S', '履約價 K', '到期時間 T', '無風險利率 r', '波動率 σ']
    g = []
    for i, n in enumerate(names):
        y = 18 + i * 52
        cls = 'box-dash' if i == 4 else 'box-navy'
        step = '2' if i == 4 else '1'
        g.append(f'<g data-step="{step}"><rect class="f-page {cls}" x="10" y="{y}" width="210" height="40"/>'
                 f'<text class="sv-lab-cjk" x="115" y="{y + 27}" text-anchor="middle">{n}{" ？" if i == 4 else ""}</text>'
                 f'<path class="flow flow-slate" d="M220 {y + 20} C 300 {y + 20}, 300 140, 370 140"/></g>')
    return f'''<svg viewBox="0 0 600 290" role="img" aria-label="五個輸入匯入 Black-Scholes 公式，得到選擇權理論價格；前四個是已知參數，σ 以虛線框標問號">
{''.join(g)}
<g data-step="1"><text class="sv-tag" x="115" y="282" text-anchor="middle">前四個：已知參數</text></g>
<rect class="f-mist box-navy" x="370" y="100" width="220" height="80"/>
<text class="sv-lab-cjk" x="480" y="134" text-anchor="middle" style="font-size:18px">Black-Scholes 公式</text>
<text class="sv-lab-cjk" x="480" y="162" text-anchor="middle" style="font-size:18px">→ 選擇權理論價格</text>
</svg>'''


def struct_box(x, y, w, h, role, name):
    return (f'<rect class="f-page box-navy" x="{x}" y="{y}" width="{w}" height="{h}"/>'
            f'<rect class="f-navy" x="{x}" y="{y}" width="{w}" height="26"/>'
            f'<text x="{x + w / 2}" y="{y + 18}" text-anchor="middle" style="fill:var(--page);font-family:var(--sans);font-size:15px;font-weight:600;letter-spacing:.08em">{role}</text>'
            f'<text class="sv-lab-cjk" x="{x + w / 2}" y="{y + h - 16}" text-anchor="middle">{name}</text>')


ARROWS = '''<defs><marker id="ah-s-{id}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path class="ah-slate" d="M0 0 L10 5 L0 10z"/></marker>
<marker id="ah-p-{id}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path class="ah-put" d="M0 0 L10 5 L0 10z"/></marker></defs>'''


def svg_s14():
    return f'''<svg viewBox="0 0 600 310" role="img" aria-label="交易結構：投資人支付購買價款給發行機構，發行機構依參考資產表現提供付款承諾；中央的結構型債券由債券部分與內嵌衍生性商品組成">
{ARROWS.format(id='14')}
{struct_box(10, 30, 150, 90, 'INVESTOR', '投資人')}
{struct_box(440, 30, 150, 90, 'ISSUER', '發行機構')}
<rect class="f-mist box-navy" x="150" y="160" width="300" height="130"/>
<text class="sv-lab-cjk" x="300" y="186" text-anchor="middle" style="font-weight:700;fill:var(--navy)">結構型債券</text>
<rect class="f-page box-navy" x="162" y="200" width="134" height="76"/><text class="sv-tag" x="229" y="244" text-anchor="middle">債券部分</text>
<rect class="f-page box-navy" x="304" y="200" width="134" height="76"/><text class="sv-tag" x="371" y="232" text-anchor="middle">內嵌</text><text class="sv-tag" x="371" y="258" text-anchor="middle">衍生性商品</text>
<path class="flow flow-slate draw" d="M160 55 C 260 20, 340 20, 440 55" marker-end="url(#ah-s-14)"/>
<text class="sv-tag" x="300" y="22" text-anchor="middle">購買價款</text>
<path class="flow flow-slate draw" d="M440 100 C 340 140, 260 140, 160 100" marker-end="url(#ah-s-14)"/>
<text class="sv-tag" x="300" y="156" text-anchor="middle">付款承諾（依參考資產表現）</text>
<circle r="4" class="ah-slate"><animateMotion dur="3.2s" repeatCount="indefinite" path="M160 55 C 260 20, 340 20, 440 55"/></circle>
</svg>'''


def svg_s15():
    return f'''<svg viewBox="0 0 600 310" role="img" aria-label="簡化 ELN：投資人支付面額 N 給發行機構；簡化 ELN 由到期付 N＋C 的零息債券與賣出一批 put 組成，put 由投資人賣出、發行機構持有">
{ARROWS.format(id='15')}
{struct_box(10, 30, 150, 90, 'INVESTOR', '投資人')}
{struct_box(440, 30, 150, 90, 'ISSUER', '發行機構')}
<rect class="f-mist box-navy" x="150" y="160" width="300" height="130"/>
<text class="sv-lab-cjk" x="300" y="186" text-anchor="middle" style="font-weight:700;fill:var(--navy)">簡化 ELN</text>
<g data-step="1"><rect class="f-page box-navy" x="162" y="200" width="134" height="76"/><text class="sv-tag" x="229" y="232" text-anchor="middle">零息債券：</text><text class="sv-tag" x="229" y="256" text-anchor="middle">到期付 N＋C</text></g>
<g data-step="2"><rect class="f-put-tint box-navy" x="304" y="200" width="134" height="76"/><text class="sv-tag" x="371" y="232" text-anchor="middle" style="fill:var(--put)">賣出一批 put</text><text class="sv-tag" x="371" y="256" text-anchor="middle">（履約價 K）</text>
<path class="flow flow-put draw" d="M438 238 C 520 238, 540 180, 520 124" marker-end="url(#ah-p-15)"/>
<text class="sv-tag" x="590" y="290" text-anchor="end" style="fill:var(--put)">投資人賣出、發行機構持有</text></g>
<path class="flow flow-slate draw" d="M160 55 C 260 20, 340 20, 440 55" marker-end="url(#ah-s-15)"/>
<text class="sv-tag" x="300" y="22" text-anchor="middle">面額 N</text>
<circle r="4" class="ah-slate"><animateMotion dur="3.2s" repeatCount="indefinite" path="M160 55 C 260 20, 340 20, 440 55"/></circle>
</svg>'''


def svg_s16():
    return '''<svg viewBox="0 0 600 220" role="img" aria-label="發行價等於估計的公平價值加上價差（避險等成本與利潤）；不按比例">
<path class="sv-axis" d="M20 70 V50 H580 V70" style="stroke:var(--navy)"/>
<text class="sv-lab-cjk" x="300" y="36" text-anchor="middle" style="font-weight:700;fill:var(--navy)">發行價</text>
<rect class="f-page box-navy" x="20" y="90" width="330" height="100"/>
<text class="sv-lab-cjk" x="185" y="146" text-anchor="middle">估計的公平價值</text>
<rect class="f-mist box-navy" x="360" y="90" width="220" height="100"/>
<text class="sv-lab-cjk" x="470" y="135" text-anchor="middle">價差</text>
<text class="sv-tag" x="470" y="162" text-anchor="middle">（避險等成本＋利潤）</text>
<text class="sv-tag" x="580" y="214" text-anchor="end">不按比例</text>
</svg>'''


def chart_placeholder(cid, label):
    return f'<svg id="{cid}" viewBox="0 0 600 340" role="img" aria-label="{label}"></svg>'


FIG_SVG = {
    'S03': svg_s03, 'S05': svg_s05, 'S14': svg_s14, 'S15': svg_s15, 'S16': svg_s16,
    'S08': lambda: chart_placeholder('f8-chart', '同一到期日：Black-Scholes 預測的水平線與示意的市場型態曲線；橫軸履約價、縱軸隱含波動率'),
    'S11': lambda: chart_placeholder('f11-chart', '示意的負偏斜曲線：左端低履約價 put 較高，右端高履約價 call 較低'),
}
STEP_KIND = {'S03': ['call', 'put', 'navy']}

# 條款表（文字與數值逐字取自 slides.md 的「圖的內容」）
TABLES = {
    'S14': ('INDICATIVE TERMS · 條款摘要', [
        ('組成', '債券部分＋內嵌衍生性商品'),
        ('報酬連結', '股價指數、單一股票、一籃子股票、利率、商品、外匯（S6, §What are Structured Notes?）'),
        ('發行與銷售', '金融機構設計發行、券商銷售'),
        ('性質', '發行機構的付款承諾（S7, §What Are）')]),
    'S15': ('INDICATIVE TERMS · 條款摘要', [
        ('面額', 'N'), ('到期期間', 'T'), ('履約價', 'K（通常設在期初股價附近或以下）'), ('票息', 'C'),
        ('到期時股價 ≥ K', '取回 N＋C'),
        ('到期時股價 < K', '取得以 K 價換成的股票（或等值現金）＋C（GRAPH_SPEC §2.5）')]),
    'S16': ('INDICATIVE TERMS · 條款摘要（S8）', [
        ('發行機構', 'Barclays Bank PLC（S8, §cover）'), ('每張面額', '$1,000（S8, §cover）'),
        ('公開發行價', '面額的 100%（S8, §cover）'), ('估計價值', '每張 $962.10（S8, §cover）'),
        ('承銷佣金', '面額的 2.15%，即每張 $21.50（S8, §cover）')]),
}
STRUCT_HEAD = {'S14': 'TRANSACTION STRUCTURE · 交易結構', 'S15': 'TRANSACTION STRUCTURE · 交易結構', 'S16': 'TRANSACTION STRUCTURE · 定價結構'}


# ---------------- 工具（終端機面板） ----------------
def rng(id_, label, mn, mx, step, val, unit=''):
    return (f'<div class="row"><span class="lbl">{label}</span><span class="rd sm" id="{id_}-v"></span></div>'
            f'<input type="range" id="{id_}" min="{mn}" max="{mx}" step="{step}" value="{val}" aria-label="{label}">')


def seg(id_, opts):
    b = ''.join(f'<button type="button" data-v="{v}" class="{c}">{t}</button>' for v, t, c in opts)
    return f'<div class="tseg" id="{id_}" role="group">{b}</div>'


def term(code, name, hint, body, foot):
    return (f'<div class="term span-all anim d3"><div class="tbar"><span><span class="tcode">{code}</span>{name}</span>'
            f'<span class="hint">{hint}</span></div>{body}<div class="tfoot">{foot}</div></div>')


def tool_foot(tool):
    note = field(tool, '註腳') or ''
    call = field(tool, '呼叫') or ''
    call = re.sub(r'`([^`]+)`', r'\1', call)
    return inline(note) + ('<br><span class="fn">呼叫：' + esc(call) + '</span>' if call else '')


def tool_html(pid, tool):
    f = tool_foot(tool) if tool else ''
    if pid == 'S01':
        return term('A', '曲面 · 只旋轉', '拖曳或 ← → ↑ ↓ 旋轉',
                    '<div class="panes p2"><div class="pane"><div class="lbl">隱含波動率</div><div class="row"><span class="rd" id="a1-read" aria-live="polite">—</span></div>'
                    '<div class="unit">滑鼠停在曲面上顯示</div><p class="illus">示意參數</p></div>'
                    '<div class="pane"><canvas class="surf" id="a1-canvas" width="900" height="520" tabindex="0" role="img" aria-label="隱含波動率曲面（示意參數），可旋轉"></canvas></div></div>', f)
    if pid == 'S04':
        body = ('<div class="panes p3"><div class="pane">'
                + seg('pay-type', [('call', 'Call', 'call'), ('put', 'Put', 'put')])
                + seg('pay-side', [('buyer', '買方', ''), ('writer', '賣方', '')])
                + rng('pay-k', '履約價 K', 50, 150, 1, 100) + rng('pay-st', '到期標的價格 S_T', 0, 200, 1, 120)
                + '<div class="lbl">權利金</div><input type="number" id="pay-prem" min="0" max="50" step="0.5" value="5" aria-label="權利金">'
                '</div><div class="pane" aria-live="polite"><div class="lbl">到期價值</div><div class="row"><span class="rd" id="pay-val">—</span></div>'
                '<div class="lbl">到期損益</div><div class="row"><span class="rd" id="pay-pnl">—</span></div>'
                '<div class="led" id="pay-led"><span><i></i><span id="pay-led-nm"></span></span><span id="pay-led-st"></span></div></div>'
                '<div class="pane"><svg id="pay-chart" viewBox="0 0 600 360" role="img" aria-label="到期標的價格對到期損益的折線"></svg></div></div>')
        return term('PAYOFF', '損益滑桿 · Payoff Slider', '拖曳滑桿', body, f)
    if pid == 'S06':
        body = ('<div class="panes p2"><div class="pane">' + rng('b1-S', 'S', 50, 150, 1, 100) + rng('b1-K', 'K', 50, 150, 1, 100)
                + rng('b1-T', 'T（年）', 0.1, 2, 0.05, 1) + rng('b1-r', 'r', 0, 0.10, 0.005, 0.03) + rng('b1-sig', 'σ', 0.05, 1.00, 0.01, 0.20)
                + '</div><div class="pane" aria-live="polite"><div class="lbl nm-c" style="color:var(--call-dk)">Call 價格</div><div class="row"><span class="rd" id="b1-call">—</span></div>'
                '<div class="lbl" style="color:var(--put-dk)">Put 價格</div><div class="row"><span class="rd" id="b1-put">—</span></div></div></div>')
        return term('B', '定價器 · Pricer', '拖曳滑桿', body, f)
    if pid == 'S07':
        body = ('<div class="panes p3"><div class="pane"><div class="lbl">Call 市價</div><input type="number" id="b2-cm" min="0" step="0.01" value="10" aria-label="call 市價">'
                + rng('b2-S', 'S', 50, 150, 1, 100) + rng('b2-K', 'K', 50, 150, 1, 100) + rng('b2-T', 'T（年）', 0.1, 2, 0.05, 1) + rng('b2-r', 'r', 0, 0.10, 0.005, 0.03)
                + seg('b2-m', [('bisection', '二分法', ''), ('newton', 'Newton 法', '')])
                + '</div><div class="pane" aria-live="polite"><div class="lbl">隱含波動率</div><div class="row"><span class="rd" id="b2-sig">—</span></div>'
                '<div class="lbl">方法 · 迭代次數</div><div class="row"><span class="rd sm" id="b2-meth">—</span><span class="rd sm" id="b2-it">—</span></div>'
                '<div class="led" id="b2-led"><span><i></i>狀態</span><span id="b2-st"></span></div></div>'
                '<div class="pane"><div class="lbl">上下界（callBounds）</div><div class="row"><span class="unit">lower</span><span class="rd sm" id="b2-lo">—</span></div>'
                '<div class="row"><span class="unit">upper</span><span class="rd sm" id="b2-hi">—</span></div><div class="lbl">事件紀錄</div><div class="log" id="b2-log"></div></div></div>')
        return term('B', '反推模式 · Implied Vol Solver', '輸入市價', body, f)
    if pid == 'S09':
        body = ('<div class="panes p2"><div class="pane">' + rng('a9-t', '到期時間 t（年）', 0.1, 2, 0.05, 0.5)
                + '<div aria-live="polite"><div class="lbl">低履約價端</div><div class="row"><span class="rd" id="a9-lo">—</span></div>'
                '<div class="lbl">高履約價端</div><div class="row"><span class="rd" id="a9-hi">—</span></div></div><p class="illus">示意參數</p></div>'
                '<div class="pane"><svg id="a9-chart" viewBox="0 0 600 340" role="img" aria-label="固定到期日：隱含波動率對履約價的曲線（示意參數）"></svg></div></div>')
        return term('A', '切面 · 固定到期日', '拖曳滑桿', body, f)
    if pid == 'S10':
        body = ('<div class="panes p2"><div class="pane" aria-live="polite"><div class="lbl">價平 · 短期端</div><div class="row"><span class="rd" id="a10-s">—</span></div>'
                '<div class="lbl">價平 · 長期端</div><div class="row"><span class="rd" id="a10-l">—</span></div><p class="illus">示意參數</p></div>'
                '<div class="pane"><svg id="a10-chart" viewBox="0 0 600 340" role="img" aria-label="固定在價平：隱含波動率對到期時間的曲線（示意參數）"></svg></div></div>')
        return term('A', '切面 · 固定價平', '', body, f)
    if pid == 'S12':
        body = ('<div class="panes p3"><div class="pane">' + seg('a12-mode', [('3d', '完整曲面', ''), ('t', '固定到期日', ''), ('k', '固定履約價位置', '')])
                + rng('a12-pos', '切面位置', 0, 1, 0.01, 0.4)
                + '<div aria-live="polite"><div class="lbl">隱含波動率</div><div class="row"><span class="rd sm" id="a12-read">—</span></div></div><p class="illus">示意參數</p></div>'
                '<div class="pane"><div class="lbl">無套利檢查</div><div class="led" id="a12-f14"><span><i></i>日曆價差</span><b>—</b></div>'
                '<div class="led" id="a12-f15"><span><i></i>蝶式</span><b>—</b></div><div class="led" id="a12-f16"><span><i></i>F16 條件 1–4</span><b>—</b></div></div>'
                '<div class="pane"><div class="surf3d" id="a12-stage"></div>'
                '<svg id="a12-chart" viewBox="0 0 600 340" role="img" aria-label="目前切面的曲線" style="display:none"></svg></div></div>')
        return term('A', '完整曲面', '拖曳或 ← → ↑ ↓ 旋轉', body, f)
    if pid == 'S13':
        body = ('<div class="panes p3"><div class="pane">' + rng('b3-sig', 'σ', 0.05, 1.00, 0.01, 0.20)
                + '<p class="fixed">S 100 · K 100 · T 1 · r 0.03（固定）</p></div>'
                '<div class="pane" aria-live="polite"><div class="lbl" style="color:var(--call-dk)">Call</div><div class="row"><span class="rd" id="b3-call">—</span></div>'
                '<div class="lbl" style="color:var(--put-dk)">Put</div><div class="row"><span class="rd" id="b3-put">—</span></div>'
                '<div class="lbl">Vega（每 1 個百分點）</div><div class="row"><span class="rd sm" id="b3-vega">—</span></div></div>'
                '<div class="pane"><svg id="b3-chart" viewBox="0 0 600 340" role="img" aria-label="σ 對 call 與 put 價格的兩條曲線"></svg></div></div>')
        return term('B', '定價器 · 只拉 σ', '拖曳滑桿', body, f)
    if pid == 'S15':
        body = ('<div class="panes p3"><div class="pane">' + rng('d-sig', 'σ', 0.05, 1.00, 0.01, 0.30) + rng('d-K', 'K', 60, 100, 1, 90)
                + '<p class="fixed">S 100 · T 1 · r 0.03 · N 1000（固定）</p></div>'
                '<div class="pane" aria-live="polite"><div class="lbl">公平票息 C*</div><div class="row"><span class="rd" id="d-c">—</span></div>'
                '<div class="tbarh" aria-hidden="true"><span class="b1" id="d-bar1"></span><span class="b2" id="d-bar2"></span></div>'
                '<div class="row"><span class="unit">本金的利息</span><span class="rd sm" id="d-int">—</span></div>'
                '<div class="row"><span class="unit" style="color:var(--put-dk)">賣出 put 的權利金（滾到到期）</span><span class="rd sm" id="d-put">—</span></div>'
                '<div class="row"><span class="unit">理論價值 V（以 C* 代入）</span><span class="rd sm" id="d-V">—</span></div></div>'
                '<div class="pane"><svg id="d-chart" viewBox="0 0 600 340" role="img" aria-label="以目前公平票息為票息的簡化 ELN 到期報償線"></svg></div></div>')
        return term('D', 'ELN 模擬器', '拖曳滑桿', body, f)
    if pid == 'S18':
        return None  # 測驗另外產生
    return ''


def quiz_html(tool, sec_all):
    qs = re.findall(r'^#### (Q\d)（(L\d)）\n(.*?)(?=^#### |^### |\Z)', sec_all, re.S | re.M)
    out = []
    for qid, lg, body in qs:
        q = field(body, '題目'); opts = field(body, '選項'); ans = field(body, '正確答案'); exp = field(body, '解說')
        parts = [p.strip() for p in re.split(r'\s*(?=[A-C]\. )', opts) if p.strip()]
        ai = 'ABC'.index(ans)
        labels = ''.join(f'<label><input type="radio" name="{qid}" value="{i}">{esc(p)}</label>' for i, p in enumerate(parts))
        out.append(f'<fieldset data-ans="{ai}"><legend><span class="qtag">{qid}（{lg}）</span> {esc(q)}</legend>{labels}'
                   f'<div class="fb" aria-live="polite"><b>正確答案：{ans}</b>　{inline(exp)}</div></fieldset>')
    foot = tool_foot(tool)
    body = ('<div class="panes p2"><div class="pane"><div class="lbl">進度</div><div class="row"><span class="rd sm" id="q-prog">—</span></div>'
            '<div class="lbl">答對題數</div><div class="row"><span class="rd" id="q-score" aria-live="polite">—</span></div>'
            '<div class="log" id="q-goals"></div></div>'
            f'<div class="pane quiz" id="quiz">{"".join(out)}<button type="button" class="btn" id="q-next" style="color:var(--t-text);border-color:var(--t-line-2);margin-top:10px">下一題</button></div></div>')
    return term('QUIZ', '小測驗', '選擇後看解說', body, foot)


def tn_html(tn):
    title = field(tn, '標題') or ''
    cards = []
    for it in bullets(tn):
        if it[0].startswith('標題：'):
            continue
        head = inline(it[0])
        rest = ''.join('<p>' + inline(x) + '</p>' for x in it[1:])
        cards.append(f'<div class="card"><p>{head}</p>{rest}</div>')
    return (f'<details class="tn c-wide anim d4"><summary><span class="tag">TECHNICAL NOTE ②</span><span class="tnt">{esc(title)}</span>'
            f'<span class="tog"></span></summary><div class="tnb">{"".join(cards)}</div></details>')


# ---------------- v2.1：頁型（style.md v2 §1.2）與頁首、章節分頁（§5.2、§5.3） ----------------
PTYPE = {'S01': 'P1', 'S02': 'P5', 'S03': 'P2', 'S04': 'P4', 'S05': 'P2', 'S06': 'P4', 'S07': 'P4', 'S08': 'P2',
         'S09': 'P4', 'S10': 'P4', 'S11': 'P4', 'S12': 'P3', 'S13': 'P2', 'S14': 'P6', 'S15': 'P6', 'S16': 'P6',
         'S17': 'P5', 'S18': 'P4w', 'S19': 'P3'}
DARK = {'P1', 'P2', 'P3'}
CHAPTERS = [('開場', '', 'S01', ['S01', 'S02']), ('1 選擇權', 'L1', 'S03', ['S03', 'S04']),
            ('2 隱含波動率', 'L2', 'S05', ['S05', 'S06', 'S07']), ('3 波動率曲面', 'L3', 'S08', ['S08', 'S09', 'S10', 'S11', 'S12']),
            ('4 結構型商品', 'L4', 'S13', ['S13', 'S14', 'S15', 'S16', 'S17']), ('測驗與總結', '', 'S18', ['S18', 'S19'])]
GOAL_PART = {'L1': 'Part 1 · 選擇權', 'L2': 'Part 2 · 隱含波動率', 'L3': 'Part 3 · 波動率曲面', 'L4': 'Part 4 · 結構型商品'}


def tabs_html(pid):
    cur = next(n for n, c in enumerate(CHAPTERS) if pid in c[3])
    out = []
    for n, (name, lg, first, _) in enumerate(CHAPTERS):
        cls = 'on' if n == cur else ('done' if n < cur else '')
        lab = f'<i>{lg}</i>' if lg else ''
        cur_attr = ' aria-current="true"' if n == cur else ''
        out.append(f'<a class="{cls}" href="#{first}"{cur_attr}>{name}{lab}</a>')
    return '<nav class="tabs" aria-label="章節">' + ''.join(out) + '</nav>'


def head_html(pid):
    return (f'<header class="phead"><span class="brand">Derivatives <b>Lab</b></span><span class="pt">{PARTS[pid]}</span>'
            f'<span class="nav"><button type="button" class="btn prev">Back</button><button type="button" class="btn next">Next</button></span>'
            f'<span class="pg"><b>{pid[1:]}</b> / 19</span></header>')


def title_html(title, big):
    """P2／P3 的宣言式大標題：「：」或「，」之後換行並用金色（只改樣式，不改文字）。"""
    t = inline(title, cite=False)
    if big:
        for sep in ('：', '，'):
            if sep in title:
                a, b = title.split(sep, 1)
                t = f'{inline(a, cite=False)}{sep}<br><em>{inline(b, cite=False)}</em>'
                break
    return f'<h1 class="ttl{" big" if big else ""}">{t}</h1>'


def card_li(p, pid):
    """P5 卡片：要點「標籤：內文」拆成卡頭與卡身；「：」保留在 DOM（視覺隱藏），文字不變。"""
    if '：' in p:
        h, b = p.split('：', 1)
        part = GOAL_PART.get(h.strip(), '') if pid == 'S02' else ''
        dp = f' data-part="{part}"' if part else ''
        return f'<li class="card"{dp}><span class="ch">{inline(h)}<span class="sr">：</span></span><span class="cb">{inline(b)}</span></li>'
    return f'<li class="card"><span class="cb">{inline(p)}</span></li>'


def page_html(pid, title, page):
    s = sections(page)
    head = page.split('\n### ')[0]
    meta = re.search(r'^- 目標：(.*?)｜深度：(.*?)｜工具：(.*)$', head, re.M)
    goal, depth = meta.group(1), meta.group(2)
    wikis = re.findall(r'\[\[([^\]]+)\]\]', field(head, '引用 wiki 頁') or '')
    layout = field(head, '版型') or ''
    pt = PTYPE[pid]
    goal_k = '開場' if goal.startswith('—（') else ('—' if goal == '—' else goal.replace('（每題標註）', ''))
    main = s.get('主文', '')
    lede = field(main, '導言') or ''
    pts = re.findall(r'^\d+\. (.*)$', main, re.M)
    if pt == 'P5':
        items = ''.join(card_li(p, pid) for p in pts)
        band = f'<div class="band cards anim d1"><p class="lede">{inline(lede)}</p><ul>{items}</ul></div>'
    else:
        ol = pt in ('P2', 'P3')
        lst = (('<ol>' if ol else '<ul>') + ''.join('<li>' + inline(p) + '</li>' for p in pts) + ('</ol>' if ol else '</ul>')) if pts else ''
        band = f'<div class="band anim d1"><p class="lede">{inline(lede)}</p>{lst}</div>'
    warn = ''
    if '頁首標註／必備標註' in s:
        w = re.sub(r'^⚠\s*', '', bullets(s['頁首標註／必備標註'])[0][0])
        warn = f'<p class="warn">{inline(w)}</p>'
    fig = s.get('圖')
    tool = s.get('工具')
    figure = ''
    defs_html = src = ''
    if fig:
        fm = re.search(r'^- (Fig\. \S+)　(.*)$', fig, re.M)
        sub = field(fig, '副標') or ''
        defs = [d.split('：', 1) for d in fields(fig, '名詞')]
        steps = field(fig, '逐步標註')
        src = field(fig, 'Source') or ''
        fwarn = field(fig, '免責標註（表下方）') or field(fig, '免責標註')
        defs_html = ('<dl class="defs">' + ''.join(f'<div><dt>{esc(a)}</dt><dd>{inline(b)}</dd></div>' for a, b in defs) + '</dl>') if defs else ''
        visual = ''
        if pid == 'S12':
            visual = ('<p class="note"><span class="ar">↗</span> 日曆價差：總變異數不能變小　'
                      '<span class="ar">↔</span> 蝶式：機率密度不能為負</p>') + tool_html(pid, tool)
        elif pid in TABLES:
            th, rows = TABLES[pid]
            tbl = '<table class="tt"><thead><tr><th>條款</th><th>內容</th></tr></thead><tbody>' + ''.join(
                f'<tr><td>{esc(a)}</td><td class="{"v" if re.search(r"[$%]", b) else ""}">{inline(b)}</td></tr>' for a, b in rows) + '</tbody></table>'
            visual = (f'<div class="struct"><div><p class="sechd">{STRUCT_HEAD[pid]}</p>{FIG_SVG[pid]()}</div>'
                      f'<div><p class="sechd">{th}</p>{tbl}</div></div>')
        elif pid in FIG_SVG:
            visual = FIG_SVG[pid]()
        stepper = ''
        if steps:
            items = [x.strip() for x in re.split(r'(?:^|\s)\d+\.\s', steps) if x.strip()]
            kinds = STEP_KIND.get(pid, ['gold'] * len(items))
            kinds = [('gold' if k == 'navy' else k) for k in kinds]
            cards = ''.join(f'<div class="card k-{kinds[i] if i < len(kinds) else "gold"}" data-n="{i + 1}"{"" if i == 0 else " hidden"}>{inline(t)}</div>' for i, t in enumerate(items))
            dots = ''.join(f'<span class="{"on" if i == 0 else ""}"></span>' for i in range(len(items)))
            stepper = (f'<div class="stepper" data-n="{len(items)}"><div class="ctl"><div class="sd">{dots}</div>'
                       f'<div><button type="button" class="btn sb" disabled>Back</button> <button type="button" class="btn sn">Next</button></div></div>{cards}</div>')
        fwarn_html = ('<div class="fwarn">' + inline(re.sub(r'^⚠\s*', '', fwarn)) + '</div>') if fwarn else ''
        if pid != 'S01':
            figure = (f'<figure class="fig anim d2"><div class="fno">{esc(fm.group(1))}　{esc(fm.group(2))}</div>'
                      f'<div class="fbody"><div class="fsub">{inline(sub)}</div>{visual}{stepper}{defs_html}'
                      f'<div class="src">Source：{esc(src)}</div>' + fwarn_html + '</div></figure>')
    tool_block = ''
    if pid == 'S18':
        tool_block = quiz_html(tool, page)
    elif tool and pid not in ('S01', 'S12'):
        tool_block = tool_html(pid, tool)
    tn = tn_html(s['進階（Technical Note ②）']) if '進階（Technical Note ②）' in s else ''
    notes = ''
    if '講者備註' in s:
        notes = ('<details class="notes"><summary>SPEAKER NOTES · 講者備註（N）</summary><ul>'
                 + ''.join('<li>' + inline(' '.join(b)) + '</li>' for b in bullets(s['講者備註'])) + '</ul></details>')
    # 頁尾來源：只取出處括號（…）與 Source 行中的來源 ID（沿用 v2 C5-v2-r1-01～08 的修正）
    ids = set()
    for par in PAREN.findall(page):
        ids |= set(re.findall(r'\bS([1-9]\d?)\b', par))
    for line in re.findall(r'^- Source：(.*)$', page, re.M):
        ids |= set(re.findall(r'\bS([1-9]\d?)\b', line))
    srcs = sorted([x for x in ids if 1 <= int(x) <= 13], key=int)
    foot = (f'<div class="pfoot"><span class="wk">Wiki：{"、".join(esc(w) for w in wikis)}'
            + (f'｜來源：{"、".join("S" + x for x in srcs)}' if srcs else '') + f'</span><span>Page {pid[1:]}</span></div>')
    kicker = f'<p class="kicker">{esc(goal_k)} · {esc(depth)}</p>'
    cls = 'slide t-' + pt + ('' if pt in DARK else ' light')

    if pt == 'P1':
        sub = field(head, '副標') or ''
        fm = re.search(r'^- (Fig\. \S+)　(.*)$', fig, re.M)
        fsub = field(fig, '副標') or ''
        legend = (f'<div class="legend"><p class="lg-t">{esc(fm.group(1))}　{esc(fm.group(2))}</p><p>{inline(fsub)}</p>'
                  '<p class="lg-r">隱含波動率 <b id="a1-read" aria-live="polite">—</b><span>（滑鼠停在曲面上）</span></p>'
                  '<p class="lg-i">示意參數 · 拖曳或 ← → ↑ ↓ 旋轉</p></div>')
        cover_band = band.replace('class="band anim d1"', 'class="band cover-band anim d2"')
        glossary = f'<details class="cdefs"><summary>本頁名詞（{len(fields(fig, "名詞"))}）</summary>{defs_html}</details>'
        body = (f'<div class="stage surf3d" id="a1-stage"></div><div class="veil" aria-hidden="true"></div>{head_html(pid)}{legend}'
                f'<div class="hero"><p class="kicker anim d1">Derivatives Lab · {esc(PARTS[pid])}</p>'
                f'<h1 class="ctitle anim d1">波動率為什麼<br><em>不是</em>一個數字？</h1><div class="crule"></div><p class="csub anim d1">{esc(sub)}</p>'
                f'{cover_band}<div class="cfoot">{glossary}<p class="src">Source：{esc(src)}</p><p class="tfoot-s">{tool_foot(tool)}</p></div></div>'
                f'{notes}{foot}{tabs_html(pid)}')
        return f'<section class="{cls}" id="{pid}" aria-label="{pid} {esc(title)}" data-layout="{esc(layout)}" data-ptype="{pt}">{body}</section>'

    titles = f'<div class="titles">{kicker}{title_html(title, pt in ("P2", "P3"))}{warn}</div>'
    if pt == 'P6':
        vis, extra = figure, tool_block
    else:
        vis = figure or tool_block
        extra = tool_block if (figure and tool_block) else ''
    grid = (f'<div class="grid">{titles}{band}'
            + (f'<div class="vis">{vis}</div>' if vis else '')
            + (f'<div class="extra">{extra}{tn}</div>' if (extra or tn) else '') + '</div>')
    body = f'{head_html(pid)}{grid}{notes}{foot}{tabs_html(pid)}'
    return f'<section class="{cls}" id="{pid}" aria-label="{pid} {esc(title)}" data-layout="{esc(layout)}" data-ptype="{pt}">{body}</section>'


pages = re.split(r'^## (S\d\d)｜(.*)$', SRC, flags=re.M)
slides = []
for i in range(1, len(pages), 3):
    slides.append(page_html(pages[i], pages[i + 1].strip(), pages[i + 2]))

HTML = f'''<!doctype html>
<html lang="zh-Hant">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="icon" href="data:,">
<title>Derivatives Lab｜波動率為什麼不是一個數字？</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Noto+Serif+TC:wght@700;900&family=Source+Serif+4:opsz,wght@8..60,700&family=Noto+Sans+TC:wght@400;500;700&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.9/katex.min.css">
<link rel="stylesheet" href="assets/deck.css">
</head>
<body>
<!-- run v2.1 / N5 產出：由 runs/v2.1/n5_build.py 依 slides/slides.md 與 style.md v2 產生；互動工具呼叫 lab/*.js（C3 測試過的函式） -->
<main class="deck">
{chr(10).join(slides)}
</main>
<script src="../lab/bs.js"></script>
<script src="../lab/iv.js"></script>
<script src="../lab/svi.js"></script>
<script src="../lab/eln.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
<script src="assets/surface3d.js"></script>
<script defer src="https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.9/katex.min.js"></script>
<script defer src="https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.9/contrib/auto-render.min.js"></script>
<script defer src="assets/deck.js"></script>
</body>
</html>
'''
open(os.path.join(ROOT, 'slides', 'index.html'), 'w', encoding='utf-8', newline='\n').write(HTML)
print('slides:', len(slides))
