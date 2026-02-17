'use client';

import { useFrame } from '@react-three/fiber';
import { useRef, useState } from 'react';
import * as THREE from 'three';

export default function HeartbeatWaves() {
  const [waves, setWaves] = useState<{ id: number; time: number }[]>([]);
  const lastBeatRef = useRef(0);

  useFrame((state) => {
    const time = state.clock.elapsedTime;

    // Create new wave every 1.5 seconds (heartbeat)
    if (time - lastBeatRef.current > 1.5) {
      setWaves((prev) => [...prev.filter((w) => time - w.time < 3), { id: Date.now(), time }]);
      lastBeatRef.current = time;
    }
  });

  return (
    <group>
      {waves.map((wave) => (
        <Wave key={wave.id} startTime={wave.time} />
      ))}
    </group>
  );
}

function Wave({ startTime }: { startTime: number }) {
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ringRef.current) return;

    const elapsed = state.clock.elapsedTime - startTime;
    const scale = 1 + elapsed * 2;
    const opacity = Math.max(0, 1 - elapsed / 3);

    ringRef.current.scale.set(scale, scale, 1);
    (ringRef.current.material as THREE.MeshBasicMaterial).opacity = opacity * 0.3;
  });

  return (
    <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
      <ringGeometry args={[0.5, 0.6, 32]} />
      <meshBasicMaterial color="#a78bfa" transparent opacity={0.3} side={THREE.DoubleSide} />
    </mesh>
  );
}
