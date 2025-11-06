"use client";

import { useAuthContext } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface AdminGuardProps {
  children: React.ReactNode;
}

/**
 * Admin Guard - Client Component
 * 
 * Kiểm tra quyền admin trước khi cho phép truy cập
 * - Chưa login → redirect /login
 * - Đã login nhưng không phải admin → redirect /unauthorized
 * - Admin → render children
 */
export default function AdminGuard({ children }: AdminGuardProps) {
  const { user, isLoading, isAdmin } = useAuthContext();
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    if (!isLoading) {
      // Chưa login → redirect login
      if (!user) {
        router.push('/login?redirect=/admin');
        return;
      }

      // Đã login nhưng không phải admin → redirect unauthorized
      if (!isAdmin()) {
        router.push('/unauthorized');
        return;
      }

      // Admin → cho phép truy cập
      setIsChecking(false);
    }
  }, [user, isLoading, isAdmin, router]);

  // Loading state
  if (isLoading || isChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Đang kiểm tra quyền truy cập...</p>
        </div>
      </div>
    );
  }

  // Render children nếu pass tất cả checks
  return <>{children}</>;
}
