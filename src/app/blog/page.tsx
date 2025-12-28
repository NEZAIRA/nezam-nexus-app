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

  const blogPosts: BlogPost[] = [
    {
      id: 1,
      title: "The Future of AI in Healthcare Diagnosis",
      excerpt: "Exploring how artificial intelligence is revolutionizing diagnostic medicine and improving patient outcomes.",
      content: "Artificial intelligence is transforming healthcare in unprecedented ways. From diagnostic algorithms that can detect diseases earlier than human doctors to predictive models that anticipate patient deterioration, AI is revolutionizing how we approach medicine. These technologies are not meant to replace healthcare professionals but to augment their capabilities, allowing them to focus on what they do best - providing compassionate care to patients. The integration of AI in healthcare systems is creating more efficient workflows, reducing medical errors, and ultimately improving patient outcomes.",
      date: "December 27, 2025",
      category: "AI",
      readTime: calculateReadingTime("Exploring how artificial intelligence is revolutionizing diagnostic medicine and improving patient outcomes. Artificial intelligence is transforming healthcare in unprecedented ways. From diagnostic algorithms that can detect diseases earlier than human doctors to predictive models that anticipate patient deterioration, AI is revolutionizing how we approach medicine. These technologies are not meant to replace healthcare professionals but to augment their capabilities, allowing them to focus on what they do best - providing compassionate care to patients. The integration of AI in healthcare systems is creating more efficient workflows, reducing medical errors, and ultimately improving patient outcomes.")
    },
    {
      id: 2,
      title: "Innovative Approaches to Health Data Security",
      excerpt: "Protecting sensitive patient information while enabling advanced analytics and AI applications.",
      content: "Healthcare data security is a critical concern as medical institutions increasingly rely on digital systems. With the rise of AI applications in healthcare, protecting sensitive patient information while enabling advanced analytics presents unique challenges. Modern encryption techniques, blockchain technology, and federated learning approaches are creating new paradigms for secure health data management. These solutions ensure that patient privacy is maintained while still allowing researchers and clinicians to access the data they need to improve care and develop new treatments.",
      date: "December 26, 2025",
      category: "Technology",
      readTime: calculateReadingTime("Protecting sensitive patient information while enabling advanced analytics and AI applications. Healthcare data security is a critical concern as medical institutions increasingly rely on digital systems. With the rise of AI applications in healthcare, protecting sensitive patient information while enabling advanced analytics presents unique challenges. Modern encryption techniques, blockchain technology, and federated learning approaches are creating new paradigms for secure health data management. These solutions ensure that patient privacy is maintained while still allowing researchers and clinicians to access the data they need to improve care and develop new treatments.")
    },
    {
      id: 3,
      title: "Medical Education in the Digital Age",
      excerpt: "How modern approaches are leveraging technology to enhance learning and practice.",
      content: "Medical education has undergone significant changes with the integration of digital technologies. Virtual reality simulations allow students to practice procedures in risk-free environments, while AI-powered learning platforms adapt to individual student needs. Online resources provide access to vast medical knowledge, and telemedicine experiences offer new perspectives on patient care. These innovations are preparing the next generation of physicians with skills that blend traditional medical knowledge with cutting-edge technological capabilities, creating more versatile and effective healthcare providers.",
      date: "December 25, 2025",
      category: "Medicine",
      readTime: calculateReadingTime("How modern approaches are leveraging technology to enhance learning and practice. Medical education has undergone significant changes with the integration of digital technologies. Virtual reality simulations allow students to practice procedures in risk-free environments, while AI-powered learning platforms adapt to individual student needs. Online resources provide access to vast medical knowledge, and telemedicine experiences offer new perspectives on patient care. These innovations are preparing the next generation of physicians with skills that blend traditional medical knowledge with cutting-edge technological capabilities, creating more versatile and effective healthcare providers.")
    }
  ];

  const categories = ['All', 'Medicine', 'Technology', 'AI', 'Future Innovations'];

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = activeCategory === 'All' || post.category === activeCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0e1a] to-[#0c1e35]">
      <div className="blog-section py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="section-title text-4xl font-bold text-center mb-4">Research Insights</h2>
          <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">Advanced research at the intersection of technology and medicine</p>
          
          <div className="category-filters flex flex-wrap justify-center gap-4 mb-8">
            {categories.map(category => (
              <button
                key={category}
                className={`category-btn px-6 py-2 rounded-full transition-all ${
                  activeCategory === category 
                    ? 'bg-gradient-to-r from-[#00c6ff] to-[#0072ff] text-[#0a2540] font-medium' 
                    : 'bg-[#0a2540] text-white border border-[#00c6ff]/30'
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
              className="search-input w-full pl-12 pr-4 py-3 bg-[#0a2540]/50 border border-[#00c6ff]/30 rounded-lg focus:outline-none focus:border-[#00c6ff] text-white placeholder-gray-500"
              placeholder="Search research articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="blog-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map(post => (
              <div key={post.id} className="glass-effect rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                <div className="blog-image h-48 bg-gradient-to-r from-[#0a2540] to-[#0072ce] flex items-center justify-center text-white text-4xl">
                  <i className={`fas ${post.category === 'AI' ? 'fa-brain' : 
                                post.category === 'Technology' ? 'fa-laptop-code' : 
                                post.category === 'Medicine' ? 'fa-heartbeat' : 
                                'fa-infinity'}`}></i>
                </div>
                <div className="blog-content p-6">
                  <span className="blog-category inline-block px-3 py-1 bg-[#00c6ff]/20 text-[#00c6ff] rounded-full text-sm font-semibold mb-3">
                    {post.category}
                  </span>
                  <h3 className="blog-title text-xl font-bold text-white mb-3">{post.title}</h3>
                  <p className="blog-excerpt text-gray-300 mb-4">{post.excerpt}</p>
                  <div className="blog-meta flex justify-between items-center text-gray-500 text-sm border-t border-[#00c6ff]/20 pt-4">
                    <span>{post.date}</span>
                    <span>{post.readTime}</span>
                  </div>
                  <Link href="#" className="read-more text-[#00c6ff] font-semibold hover:text-white transition-colors mt-4 inline-block">
                    Read More →
                  </Link>
                </div>
              </div>
            ))}
          </div>
          
          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold text-gray-300">Research platform in development</h3>
              <p className="text-gray-500 mt-2">Advanced insights and research articles coming soon</p>
            </div>
          )}
          
          <div className="pagination flex justify-center gap-2 mt-12">
            <button className="page-btn px-4 py-2 border border-[#00c6ff]/30 rounded-md hover:bg-[#00c6ff]/10 transition-colors text-white">1</button>
            <button className="page-btn px-4 py-2 border border-[#00c6ff]/30 rounded-md hover:bg-[#00c6ff]/10 transition-colors text-white">2</button>
            <button className="page-btn px-4 py-2 border border-[#00c6ff]/30 rounded-md hover:bg-[#00c6ff]/10 transition-colors text-white">3</button>
            <button className="page-btn px-4 py-2 border border-[#00c6ff]/30 rounded-md hover:bg-[#00c6ff]/10 transition-colors text-white">
              <i className="fas fa-chevron-right"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;