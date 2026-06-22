'use client';

import { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import {
  ArrowDown,
  ArrowUpRight,
  Briefcase,
  CheckCircle2,
  Clock,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Users,
} from 'lucide-react';

const TypingEffect = ({ texts, speed = 80 }: { texts: string[]; speed?: number }) => {
  const [displayText, setDisplayText] = useState('');
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = texts[textIndex];
    const timeout = setTimeout(() => {
      if (!deleting) {
        if (charIndex < current.length) {
          setDisplayText(current.slice(0, charIndex + 1));
          setCharIndex((c) => c + 1);
        } else {
          setTimeout(() => setDeleting(true), 1800);
        }
      } else if (charIndex > 0) {
        setDisplayText(current.slice(0, charIndex - 1));
        setCharIndex((c) => c - 1);
      } else {
        setDeleting(false);
        setTextIndex((i) => (i + 1) % texts.length);
      }
    }, deleting ? speed / 2 : speed);

    return () => clearTimeout(timeout);
  }, [charIndex, deleting, textIndex, texts, speed]);

  return (
    <span>
      <span className="text-sky-400">{displayText}</span>
      <span className="ml-1 inline-block h-6 w-0.5 animate-pulse bg-sky-400 align-middle" />
    </span>
  );
};

const stats = [
  { icon: Clock, value: '3.5+', label: 'Years building production apps' },
  { icon: Briefcase, value: '20+', label: 'Projects shipped across web and mobile' },
  { icon: Users, value: '50K+', label: 'Users reached through product work' },
];

const socialLinks = [
  { href: 'https://github.com', label: 'GitHub', icon: Github },
  { href: 'https://linkedin.com', label: 'LinkedIn', icon: Linkedin },
  { href: 'mailto:dhananjay@example.com', label: 'Email', icon: Mail },
];

const strengths = ['React Native apps', 'Next.js frontends', 'Node.js APIs'];

