#!/usr/bin/env python3
"""בניית האתר הסטטי של יקיר לי.

קלט:  src/he/*.html, src/en/*.html  (קטעי תוכן – המבנה והתוכן המאושרים)
       templates/layout.html          (כותרת עליונה, תפריט, פוטר)
       assets/                        (css, js, img)
פלט:  dist/  – אתר מוכן להעלאה (קבצי HTML סטטיים + assets)

הרצה:  python3 build.py                       -> dist/ לכתובת שורש (למשל www.yakirli.org)
       python3 build.py --base /yakirli-site  -> dist/ לכתובת משנה (GitHub Pages)
       python3 build.py --site-url https://www.yakirli.org
"""
import argparse, html, pathlib, re, shutil, time

ROOT = pathlib.Path(__file__).resolve().parent
SRC, TPL, DIST = ROOT / 'src', ROOT / 'templates' / 'layout.html', ROOT / 'dist'

# ---- מפת העמודים: slug פנימי -> נתיב ----
PATHS = {
    'home': '', 'about': 'about', 'eighth': 'eighth-day', 'parents': 'bereaved-parents',
    'grandparents': 'grandparents', 'volunteers': 'volunteers', 'public': 'public-advocacy',
    'legislation': 'legislation', 'week': 'awareness-week', 'lectures': 'lectures',
    'research': 'research', 'memorial': 'remembrance',
    'media': 'media', 'contact': 'contact', 'donate': 'donate',
    'access': 'accessibility', 'privacy': 'privacy', 'terms': 'terms-of-use',
}
# Match the page-specific photo backgrounds in site.css; legal pages have none.
HERO_PHOTOS = {
    'home': 'home', 'about': 'public',
    'eighth': 'support', 'parents': 'support', 'grandparents': 'support', 'volunteers': 'support',
    'public': 'public', 'legislation': 'public', 'week': 'public', 'lectures': 'public',
    'research': 'data', 'memorial': 'memorial',
    'media': 'media', 'contact': 'contact', 'donate': 'donate',
}

# Pages whose hero uses a newer photo than the shared group image
HERO_FILES = {'home': 'home-v2', 'memorial': 'memorial-garden', 'eighth': 'eighth-training', 'grandparents': 'grandparents-v1', 'public': 'knesset-welfare-committee'}

def path_of(lang, pid):
    slug = PATHS[pid]
    p = '/' + (slug + '/' if slug else '')
    return ('/en' + p) if lang == 'en' else p

# ---- התפריט המאושר ----
NAV = {
    'he': [
        ('home', 'בית', None),
        ('about', 'אודות', None),
        ('support', 'מעגל התמיכה', [('eighth', 'היום השמיני'), ('parents', 'הורים שכולים'),
                                     ('grandparents', 'סבים וסבתות שחוו אובדן נכד/ה'), ('volunteers', 'מתנדבים והכשרה')]),
        ('public', 'פעילות ציבורית', [('public', 'מה אנחנו עושים'),
                                       ('week', 'שבוע המודעות'), ('lectures', 'הרצאות')]),
        ('data', 'ידע ונתונים', [('legislation', 'קידום חקיקה'), ('research', 'מחקרים')]),
        ('memorial', 'הנצחה', None),
        ('media', 'מדיה', None),
        ('contact', 'צרו קשר', None),
    ],
    'en': [
        ('home', 'Home', None),
        ('about', 'About', None),
        ('support', 'Support', [('eighth', 'The Day After Shiva'), ('parents', 'Bereaved Parents'),
                                ('grandparents', 'Grandparents Who Lost a Grandchild'), ('volunteers', 'Volunteers and Training')]),
        ('public', 'Public Advocacy', [('public', 'What we do'),
                                       ('week', 'Awareness Week'), ('lectures', 'Lectures')]),
        ('data', 'Data', [('legislation', 'Legislation'), ('research', 'Research')]),
        ('memorial', 'Remembrance', None),
        ('media', 'Media', None),
        ('contact', 'Contact', None),
    ],
}
GROUP_HOME = {'support': 'eighth', 'public': 'public', 'data': 'legislation'}  # לאן מוביל שם הקבוצה

