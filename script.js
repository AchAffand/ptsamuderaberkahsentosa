const hamburger = document.getElementById('hamburger-btn');
const mobileNav = document.getElementById('mobile-nav');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  mobileNav.classList.toggle('active');
});

document.addEventListener('click', (e) => {
  if (!hamburger.contains(e.target) && !mobileNav.contains(e.target)) {
    hamburger.classList.remove('active');
    mobileNav.classList.remove('active');
  }
});

// HERO IMAGE SLIDER (untuk gambar produk di hero section)
const heroSlides = document.querySelectorAll('.hero-slide');
const heroPrevBtn = document.querySelector('.hero-prev');
const heroNextBtn = document.querySelector('.hero-next');
const heroPagination = document.querySelector('.hero-pagination');
let heroCurrent = 0;
let heroInterval = setInterval(nextHeroSlide, 5000);

// Create pagination dots
if (heroPagination) {
  heroPagination.innerHTML = '';
  heroSlides.forEach((_, idx) => {
    const dot = document.createElement('button');
    dot.className = 'hero-dot';
    dot.setAttribute('aria-label', `Slide ${idx + 1}`);
    dot.addEventListener('click', () => {
      heroCurrent = idx;
      updateHeroSlider();
      resetHeroInterval();
    });
    heroPagination.appendChild(dot);
  });
}
const heroDots = document.querySelectorAll('.hero-dot');

function updateHeroSlider() {
  heroSlides.forEach((slide, idx) => {
    slide.classList.remove('active');
    if (heroDots[idx]) heroDots[idx].classList.remove('active');
  });
  heroSlides[heroCurrent].classList.add('active');
  if (heroDots[heroCurrent]) heroDots[heroCurrent].classList.add('active');
}

function nextHeroSlide() {
  heroCurrent = (heroCurrent + 1) % heroSlides.length;
  updateHeroSlider();
}

function prevHeroSlide() {
  heroCurrent = (heroCurrent - 1 + heroSlides.length) % heroSlides.length;
  updateHeroSlider();
}

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
  heroInterval = setInterval(nextHeroSlide, 5000);
}

// Pause auto-play on hover
const heroSection = document.querySelector('.hero');
if (heroSection) {
  heroSection.addEventListener('mouseenter', () => clearInterval(heroInterval));
  heroSection.addEventListener('mouseleave', resetHeroInterval);
}