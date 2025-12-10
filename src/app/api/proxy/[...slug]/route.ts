import { NextRequest, NextResponse } from 'next/server';

const BACKEND_URL = process.env.SPRING_BACKEND_URL || 'http://localhost:8080';
const COOKIE_EXPIRY = parseInt(process.env.COOKIE_EXPIRY || '2592000', 10);

/**
 * Proxy handler cho tất cả API requests
 * Tự động gắn accessToken từ cookie vào header Authorization
 * Tự động refresh token khi nhận 401 từ backend
 * 
 * Usage từ client:
 * - GET /api/proxy/products -> GET http://backend:8080/api/products
 * - POST /api/proxy/orders -> POST http://backend:8080/api/orders
 */

// In-memory lock để prevent concurrent refresh attempts
// Key: refreshToken, Value: Promise đang refresh
const refreshLocks = new Map<string, Promise<{ accessToken: string; refreshToken?: string } | null>>();

// Cache tokens mới sau khi refresh thành công
// Key: old refreshToken, Value: { accessToken, refreshToken (new), expiresAt }
interface TokenCache {
  accessToken: string;
  refreshToken?: string;
  expiresAt: number; // timestamp khi cache hết hạn
}
const tokenCache = new Map<string, TokenCache>();

// Clean up expired cache entries mỗi 5 phút
setInterval(() => {
  const now = Date.now();
  for (const [key, value] of tokenCache.entries()) {
    if (value.expiresAt < now) {
      tokenCache.delete(key);
    }
  }
}, 5 * 60 * 1000);

/**
 * Refresh access token bằng cách gọi internal refresh endpoint
 * Returns null nếu refresh thất bại (401) → trigger logout
 * Sử dụng lock để prevent race condition khi nhiều requests cùng refresh
 */
async function refreshAccessToken(request: NextRequest): Promise<{ accessToken: string; refreshToken?: string } | null> {
  const currentRefreshToken = request.cookies.get('refreshToken')?.value;
  if (!currentRefreshToken) {
    console.log('⚠️ [Proxy] No refresh token found in cookies');
    return null;
  }

  // Kiểm tra cache trước - nếu token này đã được refresh gần đây
  const cached = tokenCache.get(currentRefreshToken);
  if (cached && cached.expiresAt > Date.now()) {
    console.log('💾 [Proxy] Using cached tokens from recent refresh');
    return {
      accessToken: cached.accessToken,
      refreshToken: cached.refreshToken,
    };
  }

  // Kiểm tra xem có refresh request nào đang chạy với token này không
  const existingRefresh = refreshLocks.get(currentRefreshToken);
  if (existingRefresh) {
    console.log('⏳ [Proxy] Refresh already in progress, waiting for result...');
    return existingRefresh;
  }

  // Tạo promise cho refresh request này
  const refreshPromise = (async () => {
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
      const setCookieHeader = response.headers.get('set-cookie') || '';
      const accessTokenCookie = setCookieHeader.match(/accessToken=([^;]+)/)?.[1];
      const refreshTokenCookie = setCookieHeader.match(/refreshToken=([^;]+)/)?.[1];
      
      if (!accessTokenCookie) return null;

      const newTokens = {
        accessToken: accessTokenCookie,
        refreshToken: refreshTokenCookie,
      };

      // Cache tokens mới để các requests đang chờ có thể dùng
      // Cache trong 5 giây (đủ để các concurrent requests dùng chung)
      tokenCache.set(currentRefreshToken, {
        ...newTokens,
        expiresAt: Date.now() + 5000,
      });

      // Nếu có refresh token mới, cũng cache với key mới
      if (refreshTokenCookie) {
        tokenCache.set(refreshTokenCookie, {
          ...newTokens,
          expiresAt: Date.now() + 5000,
        });
      }

      return newTokens;
    } catch (error) {
      console.error('❌ [Proxy] Refresh token failed:', error);
      // Xóa cache nếu có lỗi
      tokenCache.delete(currentRefreshToken);
      return null;
    } finally {
      // Clean up lock sau khi hoàn thành (success hoặc fail)
      refreshLocks.delete(currentRefreshToken);
    }
  })();

  // Lưu promise vào lock map
  refreshLocks.set(currentRefreshToken, refreshPromise);

  return refreshPromise;
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

    // Cache body content để có thể retry
    let bodyContent: BodyInit | null = null;
    if (['POST', 'PUT', 'PATCH'].includes(method) && request.body) {
      // Đọc và cache body content
      const reader = request.body.getReader();
      const chunks: Uint8Array[] = [];
      let totalLength = 0;
      
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        chunks.push(value);
        totalLength += value.length;
      }
      
      // Combine chunks thành single Uint8Array
      const combinedArray = new Uint8Array(totalLength);
      let offset = 0;
      for (const chunk of chunks) {
        combinedArray.set(chunk, offset);
        offset += chunk.length;
      }
      
      bodyContent = combinedArray;
    }

    // Chuẩn bị request options
    const requestOptions: RequestInit = {
      method,
      headers,
      cache: 'no-store',
    };

    // Thêm body cho POST, PUT, PATCH
    if (bodyContent) {
      requestOptions.body = bodyContent;
    }

    // Gửi request đến backend
    let response = await fetch(fullUrl, requestOptions);

    // Nếu nhận 401 và có requiresRefresh = true, thử refresh token
    if (response.status === 401) {
      // Clone response để tránh body bị consume
      const clonedResponse = response.clone();
      
      try {
        const errorData = await clonedResponse.json();
        console.log('🔍 [Proxy] 401 Response body:', JSON.stringify(errorData, null, 2));
        
        if (errorData.requiresRefresh === true) {
          console.log('🔄 [Proxy] Token expired (requiresRefresh=true), attempting refresh...');
          
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
            if (response.ok || response.status !== 401) {
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
                maxAge: COOKIE_EXPIRY,
                path: '/',
              });
              
              if (refreshResult.refreshToken) {
                nextResponse.cookies.set('refreshToken', refreshResult.refreshToken, {
                  httpOnly: true,
                  secure: false,
                  sameSite: 'lax',
                  maxAge: COOKIE_EXPIRY,
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
              { error: 'REFRESH_FAILED', message: 'Session expired. Please login again.', shouldRedirect: true },
              { status: 401 }
            );
            
            nextResponse.cookies.delete('accessToken');
            nextResponse.cookies.delete('refreshToken');
            
            return nextResponse;
          }
        } else {
          console.log('ℹ️ [Proxy] 401 without requiresRefresh, returning original error');
        }
        
        // Không phải lỗi requiresRefresh, trả về lỗi gốc
        return NextResponse.json(errorData, { status: 401 });
      } catch (parseError) {
        console.error('⚠️ [Proxy] Cannot parse 401 response as JSON:', parseError);
        // Không parse được JSON, trả về response gốc (sử dụng response chưa bị consume)
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
