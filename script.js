/* ════════════════════════════════════════════════════
   GROUP 2 — script.js
════════════════════════════════════════════════════ */

'use strict';

/* ─── Navbar: scroll + mobile toggle ─── */
(function initNavbar() {
  const navbar = document.getElementById('navbar');
  const toggle = document.getElementById('navToggle');
  const links  = document.getElementById('navLinks');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 24);
  }, { passive: true });

  toggle?.addEventListener('click', () => {
    const open = toggle.classList.toggle('open');
    links.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', open);
  });

  // Close mobile nav on link click
  links?.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      toggle.classList.remove('open');
      links.classList.remove('open');
    });
  });
})();

/* ─── Active nav link on scroll ─── */
(function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.classList.toggle(
            'active',
            link.getAttribute('href') === `#${entry.target.id}`
          );
        });
      }
    });
  }, { threshold: 0.35 });

  sections.forEach(sec => observer.observe(sec));
})();

/* ─── Scroll Reveal (Intersection Observer) ─── */
(function initReveal() {
  const els = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  els.forEach(el => observer.observe(el));
})();

/* ─── Animated Counters ─── */
(function initCounters() {
  const counters = document.querySelectorAll('.stat-counter');
  if (!counters.length) return;

  function easeOutCubic(t) { return 1 - Math.pow(1 - t, 3); }

  function animateCounter(el) {
    const target  = parseInt(el.dataset.target, 10);
    const suffix  = el.dataset.suffix || '';
    const duration = 2000;
    const startTime = performance.now();

    function tick(now) {
      const elapsed  = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased    = easeOutCubic(progress);
      const current  = Math.round(eased * target);
      el.textContent = current + suffix;
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => observer.observe(c));
})();

/* ─── Process steps: stagger-in ─── */
(function initProcessSteps() {
  const steps = document.querySelectorAll('.process-step');
  steps.forEach((step, i) => {
    step.style.opacity = '0';
    step.style.transform = 'translateY(24px)';
    step.style.transition = `opacity 0.6s ease ${i * 0.12}s, transform 0.6s ease ${i * 0.12}s`;
  });

  const diagram = document.querySelector('.process-diagram');
  if (!diagram) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        steps.forEach(step => {
          step.style.opacity = '1';
          step.style.transform = 'translateY(0)';
        });
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  observer.observe(diagram);
})();

/* ─── Contact Form ─── */
(function initForm() {
  const form    = document.getElementById('contactForm');
  const success = document.getElementById('formSuccess');
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();

    const btn = form.querySelector('button[type="submit"]');
    btn.disabled = true;
    btn.textContent = 'Sending…';

    // Simulate async send (300ms)
    setTimeout(() => {
      form.style.display = 'none';
      success.style.display = 'flex';
    }, 800);
  });
})();

/* ─── Smooth scroll for all anchor links ─── */
(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const id = anchor.getAttribute('href');
      if (id === '#') return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
})();

/* ─── Subtle parallax on hero orbs ─── */
(function initParallax() {
  const orbs = document.querySelectorAll('.orb');
  if (!orbs.length) return;

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (ticking) return;
    requestAnimationFrame(() => {
      const y = window.scrollY;
      orbs[0]?.style.setProperty('transform', `translate(${y * 0.03}px, ${y * 0.06}px) scale(1)`);
      orbs[1]?.style.setProperty('transform', `translate(${-y * 0.02}px, ${y * 0.04}px) scale(1)`);
      ticking = false;
    });
    ticking = true;
  }, { passive: true });
})();

/* ─── Hero title stagger animation on load ─── */
(function initHeroEntrance() {
  const titleLines = document.querySelectorAll('.hero-title span');
  const heroEls = [
    document.querySelector('.hero-badge'),
    ...titleLines,
    document.querySelector('.hero-tagline'),
    document.querySelector('.hero-description'),
    document.querySelector('.hero-cta'),
    document.querySelector('.hero-mini-stats'),
  ].filter(Boolean);

  heroEls.forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = `opacity 0.7s ease ${0.1 + i * 0.1}s, transform 0.7s ease ${0.1 + i * 0.1}s`;
  });

  // Trigger after a short frame delay
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      heroEls.forEach(el => {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      });
    });
  });
})();

