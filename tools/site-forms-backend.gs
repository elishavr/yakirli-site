/**
 * יקיר לי – קליטת טפסי האתר (פנייה כללית והזמנת הרצאה)
 *
 * מה הסקריפט עושה בכל שליחת טופס מהאתר:
 *   1. שומר את הפנייה כשורה בגיליון "פניות מהאתר – יקיר לי" בדרייב של בעל הסקריפט.
 *   2. שולח מייל התראה מסודר (מימין לשמאל) לבעל הסקריפט.
 * הנתונים לא עוברים דרך שום שירות חיצוני מלבד חשבון Google של העמותה.
 *
 * התקנה (פעם אחת):
 *   script.google.com ← פרויקט חדש ← מדביקים את כל הקובץ ← שומרים
 *   Deploy ← New deployment ← Web app ← Execute as: Me ← Who has access: Anyone ← Deploy
 *   מאשרים הרשאות, מעתיקים את כתובת ה-Web app ומעבירים אותה לאתר (build.py, FORMS_ENDPOINT).
 *
 * הגיליון נוצר אוטומטית בשליחה הראשונה. מייל נוסף לקבלת עותק (למשל info@yakirli.org)
 * אפשר להגדיר ב-Project Settings ← Script properties, בשם CC_EMAIL.
 * חובה להגדיר ALERT_EMAIL ככתובת המייל הפרטית להתראות – לא נשמרת בגיט.
 */

const SHEET_NAME = 'פניות מהאתר – יקיר לי';
const FORM_TITLES = { contact: 'פנייה כללית', lectures: 'הזמנת הרצאה' };
const MAX_FIELD = 5000;

function doPost(e) {
  try {
    const raw = (e && e.postData && e.postData.contents) || '{}';
    if (raw.length > 60000) return json_({ ok: false, error: 'too_large' });
    const data = JSON.parse(raw);
    if (!Object.prototype.hasOwnProperty.call(FORM_TITLES, data._form)) {
      return json_({ ok: false, error: 'unknown_form' });
    }
    // Never accept a request that cannot be sent to the private alert mailbox.
    const recipient = PropertiesService.getScriptProperties().getProperty('ALERT_EMAIL');
    if (!recipient) return json_({ ok: false, error: 'missing_alert_email' });
    // מלכודת לרובוטים: שדה נסתר שבני אדם לא ממלאים
    if (data._hp) return json_({ ok: true });
    const kind = data._form;
    const fields = Array.isArray(data.fields) ? data.fields.slice(0, 30) : [];
    const rows = fields
      .map((f, i) => {
        const rawLabel = String(f.label || '').slice(0, 200);
        // The visitor controls the JSON payload; labels can also be malicious.
        const key = /^[\s\u0000-\u001f]*[=+\-@]/.test(rawLabel) ? ('שדה ' + (i + 1)) : rawLabel;
        return { key: key, value: String(f.value || '').slice(0, MAX_FIELD) };
      })
      .filter(f => f.key && f.value);
    if (!rows.length) return json_({ ok: false, error: 'empty' });

    const lock = LockService.getScriptLock();
    lock.waitLock(20000);
    try { saveRow_(kind, rows, data._page || ''); } finally { lock.releaseLock(); }
    notify_(kind, rows, data._page || '');
    return json_({ ok: true });
  } catch (err) {
    console.error(err);
    return json_({ ok: false, error: 'server' });
  }
}

function doGet() {
  return json_({ ok: true, service: 'yakirli-forms' });
}

