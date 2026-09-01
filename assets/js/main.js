const menuButton = document.querySelector('[data-menu-button]');
const navigation = document.querySelector('[data-nav]');
const toTopButton = document.querySelector('[data-to-top]');
const year = document.querySelector('[data-year]');
const header = document.querySelector('[data-header]');

if (year) year.textContent = new Date().getFullYear();

if (menuButton && navigation) {
  const closeMenu = () => {
    navigation.classList.remove('is-open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.querySelector('.sr-only').textContent = '메뉴 열기';
  };

  const scrollToTarget = (target) => {
    const headerHeight = header ? header.offsetHeight : 0;
    const targetTop = target.getBoundingClientRect().top + window.scrollY - headerHeight - 16;
    window.scrollTo({ top: Math.max(targetTop, 0), behavior: 'smooth' });
  };

  menuButton.addEventListener('click', () => {
    const isOpen = navigation.classList.toggle('is-open');
    menuButton.setAttribute('aria-expanded', String(isOpen));
    menuButton.querySelector('.sr-only').textContent = isOpen ? '메뉴 닫기' : '메뉴 열기';
  });

  navigation.addEventListener('click', (event) => {
    const link = event.target.closest('a[href^="#"]');
    if (!link) return;

    const targetId = link.getAttribute('href');
    const target = targetId === '#top' ? document.getElementById('top') : document.querySelector(targetId);
    if (!target) return;

    event.preventDefault();
    closeMenu();
    scrollToTarget(target);

    if (history.pushState) {
      history.pushState(null, '', targetId);
    }
  });
}

if (toTopButton) {
  const updateButton = () => {
    toTopButton.classList.toggle('is-visible', window.scrollY > 700);
  };

  window.addEventListener('scroll', updateButton, { passive: true });
  updateButton();

  toTopButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}