T = {
    'he': dict(
               terms='תנאי שימוש', nw='(נפתח בחלון חדש)', req_consent='כדי לשלוח, יש לסמן את תיבת האישור.',
               nl_consent='בהרשמה אתם מסכימים לקבל מאיתנו עדכונים בדוא"ל. אפשר להסיר את עצמכם בכל עת.',
               a11y_open='תפריט נגישות', a11y_title='התאמות נגישות', a11y_close='סגירת תפריט הנגישות',
               a11y_size='גודל טקסט', a11y_smaller='הקטנת טקסט', a11y_bigger='הגדלת טקסט', a11y_minus='א−', a11y_plus='א+',
               a11y_contrast='ניגודיות גבוהה', a11y_links='הדגשת קישורים', a11y_font='גופן פשוט', a11y_spacing='ריווח טקסט',
               a11y_motion='עצירת אנימציות', a11y_reset='איפוס הגדרות',
               skip='דילוג לתוכן', brand_aria='יקיר לי – לעמוד הבית', home_sr='לעמוד הבית', brand_name='יקיר לי',
               brand_tag='יד ולב לשכול האזרחי', menu='תפריט', main_menu='תפריט ראשי', donate='לתרומה',
               lang_long='English – לאתר באנגלית', lang_short='EN', nav='ניווט', contact='יצירת קשר',
               phone='טלפון ווטסאפ', email='אימייל', mail='דואר', address='ת"ד 1208, אפרת 9043500',
               newsletter='הצטרפות לרשימת התפוצה', join='הצטרפות', nl_sent='זו גרסת תצוגה: ההרשמה לא נשמרה.',
               access='הצהרת נגישות', privacy='מדיניות פרטיות', reg='יקיר לי – יד ולב לשכול האזרחי (ע"ר 580616001)', credits='סמלי הרשויות: ויקישיתוף (CC BY-SA) והאתרים הרשמיים',
               wa='שליחת הודעת ווטסאפ ליקיר לי', foot_tag='יד ולב לשכול האזרחי (ע"ר 580616001)',
               sub_toggle='פתיחת תפריט משנה', reach_out='פנו אלינו', site='יקיר לי', site_long='יקיר לי – יד ולב לשכול האזרחי'),
    'en': dict(
               terms='Terms of use', nw='(opens in a new window)', req_consent='To send, please tick the confirmation box.',
               nl_consent='By signing up you agree to receive email updates from us. You can unsubscribe at any time.',
               a11y_open='Accessibility menu', a11y_title='Accessibility settings', a11y_close='Close accessibility menu',
               a11y_size='Text size', a11y_smaller='Smaller text', a11y_bigger='Larger text', a11y_minus='A−', a11y_plus='A+',
               a11y_contrast='High contrast', a11y_links='Highlight links', a11y_font='Plain font', a11y_spacing='Text spacing',
               a11y_motion='Stop animations', a11y_reset='Reset settings',
               skip='Skip to content', brand_aria='Yakir Li – home', home_sr='home page', brand_name='Yakir Li',
               brand_tag='Civilian Bereavement Support', menu='Menu', main_menu='Main menu', donate='Donate',
               lang_long='עברית – לאתר בעברית', lang_short='עב', nav='Navigation', contact='Contact',
               phone='Phone / WhatsApp', email='Email', mail='Mail', address='P.O. Box 1208, Efrat 9043500, Israel',
               newsletter='Join our mailing list', join='Join', nl_sent='Preview version: the sign-up was not saved.',
               access='Accessibility statement', privacy='Privacy policy',
               reg='Yakir Li – Civilian Bereavement Support (Registered Nonprofit 580616001)', credits='Municipal emblems: Wikimedia Commons (CC BY-SA) and official sites',
               wa='Send Yakir Li a WhatsApp message', foot_tag='Civilian Bereavement Support (Reg. Nonprofit 580616001)',
               sub_toggle='Open submenu', reach_out='Reach out', site='Yakir Li', site_long='Yakir Li – Civilian Bereavement Support'),
}
CHEVRON = '<svg viewBox="0 0 20 20" aria-hidden="true" width="14" height="14"><path d="M5 7.5l5 5 5-5" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>'

