'use client';

import { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text, Stars, Float } from '@react-three/drei';
import { Sparkles, Clock, FolderGit2, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';

/* ─── Data ──────────────────────────────────────────────────────────────────── */
interface TechNode {
  name: string;
  category: string;
  color: string;
  position: [number, number, number];
  size: number;
  proficiency: number;
  years: number;
  projects: number;
}

const CATEGORY_COLORS: Record<string, string> = {
  Frontend: '#38bdf8',
  Backend:  '#34d399',
  Mobile:   '#fbbf24',
  Cloud:    '#fb923c',
  Database: '#a78bfa',
  AI:       '#f472b6',
};

const TECHS: TechNode[] = [
  // Frontend (top-right cluster)
  { name: 'React',       category: 'Frontend', color: '#38bdf8', position: [ 3.2,  2.1,  0.5], size: 0.42, proficiency: 95, years: 3,   projects: 18 },
  { name: 'Next.js',     category: 'Frontend', color: '#38bdf8', position: [ 1.8,  3.4,  1.2], size: 0.36, proficiency: 90, years: 2,   projects: 12 },
  { name: 'TypeScript',  category: 'Frontend', color: '#60a5fa', position: [ 2.5, -0.8,  2.4], size: 0.36, proficiency: 88, years: 2.5, projects: 15 },
  { name: 'Tailwind',    category: 'Frontend', color: '#38bdf8', position: [ 3.8,  0.4, -1.2], size: 0.28, proficiency: 92, years: 2,   projects: 16 },
  { name: 'Redux',       category: 'Frontend', color: '#818cf8', position: [ 1.2,  2.9, -2.1], size: 0.24, proficiency: 85, years: 2,   projects: 10 },
  // Backend (left cluster)
  { name: 'Node.js',     category: 'Backend',  color: '#34d399', position: [-3.4,  0.8,  1.2], size: 0.42, proficiency: 90, years: 3,   projects: 14 },
  { name: 'Express',     category: 'Backend',  color: '#34d399', position: [-2.6,  2.3,  0.4], size: 0.34, proficiency: 88, years: 3,   projects: 13 },
  { name: 'REST APIs',   category: 'Backend',  color: '#6ee7b7', position: [-1.8, -1.4,  3.0], size: 0.28, proficiency: 92, years: 3,   projects: 16 },
  { name: 'JWT Auth',    category: 'Backend',  color: '#34d399', position: [-3.0, -2.0,  0.8], size: 0.24, proficiency: 88, years: 2.5, projects: 12 },
  // Mobile (top cluster)
  { name: 'React Native',category: 'Mobile',   color: '#fbbf24', position: [ 0.5,  4.0,  1.5], size: 0.40, proficiency: 88, years: 2.5, projects: 8  },
  { name: 'Expo',        category: 'Mobile',   color: '#fbbf24', position: [-1.2,  3.5,  2.0], size: 0.30, proficiency: 82, years: 2,   projects: 6  },
  { name: 'Android',     category: 'Mobile',   color: '#fcd34d', position: [ 1.4,  3.8, -1.2], size: 0.26, proficiency: 72, years: 1.5, projects: 5  },
  // Cloud & Tools (bottom-right cluster)
  { name: 'AWS',         category: 'Cloud',    color: '#fb923c', position: [ 1.8, -3.2,  1.8], size: 0.34, proficiency: 72, years: 1.5, projects: 5  },
  { name: 'Docker',      category: 'Cloud',    color: '#fb923c', position: [ 3.4, -1.6, -2.0], size: 0.28, proficiency: 70, years: 1,   projects: 4  },
  { name: 'Git',         category: 'Cloud',    color: '#f97316', position: [ 0.8, -2.4, -3.2], size: 0.32, proficiency: 95, years: 3.5, projects: 20 },
  { name: 'Vercel',      category: 'Cloud',    color: '#fdba74', position: [ 2.8, -2.8,  0.6], size: 0.24, proficiency: 90, years: 2,   projects: 12 },
  // Database (bottom cluster)
  { name: 'MongoDB',     category: 'Database', color: '#a78bfa', position: [-1.5, -3.8,  0.8], size: 0.36, proficiency: 85, years: 2.5, projects: 12 },
  { name: 'PostgreSQL',  category: 'Database', color: '#c4b5fd', position: [-2.8, -2.5, -1.8], size: 0.28, proficiency: 78, years: 2,   projects: 8  },
  { name: 'Redis',       category: 'Database', color: '#a78bfa', position: [ 0.2, -3.5, -2.6], size: 0.24, proficiency: 68, years: 1,   projects: 4  },
  // AI (back cluster)
  { name: 'Gemini AI',   category: 'AI',       color: '#f472b6', position: [-0.8,  1.2, -4.0], size: 0.30, proficiency: 78, years: 1,   projects: 5  },
  { name: 'ChatGPT',     category: 'AI',       color: '#f472b6', position: [ 1.4, -0.6, -3.8], size: 0.26, proficiency: 80, years: 1,   projects: 6  },
];

/* ─── Central core ───────────────────────────────────────────────────────────── */
function Core() {
  const meshRef = useRef<THREE.Mesh>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (meshRef.current) {
      (meshRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity =
        0.6 + Math.sin(t * 2) * 0.3;
    }
    if (ring1Ref.current) ring1Ref.current.rotation.z = t * 0.4;
    if (ring2Ref.current) ring2Ref.current.rotation.x = t * 0.3;
  });

  return (
    <group>
      {/* Core sphere */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[0.55, 64, 64]} />
        <meshStandardMaterial
          color="#22d3ee" emissive="#22d3ee"
          emissiveIntensity={0.7} roughness={0.1} metalness={0.8}
          transparent opacity={0.9}
        />
      </mesh>
      {/* Orbit ring 1 */}
      <mesh ref={ring1Ref} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.1, 0.018, 16, 120]} />
        <meshStandardMaterial color="#22d3ee" emissive="#22d3ee" emissiveIntensity={0.5} transparent opacity={0.5} />
      </mesh>
      {/* Orbit ring 2 — tilted */}
      <mesh ref={ring2Ref} rotation={[Math.PI / 3, Math.PI / 6, 0]}>
        <torusGeometry args={[1.5, 0.012, 16, 120]} />
        <meshStandardMaterial color="#818cf8" emissive="#818cf8" emissiveIntensity={0.4} transparent opacity={0.35} />
      </mesh>
      <Text position={[0, -0.9, 0]} fontSize={0.18} color="#22d3ee" anchorX="center">
        Dhananjay
      </Text>
    </group>
  );
}

