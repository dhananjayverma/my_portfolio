'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { BookOpen, Clock, ArrowRight, Tag, Sparkles } from 'lucide-react';

interface BlogPost {
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
  color: string;
}

const posts: BlogPost[] = [
  {
    title: 'Building Offline-First React Native Apps',
    excerpt: 'How to implement robust offline capabilities in React Native using Redux Persist and network state detection. Lessons from building EV charging apps.',
    category: 'React Native',
    readTime: '8 min read',
    date: 'Dec 2024',
    color: '#0ea5e9',
  },
  {
    title: 'System Design for EV Charging Infrastructure',
    excerpt: 'Architecture patterns for handling real-time data from 500+ chargers. WebSocket, Redis caching, and microservices approach.',
    category: 'System Design',
    readTime: '12 min read',
    date: 'Nov 2024',
    color: '#22c55e',
  },
  {
    title: 'From Junior to Senior Developer in 3 Years',
    excerpt: 'My journey from Masai School to leading projects at Kazam EV. Key learnings, mistakes, and strategies for career acceleration.',
    category: 'Career Tips',
    readTime: '6 min read',
    date: 'Oct 2024',
    color: '#f59e0b',
  },
  {
    title: 'MERN Stack Best Practices in 2025',
    excerpt: 'Modern patterns for building scalable MERN applications. TypeScript, testing, and deployment strategies that work at scale.',
    category: 'MERN',
    readTime: '10 min read',
    date: 'Sep 2024',
    color: '#8b5cf6',
  },
  {
    title: 'WhatsApp Business API Integration Guide',
    excerpt: 'Step-by-step guide to integrating WhatsApp Business API for automation. QR login, bulk messaging, and session management.',
    category: 'Integration',
    readTime: '7 min read',
    date: 'Aug 2024',
    color: '#f97316',
  },
  {
    title: 'React Performance Optimization Deep Dive',
    excerpt: 'Advanced techniques for optimizing React applications. Memo, useMemo, useCallback, and virtual scrolling for large datasets.',
    category: 'React',
    readTime: '9 min read',
    date: 'Jul 2024',
    color: '#0ea5e9',
  },
];

export default function BlogSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="relative py-28 px-4 sm:px-6 lg:px-8 section-gradient-3">
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
            <span className="text-sm font-semibold text-orange-600 bg-orange-50 px-4 py-1.5 rounded-full border border-orange-200">
              <Sparkles className="w-3 h-3 inline mr-1" />
              Writing
            </span>
          </motion.div>
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-slate-800">
            Blog & Articles
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-lg">
            Sharing knowledge and learnings from building production applications.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {posts.map((post, index) => (
            <motion.article
              key={post.title}
              className="glass-card-strong p-6 group cursor-pointer relative overflow-hidden"
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: index * 0.08 }}
              whileHover={{ y: -6, borderColor: `${post.color}40`, boxShadow: '0 20px 40px rgba(0,0,0,0.08)' }}
            >
              <div className="absolute top-0 right-0 w-24 h-24 rounded-full blur-3xl opacity-10 group-hover:opacity-20 transition-opacity"
                style={{ backgroundColor: post.color }}
              />

              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-3">
                  <span
                    className="flex items-center gap-1 text-xs px-2 py-1 rounded-full border"
                    style={{ color: post.color, borderColor: `${post.color}30`, backgroundColor: `${post.color}10` }}
                  >
                    <Tag className="w-3 h-3" />
                    {post.category}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-800 mb-2 group-hover:text-sky-600 transition-colors line-clamp-2">
                  {post.title}
                </h3>

                <p className="text-sm text-slate-500 mb-4 line-clamp-3 leading-relaxed">
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 text-xs text-slate-400">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.readTime}
                    </span>
                    <span>{post.date}</span>
                  </div>

                  <motion.div
                    className="flex items-center gap-1 text-sm"
                    style={{ color: post.color }}
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <span className="text-xs">Read</span>
                    <ArrowRight className="w-3 h-3" />
                  </motion.div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 text-sm text-slate-400">
            <BookOpen className="w-4 h-4" />
            <span>More articles coming soon on Medium and Dev.to</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