def nav_html(lang, pid, group):
    out = []
    for key, label, kids in NAV[lang]:
        target = GROUP_HOME.get(key, key)
        on = ' class="on"' if key == group or (key == pid) else ''
        cur = ' aria-current="page"' if (kids is None and key == pid) else ''
        if kids:
            items = ''
            for k, l in kids:
                cur_k = ' aria-current="page"' if k == pid else ''
                items += f'<li><a href="{path_of(lang, k)}"{cur_k}>{html.escape(l)}</a></li>'
            out.append(f'        <li class="has-sub{" on" if on else ""}" data-g="{key}"><a href="{path_of(lang, target)}">{html.escape(label)}</a>'
                       f'<button class="sub-toggle" type="button" aria-expanded="false" aria-controls="sub-{key}" aria-label="{T[lang]["sub_toggle"]}: {html.escape(label)}">{CHEVRON}</button>'
                       f'<ul class="drop" id="sub-{key}">{items}</ul></li>')
        else:
            out.append(f'        <li{on} data-g="{key}"><a href="{path_of(lang, target)}"{cur}>{html.escape(label)}</a></li>')
    # כפתור קבוע "פנו אלינו" – מיד אחרי "צרו קשר", מוביל לטופס הפנייה
    anchor = '#en-contact-form' if lang == 'en' else '#contact-form'
    out.append(f'        <li class="nav-cta"><a class="btn btn-p btn-sm" href="{path_of(lang, "contact")}{anchor}">{html.escape(T[lang]["reach_out"])}</a></li>')
    return '\n'.join(out)

def foot_nav_html(lang):
    return '\n'.join(f'        <li><a href="{path_of(lang, GROUP_HOME.get(k, k))}">{html.escape(l)}</a></li>' for k, l, _ in NAV[lang])

def read_fragment(fp):
    txt = fp.read_text(encoding='utf-8')
    m = re.match(r'<!-- page: (\S+) \| lang: (\S+) \| path: (\S+) \| title: (.*?) \| group: (.*?) -->\n', txt)
    pid, lang, path, title, group = m.groups()
    return pid, lang, path, title, group, txt[m.end():]

def description_of(body):
    m = re.search(r'<div class="hero-txt">.*?<p>(.*?)</p>', body, re.S)
    if not m:
        m = re.search(r'<p[^>]*>(.*?)</p>', body, re.S)
    d = html.unescape(re.sub(r'<[^>]+>', '', m.group(1))) if m else ''
    return html.escape(d.strip()[:300], quote=True)

ANALYTICS_CODE = ''  # נקבע ב-main() לפי --analytics

def analytics_tag():
    """GoatCounter: מדידת כניסות בלי עוגיות ובלי איסוף מידע מזהה. ריק = כבוי."""
    if not ANALYTICS_CODE:
        return ''
    return (f'<script data-goatcounter="https://{ANALYTICS_CODE}.goatcounter.com/count" '
            'async src="https://gc.zgo.at/count.js"></script>')

