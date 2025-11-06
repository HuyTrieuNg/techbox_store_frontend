"use client";

import { useAuthContext } from "@/contexts/AuthContext";
import { FiBell, FiUser, FiLogOut } from "react-icons/fi";
import { useState } from "react";
import { useRouter } from "next/navigation";

/**
 * Admin Header
 * 
 * Header bar cho admin panel với notifications và user menu
 */
export default function AdminHeader() {
  const { user, handleLogout } = useAuthContext();
  const router = useRouter();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const onLogout = async () => {
    await handleLogout();
    router.push('/login');
  };

  // Lấy initials từ tên user
  const getInitials = () => {
    if (!user) return "AD";
    const firstName = user.firstName || "";
    const lastName = user.lastName || "";
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase() || "AD";
  };

  return (
    <header className="sticky top-0 bg-white border-b border-gray-200 h-16 flex items-center justify-between px-6 z-30">
      {/* Left: Page Title (có thể customize sau) */}
      <div>
        <h2 className="text-xl font-semibold text-gray-800">
          Quản trị hệ thống
        </h2>
      </div>

      {/* Right: Notifications + User Menu */}
      <div className="flex items-center gap-4">
        {/* Notification Bell */}
        <button className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
          <FiBell className="w-5 h-5" />
          {/* Badge */}
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* User Menu */}
        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            {/* Avatar */}
            <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold text-sm">
              {getInitials()}
            </div>
            {/* Name */}
            <span className="text-sm font-medium text-gray-700">
              {user?.firstName} {user?.lastName}
            </span>
          </button>

          {/* Dropdown Menu */}
          {showUserMenu && (
            <>
              {/* Backdrop */}
              <div 
                className="fixed inset-0 z-40" 
                onClick={() => setShowUserMenu(false)}
              />
              
              {/* Menu */}
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                <button
                  onClick={() => {
                    router.push('/profile');
                    setShowUserMenu(false);
                  }}
                  className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                >
                  <FiUser className="w-4 h-4" />
                  Hồ sơ cá nhân
                </button>
                
                <hr className="my-2 border-gray-200" />
                
                <button
                  onClick={onLogout}
                  className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                >
                  <FiLogOut className="w-4 h-4" />
                  Đăng xuất
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
