import { ReactNode } from "react";
import AdminGuard from "@/components/admin/AdminGuard";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";

/**
 * Admin Layout - Server Component
 * 
 * Layout cho tất cả trang admin
 * - AdminGuard: Kiểm tra quyền admin (client component)
 * - AdminSidebar: Navigation bên trái
 * - AdminHeader: Header phía trên
 * - Main: Content area
 */
export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <AdminGuard>
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
    </AdminGuard>
  );
}
