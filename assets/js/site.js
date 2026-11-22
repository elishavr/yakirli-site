/* Navigation and email draft fallbacks. Google Forms submit off-site. */
(function () {
  'use strict';
  var head = document.querySelector('.site-head');
  var btn = document.querySelector('.menu-btn');
  var nav = document.getElementById('mainnav');
  var mobile = window.matchMedia('(max-width: 1180px)');
  var groups = Array.from(document.querySelectorAll('.has-sub'));
  var background = document.querySelectorAll('main, .site-foot, .wa-float');

  function setSub(li, open) {
    li.classList.toggle('open', open);
    li.querySelector('.sub-toggle').setAttribute('aria-expanded', String(open));
  }
  function closeSubs() { groups.forEach(function (li) { setSub(li, false); }); }
  function setMenu(open, restoreFocus) {
    if (!btn || !nav) return;
    nav.classList.toggle('open', open);
    btn.setAttribute('aria-expanded', String(open));
    document.body.classList.toggle('nav-open', open);
    background.forEach(function (el) { el.inert = open; });
    if (!open) closeSubs();
    if (restoreFocus) btn.focus();
  }
  if (btn && nav) {
    btn.addEventListener('click', function () { setMenu(!nav.classList.contains('open')); });
    nav.addEventListener('click', function (ev) {
      if (ev.target.closest('a[href]:not([aria-disabled="true"])') && mobile.matches) setMenu(false);
    });
    mobile.addEventListener('change', function () { setMenu(false); });
  }
  groups.forEach(function (li) {
    var toggle = li.querySelector('.sub-toggle');
    toggle.addEventListener('click', function () {
      var open = !li.classList.contains('open');
      closeSubs();
      setSub(li, open);
    });
    li.addEventListener('focusout', function () {
      setTimeout(function () { if (!li.contains(document.activeElement)) setSub(li, false); }, 0);
    });
  });
  document.addEventListener('click', function (ev) {
    if (!ev.target.closest('.has-sub')) closeSubs();
    if (ev.target.closest('a[aria-disabled="true"]')) ev.preventDefault();
  });
  document.addEventListener('keydown', function (ev) {
    if (ev.key === 'Escape') {
      var activeSub = groups.find(function (li) { return li.classList.contains('open'); });
      if (activeSub) { ev.preventDefault(); setSub(activeSub, false); activeSub.querySelector('.sub-toggle').focus(); }
      else if (nav && nav.classList.contains('open')) { ev.preventDefault(); setMenu(false, true); }
    }
    if (ev.key === 'Tab' && nav && nav.classList.contains('open')) {
      var focusable = Array.from(head.querySelectorAll('a[href], button')).filter(function (el) { return el.getClientRects().length; });
      var first = focusable[0], last = focusable[focusable.length - 1];
      if (ev.shiftKey && document.activeElement === first) { ev.preventDefault(); last.focus(); }
      else if (!ev.shiftKey && document.activeElement === last) { ev.preventDefault(); first.focus(); }
    }
  });
  var onScroll = function () { if (head) head.classList.toggle('scrolled', window.scrollY > 12); };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // טפסי האתר המעוצבים: כל טופס נשלח מאחורי הקלעים ל-Google Form שלו (data-gform = כתובת formResponse).
  // שדות עם name="entry.NNN"; תאריך (type=date) מפוצל ל-_year/_month/_day; data-pages = pageHistory לטופס רב-עמודי.
  // ההתראה למייל והגיליון – בצד גוגל (Apps Script "יקיר לי – טפסי האתר והתראות").
  var lang = document.documentElement.lang === 'he' ? 'he' : 'en';
  var M = {
    he: { send: 'שליחה', sending: 'שולח…', ok: 'מוקירים תודה, קיבלנו ונחזור אליכם.',
          bad: 'משהו השתבש בשליחה. אפשר לנסות שוב, או לפנות אלינו בוואטסאפ: 050-533-5148',
          waBtn: 'שליחה בוואטסאפ', waTitle: 'פנייה מהאתר – ', yes: 'כן',
          either: 'נא להזין טלפון או כתובת אימייל כדי שנוכל לחזור אליכם.' },
    en: { send: 'Send', sending: 'Sending…', ok: 'Thank you – we received your message and will get back to you.',
          bad: 'Something went wrong. Please try again, or contact us on WhatsApp: +972-50-533-5148',
          waBtn: 'Send on WhatsApp', waTitle: 'Website message – ', yes: 'Yes',
          either: 'Please provide a phone number or an email so we can respond.' }
  }[lang];
  function track(path, title) { if (window.goatcounter && window.goatcounter.count) window.goatcounter.count({ path: path, title: title, event: true }); }
  document.querySelectorAll('form[data-gform]').forEach(function (form) {
    var url = form.getAttribute('data-gform');
    var kind = form.getAttribute('data-kind') || 'form';
    var title = form.getAttribute('data-title') || '';
    var submit = form.querySelector('button[type="submit"]');
    var status = form.querySelector('.sent');
    if (status) status.setAttribute('role', 'status');
    function show(text, bad) { if (!status) return; status.textContent = text; status.classList.toggle('bad', !!bad); status.hidden = false; }
    function labelOf(el) {
      var g = el.closest('fieldset'); if (g && (el.type === 'checkbox' || el.type === 'radio') && g.querySelector('legend')) return g.querySelector('legend').textContent;
      var l = (el.id && form.querySelector('label[for="' + el.id + '"]')) || el.closest('label');
      return l ? l.textContent : (el.name || '');
    }
    function collect() {
      var out = [];
      form.querySelectorAll('.fields input, .fields select, .fields textarea').forEach(function (el) {
        if (!el.name || el.name === '_hp') return;
        if ((el.type === 'checkbox' || el.type === 'radio') && !el.checked) return;
        if (el.hasAttribute('data-today')) { var n = new Date(); el.value = n.getFullYear() + '-' + (n.getMonth() + 1) + '-' + n.getDate(); }
        var v = el.value.trim(); if (!v) return;
        out.push({ name: el.name, type: el.hasAttribute('data-today') ? 'date' : el.type, label: labelOf(el).replace(/\s+/g, ' ').replace(/\*/g, '').trim(), value: v });
      });
      return out;
    }
    // "טלפון או אימייל" – כשהטופס מסומן data-either
    var phone = form.querySelector('.fields input[type="tel"]');
    var email = form.querySelector('.fields input[type="email"]');
    var either = form.hasAttribute('data-either') && phone && email;
    if (phone) phone.addEventListener('input', function () { phone.setCustomValidity(''); });
    if (either) email.addEventListener('input', function () { phone.setCustomValidity(''); });
    // קבוצת תיבות סימון שחובה לסמן בה לפחות אחת
    var groups = Array.prototype.slice.call(form.querySelectorAll('fieldset[data-required]'));
    // בחירה שמחייבת שדה נוסף (למשל אישור המשפחה בטופס ההנצחה): data-req="#id"
    var reqTargets = Array.prototype.slice.call(form.querySelectorAll('input[data-req]')).map(function (i) { return i.getAttribute('data-req'); });
    form.addEventListener('change', function (ev) {
      if (ev.target.type !== 'radio') return;
      reqTargets.forEach(function (sel) { var t = form.querySelector(sel); if (t) t.required = false; });
      var want = ev.target.getAttribute('data-req'); var t2 = want && form.querySelector(want); if (t2) t2.required = true;
    });
    function valid() {
      if (either) { phone.setCustomValidity(''); if (!phone.value.trim() && !email.value.trim()) phone.setCustomValidity(M.either); }
      groups.forEach(function (g) {
        var boxes = g.querySelectorAll('input[type="checkbox"]'); if (!boxes.length) return;
        var any = Array.prototype.some.call(boxes, function (b) { return b.checked; });
        boxes[0].setCustomValidity(any ? '' : (lang === 'he' ? 'נא לסמן לפחות אפשרות אחת.' : 'Please choose at least one option.'));
        Array.prototype.forEach.call(boxes, function (b) { b.addEventListener('change', function () { boxes[0].setCustomValidity(''); }, { once: true }); });
      });
      return form.reportValidity();
    }
    if (submit && form.hasAttribute('data-wa')) {
      var wa = document.createElement('button');
      wa.type = 'button'; wa.className = 'btn btn-s btn-wa'; wa.textContent = M.waBtn;
      submit.insertAdjacentElement('afterend', wa);
      wa.addEventListener('click', function () {
        if (!valid()) return;
        var text = M.waTitle + title + '\n\n' + collect().map(function (f) { return f.label + ': ' + f.value; }).join('\n');
        window.open('https://wa.me/972505335148?text=' + encodeURIComponent(text), '_blank', 'noopener');
        track('form-' + kind + '-whatsapp', 'שליחה בוואטסאפ');
      });
    }
    form.addEventListener('submit', function (ev) {
      ev.preventDefault();
      if (form.classList.contains('busy') || !valid()) return;
      var hp = form.querySelector('[name="_hp"]');
      if (hp && hp.value) { form.reset(); show(M.ok); return; } // ספאם
      var body = new URLSearchParams();
      collect().forEach(function (f) {
        if (f.type === 'date') {
          var d = f.value.split('-');
          body.append(f.name + '_year', d[0]); body.append(f.name + '_month', String(+d[1])); body.append(f.name + '_day', String(+d[2]));
        } else body.append(f.name, f.value);
      });
      var pg = form.querySelector('input[data-pages]:checked');
      var pages = pg ? pg.getAttribute('data-pages') : form.getAttribute('data-pages');
      if (pages) body.append('pageHistory', pages);
      form.classList.add('busy'); if (submit) submit.textContent = M.sending;
      fetch(url, { method: 'POST', mode: 'no-cors', body: body })
        .then(function () {
          form.reset(); form.classList.add('done'); show(M.ok);
          if (status) { status.setAttribute('tabindex', '-1'); status.focus(); }
          track('form-' + kind + '-sent', 'שליחת טופס');
        })
        .catch(function () { show(M.bad, true); })
        .then(function () { form.classList.remove('busy'); if (submit) submit.textContent = M.send; });
    });
  });
})();

