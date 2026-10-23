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
 */

const SHEET_NAME = 'פניות מהאתר – יקיר לי';
const FORM_TITLES = { contact: 'פנייה כללית', lectures: 'הזמנת הרצאה' };
const MAX_FIELD = 5000;

function doPost(e) {
  try {
    const data = JSON.parse((e && e.postData && e.postData.contents) || '{}');
    // מלכודת לרובוטים: שדה נסתר שבני אדם לא ממלאים
    if (data._hp) return json_({ ok: true });
    const kind = FORM_TITLES[data._form] ? data._form : 'contact';
    const fields = Array.isArray(data.fields) ? data.fields.slice(0, 30) : [];
    const rows = fields
      .map(f => ({ key: String(f.label || '').slice(0, 200), value: String(f.value || '').slice(0, MAX_FIELD) }))
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
    ss.setSpreadsheetLocale('iw_IL');
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
  const line = header.map(h => {
    if (h === 'תאריך') return new Date();
    if (h === 'עמוד') return page;
    const f = rows.find(r => r.key === h);
    return f ? f.value : '';
  });
  sh.appendRow(line);
}

function notify_(kind, rows, page) {
  const to = Session.getEffectiveUser().getEmail();
  const cc = PropertiesService.getScriptProperties().getProperty('CC_EMAIL') || '';
  const title = FORM_TITLES[kind];
  const esc = v => String(v == null ? '' : v).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  const cells = rows.map(r =>
    '<tr><th style="text-align:right;padding:10px;border-bottom:1px solid #dde1e7;vertical-align:top;width:32%;color:#1C1A4A">' + esc(r.key) +
    '</th><td style="text-align:right;padding:10px;border-bottom:1px solid #dde1e7;white-space:pre-wrap">' + esc(r.value) + '</td></tr>').join('');
  const id = PropertiesService.getScriptProperties().getProperty('SHEET_ID');
  const sheetLink = id ? '<p><a href="https://docs.google.com/spreadsheets/d/' + id + '">לכל הפניות בגיליון</a></p>' : '';
  const html = '<div dir="rtl" style="direction:rtl;text-align:right;font-family:Arial,sans-serif;color:#18213a;max-width:640px">' +
    '<h2 style="color:#1C1A4A;margin:0 0 6px">' + esc(title) + ' מהאתר</h2>' +
    '<p style="color:#555;margin:0 0 14px">' + esc(Utilities.formatDate(new Date(), 'Asia/Jerusalem', 'dd.MM.yyyy HH:mm')) + (page ? ' · ' + esc(page) : '') + '</p>' +
    '<table dir="rtl" style="border-collapse:collapse;width:100%">' + cells + '</table>' + sheetLink + '</div>';
  const text = title + ' מהאתר\n\n' + rows.map(r => r.key + ': ' + r.value).join('\n');
  const emailRow = rows.find(r => /mail|מייל|אימייל/i.test(r.key) && /@/.test(r.value));
  const msg = { to: to, subject: 'פנייה חדשה מהאתר – ' + title, body: text, htmlBody: html, name: 'אתר יקיר לי' };
  if (cc) msg.cc = cc;
  if (emailRow) msg.replyTo = emailRow.value;
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
