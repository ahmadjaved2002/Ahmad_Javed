import { gsap, EASE } from './gsapSetup';

/**
 * Desktop: pinned chapter sequence driven by one scrubbed timeline.
 * Each chapter takes 1 unit of timeline time; the next chapter's entrance
 * overlaps the previous exit so the word "hands over" instead of cutting.
 */
export function pinnedJourney(root, setActive) {
  const chapters = gsap.utils.toArray(root.querySelectorAll('[data-chapter]'));
  const n = chapters.length;
  if (!n) return;
  const HANDOVER = 0.5; // extra timeline time where the chapters dim before the pin releases
  const total = n + HANDOVER;

  gsap.set(chapters.slice(1), { autoAlpha: 0 });

  const tl = gsap.timeline({
    defaults: { ease: 'none' },
    scrollTrigger: {
      trigger: root,
      start: 'top top',
      end: () => `+=${Math.round(window.innerHeight * total * 0.75)}`,
      pin: true,
      scrub: 0.5,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        setActive(Math.min(n - 1, Math.floor(self.progress * total + 0.3)));
      },
    },
  });

  chapters.forEach((chapter, i) => {
    const word = chapter.querySelector('[data-word] .line-inner');
    const details = chapter.querySelectorAll('[data-detail]');

    if (i > 0) {
      tl.to(chapter, { autoAlpha: 1, duration: 0.01 }, i - 0.3);
      tl.fromTo(word, { yPercent: 110 }, { yPercent: 0, duration: 0.35, ease: 'power2.out' }, i - 0.3);
      tl.fromTo(
        details,
        { autoAlpha: 0, y: 30 },
        { autoAlpha: 1, y: 0, duration: 0.3, stagger: 0.05, ease: 'power2.out' },
        i - 0.2,
      );
    }
    if (i < n - 1) {
      tl.to(word, { yPercent: -110, duration: 0.3, ease: 'power2.in' }, i + 0.7);
      tl.to(details, { autoAlpha: 0, y: -20, duration: 0.2, stagger: 0.03, ease: 'power2.in' }, i + 0.7);
      tl.to(chapter, { autoAlpha: 0, duration: 0.01 }, i + 1);
    }
  });

  // Connecting line develops across the whole sequence.
  tl.fromTo('[data-progress-fill]', { scaleX: 0 }, { scaleX: 1, duration: n }, 0);
  // Handover: the finished chapters recede so the next section arrives into calm space.
  tl.to('[data-journey-body]', { opacity: 0.1, y: -48, duration: HANDOVER, ease: 'power2.in' }, n);
}

/** Mobile / tablet: readable stacked chapters with light reveals, no pinning. */
export function stackedJourney(root) {
  root.querySelectorAll('[data-chapter]').forEach((chapter) => {
    const tl = gsap.timeline({
      scrollTrigger: { trigger: chapter, start: 'top 82%', once: true },
    });
    tl.from(chapter.querySelector('[data-word] .line-inner'), {
      yPercent: 110,
      duration: 1,
      ease: EASE.expo,
    }).from(
      chapter.querySelectorAll('[data-detail]'),
      { opacity: 0, y: 20, duration: 0.7, stagger: 0.08, ease: EASE.out },
      0.2,
    );
  });
}
