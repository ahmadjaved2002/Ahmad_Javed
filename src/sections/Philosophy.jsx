import { useRef } from 'react';
import { useScrollReveals } from '../animations/reveal';
import { principles } from '../data/philosophy';
import AnimatedLines from '../components/AnimatedLines';
import SectionLabel from '../components/SectionLabel';

/* Composition: a full-width ledger. Each principle is one wide row: index, oversized title,
   then the reasoning and its engineering practice. A rule draws across as each row arrives.
   No sticky columns (About and Stack already use them) and no opacity dimming (contrast). */
export default function Philosophy() {
  const root = useRef(null);
  useScrollReveals(root);

  return (
    <section id="philosophy" ref={root} aria-labelledby="philosophy-title" className="relative px-gutter py-28 lg:py-40">
      <SectionLabel number="05" label="Development Philosophy" />
      <AnimatedLines
        id="philosophy-title"
        data-lines
        className="display mt-6 text-[clamp(2rem,5.2vw,5.5rem)]"
        lines={['Good code is invisible.', { text: 'Great experiences are not.', className: 'text-outline-lime' }]}
      />

      <ol className="mt-20 lg:mt-28">
        {principles.map((principle) => (
          <li key={principle.index} className="group relative border-b border-line">
            <span data-rule className="absolute left-0 top-0 h-px w-full bg-paper/50" aria-hidden="true" />
            <article className="grid gap-6 py-10 lg:grid-cols-12 lg:gap-10 lg:py-16">
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-lime lg:col-span-1">{principle.index}</p>
              <h3 className="display text-[clamp(1.9rem,4.6vw,5rem)] transition-colors duration-500 group-hover:text-lime lg:col-span-7">
                {principle.title}
              </h3>
              <div className="lg:col-span-4">
                <p className="max-w-[28rem] text-base leading-relaxed text-mute">{principle.body}</p>
                <p className="mono-label mt-6">In practice</p>
                <ul className="mt-3 space-y-2 font-mono text-xs text-paper/80">
                  {principle.practice.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span className="text-lime" aria-hidden="true">
                        +
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          </li>
        ))}
      </ol>
    </section>
  );
}
