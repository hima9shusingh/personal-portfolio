import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { ArrowUp, Mail } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const handleBackToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="py-16 md:py-20 bg-background border-t border-border/60 overflow-hidden relative">

      {/* Background ambient glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[300px] sm:w-[500px] h-[150px] sm:h-[250px] bg-primary/5 rounded-full blur-[80px] sm:blur-[100px] pointer-events-none -z-10" />

      {/* Back to top button */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
        <button
          onClick={handleBackToTop}
          className="w-12 h-12 rounded-none bg-background border border-border flex items-center justify-center text-primary hover:text-background hover:bg-primary transition-all duration-500 shadow-soft hover:shadow-gold-glow cursor-pointer group"
          aria-label="Back to Top"
        >
          <ArrowUp className="w-5 h-5 group-hover:-translate-y-1 transition-transform duration-300" />
        </button>
      </div>

      <div className="container mx-auto px-6 md:px-16 lg:px-24">
        <div className="flex flex-col items-center text-center space-y-10 md:space-y-12 w-full">

          {/* Logo Branding */}
          <div className="space-y-4 max-w-xl mx-auto flex flex-col items-center">
            <a href="#home" className="flex items-center gap-3 group select-none no-underline">
              <img
                src="/Favicon.jpg"
                alt="Himanshu Kumar Singh Logo"
                className="w-10 h-10 object-cover rounded-sm border border-border/30 group-hover:border-primary/60 transition-all duration-500 shadow-minimal group-hover:shadow-gold-glow"
              />
              <div className="flex items-center gap-2.5">
                <div className="w-[1px] h-4 bg-border" />
                <div className="flex flex-col leading-none text-left">
                  <span className="text-[9px] font-heading font-bold uppercase tracking-[0.28em] text-textPrimary group-hover:text-primary transition-colors duration-500">Portfolio</span>
                  <span className="text-[7.5px] font-sans font-normal uppercase tracking-[0.22em] text-textSecondary/60 mt-0.5">Full Stack Dev</span>
                </div>
              </div>
            </a>
            <p className="text-xs md:text-sm font-sans text-textSecondary/75 tracking-wider leading-relaxed max-w-md mx-auto">
              Translating complex requirements into clean, robust, and highly scalable digital architectures.
            </p>
            {/* Elegant Cinematic Divider Sparkle */}
            <div className="flex items-center justify-center gap-3.5 pt-2">
              <div className="w-10 h-[1px] bg-primary/20" />
              <span className="text-primary/60 text-[9px] tracking-[0.25em] font-heading font-semibold uppercase select-none">✦</span>
              <div className="w-10 h-[1px] bg-primary/20" />
            </div>
          </div>

          {/* Quick Nav Links */}
          <div className="flex flex-wrap justify-center items-center gap-x-5 gap-y-3 text-[10px] md:text-[11px] font-heading font-semibold uppercase tracking-[0.25em] text-textSecondary/70">
            {[
              { name: 'About', id: 'about' },
              { name: 'Skills', id: 'skills' },
              { name: 'Projects', id: 'projects' },
              { name: 'Experience', id: 'experience' },
              { name: 'Resume', id: 'resume' },
              { name: 'Certifications', id: 'certifications' },
              { name: 'Contact', id: 'contact' }
            ].map((link, idx, arr) => (
              <div key={link.id} className="flex items-center">
                <a
                  href={`#${link.id}`}
                  className="relative hover:text-primary transition-colors duration-300 py-1 after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-[1px] after:bottom-0 after:left-0 after:bg-primary/50 after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left"
                >
                  {link.name}
                </a>
                {idx < arr.length - 1 && (
                  <span className="text-primary/30 mx-4 select-none">·</span>
                )}
              </div>
            ))}
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-5 pt-1">
            {[
              { icon: <Mail className="w-[18px] h-[18px]" />, link: "mailto:himanshsingh.bit9995@gmail.com", name: "Email" },
              { icon: <FaGithub className="w-[18px] h-[18px]" />, link: "https://github.com/hima9shusingh", name: "GitHub" },
              { icon: <FaLinkedin className="w-[18px] h-[18px]" />, link: "https://linkedin.com/in/himanshu-singh-255a57257", name: "LinkedIn" }
            ].map((social, idx) => (
              <motion.a
                key={idx}
                href={social.link}
                target={social.name !== "Email" ? "_blank" : undefined}
                rel={social.name !== "Email" ? "noreferrer" : undefined}
                className="w-11 h-11 border border-border/30 flex items-center justify-center text-textSecondary/50 hover:text-primary hover:border-primary/50 hover:bg-primary/[0.03] transition-all duration-500 shadow-minimal hover:shadow-gold-glow-strong cursor-pointer"
                whileHover={{ y: -4, scale: 1.05 }}
                aria-label={social.name}
              >
                {social.icon}
              </motion.a>
            ))}
          </div>

          {/* Divider Line (Cinematic Fade) */}
          <div className="w-full max-w-5xl h-[1px] bg-gradient-to-r from-transparent via-border/50 to-transparent my-1 opacity-80" />

          {/* Copyright & Tagline */}
          <div className="w-full max-w-5xl">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-[9px] md:text-[10px] uppercase tracking-[0.25em] font-heading font-medium text-textSecondary/80">
              <div className="space-y-1.5 text-center md:text-left">
                <p className="text-textPrimary/80 font-semibold">© {currentYear} Himanshu Kumar Singh</p>
                <p className="text-textSecondary/50 text-[8.5px] tracking-[0.2em] font-normal">Designed & Engineered with Precision</p>
              </div>
              <div className="space-y-1.5 text-center md:text-right">
                <p className="text-textPrimary/80 font-semibold">MERN / AWS Full Stack Developer</p>
                <p className="text-textSecondary/50 text-[8.5px] tracking-[0.18em] font-normal">Ranchi, Jharkhand, India &nbsp;·&nbsp; English (Professional) &nbsp;·&nbsp; Hindi (Native)</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
