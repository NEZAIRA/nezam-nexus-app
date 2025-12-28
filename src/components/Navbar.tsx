'use client';

import Link from 'next/link';
import { useState } from 'react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full bg-black/30 backdrop-blur-md z-50 border-b border-gray-800">
      <div className="nav-container max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="logo text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Nezaira
          </Link>
          
          <div className="nav-links hidden md:flex space-x-8">
            <Link href="/" className="text-gray-300 hover:text-cyan-400 transition-colors">
              Home
            </Link>
            <Link href="/products" className="text-gray-300 hover:text-cyan-400 transition-colors">
              Products
            </Link>
            <Link href="/blog" className="text-gray-300 hover:text-cyan-400 transition-colors">
              Blog
            </Link>
            <Link href="/about" className="text-gray-300 hover:text-cyan-400 transition-colors">
              About
            </Link>
            <Link href="/contact" className="text-gray-300 hover:text-cyan-400 transition-colors">
              Contact
            </Link>
            <Link href="/admin" className="text-gray-300 hover:text-cyan-400 transition-colors">
              Admin
            </Link>
          </div>
          
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-300 hover:text-cyan-400 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden pb-4">
            <div className="pt-2 pb-3 space-y-1 px-4">
              <Link href="/" className="block py-2 text-gray-300 hover:text-cyan-400 font-medium transition-colors">
                Home
              </Link>
              <Link href="/products" className="block py-2 text-gray-300 hover:text-cyan-400 font-medium transition-colors">
                Products
              </Link>
              <Link href="/blog" className="block py-2 text-gray-300 hover:text-cyan-400 font-medium transition-colors">
                Blog
              </Link>
              <Link href="/about" className="block py-2 text-gray-300 hover:text-cyan-400 font-medium transition-colors">
                About
              </Link>
              <Link href="/contact" className="block py-2 text-gray-300 hover:text-cyan-400 font-medium transition-colors">
                Contact
              </Link>
              <Link href="/admin" className="block py-2 text-gray-300 hover:text-cyan-400 font-medium transition-colors">
                Admin
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;