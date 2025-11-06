"use client";
import { createContext, useContext, ReactNode } from "react";
import useSWR from "swr";
import { LoginPayload, RegisterPayload } from "../features/auth";
import axios from 'axios';
import { api } from '@/lib/axios'; // ✨ Import axios instance
import { 
  getRedirectPathByRole, 
  hasRole as checkRole, 
  isAdmin as checkIsAdmin,
  isStaff as checkIsStaff,
  isCustomer as checkIsCustomer,
  type UserRole 
} from '../utils/auth';

// Re-export UserRole type for convenience
export type { UserRole };

interface User {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  authenticated: boolean;
  roles: string[]; // Array of roles từ backend
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isError: boolean;
  handleLogin: (payload: LoginPayload) => Promise<{ user: User | null }>;
  handleRegister: (payload: RegisterPayload) => Promise<void>;
  handleLogout: () => Promise<void>;
  mutateUser: () => void;
  // Helper functions để check roles
  hasRole: (role: UserRole) => boolean;
  isAdmin: () => boolean;
  isStaff: () => boolean;
  isCustomer: () => boolean;
  // Get redirect path based on user role
  getDefaultRedirectPath: () => string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Fetcher cho useSWR - sử dụng axios
const fetcher = async (url: string): Promise<User | null> => {
  try {
    // ✅ Sử dụng axios instance - tự động handle response.data
    const data = await api.get<User>(url);
    return data;
  } catch (error: any) {
    const status = error.response?.status;
    
    // 401 Unauthorized hoặc 403 Forbidden → User chưa đăng nhập
    if (status === 401 || status === 403) {
      return null;
    }
    
    // Các lỗi khác → throw để SWR handle
    throw error;
  }
};

interface AuthProviderProps {
  children: ReactNode;
  initialData?: User | null; // ✨ Data từ server (SSR)
}

export function AuthProvider({ children, initialData }: AuthProviderProps) {
  // Sử dụng useSWR để fetch user data qua proxy
  // ✅ KHÔNG cần /api/proxy prefix vì axios instance đã có baseURL
  const { data: user, error, mutate, isLoading } = useSWR<User | null>(
    '/users/me',  // ← Chỉ cần path, baseURL sẽ tự thêm /api/proxy
    fetcher,
    {
      fallbackData: initialData, // ✨ Dùng data từ server nếu có
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      shouldRetryOnError: false,
      // Nếu có initialData từ server → không fetch lại ngay lập tức
      revalidateOnMount: !initialData,
    }
  );

  const handleLogin = async (payload: LoginPayload) => {
    try {
      console.log('🔐 [Login] Starting login...');
      
      // 1. Call login API - dùng axios thông thường cho login route
      const { data } = await axios.post('/api/auth/login', payload, {
        withCredentials: true,
      });
      console.log('✅ [Login] Login API success:', data);
      
      // 2. Revalidate user data và lấy kết quả trực tiếp
      console.log('🔄 [Login] Revalidating user data...');
      const freshUser = await mutate();
      
      console.log('✅ [Login] Login successful, fresh user data:', freshUser);
      
      // 3. Return fresh user (handle undefined case)
      return { user: freshUser || null };
    } catch (error: any) {
      console.error('❌ [Login] Login error:', error);
      const errorMessage = error.response?.data?.error || 'Đăng nhập thất bại';
      throw new Error(errorMessage);
    }
  };

  const handleRegister = async (payload: RegisterPayload): Promise<void> => {
    try {
      // ✅ Sử dụng api instance từ @/lib/axios
      await api.post('/auth/register', payload);
    } catch (error: any) {
      console.error('Register error:', error);
      const errorMessage = error.response?.data?.error || 'Đăng ký thất bại';
      throw new Error(errorMessage);
    }
  };

  const handleLogout = async () => {
    try {
      console.log('🚪 [Logout] Starting logout...');
      
      // Call logout API để xóa cookies
      await axios.post('/api/auth/logout', {}, {
        withCredentials: true,
      });
      
      console.log('✅ [Logout] Cookies cleared');

      // Clear user data trong SWR cache
      await mutate(null, false);
      
      console.log('✅ [Logout] User data cleared');
    } catch (error) {
      console.error('❌ [Logout] Logout error:', error);
      // Vẫn clear user data ngay cả khi API fail
      await mutate(null, false);
    }
  };

  // Helper functions để check roles (wrap utils functions)
  const hasRole = (role: UserRole): boolean => {
    return checkRole(user, role);
  };

  const isAdmin = (): boolean => {
    return checkIsAdmin(user);
  };

  const isStaff = (): boolean => {
    return checkIsStaff(user);
  };

  const isCustomer = (): boolean => {
    return checkIsCustomer(user);
  };

  /**
   * Lấy redirect path mặc định theo role của user
   * Sử dụng helper function từ utils
   */
  const getDefaultRedirectPath = (): string => {
    return getRedirectPathByRole(user);
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user: user || null, 
        isLoading,
        isError: !!error,
        handleLogin, 
        handleRegister, 
        handleLogout,
        mutateUser: mutate,
        hasRole,
        isAdmin,
        isStaff,
        isCustomer,
        getDefaultRedirectPath,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Hook tiện lợi
export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuthContext must be used within AuthProvider");
  return context;
};