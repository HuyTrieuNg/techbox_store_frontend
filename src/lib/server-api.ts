/**
 * Server-side API utility
 * 
 * Sử dụng trong Server Components để gọi API với cookies từ request headers
 * 
 * ⚠️ CHỈ dùng trong Server Components (async function trong app directory)
 * ❌ KHÔNG dùng trong Client Components (có "use client")
 */

import { cookies } from 'next/headers';

const API_BASE_URL = (process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080') + '/api';

/**
 * Fetch API từ server component với cookies
 * 
 * @example
 * ```tsx
 * // app/layout.tsx (Server Component)
 * import { serverApi } from '@/lib/server-api';
 * 
 * export default async function RootLayout() {
 *   const user = await serverApi.get('/users/me');
 *   return <AuthProvider initialData={user}>...</AuthProvider>
 * }
 * ```
 */
export const serverApi = {
  /**
   * GET request từ server
   */
  async get<T>(endpoint: string): Promise<T | null> {
    try {
      const cookieStore = await cookies();
      const accessToken = cookieStore.get('accessToken')?.value;
      
      // Nếu không có token → return null (user chưa login)
      if (!accessToken) {
        console.log(`[ServerAPI] No access token, skipping ${endpoint}`);
        return null;
      }

      const url = `${API_BASE_URL}${endpoint}`;
      console.log(`[ServerAPI] GET ${url}`);

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        credentials: 'include',
        cache: 'no-store', // Không cache để luôn lấy fresh data
      });

      // 401/403 → User chưa login hoặc token expired
      if (response.status === 401 || response.status === 403) {
        console.log(`[ServerAPI] Unauthorized (${response.status}) for ${url}`);
        return null;
      }

      // Các lỗi khác
      if (!response.ok) {
        console.error(`[ServerAPI] Error ${response.status}: ${response.statusText} | URL: ${url} | Method: GET | Has Token: ${!!accessToken}`);
        // Return null thay vì throw để tránh bị catch block log lại lần 2
        return null;
      }

      const data = await response.json();
      console.log(`[ServerAPI] Success:`, data);
      return data;

    } catch (error) {
      // Chỉ log exception thật sự (network error, JSON parse error, etc.)
      const errorMsg = error instanceof Error ? error.message : String(error);
      console.error(`[ServerAPI] Exception in ${endpoint} | URL: ${API_BASE_URL}${endpoint} | Error: ${errorMsg}`);
      // Return null thay vì throw để avoid crash page
      return null;
    }
  },
};
