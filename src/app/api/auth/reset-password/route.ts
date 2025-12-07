import { NextRequest, NextResponse } from 'next/server';

const BACKEND_URL = process.env.SPRING_BACKEND_URL || 'http://localhost:8080';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { token, newPassword } = body;

    // Validation
    if (!token || !newPassword) {
      return NextResponse.json(
        { error: 'Token và mật khẩu mới là bắt buộc' },
        { status: 400 }
      );
    }

    // Gọi API backend để reset mật khẩu
    const response = await fetch(`${BACKEND_URL}/api/auth/reset-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token, newPassword }),
    });

    if (!response.ok) {
      let errorMessage = 'Reset mật khẩu thất bại';
      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorMessage;
      } catch {}

      return NextResponse.json(
        { error: errorMessage },
        { status: response.status }
      );
    }

  
    // Trả về response từ backend
    return NextResponse.json( { status: 200 });
  } catch (error) {
    console.error('Reset password error:', error);
    return NextResponse.json(
      { error: 'Có lỗi xảy ra khi reset mật khẩu' },
      { status: 500 }
    );
  }
}