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


# Preserve the approved community-ring illustration for About.
about_art = svg('<circle cx="300" cy="225" r="210" fill="url(#g)"/>'
                    '<circle cx="300" cy="225" r="62" fill="#1C1A4A" fill-opacity=".9"/>'
                    '<circle cx="300" cy="225" r="78" fill="none" stroke="#7FCFC5" stroke-opacity=".5" stroke-width="2"/>'
                    + arc(300, 225, 168, 0, 337.5, 16, base=40) , defs=GLOW)


(OUT / 'art-about.svg').write_text(about_art, encoding='utf-8')

# Distinct focal motifs enrich the shared leaf language.
from pathlib import Path
import re,html
root=Path(__file__).resolve().parent.parent
img=root/'assets/img'
asset_names={'knowledge':'data','remembrance':'memorial'}
leaf='<path d="M0 0C-32-14-43-45-30-78C4-72 25-35 0 0Z"/>'
def leaves(spec):
 return ''.join(f'<g transform="translate({x} {y}) rotate({r}) scale({s})" fill="{c}">{leaf}<path d="M0-5L-22-61" stroke="#E3F3F1" stroke-width="2" opacity=".5"/></g>' for x,y,r,s,c in spec)
common='<ellipse cx="320" cy="390" rx="206" ry="26" fill="#2A9D93" opacity=".08"/><circle cx="320" cy="234" r="166" fill="#9ADCD3" opacity=".09"/>'
art={
'home': '<path d="M142 311C175 384 254 408 320 393C391 408 468 379 498 311"/><path d="M184 292C200 342 256 365 320 350C385 365 439 340 456 292"/><path d="M320 348V194"/><path d="M320 289C275 286 244 258 229 224M320 265C357 254 382 227 395 198"/>',
'support': '<circle cx="320" cy="239" r="114" stroke-dasharray="3 16"/><path d="M138 242C139 311 180 358 268 374L308 338C315 330 309 316 297 317L231 326L187 275"/><path d="M502 242C501 311 460 358 372 374L332 338C325 330 331 316 343 317L409 326L453 275"/>',
'public': '<path d="M127 337H513M163 336V257C163 203 216 171 268 188C295 198 312 223 320 251C329 223 345 198 372 188C424 171 477 203 477 257V336"/><path d="M221 336V281C221 244 274 244 274 281V336M366 336V281C366 244 419 244 419 281V336"/>',
'knowledge': '<path d="M320 353C267 321 219 314 159 322V165C221 157 273 167 320 201C367 167 419 157 481 165V322C421 314 373 321 320 353Z"/><path d="M320 204V353M197 218C229 217 256 224 285 240M197 254C229 253 256 260 285 276M355 276C384 260 411 253 443 254"/>',
'remembrance': '<ellipse cx="320" cy="372" rx="107" ry="17"/><path d="M277 365V251Q320 266 363 251V365M277 251Q320 235 363 251M320 249V222"/><path d="M222 205C224 136 263 98 320 85C377 98 416 136 418 205" opacity=".35"/>',
'media': '<rect x="146" y="145" width="306" height="217" rx="28"/><path d="M198 117H469Q494 117 494 147V302"/><path d="M198 302H256M198 324H293"/><path d="M332 296V278M354 307V267M376 298V276M398 289V284"/>',
'contact': '<path d="M167 207L302 121Q320 110 338 121L473 207V335Q473 357 451 357H189Q167 357 167 335Z"/><path d="M172 209L302 286Q320 297 338 286L468 209M172 350L267 278M468 350L373 278"/>',
'donate': '<path d="M138 306C197 361 254 385 320 372C386 385 443 361 502 306"/><path d="M185 284C218 321 267 336 320 325C373 336 422 321 455 284M320 324V194M320 274C294 265 275 247 264 224M320 256C349 249 368 229 378 206"/>'}
specs={
'home':[(320,206,28,1.18,'#2A9D93'),(248,250,-33,.76,'#9ADCD3'),(382,227,74,.8,'#2A9D93'),(166,184,-35,.55,'#9ADCD3'),(481,181,72,.5,'#9ADCD3')],
'support':[(327,279,20,1.25,'#2A9D93'),(290,268,-56,.8,'#9ADCD3'),(371,196,72,.64,'#9ADCD3')],
'public':[(315,200,16,.94,'#2A9D93'),(142,205,-20,.65,'#9ADCD3'),(496,181,68,.6,'#9ADCD3')],
'knowledge':[(392,230,28,.92,'#2A9D93'),(282,125,-40,.57,'#9ADCD3'),(506,311,70,.5,'#9ADCD3')],
'remembrance':[(201,347,-38,.58,'#2A9D93'),(428,316,71,.62,'#9ADCD3')],
'media':[(316,247,30,1.05,'#2A9D93'),(275,250,-52,.75,'#9ADCD3'),(461,346,80,.5,'#9ADCD3')],
'contact':[(327,257,23,1.04,'#2A9D93'),(356,220,67,.65,'#9ADCD3'),(176,167,-37,.53,'#9ADCD3')],
'donate':[(320,210,23,1.06,'#2A9D93'),(279,247,-37,.8,'#9ADCD3'),(367,225,68,.85,'#9ADCD3'),(457,166,60,.43,'#9ADCD3')]}
for name,body in art.items():
 extra='<path d="M320 218C287 199 298 169 322 146C322 173 351 185 320 218Z" fill="#9ADCD3"/><ellipse cx="320" cy="185" rx="49" ry="59" fill="#9ADCD3" opacity=".09"/>' if name=='remembrance' else ''
 svg=f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 480" aria-hidden="true" focusable="false">{common}<g fill="none" stroke="#9ADCD3" stroke-width="5" stroke-linecap="round" stroke-linejoin="round">{body}</g>{leaves(specs[name])}{extra}<circle cx="126" cy="274" r="5" fill="#9ADCD3" opacity=".45"/><circle cx="510" cy="244" r="4" fill="#2A9D93" opacity=".5"/></svg>\n'
 (img/f'art-{asset_names.get(name,name)}.svg').write_text(svg)
