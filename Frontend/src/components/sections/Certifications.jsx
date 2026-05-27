import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Award, ExternalLink, ShieldCheck } from 'lucide-react';
import client from '../../api/client';

const Certifications = () => {
  const [certs, setCerts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCerts = async () => {
      try {
        const response = await client.get('/certifications');
        if (response.data.success) {
          const formatted = response.data.data.map(cert => ({
            title: cert.name,
            issuer: cert.issuer,
            date: cert.issueDate || null,
            link: cert.certificateLink || null,
            credentialId: cert.credentialId || null
          }));
          setCerts(formatted);
        }
      } catch (error) {
        console.error("Error fetching certifications:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCerts();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
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
    <section id="certifications" className="py-16 md:py-20 bg-background relative overflow-hidden">
      {/* Background Accent Blur */}
      <div className="absolute top-1/2 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2" />

      <div className="container mx-auto px-6 md:px-16 lg:px-24">

        {/* Section Header */}
        <motion.div
          className="max-w-3xl mx-auto text-center mb-24"
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.span variants={headerItemVariants} className="text-[9px] uppercase tracking-[0.5em] font-heading font-bold text-primary mb-4 block">Verified Accolades</motion.span>
          <motion.h2 variants={headerItemVariants} className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-textPrimary mb-8 italic">Certifications.</motion.h2>
          <motion.div variants={headerItemVariants} className="w-20 h-[1px] bg-primary mx-auto" />
        </motion.div>

        {/* Certifications Grid */}
        <motion.div
          className="flex justify-center max-w-2xl mx-auto w-full"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {certs.map((cert, idx) => (
            <motion.div
              key={idx}
              variants={cardVariants}
              className="glass-card p-8 flex items-start gap-6 hover:border-primary/45 hover:shadow-gold-glow relative group overflow-hidden border-l-2 border-primary w-full"
            >
              {/* Badge Icon */}
              <div className="w-14 h-14 border border-primary/20 flex items-center justify-center shrink-0 bg-surface text-primary shadow-minimal group-hover:scale-105 transition-transform duration-500">
                <Award className="w-6 h-6 text-primary" />
              </div>

              {/* Certification Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-4 mb-2.5">
                  <h3 className="text-lg font-heading font-bold text-textPrimary leading-snug group-hover:text-primary transition-colors">
                    {cert.title}
                  </h3>
                  {cert.date && (
                    <span className="text-[10px] font-heading font-bold text-textSecondary bg-surfaceSecondary/50 border border-border px-2.5 py-1 shrink-0 uppercase tracking-widest">
                      {cert.date}
                    </span>
                  )}
                </div>

                <p className="text-sm font-semibold text-textSecondary uppercase tracking-widest mb-1">{cert.issuer}</p>
                {cert.credentialId && (
                  <div className="flex items-center gap-1.5 text-[11px] text-textSecondary/65 font-sans tracking-wide mb-6">
                    <ShieldCheck className="w-3.5 h-3.5 text-primary" /> Credential ID: {cert.credentialId}
                  </div>
                )}

                {/* Verify Button */}
                {cert.link && (
                  <div className="border-t border-border/80 pt-4 mt-6">
                    <a
                      href={cert.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-[10px] md:text-xs font-heading font-bold uppercase tracking-widest text-primary hover:text-secondary transition-colors"
                    >
                      View Certificate ↗
                    </a>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default Certifications;
