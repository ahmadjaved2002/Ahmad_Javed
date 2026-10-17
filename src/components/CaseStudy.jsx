import { useEffect, useRef } from 'react';
import { ArrowUpRight, Github, X } from 'lucide-react';
import { gsap, useGSAP, MQ } from '../animations/gsapSetup';
import useDialog from '../hooks/useDialog';
import AnimatedLines from './AnimatedLines';

function Block({ label, children }) {
  return (
    <section className="grid gap-4 border-t border-line py-10 lg:grid-cols-12 lg:gap-10 lg:py-14">
      <h3 className="mono-label lg:col-span-3">{label}</h3>
      <div className="lg:col-span-9">{children}</div>
    </section>
  );
}

export default function CaseStudy({ project, position, total, onClose, onNavigate }) {
  const ref = useRef(null);
  const { caseStudy: study } = project;
  const next = (position + 1) % total;

  useDialog(true, onClose, ref);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        gsap.from(ref.current, { opacity: 0, duration: 0.35, ease: 'power2.out' });
        gsap.from('[data-cs-title] .line-inner', { yPercent: 110, duration: 1, stagger: 0.09, ease: 'expo.out', delay: 0.1 });
        gsap.from('[data-cs-preview]', {
          clipPath: 'inset(100% 0% 0% 0%)',
          duration: 1.2,
          ease: 'expo.inOut',
          delay: 0.2,
        });
      });
      return () => mm.revert();
    },
    // Re-run the entrance when the visitor moves to another case study inside the same dialog.
    { scope: ref, dependencies: [project.id], revertOnUpdate: true },
  );

  useEffect(() => {
    ref.current?.scrollTo({ top: 0 });
  }, [project.id]);

  const goNext = () => onNavigate(next);

  return (
    <div
      ref={ref}
      role="dialog"
      aria-modal="true"
      aria-labelledby="case-study-title"
      className="fixed inset-0 z-[100] overflow-y-auto overscroll-contain bg-ink"
    >
      <div className="sticky top-0 z-10 flex items-center justify-between bg-gradient-to-b from-ink via-ink/90 to-transparent px-gutter pb-6 pt-5">
        <p className="mono-label">
          Case study <span className="text-lime">{project.index}</span> / 0{total}
        </p>
        <button
          type="button"
          onClick={onClose}
          className="flex items-center gap-3 border border-line px-4 py-2.5 font-mono text-xs uppercase tracking-[0.18em] transition-colors hover:border-lime hover:text-lime"
        >
          <span>Close</span>
          <X size={16} aria-hidden="true" />
        </button>
      </div>

      <div className="px-gutter pb-24 pt-8 lg:pt-14">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-lime">{project.category}</p>
        <AnimatedLines
          id="case-study-title"
          as="h2"
          data-cs-title
          className="display mt-6 text-[clamp(2.75rem,9vw,9rem)]"
          lines={project.titleLines}
        />
        <p className="mt-8 max-w-[40rem] text-lg leading-relaxed text-mute">{project.summary}</p>

        <div data-cs-preview className="mt-12 overflow-hidden border border-line">
          <img src={project.image} alt="" />
        </div>
        <p className="mono-label mt-3">Interface preview · sample data · try the controls</p>

        <dl className="mt-12 grid gap-6 border-t border-line pt-8 font-mono text-xs sm:grid-cols-3">
          <div>
            <dt className="uppercase tracking-widest text-mute">Status</dt>
            <dd className="mt-2 text-sm">{project.status}</dd>
          </div>
          <div>
            <dt className="uppercase tracking-widest text-mute">Stack</dt>
            <dd className="mt-2 text-sm">{project.stack.join(', ')}</dd>
          </div>
          <div>
            <dt className="uppercase tracking-widest text-mute">Links</dt>
            <dd className="mt-2 flex flex-wrap gap-4 text-sm">
              {project.links.live && (
                <a href={project.links.live} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:text-lime">
                  Live demo <ArrowUpRight size={14} aria-hidden="true" />
                </a>
              )}
              {project.links.repo && (
                <a href={project.links.repo} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:text-lime">
                  <Github size={14} aria-hidden="true" /> Repository
                </a>
              )}
              {!project.links.live && !project.links.repo && <span className="text-mute">Not published yet</span>}
            </dd>
          </div>
        </dl>


        <div className="mt-16">
          <Block label="The problem">
            <p className="max-w-[44rem] text-lg leading-relaxed">{study.problem}</p>
          </Block>

          <Block label="Design and technical approach">
            <p className="max-w-[44rem] text-lg leading-relaxed">{study.approach}</p>
          </Block>

          <Block label="Key features">
            <ul className="grid gap-x-10 gap-y-4 sm:grid-cols-2">
              {study.features.map((feature) => (
                <li key={feature} className="flex gap-3 border-b border-line pb-4 text-base">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-lime" aria-hidden="true" />
                  {feature}
                </li>
              ))}
            </ul>
          </Block>

          <Block label="Implementation decisions">
            <ol className="space-y-8">
              {study.decisions.map((decision, i) => (
                <li key={decision.title} className="grid gap-2 sm:grid-cols-[3rem_1fr]">
                  <span className="font-mono text-xs text-lime">0{i + 1}</span>
                  <div>
                    <h4 className="font-display text-xl font-semibold tracking-tight">{decision.title}</h4>
                    <p className="mt-2 max-w-[40rem] text-mute">{decision.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Block>

          <Block label="Challenges and solutions">
            <ul className="space-y-8">
              {study.challenges.map((item) => (
                <li key={item.challenge} className="grid gap-4 sm:grid-cols-2 sm:gap-10">
                  <p className="font-display text-xl font-semibold leading-snug tracking-tight">{item.challenge}</p>
                  <p className="text-mute">{item.solution}</p>
                </li>
              ))}
            </ul>
          </Block>

          <Block label="The result">
            <p className="max-w-[44rem] text-lg leading-relaxed">{study.result}</p>
          </Block>
        </div>

        <div className="mt-8 flex flex-col gap-3 border-t border-line pt-10 sm:flex-row sm:items-center sm:justify-between">
          <button type="button" onClick={onClose} className="btn btn-ghost">
            <span>Back to all work</span>
          </button>
          <button type="button" onClick={goNext} className="btn btn-primary">
            <span>Next case study</span>
            <ArrowUpRight size={16} aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}
