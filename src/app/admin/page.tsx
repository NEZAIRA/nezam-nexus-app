'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

type BlogPost = {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  category: string;
  readTime: string;
};

const AdminPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [currentPost, setCurrentPost] = useState<BlogPost | null>({
    id: 0,
    title: '',
    excerpt: '',
    content: '',
    date: new Date().toISOString().split('T')[0],
    category: 'Technology',
    readTime: '5 min read'
  });
  const [isEditing, setIsEditing] = useState(false);

  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if credentials match admin credentials
    if (email === 'uhansekepler@gmail.com' && password === 'ya*ali857') {
      setIsLoggedIn(true);
      setError('');
    } else {
      setError('Invalid email or password');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setEmail('');
    setPassword('');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCurrentPost(prev => ({
      ...prev!,
      [name]: value
    }));
  };

  const handleSubmitPost = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isEditing) {
      // Update existing post
      setPosts(prev => prev.map(post => post.id === currentPost?.id ? currentPost : post));
    } else {
      // Create new post
      const newPost = {
        ...currentPost!,
        id: Date.now(), // Use timestamp as ID
        date: new Date().toISOString().split('T')[0],
        readTime: calculateReadingTime(currentPost?.content || '')
      };
      setPosts(prev => [...prev, newPost]);
    }
    
    // Reset form
    setCurrentPost({
      id: 0,
      title: '',
      excerpt: '',
      content: '',
      date: new Date().toISOString().split('T')[0],
      category: 'Technology',
      readTime: '5 min read'
    });
    setIsEditing(false);
  };

  const handleEditPost = (post: BlogPost) => {
    setCurrentPost(post);
    setIsEditing(true);
  };

  const handleDeletePost = (id: number) => {
    if (confirm('Are you sure you want to delete this post?')) {
      setPosts(prev => prev.filter(post => post.id !== id));
    }
  };

  const calculateReadingTime = (text: string) => {
    const wordsPerMinute = 200;
    const wordCount = text.split(' ').length;
    const minutes = Math.ceil(wordCount / wordsPerMinute);
    return `${minutes} min read`;
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#f3f2f1] flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-lg max-w-md w-full shadow-md border border-[#e1dfdd]">
          <h1 className="text-2xl font-bold text-center mb-6 text-[#201f1e]">Admin Access</h1>
          
          <form onSubmit={handleLogin}>
            {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded border border-red-200">{error}</div>}
            
            <div className="mb-4">
              <label className="block text-[#323130] mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-[#d2d0ce] rounded-md focus:outline-none focus:border-[#0078d4] text-[#201f1e]"
                placeholder="Enter admin email"
                required
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-[#323130] mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-[#d2d0ce] rounded-md focus:outline-none focus:border-[#0078d4] text-[#201f1e]"
                placeholder="Enter password"
                required
              />
            </div>
            
            <button 
              type="submit" 
              className="w-full px-4 py-2 bg-[#0078d4] text-white font-semibold rounded-md hover:bg-[#106ebe] transition-colors"
            >
              Login
            </button>
          </form>
          
          <p className="text-center text-[#605e5c] text-sm mt-4">
            Admin credentials: uhansekepler@gmail.com / ya*ali857
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#ffffff] p-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-[#201f1e]">Nezaira Admin Panel</h1>
          <button 
            onClick={handleLogout}
            className="px-4 py-2 bg-[#d13438] text-white font-semibold rounded-md hover:bg-[#a80000] transition-colors"
          >
            Logout
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Post Creation/Editing Form */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg border border-[#e1dfdd] shadow-sm">
              <h2 className="text-lg font-semibold mb-4 text-[#201f1e]">
                {isEditing ? 'Edit Post' : 'Create New Post'}
              </h2>
              
              <form onSubmit={handleSubmitPost}>
                <div className="mb-4">
                  <label className="block text-[#323130] mb-2">Title</label>
                  <input
                    type="text"
                    name="title"
                    value={currentPost?.title || ''}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-white border border-[#d2d0ce] rounded-md focus:outline-none focus:border-[#0078d4] text-[#201f1e]"
                    required
                  />
                </div>
                
                <div className="mb-4">
                  <label className="block text-[#323130] mb-2">Excerpt</label>
                  <textarea
                    name="excerpt"
                    value={currentPost?.excerpt || ''}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-white border border-[#d2d0ce] rounded-md focus:outline-none focus:border-[#0078d4] text-[#201f1e]"
                    rows={3}
                    required
                  />
                </div>
                
                <div className="mb-4">
                  <label className="block text-[#323130] mb-2">Category</label>
                  <select
                    name="category"
                    value={currentPost?.category || 'Technology'}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-white border border-[#d2d0ce] rounded-md focus:outline-none focus:border-[#0078d4] text-[#201f1e]"
                  >
                    <option value="Technology">Technology</option>
                    <option value="AI">AI</option>
                    <option value="Medicine">Medicine</option>
                    <option value="Future Innovations">Future Innovations</option>
                  </select>
                </div>
                
                <div className="mb-4">
                  <label className="block text-[#323130] mb-2">Content</label>
                  <textarea
                    name="content"
                    value={currentPost?.content || ''}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-white border border-[#d2d0ce] rounded-md focus:outline-none focus:border-[#0078d4] text-[#201f1e]"
                    rows={8}
                    required
                  />
                </div>
                
                <button 
                  type="submit" 
                  className="w-full px-4 py-2 bg-[#0078d4] text-white font-semibold rounded-md hover:bg-[#106ebe] transition-colors"
                >
                  {isEditing ? 'Update Post' : 'Create Post'}
                </button>
                
                {isEditing && (
                  <button 
                    type="button" 
                    onClick={() => {
                      setCurrentPost({
                        id: 0,
                        title: '',
                        excerpt: '',
                        content: '',
                        date: new Date().toISOString().split('T')[0],
                        category: 'Technology',
                        readTime: '5 min read'
                      });
                      setIsEditing(false);
                    }}
                    className="w-full mt-2 px-4 py-2 bg-[#f3f2f1] text-[#323130] font-semibold rounded-md hover:bg-[#edebe9] transition-colors"
                  >
                    Cancel Edit
                  </button>
                )}
              </form>
            </div>
          </div>
          
          {/* Posts List */}
          <div className="lg:col-span-2">
            <div className="bg-white p-6 rounded-lg border border-[#e1dfdd] shadow-sm">
              <h2 className="text-lg font-semibold mb-4 text-[#201f1e]">Manage Posts</h2>
              
              {posts.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-[#605e5c]">No posts created yet</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {posts.map(post => (
                    <div key={post.id} className="p-4 bg-[#f3f2f1] rounded border border-[#e1dfdd]">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-[#201f1e]">{post.title}</h3>
                          <p className="text-[#323130] text-sm mt-1">{post.excerpt}</p>
                          <div className="flex gap-2 mt-2">
                            <span className="text-xs bg-[#0078d4]/10 text-[#0078d4] px-2 py-1 rounded">
                              {post.category}
                            </span>
                            <span className="text-xs text-[#605e5c]">{post.date}</span>
                            <span className="text-xs text-[#605e5c]">{post.readTime}</span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button 
                            onClick={() => handleEditPost(post)}
                            className="px-3 py-1 bg-[#f3f2f1] text-[#323130] rounded border border-[#d2d0ce] hover:bg-[#edebe9] transition-colors"
                          >
                            Edit
                          </button>
                          <button 
                            onClick={() => handleDeletePost(post.id)}
                            className="px-3 py-1 bg-[#fde7e9] text-[#a80000] rounded border border-[#f68587] hover:bg-[#f68587] hover:text-white transition-colors"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;