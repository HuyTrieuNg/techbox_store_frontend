"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FiBox,
  FiArrowUp,
  FiArrowDown,
  FiTrendingUp,
  FiFileText,
  FiSettings
} from "react-icons/fi";

export default function InventoryLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const menuItems = [
    { href: "/admin/inventory/supplier", label: "Nhà cung cấp", icon: FiBox },
    { href: "/admin/inventory/adjustment", label: "Kiểm kho", icon: FiSettings },
    { href: "/admin/inventory/export", label: "Xuất", icon: FiArrowUp },
    { href: "/admin/inventory/import", label: "Nhập", icon: FiArrowDown },
    { href: "/admin/inventory/report", label: "Báo cáo", icon: FiFileText },
  ];

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Inventory Navigation */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-4">
          <FiBox className="w-6 h-6 text-blue-600" />
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Quản lý kho hàng</h1>
        </div>

        <nav className="flex flex-wrap gap-2 p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          {menuItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = pathname.startsWith(item.href);

            return (
              <Link key={item.href} href={item.href}>
                <div className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                    : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}>
                  <IconComponent className="w-4 h-4" />
                  {item.label}
                </div>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Page Content */}
      {children}
    </div>
  );
}
