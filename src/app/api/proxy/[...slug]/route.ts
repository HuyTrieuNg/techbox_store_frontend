import { NextRequest, NextResponse } from 'next/server';

const BACKEND_URL = process.env.SPRING_BACKEND_URL || 'http://localhost:8080';

/**
 * Proxy handler cho tất cả API requests
 * Tự động gắn accessToken từ cookie vào header Authorization
 * Tự động refresh token khi nhận 401 từ backend
 * 
 * Usage từ client:
 * - GET /api/proxy/products -> GET http://backend:8080/api/products
 * - POST /api/proxy/orders -> POST http://backend:8080/api/orders
 */

/**
 * Refresh access token bằng cách gọi internal refresh endpoint
 * Returns null nếu refresh thất bại (401) → trigger logout
 */
async function refreshAccessToken(request: NextRequest): Promise<{ accessToken: string; refreshToken?: string } | null> {
  try {
    const response = await fetch(`${request.nextUrl.origin}/api/auth/refresh`, {
      method: 'POST',
      headers: {
        cookie: request.headers.get('cookie') || '',
      },
    });

    // Nếu refresh endpoint trả về 401 → refresh token không hợp lệ → return null để trigger logout
    if (!response.ok) {
      if (response.status === 401) {
        console.log('❌ [Proxy] Refresh token invalid/expired (401) → will trigger logout');
      }
      return null;
    }
    
    // Lấy tokens mới từ cookie trong response
    const accessTokenCookie = response.headers.get('set-cookie')?.match(/accessToken=([^;]+)/)?.[1];
    const refreshTokenCookie = response.headers.get('set-cookie')?.match(/refreshToken=([^;]+)/)?.[1];
    
    if (!accessTokenCookie) return null;

    return {
      accessToken: accessTokenCookie,
      refreshToken: refreshTokenCookie,
    };
  } catch (error) {
    console.error('❌ [Proxy] Refresh token failed:', error);
    return null;
  }
}

async function handleRequest(
  request: NextRequest,
  method: string,
  params: Promise<{ slug: string[] }>
) {
  try {
    const { slug } = await params;
    const apiPath = slug.join('/');

    // Lấy accessToken từ cookie
    const accessToken = request.cookies.get('accessToken')?.value;

    // Build URL cho backend
    const backendUrl = `${BACKEND_URL}/api/${apiPath}`;

    // Lấy query parameters từ request
    const { searchParams } = new URL(request.url);
    const queryString = searchParams.toString();
    const fullUrl = queryString ? `${backendUrl}?${queryString}` : backendUrl;

    // Prepare headers
    const hopByHop = new Set([
      'connection',
      'keep-alive',
      'proxy-authenticate',
      'proxy-authorization',
      'te',
      'trailers',
      'transfer-encoding',
      'upgrade',
    ]);

    const headers: Record<string, string> = {};
    for (const [key, value] of request.headers.entries()) {
      const lower = key.toLowerCase();
      if (hopByHop.has(lower)) continue;
      if (lower === 'host') continue;
      headers[key] = value;
    }

    if (accessToken) {
      headers['Authorization'] = `Bearer ${accessToken}`;
    }

    // Chuẩn bị request options
    const requestOptions: RequestInit = {
      method,
      headers,
      cache: 'no-store',
    };

    // Thêm body cho POST, PUT, PATCH
    if (['POST', 'PUT', 'PATCH'].includes(method)) {
      if (request.body) {
        requestOptions.body = request.body;
        // @ts-expect-error - duplex is needed for streaming body
        requestOptions.duplex = 'half';
      }
    }

    // Gửi request đến backend
    let response = await fetch(fullUrl, requestOptions);

    // Nếu nhận 401 và có requiresRefresh = true, thử refresh token
    if (response.status === 401) {
      try {
        const errorData = await response.json();
        
        if (errorData.requiresRefresh) {
          console.log('🔄 [Proxy] Token expired, attempting refresh...');
          
          // Thử refresh token
          const refreshResult = await refreshAccessToken(request);
          
          if (refreshResult) {
            console.log('✅ [Proxy] Token refreshed successfully, retrying request...');
            
            // Cập nhật accessToken mới
            headers['Authorization'] = `Bearer ${refreshResult.accessToken}`;
            
            // Retry request với token mới
            response = await fetch(fullUrl, {
              ...requestOptions,
              headers,
            });
            
            // Nếu retry thành công, trả về response với cookies mới
            if (response.ok) {
              const respHeaders: Record<string, string> = {};
              for (const [key, value] of response.headers.entries()) {
                const lower = key.toLowerCase();
                if (hopByHop.has(lower)) continue;
                respHeaders[key] = value;
              }
              
              const nextResponse = new NextResponse(response.body, {
                status: response.status,
                headers: respHeaders,
              });
              
              // Set cookies mới
              nextResponse.cookies.set('accessToken', refreshResult.accessToken, {
                httpOnly: true,
                secure: false,
                sameSite: 'lax',
                maxAge: 60 * 15, // 15 phút
                path: '/',
              });
              
              if (refreshResult.refreshToken) {
                nextResponse.cookies.set('refreshToken', refreshResult.refreshToken, {
                  httpOnly: true,
                  secure: false,
                  sameSite: 'lax',
                  maxAge: 60 * 60 * 24 * 7, // 7 ngày
                  path: '/',
                });
              }
              
              return nextResponse;
            }
          } else {
            console.log('❌ [Proxy] Refresh failed (401 from refresh endpoint) → auto logout, clearing cookies');
            
            // Refresh thất bại (refresh token không hợp lệ/hết hạn)
            // → Tự động logout: xóa cookies, không cần gọi backend vì token đã không hợp lệ
            const nextResponse = NextResponse.json(
              { error: 'REFRESH_FAILED', message: 'Session expired. Please login again.' },
              { status: 401 }
            );
            
            nextResponse.cookies.delete('accessToken');
            nextResponse.cookies.delete('refreshToken');
            
            return nextResponse;
          }
        }
        
        // Không phải lỗi requiresRefresh, trả về lỗi gốc
        return NextResponse.json(errorData, { status: 401 });
      } catch {
        // Không parse được JSON, trả về response gốc
        return new NextResponse(response.body, {
          status: response.status,
        });
      }
    }

    // Copy response headers
    const respHeaders: Record<string, string> = {};
    for (const [key, value] of response.headers.entries()) {
      const lower = key.toLowerCase();
      if (hopByHop.has(lower)) continue;
      respHeaders[key] = value;
    }

    return new NextResponse(response.body, {
      status: response.status,
      headers: respHeaders,
    });
  } catch (error) {
    console.error('❌ [Proxy] Error:', error);
    return NextResponse.json(
      { error: 'Có lỗi xảy ra khi gọi API' },
      { status: 500 }
    );
  }
}

// Export các HTTP methods
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ slug: string[] }> }
) {
  return handleRequest(request, 'GET', context.params);
}

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ slug: string[] }> }
) {
  return handleRequest(request, 'POST', context.params);
}

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ slug: string[] }> }
) {
  return handleRequest(request, 'PUT', context.params);
}

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ slug: string[] }> }
) {
  return handleRequest(request, 'PATCH', context.params);
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ slug: string[] }> }
) {
  return handleRequest(request, 'DELETE', context.params);
}

// Disable body parsing để có thể handle raw body (file uploads, etc.)
export const config = {
  api: {
    bodyParser: false,
  },
};
