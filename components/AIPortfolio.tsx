'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, User, Send, Sparkles, X } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const quickQuestions = [
  'Tell me about Dhananjay',
  'Show React Native projects',
  'What is his Node.js experience?',
  'What is his current role?',
  'How to contact him?',
];

const knowledgeBase: Record<string, string> = {
  'tell me about dhananjay': 'Dhananjay Verma is a Full Stack & React Native Developer with 3.5+ years of experience. He specializes in building scalable applications with React, Node.js, React Native, and cloud technologies. Currently working as a Senior Developer at Kazam EV, leading EV platform development.',
  'show react native projects': 'Dhananjay has built 8+ React Native projects including the Kazam EV mobile app for EV charging, WhatsApp automation with QR login, and a healthcare booking app with geo-location. He has 2.5 years of React Native experience with 88% proficiency.',
  'what is his node.js experience': 'Dhananjay has 3 years of Node.js experience with 14+ projects. He built REST APIs, microservices, and real-time backends using Express.js, MongoDB, and Redis. He led backend development for the Kazam EV platform handling 500+ chargers.',
  'what is his current role': 'Dhananjay is currently a Senior Software Developer at Kazam EV (2024-Present). He leads the EV platform development including admin dashboard, charger management, battery swapping, and WhatsApp automation. He mentors junior developers and maintains 99.9% system uptime.',
  'how to contact him': 'You can reach Dhananjay via email at dhananjayverma@email.com, LinkedIn (linkedin.com/in/dhananjayverma), GitHub (github.com/dhananjayverma), or WhatsApp at +91 98765 43210. He is currently open to work and based in Bangalore/Gurgaon.',
  'skills': 'Dhananjay is skilled in Frontend (React, Next.js, TypeScript, Redux), Backend (Node.js, Express, MongoDB), Mobile (React Native, Expo), and Cloud & Tools (AWS, Git, Docker, Postman).',
  'experience': 'Dhananjay started at Masai School (2022), then worked at Cognitive Clouds (2023) and Kafqa Ventures (2023) as a Software Developer. Since 2024, he has been a Senior Developer at Kazam EV.',
  'projects': 'Key projects include Kazam EV (EV charging platform), ZyroCare (healthcare booking), WhatsApp Automation (business messaging), and an LMS Platform. Click on any project card for full details.',
  'education': 'Dhananjay completed an intensive 30-week full-stack bootcamp at Masai School (2022), where he built 15+ projects and ranked in the top 5% of his cohort.',
  'achievements': 'Rising Star Award at Kazam EV, First Position in Project Presentation at Masai School, 20+ production deployments with zero downtime, led government EV projects, and 50K+ users impacted.',
  'default': 'I can help you learn about Dhananjay\'s experience, skills, projects, or how to contact him. Try asking one of the suggested questions below!',
};

function getResponse(input: string): string {
  const lower = input.toLowerCase();
  for (const key of Object.keys(knowledgeBase)) {
    if (lower.includes(key)) {
      return knowledgeBase[key];
    }
  }
  return knowledgeBase['default'];
}

export default function AIPortfolio() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: "Hi! I am Dhananjay's AI assistant. Ask me anything about his experience, skills, or projects!" },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { role: 'user', content: text };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const response = getResponse(text);
      const assistantMsg: Message = { role: 'assistant', content: response };
      setMessages(prev => [...prev, assistantMsg]);
      setIsTyping(false);
    }, 800 + Math.random() * 500);
  };

  if (!mounted) return null;

  return (
    <>
      <motion.button
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-r from-sky-500 to-violet-500 flex items-center justify-center shadow-lg shadow-sky-200/40"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        <Sparkles className="w-6 h-6 text-white" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-24 right-6 z-50 w-80 sm:w-96 max-h-[500px] flex flex-col rounded-2xl border border-slate-200 bg-white shadow-2xl overflow-hidden"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-sky-500 to-violet-500 flex items-center justify-center">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-800">AI Assistant</div>
                  <div className="flex items-center gap-1 text-xs text-emerald-500">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Online
                  </div>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  className={`flex gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                    msg.role === 'assistant' ? 'bg-gradient-to-r from-sky-500 to-violet-500' : 'bg-slate-200'
                  }`}>
                    {msg.role === 'assistant' ? <Bot className="w-3 h-3 text-white" /> : <User className="w-3 h-3 text-slate-600" />}
                  </div>
                  <div className={`text-sm p-3 rounded-xl max-w-[80%] ${
                    msg.role === 'assistant'
                      ? 'bg-slate-50 text-slate-600'
                      : 'bg-sky-50 text-slate-800'
                  }`}>
                    {msg.content}
                  </div>
                </motion.div>
              ))}
              {isTyping && (
                <div className="flex gap-2">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-r from-sky-500 to-violet-500 flex items-center justify-center">
                    <Bot className="w-3 h-3 text-white" />
                  </div>
                  <div className="bg-slate-50 rounded-xl p-3 flex items-center gap-1">
                    <motion.div className="w-1.5 h-1.5 rounded-full bg-slate-400" animate={{ y: [0, -4, 0] }} transition={{ duration: 0.6, repeat: Infinity }} />
                    <motion.div className="w-1.5 h-1.5 rounded-full bg-slate-400" animate={{ y: [0, -4, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }} />
                    <motion.div className="w-1.5 h-1.5 rounded-full bg-slate-400" animate={{ y: [0, -4, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }} />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="px-4 pb-2 flex flex-wrap gap-2">
              {quickQuestions.map((q, i) => (
                <button
                  key={i}
                  className="text-xs px-2 py-1 rounded-full bg-slate-50 text-slate-500 hover:bg-sky-50 hover:text-sky-600 transition-colors border border-slate-100"
                  onClick={() => handleSend(q)}
                >
                  {q}
                </button>
              ))}
            </div>

            <div className="p-4 border-t border-slate-100">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend(input)}
                  placeholder="Ask anything..."
                  className="flex-1 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-800 focus:outline-none focus:border-sky-400"
                />
                <button
                  onClick={() => handleSend(input)}
                  className="w-8 h-8 rounded-lg bg-sky-500 flex items-center justify-center text-white hover:bg-sky-600 transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
