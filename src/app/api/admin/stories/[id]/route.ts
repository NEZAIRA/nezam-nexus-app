import { NextRequest, NextResponse } from 'next/server';

import fs from 'fs';
import path from 'path';

const storiesFilePath = path.join(process.cwd(), 'data', 'stories.json');

// Ensure uploads directory exists
const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Ensure data directory exists
const dataDir = path.join(process.cwd(), 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Initialize stories file if it doesn't exist

// Function to save images
async function saveImage(base64Data: string, filename: string): Promise<string> {
  // Remove data URL prefix if present
  const base64 = base64Data.replace(/^data:image\/\w+;base64,/, '');
  
  // Decode base64 to binary data
  const imageBuffer = Buffer.from(base64, 'base64');
  
  // Create file path
  const filePath = path.join(uploadsDir, filename);
  
  // Write the image to the file system
  await fs.promises.writeFile(filePath, imageBuffer);
  
  // Return the URL path for the image
  return `/uploads/${filename}`;
}
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
    
    // Handle featured image upload if provided
    let featuredImageUrl = storyData.featuredImage; // Keep existing if no new image
    if (storyData.featuredImage && typeof storyData.featuredImage === 'string' && storyData.featuredImage.startsWith('data:image')) {
      // Generate a unique filename
      const timestamp = Date.now();
      const extension = storyData.featuredImage.split(';')[0].split('/')[1];
      const filename = `featured-${timestamp}.${extension}`;
      
      // Save the image and get the URL
      featuredImageUrl = await saveImage(storyData.featuredImage, filename);
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
      featuredImage: featuredImageUrl,
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