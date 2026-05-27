import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

import Navbar from './components/Navbar';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Skills from './components/sections/Skills';
import Projects from './components/sections/Projects';
import Experience from './components/sections/Experience';
import Resume from './components/sections/Resume';
import Certifications from './components/sections/Certifications';
import Contact from './components/sections/Contact';
import Footer from './components/sections/Footer';
import NotFound from './components/sections/NotFound';
import CustomCursor from './components/CustomCursor';

function App() {
  const [isIntroComplete, setIsIntroComplete] = useState(false);
  const [is404, setIs404] = useState(false);

  useEffect(() => {
    const path = window.location.pathname;
    if (path !== '/' && path !== '/index.html' && path !== '') {
      setIs404(true);
    }
    window.scrollTo(0, 0);
  }, []);

  if (is404) {
    return (
      <>
        <NotFound />
      </>
    );
  }

  return (
    <>
      <CustomCursor />
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: isIntroComplete ? 1 : 0, y: isIntroComplete ? 0 : -20 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-50 pointer-events-none"
        style={{ pointerEvents: isIntroComplete ? 'auto' : 'none' }}
      >
        <Navbar />
      </motion.div>

      <main className={`bg-background min-h-screen paper-grain ${!isIntroComplete ? 'h-screen overflow-hidden' : ''}`}>
        <Hero isIntroComplete={isIntroComplete} setIsIntroComplete={setIsIntroComplete} />

        {isIntroComplete && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <About />
            <Skills />
            <Projects />
            <Experience />
            <Resume />
            <Certifications />
            <Contact />
            <Footer />
          </motion.div>
        )}
      </main>
    </>
  );
}

export default App;
