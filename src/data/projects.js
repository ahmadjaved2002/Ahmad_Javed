import GithubExplorer from '../assets/GitHub-Explorer.png';
import ZeroStore from '../assets/ZeroStore.png';
import Blogify from '../assets/Blogify.png';

export const projects = [
  {
    id: 'github-explorer',
    index: '01',
    titleLines: ['GITHUB', 'PROFILE', 'EXPLORER'],
    title: 'GitHub Profile Explorer',
    category: 'Web application · API integration',
    status: 'Concept · interface preview',
    summary:
      'An interactive discovery tool for searching GitHub usernames and exploring profile information and public repositories.',
    stack: ['React', 'JavaScript', 'Tailwind CSS', 'GitHub REST API'],
    links: { live: 'https://githubexplorer-black.vercel.app/', repo: 'https://github.com/ahmadjaved2002/githubexplorer' },
    image: GithubExplorer,
    caseStudy: {
      problem:
        "GitHub's own interface is built around logged-in collaboration. Someone who only wants to scan a developer's public footprint (who they are, what they build, which languages they use) has to click through several pages to get there.",
      approach:
        'A single-page React interface with a search-first flow. Requests go to the public GitHub REST API, and the UI is organised around explicit states (idle, loading, success, empty, error, rate-limited) so that every outcome has a designed response.',
      features: [
        'Username search with input validation',
        'Profile summary: avatar, name, bio, and public counts when available',
        'Repository list with language and last-updated metadata when available',
        'Sorting and filtering of repositories',
        'Loading, empty, error, and rate-limit states',
        'Responsive layout from small phones to wide desktops',
      ],
      decisions: [
        {
          title: 'Model request state explicitly',
          body: 'One status value (idle, loading, success, error) replaces several booleans, so impossible combinations like "loading and error" cannot be rendered.',
        },
        {
          title: 'Cancel stale requests',
          body: 'An AbortController ensures that typing a second username can never be overwritten by an earlier, slower response.',
        },
        {
          title: 'Derive instead of duplicating',
          body: 'Sorted and filtered repository lists are computed from the fetched array during render, not copied into separate state that can drift out of sync.',
        },
      ],
      challenges: [
        {
          challenge: 'Unauthenticated GitHub API requests are rate limited.',
          solution:
            'Detect the rate-limit response, explain it in plain language with the reset time from the response headers, and avoid refetching data that is already loaded.',
        },
        {
          challenge: 'Profiles vary widely: no bio, no repositories, forks only.',
          solution:
            'Design a specific empty or fallback state for each missing field rather than rendering blank space.',
        },
      ],
      result:
        'A fully functional GitHub profile discovery tool providing rapid insights into developer public activities with robust error and rate-limit handling.',
    },
  },
  {
    id: 'zerostore',
    index: '02',
    titleLines: ['ZERO', 'STORE', 'ECOMMERCE'],
    title: 'ZeroStore',
    category: 'E-commerce platform · state management',
    status: 'Live · production ready',
    summary:
      'A modern, feature-rich e-commerce web application designed for seamless product discovery, cart management, and smooth shopping experience.',
    stack: ['React', 'JavaScript', 'Tailwind CSS', 'Context API', 'Axios'],
    links: { live: 'https://zerostore-ten.vercel.app/product', repo: 'https://github.com/ahmadjaved2002/ZEROSTORE' },
    image: ZeroStore,
    caseStudy: {
      problem:
        "Modern e-commerce users expect lightning-fast browsing, reliable cart persistence, and a frictionless checkout flow without unnecessary page reloads or layout clutter.",
      approach:
        'Built using a component-driven React architecture with Tailwind CSS for styling. Leveraged Context API for centralized global state management (cart and wishlist) and Axios for clean REST API communication.',
      features: [
        'Dynamic product catalog with filtering and category sorting',
        'Interactive product details page with image galleries and variant options',
        'Real-time cart and wishlist management using Context API',
        'Responsive, mobile-first design optimized for all screen sizes',
        'Optimized performance with fast load times and clean component modularity',
      ],
      decisions: [
        {
          title: 'Global State with Context API',
          body: 'Managed shopping cart and user preferences globally to avoid prop drilling and ensure synchronization across components.',
        },
        {
          title: 'Modular Component Architecture',
          body: 'Broken down UI elements into reusable components (cards, buttons, modals) for maintainability and scalability.',
        },
        {
          title: 'Responsive Grid Layouts',
          body: 'Utilized Tailwind CSS grid and flexbox utilities to adapt fluidly across mobile, tablet, and desktop viewports.',
        },
      ],
      challenges: [
        {
          challenge: 'Synchronizing cart updates smoothly across multiple views without lagging.',
          solution:
            'Optimized Context API selectors and memoized state computations to render only the components affected by state changes.',
        },
        {
          challenge: 'Handling asynchronous product data fetching and loading states gracefully.',
          solution:
            'Implemented custom loading spinners and skeleton placeholders to maintain layout stability during network requests.',
        },
      ],
      result:
        'Successfully deployed a responsive, production-ready e-commerce interface on Vercel with smooth navigation and reliable state handling.',
    },
  },
  {
    id: 'blogify',
    index: '03',
    titleLines: ['BLOGIFY', 'CONTENT', 'PLATFORM'],
    title: 'Blogify',
    category: 'Content platform · dynamic routing',
    status: 'Live · production ready',
    summary:
      'A sleek and intuitive blogging web application enabling users to read, explore, and manage articles with a clean reading interface.',
    stack: ['React', 'React Router', 'Tailwind CSS', 'JavaScript'],
    links: { live: 'https://blogify-pied-nu.vercel.app/', repo: 'https://github.com/ahmadjaved2002/Blogify' },
    image: Blogify,
    caseStudy: {
      problem:
        'Readers often struggle with cluttered layouts, poor typography, and slow navigation on content-heavy publishing platforms.',
      approach:
        'Designed a content-first layout prioritizing readability, fast client-side routing via React Router createBrowserRouter, and a clean minimalist aesthetic using Tailwind CSS.',
      features: [
        'Dynamic article routing and detailed post views',
        'Clean typography optimized for long-form reading',
        'Category-based filtering and search capabilities',
        'Fully responsive layout ensuring readability on mobile and desktop',
        'Lightweight client-side performance with smooth page transitions',
      ],
      decisions: [
        {
          title: 'Client-Side Routing with React Router',
          body: 'Employed modern data APIs (`createBrowserRouter`) for fast nested routing and dynamic parameter handling.',
        },
        {
          title: 'Typography-Centric Design',
          body: 'Focused on readable font sizing, line heights, and spacing hierarchy using Tailwind CSS typography defaults.',
        },
        {
          title: 'Component Reusability',
          body: 'Created shared layouts for headers, footers, post cards, and reading views to maintain design consistency.',
        },
      ],
      challenges: [
        {
          challenge: 'Maintaining smooth transitions and state across different post pages.',
          solution:
            'Structured route layouts cleanly and utilized React Router hooks to fetch and render specific post content instantly.',
        },
        {
          challenge: 'Ensuring optimal readability across various screen resolutions.',
          solution:
            'Adopted responsive container constraints and fluid padding scaling via Tailwind utilities.',
        },
      ],
      result:
        'Delivered a polished, high-performance blogging application hosted live on Vercel, providing an exceptional reading and exploration experience.',
    },
  },
];