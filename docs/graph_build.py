# docs/graph_build.py — 產生 docs/graph.html（GRAPH_SPEC v2 的 graph 示意圖，手動排版的 SVG）。
# 節點與跳轉照 GRAPH_SPEC.md §4；只畫圖，不改規格。用法：py docs/graph_build.py，再用瀏覽器截圖成 docs/graph.png。
import os

W, H = 1180, 1175
CX = 600                      # 主幹
BW, BH = 220, 46
N_FILL, N_TXT = '#151B2C', '#F2F2F2'
C_FILL, C_LINE = '#EADFB8', '#A8893A'
SOLID, DASH, GOLD = '#3B4458', '#6A7FA8', '#A8893A'

nodes = {  # id: (cx, cy, 文字, 種類)
    'N0': (CX, 70, 'N0 Ingest 來源', 'n'), 'C0': (CX, 140, 'C0 Ingest 檢查', 'c'),
    'N1': (CX, 230, 'N1 覆蓋對照', 'n'), 'C1': (CX, 300, 'C1 覆蓋檢查', 'c'),
    'N2': (CX, 390, 'N2 大綱＋術語首次出現表', 'n'), 'C2': (CX, 460, 'C2 大綱檢查（含 C2-7 術語）', 'c'),
    'H1': (CX, 550, 'H1 人工審大綱', 'h'),
    'N3': (450, 650, 'N3 公式卡 → 程式', 'n'), 'C3': (450, 720, 'C3 單元測試', 'c'),
    'N4': (750, 650, 'N4 逐頁內容', 'n'), 'C4': (750, 720, 'C4 對照檢查（含 C4-7 字數）', 'c'),
    'N5': (CX, 820, 'N5 產出 HTML', 'n'), 'C5': (CX, 890, 'C5 呈現檢查', 'c'),
    'N6': (CX, 980, 'N6 Trace 與報告', 'n'), 'C6': (CX, 1050, 'C6 完整性檢查', 'c'),
    'DONE': (CX, 1135, '發布（GitHub Pages）', 's'), 'STOP': (905, 300, 'STOP-DATA', 's'),
}
out = []


def L(x):
    return nodes[x][0] - BW / 2


def R(x):
    return nodes[x][0] + BW / 2


def Y(x):
    return nodes[x][1]


def T(x):
    return nodes[x][1] - BH / 2


def B(x):
    return nodes[x][1] + BH / 2


def text(x, y, s, size=14, color='#3B4458', anchor='middle', weight=400):
    out.append(f'<text x="{x}" y="{y}" font-size="{size}" fill="{color}" text-anchor="{anchor}" font-weight="{weight}">{s}</text>')


def path(d, color=SOLID, dash=False, width=1.6):
    da = ' stroke-dasharray="6 5"' if dash else ''
    mk = {SOLID: 'as', DASH: 'ad', GOLD: 'ag'}[color]
    out.append(f'<path d="{d}" fill="none" stroke="{color}" stroke-width="{width}"{da} marker-end="url(#{mk})"/>')


# --- 主幹（實線） ---
for a, b in [('N0', 'C0'), ('C0', 'N1'), ('N1', 'C1'), ('C1', 'N2'), ('N2', 'C2'), ('C2', 'H1'), ('N3', 'C3'), ('N4', 'C4'), ('N5', 'C5'), ('C5', 'N6'), ('N6', 'C6'), ('C6', 'DONE')]:
    ax, bx = nodes[a][0], nodes[b][0]
    path(f'M{ax} {B(a)} L{bx} {T(b) - 2}')
for a, b, lab in [('C0', 'N1', '通過'), ('C1', 'N2', '通過'), ('C2', 'H1', '通過'), ('C5', 'N6', '通過'), ('C6', 'DONE', '通過')]:
    text(nodes[a][0] + 10, (B(a) + T(b)) / 2 + 5, lab, 13, anchor='start')
