'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Briefcase, Code2, Mail, Phone, Download, Clock, Check, X, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Section {
  id: string;
  title: string;
  icon: React.ReactNode;
  content: React.ReactNode;
}

export default function RecruiterMode() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('overview');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const sections: Section[] = [
    {
      id: 'overview',
      title: 'Quick Overview',
      icon: <Briefcase className="w-4 h-4" />,
      content: (
        <div className="space-y-4">
          <div className="glass-card-strong p-4 border-l-4 border-sky-500">
            <h4 className="text-sm font-bold text-slate-800 mb-2">Dhananjay Verma</h4>
            <p className="text-sm text-slate-500">Senior Software Developer | Full Stack & React Native</p>
            <div className="flex flex-wrap gap-2 mt-3">
              {['React', 'Node.js', 'React Native', 'TypeScript', 'MongoDB', 'AWS'].map((skill) => (
                <span key={skill} className="text-xs px-2 py-1 rounded-md bg-sky-50 text-sky-600 border border-sky-100">{skill}</span>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="glass-card-strong p-3 text-center">
              <div className="text-xl font-bold text-emerald-600">3.5+</div>
              <div className="text-xs text-slate-400">Years Experience</div>
            </div>
            <div className="glass-card-strong p-3 text-center">
              <div className="text-xl font-bold text-amber-600">20+</div>
              <div className="text-xs text-slate-400">Projects</div>
            </div>
            <div className="glass-card-strong p-3 text-center">
              <div className="text-xl font-bold text-sky-600">50K+</div>
              <div className="text-xs text-slate-400">Users</div>
            </div>
            <div className="glass-card-strong p-3 text-center">
              <div className="text-xl font-bold text-violet-600">99.9%</div>
              <div className="text-xs text-slate-400">Uptime</div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'experience',
      title: 'Experience',
      icon: <Briefcase className="w-4 h-4" />,
      content: (
        <div className="space-y-3">
          {[
            { company: 'Kazam EV', role: 'Senior Developer', period: '2024 - Present', highlight: 'Leading EV platform' },
            { company: 'Kafqa Ventures', role: 'Software Developer', period: '2023', highlight: 'LMS platform' },
            { company: 'Cognitive Clouds', role: 'Software Developer', period: '2023', highlight: 'Healthcare platform' },
            { company: 'Masai School', role: 'Student', period: '2022', highlight: 'Full-stack training' },
          ].map((exp) => (
            <div key={exp.company} className="flex items-start gap-3 p-3 rounded-lg bg-slate-50">
              <div className="w-2 h-2 rounded-full bg-sky-500 mt-1.5 flex-shrink-0" />
              <div>
                <div className="text-sm font-bold text-slate-800">{exp.company}</div>
                <div className="text-xs text-slate-500">{exp.role} · {exp.period}</div>
                <div className="text-xs text-slate-400 mt-0.5">{exp.highlight}</div>
              </div>
            </div>
          ))}
        </div>
      ),
    },
    {
      id: 'skills',
      title: 'Skills',
      icon: <Code2 className="w-4 h-4" />,
      content: (
        <div className="space-y-3">
          {[
            { category: 'Frontend', skills: 'React, Next.js, TypeScript, Redux, Tailwind CSS' },
            { category: 'Backend', skills: 'Node.js, Express, MongoDB, PostgreSQL' },
            { category: 'Mobile', skills: 'React Native, Expo, iOS/Android' },
            { category: 'Cloud & DevOps', skills: 'AWS, Git, Docker, Postman' },
          ].map((group) => (
            <div key={group.category} className="glass-card-strong p-3">
              <div className="text-sm font-bold text-sky-600 mb-1">{group.category}</div>
              <div className="text-xs text-slate-500">{group.skills}</div>
            </div>
          ))}
        </div>
      ),
    },
    {
      id: 'contact',
      title: 'Contact',
      icon: <Mail className="w-4 h-4" />,
      content: (
        <div className="space-y-3">
          <div className="glass-card-strong p-4">
            <div className="text-sm text-slate-500 mb-3">Ready for new opportunities</div>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-slate-500">
                <Mail className="w-4 h-4 text-sky-500" />
                dhananjayverma@email.com
              </div>
              <div className="flex items-center gap-2 text-slate-500">
                <Phone className="w-4 h-4 text-sky-500" />
                +91 98765 43210
              </div>
              <div className="flex items-center gap-2 text-slate-500">
                <Briefcase className="w-4 h-4 text-sky-500" />
                Bangalore / Gurgaon
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Button className="flex-1 bg-sky-500 hover:bg-sky-600 text-white rounded-full text-sm">
              <Download className="w-4 h-4 mr-2" />
              Resume
            </Button>
            <Button variant="outline" className="flex-1 border-slate-200 text-slate-700 hover:bg-slate-50 rounded-full text-sm">
              <Mail className="w-4 h-4 mr-2" />
              Email
            </Button>
          </div>
        </div>
      ),
    },
  ];

  return (
    <>
      <motion.button
        className="fixed bottom-6 left-6 z-50 px-4 py-2.5 rounded-full border border-emerald-500/30 bg-[#070d19]/90 backdrop-blur-md text-emerald-400 text-xs font-extrabold uppercase tracking-wider shadow-lg hover:border-emerald-400/50 hover:bg-slate-900/90 transition-all flex items-center gap-2"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        animate={{ y: [0, -3, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
        Recruiter Mode
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              className="w-full max-w-2xl bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-2xl"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ duration: 0.4 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center">
                    <Briefcase className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-800">Recruiter Mode</h3>
                    <p className="text-xs text-slate-400">60-second overview</p>
                  </div>
                </div>
                <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-slate-700">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="flex flex-col sm:flex-row">
                <div className="sm:w-48 border-r border-slate-100 p-4 space-y-1">
                  {sections.map((section) => (
                    <button
                      key={section.id}
                      className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                        activeSection === section.id
                          ? 'bg-emerald-50 text-emerald-600'
                          : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'
                      }`}
                      onClick={() => setActiveSection(section.id)}
                    >
                      {section.icon}
                      {section.title}
                      {activeSection === section.id && (
                        <ChevronRight className="w-3 h-3 ml-auto" />
                      )}
                    </button>
                  ))}
                </div>

                <div className="flex-1 p-4">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeSection}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.2 }}
                    >
                      {sections.find((s) => s.id === activeSection)?.content}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
