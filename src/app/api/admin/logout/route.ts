import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  return NextResponse.json(
    { success: true, message: 'Logout successful' },
    { 
      headers: {
        'Set-Cookie': 'admin_token=; Path=/; HttpOnly; Max-Age=0' // Expire the cookie
      }
    }
  );
}