path(f'M{CX - 40} {B("H1")} C {CX - 40} {B("H1") + 30}, 450 {T("N3") - 40}, 450 {T("N3") - 2}')
path(f'M{CX + 40} {B("H1")} C {CX + 40} {B("H1") + 30}, 750 {T("N4") - 40}, 750 {T("N4") - 2}')
text(CX, B('H1') + 30, '核准 → N3、N4 平行執行', 13)
path(f'M450 {B("C3")} C 450 {B("C3") + 40}, {CX - 40} {T("N5") - 40}, {CX - 40} {T("N5") - 2}')
path(f'M750 {B("C4")} C 750 {B("C4") + 40}, {CX + 40} {T("N5") - 40}, {CX + 40} {T("N5") - 2}')
text(CX, B('C3') + 34, '兩者都通過 → N5', 13)
path(f'M{R("C1")} {Y("C1")} L{nodes["STOP"][0] - 72} {Y("C1")}')
text((R('C1') + nodes['STOP'][0] - 72) / 2, Y('C1') - 8, '缺頁且無公開來源', 13)

# --- 同一節點的重做迴圈（右側弧線） ---
for c, n, lab, side in [('C0', 'N0', '不通過 ≤ 2 輪', 1), ('C2', 'N2', '不通過 ≤ 3 輪', 1), ('C3', 'N3', '程式錯 ≤ 3 輪', -1),
                        ('C4', 'N4', '不通過 ≤ 3 輪', 1), ('C5', 'N5', '版面或程式 ≤ 3 輪', 1)]:
    x0 = (R(c) if side > 0 else L(c))
    bulge = x0 + 55 * side
    path(f'M{x0} {Y(c)} C {bulge} {Y(c)}, {bulge} {Y(n)}, {x0 + 2 * side} {Y(n)}')
    text(bulge + 6 * side, (Y(c) + Y(n)) / 2 + 5, lab, 13, anchor='start' if side > 0 else 'end')

# --- 回到上游的跳轉（虛線，走左右兩側的車道） ---
def jump(src, dst, lane, lab, color=DASH, dy_src=0, dy_dst=0, side=-1, below=False):
    sx = L(src) if side < 0 else R(src)
    tx = L(dst) if side < 0 else R(dst)
    sy, ty = Y(src) + dy_src, Y(dst) + dy_dst
    path(f'M{sx} {sy} L{lane} {sy} L{lane} {ty} L{tx - 2 * side} {ty}', color, dash=True, width=1.6 if color == DASH else 2.2)
    text((sx + lane) / 2, sy + (17 if below else -7), lab, 12.5, color if color == GOLD else '#5C6579')


jump('C1', 'N0', 320, '缺頁但有公開來源', dy_dst=6)
jump('C2', 'N1', 285, '術語未收錄（v2 新增）', GOLD, dy_dst=8)
jump('H1', 'N2', 250, '要修改', dy_src=-10, dy_dst=6)
jump('H1', 'N1', 215, '要新增概念', dy_src=12, dy_dst=0, below=True)
jump('C3', 'N1', 180, '公式卡錯或缺', dy_src=12, dy_dst=-8, below=True)
jump('C4', 'N1', 1010, 'wiki 沒有此資訊', dy_src=12, dy_dst=-6, side=1, below=True)
jump('C5', 'N4', 1045, '內容問題', dy_dst=-8, side=1)
jump('C6', 'N4', 1080, '相關頁未引用', dy_src=-10, dy_dst=8, side=1)
jump('C6', 'N2', 1115, '大綱缺段落', dy_src=12, dy_dst=-8, side=1, below=True)

