'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

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
  const searchParams = useSearchParams();
  const postId = searchParams?.get('postId');
  
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const response = await fetch('/api/home-stories');
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
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-12 text-center">Research & Insights</h1>
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-4 text-gray-500 dark:text-gray-400">Loading research...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-12 text-center">Research & Insights</h1>
          <div className="text-center py-12">
            <p className="text-red-500">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  // If a specific post is requested, show that post
  if (postId) {
    const post = blogPosts.find(p => p.id === postId);
    
    if (loading) {
      return (
        <div className="min-h-screen bg-white dark:bg-gray-900">
          <div className="max-w-4xl mx-auto px-4 py-16">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-12 text-center">Research & Insights</h1>
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
              <p className="mt-4 text-gray-500 dark:text-gray-400">Loading post...</p>
            </div>
          </div>
        </div>
      );
    }
    
    if (!post) {
      return (
        <div className="min-h-screen bg-white dark:bg-gray-900">
          <div className="max-w-4xl mx-auto px-4 py-16">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-12 text-center">Research & Insights</h1>
            <div className="text-center py-12">
              <p className="text-red-500 text-lg">Post not found</p>
              <Link href="/blog" className="mt-4 inline-block text-blue-600 dark:text-blue-400 hover:underline">
                Back to all articles
              </Link>
            </div>
          </div>
        </div>
      );
    }
    
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <Link href="/blog" className="text-blue-600 dark:text-blue-400 hover:underline mb-8 inline-block">
            ← Back to all articles
          </Link>
          
          {post.featuredImage && (
            <div className="blog-image mb-12 rounded-2xl overflow-hidden border border-gray-700">
              <img src={post.featuredImage} alt={post.title} className="w-full h-96 object-cover" />
            </div>
          )}
          
          <div className="blog-content">
            <span className="blog-category inline-block px-4 py-2 bg-blue-500/20 text-blue-600 dark:text-blue-400 rounded-full text-sm font-semibold mb-6">
              {post.category}
            </span>
            
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">{post.title}</h1>
            
            {post.subtitle && (
              <h2 className="text-2xl text-gray-700 dark:text-gray-300 mb-8">{post.subtitle}</h2>
            )}
            
            <div className="blog-meta flex flex-wrap justify-between items-center text-gray-500 dark:text-gray-400 text-sm mb-10 border-b border-gray-200 dark:border-gray-700 pb-4">
              <span className="mb-2 md:mb-0">{post.date}</span>
              <span>{post.readTime}</span>
            </div>
            
            <div className="blog-body text-lg leading-relaxed text-gray-700 dark:text-gray-300 max-w-4xl">
              {post.content.split('\n').map((paragraph: string, index: number) => (
                <p key={index} className="mb-6 last:mb-0">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  // Otherwise, show the list of blog posts
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-12 text-center">Research & Insights</h1>
        
        <div className="space-y-8">
          {blogPosts.map((post) => (
            <div 
              key={post.id} 
              className="p-6 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-500 transition-colors duration-300 cursor-pointer bg-white dark:bg-gray-800/50 shadow-sm hover:shadow-md"
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
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                {post.title}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {getExcerpt(post.content)}
              </p>
              <Link 
                href={`/blog?postId=${post.id}`} 
                className="text-blue-600 dark:text-blue-400 font-medium hover:text-blue-700 dark:hover:text-blue-300 transition-colors inline-flex items-center"
              >
                Read full article →
              </Link>
            </div>
          ))}
        </div>
        
        {blogPosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400 text-lg">No research articles available at the moment.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogPage;