import { useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { gsap, useGSAP, MQ } from '../animations/gsapSetup';
import { animateProject, parallaxNumeral } from '../animations/projectAnimations';
import { useScrollReveals } from '../animations/reveal';
import { projects } from '../data/projects';
import { profile } from '../data/profile';
import AnimatedLines from '../components/AnimatedLines';
import ProjectCard from '../components/ProjectCard';
import SectionLabel from '../components/SectionLabel';

export default function SelectedWork({ onOpen }) {
  const root = useRef(null);
  useScrollReveals(root);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        root.current.querySelectorAll('[data-project]').forEach((card) => animateProject(card));
      });
      mm.add(MQ.desktop, () => {
        root.current.querySelectorAll('[data-project]').forEach((card) => parallaxNumeral(card));
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section id="work" ref={root} aria-labelledby="work-title" className="relative px-gutter py-28 lg:py-40">
      <div className="grid gap-12 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-7">
          <SectionLabel number="03" label="Selected Work" />
          <AnimatedLines
            id="work-title"
            data-lines
            className="display mt-6 text-[clamp(3rem,9.5vw,9.5rem)]"
            lines={['Less talk.', { text: 'More proof.', className: 'text-outline-lime' }]}
          />
        </div>
        
        
        <nav aria-label="Project index" className="lg:col-span-5">
          <p className="mono-label mb-3">Open a case study</p>
          <ol className="border-t border-line">
            {projects.map((project, i) => (
              <li key={project.id} className="border-b border-line">
                <button
                  type="button"
                  onClick={() => onOpen(i)}
                  className="group flex w-full items-baseline gap-4 py-4 text-left"
                >
                  <span className="font-mono text-xs text-lime">{project.index}</span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-display text-lg font-semibold leading-tight tracking-tight transition-transform duration-500 group-hover:translate-x-1.5 sm:text-xl">
                      {project.title}
                    </span>
                    <span className="mt-1 block font-mono text-[0.68rem] uppercase tracking-[0.14em] text-mute">
                      {project.stack.slice(0, 3).join(' · ')}
                    </span>
                  </span>
                  <ArrowUpRight
                    size={18}
                    aria-hidden="true"
                    className="shrink-0 text-mute transition-colors group-hover:text-lime"
                  />
                </button>
              </li>
            ))}
          </ol>
          <p className="mt-4 max-w-[26rem] text-sm leading-relaxed text-mute">
            Concept case studies with working interface previews, labelled honestly as concepts.
          </p>
          {profile.github && (
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 border-b border-lime/60 py-1 font-mono text-xs uppercase tracking-[0.18em] transition-colors hover:text-lime"
            >
              Browse repositories on GitHub <ArrowUpRight size={14} aria-hidden="true" />
            </a>
          )}
        </nav>
      </div>

      <div className="mt-16 lg:mt-24">
        {projects.map((project, i) => (
          <ProjectCard key={project.id} project={project} position={i} onOpen={onOpen} />
        ))}
      </div>
    </section>
  );
}
