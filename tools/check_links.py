#!/usr/bin/env python3
"""Check the built bilingual site with Python's standard library; never fetch external links."""
import argparse
import json
import re
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit
import xml.etree.ElementTree as ET

class Page(HTMLParser):
    def __init__(self, text):
        super().__init__(convert_charrefs=True)
        self.nodes, self.ids = [], set()
        self.duplicates = []
        self.feed(text)

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        self.nodes.append((tag, a))
        if 'id' in a:
            if a['id'] in self.ids:
                self.duplicates.append(a['id'])
            self.ids.add(a['id'])


def check(root, base):
    pages = {p.relative_to(root).as_posix(): Page(p.read_text()) for p in root.rglob('*.html')}
    errors, external = [], set()
    indexes = [p for p in pages if p.endswith('index.html')]
    if len(indexes) != 36:
        errors.append(f'Expected 36 pages, found {len(indexes)}')
    for required in ('404.html', 'sitemap.xml', 'robots.txt'):
        if not (root / required).is_file():
            errors.append(f'Missing {required}')
    for name, page in pages.items():
        text = (root / name).read_text()
        if '{{' in text:
            errors.append(f'{name}: unresolved template')
        for duplicate in page.duplicates:
            errors.append(f'{name}: duplicate id {duplicate}')
        lang = 'en' if name.startswith('en/') else 'he'
        html = next((a for tag, a in page.nodes if tag == 'html'), {})
        if (html.get('lang'), html.get('dir')) != (lang, 'ltr' if lang == 'en' else 'rtl'):
            errors.append(f'{name}: incorrect lang/dir')
        if sum(t == 'h1' for t, _ in page.nodes) != 1:
            errors.append(f'{name}: expected one h1')
        if name in indexes:
            alternates = {a.get('hreflang'): a.get('href') for t, a in page.nodes if t == 'link' and a.get('rel') == 'alternate'}
            for other in ('he', 'en'):
                suffix = name.removeprefix('en/').removesuffix('index.html')
                canonical = next(a.get('href', '') for t, a in page.nodes if t == 'link' and a.get('rel') == 'canonical')
                route = '/' + name.removesuffix('index.html')
                site_root = canonical[:-len(route)]
                expected = site_root + '/' + ('en/' if other == 'en' else '') + suffix
                if alternates.get(other, '') != expected:
                    errors.append(f'{name}: incorrect hreflang {other}')
            switch = [(t, a) for t, a in page.nodes if t == 'a' and 'lang' in a.get('class', '').split()]
            for _, a in switch:
                other = 'en' if lang == 'he' else 'he'
                expected = base + '/' + ('en/' if other == 'en' else '') + name.removeprefix('en/').removesuffix('index.html')
                if a.get('href') != expected:
                    errors.append(f'{name}: wrong language switch')
        for tag, a in page.nodes:
            if tag == 'img' and 'alt' not in a:
                errors.append(f'{name}: missing image alt')
            if tag == 'input' and a.get('type') in ('email', 'tel') and a.get('dir') != 'ltr':
                errors.append(f'{name}: missing LTR field {a.get("id")}')
            for key in ('href', 'src', 'action'):
                if key not in a:
                    continue
                value = a[key]
                if value == '#':
                    if 'todo' not in a.get('class', '').split():
                        errors.append(f'{name}: unmarked placeholder link')
                    continue
                u = urlsplit(value)
                if u.scheme or u.netloc:
                    external.add(value)
                    continue
                path = unquote(u.path)
                if path.startswith('/'):
                    if base and not path.startswith(base + '/'):
                        errors.append(f'{name}: path bypasses base: {value}')
                        continue
                    target = root / path.removeprefix(base).lstrip('/')
                else:
                    target = (root / name).parent / path if path else root / name
                if target.is_dir():
                    target /= 'index.html'
                if not target.is_file():
                    errors.append(f'{name}: missing target {value}')
                elif u.fragment and target.suffix == '.html':
                    target_page = pages.get(target.relative_to(root).as_posix())
                    if not target_page or unquote(u.fragment) not in target_page.ids:
                        errors.append(f'{name}: missing fragment {value}')
    for css in (root / 'assets/css').glob('*.css'):
        for url in re.findall(r'url\([\'\"]?([^\)\'\"]+)', css.read_text()):
            if not urlsplit(url).scheme and not (css.parent / url).is_file():
                errors.append(f'{css.name}: missing CSS asset {url}')
    if (root / 'sitemap.xml').exists():
        sitemap = ET.parse(root / 'sitemap.xml')
        if len(sitemap.getroot()) != 36:
            errors.append('Sitemap must have 36 entries')
    return dict(pages=len(indexes), errors=errors, external_links=sorted(external))

if __name__ == '__main__':
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument('--dist', type=Path, default=Path('dist'))
    ap.add_argument('--base', default='')
    args = ap.parse_args()
    result = check(args.dist.resolve(), args.base.rstrip('/'))
    print(json.dumps(result, indent=2, ensure_ascii=False))
    raise SystemExit(bool(result['errors']))
