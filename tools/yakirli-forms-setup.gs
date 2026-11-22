/**
 * יקיר לי – הקמת טפסים והתראות למייל
 * הפעלה: לבחור בפונקציה setupAll וללחוץ "הפעלה" (Run).
 * - יוצר שלושה טפסי גוגל חדשים (צרו קשר, הזמנת הרצאה, הצטרפות כחבר/ת עמותה)
 * - מוודא לכל טופס גיליון תשובות
 * - מתקין התראה במייל על כל תשובה חדשה, עם כל השאלות והתשובות וקישור לגיליון
 * - כותב ליומן (Execution log) את מבנה כל טופס, לחיבור הטפסים המעוצבים באתר
 */

var ALERT_EMAIL = 'info@yakirli.org';
var THANKS = 'מוקירים תודה, קיבלנו ונחזור אליכם.';
var DRAFT_TO_TRASH = '1IaAb6jRA-5N1VL2jjyRGt5PpWckm38WPJwk2Tu4CHjg';

// טפסים קיימים לפי מזהה הפרסום (forms/d/e/...) או קישור מקוצר
var EXISTING = {
  parents_he: '1FAIpQLSe5hLRLG4wtiijy4eSqazjzYy9NBIOJ1nJi4Eb4XIzOMYiCDw',
  parents_en: '1FAIpQLSfVty0on3VKBk3d-dIdRkaHTtbZ1lmnCRDOwQY2PfQfNBBRWQ',
  memorial:   '1FAIpQLSchhvFDIo2ZFOlYn3JFEJd1yOySCOY_Nj9NVVgAUgL-QMqgUw',
  grandparents: '1FAIpQLSefq2anLte9kD1z3OJkNO_5lEV6585a-ZCga7Fyif37p-Rx5A',
  volunteers: 'https://forms.gle/ahSZVd6EmDSEDSpr7',
  newsletter: 'https://forms.gle/xws9C5CZQajKypWSA'
};

var NEW_FORMS = {
  contact: {
    title: 'צרו קשר – יקיר לי',
    desc: 'השאירו שם וטלפון, ונחזור אליכם לשיחה.',
    items: [['שם מלא','t'],['טלפון','t'],['אימייל','t'],['נושא הפנייה','t'],['הודעה','p'],['הסכמה למדיניות הפרטיות','t']]
  },
  lectures: {
    title: 'הזמנת הרצאה – יקיר לי',
    desc: 'משך ההרצאה: שעה וחצי. השאירו פרטים ונחזור אליכם לתיאום.',
    items: [['שם מלא','t'],['ארגון / קהילה','t'],['טלפון','t'],['אימייל','t'],['איזו הרצאה?','t'],['תאריך מבוקש','t'],['מקום ההרצאה','t'],['הסכמה למדיניות הפרטיות','t']]
  },
  membership: {
    title: 'הצטרפות כחבר/ת עמותה – יקיר לי',
    desc: 'רוצים להיות חלק? השאירו פרטים ונחזור אליכם להשלמת ההצטרפות בטלפון.',
    items: [['שם מלא','t'],['טלפון','t'],['אימייל','t'],['יישוב','t'],['הערות','p'],['הסכמה למדיניות הפרטיות','t'],['הסכמה לקבלת עדכונים מהעמותה','t']]
  }
};

function setupAll() {
  var props = PropertiesService.getScriptProperties();
  var result = {};

  // 1. איתור הטפסים הקיימים בדרייב
  var byPub = {};
  var files = DriveApp.getFilesByType(MimeType.GOOGLE_FORMS);
  var shortMap = {};
  while (files.hasNext()) {
    var f = files.next();
    try {
      var fm = FormApp.openById(f.getId());
      var pub = fm.getPublishedUrl();
      var m = pub.match(/\/d\/e\/([^/]+)/);
      if (m) byPub[m[1]] = fm;
      try { var s = fm.shortenFormUrl(pub); shortMap[s] = fm; } catch (e2) {}
    } catch (e) {}
  }
  Object.keys(EXISTING).forEach(function (key) {
    var ref = EXISTING[key];
    var form = ref.indexOf('forms.gle') >= 0 ? shortMap[ref] : byPub[ref];
    if (!form) { result[key] = {error: 'לא נמצא בדרייב: ' + ref}; return; }
    result[key] = prepare(form);
  });

  // 2. יצירת הטפסים החדשים (פעם אחת בלבד)
  Object.keys(NEW_FORMS).forEach(function (key) {
    var id = props.getProperty('form_' + key);
    var form;
    if (id) { form = FormApp.openById(id); }
    else {
      var cfg = NEW_FORMS[key];
      form = FormApp.create(cfg.title);
      form.setDescription(cfg.desc);
      form.setConfirmationMessage(THANKS);
      form.setCollectEmail(false);
      form.setAllowResponseEdits(false);
      form.setLimitOneResponsePerUser(false);
      cfg.items.forEach(function (it) {
        (it[1] === 'p' ? form.addParagraphTextItem() : form.addTextItem()).setTitle(it[0]).setRequired(false);
      });
      try { if (form.setPublished) form.setPublished(true); } catch (e) {}
      props.setProperty('form_' + key, form.getId());
    }
    result[key] = prepare(form);
  });

  // 3. טיוטה ריקה שנפתחה בטעות – לפח (ניתן לשחזור)
  try { DriveApp.getFileById(DRAFT_TO_TRASH).setTrashed(true); } catch (e) {}

  Logger.log('YAKIRLI_JSON_START' + JSON.stringify(result) + 'YAKIRLI_JSON_END');
}

