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

  // טופס פנייה והזמנת הרצאה: שליחה ישירה ל-Google Apps Script של העמותה (data-forms בגוף העמוד).
  // אם הכתובת לא הוגדרה עדיין – גיבוי: פתיחת מייל מוכן ל-info@yakirli.org.
  var endpoint = document.body.getAttribute('data-forms') || '';
  document.querySelectorAll('form[data-mailto-form]').forEach(function (form) {
    form.removeAttribute('novalidate');
    var submit = form.querySelector('button[type="submit"]');
    var lang = document.documentElement.lang === 'he' ? 'he' : 'en';
    var kind = form.getAttribute('data-mailto-form');
    var M = {
      he: { names: { contact: 'פנייה כללית', lectures: 'הזמנת הרצאה' }, send: 'שליחה', sending: 'שולח…',
            ok: 'הפנייה נשלחה. תודה, נחזור אליכם בהקדם.',
            bad: 'משהו השתבש והפנייה לא נשלחה. אפשר לנסות שוב, או לפנות בוואטסאפ: 050-533-5148',
            mailBtn: 'שליחה במייל', mailHint: 'ייפתח מייל מוכן – רק ללחוץ "שלח". אפשר גם בוואטסאפ: 050-533-5148', yes: 'כן' },
      en: { names: { contact: 'General inquiry', lectures: 'Lecture booking' }, send: 'Send', sending: 'Sending…',
            ok: 'Your message was sent. Thank you – we will get back to you soon.',
            bad: 'Something went wrong and your message was not sent. Please try again, or WhatsApp us: +972-50-533-5148',
            mailBtn: 'Send by email', mailHint: 'A ready email will open – just press Send. Or WhatsApp us: +972-50-533-5148', yes: 'Yes' }
    }[lang];
    var status = form.querySelector('.sent');
    if (status) status.setAttribute('role', 'status');
    function show(text, bad) { if (!status) return; status.textContent = text; status.classList.toggle('bad', !!bad); status.hidden = false; }
    if (!endpoint) { if (submit) submit.textContent = M.mailBtn; show(M.mailHint); }
    function collect() {
      var out = [];
      form.querySelectorAll('.fields input, .fields select, .fields textarea').forEach(function (el) {
        if (el.type === 'checkbox' && el.required) return; // תיבת האישור – לא נשלחת כשדה
        if ((el.type === 'checkbox' || el.type === 'radio') && !el.checked) return;
        var value = el.type === 'checkbox' ? M.yes : el.value.trim();
        if (!value) return;
        var label = (el.id && form.querySelector('label[for="' + el.id + '"]')) || el.closest('label');
        out.push({ label: label ? label.textContent.replace(/\s+/g, ' ').trim() : (el.name || el.id), value: value });
      });
      return out;
    }
    form.addEventListener('submit', function (ev) {
      ev.preventDefault();
      if (!form.reportValidity()) return;
      var fields = collect();
      if (!endpoint) {
        var title = M.names[kind];
        var body = fields.map(function (f) { return f.label + ': ' + f.value; }).join('\n\n');
        window.location.href = 'mailto:info@yakirli.org?subject=' + encodeURIComponent((lang === 'he' ? 'פנייה מהאתר – ' : 'Website message – ') + title) + '&body=' + encodeURIComponent(body);
        return;
      }
      var hp = form.querySelector('[name="_hp"]');
      form.classList.add('busy'); if (submit) submit.textContent = M.sending;
      fetch(endpoint, { method: 'POST', body: JSON.stringify({ _form: kind, _page: location.pathname, _hp: hp ? hp.value : '', fields: fields }) })
        .then(function (r) { return r.json(); })
        .then(function (res) {
          if (!res || !res.ok) throw new Error('fail');
          form.reset(); show(M.ok);
          if (window.goatcounter && window.goatcounter.count) window.goatcounter.count({ path: 'form-' + kind + '-form', title: 'שליחת טופס', event: true });
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
