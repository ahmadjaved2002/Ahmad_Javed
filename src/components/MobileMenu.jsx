import { useRef } from 'react';
import { X } from 'lucide-react';
import { gsap, useGSAP, MQ } from '../animations/gsapSetup';
import { navigation } from '../data/navigation';
import { profile } from '../data/profile';
import { scrollToId } from '../utils/scrollToId';
import useDialog from '../hooks/useDialog';

export default function MobileMenu({ activeId, onClose }) {
  const ref = useRef(null);
  useDialog(true, onClose, ref);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        gsap.from(ref.current, { opacity: 0, duration: 0.3 });
        gsap.from('[data-menu-item]', { yPercent: 100, duration: 0.8, stagger: 0.06, ease: 'expo.out', delay: 0.05 });
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  const go = (event, id) => {
    event.preventDefault();
    onClose();
    window.setTimeout(() => scrollToId(id), 60);
  };

  return (
    <div
      ref={ref}
      id="mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Site menu"
      className="fixed inset-0 z-[70] flex flex-col bg-ink px-gutter pb-10 pt-5"
    >
      <div className="flex items-center justify-between">
        <span className="font-mono text-sm tracking-[0.25em]">
          {profile.wordmark}
          <span className="text-lime">/</span>DEV
        </span>
        <button type="button" onClick={onClose} aria-label="Close menu" className="-mr-2 p-2">
          <X size={28} aria-hidden="true" />
        </button>
      </div>

      <ul className="mt-auto space-y-2">
        {navigation.map((item, i) => (
          <li key={item.id} className="line-mask">
            <a
              data-menu-item
              href={`#${item.id}`}
              onClick={(e) => go(e, item.id)}
              aria-current={activeId === item.id ? 'location' : undefined}
              className={`display flex items-baseline gap-4 py-1 text-[clamp(2.75rem,14vw,5rem)] ${
                activeId === item.id ? 'text-lime' : 'text-paper'
              }`}
            >
              <span className="font-mono text-xs font-normal tracking-widest text-mute">0{i + 1}</span>
              {item.label}
            </a>
          </li>
        ))}
      </ul>

      <p className="mono-label mt-10">{profile.role}</p>
    </div>
  );
}
