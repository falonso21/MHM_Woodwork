/* ========================================
   MHM Woodwork — Main JS
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
  const header = document.getElementById('header');
  const burger = document.getElementById('burger');
  const nav = document.getElementById('nav');
  const heroSection = document.getElementById('hero');

  // --- Header scroll behavior ---
  function updateHeader() {
    const scrollY = window.scrollY;
    const heroBottom = heroSection.offsetHeight - 80;

    header.classList.toggle('header--scrolled', scrollY > 60);
    header.classList.toggle('header--hero', scrollY < heroBottom);
  }

  window.addEventListener('scroll', updateHeader, { passive: true });
  updateHeader();

  // --- Mobile menu ---
  burger.addEventListener('click', () => {
    burger.classList.toggle('active');
    nav.classList.toggle('open');
    document.body.style.overflow = nav.classList.contains('open') ? 'hidden' : '';
  });

  nav.querySelectorAll('.header__link').forEach(link => {
    link.addEventListener('click', () => {
      burger.classList.remove('active');
      nav.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // --- Scroll reveal animations ---
  const revealElements = document.querySelectorAll(
    '.trabajo-card, .servicio, .nosotros__content, .nosotros__image, .contacto__info, .contacto__form, .section-header'
  );

  revealElements.forEach(el => el.classList.add('reveal'));

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  revealElements.forEach(el => revealObserver.observe(el));

  // --- Carousels ---
  document.querySelectorAll('[data-carousel]').forEach(carousel => {
    const slides = carousel.querySelectorAll('.carousel__slide');
    const dotsContainer = carousel.querySelector('.carousel__dots');
    let current = 0;

    slides.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.classList.add('carousel__dot');
      if (i === 0) dot.classList.add('carousel__dot--active');
      dot.setAttribute('aria-label', `Imagen ${i + 1}`);
      dot.addEventListener('click', () => goTo(i));
      dotsContainer.appendChild(dot);
    });

    const dots = dotsContainer.querySelectorAll('.carousel__dot');

    function goTo(index) {
      slides[current].classList.remove('carousel__slide--active');
      dots[current].classList.remove('carousel__dot--active');
      current = index;
      slides[current].classList.add('carousel__slide--active');
      dots[current].classList.add('carousel__dot--active');
    }

    setInterval(() => {
      goTo((current + 1) % slides.length);
    }, 5000);
  });

  // --- Lightbox ---
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxClose = lightbox.querySelector('.lightbox__close');

  document.querySelectorAll('.trabajo-card').forEach(card => {
    card.addEventListener('click', () => {
      const img = card.querySelector('img');
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  lightboxClose.addEventListener('click', () => {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  });

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    }
  });

  // --- Contact form (handled by Formsubmit.co) ---
});
