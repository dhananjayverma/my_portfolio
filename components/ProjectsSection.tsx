'use client';

import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, X, Layers, ChevronRight, Code2, Database, Server, Cloud, ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  techStack: { name: string; icon: React.ReactNode; color: string; bgColor: string }[];
  architecture: string[];
  challenges: string[];
  impact: string;
  image: string;
  liveUrl: string;
  githubUrl: string;
  category: string;
  color: string;
  bgColor: string;
}

const projects: Project[] = [
  {
    id: 'kazam-ev',
    title: 'Kazam EV',
    subtitle: 'Electric Vehicle Charging Platform',
    description: 'A comprehensive EV charging ecosystem including admin dashboard, charger management, battery swapping, and payment integration. Built for government and private EV infrastructure.',
    features: [
      'Real-time charger monitoring with WebSocket',
      'Admin dashboard with analytics and reporting',
      'Battery swapping station management',
      'Payment integration with multiple gateways',
      'QR code login for field technicians',
      'WhatsApp automation for customer updates',
      'Session management with live tracking',
      'Bulk messaging for notifications',
    ],
    techStack: [
      { name: 'React', icon: <Code2 className="w-4 h-4" />, color: '#0ea5e9', bgColor: 'bg-sky-50' },
      { name: 'Node.js', icon: <Server className="w-4 h-4" />, color: '#22c55e', bgColor: 'bg-emerald-50' },
      { name: 'MongoDB', icon: <Database className="w-4 h-4" />, color: '#16a34a', bgColor: 'bg-emerald-50' },
      { name: 'AWS', icon: <Cloud className="w-4 h-4" />, color: '#f59e0b', bgColor: 'bg-amber-50' },
    ],
    architecture: [
      'React frontend with Redux state management',
      'Node.js microservices with Express',
      'MongoDB for flexible data storage',
      'Redis for caching and session management',
      'AWS S3 for file storage',
      'Socket.io for real-time communication',
    ],
    challenges: [
      'Handling real-time data from 500+ chargers',
      'Optimizing payment flow for low connectivity',
      'Building offline-first mobile experience',
      'Scaling to support government EV mandates',
    ],
    impact: 'Enabled 50K+ EV charging sessions monthly, supported government EV adoption initiatives',
    image: 'https://images.pexels.com/photos/3862600/pexels-photo-3862600.jpeg?auto=compress&cs=tinysrgb&w=800',
    liveUrl: '#',
    githubUrl: '#',
    category: 'EV Platform',
    color: '#0ea5e9',
    bgColor: 'bg-sky-50',
  },
  {
    id: 'zyrocare',
    title: 'ZyroCare',
    subtitle: 'Healthcare Platform',
    description: 'Home healthcare booking platform with geo-location tracking, AI-powered care matching, and real-time caregiver management.',
    features: [
      'Home healthcare booking system',
      'Geo-location tracking for caregivers',
      'AI-powered care matching algorithm',
      'Real-time appointment management',
      'Patient health record integration',
      'Payment processing for services',
      'Rating and review system',
    ],
    techStack: [
      { name: 'React', icon: <Code2 className="w-4 h-4" />, color: '#0ea5e9', bgColor: 'bg-sky-50' },
      { name: 'Node.js', icon: <Server className="w-4 h-4" />, color: '#22c55e', bgColor: 'bg-emerald-50' },
      { name: 'MongoDB', icon: <Database className="w-4 h-4" />, color: '#16a34a', bgColor: 'bg-emerald-50' },
      { name: 'Google Maps', icon: <Cloud className="w-4 h-4" />, color: '#f59e0b', bgColor: 'bg-amber-50' },
    ],
    architecture: [
      'React SPA with Redux Toolkit',
      'Node.js REST API with Express',
      'MongoDB for patient data',
      'Google Maps API for geolocation',
      'Firebase for real-time notifications',
      'Stripe for payment processing',
    ],
    challenges: [
      'Implementing accurate geo-location for caregivers',
      'Building AI matching algorithm for care needs',
      'Ensuring HIPAA compliance for health data',
      'Handling real-time availability updates',
    ],
    impact: 'Connected 10K+ patients with verified caregivers, 95% booking satisfaction rate',
    image: 'https://images.pexels.com/photos/40568/medical-appointment-doctor-healthcare-40568.jpeg?auto=compress&cs=tinysrgb&w=800',
    liveUrl: '#',
    githubUrl: '#',
    category: 'Healthcare',
    color: '#22c55e',
    bgColor: 'bg-emerald-50',
  },
  {
    id: 'whatsapp-automation',
    title: 'WhatsApp Automation',
    subtitle: 'Business Messaging Platform',
    description: 'Enterprise WhatsApp automation system with QR login, bulk messaging, session management, and template-based messaging.',
    features: [
      'QR code login for WhatsApp Web',
      'Bulk message sending with templates',
      'Session management for multiple accounts',
      'Message scheduling and automation',
      'Contact management and segmentation',
      'Delivery status tracking',
      'Analytics dashboard for campaigns',
    ],
    techStack: [
      { name: 'React', icon: <Code2 className="w-4 h-4" />, color: '#0ea5e9', bgColor: 'bg-sky-50' },
      { name: 'Node.js', icon: <Server className="w-4 h-4" />, color: '#22c55e', bgColor: 'bg-emerald-50' },
      { name: 'WhatsApp API', icon: <Cloud className="w-4 h-4" />, color: '#22c55e', bgColor: 'bg-emerald-50' },
      { name: 'Redis', icon: <Database className="w-4 h-4" />, color: '#f59e0b', bgColor: 'bg-amber-50' },
    ],
    architecture: [
      'React dashboard with real-time updates',
      'Node.js service with WhatsApp Web API',
      'Redis for session storage',
      'Queue system for bulk messaging',
      'MongoDB for message templates',
      'WebSocket for real-time status',
    ],
    challenges: [
      'Handling WhatsApp rate limiting',
      'Managing multiple WhatsApp sessions',
      'Ensuring message delivery reliability',
      'Building intuitive QR login flow',
    ],
    impact: 'Processed 1M+ messages monthly, 98% delivery rate, reduced manual messaging by 90%',
    image: 'https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg?auto=compress&cs=tinysrgb&w=800',
    liveUrl: '#',
    githubUrl: '#',
    category: 'Automation',
    color: '#f59e0b',
    bgColor: 'bg-amber-50',
  },
  {
    id: 'lms-platform',
    title: 'LMS Platform',
    subtitle: 'Learning Management System',
    description: 'Full-featured learning management system with course management, attendance tracking, student analytics, and real-time notifications.',
    features: [
      'Course management with video hosting',
      'Attendance tracking system',
      'Student progress analytics',
      'Assignment submission and grading',
      'Real-time notifications via WebSocket',
      'Quiz and assessment engine',
      'Certificate generation',
    ],
    techStack: [
      { name: 'React', icon: <Code2 className="w-4 h-4" />, color: '#0ea5e9', bgColor: 'bg-sky-50' },
      { name: 'Node.js', icon: <Server className="w-4 h-4" />, color: '#22c55e', bgColor: 'bg-emerald-50' },
      { name: 'MongoDB', icon: <Database className="w-4 h-4" />, color: '#16a34a', bgColor: 'bg-emerald-50' },
      { name: 'Socket.io', icon: <Cloud className="w-4 h-4" />, color: '#f59e0b', bgColor: 'bg-amber-50' },
    ],
    architecture: [
      'React frontend with material design',
      'Node.js REST API with JWT auth',
      'MongoDB for courses and student data',
      'AWS S3 for video storage',
      'Socket.io for real-time features',
      'Bull queue for background jobs',
    ],
    challenges: [
      'Handling video streaming optimization',
      'Building real-time attendance system',
      'Managing concurrent student sessions',
      'Implementing progress tracking',
    ],
    impact: 'Served 5K+ students, 200+ courses, 90% course completion rate',
    image: 'https://images.pexels.com/photos/301920/pexels-photo-301920.jpeg?auto=compress&cs=tinysrgb&w=800',
    liveUrl: '#',
    githubUrl: '#',
    category: 'Education',
    color: '#8b5cf6',
    bgColor: 'bg-violet-50',
  },
];

