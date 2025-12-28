import Link from 'next/link';

const Hero = () => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Animated background with multiple layers */}
      <div className="absolute inset-0 z-0">
        {/* Main gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/20 via-purple-900/20 to-cyan-900/20"></div>
        
        {/* Animated gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-gradient-to-r from-cyan-400/20 to-blue-500/20 rounded-full filter blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full filter blur-[100px] animate-pulse delay-1000"></div>
        <div className="absolute top-2/5 right-1/3 w-[300px] h-[300px] bg-gradient-to-r from-indigo-500/20 to-cyan-500/20 rounded-full filter blur-[80px] animate-pulse delay-500"></div>
        
        {/* Animated grid pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(120,119,198,0.1)_0%,rgba(0,0,0,0)_70%)]"></div>
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(100,75,255,0.05)_0%,rgba(60,230,255,0.05)_50%,rgba(100,75,255,0.05)_100%)]"></div>
        
        {/* Floating particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div 
              key={i}
              className="absolute w-1 h-1 bg-cyan-400/70 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 4}s`
              }}
            ></div>
          ))}
        </div>
      </div>
      
      {/* Glassmorphism content container */}
      <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-12 shadow-2xl">
          <h1 className="text-6xl md:text-8xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
              Nezaira
            </span>
          </h1>
          <p className="text-2xl md:text-3xl text-white/90 mb-12 max-w-4xl mx-auto leading-relaxed">
            Innovating the future of medicine & technology, one small step at a time.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link 
              href="#products" 
              className="px-10 py-5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-xl text-xl hover:opacity-90 transition-all transform hover:scale-105 shadow-lg shadow-cyan-500/30"
            >
              Explore Products
            </Link>
            <Link 
              href="#blog" 
              className="px-10 py-5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold rounded-xl text-xl hover:opacity-90 transition-all transform hover:scale-105 shadow-lg shadow-purple-500/30"
            >
              Read Research
            </Link>
          </div>
        </div>
      </div>
      
      {/* Floating geometric shapes with enhanced animations */}
      <div className="absolute top-1/4 left-1/5 w-6 h-6 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full animate-bounce blur-sm"></div>
      <div className="absolute top-1/3 right-1/4 w-5 h-5 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full animate-bounce delay-300 blur-sm"></div>
      <div className="absolute bottom-1/4 left-1/4 w-4 h-4 bg-gradient-to-r from-indigo-400 to-cyan-500 rounded-full animate-bounce delay-700 blur-sm"></div>
      <div className="absolute bottom-1/3 right-1/3 w-3 h-3 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full animate-bounce delay-500 blur-sm"></div>
    </section>
  );
};

export default Hero;