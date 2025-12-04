import { NextRequest, NextResponse } from 'next/server';

const BACKEND_URL = process.env.SPRING_BACKEND_URL || 'http://localhost:8080';

/**
 * Proxy handler cho tất cả API requests
 * Tự động gắn accessToken từ cookie vào header Authorization
 * 
 * Usage từ client:
 * - GET /api/proxy/products -> GET http://backend:8080/api/products
 * - POST /api/proxy/orders -> POST http://backend:8080/api/orders
 */

async function handleRequest(
  request: NextRequest,
  method: string,
  params: Promise<{ slug: string[] }>
) {
  try {
    const { slug } = await params; // Next.js 15: params is async
    const apiPath = slug.join('/');

    // Lấy accessToken từ cookie
    const accessToken = request.cookies.get('accessToken')?.value;

    // Build URL cho backend
    const backendUrl = `${BACKEND_URL}/api/${apiPath}`;

    // Lấy query parameters từ request
    const { searchParams } = new URL(request.url);
    const queryString = searchParams.toString();
    const fullUrl = queryString ? `${backendUrl}?${queryString}` : backendUrl;

    // Prepare headers - copy most headers from the incoming request, but filter hop-by-hop headers
    // Also, automatically add Authorization header when we have access token.
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
      if (lower === 'host') continue; // backend will set host
      // copy all other headers
      headers[key] = value;
    }

    if (accessToken) {
      headers['Authorization'] = `Bearer ${accessToken}`;
    }

    // Chuẩn bị request options
    const requestOptions: RequestInit = {
      method,
      headers,
      cache: 'no-store', // Disable cache cho proxy
    };

    // Thêm body cho POST, PUT, PATCH
    if (['POST', 'PUT', 'PATCH'].includes(method)) {
      // Stream request body directly to backend
      if (request.body) {
        requestOptions.body = request.body;
        (requestOptions as any).duplex = 'half';
      }
    }

    // DUMB PROXY: Chỉ stream request/response
    const response = await fetch(fullUrl, requestOptions);

    // Copy response headers except hop-by-hop and keep set-cookie so browser can get cookies
    const respHeaders: Record<string, string> = {};
    for (const [key, value] of response.headers.entries()) {
      const lower = key.toLowerCase();
      if (hopByHop.has(lower)) continue;
      // Some servers return multiple set-cookie headers which may need special handling.
      // NextResponse supports 'set-cookie' in headers, but Node's fetch may return multiple values joined.
      respHeaders[key] = value;
    }

    // Make the proxied response as close as possible to backend's response
    return new NextResponse(response.body, {
      status: response.status,
      headers: respHeaders,
    });
  } catch (error) {
    console.error('Proxy error:', error);
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
