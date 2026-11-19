# C4-7 counter: CJK [一-鿿] in 導言＋要點 of each page's「### 主文」, excluding inline citations （…）
# 用法：py runs/v2/c47_count.py <repo> [commit] [-v]（commit 預設 HEAD）。由 C4 第 1 輪的獨立檢查代理撰寫。
import re, sys, subprocess
src = subprocess.run(["git","-C",sys.argv[1],"show",(sys.argv[2] if len(sys.argv) > 2 and sys.argv[2] != "-v" else "HEAD") + ":slides/slides.md"],capture_output=True).stdout.decode("utf-8")
CJK = re.compile(r"[一-鿿]")
# a full-width parenthetical is a citation if it contains a source ID, GRAPH_SPEC, §, 推導, a wiki page name, index/glossary
CIT = re.compile(r"S\d+|GRAPH_SPEC|§|推導|[a-z]+-[a-z]+|\bindex\b|\bglossary\b")
PAREN = re.compile(r"（[^（）]*）")
pages = re.split(r"^## (S\d\d)｜", src, flags=re.M)
out = []
for i in range(1, len(pages), 2):
    pid, body = pages[i], pages[i+1]
    m = re.search(r"### 主文\n(.*?)(?=\n### |\Z)", body, re.S)
    lines = [l for l in m.group(1).splitlines() if l.startswith("- 導言") or re.match(r"\d+\. ", l)]
    npts = sum(1 for l in lines if re.match(r"\d+\. ", l))
    total = 0; removed = []
    for l in lines:
        def rep(mm):
            if CIT.search(mm.group(0)): removed.append(mm.group(0)); return ""
            return mm.group(0)
        kept = PAREN.sub(rep, l)
        kept = re.sub(r"^- 導言：", "", kept)
        total += len(CJK.findall(kept))
    selfrep = re.search(r"字數：(\d+)／120；要點 (\d)", body)
    out.append((pid, total, npts, selfrep.group(1), selfrep.group(2), removed))
for pid,t,n,sr,sn,rem in out:
    flag = "OK" if t<=120 and n<=5 else "OVER"
    print(f"{pid}\tCJK={t}\tpoints={n}\tself={sr}/{sn}\t{flag}\tdiff={t-int(sr)}")
if "-v" in sys.argv:
    for pid,t,n,sr,sn,rem in out: print(pid, rem)
