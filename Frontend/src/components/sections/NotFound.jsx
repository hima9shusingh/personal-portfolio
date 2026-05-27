import { motion } from 'framer-motion';
import { ArrowLeft, Compass } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 text-center relative overflow-hidden paper-grain">
      {/* Decorative Blur Accent */}
      <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-primary/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary/5 rounded-full blur-3xl -z-10" />

      <motion.div 
        className="max-w-lg space-y-8"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        {/* Compass Icon */}
        <div className="w-20 h-20 border border-primary/20 bg-surface flex items-center justify-center text-primary mx-auto shadow-lift hover:scale-105 transition-transform duration-500">
          <Compass className="w-10 h-10 animate-spin-slow" />
        </div>

        {/* 404 Header */}
        <h1 className="text-7xl md:text-8xl font-display font-extrabold text-primary italic leading-none tracking-tighter">
          404.
        </h1>

        {/* Status / Message */}
        <div className="space-y-3">
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-textPrimary uppercase tracking-wider">
            Path Disappeared
          </h2>
          <p className="text-sm md:text-base font-sans text-textSecondary/80 leading-relaxed max-w-sm mx-auto">
            The coordinates you requested do not point to Himanshu's engineering registry. Let's redirect you.
          </p>
        </div>

        {/* Return Button */}
        <div className="pt-4">
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              window.location.href = '/';
            }}
            className="group relative inline-flex items-center gap-3 px-6 py-3 border border-primary text-[10px] md:text-xs font-heading font-bold uppercase tracking-[0.2em] text-primary hover:bg-primary hover:text-background transition-all duration-500 shadow-soft"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Return to Registry</span>
          </a>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFound;
