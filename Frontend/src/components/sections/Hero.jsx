import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { ArrowRight, Download, ChevronDown } from 'lucide-react';
import profileImg from '../../assets/profile.png';
import resumePdf from '../../assets/Himanshu Singh - Resume.pdf';

const Hero = ({ isIntroComplete, setIsIntroComplete }) => {
  const [displayName, setDisplayName] = useState('');
  const fullName = "HIMANSHU KUMAR SINGH";
  
  const domains = [
    "Full Stack Development",
    "Clean Architecture",
    "Scalable Systems",
    "Modern Web Development",
    "Problem Solving",
    "Production Ready Code"
  ];

  useEffect(() => {
    if (!isIntroComplete) {
      let intervalId;
      
      // Typewriter for name
      const typewriterTimer = setTimeout(() => {
        let i = 0;
        intervalId = setInterval(() => {
          setDisplayName(fullName.slice(0, i));
          i++;
          if (i > fullName.length) {
            clearInterval(intervalId);
            setTimeout(() => {
              setIsIntroComplete(true);
            }, 150); // Slide almost instantly once typing completes
          }
        }, 45); // Typewriter speed (45ms per character)
      }, 700); // Start reveal at 700ms

      return () => {
        clearTimeout(typewriterTimer);
        if (intervalId) clearInterval(intervalId);
      };
    }
  }, [isIntroComplete, setIsIntroComplete]);

  const slideTransition = { duration: 2.2, ease: [0.22, 1, 0.36, 1] }; // Slow, gentle, ultra-smooth luxury ease-out
  const letters = "PORTFOLIO".split("");


  return (
    <div id="home" className={`relative w-full bg-background transition-all-500 ${isIntroComplete ? 'min-h-screen md:h-screen md:overflow-hidden' : 'h-screen overflow-hidden'}`}>
      
      {/* 1. CINEMATIC INTRO SPLASH PAGE */}
      <AnimatePresence>
        {!isIntroComplete && (
          <motion.section 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ x: "-100%" }}
            transition={slideTransition}
            className="absolute inset-0 z-[100] flex items-center justify-center bg-[#fdf6ec] overflow-hidden"
          >
            {/* PAPER TEXTURE OVERLAY */}
            <div className="absolute inset-0 opacity-[0.4] pointer-events-none mix-blend-multiply bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')]" />

            <div className="relative w-full h-full flex flex-col items-center justify-center">
              
              {/* PORTFOLIO TEXT */}
              <div className="flex items-center font-display font-[800] select-none leading-none tracking-tight uppercase text-[120px] md:text-[160px]">
                {letters.map((char, idx) => {
                  const isO = char === 'O';
                  const isDarkO = isO && (idx === 1 || idx === 5);
                  
                  return (
                    <motion.div 
                      key={idx} 
                      className="relative flex items-center justify-center"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.6, delay: 0.3 + (idx * 0.05) }}
                    >
                      {/* VERTICAL HALF LINES */}
                      {idx === 1 && (
                        <motion.div 
                          initial={{ height: 0, bottom: "75%" }}
                          animate={{ height: "100vh" }}
                          transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
                          className="absolute w-[8px] md:w-[12px] bg-[#2c1a0e] z-0 origin-bottom"
                          style={{ 
                            left: "50%", 
                            bottom: "82%",
                            transform: "translateX(-50%)"
                          }}
                        />
                      )}

                      {idx === 5 && (
                        <motion.div 
                          initial={{ height: 0, top: "75%" }}
                          animate={{ height: "100vh" }}
                          transition={{ duration: 1, delay: 1, ease: "easeOut" }}
                          className="absolute w-[8px] md:w-[12px] bg-[#2c1a0e] z-0 origin-top"
                          style={{ 
                            left: "50%", 
                            top: "82%",
                            transform: "translateX(-50%)"
                          }}
                        />
                      )}

                      <span 
                        className={`relative z-10 px-[0.01em] ${isDarkO ? 'text-[#2c1a0e]' : 'text-[#c8956c]'}`}
                      >
                        {char}
                      </span>
                    </motion.div>
                  );
                })}
              </div>

              {/* BOTTOM RIGHT NAME */}
              <div className="absolute bottom-[60px] right-[60px] text-right">
                <motion.div className="text-[#2c1a0e] text-xl md:text-2xl font-display font-semibold tracking-[0.2em] uppercase">
                  {displayName}
                  <motion.span animate={{ opacity: [1, 0] }} transition={{ repeat: Infinity, duration: 0.8 }} className="inline-block w-[2px] h-[1em] bg-[#2c1a0e] ml-1 align-middle" />
                </motion.div>
              </div>

            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* 2. MAIN HERO SECTION */}
      <motion.section 
        className={`w-full flex items-center bg-background ${isIntroComplete ? 'relative min-h-screen md:h-screen py-16 md:py-0 z-40' : 'absolute inset-0 z-40'}`}
        initial={{ x: "100%" }}
        animate={isIntroComplete ? { x: 0 } : { x: "100%" }}
        transition={slideTransition}
      >
        <div className="max-w-[1440px] mx-auto px-6 md:px-16 lg:px-24 flex flex-col md:flex-row items-center justify-between gap-12 lg:gap-16 w-full pt-16 md:pt-0">
          
          {/* Left Text Column */}
          <div className="w-full md:w-[54%] lg:w-[50%] flex flex-col items-start justify-center">

            {/* Title / Name */}
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={isIntroComplete ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-[2.75rem] sm:text-6xl lg:text-[4.75rem] font-display font-extrabold text-textPrimary leading-[1.0] tracking-tighter mb-6"
            >
              Himanshu Kumar <br/>
              <span className="italic opacity-95 text-primary">Singh.</span>
            </motion.h1>

            {/* Subtitle / Bio */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isIntroComplete ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="max-w-xl mb-10"
            >
              {/* Role Title */}
              <h2 className="text-lg md:text-xl font-heading font-semibold text-textPrimary mb-4 uppercase tracking-widest text-primary/90">
                Full Stack Developer
              </h2>
              
              <p className="text-sm md:text-base font-sans text-textSecondary leading-relaxed mb-6">
                I build full-stack web applications with a focus on clean code, solid architecture, and real-world usability. From designing responsive interfaces to structuring backend logic, I care about writing systems that are maintainable, predictable, and ready for production — not just demos.
              </p>
              
              <div className="flex flex-wrap gap-2.5">
                {domains.map((domain, i) => (
                  <span 
                    key={i} 
                    className="px-3.5 py-1 border border-primary/20 rounded-full text-[9px] uppercase tracking-[0.2em] font-heading font-bold text-textPrimary/80 bg-surface/50 hover:border-primary hover:text-primary transition-all duration-300"
                  >
                    {domain}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={isIntroComplete ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 1 }}
              className="flex flex-wrap items-center gap-5 sm:gap-6 w-full"
            >
              {/* View Projects CTA */}
              <a 
                href="#projects" 
                className="group relative inline-flex items-center justify-center h-11 px-6 bg-primary text-background font-heading font-bold text-[10px] md:text-xs uppercase tracking-[0.2em] transition-all duration-300 shadow-soft hover:shadow-gold-glow-strong hover:-translate-y-0.5"
              >
                <span className="relative z-10 flex items-center gap-2">
                  View Projects <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </a>

              {/* Contact Me CTA */}
              <a 
                href="#contact" 
                className="inline-flex items-center justify-center h-11 px-6 border border-primary text-primary font-heading font-bold text-[10px] md:text-xs uppercase tracking-[0.2em] hover:bg-primary/5 hover:shadow-gold-glow-strong hover:-translate-y-0.5 transition-all duration-300"
              >
                Contact Me
              </a>

              {/* Download Resume CTA */}
              <a 
                href={resumePdf} 
                download="Himanshu_Singh_Resume.pdf"
                className="group/resume inline-flex items-center gap-1.5 h-11 text-[10px] md:text-xs uppercase tracking-[0.2em] font-heading font-bold text-textPrimary hover:text-primary transition-all duration-300 border-b border-primary/30 pb-0.5 hover:border-primary hover:-translate-y-0.5"
              >
                <span className="text-primary mr-0.5">↓</span>
                <span>
                  Resume (PDF)
                </span>
              </a>
            </motion.div>
          </div>

          {/* Right Image Composition */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.96 }}
            animate={isIntroComplete ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1.2, delay: 0.9 }}
            className="hidden md:flex w-full md:w-[40%] lg:w-[42%] justify-end relative animate-float-slow"
          >
            <div className="relative w-full aspect-[4/5] max-w-[320px] lg:max-w-[380px] xl:max-w-[420px] group">
              {/* Floating Orbit Wheel */}
              <div className="absolute -top-10 -left-10 w-24 h-24 border border-primary/10 rounded-full flex items-center justify-center animate-spin-slow">
                 <div className="w-2 h-2 rounded-full bg-primary/70 animate-pulse" />
              </div>

              {/* Gold frame shadow container */}
              <div className="absolute -bottom-5 -left-5 w-full h-full border border-primary/15 bg-primary/[0.01] -z-10 transition-transform duration-500 group-hover:-translate-x-1.5 group-hover:-translate-y-1.5" />

              {/* Image box with premium editorial overlays */}
              <div className="relative w-full h-full overflow-hidden shadow-lift bg-surface border border-border">
                {/* Internal Hairline Gallery Border */}
                <div className="absolute inset-3 border border-primary/15 pointer-events-none z-20 transition-all duration-500 group-hover:inset-4" />
                
                {/* Fine Editorial Corner Marks */}
                <div className="absolute top-4 left-4 w-1.5 h-1.5 border-t border-l border-primary/45 z-20" />
                <div className="absolute top-4 right-4 w-1.5 h-1.5 border-t border-r border-primary/45 z-20" />
                <div className="absolute bottom-4 left-4 w-1.5 h-1.5 border-b border-l border-primary/45 z-20" />
                <div className="absolute bottom-4 right-4 w-1.5 h-1.5 border-b border-r border-primary/45 z-20" />

                {/* Metadata Coord Label */}
                <div className="absolute bottom-5 left-8 z-20 text-[7px] uppercase tracking-[0.3em] text-[#6b3f1f]/50 font-heading font-semibold pointer-events-none select-none">
                  PORTRAIT // Ranchi, India
                </div>

                <img 
                  src={profileImg} 
                  alt="Himanshu Singh" 
                  className="w-full h-full object-cover mix-blend-multiply transition-transform duration-[1.5s] ease-out group-hover:scale-[1.03]"
                />
              </div>
            </div>
          </motion.div>
          
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={isIntroComplete ? { opacity: 0.7 } : {}}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 cursor-pointer group z-40"
          onClick={() => {
            document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          <span className="text-[9px] uppercase tracking-[0.4em] font-heading font-bold text-primary group-hover:text-textPrimary transition-colors duration-300">SCROLL ↓</span>
        </motion.div>
      </motion.section>

    </div>
  );
};

export default Hero;
