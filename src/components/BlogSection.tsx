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

const BlogSection = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const response = await fetch('/api/home-stories?limit=3');
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
  }, []);

  // Function to calculate excerpt from content
  const getExcerpt = (content: string, length: number = 150) => {
    return content.length > length ? content.substring(0, length) + '...' : content;
  };

  if (loading) {
    return (
      <section id="blog" className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Blog & Research</h2>
          <p className="text-gray-600">Essays, research, and stories about medicine, technology, and the future of health.</p>
        </div>
        
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4">Loading stories...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="blog" className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Blog & Research</h2>
          <p className="text-gray-600">Essays, research, and stories about medicine, technology, and the future of health.</p>
        </div>
        
        <div className="text-center py-12">
          <p className="text-red-500">{error}</p>
        </div>
      </section>
    );
  }

  return (
    <section id="blog" className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Blog & Research</h2>
        <p className="text-gray-600">Essays, research, and stories about medicine, technology, and the future of health.</p>
      </div>
      
      <div className="space-y-6">
        {blogPosts.map((post) => (
          <div 
            key={post.id} 
            className="group p-5 rounded-xl border border-gray-200 hover:border-blue-300 transition-all duration-300 hover:shadow-md hover:-translate-y-1 cursor-pointer"
          >
            <div className="flex justify-between items-start mb-2">
              <span className="inline-block px-3 py-1 text-xs font-semibold text-blue-800 bg-blue-100 rounded-full">
                {post.category}
              </span>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500">{post.readTime}</span>
                <span className="text-sm text-gray-500">•</span>
                <span className="text-sm text-gray-500">{post.date}</span>
              </div>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-900 transition-colors mb-2">
              {post.title}
            </h3>
            <p className="text-gray-600 mb-3">
              {getExcerpt(post.content)}
            </p>
            <Link 
              href={`/blog/${post.id}`} 
              className="text-blue-900 font-medium group-hover:text-blue-700 transition-colors"
            >
              Read full article →
            </Link>
          </div>
        ))}
      </div>
      
      <div className="mt-8 text-center">
        <Link 
          href="/blog" 
          className="inline-block px-6 py-3 bg-white text-blue-900 font-medium rounded-lg border border-blue-900 hover:bg-blue-50 transition-colors"
        >
          View All Articles
        </Link>
      </div>
    </section>
  );
};

export default BlogSection;