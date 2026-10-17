/** Smooth-scrolls to a section, accounting for ScrollTrigger pin spacers. */
export function scrollToId(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const target = el.parentElement?.classList.contains('pin-spacer') ? el.parentElement : el;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const top = id === 'home' ? 0 : target.getBoundingClientRect().top + window.scrollY;
  window.scrollTo({ top, behavior: reduce ? 'auto' : 'smooth' });
  window.history.replaceState(null, '', `#${id}`);
}
