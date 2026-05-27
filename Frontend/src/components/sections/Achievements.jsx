import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const Counter = ({ end, label, suffix = "" }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 2000;
    const increment = end / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [end]);

  return (
    <div className="flex flex-col items-center justify-center p-8 text-center border border-accent/20">
      <div className="text-6xl md:text-7xl font-bold font-display text-background mb-4 italic tracking-tight">
        {count}{suffix}
      </div>
      <div className="text-accent font-bold uppercase tracking-[0.3em] text-[10px]">
        {label}
      </div>
    </div>
  );
};

const Achievements = () => {
  return (
    <section id="achievements" className="py-24 bg-primary shadow-inner">
      <div className="container mx-auto px-6">
        <motion.div 
          className="max-w-[1440px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
        >
          <Counter end={25} label="Legacy Projects" suffix="+" />
          <Counter end={50} label="Source Repositories" suffix="+" />
          <Counter end={10} label="Curated Credentials" />
          <Counter end={1500} label="Hours of Craft" suffix="+" />
        </motion.div>
      </div>
    </section>
  );
};

export default Achievements;
