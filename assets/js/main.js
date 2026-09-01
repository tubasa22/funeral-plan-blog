const menuButton = document.querySelector('[data-menu-button]');
const navigation = document.querySelector('[data-nav]');
const toTopButton = document.querySelector('[data-to-top]');
const year = document.querySelector('[data-year]');
const header = document.querySelector('[data-header]');
const backgroundMusic = document.querySelector('[data-background-music]');
const musicToggle = document.querySelector('[data-music-toggle]');
const musicFeedback = document.querySelector('[data-music-feedback]');
const emailAction = document.querySelector('[data-email-action]');
const contactFeedback = document.querySelector('[data-contact-feedback]');

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
  const showMusicFeedback = (message) => {
    if (!musicFeedback) return;
    musicFeedback.textContent = message;
    musicFeedback.classList.add('is-visible');
    window.setTimeout(() => musicFeedback.classList.remove('is-visible'), 4200);
  };

  const updateMusicButton = (isPlaying) => {
    musicToggle.classList.toggle('is-playing', isPlaying);
    musicToggle.setAttribute('aria-pressed', String(isPlaying));
    musicToggle.textContent = isPlaying ? '❚❚ 배경음 끄기' : '♪ 배경음 켜기';
  };

  musicToggle.addEventListener('click', async () => {
    if (backgroundMusic.paused) {
      try {
        backgroundMusic.load();
        await backgroundMusic.play();
        updateMusicButton(true);
        showMusicFeedback('배경음이 재생되고 있습니다.');
      } catch (_) {
        updateMusicButton(false);
        showMusicFeedback('음원을 재생하지 못했습니다. GitHub에 assets/audio 폴더가 업로드되었는지 확인해 주세요.');
      }
    } else {
      backgroundMusic.pause();
      updateMusicButton(false);
      showMusicFeedback('배경음을 멈췄습니다.');
    }
  });

  backgroundMusic.addEventListener('ended', () => updateMusicButton(false));
  backgroundMusic.addEventListener('error', () => {
    updateMusicButton(false);
    showMusicFeedback('음원 파일을 찾지 못했습니다. 최신 ZIP의 assets/audio 폴더를 함께 업로드해 주세요.');
  });

  const startBackgroundMusic = async () => {
    try {
      await backgroundMusic.play();
      updateMusicButton(true);
    } catch (_) {
      updateMusicButton(false);
    }
  };

  // Start immediately where the browser permits it. Mobile browsers that
  // block audible autoplay start it on the visitor's first screen touch.
  startBackgroundMusic();
  document.addEventListener('pointerdown', () => {
    if (backgroundMusic.paused) startBackgroundMusic();
  }, { once: true, passive: true });
}

if (emailAction && contactFeedback) {
  emailAction.addEventListener('click', () => {
    const email = 'kincaredesk@gmail.com';
    contactFeedback.textContent = '메일 앱이 열리지 않으면 이메일 주소가 복사됩니다.';

    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(email)
        .then(() => { contactFeedback.textContent = '이메일 주소가 복사되었습니다: ' + email; })
        .catch(() => {});
    }
  });
}
