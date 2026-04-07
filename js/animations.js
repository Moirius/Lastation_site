/* ============================================================
   LA STATION — ANIMATIONS JS
   GSAP init · Split text · Stagger
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── GSAP check ── */
  if (typeof gsap === 'undefined') return;

  /* Register ScrollTrigger if available */
  if (typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
  }

  /* ── Split text hero ── */
  const splitEls = document.querySelectorAll('[data-split]');
  splitEls.forEach(el => {
    const text   = el.textContent.trim();
    const chars  = text.split('');
    const delay  = parseFloat(el.dataset.delay || 0);
    el.innerHTML = chars.map(c =>
      c === ' '
        ? '<span class="char" style="display:inline-block;width:0.3em"> </span>'
        : `<span class="char">${c}</span>`
    ).join('');

    gsap.fromTo(
      el.querySelectorAll('.char'),
      { y: 80, opacity: 0 },
      {
        y: 0, opacity: 1,
        stagger: 0.035,
        duration: 0.7,
        ease: 'power3.out',
        delay: delay
      }
    );
  });

  /* ── Hero subtitle fade ── */
  const heroSub = document.querySelector('.hero-subtitle[data-anim]');
  if (heroSub) {
    gsap.fromTo(heroSub,
      { y: 24, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out', delay: 0.8 }
    );
  }

  /* ── ScrollTrigger reveals ── */
  if (typeof ScrollTrigger !== 'undefined') {

    /* Section counters / numbers */
    gsap.utils.toArray('.step-num-text').forEach(el => {
      gsap.fromTo(el,
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      );
    });

    /* Equipment cards */
    gsap.utils.toArray('.equipment-card').forEach((card, i) => {
      gsap.fromTo(card,
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1,
          duration: 0.7,
          ease: 'power2.out',
          delay: i * 0.08,
          scrollTrigger: {
            trigger: card,
            start: 'top 88%',
            toggleActions: 'play none none none'
          }
        }
      );
    });
  }

});
