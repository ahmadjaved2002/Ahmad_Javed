import { useRef } from 'react';
import { useScrollReveals } from '../animations/reveal';
import { skillGroups } from '../data/skills';
import AnimatedLines from '../components/AnimatedLines';
import SectionLabel from '../components/SectionLabel';

export default function TechnicalToolkit() {
  const root = useRef(null);
  useScrollReveals(root);

  return (
    <section id="stack" ref={root} aria-labelledby="stack-title" className="relative px-gutter py-28 lg:py-40">
      <SectionLabel number="04" label="Technical Craft" />
      <AnimatedLines
        id="stack-title"
        data-lines
        className="display mt-6 text-[clamp(2.5rem,8.5vw,8.5rem)]"
        lines={['The craft behind', { text: 'the experience.', className: 'text-outline-lime' }]}
      />

      <div className="mt-16 lg:mt-24">
        {skillGroups.map((group) => (
          <div key={group.number}>
            
            
            <div data-rule className="h-px bg-line" aria-hidden="true" />

            <div className="grid gap-8 py-12 lg:grid-cols-12 lg:gap-12 lg:py-16">
              <div className="lg:col-span-4">
                <div className="lg:sticky lg:top-32">
                  <p className="font-mono text-xs uppercase tracking-[0.18em]">
                    <span className="text-lime">{group.number}</span> <span className="text-mute">/ group</span>
                  </p>
                  <AnimatedLines
                    as="h3"
                    data-lines
                    className="display mt-4 text-[clamp(2rem,3.8vw,3.5rem)]"
                    lines={group.titleLines}
                  />
                  <p className="mt-4 max-w-[16rem] text-sm text-mute">{group.note}</p>
                </div>
              </div>

              <ul className="divide-y divide-line lg:col-span-8">
                {group.items.map((item) => (
                  <li
                    key={item.name}
                    className="group relative grid items-baseline gap-2 py-7 first:pt-0 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] sm:gap-10"
                  >
                    <span
                      className="absolute -bottom-px left-0 h-px w-full origin-left scale-x-0 bg-lime transition-transform duration-700 ease-out group-hover:scale-x-100"
                      aria-hidden="true"
                    />
                    <h4 className="font-display text-[clamp(1.75rem,3.2vw,2.9rem)] font-semibold leading-none tracking-[-0.03em] transition-all duration-500 group-hover:translate-x-2 group-hover:text-lime">
                      {item.name}
                    </h4>
                    <p className="max-w-[28rem] text-sm leading-relaxed text-mute sm:text-base">{item.description}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
