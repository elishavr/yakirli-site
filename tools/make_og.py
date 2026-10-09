#!/usr/bin/env python3
"""תמונת שיתוף (Open Graph) 1200x630 בעברית ובאנגלית. הרצה: python3 tools/make_og.py
נבנית עם Pillow בלבד: רקע נייבי, זוהר טורקיז, קשת עלים, הלוגו והטקסט."""
import math, pathlib, sys
from PIL import Image, ImageDraw, ImageFont, ImageFilter

ROOT = pathlib.Path(__file__).resolve().parent.parent
IMG = ROOT / 'assets' / 'img'
W, H = 1200, 630
NAVY, NAVY_DEEP, NAVY2 = (28, 26, 74), (19, 18, 47), (43, 40, 104)
TEALS = [(42, 157, 147), (63, 179, 168), (30, 122, 114), (127, 207, 197)]

def find_font(names, size):
    for n in names:
        for d in ('/System/Library/Fonts/Supplemental/', '/System/Library/Fonts/', '/Library/Fonts/', str(pathlib.Path.home() / 'Library/Fonts/')):
            p = pathlib.Path(d) / n
            if p.exists():
                try:
                    return ImageFont.truetype(str(p), size)
                except Exception:
                    pass
    return ImageFont.load_default()

HEB_BOLD = ['Assistant-Bold.ttf', 'Arial Hebrew Bold.ttf', 'ArialHB.ttc', 'SFHebrew.ttf']
HEB_REG = ['Assistant-Regular.ttf', 'ArialHB.ttc', 'SFHebrew.ttf']
LAT_BOLD = ['Assistant-Bold.ttf', 'Arial Bold.ttf', 'Helvetica.ttc', 'Arial.ttf']
LAT_REG = ['Assistant-Regular.ttf', 'Arial.ttf', 'Helvetica.ttc']

def bezier(p0, p1, p2, p3, n=14):
    return [((1-t)**3*p0[0] + 3*(1-t)**2*t*p1[0] + 3*(1-t)*t**2*p2[0] + t**3*p3[0],
             (1-t)**3*p0[1] + 3*(1-t)**2*t*p1[1] + 3*(1-t)*t**2*p2[1] + t**3*p3[1]) for t in [i/n for i in range(n+1)]]

def leaf_poly(cx, cy, ang, s):
    pts = bezier((0, -s), (s*.42, -s*.72), (s*.42, -s*.12), (0, s*.18)) + bezier((0, s*.18), (-s*.42, -s*.12), (-s*.42, -s*.72), (0, -s))
    a = math.radians(ang); ca, sa = math.cos(a), math.sin(a)
    return [(cx + x*ca - y*sa, cy + x*sa + y*ca) for x, y in pts]

def draw_leaf(draw, cx, cy, ang, s, color):
    draw.polygon(leaf_poly(cx, cy, ang, s), fill=color)
    a = math.radians(ang)
    x0, y0 = cx - (-s*.92)*math.sin(a), cy + (-s*.92)*math.cos(a)
    x1, y1 = cx - (s*.12)*math.sin(a), cy + (s*.12)*math.cos(a)
    draw.line([(x0, y0), (x1, y1)], fill=(255, 255, 255, 140), width=max(1, int(s*.045)))

def rtl(s):
    """Pillow מצייר משמאל לימין; לעברית פשוטה (בלי מספרים/לטינית) הופכים את סדר התווים."""
    return s[::-1]

def make(lang):
    he = lang == 'he'
    # רקע: גרדיאנט אלכסוני
    base = Image.new('RGB', (W, H))
    px = base.load()
    for y in range(H):
        for x in range(W):
            t = (x / W * .6 + y / H * .4)
            if t < .55:
                k = t / .55; c = tuple(int(NAVY_DEEP[i] + (NAVY[i] - NAVY_DEEP[i]) * k) for i in range(3))
            else:
                k = (t - .55) / .45; c = tuple(int(NAVY[i] + (NAVY2[i] - NAVY[i]) * k) for i in range(3))
            px[x, y] = c
    # זוהר טורקיז וקשת עלים – בצד שמנגד לטקסט
    gx = 330 if he else 870
    glow = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    gd = ImageDraw.Draw(glow)
    gd.ellipse([gx-300, 40, gx+300, 640], fill=(63, 179, 168, 120))
    glow = glow.filter(ImageFilter.GaussianBlur(90))
    base = Image.alpha_composite(base.convert('RGBA'), glow)
    lay = Image.new('RGBA', (W, H), (0, 0, 0, 0)); d = ImageDraw.Draw(lay)
    n, r, cy = 15, 205, 350
    for i in range(n):
        t = math.pi * (1 + i / (n - 1))
        x, y = gx + r * math.cos(t), cy + r * math.sin(t)
        draw_leaf(d, x, y, math.degrees(t) + 90, 46 + (i % 3) * 10, TEALS[i % 4] + (235,))
    d.ellipse([gx-150, cy-150, gx+150, cy+150], outline=(127, 207, 197, 90), width=2)
    base = Image.alpha_composite(base, lay)
    # לוגו וטקסט
    mark = Image.open(IMG / 'mark.png').convert('RGBA').resize((120, 120), Image.LANCZOS)
    d = ImageDraw.Draw(base)
    if he:
        f_title, f_sub, f_line = find_font(HEB_BOLD, 112), find_font(HEB_BOLD, 46), find_font(HEB_REG, 36)
    else:
        f_title, f_sub, f_line = find_font(LAT_BOLD, 104), find_font(LAT_BOLD, 44), find_font(LAT_REG, 34)
    f_url = find_font(LAT_BOLD, 28)
    title = 'יקיר לי' if he else 'Yakir Li'
    sub = 'יד ולב לשכול האזרחי' if he else 'Civilian Bereavement Support'
    line = 'לצד המשפחות מהיום השמיני והלאה' if he else 'Beside families from the day the shiva ends'
    url = 'www.yakirli.org'
    if he:
        title, sub, line = rtl(title), rtl(sub), rtl(line)
    anchor = 'rs' if he else 'ls'
    tx = 1120 if he else 80
    base.paste(mark, (tx - 120 if he else tx, 96), mark)
    d.text((tx, 330), title, font=f_title, fill=(255, 255, 255), anchor=anchor)
    d.text((tx, 398), sub, font=f_sub, fill=(154, 220, 211), anchor=anchor)
    d.text((tx, 462), line, font=f_line, fill=(201, 204, 227), anchor=anchor)
    d.text((tx, 548), url, font=f_url, fill=(230, 137, 111), anchor=anchor)
    out = IMG / f'og-{lang}.jpg'
    base.convert('RGB').save(out, quality=90)
    print(out, base.size, 'fonts:', getattr(f_title, 'path', '?'))

if __name__ == '__main__':
    for lang in ('he', 'en'):
        make(lang)
