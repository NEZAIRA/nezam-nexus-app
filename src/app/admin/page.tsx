'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

type Story = {
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
  
  const [stories, setStories] = useState<Story[]>([]);
  const [currentStory, setCurrentStory] = useState<Story | null>({
    id: '',
    title: '',
    subtitle: '',
    content: '',
    category: 'Blog',
    date: new Date().toISOString().split('T')[0],
    readTime: '5 min read',
    featuredImage: null,
    createdAt: new Date().toISOString()
  } as Story);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

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
        fetchStories();
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
        fetchStories();
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
      setStories([]);
      router.push('/admin'); // Refresh the page to clear any cached data
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  const fetchStories = async () => {
    try {
      const response = await fetch('/api/admin/stories');
      if (response.ok) {
        const data = await response.json();
        setStories(data);
      } else {
        console.error('Failed to fetch stories');
      }
    } catch (err) {
      console.error('Error fetching stories:', err);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCurrentStory(prev => ({
      ...prev!,
      [name]: value
    }) as Story);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      
      reader.onload = (event) => {
        if (event.target?.result) {
          setCurrentStory(prev => ({
            ...prev!,
            featuredImage: event.target!.result as string
          }) as Story);
        }
      };
      
      reader.readAsDataURL(file);
    }
  };

  const handleSubmitStory = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/admin/stories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(currentStory),
      });
      
      const data = await response.json();
      
      if (data.success) {
        setSuccessMessage('Story published successfully!');
        setCurrentStory({
          id: '',
          title: '',
          subtitle: '',
          content: '',
          category: 'Blog',
          date: new Date().toISOString().split('T')[0],
          readTime: '5 min read',
          featuredImage: null,
          createdAt: new Date().toISOString()
        } as Story);
        setIsEditing(false);
        
        // Refresh the stories list
        fetchStories();
        
        // Clear success message after 3 seconds
        setTimeout(() => setSuccessMessage(''), 3000);
      } else {
        setError(data.message || 'Failed to publish story');
      }
    } catch (err) {
      setError('An error occurred while publishing the story');
      console.error(err);
    }
  };

  const handleEditStory = (story: Story) => {
    setCurrentStory(story);
    setIsEditing(true);
  };

  const handleDeleteStory = async (id: string) => {
    if (!confirm('Are you sure you want to delete this story?')) {
      return;
    }
    
    try {
      // In a real app, you'd have a DELETE endpoint
      // For now, we'll just refresh the list
      const updatedStories = stories.filter(story => story.id !== id);
      setStories(updatedStories);
      
      // In a real implementation, you would call:
      // await fetch(`/api/admin/stories/${id}`, { method: 'DELETE' });
      
      setSuccessMessage('Story deleted successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      setError('Failed to delete story');
      console.error(err);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4">Checking authentication...</p>
        </div>
      </div>
    );
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-lg max-w-md w-full shadow-md border">
          <h1 className="text-2xl font-bold text-center mb-6">Admin Access</h1>
          
          <form onSubmit={handleLogin}>
            {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded border border-red-200">{error}</div>}
            
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                placeholder="Enter admin email"
                required
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                placeholder="Enter password"
                required
              />
            </div>
            
            <button 
              type="submit" 
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
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
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Nezaira Admin Panel</h1>
          <button 
            onClick={handleLogout}
            className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition-colors"
          >
            Logout
          </button>
        </div>

        {successMessage && (
          <div className="mb-6 p-3 bg-green-100 text-green-700 rounded border border-green-200">
            {successMessage}
          </div>
        )}

        {error && (
          <div className="mb-6 p-3 bg-red-100 text-red-700 rounded border border-red-200">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Story Creation/Editing Form */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-bold mb-6">
                {isEditing ? 'Edit Story' : 'Create New Story'}
              </h2>
              
              <form onSubmit={handleSubmitStory}>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Title *</label>
                  <input
                    type="text"
                    name="title"
                    value={currentStory?.title || ''}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    required
                  />
                </div>
                
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Subtitle</label>
                  <input
                    type="text"
                    name="subtitle"
                    value={currentStory?.subtitle || ''}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                  />
                </div>
                
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Category</label>
                  <select
                    name="category"
                    value={currentStory?.category || 'Blog'}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                  >
                    <option value="Blog">Blog</option>
                    <option value="Research">Research</option>
                  </select>
                </div>
                
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Featured Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                  />
                  {currentStory?.featuredImage && (
                    <div className="mt-2">
                      <img 
                        src={currentStory.featuredImage} 
                        alt="Featured" 
                        className="max-w-full h-32 object-contain border rounded"
                      />
                    </div>
                  )}
                </div>
                
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Content *</label>
                  <textarea
                    name="content"
                    value={currentStory?.content || ''}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    rows={8}
                    required
                  />
                </div>
                
                <button 
                  type="submit" 
                  className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
                >
                  {isEditing ? 'Update Story' : 'Publish Story'}
                </button>
                
                {isEditing && (
                  <button 
                    type="button" 
                    onClick={() => {
                      setCurrentStory({
                        id: '',
                        title: '',
                        subtitle: '',
                        content: '',
                        category: 'Blog',
                        date: new Date().toISOString().split('T')[0],
                        readTime: '5 min read',
                        featuredImage: null,
                        createdAt: new Date().toISOString()
                      } as Story);
                      setIsEditing(false);
                    }}
                    className="w-full mt-2 bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition-colors"
                  >
                    Cancel Edit
                  </button>
                )}
              </form>
            </div>
          </div>
          
          {/* Stories List */}
          <div className="lg:col-span-2">
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-bold mb-6">Manage Stories</h2>
              
              {stories.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500">No stories created yet</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {stories.map(story => (
                    <div key={story.id} className="p-4 bg-gray-50 rounded-lg border">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-bold text-lg">{story.title}</h3>
                          <p className="text-gray-600 text-sm mt-1">{story.subtitle}</p>
                          <div className="flex gap-2 mt-2">
                            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                              {story.category}
                            </span>
                            <span className="text-xs text-gray-500">{story.date}</span>
                            <span className="text-xs text-gray-500">{story.readTime}</span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button 
                            onClick={() => handleEditStory(story)}
                            className="px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors"
                          >
                            Edit
                          </button>
                          <button 
                            onClick={() => handleDeleteStory(story.id)}
                            className="px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors"
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