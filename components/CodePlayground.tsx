'use client';

import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Play, RotateCcw, Check, Code2, Terminal, Sparkles } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';

interface CodeExample {
  id: string;
  title: string;
  description: string;
  code: string;
  output: string;
  color: string;
  bgColor: string;
}

const examples: CodeExample[] = [
  {
    id: 'hooks',
    title: 'Custom Hook',
    description: 'A reusable data fetching hook with loading and error states',
    color: '#0ea5e9',
    bgColor: 'bg-sky-50',
    code: `const useData = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [url]);

  return { data, loading, error };
};`,
    output: `// Usage:
const { data, loading, error } = useData('/api/users');

// Returns:
// data: { id: 1, name: "Dhananjay" }
// loading: false
// error: null`,
  },
  {
    id: 'api',
    title: 'Express API',
    description: 'A REST API endpoint with validation and error handling',
    color: '#22c55e',
    bgColor: 'bg-emerald-50',
    code: `app.post('/api/orders', async (req, res) => {
  try {
    const { userId, items, total } = req.body;
    
    // Validation
    if (!userId || !items.length) {
      return res.status(400).json({ error: 'Invalid data' });
    }
    
    // Create order
    const order = await Order.create({
      userId,
      items,
      total,
      status: 'pending',
      createdAt: new Date(),
    });
    
    // Send notification
    await notifyUser(userId, 'Order placed!');
    
    res.status(201).json({ success: true, order });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});`,
    output: `// POST /api/orders
// Request: { userId: "123", items: [...], total: 500 }
// Response: { success: true, order: { id: "456", ... } }
// Status: 201 Created`,
  },
  {
    id: 'validation',
    title: 'Form Validation',
    description: 'React form with custom validation and debounced input',
    color: '#f59e0b',
    bgColor: 'bg-amber-50',
    code: `const useForm = (initialValues, validate) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues(prev => ({ ...prev, [name]: value }));
    
    if (touched[name]) {
      const fieldErrors = validate({ ...values, [name]: value });
      setErrors(prev => ({ ...prev, [name]: fieldErrors[name] }));
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    const fieldErrors = validate(values);
    setErrors(prev => ({ ...prev, [name]: fieldErrors[name] }));
  };

  return { values, errors, touched, handleChange, handleBlur };
};`,
    output: `// Form state:
// values: { email: "", password: "" }
// errors: { email: "Required", password: "Min 8 chars" }
// touched: { email: true, password: false }`,
  },
];

export default function CodePlayground() {
  const [activeExample, setActiveExample] = useState(0);
  const [code, setCode] = useState(examples[0].code);
  const [showOutput, setShowOutput] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const handleRun = () => {
    setIsRunning(true);
    setShowOutput(false);
    setTimeout(() => {
      setIsRunning(false);
      setShowOutput(true);
    }, 800);
  };

  const handleReset = () => {
    setCode(examples[activeExample].code);
    setShowOutput(false);
  };

  const switchExample = (index: number) => {
    setActiveExample(index);
    setCode(examples[index].code);
    setShowOutput(false);
  };

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
              Live Code
            </span>
          </motion.div>
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-slate-800">
            Code Playground
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-lg">
            Live coding examples from real projects. Run and explore the code.
          </p>
        </motion.div>

        <motion.div
          className="flex flex-wrap gap-2 mb-6 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {examples.map((example, index) => (
            <button
              key={example.id}
              onClick={() => switchExample(index)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeExample === index
                  ? 'text-white shadow-lg'
                  : 'bg-white text-slate-500 hover:text-slate-800 border border-slate-200'
              }`}
              style={activeExample === index ? { backgroundColor: example.color } : {}}
            >
              {example.title}
            </button>
          ))}
        </motion.div>

        <motion.p
          className="text-center text-sm text-slate-400 mb-6"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {examples[activeExample].description}
        </motion.p>

        <motion.div
          className="glass-card-strong rounded-2xl overflow-hidden border border-slate-200 shadow-xl shadow-slate-200/40"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="flex items-center justify-between px-4 py-3 bg-slate-800 border-b border-slate-700">
            <div className="flex items-center gap-2">
              <Code2 className="w-4 h-4 text-sky-400" />
              <span className="text-sm text-slate-400">{examples[activeExample].title}.js</span>
            </div>
            <div className="flex gap-2">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="sm"
                  onClick={handleReset}
                  variant="ghost"
                  className="text-slate-400 hover:text-white hover:bg-white/5"
                >
                  <RotateCcw className="w-3.5 h-3.5 mr-1" />
                  Reset
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="sm"
                  onClick={handleRun}
                  disabled={isRunning}
                  className="bg-emerald-500 hover:bg-emerald-600 text-white"
                >
                  {isRunning ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    >
                      <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full" />
                    </motion.div>
                  ) : (
                    <Play className="w-3.5 h-3.5 mr-1" />
                  )}
                  {isRunning ? 'Running...' : 'Run Code'}
                </Button>
              </motion.div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row">
            <div className="flex-1">
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full h-64 bg-slate-900 text-slate-400 font-mono text-sm p-4 resize-none outline-none leading-relaxed"
                spellCheck={false}
              />
            </div>

            <AnimatePresence>
              {showOutput && (
                <motion.div
                  className="sm:w-64 border-t sm:border-t-0 sm:border-l border-slate-700 bg-slate-800"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-700">
                    <Terminal className="w-4 h-4 text-emerald-400" />
                    <span className="text-sm text-slate-400">Output</span>
                  </div>
                  <div className="p-4 font-mono text-sm text-emerald-400 whitespace-pre-wrap leading-relaxed">
                    {examples[activeExample].output}
                  </div>
                  <div className="px-4 pb-4">
                    <div className="flex items-center gap-2 text-xs text-emerald-400">
                      <Check className="w-3 h-3" />
                      <span>Executed successfully</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
