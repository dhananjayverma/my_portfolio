'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, X, Command, Sparkles } from 'lucide-react';

interface CommandResult {
  command: string;
  output: string[];
  isError?: boolean;
}

const commands: Record<string, string[]> = {
  help: [
    'Available commands:',
    '  about        - About Dhananjay',
    '  skills       - Technical skills',
    '  experience   - Work experience',
    '  projects     - Project showcase',
    '  contact      - Contact information',
    '  github       - GitHub stats',
    '  achievements - Awards and milestones',
    '  status       - Current status',
    '  clear        - Clear terminal',
    '  help         - Show this help',
  ],
  about: [
    'Dhananjay Verma',
    '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
    'Full Stack & React Native Developer',
    '3.5+ Years of Experience',
    'Based in: Bangalore / Gurgaon, India',
    'Status: Open to Work',
    '',
    'Specializing in building scalable web and mobile',
    'applications with React, Node.js, React Native,',
    'and cloud technologies.',
    '',
    'Passionate about clean code, performance, and',
    'delivering products that make real impact.',
  ],
  skills: [
    'Technical Skills',
    '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
    '',
    'Frontend:',
    '  React, Next.js, TypeScript, Redux, Tailwind CSS',
    '',
    'Backend:',
    '  Node.js, Express, MongoDB, PostgreSQL',
    '',
    'Mobile:',
    '  React Native, Expo, iOS/Android',
    '',
    'Cloud & DevOps:',
    '  AWS, Git, Docker, Postman',
  ],
  experience: [
    'Work Experience',
    '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
    '',
    '2024 - Present │ Kazam EV',
    '  Senior Software Developer',
    '  Leading EV platform development',
    '',
    '2023          │ Kafqa Ventures',
    '  Software Developer',
    '  Built LMS platform',
    '',
    '2023          │ Cognitive Clouds',
    '  Software Developer',
    '  Healthcare platform development',
    '',
    '2022          │ Masai School',
    '  Full-stack development training',
  ],
  projects: [
    'Project Showcase',
    '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
    '',
    '1. Kazam EV Platform',
    '   EV charging admin, battery swapping, payments',
    '',
    '2. ZyroCare Healthcare',
    '   Home healthcare booking with geo-location',
    '',
    '3. WhatsApp Automation',
    '   Business messaging with QR login',
    '',
    '4. LMS Platform',
    '   Course management, attendance, analytics',
    '',
    'View full details on the portfolio!',
  ],
  contact: [
    'Contact Information',
    '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
    '',
    'Email:    dhananjayverma@email.com',
    'LinkedIn: linkedin.com/in/dhananjayverma',
    'GitHub:   github.com/dhananjayverma',
    'WhatsApp: +91 98765 43210',
    '',
    'Location: Bangalore / Gurgaon, India',
    '',
    'Status: Open to Work',
  ],
  github: [
    'GitHub Analytics',
    '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
    '',
    'Total Commits:    2,340+',
    'Current Streak:   45 days',
    'Repositories:     25+',
    'Stars Earned:     500+',
    'PRs Merged:       180+',
    '',
    'Top Languages:',
    '  TypeScript  45%',
    '  JavaScript  25%',
    '  CSS         12%',
    '  HTML         8%',
    '  Python       5%',
  ],
  achievements: [
    'Achievements & Recognition',
    '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
    '',
    'Rising Star Award          - Kazam EV',
    'First Place Project        - Masai School',
    'Production Deployments     - 20+ with 0 downtime',
    'Government EV Projects     - Multiple states',
    'Team Leadership            - 30% velocity boost',
    'Performance Optimization   - 60% faster loads',
    '',
    'Users Impacted: 50K+',
    'System Uptime:  99.9%',
  ],
  status: [
    'Current Status',
    '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
    '',
    'Position:    Senior Software Developer',
    'Company:     Kazam EV',
    'Location:    Bangalore / Gurgaon',
    'Status:      Open to Work',
    'Experience:  3.5+ Years',
    '',
    'Looking for: Full Stack / React Native roles',
    '              Leadership opportunities',
    '              Impactful projects',
  ],
  whoami: [
    'dhananjayverma',
  ],
  pwd: [
    '/home/dhananjay/portfolio',
  ],
  ls: [
    'about.md    skills.json    projects/',
    'experience/ contact.txt    github/',
  ],
  date: [
    new Date().toString(),
  ],
  echo: [
    'Hello, World!',
  ],
};

