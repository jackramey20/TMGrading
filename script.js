/* ===================================================
   JM GRADING — Main JavaScript
   =================================================== */

(function () {
  'use strict';

  /* ----- Sticky header on scroll ----- */
  const header = document.getElementById('header');
  function updateHeader() {
    if (window.scrollY > 60) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', updateHeader, { passive: true });
  updateHeader();

  /* ----- Mobile nav toggle ----- */
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks  = document.querySelector('.nav-links');

  navToggle.addEventListener('click', function () {
    const isOpen = navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  /* Close mobile nav when a link is clicked */
  navLinks.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      navLinks.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  /* ----- Footer year ----- */
  const yearEl = document.getElementById('year');
  if (yearEl) { yearEl.textContent = new Date().getFullYear(); }

  /* ----- Contact form demo handler ----- */
  const form = document.getElementById('contact-form');
  const formSuccess = document.getElementById('form-success');

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      const name    = form.querySelector('#name').value.trim();
      const phone   = form.querySelector('#phone').value.trim();
      const service = form.querySelector('#service').value;
      const message = form.querySelector('#message').value.trim();

      if (!name || !phone || !service || !message) {
        alert('Please fill in all required fields.');
        return;
      }

      /* Show success message */
      form.querySelector('button[type="submit"]').disabled = true;
      formSuccess.hidden = false;
      formSuccess.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
  }

  /* ----- Scroll-in animation (Intersection Observer) ----- */
  const animatables = document.querySelectorAll(
    '.service-card, .project-card, .testimonial-card, .stat, .contact-item'
  );

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    animatables.forEach(function (el, i) {
      el.style.transitionDelay = (i % 3) * 0.08 + 's';
      el.classList.add('fade-up');
      observer.observe(el);
    });
  }
}());
