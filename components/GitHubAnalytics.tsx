'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { Github, GitCommit, GitBranch, Star, GitPullRequest, Activity, Sparkles } from 'lucide-react';

interface ContributionDay {
  date: string;
  count: number;
  level: number;
}

const generateMockContributions = (): ContributionDay[] => {
  const days: ContributionDay[] = [];
  const today = new Date();
  for (let i = 364; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const count = Math.random() > 0.4 ? Math.floor(Math.random() * 12) : 0;
    let level = 0;
    if (count > 0) level = 1;
    if (count > 4) level = 2;
    if (count > 8) level = 3;
    if (count > 10) level = 4;
    days.push({ date: date.toISOString().split('T')[0], count, level });
  }
  return days;
};

interface Language {
  name: string;
  percentage: number;
  color: string;
}

const languages: Language[] = [
  { name: 'TypeScript', percentage: 45, color: '#0ea5e9' },
  { name: 'JavaScript', percentage: 25, color: '#f59e0b' },
  { name: 'CSS', percentage: 12, color: '#8b5cf6' },
  { name: 'HTML', percentage: 8, color: '#f97316' },
  { name: 'Python', percentage: 5, color: '#22c55e' },
  { name: 'Shell', percentage: 5, color: '#64748b' },
];

interface Repo {
  name: string;
  stars: number;
  forks: number;
  language: string;
  color: string;
  description: string;
}

const repos: Repo[] = [
  { name: 'react-native-ev-app', stars: 120, forks: 15, language: 'TypeScript', color: '#0ea5e9', description: 'EV charging mobile app' },
  { name: 'healthcare-dashboard', stars: 85, forks: 12, language: 'JavaScript', color: '#f59e0b', description: 'Healthcare admin panel' },
  { name: 'lms-platform', stars: 67, forks: 8, language: 'TypeScript', color: '#0ea5e9', description: 'Learning management system' },
  { name: 'whatsapp-automation', stars: 95, forks: 20, language: 'JavaScript', color: '#f59e0b', description: 'WhatsApp business automation' },
  { name: 'portfolio-v3', stars: 45, forks: 5, language: 'TypeScript', color: '#0ea5e9', description: 'Personal portfolio website' },
];

export default function GitHubAnalytics() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [contributions, setContributions] = useState<ContributionDay[]>([]);

  useEffect(() => {
    setContributions(generateMockContributions());
  }, []);

  const streak = 45;
  const totalCommits = contributions.reduce((sum, d) => sum + d.count, 0);

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto" ref={ref}>
        {/* Header */}
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
              <Sparkles className="w-3 h-3 inline mr-1" />
              Open Source
            </span>
          </motion.div>
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-slate-800">
            GitHub Analytics
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-lg">
            A snapshot of my coding activity and open source contributions.
          </p>
        </motion.div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { icon: <GitCommit className="w-5 h-5" />, label: 'Total Commits', value: totalCommits.toString(), color: '#0ea5e9' },
            { icon: <Activity className="w-5 h-5" />, label: 'Current Streak', value: `${streak} days`, color: '#22c55e' },
            { icon: <GitBranch className="w-5 h-5" />, label: 'Repositories', value: '25+', color: '#f59e0b' },
            { icon: <Star className="w-5 h-5" />, label: 'Stars Earned', value: '500+', color: '#8b5cf6' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="glass-card-strong p-4 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -4, borderColor: `${stat.color}40` }}
            >
              <div className="w-8 h-8 rounded-lg flex items-center justify-center mx-auto mb-2"
                style={{ backgroundColor: `${stat.color}15`, color: stat.color }}
              >
                {stat.icon}
              </div>
              <div className="text-lg font-bold text-slate-800">{stat.value}</div>
              <div className="text-xs text-slate-400">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Contribution Graph */}
        <motion.div
          className="glass-card p-6 mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
              <Github className="w-4 h-4" />
              Contribution Graph
            </h3>
            <span className="text-xs text-slate-400">{totalCommits} contributions in the last year</span>
          </div>

          <div className="flex gap-1 overflow-x-auto pb-2">
            {Array.from({ length: 53 }).map((_, weekIndex) => (
              <div key={weekIndex} className="flex flex-col gap-1">
                {Array.from({ length: 7 }).map((_, dayIndex) => {
                  const dayIndex2 = weekIndex * 7 + dayIndex;
                  const day = contributions[dayIndex2];
                  if (!day) return null;
                  const opacity = day.level === 0 ? 0.1 : day.level * 0.25;
                  return (
                    <motion.div
                      key={dayIndex}
                      className="w-3 h-3 rounded-sm flex-shrink-0"
                      style={{ backgroundColor: day.level === 0 ? '#e2e8f0' : `rgba(14, 165, 233, ${opacity})` }}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ duration: 0.3, delay: dayIndex2 * 0.002 }}
                      title={`${day.date}: ${day.count} contributions`}
                    />
                  );
                })}
              </div>
            ))}
          </div>

          <div className="flex items-center justify-end gap-2 mt-3">
            <span className="text-xs text-slate-400">Less</span>
            {[0.1, 0.25, 0.5, 0.75, 1].map((level, i) => (
              <div key={i} className="w-3 h-3 rounded-sm" style={{ backgroundColor: `rgba(14, 165, 233, ${level})` }} />
            ))}
            <span className="text-xs text-slate-400">More</span>
          </div>
        </motion.div>

        {/* Language Stats & Repos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Languages */}
          <motion.div
            className="glass-card p-6"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3 className="text-sm font-bold text-slate-800 mb-4">Languages</h3>
            <div className="space-y-3">
              {languages.map((lang, index) => (
                <div key={lang.name}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-[#94a3b8]">{lang.name}</span>
                    <span className="text-xs text-[#64748b]">{lang.percentage}%</span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ backgroundColor: lang.color }}
                      initial={{ width: 0 }}
                      animate={isInView ? { width: `${lang.percentage}%` } : {}}
                      transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Top Repos */}
          <motion.div
            className="glass-card p-6"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <h3 className="text-sm font-bold text-slate-800 mb-4">Top Repositories</h3>
            <div className="space-y-3">
              {repos.map((repo, index) => (
                <motion.div
                  key={repo.name}
                  className="flex items-center justify-between p-2 rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
                  whileHover={{ x: 4 }}
                  initial={{ opacity: 0, x: -10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.3, delay: 0.6 + index * 0.08 }}
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: repo.color }} />
                      <span className="text-sm text-slate-800 font-medium truncate">{repo.name}</span>
                    </div>
                    <div className="text-xs text-slate-400 ml-4">{repo.description}</div>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-slate-400 flex-shrink-0 ml-4">
                    <span className="flex items-center gap-1">
                      <Star className="w-3 h-3" /> {repo.stars}
                    </span>
                    <span className="flex items-center gap-1">
                      <GitPullRequest className="w-3 h-3" /> {repo.forks}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
