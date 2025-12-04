
/**
 * Server-Side Fetcher - Pattern 3
 * 
 * For Server Components to call authenticated APIs directly to backend.
 * Middleware validates/refreshes token before this runs.
 * 
 * @see docs/API_CALLING_PATTERNS.md
 */

import { cookies } from 'next/headers';

const BACKEND_URL = process.env.SPRING_BACKEND_URL || 'http://localhost:8000';

interface FetchOptions extends RequestInit {
  requireAuth?: boolean;
}

export async function serverFetch<T>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<T | null> {
  const { requireAuth = true, headers = {}, ...restOptions } = options;

  const url = endpoint.startsWith('http') 
    ? endpoint 
    : `${BACKEND_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;

  const cookieStore = await cookies();
  const accessToken = cookieStore.get('access_token')?.value;

  if (requireAuth && !accessToken) {
    return null;
  }

  const fetchHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(headers as Record<string, string>),
  };

  if (accessToken) {
    fetchHeaders['Authorization'] = `Bearer ${accessToken}`;
  }

  const response = await fetch(url, {
    ...restOptions,
    headers: fetchHeaders,
  });

  // Not authenticated
  if (response.status === 401 || response.status === 403) {
    return null;
  }

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  return response.json();
}

export const serverApi = {
  get: <T>(endpoint: string, options: FetchOptions = {}) => 
    serverFetch<T>(endpoint, { ...options, method: 'GET' }),

  post: <T>(endpoint: string, data?: unknown, options: FetchOptions = {}) => 
    serverFetch<T>(endpoint, {
      ...options,
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    }),

  put: <T>(endpoint: string, data?: unknown, options: FetchOptions = {}) => 
    serverFetch<T>(endpoint, {
      ...options,
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    }),

  patch: <T>(endpoint: string, data?: unknown, options: FetchOptions = {}) => 
    serverFetch<T>(endpoint, {
      ...options,
      method: 'PATCH',
      body: data ? JSON.stringify(data) : undefined,
    }),

  delete: <T>(endpoint: string, options: FetchOptions = {}) => 
    serverFetch<T>(endpoint, { ...options, method: 'DELETE' }),
};
