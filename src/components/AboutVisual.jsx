/**
 * Abstract figure for the About section: a square (structure), a circle (motion) and a few
 * code-like lines that re-compose for each narrative theme. Pure SVG + CSS transitions,
 * so it costs nothing at runtime and stays static under reduced motion.
 */
const POSES = [
  { square: 'rotate(0deg) scale(1)', circle: 'translate(40px, 40px) scale(1)', lines: [0.9, 0.5, 0.7, 0.3, 0.6] },
  { square: 'rotate(0deg) scale(1.12)', circle: 'translate(-60px, 50px) scale(0.8)', lines: [1, 0.8, 0.4, 0.9, 0.5] },
  { square: 'rotate(45deg) scale(0.82)', circle: 'translate(30px, -50px) scale(1.15)', lines: [0.4, 1, 0.6, 0.5, 0.8] },
  { square: 'rotate(90deg) scale(1)', circle: 'translate(70px, -70px) scale(1.4)', lines: [0.7, 0.3, 1, 0.6, 0.9] },
];

const EASE = 'transform 1s cubic-bezier(0.22, 1, 0.36, 1)';
const box = { transformBox: 'fill-box' };

export default function AboutVisual({ active, caption, className = '' }) {
  const pose = POSES[Math.min(active, POSES.length - 1)];
  return (
    <figure className={className} aria-hidden="true">
      <div className="relative aspect-square w-full border border-line bg-charcoal/60">
        <svg viewBox="0 0 400 400" fill="none" className="absolute inset-0 h-full w-full">
          {/* registration marks */}
          <path d="M24 44V24H44M356 24H376V44M376 356V376H356M44 376H24V356" stroke="#929292" strokeOpacity="0.5" />
          <path d="M200 20V40M200 360V380M20 200H40M360 200H380" stroke="#262626" />

          <rect
            x="90"
            y="90"
            width="220"
            height="220"
            stroke="#F2F0EA"
            strokeOpacity="0.55"
            style={{ ...box, transformOrigin: 'center', transform: pose.square, transition: EASE }}
          />
          <circle
            cx="200"
            cy="200"
            r="78"
            stroke="#C6FF4D"
            strokeWidth="1.5"
            style={{ ...box, transformOrigin: 'center', transform: pose.circle, transition: EASE }}
          />
          <circle cx="200" cy="200" r="5" fill="#C6FF4D" />

          {pose.lines.map((scale, i) => (
            <line
              key={i}
              x1="60"
              x2="170"
              y1={318 + i * 12}
              y2={318 + i * 12}
              stroke="#929292"
              strokeOpacity="0.7"
              style={{ ...box, transformOrigin: 'left center', transform: `scaleX(${scale})`, transition: EASE }}
            />
          ))}
        </svg>
      </div>
      <figcaption className="mt-3 font-mono text-[0.68rem] uppercase tracking-[0.18em] text-mute">{caption}</figcaption>
    </figure>
  );
}
