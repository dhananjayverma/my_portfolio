'use client';

import { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import {
  Briefcase,
  Download,
  Github,
  Linkedin,
  Mail,
  Sparkles,
  Users,
  Clock3,
  Atom,
  Cpu,
} from 'lucide-react';

const TypingEffect = ({ texts, speed = 80 }: { texts: string[]; speed?: number }) => {
  const [displayText, setDisplayText] = useState('');
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = texts[textIndex];
    let pauseTimeout: ReturnType<typeof setTimeout> | undefined;
    const timeout = setTimeout(() => {
      if (!deleting) {
        if (charIndex < current.length) {
          setDisplayText(current.slice(0, charIndex + 1));
          setCharIndex((c) => c + 1);
        } else {
          pauseTimeout = setTimeout(() => setDeleting(true), 1600);
        }
      } else if (charIndex > 0) {
        setDisplayText(current.slice(0, charIndex - 1));
        setCharIndex((c) => c - 1);
      } else {
        setDeleting(false);
        setTextIndex((i) => (i + 1) % texts.length);
      }
    }, deleting ? speed / 2 : speed);

    return () => {
      clearTimeout(timeout);
      if (pauseTimeout) clearTimeout(pauseTimeout);
    };
  }, [charIndex, deleting, speed, textIndex, texts]);

  return (
    <span>
      <span className="text-emerald-400 font-extrabold">
        {displayText}
      </span>
      <span className="ml-1 inline-block h-5 w-0.5 animate-pulse bg-emerald-400 align-middle sm:h-6" />
    </span>
  );
};

const stats = [
  { 
    icon: Clock3, 
    value: '3.5+', 
    label1: 'YEARS', 
    label2: 'EXPERIENCE', 
    tone: 'from-blue-600 to-cyan-500', 
    border: 'border-blue-500/20 hover:border-blue-500/40', 
    glow: 'from-blue-600/10 to-transparent' 
  },
  { 
    icon: Users, 
    value: '20+', 
    label1: 'PROJECTS', 
    label2: 'DELIVERED', 
    tone: 'from-emerald-600 to-teal-500', 
    border: 'border-emerald-500/20 hover:border-emerald-500/40', 
    glow: 'from-emerald-600/10 to-transparent' 
  },
  { 
    icon: Briefcase, 
    value: '50K+', 
    label1: 'USERS', 
    label2: 'IMPACTED', 
    tone: 'from-amber-600 to-orange-500', 
    border: 'border-amber-500/20 hover:border-amber-500/40', 
    glow: 'from-amber-600/10 to-transparent' 
  },
];

const socialLinks = [
  { href: 'https://github.com', label: 'GitHub', icon: Github },
  { href: 'https://linkedin.com', label: 'LinkedIn', icon: Linkedin },
  { href: 'mailto:dhananjay@example.com', label: 'Email', icon: Mail },
];