/* תפריט נגישות: גודל טקסט, ניגודיות, הדגשת קישורים, גופן, ריווח, עצירת אנימציות. נשמר בדפדפן בלבד. */
(function () {
  var box = document.getElementById('a11y');
  if (!box) return;
  var btn = box.querySelector('.a11y-btn'), panel = box.querySelector('.a11y-panel');
  var root = document.documentElement, KEY = 'yl-a11y', FLAGS = ['contrast', 'links', 'font', 'spacing', 'motion'];
  var st = {};
  try { st = JSON.parse(localStorage.getItem(KEY) || '{}') || {}; } catch (e) { st = {}; }
  function save() { try { localStorage.setItem(KEY, JSON.stringify(st)); } catch (e) {} }
  function apply() {
    [1, 2, 3].forEach(function (n) { root.classList.toggle('a11y-t' + n, st.t === n); });
    FLAGS.forEach(function (k) {
      root.classList.toggle('a11y-' + k, !!st[k]);
      var b = panel.querySelector('[data-a11y="' + k + '"]');
      if (b) b.setAttribute('aria-pressed', String(!!st[k]));
    });
    var v = panel.querySelector('#a11y-size-v');
    if (v) v.textContent = ({ 0: '100%', 1: '115%', 2: '130%', 3: '150%' })[st.t || 0];
  }
  function setOpen(open, focusBtn) {
    panel.hidden = !open;
    btn.setAttribute('aria-expanded', String(open));
    if (open) panel.querySelector('button').focus();
    else if (focusBtn) btn.focus();
  }
  btn.addEventListener('click', function () { setOpen(panel.hidden); });
  box.querySelector('.a11y-x').addEventListener('click', function () { setOpen(false, true); });
  panel.addEventListener('click', function (ev) {
    var b = ev.target.closest('[data-a11y]');
    if (!b) return;
    var k = b.getAttribute('data-a11y');
    if (k === 't+') st.t = Math.min(3, (st.t || 0) + 1);
    else if (k === 't-') st.t = Math.max(0, (st.t || 0) - 1);
    else if (k === 'reset') st = {};
    else st[k] = !st[k];
    if (!st.t) delete st.t;
    save(); apply();
  });
  box.addEventListener('keydown', function (ev) { if (ev.key === 'Escape' && !panel.hidden) { ev.stopPropagation(); setOpen(false, true); } });
  document.addEventListener('click', function (ev) { if (!panel.hidden && !box.contains(ev.target)) setOpen(false); });
  apply();
})();

