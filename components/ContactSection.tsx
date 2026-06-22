'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Mail, Linkedin, Github, MessageCircle, Send, Check, MapPin, Phone, ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const contactLinks = [
  {
    icon: <Mail className="w-5 h-5" />,
    label: 'Email',
    value: 'dhananjayverma@email.com',
    href: 'mailto:dhananjayverma@email.com',
    color: '#0ea5e9',
  },
  {
    icon: <Linkedin className="w-5 h-5" />,
    label: 'LinkedIn',
    value: 'linkedin.com/in/dhananjayverma',
    href: 'https://linkedin.com/in/dhananjayverma',
    color: '#0ea5e9',
  },
  {
    icon: <Github className="w-5 h-5" />,
    label: 'GitHub',
    value: 'github.com/dhananjayverma',
    href: 'https://github.com/dhananjayverma',
    color: '#8b5cf6',
  },
  {
    icon: <MessageCircle className="w-5 h-5" />,
    label: 'WhatsApp',
    value: '+91 98765 43210',
    href: 'https://wa.me/919876543210',
    color: '#22c55e',
  },
];

export default function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setSubmitted(true);
    toast.success('Message sent successfully!');
    setTimeout(() => setSubmitted(false), 3000);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section id="contact" className="relative py-28 px-4 sm:px-6 lg:px-8 section-gradient-4">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <motion.div
            className="inline-block mb-4"
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ type: 'spring', duration: 0.6 }}
          >
            <span className="text-sm font-semibold text-violet-600 bg-violet-50 px-4 py-1.5 rounded-full border border-violet-200">
              <Sparkles className="w-3 h-3 inline mr-1" />
              Connect
            </span>
          </motion.div>
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-slate-800">
            Get In Touch
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-lg">
            Have a project in mind or want to discuss opportunities? I am always open to new challenges.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="glass-card-strong p-8 h-full">
              <h3 className="text-xl font-bold text-slate-800 mb-6">Let&apos;s Connect</h3>

              <div className="space-y-4 mb-8">
                {contactLinks.map((link, index) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 rounded-xl hover:bg-slate-50 transition-colors group"
                    initial={{ opacity: 0, y: 10 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                    whileHover={{ x: 4 }}
                  >
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: `${link.color}15`, color: link.color }}
                    >
                      {link.icon}
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-bold text-slate-800">{link.label}</div>
                      <div className="text-xs text-slate-400">{link.value}</div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-sky-500 transition-colors" />
                  </motion.a>
                ))}
              </div>

              <div className="flex items-center gap-4 text-sm text-slate-400">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>Bangalore / Gurgaon, India</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <span>+91 98765 43210</span>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="glass-card-strong p-8">
              <h3 className="text-xl font-bold text-slate-800 mb-6">Send a Message</h3>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-sm text-slate-500 mb-2 block">Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-800 text-sm focus:outline-none focus:border-sky-400 transition-colors"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label className="text-sm text-slate-500 mb-2 block">Email</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-800 text-sm focus:outline-none focus:border-sky-400 transition-colors"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label className="text-sm text-slate-500 mb-2 block">Message</label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-800 text-sm focus:outline-none focus:border-sky-400 transition-colors resize-none"
                    placeholder="Tell me about your project..."
                  />
                </div>

                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    type="submit"
                    disabled={isSubmitting || submitted}
                    className="w-full btn-gradient text-white rounded-full py-6 transition-all"
                  >
                    {isSubmitting ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      >
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full" />
                      </motion.div>
                    ) : submitted ? (
                      <span className="flex items-center gap-2">
                        <Check className="w-4 h-4" /> Sent!
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Send className="w-4 h-4" /> Send Message
                      </span>
                    )}
                  </Button>
                </motion.div>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
