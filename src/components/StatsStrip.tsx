'use client';

import { useEffect, useRef, useState } from 'react';

function AnimatedNumber({
  target,
  prefix = '',
  suffix = '',
  start,
}: {
  target: number;
  prefix?: string;
  suffix?: string;
  start: boolean;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;
    const duration = 1800;
    let startTime: number | null = null;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  }, [start, target]);

  return (
    <span className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent tabular-nums">
      {prefix}{count}{suffix}
    </span>
  );
}

const stats = [
  {
    target: 7,
    prefix: '',
    suffix: '',
    label: 'Health Modes',
    sub: 'Orthopedic · Cardiovascular · Sleep · Stress · more',
  },
  {
    target: 20,
    prefix: '<$',
    suffix: '',
    label: 'BOM Target (USD)',
    sub: 'Affordable health tech at planetary scale',
  },
  {
    target: 5,
    prefix: '',
    suffix: 'd',
    label: 'Battery Life',
    sub: 'Always-on edge AI, no daily charging',
  },
  {
    target: 100,
    prefix: '',
    suffix: '%',
    label: 'On-Device Privacy',
    sub: 'Your data never leaves the device',
  },
];

export default function StatsStrip() {
  const ref = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="relative bg-slate-950 py-24 overflow-hidden">
      {/* Subtle dot-grid background */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)`,
          backgroundSize: '32px 32px',
        }}
      />

      {/* Edge gradient lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />

      <div className="relative max-w-6xl mx-auto px-4">
        {/* Eyebrow label */}
        <p className="text-center text-xs font-mono tracking-[0.35em] text-cyan-500/60 uppercase mb-16">
          Mica1 · Active Development · Xi'an, China
        </p>

        {/* Stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-4">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="px-8 py-8 text-center border-r border-white/5 last:border-r-0 even:border-r-0 md:even:border-r md:last:border-r-0"
              style={{
                opacity: started ? 1 : 0,
                transform: started ? 'translateY(0)' : 'translateY(24px)',
                transition: `opacity 0.65s ease ${i * 0.12}s, transform 0.65s ease ${i * 0.12}s`,
              }}
            >
              <AnimatedNumber
                target={stat.target}
                prefix={stat.prefix}
                suffix={stat.suffix}
                start={started}
              />
              <div className="mt-3 text-sm font-semibold text-white/90 tracking-wide">
                {stat.label}
              </div>
              <div className="mt-1.5 text-xs text-gray-500 leading-relaxed max-w-[140px] mx-auto">
                {stat.sub}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
