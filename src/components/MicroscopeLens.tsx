'use client';

import { useEffect, useRef, useState } from 'react';

const MicroscopeLens = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isMouseOver, setIsMouseOver] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      setPosition({ x, y });
      
      // Check if mouse is over the container
      setIsMouseOver(
        x >= 0 && x <= rect.width && 
        y >= 0 && y <= rect.height
      );
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      container.addEventListener('mouseenter', () => setIsActive(true));
      container.addEventListener('mouseleave', () => setIsActive(false));
    }

    // Handle animation frame for smooth rendering
    let animationFrameId: number;

    const render = () => {
      if (!ctx || !canvas) return;

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (isActive && isMouseOver) {
        // Set canvas dimensions to match container
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        // Create circular lens effect
        const gradient = ctx.createRadialGradient(
          position.x, 
          position.y, 
          0,
          position.x, 
          position.y, 
          150
        );
        
        gradient.addColorStop(0, 'rgba(255, 255, 255, 0.1)');
        gradient.addColorStop(0.7, 'rgba(135, 207, 235, 0.1)');
        gradient.addColorStop(1, 'rgba(135, 207, 235, 0)');

        ctx.globalCompositeOperation = 'source-over';
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(position.x, position.y, 150, 0, Math.PI * 2);
        ctx.fill();

        // Add lens border
        ctx.globalCompositeOperation = 'source-over';
        ctx.strokeStyle = 'rgba(135, 207, 235, 0.6)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(position.x, position.y, 150, 0, Math.PI * 2);
        ctx.stroke();

        // Add crosshairs
        ctx.beginPath();
        ctx.moveTo(position.x - 20, position.y);
        ctx.lineTo(position.x + 20, position.y);
        ctx.moveTo(position.x, position.y - 20);
        ctx.lineTo(position.x, position.y + 20);
        ctx.strokeStyle = 'rgba(135, 207, 235, 0.8)';
        ctx.lineWidth = 1;
        ctx.stroke();
      } else {
        // Clear the canvas when not active
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (container) {
        container.removeEventListener('mousemove', handleMouseMove);
        container.removeEventListener('mouseenter', () => setIsActive(true));
        container.removeEventListener('mouseleave', () => setIsActive(false));
      }
      cancelAnimationFrame(animationFrameId);
    };
  }, [isActive, isMouseOver]);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-50"
      style={{ height: '100vh' }}
    >
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full"
        style={{ mixBlendMode: 'overlay' }}
      />
    </div>
  );
};

export default MicroscopeLens;