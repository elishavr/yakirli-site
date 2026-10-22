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
      if (status) status.hidden = false;
    });
  });
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
