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
} from "react-icons/fi";

/**
 * Admin Sidebar - Navigation
 * 
 * Menu điều hướng cho admin panel
 */
export default function AdminSidebar() {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

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
  };

  const menuItems = [
    { href: "/admin/dashboard", label: "Dashboard", icon: "FiHome" },
    { href: "/admin/products", label: "Sản phẩm", icon: "FiPackage" },
    { href: "/admin/inventory/low-stock", label: "Kho hàng", icon: "FiBox" },
    { href: "/admin/orders", label: "Đơn hàng", icon: "FiShoppingCart" },
    { href: "/admin/categories", label: "Danh mục", icon: "FiList" },
    { href: "/admin/brands", label: "Thương hiệu", icon: "FiTag" },
    { href: "/admin/users", label: "Người dùng", icon: "FiUsers" },
    { href: "/admin/promotions", label: "Khuyến mãi", icon: "FiTag" },
    { href: "/admin/settings", label: "Cài đặt", icon: "FiSettings" },
  ];

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
          {menuItems.map((item) => {
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
