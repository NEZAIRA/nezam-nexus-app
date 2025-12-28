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
      <div className="min-h-screen bg-gradient-to-b from-[#0a0e1a] to-[#0c1e35] flex items-center justify-center p-4">
        <div className="glass-effect p-8 rounded-2xl max-w-md w-full">
          <h1 className="text-3xl font-bold text-center mb-8 gradient-text">Admin Access</h1>
          
          <form onSubmit={handleLogin}>
            {error && <div className="mb-4 p-3 bg-red-500/20 text-red-300 rounded-lg">{error}</div>}
            
            <div className="mb-6">
              <label className="block text-gray-300 mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-[#0a2540]/50 border border-[#00c6ff]/30 rounded-lg focus:outline-none focus:border-[#00c6ff] text-white placeholder-gray-500"
                placeholder="Enter admin email"
                required
              />
            </div>
            
            <div className="mb-6">
              <label className="block text-gray-300 mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-[#0a2540]/50 border border-[#00c6ff]/30 rounded-lg focus:outline-none focus:border-[#00c6ff] text-white placeholder-gray-500"
                placeholder="Enter password"
                required
              />
            </div>
            
            <button 
              type="submit" 
              className="w-full futuristic-btn px-6 py-3 bg-[#00c6ff] text-[#0a2540] font-bold rounded-lg hover:bg-[#00a8e8] transition-all"
            >
              Login
            </button>
          </form>
          
          <p className="text-center text-gray-500 text-sm mt-6">
            Admin credentials: uhansekepler@gmail.com / ya*ali857
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0e1a] to-[#0c1e35] p-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold gradient-text">Nezaira Admin Panel</h1>
          <button 
            onClick={handleLogout}
            className="futuristic-btn px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all"
          >
            Logout
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Post Creation/Editing Form */}
          <div className="lg:col-span-1">
            <div className="glass-effect p-6 rounded-2xl">
              <h2 className="text-xl font-bold mb-6">
                {isEditing ? 'Edit Post' : 'Create New Post'}
              </h2>
              
              <form onSubmit={handleSubmitPost}>
                <div className="mb-4">
                  <label className="block text-gray-300 mb-2">Title</label>
                  <input
                    type="text"
                    name="title"
                    value={currentPost?.title || ''}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-[#0a2540]/50 border border-[#00c6ff]/30 rounded-lg focus:outline-none focus:border-[#00c6ff] text-white"
                    required
                  />
                </div>
                
                <div className="mb-4">
                  <label className="block text-gray-300 mb-2">Excerpt</label>
                  <textarea
                    name="excerpt"
                    value={currentPost?.excerpt || ''}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-[#0a2540]/50 border border-[#00c6ff]/30 rounded-lg focus:outline-none focus:border-[#00c6ff] text-white"
                    rows={3}
                    required
                  />
                </div>
                
                <div className="mb-4">
                  <label className="block text-gray-300 mb-2">Category</label>
                  <select
                    name="category"
                    value={currentPost?.category || 'Technology'}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-[#0a2540]/50 border border-[#00c6ff]/30 rounded-lg focus:outline-none focus:border-[#00c6ff] text-white"
                  >
                    <option value="Technology">Technology</option>
                    <option value="AI">AI</option>
                    <option value="Medicine">Medicine</option>
                    <option value="Future Innovations">Future Innovations</option>
                  </select>
                </div>
                
                <div className="mb-4">
                  <label className="block text-gray-300 mb-2">Content</label>
                  <textarea
                    name="content"
                    value={currentPost?.content || ''}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-[#0a2540]/50 border border-[#00c6ff]/30 rounded-lg focus:outline-none focus:border-[#00c6ff] text-white"
                    rows={8}
                    required
                  />
                </div>
                
                <button 
                  type="submit" 
                  className="w-full futuristic-btn px-4 py-3 bg-[#00c6ff] text-[#0a2540] font-bold rounded-lg hover:bg-[#00a8e8] transition-all"
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
                    className="w-full mt-2 futuristic-btn px-4 py-3 bg-gray-600 text-white font-bold rounded-lg hover:bg-gray-700 transition-all"
                  >
                    Cancel Edit
                  </button>
                )}
              </form>
            </div>
          </div>
          
          {/* Posts List */}
          <div className="lg:col-span-2">
            <div className="glass-effect p-6 rounded-2xl">
              <h2 className="text-xl font-bold mb-6">Manage Posts</h2>
              
              {posts.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-400">No posts created yet</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {posts.map(post => (
                    <div key={post.id} className="p-4 bg-[#0a2540]/30 rounded-lg border border-[#00c6ff]/20">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-bold text-lg text-white">{post.title}</h3>
                          <p className="text-gray-400 text-sm mt-1">{post.excerpt}</p>
                          <div className="flex gap-2 mt-2">
                            <span className="text-xs bg-[#00c6ff]/20 text-[#00c6ff] px-2 py-1 rounded">
                              {post.category}
                            </span>
                            <span className="text-xs text-gray-500">{post.date}</span>
                            <span className="text-xs text-gray-500">{post.readTime}</span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button 
                            onClick={() => handleEditPost(post)}
                            className="px-3 py-1 bg-[#00c6ff]/20 text-[#00c6ff] rounded hover:bg-[#00c6ff]/30 transition-colors"
                          >
                            Edit
                          </button>
                          <button 
                            onClick={() => handleDeletePost(post.id)}
                            className="px-3 py-1 bg-red-500/20 text-red-400 rounded hover:bg-red-500/30 transition-colors"
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