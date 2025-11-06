import { NextRequest, NextResponse } from 'next/server';

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

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

    // Chuẩn bị headers - KHÔNG set Content-Type mặc định
    const headers: HeadersInit = {};

    // Tự động gắn token nếu có
    if (accessToken) {
      headers['Authorization'] = `Bearer ${accessToken}`;
    }

    // Copy Content-Type từ request (quan trọng cho FormData)
    const contentType = request.headers.get('content-type');
    if (contentType) {
      headers['Content-Type'] = contentType;
    }

    // Chuẩn bị request options
    const requestOptions: RequestInit = {
      method,
      headers,
      cache: 'no-store', // ✅ Disable cache cho proxy
    };

    // Thêm body cho POST, PUT, PATCH
    if (['POST', 'PUT', 'PATCH'].includes(method)) {
      try {
        const contentType = request.headers.get('content-type') || '';
        
        if (contentType.includes('multipart/form-data')) {
          // ✅ FormData: Pass directly
          requestOptions.body = await request.formData() as any;
          // Remove Content-Type để browser tự set với boundary
          delete (headers as any)['Content-Type'];
        } else {
          // ✅ JSON/Text: Parse as text
          const body = await request.text();
          if (body) {
            requestOptions.body = body;
          }
        }
      } catch (error) {
        console.error('Error reading request body:', error);
      }
    }

    // 🚀 DUMB PROXY: Chỉ stream request/response
    // Token đã được refresh bởi Middleware (nếu cần)
    const response = await fetch(fullUrl, requestOptions);

    // ✅ Stream response trực tiếp (không buffer, không retry)
    // Middleware đã đảm bảo token valid, nên không cần xử lý 401
    return new NextResponse(response.body, {
      status: response.status,
      headers: {
        'Content-Type': response.headers.get('Content-Type') || 'application/json',
      },
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
