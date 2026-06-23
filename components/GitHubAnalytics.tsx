'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { Github, GitCommit, GitBranch, Star, GitFork, Activity, Sparkles, ExternalLink } from 'lucide-react';
import type { ContributionDay, GitHubAnalyticsData, LanguageStat, RepoStat } from '@/lib/github';

const CONTRIBUTION_COLORS = ['#e2e8f0', '#bae6fd', '#7dd3fc', '#38bdf8', '#0284c7'];
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function AnimatedStat({ value, suffix, isInView }: { value: number; suffix: string; isInView: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const duration = 1800;
    const startTime = Date.now();

    const animate = () => {
      const progress = Math.min((Date.now() - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(value * eased));
      if (progress < 1) requestAnimationFrame(animate);
      else setCount(value);
    };
    animate();
  }, [isInView, value]);

  return (
    <span className="font-mono font-bold">
      {count.toLocaleString()}{suffix}
    </span>
  );
}

function getMonthLabels(contributions: ContributionDay[]) {
  if (contributions.length === 0) return [];

  const labels: { month: string; weekIndex: number }[] = [];
  let lastMonth = -1;

  contributions.forEach((day, index) => {
    const weekIndex = Math.floor(index / 7);
    const month = new Date(`${day.date}T00:00:00`).getMonth();
    if (month !== lastMonth && index % 7 === 0) {
      labels.push({ month: MONTHS[month], weekIndex });
      lastMonth = month;
    }
  });

  return labels;
}

function StatSkeleton() {
  return (
    <div className="glass-card-strong p-5 text-center animate-pulse">
      <div className="w-10 h-10 rounded-xl bg-slate-200 mx-auto mb-2" />
      <div className="h-7 bg-slate-200 rounded w-16 mx-auto mb-2" />
      <div className="h-3 bg-slate-100 rounded w-20 mx-auto" />
    </div>
  );
}

