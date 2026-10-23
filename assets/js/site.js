/* Navigation and preview forms. No form data is stored or transmitted. */
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

  document.querySelectorAll('form').forEach(function (form) {
    var status = form.querySelector('.sent');
    if (status) status.setAttribute('role', 'status');
    form.addEventListener('submit', function (ev) {
      ev.preventDefault();
      // תיבת האישור (מדיניות פרטיות / דיוור) חייבת להיות מסומנת לפני שליחה
      var consent = form.querySelector('input[type="checkbox"][required]');
      var err = form.querySelector('.form-err');
      if (consent && !consent.checked) {
        if (!err) {
          err = document.createElement('p');
          err.className = 'form-err'; err.setAttribute('role', 'alert');
          err.id = (consent.id || 'f') + '-err';
          err.textContent = document.body.getAttribute('data-req') || '';
          consent.closest('label').after(err);
          consent.setAttribute('aria-describedby', err.id);
        }
        consent.setAttribute('aria-invalid', 'true');
        consent.focus();
        if (status) status.hidden = true;
        return;
      }
      if (consent) consent.removeAttribute('aria-invalid');
      if (err) err.remove();
      if (status) status.hidden = false;
      if (window.goatcounter && window.goatcounter.count) {
        window.goatcounter.count({ path: 'form-' + (form.closest('[id]') ? form.closest('[id]').id : 'form'), title: 'שליחת טופס', event: true });
      }
    });
  });

  // קישורים שנפתחים בחלון חדש – הודעה לקוראי מסך
  var nw = document.body.getAttribute('data-nw');
  if (nw) document.querySelectorAll('a[target="_blank"]').forEach(function (a) {
    if (a.querySelector('.sr-only')) return;
    var s = document.createElement('span'); s.className = 'sr-only'; s.textContent = ' ' + nw;
    a.appendChild(s);
    if (a.hasAttribute('aria-label')) a.setAttribute('aria-label', a.getAttribute('aria-label') + ' ' + nw);
  });

  // מדידת פעולות חשובות (ללא מידע אישי): וואטסאפ, טלפון, מייל, תרומה, הורדת קבצים
  document.addEventListener('click', function (ev) {
    var a = ev.target.closest('a[href]');
    if (!a || !window.goatcounter || !window.goatcounter.count) return;
    var h = a.getAttribute('href'), kind = null;
    if (/wa\.me|whatsapp/.test(h)) kind = 'whatsapp';
    else if (/^tel:/.test(h)) kind = 'phone';
    else if (/^mailto:/.test(h)) kind = 'email';
    else if (/jgive\.com/.test(h)) kind = 'donate';
    else if (/\.pdf($|\?)/.test(h)) kind = 'download';
    else if (/zoom\.us/.test(h)) kind = 'zoom';
    else if (/docs\.google\.com\/forms|forms\.gle/.test(h)) kind = 'google-form';
    else if (/memoriz/.test(h)) kind = 'memorial-wall';
    if (kind) window.goatcounter.count({ path: 'click-' + kind, title: location.pathname, event: true });
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
