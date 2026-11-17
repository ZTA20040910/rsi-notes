"""Check generated static pages, local assets and in-site fragment links."""
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlparse, unquote
import sys

ROOT = Path(__file__).resolve().parents[1] / 'dist'
BASE = '/rsi-notes/'

class Page(HTMLParser):
    def __init__(self, path):
        super().__init__()
        self.path, self.ids, self.refs, self.h1s = path, set(), [], 0
        self.errors = []
        self.feed(path.read_text())

    def handle_starttag(self, tag, attrs):
        attr = dict(attrs)
        if 'id' in attr:
            if attr['id'] in self.ids:
                self.errors.append('duplicate id: ' + attr['id'])
            self.ids.add(attr['id'])
        if tag == 'h1': self.h1s += 1
        if tag == 'a' and attr.get('href'):
            self.refs.append((attr['href'], True))
        if tag in ['script', 'img'] and attr.get('src'):
            self.refs.append((attr['src'], False))
        if tag == 'link' and attr.get('rel') in ['stylesheet', 'icon', 'preload']:
            self.refs.append((attr.get('href', ''), False))

files = sorted(ROOT.rglob('*.html'))
if not files:
    raise SystemExit('No generated pages. Run the build first.')
pages = {path: Page(path) for path in files}
errors = []
expected = ['index.html', 'insights/index.html', 'references/index.html']
expected += [f'levels/{level}/index.html' for level in ['b0','l1','l2','l3','l4','l5']]
expected += [f'posts/{post}/index.html' for post in ['naive','recursive-first-steps','flint','apex']]
for name in expected:
    if not (ROOT / name).is_file(): errors.append('Missing page: ' + name)
for path, page in pages.items():
    short = str(path.relative_to(ROOT))
    if page.h1s != 1: errors.append(f'{short}: expected one h1, got {page.h1s}')
    errors.extend(f'{short}: {e}' for e in page.errors)
    html = path.read_text()
    for marker in ['katex-error', '/Users/zta/', 'yourmail@gmail.com', 'https://x.com/username']:
        if marker in html: errors.append(f'{short}: unexpected marker {marker}')
    for ref, is_link in page.refs:
        url = urlparse(ref)
        if url.scheme or url.netloc: continue
        if not url.path:
            dest = path
        elif url.path.startswith(BASE):
            dest = ROOT / unquote(url.path[len(BASE):])
        elif url.path.startswith('/'):
            errors.append(f'{short}: link misses project base: {ref}')
            continue
        else:
            dest = (path.parent / unquote(url.path)).resolve()
        if dest.is_dir(): dest = dest / 'index.html'
        if not dest.is_file():
            errors.append(f'{short}: missing target {ref}')
        elif is_link and url.fragment and dest in pages:
            if unquote(url.fragment) not in pages[dest].ids:
                errors.append(f'{short}: missing fragment {ref}')
if 'katex-mathml' not in (ROOT/'index.html').read_text():
    errors.append('Homepage is missing accessible rendered math.')
if errors:
    print('\n'.join(errors)); sys.exit(1)
print(f'PASS: {len(pages)} HTML pages; required routes, internal links, fragments, assets and math checked.')
