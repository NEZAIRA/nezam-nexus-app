'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';

// Dynamically import the markdown editor to avoid SSR issues
const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false });

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
      if (response.status !== 401) { // If not unauthorized, user is logged in
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
      // Refresh the page to clear any cached data
      window.location.href = '/admin';
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  const fetchPosts = async () => {
    try {
      const response = await fetch('/api/admin/stories');
      if (response.status === 401) {
        // Unauthorized - redirect to login
        setIsLoggedIn(false);
        setPosts([]);
      } else if (response.ok) {
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
      let response;
      
      if (isEditing && currentPost?.id) {
        // Update existing post
        response = await fetch(`/api/admin/stories/${currentPost.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(currentPost),
        });
      } else {
        // Create new post
        response = await fetch('/api/admin/stories', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(currentPost),
        });
      }
      
      const data = await response.json();
      
      if (data.success) {
        setSuccessMessage(`Article ${isEditing ? 'updated' : 'published'} successfully!`);
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
        setError(data.message || `Failed to ${isEditing ? 'update' : 'publish'} article`);
      }
    } catch (err) {
      setError(`An error occurred while ${isEditing ? 'updating' : 'publishing'} the article`);
      console.error(err);
    }
  };

  const handleEditPost = (post: BlogPost) => {
    setCurrentPost({ ...post });
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
        <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl max-w-md w-full shadow-2xl border border-cyan-500/20">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full mx-auto flex items-center justify-center mb-4">
              <i className="fas fa-shield-alt text-white text-2xl"></i>
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Research Portal Access</h1>
            <p className="text-gray-400">Secure authentication required</p>
          </div>
          
          <form onSubmit={handleLogin}>
            {error && (
              <div className="mb-4 p-3 bg-red-500/20 text-red-300 rounded-lg border border-red-500/30">
                {error}
              </div>
            )}
            
            <div className="mb-6">
              <label className="block text-gray-300 mb-2 font-medium">Email</label>
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
              <label className="block text-gray-300 mb-2 font-medium">Password</label>
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
              className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold rounded-lg hover:opacity-90 transition-all shadow-lg"
            >
              Authenticate
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
            <h1 className="text-3xl font-bold text-white">Nezaira Content Management</h1>
            <p className="text-gray-400">Research & publication platform</p>
          </div>
          <button 
            onClick={handleLogout}
            className="py-3 px-6 bg-gradient-to-r from-red-600 to-red-700 text-white font-bold rounded-lg hover:opacity-90 transition-all flex items-center"
          >
            <i className="fas fa-sign-out-alt mr-2"></i>
            Sign Out
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
            <div className="bg-gray-800/50 p-6 rounded-2xl border border-gray-700 shadow-xl">
              <h2 className="text-xl font-bold text-white mb-6">
                {isEditing ? 'Edit Research Article' : 'Create New Research Article'}
              </h2>
              
              <form onSubmit={handleSubmitPost}>
                <div className="mb-4">
                  <label className="block text-gray-300 mb-2 font-medium">Title *</label>
                  <input
                    type="text"
                    name="title"
                    value={currentPost?.title || ''}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:border-cyan-500 text-white placeholder-gray-500"
                    placeholder="Enter article title"
                    required
                  />
                </div>
                
                <div className="mb-4">
                  <label className="block text-gray-300 mb-2 font-medium">Subtitle</label>
                  <input
                    type="text"
                    name="subtitle"
                    value={currentPost?.subtitle || ''}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:border-cyan-500 text-white placeholder-gray-500"
                    placeholder="Enter article subtitle"
                  />
                </div>
                
                <div className="mb-4">
                  <label className="block text-gray-300 mb-2 font-medium">Category</label>
                  <select
                    name="category"
                    value={currentPost?.category || 'Medicine'}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:border-cyan-500 text-white"
                  >
                    <option value="Medicine">Medicine</option>
                    <option value="AI">AI</option>
                    <option value="Technology">Technology</option>
                    <option value="Lifestyle">Lifestyle</option>
                  </select>
                </div>
                
                <div className="mb-4">
                  <label className="block text-gray-300 mb-2 font-medium">Featured Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:border-cyan-500 text-white"
                  />
                  {imagePreview && (
                    <div className="mt-3">
                      <div className="text-sm text-gray-400 mb-2">Preview:</div>
                      <img 
                        src={imagePreview} 
                        alt="Preview" 
                        className="max-w-full h-32 object-contain border border-gray-600 rounded-lg"
                      />
                    </div>
                  )}
                </div>
                
                <div className="mb-4">
                  <label className="block text-gray-300 mb-2 font-medium">Content *</label>
                  <div className="w-full bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:border-cyan-500 text-white">
                    <MDEditor
                      value={currentPost?.content || ''}
                      onChange={(value) => setCurrentPost(prev => ({
                        ...prev!,
                        content: value || ''
                      }) as BlogPost)}
                      height={400}
                      preview="edit"
                      textareaProps={{
                        placeholder: "Write your research article content here... Use # for headings, **bold**, *italic*, - for lists, and more markdown syntax"
                      }}
                    />
                  </div>
                </div>
                
                <button 
                  type="submit" 
                  className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold rounded-lg hover:opacity-90 transition-all shadow-lg"
                >
                  {isEditing ? 'Update Article' : 'Publish Article'}
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
                    className="w-full mt-3 py-3 bg-gray-600 text-white font-bold rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    Cancel Editing
                  </button>
                )}
              </form>
            </div>
          </div>
          
          {/* Posts List */}
          <div className="lg:col-span-2">
            <div className="bg-gray-800/50 p-6 rounded-2xl border border-gray-700 shadow-xl">
              <h2 className="text-xl font-bold text-white mb-6">Research Articles</h2>
              
              {posts.length === 0 ? (
                <div className="text-center py-12">
                  <i className="fas fa-book-medical text-6xl text-gray-600 mb-4"></i>
                  <h3 className="text-xl text-gray-400">No research articles published yet</h3>
                  <p className="text-gray-500 mt-2">Create your first research article using the form</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {posts.map(post => (
                    <div key={post.id} className="p-6 bg-gradient-to-r from-gray-700/30 to-gray-800/30 rounded-xl border border-gray-600 hover:border-cyan-500/30 transition-all duration-300">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-bold text-white text-lg">{post.title}</h3>
                            <span className="text-xs bg-cyan-500/20 text-cyan-300 px-2 py-1 rounded">
                              {post.category}
                            </span>
                          </div>
                          <p className="text-gray-400 text-sm mb-3 line-clamp-2">{post.content.substring(0, 150)}...</p>
                          <div className="flex gap-4 text-xs text-gray-500">
                            <span className="flex items-center gap-1">
                              <i className="fas fa-calendar"></i>
                              {post.date}
                            </span>
                            <span className="flex items-center gap-1">
                              <i className="fas fa-clock"></i>
                              {post.readTime}
                            </span>
                          </div>
                        </div>
                        <div className="flex gap-2 ml-4">
                          <button 
                            onClick={() => handleEditPost(post)}
                            className="px-4 py-2 bg-cyan-500/20 text-cyan-300 rounded-lg hover:bg-cyan-500/30 transition-colors flex items-center"
                          >
                            <i className="fas fa-edit mr-1"></i> Edit
                          </button>
                          <button 
                            onClick={() => handleDeletePost(post.id)}
                            className="px-4 py-2 bg-red-500/20 text-red-300 rounded-lg hover:bg-red-500/30 transition-colors flex items-center"
                          >
                            <i className="fas fa-trash mr-1"></i> Delete
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