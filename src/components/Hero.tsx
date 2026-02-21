import Link from 'next/link';
import dynamic from 'next/dynamic';

const BiotechCanvas = dynamic(() => import('./biotech/BiotechCanvas'), {
  ssr: false,
  loading: () => null,
});

const Hero = () => {
  return (
    <section className="w-full h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 hero-section rounded-b-[80px] relative">
      {/* Background Image */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center"
        style={{
          backgroundImage: `url('/wolfgang-hasselmann-LxtPWDPf_Xs-unsplash.jpg')`,
        }}
      >
        {/* Gradient overlays for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/70 rounded-b-[80px]"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-transparent to-cyan-600/20 rounded-b-[80px]"></div>
      </div>

      {/* Futuristic Biotech Animation */}
      <BiotechCanvas />

      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <div className="space-y-8">
          {/* Main title with animated gradient */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6">
            <span className="relative inline-block bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent animate-gradient">
              Nezaira
            </span>
          </h1>

          {/* Subtitle with space-med focus */}
          <p className="text-2xl md:text-3xl font-bold text-white mb-4 max-w-4xl mx-auto leading-relaxed tracking-wide">
            Intelligent Systems for Healthcare Innovation
          </p>

          <p className="text-lg md:text-xl text-cyan-100 mb-10 max-w-3xl mx-auto leading-relaxed">
            From Earth's orthopedic challenges to Mars transit fluid-shifts—pioneering predictive wearable health tech for multi-planetary medicine.
          </p>
          
          {/* Mission status card */}
          <div className="mb-12 p-8 bg-gradient-to-br from-slate-800/80 via-blue-900/50 to-slate-800/80 backdrop-blur-md rounded-2xl border border-cyan-500/30 shadow-2xl shadow-cyan-500/20 max-w-3xl mx-auto">
            <div className="flex items-center justify-center mb-6 gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse shadow-lg shadow-green-500/50"></div>
              <span className="text-green-400 font-mono text-sm tracking-wider">ACTIVE DEVELOPMENT</span>
              <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse shadow-lg shadow-green-500/50"></div>
            </div>

            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-cyan-400 mb-1">Mica1</div>
                <div className="text-sm text-gray-300">Wearable Prototype</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-purple-400 mb-1">$15-20</div>
                <div className="text-sm text-gray-300">BOM Target</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-400 mb-1">7 Modes</div>
                <div className="text-sm text-gray-300">Edge Processing</div>
              </div>
            </div>
          </div>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/products"
              className="group px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 shadow-lg shadow-blue-500/50 hover:shadow-blue-400/60 hover:scale-105"
            >
              <span className="flex items-center gap-2">
                Explore Mica1
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </Link>

            <Link
              href="/blog"
              className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-xl border-2 border-white/30 hover:bg-white/20 hover:border-white/50 transition-all duration-300 shadow-lg"
            >
              Research Insights
            </Link>

            <Link
              href="/contact"
              className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:from-purple-500 hover:to-pink-500 transition-all duration-300 shadow-lg shadow-purple-500/50 hover:shadow-purple-400/60 hover:scale-105"
            >
              Join the Mission
            </Link>
          </div>
        </div>
      </div>
      
      <div className="scroll-down">
        <div className="scroll-down__icon" aria-hidden="true">
          <svg width="20" height="31" viewBox="0 0 20 31" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white">
            <rect x="0.5" y="0.533203" width="19" height="29" rx="5.5" stroke="currentColor" />
            <line x1="9.83398" y1="8.15527" x2="9.83398" y2="15.1553" stroke="currentColor" strokeLinecap="round">
            </line>
          </svg>
        </div>
        <div className="scroll-down__text text-white font-semibold">Scroll</div>
      </div>
    </section>
  );
};

export default Hero;