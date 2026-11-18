"""把 HTML 轉成純文字，供 check_quotes.py 比對短引。

用法：
    python tools/html2txt.py <輸入.html> <輸出.txt>

略過 script、style、nav、header、footer、form 等區塊；標題前加 "## "，清單項目前加 "- "。
只用 Python 標準函式庫。
"""
import re
import sys
from html.parser import HTMLParser

SKIP = ('script', 'style', 'nav', 'header', 'footer', 'noscript', 'svg', 'form')
BLOCK = ('p', 'div', 'li', 'h1', 'h2', 'h3', 'h4', 'br', 'tr', 'section', 'article')
HEAD = ('h1', 'h2', 'h3', 'h4')


class _Extractor(HTMLParser):
    def __init__(self):
        super().__init__()
        self.out = []
        self.skip = 0

    def handle_starttag(self, tag, attrs):
        if tag in SKIP:
            self.skip += 1
        if tag in BLOCK:
            self.out.append('\n')
        if tag in HEAD:
            self.out.append('## ')
        if tag == 'li':
            self.out.append('- ')

    def handle_endtag(self, tag):
        if tag in SKIP and self.skip:
            self.skip -= 1
        if tag in ('p', 'li') + HEAD:
            self.out.append('\n')

    def handle_data(self, data):
        if not self.skip:
            self.out.append(data)


def html_to_text(html):
    parser = _Extractor()
    parser.feed(html)
    text = ''.join(parser.out)
    text = re.sub(r'[ \t\xa0]+', ' ', text)
    text = re.sub(r'\n\s*\n+', '\n\n', text)
    return text.strip() + '\n'


if __name__ == '__main__':
    if len(sys.argv) != 3:
        sys.exit(__doc__)
    with open(sys.argv[1], 'rb') as fh:
        raw = fh.read().decode('utf-8', 'replace')
    with open(sys.argv[2], 'w', encoding='utf-8') as fh:
        fh.write(html_to_text(raw))
