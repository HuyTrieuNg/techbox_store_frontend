import { NextRequest, NextResponse } from 'next/server';

const BACKEND_URL = process.env.SPRING_BACKEND_URL || 'http://localhost:8080';
// NOTE: These env variables are fallbacks only. Prefer using the expiry information
// returned from the backend (JWT `exp` claim or `expires_in`) and let backend be
// the source of truth. We keep the envs as a fallback for local/dev environments.
const COOKIE_EXPIRY = parseInt(process.env.COOKIE_EXPIRY || '2592000', 10);

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
      maxAge: COOKIE_EXPIRY,
      path: '/',
    });

    // Refresh Token 
    res.cookies.set('refreshToken', refreshToken, {
      httpOnly: true,
      // secure: process.env.NODE_ENV === 'production',
      secure: false,
      sameSite: 'lax',
      maxAge: COOKIE_EXPIRY,
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
