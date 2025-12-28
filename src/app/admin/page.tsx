'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

type BlogPost = {
  id: string;
  title: string;
  subtitle: string;
  content: string;
  category: string;
  date: string;
  readTime: string;
  featuredImage: string | null;
  createdAt: string;
};

const AdminPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [currentPost, setCurrentPost] = useState<BlogPost | null>({
    id: '',
    title: '',
    subtitle: '',
    content: '',
    category: 'Medicine',
    date: new Date().toISOString().split('T')[0],
    readTime: '5 min read',
    featuredImage: null,
    createdAt: new Date().toISOString()
  } as BlogPost);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const router = useRouter();

  // Check if user is already logged in on component mount
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const response = await fetch('/api/admin/stories');
      if (response.ok) {
        setIsLoggedIn(true);
        fetchPosts();
      } else {
        setIsLoggedIn(false);
      }
    } catch (err) {
      console.error('Auth check failed:', err);
      setIsLoggedIn(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        setIsLoggedIn(true);
        setError('');
        setEmail('');
        setPassword('');
        fetchPosts();
      } else {
        setError(data.message || 'Invalid credentials');
      }
    } catch (err) {
      setError('An error occurred during login');
      console.error(err);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/logout', {
        method: 'POST',
      });
      
      setIsLoggedIn(false);
      setPosts([]);
      router.push('/admin'); // Refresh the page to clear any cached data
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  const fetchPosts = async () => {
    try {
      const response = await fetch('/api/admin/stories');
      if (response.ok) {
        const data = await response.json();
        setPosts(data);
      } else {
        console.error('Failed to fetch posts');
      }
    } catch (err) {
      console.error('Error fetching posts:', err);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCurrentPost(prev => ({
      ...prev!,
      [name]: value
    }) as BlogPost);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      
      reader.onload = (event) => {
        if (event.target?.result) {
          const imageData = event.target.result as string;
          setCurrentPost(prev => ({
            ...prev!,
            featuredImage: imageData
          }) as BlogPost);
          setImagePreview(imageData);
        }
      };
      
      reader.readAsDataURL(file);
    }
  };

  const handleSubmitPost = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/admin/stories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(currentPost),
      });
      
      const data = await response.json();
      
      if (data.success) {
        setSuccessMessage('Post published successfully!');
        setCurrentPost({
          id: '',
          title: '',
          subtitle: '',
          content: '',
          category: 'Medicine',
          date: new Date().toISOString().split('T')[0],
          readTime: '5 min read',
          featuredImage: null,
          createdAt: new Date().toISOString()
        } as BlogPost);
        setImagePreview(null);
        setIsEditing(false);
        
        // Refresh the posts list
        fetchPosts();
        
        // Clear success message after 3 seconds
        setTimeout(() => setSuccessMessage(''), 3000);
      } else {
        setError(data.message || 'Failed to publish post');
      }
    } catch (err) {
      setError('An error occurred while publishing the post');
      console.error(err);
    }
  };

  const handleEditPost = (post: BlogPost) => {
    setCurrentPost(post);
    setImagePreview(post.featuredImage);
    setIsEditing(true);
  };

  const handleDeletePost = async (id: string) => {
    if (!confirm('Are you sure you want to delete this post?')) {
      return;
    }
    
    try {
      const response = await fetch(`/api/admin/stories/${id}`, {
        method: 'DELETE',
      });
      
      if (response.ok) {
        setPosts(prev => prev.filter(post => post.id !== id));
        setSuccessMessage('Post deleted successfully!');
        setTimeout(() => setSuccessMessage(''), 3000);
      } else {
        setError('Failed to delete post');
      }
    } catch (err) {
      setError('An error occurred while deleting the post');
      console.error(err);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500 mx-auto"></div>
          <p className="mt-4 text-white">Checking authentication...</p>
        </div>
      </div>
    );
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black p-4">
        <div className="bg-gray-800 p-8 rounded-2xl max-w-md w-full shadow-2xl border border-cyan-500/20">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full mx-auto flex items-center justify-center mb-4">
              <i className="fas fa-lock text-white text-2xl"></i>
            </div>
            <h1 className="text-3xl font-bold text-white">Admin Access</h1>
            <p className="text-gray-400 mt-2">Secure login required</p>
          </div>
          
          <form onSubmit={handleLogin}>
            {error && (
              <div className="mb-4 p-3 bg-red-500/20 text-red-300 rounded-lg border border-red-500/30">
                {error}
              </div>
            )}
            
            <div className="mb-6">
              <label className="block text-gray-300 mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:border-cyan-500 text-white placeholder-gray-500"
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
                className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:border-cyan-500 text-white placeholder-gray-500"
                placeholder="Enter password"
                required
              />
            </div>
            
            <button 
              type="submit" 
              className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold rounded-lg hover:opacity-90 transition-all"
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black p-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Nezaira Admin Panel</h1>
            <p className="text-gray-400">Manage content and publications</p>
          </div>
          <button 
            onClick={handleLogout}
            className="py-2 px-4 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center"
          >
            <i className="fas fa-sign-out-alt mr-2"></i>
            Logout
          </button>
        </div>

        {successMessage && (
          <div className="mb-6 p-3 bg-green-500/20 text-green-300 rounded-lg border border-green-500/30">
            {successMessage}
          </div>
        )}

        {error && (
          <div className="mb-6 p-3 bg-red-500/20 text-red-300 rounded-lg border border-red-500/30">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Post Creation/Editing Form */}
          <div className="lg:col-span-1">
            <div className="bg-gray-800/50 p-6 rounded-2xl border border-gray-700">
              <h2 className="text-xl font-bold text-white mb-6">
                {isEditing ? 'Edit Post' : 'Create New Post'}
              </h2>
              
              <form onSubmit={handleSubmitPost}>
                <div className="mb-4">
                  <label className="block text-gray-300 mb-2">Title *</label>
                  <input
                    type="text"
                    name="title"
                    value={currentPost?.title || ''}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:border-cyan-500 text-white"
                    required
                  />
                </div>
                
                <div className="mb-4">
                  <label className="block text-gray-300 mb-2">Subtitle</label>
                  <input
                    type="text"
                    name="subtitle"
                    value={currentPost?.subtitle || ''}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:border-cyan-500 text-white"
                  />
                </div>
                
                <div className="mb-4">
                  <label className="block text-gray-300 mb-2">Category</label>
                  <select
                    name="category"
                    value={currentPost?.category || 'Medicine'}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:border-cyan-500 text-white"
                  >
                    <option value="Medicine">Medicine</option>
                    <option value="AI">AI</option>
                    <option value="Technology">Technology</option>
                    <option value="Lifestyle">Lifestyle</option>
                  </select>
                </div>
                
                <div className="mb-4">
                  <label className="block text-gray-300 mb-2">Featured Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:border-cyan-500 text-white"
                  />
                  {imagePreview && (
                    <div className="mt-2">
                      <img 
                        src={imagePreview} 
                        alt="Preview" 
                        className="max-w-full h-32 object-contain border border-gray-600 rounded"
                      />
                    </div>
                  )}
                </div>
                
                <div className="mb-4">
                  <label className="block text-gray-300 mb-2">Content *</label>
                  <textarea
                    name="content"
                    value={currentPost?.content || ''}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:border-cyan-500 text-white"
                    rows={8}
                    required
                  />
                </div>
                
                <button 
                  type="submit" 
                  className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold rounded-lg hover:opacity-90 transition-all"
                >
                  {isEditing ? 'Update Post' : 'Publish Post'}
                </button>
                
                {isEditing && (
                  <button 
                    type="button" 
                    onClick={() => {
                      setCurrentPost({
                        id: '',
                        title: '',
                        subtitle: '',
                        content: '',
                        category: 'Medicine',
                        date: new Date().toISOString().split('T')[0],
                        readTime: '5 min read',
                        featuredImage: null,
                        createdAt: new Date().toISOString()
                      } as BlogPost);
                      setImagePreview(null);
                      setIsEditing(false);
                    }}
                    className="w-full mt-2 py-3 bg-gray-600 text-white font-bold rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    Cancel Edit
                  </button>
                )}
              </form>
            </div>
          </div>
          
          {/* Posts List */}
          <div className="lg:col-span-2">
            <div className="bg-gray-800/50 p-6 rounded-2xl border border-gray-700">
              <h2 className="text-xl font-bold text-white mb-6">Manage Posts</h2>
              
              {posts.length === 0 ? (
                <div className="text-center py-8">
                  <i className="fas fa-file-alt text-5xl text-gray-600 mb-4"></i>
                  <h3 className="text-xl text-gray-400">No posts created yet</h3>
                  <p className="text-gray-500 mt-2">Create your first post using the form</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {posts.map(post => (
                    <div key={post.id} className="p-4 bg-gray-700/30 rounded-xl border border-gray-600">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="font-bold text-white text-lg">{post.title}</h3>
                          <p className="text-gray-400 text-sm mt-1 line-clamp-2">{post.content.substring(0, 100)}...</p>
                          <div className="flex gap-2 mt-2">
                            <span className="text-xs bg-cyan-500/20 text-cyan-300 px-2 py-1 rounded">
                              {post.category}
                            </span>
                            <span className="text-xs text-gray-500">{post.date}</span>
                            <span className="text-xs text-gray-500">{post.readTime}</span>
                          </div>
                        </div>
                        <div className="flex gap-2 ml-4">
                          <button 
                            onClick={() => handleEditPost(post)}
                            className="px-3 py-1 bg-cyan-500/20 text-cyan-300 rounded hover:bg-cyan-500/30 transition-colors"
                          >
                            Edit
                          </button>
                          <button 
                            onClick={() => handleDeletePost(post.id)}
                            className="px-3 py-1 bg-red-500/20 text-red-300 rounded hover:bg-red-500/30 transition-colors"
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