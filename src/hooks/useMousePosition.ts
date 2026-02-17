'use client';

import { useEffect, useRef, useState } from 'react';

export function useMousePosition() {
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const targetPos = useRef({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      targetPos.current = {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      };
    };

    const handleTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0];
      targetPos.current = {
        x: touch.clientX / window.innerWidth,
        y: touch.clientY / window.innerHeight,
      };
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);

    // Smooth lerp animation
    const interval = setInterval(() => {
      setMousePos((prev) => ({
        x: prev.x + (targetPos.current.x - prev.x) * 0.1,
        y: prev.y + (targetPos.current.y - prev.y) * 0.1,
      }));
    }, 16); // ~60fps

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      clearInterval(interval);
    };
  }, []);

  return mousePos;
}
