import { motion } from 'framer-motion';
import { GraduationCap, Sparkles, Briefcase, Award, Code2 } from 'lucide-react';

const About = () => {
  const stats = [
    { label: "Projects Built", value: "2+ Built", desc: "MERN & AI-ML apps", icon: <Code2 className="w-5 h-5" /> },
    { label: "Efficiency Gain", value: "40% Gain", desc: "In client onboarding", icon: <Briefcase className="w-5 h-5" /> },
    { label: "Latency Reduced", value: "25% Less", desc: "Optimized database queries", icon: <Award className="w-5 h-5" /> }
  ];

  const education = [
    {
      degree: "B.Tech in Computer Science & Engineering",
      institution: "Amity University, Ranchi",
      period: "2023 – 2027",
      initials: "AU",
      desc: "Focused on core Computer Science topics, full-stack MERN architectures, database design, and cloud deployments."
    },
    {
      degree: "Higher Secondary Certificate (Class XII)",
      institution: "S.M.D. College, Nechua Jalalpur",
      period: "2023",
      gradeType: "Board",
      grade: "BSEB",
      initials: "SMD",
      desc: "Concentrated on core science streams including Physics, Chemistry, and Mathematics."
    },
    {
      degree: "Secondary School Certificate (Class X)",
      institution: "Bihar Vikas Vidyalaya",
      period: "2021",
      gradeType: "Board",
      grade: "CBSE",
      initials: "BVV",
      desc: "Completed secondary school education with strong performance in science and mathematics."
    }
  ];

  return (
    <section id="about" className="py-16 md:py-20 bg-background relative overflow-hidden">
      {/* Decorative Background Blur */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-surfaceSecondary/20 -z-10 blur-[120px]" />
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-primary/5 -z-10 blur-[100px]" />

      <div className="container mx-auto px-6 md:px-16 lg:px-24">
        {/* Main Grid: Info + Dashboard */}
        <div className="flex flex-col lg:flex-row items-start gap-16 lg:gap-24 max-w-[1440px] mx-auto">
          
          {/* LEFT COLUMN: Dashboard & Achievement Metrics */}
          <motion.div 
            className="w-full lg:w-5/12 space-y-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            {/* 1. Quick Info Card */}
            <div className="relative group max-w-[480px] lg:max-w-none mx-auto lg:mx-0">
              <div className="absolute -top-4 -left-4 w-full h-full border border-primary/20 -z-10 translate-x-2 translate-y-2 group-hover:translate-x-1 group-hover:translate-y-1 transition-transform duration-700" />
              
              <div className="bg-surface p-8 border border-border shadow-lift relative space-y-6">
                <div className="border-b border-border/80 pb-4">
                  <h3 className="text-[10px] md:text-xs uppercase tracking-[0.3em] font-heading font-bold text-primary mb-1">Developer DNA</h3>
                  <h4 className="text-base md:text-lg font-display font-bold text-textPrimary italic">Himanshu Singh</h4>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2.5 shrink-0" />
                    <div>
                      <h5 className="text-[11px] md:text-xs font-heading font-bold uppercase tracking-wider text-textPrimary">Technical Philosophy</h5>
                      <p className="text-xs text-textSecondary/80 mt-1 leading-relaxed">Clean abstractions, modular codebases, minimizing latency. Build once, scale forever.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2.5 shrink-0" />
                    <div>
                      <h5 className="text-[11px] md:text-xs font-heading font-bold uppercase tracking-wider text-textPrimary">Core Strengths</h5>
                      <p className="text-xs text-textSecondary/80 mt-1 leading-relaxed">MERN stack architecture, RESTful API design, AWS deployments, and CI/CD automation.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2.5 shrink-0" />
                    <div>
                      <h5 className="text-[11px] md:text-xs font-heading font-bold uppercase tracking-wider text-textPrimary">Work Quality</h5>
                      <p className="text-xs text-textSecondary/80 mt-1 leading-relaxed">Performance-optimized, scalable, and production-deployed deliverables.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 2. Achievement Grid */}
            <div className="grid grid-cols-2 gap-4 max-w-[480px] lg:max-w-none mx-auto lg:mx-0">
              {[
                { value: "2+", label: "Projects Built", desc: "Open-source & production ready" },
                { value: "40%", label: "Efficiency Gain", desc: "For client onboarding" },
                { value: "25%", label: "Latency Reduced", desc: "In database query retrieval" },
                { value: "20+", label: "Tech Skills", desc: "In developer stack" }
              ].map((item, idx) => (
                <div key={idx} className="bg-surface/50 border border-border/80 p-5 hover:border-primary/30 transition-colors duration-300">
                  <span className="text-2xl font-display font-extrabold text-primary tracking-tight">{item.value}</span>
                  <h4 className="text-[10px] md:text-xs font-heading font-bold uppercase tracking-wider text-textPrimary mt-1">{item.label}</h4>
                  <p className="text-[9px] md:text-[10px] text-textSecondary/60 mt-0.5 leading-snug">{item.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* RIGHT COLUMN: Details */}
          <motion.div 
            className="w-full lg:w-7/12 space-y-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.1 }}
          >
            {/* Header label */}
            <div className="flex items-center gap-4">
              <span className="text-[10px] md:text-xs uppercase tracking-[0.5em] font-heading font-bold text-primary flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" /> Professional Narrative
              </span>
              <div className="flex-1 h-[1px] bg-border" />
            </div>

            {/* Main title */}
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-textPrimary leading-tight italic">
              Crafting <span className="text-primary underline decoration-primary/20 underline-offset-8">Timeless</span> Architectures.
            </h2>

            {/* Short Bio & Career Objective */}
            <div className="space-y-6 text-base md:text-lg font-sans text-textSecondary leading-relaxed">
              <p>
                I am <strong className="text-textPrimary font-semibold font-heading">Himanshu Singh</strong>, a software developer committed to engineering reliable full-stack applications. My design philosophy bridges clean backend logic with responsive, highly polished user interfaces.
              </p>
              <div className="p-6 border-l-2 border-primary bg-surfaceSecondary/20 italic font-display">
                <h4 className="text-xs md:text-sm uppercase tracking-[0.2em] font-heading font-bold text-textPrimary mb-2 not-italic">Career Objective</h4>
                "To deliver highly maintainable codebases and innovative technical strategies — ensuring every product achieves speed, accessibility, and real business impact."
              </div>
            </div>

            {/* Experience Summary / Stats Grid */}
            <div className="space-y-4">
              <h3 className="text-xs md:text-sm uppercase tracking-[0.3em] font-heading font-bold text-textPrimary">Experience Summary</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {stats.map((stat, i) => (
                  <div key={i} className="glass-card p-6 flex flex-col justify-between items-start min-h-[140px]">
                    <div className="text-primary mb-3">{stat.icon}</div>
                    <div>
                      <h4 className="text-2xl font-display font-extrabold text-textPrimary tracking-tight">{stat.value}</h4>
                      <p className="text-[11px] md:text-xs font-heading font-bold uppercase tracking-wider text-textPrimary mt-1">{stat.label}</p>
                      <p className="text-[10px] md:text-xs text-textSecondary/60 mt-1 leading-snug">{stat.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>


          </motion.div>
        </div>

        {/* Education Subsection: Full Width */}
        <motion.div 
          className="space-y-6 pt-12 border-t border-border mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15 }}
        >
          <div className="flex items-center gap-2.5 text-primary">
            <GraduationCap className="w-5 h-5" />
            <h3 className="text-xs md:text-sm uppercase tracking-[0.3em] font-heading font-bold text-textPrimary">Education</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {education.map((item, idx) => (
              <div key={idx} className="bg-surface p-6 border border-border/80 hover:border-primary/20 shadow-soft hover:shadow-gold-glow transition-all duration-300 flex gap-4">
                {/* Initials Badge */}
                <div className="w-10 h-10 rounded-none bg-primary/10 border border-primary/25 text-primary flex items-center justify-center font-heading font-bold text-xs shrink-0 self-start shadow-minimal">
                  {item.initials}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start gap-3 mb-2">
                    <h4 className="text-xs sm:text-sm font-heading font-bold text-textPrimary leading-snug">{item.degree}</h4>
                    <span className="text-[9px] font-heading font-bold text-primary uppercase tracking-widest bg-primary/5 px-2 py-0.5 border border-primary/10 shrink-0">
                      {item.period}
                    </span>
                  </div>
                  
                  <p className="text-[10px] sm:text-[11px] font-heading font-semibold text-textSecondary uppercase tracking-widest mb-1.5">{item.institution}</p>
                  
                  {/* Grade display */}
                  {item.gradeType && item.grade && (
                    <p className="text-[10px] font-heading font-bold uppercase tracking-wider text-textPrimary/80 mb-2">
                      {item.gradeType}: <span className="text-primary">{item.grade}</span>
                    </p>
                  )}
                  
                  <p className="text-xs text-textSecondary/70 leading-relaxed font-sans">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
