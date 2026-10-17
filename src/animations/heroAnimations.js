import { gsap, EASE } from './gsapSetup';

/**
 * Hero intro. Call inside a useGSAP / matchMedia callback so selectors are scoped
 * and everything is reverted automatically.
 * Order of attention: label → name → orb → statement → copy + CTAs → scroll cue.
 */
export function heroIntro() {
  const tl = gsap.timeline({ defaults: { ease: EASE.expo } });
  tl.from('[data-hero-meta]', { opacity: 0, y: -14, duration: 0.8 }, 0.1)
    .from('[data-hero-name] .line-inner', { yPercent: 115, duration: 1.3, stagger: 0.12 }, 0.15)
    .from('[data-hero-orb]', { scale: 0.86, opacity: 0, duration: 1.6, ease: EASE.out }, 0.3)
    .from('[data-hero-statement] .line-inner', { yPercent: 110, duration: 1, stagger: 0.08 }, 0.75)
    .from('[data-hero-copy]', { opacity: 0, y: 20, duration: 0.9, stagger: 0.1, ease: EASE.out }, 1.0)
    .from('[data-hero-scroll]', { opacity: 0, duration: 0.8, ease: EASE.out }, 1.4);
  return tl;
}

/** Scroll-linked exit so the hero hands over to the next chapter. */
export function heroScrollExit(root) {
  gsap.to('[data-hero-name]', {
    yPercent: -10,
    ease: 'none',
    scrollTrigger: { trigger: root, start: 'top top', end: 'bottom top', scrub: true },
  });
  gsap.to('[data-hero-orb]', {
    rotate: 40,
    yPercent: 10,
    ease: 'none',
    scrollTrigger: { trigger: root, start: 'top top', end: 'bottom top', scrub: true },
  });
}

/** Pointer-reactive accent. Returns a cleanup function. */
export function heroPointer(root) {
  const dot = root.querySelector('[data-orb-dot]');
  const orb = root.querySelector('[data-orb-parallax]');
  const glow = root.querySelector('[data-hero-glow]');
  if (!dot || !orb || !glow) return undefined;

  const dotX = gsap.quickTo(dot, 'x', { duration: 0.8, ease: 'power3' });
  const dotY = gsap.quickTo(dot, 'y', { duration: 0.8, ease: 'power3' });
  const orbX = gsap.quickTo(orb, 'x', { duration: 1.2, ease: 'power3' });
  const orbY = gsap.quickTo(orb, 'y', { duration: 1.2, ease: 'power3' });
  const glowX = gsap.quickTo(glow, 'x', { duration: 1.6, ease: 'power3' });
  const glowY = gsap.quickTo(glow, 'y', { duration: 1.6, ease: 'power3' });

  const onMove = (e) => {
    const nx = e.clientX / window.innerWidth - 0.5;
    const ny = e.clientY / window.innerHeight - 0.5;
    dotX(nx * 60);
    dotY(ny * 60);
    orbX(nx * -24);
    orbY(ny * -24);
    glowX(nx * 120);
    glowY(ny * 120);
  };
  window.addEventListener('pointermove', onMove, { passive: true });
  return () => window.removeEventListener('pointermove', onMove);
}
