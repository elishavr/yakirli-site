#!/bin/bash
# פריסה של האתר ל-yakirli.org מענף main של elishavr/yakirli-site.
# מותקן בשרת כ-~/deploy-new-site.sh ורץ מ-cron כל 5 דקות. בלי שינוי ב-main הוא יוצא מיד.
# אם הבנייה או הבדיקות נכשלות, האתר החי לא משתנה. להרצה ידנית: ~/deploy-new-site.sh --force
# חזרה לוורדפרס לא תלויה בסקריפט: מחזירים את Document root ל-public_html בלוח של servers24.
set -euo pipefail
H=/var/www/0e30faae-51b3-48f7-8064-16c325a20fae
SRC=$H/yakirli-site-src
LIVE=$H/new_site
STAMP=$H/.deployed-sha

exec 9>"$H/.deploy-new-site.lock"
flock -n 9 || exit 0

cd "$SRC"
git fetch -q --depth 1 origin main
NEW=$(git rev-parse origin/main)
CUR=$(cat "$STAMP" 2>/dev/null || true)
if [ "$NEW" = "$CUR" ] && [ "${1:-}" != "--force" ]; then
  exit 0
fi

git reset -q --hard origin/main
python3 build.py --site-url https://yakirli.org > /dev/null
python3 tools/check_links.py > /dev/null
python3 tools/check_forms.py > /dev/null
test -s dist/index.html
test -s dist/candles/index.html

# עמודי ההפניה (meta refresh) הופכים להפניות 301: המפה נכתבת מחוץ לתיקיית האתר, והעמודים עצמם לא מועלים
python3 - "$SRC/dist" "$H/redirects.json.new" <<'PY'
import json, pathlib, re, sys
dist, out = pathlib.Path(sys.argv[1]), sys.argv[2]
m = {}
for f in dist.rglob('index.html'):
    t = f.read_text(encoding='utf-8')
    g = re.search(r'http-equiv="refresh" content="0; url=([^"]+)"', t)
    if g and len(t) < 2000:
        m['/' + f.parent.relative_to(dist).as_posix().strip('/') + '/'] = g.group(1)
        f.unlink()
json.dump(m, open(out, 'w', encoding='utf-8'), ensure_ascii=False, indent=0)
print(len(m))
PY
find dist -type d -empty -delete
mv "$H/redirects.json.new" "$H/redirects.json"
cp server/index.php dist/index.php

# wp-content/uploads (קישור לקבצים של האתר הקודם) קיים רק בשרת
rsync -a --delete --exclude /wp-content/ dist/ "$LIVE/"
find "$LIVE" -path "$LIVE/wp-content" -prune -o -type d -exec chmod 755 {} +
find "$LIVE" -path "$LIVE/wp-content" -prune -o -type f -exec chmod 644 {} +

echo "$NEW" > "$STAMP"
echo "$(date -Is) deployed $(git log --oneline -1)"
