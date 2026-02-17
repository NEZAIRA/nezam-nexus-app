'use client';

import { useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';

interface CellProps {
  position: [number, number, number];
}

function Cell({ position }: CellProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;

    // Floating animation
    meshRef.current.position.y =
      position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.3;

    // Rotation
    meshRef.current.rotation.x += 0.001;
    meshRef.current.rotation.y += 0.002;

    // Pulsing scale
    const scale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.05;
    meshRef.current.scale.setScalar(scale);
  });

  return (
    <mesh ref={meshRef} position={position}>
      <icosahedronGeometry args={[0.5, 2]} />
      <meshStandardMaterial
        color="#60a5fa"
        emissive="#1e40af"
        emissiveIntensity={0.2}
        roughness={0.4}
        transparent
        opacity={0.7}
      />
    </mesh>
  );
}

function Particles() {
  const particlesRef = useRef<THREE.InstancedMesh>(null);
  const count = 80;

  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      temp.push({
        position: [
          (Math.random() - 0.5) * 12,
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 6,
        ] as [number, number, number],
        speed: Math.random() * 0.5 + 0.2,
        offset: Math.random() * Math.PI * 2,
      });
    }
    return temp;
  }, []);

  useFrame((state) => {
    if (!particlesRef.current) return;

    const matrix = new THREE.Matrix4();
    particles.forEach((particle, i) => {
      const time = state.clock.elapsedTime;
      const x = particle.position[0] + Math.sin(time * particle.speed + particle.offset) * 0.2;
      const y = particle.position[1] + Math.cos(time * particle.speed + particle.offset) * 0.2;
      const z = particle.position[2] + Math.sin(time * particle.speed * 0.5) * 0.1;

      matrix.setPosition(x, y, z);
      particlesRef.current!.setMatrixAt(i, matrix);
    });

    particlesRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={particlesRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[0.05, 8, 8]} />
      <meshBasicMaterial color="#a78bfa" transparent opacity={0.6} />
    </instancedMesh>
  );
}

export default function Microorganisms() {
  const cellPositions = useMemo(() => {
    return Array.from({ length: 15 }, () => [
      (Math.random() - 0.5) * 10,
      (Math.random() - 0.5) * 8,
      (Math.random() - 0.5) * 5,
    ] as [number, number, number]);
  }, []);

  return (
    <group>
      {cellPositions.map((pos, i) => (
        <Cell key={i} position={pos} />
      ))}
      <Particles />
    </group>
  );
}
