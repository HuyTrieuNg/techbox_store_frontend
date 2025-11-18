"use client";
import { useAuthContext } from "@/contexts/AuthContext";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FaUser, FaMapMarkerAlt, FaBox, FaLock, FaSignOutAlt } from "react-icons/fa";

export default function SidebarAccount() {
  const pathname = usePathname();
  const { handleLogout } = useAuthContext();
  const router = useRouter();

  // Danh sách menu
  const menuItems = [
    { name: "Thông tin tài khoản", icon: <FaUser />, path: "/account" },
    { name: "Sổ địa chỉ", icon: <FaMapMarkerAlt />, path: "/account/address" },
    { name: "Quản lý đơn hàng", icon: <FaBox />, path: "/account/orders" },
    // { name: "Đặt lại mật khẩu", icon: <FaLock />, path: "/account/change-password" },
  ];

  return (
    <aside className="col-span-1 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800">
      {/* Header user info */}
      <div className="flex items-center gap-4 px-6 py-4 border-b border-gray-300 dark:border-gray-600">
        <div className="w-10 h-10 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center text-gray-600 dark:text-gray-300">
          <FaUser size={20} />
        </div>
        <p className="font-semibold text-gray-700 dark:text-gray-300 text-lg">Tài khoản cá nhân</p>
      </div>

      {/* Menu */}
      <ul className="space-y-3 px-6 py-4 text-gray-700 dark:text-gray-300">
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
        <li>
          <button
            onClick={() => {
              handleLogout();
              router.push("/");
            }}
            className="flex items-center gap-3 transition-colors duration-150 hover:text-[#E61E4D] cursor-pointer"
          >
            <FaSignOutAlt /> Đăng xuất
          </button>
        </li>
      </ul>
    </aside>
  );
}