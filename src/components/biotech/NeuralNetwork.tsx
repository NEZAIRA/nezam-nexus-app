'use client';

import { useFrame } from '@react-three/fiber';
import { useRef, useMemo, useState } from 'react';
import * as THREE from 'three';

// QRS Wave structure
interface QRSWave {
  id: number;
  angle: number;
  radius: number;
  progress: number;
  speed: number;
}

export default function NeuralNetwork() {
  const heartRef = useRef<THREE.Group>(null);
  const [qrsWaves, setQrsWaves] = useState<QRSWave[]>([]);

  // Generate ECG/QRS waveform path
  const qrsPath = useMemo(() => {
    const points: THREE.Vector3[] = [];
    const segments = 200;

    for (let i = 0; i < segments; i++) {
      const t = (i / segments) * Math.PI * 2;

      // Create ECG QRS complex waveform
      let amplitude = 0;

      // P wave (small)
      if (t < 0.5) amplitude = Math.sin(t * 4) * 0.3;
      // QRS complex (sharp spike)
      else if (t >= 0.8 && t < 1.2) {
        const qrsT = (t - 0.8) / 0.4;
        amplitude = Math.sin(qrsT * Math.PI) * 2.5; // Sharp spike
      }
      // T wave (medium)
      else if (t >= 1.5 && t < 2.0) {
        const tWaveT = (t - 1.5) / 0.5;
        amplitude = Math.sin(tWaveT * Math.PI) * 0.6;
      }

      points.push(new THREE.Vector3(
        Math.cos(t) * (8 + amplitude),
        amplitude * 1.5,
        Math.sin(t) * (8 + amplitude)
      ));
    }

    return points;
  }, []);

  // Initialize QRS waves orbiting the heart
  useMemo(() => {
    const waves: QRSWave[] = [];
    const waveCount = 8;

    for (let i = 0; i < waveCount; i++) {
      waves.push({
        id: i,
        angle: (i / waveCount) * Math.PI * 2,
        radius: 10 + Math.random() * 5,
        progress: Math.random(),
        speed: 0.01 + Math.random() * 0.01,
      });
    }

    setQrsWaves(waves);
  }, []);

  useFrame((state) => {
    const time = state.clock.elapsedTime;

    // Gentle heartbeat pulse
    if (heartRef.current) {
      const heartbeat = 1 + Math.sin(time * 2.5) * 0.08; // 75 BPM
      heartRef.current.scale.set(heartbeat, heartbeat, heartbeat);
    }

    // Update QRS waves
    setQrsWaves((prev) =>
      prev.map((wave) => ({
        ...wave,
        progress: (wave.progress + wave.speed) % 1,
        angle: wave.angle + 0.005,
      }))
    );
  });

  // Create heart shape using parametric geometry
  const heartGeometry = useMemo(() => {
    const heartShape = new THREE.Shape();

    const x = 0, y = 0;
    heartShape.moveTo(x + 0, y + 0);
    heartShape.bezierCurveTo(x + 0, y - 0.3, x - 0.6, y - 0.3, x - 0.6, y + 0);
    heartShape.bezierCurveTo(x - 0.6, y + 0.3, x - 0.3, y + 0.6, x + 0, y + 1);
    heartShape.bezierCurveTo(x + 0.3, y + 0.6, x + 0.6, y + 0.3, x + 0.6, y + 0);
    heartShape.bezierCurveTo(x + 0.6, y - 0.3, x + 0, y - 0.3, x + 0, y + 0);

    const extrudeSettings = {
      depth: 0.4,
      bevelEnabled: true,
      bevelSegments: 2,
      steps: 2,
      bevelSize: 0.1,
      bevelThickness: 0.1,
    };

    return new THREE.ExtrudeGeometry(heartShape, extrudeSettings);
  }, []);

  return (
    <group>
      {/* Central Heart Node */}
      <group ref={heartRef} position={[0, 0, 0]}>
        {/* Main heart */}
        <mesh geometry={heartGeometry} rotation={[0, 0, Math.PI]}>
          <meshStandardMaterial
            color="#ec4899"
            emissive="#f43f5e"
            emissiveIntensity={1.5}
            transparent
            opacity={0.9}
            roughness={0.3}
            metalness={0.2}
          />
        </mesh>

        {/* Inner glow core */}
        <mesh position={[0, 0.2, 0]}>
          <sphereGeometry args={[0.5, 32, 32]} />
          <meshStandardMaterial
            color="#60a5fa"
            emissive="#60a5fa"
            emissiveIntensity={3}
            transparent
            opacity={0.6}
          />
          <pointLight color="#60a5fa" intensity={8} distance={15} />
        </mesh>

        {/* Cardiac nodes (SA/AV nodes) */}
        <mesh position={[0.3, 0.5, 0.2]}>
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshStandardMaterial
            color="#22d3ee"
            emissive="#22d3ee"
            emissiveIntensity={2}
          />
        </mesh>

        <mesh position={[-0.3, -0.2, 0.2]}>
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshStandardMaterial
            color="#22d3ee"
            emissive="#22d3ee"
            emissiveIntensity={2}
          />
        </mesh>
      </group>

      {/* QRS Waveforms orbiting */}
      {qrsWaves.map((wave) => {
        const points: THREE.Vector3[] = [];
        const waveLength = 100;

        for (let i = 0; i < waveLength; i++) {
          const t = (i / waveLength - wave.progress) * Math.PI * 2;
          const radius = wave.radius;

          // QRS complex shape
          let amplitude = 0;
          const phase = (t % (Math.PI * 2) + Math.PI * 2) % (Math.PI * 2);

          if (phase > 0.5 && phase < 1.5) {
            amplitude = Math.sin((phase - 0.5) * Math.PI) * 3;
          }

          points.push(
            new THREE.Vector3(
              Math.cos(wave.angle + t) * radius,
              amplitude * 0.8,
              Math.sin(wave.angle + t) * radius
            )
          );
        }

        const curve = new THREE.CatmullRomCurve3(points);
        const tubeGeometry = new THREE.TubeGeometry(curve, 64, 0.08, 8, false);

        return (
          <mesh key={wave.id} geometry={tubeGeometry}>
            <meshStandardMaterial
              color="#60a5fa"
              emissive="#60a5fa"
              emissiveIntensity={2}
              transparent
              opacity={0.8}
            />
          </mesh>
        );
      })}

      {/* Pulsing energy particles */}
      {qrsWaves.map((wave, idx) => {
        const angle = wave.angle + wave.progress * Math.PI * 2;
        const x = Math.cos(angle) * wave.radius;
        const z = Math.sin(angle) * wave.radius;

        return (
          <mesh key={`particle-${idx}`} position={[x, 0, z]}>
            <sphereGeometry args={[0.3, 16, 16]} />
            <meshStandardMaterial
              color="#60a5fa"
              emissive="#60a5fa"
              emissiveIntensity={4}
              transparent
              opacity={0.9}
            />
            <pointLight color="#60a5fa" intensity={2} distance={5} />
          </mesh>
        );
      })}

      {/* Outer energy rings */}
      {[12, 18, 24].map((radius, idx) => (
        <mesh key={`ring-${idx}`} rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[radius, radius + 0.1, 64]} />
          <meshStandardMaterial
            color="#60a5fa"
            emissive="#60a5fa"
            emissiveIntensity={1 - idx * 0.2}
            transparent
            opacity={0.3 - idx * 0.08}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </group>
  );
}
