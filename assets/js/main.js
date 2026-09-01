const menuButton = document.querySelector('[data-menu-button]');
const navigation = document.querySelector('[data-nav]');
const toTopButton = document.querySelector('[data-to-top]');
const year = document.querySelector('[data-year]');
const header = document.querySelector('[data-header]');
const backgroundMusic = document.querySelector('[data-background-music]');
const musicToggle = document.querySelector('[data-music-toggle]');

if (year) year.textContent = new Date().getFullYear();

const openedAtContactHash = window.location.hash === '#contact';

if (openedAtContactHash) {
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
  window.scrollTo(0, 0);
  window.history.replaceState(null, '', window.location.pathname + window.location.search);
  window.addEventListener('load', () => window.scrollTo(0, 0), { once: true });
}

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

if (backgroundMusic && musicToggle) {
  const updateMusicButton = (isPlaying) => {
    musicToggle.classList.toggle('is-playing', isPlaying);
    musicToggle.setAttribute('aria-pressed', String(isPlaying));
    musicToggle.textContent = isPlaying ? '❚❚ 배경음 끄기' : '♪ 배경음 켜기';
  };

  musicToggle.addEventListener('click', async () => {
    if (backgroundMusic.paused) {
      try {
        await backgroundMusic.play();
        updateMusicButton(true);
      } catch (_) {
        updateMusicButton(false);
      }
    } else {
      backgroundMusic.pause();
      updateMusicButton(false);
    }
  });

  backgroundMusic.addEventListener('ended', () => updateMusicButton(false));
}
