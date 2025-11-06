"use client";

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
  FiBox
} from "react-icons/fi";

/**
 * Admin Sidebar - Navigation
 * 
 * Menu điều hướng cho admin panel
 */
export default function AdminSidebar() {
  const pathname = usePathname();

  const menuItems = [
    { href: "/admin", label: "Dashboard", icon: FiHome },
    { href: "/admin/products", label: "Sản phẩm", icon: FiPackage },
    { href: "/admin/categories", label: "Danh mục", icon: FiGrid },
    { href: "/admin/orders", label: "Đơn hàng", icon: FiShoppingCart },
    { href: "/admin/users", label: "Người dùng", icon: FiUsers },
    { href: "/admin/reports", label: "Báo cáo", icon: FiBarChart2 },
    { href: "/admin/inventory", label: "Kho hàng", icon: FiBox },
    { href: "/admin/settings", label: "Cài đặt", icon: FiSettings },
  ];

  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-gray-900 text-white shadow-lg z-40">
      {/* Logo */}
      <div className="flex items-center justify-center h-16 border-b border-gray-800">
        <h1 className="text-xl font-bold">Admin Panel</h1>
      </div>

      {/* Menu */}
      <nav className="mt-6">
        <ul className="space-y-1 px-3">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-lg
                    transition-colors duration-200
                    ${isActive 
                      ? 'bg-blue-600 text-white' 
                      : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                    }
                  `}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
