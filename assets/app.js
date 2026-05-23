// =====================================================================
// Ottawa Condo News — Mockup interactions
// =====================================================================

(() => {
  'use strict';

  // ----- Mobile nav toggle ----------------------------------------------
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.nav');

  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('nav--open');
      toggle.setAttribute('aria-expanded', String(isOpen));
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close menu on link click (mobile)
    nav.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        if (nav.classList.contains('nav--open')) {
          nav.classList.remove('nav--open');
          toggle.setAttribute('aria-expanded', 'false');
          document.body.style.overflow = '';
        }
      });
    });
  }

  // ----- Header shadow on scroll ----------------------------------------
  const header = document.querySelector('.site-header');
  if (header) {
    let last = 0;
    const onScroll = () => {
      const y = window.scrollY;
      header.classList.toggle('site-header--scrolled', y > 8);
      last = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // ----- Reveal on scroll (IntersectionObserver) ------------------------
  const reveals = document.querySelectorAll(
    '.hero__copy, .hero__cover, .feature-card, .issue-card, .classified, .logo-tile, .services__card, .stay__copy, .stay__form'
  );

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e, i) => {
        if (e.isIntersecting) {
          e.target.style.transitionDelay = (i % 6) * 60 + 'ms';
          e.target.classList.add('reveal--in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    reveals.forEach(el => {
      el.classList.add('reveal');
      io.observe(el);
    });
  }

  // ----- Demo behaviour: featured-card / category clicks -----------------
  document.querySelectorAll('.feature-card').forEach(card => {
    card.addEventListener('click', (e) => {
      e.preventDefault();
      const title = card.querySelector('h3')?.textContent?.trim() ?? 'Section';
      showToast(`Coming soon: ${title} archive page`);
    });
  });

  document.querySelectorAll('.issue-card .btn, .issue-foot .btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      showToast('Mockup link — final build will open the article.');
    });
  });

  // ----- Toast ----------------------------------------------------------
  let toastTimer;
  function showToast(message) {
    let toast = document.getElementById('mockup-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'mockup-toast';
      toast.className = 'mockup-toast';
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add('mockup-toast--show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('mockup-toast--show'), 2200);
  }
})();
