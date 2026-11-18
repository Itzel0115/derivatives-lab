"""引文與連結檢查（對應 GRAPH_SPEC C0-3、C0-4、C0-5 與 AGENTS.md §10 第 1–3 項）。

用法（在專案根目錄執行）：
    python tools/check_quotes.py

做什麼：
  1. 把 raw/ 中的原始檔轉成純文字，快取在 .cache/source-text/（已列入 .gitignore）。
     PDF 用 pdftotext -layout（需要安裝 poppler）；HTML 用 tools/html2txt.py。
  2. 掃描 wiki/ 的每一條主張：
     - 是否有類型標籤後的出處（S<n>, …）
     - [事實]／[觀點] 的下一行是否有原句短引
     - 短引是否逐字出現在該來源的文字中；出處寫 p.<數字> 時，是否就在那一頁
     - 英文短引是否超過 30 個字
  3. 檢查連結：wikilink 是否指向存在的頁面；index.md 是否誤用 [[ ]]；
     其他頁是否誤用相對路徑連結。

做不到的（見 runs/pre-run/lint_report.md L-08）：
  - 沒有短引的 [範例]／[推導]，頁碼無法核對。
  - 出處寫成 §小標題、p.PS-n、§cover、§Summary 時，只確認短引出現在來源中，不核對位置。
  - 中文短引的 50 字上限、範例數字是否抄對、中文改寫是否忠於原意。

raw/ 中沒有某份來源的原檔時（原檔多數只留本機），該來源的短引會被略過並在最後列出。
結束代碼：有問題為 1，否則為 0。
"""
import glob
import os
import re
import subprocess
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from html2txt import html_to_text  # noqa: E402

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

WIKI = 'wiki'
RAW = 'raw'
CACHE = os.path.join('.cache', 'source-text')

# 印刷頁碼 = PDF 頁序 - PAGE_OFFSET。沒有列出的來源為 0。
# S1：正文 p.3 是 PDF 第 5 頁。S11：正文 p.1 是 PDF 第 6 頁。
PAGE_OFFSET = {'S1': 2, 'S11': 5}


def norm(s):
    for a, b in (('—', '--'), ('–', '-'), ('“', '"'), ('”', '"'),
                 ('’', "'"), ('‘', "'"), ('�', ''), ('®', ''), ('™', '')):
        s = s.replace(a, b)
    s = re.sub(r'\s+', ' ', s).strip()
    # PDF 斷行處的連字號：「cash- settled」視為「cash-settled」
    return re.sub(r'(\w)- (\w)', lambda m: m.group(1) + '-' + m.group(2), s)


def decode(b):
    try:
        return b.decode('utf-8')
    except UnicodeDecodeError:
        return b.decode('cp1252', 'replace')


def extract_sources():
    """回傳 {來源 ID: [各頁的正規化文字]}。"""
    os.makedirs(CACHE, exist_ok=True)
    out = {}
    for path in sorted(glob.glob(os.path.join(RAW, 's*-*'))):
        base = os.path.basename(path)
        m = re.match(r's(\d+)-', base)
        ext = os.path.splitext(base)[1].lower()
        if not m or ext not in ('.pdf', '.html', '.htm'):
            continue
        sid = 'S' + m.group(1)
        cached = os.path.join(CACHE, os.path.splitext(base)[0] + '.txt')
        if not os.path.exists(cached) or os.path.getmtime(cached) < os.path.getmtime(path):
            if ext == '.pdf':
                try:
                    subprocess.run(['pdftotext', '-layout', path, cached], check=True)
                except (OSError, subprocess.CalledProcessError) as e:
                    print(f'無法轉換 {base}：{e}（需要 poppler 的 pdftotext）')
                    continue
            else:
                with open(path, 'rb') as fh:
                    text = html_to_text(decode(fh.read()))
                with open(cached, 'w', encoding='utf-8') as fh:
                    fh.write(text)
        with open(cached, 'rb') as fh:
            out[sid] = [norm(p) for p in decode(fh.read()).split('\f')]
    return out


