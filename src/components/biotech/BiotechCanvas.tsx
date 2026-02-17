'use client';

import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';

export default function BiotechCanvas() {
  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 2,
        pointerEvents: 'none',
      }}
    >
      <Suspense fallback={null}>
        <Canvas
          camera={{ position: [0, 0, 35], fov: 100 }}
          gl={{ alpha: true, antialias: true }}
          dpr={[1, 2]}
        >
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} color="#60a5fa" />
          <pointLight position={[-10, -10, -10]} intensity={0.5} color="#a78bfa" />
        </Canvas>
      </Suspense>
    </div>
  );
}
