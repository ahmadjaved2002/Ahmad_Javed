export const principles = [
  {
    index: '01',
    title: 'CLARITY OVER COMPLEXITY',
    body: 'Build interfaces that are easy to understand and maintain. The simplest structure that solves the problem is usually the one other people can change safely.',
    practice: ['Small, focused components', 'Data kept apart from presentation', 'Names that explain intent'],
  },
  {
    index: '02',
    title: 'PURPOSEFUL MOTION',
    body: 'Animation should support hierarchy, feedback, and storytelling. If a movement does not help someone understand the page, it does not belong on it.',
    practice: ['Animate transform and opacity', 'Reduced-motion fallbacks', 'Clean up every timeline on unmount'],
  },
  {
    index: '03',
    title: 'PERFORMANCE IS PART OF DESIGN',
    body: 'A beautiful interface should also be fast and responsive. Speed is something visitors feel before they notice any visual detail.',
    practice: ['Reserve space to avoid layout shift', 'Lazy-load below-the-fold media', 'Keep dependencies minimal'],
  },
  {
    index: '04',
    title: 'ACCESSIBILITY BY DEFAULT',
    body: 'Interactions should work for different users, devices, and input methods. Building it in from the start costs far less than retrofitting it later.',
    practice: ['Semantic landmarks and headings', 'Visible focus states', 'Keyboard-operable controls'],
  },
];
