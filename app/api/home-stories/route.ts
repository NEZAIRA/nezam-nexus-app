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
    content: "Full content about the biotech research breakthrough...",
    createdAt: new Date('2025-01-15').toISOString()
  },
  {
    id: 2,
    title: "AI in Healthcare Innovation",
    excerpt: "How artificial intelligence is transforming modern healthcare systems.",
    category: "Innovation",
    date: "2025-01-10",
    content: "Full content about AI in healthcare...",
    createdAt: new Date('2025-01-10').toISOString()
  },
  {
    id: 3,
    title: "Future of Digital Health",
    excerpt: "Exploring the next generation of digital health solutions.",
    category: "Technology",
    date: "2025-01-05",
    content: "Full content about digital health future...",
    createdAt: new Date('2025-01-05').toISOString()
  },
  {
    id: 4,
    title: "Next-Gen Medical Devices",
    excerpt: "Innovative medical devices that are changing patient care.",
    category: "Technology",
    date: "2024-12-28",
    content: "Full content about next-gen medical devices...",
    createdAt: new Date('2024-12-28').toISOString()
  }
];

export async function GET(request: NextRequest) {
  try {
    // For static export, return limited stories
    // URL parameters are not supported in static export
    let stories = mockStories;
    
    // Sort by creation date (newest first) and take the first 3
    stories = stories
      .sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 3);
    
    return NextResponse.json(stories);
  } catch (error) {
    console.error('Error reading stories:', error);
    return NextResponse.json(
      { error: 'Failed to fetch stories' },
      { status: 500 }
    );
  }
}