export default function TerminalMode() {
  const [history, setHistory] = useState<CommandResult[]>([
    { command: '', output: [
      'Welcome to Dhananjay\'s Portfolio Terminal',
      '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
      'Type "help" to see available commands',
      '',
    ]},
  ]);
  const [input, setInput] = useState('');
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    terminalRef.current?.scrollTo({ top: terminalRef.current.scrollHeight, behavior: 'smooth' });
  }, [history]);

  const executeCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    if (!trimmed) return;

    const parts = trimmed.split(' ');
    const baseCmd = parts[0];
    const args = parts.slice(1);

    let output: string[];
    let isError = false;

    if (baseCmd === 'clear') {
      setHistory([]);
      setInput('');
      return;
    }

    if (commands[baseCmd]) {
      output = commands[baseCmd];
    } else if (baseCmd === 'echo' && args.length > 0) {
      output = [args.join(' ')];
    } else {
      output = [`command not found: ${baseCmd}`, 'Type "help" for available commands'];
      isError = true;
    }

    setHistory(prev => [...prev, { command: cmd, output, isError }]);
    setCommandHistory(prev => [...prev, cmd]);
    setHistoryIndex(-1);
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      executeCommand(input);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex !== -1 && commandHistory.length > 0) {
        const newIndex = Math.min(commandHistory.length - 1, historyIndex + 1);
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex]);
      } else {
        setHistoryIndex(-1);
        setInput('');
      }
    }
  };

  return (
    <section id="terminal" className="py-28 px-4 sm:px-6 lg:px-8 section-gradient-2">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <motion.div
            className="inline-block mb-4"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', duration: 0.6 }}
          >
            <span className="text-sm font-semibold text-emerald-600 bg-emerald-50 px-4 py-1.5 rounded-full border border-emerald-200">
              <Sparkles className="w-3 h-3 inline mr-1" />
              Interactive
            </span>
          </motion.div>
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-slate-800">
            Terminal Mode
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-lg mb-8">
            Explore the portfolio like a real terminal. Type commands to navigate.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="glass-card-strong rounded-2xl overflow-hidden border border-slate-200 shadow-xl shadow-slate-200/40">
            <div className="flex items-center gap-2 px-4 py-3 bg-slate-800 border-b border-slate-700">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-emerald-400" />
              </div>
              <div className="flex-1 text-center">
                <span className="text-xs text-slate-400 font-mono">dhananjay@portfolio:~</span>
              </div>
              <div className="w-16" />
            </div>

            <div ref={terminalRef} className="p-4 h-72 overflow-y-auto font-mono text-sm bg-slate-900">
              {history.map((entry, i) => (
                <div key={i} className="mb-2">
                  {entry.command && (
                    <div className="flex items-center gap-2 text-sky-400">
                      <span className="text-emerald-400">➜</span>
                      <span className="text-violet-400">~</span>
                      <span>{entry.command}</span>
                    </div>
                  )}
                  {entry.output.map((line, j) => (
                    <div key={j} className={`text-slate-300 pl-4 ${entry.isError ? 'text-red-400' : ''}`}>
                      {line}
                    </div>
                  ))}
                </div>
              ))}
              <div className="flex items-center gap-2 text-sky-400">
                <span className="text-emerald-400">➜</span>
                <span className="text-violet-400">~</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="flex-1 bg-transparent text-slate-300 outline-none font-mono text-sm"
                  placeholder="Type a command..."
                  autoFocus
                  spellCheck={false}
                />
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mt-4 justify-center">
            {['about', 'skills', 'experience', 'projects', 'contact', 'help'].map((cmd) => (
              <button
                key={cmd}
                onClick={() => executeCommand(cmd)}
                className="text-xs px-3 py-1.5 rounded-full bg-white border border-slate-200 text-slate-500 hover:text-sky-600 hover:border-sky-300 transition-colors"
              >
                {cmd}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
