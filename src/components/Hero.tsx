import Link from 'next/link';

const Hero = () => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-white dark:bg-gray-900">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23f0f9ff\' fill-opacity=\'0.1\'%3E%3Ccircle cx=\'30\' cy=\'30\' r=\'2\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] dark:bg-[url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%231e3a8a\' fill-opacity=\'0.05\'%3E%3Ccircle cx=\'30\' cy=\'30\' r=\'2\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
      
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <div className="space-y-8">
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6">
            <span className="text-blue-600 dark:text-blue-400">Nezaira</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed">
            Advancing biotech innovation at the intersection of medicine, technology, and research.
          </p>
          
          {/* Microscope Lens Feature Highlight */}
          <div className="mb-12 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800 max-w-2xl mx-auto">
            <div className="flex items-center justify-center mb-4">
              <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
              <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
              <div className="w-3 h-3 rounded-full bg-blue-500"></div>
            </div>
            <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200 text-center mb-2">
              Interactive Microscope Lens Technology
            </h3>
            <p className="text-blue-700 dark:text-blue-300 text-center text-sm mb-4">
              Experience our cutting-edge visualization tools that bring microscopic details to life
            </p>
            <div className="flex justify-center">
              <div className="relative inline-block">
                <div className="w-16 h-16 rounded-full border-2 border-blue-400 flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full border border-blue-300 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
                  </div>
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center animate-ping opacity-20"></div>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="#products" 
              className="px-8 py-4 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
            >
              Explore Solutions
            </Link>
            <Link 
              href="#blog" 
              className="px-8 py-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-medium rounded-lg border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors shadow-sm"
            >
              Research Insights
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;