import { NextRequest, NextResponse } from 'next/server';

import fs from 'fs';
import path from 'path';
import { saveImage } from '../../../../lib/file-upload';

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

export async function POST(request: NextRequest) {
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
    
    const storyData = await request.json();
    
    // Validate required fields
    if (!storyData.title || !storyData.content) {
      return NextResponse.json(
        { success: false, message: 'Title and content are required' },
        { status: 400 }
      );
    }
    
    // Read existing stories
    let stories = JSON.parse(fs.readFileSync(storiesFilePath, 'utf8'));
    
    // Handle featured image upload if provided
    let featuredImageUrl = null;
    if (storyData.featuredImage && typeof storyData.featuredImage === 'string' && storyData.featuredImage.startsWith('data:image')) {
      // Generate a unique filename
      const timestamp = Date.now();
      const extension = storyData.featuredImage.split(';')[0].split('/')[1];
      const filename = `featured-${timestamp}.${extension}`;
      
      // Save the image and get the URL
      featuredImageUrl = await saveImage(storyData.featuredImage, filename);
    } else {
      featuredImageUrl = storyData.featuredImage || null;
    }
    
    // Create new story with unique ID and timestamp
    const newStory = {
      id: Date.now().toString(), // Using timestamp as ID (not ideal for production)
      title: storyData.title,
      subtitle: storyData.subtitle || '',
      content: storyData.content,
      category: storyData.category || 'Blog',
      date: new Date().toISOString().split('T')[0],
      readTime: calculateReadingTime(storyData.content),
      featuredImage: featuredImageUrl,
      createdAt: new Date().toISOString()
    };
    
    // Add new story
    stories.push(newStory);
    
    // Write updated stories back to file
    fs.writeFileSync(storiesFilePath, JSON.stringify(stories, null, 2));
    
    return NextResponse.json(
      { success: true, message: 'Story created successfully', story: newStory },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating story:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to create story' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
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
    
    // For admin panel, require authentication
    if (!isAuthenticated) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    const stories = JSON.parse(fs.readFileSync(storiesFilePath, 'utf8'));
    return NextResponse.json(stories);
  } catch (error) {
    console.error('Error reading stories:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch stories' },
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