/* ─── Connection lines (center ↔ node) ──────────────────────────────────────── */
function ConnectionLines({ techs, hovered }: { techs: TechNode[]; hovered: string | null }) {
  return (
    <>
      {techs.map((node) => {
        const isHigh = hovered === node.name;
        const points = [new THREE.Vector3(0, 0, 0), new THREE.Vector3(...node.position)];
        const geo = new THREE.BufferGeometry().setFromPoints(points);
        return (
          <lineSegments key={node.name} geometry={geo}>
            <lineBasicMaterial
              color={node.color}
              transparent
              opacity={isHigh ? 0.5 : 0.07}
            />
          </lineSegments>
        );
      })}
    </>
  );
}

/* ─── Single tech node ───────────────────────────────────────────────────────── */
function TechSphere({
  node, hovered, setHovered,
}: {
  node: TechNode;
  hovered: string | null;
  setHovered: (n: string | null) => void;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const isHov = hovered === node.name;

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;
    const target = isHov ? 1.35 : 1;
    meshRef.current.scale.setScalar(
      THREE.MathUtils.lerp(meshRef.current.scale.x, target, 0.1)
    );
    // Slow self-rotation
    meshRef.current.rotation.y = t * 0.4;
  });

  return (
    <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.4}>
      <group position={node.position}>
        <mesh
          ref={meshRef}
          onPointerEnter={() => setHovered(node.name)}
          onPointerLeave={() => setHovered(null)}
        >
          <sphereGeometry args={[node.size, 32, 32]} />
          <meshStandardMaterial
            color={node.color}
            emissive={node.color}
            emissiveIntensity={isHov ? 0.9 : 0.3}
            roughness={0.15}
            metalness={0.6}
            transparent
            opacity={isHov ? 1 : 0.85}
          />
        </mesh>
        {/* Halo ring on hover */}
        {isHov && (
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[node.size + 0.18, 0.025, 16, 80]} />
            <meshStandardMaterial color={node.color} emissive={node.color} emissiveIntensity={1} transparent opacity={0.7} />
          </mesh>
        )}
        <Text
          position={[0, node.size + 0.28, 0]}
          fontSize={0.19}
          color={node.color}
          anchorX="center"
          anchorY="middle"
          visible={isHov || !hovered}
          outlineColor="#050a14"
          outlineWidth={0.02}
        >
          {node.name}
        </Text>
      </group>
    </Float>
  );
}

