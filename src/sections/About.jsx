import { useRef, useState } from 'react';
import { gsap, useGSAP, MQ } from '../animations/gsapSetup';
import { aboutDesktop, aboutMobile, aboutShared } from '../animations/aboutAnimations';
import { useScrollReveals } from '../animations/reveal';
import { about } from '../data/about';
import { profile } from '../data/profile';
import AboutVisual from '../components/AboutVisual';
import AnimatedLines from '../components/AnimatedLines';
import SectionLabel from '../components/SectionLabel';

/* Composition: the oversized headline runs across the grid and overlaps the sticky figure.
   Four themes scroll on the left; the active one fills in and re-composes the figure.
   Below lg (or with reduced motion) everything is simply stacked, filled and readable. */
export default function About() {
  const root = useRef(null);
  const [active, setActive] = useState(0);
  useScrollReveals(root);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => aboutShared(root.current));
      mm.add(MQ.desktop, () => aboutDesktop(root.current, setActive));
      mm.add(MQ.mobile, () => aboutMobile(root.current));
      return () => mm.revert();
    },
    { scope: root },
  );

  const theme = about.themes[active];

  return (
    <section id="about" ref={root} aria-labelledby="about-title" className="relative px-gutter pb-40 pt-28 lg:pb-48 lg:pt-40">
      <span
        data-about-numeral
        aria-hidden="true"
        className="display text-outline-dim pointer-events-none absolute -right-[2vw] top-24 hidden select-none text-[clamp(10rem,26vw,28rem)] lg:block"
      >
        02A
      </span>

      <div className="relative z-10">
        <SectionLabel number="02A" label="About" />
        <AnimatedLines
          id="about-title"
          data-lines
          className="display mt-6 text-[clamp(3rem,min(11vw,19vh),11rem)]"
          lines={[about.headlineLines[0], { text: about.headlineLines[1], className: 'text-outline-lime lg:ml-[10vw]' }]}
        />
      </div>

      <div className="mt-12 grid gap-14 lg:mt-16 lg:grid-cols-12 lg:gap-16">
        <div className="relative z-10 lg:col-span-7">
          <p className="mono-label text-lime">{about.noteLabel}</p>
          <p className="mt-4 max-w-[38rem] font-display text-[clamp(1.35rem,2.4vw,2.2rem)] font-medium leading-snug tracking-[-0.015em]">
            {about.statement}
          </p>

          <div className="mt-16 lg:mt-24">
            {about.themes.map((item, i) => (
              <article
                key={item.index}
                data-theme
                data-active={i === active}
                className="about-theme border-t border-line py-12 lg:py-24"
              >
                <p className="font-mono text-xs uppercase tracking-[0.18em]">
                  <span className="text-lime">{item.index}</span> <span className="text-mute">/ {item.label}</span>
                </p>
                <h3 className="about-headline display mt-5 text-[clamp(2.2rem,4.8vw,4.75rem)]">{item.headline}</h3>
                <p className="about-body mt-6 max-w-[32rem] text-base leading-relaxed text-mute sm:text-lg">{item.body}</p>
              </article>
            ))}
          </div>
        </div>

        {/* the figure sits in the right column and rides up under the headline on desktop */}
        <div className="relative z-0 hidden lg:col-span-5 lg:-mt-[9vw] lg:block">
          <div className="sticky top-28">
            {profile.portrait && (
              <div data-portrait className="mb-6 aspect-[4/5] w-full max-w-[18rem] overflow-hidden border border-line">
                <img
                  src={profile.portrait}
                  alt={`Portrait of ${profile.name}`}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>
            )}
            <AboutVisual active={active} caption={`Fig. ${theme.index} — ${theme.label}`} />
          </div>
        </div>
      </div>

      {/* stays on mobile too: a portrait, if provided, appears after the copy */}
      {profile.portrait && (
        <div data-portrait className="mt-12 aspect-[4/5] w-full max-w-[18rem] overflow-hidden border border-line lg:hidden">
          <img src={profile.portrait} alt={`Portrait of ${profile.name}`} loading="lazy" className="h-full w-full object-cover" />
        </div>
      )}

      {/* bridge: this line continues as the Education timeline */}
      <div
        data-about-bridge
        aria-hidden="true"
        className="absolute bottom-0 left-gutter h-32 w-px origin-top bg-lime"
      />
    </section>
  );
}
