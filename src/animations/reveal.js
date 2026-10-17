import { gsap, useGSAP, MQ, EASE } from './gsapSetup';

/**
 * Generic scroll reveals for a section.
 *  - [data-lines]  → masked line reveal (children `.line-inner`)
 *  - [data-fade]   → small fade/slide, optional data-delay (seconds)
 * Nothing is hidden by CSS: with reduced motion, all content simply stays visible.
 */
export function useScrollReveals(scope) {
  useGSAP(
    () => {
      const root = scope.current;
      if (!root) return undefined;
      const mm = gsap.matchMedia();

      mm.add(MQ.motion, () => {
        root.querySelectorAll('[data-lines]').forEach((el) => {
          gsap.from(el.querySelectorAll('.line-inner'), {
            yPercent: 110,
            duration: 1.1,
            ease: EASE.expo,
            stagger: 0.09,
            scrollTrigger: { trigger: el, start: 'top 88%', once: true },
          });
        });

        root.querySelectorAll('[data-rule]').forEach((el) => {
          gsap.from(el, {
            scaleX: 0,
            transformOrigin: 'left center',
            duration: 1.3,
            ease: EASE.inOut,
            scrollTrigger: { trigger: el, start: 'top 92%', once: true },
          });
        });

        root.querySelectorAll('[data-fade]').forEach((el) => {
          gsap.from(el, {
            y: 28,
            opacity: 0,
            duration: 0.9,
            ease: EASE.out,
            delay: Number(el.dataset.delay || 0),
            scrollTrigger: { trigger: el, start: 'top 90%', once: true },
          });
        });
      });

      return () => mm.revert();
    },
    { scope },
  );
}
