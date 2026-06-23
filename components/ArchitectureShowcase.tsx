'use client';

import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import {
  Globe, Shield, Cpu, Database, Server,
  Sparkles, ArrowRight, Zap, Clock, Activity,
  CheckCircle2, ChevronRight,
} from 'lucide-react';

/* ─── Types ─────────────────────────────────────────────────────────────────── */
interface Tech {
  name: string;
  role: string;
}
interface Metric {
  label: string;
  value: string;
  icon: React.ElementType;
}
interface Layer {
  id: string;
  label: string;
  subtitle: string;
  icon: React.ElementType;
  color: string;
  glow: string;
  techs: Tech[];
  metrics: Metric[];
  description: string;
}

/* ─── Architecture data ──────────────────────────────────────────────────────── */
const LAYERS: Layer[] = [
  {
    id: 'client',
    label: 'Client Layer',
    subtitle: 'Multi-platform UI',
    icon: Globe,
    color: '#38bdf8',
    glow: 'rgba(56,189,248,0.35)',
    description: 'Multi-platform frontend with responsive web, cross-platform mobile apps, and server-side rendering. Optimized for Core Web Vitals and PWA capabilities.',
    techs: [
      { name: 'React.js',     role: 'Web SPA' },
      { name: 'React Native', role: 'Mobile App' },
      { name: 'Next.js SSR',  role: 'Server Render' },
      { name: 'PWA',          role: 'Offline Support' },
      { name: 'TypeScript',   role: 'Type Safety' },
      { name: 'Redux',        role: 'State Mgmt' },
    ],
    metrics: [
      { label: 'LCP',     value: '< 1.8s',  icon: Zap },
      { label: 'Uptime',  value: '99.9%',   icon: Activity },
      { label: 'Bundle',  value: '< 200kb', icon: CheckCircle2 },
    ],
  },
  {
    id: 'gateway',
    label: 'API Gateway',
    subtitle: 'Auth & routing layer',
    icon: Shield,
    color: '#fbbf24',
    glow: 'rgba(251,191,36,0.35)',
    description: 'Express.js gateway handling JWT authentication, rate limiting, CORS, and intelligent request routing to downstream microservices. Acts as the single entry point.',
    techs: [
      { name: 'Express.js',      role: 'Gateway Server' },
      { name: 'JWT Middleware',   role: 'Auth' },
      { name: 'Rate Limiting',   role: 'Traffic Control' },
      { name: 'CORS',            role: 'Cross-Origin' },
      { name: 'Helmet.js',       role: 'Security Headers' },
      { name: 'Morgan',          role: 'Request Logging' },
    ],
    metrics: [
      { label: 'Latency', value: '< 30ms',  icon: Clock },
      { label: 'RPS',     value: '10K+',    icon: Activity },
      { label: 'Uptime',  value: '99.9%',   icon: CheckCircle2 },
    ],
  },
  {
    id: 'services',
    label: 'Microservices',
    subtitle: 'Business logic layer',
    icon: Cpu,
    color: '#34d399',
    glow: 'rgba(52,211,153,0.35)',
    description: 'Domain-driven microservices each owning their business logic and data. Services communicate via REST and event-driven messaging with RabbitMQ/Redis pub-sub.',
    techs: [
      { name: 'User Service',         role: 'Auth & Profiles' },
      { name: 'Order Service',        role: 'Transactions' },
      { name: 'Notification Service', role: 'Push / Email / SMS' },
      { name: 'Payment Service',      role: 'Payments' },
      { name: 'Analytics Service',    role: 'Metrics' },
      { name: 'WhatsApp Service',     role: 'Automation' },
    ],
    metrics: [
      { label: 'Services',    value: '6+',    icon: Cpu },
      { label: 'Avg Latency', value: '45ms',  icon: Clock },
      { label: 'Uptime',      value: '99.9%', icon: Activity },
    ],
  },
  {
    id: 'data',
    label: 'Data Layer',
    subtitle: 'Persistence & cache',
    icon: Database,
    color: '#a78bfa',
    glow: 'rgba(167,139,250,0.35)',
    description: 'Polyglot persistence architecture — MongoDB for flexible documents, PostgreSQL for relational data, Redis for high-speed cache, and AWS S3 for file/asset storage.',
    techs: [
      { name: 'MongoDB',    role: 'Document Store' },
      { name: 'PostgreSQL', role: 'Relational DB' },
      { name: 'Redis',      role: 'Cache & Pub-Sub' },
      { name: 'AWS S3',     role: 'Object Storage' },
      { name: 'Mongoose',   role: 'ODM' },
      { name: 'Prisma',     role: 'ORM' },
    ],
    metrics: [
      { label: 'Cache Hit', value: '94%',   icon: Zap },
      { label: 'Query Avg', value: '12ms',  icon: Clock },
      { label: 'Storage',   value: '500GB+',icon: Database },
    ],
  },
  {
    id: 'infra',
    label: 'Infrastructure',
    subtitle: 'Cloud & DevOps',
    icon: Server,
    color: '#fb923c',
    glow: 'rgba(251,146,60,0.35)',
    description: 'Cloud-native infrastructure on AWS with containerized deployments, automated CI/CD pipelines, zero-downtime rolling updates, and comprehensive CloudWatch monitoring.',
    techs: [
      { name: 'AWS EC2',    role: 'Compute' },
      { name: 'Docker',     role: 'Containers' },
      { name: 'CI/CD',      role: 'Auto Deploy' },
      { name: 'CloudWatch', role: 'Monitoring' },
      { name: 'Nginx',      role: 'Load Balancer' },
      { name: 'Vercel',     role: 'Frontend Deploy' },
    ],
    metrics: [
      { label: 'Deploy Time', value: '< 3min', icon: Zap },
      { label: 'Uptime',      value: '99.9%',  icon: Activity },
      { label: 'Servers',     value: '500+',   icon: Server },
    ],
  },
];

