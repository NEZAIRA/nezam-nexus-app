import { NextRequest, NextResponse } from 'next/server';

import fs from 'fs';
import path from 'path';

const storiesFilePath = path.join(process.cwd(), 'data', 'stories.json');

// Ensure data directory exists
const dataDir = path.join(process.cwd(), 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Initialize stories file if it doesn't exist
if (!fs.existsSync(storiesFilePath)) {
  fs.writeFileSync(storiesFilePath, JSON.stringify([]));
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Check if user is authenticated
    const cookieHeader = request.headers.get('cookie');
    let isAuthenticated = false;
    
    if (cookieHeader) {
      const cookies = cookieHeader.split(';').reduce((acc, cookie) => {
        const [name, value] = cookie.trim().split('=');
        acc[name] = value;
        return acc;
      }, {} as Record<string, string>);
      
      isAuthenticated = !!cookies['admin_token'];
    }
    
    if (!isAuthenticated) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    const { id } = params;
    const storyData = await request.json();
    
    // Validate required fields
    if (!id || !storyData.title || !storyData.content) {
      return NextResponse.json(
        { success: false, message: 'ID, title and content are required' },
        { status: 400 }
      );
    }
    
    // Read existing stories
    let stories = JSON.parse(fs.readFileSync(storiesFilePath, 'utf8'));
    
    // Find the index of the story to update
    const storyIndex = stories.findIndex((story: any) => story.id === id);
    
    if (storyIndex === -1) {
      return NextResponse.json(
        { success: false, message: 'Story not found' },
        { status: 404 }
      );
    }
    
    // Update the existing story
    const updatedStory = {
      ...stories[storyIndex],
      title: storyData.title,
      subtitle: storyData.subtitle || '',
      content: storyData.content,
      category: storyData.category || 'Blog',
      date: new Date().toISOString().split('T')[0], // Update date to current date
      readTime: calculateReadingTime(storyData.content),
      featuredImage: storyData.featuredImage,
      updatedAt: new Date().toISOString()
    };
    
    // Update the story in the array
    stories[storyIndex] = updatedStory;
    
    // Write updated stories back to file
    fs.writeFileSync(storiesFilePath, JSON.stringify(stories, null, 2));
    
    return NextResponse.json(
      { success: true, message: 'Story updated successfully', story: updatedStory },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error updating story:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to update story' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Check if user is authenticated
    const cookieHeader = request.headers.get('cookie');
    let isAuthenticated = false;
    
    if (cookieHeader) {
      const cookies = cookieHeader.split(';').reduce((acc, cookie) => {
        const [name, value] = cookie.trim().split('=');
        acc[name] = value;
        return acc;
      }, {} as Record<string, string>);
      
      isAuthenticated = !!cookies['admin_token'];
    }
    
    if (!isAuthenticated) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    const { id } = params;
    
    // Read existing stories
    let stories = JSON.parse(fs.readFileSync(storiesFilePath, 'utf8'));
    
    // Filter out the story with the given ID
    const updatedStories = stories.filter((story: any) => story.id !== id);
    
    // Write updated stories back to file
    fs.writeFileSync(storiesFilePath, JSON.stringify(updatedStories, null, 2));
    
    return NextResponse.json(
      { success: true, message: 'Story deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting story:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to delete story' },
      { status: 500 }
    );
  }
}

// Function to calculate reading time based on word count
function calculateReadingTime(text: string): string {
  const wordsPerMinute = 200; // Average reading speed
  const wordCount = text.split(/\s+/).length;
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  return `${minutes} min read`;
}