"""Wiki 健檢（對應 AGENTS.md §10 第 4–10 項）。

用法（在專案根目錄執行）：
    python tools/check_quotes.py     # 先跑：第 1–3 項（標籤、出處、短引、連結）
    python tools/lint.py             # 再跑：其餘各項

只讀取、不修改任何檔案。依 AGENTS.md §10，lint 只回報、不自動修正；
把輸出整理成 runs/<run-id>/lint_report.md，並在 wiki/log.md 記一筆 lint。

檢查內容：
  - GRAPH_SPEC §2.4 清單中尚未建立的頁面；清單以外的多餘頁面
  - 孤立頁（沒有其他頁面連入）
  - index.md 與實際檔案是否一致
  - 公式卡 ID：重複、跳號、未登記在 index、被引用但沒有定義
  - 尚未裁決的來源衝突
  - 禁止內容：圖片、類似 API key 的字串、電子郵件、提到 Bloomberg 的行
  - index 的狀態統計、有「待補」的頁面數
  - 術語表：候選術語是否收錄（啟發式，不完整）、是否依英文字母排序、連結是否有效
  - 來源頁的必備欄位；來源頁的支撐清單與實際引用是否一致
  - 各頁「來源」區、index 來源欄與實際引用是否一致
  - log.md 標題列格式

注意：EXPECTED 是 GRAPH_SPEC §2.4 的頁面清單，§2.4 有變動時要同步更新這裡。
"""
import glob
import os
import re
import sys

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

W = 'wiki'
files = sorted(glob.glob(W + '/**/*.md', recursive=True))
txt = {f.replace('\\', '/'): open(f, encoding='utf-8').read() for f in files}
names = {os.path.splitext(os.path.basename(f))[0]: f for f in txt}

EXPECTED = """concepts/call-put-option concepts/strike-maturity-moneyness concepts/payoff-diagram
concepts/black-scholes-model concepts/bs-assumptions-limitations concepts/put-call-parity
concepts/implied-volatility concepts/iv-inversion-algorithm concepts/volatility-smile-skew
concepts/volatility-term-structure concepts/why-skew-exists concepts/volatility-surface
concepts/svi-parameterization concepts/no-arbitrage-surface concepts/greeks-overview concepts/vega
concepts/delta concepts/gamma concepts/theta products/structured-note-architecture
products/eln-simplified products/estimated-value-vs-issue-price products/principal-protected-note
products/autocallable risks/issuer-credit-risk risks/liquidity-risk risks/common-misconceptions""".split()

print('== 9. pages in GRAPH_SPEC 2.4 not created')
missing = [e for e in EXPECTED if W + '/' + e + '.md' not in txt]
print('  missing:', missing or 'none', '| expected', len(EXPECTED))

print('== extra pages outside 2.4 / fixed files')
allowed = {W + '/' + e + '.md' for e in EXPECTED} | {W + '/index.md', W + '/log.md', W + '/glossary.md'}
extra = [f for f in txt if f not in allowed and not f.startswith(W + '/sources/')]
print('  extra:', extra or 'none', '| source pages:', len([f for f in txt if f.startswith(W + '/sources/')]))

print('== 4. orphan pages (no inbound wikilink from another page)')
inbound = {n: set() for n in names}
for f, s in txt.items():
    me = os.path.splitext(os.path.basename(f))[0]
    for t in re.findall(r'\[\[([^\]|]+)', s):
        if t in inbound and t != me:
            inbound[t].add(me)
orph = [n for n, v in inbound.items() if not v and n not in ('index', 'log', 'glossary')]
print('  orphans:', orph or 'none')
weak = sorted((len(v), n) for n, v in inbound.items() if n not in ('index', 'log', 'glossary'))[:5]
print('  fewest inbound:', weak)

print('== 5. index.md vs files')
idx = txt[W + '/index.md']
linked = set(re.findall(r'\]\(([^)]+\.md)\)', idx))
onDisk = {f[len(W) + 1:] for f in txt if f not in (W + '/index.md',)}
print('  on disk but not in index:', sorted(onDisk - linked) or 'none')
print('  in index but not on disk:', sorted(linked - onDisk) or 'none')

print('== 6. formula cards')
defs = {}
for f, s in txt.items():
    for m in re.finditer(r'^> \*\*(F\d\d)｜', s, re.M):
        defs.setdefault(m.group(1), []).append(os.path.basename(f))
ids = sorted(defs)
print('  defined:', ' '.join(ids))
print('  duplicates:', {k: v for k, v in defs.items() if len(v) > 1} or 'none')
nums = [int(i[1:]) for i in ids]
print('  gaps:', [f'F{n:02d}' for n in range(1, max(nums) + 1) if n not in nums] or 'none')
idxF = set(re.findall(r'F\d\d', idx))
print('  defined but not registered in index:', sorted(set(ids) - idxF) or 'none')
print('  registered in index but not defined:', sorted(idxF - set(ids)) or 'none')
used = set()
for f, s in txt.items():
    used |= set(re.findall(r'F\d\d', s))
print('  referenced anywhere but not defined:', sorted(used - set(ids)) or 'none')
for k in ids:
    f = names[os.path.splitext(defs[k][0])[0]]
    row = [l for l in idx.split('\n') if os.path.basename(f) in l]
    if row and k not in row[0]:
        print('  index row for', defs[k][0], 'does not list', k)

print('== 8. unresolved conflicts')
print('  pages with pending conflict:', [f for f, s in txt.items() if '待裁決' in s and '## ⚠ 來源衝突' in s] or 'none')
print('  pages with a conflict section at all:', [f for f, s in txt.items() if '## ⚠ 來源衝突' in s] or 'none')

