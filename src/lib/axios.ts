/**
 * Axios Instance - Pattern 1: Client Component API calls
 * 
 * Auto features:
 * - Send cookies (withCredentials: true)
 * - Prefix all URLs with /api/proxy
 * - Extract response.data automatically
 * - Type-safe with generics
 */

import axios from 'axios';
import { toast } from 'sonner';

const axiosInstance = axios.create({
  baseURL: '/api/proxy',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000, // 30 seconds default timeout
});

// Separate instance for file uploads with longer timeout
export const axiosUploadInstance = axios.create({
  baseURL: '/api/proxy',
  withCredentials: true,
  timeout: 120000, // 2 minutes for uploads
});

// Request logging
axiosInstance.interceptors.request.use(
  (config) => {
    console.log(`[Axios] ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => Promise.reject(error)
);

// Auto extract response.data
axiosInstance.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response) {
      const { status, config } = error.response;
      
      // Không log 401/403 cho các endpoint này (normal behavior)
      const silentEndpoints = ['/users/me'];
      const shouldSilent = (status === 401 || status === 403) && 
                           silentEndpoints.some(endpoint => config?.url?.includes(endpoint));
      
      if (!shouldSilent) {
        console.error(`[Axios] Error ${status}`, config?.url);
        toast.error(`Lỗi ${status}: ${error.response.data?.message || 'Có lỗi xảy ra'}`);
      }
    } else if (error.request) {
      console.error('[Axios] No response from server');
      toast.error('Không thể kết nối đến server');
    } else {
      console.error('[Axios] Error:', error.message);
      toast.error('Có lỗi xảy ra');
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;

// Typed helpers
export const api = {
  get: <T>(url: string, config?: any) => 
    axiosInstance.get<any, T>(url, config),
  
  post: <T>(url: string, data?: any, config?: any) => 
    axiosInstance.post<any, T>(url, data, config),
  
  put: <T>(url: string, data?: any, config?: any) => 
    axiosInstance.put<any, T>(url, data, config),
  
  patch: <T>(url: string, data?: any, config?: any) => 
    axiosInstance.patch<any, T>(url, data, config),
  
  delete: <T>(url: string, config?: any) => 
    axiosInstance.delete<any, T>(url, config),
};
