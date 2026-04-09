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

  // --- Contact form (handled by Formsubmit.co) ---
});
