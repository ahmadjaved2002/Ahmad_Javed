import { useRef } from 'react';
import { ArrowDown } from 'lucide-react';
import { gsap, useGSAP, MQ } from '../animations/gsapSetup';
import { heroIntro, heroPointer, heroScrollExit } from '../animations/heroAnimations';
import { profile } from '../data/profile';
import { scrollToId } from '../utils/scrollToId';
import AnimatedLines from '../components/AnimatedLines';
import Orb from '../components/Orb';

export default function Hero() {
  const root = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        heroIntro();
      });
      mm.add(MQ.desktop, () => {
        heroScrollExit(root.current);
      });
      mm.add(MQ.finePointer, () => heroPointer(root.current));
      return () => mm.revert();
    },
    { scope: root },
  );

  const go = (event, id) => {
    event.preventDefault();
    scrollToId(id);
  };

  return (
    <section
      id="home"
      ref={root}
      aria-labelledby="hero-name"
      className="relative flex min-h-[100svh] flex-col justify-between overflow-hidden px-gutter pb-8 pt-28"
    >
      {/* restrained accent glow (gradient only, moves with transforms) */}
      <div
        data-hero-glow
        aria-hidden="true"
        className="pointer-events-none absolute -right-[10vw] top-[8vh] h-[60vmin] w-[60vmin] rounded-full opacity-[0.14]"
        style={{ background: 'radial-gradient(circle, #C6FF4D 0%, rgba(198,255,77,0) 65%)' }}
      />

      <Orb
        data-hero-orb
        className="pointer-events-none absolute -right-[18vw] top-[10vh] w-[min(95vw,70vh)] opacity-40 sm:-right-[6vw] sm:opacity-90 sm:w-[min(52vw,78vh)]"
      />

      <div
        data-hero-meta
        className="relative z-10 flex flex-wrap items-center justify-between gap-3 font-mono text-xs uppercase tracking-[0.18em] text-mute"
      >
        <span className="flex items-center gap-3">
          <span className="relative flex h-2 w-2" aria-hidden="true">
            <span className="absolute inline-flex h-full w-full rounded-full bg-lime opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-lime" />
          </span>
          {profile.availability}
        </span>
        <span>{profile.role}</span>
      </div>

      <div className="relative z-10 mt-10 sm:mt-6">
        <h1 id="hero-name" data-hero-name className="display text-[clamp(4.25rem,min(19vw,27vh),21rem)]">
          <span className="sr-only">{profile.name}</span>
          <span className="line-mask" aria-hidden="true">
            <span className="line-inner block">{profile.firstName}</span>
          </span>
          <span className="line-mask sm:pl-[8vw]" aria-hidden="true">
            <span className="line-inner text-outline block">{profile.lastName}</span>
          </span>
        </h1>
      </div>

      <div className="relative z-10 mt-10 grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <AnimatedLines
            as="p"
            data-hero-statement
            className="font-display text-[clamp(1.4rem,3.2vw,2.75rem)] font-semibold uppercase leading-[1.02] tracking-[-0.02em]"
            lines={[
              'I build digital experiences',
              { text: 'that move people.', className: 'text-lime' },
            ]}
          />
          <p data-hero-copy className="mt-6 max-w-[34rem] text-base leading-relaxed text-mute sm:text-lg">
            Frontend developer focused on interactive interfaces, thoughtful design, and meaningful web experiences.
          </p>
          <div data-hero-copy className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href="#work" onClick={(e) => go(e, 'work')} className="btn btn-primary">
              <span>Explore my work</span>
            </a>
            <a href="#contact" onClick={(e) => go(e, 'contact')} className="btn btn-ghost">
              <span>Let&apos;s talk</span>
            </a>
          </div>
        </div>

        <a
          data-hero-scroll
          href="#journey"
          onClick={(e) => go(e, 'journey')}
          className="hidden items-end justify-end gap-4 font-mono text-xs uppercase tracking-[0.18em] text-mute transition-colors hover:text-lime lg:col-span-5 lg:flex"
        >
          <span>Scroll</span>
          <span className="relative block h-14 w-px overflow-hidden bg-line" aria-hidden="true">
            <span className="scroll-cue-line absolute inset-0 bg-lime" />
          </span>
          <ArrowDown size={14} aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
