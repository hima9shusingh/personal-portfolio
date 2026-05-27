import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Send, CheckCircle2, MessageSquare } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import client from '../../api/client';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [toast, setToast] = useState({ message: '', type: '', visible: false });

  const showToast = (message, type = 'success') => {
    setToast({ message, type, visible: true });
    setTimeout(() => {
      setToast(prev => ({ ...prev, visible: false }));
    }, 4000);
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) {
      errors.name = "Name is required";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      errors.email = "Invalid email format";
    }
    if (!formData.message.trim()) {
      errors.message = "Message is required";
    } else if (formData.message.trim().length < 20) {
      errors.message = "Message must be at least 20 characters";
    }
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      showToast("Please correct the errors before dispatching.", "error");
      return;
    }
    setFormErrors({});
    setIsSubmitting(true);

    try {
      const response = await client.post('/contact', formData);
      if (response.data.success) {
        setIsSubmitted(true);
        showToast("Message sent! I'll reply within 24 hours", "success");
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setIsSubmitted(false), 5000); // Reset success screen after 5s
      } else {
        showToast(response.data.message || "Failed to dispatch message.", "error");
      }
    } catch (error) {
      if (error.response && error.response.status === 429) {
        showToast("Rate limit exceeded. Please try again later.", "error");
      } else {
        showToast("Network error. Please try again later.", "error");
      }
      console.error("Error submitting contact form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-16 md:py-20 bg-background overflow-hidden relative">
      {/* Background Glow Accent */}
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl -translate-x-1/4 translate-y-1/4" />

      <div className="container mx-auto px-6 md:px-16 lg:px-24 relative z-10">
        <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row gap-16 lg:gap-24">

          {/* Left Side: Editorial Info & Socials */}
          <motion.div
            className="w-full lg:w-1/2 space-y-12"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="space-y-4">
              <span className="text-[9px] uppercase tracking-[0.5em] font-heading font-bold text-primary">Get in Touch</span>
              <h2 className="text-5xl md:text-7xl font-display font-bold text-textPrimary leading-none italic">
                Let's Build <br /> <span className="text-primary font-sans not-italic">Greatness.</span>
              </h2>
            </div>

            <p className="text-base md:text-lg font-sans text-textSecondary leading-relaxed max-w-lg">
              Seeking a developer with engineering rigor and design precision? I am available for full-time opportunities, consulting contracts, and innovative collaborations.
            </p>

            {/* Social Contact list */}
            <div className="space-y-8 pt-4">

              {/* Email */}
              <a
                href="mailto:himanshsingh.bit9995@gmail.com"
                className="flex items-center gap-6 group hover:translate-x-1 transition-transform duration-300 w-fit"
              >
                <div className="w-14 h-14 rounded-none border border-border flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-background group-hover:border-primary transition-all duration-500 shadow-minimal">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="space-y-0.5">
                  <p className="text-[10px] uppercase tracking-[0.3em] font-heading font-bold text-textSecondary/60">Direct Mailbox</p>
                  <p className="text-lg font-heading font-bold text-textPrimary">himanshsingh.bit9995@gmail.com</p>
                </div>
              </a>

              {/* LinkedIn */}
              <a
                href="https://linkedin.com/in/himanshu-singh-255a57257"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-6 group hover:translate-x-1 transition-transform duration-300 w-fit"
              >
                <div className="w-14 h-14 rounded-none border border-border flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-background group-hover:border-primary transition-all duration-500 shadow-minimal">
                  <FaLinkedin className="w-5 h-5" />
                </div>
                <div className="space-y-0.5">
                  <p className="text-[10px] uppercase tracking-[0.3em] font-heading font-bold text-textSecondary/60">Professional Profile</p>
                  <p className="text-lg font-heading font-bold text-textPrimary">linkedin.com/in/himanshu-singh-255a57257</p>
                </div>
              </a>

              {/* GitHub */}
              <a
                href="https://github.com/hima9shusingh"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-6 group hover:translate-x-1 transition-transform duration-300 w-fit"
              >
                <div className="w-14 h-14 rounded-none border border-border flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-background group-hover:border-primary transition-all duration-500 shadow-minimal">
                  <FaGithub className="w-5 h-5" />
                </div>
                <div className="space-y-0.5">
                  <p className="text-[10px] uppercase tracking-[0.3em] font-heading font-bold text-textSecondary/60">Open Source</p>
                  <p className="text-lg font-heading font-bold text-textPrimary">github.com/hima9shusingh</p>
                </div>
              </a>

            </div>
          </motion.div>

          {/* Right Side: Form */}
          <motion.div
            className="w-full lg:w-1/2"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 }}
          >
            <div className="glass-card p-10 md:p-14 relative overflow-hidden border border-border/80 hover:shadow-gold-glow hover:border-primary/30 transition-all duration-500">

              <AnimatePresence mode="wait">
                {!isSubmitted ? (
                  <motion.form
                    key="contact-form"
                    onSubmit={handleSubmit}
                    className="space-y-10 relative z-10"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                    noValidate
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                      {/* Name input */}
                      <div className="space-y-2 flex flex-col">
                        <label className="text-xs uppercase tracking-[0.3em] font-heading font-bold text-textPrimary">Your Name</label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => {
                            setFormData({ ...formData, name: e.target.value });
                            if (formErrors.name) setFormErrors({ ...formErrors, name: '' });
                          }}
                          placeholder="Enter your name"
                          className={`w-full bg-surface/50 border px-4 py-3 font-sans text-sm focus:outline-none focus:border-primary focus:shadow-gold-glow-strong transition-all duration-300 placeholder:text-textSecondary/35 text-textPrimary ${
                            formErrors.name ? 'border-red-500/50' : 'border-border/80'
                          }`}
                        />
                        {formErrors.name && (
                          <span className="text-[10px] text-red-400 font-heading tracking-wider mt-1">{formErrors.name}</span>
                        )}
                      </div>

                      {/* Email input */}
                      <div className="space-y-2 flex flex-col">
                        <label className="text-xs uppercase tracking-[0.3em] font-heading font-bold text-textPrimary">Email Address</label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => {
                            setFormData({ ...formData, email: e.target.value });
                            if (formErrors.email) setFormErrors({ ...formErrors, email: '' });
                          }}
                          placeholder="Enter your email"
                          className={`w-full bg-surface/50 border px-4 py-3 font-sans text-sm focus:outline-none focus:border-primary focus:shadow-gold-glow-strong transition-all duration-300 placeholder:text-textSecondary/35 text-textPrimary ${
                            formErrors.email ? 'border-red-500/50' : 'border-border/80'
                          }`}
                        />
                        {formErrors.email && (
                          <span className="text-[10px] text-red-400 font-heading tracking-wider mt-1">{formErrors.email}</span>
                        )}
                      </div>
                    </div>

                    {/* Message input */}
                    <div className="space-y-2 flex flex-col">
                      <label className="text-xs uppercase tracking-[0.3em] font-heading font-bold text-textPrimary">The Message</label>
                      <textarea
                        rows="4"
                        required
                        value={formData.message}
                        onChange={(e) => {
                          setFormData({ ...formData, message: e.target.value });
                          if (formErrors.message) setFormErrors({ ...formErrors, message: '' });
                        }}
                        placeholder="Outline your requirements or opportunities..."
                        className={`w-full bg-surface/50 border px-4 py-3 font-sans text-sm focus:outline-none focus:border-primary focus:shadow-gold-glow-strong transition-all duration-300 resize-none placeholder:text-textSecondary/35 text-textPrimary ${
                          formErrors.message ? 'border-red-500/50' : 'border-border/80'
                        }`}
                      ></textarea>
                      {formErrors.message && (
                        <span className="text-[10px] text-red-400 font-heading tracking-wider mt-1">{formErrors.message}</span>
                      )}
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="group relative w-full py-5 bg-primary text-background font-heading font-bold text-[10px] uppercase tracking-[0.4em] transition-all duration-300 hover:shadow-gold-glow-strong hover:-translate-y-0.5 overflow-hidden cursor-pointer"
                    >
                      <span className="relative z-10 flex items-center justify-center gap-3">
                        {isSubmitting ? "Dispatching..." : "Dispatch Message"}
                        {!isSubmitting && <Send className="w-3.5 h-3.5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />}
                      </span>
                      <div className="absolute inset-0 bg-secondary -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />
                    </button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success-message"
                    className="flex flex-col items-center justify-center py-16 text-center space-y-6"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <CheckCircle2 className="w-16 h-16 text-primary animate-pulse-glow" />
                    <div className="space-y-2">
                      <h3 className="text-2xl font-display font-bold text-textPrimary italic">Message Dispatched.</h3>
                      <p className="text-xs uppercase tracking-widest font-heading font-bold text-primary">Thank you for your correspondence.</p>
                    </div>
                    <p className="text-sm font-sans text-textSecondary/70 max-w-sm">
                      I have received your transmission and will review it promptly. Expect a reply within one business day.
                    </p>
                    <button
                      onClick={() => setIsSubmitted(false)}
                      className="mt-6 text-[9px] font-heading font-bold uppercase tracking-[0.2em] text-textPrimary hover:text-primary transition-colors border-b border-primary/20 pb-1"
                    >
                      Send another message
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          </motion.div>
        </div>
      </div>

      {/* Floating Amber Success/Error Toast */}
      <AnimatePresence>
        {toast.visible && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className={`fixed bottom-8 right-8 z-[9999] flex items-center gap-3 px-6 py-4 shadow-gold-glow border backdrop-blur-md rounded-none ${
              toast.type === 'success' 
                ? 'bg-background/95 border-primary text-textPrimary' 
                : 'bg-background/95 border-red-500/50 text-red-400'
            }`}
          >
            {toast.type === 'success' ? (
              <CheckCircle2 className="w-5 h-5 text-primary shrink-0 animate-pulse-glow" />
            ) : (
              <MessageSquare className="w-5 h-5 text-red-400 shrink-0" />
            )}
            <div className="font-heading text-xs uppercase tracking-widest font-bold">
              {toast.message}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Contact;
