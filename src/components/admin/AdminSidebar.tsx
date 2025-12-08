"use client";

import { useState } from "react";
import { Bell, DollarSign, House, Info, Mail, Menu, Settings, ShoppingBag, ShoppingCart, Users } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FiHome,
  FiPackage,
  FiShoppingCart,
  FiUsers,
  FiBarChart2,
  FiSettings,
  FiGrid,
  FiBox,
  FiList,
  FiTag,
  FiShield,
} from "react-icons/fi";
import { useAuthorities } from "@/hooks/useAuthorities";

/**
 * Admin Sidebar - Navigation
 * 
 * Menu điều hướng cho admin panel
 */
export default function AdminSidebar() {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { authorities } = useAuthorities();

  const ICONS = {
    FiHome,
    FiPackage,
    FiShoppingCart,
    FiUsers,
    FiBarChart2,
    FiSettings,
    FiGrid,
    FiBox,
    FiList,
    FiTag,
    FiShield,
  };

  const menuItems = [
    { href: "/admin/dashboard", label: "Dashboard", icon: "FiHome", module: null, adminOnly: true },
    { href: "/admin/products", label: "Sản phẩm", icon: "FiPackage", module: "PRODUCT" },
    { href: "/admin/inventory/low-stock", label: "Kho hàng", icon: "FiBox", module: "INVENTORY" },
    { href: "/admin/orders", label: "Đơn hàng", icon: "FiShoppingCart", module: "ORDER" },
    { href: "/admin/categories", label: "Danh mục", icon: "FiList", module: "PRODUCT", requiredPermissions: ["PRODUCT:READ", "PRODUCT:WRITE", "PRODUCT:UPDATE"] },
    { href: "/admin/brands", label: "Thương hiệu", icon: "FiTag", module: "PRODUCT", requiredPermissions: ["PRODUCT:READ", "PRODUCT:WRITE", "PRODUCT:UPDATE"] },
    { href: "/admin/users", label: "Người dùng", icon: "FiUsers", module: "USER" },
    { href: "/admin/roles", label: "Vai trò & Quyền", icon: "FiShield", module: null, adminOnly: true },
    { href: "/admin/promotions", label: "Khuyến mãi", icon: "FiTag", module: "PROMOTION" },
    { href: "/admin/settings", label: "Cài đặt", icon: "FiSettings", module: null, adminOnly: true },
  ];

  const filteredMenuItems = menuItems.filter(item => {
    // Nếu item yêu cầu adminOnly, chỉ hiện cho ROLE_ADMIN
    if (item.adminOnly && !authorities?.roles?.includes('ROLE_ADMIN')) {
      return false;
    }
    
    // Nếu có requiredPermissions, kiểm tra xem user có ít nhất 1 trong các quyền đó
    if (item.requiredPermissions && item.requiredPermissions.length > 0) {
      const hasAnyPermission = item.requiredPermissions.some(
        permission => authorities?.permissions?.includes(permission)
      );
      if (!hasAnyPermission) return false;
    }
    
    // Nếu không có module (free access) và không adminOnly
    if (!item.module) return true;
    
    // Nếu là admin thì hiện tất cả
    if (authorities?.roles?.includes('ROLE_ADMIN')) return true;
    
    // Check module permission
    return authorities?.accessibleModules?.includes(item.module);
  });

  return (
    <div
      className={`relative z-10 transition-all duration-300 ease-in-out flex-shrink-0 text-gray-900 dark:text-white ${isSidebarOpen ? 'w-64' : 'w-20'
        }`}
    >
      <div className="h-full bg-white dark:bg-gray-800 backdrop-blur-md p-4 flex flex-col border-r border-gray-200 dark:border-gray-700">
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors max-w-fit cursor-pointer">
          <Menu size={24} />
        </button>
        <nav className="mt-8 flex-grow">
          {filteredMenuItems.map((item) => {
            const IconComponent = ICONS[item.icon as keyof typeof ICONS];

            if (!IconComponent) return null;

            return (
              <Link key={item.label} href={item.href}>
                <div className={`flex items-center p-4 text-sm font-medium rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors mb-2 ${pathname === item.href ? 'bg-gray-100 dark:bg-gray-700' : ''
                  }`}>
                  <IconComponent size={20} style={{ minWidth: "20px" }} />
                  {isSidebarOpen && <span className="ml-4 whitespace-nowrap">{item.label}</span>}
                </div>
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
};
