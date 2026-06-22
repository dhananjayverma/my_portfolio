'use client';

import { motion } from 'framer-motion';
import { Heart, Github, Linkedin, Mail, ArrowUp } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative py-12 px-4 sm:px-6 lg:px-8 border-t border-slate-200/50">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <motion.div
            className="text-xl font-bold text-gradient"
            whileHover={{ scale: 1.05 }}
          >
            DV
          </motion.div>

          <div className="flex items-center gap-4">
            <a href="https://github.com/dhananjayverma" target="_blank" rel="noopener noreferrer"
              className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:text-sky-500 hover:border-sky-300 transition-all"
            >
              <Github className="w-4 h-4" />
            </a>
            <a href="https://linkedin.com/in/dhananjayverma" target="_blank" rel="noopener noreferrer"
              className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:text-sky-500 hover:border-sky-300 transition-all"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a href="mailto:dhananjayverma@email.com"
              className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:text-sky-500 hover:border-sky-300 transition-all"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>

          <motion.button
            onClick={scrollToTop}
            className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:text-sky-500 hover:border-sky-300 transition-all"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowUp className="w-4 h-4" />
          </motion.button>
        </div>

        <div className="text-center mt-8 text-sm text-slate-400">
          <span className="flex items-center justify-center gap-1">
            Built with <Heart className="w-3 h-3 text-red-500" /> by Dhananjay Verma
          </span>
          <div className="mt-1 text-xs">Next.js 15 · TypeScript · Tailwind CSS · Framer Motion</div>
        </div>
      </div>
    </footer>
  );
}
