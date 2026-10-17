import { useRef } from 'react';
import { ArrowUp, ArrowUpRight, Github, Linkedin } from 'lucide-react';
import { gsap, useGSAP, MQ } from '../animations/gsapSetup';
import { useScrollReveals } from '../animations/reveal';
import { profile } from '../data/profile';
import useReducedMotion from '../hooks/useReducedMotion';
import AnimatedLines from '../components/AnimatedLines';
import Orb from '../components/Orb';
import SectionLabel from '../components/SectionLabel';

export default function Contact() {
  const root = useRef(null);
  const reduced = useReducedMotion();
  useScrollReveals(root);
  
  
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        gsap.fromTo(
          '[data-contact-orb]',
          { rotate: -50, scale: 0.8 },
          {
            rotate: 0,
            scale: 1,
            ease: 'none',
            scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'center center', scrub: true },
          },
        );
        gsap.fromTo(
          '[data-contact-rule]',
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: 'power3.out',
            duration: 1.4,
            scrollTrigger: { trigger: root.current.querySelector('[data-contact-rule]'), start: 'top 92%', once: true },
          },
        );
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  const backToTop = () => {
    window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });
    window.history.replaceState(null, '', '#home');
  };

  return (
    <section
      id="contact"
      ref={root}
      aria-labelledby="contact-title"
      className="relative overflow-hidden px-gutter pb-10 pt-28 lg:pt-40"
    >
      <Orb
        data-contact-orb
        className="pointer-events-none absolute -right-[22vw] top-10 w-[min(90vw,60vh)] opacity-60 sm:-right-[8vw] sm:w-[min(42vw,60vh)]"
      />

      <div className="relative z-10">
        <SectionLabel number="06" label="Contact" />
        <AnimatedLines
          id="contact-title"
          data-lines
          className="display mt-6 text-[clamp(3rem,10.5vw,11rem)]"
          lines={['Let’s build', 'something', { text: 'that matters.', className: 'text-lime' }]}
        />

        <p data-fade className="mt-10 max-w-[30rem] text-lg leading-relaxed text-mute">
          Have a project, an opportunity, or an interesting problem to solve? I&apos;d love to hear about it.
        </p>

        <div data-fade className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <a href={`mailto:${profile.email}`} className="btn btn-primary">
            <span className='lowercase'>{profile.email}</span>
            <ArrowUpRight size={16} aria-hidden="true" />
          </a>
          {profile.resume && (
            <a href={profile.resume} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
              <span>Resume</span>
            </a>
          )}
        </div>

        <ul data-fade className="mt-8 flex flex-wrap gap-x-8 gap-y-3 font-mono text-xs uppercase tracking-[0.18em]">
          {profile.github && (
            <li>
              <a href={profile.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 py-2 text-mute transition-colors hover:text-lime">
                <Github size={16} aria-hidden="true" /> GitHub
              </a>
            </li>
          )}
          {profile.linkedin && (
            <li>
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 py-2 text-mute transition-colors hover:text-lime">
                <Linkedin size={16} aria-hidden="true" /> LinkedIn
              </a>
            </li>
          )}
        </ul>
      </div>

      <div className="relative z-10 mt-24 lg:mt-32">
        <div data-contact-rule className="h-px origin-left bg-line" aria-hidden="true" />
        <div className="mt-6 flex items-center justify-between gap-4">
          <p className="mono-label">{profile.name} · {profile.role}</p>
          <button
            type="button"
            onClick={backToTop}
            aria-label="Back to top"
            className="flex h-12 w-12 items-center justify-center border border-line transition-colors hover:border-lime hover:text-lime"
          >
            <ArrowUp size={18} aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
}
