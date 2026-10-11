'use strict';

/* ---------- 1. Dark mode (design token солих) ---------- */
const root = document.documentElement;
const themeBtn = document.getElementById('themeToggle');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

function currentTheme() {
  return root.dataset.theme || (prefersDark.matches ? 'dark' : 'light');
}

function applyTheme(theme, save) {
  root.dataset.theme = theme;
  themeBtn.setAttribute('aria-pressed', String(theme === 'dark'));
  if (save) { try { localStorage.setItem('theme', theme); } catch (e) {} }
}

applyTheme(currentTheme(), false);
themeBtn.addEventListener('click', () => applyTheme(currentTheme() === 'dark' ? 'light' : 'dark', true));

/* ---------- 2. Flip card ---------- */
document.querySelectorAll('.flip').forEach(card => {
  const front = card.querySelector('.front');
  const back = card.querySelector('.back');

  function setFlipped(flipped) {
    card.classList.toggle('is-flipped', flipped);
    /* Харагдахгүй талыг товчны фокусаас болон дэлгэц уншигчаас хасна */
    front.inert = flipped;
    back.inert = !flipped;
    (flipped ? back : front).querySelector('.flip-btn').focus({ preventScroll: true });
  }

  front.querySelector('.flip-btn').addEventListener('click', () => setFlipped(true));
  back.querySelector('.flip-btn').addEventListener('click', () => setFlipped(false));
  card.addEventListener('keydown', e => {
    if (e.key === 'Escape' && card.classList.contains('is-flipped')) setFlipped(false);
  });
});

/* ---------- 3. Mobile цэс (Лаб 5) ---------- */
const toggle = document.querySelector('.nav-toggle');
const menu = document.getElementById('menu');

function setMenu(open) {
  menu.classList.toggle('open', open);
  toggle.classList.toggle('active', open);
  toggle.setAttribute('aria-expanded', String(open));
  toggle.setAttribute('aria-label', open ? 'Цэс хаах' : 'Цэс нээх');
}
toggle.addEventListener('click', () => setMenu(!menu.classList.contains('open')));
menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setMenu(false)));
document.addEventListener('keydown', e => { if (e.key === 'Escape') setMenu(false); });
window.matchMedia('(min-width: 768px)').addEventListener('change', e => { if (e.matches) setMenu(false); });

/* ---------- 4. Хөдөлгөөний төлөв footer-т харуулах ---------- */
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
const note = document.querySelector('.motion-note');
function showMotion() { note.textContent = reduce.matches ? 'багасгасан (reduced)' : 'хэвийн'; }
showMotion();
reduce.addEventListener('change', showMotion);
