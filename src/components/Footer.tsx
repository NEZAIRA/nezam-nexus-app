import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-blue-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Nezam Nexus</h3>
            <p className="text-blue-200 mb-4">
              Building intelligent systems for medicine and technology. Founded by MOHAMMADMAHDI NEZAMOLESLAMI, passionate about health technology.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Products</h4>
            <ul className="space-y-2">
              <li><Link href="#" className="text-blue-200 hover:text-white transition-colors">Supra Brain</Link></li>
              <li><Link href="#" className="text-blue-200 hover:text-white transition-colors">Faster</Link></li>
              <li><Link href="#" className="text-blue-200 hover:text-white transition-colors">Future Products</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              <li><Link href="#" className="text-blue-200 hover:text-white transition-colors">About</Link></li>
              <li><Link href="#" className="text-blue-200 hover:text-white transition-colors">Blog</Link></li>
              <li><Link href="#" className="text-blue-200 hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Connect</h4>
            <ul className="space-y-2">
              <li><Link href="#" className="text-blue-200 hover:text-white transition-colors">Contact</Link></li>
              <li><Link href="#" className="text-blue-200 hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="#" className="text-blue-200 hover:text-white transition-colors">Terms of Service</Link></li>
            </ul>
            
            <div className="mt-6">
              <h4 className="text-lg font-semibold mb-3">Newsletter</h4>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="px-4 py-2 rounded-l-lg text-gray-900 w-full focus:outline-none"
                />
                <button className="bg-cyan-500 hover:bg-cyan-400 text-blue-900 font-medium px-4 py-2 rounded-r-lg transition-colors">
                  Join
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-blue-800 mt-12 pt-8 text-center text-blue-300">
          <p>&copy; {new Date().getFullYear()} Nezam Nexus. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;