export default function HeroSection() {
  const controls = useAnimation();

  useEffect(() => {
    controls.start('visible');
  }, [controls]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.18 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 28 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.65, ease: 'easeOut' },
    },
  };

  const visualVariants = {
    hidden: { opacity: 0, x: 40, scale: 0.98 },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: { duration: 0.85, ease: 'easeOut' },
    },
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen overflow-hidden bg-[#080d14] pt-16"
      style={{
        background:
          'linear-gradient(135deg, #071018 0%, #0d1720 42%, #11171c 70%, #15100e 100%)',
      }}
    >
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.45) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.45) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />
      <div className="absolute left-0 top-16 h-px w-full bg-gradient-to-r from-transparent via-white/15 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#080d14] to-transparent" />

      <div className="relative z-10 mx-auto grid min-h-[calc(100vh-4rem)] w-full max-w-7xl items-center gap-10 px-4 py-10 sm:px-6 sm:py-14 lg:grid-cols-[minmax(0,1fr)_minmax(360px,0.82fr)] lg:px-8 lg:py-16">
        <motion.div
          className="order-1 text-center lg:text-left"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          <motion.div
            variants={itemVariants}
            className="mb-6 flex flex-wrap justify-center gap-3 lg:justify-start"
          >
            <motion.div
              className="inline-flex items-center gap-2 rounded-md border border-emerald-300/30 bg-emerald-400/10 px-3 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-emerald-200"
              animate={{
                boxShadow: [
                  '0 0 0 rgba(34,197,94,0)',
                  '0 0 24px rgba(34,197,94,0.18)',
                  '0 0 0 rgba(34,197,94,0)',
                ],
              }}
              transition={{ duration: 2.4, repeat: Infinity }}
            >
              <span className="h-2 w-2 rounded-full bg-emerald-300" />
              Open to work
            </motion.div>
            <div className="inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/[0.04] px-3 py-2 text-xs font-medium text-slate-300">
              <MapPin className="h-3.5 w-3.5 text-amber-300" />
              India, available remote
            </div>
          </motion.div>

          <motion.h1 variants={itemVariants} className="mb-5 font-bold leading-tight text-white">
            <span className="block text-4xl sm:text-5xl lg:text-6xl xl:text-7xl">
              Dhananjay Verma
            </span>
            <span className="mt-3 block max-w-4xl bg-gradient-to-r from-sky-200 via-emerald-200 to-amber-200 bg-clip-text text-3xl text-transparent sm:text-4xl lg:text-[3.35rem]">
              Full stack apps with clean UI and reliable delivery.
            </span>
          </motion.h1>

          <motion.div
            variants={itemVariants}
            className="mb-5 text-lg font-light text-slate-300 sm:text-xl"
          >
            Full Stack &amp; React Native&nbsp;
            <TypingEffect texts={['Developer', 'Engineer', 'Problem Solver']} speed={70} />
          </motion.div>

          <motion.p
            variants={itemVariants}
            className="mx-auto mb-7 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg lg:mx-0"
          >
            I build practical, polished products with React, Next.js, Node.js, React Native,
            and cloud tooling. The focus is simple: fast interfaces, readable systems, and
            features that feel finished.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="mb-8 flex flex-wrap justify-center gap-2 lg:justify-start"
          >
            {strengths.map((strength) => (
              <span
                key={strength}
                className="inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/[0.045] px-3 py-2 text-sm text-slate-200"
              >
                <CheckCircle2 className="h-4 w-4 text-emerald-300" />
                {strength}
              </span>
            ))}
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="mb-8 grid grid-cols-1 gap-3 sm:grid-cols-3"
          >
            {stats.map(({ icon: Icon, value, label }) => (
              <motion.div
                key={label}
                className="flex min-h-[104px] items-start gap-3 rounded-md border border-white/10 bg-white/[0.045] px-4 py-4 text-left backdrop-blur"
                whileHover={{ y: -3, backgroundColor: 'rgba(255,255,255,0.07)' }}
              >
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-md bg-sky-300/10 text-sky-200">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-xl font-bold leading-none text-white">{value}</div>
                  <div className="mt-2 text-xs leading-relaxed text-slate-400">{label}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex flex-col justify-center gap-3 sm:flex-row lg:justify-start"
          >
            <motion.a
              href="#projects"
              className="inline-flex min-h-[50px] items-center justify-center gap-2 rounded-md bg-sky-300 px-6 py-3 text-sm font-bold text-slate-950 shadow-lg shadow-sky-950/30 transition-all hover:bg-sky-200"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <Briefcase className="h-4 w-4" />
              View Projects
              <ArrowUpRight className="h-4 w-4" />
            </motion.a>

            <motion.a
              href="#contact"
              className="inline-flex min-h-[50px] items-center justify-center gap-2 rounded-md border border-white/15 bg-white/[0.055] px-6 py-3 text-sm font-semibold text-slate-100 transition-all hover:bg-white/10"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <Mail className="h-4 w-4" />
              Contact Me
            </motion.a>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="mt-12 hidden items-center gap-3 text-sm text-slate-500 lg:flex"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10">
              <ArrowDown className="h-4 w-4" />
            </span>
            <span>Scroll to explore selected work</span>
          </motion.div>
        </motion.div>

        <motion.div
          className="order-2 mx-auto w-full max-w-[500px] lg:max-w-none"
          variants={visualVariants}
          initial="hidden"
          animate={controls}
        >
          <div className="relative">
            <div className="absolute -left-4 top-8 hidden h-[72%] w-4 rounded-l-md bg-emerald-300/80 lg:block" />
            <div className="absolute -right-4 bottom-10 hidden h-32 w-4 rounded-r-md bg-amber-300/80 lg:block" />

            <div className="relative overflow-hidden rounded-md border border-white/10 bg-white/[0.045] shadow-2xl shadow-black/35">
              <div className="aspect-[4/5] max-h-[580px] min-h-[330px]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/profile.jpeg"
                  alt="Dhananjay Verma"
                  className="h-full w-full object-cover object-top"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#071018] via-transparent to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                <div className="rounded-md border border-white/10 bg-[#071018]/80 p-4 backdrop-blur-md">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-200/80">
                        Portfolio
                      </div>
                      <div className="mt-1 text-2xl font-bold text-white">Product-minded developer</div>
                    </div>

                    <div className="flex items-center gap-2">
                      {socialLinks.map(({ href, label, icon: Icon }) => (
                        <motion.a
                          key={label}
                          href={href}
                          target={href.startsWith('mailto:') ? undefined : '_blank'}
                          rel={href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                          aria-label={label}
                          className="flex h-10 w-10 items-center justify-center rounded-md border border-white/15 bg-white/10 text-slate-100 backdrop-blur transition-colors hover:border-sky-300/60 hover:bg-sky-400/20"
                          whileHover={{ y: -2 }}
                          whileTap={{ scale: 0.96 }}
                        >
                          <Icon className="h-4 w-4" />
                        </motion.a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