/** גיליון תשובות + טריגר התראה + מיפוי שדות */
function prepare(form) {
  var sheetUrl = '';
  try {
    var destId = form.getDestinationId();
    if (!destId) {
      var ss = SpreadsheetApp.create(form.getTitle() + ' (תשובות)');
      form.setDestination(FormApp.DestinationType.SPREADSHEET, ss.getId());
      destId = ss.getId();
    }
    sheetUrl = 'https://docs.google.com/spreadsheets/d/' + destId + '/edit';
  } catch (e) { sheetUrl = ''; }

  var has = ScriptApp.getProjectTriggers().some(function (t) {
    return t.getHandlerFunction() === 'onSiteFormSubmit' && t.getTriggerSourceId() === form.getId();
  });
  if (!has) ScriptApp.newTrigger('onSiteFormSubmit').forForm(form).onFormSubmit().create();

  var items = form.getItems().map(function (item) {
    var o = {title: item.getTitle(), type: String(item.getType()), entry: null, required: null, choices: null};
    try {
      var typed = asTyped(item);
      if (typed && typed.isRequired) o.required = typed.isRequired();
      if (typed && typed.getChoices) o.choices = typed.getChoices().map(function (c) { return c.getValue(); });
      var resp = dummy(item, typed);
      if (resp) {
        var url = form.createResponse().withItemResponse(resp).toPrefilledUrl();
        var mm = url.match(/entry\.(\d+)/);
        if (mm) o.entry = 'entry.' + mm[1];
      }
    } catch (e) { o.error = String(e); }
    return o;
  });

  var accepting = form.isAcceptingResponses();
  var published = null;
  try { if (form.isPublished) published = form.isPublished(); } catch (e) {}

  return {
    id: form.getId(),
    title: form.getTitle(),
    publishedUrl: form.getPublishedUrl(),
    responseUrl: form.getPublishedUrl().replace(/\/viewform.*$/, '/formResponse'),
    collectsEmail: form.collectsEmail(),
    requiresLogin: (function () { try { return form.requiresLogin(); } catch (e) { return null; } })(),
    accepting: accepting,
    published: published,
    sheetUrl: sheetUrl,
    items: items
  };
}

function asTyped(item) {
  var T = FormApp.ItemType;
  switch (item.getType()) {
    case T.TEXT: return item.asTextItem();
    case T.PARAGRAPH_TEXT: return item.asParagraphTextItem();
    case T.MULTIPLE_CHOICE: return item.asMultipleChoiceItem();
    case T.CHECKBOX: return item.asCheckboxItem();
    case T.LIST: return item.asListItem();
    case T.DATE: return item.asDateItem();
    case T.SCALE: return item.asScaleItem();
    case T.TIME: return item.asTimeItem();
    default: return null;
  }
}

function dummy(item, typed) {
  var T = FormApp.ItemType;
  switch (item.getType()) {
    case T.TEXT: case T.PARAGRAPH_TEXT: return typed.createResponse('x');
    case T.MULTIPLE_CHOICE: case T.LIST: return typed.createResponse(typed.getChoices()[0].getValue());
    case T.CHECKBOX: return typed.createResponse([typed.getChoices()[0].getValue()]);
    case T.DATE: return typed.createResponse(new Date());
    case T.SCALE: return typed.createResponse(typed.getLowerBound());
    case T.TIME: return typed.createResponse(1, 0);
    default: return null;
  }
}

/** נשלח אוטומטית בכל תשובה חדשה */
function onSiteFormSubmit(e) {
  var form = e.source;
  var title = form.getTitle();
  var rows = e.response.getItemResponses().map(function (r) {
    var v = r.getResponse();
    if (Array.isArray(v)) v = v.join(', ');
    return '<tr><td style="padding:8px 12px;border:1px solid #d6e4e3;background:#E3F2F1;font-weight:bold;vertical-align:top;white-space:nowrap">'
      + esc(r.getItem().getTitle()) + '</td><td style="padding:8px 12px;border:1px solid #d6e4e3;white-space:pre-wrap">'
      + esc(String(v == null ? '' : v)) + '</td></tr>';
  }).join('');
  var sheetUrl = '';
  try { sheetUrl = 'https://docs.google.com/spreadsheets/d/' + form.getDestinationId() + '/edit'; } catch (x) {}
  var when = Utilities.formatDate(e.response.getTimestamp(), 'Asia/Jerusalem', 'dd.MM.yyyy HH:mm');
  var html = '<div dir="rtl" style="font-family:Arial,sans-serif;font-size:15px;color:#141744;text-align:right">'
    + '<h2 style="color:#141744;margin:0 0 4px">טופס חדש מהאתר – ' + esc(title) + '</h2>'
    + '<p style="color:#555;margin:0 0 14px">התקבל ב־' + when + '</p>'
    + '<table dir="rtl" style="border-collapse:collapse;width:100%;max-width:640px">' + rows + '</table>'
    + (sheetUrl ? '<p style="margin-top:16px"><a href="' + sheetUrl + '" style="background:#3E9994;color:#fff;padding:9px 16px;border-radius:6px;text-decoration:none">לגיליון התשובות</a></p>' : '')
    + '</div>';
  MailApp.sendEmail({to: ALERT_EMAIL, subject: 'טופס חדש מהאתר - ' + title, htmlBody: html, name: 'אתר יקיר לי'});
}

function esc(s) { return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
