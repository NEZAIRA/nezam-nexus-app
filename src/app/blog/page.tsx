'use client';

import Link from 'next/link';
import { useState } from 'react';

type BlogPost = {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  category: string;
  readTime: string;
};

const BlogPage = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Function to calculate reading time based on word count
  const calculateReadingTime = (text: string) => {
    const wordsPerMinute = 200; // Average reading speed
    const wordCount = text.split(' ').length;
    const minutes = Math.ceil(wordCount / wordsPerMinute);
    return `${minutes} min read`;
  };

  const blogPosts: BlogPost[] = [];

  const categories = ['All', 'Medicine', 'Technology', 'AI', 'Future Innovations'];

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = activeCategory === 'All' || post.category === activeCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-white">
      <div className="blog-section py-24 px-4">
        <h2 className="section-title mb-12">Blog & Research</h2>
        
        <div className="category-filters flex flex-wrap justify-center gap-4 mb-8">
          {categories.map(category => (
            <button
              key={category}
              className={`category-btn px-6 py-2 rounded-full transition-all ${
                activeCategory === category 
                  ? 'bg-[#00c6ff] text-[#0a2540] font-medium' 
                  : 'bg-[#0a2540] text-white'
              }`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
        
        <div className="search-container max-w-2xl mx-auto mb-12 relative">
          <i className="fas fa-search search-icon absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
          <input
            type="text"
            className="search-input w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#00c6ff]"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="blog-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map(post => (
            <div key={post.id} className="blog-card bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 hover:-translate-y-2">
              <div className="blog-image h-48 bg-gradient-to-r from-[#0a2540] to-[#0072ce] flex items-center justify-center text-white text-4xl">
                <i className={`fas ${post.category === 'AI' ? 'fa-brain' : 
                              post.category === 'Technology' ? 'fa-laptop-code' : 
                              post.category === 'Medicine' ? 'fa-heartbeat' : 
                              'fa-infinity'}`}></i>
              </div>
              <div className="blog-content p-6">
                <span className="blog-category inline-block px-3 py-1 bg-[#00c6ff]/10 text-[#00c6ff] rounded-full text-sm font-semibold mb-3">
                  {post.category}
                </span>
                <h3 className="blog-title text-xl font-bold text-gray-900 mb-3">{post.title}</h3>
                <p className="blog-excerpt text-gray-600 mb-4">{post.excerpt}</p>
                <div className="blog-meta flex justify-between items-center text-gray-500 text-sm border-t border-gray-100 pt-4">
                  <span>{post.date}</span>
                  <span>{post.readTime}</span>
                </div>
                <Link href="#" className="read-more text-[#00c6ff] font-semibold hover:text-[#0a2540] transition-colors mt-4 inline-block">
                  Read More →
                </Link>
              </div>
            </div>
          ))}
        </div>
        
        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-gray-700">No articles published yet</h3>
            <p className="text-gray-500 mt-2">Check back later for new posts and research</p>
          </div>
        )}
        
        <div className="pagination flex justify-center gap-2 mt-12">
          <button className="page-btn px-4 py-2 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors">1</button>
          <button className="page-btn px-4 py-2 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors">2</button>
          <button className="page-btn px-4 py-2 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors">3</button>
          <button className="page-btn px-4 py-2 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors">
            <i className="fas fa-chevron-right"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;