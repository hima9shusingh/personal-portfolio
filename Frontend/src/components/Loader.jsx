import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const Loader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => onComplete(), 500);
          return 100;
        }
        return prev + 2;
      });
    }, 30);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-background"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: -100, transition: { duration: 0.8, ease: "easeInOut" } }}
    >
      <div className="relative w-64 h-1 bg-primary/10 rounded-full overflow-hidden">
        <motion.div
          className="absolute top-0 left-0 h-full bg-primary"
          initial={{ width: '0%' }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.1 }}
        />
      </div>
      <motion.div 
        className="mt-6 text-2xl font-display font-bold tracking-widest text-textPrimary"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        {progress}%
      </motion.div>
      <div className="mt-2 text-[10px] text-textSecondary/50 tracking-[0.4em] uppercase font-bold font-heading">
        Initializing Narrative
      </div>
    </motion.div>
  );
};

export default Loader;
