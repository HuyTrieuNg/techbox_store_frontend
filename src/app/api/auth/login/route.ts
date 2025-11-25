import { NextRequest, NextResponse } from 'next/server';

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // Validation
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email và password là bắt buộc' },
        { status: 400 }
      );
    }

    // Gọi API backend để đăng nhập
    const response = await fetch(`${BACKEND_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    // Kiểm tra response status TRƯỚC KHI parse JSON
    if (!response.ok) {
      // Thử parse error message từ backend (nếu có)
      let errorMessage = 'Đăng nhập thất bại';
      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorMessage;
      } catch {
        // Backend không trả JSON, dùng message mặc định
      }

      return NextResponse.json(
        { error: errorMessage },
        { status: response.status }
      );
    }

    // Response OK → Parse JSON an toàn
    const data = await response.json();

    // Lấy token từ response
    const { accessToken, refreshToken, user } = data;

    if (!accessToken || !refreshToken) {
      return NextResponse.json(
        { error: 'Token không hợp lệ từ server' },
        { status: 500 }
      );
    }

    // Tạo response với user data
    const res = NextResponse.json(
      {
        success: true,
        user,
        message: 'Đăng nhập thành công',
      },
      { status: 200 }
    );

    // Set HTTP-only cookies cho tokens
    // Access Token 
    res.cookies.set('accessToken', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 30, // 30 ngày
      path: '/',
    });

    // Refresh Token 
    res.cookies.set('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 30,
      path: '/',
    });

    return res;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Có lỗi xảy ra khi đăng nhập' },
      { status: 500 }
    );
  }
}