# --- 節點 ---
for k, (x, y, s, kind) in nodes.items():
    w = {'STOP': 150, 'DONE': 200, 'H1': 280}.get(k, BW)
    if kind == 'n':
        out.append(f'<rect x="{x - w / 2}" y="{y - BH / 2}" width="{w}" height="{BH}" fill="{N_FILL}"/>')
        text(x, y + 5, s, 15, N_TXT, weight=700)
    elif kind == 'c':
        out.append(f'<rect x="{x - w / 2}" y="{y - BH / 2}" width="{w}" height="{BH}" rx="23" fill="{C_FILL}" stroke="{C_LINE}" stroke-width="1.5"/>')
        text(x, y + 5, s, 14.5, '#151B2C', weight=700)
    elif kind == 'h':
        out.append(f'<polygon points="{x - w / 2 + 14},{y - BH / 2} {x + w / 2},{y - BH / 2} {x + w / 2 - 14},{y + BH / 2} {x - w / 2},{y + BH / 2}" fill="#FFFFFF" stroke="#3E5D96" stroke-width="2"/>')
        text(x, y + 5, s + '（唯一人工關卡）', 14.5, '#151B2C', weight=700)
    else:
        out.append(f'<rect x="{x - w / 2}" y="{y - BH / 2}" width="{w}" height="{BH}" rx="8" fill="#E6E8EE" stroke="#6A7FA8"/>')
        text(x, y + 5, s, 14, '#151B2C')

svg = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" width="{W}" height="{H}" font-family="Noto Sans TC, sans-serif" role="img" aria-label="GRAPH_SPEC v2 的簡報生成流程圖">
<defs>
<marker id="as" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 L10 5 L0 10z" fill="{SOLID}"/></marker>
<marker id="ad" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 L10 5 L0 10z" fill="{DASH}"/></marker>
<marker id="ag" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 L10 5 L0 10z" fill="{GOLD}"/></marker>
</defs>
{chr(10).join(out)}
</svg>'''

html = f'''<!doctype html>
<html lang="zh-Hant"><head><meta charset="utf-8"><title>Derivatives Lab｜簡報生成 graph</title>
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@400;700&family=Noto+Serif+TC:wght@900&display=swap" rel="stylesheet">
<style>
body {{ margin:0; background:#F2F2F2; color:#151B2C; font-family:"Noto Sans TC",sans-serif; }}
.wrap {{ width:{W}px; padding:28px 36px 20px; }}
h1 {{ font-family:"Noto Serif TC",serif; font-weight:900; font-size:30px; margin:0; }}
h1::after {{ content:""; display:block; width:56px; height:3px; background:#A8893A; margin-top:10px; }}
p {{ color:#3B4458; font-size:15px; line-height:1.7; margin:12px 0 0; }}
.lg {{ display:flex; gap:22px; font-size:14px; color:#3B4458; margin:10px 0 6px; flex-wrap:wrap; }}
.lg i {{ display:inline-block; width:22px; height:12px; margin-right:6px; vertical-align:-1px; }}
.note {{ font-size:13px; color:#5C6579; }}
</style></head><body><div class="wrap">
<h1>Derivatives Lab｜簡報生成 graph（GRAPH_SPEC v2）</h1>
<p>深色＝產出節點，金色＝檢查節點。檢查不通過時只修報告列出的問題，並回到同一節點重做（右側弧線，輪數有上限）；發現問題出在上游時，跳回上游節點（虛線）。</p>
<div class="lg"><span><i style="background:#151B2C"></i>產出節點 N0–N6</span><span><i style="background:#EADFB8;border:1.5px solid #A8893A"></i>檢查節點 C0–C6</span>
<span><i style="border-top:2px dashed #6A7FA8;height:0"></i>跳回上游</span><span><i style="border-top:2.5px dashed #A8893A;height:0"></i>v2 往前移的檢查</span></div>
{svg}
<p class="note">全域停止規則：MAX-ROUNDS（某個 loop 達輪數上限）、STOP-SCOPE（需要新增概念或改架構）、STOP-REGRESSION（修正讓已通過的檢查失敗 → git 回復）、BUDGET（總修正輪數 &gt; 12）。v2 另把字數檢查從 C5 前移到 C4（C4-7）。完整規格見 GRAPH_SPEC.md。</p>
</div></body></html>'''
open(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'graph.html'), 'w', encoding='utf-8', newline='\n').write(html)
print('ok')