def find_pages(pages, offset, quote):
    q = norm(quote)
    hits = set()
    for i, p in enumerate(pages):
        if q in p:
            hits.add(i + 1 - offset)
    if not hits:  # 可能橫跨換頁處
        for i in range(len(pages) - 1):
            if q in pages[i] + ' ' + pages[i + 1]:
                hits.update((i + 1 - offset, i + 2 - offset))
    return hits


def main():
    src = extract_sources()
    files = sorted(glob.glob(WIKI + '/**/*.md', recursive=True))
    names = {os.path.splitext(os.path.basename(f))[0] for f in files}
    problems = []
    n_claims = n_quotes = 0
    skipped = {}

    for f in files:
        base = os.path.basename(f)
        with open(f, encoding='utf-8') as fh:
            lines = fh.read().split('\n')
        last = None
        for n, line in enumerate(lines, 1):
            m = re.match(r'\s*- `\[(事實|範例|觀點|推導)\]`', line)
            if m:
                n_claims += 1
                cites = re.findall(r'（(S\d+), ([^）]+)）', line)
                last = cites[-1] if cites else None
                if not cites:
                    problems.append(f'缺出處        {base}:{n}  {line.strip()[:50]}')
                if m.group(1) in ('事實', '觀點'):
                    nxt = lines[n] if n < len(lines) else ''
                    if not re.match(r'\s*> "', nxt):
                        problems.append(f'缺原句短引    {base}:{n}  {line.strip()[:50]}')
            m = re.match(r'\s*> "(.*)"\s*$', line)
            if m:
                n_quotes += 1
                quote = m.group(1)
                words = len(quote.split())
                if words > 30:
                    problems.append(f'短引超過30字  {base}:{n}  （{words} 字）')
                if not last:
                    problems.append(f'短引沒有出處  {base}:{n}')
                    continue
                sid, loc = last
                if sid not in src:
                    skipped[sid] = skipped.get(sid, 0) + 1
                    continue
                hits = find_pages(src[sid], PAGE_OFFSET.get(sid, 0), quote)
                if not hits:
                    problems.append(f'短引對不上    {base}:{n}  {sid}  {quote[:60]}')
                    continue
                cited = set()
                for a, b in re.findall(r'p\.(\d+)(?:–(\d+))?', loc):
                    cited.add(int(a))
                    if b:
                        cited.update(range(int(a), int(b) + 1))
                if cited and not (hits & cited):
                    problems.append(f'頁碼不符      {base}:{n}  {sid} 實際在 {sorted(hits)}，標為 {loc}')
            # 連結格式
            if base == 'index.md':
                if '[[' in line:
                    problems.append(f'index 誤用 [[ ]]  index.md:{n}')
                for t in re.findall(r'\]\(([^)]+\.md)\)', line):
                    if not os.path.exists(os.path.join(WIKI, t)):
                        problems.append(f'index 連結失效  index.md:{n}  {t}')
            else:
                for t in re.findall(r'\[\[([^\]|]+)', line):
                    if t not in names:
                        problems.append(f'wikilink 失效   {base}:{n}  {t}')
                if re.search(r'\]\((?!http)[^)]+\.md\)', line):
                    problems.append(f'誤用相對路徑    {base}:{n}')

    for p in problems:
        print(p)
    print(f'主張 {n_claims} 條｜短引 {n_quotes} 段｜問題 {len(problems)} 個')
    print('已比對的來源：' + (' '.join(sorted(src, key=lambda x: int(x[1:]))) or '（無）'))
    if skipped:
        print('raw/ 中沒有原檔、短引未比對：' +
              '、'.join(f'{k}（{v} 段）' for k, v in sorted(skipped.items(), key=lambda x: int(x[0][1:]))))
    return 1 if problems else 0


if __name__ == '__main__':
    sys.exit(main())
