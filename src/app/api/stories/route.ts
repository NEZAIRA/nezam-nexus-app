import { NextRequest, NextResponse } from 'next/server';

// In a real application, this would connect to a database
// For now, we'll use a simple file-based storage approach
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-static';

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
    const category = searchParams.get('category');
    
    let stories = JSON.parse(fs.readFileSync(storiesFilePath, 'utf8'));
    
    if (category && category !== 'All') {
      stories = stories.filter((story: any) => story.category === category);
    }
    
    return NextResponse.json(stories);
  } catch (error) {
    console.error('Error reading stories:', error);
    return NextResponse.json(
      { error: 'Failed to fetch stories' },
      { status: 500 }
    );
  }
}