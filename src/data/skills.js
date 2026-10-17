// Only list technologies you genuinely know and use.
// TypeScript, Next.js, Redux, Framer Motion, etc. are intentionally NOT listed:
// add a new item below ONLY if it is true for you.
export const skillGroups = [
  {
    number: '01',
    titleLines: ['FOUNDATION'],
    note: 'What every interface is made of.',
    items: [
      { name: 'HTML5', description: 'Semantic markup and accessible document structure.' },
      { name: 'CSS3', description: 'Responsive layouts with Flexbox and Grid, transitions, and animation.' },
      {
        name: 'JavaScript (ES6+)',
        description:
          'DOM fundamentals, async/await and promises, array methods, closures, event handling, and API integration.',
      },
    ],
  },
  {
    number: '02',
    titleLines: ['INTERFACE', 'ENGINEERING'],
    note: 'How interfaces are built to last.',
    items: [
      {
        name: 'React',
        description: 'Functional components, props, state, hooks, composition, and reusable UI architecture.',
      },
      {
        name: 'Tailwind CSS',
        description: 'Utility-first styling, responsive design, and consistent design systems.',
      },
    ],
  },
  {
    number: '03',
    titleLines: ['MOTION &', 'INTERACTION'],
    note: 'How interfaces communicate.',
    items: [
      {
        name: 'GSAP',
        description: 'Timeline orchestration, staggered animation, and scroll-driven transitions.',
      },
      {
        name: 'ScrollTrigger',
        description: 'Pinned scenes, scrubbed progress, and responsive animation with matchMedia.',
      },
    ],
  },
  {
    number: '04',
    titleLines: ['DEVELOPMENT', 'WORKFLOW'],
    note: 'How work gets shipped and shared.',
    items: [
      {
        name: 'Git & GitHub',
        description: 'Version control, repository management, and collaborative workflows.',
      },
      {
        name: 'REST APIs',
        description: 'Fetching data, handling responses, and managing loading and error states.',
      },
    ],
  },
];
