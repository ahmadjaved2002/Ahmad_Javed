# Digital Craftsman: Frontend Developer Portfolio

React + Vite + Tailwind CSS + GSAP (ScrollTrigger, @gsap/react) + Lucide React.

## Run it

```bash
npm install
npm run dev      # development server
npm run build    # production build into /dist
npm run preview  # preview the production build
```

## Edit your details (one place)

`src/data/profile.js`: name, availability label, email, GitHub, LinkedIn, resume.
Leave `resume` empty to hide the button. Empty project links hide their buttons too.

Other content files: `projects.js`, `skills.js`, `journey.js`, `philosophy.js`, `navigation.js`.

## Structure

```
src/
  components/  Navbar, MobileMenu, SectionLabel, AnimatedLines,
               Orb, ProjectCard, ProjectPreview, CaseStudy, Footer
  sections/    Hero, Journey, SelectedWork, TechnicalToolkit, Philosophy, Contact
  data/        profile, navigation, projects, skills, journey, philosophy
  animations/  gsapSetup, reveal, heroAnimations, journeyAnimations, projectAnimations
  hooks/       useReducedMotion, useDialog, useActiveSection
  utils/       scrollToId
```

## Honesty notes

- The three projects are labelled **concepts** with interface previews built from sample data.
  When you build the real thing, update `status`, `links`, and `result` in `src/data/projects.js`.
- No metrics, testimonials, or employment history are invented.
