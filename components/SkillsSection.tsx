'use client';

import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Code2, Server, Smartphone, Cloud, ArrowUpRight, Sparkles } from 'lucide-react';

interface Skill {
  name: string;
  years: number;
  projects: number;
  proficiency: number;
  color: string;
  bgColor: string;
}

interface SkillCategory {
  title: string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  skills: Skill[];
}

const skillCategories: SkillCategory[] = [
  {
    title: 'Frontend',
    icon: <Code2 className="w-5 h-5" />,
    color: '#0ea5e9',
    bgColor: 'bg-sky-50',
    skills: [
      { name: 'React', years: 3, projects: 18, proficiency: 95, color: '#0ea5e9', bgColor: 'bg-sky-50' },
      { name: 'Next.js', years: 2, projects: 12, proficiency: 90, color: '#0284c7', bgColor: 'bg-sky-50' },
      { name: 'TypeScript', years: 2.5, projects: 15, proficiency: 88, color: '#0369a1', bgColor: 'bg-sky-50' },
      { name: 'Redux', years: 2, projects: 10, proficiency: 85, color: '#7c3aed', bgColor: 'bg-violet-50' },
      { name: 'Tailwind CSS', years: 2, projects: 16, proficiency: 92, color: '#06b6d4', bgColor: 'bg-cyan-50' },
    ],
  },
  {
    title: 'Backend',
    icon: <Server className="w-5 h-5" />,
    color: '#22c55e',
    bgColor: 'bg-emerald-50',
    skills: [
      { name: 'Node.js', years: 3, projects: 14, proficiency: 90, color: '#22c55e', bgColor: 'bg-emerald-50' },
      { name: 'Express', years: 3, projects: 13, proficiency: 88, color: '#16a34a', bgColor: 'bg-emerald-50' },
      { name: 'MongoDB', years: 2.5, projects: 12, proficiency: 85, color: '#15803d', bgColor: 'bg-emerald-50' },
      { name: 'PostgreSQL', years: 1.5, projects: 6, proficiency: 75, color: '#059669', bgColor: 'bg-emerald-50' },
    ],
  },
  {
    title: 'Mobile',
    icon: <Smartphone className="w-5 h-5" />,
    color: '#f59e0b',
    bgColor: 'bg-amber-50',
    skills: [
      { name: 'React Native', years: 2.5, projects: 8, proficiency: 88, color: '#f59e0b', bgColor: 'bg-amber-50' },
      { name: 'Expo', years: 2, projects: 6, proficiency: 82, color: '#d97706', bgColor: 'bg-amber-50' },
      { name: 'iOS/Android', years: 2, projects: 7, proficiency: 80, color: '#b45309', bgColor: 'bg-amber-50' },
    ],
  },
  {
    title: 'Cloud & Tools',
    icon: <Cloud className="w-5 h-5" />,
    color: '#8b5cf6',
    bgColor: 'bg-violet-50',
    skills: [
      { name: 'AWS', years: 1.5, projects: 5, proficiency: 72, color: '#8b5cf6', bgColor: 'bg-violet-50' },
      { name: 'Git', years: 3, projects: 20, proficiency: 92, color: '#7c3aed', bgColor: 'bg-violet-50' },
      { name: 'Postman', years: 3, projects: 20, proficiency: 90, color: '#6d28d9', bgColor: 'bg-violet-50' },
      { name: 'Docker', years: 1, projects: 4, proficiency: 70, color: '#5b21b6', bgColor: 'bg-violet-50' },
    ],
  },
];

function SkillCard({ skill, index }: { skill: Skill; index: number }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="glass-card-strong p-4 relative overflow-hidden group cursor-pointer"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `radial-gradient(circle at 50% 50%, ${skill.color}08, transparent)` }}
      />

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-slate-800 font-semibold text-sm">{skill.name}</h4>
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={isHovered ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ArrowUpRight className="w-3.5 h-3.5" style={{ color: skill.color }} />
          </motion.div>
        </div>

        <div className="h-2 bg-slate-100 rounded-full overflow-hidden mb-3">
          <motion.div
            className="h-full rounded-full"
            style={{ backgroundColor: skill.color }}
            initial={{ width: 0 }}
            animate={{ width: `${skill.proficiency}%` }}
            transition={{ duration: 1.2, delay: index * 0.08, ease: 'easeOut' }}
          />
        </div>

        <motion.div
          className="flex justify-between text-xs"
          initial={{ opacity: 0, y: 8 }}
          animate={isHovered ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
          transition={{ duration: 0.3 }}
        >
          <span className="text-slate-400">{skill.years} yrs</span>
          <span className="text-slate-400">{skill.projects} projects</span>
          <span className="font-bold" style={{ color: skill.color }}>{skill.proficiency}%</span>
        </motion.div>

        <motion.div
          className="text-xs text-slate-400 mt-1"
          animate={isHovered ? { opacity: 0 } : { opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          {skill.proficiency}% proficiency
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function SkillsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="skills" className="relative py-28 px-4 sm:px-6 lg:px-8 section-gradient-2">
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
            <span className="text-sm font-semibold text-emerald-600 bg-emerald-50 px-4 py-1.5 rounded-full border border-emerald-200">
              <Sparkles className="w-3 h-3 inline mr-1" />
              Expertise
            </span>
          </motion.div>
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-slate-800">
            Skills & Expertise
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-lg">
            Hover over each skill to see detailed metrics — years of experience, projects delivered, and proficiency.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillCategories.map((category, catIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: catIndex * 0.1 }}
            >
              <div className="flex items-center gap-2 mb-5">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: `${category.color}15`, color: category.color }}
                >
                  {category.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-800">{category.title}</h3>
              </div>
              <div className="space-y-3">
                {category.skills.map((skill, index) => (
                  <SkillCard key={skill.name} skill={skill} index={catIndex * 5 + index} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
