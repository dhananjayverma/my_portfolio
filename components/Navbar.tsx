'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const navItems = [
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
      const sections = navItems.map((item) => item.href.slice(1));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.getBoundingClientRect().top <= 200) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'border-b border-white/10 shadow-lg shadow-black/20'
          : ''
      }`}
      style={
        scrolled
          ? { background: 'rgba(8,13,20,0.85)', backdropFilter: 'blur(20px)' }
          : { background: 'transparent' }
      }
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.215, 0.61, 0.355, 1] }}
    >
      <div className="mx-auto max-w-[1800px] px-5 sm:px-8 lg:px-12 xl:px-20">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <motion.a
            href="#"
            className="text-5xl font-black leading-none tracking-tight"
            style={{
              background: 'linear-gradient(135deg, #2563eb 0%, #06b6d4 45%, #22c55e 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              filter: 'drop-shadow(0 0 20px rgba(34,211,238,0.28))',
            }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
          >
            DV
          </motion.a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="relative rounded-lg px-2 py-2 text-xl font-bold transition-colors"
                style={{
                  color: activeSection === item.href.slice(1) ? '#38bdf8' : 'rgba(226,232,240,0.86)',
                }}
              >
                {item.label}
                {activeSection === item.href.slice(1) && (
                  <motion.div
                    className="absolute inset-0 rounded-lg"
                    style={{ background: 'rgba(56,189,248,0.1)', border: '1px solid rgba(56,189,248,0.2)' }}
                    layoutId="activeNav"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </a>
            ))}

            {/* Open to Work pill */}
            <motion.a
              href="#contact"
              className="ml-1 flex items-center gap-3 rounded-full px-6 py-3 text-xl font-extrabold"
              style={{
                background: 'rgba(34,197,94,0.08)',
                border: '1px solid rgba(20,184,166,0.52)',
                color: 'rgba(226,232,240,0.92)',
                boxShadow: '0 0 30px rgba(16,185,129,0.18)',
              }}
              whileHover={{ scale: 1.05, background: 'rgba(34,197,94,0.2)' }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.span
                className="h-3 w-3 rounded-full bg-emerald-400"
                style={{ boxShadow: '0 0 14px rgba(52,211,153,0.95)' }}
                animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                transition={{ duration: 1.4, repeat: Infinity }}
              />
              Open to Work
            </motion.a>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden text-slate-300 hover:text-white transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="md:hidden border-t border-white/10"
            style={{ background: 'rgba(8,13,20,0.95)', backdropFilter: 'blur(20px)' }}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <div className="px-4 py-4 space-y-1">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="block px-4 py-3 text-sm text-slate-300 hover:text-white rounded-lg transition-colors"
                  style={{ background: 'rgba(255,255,255,0.03)' }}
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
