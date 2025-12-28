'use client';

import Link from 'next/link';

const ProductsPage = () => {
  const products = [
    {
      id: 1,
      name: "Supra Brain",
      description: "AI intelligence platform for medical research and healthcare applications. Advanced natural language processing with medical knowledge integration.",
      icon: "fa-brain",
      category: "AI Intelligence",
      features: [
        "Advanced NLP for medical texts",
        "Real-time research analysis",
        "Predictive healthcare insights",
        "Multi-modal data processing"
      ]
    },
    {
      id: 2,
      name: "Faster",
      description: "Advanced fasting and health optimization platform. Personalized tracking with predictive analytics for optimal health outcomes.",
      icon: "fa-apple-alt",
      category: "Health Tech",
      features: [
        "Personalized fasting plans",
        "Health metrics tracking",
        "Predictive health analytics",
        "Integration with wearables"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 py-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">Innovation Portfolio</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Cutting-edge solutions at the intersection of medicine, technology, and research
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {products.map((product) => (
            <div 
              key={product.id} 
              className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-8 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mr-4">
                  <i className={`fas ${product.icon} text-3xl text-blue-600 dark:text-blue-400`}></i>
                </div>
                <div>
                  <span className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm font-semibold">
                    {product.category}
                  </span>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-2">{product.name}</h2>
                </div>
              </div>
              
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                {product.description}
              </p>
              
              <ul className="space-y-2 mb-8">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <i className="fas fa-check-circle text-blue-500 mt-1 mr-2"></i>
                    <span className="text-gray-600 dark:text-gray-400">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Link 
                href="#"
                className="inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
              >
                Learn More
              </Link>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Our Research Approach</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-4 mx-auto">
                <i className="fas fa-microscope text-blue-600 dark:text-blue-400 text-xl"></i>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Scientific Rigor</h3>
              <p className="text-gray-600 dark:text-gray-400">Evidence-based research methodologies and peer-reviewed validation</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-4 mx-auto">
                <i className="fas fa-cogs text-blue-600 dark:text-blue-400 text-xl"></i>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Technical Innovation</h3>
              <p className="text-gray-600 dark:text-gray-400">Cutting-edge technology solutions for complex healthcare challenges</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-4 mx-auto">
                <i className="fas fa-user-md text-blue-600 dark:text-blue-400 text-xl"></i>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Clinical Impact</h3>
              <p className="text-gray-600 dark:text-gray-400">Solutions designed to improve patient outcomes and healthcare delivery</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;