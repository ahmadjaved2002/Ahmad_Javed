import { gsap, EASE } from './gsapSetup';

/** Entrance for one project showcase: clip reveal → title → metadata. */
export function animateProject(card) {
  const q = (selector) => card.querySelectorAll(selector);

  const tl = gsap.timeline({
    scrollTrigger: { trigger: card, start: 'top 72%', once: true },
  });

  tl.fromTo(
    q('[data-preview]'),
    { clipPath: 'inset(100% 0% 0% 0%)' },
    { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.3, ease: EASE.inOut },
  )
    .from(q('[data-preview-inner]'), { scale: 1.25, duration: 1.7, ease: EASE.expo }, 0)
    .from(q('[data-title] .line-inner'), { yPercent: 110, duration: 1, stagger: 0.1, ease: EASE.expo }, 0.3)
    .from(q('[data-meta]'), { opacity: 0, y: 16, duration: 0.7, stagger: 0.07, ease: EASE.out }, 0.75);

  return tl;
}

/** Large outlined project numeral drifts slowly against scroll (desktop only). */
export function parallaxNumeral(card) {
  const num = card.querySelector('[data-bignum]');
  if (!num) return;
  gsap.fromTo(
    num,
    { yPercent: -12 },
    {
      yPercent: 12,
      ease: 'none',
      scrollTrigger: { trigger: card, start: 'top bottom', end: 'bottom top', scrub: true },
    },
  );
}
