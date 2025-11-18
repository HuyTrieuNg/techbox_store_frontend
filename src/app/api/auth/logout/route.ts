import { NextRequest, NextResponse } from 'next/server';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8080';

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

    // Gọi backend logout endpoint (nếu có)
    // Một số backend có endpoint để invalidate refresh token
    try {
      await fetch(`${BACKEND_URL}/api/auth/logout/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refresh: refreshToken }),
      });
    } catch (backendError) {
      // Backend logout failed, but we still clear cookies on frontend
      console.error('[Logout] Backend logout failed:', backendError);
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
