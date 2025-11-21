import { log } from 'console';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Các route chỉ dành cho guest (chưa login)
// Nếu đã login (có token) → redirect về home
const GUEST_ONLY_ROUTES = [
  '/login',
  '/register',
  '/forgot-password',
];

/**
 * Decode JWT để lấy expiry time (không verify, chỉ decode)
 */
function decodeJWT(token: string): { exp?: number } | null {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Failed to decode JWT:', error);
    return null;
  }
}

/**
 * Kiểm tra xem token có sắp hết hạn không (trong vòng 5 phút)
 */
function isTokenExpiringSoon(token: string): boolean {
  // const decoded = decodeJWT(token);
  // if (!decoded || !decoded.exp) return true;

  // const now = Math.floor(Date.now() / 1000);
  // const expiry = decoded.exp;
  // const bufferTime = 5 * 60; // 5 minutes

  // // Token hết hạn hoặc sắp hết hạn trong 5 phút
  // return expiry - now < bufferTime;
  return false;
}
/**
 * Refresh access token
 */
async function refreshAccessToken(
  request: NextRequest,
  refreshToken: string
): Promise<string | null> {
  try {
    console.log('🔄 [Middleware] Refreshing access token...');
    
    const refreshResponse = await fetch(
      `${request.nextUrl.origin}/api/auth/refresh`,
      {
        method: 'POST',
        headers: {
          Cookie: `refreshToken=${refreshToken}`,
        },
      }
    );

    if (!refreshResponse.ok) {
      console.error('❌ [Middleware] Refresh failed:', refreshResponse.status);
      return null;
    }

    // Extract new access token from Set-Cookie header
    const setCookie = refreshResponse.headers.get('set-cookie');
    const match = setCookie?.match(/accessToken=([^;]+)/);
    
    if (match && match[1]) {
      console.log('[Middleware] Token refreshed successfully');
      return match[1];
    }

    return null;
  } catch (error) {
    console.error('[Middleware] Refresh error:', error);
    return null;
  }
}

/**
 * Next.js Middleware
 * Reference: https://nextjs.org/docs/15/app/api-reference/file-conventions/middleware
 * 
 * Chức năng:
 * - Smart Token Management: Auto refresh token trước khi hết hạn
 * - Bảo vệ guest-only routes: Nếu đã login → redirect to home
 * - Đảm bảo token luôn hợp lệ trước khi request đến API Route
 */
export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  console.log('\n🔥 [Middleware] Request:', pathname);
  
  // Skip token check for auth routes
  if (pathname.startsWith('/api/auth')) {
    console.log('⏭️ [Middleware] Skipping auth routes');
    return NextResponse.next();
  }
  
  // Lấy tokens từ cookie
  const accessToken = request.cookies.get('accessToken')?.value;
  const refreshToken = request.cookies.get('refreshToken')?.value;
  const hasToken = !!accessToken;

  // 🔐 SMART TOKEN MANAGEMENT
  // Nếu có access token, kiểm tra xem có sắp hết hạn không
  if (accessToken && refreshToken) {
    if (isTokenExpiringSoon(accessToken)) {
      console.log('⚠️ [Middleware] Token expiring soon, refreshing...');
      
      const newAccessToken = await refreshAccessToken(request, refreshToken);
      
      if (newAccessToken) {
        // Clone response và set cookie mới
        const response = NextResponse.next();
        response.cookies.set('accessToken', newAccessToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          path: '/',
        });
        
        console.log('[Middleware] Token refreshed, continuing request');
        return response;
      } else {
        // Refresh thất bại → Clear cookies và redirect to login (nếu cần)
        console.log('[Middleware] Refresh failed, clearing cookies');
        const response = NextResponse.next();
        response.cookies.delete('accessToken');
        response.cookies.delete('refreshToken');
        
        // Nếu đang truy cập protected route → redirect to login
        if (pathname.startsWith('/api/proxy')) {
          return NextResponse.json(
            { error: 'Phiên đăng nhập đã hết hạn' },
            { status: 401 }
          );
        }
        
        return response;
      }
    }
  }

  // GUEST ONLY ROUTES PROTECTION
  const isGuestOnlyRoute = GUEST_ONLY_ROUTES.some(route => 
    pathname.startsWith(route)
  );

  if (isGuestOnlyRoute && hasToken) {
    console.log('[Middleware] Redirecting authenticated user from guest-only route');
    const url = request.nextUrl.clone();
    url.pathname = '/';
    return NextResponse.redirect(url);
  }

  // Token valid, continue
  console.log('[Middleware] Request allowed');
  return NextResponse.next();
}

// Cấu hình matcher để áp dụng middleware
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - api/auth/* (auth routes don't need token check)
     * 
     * ✅ INCLUDE /api/proxy/* để check token!
     */
    '/((?!_next/static|_next/image|favicon.ico|api/auth).*)',
  ],
};

