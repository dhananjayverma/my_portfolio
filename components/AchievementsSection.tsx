'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Award, Trophy, Star, Zap, Crown, Medal, ChevronLeft, ChevronRight, Quote, Sparkles } from 'lucide-react';

interface Achievement {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
  bgColor: string;
}

const achievements: Achievement[] = [
  {
    icon: <Trophy className="w-6 h-6" />,
    title: 'Rising Star Award',
    description: 'Recognized at Kazam EV for exceptional performance and rapid growth within the first year.',
    color: '#eab308',
    bgColor: 'bg-yellow-50',
  },
  {
    icon: <Star className="w-6 h-6" />,
    title: 'First Position Project',
    description: 'Won first place in project presentation at Masai School for building a full-stack healthcare platform.',
    color: '#f59e0b',
    bgColor: 'bg-amber-50',
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: 'Production Deployments',
    description: 'Successfully deployed 20+ projects to production with zero downtime. 99.9% system uptime maintained.',
    color: '#22c55e',
    bgColor: 'bg-emerald-50',
  },
  {
    icon: <Crown className="w-6 h-6" />,
    title: 'Government EV Projects',
    description: 'Led development of government-mandated EV charging infrastructure for multiple Indian states.',
    color: '#0ea5e9',
    bgColor: 'bg-sky-50',
  },
  {
    icon: <Medal className="w-6 h-6" />,
    title: 'Team Leadership',
    description: 'Mentored junior developers and led code reviews, improving team velocity by 30%.',
    color: '#8b5cf6',
    bgColor: 'bg-violet-50',
  },
  {
    icon: <Award className="w-6 h-6" />,
    title: 'Performance Optimization',
    description: 'Reduced application load times by 60% through code optimization and caching strategies.',
    color: '#f97316',
    bgColor: 'bg-orange-50',
  },
];

interface Testimonial {
  name: string;
  role: string;
  text: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    name: 'Senior Engineering Manager',
    role: 'Kazam EV',
    text: 'Dhananjay has been instrumental in building our EV platform. His ability to handle complex requirements and deliver quality code on tight deadlines is exceptional.',
    rating: 5,
  },
  {
    name: 'Product Lead',
    role: 'Kazam EV',
    text: 'He led the WhatsApp automation and QR login system, which became one of our most impactful features. Great technical depth and leadership skills.',
    rating: 5,
  },
  {
    name: 'Tech Lead',
    role: 'Cognitive Clouds',
    text: 'Dhananjay quickly became a key contributor on our team. His React skills and attention to detail made a significant impact on our healthcare platform.',
    rating: 5,
  },
  {
    name: 'Client',
    role: 'ZyroCare Healthcare',
    text: 'The platform Dhananjay built helped us scale our operations by 3x. The geo-location and AI matching features are exactly what we needed.',
    rating: 5,
  },
];

export default function AchievementsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [testimonialIndex, setTestimonialIndex] = useState(0);

  const nextTestimonial = () => setTestimonialIndex((prev) => (prev + 1) % testimonials.length);
  const prevTestimonial = () => setTestimonialIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="relative py-28 px-4 sm:px-6 lg:px-8 section-gradient-2">
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
              Recognition
            </span>
          </motion.div>
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-slate-800">
            Achievements & Recognition
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-lg">
            Milestones and recognition earned along the journey.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-20">
          {achievements.map((item, index) => (
            <motion.div
              key={item.title}
              className="glass-card-strong p-6 relative overflow-hidden group"
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: index * 0.08 }}
              whileHover={{ y: -6, scale: 1.02, boxShadow: '0 20px 40px rgba(0,0,0,0.08)' }}
            >
              <div className="absolute top-0 right-0 w-20 h-20 rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity"
                style={{ backgroundColor: item.color }}
              />
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: `${item.color}15`, color: item.color }}
                >
                  {item.icon}
                </div>
                <h3 className="text-lg font-bold text-slate-800 mb-2">{item.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className="text-center mb-10">
            <h3 className="text-2xl font-bold text-slate-800 mb-2">What People Say</h3>
            <p className="text-sm text-slate-400">Testimonials from managers and clients</p>
          </div>

          <div className="glass-card-strong p-8 sm:p-12 max-w-3xl mx-auto relative">
            <Quote className="absolute top-4 left-4 w-8 h-8 text-sky-200" />

            <motion.div
              key={testimonialIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="text-center"
            >
              <div className="flex justify-center gap-1 mb-4">
                {Array.from({ length: testimonials[testimonialIndex].rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-amber-500 fill-amber-500" />
                ))}
              </div>
              <p className="text-slate-500 text-lg leading-relaxed mb-6 italic">
                &ldquo;{testimonials[testimonialIndex].text}&rdquo;
              </p>
              <div className="text-slate-800 font-bold">{testimonials[testimonialIndex].name}</div>
              <div className="text-sm text-slate-400">{testimonials[testimonialIndex].role}</div>
            </motion.div>

            <div className="flex justify-center gap-4 mt-6">
              <button
                onClick={prevTestimonial}
                className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-50 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <div className="flex items-center gap-2">
                {testimonials.map((_, i) => (
                  <div
                    key={i}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      i === testimonialIndex ? 'bg-sky-500 w-6' : 'bg-slate-200 w-2'
                    }`}
                  />
                ))}
              </div>
              <button
                onClick={nextTestimonial}
                className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-50 transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
