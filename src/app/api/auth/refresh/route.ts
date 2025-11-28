import { NextRequest, NextResponse } from 'next/server';

const BACKEND_URL = process.env.SPRING_BACKEND_URL || 'http://localhost:8080';

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
      // Nếu refresh token không hợp lệ, xóa cookies
      const res = NextResponse.json(
        { error: 'Refresh token không hợp lệ' },
        { status: 401 }
      );
      
      res.cookies.delete('accessToken');
      res.cookies.delete('refreshToken');
      
      return res;
    }

    const data = await response.json();
    const { accessToken, refreshToken: newRefreshToken } = data;

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
      // secure: process.env.NODE_ENV === 'production',
      secure: false,
      sameSite: 'lax',
      maxAge: 60 * 15, // 15 phút
      path: '/',
    });

    // Refresh Token mới (nếu backend trả về)
    if (newRefreshToken) {
      res.cookies.set('refreshToken', newRefreshToken, {
        httpOnly: true,
        // secure: process.env.NODE_ENV === 'production',
        secure: false,
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7, // 7 ngày
        path: '/',
      });
    }

    // KHÔNG cần revalidate cache
    // - API Public (products, categories) vẫn valid sau khi refresh token
    // - API Private (user, cart, orders) tự động revalidate qua useSWR client-side

    return res;
  } catch (error) {
    console.error('Refresh token error:', error);
    return NextResponse.json(
      { error: 'Có lỗi xảy ra khi refresh token' },
      { status: 500 }
    );
  }
}

// Logout endpoint - xóa cookies
export async function DELETE(request: NextRequest) {
  try {
    const res = NextResponse.json(
      {
        success: true,
        message: 'Đăng xuất thành công',
      },
      { status: 200 }
    );

    // Xóa cookies
    res.cookies.delete('accessToken');
    res.cookies.delete('refreshToken');

    return res;
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json(
      { error: 'Có lỗi xảy ra khi đăng xuất' },
      { status: 500 }
    );
  }
}
