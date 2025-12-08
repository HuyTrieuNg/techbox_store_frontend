import { NextRequest, NextResponse } from 'next/server';

const BACKEND_URL = process.env.SPRING_BACKEND_URL || 'http://localhost:8080';

/**
 * Logout Endpoint
 * - Gửi refresh token về backend để revoke
 * - Xóa cookies ở client
 */
export async function POST(request: NextRequest) {
  try {
    // Lấy refresh token từ cookies
    const refreshToken = request.cookies.get('refreshToken')?.value;

    // Nếu có refresh token, gửi về backend để revoke
    if (refreshToken) {
      try {
        await fetch(`${BACKEND_URL}/api/auth/logout`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ refreshToken }),
        });
        // Không cần check response, vì dù backend có lỗi thì vẫn xóa cookie ở client
      } catch (error) {
        console.error('❌ [Logout] Backend error:', error);
        // Continue to delete cookies even if backend call fails
      }
    }

    // Tạo response và xóa cookies
    const response = NextResponse.json({ 
      success: true,
      message: 'Đăng xuất thành công' 
    });
    
    // Xóa accessToken cookie
    response.cookies.delete('accessToken');
    
    // Xóa refreshToken cookie
    response.cookies.delete('refreshToken');

    return response;
  } catch (error) {
    console.error('❌ [Logout] Error:', error);
    return NextResponse.json(
      { error: 'Logout failed' },
      { status: 500 }
    );
  }
}