def render_page(layout, base, site, build_id, lang, pid, path, title, group, body):
    t = T[lang]
    # סימון העמוד הנוכחי בתת-התפריט
    body = re.sub(r'(<a href="[^"]*" data-page="' + re.escape(('en-' if lang == 'en' else '') + pid) + '")',
                  r'\1 aria-current="page"', body)
    full_title = t['site_long'] if pid == 'home' else f'{title} – {t["site"]}'
    alt_lang = 'en' if lang == 'he' else 'he'
    hero_photo = HERO_PHOTOS.get(pid)
    ctx = {
        'lang': lang, 'dir': 'ltr' if lang == 'en' else 'rtl', 'title': html.escape(full_title, quote=True),
        'description': description_of(body), 'canonical': site + path,
        'og_image': site + '/assets/img/og-' + lang + '.png',
        'og_alt': html.escape(t['site_long'], quote=True),
        'hero_preload': (f'<link rel="preload" as="image" href="/assets/img/photos/{HERO_FILES.get(pid, hero_photo + '-v1')}.avif" type="image/avif" fetchpriority="high">' if hero_photo else ''),
        'alt_he': site + path_of('he', pid if pid in PATHS else 'home'), 'alt_en': site + path_of('en', pid if pid in PATHS else 'home'),
        'og_locale': 'en_US' if lang == 'en' else 'he_IL', 'base': base, 'site': site, 'build': build_id,
        'page': pid, 'group': group or 'none', 'home': path_of(lang, 'home'),
        'donate': path_of(lang, 'donate'), 'access': path_of(lang, 'access'), 'privacy': path_of(lang, 'privacy'), 'terms': path_of(lang, 'terms'),
        'analytics': analytics_tag(),
        'alt_path': path_of(alt_lang, pid if pid in PATHS else 'home'), 'alt_lang': alt_lang,
        'nav': nav_html(lang, pid, group), 'foot_nav': foot_nav_html(lang), 'content': body,
    }
    out = layout
    for k, v in t.items():
        out = out.replace('{{t.' + k + '}}', html.escape(v, quote=True) if k not in ('reg',) else html.escape(v, quote=True))
    for k, v in ctx.items():
        out = out.replace('{{' + k + '}}', v)
    if base:
        out = re.sub(r'(href|src|content|action)="/(?!/)', lambda m: f'{m.group(1)}="{base}/', out)
        out = out.replace(f'{base}/assets', f'{base}/assets')
    return out

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--base', default='', help='נתיב בסיס, למשל /yakirli-site (ללא / בסוף)')
    ap.add_argument('--analytics', default='yakirli', help='קוד האתר ב-GoatCounter (yakirli.goatcounter.com). ריק לכיבוי')
    ap.add_argument('--site-url', default='https://www.yakirli.org', help='כתובת האתר ל-canonical ול-sitemap')
    a = ap.parse_args()
    global ANALYTICS_CODE
    ANALYTICS_CODE = a.analytics.strip()
    base = a.base.rstrip('/')
    site = a.site_url.rstrip('/')
    build_id = time.strftime('%Y%m%d%H%M')

    if DIST.exists():
        shutil.rmtree(DIST)
    DIST.mkdir()
    for sub in ('css', 'js', 'img', 'files'):
        shutil.copytree(ROOT / 'assets' / sub, DIST / 'assets' / sub)
    (DIST / '.nojekyll').write_text('')

    layout = TPL.read_text(encoding='utf-8')
    urls = []
    for lang in ('he', 'en'):
        for fp in sorted((SRC / lang).glob('*.html')):
            pid, _, path, title, group, body = read_fragment(fp)
            out = render_page(layout, base, site, build_id, lang, pid, path, title, group, body)
            dest = DIST / path.strip('/') / 'index.html' if path != '/' else DIST / 'index.html'
            dest.parent.mkdir(parents=True, exist_ok=True)
            dest.write_text(out, encoding='utf-8')
            urls.append(site + path)
    # 404 – דרך אותה תבנית (GitHub Pages מגיש 404.html לכל נתיב לא קיים)
    nf_body = ('<section class="hero"><div class="wrap hero-in"><div class="hero-txt"><div class="eyebrow">404</div>'
               '<h1>העמוד לא נמצא</h1><p>הקישור שהגעתם אליו אינו קיים, או שהעמוד עבר למקום אחר.</p>'
               '<div class="btns"><a class="btn btn-p" href="/">לעמוד הבית</a><a class="btn btn-s" href="/contact/">צרו קשר</a>'
               '<a class="btn btn-s" href="/en/" lang="en">English</a></div></div></div></section>')
    (DIST / '404.html').write_text(render_page(layout, base, site, build_id, 'he', 'notfound', '/404.html', 'העמוד לא נמצא', '', nf_body), encoding='utf-8')
    # עמודים שהוסרו – הפניה לכתובת החדשה (19.10.2026: נתוני פטירה עברו לאודות)
    for old, new in (('/mortality-data/', '/about/#data'), ('/en/mortality-data/', '/en/about/#data')):
        d = DIST / old.strip('/'); d.mkdir(parents=True, exist_ok=True)
        (d / 'index.html').write_text(f'<!DOCTYPE html><meta charset="utf-8"><meta http-equiv="refresh" content="0; url={base}{new}"><link rel="canonical" href="{site}{new}"><a href="{base}{new}">{base}{new}</a>', encoding='utf-8')
    # אזור אישי – לוח נתוני הגלישה (לא מקושר מהאתר, לא באינדקס של מנועי חיפוש)
    adm = (ROOT / 'templates' / 'admin.html').read_text(encoding='utf-8')
    adm = adm.replace('{{build}}', build_id).replace('{{analytics_code}}', ANALYTICS_CODE).replace('{{base}}', base)
    if base:
        adm = re.sub(r'(href|src)="/(?!/)', lambda m: f'{m.group(1)}="{base}/', adm)
    (DIST / 'admin').mkdir()
    (DIST / 'admin' / 'index.html').write_text(adm, encoding='utf-8')
    (DIST / 'sitemap.xml').write_text(
        '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
        ''.join(f'  <url><loc>{u}</loc></url>\n' for u in urls) + '</urlset>\n', encoding='utf-8')
    (DIST / 'robots.txt').write_text(f'User-agent: *\nAllow: /\nDisallow: /admin/\nSitemap: {site}/sitemap.xml\n', encoding='utf-8')
    print(f'built {len(urls)} pages -> {DIST}  (base="{base}")')

if __name__ == '__main__':
    main()
