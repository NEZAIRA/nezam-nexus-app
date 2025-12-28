import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    // Check credentials (in a real app, you'd hash passwords and check against a database)
    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
      // Create a simple session token (in a real app, you'd use JWT or similar)
      const token = Buffer.from(`${email}:${Date.now()}`).toString('base64');
      
      return NextResponse.json(
        { success: true, message: 'Login successful' },
        { 
          headers: {
            'Set-Cookie': `admin_token=${token}; Path=/; HttpOnly; SameSite=Strict; Max-Age=86400` // 24 hours
          }
        }
      );
    } else {
      return NextResponse.json(
        { success: false, message: 'Invalid credentials' },
        { status: 401 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Invalid request' },
      { status: 400 }
    );
  }
}