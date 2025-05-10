const hamburger = document.getElementById('hamburger-btn');
const mobileNav = document.getElementById('mobile-nav');
const closeBtn = document.getElementById('mobile-nav-close');
const mobileNavOverlay = document.getElementById('mobile-nav-overlay');
const body = document.body;

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  mobileNav.classList.toggle('active');
  if (closeBtn) closeBtn.classList.toggle('active');
  if (mobileNav.classList.contains('active')) {
    mobileNavOverlay.style.display = 'block';
    body.classList.add('menu-open');
  } else {
    mobileNavOverlay.style.display = 'none';
    body.classList.remove('menu-open');
  }
});

document.addEventListener('click', (e) => {
  if (!hamburger.contains(e.target) && !mobileNav.contains(e.target) && e.target !== mobileNavOverlay) {
    hamburger.classList.remove('active');
    mobileNav.classList.remove('active');
    if (closeBtn) closeBtn.classList.remove('active');
    mobileNavOverlay.style.display = 'none';
    body.classList.remove('menu-open');
  }
});

if (closeBtn) {
  closeBtn.addEventListener('click', () => {
    hamburger.classList.remove('active');
    mobileNav.classList.remove('active');
    closeBtn.classList.remove('active');
    mobileNavOverlay.style.display = 'none';
    body.classList.remove('menu-open');
  });
}

if (mobileNavOverlay) {
  mobileNavOverlay.addEventListener('click', () => {
    hamburger.classList.remove('active');
    mobileNav.classList.remove('active');
    if (closeBtn) closeBtn.classList.remove('active');
    mobileNavOverlay.style.display = 'none';
    body.classList.remove('menu-open');
  });
}

// HERO IMAGE SLIDER
const heroSlides = document.querySelectorAll('.hero-slide');
const heroPrevBtn = document.querySelector('.hero-prev');
const heroNextBtn = document.querySelector('.hero-next');
const indicators = document.querySelectorAll('.indicator');
let heroCurrent = 0;
let heroInterval = setInterval(nextHeroSlide, 1500);

function updateHeroSlider() {
  heroSlides.forEach((slide, idx) => {
    slide.classList.remove('active');
    indicators[idx].classList.remove('active');
  });
  heroSlides[heroCurrent].classList.add('active');
  indicators[heroCurrent].classList.add('active');
}

function nextHeroSlide() {
  heroCurrent = (heroCurrent + 1) % heroSlides.length;
  updateHeroSlider();
}

function prevHeroSlide() {
  heroCurrent = (heroCurrent - 1 + heroSlides.length) % heroSlides.length;
  updateHeroSlider();
}

// Add click events to indicators
indicators.forEach((indicator, idx) => {
  indicator.addEventListener('click', () => {
    heroCurrent = idx;
    updateHeroSlider();
    resetHeroInterval();
  });
});

if(heroPrevBtn && heroNextBtn) {
  heroPrevBtn.addEventListener('click', () => {
    prevHeroSlide();
    resetHeroInterval();
  });

  heroNextBtn.addEventListener('click', () => {
    nextHeroSlide();
    resetHeroInterval();
  });

  updateHeroSlider();
}

function resetHeroInterval() {
  clearInterval(heroInterval);
  heroInterval = setInterval(nextHeroSlide, 1500);
}

// Pause auto-play on hover
const heroSection = document.querySelector('.hero');
if (heroSection) {
  heroSection.addEventListener('mouseenter', () => clearInterval(heroInterval));
  heroSection.addEventListener('mouseleave', resetHeroInterval);
}