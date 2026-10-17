import { useCallback, useEffect, useState } from 'react';
import { ScrollTrigger } from './animations/gsapSetup';
import { navigation } from './data/navigation';
import { projects } from './data/projects';
import useActiveSection from './hooks/useActiveSection';
import Navbar from './components/Navbar';
import CaseStudy from './components/CaseStudy';
import Footer from './components/Footer';
import Hero from './sections/Hero';
import Journey from './sections/Journey';
import About from './sections/About';
import Education from './sections/Education';
import SelectedWork from './sections/SelectedWork';
import TechnicalToolkit from './sections/TechnicalToolkit';
import Philosophy from './sections/Philosophy';
import Contact from './sections/Contact';

const NAV_IDS = navigation.map((item) => item.id);

export default function App() {
  const [openIndex, setOpenIndex] = useState(null);
  const activeId = useActiveSection(NAV_IDS);

  const closeCaseStudy = useCallback(() => setOpenIndex(null), []);


  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh();
    if (document.fonts?.ready) document.fonts.ready.then(refresh);
    window.addEventListener('load', refresh);
    return () => window.removeEventListener('load', refresh);
  }, []);

  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Navbar activeId={activeId} />
      <main id="main">
        <Hero />
        <About />
        <TechnicalToolkit />
        <Education />
        <SelectedWork onOpen={setOpenIndex} />
        <Journey />
        <Philosophy />
        <Contact />
      </main>
      <Footer />
      {openIndex !== null && (
        <CaseStudy
          project={projects[openIndex]}
          position={openIndex}
          total={projects.length}
          onClose={closeCaseStudy}
          onNavigate={setOpenIndex}
        />
      )}
    </>
  );
}
