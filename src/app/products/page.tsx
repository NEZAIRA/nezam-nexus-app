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
    <div className="products-section">
      <div className="container mx-auto px-4">
        <h2>Our Products</h2>
        
        <div className="product-tabs">
          {products.map((product) => (
            <button
              key={product.id}
              className={activeTab === product.id ? 'active' : ''}
              onClick={() => setActiveTab(product.id)}
            >
              {product.name}
            </button>
          ))}
        </div>
        
        {products.map((product) => (
          <div 
            key={product.id} 
            className={activeTab === product.id ? 'active' : 'hidden'}
          >
            <div>
              <h3>{product.title}</h3>
              <p>{product.description}</p>
              
              {product.id === 'supra-brain' && product.demo && (
                <div>
                  <h4>Interactive Demo</h4>
                  {product.demo.messages.map((msg, index) => (
                    <div key={index}>
                      <strong>{msg.sender === 'user' ? 'User' : 'Supra Brain'}</strong>
                      {msg.text}
                    </div>
                  ))}
                </div>
              )}
              
              {product.id === 'faster' && (
                <div>
                  <h4>Water Intake Visualization</h4>
                  <div>
                    <div 
                      style={{ height: `${(waterAmount / maxAmount) * 100}%` }}
                    ></div>
                  </div>
                  <div>
                    Daily Goal: {maxAmount}ml | Current: {waterAmount}ml | {Math.round((waterAmount / maxAmount) * 100)}% Complete
                  </div>
                  <button 
                    onClick={addWater}
                  >
                    Add Water (200ml)
                  </button>
                </div>
              )}
              
              <h4>Key Features</h4>
              <ul>
                {product.features.map((feature, index) => (
                  <li key={index}>
                    <span>✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Link 
                href="#"
              >
                {product.id === 'supra-brain' ? 'Try Supra Brain' : 'Download Faster'}
              </Link>
            </div>
          </div>
        ))}
        
        <div>
          <h3>Product Roadmap</h3>
          <div>
            <div>
              <h4>Q1 2025</h4>
              <p>Enhanced AI medical knowledge base</p>
            </div>
            <div>
              <h4>Q2 2025</h4>
              <p>Integration with health devices</p>
            </div>
            <div>
              <h4>Q3 2025</h4>
              <p>Multi-language support</p>
            </div>
            <div>
              <h4>Q4 2025</h4>
              <p>Advanced analytics dashboard</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;