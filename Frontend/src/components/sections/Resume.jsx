import { motion } from 'framer-motion';
import { FileText, Download, Eye, CheckCircle2, Briefcase, GraduationCap } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import resumePdf from '../../assets/Himanshu Singh - Resume.pdf';

const Resume = () => {
  const highlights = [
    {
      icon: <Briefcase className="w-5 h-5 text-primary" />,
      title: "Fire & Safety Solutions Company",
      subtitle: "Software Developer Intern",
      description: "Architecting a scalable MERN stack business application, engineering secure RESTful APIs, and setting up automated CI/CD pipelines.",
      githubUrl: "https://github.com/hima9shusingh/Fire-Solution-Website"
    },
    {
      icon: <Briefcase className="w-5 h-5 text-primary" />,
      title: "THIRANEX",
      subtitle: "Intern – Full Stack Development",
      description: "Worked on practical full stack development projects under industry mentorship, focusing on scalable web development, responsive UI systems, backend integration, and project-based software engineering workflows. (ID: THX-MAY126-5535)"
    },
    {
      icon: <GraduationCap className="w-5 h-5 text-primary" />,
      title: "Amity University, Ranchi",
      subtitle: "B.Tech in Computer Science & Engineering",
      description: "Pursuing B.Tech CSE (2023 - 2027), focusing on full-stack web architectures and database management."
    }
  ];

  const coreStrengths = [
    "Full-Stack Development (MERN)",
    "Cloud Deployment (AWS & Vercel)",
    "AI/ML Models & Python scripts",
    "RESTful API Architecture",
    "CI/CD Pipeline Automation",
    "Database Query Optimization"
  ];

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
    <section id="resume" className="py-16 md:py-20 bg-surfaceSecondary/15 relative overflow-hidden">
      {/* Background Subtle Accent */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2" />
      
      <div className="container mx-auto px-6 md:px-16 lg:px-24 relative z-10">
        
        {/* Section Header */}
        <motion.div 
          className="max-w-3xl mx-auto text-center mb-20"
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.span variants={headerItemVariants} className="text-[9px] uppercase tracking-[0.5em] font-heading font-bold text-primary mb-4 block">Curriculum Vitae</motion.span>
          <motion.h2 variants={headerItemVariants} className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-textPrimary mb-8 italic">The Document.</motion.h2>
          <motion.div variants={headerItemVariants} className="w-20 h-[1px] bg-primary mx-auto" />
        </motion.div>

        {/* Resume Dashboard Card */}
        <div className="max-w-5xl mx-auto glass-card p-8 md:p-12 hover:border-primary/45 hover:shadow-gold-glow transition-all duration-500">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Left side: Credentials Preview */}
            <div className="lg:col-span-7 space-y-8">
              <div className="border-b border-border/80 pb-5">
                <h3 className="text-2xl font-display font-bold text-textPrimary italic">Himanshu Kumar Singh</h3>
                <p className="text-xs uppercase tracking-[0.25em] font-heading font-bold text-primary mt-1.5">Full Stack Developer | MERN Stack</p>
              </div>

              {/* Quick Highlights */}
              <div className="space-y-6">
                {highlights.map((item, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="w-10 h-10 border border-primary/20 bg-surface flex items-center justify-center shrink-0 shadow-minimal">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="text-sm font-heading font-bold text-textPrimary uppercase tracking-wider">{item.title}</h4>
                      <p className="text-xs font-semibold text-primary uppercase tracking-widest mt-0.5">{item.subtitle}</p>
                      <p className="text-xs text-textSecondary/70 mt-1 leading-relaxed font-sans">{item.description}</p>
                      {item.githubUrl && (
                        <a 
                          href={item.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 mt-2.5 text-[10px] font-heading font-bold uppercase tracking-wider text-textSecondary/85 hover:text-primary transition-all duration-300 hover:translate-x-0.5"
                        >
                          <FaGithub className="w-3.5 h-3.5 text-primary" /> Project Repository
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Core Strengths */}
              <div className="space-y-3.5">
                <h4 className="text-[10px] uppercase tracking-[0.2em] font-heading font-bold text-textPrimary">Core Strengths & Highlights:</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {coreStrengths.map((strength, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs font-sans text-textSecondary/80">
                      <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" />
                      <span>{strength}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right side: Download Actions */}
            <div className="lg:col-span-5 bg-surface border border-border p-8 flex flex-col items-center justify-center text-center h-full min-h-[300px] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full blur-xl -translate-y-8 translate-x-8" />
              
              <FileText className="w-16 h-16 text-primary/70 mb-6 animate-pulse" />
              
              <h4 className="text-lg font-heading font-bold text-textPrimary uppercase tracking-wider mb-2">Looking for a print copy?</h4>
              <p className="text-xs text-textSecondary/60 max-w-xs mb-8 leading-relaxed font-sans">
                Download the verified applicant tracking system (ATS) compliant version of my curriculum vitae for recruiter evaluation.
              </p>

              <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-4 w-full justify-center">
                {/* Download Button */}
                <a 
                  href={`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/resume/download`} 
                  download="Himanshu_Singh_Resume.pdf"
                  className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-primary text-background font-heading font-bold text-[10px] uppercase tracking-[0.2em] shadow-soft hover:shadow-gold-glow-strong hover:-translate-y-0.5 transition-all duration-300"
                >
                  <Download className="w-4 h-4" /> Download PDF
                </a>
                
                {/* View Button */}
                <a 
                  href={`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/resume/download`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-3.5 border border-border text-textPrimary font-heading font-bold text-[10px] uppercase tracking-[0.2em] hover:bg-primary/5 hover:border-primary hover:shadow-gold-glow-strong hover:-translate-y-0.5 transition-all duration-300"
                >
                  <Eye className="w-4 h-4" /> View Online
                </a>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default Resume;
