import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Building2, Briefcase, Award } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import client from '../../api/client';

const Experience = () => {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExperience = async () => {
      try {
        const response = await client.get('/experience');
        if (response.data.success) {
          const formatted = response.data.data.map(exp => ({
            role: exp.role,
            company: exp.company,
            logoText: exp.company.substring(0, 2).toUpperCase(),
            location: exp.location || 'Remote',
            period: `${exp.startDate} - ${exp.endDate}`,
            description: exp.summary,
            githubUrl: null, // Backend schema doesn't have githubUrl for experience
            achievements: exp.accomplishments || [],
            internId: null
          }));
          setExperiences(formatted);
        }
      } catch (error) {
        console.error("Error fetching experience:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchExperience();
  }, []);

  const headerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
        staggerChildren: 0.15
      }
    }
  };

  const headerItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section id="experience" className="py-16 md:py-20 bg-surfaceSecondary/15 relative overflow-hidden">
      {/* Background Text Accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.015] pointer-events-none select-none">
        <h2 className="text-[22vw] font-display font-extrabold whitespace-nowrap">JOURNEY</h2>
      </div>

      <div className="container mx-auto px-6 md:px-16 lg:px-24 relative z-10">
        
        {/* Section Header */}
        <motion.div 
          className="max-w-3xl mx-auto text-center mb-16"
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.span variants={headerItemVariants} className="text-[9px] uppercase tracking-[0.5em] font-heading font-bold text-primary mb-4 block">Professional History</motion.span>
          <motion.h2 variants={headerItemVariants} className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-textPrimary mb-8 italic">The Narrative.</motion.h2>
          <motion.div variants={headerItemVariants} className="w-20 h-[1px] bg-primary mx-auto" />
        </motion.div>

        {/* Timeline container */}
        <div className="relative max-w-4xl mx-auto pl-8 sm:pl-12 md:pl-16">
          
          {/* Vertical line */}
          <div className="absolute left-[15px] sm:left-[23px] md:left-[27px] top-2 bottom-2 w-[1.5px] bg-border" />

          {/* Timeline Nodes */}
          <div className="space-y-16">
            {experiences.map((exp, idx) => (
              <motion.div 
                key={idx}
                className="relative group"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: idx * 0.15 }}
              >
                {/* Node dot */}
                <div className="absolute -left-[28px] sm:-left-[39px] md:-left-[43px] top-1.5 w-[15px] h-[15px] sm:w-[19px] sm:h-[19px] bg-background border-[3px] border-primary rounded-full group-hover:bg-primary group-hover:scale-125 transition-all duration-500 shadow-soft" />

                {/* Content Card */}
                <div className="glass-card p-8 md:p-10 hover:border-primary/40 hover:shadow-gold-glow transition-all duration-300">
                  
                  {/* Card Header */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-border/80 mb-6">
                    <div className="flex items-start gap-4">
                      {/* Company Initials Badge */}
                      <div className="w-12 h-12 bg-primary/10 border border-primary/20 text-primary flex items-center justify-center font-heading font-bold text-sm shrink-0 shadow-minimal">
                        {exp.logoText}
                      </div>
                      <div>
                        <h3 className="text-2xl font-display font-bold text-textPrimary italic leading-tight">
                          {exp.role}
                        </h3>
                        <div className="flex flex-wrap items-center gap-3.5 mt-2.5">
                          <span className="flex items-center gap-1.5 text-xs font-heading font-semibold text-primary uppercase tracking-wider">
                            <Building2 className="w-3.5 h-3.5 text-primary" /> {exp.company}
                          </span>
                          {exp.githubUrl && (
                            <>
                              <span className="w-1 h-1 bg-border rounded-full" />
                              <a 
                                href={exp.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1.5 text-[10px] font-heading font-bold uppercase tracking-wider text-textSecondary/85 hover:text-primary transition-all duration-300 hover:translate-x-0.5"
                              >
                                <FaGithub className="w-3.5 h-3.5 text-primary" /> Repository
                              </a>
                            </>
                          )}
                          <span className="w-1 h-1 bg-border rounded-full" />
                          <span className="text-[10px] text-textSecondary/60 font-sans font-medium">
                            {exp.location}
                          </span>
                          {exp.internId && (
                            <>
                              <span className="w-1 h-1 bg-border rounded-full" />
                              <span className="text-[10px] text-textSecondary/60 font-sans font-medium">
                                ID: {exp.internId}
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="shrink-0 md:self-start">
                      <span className="flex items-center gap-2 px-4 py-2 bg-surface border border-border text-primary font-heading font-bold text-[10px] uppercase tracking-widest shadow-soft">
                        <Calendar className="w-3.5 h-3.5" /> {exp.period}
                      </span>
                    </div>
                  </div>

                  {/* Card Body */}
                  <p className="text-sm text-textSecondary font-sans leading-relaxed mb-6 italic">
                    "{exp.description}"
                  </p>

                  {/* Bullet achievements */}
                  <div className="space-y-3.5">
                    <h4 className="text-[10px] uppercase tracking-[0.2em] font-heading font-bold text-textPrimary">Key Accomplishments:</h4>
                    <ul className="space-y-2.5">
                      {exp.achievements.map((ach, aIdx) => (
                        <li key={aIdx} className="flex items-start gap-3 text-sm font-sans text-textSecondary/80 leading-relaxed">
                          <span className="w-1.5 h-1.5 bg-primary/80 rounded-full mt-1.5 shrink-0" />
                          <span>{ach}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                </div>
              </motion.div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};

export default Experience;
