import { ReactNode } from "react";
import RouteGuard from "@/components/RouteGuard";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";

/**
 * Admin Layout - Server Component
 * 
 * Layout cho tất cả trang admin
 * - RouteGuard: Kiểm tra quyền ROLE_ADMIN
 * - AdminSidebar: Navigation bên trái
 * - AdminHeader: Header phía trên
 * - Main: Content area
 */
export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <RouteGuard
      requireAuth
      requiredRoles={['ROLE_ADMIN']}
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Đang kiểm tra quyền truy cập...</p>
          </div>
        </div>
      }
    >
      <div className="flex min-h-screen bg-gray-100">
        {/* Sidebar - Fixed bên trái */}
        <AdminSidebar />

        {/* Main Content Area */}
        <div className="flex-1 ml-64">
          {/* Header - Sticky top */}
          <AdminHeader />

          {/* Page Content */}
          <main className="p-6">
            {children}
          </main>
        </div>
      </div>
    </RouteGuard>
  );
}
