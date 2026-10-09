/* יקיר לי – התנהגות בסיסית: תפריט, תפריטי משנה, טפסים (תצוגה מקדימה), צל לכותרת */
(function () {
  'use strict';
  var head = document.querySelector('.site-head');
  var btn = document.querySelector('.menu-btn');
  var nav = document.getElementById('mainnav');

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

  /* צל עדין לכותרת אחרי גלילה */
  var onScroll = function () { head && head.classList.toggle('scrolled', window.scrollY > 8); };
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
})();
