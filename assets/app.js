// =====================================================================
// Ottawa Condo News — Mockup interactions
// Hand-off-ready vanilla JS (no framework). All globals are encapsulated
// in a single IIFE; nothing leaks to window.
// =====================================================================

(() => {
  'use strict';

  // -- Constants ---------------------------------------------------------
  const REVEAL_THRESHOLD   = 0.12;
  const REVEAL_ROOT_MARGIN = '0px 0px -40px 0px';
  const REVEAL_STAGGER_MS  = 60;
  const TOAST_TIMEOUT_MS   = 2400;

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ---------------------------------------------------------------------
  // Mobile nav drawer — focus trap, Escape close, body-scroll lock
  // ---------------------------------------------------------------------
  const toggle = document.querySelector('.nav-toggle');
  const nav    = document.getElementById('primary-nav');

  if (toggle && nav) {
    let lastFocusedBeforeOpen = null;

    const focusableSelector = 'a[href], button:not([disabled])';

    const openNav = () => {
      lastFocusedBeforeOpen = document.activeElement;
      nav.classList.add('nav--open');
      toggle.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
      // Move focus to first link
      const first = nav.querySelector(focusableSelector);
      if (first) first.focus();
    };

    const closeNav = () => {
      nav.classList.remove('nav--open');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
      if (lastFocusedBeforeOpen && typeof lastFocusedBeforeOpen.focus === 'function') {
        lastFocusedBeforeOpen.focus();
      }
    };

    toggle.addEventListener('click', () => {
      const isOpen = nav.classList.contains('nav--open');
      isOpen ? closeNav() : openNav();
    });

    // Close on link click (mobile)
    nav.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        if (nav.classList.contains('nav--open')) closeNav();
      });
    });

    // Escape key closes drawer; Tab is constrained to nav while open
    document.addEventListener('keydown', (e) => {
      if (!nav.classList.contains('nav--open')) return;

      if (e.key === 'Escape') {
        e.preventDefault();
        closeNav();
        return;
      }

      if (e.key === 'Tab') {
        const focusables = Array.from(nav.querySelectorAll(focusableSelector));
        if (focusables.length === 0) return;
        const firstEl = focusables[0];
        const lastEl  = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === firstEl) {
          e.preventDefault();
          lastEl.focus();
        } else if (!e.shiftKey && document.activeElement === lastEl) {
          e.preventDefault();
          firstEl.focus();
        }
      }
    });
  }

  // ---------------------------------------------------------------------
  // Header — apply scrolled shadow once scrolled past 8px
  // ---------------------------------------------------------------------
  const header = document.querySelector('.site-header');
  if (header) {
    const onScroll = () => {
      header.classList.toggle('site-header--scrolled', window.scrollY > 8);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // ---------------------------------------------------------------------
  // Scroll reveal — IntersectionObserver, with prefers-reduced-motion
  // respect and JIT will-change application
  // ---------------------------------------------------------------------
  const revealSelector = [
    '.dept-row',
    '.issue-card',
    '.latest-list li',
    '.classified',
    '.services__wall li',
    '.services__card',
    '.coverage__grid li',
    '.cotm__archive',
    '.stay__copy',
    '.stay__form'
  ].join(', ');

  const reveals = document.querySelectorAll(revealSelector);

  if (prefersReduced || !('IntersectionObserver' in window)) {
    // No animation: render fully immediately
    reveals.forEach(el => el.classList.add('reveal--in'));
  } else {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e, i) => {
        if (!e.isIntersecting) return;
        const el = e.target;
        el.style.transitionDelay = (i % 6) * REVEAL_STAGGER_MS + 'ms';
        el.style.willChange = 'opacity, transform';
        el.classList.add('reveal--in');
        el.addEventListener('transitionend', () => {
          el.style.willChange = 'auto';
        }, { once: true });
        io.unobserve(el);
      });
    }, { threshold: REVEAL_THRESHOLD, rootMargin: REVEAL_ROOT_MARGIN });

    reveals.forEach(el => {
      el.classList.add('reveal');
      io.observe(el);
    });
  }

  // ---------------------------------------------------------------------
  // Newsletter form — demo handler (no backend in this mockup)
  // ---------------------------------------------------------------------
  const form = document.getElementById('newsletter-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input   = form.querySelector('input[type="email"]');
      const success = form.querySelector('.stay__success');
      if (!input || !input.checkValidity()) {
        input?.focus();
        return;
      }
      if (success) {
        success.hidden = false;
        success.textContent = `✓ Thanks — ${input.value} is subscribed (demo).`;
      }
      input.value = '';
    });
  }

  // ---------------------------------------------------------------------
  // Toast (used for demo links that don't navigate anywhere)
  // ---------------------------------------------------------------------
  let toastEl = null;
  let toastTimer = null;
  function showToast(message) {
    if (!toastEl) {
      toastEl = document.createElement('div');
      toastEl.className = 'mockup-toast';
      toastEl.setAttribute('role', 'status');
      toastEl.setAttribute('aria-live', 'polite');
      document.body.appendChild(toastEl);
    }
    toastEl.textContent = message;
    toastEl.classList.add('mockup-toast--show');
    if (toastTimer) clearTimeout(toastTimer);
    const currentEl = toastEl; // capture for callback
    toastTimer = setTimeout(() => {
      currentEl.classList.remove('mockup-toast--show');
    }, TOAST_TIMEOUT_MS);
  }

  // ---------------------------------------------------------------------
  // Demo link interception — every "fake" link toasts instead of 404'ing
  // ---------------------------------------------------------------------
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a');
    if (!a) return;
    const href = a.getAttribute('href') || '';
    // Allow real anchors, mailto, tel, external, root, hash
    if (href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) return;
    if (href.startsWith('http://') || href.startsWith('https://')) return;
    if (href === '/' || href === '') return;
    // Treat any path-style link as a demo link
    e.preventDefault();
    const label = a.textContent.trim().replace(/\s+/g, ' ').slice(0, 60);
    showToast(`Mockup link — would navigate to ${href}`);
  });
})();
