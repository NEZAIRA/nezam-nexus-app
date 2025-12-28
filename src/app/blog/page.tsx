'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

type BlogPost = {
  id: string;
  title: string;
  subtitle: string;
  content: string;
  date: string;
  category: string;
  readTime: string;
  featuredImage: string | null;
  createdAt: string;
};

const BlogPage = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const response = await fetch('/api/stories' + (activeCategory !== 'All' ? `?category=${activeCategory}` : ''));
        if (!response.ok) {
          throw new Error('Failed to fetch blog posts');
        }
        const data = await response.json();
        setBlogPosts(data);
      } catch (err) {
        setError('Failed to load blog posts');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPosts();
  }, [activeCategory]);

  // Function to calculate excerpt from content
  const getExcerpt = (content: string, length: number = 150) => {
    return content.length > length ? content.substring(0, length) + '...' : content;
  };

  const categories = ['All', 'Medicine', 'AI', 'Technology', 'Lifestyle'];

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          getExcerpt(post.content).toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-white mb-4">Research Insights</h1>
            <p className="text-gray-400 text-xl">Advanced research at the intersection of technology and medicine</p>
          </div>
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500 mx-auto"></div>
            <p className="mt-4 text-gray-400">Loading stories...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-white mb-4">Research Insights</h1>
            <p className="text-gray-400 text-xl">Advanced research at the intersection of technology and medicine</p>
          </div>
          <div className="text-center py-12">
            <p className="text-red-500 text-xl">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-white mb-4">Research Insights</h1>
          <p className="text-gray-400 text-xl">Advanced research at the intersection of technology and medicine</p>
        </div>
        
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map(category => (
            <button
              key={category}
              className={`px-6 py-3 rounded-full transition-all ${
                activeCategory === category 
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-gray-900 font-medium' 
                  : 'bg-gray-800 text-white border border-gray-700'
              }`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
        
        <div className="max-w-2xl mx-auto mb-12 relative">
          <i className="fas fa-search text-gray-500 absolute left-4 top-1/2 transform -translate-y-1/2"></i>
          <input
            type="text"
            placeholder="Search research articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-gray-800/50 border border-gray-700 rounded-full focus:outline-none focus:border-cyan-500 text-white placeholder-gray-500"
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map(post => (
            <div key={post.id} className="bg-gray-800/30 rounded-2xl overflow-hidden border border-gray-700 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
              {post.featuredImage && (
                <div className="h-48 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 flex items-center justify-center">
                  <img src={post.featuredImage} alt={post.title} className="w-full h-full object-cover" />
                </div>
              )}
              <div className="p-6">
                <span className="inline-block px-3 py-1 bg-cyan-500/20 text-cyan-300 rounded-full text-sm font-semibold mb-3">
                  {post.category}
                </span>
                <h3 className="text-xl font-bold text-white mb-3">{post.title}</h3>
                {post.subtitle && <p className="text-gray-400 mb-3">{post.subtitle}</p>}
                <p className="text-gray-300 mb-4">{getExcerpt(post.content)}</p>
                <div className="flex justify-between items-center text-gray-500 text-sm border-t border-gray-700 pt-4">
                  <span>{post.date}</span>
                  <span>{post.readTime}</span>
                </div>
                <Link href={`/blog/${post.id}`} className="text-cyan-400 font-semibold hover:text-white transition-colors mt-4 inline-block">
                  Read More →
                </Link>
              </div>
            </div>
          ))}
        </div>
        
        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-gray-300">No articles found</h3>
            <p className="text-gray-500 mt-2">Try changing your search or filter criteria</p>
          </div>
        )}
        
        {filteredPosts.length > 0 && (
          <div className="flex justify-center gap-2 mt-12">
            <button className="px-4 py-2 border border-gray-700 rounded-md hover:bg-gray-700/50 transition-colors text-white">1</button>
            <button className="px-4 py-2 border border-gray-700 rounded-md hover:bg-gray-700/50 transition-colors text-white">2</button>
            <button className="px-4 py-2 border border-gray-700 rounded-md hover:bg-gray-700/50 transition-colors text-white">3</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogPage;