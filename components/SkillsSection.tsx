'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import {
  Code2, Server, Database, Smartphone, Brain,
  Cloud, TestTube, Layers, Sparkles, Clock, FolderGit2,
} from 'lucide-react';

/* ─── Types ─────────────────────────────────────────────────────────────────── */
interface Skill {
  name: string;
  years: number;
  projects: number;
  proficiency: number;
}
interface Category {
  id: string;
  title: string;
  icon: React.ElementType;
  color: string;       // hex accent
  glow: string;        // rgba for shadows
  skills: Skill[];
}

/* ─── Data ───────────────────────────────────────────────────────────────────── */
const CATEGORIES: Category[] = [
  {
    id: 'frontend', title: 'Frontend', icon: Code2,
    color: '#38bdf8', glow: 'rgba(56,189,248,0.3)',
    skills: [
      { name: 'React.js',        years: 3,   projects: 18, proficiency: 95 },
      { name: 'Next.js',         years: 2,   projects: 12, proficiency: 90 },
      { name: 'TypeScript',      years: 2.5, projects: 15, proficiency: 88 },
      { name: 'JavaScript ES6+', years: 3.5, projects: 20, proficiency: 95 },
      { name: 'Redux',           years: 2,   projects: 10, proficiency: 85 },
      { name: 'Tailwind CSS',    years: 2,   projects: 16, proficiency: 92 },
      { name: 'HTML5 / CSS3',    years: 3.5, projects: 20, proficiency: 96 },
      { name: 'Material UI',     years: 1.5, projects: 6,  proficiency: 80 },
      { name: 'SvelteKit',       years: 0.5, projects: 2,  proficiency: 60 },
      { name: 'SEO',             years: 2,   projects: 8,  proficiency: 78 },
    ],
  },
  {
    id: 'backend', title: 'Backend', icon: Server,
    color: '#34d399', glow: 'rgba(52,211,153,0.3)',
    skills: [
      { name: 'Node.js',          years: 3,   projects: 14, proficiency: 90 },
      { name: 'Express.js',       years: 3,   projects: 13, proficiency: 88 },
      { name: 'RESTful APIs',     years: 3,   projects: 16, proficiency: 92 },
      { name: 'Microservices',    years: 1.5, projects: 5,  proficiency: 75 },
      { name: 'JWT Auth',         years: 2.5, projects: 12, proficiency: 88 },
      { name: 'MVC Architecture', years: 3,   projects: 14, proficiency: 90 },
      { name: 'API Design',       years: 2.5, projects: 14, proficiency: 88 },
    ],
  },
  {
    id: 'database', title: 'Database', icon: Database,
    color: '#22d3ee', glow: 'rgba(34,211,238,0.3)',
    skills: [
      { name: 'MongoDB',    years: 2.5, projects: 12, proficiency: 85 },
      { name: 'MySQL',      years: 2,   projects: 8,  proficiency: 78 },
      { name: 'SQL',        years: 2,   projects: 8,  proficiency: 78 },
      { name: 'Redis',      years: 1,   projects: 4,  proficiency: 68 },
    ],
  },
  {
    id: 'mobile', title: 'Mobile', icon: Smartphone,
    color: '#fbbf24', glow: 'rgba(251,191,36,0.3)',
    skills: [
      { name: 'React Native',       years: 2.5, projects: 8, proficiency: 88 },
      { name: 'Expo',               years: 2,   projects: 6, proficiency: 82 },
      { name: 'Android Studio',     years: 1.5, projects: 5, proficiency: 72 },
      { name: 'Cross-Platform Dev', years: 2.5, projects: 8, proficiency: 85 },
    ],
  },
  {
    id: 'ai', title: 'AI & Prod.', icon: Brain,
    color: '#a78bfa', glow: 'rgba(167,139,250,0.3)',
    skills: [
      { name: 'Generative AI',     years: 1,   projects: 4, proficiency: 75 },
      { name: 'Prompt Engineering',years: 1,   projects: 5, proficiency: 78 },
      { name: 'LLM Integration',   years: 0.5, projects: 3, proficiency: 65 },
      { name: 'ChatGPT / Claude',  years: 1,   projects: 6, proficiency: 80 },
      { name: 'Cursor AI',         years: 0.5, projects: 8, proficiency: 82 },
    ],
  },
  {
    id: 'cloud', title: 'Cloud & Tools', icon: Cloud,
    color: '#60a5fa', glow: 'rgba(96,165,250,0.3)',
    skills: [
      { name: 'AWS',      years: 1.5, projects: 5,  proficiency: 72 },
      { name: 'Vercel',   years: 2,   projects: 12, proficiency: 90 },
      { name: 'Render',   years: 1,   projects: 6,  proficiency: 80 },
      { name: 'Netlify',  years: 1.5, projects: 8,  proficiency: 82 },
      { name: 'Git',      years: 3.5, projects: 20, proficiency: 95 },
      { name: 'Docker',   years: 1,   projects: 4,  proficiency: 70 },
      { name: 'Jira',     years: 2,   projects: 10, proficiency: 80 },
    ],
  },
  {
    id: 'testing', title: 'API & Testing', icon: TestTube,
    color: '#fb7185', glow: 'rgba(251,113,133,0.3)',
    skills: [
      { name: 'Postman',          years: 3, projects: 20, proficiency: 92 },
      { name: 'JSON APIs',        years: 3, projects: 16, proficiency: 90 },
      { name: 'API Debugging',    years: 3, projects: 16, proficiency: 88 },
      { name: 'API Integration',  years: 3, projects: 16, proficiency: 90 },
    ],
  },
  {
    id: 'other', title: 'Other Skills', icon: Layers,
    color: '#2dd4bf', glow: 'rgba(45,212,191,0.3)',
    skills: [
      { name: 'System Design',   years: 2,   projects: 8,  proficiency: 78 },
      { name: 'Data Structures', years: 3,   projects: 10, proficiency: 82 },
      { name: 'Agile / Scrum',   years: 2,   projects: 10, proficiency: 85 },
      { name: 'CI/CD',           years: 1.5, projects: 6,  proficiency: 72 },
      { name: 'Perf. Optim.',    years: 2,   projects: 8,  proficiency: 78 },
      { name: 'Salesforce',      years: 0.5, projects: 2,  proficiency: 55 },
    ],
  },
];

