import { NextRequest, NextResponse } from 'next/server';

const BACKEND_URL = process.env.SPRING_BACKEND_URL || 'http://localhost:8080';

/**
 * Refresh Token Endpoint
 * - Lấy refreshToken từ httpOnly cookie
 * - Gọi backend để refresh và nhận tokens mới
 * - Lưu tokens mới vào httpOnly cookies
 * - Implement token rotation: old refresh token bị revoke
 */
export async function POST(request: NextRequest) {
  try {
    // Lấy refreshToken từ cookie
    const refreshToken = request.cookies.get('refreshToken')?.value;
    
    if (!refreshToken) {
      return NextResponse.json(
        { error: 'Refresh token không tồn tại' },
        { status: 401 }
      );
    }

    // Gọi API backend để refresh token
    const response = await fetch(`${BACKEND_URL}/api/auth/refresh-token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refreshToken }),
    });

    if (!response.ok) {
      // Refresh token không hợp lệ hoặc hết hạn → xóa cookies
      const res = NextResponse.json(
        { error: 'REFRESH_FAILED', message: 'Refresh token không hợp lệ hoặc đã hết hạn. Vui lòng đăng nhập lại.' },
        { status: 401 }
      );
      
      res.cookies.delete('accessToken');
      res.cookies.delete('refreshToken');
      
      return res;
    }

    const data = await response.json();
    const { accessToken, refreshToken: newRefreshToken, expiresIn } = data;

    if (!accessToken) {
      return NextResponse.json(
        { error: 'Token không hợp lệ từ server' },
        { status: 500 }
      );
    }

    // Tạo response
    const res = NextResponse.json(
      {
        success: true,
        message: 'Refresh token thành công',
      },
      { status: 200 }
    );

    // Set lại HTTP-only cookies cho tokens
    // Access Token mới
    res.cookies.set('accessToken', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: Math.floor((expiresIn || 900000) / 1000), // Convert ms to seconds
      path: '/',
    });

    // Refresh Token mới (backend implement token rotation)
    if (newRefreshToken) {
      res.cookies.set('refreshToken', newRefreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7, // 7 ngày
        path: '/',
      });
    }

    return res;
  } catch (error) {
    console.error('❌ [Refresh] Error:', error);
    return NextResponse.json(
      { error: 'Có lỗi xảy ra khi refresh token' },
      { status: 500 }
    );
  }
}