function saveRow_(kind, rows, page) {
  const props = PropertiesService.getScriptProperties();
  let ss = null;
  const id = props.getProperty('SHEET_ID');
  if (id) { try { ss = SpreadsheetApp.openById(id); } catch (e) { ss = null; } }
  if (!ss) {
    ss = SpreadsheetApp.create(SHEET_NAME);
    ss.setSpreadsheetLocale('he_IL');
    props.setProperty('SHEET_ID', ss.getId());
    const first = ss.getSheets()[0];
    first.setName('קרא אותי');
    first.getRange('A1').setValue('כל לשונית בקובץ הזה היא טופס באתר. כל שורה היא פנייה. המידע רגיש – לא לשתף את הקובץ.');
  }
  const tab = FORM_TITLES[kind];
  let sh = ss.getSheetByName(tab);
  if (!sh) {
    sh = ss.insertSheet(tab);
    sh.setRightToLeft(true);
    sh.appendRow(['תאריך', 'עמוד'].concat(rows.map(r => r.key)));
    sh.setFrozenRows(1);
    sh.getRange(1, 1, 1, sh.getLastColumn()).setFontWeight('bold').setBackground('#E3F3F1');
  }
  // התאמת עמודות לפי שם השדה (אם נוסף שדה חדש לטופס – נוספת עמודה)
  let header = sh.getRange(1, 1, 1, sh.getLastColumn()).getValues()[0];
  rows.forEach(r => {
    if (header.indexOf(r.key) < 0) {
      sh.getRange(1, header.length + 1).setValue(r.key).setFontWeight('bold').setBackground('#E3F3F1');
      header.push(r.key);
    }
  });
  // Treat visitor input as text; do not execute submitted formulas in Sheets.
  const safeCell_ = value => {
    const v = String(value == null ? '' : value);
    return /^[\s\u0000-\u001f]*[=+\-@]/.test(v) ? "'" + v : v;
  };
  const line = header.map(h => {
    if (h === 'תאריך') return new Date();
    if (h === 'עמוד') return safeCell_(page);
    const f = rows.find(r => r.key === h);
    return f ? safeCell_(f.value) : '';
  });
  sh.appendRow(line);
}

function notify_(kind, rows, page) {
  const to = PropertiesService.getScriptProperties().getProperty('ALERT_EMAIL');
  if (!to) throw new Error('ALERT_EMAIL must be configured in Script properties');
  const cc = PropertiesService.getScriptProperties().getProperty('CC_EMAIL') || '';
  const title = FORM_TITLES[kind];
  const esc = v => String(v == null ? '' : v).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  const cells = rows.map(r =>
    '<tr><th style="text-align:right;padding:10px;border-bottom:1px solid #dde1e7;vertical-align:top;width:32%;color:#1C1A4A">' + esc(r.key) +
    '</th><td style="text-align:right;padding:10px;border-bottom:1px solid #dde1e7;white-space:pre-wrap">' + esc(r.value) + '</td></tr>').join('');
  const id = PropertiesService.getScriptProperties().getProperty('SHEET_ID');
  const sheetLink = id ? '<p><a href="https://docs.google.com/spreadsheets/d/' + id + '">לכל הפניות בגיליון</a></p>' : '';
  const html = '<div dir="rtl" style="direction:rtl;text-align:right;font-family:Arial,sans-serif;color:#18213a;max-width:640px">' +
    '<h2 style="color:#1C1A4A;margin:0 0 6px">טופס חדש מהאתר</h2>' +
    '<p style="margin:0 0 8px"><strong>שם הטופס:</strong> ' + esc(title) + '</p>' +
    '<p style="color:#555;margin:0 0 14px">' + esc(Utilities.formatDate(new Date(), 'Asia/Jerusalem', 'dd.MM.yyyy HH:mm')) + (page ? ' · ' + esc(page) : '') + '</p>' +
    '<table dir="rtl" style="border-collapse:collapse;width:100%">' + cells + '</table>' + sheetLink + '</div>';
  const text = 'טופס חדש מהאתר\nשם הטופס: ' + title + '\n\n' + rows.map(r => r.key + ': ' + r.value).join('\n\n');
  const emailRow = rows.find(r => /mail|מייל|אימייל/i.test(r.key) && /@/.test(r.value));
  const msg = { to: to, subject: 'טופס חדש מהאתר - ' + title, body: text, htmlBody: html, name: 'אתר יקיר לי' };
  if (cc) msg.cc = cc;
  if (emailRow && /^[^\s<>@\r\n]+@[^\s<>@\r\n]+\.[^\s<>@\r\n]+$/.test(emailRow.value)) {
    msg.replyTo = emailRow.value;
  }
  MailApp.sendEmail(msg);
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

/** בדיקה ידנית מתוך העורך (כפתור Run): שולחת פנייה לדוגמה, בלי מידע אמיתי. */
function testSubmission() {
  const fake = { postData: { contents: JSON.stringify({ _form: 'contact', _page: '/contact/', fields: [
    { label: 'שם מלא', value: 'בדיקה – לא אמיתי' }, { label: 'הודעה', value: 'זו פנייה לבדיקה בלבד.' }
  ] }) } };
  console.log(doPost(fake).getContent());
}
