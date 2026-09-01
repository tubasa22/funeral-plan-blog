const menuButton = document.querySelector('[data-menu-button]');
const navigation = document.querySelector('[data-nav]');
const toTopButton = document.querySelector('[data-to-top]');
const year = document.querySelector('[data-year]');

if (year) year.textContent = new Date().getFullYear();

if (menuButton && navigation) {
  menuButton.addEventListener('click', () => {
    const isOpen = navigation.classList.toggle('is-open');
    menuButton.setAttribute('aria-expanded', String(isOpen));
    menuButton.querySelector('.sr-only').textContent = isOpen ? '메뉴 닫기' : '메뉴 열기';
  });

  navigation.addEventListener('click', (event) => {
    if (!event.target.matches('a')) return;
    navigation.classList.remove('is-open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.querySelector('.sr-only').textContent = '메뉴 열기';
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
