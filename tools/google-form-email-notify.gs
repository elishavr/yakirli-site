/**
 * Yakir Li – a notification from an EXISTING Google Form response Sheet.
 * Install this script in each responses spreadsheet (Extensions > Apps Script).
 * One installable spreadsheet "On form submit" trigger is required in EACH Sheet.
 * Never paste actual family submissions into test runs or version control.
 */
// The private address is configured inside Apps Script (Script Properties), not public GitHub.
const YAKIR_LI_NOTIFY_TO = PropertiesService.getScriptProperties().getProperty('ALERT_EMAIL');

/** After setting Script property ALERT_EMAIL, run once to install the trigger.
 * Does not modify existing responses. A second run will not create duplicates.
 */
function yakirLiInstallTrigger() {
  const email = PropertiesService.getScriptProperties().getProperty('ALERT_EMAIL');
  if (!email) throw new Error('Configure Script property ALERT_EMAIL first.');
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  if (!ss) throw new Error('Open Apps Script from the actual responses spreadsheet.');
  const existing = ScriptApp.getProjectTriggers().filter(t =>
    t.getHandlerFunction() === 'yakirLiOnFormSubmit');
  if (existing.length) {
    console.log('An existing trigger was found; no duplicate created.');
    return;
  }
  ScriptApp.newTrigger('yakirLiOnFormSubmit').forSpreadsheet(ss).onFormSubmit().create();
  console.log('Installed On form submit for ' + ss.getName());
}

function yakirLiOnFormSubmit(e) {
  if (!e || !e.namedValues) throw new Error('Run from an actual form-submit trigger, not the Run button.');
  if (!YAKIR_LI_NOTIFY_TO) throw new Error('Configure script property ALERT_EMAIL to your private notification mailbox first.');
  const title = SpreadsheetApp.getActiveSpreadsheet().getName().replace(/\s*\(תגובות\)\s*$/, '').trim();
  const rows = Object.keys(e.namedValues).map(key => ({
    key: key,
    value: (e.namedValues[key] || []).join(', ')
  }));
  const escapeHtml = value => String(value == null ? '' : value)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  const cells = rows.map(row =>
    '<tr><th scope="row" style="text-align:right;padding:11px;border-bottom:1px solid #dde1e7;vertical-align:top;width:35%">' +
    escapeHtml(row.key) + '</th><td style="text-align:right;direction:rtl;padding:11px;border-bottom:1px solid #dde1e7;white-space:pre-wrap">' +
    escapeHtml(row.value) + '</td></tr>').join('');
  const htmlBody = '<!doctype html><html lang="he" dir="rtl"><body style="direction:rtl;text-align:right;font-family:Arial,sans-serif;background:#fff;color:#18213a">' +
    '<main style="max-width:680px;margin:0 0 0 auto;padding:20px"><h2>טופס חדש מהאתר</h2><p><strong>שם הטופס:</strong> ' +
    escapeHtml(title) + '</p><table role="presentation" dir="rtl" style="direction:rtl;text-align:right;border-collapse:collapse;width:100%">' +
    cells + '</table><p style="font-size:12px;color:#555">נשלח אוטומטית עם קליטת תשובה חדשה בגיליון הטופס.</p></main></body></html>';
  const body = 'טופס חדש מהאתר\nשם הטופס: ' + title + '\n\n' +
    rows.map(row => row.key + ': ' + row.value).join('\n\n');
  MailApp.sendEmail({
    to: YAKIR_LI_NOTIFY_TO,
    subject: 'טופס חדש מהאתר - ' + title,
    body: body,
    htmlBody: htmlBody,
    name: 'יקיר לי - התראות טפסים'
  });
}

// UI-only preview: sends synthetic, non-sensitive data to the configured mailbox.
// This verifies layout and mail delivery, but NOT that an external form trigger fires.
function yakirLiSendDesignTest() {
  yakirLiOnFormSubmit({namedValues: {'שם מלא':['בדיקה בלבד'],'פרטי הפנייה':['זהו מייל בדיקה ללא מידע אישי']}});
}
