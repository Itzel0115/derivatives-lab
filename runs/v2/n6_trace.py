# runs/v2/n6_trace.py — N6：產生 trace.md（投影片 → wiki 頁 → 原始來源）。用法：py runs/v2/n6_trace.py
import re
src = open('slides/slides.md', encoding='utf-8').read()
idx = open('wiki/index.md', encoding='utf-8').read()
pages = {}  # slug -> (title, path, sources)
for m in re.finditer(r'^\| \[([^\]]+)\]\(([^)]+)\) \| [^|]* \| ([^|]*) \|', idx, re.M):
    title, path, srcs = m.group(1), m.group(2), m.group(3)
    slug = path.split('/')[-1][:-3]
    pages[slug] = (title, 'wiki/' + path, [s.strip() for s in srcs.split(',') if s.strip().startswith('S')])
pages['index'] = ('Wiki 索引', 'wiki/index.md', [])
pages['glossary'] = ('術語表', 'wiki/glossary.md', [])
ASIDE = {'S05': ['call-put-option'], 'S08': ['svi-parameterization'], 'S18': ['call-put-option']}  # C4 r1 報告 §4.5 的 ✅註
RELEVANT = ['call-put-option', 'strike-maturity-moneyness', 'payoff-diagram', 'black-scholes-model', 'bs-assumptions-limitations',
            'put-call-parity', 'implied-volatility', 'iv-inversion-algorithm', 'volatility-smile-skew', 'volatility-term-structure',
            'why-skew-exists', 'volatility-surface', 'svi-parameterization', 'no-arbitrage-surface', 'vega',
            'structured-note-architecture', 'eln-simplified', 'estimated-value-vs-issue-price', 'issuer-credit-risk',
            'liquidity-risk', 'common-misconceptions']
parts = re.split(r'^## (S\d\d)｜(.*)$', src, flags=re.M)
rows, used = [], {}
def cited(page):
    ids = set()
    for p in re.findall(r'（[^（）]*）', page): ids |= set(re.findall(r'\bS([1-9]\d?)\b', p))
    for l in re.findall(r'^- Source：(.*)$', page, re.M): ids |= set(re.findall(r'\bS([1-9]\d?)\b', l))
    return ['S' + x for x in sorted([x for x in ids if 1 <= int(x) <= 13], key=int)]
def link(slug, c):
    t, p, s = pages[slug]
    inter = [x for x in s if x in c]
    return f'[{t}]({p})（{"、".join(inter) if inter else "—"}）'
for i in range(1, len(parts), 3):
    pid, title, page = parts[i], parts[i + 1].strip(), parts[i + 2]
    slugs = re.findall(r'\[\[([^\]]+)\]\]', re.search(r'^- 引用 wiki 頁：(.*)$', page, re.M).group(1))
    c = cited(page)
    for s in slugs + ASIDE.get(pid, []): used.setdefault(s, []).append(pid)
    aside = '<br>'.join(link(s, c) for s in ASIDE.get(pid, [])) or '—'
    rows.append(f'| {pid} | {title} | {"<br>".join(link(s, c) for s in slugs)} | {aside} | {"、".join(c) or "—"} |')
cov = [s for s in RELEVANT if any(s in re.findall(r'\[\[([^\]]+)\]\]', re.search(r'^- 引用 wiki 頁：(.*)$', parts[i + 2], re.M).group(1)) for i in range(1, len(parts), 3))]
out = f'''# Trace｜run v2｜投影片 → wiki 頁 → 原始來源

> run v2 / N6 產出（由 `runs/v2/n6_trace.py` 產生）。依據：`slides/slides.md`（C4 第 2 輪通過，commit `79432b9`）與 `wiki/index.md`；成品 `slides/index.html`（C5 第 2 輪通過，commit `33131a9`）。
> 連結使用標準 Markdown 相對路徑（`AGENTS.md` §3），可在 GitHub 網頁上直接點選。
> 「引用的 wiki 頁」欄括號內的來源 ID：該 wiki 頁的來源（`wiki/index.md`「來源」欄）中，確實在這一頁投影片的出處括號或 Source 行裡出現的那些。
> 「補充」欄：C4 第 1 輪報告 §4.5 指出，這些主張在 wiki 中的對應句位於另一個頁面，但該頁沒有列在投影片的引用清單中（✅註，不計問題）；這裡補上，讓追溯不斷鏈。
> 自行推導的主張（出處寫成「F17 推導」等）追溯到對應 wiki 頁的推導區塊與 C3 測試，見 `runs/v2/C3_report.md`。

## 1. 逐頁追溯

| 頁 | 標題 | 引用的 wiki 頁（本頁引用的來源） | 補充：對應句所在頁 | 本頁引用的全部來源 |
|---|---|---|---|---|
{chr(10).join(rows)}

## 2. 覆蓋率

本次相關頁（`GRAPH_SPEC.md` §2.4，共 {len(RELEVANT)} 頁）中，被投影片引用清單列出的：**{len(cov)} / {len(RELEVANT)}**。

| 本次相關頁 | 引用它的投影片 |
|---|---|
''' + '\n'.join(f'| [{pages[s][0]}]({pages[s][1]}) | {"、".join(sorted(set(used.get(s, []))))} |' for s in RELEVANT) + '\n'
open('trace.md', 'w', encoding='utf-8', newline='\n').write(out)
print('coverage', len(cov), '/', len(RELEVANT))
