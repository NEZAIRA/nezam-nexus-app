import Link from 'next/link';

const Hero = () => {
  return (
    <section className="w-full h-screen flex items-center justify-center overflow-hidden bg-white dark:bg-gray-900 hero-section rounded-b-[80px]">
      {/* Subtle background pattern */}
      <div 
        style={{
          backgroundImage: `url('/wolfgang-hasselmann-LxtPWDPf_Xs-unsplash.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          width: '100%',
          height: '100%',
          position: 'absolute',
          top: 0,
          left: 0,
        }}
      >
        <div className="absolute inset-0 bg-black/30 rounded-b-[80px]"></div>
      </div>
      
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <div className="space-y-8">
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6">
            <span className="relative inline-block">
              <span className="relative z-10 text-blue-600 dark:text-blue-400">Nezaira</span>
              <span className="absolute top-0 left-0 w-full h-full text-blue-600 dark:text-blue-400 font-bold text-5xl md:text-7xl overflow-hidden">
                <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white to-transparent opacity-40 animate-shine-text"></span>
                <span className="invisible">Nezaira</span>
              </span>
            </span>
          </h1>
          <p className="text-xl md:text-2xl font-bold text-white mb-10 max-w-3xl mx-auto leading-relaxed">
            Advancing biotech innovation at the intersection of medicine, technology, and research.
          </p>
          
          <div className="mb-12 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800 max-w-2xl mx-auto">
            <div className="flex items-center justify-center mb-4">
              <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
              <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
              <div className="w-3 h-3 rounded-full bg-blue-500"></div>
            </div>
            <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200 text-center mb-2">
              Digital Biotech & Medical Technology Startup
            </h3>
            <p className="text-blue-700 dark:text-blue-300 text-center text-sm mb-4">
              Pioneering the future of medical research and biotechnology
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
      
      <div className="scroll-down">
        <div className="scroll-down__icon" aria-hidden="true">
          <svg width="20" height="31" viewBox="0 0 20 31" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="0.5" y="0.533203" width="19" height="29" rx="5.5" stroke="#292933" />
            <line x1="9.83398" y1="8.15527" x2="9.83398" y2="15.1553" stroke="#292933" strokeLinecap="round">
            </line>
          </svg>
        </div>
        <div className="scroll-down__text">Scroll</div>
      </div>
    </section>
  );
};

export default Hero;