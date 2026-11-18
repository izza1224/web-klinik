/* ===================================================
   script.js — Klinik Sehat Mandiri
   =================================================== */

(function () {
  'use strict';

  /* ---- Navbar: scroll & active link ---- */
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  function onScroll() {
    // Scroll shadow
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Active link highlight
    let current = '';
    sections.forEach(sec => {
      const top = sec.offsetTop - 100;
      if (window.scrollY >= top) current = sec.getAttribute('id');
    });
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---- Mobile Hamburger ---- */
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('navMenu');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navMenu.classList.toggle('open');
  });

  // Close menu on link click
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navMenu.classList.remove('open');
    });
  });

  /* ---- Smooth scroll for anchor links ---- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 80; // navbar height
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* ---- Intersection Observer: fade-up ---- */
  const fadeEls = document.querySelectorAll('.fade-up');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Keep observing so stagger works; unobserve after visible
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  fadeEls.forEach(el => observer.observe(el));

  /* ---- Service cards: individual observer for stagger ---- */
  const serviceCards = document.querySelectorAll('.service-card');
  const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        cardObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });

  serviceCards.forEach(card => {
    card.classList.add('fade-up');
    cardObserver.observe(card);
  });

  /* ---- Lightbox ---- */
  window.openLightbox = function (el) {
    const img = el.querySelector('img');
    const src = img.getAttribute('data-full') || img.getAttribute('src');
    const lb = document.getElementById('lightbox');
    const lbImg = document.getElementById('lightboxImg');
    lbImg.src = src;
    lbImg.alt = img.alt;
    lb.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  window.closeLightbox = function () {
    const lb = document.getElementById('lightbox');
    lb.classList.remove('open');
    document.body.style.overflow = '';
    // Clear src after transition
    setTimeout(() => { document.getElementById('lightboxImg').src = ''; }, 300);
  };

  // Close lightbox on Escape key
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') window.closeLightbox();
  });

  /* ---- Floating WA button: show after scroll ---- */
  const waFloat = document.querySelector('.wa-float');
  function toggleWaFloat() {
    if (window.scrollY > 300) {
      waFloat.style.opacity = '1';
      waFloat.style.transform = '';
    } else {
      waFloat.style.opacity = '0';
      waFloat.style.transform = 'translateY(20px)';
    }
  }
  waFloat.style.transition = 'opacity .4s, transform .4s, background .2s, box-shadow .3s';
  waFloat.style.opacity = '0';
  waFloat.style.transform = 'translateY(20px)';
  window.addEventListener('scroll', toggleWaFloat, { passive: true });
  setTimeout(toggleWaFloat, 500);

  /* ---- Testi & Gallery cards: simple fade-up ---- */
  const extraFadeEls = document.querySelectorAll('.testi-card, .gallery-item, .cert-card, .info-card');
  const extraObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, i * 60);
        extraObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -20px 0px' });

  extraFadeEls.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity .55s ease, transform .55s ease';
    extraObserver.observe(el);
  });

  /* ---- Hero fade-up on load ---- */
  const heroContent = document.querySelector('.hero-content');
  const infoBar = document.querySelector('.info-bar');
  if (heroContent) {
    heroContent.style.opacity = '0';
    heroContent.style.transform = 'translateY(32px)';
    heroContent.style.transition = 'opacity .8s .2s ease, transform .8s .2s ease';
    setTimeout(() => {
      heroContent.style.opacity = '1';
      heroContent.style.transform = 'translateY(0)';
    }, 100);
  }
  if (infoBar) {
    infoBar.style.opacity = '0';
    infoBar.style.transform = 'translateY(24px)';
    infoBar.style.transition = 'opacity .8s .5s ease, transform .8s .5s ease';
    setTimeout(() => {
      infoBar.style.opacity = '1';
      infoBar.style.transform = 'translateY(0)';
    }, 100);
  }

})();
