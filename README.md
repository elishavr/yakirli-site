# אתר יקיר לי – יד ולב לשכול האזרחי

אתר סטטי (HTML + CSS + מעט JS) לעמותת יקיר לי (ע"ר 580616001), דו־לשוני עברית/אנגלית.
השפה העיצובית בהשראת [moshe.org.il](https://moshe.org.il/); המבנה והתוכן לפי ההצעה המאושרת (7.10.2026).

**תצוגה חיה:** אחרי כל דחיפה ל־`main` האתר נבנה ומתפרסם אוטומטית ב־GitHub Pages
(הקישור מופיע בלשונית Actions ובהגדרות הריפו → Pages).

## מבנה התיקייה

```
src/he/*.html        תוכן העמודים בעברית – כאן עורכים טקסטים (18 עמודים)
src/en/*.html        תוכן העמודים באנגלית (18 עמודים)
templates/layout.html  כותרת עליונה, תפריט, פוטר – משותף לכל העמודים
assets/css/site.css  העיצוב כולו (צבעים, גופנים, פריסה)
assets/js/site.js    תפריט נייד, תפריטי משנה, טפסים (תצוגה מקדימה)
assets/img/          לוגו, אייקונים, תמונות, איורי עלים
build.py             בונה את dist/ מהמקורות (python3, ללא תלויות)
tools/extract.py     חילוץ חד־פעמי מההצעה (לא צריך להריץ שוב)
reference/           ההצעה המאושרת – מקור האמת לתוכן; לא עורכים אותה
dist/                הפלט (לא נשמר בגיט; נבנה אוטומטית)
```

## עריכה

- **טקסט בעמוד:** פותחים את הקובץ המתאים ב־`src/he/` או `src/en/` ועורכים את ה־HTML. בראש כל קובץ שורת הערה עם שם העמוד והנתיב.
- **תפריט / פוטר / פרטי קשר:** `build.py` (המילון `NAV` ו־`T`) ו־`templates/layout.html`.
- **עיצוב:** `assets/css/site.css`. משתני הצבע בראש הקובץ.
- **תוכן חסר** מסומן ב־`class="todo"` (רקע צהוב). לא ממציאים תוכן במקומו.
- **קישורים פנימיים** נכתבים כנתיב מהשורש, למשל `href="/about/"` או `href="/en/about/"`. סקריפט הבנייה מוסיף לבד את קידומת הנתיב של GitHub Pages.

### מפת העמודים

| עמוד | עברית | אנגלית |
|---|---|---|
| בית | `/` | `/en/` |
| אודות | `/about/` | `/en/about/` |
| היום השמיני | `/eighth-day/` | `/en/eighth-day/` |
| הורים שכולים | `/bereaved-parents/` | `/en/bereaved-parents/` |
| סבים וסבתות | `/grandparents/` | `/en/grandparents/` |
| מתנדבים והכשרה | `/volunteers/` | `/en/volunteers/` |
| פעילות ציבורית | `/public-advocacy/` | `/en/public-advocacy/` |
| קידום חקיקה | `/legislation/` | `/en/legislation/` |
| שבוע המודעות | `/awareness-week/` | `/en/awareness-week/` |
| הרצאות | `/lectures/` | `/en/lectures/` |
| נתוני פטירה | `/mortality-data/` | `/en/mortality-data/` |
| מחקרים | `/research/` | `/en/research/` |
| הנצחה | `/remembrance/` | `/en/remembrance/` |
| מדיה | `/media/` | `/en/media/` |
| צרו קשר | `/contact/` | `/en/contact/` |
| תרומה | `/donate/` | `/en/donate/` |
| הצהרת נגישות | `/accessibility/` | `/en/accessibility/` |
| מדיניות פרטיות | `/privacy/` | `/en/privacy/` |

## בנייה ותצוגה מקומית

```bash
python3 build.py && python3 -m http.server 8787 --directory dist
```

ואז פותחים http://localhost:8787/ (עברית) או http://localhost:8787/en/ (אנגלית).

## פרסום

דחיפה ל־`main` מפעילה את `.github/workflows/pages.yml`: בנייה עם קידומת הנתיב של הריפו ופריסה ל־GitHub Pages.
לפרסום בדומיין www.yakirli.org (כתובת שורש) מריצים `python3 build.py` ללא `--base` ומעלים את `dist/`.

## העברה לוורדפרס

האתר נבנה כך שיהיה קל להעביר אותו לוורדפרס (מרים פיש):
- כל עמוד הוא קובץ HTML אחד ב־`src/` עם מבנה סמנטי פשוט (`section`, `h2`, `article.card` וכו').
- העיצוב כולו ב־`site.css` אחד, עם משתני צבע בראש הקובץ.
- הטפסים הם תצוגה מקדימה בלבד; החיבור לווטסאפ של פיני ול־info@yakirli.org ייעשה בוורדפרס.
- תרומות דרך JGive (קישור חיצוני), ללא סליקה באתר.
