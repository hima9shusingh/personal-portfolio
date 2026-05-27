import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, ExternalLink, AlertCircle } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import disasterDashboard from '../../assets/disaster_dashboard.png';
import trafficDashboard from '../../assets/traffic_dashboard.png';
import client from '../../api/client';

const Projects = () => {
  const [activeTab, setActiveTab] = useState('ALL');
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fallback images based on title or category to preserve design
  const getImageForProject = (title) => {
    if (title.toLowerCase().includes('disaster')) return disasterDashboard;
    if (title.toLowerCase().includes('traffic')) return trafficDashboard;
    return "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=2070&auto=format&fit=crop";
  };

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await client.get('/projects' + (activeTab !== 'ALL' ? `?category=${activeTab.toLowerCase()}` : ''));
        if (response.data.success) {
          const formatted = response.data.data.map(p => ({
            title: p.title,
            description: p.description,
            tech: p.techStack,
            category: p.category.toUpperCase(),
            featured: p.featured,
            liveUrl: p.liveLink, // separate liveLink and githubLink for distinct buttons
            githubUrl: p.githubLink,
            image: getImageForProject(p.title)
          }));
          setProjects(formatted);
        } else {
          setError("Failed to fetch projects data.");
        }
      } catch (error) {
        console.error("Error fetching projects:", error);
        setError("Network error. Unable to load projects at this time.");
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, [activeTab]);

  const tabs = ['ALL', 'FRONTEND', 'SIMULATION', 'AI-ML'];
  const filteredProjects = projects;

  const isValidUrl = (url) => {
    if (!url) return false;
    try {
      new URL(url);
      return true;
    } catch (_) {
      return false;
    }
  };

  const handleLinkClick = (e, url) => {
    e.stopPropagation(); // prevent triggering card click
    if (isValidUrl(url)) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  const handleCardClick = (project) => {
    const targetUrl = project.liveUrl || project.githubUrl;
    if (isValidUrl(targetUrl)) {
      window.open(targetUrl, '_blank', 'noopener,noreferrer');
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
    <section id="projects" className="py-16 md:py-20 bg-background">
      <div className="container mx-auto px-6 md:px-16 lg:px-24">
        
        {/* Section Header */}
        <motion.div 
          className="max-w-3xl mx-auto text-center mb-24"
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.span variants={headerItemVariants} className="text-[9px] uppercase tracking-[0.5em] font-heading font-bold text-primary mb-4 block">Selected Works</motion.span>
          <motion.h2 variants={headerItemVariants} className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-textPrimary mb-8 italic">The Collection.</motion.h2>
          <motion.div variants={headerItemVariants} className="w-20 h-[1px] bg-primary mx-auto" />
        </motion.div>
 
        {/* Tab Filters */}
        <div className="flex flex-wrap justify-center gap-8 md:gap-12 mb-20">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`text-[10px] md:text-xs uppercase tracking-[0.4em] font-heading font-bold transition-all duration-300 relative py-2 px-1 focus:outline-none cursor-pointer ${
                activeTab === tab ? 'text-primary' : 'text-textSecondary/55 hover:text-textPrimary'
              }`}
            >
              {tab}
              {activeTab === tab && (
                <motion.div 
                  layoutId="activeProjectTab"
                  className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-primary"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>
 
        {/* Status Indicators (Loading/Error) */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        {error && !loading && (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <AlertCircle className="w-12 h-12 text-primary mb-4 opacity-80" />
            <h3 className="text-xl font-display text-textPrimary mb-2">Projects Unavailable</h3>
            <p className="text-textSecondary text-sm max-w-md mx-auto">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="mt-6 px-6 py-2 bg-primary/10 text-primary font-heading uppercase tracking-widest text-[10px] border border-primary/20 hover:bg-primary hover:text-background transition-all duration-300"
            >
              Retry
            </button>
          </div>
        )}

        {/* Projects Grid */}
        {!loading && !error && (
          <motion.div 
            layout 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 max-w-[1440px] mx-auto"
          >
            <AnimatePresence mode="wait">
              {filteredProjects.map((project, idx) => (
                <motion.div 
                  key={project.title}
                  layout
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 40 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: idx * 0.1 }}
                  onClick={() => handleCardClick(project)}
                  className={`glass-card flex flex-col h-full rounded-none group overflow-hidden border border-border/80 transition-all duration-500 hover:border-primary/40 hover:shadow-gold-glow ${(project.liveUrl || project.githubUrl) ? 'cursor-pointer' : ''}`}
                >
                  {/* Image Container */}
                  <div className="relative h-[260px] sm:h-[320px] w-full overflow-hidden bg-surfaceSecondary/30 border-b border-border">
                    {/* Inner frame highlights */}
                    <div className="absolute inset-3 border border-primary/15 pointer-events-none z-20 transition-all duration-500 group-hover:inset-4" />
                    
                    {/* Fine Editorial Corner Marks */}
                    <div className="absolute top-4 left-4 w-1.5 h-1.5 border-t border-l border-primary/45 z-20" />
                    <div className="absolute top-4 right-4 w-1.5 h-1.5 border-t border-r border-primary/45 z-20" />
                    <div className="absolute bottom-4 left-4 w-1.5 h-1.5 border-b border-l border-primary/45 z-20" />
                    <div className="absolute bottom-4 right-4 w-1.5 h-1.5 border-b border-r border-primary/45 z-20" />

                    <img 
                      src={project.image} 
                      alt={project.title} 
                      loading="lazy"
                      className="w-full h-full object-cover grayscale sepia-[0.35] hue-rotate-[10deg] brightness-[0.9] saturate-[1.25] group-hover:grayscale-0 group-hover:sepia-0 group-hover:brightness-100 group-hover:saturate-100 group-hover:scale-105 transition-all duration-1000 ease-out"
                    />
                    
                    {/* Floating Badges */}
                    <div className="absolute top-6 left-6 flex flex-col gap-2 z-20">
                      {project.featured && (
                        <span className="flex items-center gap-1 bg-primary text-background text-[10px] font-heading font-bold uppercase tracking-widest px-3 py-1 shadow-soft border border-primary/20">
                          <Award className="w-3 h-3" /> Featured Work
                        </span>
                      )}
                    </div>

                    <div className="absolute top-6 right-6 px-3 py-1 bg-background/90 backdrop-blur-sm border border-border shadow-soft z-20">
                      <span className="text-[10px] font-heading font-bold uppercase tracking-[0.2em] text-primary">{project.category}</span>
                    </div>
                  </div>

                  {/* Project Details */}
                  <div className="p-8 flex-1 flex flex-col justify-between space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-2xl font-display font-bold text-textPrimary italic group-hover:text-primary transition-colors duration-300">{project.title}</h3>
                      </div>
                      
                      <p className="text-textSecondary/80 text-sm leading-relaxed font-sans line-clamp-2">
                        {project.description}
                      </p>
                      
                      {/* Tech Stack Badges */}
                      <div className="flex flex-wrap gap-2 pt-2">
                        {project.tech.map((tech) => (
                          <span 
                            key={tech} 
                            className="text-[10px] font-heading font-semibold uppercase tracking-widest text-primary border border-primary/25 bg-primary/5 px-2.5 py-1"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Actions (Recruiter Friendly - Permanently visible) */}
                    <div className="pt-4 border-t border-border/80 flex gap-3">
                      {isValidUrl(project.githubUrl) && (
                        <button 
                          type="button"
                          onClick={(e) => handleLinkClick(e, project.githubUrl)}
                          className="flex-1 flex items-center justify-center gap-2 py-3 bg-primary text-background font-heading font-bold text-[10px] md:text-xs uppercase tracking-[0.25em] transition-all duration-300 hover:shadow-gold-glow-strong hover:-translate-y-0.5 cursor-pointer border-none"
                        >
                          <FaGithub className="w-3.5 h-3.5" /> Source
                        </button>
                      )}
                      
                      {isValidUrl(project.liveUrl) && (
                        <button 
                          type="button"
                          onClick={(e) => handleLinkClick(e, project.liveUrl)}
                          className="flex-1 flex items-center justify-center gap-2 py-3 bg-transparent border border-primary/50 text-primary font-heading font-bold text-[10px] md:text-xs uppercase tracking-[0.25em] transition-all duration-300 hover:bg-primary/5 hover:border-primary hover:-translate-y-0.5 cursor-pointer"
                        >
                          <ExternalLink className="w-3.5 h-3.5" /> Live Demo
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Projects;
