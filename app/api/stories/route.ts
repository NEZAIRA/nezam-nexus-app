import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-static';

// Mock data for static export
const mockStories = [
  {
    id: 1,
    title: "Breakthrough in Biotech Research",
    excerpt: "Our latest research in biotechnology is paving the way for new medical treatments.",
    category: "Research",
    date: "2025-01-15",
    content: "Full content about the biotech research breakthrough..."
  },
  {
    id: 2,
    title: "AI in Healthcare Innovation",
    excerpt: "How artificial intelligence is transforming modern healthcare systems.",
    category: "Innovation",
    date: "2025-01-10",
    content: "Full content about AI in healthcare..."
  },
  {
    id: 3,
    title: "Future of Digital Health",
    excerpt: "Exploring the next generation of digital health solutions.",
    category: "Technology",
    date: "2025-01-05",
    content: "Full content about digital health future..."
  }
];

export async function GET(request: NextRequest) {
  try {
    // For static export, return all stories
    // URL parameters are not supported in static export
    const stories = mockStories;
    
    return NextResponse.json(stories);
  } catch (error) {
    console.error('Error reading stories:', error);
    return NextResponse.json(
      { error: 'Failed to fetch stories' },
      { status: 500 }
    );
  }
}