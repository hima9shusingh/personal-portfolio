import { motion } from 'framer-motion';
import { 
  FaReact, 
  FaNodeJs, 
  FaDatabase, 
  FaHtml5, 
  FaCss3Alt,
  FaTerminal,
  FaJava,
  FaGithub,
  FaAws,
  FaCode,
  FaCube,
  FaMicrochip,
  FaSitemap
} from 'react-icons/fa';
import { 
  SiJavascript, 
  SiTailwindcss, 
  SiPostman, 
  SiPython, 
  SiMongodb, 
  SiExpress, 
  SiNextdotjs,
  SiMysql,
  SiVercel
} from 'react-icons/si';

import { useState, useEffect } from 'react';
import client from '../../api/client';

const Skills = () => {
  const [skillCategories, setSkillCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fallback descriptions since backend doesn't have them
  const categoryDescriptions = {
    "Frontend": "Building responsive, modern, and accessible user interfaces.",
    "Backend": "Designing stable, RESTful, and scalable server-side systems.",
    "Languages": "Writing clean and structured code across multiple paradigms.",
    "Database": "Structuring fast, highly-available, and secure data storage.",
    "Tools & DevOps": "Managing deployments, pipelines, and developer operations.",
    "Core CS": "Applying foundational concepts to build optimized software architectures."
  };

  const skillIcons = {
    "React.js": <FaReact />, "Next.js": <SiNextdotjs />, "HTML5": <FaHtml5 />,
    "CSS3": <FaCss3Alt />, "Tailwind CSS": <SiTailwindcss />,
    "Node.js": <FaNodeJs />, "Express.js": <SiExpress />, "REST API Development": <FaTerminal />,
    "JavaScript": <SiJavascript />, "Java": <FaJava />, "Python": <SiPython />,
    "MongoDB": <SiMongodb />, "MySQL": <SiMysql />,
    "Git": <FaGithub />, "GitHub": <FaGithub />, "AWS": <FaAws />, "Vercel": <SiVercel />,
    "Postman": <SiPostman />, "CI/CD": <FaTerminal />,
    "DSA": <FaCode />, "OOP": <FaCube />, "DBMS": <FaDatabase />,
    "Operating Systems": <FaMicrochip />, "System Design": <FaSitemap />
  };

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await client.get('/skills');
        if (response.data.success) {
          const formatted = response.data.data.map(cat => ({
            title: cat.category,
            description: categoryDescriptions[cat.category] || "Technical skills and proficiencies.",
            skills: cat.skills.map(skill => ({
              name: skill,
              icon: skillIcons[skill] || <FaCode />
            }))
          }));
          setSkillCategories(formatted);
        }
      } catch (error) {
        console.error("Error fetching skills:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSkills();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const headerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
        staggerChildren: 0.12
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

  if (loading) {
    return (
      <section id="skills" className="py-16 md:py-20 bg-surfaceSecondary/20 relative overflow-hidden flex justify-center items-center min-h-[50vh]">
        <div className="w-10 h-10 border-2 border-primary/20 border-t-primary rounded-full animate-spin"></div>
      </section>
    );
  }

  return (
    <section id="skills" className="py-16 md:py-20 bg-surfaceSecondary/20 relative overflow-hidden">
      {/* Accent Background Text */}
      <div className="absolute top-10 left-10 opacity-[0.01] pointer-events-none select-none">
        <h2 className="text-[20vw] font-display font-extrabold whitespace-nowrap">STACK</h2>
      </div>

      <div className="container mx-auto px-6 md:px-16 lg:px-24 relative z-10">
        
        {/* Section Header */}
        <motion.div 
          className="max-w-3xl mx-auto text-center mb-20 md:mb-24"
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.span variants={headerItemVariants} className="text-[9px] uppercase tracking-[0.5em] font-heading font-bold text-primary mb-4 block">Capabilities</motion.span>
          <motion.h2 variants={headerItemVariants} className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-textPrimary mb-8 italic">Technical Artistry.</motion.h2>
          <motion.div variants={headerItemVariants} className="w-20 h-[1px] bg-primary mx-auto" />
        </motion.div>

        {/* Categories Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 max-w-[1440px] mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {skillCategories.map((category) => (
            <motion.div 
              key={category.title}
              variants={cardVariants}
              whileHover={{ y: -6, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } }}
              className="bg-surface/40 backdrop-blur-[12px] border border-border/50 p-8 md:p-9 flex flex-col justify-between hover:border-primary/40 hover:shadow-gold-glow-strong transition-all-500 relative group overflow-hidden cursor-default"
            >
              {/* Corner Ambient Glow */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 -translate-y-12 translate-x-12 group-hover:-translate-y-8 group-hover:translate-x-8 transition-transform duration-700 rounded-full blur-xl pointer-events-none" />

              {/* Fine Editorial Corner Marks */}
              <div className="absolute top-3 left-3 w-1.5 h-1.5 border-t border-l border-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute top-3 right-3 w-1.5 h-1.5 border-t border-r border-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-3 left-3 w-1.5 h-1.5 border-b border-l border-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-3 right-3 w-1.5 h-1.5 border-b border-r border-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="flex flex-col h-full justify-start">
                <div>
                  {/* Category Header */}
                  <h3 className="text-lg font-heading font-semibold text-textPrimary tracking-[0.2em] uppercase mb-3 pb-3 border-b border-border/60 group-hover:border-primary/30 transition-colors duration-300">
                    {category.title}
                  </h3>
                  <p className="text-xs md:text-sm font-sans text-textSecondary/65 mb-6 leading-relaxed tracking-wide">
                    {category.description}
                  </p>
                </div>

                {/* Skills Grid (Row-wise) */}
                <div className="flex flex-col gap-3">
                  {category.skills.map((skill) => (
                    <div 
                      key={skill.name}
                      className="group/skill flex items-center gap-3 py-0.5 transition-transform duration-300 hover:translate-x-0.5"
                    >
                      <span className="text-base text-primary/75 shrink-0 transition-transform duration-300 group-hover/skill:scale-110 group-hover/skill:text-primary">
                        {skill.icon}
                      </span>
                      <span className="font-heading font-medium text-textPrimary uppercase tracking-widest text-[10px] md:text-xs">
                        {skill.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default Skills;