export default function GitHubAnalytics() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [data, setData] = useState<GitHubAnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadGitHubData() {
      try {
        const response = await fetch('/api/github');
        if (!response.ok) throw new Error('Failed to load GitHub data');

        const analytics = (await response.json()) as GitHubAnalyticsData;
        if (!cancelled) {
          setData(analytics);
          setError(null);
        }
      } catch {
        if (!cancelled) setError('Could not load live GitHub data right now.');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadGitHubData();
    return () => {
      cancelled = true;
    };
  }, []);

  const contributions = data?.contributions ?? [];
  const languages: LanguageStat[] = data?.languages ?? [];
  const repos: RepoStat[] = data?.repos ?? [];
  const monthLabels = getMonthLabels(contributions);

  const stats = data
    ? [
        { icon: <GitCommit className="w-5 h-5" />, label: 'Contributions', value: data.totalContributions, suffix: '', color: '#0ea5e9', animate: true },
        { icon: <Activity className="w-5 h-5" />, label: 'Current Streak', value: data.currentStreak, suffix: ' days', color: '#22c55e', animate: false },
        { icon: <GitBranch className="w-5 h-5" />, label: 'Repositories', value: data.publicRepos, suffix: '', color: '#f59e0b', animate: false },
        { icon: <Star className="w-5 h-5" />, label: 'Stars Earned', value: data.totalStars, suffix: '', color: '#8b5cf6', animate: false },
      ]
    : [];

  return (
    <section className="relative py-28 px-4 sm:px-6 lg:px-8 section-gradient-1">
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
              <Sparkles className="w-3 h-3 inline mr-1" />
              Open Source
            </span>
          </motion.div>
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-slate-800">
            GitHub Analytics
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-lg">
            Live data from{' '}
            <a
              href={data?.profileUrl ?? 'https://github.com/dhananjayverma'}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sky-600 hover:text-sky-700 font-medium inline-flex items-center gap-1"
            >
              @{data?.username ?? 'dhananjayverma'}
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </p>
          {error && (
            <p className="text-sm text-amber-600 mt-3">{error}</p>
          )}
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {loading
            ? Array.from({ length: 4 }).map((_, index) => <StatSkeleton key={index} />)
            : stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="glass-card-strong p-5 text-center relative overflow-hidden group"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -4, boxShadow: '0 16px 32px rgba(0,0,0,0.08)' }}
                >
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: `radial-gradient(circle at 50% 50%, ${stat.color}10, transparent)` }}
                  />
                  <div className="relative z-10">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-2"
                      style={{ backgroundColor: `${stat.color}15`, color: stat.color }}
                    >
                      {stat.icon}
                    </div>
                    <div className="text-xl sm:text-2xl mb-1" style={{ color: stat.color }}>
                      {stat.animate ? (
                        <AnimatedStat value={stat.value} suffix={stat.suffix} isInView={isInView} />
                      ) : (
                        <span className="font-mono font-bold">
                          {stat.value.toLocaleString()}{stat.suffix}
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-slate-500 font-medium">{stat.label}</div>
                  </div>
                </motion.div>
              ))}
        </div>

        <motion.div
          className="glass-card-strong p-6 mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-5">
            <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
              <Github className="w-4 h-4 text-slate-700" />
              Contribution Graph
            </h3>
            <span className="text-xs text-slate-500">
              {loading
                ? 'Loading contributions...'
                : `${(data?.totalContributions ?? 0).toLocaleString()} contributions in the last year`}
            </span>
          </div>

          {loading ? (
            <div className="h-28 rounded-xl bg-slate-100 animate-pulse" />
          ) : (
            <>
              <div className="overflow-x-auto pb-1">
                <div className="inline-flex flex-col gap-1 min-w-max">
                  <div className="flex gap-1 h-4 ml-8">
                    {Array.from({ length: 53 }).map((_, weekIndex) => {
                      const label = monthLabels.find((m) => m.weekIndex === weekIndex);
                      return (
                        <div key={weekIndex} className="w-[11px] flex-shrink-0 text-[10px] text-slate-500 leading-none">
                          {label?.month ?? ''}
                        </div>
                      );
                    })}
                  </div>

                  <div className="flex gap-1">
                    <div className="flex flex-col gap-1 pr-1 justify-around text-[10px] text-slate-400 w-7 flex-shrink-0">
                      <span>Mon</span>
                      <span className="opacity-0">Tue</span>
                      <span>Wed</span>
                      <span className="opacity-0">Thu</span>
                      <span>Fri</span>
                      <span className="opacity-0">Sat</span>
                      <span className="opacity-0">Sun</span>
                    </div>

                    {Array.from({ length: 53 }).map((_, weekIndex) => (
                      <div key={weekIndex} className="flex flex-col gap-1">
                        {Array.from({ length: 7 }).map((_, dayIndex) => {
                          const dayIndex2 = weekIndex * 7 + dayIndex;
                          const day = contributions[dayIndex2];
                          if (!day) {
                            return <div key={dayIndex} className="w-[11px] h-[11px] flex-shrink-0" />;
                          }
                          const level = Math.min(day.level, CONTRIBUTION_COLORS.length - 1);
                          return (
                            <motion.div
                              key={dayIndex}
                              className="w-[11px] h-[11px] rounded-sm flex-shrink-0 cursor-default"
                              style={{ backgroundColor: CONTRIBUTION_COLORS[level] }}
                              initial={{ opacity: 0, scale: 0 }}
                              animate={isInView ? { opacity: 1, scale: 1 } : {}}
                              transition={{ duration: 0.2, delay: Math.min(dayIndex2 * 0.001, 0.4) }}
                              title={`${day.date}: ${day.count} contribution${day.count !== 1 ? 's' : ''}`}
                            />
                          );
                        })}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end gap-1.5 mt-4">
                <span className="text-xs text-slate-500 mr-1">Less</span>
                {CONTRIBUTION_COLORS.map((color, i) => (
                  <div key={i} className="w-[11px] h-[11px] rounded-sm" style={{ backgroundColor: color }} />
                ))}
                <span className="text-xs text-slate-500 ml-1">More</span>
              </div>
            </>
          )}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <motion.div
            className="glass-card-strong p-6"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3 className="text-sm font-bold text-slate-800 mb-5">Languages</h3>
            {loading ? (
              <div className="space-y-4">
                {Array.from({ length: 5 }).map((_, index) => (
                  <div key={index} className="h-8 bg-slate-100 rounded animate-pulse" />
                ))}
              </div>
            ) : languages.length > 0 ? (
              <div className="max-h-[420px] overflow-y-auto pr-2 space-y-4 github-scroll">
                {languages.map((lang, index) => (
                  <div key={lang.name}>
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2 min-w-0">
                        <span
                          className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                          style={{ backgroundColor: lang.color }}
                        />
                        <span className="text-sm font-medium text-slate-700">{lang.name}</span>
                      </div>
                      <span className="text-xs font-semibold text-slate-600 tabular-nums">{lang.percentage}%</span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ backgroundColor: lang.color }}
                        initial={{ width: 0 }}
                        animate={isInView ? { width: `${lang.percentage}%` } : {}}
                        transition={{ duration: 1, delay: 0.5 + index * 0.08 }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-slate-500">No public repository languages found.</p>
            )}
          </motion.div>

          <motion.div
            className="glass-card-strong p-6 flex flex-col"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <div className="flex items-center justify-between gap-2 mb-5">
              <h3 className="text-sm font-bold text-slate-800">All Repositories</h3>
              {!loading && repos.length > 0 && (
                <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-1 rounded-full tabular-nums">
                  {repos.length} repos
                </span>
              )}
            </div>
            {loading ? (
              <div className="space-y-2">
                {Array.from({ length: 6 }).map((_, index) => (
                  <div key={index} className="h-16 bg-slate-100 rounded-xl animate-pulse" />
                ))}
              </div>
            ) : repos.length > 0 ? (
              <div className="max-h-[420px] overflow-y-auto pr-2 space-y-2 github-scroll">
                {repos.map((repo) => (
                  <a
                    key={repo.name}
                    href={repo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start justify-between gap-3 p-3 rounded-xl border border-slate-100 hover:border-sky-200 hover:bg-sky-50/50 transition-colors"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: repo.color }} />
                        <span className="text-sm font-semibold text-slate-800">{repo.name}</span>
                        <span
                          className="text-[10px] font-medium px-1.5 py-0.5 rounded-md"
                          style={{ backgroundColor: `${repo.color}15`, color: repo.color }}
                        >
                          {repo.language}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-1 ml-4 line-clamp-1">{repo.description}</p>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-slate-500 flex-shrink-0">
                      <span className="flex items-center gap-1 tabular-nums">
                        <Star className="w-3.5 h-3.5" />
                        {repo.stars}
                      </span>
                      <span className="flex items-center gap-1 tabular-nums">
                        <GitFork className="w-3.5 h-3.5" />
                        {repo.forks}
                      </span>
                    </div>
                  </a>
                ))}
              </div>
            ) : (
              <p className="text-sm text-slate-500">No public repositories found.</p>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
