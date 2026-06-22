'use client';

import { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';
import { Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import * as THREE from 'three';

interface TechNode {
  name: string;
  color: string;
  position: [number, number, number];
  size: number;
}

const techs: TechNode[] = [
  { name: 'React', color: '#0ea5e9', position: [3, 2, 0], size: 0.4 },
  { name: 'Next.js', color: '#38bdf8', position: [-2, 3, 1], size: 0.35 },
  { name: 'TypeScript', color: '#60a5fa', position: [1, -3, 2], size: 0.35 },
  { name: 'Node.js', color: '#22c55e', position: [-3, -1, 2], size: 0.4 },
  { name: 'MongoDB', color: '#4ade80', position: [2, 1, -3], size: 0.3 },
  { name: 'React Native', color: '#f59e0b', position: [-1, 2, -3], size: 0.35 },
  { name: 'AWS', color: '#f97316', position: [0, -2, 3], size: 0.3 },
  { name: 'Docker', color: '#fb923c', position: [3, -1, -1], size: 0.25 },
  { name: 'Git', color: '#ea580c', position: [-2, -3, -1], size: 0.3 },
  { name: 'Redux', color: '#818cf8', position: [1, 3, 1], size: 0.25 },
  { name: 'Expo', color: '#fbbf24', position: [-3, 1, -2], size: 0.25 },
  { name: 'Express', color: '#16a34a', position: [2, -2, 1], size: 0.3 },
];

function TechNode({ node, hovered, setHovered }: { node: TechNode; hovered: string | null; setHovered: (name: string | null) => void }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const textRef = useRef<any>(null);
  const isHovered = hovered === node.name;

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
    if (isHovered && meshRef.current) {
      meshRef.current.scale.setScalar(1.3);
    } else if (meshRef.current) {
      meshRef.current.scale.setScalar(1);
    }
  });

  return (
    <group position={node.position}>
      <mesh
        ref={meshRef}
        onPointerEnter={() => setHovered(node.name)}
        onPointerLeave={() => setHovered(null)}
      >
        <sphereGeometry args={[node.size, 16, 16]} />
        <meshStandardMaterial
          color={node.color}
          emissive={node.color}
          emissiveIntensity={isHovered ? 0.5 : 0.2}
          transparent
          opacity={0.8}
        />
      </mesh>
      <Text
        ref={textRef}
        position={[0, node.size + 0.3, 0]}
        fontSize={0.25}
        color={node.color}
        anchorX="center"
        anchorY="middle"
        visible={isHovered || !hovered}
      >
        {node.name}
      </Text>
    </group>
  );
}

function ConnectionLines({ techs }: { techs: TechNode[] }) {
  const linesRef = useRef<THREE.LineSegments>(null);

  const positions = useMemo(() => {
    const points: number[] = [];
    for (let i = 0; i < techs.length; i++) {
      for (let j = i + 1; j < techs.length; j++) {
        const dist = Math.sqrt(
          Math.pow(techs[i].position[0] - techs[j].position[0], 2) +
          Math.pow(techs[i].position[1] - techs[j].position[1], 2) +
          Math.pow(techs[i].position[2] - techs[j].position[2], 2)
        );
        if (dist < 4.5) {
          points.push(...techs[i].position, ...techs[j].position);
        }
      }
    }
    return new Float32Array(points);
  }, [techs]);

  useFrame(() => {
    if (linesRef.current) {
      linesRef.current.rotation.y += 0.002;
    }
  });

  return (
    <lineSegments ref={linesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <lineBasicMaterial color="#0ea5e9" transparent opacity={0.15} />
    </lineSegments>
  );
}

function Scene() {
  const [hovered, setHovered] = useState<string | null>(null);
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Central core */}
      <mesh>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial
          color="#0ea5e9"
          emissive="#0ea5e9"
          emissiveIntensity={0.8}
          transparent
          opacity={0.6}
        />
      </mesh>
      <Text
        position={[0, -0.9, 0]}
        fontSize={0.2}
        color="#0ea5e9"
        anchorX="center"
      >
        Dhananjay
      </Text>

      <ConnectionLines techs={techs} />
      
      {techs.map((node) => (
        <TechNode
          key={node.name}
          node={node}
          hovered={hovered}
          setHovered={setHovered}
        />
      ))}

      {/* Ambient particles */}
      <Particles />
    </group>
  );
}

function Particles() {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 200;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 15;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 15;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 15;
    }
    return pos;
  }, []);

  useFrame(() => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += 0.001;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial size={0.03} color="#0ea5e9" transparent opacity={0.6} />
    </points>
  );
}

export default function TechGlobe() {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <section className="relative py-28 px-4 sm:px-6 lg:px-8 section-gradient-4">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <div className="text-center mb-12">
          <motion.div
            className="inline-block mb-4"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', duration: 0.6 }}
          >
            <span className="text-sm font-semibold text-violet-600 bg-violet-50 px-4 py-1.5 rounded-full border border-violet-200">
              <Sparkles className="w-3 h-3 inline mr-1" />
              3D Visualization
            </span>
          </motion.div>
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-slate-800">
            Tech Stack Universe
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-lg">
            An interactive 3D visualization of the technologies I work with. Hover over nodes to explore.
          </p>
        </div>

        <div className="relative h-[500px] sm:h-[600px] rounded-2xl overflow-hidden border border-slate-200 bg-slate-800 shadow-xl shadow-slate-200/40">
          <Canvas
            camera={{ position: [0, 0, 10], fov: 50 }}
            dpr={[1, 2]}
            gl={{ antialias: true, alpha: true }}
          >
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            <pointLight position={[-10, -10, -10]} intensity={0.5} color="#22c55e" />
            <Scene />
            <OrbitControls
              enableZoom={true}
              enablePan={false}
              autoRotate
              autoRotateSpeed={0.5}
              minDistance={5}
              maxDistance={20}
            />
          </Canvas>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs text-slate-400 bg-slate-900/50 px-3 py-1 rounded-full backdrop-blur-sm">
            Drag to rotate • Scroll to zoom • Hover nodes
          </div>
        </div>
      </div>
    </section>
  );
}