function ProjectCard({ project, index, onClick }: { project: Project; index: number; onClick: () => void }) {
  return (
    <motion.div
      className="group relative cursor-pointer"
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.12 }}
      onClick={onClick}
    >
      <motion.div
        className="relative overflow-hidden rounded-2xl border border-slate-200/60 bg-white shadow-lg shadow-slate-200/30"
        whileHover={{ y: -10, scale: 1.02, boxShadow: '0 25px 50px -12px rgba(0,0,0,0.15)' }}
        transition={{ duration: 0.4 }}
      >
        <div className="relative h-48 overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-slate-900/20 to-transparent" />

          <div className="absolute top-4 left-4">
            <span
              className="px-3 py-1 rounded-full text-xs font-semibold border"
              style={{ color: project.color, borderColor: `${project.color}30`, backgroundColor: 'rgba(255,255,255,0.9)' }}
            >
              {project.category}
            </span>
          </div>
        </div>

        <div className="p-6">
          <h3 className="text-xl font-bold text-slate-800 mb-1 group-hover:text-sky-600 transition-colors">
            {project.title}
          </h3>
          <p className="text-sm text-slate-500 mb-3">{project.subtitle}</p>
          <p className="text-sm text-slate-400 line-clamp-2 mb-4">{project.description}</p>

          <div className="flex flex-wrap gap-2 mb-4">
            {project.techStack.map((tech) => (
              <span
                key={tech.name}
                className="flex items-center gap-1 text-xs px-2 py-1 rounded-md border font-medium"
                style={{ color: tech.color, borderColor: `${tech.color}25`, backgroundColor: `${tech.color}10` }}
              >
                {tech.icon}
                {tech.name}
              </span>
            ))}
          </div>

          <div className="text-xs text-slate-400 mb-4 line-clamp-1">{project.impact}</div>

          <div className="flex items-center gap-2 text-sky-600 text-sm font-semibold">
            <span>View Details</span>
            <motion.div
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ArrowRight className="w-4 h-4" />
            </motion.div>
          </div>
        </div>

        <div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{ boxShadow: `inset 0 0 0 2px ${project.color}20, 0 0 40px ${project.color}10` }}
        />
      </motion.div>
    </motion.div>
  );
}

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white border border-slate-200 shadow-2xl"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        transition={{ duration: 0.4, ease: [0.215, 0.61, 0.355, 1] }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-white/90 shadow-md hover:bg-slate-100 transition-colors"
          onClick={onClose}
        >
          <X className="w-4 h-4 text-slate-600" />
        </button>

        <div className="relative h-64 sm:h-80 overflow-hidden rounded-t-2xl">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-slate-900/30 to-transparent" />
          <div className="absolute bottom-6 left-6">
            <span
              className="px-3 py-1 rounded-full text-xs font-semibold border mb-3 inline-block"
              style={{ color: project.color, borderColor: `${project.color}30`, backgroundColor: 'rgba(255,255,255,0.9)' }}
            >
              {project.category}
            </span>
            <h2 className="text-3xl font-bold text-white">{project.title}</h2>
            <p className="text-slate-200 mt-1">{project.subtitle}</p>
          </div>
        </div>

        <div className="p-6 sm:p-8 space-y-8">
          <div>
            <h3 className="text-lg font-bold text-slate-800 mb-2 flex items-center gap-2">
              <Layers className="w-5 h-5 text-sky-500" />
              Overview
            </h3>
            <p className="text-slate-500 leading-relaxed">{project.description}</p>
          </div>

          <div>
            <h3 className="text-lg font-bold text-slate-800 mb-3 flex items-center gap-2">
              <Code2 className="w-5 h-5 text-sky-500" />
              Tech Stack
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span
                  key={tech.name}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg border text-sm font-medium"
                  style={{ color: tech.color, borderColor: `${tech.color}30`, backgroundColor: `${tech.color}10` }}
                >
                  {tech.icon}
                  {tech.name}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold text-slate-800 mb-3 flex items-center gap-2">
              <Database className="w-5 h-5 text-sky-500" />
              Architecture
            </h3>
            <div className="flex flex-wrap gap-3">
              {project.architecture.map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="glass-card px-3 py-2 rounded-lg text-sm text-slate-500 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
                    {item}
                  </div>
                  {i < project.architecture.length - 1 && (
                    <ChevronRight className="w-4 h-4 text-slate-300" />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold text-slate-800 mb-3 flex items-center gap-2">
              <Layers className="w-5 h-5 text-sky-500" />
              Key Features
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {project.features.map((feature, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-slate-50 border border-slate-100">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 flex-shrink-0" />
                  <span className="text-sm text-slate-500">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold text-slate-800 mb-3 flex items-center gap-2">
              <Server className="w-5 h-5 text-sky-500" />
              Challenges Solved
            </h3>
            <div className="space-y-3">
              {project.challenges.map((challenge, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-lg border border-slate-100 bg-slate-50">
                  <span className="w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center text-xs text-amber-600 font-bold flex-shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <span className="text-sm text-slate-500">{challenge}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card p-4 rounded-xl border border-emerald-200 bg-emerald-50">
            <h3 className="text-sm font-bold text-emerald-600 mb-1">Business Impact</h3>
            <p className="text-sm text-slate-500">{project.impact}</p>
          </div>

          <div className="flex gap-3 pt-2">
            <Button className="bg-sky-500 hover:bg-sky-600 text-white rounded-full">
              <ExternalLink className="w-4 h-4 mr-2" />
              Live Demo
            </Button>
            <Button variant="outline" className="border-slate-200 text-slate-700 hover:bg-slate-50 rounded-full">
              <Github className="w-4 h-4 mr-2" />
              View Code
            </Button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="projects" className="relative py-28 px-4 sm:px-6 lg:px-8 section-gradient-3">
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
            <span className="text-sm font-semibold text-amber-600 bg-amber-50 px-4 py-1.5 rounded-full border border-amber-200">
              <Sparkles className="w-3 h-3 inline mr-1" />
              Featured Work
            </span>
          </motion.div>
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-slate-800">
            Project Showcase
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-lg">
            Click on any project to explore architecture, challenges, and business impact.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              onClick={() => setSelectedProject(project)}
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