print('== 10. forbidden content')
print('  images:', [f for f, s in txt.items() if re.search(r'!\[[^\]]*\]\(', s)] or 'none')
print('  api-key-like:', [f for f, s in txt.items() if re.search(r'(api[_ -]?key|sk-[A-Za-z0-9]{16,}|AKIA[0-9A-Z]{12,})', s, re.I)] or 'none')
print('  email addresses:', sorted({m for s in txt.values() for m in re.findall(r'[\w.+-]+@[\w-]+\.[\w.]+', s)}) or 'none')
for f, s in txt.items():
    for n, l in enumerate(s.split('\n'), 1):
        if re.search('bloomberg', l, re.I):
            print('  Bloomberg mention:', f, n)

print('== statuses in index')
st = re.findall(r'\| (未建立|草稿|完整|有衝突) \|', idx)
print('  ', {k: st.count(k) for k in set(st)})
print('  drafts:', [re.search(r'\[([^\]]+)\]', l).group(1) for l in idx.split('\n') if '| 草稿 |' in l])

print('== pages with a 待補 section')
tb = {os.path.basename(f): len(re.findall(r'^- ', s.split('## 待補')[1], re.M)) for f, s in txt.items() if '## 待補' in s}
print('  count:', len(tb), '| total items:', sum(tb.values()))

print('== 7. glossary coverage (heuristic)')
gl = txt[W + '/glossary.md']
cands = ['對數常態', '風險中立', '遠期價格', '局部波動率', '隨機波動率', '跳躍擴散', '障礙價', '配息障礙價', '複委託',
         '疊券', 'bail-in', '套利', '平倉', '掩護', '布朗運動', '機率密度', '累積分布', '零息債券', '票息', '面額',
         '次級市場', '避險', '複製', '漂移', '保證金', '槓桿', '到期報償', '報償', 'moneyness', '執行價', '觀察日']
for c in cands:
    n = sum(s.count(c) for f, s in txt.items() if f not in (W + '/glossary.md', W + '/log.md', W + '/index.md'))
    pages = sum(1 for f, s in txt.items() if c in s and f not in (W + '/glossary.md', W + '/log.md', W + '/index.md'))
    if n and c not in gl:
        print(f'  not in glossary: {c}  (uses {n}, pages {pages})')

print('== glossary alphabetical order (by English column)')
rows = [l.split('|') for l in gl.split('\n') if l.startswith('| ') and '---' not in l and 'English' not in l]
eng = [r[2].strip().lower() for r in rows]
bad = [(eng[i], eng[i + 1]) for i in range(len(eng) - 1) if eng[i] > eng[i + 1]]
print('  rows:', len(rows), '| out-of-order adjacent pairs:', bad or 'none')
dup = sorted({e for e in eng if eng.count(e) > 1})
print('  duplicate English terms:', dup or 'none')

print('== glossary links resolve / page column')
for r in rows:
    for t in re.findall(r'\[\[([^\]|]+)', r[5]):
        if t not in names:
            print('  broken glossary link:', t)

print('== source pages: required fields')
REQ = ['標題', '作者／機構', '發布日期', 'URL', '取得日期', '原始檔路徑', 'SHA-256', '是否 commit', '取得狀態']
for f, s in txt.items():
    if f.startswith(W + '/sources/'):
        miss = [k for k in REQ if '| ' + k + ' |' not in s]
        if miss:
            print('  ', os.path.basename(f), 'missing', miss)
        if '## 由本來源支撐的 wiki 頁' not in s:
            print('  ', os.path.basename(f), 'missing supported-pages section')

print('== source page "supported pages" vs actual citations')
for f, s in txt.items():
    if not f.startswith(W + '/sources/'):
        continue
    sid = re.search(r'\| 來源 ID \| (S\d+) \|', s).group(1)
    sec = s.split('## 由本來源支撐的 wiki 頁')[1].split('\n## ')[0]
    listed = set(re.findall(r'\[\[([^\]|]+)', sec)) - {'glossary'}
    citing = set()
    for g, t in txt.items():
        n = os.path.splitext(os.path.basename(g))[0]
        if g.startswith(W + '/sources/') or n in ('index', 'log', 'glossary'):
            continue
        if re.search(r'（' + sid + r', ', t):
            citing.add(n)
    if citing - listed:
        print('  ', sid, 'cited by but not listed:', sorted(citing - listed))
    if listed - citing:
        print('  ', sid, 'listed but never cited there:', sorted(listed - citing))

print('== concept/product/risk pages: source section lists every cited source')
for f, s in txt.items():
    n = os.path.splitext(os.path.basename(f))[0]
    if f.startswith(W + '/sources/') or n in ('index', 'log', 'glossary'):
        continue
    cited = set(re.findall(r'（(S\d+), ', s))
    SRCH = chr(10) + '## 來源' + chr(10)
    sec = s.split(SRCH)[1] if SRCH in s else ''
    listed = set(re.findall(r'\|(S\d+)\]\]', sec))
    if cited - listed:
        print('  ', n, 'cites but does not list:', sorted(cited - listed))
    if listed - cited:
        print('  ', n, 'lists but does not cite:', sorted(listed - cited))
    row = [l for l in idx.split('\n') if '/' + n + '.md)' in l]
    if row:
        idxsrc = set(re.findall(r'S\d+', row[0].split('|')[3]))
        if idxsrc != cited:
            print('  ', n, 'index sources', sorted(idxsrc), '!= cited', sorted(cited))

print('== log.md entry headers')
log = txt[W + '/log.md']
heads = re.findall(r'^## \[(\d{4}-\d\d-\d\d)\] (\w+) \| ', log, re.M)
allh = re.findall(r'^## .*', log, re.M)
print('  entries:', len(allh), '| well-formed:', len(heads), '| ops:', {o: [h[1] for h in heads].count(o) for o in set(h[1] for h in heads)})
