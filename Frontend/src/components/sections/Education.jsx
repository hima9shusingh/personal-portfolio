import { motion } from 'framer-motion';

const Education = () => {
  const educationData = [
    {
      degree: "B.Tech in Computer Science and Engineering",
      institution: "Your University Name",
      duration: "2020 - 2024",
      description: "Focused on core computer science subjects, software engineering, and artificial intelligence. Graduated with honors."
    },
    {
      degree: "Higher Secondary Education",
      institution: "Your High School",
      duration: "2018 - 2020",
      description: "Studied Physics, Chemistry, and Mathematics. Participated in national level coding competitions."
    }
  ];

  return (
    <section id="education" className="py-32 bg-surfaceSecondary">
      <div className="container mx-auto px-6">
        <motion.div 
          className="max-w-2xl mx-auto text-center mb-24"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold font-display mb-6 text-textPrimary italic">Academic Background</h2>
          <div className="w-20 h-[2px] bg-secondary mx-auto" />
        </motion.div>

        <div className="max-w-5xl mx-auto space-y-12">
          {educationData.map((item, idx) => (
            <motion.div 
              key={idx}
              className="bg-surface p-12 border-t-[6px] border-t-primary shadow-soft hover:shadow-lift transition-all duration-700 rounded-none flex flex-col md:flex-row justify-between items-start gap-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.2 }}
            >
              <div className="flex-1">
                <h3 className="text-3xl font-bold font-display text-textPrimary mb-4 italic leading-tight">{item.degree}</h3>
                <h4 className="text-xl text-secondary font-bold mb-6 tracking-wide">{item.institution}</h4>
                <p className="text-textSecondary text-[16px] leading-[1.8] font-medium opacity-80">{item.description}</p>
              </div>
              <div className="shrink-0">
                <span className="px-6 py-2 bg-secondary text-background font-bold text-[10px] uppercase tracking-[0.2em] shadow-soft">
                  {item.duration}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