/* ─── Full 3-D scene ─────────────────────────────────────────────────────────── */
function Scene({ onHover }: { onHover: (n: string | null) => void }) {
  const [hovered, setHovered] = useState<string | null>(null);
  const groupRef = useRef<THREE.Group>(null);

  const handleHover = (name: string | null) => {
    setHovered(name);
    onHover(name);
  };

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.04;
    }
  });

  return (
    <>
      {/* Background stars */}
      <Stars radius={50} depth={40} count={3000} factor={3} saturation={0.4} fade speed={0.5} />

      {/* Lighting */}
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]}  intensity={1.2} color="#ffffff" />
      <pointLight position={[-8, -8, -8]}  intensity={0.6} color="#22d3ee" />
      <pointLight position={[0, 12, 0]}    intensity={0.4} color="#34d399" />
      <pointLight position={[0, -12, 0]}   intensity={0.4} color="#818cf8" />

      <group ref={groupRef}>
        <Core />
        <ConnectionLines techs={TECHS} hovered={hovered} />
        {TECHS.map((node) => (
          <TechSphere key={node.name} node={node} hovered={hovered} setHovered={handleHover} />
        ))}
      </group>
    </>
  );
}

/* ─── Hover tooltip overlay ──────────────────────────────────────────────────── */
function HoverCard({ name }: { name: string | null }) {
  const node = TECHS.find((t) => t.name === name);
  return (
    <AnimatePresence>
      {node && (
        <motion.div
          key={node.name}
          initial={{ opacity: 0, y: 8, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 8, scale: 0.96 }}
          transition={{ duration: 0.2 }}
          className="absolute top-4 left-4 z-10 min-w-[180px] rounded-2xl border bg-[#0a1628]/90 backdrop-blur-md p-4 shadow-2xl"
          style={{ borderColor: `${node.color}40` }}
        >
          {/* Header */}
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: node.color, boxShadow: `0 0 8px ${node.color}` }} />
            <span className="text-sm font-black text-white">{node.name}</span>
          </div>
          <div className="mb-3 text-[10px] font-bold uppercase tracking-widest" style={{ color: node.color }}>
            {node.category}
          </div>

          {/* Proficiency bar */}
          <div className="mb-3">
            <div className="flex justify-between text-[10px] text-slate-500 mb-1 font-semibold">
              <span>Proficiency</span>
              <span style={{ color: node.color }}>{node.proficiency}%</span>
            </div>
            <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ background: node.color }}
                initial={{ width: 0 }}
                animate={{ width: `${node.proficiency}%` }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
              />
            </div>
          </div>

          {/* Stats */}
          <div className="flex gap-4 text-[10px] text-slate-500">
            <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{node.years}yr{node.years !== 1 ? 's' : ''}</span>
            <span className="flex items-center gap-1"><FolderGit2 className="w-3 h-3" />{node.projects} proj</span>
            <span className="flex items-center gap-1"><Zap className="w-3 h-3" />{node.proficiency >= 90 ? 'Expert' : node.proficiency >= 75 ? 'Advanced' : 'Intermediate'}</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ─── Category legend ────────────────────────────────────────────────────────── */
function Legend() {
  return (
    <div className="absolute bottom-4 right-4 z-10 flex flex-col gap-1.5 bg-[#0a1628]/80 backdrop-blur-md rounded-xl p-3 border border-white/8">
      {Object.entries(CATEGORY_COLORS).map(([cat, color]) => (
        <div key={cat} className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: color, boxShadow: `0 0 5px ${color}` }} />
          <span className="text-[10px] font-semibold text-slate-400">{cat}</span>
        </div>
      ))}
    </div>
  );
}