/* ─── Animated number ────────────────────────────────────────────────────────── */
function AnimatedNumber({ value, suffix = '' }: { value: number; suffix?: string }) {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    let start = 0;
    const step = value / 30;
    const timer = setInterval(() => {
      start += step;
      if (start >= value) { setDisplay(value); clearInterval(timer); }
      else setDisplay(Math.floor(start * 10) / 10);
    }, 20);
    return () => clearInterval(timer);
  }, [value]);
  return <>{display}{suffix}</>;
}

/* ─── Skill card ─────────────────────────────────────────────────────────────── */
function SkillCard({ skill, color, glow, delay }: { skill: Skill; color: string; glow: string; delay: number }) {
  const [animate, setAnimate] = useState(false);
  useEffect(() => { const t = setTimeout(() => setAnimate(true), delay * 1000); return () => clearTimeout(t); }, [delay]);

  const profColor = skill.proficiency >= 90 ? '#34d399' : skill.proficiency >= 75 ? color : '#94a3b8';

  return (
    <motion.div
      className="relative rounded-2xl p-5 border border-white/8 bg-white/[0.03] backdrop-blur-sm overflow-hidden group"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      whileHover={{ y: -3, borderColor: `${color}55` }}
      style={{ boxShadow: '0 0 0 0 transparent' }}
    >
      {/* Hover glow sweep */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
        style={{ background: `radial-gradient(circle at 50% -10%, ${glow.replace('0.3', '0.15')}, transparent 70%)` }}
      />

      {/* Top row */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-bold text-white">{skill.name}</span>
        <span className="text-xs font-black tabular-nums" style={{ color: profColor }}>
          {animate ? <AnimatedNumber value={skill.proficiency} suffix="%" /> : '0%'}
        </span>
      </div>

      {/* Progress bar */}
      <div className="h-1.5 rounded-full bg-white/10 overflow-hidden mb-3">
        <motion.div
          className="h-full rounded-full"
          style={{ background: `linear-gradient(90deg, ${color}99, ${color})` }}
          initial={{ width: 0 }}
          animate={{ width: animate ? `${skill.proficiency}%` : 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
        />
      </div>

      {/* Bottom row — meta */}
      <div className="flex items-center gap-4 text-[11px] text-slate-500">
        <span className="flex items-center gap-1">
          <Clock className="w-3 h-3" />
          {skill.years}yr{skill.years !== 1 ? 's' : ''}
        </span>
        <span className="flex items-center gap-1">
          <FolderGit2 className="w-3 h-3" />
          {skill.projects} projects
        </span>
      </div>
    </motion.div>
  );
}

/* ─── Main section ───────────────────────────────────────────────────────────── */
export default function SkillsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [activeId, setActiveId] = useState('frontend');

  const active = CATEGORIES.find((c) => c.id === activeId)!;
  const ActiveIcon = active.icon;

  // Total stats for active category
  const totalProjects = active.skills.reduce((s, sk) => s + sk.projects, 0);
  const avgProf = Math.round(active.skills.reduce((s, sk) => s + sk.proficiency, 0) / active.skills.length);
  const maxYears = Math.max(...active.skills.map((sk) => sk.years));

  return (
    <section
      id="skills"
      ref={ref}
      className="relative py-28 px-4 sm:px-6 lg:px-8 bg-[#050a14] overflow-hidden"
    >
      {/* Ambient glows */}
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-emerald-600/5 rounded-full blur-[120px] pointer-events-none" />
      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(148,163,184,1) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      <div className="max-w-7xl mx-auto">

        {/* ── Section header ── */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 32 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 mb-5 rounded-full border border-cyan-500/20 bg-cyan-500/5 px-5 py-2"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.5, type: 'spring' }}
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-xs font-black uppercase tracking-[0.22em] text-cyan-300">Skills & Expertise</span>
          </motion.div>

          <h2 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-black text-white tracking-tight leading-none mb-4">
            What I{' '}
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: `linear-gradient(135deg, #38bdf8, #818cf8, #34d399)` }}
            >
              Build With
            </span>
          </h2>
          <p className="text-slate-400 text-base max-w-xl mx-auto">
            Hover over any skill card to explore years of experience, projects shipped, and proficiency level.
          </p>
        </motion.div>

        {/* ── Tab navigation ── */}
        <motion.div
          className="flex flex-wrap justify-center gap-2 mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const isActive = cat.id === activeId;
            return (
              <motion.button
                key={cat.id}
                onClick={() => setActiveId(cat.id)}
                className="relative flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all duration-300 border"
                style={isActive
                  ? { background: `${cat.color}18`, borderColor: `${cat.color}60`, color: cat.color, boxShadow: `0 0 20px ${cat.glow}` }
                  : { background: 'transparent', borderColor: 'rgba(255,255,255,0.08)', color: '#94a3b8' }
                }
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
              >
                <Icon className="w-3.5 h-3.5" />
                {cat.title}
                {isActive && (
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    layoutId="activeTabGlow"
                    style={{ background: `${cat.color}08`, border: `1px solid ${cat.color}40` }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </motion.button>
            );
          })}
        </motion.div>

        {/* ── Active category panel ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeId}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35 }}
          >
            {/* Category header card */}
            <div
              className="rounded-2xl border p-6 mb-6 flex flex-col sm:flex-row sm:items-center gap-5"
              style={{
                borderColor: `${active.color}25`,
                background: `linear-gradient(135deg, ${active.color}08, transparent)`,
                boxShadow: `0 0 40px ${active.glow.replace('0.3', '0.1')}`,
              }}
            >
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0"
                style={{ background: `${active.color}18`, boxShadow: `0 0 24px ${active.glow}` }}
              >
                <ActiveIcon className="w-7 h-7" style={{ color: active.color }} />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-black text-white mb-0.5">{active.title}</h3>
                <p className="text-sm text-slate-400">{active.skills.length} skills in this category</p>
              </div>

              {/* Stats strip */}
              <div className="flex gap-6 text-center">
                {[
                  { label: 'Max Exp.', value: `${maxYears}yr` },
                  { label: 'Total Projects', value: totalProjects },
                  { label: 'Avg. Proficiency', value: `${avgProf}%` },
                ].map((stat) => (
                  <div key={stat.label}>
                    <div className="text-xl font-black text-white" style={{ color: active.color }}>{stat.value}</div>
                    <div className="text-[10px] uppercase tracking-widest text-slate-500 font-semibold mt-0.5">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Skill cards grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {active.skills.map((skill, i) => (
                <SkillCard
                  key={skill.name}
                  skill={skill}
                  color={active.color}
                  glow={active.glow}
                  delay={i * 0.05}
                />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* ── All-categories overview strip ── */}
        <motion.div
          className="mt-12 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const avg = Math.round(cat.skills.reduce((s, sk) => s + sk.proficiency, 0) / cat.skills.length);
            return (
              <button
                key={cat.id}
                onClick={() => setActiveId(cat.id)}
                className="flex flex-col items-center gap-2 p-3 rounded-xl border border-white/5 bg-white/[0.02] hover:border-white/15 transition-all duration-200 group"
              >
                <Icon className="w-5 h-5 transition-colors duration-200" style={{ color: cat.color }} />
                <span className="text-[10px] font-semibold text-slate-500 group-hover:text-slate-300 transition-colors text-center leading-tight">{cat.title}</span>
                <div className="w-full h-1 rounded-full bg-white/5 overflow-hidden">
                  <div className="h-full rounded-full transition-all duration-700" style={{ width: `${avg}%`, background: cat.color }} />
                </div>
                <span className="text-[10px] font-black" style={{ color: cat.color }}>{avg}%</span>
              </button>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}
