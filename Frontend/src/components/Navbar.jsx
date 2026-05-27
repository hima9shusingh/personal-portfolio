import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const navLinks = [
    { name: 'About', id: 'about' },
    { name: 'Skills', id: 'skills' },
    { name: 'Projects', id: 'projects' },
    { name: 'Experience', id: 'experience' },
    { name: 'Resume', id: 'resume' },
    { name: 'Certifications', id: 'certifications' },
    { name: 'Contact', id: 'contact' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Track active section via IntersectionObserver
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -50% 0px', // Trigger when section occupies center of viewport
      threshold: 0
    };

    const handleIntersection = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    // Observe all sections and hero/home
    const sections = ['home', 'about', 'skills', 'projects', 'experience', 'resume', 'certifications', 'contact'];
    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => {
      sections.forEach((id) => {
        const element = document.getElementById(id);
        if (element) observer.unobserve(element);
      });
    };
  }, []);

  // Framer Motion variants for staggered mobile menu entry
  const menuVariants = {
    closed: {
      y: "-100%",
      opacity: 0,
      transition: {
        type: "tween",
        ease: [0.16, 1, 0.3, 1],
        duration: 0.5,
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    },
    open: {
      y: 0,
      opacity: 1,
      transition: {
        type: "tween",
        ease: [0.16, 1, 0.3, 1],
        duration: 0.6,
        staggerChildren: 0.08,
        delayChildren: 0.15
      }
    }
  };

  const linkVariants = {
    closed: { opacity: 0, y: -10 },
    open: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 24 
      } 
    }
  };

  return (
    <>
      <motion.nav 
        className={`fixed top-0 w-full z-50 transition-all-500 ${
          scrolled 
            ? 'bg-background/95 backdrop-blur-[16px] border-b border-border py-6 shadow-soft' 
            : 'bg-transparent py-9'
        }`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="max-w-[1440px] mx-auto px-6 md:px-16 lg:px-24 flex items-center justify-between w-full">
          {/* Logo Brand Mark (Left side) */}
          <a href="#home" className="flex items-center gap-3 group select-none no-underline">
            {/* Logo Image */}
            <img
              src="/Favicon.jpg"
              alt="Himanshu Kumar Singh Logo"
              className="w-9 h-9 object-cover rounded-sm border border-border/30 group-hover:border-primary/60 transition-all duration-500 shadow-minimal group-hover:shadow-gold-glow"
            />
            {/* Divider + label */}
            <div className="hidden sm:flex items-center gap-2.5">
              <div className="w-[1px] h-4 bg-border" />
              <div className="flex flex-col leading-none">
                <span className="text-[9px] font-heading font-bold uppercase tracking-[0.28em] text-textPrimary group-hover:text-primary transition-colors duration-500">Portfolio</span>
                <span className="text-[7.5px] font-sans font-normal uppercase tracking-[0.22em] text-textSecondary/60 mt-0.5">Full Stack Dev</span>
              </div>
            </div>
          </a>

          {/* Desktop Nav Links (Right side) */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            <ul className="flex items-center gap-6 lg:gap-7">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <a 
                    href={`#${link.id}`}
                    className={`text-[11px] lg:text-xs font-heading font-semibold uppercase tracking-[0.15em] transition-colors duration-500 relative py-1.5 ${
                      activeSection === link.id 
                        ? 'text-primary' 
                        : 'text-textSecondary/80 hover:text-textPrimary after:content-[""] after:absolute after:w-full after:scale-x-0 after:h-[1px] after:bottom-0 after:left-0 after:bg-primary/60 after:origin-bottom-right after:transition-transform after:duration-500 after:ease-[0.16,1,0.3,1] hover:after:scale-x-100 hover:after:origin-bottom-left'
                    }`}
                  >
                    {link.name}
                    {activeSection === link.id && (
                      <motion.span 
                        key={link.id}
                        className="absolute -bottom-1 left-0 right-0 h-[1.5px] bg-primary rounded-full shadow-gold-glow"
                        initial={{ scaleX: 0, opacity: 0 }}
                        animate={{ scaleX: 1, opacity: 1 }}
                        exit={{ scaleX: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        style={{ originX: 0 }}
                      />
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Mobile Menu Hamburger Toggle (Right side on mobile) */}
          <button 
            onClick={() => setMobileMenuOpen(true)}
            className="md:hidden flex flex-col gap-1.5 p-2 focus:outline-none group"
            aria-label="Toggle Mobile Menu"
          >
            <div className="w-6 h-[1.5px] bg-textPrimary group-hover:bg-primary transition-all-500" />
            <div className="w-4 h-[1.5px] bg-textPrimary ml-auto group-hover:bg-primary transition-all-500" />
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Drawer Overlay (Slide-down menu) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div 
              className="fixed inset-0 bg-textPrimary/40 backdrop-blur-md z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Menu Drawer - Slide Down */}
            <motion.div 
              className="fixed top-0 left-0 right-0 bg-background/95 backdrop-blur-[16px] border-b border-primary/20 z-50 shadow-lift flex flex-col justify-between p-8 md:p-12 max-h-[90vh] overflow-y-auto"
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              style={{ pointerEvents: 'auto' }}
            >
              <div>
                {/* Header inside Drawer */}
                <div className="flex justify-between items-center mb-10">
                  <div className="flex items-center gap-3 select-none">
                    <span className="font-display font-bold italic text-xl tracking-tight text-textPrimary leading-none">HS.</span>
                    <div className="w-[1px] h-4 bg-textPrimary/15" />
                    <span className="text-[9px] font-heading font-bold uppercase tracking-[0.25em] text-textSecondary leading-none mt-0.5">Portfolio</span>
                  </div>
                  <button 
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 border border-border/80 rounded-full hover:border-primary/50 hover:text-primary text-textPrimary transition-all duration-300 flex items-center justify-center"
                    aria-label="Close Mobile Menu"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Mobile Navigation Links */}
                <ul className="flex flex-col gap-5 mb-8">
                  {navLinks.map((link) => (
                    <motion.li key={link.id} variants={linkVariants}>
                      <a 
                        href={`#${link.id}`}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`text-xs font-heading font-semibold uppercase tracking-[0.18em] block transition-colors relative py-1 ${
                          activeSection === link.id ? 'text-primary pl-4' : 'text-textPrimary hover:text-primary'
                        }`}
                      >
                        {activeSection === link.id && (
                          <span className="w-1.5 h-1.5 rounded-full bg-primary absolute left-0 top-1/2 -translate-y-1/2 shadow-gold-glow" />
                        )}
                        {link.name}
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Mobile Footer */}
              <motion.div variants={linkVariants} className="pt-4 border-t border-border/40 text-center">
                <p className="text-[9px] uppercase tracking-[0.18em] font-heading font-semibold text-textSecondary/50">
                  © 2026 Himanshu Kumar Singh
                </p>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
