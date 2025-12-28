import Link from 'next/link';

const Hero = () => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900"></div>
        
        {/* Animated gradient circles */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-blue-500/10 rounded-full filter blur-3xl animate-pulse delay-1000"></div>
        
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(120,120,120,0.1)_0%,rgba(0,0,0,0)_70%)]"></div>
      </div>
      
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
          <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Nezaira
          </span>
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto">
          Innovating the future of medicine & technology, one small step at a time.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="#products" className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-gray-900 font-bold rounded-lg text-lg hover:opacity-90 transition-all">
            Explore Products
          </Link>
          <Link href="#blog" className="px-8 py-4 bg-transparent border-2 border-cyan-500/50 text-cyan-400 font-bold rounded-lg text-lg hover:bg-cyan-500/10 transition-all">
            Read Research
          </Link>
        </div>
      </div>
      
      {/* Floating geometric shapes */}
      <div className="absolute top-1/3 left-1/5 w-4 h-4 bg-cyan-400 rounded-full animate-bounce delay-300"></div>
      <div className="absolute top-2/5 right-1/4 w-3 h-3 bg-blue-400 rounded-full animate-bounce delay-700"></div>
      <div className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-cyan-300 rounded-full animate-bounce delay-500"></div>
    </section>
  );
};

export default Hero;