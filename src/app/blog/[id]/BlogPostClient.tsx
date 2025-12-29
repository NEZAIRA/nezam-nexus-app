'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface BlogPost {
  id: string;
  title: string;
  subtitle: string;
  content: string;
  date: string;
  category: string;
  readTime: string;
  featuredImage: string | null;
}

export default function BlogPostClient({ post }: { post: BlogPost }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <Link href="/blog" className="text-cyan-400 hover:text-cyan-300 mb-8 inline-block flex items-center">
          <i className="fas fa-arrow-left mr-2"></i> Back to Blog
        </Link>
        
        {post.featuredImage && (
          <div className="blog-image mb-12 rounded-2xl overflow-hidden border border-gray-700">
            <img src={post.featuredImage} alt={post.title} className="w-full h-96 object-cover" />
          </div>
        )}
        
        <div className="blog-content">
          <span className="blog-category inline-block px-4 py-2 bg-cyan-500/20 text-cyan-300 rounded-full text-sm font-semibold mb-6">
            {post.category}
          </span>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">{post.title}</h1>
          
          {post.subtitle && (
            <h2 className="text-2xl text-gray-300 mb-8">{post.subtitle}</h2>
          )}
          
          <div className="blog-meta flex flex-wrap justify-between items-center text-gray-500 text-sm mb-10 border-b border-gray-700 pb-4">
            <span className="mb-2 md:mb-0">{post.date}</span>
            <span>{post.readTime}</span>
          </div>
          
          <div className="blog-body text-lg leading-relaxed text-gray-300 max-w-4xl">
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