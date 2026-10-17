import { useMemo, useState } from 'react';
import { Search, Star } from 'lucide-react';

/* Interface mockups. Everything here is sample data drawn with CSS/SVG: no images, no API keys.
   The small controls inside each mockup are real, working buttons. */

function WindowChrome({ title }) {
  return (
    <div className="flex items-center gap-2 border-b border-line px-3 py-2">
      <span className="h-2 w-2 rounded-full bg-line" />
      <span className="h-2 w-2 rounded-full bg-line" />
      <span className="h-2 w-2 rounded-full bg-line" />
      <span className="ml-3 truncate font-mono text-[0.6rem] text-mute">{title}</span>
    </div>
  );
}

/* ── 01 · GitHub Profile Explorer ───────────────────────── */
const SAMPLE_REPOS = [
  { name: 'weather-dashboard', lang: 'JavaScript', stars: 42, updated: 3 },
  { name: 'portfolio-v2', lang: 'JavaScript', stars: 18, updated: 12 },
  { name: 'css-grid-playground', lang: 'CSS', stars: 27, updated: 40 },
  { name: 'todo-state-machine', lang: 'JavaScript', stars: 9, updated: 65 },
  { name: 'a11y-checklist', lang: 'HTML', stars: 31, updated: 90 },
];

function ExplorerPreview() {
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState('stars');

  const repos = useMemo(() => {
    const list = SAMPLE_REPOS.filter((repo) => repo.name.includes(query.trim().toLowerCase()));
    return [...list].sort((a, b) => (sort === 'stars' ? b.stars - a.stars : a.updated - b.updated));
  }, [query, sort]);

  return (
    <div className="flex h-full flex-col bg-charcoal">
      <WindowChrome title="profile-explorer / sample-user" />
      <div className="flex items-center gap-3 border-b border-line p-3 sm:p-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-lime font-display text-sm font-bold text-lime">
          SU
        </div>
        <div className="min-w-0">
          <p className="font-display text-sm font-semibold leading-tight">sample-user</p>
          <p className="truncate font-mono text-[0.6rem] text-mute">Sample data for interface preview</p>
        </div>
      </div>
      <div className="flex items-center gap-2 p-3 sm:px-4">
        <label className="flex min-w-0 flex-1 items-center gap-2 border border-line px-2 py-1.5 focus-within:border-lime">
          <Search size={12} className="shrink-0 text-mute" aria-hidden="true" />
          <span className="sr-only">Filter sample repositories</span>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Filter repositories"
            className="w-full min-w-0 bg-transparent font-mono text-[0.65rem] text-paper outline-none placeholder:text-mute"
          />
        </label>
        {[
          ['stars', 'Stars'],
          ['recent', 'Recent'],
        ].map(([key, label]) => (
          <button
            key={key}
            type="button"
            aria-pressed={sort === key}
            onClick={() => setSort(key)}
            className={`touch-target border px-2 py-1.5 font-mono text-[0.6rem] uppercase tracking-wider transition-colors ${
              sort === key ? 'border-lime bg-lime text-ink' : 'border-line text-mute hover:text-paper'
            }`}
          >
            {label}
          </button>
        ))}
      </div>
      <ul className="min-h-0 flex-1 divide-y divide-line overflow-hidden px-3 sm:px-4">
        {repos.length === 0 && (
          <li className="py-6 text-center font-mono text-[0.65rem] text-mute">No repositories match “{query}”.</li>
        )}
        {repos.slice(0, 4).map((repo) => (
          <li key={repo.name} className="flex items-center justify-between gap-3 py-2">
            <div className="min-w-0">
              <p className="truncate font-mono text-[0.7rem] text-paper">{repo.name}</p>
              <p className="font-mono text-[0.58rem] text-mute">
                {repo.lang} · updated {repo.updated}d ago
              </p>
            </div>
            <span className="flex shrink-0 items-center gap-1 font-mono text-[0.62rem] text-mute">
              <Star size={10} aria-hidden="true" /> {repo.stars}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ── 02 · Interactive Product Experience ────────────────── */
const VARIANTS = [
  { id: 'lime', label: 'Lime', color: '#C6FF4D' },
  { id: 'bone', label: 'Bone', color: '#F2F0EA' },
  { id: 'graphite', label: 'Graphite', color: '#4a4a4a' },
];
const VIEWS = [
  { id: 'front', label: 'Front view', tilt: 0 },
  { id: 'angle', label: 'Angled view', tilt: -24 },
  { id: 'detail', label: 'Detail view', tilt: 24 },
];

function ProductPreview() {
  const [variant, setVariant] = useState(VARIANTS[0]);
  const [view, setView] = useState(VIEWS[0]);

  return (
    <div className="flex h-full flex-col bg-charcoal">
      <WindowChrome title="lumen-01 / desk lamp (fictional)" />
      <div className="grid min-h-0 flex-1 grid-cols-5">
        <div className="relative col-span-3 flex items-center justify-center border-r border-line bg-panel">
          <svg viewBox="0 0 200 200" className="h-[88%] w-auto" role="img" aria-label={`Lamp, ${variant.label}, ${view.label}`}>
            <ellipse cx="100" cy="176" rx="46" ry="8" fill="#0d0d0d" />
            <rect x="94" y="96" width="12" height="76" fill={variant.color} opacity="0.9" />
            <g style={{ transform: `rotate(${view.tilt}deg)`, transformOrigin: '100px 96px', transition: 'transform 0.6s cubic-bezier(.22,1,.36,1)' }}>
              <path d="M52 96 A48 48 0 0 1 148 96 Z" fill={variant.color} />
              <circle cx="100" cy="102" r="6" fill="#C6FF4D" opacity={variant.id === 'lime' ? 0 : 1} />
            </g>
            <ellipse cx="100" cy="178" rx="30" ry="5" fill={variant.color} />
          </svg>
          <div className="absolute bottom-2 left-2 flex gap-3">
            {VIEWS.map((v) => (
              <button
                key={v.id}
                type="button"
                aria-label={v.label}
                aria-pressed={view.id === v.id}
                onClick={() => setView(v)}
                className={`touch-target h-6 w-6 border transition-colors ${view.id === v.id ? 'border-lime' : 'border-line hover:border-mute'}`}
              >
                <span className="mx-auto block h-2 w-2 bg-mute" style={{ transform: `rotate(${v.tilt * 2}deg)` }} />
              </button>
            ))}
          </div>
        </div>
        <div className="col-span-2 flex flex-col justify-between p-3 sm:p-4">
          <div>
            <p className="font-mono text-[0.58rem] uppercase tracking-widest text-mute">Sample product</p>
            <p className="mt-1 font-display text-lg font-bold uppercase leading-none tracking-tight sm:text-xl">Lumen-01</p>
            <p className="mt-2 font-mono text-[0.62rem] text-mute">Colour: {variant.label}</p>
            <div className="mt-2 flex gap-3" role="group" aria-label="Colour">
              {VARIANTS.map((v) => (
                <button
                  key={v.id}
                  type="button"
                  aria-label={v.label}
                  aria-pressed={variant.id === v.id}
                  onClick={() => setVariant(v)}
                  className={`touch-target h-6 w-6 rounded-full border-2 transition-transform ${
                    variant.id === v.id ? 'scale-110 border-lime' : 'border-line hover:scale-105'
                  }`}
                  style={{ backgroundColor: v.color }}
                />
              ))}
            </div>
          </div>
          <div className="border border-paper/30 py-2 text-center font-mono text-[0.6rem] uppercase tracking-widest text-paper">
            Sample layout
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── 03 · Cinematic Creative Landing Page ───────────────── */
const SCENES = [
  { id: 'arrive', word: 'ARRIVE', caption: 'Scene 01', shape: 'circle' },
  { id: 'linger', word: 'LINGER', caption: 'Scene 02', shape: 'bars' },
  { id: 'depart', word: 'DEPART', caption: 'Scene 03', shape: 'arc' },
];

function SceneShape({ shape }) {
  if (shape === 'bars') {
    return (
      <div className="flex h-full items-end gap-2">
        {[40, 75, 55, 90, 65].map((h, i) => (
          <span key={i} className="w-3 bg-lime/80" style={{ height: `${h}%` }} />
        ))}
      </div>
    );
  }
  if (shape === 'arc') {
    return <div className="h-full w-full rounded-t-full border-2 border-lime" />;
  }
  return <div className="h-full aspect-square rounded-full bg-lime" />;
}

function CinematicPreview() {
  const [scene, setScene] = useState(SCENES[0]);
  return (
    <div className="flex h-full flex-col bg-ink">
      <WindowChrome title="noctua-studio (fictional)" />
      <div className="relative flex min-h-0 flex-1 flex-col justify-between overflow-hidden p-3 sm:p-5">
        <div className="flex items-center justify-between font-mono text-[0.58rem] uppercase tracking-widest text-mute">
          <span>Noctua Studio</span>
          <span>{scene.caption} / 03</span>
        </div>
        <div className="relative flex flex-1 items-center">
          <p key={scene.id} className="display relative z-10 text-[clamp(2.75rem,12vw,5.5rem)] mix-blend-difference sm:text-[clamp(3rem,7vw,5.5rem)]">
            {scene.word}
          </p>
          <div className="absolute bottom-0 right-0 top-2 w-[34%]" aria-hidden="true">
            <SceneShape shape={scene.shape} />
          </div>
        </div>
        <div className="flex gap-2" role="group" aria-label="Preview scene">
          {SCENES.map((s) => (
            <button
              key={s.id}
              type="button"
              aria-pressed={scene.id === s.id}
              onClick={() => setScene(s)}
              className="touch-target group flex-1 py-1 text-left"
            >
              <span className={`block h-px transition-colors ${scene.id === s.id ? 'bg-lime' : 'bg-line group-hover:bg-mute'}`} />
              <span className={`mt-1.5 block font-mono text-[0.58rem] uppercase tracking-widest ${scene.id === s.id ? 'text-paper' : 'text-mute'}`}>
                {s.word}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

const PREVIEWS = {
  'github-explorer': ExplorerPreview,
  'product-experience': ProductPreview,
  'cinematic-landing': CinematicPreview,
};

export default function ProjectPreview({ projectId }) {
  const Preview = PREVIEWS[projectId];
  return (
    <div className="aspect-[4/3.3] w-full sm:aspect-[4/3]">
      {Preview ? <Preview /> : null}
    </div>
  );
}
