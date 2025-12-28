'use client';

import Link from 'next/link';
import { useState } from 'react';

type Product = {
  id: string;
  name: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
  demo?: {
    messages: {
      sender: string;
      text: string;
    }[];
  };
  waterTracker?: {
    initialAmount: number;
    goal: number;
    initialPercentage: number;
  };
};

const ProductsPage = () => {
  const [activeTab, setActiveTab] = useState('supra-brain');
  
  const products: Product[] = [
    {
      id: 'supra-brain',
      name: 'Supra Brain',
      title: 'Supra Brain - AI Medical Chatbot',
      description: 'An advanced AI system designed to assist with medical queries and provide evidence-based information. Built with the latest in natural language processing and medical knowledge databases.',
      icon: 'fa-brain',
      features: [
        '24/7 availability for medical queries',
        'Evidence-based responses from medical databases',
        'Continuous learning from latest research',
        'Privacy-focused design'
      ],
      demo: {
        messages: [
          { sender: 'bot', text: 'Hello! I\'m your AI medical assistant. How can I help you today?' },
          { sender: 'user', text: 'What are symptoms of diabetes?' },
          { sender: 'bot', text: 'Common symptoms include frequent urination, excessive thirst, unexplained weight loss, fatigue, and blurred vision. If you\'re experiencing these symptoms, consult a doctor.' }
        ]
      }
    },
    {
      id: 'faster',
      name: 'Faster',
      title: 'Faster - Fasting Tracker App',
      description: 'Track your intermittent fasting progress with our intuitive water intake visualization. Monitor your health goals with beautiful, interactive graphics.',
      icon: 'fa-glass-whiskey',
      features: [
        'Interactive water intake visualization',
        'Fasting period tracking',
        'Health goal monitoring',
        'Personalized recommendations'
      ],
      waterTracker: {
        initialAmount: 800,
        goal: 2000,
        initialPercentage: 40
      }
    }
  ];

  const [waterAmount, setWaterAmount] = useState(800); // Current amount in ml
  const maxAmount = 2000; // Max goal in ml

  const addWater = () => {
    if (waterAmount < maxAmount) {
      const newAmount = Math.min(waterAmount + 200, maxAmount);
      setWaterAmount(newAmount);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-5xl font-bold text-center mb-16 text-white">Our Products</h2>
        
        <div className="product-tabs flex flex-wrap justify-center gap-4 mb-12">
          {products.map((product) => (
            <button
              key={product.id}
              className={`px-6 py-3 rounded-full transition-all ${activeTab === product.id 
                ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-gray-900 font-medium' 
                : 'bg-gray-800 text-white border border-gray-700 hover:bg-gray-700'}`}
              onClick={() => setActiveTab(product.id)}
            >
              {product.name}
            </button>
          ))}
        </div>
        
        {products.map((product) => (
          <div 
            key={product.id} 
            className={`transition-all duration-300 ${activeTab === product.id ? 'block' : 'hidden'}`}
          >
            <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl border border-gray-700 p-8 mb-12">
              <div className="flex flex-col md:flex-row items-center gap-8 mb-8">
                <div className="w-20 h-20 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center text-white text-3xl">
                  <i className={`fas ${product.icon}`}></i>
                </div>
                <div className="text-center md:text-left">
                  <h3 className="text-3xl font-bold text-white mb-4">{product.title}</h3>
                  <p className="text-gray-300 text-lg">{product.description}</p>
                </div>
              </div>
              
              {product.id === 'supra-brain' && product.demo && (
                <div className="mb-8 p-6 bg-gray-900/50 rounded-xl border border-gray-700">
                  <h4 className="text-xl font-bold text-white mb-4">Interactive Demo</h4>
                  <div className="space-y-4">
                    {product.demo.messages.map((msg, index) => (
                      <div 
                        key={index}
                        className={`p-4 rounded-lg ${msg.sender === 'user' ? 'bg-cyan-500/20 text-white ml-auto text-right' : 'bg-gray-700/50 text-gray-300'}`}
                      >
                        <div className="font-semibold mb-1">{msg.sender === 'user' ? 'User' : 'Supra Brain'}</div>
                        <div>{msg.text}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {product.id === 'faster' && (
                <div className="mb-8 p-6 bg-gray-900/50 rounded-xl border border-gray-700">
                  <h4 className="text-xl font-bold text-white mb-4">Water Intake Visualization</h4>
                  <div className="flex flex-col items-center">
                    <div className="relative w-32 h-64 bg-gray-800/50 rounded-full border-2 border-gray-700 mb-4 overflow-hidden">
                      <div 
                        className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-cyan-400 to-blue-500 transition-all duration-500"
                        style={{ height: `${(waterAmount / maxAmount) * 100}%` }}
                      ></div>
                    </div>
                    <div className="text-center mb-4">
                      Daily Goal: {maxAmount}ml | Current: {waterAmount}ml | {Math.round((waterAmount / maxAmount) * 100)}% Complete
                    </div>
                    <button 
                      onClick={addWater}
                      className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold rounded-lg hover:opacity-90 transition-all disabled:opacity-50"
                      disabled={waterAmount >= maxAmount}
                    >
                      Add Water (200ml)
                    </button>
                  </div>
                </div>
              )}
              
              <h4 className="text-xl font-bold text-white mb-6">Key Features</h4>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-start p-4 bg-gray-700/30 rounded-lg border border-gray-600">
                    <span className="text-cyan-400 mr-3 text-xl">✓</span>
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Link 
                href="#"
                className="inline-block px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-gray-900 font-bold rounded-lg hover:opacity-90 transition-all"
              >
                {product.id === 'supra-brain' ? 'Try Supra Brain' : 'Download Faster'}
              </Link>
            </div>
          </div>
        ))}
        
        <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl border border-gray-700 p-8">
          <h3 className="text-3xl font-bold text-white mb-8 text-center">Product Roadmap</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gray-700/30 p-6 rounded-xl border border-gray-600">
              <h4 className="text-lg font-bold text-cyan-400 mb-2">Q1 2025</h4>
              <p className="text-gray-300">Enhanced AI medical knowledge base</p>
            </div>
            <div className="bg-gray-700/30 p-6 rounded-xl border border-gray-600">
              <h4 className="text-lg font-bold text-cyan-400 mb-2">Q2 2025</h4>
              <p className="text-gray-300">Integration with health devices</p>
            </div>
            <div className="bg-gray-700/30 p-6 rounded-xl border border-gray-600">
              <h4 className="text-lg font-bold text-cyan-400 mb-2">Q3 2025</h4>
              <p className="text-gray-300">Multi-language support</p>
            </div>
            <div className="bg-gray-700/30 p-6 rounded-xl border border-gray-600">
              <h4 className="text-lg font-bold text-cyan-400 mb-2">Q4 2025</h4>
              <p className="text-gray-300">Advanced analytics dashboard</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;