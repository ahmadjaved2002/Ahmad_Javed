import { gsap, ScrollTrigger, EASE } from './gsapSetup';

/** Motion shared by desktop and mobile: optional portrait reveal + the bridge line into Education. */
export function aboutShared(root) {
  // Portrait is optional (profile.portrait); one copy per breakpoint layout.
  root.querySelectorAll('[data-portrait]').forEach((portrait) => {
    gsap.from(portrait, {
      clipPath: 'inset(100% 0% 0% 0%)',
      duration: 1.3,
      ease: EASE.inOut,
      scrollTrigger: { trigger: portrait, start: 'top 82%', once: true },
    });
  });
  // The vertical line at the foot of About continues as the Education timeline.
  const bridge = root.querySelector('[data-about-bridge]');
  if (bridge) {
    gsap.fromTo(
      bridge,
      { scaleY: 0 },
      {
        scaleY: 1,
        transformOrigin: 'top center',
        ease: 'none',
        scrollTrigger: { trigger: bridge, start: 'top 95%', end: 'bottom 70%', scrub: true },
      },
    );
  }
}

/** Desktop: the active theme drives the headline fill and the abstract figure. No pinning needed. */
export function aboutDesktop(root, setActive) {
  root.querySelectorAll('[data-theme]').forEach((el, i) => {
    ScrollTrigger.create({
      trigger: el,
      start: 'top 62%',
      end: 'bottom 62%',
      onToggle: (self) => {
        if (self.isActive) setActive(i);
      },
    });
  });
  // Decorative numeral drifts slowly against the scroll (the only parallax here).
  const numeral = root.querySelector('[data-about-numeral]');
  if (numeral) {
    gsap.fromTo(
      numeral,
      { yPercent: -8 },
      {
        yPercent: 22,
        ease: 'none',
        scrollTrigger: { trigger: root, start: 'top bottom', end: 'bottom top', scrub: true },
      },
    );
  }
}

/** Mobile: lightweight stacked reveals. */
export function aboutMobile(root) {
  root.querySelectorAll('[data-theme]').forEach((el) => {
    gsap.from(el, {
      y: 24,
      opacity: 0,
      duration: 0.8,
      ease: EASE.out,
      scrollTrigger: { trigger: el, start: 'top 88%', once: true },
    });
  });
}