export default function HeroSection() {
  const controls = useAnimation();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      controls.start('visible');
    }
  }, [mounted, controls]);

  const fadeUp = {
    hidden: { opacity: 0, y: 22 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.66, ease: 'easeOut' } },
  };

  if (!mounted) return null;

  return (
    <section
      id="hero"
      className="relative min-h-screen overflow-hidden text-white flex items-center"
      style={{
        backgroundImage: "url('/bg.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center top',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Dark overlay + radial colour tints on top of the bg image */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            'radial-gradient(circle at 24% 28%, rgba(37, 99, 235, 0.52), transparent 28%), radial-gradient(circle at 43% 43%, rgba(6, 182, 212, 0.3), transparent 24%), radial-gradient(circle at 72% 18%, rgba(16, 185, 129, 0.28), transparent 25%), linear-gradient(135deg, rgba(5,10,20,0.72) 0%, rgba(7,17,29,0.68) 48%, rgba(3,20,15,0.72) 100%)',
        }}
      />

      <div
        className="absolute inset-0 opacity-[0.1]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(148,163,184,0.32) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.32) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />
      <div
        className="absolute left-0 top-[18%] h-[48%] w-[35%] opacity-40"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(125,211,252,0.9) 1px, transparent 1.5px)',
          backgroundSize: '24px 24px',
        }}
      />
      <div
        className="absolute right-[18%] top-[10%] h-[46%] w-[26%] rotate-45 bg-gradient-to-b from-white/10 via-cyan-200/10 to-transparent blur-[1px]"
      />
      <div className="absolute bottom-[8%] left-[-7%] h-px w-[55%] rotate-[20deg] bg-gradient-to-r from-emerald-400 via-cyan-300 to-transparent shadow-[0_0_14px_rgba(34,211,238,0.9)]" />
      <div className="absolute bottom-[5%] left-[-9%] h-px w-[58%] -rotate-[28deg] bg-gradient-to-r from-blue-600 via-cyan-300/80 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#050a14] to-transparent pointer-events-none" />

      <div className="relative z-10 mx-auto grid min-h-screen w-full max-w-[1440px] items-center gap-10 px-5 pb-16 pt-24 sm:px-8 lg:grid-cols-2 lg:gap-12 lg:px-12 lg:pb-0 lg:pt-20">
        
        {/* Left Column (Avatar Visuals) */}
        <motion.div
          className="relative order-2 w-full overflow-visible lg:order-1 flex items-center justify-center py-8 lg:py-0"
          initial={{ opacity: 0, x: -42 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.75, ease: 'easeOut' }}
        >
          {/* Centered Glowing Decorators */}
          <div className="absolute w-[80%] h-[80%] rounded-full bg-blue-500/10 blur-[80px] -z-10" />

          {/* Core Avatar Frame Container */}
          <div className="relative w-full max-w-[340px] md:max-w-[400px] lg:max-w-[460px] xl:max-w-[510px] aspect-square flex items-end justify-center" style={{ overflow: 'visible' }}>

            {/* Atmospheric inner glow blob */}
            <div className="absolute inset-[20%] rounded-full bg-[radial-gradient(circle_at_50%_70%,rgba(37,99,235,0.35)_0%,rgba(6,182,212,0.18)_40%,transparent_72%)] blur-[10px] z-0" />

            {/* Profile image — bottom-anchored, head overflows circle naturally */}
            <motion.img
              src="/profile-cutout.png"
              alt="Dhananjay Verma"
              className="relative z-10 w-[105%] max-w-none h-auto object-contain object-bottom drop-shadow-[0_0_30px_rgba(6,182,212,0.5)]"
              style={{ marginBottom: '-2%' }}
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 5.4, repeat: Infinity, ease: 'easeInOut' }}
            />



            {/* Interactive Floating Glass Badges */}
            <motion.div
              className="absolute left-[-20px] md:left-[-28px] lg:left-[-36px] xl:left-[-48px] top-[26%] z-20 flex items-center gap-3 rounded-2xl border border-blue-500/30 bg-[#070d19]/90 backdrop-blur-md px-4 py-3 shadow-xl hover:border-blue-400/50 transition-colors cursor-default"
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <div className="h-9 w-9 shrink-0 flex items-center justify-center rounded-xl bg-blue-500/10 text-cyan-400 border border-blue-500/20">
                <Atom className="h-5 w-5" />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-[9px] font-black uppercase tracking-widest text-cyan-400 leading-none">Expertise</span>
                <span className="text-xs font-bold text-white mt-1 leading-none">React Native</span>
              </div>
            </motion.div>

            <motion.div
              className="absolute right-[-20px] md:right-[-28px] lg:right-[-36px] xl:right-[-48px] top-[52%] z-20 flex items-center gap-3 rounded-2xl border border-emerald-500/30 bg-[#070d19]/90 backdrop-blur-md px-4 py-3 shadow-xl hover:border-emerald-400/50 transition-colors cursor-default"
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 5.4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
            >
              <div className="h-9 w-9 shrink-0 flex items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <Cpu className="h-5 w-5" />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-[9px] font-black uppercase tracking-widest text-emerald-400 leading-none">Focus</span>
                <span className="text-xs font-bold text-white mt-1 leading-none">Full Stack &amp; AI</span>
              </div>
            </motion.div>

            {/* Social Links floating pill */}
            <div className="absolute bottom-[2%] left-1/2 -translate-x-1/2 z-20 flex items-center gap-4 rounded-full border border-white/10 bg-[#070d19]/90 px-5 py-2.5 backdrop-blur-md shadow-lg">
              {socialLinks.map(({ href, label, icon: Icon }) => (
                <motion.a
                  key={label}
                  href={href}
                  target={href.startsWith('mailto:') ? undefined : '_blank'}
                  rel={href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 text-slate-300 border border-transparent transition hover:bg-cyan-500/20 hover:text-white hover:border-cyan-400/30"
                  whileHover={{ y: -2, scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon className="h-4.5 w-4.5" />
                </motion.a>
              ))}
            </div>

          </div>
        </motion.div>

        {/* Right Column (Hero Content) */}
        <motion.div
          className="order-1 mx-auto w-full max-w-2xl pb-4 lg:order-2 lg:mx-0 lg:pb-0"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.12 } },
          }}
        >
          {/* Status Badge */}
          <motion.div
            variants={fadeUp}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-950/30 px-4 py-2 text-xs font-extrabold uppercase tracking-[0.15em] text-emerald-300"
            animate={{ boxShadow: ['0 0 15px rgba(16,185,129,0.1)', '0 0 25px rgba(16,185,129,0.25)', '0 0 15px rgba(16,185,129,0.1)'] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            OPEN TO WORK
            <Briefcase className="h-3.5 w-3.5 text-emerald-400" />
          </motion.div>

          {/* Headline */}
          <motion.h1 variants={fadeUp} className="max-w-2xl font-black tracking-tight leading-none text-left mb-6">
            <div className="mb-6 relative w-fit flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/5 px-4 py-1.5 backdrop-blur-sm shadow-[0_0_20px_rgba(34,211,238,0.05)]">
              <span className="h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee] animate-pulse" />
              <span className="text-xs font-black uppercase tracking-[0.2em] text-cyan-300">
                Hi, I&apos;m <span className="text-white">Dhananjay</span>
              </span>
            </div>
            <span className="block text-5xl sm:text-6.5xl md:text-7xl lg:text-[4.75rem] xl:text-[5.25rem] font-extrabold text-white tracking-tight leading-none mb-2">
              Full Stack
            </span>
            <span className="block text-5xl sm:text-6.5xl md:text-7xl lg:text-[4.75rem] xl:text-[5.25rem] font-extrabold bg-gradient-to-r from-blue-500 via-cyan-400 to-emerald-400 bg-[size:200%_auto] animate-gradient-x bg-clip-text text-transparent tracking-tight">
              Developer
            </span>
          </motion.h1>

          {/* Role Subheading with typing animation */}
          <motion.div
            variants={fadeUp}
            className="mt-6 text-lg font-semibold leading-8 text-slate-300 sm:text-xl text-left"
          >
            React Native &amp; backend-focused{' '}
            <TypingEffect texts={['Builder', 'Developer', 'Engineer']} speed={68} />
          </motion.div>

          {/* Description Paragraph with highlighted keywords */}
          <motion.p
            variants={fadeUp}
            className="mt-6 max-w-xl text-base font-medium leading-relaxed text-slate-400 text-left"
          >
            I build reliable web and mobile products with React,{' '}
            <span className="text-emerald-400 font-bold">Next.js</span>,{' '}
            <span className="text-emerald-400 font-bold">Node.js</span>,{' '}
            <span className="text-cyan-400 font-bold">React Native</span>, and cloud tooling. Clean
            interfaces, readable systems, and practical delivery.
          </motion.p>

          {/* Premium Glass Stats Grid */}
          <motion.div
            variants={fadeUp}
            className="mt-8 grid max-w-xl gap-4 sm:grid-cols-3"
          >
            {stats.map(({ icon: Icon, value, label1, label2, tone, border, glow }) => (
              <motion.div
                key={label1 + label2}
                className={`relative group rounded-2xl border ${border} bg-[#0c1322]/80 p-4 backdrop-blur-md transition-all duration-300 flex items-center gap-4`}
                whileHover={{ y: -4 }}
              >
                {/* Glow backdrop behind card on hover */}
                <div className={`absolute inset-0 -z-10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-lg bg-gradient-to-br ${glow}`} />
                
                <span
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${tone} text-white shadow-md group-hover:scale-105 group-hover:rotate-6 transition-all duration-300`}
                >
                  <Icon className="h-6 w-6" />
                </span>
                
                <div className="flex flex-col text-left">
                  <span className="text-2xl font-extrabold leading-none text-white tracking-tight">{value}</span>
                  <span className="mt-1 block text-[10px] font-black leading-tight text-slate-400 uppercase tracking-widest">
                    {label1}
                  </span>
                  <span className="block text-[10px] font-black leading-tight text-slate-400 uppercase tracking-widest">
                    {label2}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Action Buttons */}
          <motion.div variants={fadeUp} className="mt-8 flex flex-col gap-4 sm:flex-row max-w-xl">
            <motion.a
              href="#contact"
              className="inline-flex min-h-[50px] flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 via-cyan-400 to-emerald-400 px-6 text-sm font-extrabold text-white transition-all shadow-[0_8px_30px_rgba(6,182,212,0.3)] hover:shadow-[0_8px_40px_rgba(6,182,212,0.5)] hover:brightness-110 active:scale-95 duration-200"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <Download className="h-4.5 w-4.5" />
              Download Resume
            </motion.a>
            <motion.a
              href="#contact"
              className="inline-flex min-h-[50px] flex-1 items-center justify-center gap-2 rounded-xl border border-white/10 bg-slate-900/30 px-6 text-sm font-extrabold text-slate-300 hover:text-white hover:border-white/20 transition-all active:scale-95 duration-200"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <Mail className="h-4.5 w-4.5" />
              Contact Me
            </motion.a>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            variants={fadeUp}
            className="mt-8 hidden flex-col items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500 lg:flex w-fit mx-auto lg:mx-0"
          >
            <div className="flex items-center gap-3">
              <span className="relative flex h-9 w-5 rounded-full border-2 border-slate-400/40 bg-slate-950/20">
                <motion.span
                  className="absolute left-1/2 top-1.5 h-1.5 w-1 -translate-x-1/2 rounded-full bg-emerald-400"
                  style={{ boxShadow: '0 0 12px rgba(52,211,153,0.8)' }}
                  animate={{
                    y: [0, 12, 0],
                    opacity: [1, 0, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />
              </span>
              SCROLL TO EXPLORE
            </div>
            <motion.div
              animate={{ y: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              className="text-slate-400 mt-1"
            >
              <svg className="w-4 h-4 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </motion.div>
          </motion.div>

        </motion.div>
      </div>

      {/* Absolute floating Sparkles button at the bottom-right for large screen views */}
      <motion.div
        className="absolute bottom-8 right-8 hidden h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-sky-500 to-violet-500 text-white shadow-lg shadow-sky-400/20 sm:flex"
        animate={{ y: [0, -8, 0], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <Sparkles className="h-5 w-5" />
      </motion.div>
    </section>
  );
}
