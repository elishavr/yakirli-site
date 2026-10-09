/* Navigation and preview forms. No form data is stored or transmitted. */
(function () {
  'use strict';
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
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
    li.addEventListener('pointerenter', function (ev) {
      if (!mobile.matches && ev.pointerType === 'mouse') { closeSubs(); setSub(li, true); }
    });
    li.addEventListener('pointerleave', function () {
      if (!mobile.matches && !li.contains(document.activeElement)) setSub(li, false);
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
      if (status) status.hidden = false;
    });
  });
  if (reduce || !('IntersectionObserver' in window)) return;

  /* חשיפה עדינה בגלילה: רק לאלמנטים שמתחת לקו המסך בזמן הטעינה */
  var targets = document.querySelectorAll('.sec-head, .card, .step, .stat, .cnode, .blist li, .mlist li, .chips li, .split > *, .quote figure, .cta .wrap, .stats-foot, .tbl-wrap, .formsec .form, .circle-copy, .prose');
  var vh = window.innerHeight;
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
  var counters = {};
  targets.forEach(function (el) {
    if (el.closest('.hero') || el.closest('.site-head')) return;
    var r = el.getBoundingClientRect();
    if (r.top < vh * 0.85) return; /* כבר על המסך – בלי אפקט */
    var parent = el.parentElement;
    var key = parent.dataset.rvKey || (parent.dataset.rvKey = String(Math.random()));
    var i = counters[key] = (counters[key] || 0) + 1;
    el.style.setProperty('--i', String(Math.min(i - 1, 7)));
    el.classList.add('rv');
    io.observe(el);
  });

  /* רשת ביטחון: אם ה-observer מתעכב, כל מה שבתוך המסך נחשף בגלילה */
  var pending = true;
  function sweep() {
    if (!pending) return;
    var h = window.innerHeight, left = 0;
    document.querySelectorAll('.rv:not(.in)').forEach(function (el) {
      var r = el.getBoundingClientRect();
      if (r.top < h && r.bottom > 0) { el.classList.add('in'); io.unobserve(el); } else { left++; }
    });
    if (!left) pending = false;
  }
  var ticking = false;
  window.addEventListener('scroll', function () {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () { sweep(); ticking = false; });
  }, { passive: true });
  window.addEventListener('resize', sweep);
  setTimeout(sweep, 1200);

  /* ספירת מספרים בכרטיסי הנתונים */
  function animateNumber(el) {
    var node = el.querySelector('bdi') || el;
    var txt = node.textContent.trim();
    var m = txt.match(/^([^\d]*)(\d[\d,]*)([^\d]*)$/);
    if (!m) return;
    var target = parseInt(m[2].replace(/,/g, ''), 10);
    if (!target || target < 10 || (target >= 1900 && target <= 2100 && m[2].indexOf(',') < 0)) return;
    var useComma = m[2].indexOf(',') >= 0;
    var dur = 1300, t0 = null;
    function fmt(n) { return useComma ? n.toLocaleString('en-US') : String(n); }
    function step(t) {
      if (!t0) t0 = t;
      var k = Math.min(1, (t - t0) / dur);
      var e = 1 - Math.pow(1 - k, 3);
      node.textContent = m[1] + fmt(Math.round(target * e)) + m[3];
      if (k < 1) requestAnimationFrame(step); else node.textContent = txt;
    }
    node.textContent = m[1] + fmt(0) + m[3];
    requestAnimationFrame(step);
  }
  var nums = document.querySelectorAll('.stat .n');
  if (nums.length) {
    var nio = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { animateNumber(en.target); nio.unobserve(en.target); }
      });
    }, { threshold: 0.4 });
    nums.forEach(function (n) { nio.observe(n); });
  }
})();