/* חיצים במפת המיזמים (עמוד הבית): מהעיגול המרכזי אל כל כרטיס */
(function () {
  var box = document.querySelector('.proj');
  if (!box) return;
  var svg = box.querySelector('.parrows'), hub = box.querySelector('.phub');
  var NS = 'http://www.w3.org/2000/svg';
  function draw() {
    svg.innerHTML = '';
    if (getComputedStyle(svg).display === 'none') return;
    var b = box.getBoundingClientRect(), h = hub.getBoundingClientRect();
    var cx = h.left + h.width / 2 - b.left, cy = h.top + h.height / 2 - b.top, r = h.width / 2 + 16;
    box.querySelectorAll('.pcard').forEach(function (c) {
      var k = c.getBoundingClientRect();
      var L = k.left - b.left, R = k.right - b.left, T = k.top - b.top, B = k.bottom - b.top;
      var tx = Math.max(L, Math.min(cx, R)), ty = Math.max(T, Math.min(cy, B));
      if (tx === cx && ty === cy) return;
      var dx = tx - cx, dy = ty - cy, d = Math.sqrt(dx * dx + dy * dy), ux = dx / d, uy = dy / d;
      var x1 = cx + ux * r, y1 = cy + uy * r, x2 = tx - ux * 10, y2 = ty - uy * 10;
      if (d - r < 30) return;
      var ln = document.createElementNS(NS, 'line');
      ln.setAttribute('x1', x1); ln.setAttribute('y1', y1);
      ln.setAttribute('x2', x2 - ux * 8); ln.setAttribute('y2', y2 - uy * 8);
      svg.appendChild(ln);
      var px = -uy, py = ux, s = 9;
      var hd = document.createElementNS(NS, 'path');
      hd.setAttribute('d', 'M' + x2 + ' ' + y2 + 'L' + (x2 - ux * 16 + px * s) + ' ' + (y2 - uy * 16 + py * s) + 'L' + (x2 - ux * 16 - px * s) + ' ' + (y2 - uy * 16 - py * s) + 'Z');
      svg.appendChild(hd);
    });
  }
  draw();
  window.addEventListener('resize', draw);
  window.addEventListener('load', draw);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(draw);
})();

