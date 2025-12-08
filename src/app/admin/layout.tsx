import { ReactNode } from "react";
import RouteGuard from "@/components/RouteGuard";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";
import { Toaster } from "@/components/UI/sonner";

/**
 * Admin Layout - Server Component
 * 
 * Layout cho tất cả trang admin
 * - RouteGuard: Chặn ROLE_CUSTOMER, cho phép tất cả role khác (ADMIN, STAFF, custom roles)
 * - AdminSidebar: Navigation bên trái
 * - AdminHeader: Header phía trên
 * - Main: Content area
 */
export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <RouteGuard
      requireAuth
      excludeRoles={['ROLE_CUSTOMER']}
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Đang kiểm tra quyền truy cập...</p>
          </div>
        </div>
      }
    >
    <div className="flex h-screen overflow-hidden bg-gray-50 dark:bg-gray-900">
      {/* Sidebar - Fixed bên trái */}
      <AdminSidebar />

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 overflow-auto">
        <div className=" mx-auto w-full">
          {/* Header - Sticky top */}
          <AdminHeader />

          {/* Page Content */}
          <main className="p-6">
            {children}
          </main>
        </div>

      </div>
    </div>
      <Toaster />
    </RouteGuard>
  );
}