/* ─── Photo frame reveal ─── */
(function initPhotoReveal() {
  const frame = document.querySelector('.photo-frame');
  if (!frame) return;
  frame.style.opacity = '0';
  frame.style.transform = 'translateY(30px) scale(0.97)';
  frame.style.transition = 'opacity 0.9s ease 0.6s, transform 0.9s ease 0.6s';
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      frame.style.opacity = '1';
      frame.style.transform = 'translateY(0) scale(1)';
    });
  });
})();

/* ─── Team card tilt micro-interaction ─── */
(function initCardTilt() {
  const cards = document.querySelectorAll('.team-card');
  const MAX_TILT = 6;

  cards.forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / (rect.width / 2);
      const dy = (e.clientY - cy) / (rect.height / 2);
      card.style.transform = `translateY(-4px) rotateX(${-dy * MAX_TILT}deg) rotateY(${dx * MAX_TILT}deg)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
})();

/* ─── Typing effect in hero tagline ─── */
(function initTyping() {
  const tagline = document.querySelector('.hero-tagline');
  if (!tagline) return;

  const text = tagline.textContent;
  tagline.textContent = '';
  tagline.style.opacity = '1';

  let i = 0;
  const delay = 0.3;

  function type() {
    if (i < text.length) {
      tagline.textContent += text[i];
      i++;
      setTimeout(type, 45);
    }
  }

  setTimeout(type, delay * 1000);
})();

/* ─── Nav link active style — gold ─── */
const style = document.createElement('style');
style.textContent = `.nav-link.active { color: #d4af37 !important; }`;
document.head.appendChild(style);

/* ─── Luxury Gold Particle System ─── */
(function initLuxuryParticles() {
  const canvas = document.getElementById('luxury-particles');
  if (!canvas) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const ctx = canvas.getContext('2d', { alpha: true });
  let raf, w, h;

  function resize() {
    w = canvas.width  = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize, { passive: true });

  // Gold and pale-white metallic dust palette
  const GOLD = [
    [212, 175, 55],   // classic gold
    [245, 197, 66],   // bright gold
    [201, 162, 39],   // deep gold
    [255, 220, 120],  // pale gold
    [255, 255, 255],  // rare white sparkle
  ];

  const isMobile = window.innerWidth < 768;
  const COUNT    = isMobile ? 32 : 62;

  function Particle() { this.reset(true); }

  Particle.prototype.reset = function (init) {
    this.x    = Math.random() * w;
    this.y    = init ? Math.random() * h : (Math.random() > 0.5 ? h + 6 : -6);
    this.r    = Math.random() * 1.35 + 0.18;
    this.vx   = (Math.random() - 0.5) * 0.13;
    this.vy   = (Math.random() - 0.5) * 0.10 - 0.036; // slight upward drift
    this.a    = Math.random() * 0.36 + 0.04;
    this.aMax = Math.min(0.56, this.a + Math.random() * 0.20);
    this.aMin = Math.max(0.03, this.a - Math.random() * 0.10);
    this.aDir = Math.random() > 0.5 ? 1 : -1;
    this.aSpd = Math.random() * 0.0018 + 0.0004;
    // 87% gold tones, 13% white sparkles
    this.c = GOLD[Math.random() < 0.87 ? (Math.random() * 4 | 0) : 4];
  };

  Particle.prototype.update = function () {
    this.x += this.vx;
    this.y += this.vy;
    this.a += this.aSpd * this.aDir;
    if (this.a >= this.aMax) this.aDir = -1;
    if (this.a <= this.aMin) this.aDir =  1;
    // Wrap horizontally, reset on vertical exit
    if (this.x < -8)    this.x = w + 8;
    if (this.x > w + 8) this.x = -8;
    if (this.y < -10 || this.y > h + 10) this.reset(false);
  };

  Particle.prototype.draw = function () {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, 6.2832);
    ctx.fillStyle = 'rgba(' + this.c[0] + ',' + this.c[1] + ',' + this.c[2] + ',' +
                    this.a.toFixed(3) + ')';
    ctx.fill();
  };

  const particles = [];
  for (let i = 0; i < COUNT; i++) particles.push(new Particle());

  function tick() {
    if (document.hidden) { raf = requestAnimationFrame(tick); return; }
    ctx.clearRect(0, 0, w, h);
    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();
    }
    raf = requestAnimationFrame(tick);
  }

  tick();
})();
