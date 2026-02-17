'use client';

import { Canvas } from '@react-three/fiber';
import { OrthographicCamera } from '@react-three/drei';
import Microorganisms from './Microorganisms';

export default function Scene3D() {
  return (
    <Canvas
      gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
      dpr={[1, 2]} // Limit pixel ratio for performance
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none', // Don't block hero interactions
      }}
    >
      <OrthographicCamera makeDefault position={[0, 0, 10]} zoom={50} />

      {/* Lighting - blue/purple theme */}
      <ambientLight intensity={0.4} color="#4a90e2" />
      <pointLight position={[10, 10, 10]} intensity={0.8} color="#60a5fa" />
      <pointLight position={[-10, -10, 5]} intensity={0.5} color="#a78bfa" />

      <Microorganisms />
    </Canvas>
  );
}
