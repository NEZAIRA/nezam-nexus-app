'use client';

import { useEffect, useRef } from 'react';

export default function HeartbeatMonitor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const dataPointsRef = useRef<number[]>([]);
  const xPositionRef = useRef(0);
  const phaseRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const width = canvas.offsetWidth;
    const height = canvas.offsetHeight;
    const centerY = height / 2;
    const amplitude = height * 0.25;

    // Generate PQRST waveform data
    const generatePQRST = (phase: number): number => {
      // Normalize phase to 0-1 for one complete heartbeat
      const t = phase % 1;

      let value = 0;

      // Baseline (0-0.15)
      if (t < 0.15) {
        value = 0;
      }
      // P wave - atrial depolarization (0.15-0.25)
      else if (t >= 0.15 && t < 0.25) {
        const pT = (t - 0.15) / 0.1;
        value = Math.sin(pT * Math.PI) * 0.2;
      }
      // PR segment (0.25-0.35)
      else if (t >= 0.25 && t < 0.35) {
        value = 0;
      }
      // QRS complex - ventricular depolarization (0.35-0.45)
      else if (t >= 0.35 && t < 0.45) {
        const qrsT = (t - 0.35) / 0.1;

        // Q wave (downward)
        if (qrsT < 0.2) {
          value = -Math.sin((qrsT / 0.2) * Math.PI) * 0.15;
        }
        // R wave (sharp upward spike)
        else if (qrsT >= 0.2 && qrsT < 0.5) {
          value = Math.sin(((qrsT - 0.2) / 0.3) * Math.PI) * 1.2;
        }
        // S wave (downward)
        else {
          value = -Math.sin(((qrsT - 0.5) / 0.5) * Math.PI) * 0.25;
        }
      }
      // ST segment (0.45-0.55)
      else if (t >= 0.45 && t < 0.55) {
        value = 0;
      }
      // T wave - ventricular repolarization (0.55-0.75)
      else if (t >= 0.55 && t < 0.75) {
        const tT = (t - 0.55) / 0.2;
        value = Math.sin(tT * Math.PI) * 0.35;
      }
      // Return to baseline (0.75-1.0)
      else {
        value = 0;
      }

      return value;
    };

    // Animation loop
    const animate = () => {
      // Clear with fade effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, width, height);

      // Draw grid
      ctx.strokeStyle = 'rgba(96, 165, 250, 0.1)';
      ctx.lineWidth = 1;

      // Vertical grid lines
      for (let x = 0; x < width; x += 20) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      // Horizontal grid lines
      for (let y = 0; y < height; y += 20) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Center line
      ctx.strokeStyle = 'rgba(96, 165, 250, 0.2)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, centerY);
      ctx.lineTo(width, centerY);
      ctx.stroke();

      // Calculate current amplitude
      const currentValue = generatePQRST(phaseRef.current);
      const yPosition = centerY - currentValue * amplitude;

      // Add new data point
      dataPointsRef.current.push(yPosition);

      // Keep only visible points
      if (dataPointsRef.current.length > width) {
        dataPointsRef.current.shift();
      }

      // Draw ECG waveform with glow
      ctx.shadowBlur = 15;
      ctx.shadowColor = '#60a5fa';
      ctx.strokeStyle = '#60a5fa';
      ctx.lineWidth = 3;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      ctx.beginPath();
      dataPointsRef.current.forEach((y, index) => {
        const x = width - (dataPointsRef.current.length - index) * 2;

        if (index === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      });
      ctx.stroke();

      // Draw glowing cursor dot
      const cursorX = width - 2;
      const cursorY = yPosition;

      // Outer glow
      ctx.shadowBlur = 20;
      ctx.shadowColor = '#60a5fa';
      ctx.fillStyle = 'rgba(96, 165, 250, 0.3)';
      ctx.beginPath();
      ctx.arc(cursorX, cursorY, 8, 0, Math.PI * 2);
      ctx.fill();

      // Inner bright dot
      ctx.shadowBlur = 10;
      ctx.fillStyle = '#60a5fa';
      ctx.beginPath();
      ctx.arc(cursorX, cursorY, 4, 0, Math.PI * 2);
      ctx.fill();

      // Core
      ctx.shadowBlur = 0;
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(cursorX, cursorY, 2, 0, Math.PI * 2);
      ctx.fill();

      // Update phase (controls heartbeat speed - 75 BPM)
      phaseRef.current += 0.01; // Adjust for heart rate
      xPositionRef.current += 2;

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div className="heartbeat-monitor">
      <canvas
        ref={canvasRef}
        className="heartbeat-canvas"
        style={{
          width: '100%',
          height: '100%',
          background: 'linear-gradient(to bottom, #0a0f1c 0%, #111827 100%)',
          borderRadius: '12px',
          boxShadow: '0 0 30px rgba(96, 165, 250, 0.3), inset 0 0 20px rgba(0, 0, 0, 0.5)',
        }}
      />
      <style jsx>{`
        .heartbeat-monitor {
          width: 100%;
          height: 200px;
          position: relative;
          border: 2px solid rgba(96, 165, 250, 0.3);
          border-radius: 14px;
          overflow: hidden;
        }

        .heartbeat-canvas {
          display: block;
        }
      `}</style>
    </div>
  );
}
