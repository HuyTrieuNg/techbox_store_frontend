import { NextRequest, NextResponse } from 'next/server';

const BACKEND_URL = process.env.SPRING_BACKEND_URL || 'http://localhost:8080';
const ACCESS_TOKEN_EXPIRY = parseInt(process.env.ACCESS_TOKEN_EXPIRY || '3600', 10);
const REFRESH_TOKEN_EXPIRY = parseInt(process.env.REFRESH_TOKEN_EXPIRY || '2592000', 10);

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

    if (!response.ok) {
      let errorMessage = 'Đăng nhập thất bại';
      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorMessage;
      } catch {}

      return NextResponse.json(
        { error: errorMessage },
        { status: response.status }
      );
    }
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
      // secure: process.env.NODE_ENV === 'production',
      secure: false,
      sameSite: 'lax',
      maxAge: ACCESS_TOKEN_EXPIRY,
      path: '/',
    });

    // Refresh Token 
    res.cookies.set('refreshToken', refreshToken, {
      httpOnly: true,
      // secure: process.env.NODE_ENV === 'production',
      secure: false,
      sameSite: 'lax',
      maxAge: REFRESH_TOKEN_EXPIRY,
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
