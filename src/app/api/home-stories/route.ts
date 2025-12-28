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

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : 3;
    
    let stories = JSON.parse(fs.readFileSync(storiesFilePath, 'utf8'));
    
    // Sort by creation date (newest first) and take the limit
    stories = stories
      .sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, limit);
    
    return NextResponse.json(stories);
  } catch (error) {
    console.error('Error reading stories:', error);
    return NextResponse.json(
      { error: 'Failed to fetch stories' },
      { status: 500 }
    );
  }
}