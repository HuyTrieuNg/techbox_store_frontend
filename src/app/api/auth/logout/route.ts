import { NextRequest, NextResponse } from 'next/server';

const BACKEND_URL = process.env.SPRING_BACKEND_URL || 'http://localhost:8080';

export async function POST(request: NextRequest) {
  try {
    // Lấy refresh token từ cookies
    const refreshToken = request.cookies.get('refreshToken')?.value;

    if (!refreshToken) {
      return NextResponse.json(
        { error: 'No refresh token found' },
        { status: 401 }
      );
    }

    // Clear cookies
    const response = NextResponse.json({ message: 'Logged out successfully' });
    
    // Delete accessToken cookie
    response.cookies.delete('accessToken');
    
    // Delete refreshToken cookie
    response.cookies.delete('refreshToken');

    return response;
  } catch (error) {
    console.error('[Logout] Error:', error);
    return NextResponse.json(
      { error: 'Logout failed' },
      { status: 500 }
    );
  }
}
