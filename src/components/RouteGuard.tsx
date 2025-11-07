"use client";
import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuthContext, UserRole } from '@/contexts/AuthContext';
import UnauthorizedContent from '@/components/UnauthorizedContent';

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

  // Debug log
  console.log('[RouteGuard]', { pathname, isLoading, hasUser: !!user });

  useEffect(() => {
    // Chỉ chờ loading nếu CHƯA có user data
    if (isLoading && !user) return;

    // Redirect nếu requireAuth và chưa login
    if (requireAuth && !user) {
      const redirect = redirectTo || `/login?redirect=${encodeURIComponent(pathname)}`;
      router.push(redirect);
      return;
    }

    // Redirect nếu requireGuest nhưng đã login
    if (requireGuest && user) {
      const redirect = redirectTo || '/';
      router.push(redirect);
      return;
    }

    // Không redirect nếu thiếu quyền - đã render UnauthorizedContent
  }, [user, isLoading, requireAuth, requireGuest, redirectTo, pathname, router]);

  // Chỉ hiển thị fallback nếu loading VÀ chưa có user
  if (isLoading && !user) {
    return <>{fallback}</>;
  }

  // Nếu đã có user data → check roles ngay
  // Check requireAuth
  if (requireAuth && !user) {
    // Chưa login → redirect về login (useEffect sẽ xử lý)
    return null;
  }

  // Check requireGuest
  if (requireGuest && user) {
    // Đã login nhưng vào trang guest → redirect (useEffect sẽ xử lý)
    return null;
  }

  // Check requiredRoles
  if (requiredRoles.length > 0) {
    if (!user) {
      // Chưa login → redirect về login
      return null;
    }
    
    const hasRequiredRole = requiredRoles.some(role => hasRole(role));
    if (!hasRequiredRole) {
      // Không có quyền → hiển thị unauthorized page ngay
      return <UnauthorizedContent />;
    }
  }

  // Pass tất cả checks → render children ngay
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
