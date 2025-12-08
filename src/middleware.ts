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
 * Next.js Middleware
 * Reference: https://nextjs.org/docs/15/app/api-reference/file-conventions/middleware
 * 
 * - Bảo vệ guest-only routes: Nếu đã login → redirect to home
 * - KHÔNG tự decode/validate token ở client
 * - Để backend xử lý việc validate token và trả về 401 nếu cần refresh
 */
export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  console.log('\n🔵 [Middleware] Request:', pathname);
  
  // Lấy tokens từ cookie
  const accessToken = request.cookies.get('accessToken')?.value;
  const hasToken = !!accessToken;

  // GUEST ONLY ROUTES PROTECTION
  const isGuestOnlyRoute = GUEST_ONLY_ROUTES.some(route => 
    pathname.startsWith(route)
  );

  if (isGuestOnlyRoute && hasToken) {
    console.log('🔄 [Middleware] Redirecting authenticated user from guest-only route');
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
     */
    '/((?!_next/static|_next/image|favicon.ico|api/auth|api/generate).*)',
  ],
};

