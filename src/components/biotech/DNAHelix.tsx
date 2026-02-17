'use client';

import { useFrame } from '@react-three/fiber';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';

export default function DNAHelix() {
  const groupRef = useRef<THREE.Group>(null);

  // Create DNA helix structure
  const { leftStrand, rightStrand, connectors } = useMemo(() => {
    const left: [number, number, number][] = [];
    const right: [number, number, number][] = [];
    const conn: [number, number, number][][] = [];

    const height = 10;
    const radius = 1.5;
    const segments = 40;

    for (let i = 0; i < segments; i++) {
      const t = (i / segments) * height - height / 2;
      const angle = (i / segments) * Math.PI * 4; // 2 full rotations

      // Left strand
      left.push([Math.cos(angle) * radius, t, Math.sin(angle) * radius]);

      // Right strand (opposite side)
      right.push([Math.cos(angle + Math.PI) * radius, t, Math.sin(angle + Math.PI) * radius]);

      // Connector between strands (every 3rd segment)
      if (i % 3 === 0) {
        conn.push([left[i], right[i]]);
      }
    }

    return { leftStrand: left, rightStrand: right, connectors: conn };
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <group ref={groupRef} position={[10, 0, -3]} scale={[2, 2, 2]}>
      {/* Left strand */}
      {leftStrand.map((pos, i) => (
        <mesh key={`left-${i}`} position={pos}>
          <sphereGeometry args={[0.08, 8, 8]} />
          <meshStandardMaterial
            color="#60a5fa"
            emissive="#3b82f6"
            emissiveIntensity={0.5}
          />
        </mesh>
      ))}

      {/* Right strand */}
      {rightStrand.map((pos, i) => (
        <mesh key={`right-${i}`} position={pos}>
          <sphereGeometry args={[0.08, 8, 8]} />
          <meshStandardMaterial
            color="#a78bfa"
            emissive="#8b5cf6"
            emissiveIntensity={0.5}
          />
        </mesh>
      ))}

      {/* Connectors (base pairs) */}
      {connectors.map((pair, i) => {
        const start = new THREE.Vector3(...pair[0]);
        const end = new THREE.Vector3(...pair[1]);
        const direction = new THREE.Vector3().subVectors(end, start);
        const length = direction.length();
        const center = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);

        return (
          <group key={`connector-${i}`} position={center.toArray()}>
            <mesh
              rotation={[
                0,
                Math.atan2(direction.z, direction.x),
                Math.atan2(direction.y, Math.sqrt(direction.x ** 2 + direction.z ** 2)),
              ]}
            >
              <cylinderGeometry args={[0.03, 0.03, length, 6]} />
              <meshStandardMaterial
                color="#22d3ee"
                emissive="#06b6d4"
                emissiveIntensity={0.3}
                transparent
                opacity={0.6}
              />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}
