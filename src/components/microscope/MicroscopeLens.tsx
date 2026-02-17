'use client';

import { Suspense } from 'react';
import Scene3D from './Scene3D';
import LensEffect from './LensEffect';

export default function MicroscopeLens() {
  return (
    <div className="microscope-lens-container">
      <Suspense fallback={null}>
        <Scene3D />
      </Suspense>
      <LensEffect />
    </div>
  );
}
