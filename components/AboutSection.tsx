'use client';

import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ChevronRight, Award, Zap, Users, Rocket, Code2, Globe, Database } from 'lucide-react';

interface Company {
  year: string;
  company: string;
  role: string;
  achievements: string[];
  icon: React.ReactNode;
  color: string;
}

const companies: Company[] = [
  {
    year: '2022',
    company: 'Masai School',
    role: 'Full Stack Development Training',
    achievements: [
      'Completed intensive 30-week full-stack bootcamp',
      'Built 15+ projects with MERN stack',
      'Ranked top 5% in cohort assessments',
      'Mastered React, Node.js, MongoDB, and Express',
    ],
    icon: <Code2 className="w-5 h-5" />,
    color: '#8b5cf6',
  },
  {
    year: '2023',
    company: 'Cognitive Clouds',
    role: 'Software Developer',
    achievements: [
      'Built responsive healthcare platform UI with React',
      'Implemented REST APIs with Node.js and Express',
      'Optimized database queries improving performance by 40%',
      'Collaborated with cross-functional teams in agile environment',
    ],
    icon: <Globe className="w-5 h-5" />,
    color: '#0ea5e9',
  },
  {
    year: '2023',
    company: 'Kafqa Ventures',
    role: 'Software Developer',
    achievements: [
      'Developed LMS platform with course management system',
      'Built attendance tracking and student analytics dashboard',
      'Implemented real-time notifications using WebSocket',
      'Reduced page load times by 60% through code optimization',
    ],
    icon: <Database className="w-5 h-5" />,
    color: '#f59e0b',
  },
  {
    year: '2024-Present',
    company: 'Kazam EV',
    role: 'Senior Software Developer',
    achievements: [
      'Built EV charging admin dashboard with React & TypeScript',
      'Developed charger management system with real-time monitoring',
      'Implemented battery swapping platform with payment integration',
      'Led WhatsApp automation and QR login system',
      'Deployed to production with 99.9% uptime',
      'Mentored junior developers and conducted code reviews',
    ],
    icon: <Zap className="w-5 h-5" />,
    color: '#22c55e',
  },
];

const highlights = [
  { icon: <Award className="w-5 h-5" />, label: 'Rising Star Award', value: 'Kazam EV' },
  { icon: <Rocket className="w-5 h-5" />, label: 'First Position', value: 'Project Presentation' },
  { icon: <Users className="w-5 h-5" />, label: '50K+ Users', value: 'Impacted Globally' },
  { icon: <Zap className="w-5 h-5" />, label: '99.9% Uptime', value: 'Production Systems' },
];

export default function AboutSection() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="relative py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto" ref={ref}>
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-[#94a3b8]">
              About Me
            </span>
          </h2>
          <p className="text-[#94a3b8] max-w-2xl mx-auto">
            A journey through my career, from learning to leading.
            Click on each company to explore achievements.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#0ea5e9]/50 via-[#22c55e]/50 to-transparent sm:-translate-x-1/2" />

          {companies.map((company, index) => (
            <motion.div
              key={company.company}
              className={`relative mb-8 sm:mb-12 ${index % 2 === 0 ? 'sm:pr-[50%]' : 'sm:pl-[50%]'}`}
              initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
            >
              {/* Dot on timeline */}
              <div className={`absolute left-4 sm:left-1/2 top-6 w-3 h-3 rounded-full z-10 sm:-translate-x-1/2`}
                style={{ backgroundColor: company.color, boxShadow: `0 0 12px ${company.color}` }}
              />

              {/* Card */}
              <div className={`ml-10 sm:ml-0 ${index % 2 === 0 ? 'sm:mr-8' : 'sm:ml-8'}`}>
                <motion.div
                  className="glass-card p-6 cursor-pointer group"
                  onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                  whileHover={{ scale: 1.02, borderColor: `${company.color}40` }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center"
                        style={{ backgroundColor: `${company.color}20`, color: company.color }}
                      >
                        {company.icon}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white group-hover:text-[#0ea5e9] transition-colors">
                          {company.company}
                        </h3>
                        <p className="text-sm text-[#64748b]">{company.role}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-mono text-[#94a3b8]" style={{ color: company.color }}>
                        {company.year}
                      </span>
                      <motion.div
                        animate={{ rotate: expandedIndex === index ? 90 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ChevronRight className="w-4 h-4 text-[#64748b]" />
                      </motion.div>
                    </div>
                  </div>

                  {/* Expanded achievements */}
                  <motion.div
                    initial={false}
                    animate={{
                      height: expandedIndex === index ? 'auto' : 0,
                      opacity: expandedIndex === index ? 1 : 0,
                    }}
                    transition={{ duration: 0.4, ease: [0.215, 0.61, 0.355, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="pt-4 border-t border-white/5 mt-4">
                      <ul className="space-y-3">
                        {company.achievements.map((achievement, i) => (
                          <motion.li
                            key={i}
                            className="flex items-start gap-3 text-sm text-[#94a3b8]"
                            initial={{ opacity: 0, x: -10 }}
                            animate={expandedIndex === index ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.3, delay: i * 0.08 }}
                          >
                            <span className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: company.color }} />
                            {achievement}
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Highlights Grid */}
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          {highlights.map((item, index) => (
            <motion.div
              key={item.label}
              className="glass-card p-4 text-center"
              whileHover={{ y: -4, borderColor: 'rgba(14, 165, 233, 0.3)' }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-[#0ea5e9] mb-2 flex justify-center">{item.icon}</div>
              <div className="text-white font-semibold text-sm">{item.label}</div>
              <div className="text-[#64748b] text-xs mt-1">{item.value}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
