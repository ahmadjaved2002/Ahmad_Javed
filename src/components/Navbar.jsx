import { useCallback, useRef, useState } from 'react';
import { Menu } from 'lucide-react';
import { gsap, useGSAP, MQ } from '../animations/gsapSetup';
import { navigation } from '../data/navigation';
import { profile } from '../data/profile';
import { scrollToId } from '../utils/scrollToId';
import MobileMenu from './MobileMenu';

export default function Navbar({ activeId }) {
  const headerRef = useRef(null);
  const [open, setOpen] = useState(false);
  const closeMenu = useCallback(() => setOpen(false), []);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        // clearProps matters: a leftover transform would trap the fixed mobile menu inside the header.
        gsap.from(headerRef.current, { yPercent: -100, opacity: 0, duration: 1, delay: 0.2, ease: 'expo.out', clearProps: 'transform,opacity' });
      });
      return () => mm.revert();
    },
    { scope: headerRef },
  );

  const handleNav = (event, id) => {
    event.preventDefault();
    scrollToId(id);
  };

  return (
    <header ref={headerRef} className="fixed inset-x-0 top-0 z-50">
      <nav
        aria-label="Primary"
        className="flex items-center justify-between bg-gradient-to-b from-ink via-ink/80 to-transparent px-gutter pb-8 pt-5"
      >
        <a
          href="#home"
          onClick={(e) => handleNav(e, 'home')}
          className="font-mono text-sm tracking-[0.25em]"
          aria-label={`${profile.name}, back to top`}
        >
          {profile.wordmark}
          <span className="text-lime">/</span>DEV
        </a>

        <ul className="hidden items-center gap-8 lg:flex">
          {navigation.map((item) => {
            const isActive = activeId === item.id;
            return (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={(e) => handleNav(e, item.id)}
                  aria-current={isActive ? 'location' : undefined}
                  className={`group relative flex items-center gap-2 py-2 font-mono text-xs uppercase tracking-[0.18em] transition-colors hover:text-paper ${
                    isActive ? 'text-paper' : 'text-mute'
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className={`h-1.5 w-1.5 rounded-full bg-lime transition-transform duration-300 ${
                      isActive ? 'scale-100' : 'scale-0 group-hover:scale-100'
                    }`}
                  />
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>

        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label="Open menu"
          className="-mr-2 p-2 lg:hidden"
        >
          <Menu size={26} aria-hidden="true" />
        </button>
      </nav>

      {open && <MobileMenu activeId={activeId} onClose={closeMenu} />}
    </header>
  );
}
