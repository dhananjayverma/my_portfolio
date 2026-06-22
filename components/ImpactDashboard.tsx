'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Calendar, Rocket, Users, Shield, Clock, Code2, Trophy, Star, Sparkles } from 'lucide-react';

interface Stat {
  icon: React.ReactNode;
  label: string;
  value: number;
  suffix: string;
  color: string;
  bgColor: string;
}

const stats: Stat[] = [
  { icon: <Calendar className="w-5 h-5" />, label: 'Years Experience', value: 3.5, suffix: '+', color: '#0ea5e9', bgColor: 'bg-sky-50' },
  { icon: <Rocket className="w-5 h-5" />, label: 'Projects Delivered', value: 20, suffix: '+', color: '#22c55e', bgColor: 'bg-emerald-50' },
  { icon: <Users className="w-5 h-5" />, label: 'Users Impacted', value: 50, suffix: 'K+', color: '#f59e0b', bgColor: 'bg-amber-50' },
  { icon: <Shield className="w-5 h-5" />, label: 'System Uptime', value: 99.9, suffix: '%', color: '#8b5cf6', bgColor: 'bg-violet-50' },
  { icon: <Clock className="w-5 h-5" />, label: 'Hours Coded', value: 5000, suffix: '+', color: '#f97316', bgColor: 'bg-orange-50' },
  { icon: <Code2 className="w-5 h-5" />, label: 'Lines of Code', value: 150, suffix: 'K+', color: '#38bdf8', bgColor: 'bg-cyan-50' },
  { icon: <Trophy className="w-5 h-5" />, label: 'Awards Won', value: 3, suffix: '', color: '#eab308', bgColor: 'bg-yellow-50' },
  { icon: <Star className="w-5 h-5" />, label: 'GitHub Stars', value: 500, suffix: '+', color: '#ec4899', bgColor: 'bg-pink-50' },
];

function AnimatedCounter({ value, suffix, isInView }: { value: number; suffix: string; isInView: boolean }) {
  const [count, setCount] = useState(0);
  const isDecimal = value % 1 !== 0;

  useEffect(() => {
    if (!isInView) return;
    const duration = 2000;
    const startTime = Date.now();
    const start = 0;
    const end = value;

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setCount(isDecimal ? start + (end - start) * easeOut : Math.floor(start + (end - start) * easeOut));
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };
    animate();
  }, [isInView, value, isDecimal]);

  return (
    <span className="font-mono font-bold">
      {isDecimal ? count.toFixed(1) : Math.floor(count)}{suffix}
    </span>
  );
}

export default function ImpactDashboard() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="relative py-28 px-4 sm:px-6 lg:px-8 section-gradient-4">
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
            <span className="text-sm font-semibold text-violet-600 bg-violet-50 px-4 py-1.5 rounded-full border border-violet-200">
              <Sparkles className="w-3 h-3 inline mr-1" />
              Impact
            </span>
          </motion.div>
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-slate-800">
            Real Impact Dashboard
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-lg">
            Numbers that tell the story of impact and dedication.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="glass-card-strong p-6 text-center relative overflow-hidden group"
              initial={{ opacity: 0, y: 40, scale: 0.9 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: index * 0.08 }}
              whileHover={{ y: -6, scale: 1.03, boxShadow: '0 20px 40px rgba(0,0,0,0.08)' }}
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: `radial-gradient(circle at 50% 50%, ${stat.color}08, transparent)` }}
              />
              
              <div className="relative z-10">
                <motion.div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3"
                  style={{ backgroundColor: `${stat.color}15`, color: stat.color }}
                  animate={isInView ? { rotate: [0, 10, -10, 0] } : {}}
                  transition={{ duration: 2, delay: index * 0.1, repeat: Infinity, repeatDelay: 3 }}
                >
                  {stat.icon}
                </motion.div>
                <div className="text-2xl sm:text-3xl mb-1" style={{ color: stat.color }}>
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} isInView={isInView} />
                </div>
                <div className="text-xs text-slate-400 font-medium">{stat.label}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
