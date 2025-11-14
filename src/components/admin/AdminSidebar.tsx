"use client";

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

  const menuItems = [
    { href: "/admin/dashboard", label: "Dashboard", icon: FiHome },
    { href: "/admin/products", label: "Sản phẩm", icon: FiPackage },
    { href: "/admin/orders", label: "Đơn hàng", icon: FiShoppingCart },
    { href: "/admin/categories", label: "Danh mục", icon: FiList },
    { href: "/admin/brands", label: "Thương hiệu", icon: FiTag },
    { href: "/admin/users", label: "Người dùng", icon: FiUsers },
    { href: "/admin/promotions", label: "Khuyến mãi", icon: FiTag },
    { href: "/admin/settings", label: "Cài đặt", icon: FiSettings },
  ];

  return (

    <div
      className={`relative z-10 transition-all duration-300 ease-in-out flex-shrink-0 text-white ${isSidebarOpen ? 'w-64' : 'w-20'
        }`}
    >
      <div className="h-full bg-[#1e1e1e] backdrop-blur-md p-4 flex flex-col border-r border-[#2f2f2f]">
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 rounded-full hover:bg-[#2f2f2f] transition-colors max-w-fit cursor-pointer">
          <Menu size={24} />
        </button>
        <nav className="mt-8 flex-grow">
          {sidebarItems.map((item) => {
            const IconComponent = ICONS[item.icon as keyof typeof ICONS];

            if (!IconComponent) return null;

            return (
              <Link key={item.name} href={item.href}>
                <div className={`flex items-center p-4 text-sm font-medium rounded-lg hover:bg-[#2f2f2f] transition-colors mb-2 ${pathname === item.href ? 'bg-[#2f2f2f]' : ''
                  }`}>
                  {/* <div className={`flex items-center p-4 text-sm font-medium rounded-lg hover:bg-[#2f2f2f] transition-colors mb-2 ${
                  pathname === item.href ? 'bg-[#2f2f2f]' : ''}`}> */}
                  <IconComponent size={20} style={{ minWidth: "20px" }} />
                  {/* <span className="ml-4 whitespace-nowrap">{item.name}</span> */}

                  {isSidebarOpen && <span className="ml-4 whitespace-nowrap">{item.name}</span>}
                </div>
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
};
export default AdminSidebar;
