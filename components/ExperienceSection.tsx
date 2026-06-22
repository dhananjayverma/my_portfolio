'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Briefcase, TrendingUp, ArrowUpRight, Star, Rocket, Zap, Crown, Award } from 'lucide-react';

interface Experience {
  year: string;
  company: string;
  role: string;
  description: string;
  color: string;
  bgColor: string;
  icon: React.ReactNode;
}

const experiences: Experience[] = [
  {
    year: '2022',
    company: 'Masai School',
    role: 'Student',
    description: 'Started full-stack development journey. Built foundation in React, Node.js, and MongoDB.',
    color: '#8b5cf6',
    bgColor: 'bg-violet-50',
    icon: <Star className="w-5 h-5" />,
  },
  {
    year: '2023',
    company: 'Cognitive Clouds',
    role: 'Software Developer',
    description: 'Built healthcare platform UI. Learned enterprise development practices and agile workflows.',
    color: '#0ea5e9',
    bgColor: 'bg-sky-50',
    icon: <Rocket className="w-5 h-5" />,
  },
  {
    year: '2023',
    company: 'Kafqa Ventures',
    role: 'Software Developer',
    description: 'Developed LMS platform. Built course management, attendance tracking, and real-time features.',
    color: '#f59e0b',
    bgColor: 'bg-amber-50',
    icon: <Zap className="w-5 h-5" />,
  },
  {
    year: '2024',
    company: 'Kazam EV',
    role: 'Senior Developer',
    description: 'Leading EV platform development. Built charger management, battery swapping, and WhatsApp automation.',
    color: '#22c55e',
    bgColor: 'bg-emerald-50',
    icon: <Crown className="w-5 h-5" />,
  },
  {
    year: '2026',
    company: 'Next Chapter',
    role: 'Senior Developer',
    description: 'Looking for new challenges. Ready to architect and build the next generation of applications.',
    color: '#f97316',
    bgColor: 'bg-orange-50',
    icon: <Award className="w-5 h-5" />,
  },
];

export default function ExperienceSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    if (isInView) {
      const timer = setInterval(() => {
        setActiveStep((prev) => (prev < experiences.length - 1 ? prev + 1 : prev));
      }, 700);
      return () => clearInterval(timer);
    }
  }, [isInView]);

  return (
    <section id="experience" className="relative py-28 px-4 sm:px-6 lg:px-8 section-gradient-1">
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
            <span className="text-sm font-semibold text-sky-600 bg-sky-50 px-4 py-1.5 rounded-full border border-sky-200">
              Career Journey
            </span>
          </motion.div>
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-slate-800">
            Experience Roadmap
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-lg">
            A visual journey of growth, from learning to leading.
          </p>
        </motion.div>

        <div className="relative">
          <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-violet-300 via-sky-300 via-emerald-300 to-amber-300 sm:-translate-x-1/2 rounded-full" />

          {experiences.map((exp, index) => (
            <motion.div
              key={exp.company}
              className={`relative mb-14 sm:mb-16 ${index % 2 === 0 ? 'sm:pr-[50%]' : 'sm:pl-[50%]'}`}
              initial={{ opacity: 0, x: index % 2 === 0 ? -60 : 60 }}
              animate={isInView && index <= activeStep ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: index * 0.1, ease: 'easeOut' }}
            >
              <div className="absolute left-4 sm:left-1/2 top-6 z-10 sm:-translate-x-1/2">
                <motion.div
                  className="w-10 h-10 rounded-full flex items-center justify-center border-4 border-white shadow-lg"
                  style={{ backgroundColor: exp.color }}
                  animate={index <= activeStep ? {
                    scale: [1, 1.2, 1],
                    boxShadow: [
                      `0 0 0 0 ${exp.color}40`,
                      `0 0 0 10px ${exp.color}00`,
                    ],
                  } : {}}
                  transition={{ duration: 1, repeat: index === activeStep ? Infinity : 0 }}
                >
                  <span className="text-white">{exp.icon}</span>
                </motion.div>
              </div>

              <div className={`ml-16 sm:ml-0 ${index % 2 === 0 ? 'sm:mr-10' : 'sm:ml-10'}`}>
                <motion.div
                  className="glass-card-strong p-6 cursor-pointer group"
                  whileHover={{ y: -6, scale: 1.02, boxShadow: '0 20px 40px rgba(0,0,0,0.08)' }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="absolute top-0 right-0 w-24 h-24 rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity"
                    style={{ backgroundColor: exp.color }}
                  />
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl flex items-center justify-center"
                          style={{ backgroundColor: `${exp.color}15`, color: exp.color }}
                        >
                          {exp.icon}
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-slate-800 group-hover:text-sky-600 transition-colors">
                            {exp.company}
                          </h3>
                          <p className="text-sm text-slate-500">{exp.role}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold font-mono" style={{ color: exp.color }}>
                          {exp.year}
                        </span>
                        <motion.div
                          animate={{ rotate: index <= activeStep ? 0 : -45, opacity: index <= activeStep ? 1 : 0.3 }}
                          transition={{ duration: 0.3 }}
                        >
                          <ArrowUpRight className="w-4 h-4" style={{ color: exp.color }} />
                        </motion.div>
                      </div>
                    </div>
                    <p className="text-sm text-slate-500 leading-relaxed">{exp.description}</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}

          <motion.div
            className="absolute left-4 sm:left-1/2 bottom-0 w-8 h-8 rounded-full border-4 border-white bg-gradient-to-r from-orange-400 to-amber-500 sm:-translate-x-1/2 translate-y-1/2 z-10"
            animate={{
              scale: [1, 1.3, 1],
              boxShadow: ['0 0 0 0 rgba(249,115,22,0.4)', '0 0 0 15px rgba(249,115,22,0)', '0 0 0 0 rgba(249,115,22,0.4)'],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>

        <motion.div
          className="mt-12 flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1 }}
        >
          <div className="inline-flex items-center gap-2 text-sm text-slate-500 bg-white/50 backdrop-blur-sm px-4 py-2 rounded-full border border-slate-200/50">
            <TrendingUp className="w-4 h-4 text-emerald-500" />
            <span>3.5+ years of continuous growth</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
