#!/usr/bin/env python3
"""מחולל איורי העלים של האתר (SVG). הרצה: python3 tools/make_art.py
כל האיורים נבנים מאותו עלה בסיסי בצבעי הלוגו, כך שהאתר נשאר אחיד."""
import math, pathlib, random

OUT = pathlib.Path(__file__).resolve().parent.parent / 'assets' / 'img'
TEALS = ['#2A9D93', '#3FB3A8', '#1E7A72', '#7FCFC5']
WARM = ['#E6896F', '#F0A890', '#D5735A', '#F5C4B3']

def leaf(cx, cy, ang, size, color, op=1.0, vein=True):
    s = size
    d = f"M0,-{s:.1f} C{s*0.42:.1f},-{s*0.72:.1f} {s*0.42:.1f},-{s*0.12:.1f} 0,{s*0.18:.1f} C-{s*0.42:.1f},-{s*0.12:.1f} -{s*0.42:.1f},-{s*0.72:.1f} 0,-{s:.1f}Z"
    v = (f'<path d="M0,-{s*0.92:.1f} L0,{s*0.12:.1f}" stroke="#fff" stroke-opacity=".55" '
         f'stroke-width="{max(1, s*0.045):.1f}" stroke-linecap="round"/>') if vein else ''
    return (f'<g transform="translate({cx:.1f},{cy:.1f}) rotate({ang:.1f})" opacity="{op}">'
            f'<path d="{d}" fill="{color}"/>{v}</g>')

def svg(body, w=600, h=450, defs=''):
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" aria-hidden="true">'
            f'<defs>{defs}</defs>{body}</svg>')

GLOW = ('<radialGradient id="g" cx="50%" cy="60%" r="60%"><stop offset="0" stop-color="#3FB3A8" stop-opacity=".55"/>'
        '<stop offset="1" stop-color="#3FB3A8" stop-opacity="0"/></radialGradient>')
GLOW_WARM = ('<radialGradient id="gw" cx="50%" cy="60%" r="60%"><stop offset="0" stop-color="#E6896F" stop-opacity=".5"/>'
             '<stop offset="1" stop-color="#E6896F" stop-opacity="0"/></radialGradient>')

def arc(cx, cy, r, a0, a1, n, base=44, palette=TEALS, op=.92, seed=0):
    out = []
    for i in range(n):
        t = math.radians(a0 + (a1 - a0) * i / max(1, n - 1))
        x, y = cx + r * math.cos(t), cy + r * math.sin(t)
        out.append(leaf(x, y, math.degrees(t) + 90, base + ((i + seed) % 3) * 10, palette[(i + seed) % 4], op))
    return ''.join(out)

def floaters(pts, palette=TEALS):
    return ''.join(leaf(x, y, a, s, palette[i % 4], .7) for i, (x, y, a, s) in enumerate(pts))

arts = {}

# בית: קשת עלים כמו בלוגו
arts['home'] = svg('<circle cx="300" cy="300" r="230" fill="url(#g)"/>'
                   '<circle cx="300" cy="300" r="150" fill="none" stroke="#7FCFC5" stroke-opacity=".35" stroke-width="2" stroke-dasharray="6 10"/>'
                   + arc(300, 300, 195, 180, 360, 15)
                   + floaters([(120, 380, -30, 22), (480, 400, 25, 18), (80, 180, -60, 16), (525, 160, 50, 20)]), defs=GLOW)

# אודות: מעגל שלם של עלים סביב מרכז – הקהילה
arts['about'] = svg('<circle cx="300" cy="225" r="210" fill="url(#g)"/>'
                    '<circle cx="300" cy="225" r="62" fill="#1C1A4A" fill-opacity=".9"/>'
                    '<circle cx="300" cy="225" r="78" fill="none" stroke="#7FCFC5" stroke-opacity=".5" stroke-width="2"/>'
                    + arc(300, 225, 168, 0, 337.5, 16, base=40) , defs=GLOW)

# מעגל התמיכה: שתי קשתות שנפגשות – חיבוק
arts['support'] = svg('<circle cx="300" cy="235" r="215" fill="url(#g)"/>'
                      + arc(300, 235, 170, 115, 245, 8, base=42, seed=1)
                      + arc(300, 235, 170, 295, 425, 8, base=42, seed=2)
                      + '<circle cx="300" cy="235" r="34" fill="#7FCFC5" fill-opacity=".9"/>'
                      + '<circle cx="300" cy="235" r="14" fill="#1C1A4A"/>'
                      + floaters([(110, 100, -40, 18), (490, 100, 40, 18), (300, 60, 0, 16)]), defs=GLOW)

# פעילות ציבורית: אדוות – מעגלים מתרחבים ועלים בטבעת החיצונית
rings = ''.join(f'<circle cx="300" cy="240" r="{r}" fill="none" stroke="#7FCFC5" stroke-opacity="{op}" stroke-width="2"/>'
                for r, op in [(60, .9), (105, .65), (150, .45), (195, .3)])
arts['public'] = svg('<circle cx="300" cy="240" r="225" fill="url(#g)"/>' + rings
                     + '<circle cx="300" cy="240" r="22" fill="#1C1A4A"/><circle cx="300" cy="240" r="10" fill="#7FCFC5"/>'
                     + arc(300, 240, 195, 195, 345, 8, base=38)
                     + floaters([(95, 395, -25, 20), (500, 390, 30, 18), (300, 420, 10, 14)]), defs=GLOW)

