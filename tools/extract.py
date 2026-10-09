#!/usr/bin/env python3
"""חילוץ חד-פעמי: מפצל את reference/site-proposal.html ל-36 קטעי עמוד ב-src/he ו-src/en.
שומר את המבנה והתוכן המאושרים כפי שהם; רק קישורי #hash הופכים לנתיבים אמיתיים.
הרצה: python3 tools/extract.py
"""
import re, base64, pathlib, html

ROOT = pathlib.Path(__file__).resolve().parent.parent
SRC = (ROOT / 'reference' / 'site-proposal.html').read_text(encoding='utf-8')

# נתיבי העמודים (slug בהצעה -> נתיב באתר)
SLUGS = {
    'home': '', 'about': 'about', 'eighth': 'eighth-day', 'parents': 'bereaved-parents',
    'grandparents': 'grandparents', 'volunteers': 'volunteers', 'public': 'public-advocacy',
    'legislation': 'legislation', 'week': 'awareness-week', 'lectures': 'lectures',
    'data': 'mortality-data', 'research': 'research', 'memorial': 'remembrance',
    'media': 'media', 'contact': 'contact', 'donate': 'donate',
    'access': 'accessibility', 'privacy': 'privacy',
}

def page_path(pid):
    lang = 'en' if pid.startswith('en-') else 'he'
    bare = pid[3:] if lang == 'en' else pid
    slug = SLUGS[bare]
    if lang == 'en':
        return '/en/' + (slug + '/' if slug else '')
    return '/' + (slug + '/' if slug else '')

# תמונות מוטמעות -> קבצים
IMG_FILES = {}
def replace_img(m):
    tag = m.group(0)
    d = re.search(r'data:image/(jpeg|png|webp);base64,([A-Za-z0-9+/=]+)', tag)
    if not d:
        return tag
    alt = re.search(r'alt="([^"]*)"', tag)
    alt_txt = html.unescape(alt.group(1)) if alt else ''
    name = 'dassi' if 'דסי' in alt_txt or 'Dasi' in alt_txt else 'pini'
    fn = ROOT / 'assets' / 'img' / f'{name}.jpg'
    if name not in IMG_FILES:
        fn.write_bytes(base64.b64decode(d.group(2)))
        IMG_FILES[name] = fn
    return re.sub(r'src="data:[^"]+"', f'src="/assets/img/{name}.jpg"', tag)

SRC = re.sub(r'<img[^>]*>', replace_img, SRC)

main_start = SRC.find('<main>')
main_end = SRC.rfind('</main>')
MAIN = SRC[main_start:main_end]

starts = [m.start() for m in re.finditer(r'<div class="page" id="p-', MAIN)]
pages = []
for i, st in enumerate(starts):
    en = starts[i + 1] if i + 1 < len(starts) else len(MAIN)
    chunk = MAIN[st:en]
    if '</main>' in chunk:
        chunk = chunk[:chunk.find('</main>')]
    head = re.match(r'<div class="page" id="p-([^"]+)" data-title="([^"]*)" data-g="([^"]*)" hidden>', chunk)
    pid, title, group = head.group(1), html.unescape(head.group(2)), head.group(3)
    body = chunk[head.end():].rstrip()
    # הסרת סוגר העטיפה של העמוד (ואולי </div></main> אחרון)
    body = re.sub(r'(</div>\s*)+$', lambda m: m.group(0)[:-6].rstrip() if m.group(0).count('</div>') == 1 else m.group(0)[:m.group(0).rfind('</div>')].rstrip(), body)
    pages.append((pid, title, group, body))

def rewrite_links(body, lang):
    """#slug -> נתיב אמיתי; עוגנים פנימיים (כמו #parents-form) ו-# ריק נשארים."""
    def fix(m):
        href = m.group(1)
        if not href.startswith('#') or href == '#':
            return m.group(0)
        target = href[1:]
        bare = target[3:] if target.startswith('en-') else target
        if bare in SLUGS:
            return f'href="{page_path(target)}"'
        return m.group(0)
    return re.sub(r'href="([^"]*)"', fix, body)

# data-scroll: בהצעה הקישור מצביע ל-# ומגלגל לטופס. נחליף ב-href לעוגן הטופס.
def fix_scroll(body):
    form_id = re.search(r'<section class="sec formsec" id="([^"]+)"', body)
    fid = form_id.group(1) if form_id else None
    def fix(m):
        tag = m.group(0)
        if fid:
            tag = re.sub(r'href="[^"]*"', f'href="#{fid}"', tag)
        return tag.replace(' data-scroll', '')
    return re.sub(r'<a [^>]*data-scroll[^>]*>', fix, body)

out = []
for pid, title, group, body in pages:
    lang = 'en' if pid.startswith('en-') else 'he'
    body = fix_scroll(body)
    body = rewrite_links(body, lang)
    body = body.replace(' data-p="', ' data-page="')
    path = page_path(pid)
    bare = pid[3:] if lang == 'en' else pid
    meta = f'<!-- page: {bare} | lang: {lang} | path: {path} | title: {title} | group: {group} -->\n'
    dest = ROOT / 'src' / lang / f'{bare}.html'
    dest.write_text(meta + body + '\n', encoding='utf-8')
    out.append((lang, bare, path, title, group, len(body)))

for o in out:
    print(o)
print('images:', {k: str(v) for k, v in IMG_FILES.items()})
