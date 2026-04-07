/* ============================================================
   LA STATION — MAIN JS
   Navigation · Scroll behavior · Custom cursor
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Custom Cursor ── */
  const cursor = document.querySelector('.cursor');
  if (cursor) {
    document.addEventListener('mousemove', e => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top  = e.clientY + 'px';
    });
    document.addEventListener('mouseleave', () => cursor.classList.add('hidden'));
    document.addEventListener('mouseenter', () => cursor.classList.remove('hidden'));

    const hoverEls = document.querySelectorAll('a, button, .btn, [data-hover]');
    hoverEls.forEach(el => {
      el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
    });
  }

  /* ── Header scroll state ── */
  const header = document.querySelector('.site-header');
  if (header) {
    const onScroll = () => {
      header.classList.toggle('scrolled', window.scrollY > 60);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ── Burger menu ── */
  const burger  = document.querySelector('.burger');
  const navMob  = document.querySelector('.nav-mobile');
  if (burger && navMob) {
    burger.addEventListener('click', () => {
      const open = burger.classList.toggle('open');
      if (open) {
        navMob.classList.add('open');
        document.body.style.overflow = 'hidden';
      } else {
        navMob.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
    navMob.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        burger.classList.remove('open');
        navMob.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  /* ── Scroll reveal ── */
  const reveals = document.querySelectorAll('.reveal');
  if (reveals.length) {
    const revealObs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('revealed');
          revealObs.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    reveals.forEach(el => revealObs.observe(el));
  }

  /* ── Timeline step reveal ── */
  const steps = document.querySelectorAll('.timeline-step');
  if (steps.length) {
    const stepObs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('step-visible');
          stepObs.unobserve(e.target);
        }
      });
    }, { threshold: 0.2 });
    steps.forEach(el => stepObs.observe(el));
  }

  /* ── Timeline spine progressive fill ── */
  const spine = document.querySelector('.timeline-spine-fill');
  if (spine) {
    const track  = document.querySelector('.timeline-track');
    const update = () => {
      if (!track) return;
      const rect    = track.getBoundingClientRect();
      const visible = Math.max(0, Math.min(1, (window.innerHeight - rect.top) / rect.height));
      spine.style.height = (visible * 100) + '%';
    };
    window.addEventListener('scroll', update, { passive: true });
    update();
  }

  /* ── Smooth anchor scroll ── */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* ── Active nav link ── */
  const navLinks = document.querySelectorAll('.nav-links a, .nav-mobile a');
  const currentPath = window.location.pathname.replace(/\/$/, '') || '/';
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (!href) return;
    const linkPath = href.replace(/\/$/, '') || '/';
    if (linkPath === currentPath) {
      link.classList.add('active');
    }
  });

});