/* Click-to-load YouTube player (privacy-friendly: nothing loads before the click) */
(function () {
  document.addEventListener('click', function (e) {
    var btn = e.target.closest ? e.target.closest('.vid-play') : null;
    if (!btn) return;
    var box = btn.closest('.vid');
    if (!box || !(box.getAttribute('data-yt') || box.getAttribute('data-drive'))) return;
    var f = document.createElement('iframe');
    f.src = box.getAttribute('data-drive')
      ? 'https://drive.google.com/file/d/' + encodeURIComponent(box.getAttribute('data-drive')) + '/preview'
      : 'https://www.youtube-nocookie.com/embed/' + encodeURIComponent(box.getAttribute('data-yt')) + '?autoplay=1&rel=0';
    f.title = box.getAttribute('data-title') || 'YouTube video';
    f.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
    f.setAttribute('allowfullscreen', '');
    f.setAttribute('referrerpolicy', 'strict-origin-when-cross-origin');
    var frame = btn.parentNode;
    frame.replaceChild(f, btn);
    f.focus();
  });
  /* Lecture booking buttons preselect the matching lecture in the shared form. */
  document.querySelectorAll('a[data-lecture]').forEach(function (a) {
    a.addEventListener('click', function () {
      var form = document.querySelector('form[data-kind="lectures"]');
      var sel = form && form.querySelector('select');
      var i = Number(a.getAttribute('data-lecture'));
      if (sel && sel.options[i]) sel.selectedIndex = i;
    });
  });
})();

/* פס הודעה "האתר התחדש": מוצג עד 15.12.2026, וניתן לסגירה */
(function () {
  var bar = document.getElementById('notice-bar');
  if (!bar) return;
  var show = Date.now() < Date.UTC(2026, 11, 15);
  try { if (localStorage.getItem('yl-notice-closed') === '1') show = false; } catch (e) {}
  if (show) bar.hidden = false;
  var x = bar.querySelector('.notice-x');
  if (x) x.addEventListener('click', function () {
    bar.hidden = true;
    try { localStorage.setItem('yl-notice-closed', '1'); } catch (e) {}
  });
})();
