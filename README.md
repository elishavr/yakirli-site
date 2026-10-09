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
assets/img/          לוגו, אייקונים, תמונות, איורי עלים לפי קבוצת עמודים, תמונות שיתוף
assets/img/photos/   שמונה תמונות אווירה מקוריות ב־AVIF, עם חלופות WebP
build.py             בונה את dist/ מהמקורות (python3, ללא תלויות)
tools/extract.py     חילוץ חד־פעמי מההצעה (לא צריך להריץ שוב)
tools/make_art.py    מחולל איורי העלים (assets/img/art-*.svg)
tools/make_og.py     מחולל תמונות השיתוף (assets/img/og-he.jpg, og-en.jpg)
reference/           ההצעה המאושרת – מקור האמת לתוכן; לא עורכים אותה
dist/                הפלט (לא נשמר בגיט; נבנה אוטומטית)
```

תמונות ההירו הנוכחיות נוצרו ב־AI לפי בקשת אלישב. הן תמונות אווירה להמחשה, ללא אנשים; אינן תיעוד של פעילות העמותה. המיפוי, הפרומפטים, המשקלים ותוצאות הבדיקה מפורטים ב־[docs/photo-assets.md](docs/photo-assets.md). לעדכון תמונה מחליפים את הפניית ה־CSS ואת המיפוי `HERO_PHOTOS` ב־`build.py`, שטוען את התמונה הראשית מוקדם. קובצי `art-*.svg` והמחולל שלהם נשמרו, אך אינם התמונות המוצגות בהירו.

## עריכה

- **טקסט בעמוד:** פותחים את הקובץ המתאים ב־`src/he/` או `src/en/` ועורכים את ה־HTML. בראש כל קובץ שורת הערה עם שם העמוד והנתיב. הקבצים מפוצלים לשורה לכל תגית בלוק (`section`, `article`, `h2`, `p`, `li`…) כדי שגיט ימזג עריכות מקבילות; שומרים על המבנה הזה.
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

## תצוגה ותנועה

התוכן, התמונות והמספרים מופיעים מיד. אין ספירה מונפשת, חשיפה מדורגת בגלילה או תנועת רקע, וגובה הכותרת העליונה נשאר קבוע בגלילה. משוב עדין נשמר בכפתורים ובתפריטים, ומכבד `prefers-reduced-motion: reduce`.

הוראות הצילום הוסרו מהתמונות לבקשת אלישב ונשמרו ב־[docs/photo-briefs.md](docs/photo-briefs.md). סקירת הגולש והבדיקות מתועדות ב־[docs/visitor-review.md](docs/visitor-review.md).

## פרסום

דחיפה ל־`main` מפעילה את `.github/workflows/pages.yml`: בנייה עם קידומת הנתיב של הריפו ופריסה ל־GitHub Pages.
לפרסום בדומיין www.yakirli.org (כתובת שורש) מריצים `python3 build.py` ללא `--base` ומעלים את `dist/`.

## העברה לוורדפרס

האתר נבנה כך שיהיה קל להעביר אותו לוורדפרס (מרים פיש):
- כל עמוד הוא קובץ HTML אחד ב־`src/` עם מבנה סמנטי פשוט (`section`, `h2`, `article.card` וכו').
- העיצוב כולו ב־`site.css` אחד, עם משתני צבע בראש הקובץ.
- הטפסים הם תצוגה מקדימה בלבד; החיבור לווטסאפ של פיני ול־info@yakirli.org ייעשה בוורדפרס.
- תרומות דרך JGive (קישור חיצוני), ללא סליקה באתר.

## צילומי מסך לביקורת PR

`Review screenshots` מופעל בכל PR ל־`main`. הוא בונה את גרסת הבסיס ואת הגרסה המוצעת, ומצרף להרצת הבדיקה ארכיון `before-after-desktop-mobile`: כל 36 העמודים, לפני ואחרי, ברוחב 1440px ו־360px (144 צילומים). הצילומים אינם נשמרים בגיט. ניתן להוריד אותם מ־Checks → Review screenshots → Artifacts, למשך 90 יום.

כלי הפיתוח Playwright 1.56.1 ו־axe-core 4.10.3 מותקנים בתיקייה זמנית בלבד, מחוץ לאתר. להרצה מקומית מתקינים אותם מחוץ לריפו, מגדירים `NODE_PATH` לתיקיית `node_modules` שלהם, בונים עם `python3 build.py`, ומריצים:

```bash
AXE_PATH="$NODE_PATH/axe-core/axe.min.js" REVIEW_OUT=/tmp/yakirli-review node tools/capture_review.cjs
```

הסקריפט מפעיל שרת מקומי זמני בעצמו, מצלם ושומר `results.json` עם בדיקות גלישה אופקית, תוויות, תמונות ו־axe. ניתן לבחור Chromium מותקן בעזרת `CHROME_PATH`. לצילום העמוד המלא בלבד, הסקריפט טוען מראש תמונות עצלות וממתין לפענוחן; התנהגות הטעינה באתר אינה משתנה. זהו איסוף ראיות, לא הבטחה שהאתר עבר את כל בדיקות הנגישות; התוצאות והחריגים מפורטים בדוח של כל PR.

### בדיקות QA

```bash
python3 build.py --base /yakirli-site
python3 tools/check_links.py --base /yakirli-site
python3 build.py
python3 tools/check_links.py
node tools/test_navigation.cjs
```

בודק הקישורים משתמש רק בספרייה התקנית של Python. הוא בודק קבצים, עוגנים, נכסי CSS, זוגות שפות, מזהים כפולים ושאריות תבנית. כתובות חיצוניות נרשמות לפלט; הוא אינו שולח אליהן בקשות. `test_navigation.cjs` דורש Playwright מחוץ לריפו ובודק מקלדת, מגע, Escape, שינוי גודל, טפסי תצוגה, גלילת טבלה, הפחתת תנועה והדפסה.

בביקורת 9.10.2026 הופעלו גם html-validate 9.7.1 (`html-validate:standard`, ללא כללי סגנון SVG/void וללא h32 שאינו נדרש כאן), css-tree 3.1.0 לבדיקת תחביר ו־Lighthouse 12.8.2. אלה כלי פיתוח בלבד; אין צורך בהם לבנייה. פירוט הכיסוי והמגבלות: `docs/qa-report.md`.
### גרפיקות

מפת האיורים, האייקונים, תמונות השיתוף ומגבלות הלוגו: `docs/graphics.md`. איורי ההירו נבחרים דרך `--page-art` ב־CSS. קובצי המקור לתמונות השיתוף הם `assets/img/og-he.svg` ו־`og-en.svg`; יש לייצא PNG בגודל 1200×630 עם גופן Assistant לאחר עריכה.
