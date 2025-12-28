'use client';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 py-16">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">About Nezaira</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Advancing biotech innovation at the intersection of medicine, technology, and research.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-8 mb-16 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Our Mission</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Nezaira is dedicated to advancing the intersection of technology, medicine, and future research. 
            We build intelligent systems for a healthier tomorrow, combining cutting-edge AI with rigorous 
            scientific methodology to solve complex healthcare challenges.
          </p>
          <p className="text-gray-600 dark:text-gray-400">
            Our platform serves as a bridge between medical research and technological innovation, 
            providing tools and insights that accelerate the development of next-generation healthcare solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-4 mx-auto">
              <i className="fas fa-flask text-blue-600 dark:text-blue-400 text-xl"></i>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Research-Driven</h3>
            <p className="text-gray-600 dark:text-gray-400">Evidence-based solutions grounded in rigorous scientific methodology</p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-4 mx-auto">
              <i className="fas fa-robot text-blue-600 dark:text-blue-400 text-xl"></i>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">AI-Powered</h3>
            <p className="text-gray-600 dark:text-gray-400">Advanced artificial intelligence for complex problem solving</p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-4 mx-auto">
              <i className="fas fa-heartbeat text-blue-600 dark:text-blue-400 text-xl"></i>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Health-Focused</h3>
            <p className="text-gray-600 dark:text-gray-400">Solutions designed with patient outcomes at the center</p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Our Approach</h2>
          <div className="space-y-6">
            <div className="flex items-start">
              <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                <span className="text-blue-600 dark:text-blue-400 font-bold">1</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Scientific Rigor</h3>
                <p className="text-gray-600 dark:text-gray-400">We apply the highest standards of scientific methodology to ensure our solutions are both innovative and reliable.</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                <span className="text-blue-600 dark:text-blue-400 font-bold">2</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Technical Excellence</h3>
                <p className="text-gray-600 dark:text-gray-400">Our team combines deep expertise in AI, biotechnology, and healthcare to deliver cutting-edge solutions.</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                <span className="text-blue-600 dark:text-blue-400 font-bold">3</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Real-World Impact</h3>
                <p className="text-gray-600 dark:text-gray-400">We focus on solutions that make a tangible difference in healthcare delivery and patient outcomes.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;