import { gsap, ScrollTrigger, EASE } from './gsapSetup';

/**
 * Education timeline: the line fills as you scroll, and each entry arrives in a fixed order
 * (year marker → title → metadata). The entry in view becomes the accented one.
 */
export function educationMotion(root, setActive) {
  const track = root.querySelector('[data-edu-track]');
  const fill = root.querySelector('[data-edu-fill]');
  if (track && fill) {
    gsap.fromTo(
      fill,
      { scaleY: 0 },
      {
        scaleY: 1,
        transformOrigin: 'top center',
        ease: 'none',
        scrollTrigger: { trigger: track, start: 'top 75%', end: 'bottom 60%', scrub: true },
      },
    );
  }

  root.querySelectorAll('[data-edu-entry]').forEach((entry, i) => {
    gsap
      .timeline({ scrollTrigger: { trigger: entry, start: 'top 78%', once: true } })
      .from(entry.querySelector('[data-year]'), {
        scale: 0.9,
        opacity: 0,
        transformOrigin: 'left center',
        duration: 1.1,
        ease: EASE.expo,
      })
      .from(entry.querySelectorAll('[data-edu-title] .line-inner'), {
        yPercent: 110,
        duration: 1,
        stagger: 0.08,
        ease: EASE.expo,
      }, 0.15)
      .from(entry.querySelectorAll('[data-edu-meta]'), {
        opacity: 0,
        y: 14,
        duration: 0.7,
        stagger: 0.07,
        ease: EASE.out,
      }, 0.5);

    ScrollTrigger.create({
      trigger: entry,
      start: 'top 55%',
      end: 'bottom 55%',
      onToggle: (self) => {
        if (self.isActive) setActive(i);
      },
    });
  });

  // Hand-off to Selected Work: the closing rule draws across.
  const rule = root.querySelector('[data-edu-bridge-line]');
  if (rule) {
    gsap.from(rule, {
      scaleX: 0,
      transformOrigin: 'left center',
      duration: 1.4,
      ease: EASE.inOut,
      scrollTrigger: { trigger: rule, start: 'top 92%', once: true },
    });
  }
}
