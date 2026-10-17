import { useRef, useState } from 'react';
import { ArrowDown } from 'lucide-react';
import { gsap, useGSAP, MQ } from '../animations/gsapSetup';
import { educationMotion } from '../animations/educationAnimations';
import { useScrollReveals } from '../animations/reveal';
import { education, educationCopy } from '../data/education';
import { scrollToId } from '../utils/scrollToId';
import AnimatedLines from '../components/AnimatedLines';
import SectionLabel from '../components/SectionLabel';


export default function Education() {
  const root = useRef(null);
  const [active, setActive] = useState(0);
  useScrollReveals(root);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => educationMotion(root.current, setActive));
      return () => mm.revert();
    },
    { scope: root },
  );

  const goWork = (event) => {
    event.preventDefault();
    scrollToId('work');
  };

  return (
    <section id="education" ref={root} aria-labelledby="education-title" className="relative px-gutter pb-28 pt-32 lg:pb-40 lg:pt-44">
      <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-8">
          <SectionLabel number="02B" label="Education" />
          <AnimatedLines
            id="education-title"
            data-lines
            className="display mt-6 text-[clamp(2.25rem,6.6vw,6.75rem)]"
            lines={[
              educationCopy.titleLines[0],
              educationCopy.titleLines[1],
              { text: educationCopy.titleLines[2], className: 'text-outline-lime' },
            ]}
          />
        </div>
        <p className="max-w-[24rem] text-base leading-relaxed text-mute lg:col-span-4">{educationCopy.statement}</p>
      </div>


      <div data-edu-track className="relative mt-16 pl-6 lg:mt-24 lg:pl-12">
        <div className="absolute bottom-0 left-0 top-0 w-px bg-line" aria-hidden="true">
          <div data-edu-fill className="h-full origin-top bg-lime" />
        </div>

        {education.map((entry, i) => {
          const isActive = i === active;
          const year = entry.end || entry.start;
          const range = [entry.start, entry.end].filter(Boolean).join(' — ');
          return (
            <article
              key={entry.id}
              data-edu-entry
              aria-labelledby={`${entry.id}-title`}
              className="relative grid gap-8 py-12 lg:grid-cols-12 lg:gap-12 lg:py-20"
            >
              <span
                aria-hidden="true"
                className={`absolute -left-6 top-14 h-3 w-3 -translate-x-1/2 rounded-full border transition-colors duration-500 lg:-left-12 lg:top-24 ${isActive ? 'border-lime bg-lime' : 'border-mute bg-ink'
                  }`}
              />

              <div className="lg:col-span-4">
                {year && (
                  <p
                    data-year
                    className={`mb-10 display text-[clamp(3.5rem,10vw,9.5rem)] ${isActive ? 'text-outline-lime' : 'text-outline'}`}
                  >
                    {year}
                  </p>
                )}
                {range && (
                  <p data-edu-meta className="mono-label mt-4">
                    {range}
                  </p>
                )}
              </div>

              <div className="lg:col-span-8">
                {entry.status && (
                  <p data-edu-meta className={`font-mono text-xs uppercase tracking-[0.18em] ${isActive ? 'text-lime' : 'text-mute'}`}>
                    {entry.status}
                  </p>
                )}
                <AnimatedLines
                  id={`${entry.id}-title`}
                  as="h3"
                  data-edu-title
                  className="display mt-4 text-[clamp(2rem,4.6vw,4.5rem)]"
                  lines={[entry.title]}
                />

                <dl className="mt-8 grid gap-x-8 gap-y-6 border-t border-line pt-6 font-mono text-xs sm:grid-cols-2">
  {entry.institution && (
    <div data-edu-meta>
      <dt className="uppercase tracking-widest text-mute">Institution</dt>
      <dd className="mt-2 text-sm leading-6">{entry.institution}</dd>
    </div>
  )}
  {entry.field && (
    <div data-edu-meta>
      <dt className="uppercase tracking-widest text-mute">Field of study</dt>
      <dd className="mt-2 text-sm leading-7 break-words">
        {entry.field}
      </dd>
    </div>
  )}
</dl>

                {entry.coursework?.length > 0 && (
                  <div data-edu-meta className="mt-8">
                    <p className="mono-label">Coursework and focus</p>
                    <ul className="mt-3 flex flex-wrap gap-2">
                      {entry.coursework.map((item) => (
                        <li key={item} className="border border-line px-3 py-1.5 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-mute">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {entry.highlights?.length > 0 && (
                  <div data-edu-meta className="mt-8">
                    <p className="mono-label">Highlights</p>
                    <ul className="mt-3 space-y-2 text-sm text-paper/80">
                      {entry.highlights.map((item) => (
                        <li key={item} className="flex gap-3">
                          <span className="text-lime" aria-hidden="true">
                            +
                          </span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {entry.placeholder && (
                  <p data-edu-meta className="mt-8 inline-block border border-dashed border-lime/50 px-3 py-2 font-mono text-[0.7rem] text-lime">
                    Placeholder entry. Replace it in src/data/education.js
                  </p>
                )}
              </div>
            </article>
          );
        })}
      </div>

      {/* hand-off: learning → practice */}
      <a href="#work" onClick={goWork} className="group mt-6 block">
        <div data-edu-bridge-line className="h-px bg-lime/60" aria-hidden="true" />
        <div className="flex items-end justify-between gap-6 pt-6">
          <div>
            <p className="mono-label">From foundation to practice</p>
            <p className="display mt-3 text-[clamp(2rem,5vw,4.5rem)] transition-colors duration-300 group-hover:text-lime">
              Now, what it builds.
            </p>
          </div>
          <ArrowDown size={28} aria-hidden="true" className="mb-2 shrink-0 text-mute transition-colors group-hover:text-lime" />
        </div>
      </a>
    </section>
  );
}
