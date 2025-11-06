"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaUser, FaMapMarkerAlt, FaBox, FaLock, FaSignOutAlt } from "react-icons/fa";

export default function SidebarAccount() {
  const pathname = usePathname();

  // Danh sách menu
  const menuItems = [
    { name: "Thông tin tài khoản", icon: <FaUser />, path: "/account" },
    { name: "Sổ địa chỉ", icon: <FaMapMarkerAlt />, path: "/account/address" },
    { name: "Quản lý đơn hàng", icon: <FaBox />, path: "/account/orders" },
    { name: "Đặt lại mật khẩu", icon: <FaLock />, path: "/account/change-password" },
    { name: "Đăng xuất", icon: <FaSignOutAlt />, path: "/logout" },
  ];

  return (
    <aside className="col-span-1 border border-gray-300 rounded-xl bg-white">
      {/* Header user info */}
      <div className="flex items-center gap-4 px-6 py-4 border-b border-gray-300">
        <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center text-gray-600">
          <FaUser size={22} />
        </div>
        <p className="font-semibold text-gray-700 text-lg">abc</p>
      </div>

      {/* Menu */}
      <ul className="space-y-3 px-6 py-4 text-gray-700">
        {menuItems.map((item, index) => {
          const isActive = pathname === item.path;
          return (
            <li key={index}>
              <Link
                href={item.path}
                className={`flex items-center gap-3 transition-colors duration-150 
                  ${isActive ? "text-[#E61E4D] font-medium" : "hover:text-[#E61E4D]"}`}
              >
                {item.icon} {item.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}