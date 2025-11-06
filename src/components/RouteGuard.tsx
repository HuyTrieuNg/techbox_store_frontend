"use client";
import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuthContext, UserRole } from '@/contexts/AuthContext';

interface RouteGuardProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  requireGuest?: boolean;
  requiredRoles?: UserRole[]; // Roles cần thiết để access
  redirectTo?: string;
  fallback?: React.ReactNode;
}

/**
 * RouteGuard Component
 * 
 * Bảo vệ routes dựa trên authentication và roles
 * 
 * @param requireAuth - Route yêu cầu phải đăng nhập
 * @param requireGuest - Route chỉ dành cho người chưa đăng nhập
 * @param requiredRoles - Danh sách roles được phép truy cập
 * @param redirectTo - URL để redirect khi không đủ quyền
 * @param fallback - Component hiển thị trong lúc loading
 */
export default function RouteGuard({
  children,
  requireAuth = false,
  requireGuest = false,
  requiredRoles = [],
  redirectTo,
  fallback = <div className="flex items-center justify-center min-h-screen">Đang tải...</div>,
}: RouteGuardProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, isLoading, hasRole } = useAuthContext();

  useEffect(() => {
    // Chờ loading xong
    if (isLoading) return;

    // Kiểm tra requireAuth
    if (requireAuth && !user) {
      const redirect = redirectTo || `/login?redirect=${encodeURIComponent(pathname)}`;
      router.push(redirect);
      return;
    }

    // Kiểm tra requireGuest
    if (requireGuest && user) {
      const redirect = redirectTo || '/';
      router.push(redirect);
      return;
    }

    // Kiểm tra requiredRoles
    if (requiredRoles.length > 0 && user) {
      const hasRequiredRole = requiredRoles.some(role => hasRole(role));
      if (!hasRequiredRole) {
        const redirect = redirectTo || '/unauthorized';
        router.push(redirect);
        return;
      }
    }
  }, [user, isLoading, requireAuth, requireGuest, requiredRoles, redirectTo, pathname, router, hasRole]);

  // Hiển thị fallback trong lúc loading
  if (isLoading) {
    return <>{fallback}</>;
  }

  // Kiểm tra điều kiện trước khi render children
  if (requireAuth && !user) {
    return <>{fallback}</>;
  }

  if (requireGuest && user) {
    return <>{fallback}</>;
  }

  // Kiểm tra roles
  if (requiredRoles.length > 0 && user) {
    const hasRequiredRole = requiredRoles.some(role => hasRole(role));
    if (!hasRequiredRole) {
      return <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Không có quyền truy cập</h1>
          <p className="text-gray-600">Bạn không có quyền truy cập trang này.</p>
        </div>
      </div>;
    }
  }

  return <>{children}</>;
}

/**
 * Hook để kiểm tra quyền truy cập
 */
export function useRouteGuard() {
  const { user, isLoading, hasRole, isAdmin, isStaff, isCustomer } = useAuthContext();
  const router = useRouter();
  const pathname = usePathname();

  const requireAuth = (redirectTo?: string) => {
    if (isLoading) return false;
    
    if (!user) {
      const redirect = redirectTo || `/login?redirect=${encodeURIComponent(pathname)}`;
      router.push(redirect);
      return false;
    }
    
    return true;
  };

  const requireGuest = (redirectTo?: string) => {
    if (isLoading) return false;
    
    if (user) {
      const redirect = redirectTo || '/';
      router.push(redirect);
      return false;
    }
    
    return true;
  };

  const requireRole = (role: UserRole, redirectTo?: string) => {
    if (isLoading) return false;
    
    if (!user) {
      const redirect = redirectTo || `/login?redirect=${encodeURIComponent(pathname)}`;
      router.push(redirect);
      return false;
    }
    
    if (!hasRole(role)) {
      const redirect = redirectTo || '/unauthorized';
      router.push(redirect);
      return false;
    }
    
    return true;
  };

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
    requireAuth,
    requireGuest,
    requireRole,
    hasRole,
    isAdmin: isAdmin(),
    isStaff: isStaff(),
    isCustomer: isCustomer(),
  };
}
