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