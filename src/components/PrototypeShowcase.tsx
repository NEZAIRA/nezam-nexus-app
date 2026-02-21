'use client';

import { useState } from 'react';

const PrototypeShowcase = () => {
  const [activeMode, setActiveMode] = useState(0);

  const modes = [
    {
      name: 'Orthopedic Monitor',
      icon: '🦴',
      description: 'Real-time posture analysis and musculoskeletal stress detection',
      features: ['IMU-based motion tracking', 'Joint angle calculation', 'Fall risk assessment'],
    },
    {
      name: 'Cardiovascular',
      icon: '❤️',
      description: 'Heart rate variability and circulation monitoring',
      features: ['PPG sensor integration', 'HRV analysis', 'SpO2 measurement'],
    },
    {
      name: 'Fluid-Shift Detection',
      icon: '💧',
      description: 'Microgravity-inspired edema and fluid redistribution tracking',
      features: ['Bio-impedance analysis', 'Compartment pressure estimation', 'Mars-ready algorithms'],
    },
    {
      name: 'Sleep Quality',
      icon: '😴',
      description: 'Multi-stage sleep tracking with circadian rhythm analysis',
      features: ['Accelerometer-based detection', 'Sleep stage classification', 'Recovery metrics'],
    },
    {
      name: 'Stress & HRV',
      icon: '🧠',
      description: 'Autonomic nervous system balance and stress quantification',
      features: ['Real-time HRV computation', 'Stress index scoring', 'Meditation feedback'],
    },
    {
      name: 'Activity Tracking',
      icon: '🏃',
      description: 'Step counting, calorie estimation, and exercise classification',
      features: ['Motion pattern recognition', 'Energy expenditure calc', 'Workout auto-detection'],
    },
    {
      name: 'Emergency Alert',
      icon: '🚨',
      description: 'Predictive anomaly detection with edge-based alerting',
      features: ['Fall detection', 'Abnormal vitals alert', 'Offline-first processing'],
    },
  ];

  const specs = [
    { label: 'BOM Cost', value: '$15-20', highlight: true },
    { label: 'Processing', value: 'Edge AI', highlight: false },
    { label: 'Modes', value: '7 Integrated', highlight: true },
    { label: 'Platform', value: 'ESP32/Arduino', highlight: false },
    { label: 'Battery', value: '3-5 days', highlight: false },
    { label: 'Target', value: 'Multi-Planetary', highlight: true },
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-64 h-64 bg-cyan-500 rounded-full filter blur-3xl animate-blob"></div>
        <div className="absolute top-40 right-10 w-64 h-64 bg-blue-500 rounded-full filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/2 w-64 h-64 bg-purple-500 rounded-full filter blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="px-4 py-2 bg-cyan-500/20 border border-cyan-500/50 rounded-full text-cyan-300 text-sm font-mono font-bold tracking-wider">
              PROTOTYPE v0.1
            </span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Meet <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">Mica1</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            The $15-20 wearable that could revolutionize predictive health—from Earth's clinics to Mars transit modules
          </p>
        </div>

        {/* Specs Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-16">
          {specs.map((spec, index) => (
            <div
              key={index}
              className={`p-6 rounded-xl backdrop-blur-sm border-2 text-center transition-all duration-300 hover:scale-105 ${
                spec.highlight
                  ? 'bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border-cyan-500/50 shadow-lg shadow-cyan-500/20'
                  : 'bg-white/5 border-white/10'
              }`}
            >
              <div className="text-2xl md:text-3xl font-bold text-white mb-1">{spec.value}</div>
              <div className="text-xs text-gray-400 uppercase tracking-wider">{spec.label}</div>
            </div>
          ))}
        </div>

        {/* 7 Modes Showcase */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Modes List */}
          <div className="space-y-3">
            <h3 className="text-2xl font-bold text-white mb-6">7 Intelligent Modes</h3>
            {modes.map((mode, index) => (
              <button
                key={index}
                onClick={() => setActiveMode(index)}
                className={`w-full p-4 rounded-xl text-left transition-all duration-300 ${
                  activeMode === index
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 shadow-lg shadow-cyan-500/50 scale-105'
                    : 'bg-white/5 hover:bg-white/10 border border-white/10'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="text-3xl">{mode.icon}</div>
                  <div className="flex-1">
                    <div className="font-bold text-white text-lg">{mode.name}</div>
                    <div className="text-sm text-gray-300 truncate">{mode.description}</div>
                  </div>
                  <svg
                    className={`w-5 h-5 text-white transition-transform ${
                      activeMode === index ? 'rotate-90' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </button>
            ))}
          </div>

          {/* Mode Details */}
          <div className="bg-gradient-to-br from-slate-800/80 to-blue-900/80 backdrop-blur-md p-8 rounded-2xl border border-cyan-500/30 shadow-2xl shadow-cyan-500/20">
            <div className="flex items-center gap-4 mb-6">
              <div className="text-5xl">{modes[activeMode].icon}</div>
              <div>
                <h4 className="text-2xl font-bold text-white">{modes[activeMode].name}</h4>
                <p className="text-gray-300 text-sm">Mode {activeMode + 1} of 7</p>
              </div>
            </div>

            <p className="text-gray-200 text-lg mb-6 leading-relaxed">{modes[activeMode].description}</p>

            <div className="space-y-3">
              <h5 className="text-sm font-bold text-cyan-400 uppercase tracking-wider mb-3">Key Features</h5>
              {modes[activeMode].features.map((feature, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <svg
                    className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-gray-300">{feature}</span>
                </div>
              ))}
            </div>

            {/* Progress indicator */}
            <div className="mt-8 pt-6 border-t border-white/10">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-gray-400">Development Progress</span>
                <span className="text-xs font-mono text-cyan-400">45% Complete</span>
              </div>
              <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full transition-all duration-1000"
                  style={{ width: '45%' }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center bg-gradient-to-r from-cyan-500/10 to-blue-500/10 backdrop-blur-sm border border-cyan-500/30 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-white mb-3">
            Want to collaborate on Mica1 or build for Mars?
          </h3>
          <p className="text-gray-300 mb-6">
            Open to hardware engineers, space-med researchers, and investors who think in decades, not quarters.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 shadow-lg shadow-cyan-500/50 hover:shadow-cyan-400/60 hover:scale-105"
            >
              Collaborate with Us
            </a>
            <a
              href="/blog"
              className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-xl border-2 border-white/30 hover:bg-white/20 hover:border-white/50 transition-all duration-300 shadow-lg"
            >
              Read the Research
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PrototypeShowcase;
