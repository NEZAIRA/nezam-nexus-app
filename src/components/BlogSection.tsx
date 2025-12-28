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
      <section id="blog" className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Research & Insights</h2>
          <p className="text-gray-600 dark:text-gray-400">Scientific discoveries and insights in medicine, technology, and biotech innovation.</p>
        </div>
        
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-500 dark:text-gray-400">Loading research...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="blog" className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Research & Insights</h2>
          <p className="text-gray-600 dark:text-gray-400">Scientific discoveries and insights in medicine, technology, and biotech innovation.</p>
        </div>
        
        <div className="text-center py-12">
          <p className="text-red-500">{error}</p>
        </div>
      </section>
    );
  }

  return (
    <section id="blog" className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 shadow-sm">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Research & Insights</h2>
        <p className="text-gray-600 dark:text-gray-400">Scientific discoveries and insights in medicine, technology, and biotech innovation.</p>
      </div>
      
      <div className="space-y-6">
        {blogPosts.map((post) => (
          <div 
            key={post.id} 
            className="group p-6 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-500 transition-colors duration-300 cursor-pointer bg-white dark:bg-gray-800/50 shadow-sm hover:shadow-md"
          >
            <div className="flex justify-between items-start mb-3">
              <span className="inline-block px-3 py-1 text-xs font-semibold text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                {post.category}
              </span>
              <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                <span>{post.readTime}</span>
                <span>•</span>
                <span>{post.date}</span>
              </div>
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-3">
              {post.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {getExcerpt(post.content)}
            </p>
            <Link 
              href={`/blog/${post.id}`} 
              className="text-blue-600 dark:text-blue-400 font-medium group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors inline-flex items-center"
            >
              Read full article →
            </Link>
          </div>
        ))}
      </div>
      
      <div className="mt-8 text-center">
        <Link 
          href="/blog" 
          className="inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
        >
          View All Research
        </Link>
      </div>
    </section>
  );
};

export default BlogSection;