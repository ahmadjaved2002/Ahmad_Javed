import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

// Register once. Importing from this module everywhere guarantees plugins are ready.
gsap.registerPlugin(ScrollTrigger, useGSAP);

export { gsap, ScrollTrigger, useGSAP };

// Shared media queries for gsap.matchMedia()
export const MQ = {
  motion: '(prefers-reduced-motion: no-preference)',
  desktop: '(min-width: 1024px) and (prefers-reduced-motion: no-preference)',
  mobile: '(max-width: 1023px) and (prefers-reduced-motion: no-preference)',
  // Journey is pinned only on wide AND tall screens; short laptops get the readable stacked flow.
  journeyPinned: '(min-width: 1024px) and (min-height: 640px) and (prefers-reduced-motion: no-preference)',
  journeyStacked:
    '(prefers-reduced-motion: no-preference) and (max-width: 1023px), (prefers-reduced-motion: no-preference) and (max-height: 639px)',
  finePointer: '(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)',
};

export const EASE = {
  out: 'power3.out',
  expo: 'expo.out',
  inOut: 'expo.inOut',
};
