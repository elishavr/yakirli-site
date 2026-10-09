/* יקיר לי – התנהגות: תפריט, תפריטי משנה, טפסים (תצוגה מקדימה), כותרת בגלילה, חשיפה עדינה, ספירת מספרים */
(function () {
  'use strict';
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var head = document.querySelector('.site-head');
  var btn = document.querySelector('.menu-btn');
  var nav = document.getElementById('mainnav');

  /* תפריט נייד */
  if (btn && nav) {
    btn.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      document.body.classList.toggle('nav-open', open);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('open')) {
        nav.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('nav-open');
        btn.focus();
      }
    });
  }

  /* תפריטי משנה: במגע/מקלדת נפתחים בלחיצה על החץ */
  document.querySelectorAll('.has-sub').forEach(function (li) {
    var toggle = li.querySelector('.sub-toggle');
    if (!toggle) return;
    toggle.addEventListener('click', function (e) {
      e.preventDefault();
      var open = li.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      document.querySelectorAll('.has-sub.open').forEach(function (o) {
        if (o !== li) { o.classList.remove('open'); o.querySelector('.sub-toggle').setAttribute('aria-expanded', 'false'); }
      });
    });
  });
  document.addEventListener('click', function (e) {
    if (!e.target.closest('.has-sub')) {
      document.querySelectorAll('.has-sub.open').forEach(function (o) {
        o.classList.remove('open'); o.querySelector('.sub-toggle').setAttribute('aria-expanded', 'false');
      });
    }
  });

  /* כותרת: צל והתכווצות אחרי גלילה */
  var onScroll = function () { if (head) head.classList.toggle('scrolled', window.scrollY > 12); };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* טפסים: גרסת תצוגה – מציגים הודעה בלבד. החיבור האמיתי (ווטסאפ + מייל) ייעשה בוורדפרס. */
  document.querySelectorAll('form').forEach(function (f) {
    f.addEventListener('submit', function (ev) {
      ev.preventDefault();
      var s = f.querySelector('.sent');
      if (s) { s.hidden = false; s.setAttribute('role', 'status'); }
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