# ידע ונתונים: עלים בגבהים עולים – נתונים שגדלים
bars = ''
for i, (x, hgt) in enumerate([(120, 120), (200, 170), (280, 210), (360, 250), (440, 300)]):
    bars += f'<rect x="{x-18}" y="{400-hgt}" width="36" height="{hgt}" rx="18" fill="#7FCFC5" fill-opacity="{.25+i*.12:.2f}"/>'
    bars += leaf(x, 400 - hgt - 26, 0 if i % 2 == 0 else 18, 30 + i * 3, TEALS[i % 4], .95)
arts['data'] = svg('<circle cx="300" cy="300" r="230" fill="url(#g)"/>' + bars
                   + '<path d="M80 410 H520" stroke="#7FCFC5" stroke-opacity=".5" stroke-width="2" stroke-linecap="round"/>', defs=GLOW)

# הנצחה: עלה אחד מעל אור – ועלים שנופלים ברכות
arts['memorial'] = svg('<circle cx="300" cy="290" r="230" fill="url(#gw)"/>'
                       '<circle cx="300" cy="300" r="118" fill="#E6896F" fill-opacity=".18"/>'
                       '<circle cx="300" cy="300" r="70" fill="#F5C4B3" fill-opacity=".35"/>'
                       '<circle cx="300" cy="300" r="26" fill="#FFF3EC"/>'
                       + leaf(300, 190, 0, 80, '#2A9D93', .98)
                       + floaters([(150, 130, -35, 22), (455, 150, 30, 20), (120, 330, -70, 16), (480, 330, 65, 16), (200, 420, -20, 14), (400, 425, 25, 14)]),
                       defs=GLOW_WARM)

# מדיה: גלי קול – שלוש קשתות ועלים שמתפזרים
waves = ''.join(f'<path d="M{300+r*math.cos(math.radians(-60))} {250+r*math.sin(math.radians(-60))} A{r} {r} 0 0 1 {300+r*math.cos(math.radians(60))} {250+r*math.sin(math.radians(60))}" '
                f'fill="none" stroke="#7FCFC5" stroke-opacity="{op}" stroke-width="3" stroke-linecap="round"/>'
                for r, op in [(70, .9), (120, .6), (170, .4)])
arts['media'] = svg('<circle cx="260" cy="250" r="225" fill="url(#g)"/>'
                    '<circle cx="230" cy="250" r="34" fill="#1C1A4A"/><circle cx="230" cy="250" r="14" fill="#7FCFC5"/>'
                    + waves
                    + floaters([(480, 120, 40, 26), (520, 250, 90, 22), (480, 380, 140, 26), (110, 120, -40, 18), (110, 380, -140, 18)]), defs=GLOW)

# צרו קשר: נבט – שני עלים שצומחים מעיגול
arts['contact'] = svg('<circle cx="300" cy="300" r="225" fill="url(#g)"/>'
                      '<circle cx="300" cy="360" r="46" fill="#1C1A4A" fill-opacity=".92"/>'
                      '<path d="M300 330 C300 280 300 240 300 200" stroke="#2A9D93" stroke-width="5" stroke-linecap="round" fill="none"/>'
                      '<path d="M300 300 C270 285 245 275 228 250" stroke="#2A9D93" stroke-width="4" stroke-linecap="round" fill="none"/>'
                      '<path d="M300 260 C330 245 352 235 368 210" stroke="#2A9D93" stroke-width="4" stroke-linecap="round" fill="none"/>'
                      + leaf(300, 200, 0, 58, '#3FB3A8') + leaf(226, 250, -55, 44, '#2A9D93') + leaf(370, 210, 55, 44, '#7FCFC5')
                      + floaters([(120, 160, -30, 18), (490, 170, 35, 18)]), defs=GLOW)

# תרומה: לב מעלים
heart = ''
n = 30
for i in range(n):
    t = 2 * math.pi * i / n
    x = 16 * math.sin(t) ** 3
    y = -(13 * math.cos(t) - 5 * math.cos(2 * t) - 2 * math.cos(3 * t) - math.cos(4 * t))
    # משיק לכיוון הסיבוב
    dt = 0.01
    x2 = 16 * math.sin(t + dt) ** 3
    y2 = -(13 * math.cos(t + dt) - 5 * math.cos(2 * (t + dt)) - 2 * math.cos(3 * (t + dt)) - math.cos(4 * (t + dt)))
    ang = math.degrees(math.atan2(y2 - y, x2 - x))
    heart += leaf(300 + x * 11, 240 + y * 11, ang + 180, 36 + (i % 3) * 6, (TEALS + WARM[:1])[i % 5] if i % 5 != 4 else WARM[0], .95)
arts['donate'] = svg('<circle cx="300" cy="260" r="225" fill="url(#gw)"/>'
                     '<circle cx="300" cy="250" r="54" fill="#E6896F" fill-opacity=".35"/>'
                     + heart, defs=GLOW_WARM)

for name, s in arts.items():
    (OUT / f'art-{name}.svg').write_text(s, encoding='utf-8')
    print(name, len(s))
