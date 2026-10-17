import { ArrowUpRight, Github } from 'lucide-react';
import AnimatedLines from './AnimatedLines';

export default function ProjectCard({ project, position, onOpen }) {
  const flip = position % 2 === 1;
  const titleId = `${project.id}-title`;

  return (
    <article
      data-project
      aria-labelledby={titleId}
      className="group relative grid gap-8 border-t border-line py-16 lg:grid-cols-12 lg:gap-12 lg:py-28"
    >
      <span
        data-bignum
        aria-hidden="true"
        className={`display text-outline-dim pointer-events-none absolute top-6 hidden select-none text-[clamp(8rem,17vw,18rem)] lg:block ${
          flip ? 'left-0' : 'right-0'
        }`}
      >
        {project.index}
      </span>

      <div className={`relative z-10 lg:col-span-7 ${flip ? 'lg:order-2' : ''}`}>
        <div data-preview className="overflow-hidden border border-line bg-charcoal">
          <div className="transition-transform duration-[900ms] ease-out group-focus-within:scale-[1.025] group-hover:scale-[1.025]">
            <div data-preview-inner>
              {/* <ProjectPreview projectId={project.id} /> */}
              <img src={project.image} alt="" />
              
            </div>
          </div>
        </div>
        <p data-meta className="mono-label mt-3">
          Interface preview · sample data
        </p>
      </div>

      <div className={`relative z-10 flex flex-col justify-end lg:col-span-5 ${flip ? 'lg:order-1' : ''}`}>
        <p data-meta className="font-mono text-xs uppercase tracking-[0.18em] text-lime">
          Project {project.index} · {project.category}
        </p>

        <AnimatedLines
          id={titleId}
          as="h3"
          data-title
          className="display mt-5 text-[clamp(2.4rem,5vw,4.75rem)]"
          lines={project.titleLines}
        />

        <p data-meta className="mt-6 max-w-[30rem] text-base leading-relaxed text-mute">
          {project.summary}
        </p>

        <dl data-meta className="mt-6 grid gap-3 border-t border-line pt-5 font-mono text-xs">
          <div className="flex gap-4">
            <dt className="w-16 shrink-0 uppercase tracking-widest text-mute">Status</dt>
            <dd>{project.status}</dd>
          </div>
          <div className="flex gap-4">
            <dt className="w-16 shrink-0 uppercase tracking-widest text-mute">Stack</dt>
            <dd className="flex flex-wrap gap-x-3 gap-y-1">
              {project.stack.map((tech) => (
                <span key={tech}>{tech}</span>
              ))}
            </dd>
          </div>
        </dl>

        <div data-meta className="mt-8 flex flex-wrap items-center gap-3">
          <button type="button" onClick={() => onOpen(position)} className="btn btn-primary">
            <span>View case study</span>
            <ArrowUpRight size={16} aria-hidden="true" />
          </button>
          {project.links.live && (
            <a href={project.links.live} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
              <span>Live demo</span>
              <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          )}
          {project.links.repo && (
            <a href={project.links.repo} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
              <Github size={16} aria-hidden="true" />
              <span>Repository</span>
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
