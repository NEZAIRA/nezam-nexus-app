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
    <div className="min-h-screen bg-white">
      <div className="products-section">
        <h2 className="section-title">Our Products</h2>
        
        <div className="product-tabs flex gap-4 mb-8 flex-wrap justify-center">
          {products.map((product) => (
            <button
              key={product.id}
              className={`tab-button px-6 py-3 rounded-full transition-all ${
                activeTab === product.id 
                  ? 'bg-[#00c6ff] text-[#0a2540] font-medium' 
                  : 'bg-[#0a2540] text-white'
              }`}
              onClick={() => setActiveTab(product.id)}
            >
              {product.name}
            </button>
          ))}
        </div>
        
        {products.map((product) => (
          <div 
            key={product.id} 
            className={`tab-content ${activeTab === product.id ? 'block' : 'hidden'}`}
          >
            <div className="product-detail-content bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <h3 className="text-3xl font-bold text-gray-900 mb-4">{product.title}</h3>
              <p className="text-gray-600 mb-6">{product.description}</p>
              
              {product.id === 'supra-brain' && product.demo && (
                <div className="chat-mockup bg-[#0a2540] rounded-xl p-6 mb-6 text-white">
                  <h4 className="text-xl font-semibold mb-4">Interactive Demo</h4>
                  {product.demo.messages.map((msg, index) => (
                    <div 
                      key={index} 
                      className={`chat-bubble p-4 rounded-xl mb-4 max-w-[80%] ${
                        msg.sender === 'user' 
                          ? 'bg-[#00c6ff] text-[#0a2540] ml-auto text-right' 
                          : 'bg-gray-700'
                      }`}
                    >
                      <strong className={msg.sender === 'user' ? 'block' : ''}>
                        {msg.sender === 'user' ? 'User' : 'Supra Brain'}
                      </strong>
                      {msg.text}
                    </div>
                  ))}
                </div>
              )}
              
              {product.id === 'faster' && (
                <div className="water-tracker bg-gradient-to-br from-cyan-50 to-blue-50 rounded-xl p-8 text-center mb-6">
                  <h4 className="text-xl font-semibold mb-4">Water Intake Visualization</h4>
                  <div className="water-level w-24 h-64 bg-blue-100 rounded-lg mx-auto mb-4 relative overflow-hidden border-2 border-blue-500">
                    <div 
                      className="water-fill bg-blue-500 absolute bottom-0 w-full transition-all duration-500"
                      style={{ height: `${(waterAmount / maxAmount) * 100}%` }}
                    ></div>
                  </div>
                  <div className="water-goal text-[#0a2540] font-semibold mb-4">
                    Daily Goal: {maxAmount}ml | Current: {waterAmount}ml | {Math.round((waterAmount / maxAmount) * 100)}% Complete
                  </div>
                  <button 
                    className="add-water-btn bg-[#00c6ff] text-[#0a2540] border-none px-6 py-3 rounded-lg font-semibold cursor-pointer mt-4 hover:bg-[#00a8e8] transition-all"
                    onClick={addWater}
                  >
                    Add Water (200ml)
                  </button>
                </div>
              )}
              
              <h4 className="text-xl font-semibold text-gray-900 mb-3">Key Features</h4>
              <ul className="mb-6 pl-6 space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-[#00c6ff] mr-2">✓</span>
                    <span className="text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Link 
                href="#" 
                className="btn btn-primary px-8 py-3 bg-[#00c6ff] text-[#0a2540] font-semibold rounded-lg hover:bg-[#00a8e8] transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition duration-300"
              >
                {product.id === 'supra-brain' ? 'Try Supra Brain' : 'Download Faster'}
              </Link>
            </div>
          </div>
        ))}
        
        <div className="roadmap-section mt-16">
          <h3 className="section-title">Product Roadmap</h3>
          <div className="roadmap-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
            <div className="roadmap-card bg-white rounded-xl shadow-lg p-6 border-l-4 border-[#00c6ff]">
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Q1 2025</h4>
              <p className="text-gray-600">Enhanced AI medical knowledge base</p>
            </div>
            <div className="roadmap-card bg-white rounded-xl shadow-lg p-6 border-l-4 border-[#00c6ff]">
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Q2 2025</h4>
              <p className="text-gray-600">Integration with health devices</p>
            </div>
            <div className="roadmap-card bg-white rounded-xl shadow-lg p-6 border-l-4 border-[#00c6ff]">
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Q3 2025</h4>
              <p className="text-gray-600">Multi-language support</p>
            </div>
            <div className="roadmap-card bg-white rounded-xl shadow-lg p-6 border-l-4 border-[#00c6ff]">
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Q4 2025</h4>
              <p className="text-gray-600">Advanced analytics dashboard</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;