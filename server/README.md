# קובצי השרת של yakirli.org

האתר החי יושב באחסון servers24, באתר `yakirli.org`, בתיקייה `new_site` (ה־Document root של הדומיין). הוורדפרס הקודם נשמר ב־`public_html` לצורך חזרה.

- `deploy-new-site.sh` – מותקן בשרת כ־`~/deploy-new-site.sh` ורץ מ־cron כל 5 דקות (בלוח: Advanced ← Developer tools ← Cron jobs). כש־`main` משתנה הוא בונה, מריץ את הבדיקות ומעתיק ל־`new_site`. יומן: `~/logs/deploy-new-site.log`. שינוי בסקריפט כאן לא מתעדכן לבד בשרת, צריך להעתיק אותו ידנית.
- `index.php` – מועתק לשורש האתר בכל פריסה. כתובות של האתר הקודם מקבלות הפניה קבועה (301) לפי `~/redirects.json`, שהסקריפט מייצר מעמודי ההפניה של `build.py` (`OLD_SITE_REDIRECTS`). כל כתובת אחרת שלא קיימת מקבלת את עמוד ה־404 של האתר.
- `new_site/wp-content/uploads/2024…2026` – קישורים לתמונות ולמסמכים של הוורדפרס, כדי שקישורים ישנים לקבצים ימשיכו לעבוד. קיימים רק בשרת.

חזרה לאתר הקודם: בלוח, Domains ← yakirli.org ← Manage ← Document root ← `public_html`.

סביבת הבדיקה (`yakirli-new.staging24.link`) ותצוגת GitHub Pages נבנות עם `--noindex`, כדי שלא ייכנסו לגוגל.
