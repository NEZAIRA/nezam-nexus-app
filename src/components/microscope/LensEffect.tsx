'use client';

import { useMousePosition } from '@/hooks/useMousePosition';
import { useState, useEffect } from 'react';

export default function LensEffect() {
  const mousePos = useMousePosition();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show lens after a small delay
    const timer = setTimeout(() => setIsVisible(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className="lens-cursor"
      style={{
        position: 'fixed',
        left: `${mousePos.x * 100}%`,
        top: `${mousePos.y * 100}%`,
        width: '200px',
        height: '200px',
        borderRadius: '50%',
        border: '2px solid rgba(96, 165, 250, 0.8)',
        boxShadow: '0 0 20px rgba(96, 165, 250, 0.6), inset 0 0 15px rgba(255, 255, 255, 0.1)',
        pointerEvents: 'none',
        transform: 'translate(-50%, -50%)',
        transition: 'opacity 0.3s ease',
        opacity: isVisible ? 1 : 0,
        zIndex: 15,
      }}
    />
  );
}
