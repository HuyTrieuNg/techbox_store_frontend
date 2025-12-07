import { NextRequest, NextResponse } from 'next/server';

const BACKEND_URL = process.env.SPRING_BACKEND_URL || 'http://localhost:8080';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    // Validation
    if (!email) {
      return NextResponse.json(
        { error: 'Email là bắt buộc' },
        { status: 400 }
      );
    }

    // Gọi API backend để gửi email quên mật khẩu
    const response = await fetch(`${BACKEND_URL}/api/auth/forgot-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      let errorMessage = 'Gửi email thất bại';
      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorMessage;
      } catch {}

      return NextResponse.json(
        { error: errorMessage },
        { status: response.status }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Email đã được gửi thành công',
     
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Forgot password error:', error);
    return NextResponse.json(
      { error: 'Có lỗi xảy ra khi gửi email' },
      { status: 500 }
    );
  }
}