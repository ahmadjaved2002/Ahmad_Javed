import { useRef, useState } from 'react';
import { gsap, useGSAP, MQ } from '../animations/gsapSetup';
import { pinnedJourney, stackedJourney } from '../animations/journeyAnimations';
import { chapters } from '../data/journey';
import AnimatedLines from '../components/AnimatedLines';
import SectionLabel from '../components/SectionLabel';

export default function Journey() {
  const root = useRef(null);
  const [active, setActive] = useState(0);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.journeyPinned, () => {
        pinnedJourney(root.current, setActive);
      });
      mm.add(MQ.journeyStacked, () => {
        stackedJourney(root.current);
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section
      id="journey"
      ref={root}
      aria-labelledby="journey-title"
      className="journey-section relative flex flex-col bg-ink px-gutter py-24 lg:pb-10 lg:pt-28"
    >
      <div className="flex items-start justify-between gap-6">
        <div>
          <SectionLabel number="02" label="The Journey" />
          <AnimatedLines
            id="journey-title"
            className="display mt-6 text-[clamp(2.25rem,min(5.2vw,8.5vh),5.5rem)]"
            lines={['Every pixel', { text: 'has a purpose.', className: 'text-outline-lime' }]}
          />
        </div>
        <p className="journey-pinned-only font-mono text-sm tracking-[0.2em] text-mute">
          <span className="sr-only">
            Chapter {active + 1} of {chapters.length}
          </span>
          <span aria-hidden="true">
            <span className="text-lime">0{active + 1}</span> / 0{chapters.length}
          </span>
        </p>
      </div>

      <div data-journey-body className="flex min-h-0 flex-1 flex-col">
      <div className="journey-stage mt-12 lg:mt-6">
        {chapters.map((chapter, i) => (
          <article
            key={chapter.word}
            data-chapter
            aria-current={i === active ? 'step' : undefined}
            className="journey-chapter grid items-center gap-6 border-t border-line py-10 lg:grid-cols-12 lg:gap-10"
          >
            <h3 data-word className="line-mask display text-[clamp(3rem,min(9.5vw,19vh),11rem)] lg:col-span-7">
              <span className="line-inner block">{chapter.word}</span>
            </h3>

            <div className="lg:col-span-5">
              <p data-detail className="mono-label mb-4 text-lime">
                Chapter {chapter.index}
              </p>
              <p data-detail className="font-display text-[clamp(1.25rem,2.1vw,1.9rem)] font-semibold leading-tight tracking-[-0.01em]">
                {chapter.quote}
              </p>
              <p data-detail className="mt-4 max-w-[32rem] text-sm leading-relaxed text-mute sm:text-base">
                {chapter.body}
              </p>
              <ul data-detail className="mt-6 flex flex-wrap gap-2">
                {chapter.points.map((point) => (
                  <li key={point} className="border border-line px-3 py-1.5 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-mute">
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>

      {/* connecting line + chapter ticks (desktop pinned sequence) */}
      <div className="journey-pinned-only mt-6" aria-hidden="true">
        <div className="relative h-px w-full bg-line">
          <div data-progress-fill className="absolute inset-0 origin-left bg-lime" />
          <div className="absolute inset-x-0 -top-1.5 flex justify-between">
            {chapters.map((chapter, i) => (
              <span
                key={chapter.word}
                className={`h-3 w-3 rounded-full border transition-colors duration-300 ${
                  i <= active ? 'border-lime bg-lime' : 'border-line bg-ink'
                }`}
              />
            ))}
          </div>
        </div>
        <div className="mt-4 flex justify-between font-mono text-[0.7rem] uppercase tracking-[0.18em]">
          {chapters.map((chapter, i) => (
            <span key={chapter.word} className={i === active ? 'text-paper' : 'text-mute'}>
              {chapter.word}
            </span>
          ))}
        </div>
      </div>
      </div>
    </section>
  );
}
