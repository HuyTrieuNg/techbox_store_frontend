"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  FiHome, 
  FiPackage, 
  FiShoppingCart, 
  FiBox,
  FiClipboard
} from "react-icons/fi";

/**
 * Staff Sidebar - Navigation cho nhân viên
 * 
 * Menu đơn giản hơn admin, chỉ các chức năng cơ bản
 */
export default function StaffSidebar() {
  const pathname = usePathname();

  const menuItems = [
    { href: "/staff/dashboard", label: "Tổng quan", icon: FiHome },
    { href: "/staff/orders", label: "Đơn hàng", icon: FiShoppingCart },
    { href: "/staff/inventory", label: "Kho hàng", icon: FiBox },
  ];

  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-green-900 text-white shadow-lg z-40">
      {/* Logo */}
      <div className="flex items-center justify-center h-16 border-b border-green-800">
        <h1 className="text-xl font-bold">Staff Panel</h1>
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
                      ? 'bg-green-600 text-white' 
                      : 'text-gray-300 hover:bg-green-800 hover:text-white'
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
