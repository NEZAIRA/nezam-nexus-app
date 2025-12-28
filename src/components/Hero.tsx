import Link from 'next/link';

const Hero = () => {
  return (
    <div className="relative bg-gradient-to-br from-blue-50 to-cyan-50 pt-24 pb-16">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 left-1/4 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
        <div className="absolute top-1/4 right-1/4 w-72 h-72 bg-cyan-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-1/2 right-1/3 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Building Intelligent Systems for <span className="text-blue-900">Medicine & Technology</span>
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-10">
            Nezam Nexus creates AI-powered healthcare solutions. Founded by MOHAMMADMAHDI NEZAMOLESLAMI, passionate about health technology and innovation.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              href="#products" 
              className="px-8 py-3 bg-blue-900 text-white font-medium rounded-lg hover:bg-blue-800 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition duration-300"
            >
              Explore Products
            </Link>
            <Link 
              href="#blog" 
              className="px-8 py-3 bg-white text-blue-900 font-medium rounded-lg border border-blue-900 hover:bg-blue-50 transition-colors shadow hover:shadow-md"
            >
              Read Blog
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;