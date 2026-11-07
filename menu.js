(() => {
  const button = document.querySelector('.menu-toggle');
  const nav = document.getElementById('primary-navigation');
  if (!button || !nav) return;
  const closeMenu = () => {
    document.querySelector('.nav')?.classList.remove('menu-open');
    button.setAttribute('aria-expanded', 'false');
    button.setAttribute('aria-label', 'Open navigation menu');
    button.innerHTML = '<span aria-hidden="true">☰</span> Menu';
  };
  button.addEventListener('click', () => {
    const open = button.getAttribute('aria-expanded') !== 'true';
    document.querySelector('.nav')?.classList.toggle('menu-open', open);
    button.setAttribute('aria-expanded', String(open));
    button.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
    button.innerHTML = open ? '<span aria-hidden="true">×</span> Close' : '<span aria-hidden="true">☰</span> Menu';
  });
  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
  document.addEventListener('click', event => {
    if (!document.querySelector('.nav')?.contains(event.target)) closeMenu();
  });
})();