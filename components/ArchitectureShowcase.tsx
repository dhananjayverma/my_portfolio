'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Server, Database, Globe, Cpu, Shield, Zap, ArrowRight, Layers, Sparkles } from 'lucide-react';

interface ArchitectureLayer {
  id: string;
  label: string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  nodes: string[];
  description: string;
}

const layers: ArchitectureLayer[] = [
  {
    id: 'client',
    label: 'Client Layer',
    icon: <Globe className="w-5 h-5" />,
    color: '#0ea5e9',
    bgColor: 'bg-sky-50',
    nodes: ['React App', 'React Native', 'Next.js SSR', 'PWA'],
    description: 'Multi-platform frontend with responsive web, mobile apps, and server-side rendering',
  },
  {
    id: 'gateway',
    label: 'API Gateway',
    icon: <Shield className="w-5 h-5" />,
    color: '#f59e0b',
    bgColor: 'bg-amber-50',
    nodes: ['Express Server', 'Auth Middleware', 'Rate Limiting', 'CORS'],
    description: 'Express.js gateway handling authentication, rate limiting, and request routing',
  },
  {
    id: 'services',
    label: 'Microservices',
    icon: <Cpu className="w-5 h-5" />,
    color: '#22c55e',
    bgColor: 'bg-emerald-50',
    nodes: ['User Service', 'Order Service', 'Payment Service', 'Notification Service'],
    description: 'Modular services for user management, orders, payments, and real-time notifications',
  },
  {
    id: 'data',
    label: 'Data Layer',
    icon: <Database className="w-5 h-5" />,
    color: '#8b5cf6',
    bgColor: 'bg-violet-50',
    nodes: ['MongoDB', 'Redis Cache', 'PostgreSQL', 'AWS S3'],
    description: 'Multi-database architecture with document store, cache, relational, and file storage',
  },
  {
    id: 'infra',
    label: 'Infrastructure',
    icon: <Server className="w-5 h-5" />,
    color: '#f97316',
    bgColor: 'bg-orange-50',
    nodes: ['AWS EC2', 'Docker', 'CI/CD', 'CloudWatch'],
    description: 'Cloud infrastructure with containerization, automated deployment, and monitoring',
  },
];

export default function ArchitectureShowcase() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [activeLayer, setActiveLayer] = useState<string | null>(null);

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
              System Design
            </span>
          </motion.div>
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-slate-800">
            Architecture Showcase
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-lg">
            Interactive system design diagrams. Click on each layer to explore.
          </p>
        </motion.div>

        <div className="space-y-3">
          {layers.map((layer, index) => {
            const isActive = activeLayer === layer.id;
            return (
              <motion.div
                key={layer.id}
                initial={{ opacity: 0, x: -50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <motion.div
                  className="relative"
                  onClick={() => setActiveLayer(isActive ? null : layer.id)}
                >
                  <motion.div
                    className="glass-card-strong p-5 cursor-pointer flex items-center gap-4 relative overflow-hidden group"
                    whileHover={{ x: 10, borderColor: `${layer.color}40`, boxShadow: '0 15px 35px rgba(0,0,0,0.08)' }}
                    transition={{ duration: 0.3 }}
                    style={{ borderColor: isActive ? `${layer.color}40` : undefined }}
                  >
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{ background: `radial-gradient(circle at left, ${layer.color}10, transparent)` }}
                    />

                    <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: `${layer.color}15`, color: layer.color }}
                    >
                      {layer.icon}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-base font-bold text-slate-800">{layer.label}</h3>
                        <motion.div
                          animate={{ rotate: isActive ? 90 : 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <ArrowRight className="w-4 h-4 text-slate-400" />
                        </motion.div>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {layer.nodes.map((node) => (
                          <span key={node} className="text-xs px-2 py-1 rounded-md font-medium"
                            style={{ color: layer.color, borderColor: `${layer.color}25`, backgroundColor: `${layer.color}10`, border: '1px solid' }}
                          >
                            {node}
                          </span>
                        ))}
                      </div>
                    </div>

                    {index < layers.length - 1 && (
                      <div className="absolute bottom-0 left-10 w-0.5 h-4 bg-slate-200 translate-y-full" />
                    )}
                  </motion.div>

                  <motion.div
                    initial={false}
                    animate={{
                      height: isActive ? 'auto' : 0,
                      opacity: isActive ? 1 : 0,
                    }}
                    transition={{ duration: 0.4, ease: [0.215, 0.61, 0.355, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="glass-card p-4 mt-2 ml-10 border-l-2"
                      style={{ borderLeftColor: layer.color }}
                    >
                      <p className="text-sm text-slate-500 leading-relaxed">{layer.description}</p>
                    </div>
                  </motion.div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 glass-card px-6 py-3">
            <Layers className="w-4 h-4 text-sky-500" />
            <span className="text-sm text-slate-500">
              <span className="text-sky-600 font-bold">Client</span>
              <ArrowRight className="w-3 h-3 inline mx-2 text-slate-300" />
              <span className="text-amber-600 font-bold">Gateway</span>
              <ArrowRight className="w-3 h-3 inline mx-2 text-slate-300" />
              <span className="text-emerald-600 font-bold">Services</span>
              <ArrowRight className="w-3 h-3 inline mx-2 text-slate-300" />
              <span className="text-violet-600 font-bold">Data</span>
              <ArrowRight className="w-3 h-3 inline mx-2 text-slate-300" />
              <span className="text-orange-600 font-bold">Infra</span>
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
