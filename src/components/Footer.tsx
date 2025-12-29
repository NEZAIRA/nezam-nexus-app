import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 py-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center">
          <div className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Nezaira</div>
          <p className="text-gray-600 dark:text-gray-400 mb-10 max-w-2xl mx-auto">Advancing the intersection of technology, medicine, and future research. Building intelligent systems for a healthier tomorrow.</p>
          
          <div className="footer-links flex flex-wrap justify-center gap-8 mb-10">
            <Link href="/" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium">Home</Link>
            <Link href="/products" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium">Products</Link>
            <Link href="/blog" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium">Research</Link>
            <Link href="/about" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium">About</Link>
            <Link href="/contact" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium">Contact</Link>
          </div>
          
          <div className="border-t border-gray-200 dark:border-gray-800 pt-8 mt-8">
            <div className="text-gray-500 dark:text-gray-500 text-sm">
              &copy; 2025 Nezaira. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;