/* ─── Section ────────────────────────────────────────────────────────────────── */
export default function TechGlobe() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <section
      id="techglobe"
      className="relative py-28 px-4 sm:px-6 lg:px-8 bg-[#050a14] overflow-hidden"
    >
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-cyan-500/4 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            className="inline-flex items-center gap-2 mb-5 rounded-full border border-violet-500/20 bg-violet-500/5 px-5 py-2"
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', duration: 0.6 }}
          >
            <Sparkles className="w-3.5 h-3.5 text-violet-400" />
            <span className="text-xs font-black uppercase tracking-[0.22em] text-violet-300">3D Visualization</span>
          </motion.div>

          <motion.h2
            className="text-4xl sm:text-5xl lg:text-[3.5rem] font-black text-white tracking-tight leading-none mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Tech Stack{' '}
            <span className="bg-gradient-to-r from-violet-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
              Universe
            </span>
          </motion.h2>
          <motion.p
            className="text-slate-400 max-w-lg mx-auto text-base"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            An interactive 3D galaxy of all technologies I work with. Drag to rotate, scroll to zoom, hover nodes to explore.
          </motion.p>
        </div>

        {/* Canvas wrapper */}
        <motion.div
          className="relative h-[520px] sm:h-[620px] rounded-2xl overflow-hidden border border-white/8 shadow-2xl"
          style={{ background: 'linear-gradient(135deg, #070e1e, #050a14)' }}
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <Canvas camera={{ position: [0, 0, 11], fov: 50 }} dpr={[1, 2]} gl={{ antialias: true, alpha: true }}>
            <Scene onHover={setHovered} />
            <OrbitControls
              enableZoom enablePan={false}
              autoRotate autoRotateSpeed={0.35}
              minDistance={5} maxDistance={22}
            />
          </Canvas>

          {/* Overlays */}
          <HoverCard name={hovered} />
          <Legend />

          {/* Controls hint */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[11px] font-semibold text-slate-500 bg-black/40 backdrop-blur-sm px-4 py-1.5 rounded-full border border-white/6 pointer-events-none">
            Drag to rotate &nbsp;·&nbsp; Scroll to zoom &nbsp;·&nbsp; Hover nodes
          </div>
        </motion.div>

        {/* Stats strip below canvas */}
        <motion.div
          className="mt-6 grid grid-cols-3 sm:grid-cols-6 gap-3"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {Object.entries(CATEGORY_COLORS).map(([cat, color]) => {
            const catTechs = TECHS.filter((t) => t.category === cat);
            const avg = Math.round(catTechs.reduce((s, t) => s + t.proficiency, 0) / catTechs.length);
            return (
              <div
                key={cat}
                className="rounded-xl p-3 border border-white/6 bg-white/[0.02] text-center"
              >
                <div className="w-2.5 h-2.5 rounded-full mx-auto mb-2" style={{ backgroundColor: color, boxShadow: `0 0 8px ${color}` }} />
                <div className="text-[10px] text-slate-500 font-semibold mb-1">{cat}</div>
                <div className="text-sm font-black" style={{ color }}>{avg}%</div>
                <div className="text-[9px] text-slate-600">{catTechs.length} skills</div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
