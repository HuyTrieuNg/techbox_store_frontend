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
  const decoded = decodeJWT(token);
  if (!decoded || !decoded.exp) return true;

  const now = Math.floor(Date.now() / 1000);
  const expiry = decoded.exp;
  const bufferTime = 5 * 60; // 5 minutes

  // Token hết hạn hoặc sắp hết hạn trong 5 phút
  return expiry - now < bufferTime;
}
/**
 * Refresh access token
 */
async function refreshAccessToken(request: NextRequest): Promise<NextResponse | null> {
  try {
    const response = await fetch(`${request.nextUrl.origin}/api/auth/refresh`, {
      method: 'POST',
      headers: { cookie: request.headers.get('cookie') || '' },
      credentials: 'include',
    });

    if (!response.ok) return null;

    const data = await response.json();
    const { accessToken, refreshToken: newRefreshToken } = data;
    if (!accessToken) return null;

    const res = NextResponse.next();
    res.cookies.set('accessToken', accessToken, { httpOnly: true, secure: false, sameSite: 'lax', path: '/' });
    if (newRefreshToken) {
      res.cookies.set('refreshToken', newRefreshToken, { httpOnly: true, secure: false, sameSite: 'lax', path: '/' });
    }

    return res;
  } catch (error) {
    console.error(error);
    return null;
  }
}


/**
 * Next.js Middleware
 * Reference: https://nextjs.org/docs/15/app/api-reference/file-conventions/middleware
 * 
 * - Smart Token Management: Auto refresh token trước khi hết hạn
 * - Bảo vệ guest-only routes: Nếu đã login → redirect to home
 * - Đảm bảo token luôn hợp lệ trước khi request đến API Route
 */
export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  console.log('\n [Middleware] Request:', pathname);
  
  // Đã bỏ qua trong matcher config
  // if (pathname.startsWith('/api/auth')) {
  //   console.log('⏭️ [Middleware] Skipping auth routes');
  //   return NextResponse.next();
  // }
  
  // Lấy tokens từ cookie
  const accessToken = request.cookies.get('accessToken')?.value;
  const refreshToken = request.cookies.get('refreshToken')?.value;
  const hasToken = !!accessToken;

  // Tự động refresh token nếu sắp hết hạn
  if (accessToken && refreshToken && isTokenExpiringSoon(accessToken)) {
    console.log(' Token expiring soon → refreshing');
    const refreshedResponse = await refreshAccessToken(request);

    if (!refreshedResponse) {
      // Refresh thất bại → clear cookies
      const res = NextResponse.next();
      res.cookies.delete('accessToken');
      res.cookies.delete('refreshToken');
      return res;
    }

    // Refresh thành công → trả về response đã set cookie mới
    return refreshedResponse;
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
    '/((?!_next/static|_next/image|favicon.ico|api/auth|api/generate).*)',
  ],
};