/* ─── Animated data-flow connector ──────────────────────────────────────────── */
function FlowConnector({ color, active }: { color: string; active: boolean }) {
  return (
    <div className="relative flex justify-center" style={{ height: 32 }}>
      {/* Static line */}
      <div className="absolute top-0 bottom-0 w-px bg-white/8" />
      {/* Animated dot */}
      {active && (
        <motion.div
          className="absolute w-1.5 h-1.5 rounded-full left-1/2 -translate-x-1/2"
          style={{ backgroundColor: color, boxShadow: `0 0 8px ${color}` }}
          animate={{ top: [0, '100%'] }}
          transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
        />
      )}
      <div
        className="absolute top-0 bottom-0 w-px opacity-40"
        style={{ background: `linear-gradient(to bottom, ${color}00, ${color}80, ${color}00)` }}
      />
    </div>
  );
}

/* ─── Layer row ─────────────────────────────────────────────────────────────── */
function LayerRow({
  layer, index, isActive, isInView, onClick,
}: {
  layer: Layer; index: number; isActive: boolean; isInView: boolean; onClick: () => void;
}) {
  const Icon = layer.icon;
  return (
    <motion.div
      initial={{ opacity: 0, x: -40 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.09 }}
    >
      <motion.button
        onClick={onClick}
        className="w-full text-left rounded-2xl border p-4 transition-all duration-300 relative overflow-hidden group"
        style={{
          borderColor: isActive ? `${layer.color}60` : 'rgba(255,255,255,0.07)',
          background: isActive ? `${layer.color}0d` : 'rgba(255,255,255,0.02)',
          boxShadow: isActive ? `0 0 30px ${layer.glow.replace('0.35', '0.15')}` : 'none',
        }}
        whileHover={{ scale: 1.01, x: 4 }}
        whileTap={{ scale: 0.99 }}
        transition={{ duration: 0.2 }}
      >
        {/* Hover sweep */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{ background: `radial-gradient(ellipse at left center, ${layer.color}10, transparent 60%)` }}
        />

        <div className="relative flex items-center gap-4">
          {/* Icon */}
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300"
            style={{
              background: isActive ? `${layer.color}20` : `${layer.color}10`,
              boxShadow: isActive ? `0 0 20px ${layer.glow}` : 'none',
            }}
          >
            <Icon className="w-5 h-5" style={{ color: layer.color }} />
          </div>

          {/* Label + pills */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm font-bold text-white">{layer.label}</span>
              <span className="text-[10px] text-slate-500 font-medium hidden sm:block">{layer.subtitle}</span>
              {isActive && (
                <motion.span
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full"
                  style={{ color: layer.color, background: `${layer.color}18`, border: `1px solid ${layer.color}40` }}
                >
                  Active
                </motion.span>
              )}
            </div>
            <div className="flex flex-wrap gap-1.5">
              {layer.techs.slice(0, 4).map((t) => (
                <span
                  key={t.name}
                  className="text-[10px] px-2 py-0.5 rounded-md font-semibold border"
                  style={{ color: layer.color, borderColor: `${layer.color}25`, background: `${layer.color}0d` }}
                >
                  {t.name}
                </span>
              ))}
              {layer.techs.length > 4 && (
                <span className="text-[10px] px-2 py-0.5 rounded-md font-semibold border border-white/8 text-slate-500">
                  +{layer.techs.length - 4} more
                </span>
              )}
            </div>
          </div>

          {/* Chevron */}
          <motion.div animate={{ rotate: isActive ? 90 : 0 }} transition={{ duration: 0.25 }}>
            <ChevronRight className="w-4 h-4 text-slate-600" />
          </motion.div>
        </div>
      </motion.button>
    </motion.div>
  );
}

/* ─── Detail panel ───────────────────────────────────────────────────────────── */
function DetailPanel({ layer }: { layer: Layer }) {
  const Icon = layer.icon;
  return (
    <motion.div
      key={layer.id}
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -16 }}
      transition={{ duration: 0.3 }}
      className="h-full flex flex-col gap-5"
    >
      {/* Header */}
      <div
        className="rounded-2xl p-5 border"
        style={{
          borderColor: `${layer.color}30`,
          background: `linear-gradient(135deg, ${layer.color}10, transparent)`,
          boxShadow: `0 0 40px ${layer.glow.replace('0.35', '0.1')}`,
        }}
      >
        <div className="flex items-center gap-3 mb-3">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center"
            style={{ background: `${layer.color}20`, boxShadow: `0 0 20px ${layer.glow}` }}
          >
            <Icon className="w-6 h-6" style={{ color: layer.color }} />
          </div>
          <div>
            <h3 className="text-lg font-black text-white">{layer.label}</h3>
            <p className="text-xs text-slate-500 font-medium">{layer.subtitle}</p>
          </div>
        </div>
        <p className="text-sm text-slate-400 leading-relaxed">{layer.description}</p>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-3 gap-3">
        {layer.metrics.map((m) => {
          const MIcon = m.icon;
          return (
            <div
              key={m.label}
              className="rounded-xl p-3 border border-white/6 bg-white/[0.03] text-center"
            >
              <MIcon className="w-4 h-4 mx-auto mb-1.5" style={{ color: layer.color }} />
              <div className="text-lg font-black text-white">{m.value}</div>
              <div className="text-[9px] uppercase tracking-widest text-slate-500 font-semibold mt-0.5">{m.label}</div>
            </div>
          );
        })}
      </div>

      {/* Tech grid */}
      <div>
        <p className="text-[10px] uppercase tracking-widest text-slate-600 font-black mb-3">Technologies</p>
        <div className="grid grid-cols-2 gap-2">
          {layer.techs.map((t) => (
            <div
              key={t.name}
              className="flex items-center justify-between rounded-xl px-3 py-2.5 border border-white/6 bg-white/[0.02] group hover:border-white/15 transition-colors"
            >
              <span className="text-xs font-bold text-white">{t.name}</span>
              <span className="text-[9px] font-semibold px-1.5 py-0.5 rounded-md" style={{ color: layer.color, background: `${layer.color}15` }}>{t.role}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Main section ───────────────────────────────────────────────────────────── */
export default function ArchitectureShowcase() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [activeId, setActiveId] = useState('client');

  const activeLayer = LAYERS.find((l) => l.id === activeId)!;

  return (
    <section
      id="architecture"
      ref={ref}
      className="relative py-28 px-4 sm:px-6 lg:px-8 bg-[#050a14] overflow-hidden"
    >
      {/* Ambient glows */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-violet-600/4 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-sky-600/4 rounded-full blur-[120px] pointer-events-none" />
      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(circle, rgba(148,163,184,1) 1px, transparent 1px)', backgroundSize: '32px 32px' }}
      />

      <div className="max-w-7xl mx-auto" ref={ref}>

        {/* ── Header ── */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 32 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 mb-5 rounded-full border border-violet-500/20 bg-violet-500/5 px-5 py-2"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.5, type: 'spring' }}
          >
            <Sparkles className="w-3.5 h-3.5 text-violet-400" />
            <span className="text-xs font-black uppercase tracking-[0.22em] text-violet-300">System Design</span>
          </motion.div>
          <h2 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-black text-white tracking-tight leading-none mb-4">
            Architecture{' '}
            <span className="bg-gradient-to-r from-violet-400 via-sky-400 to-emerald-400 bg-clip-text text-transparent">
              Showcase
            </span>
          </h2>
          <p className="text-slate-400 text-base max-w-xl mx-auto">
            Click any layer to explore the full tech stack, real-time metrics, and system role of each tier.
          </p>
        </motion.div>

        {/* ── Data flow breadcrumb ── */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-1.5 mb-10"
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.25 }}
        >
          {LAYERS.map((layer, i) => (
            <span key={layer.id} className="flex items-center gap-1.5">
              <button
                onClick={() => setActiveId(layer.id)}
                className="text-xs font-black px-3 py-1 rounded-full border transition-all duration-200"
                style={activeId === layer.id
                  ? { color: layer.color, borderColor: `${layer.color}50`, background: `${layer.color}15`, boxShadow: `0 0 12px ${layer.glow}` }
                  : { color: '#64748b', borderColor: 'rgba(255,255,255,0.06)', background: 'transparent' }
                }
              >
                {layer.label.split(' ')[0]}
              </button>
              {i < LAYERS.length - 1 && <ArrowRight className="w-3 h-3 text-slate-700" />}
            </span>
          ))}
        </motion.div>

        {/* ── Main content: Layers + Detail panel ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-start">

          {/* Left — layer stack */}
          <div className="space-y-0">
            {LAYERS.map((layer, i) => (
              <div key={layer.id}>
                <LayerRow
                  layer={layer}
                  index={i}
                  isActive={activeId === layer.id}
                  isInView={isInView}
                  onClick={() => setActiveId(layer.id)}
                />
                {i < LAYERS.length - 1 && (
                  <FlowConnector color={layer.color} active={activeId === layer.id || activeId === LAYERS[i + 1].id} />
                )}
              </div>
            ))}
          </div>

          {/* Right — detail panel */}
          <div className="lg:sticky lg:top-24">
            <AnimatePresence mode="wait">
              <DetailPanel key={activeId} layer={activeLayer} />
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}
