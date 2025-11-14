"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FaShoppingCart, FaUser, FaChevronDown, FaSearch, FaChevronRight, FaSignOutAlt, FaBox, FaMapMarkerAlt, FaLock, FaMoon, FaSun } from "react-icons/fa";
import CategoryMenu from "./Category";
import { useAuthContext } from "@/contexts/AuthContext";
import { useCart } from "@/hooks/useCart";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
// import { useCart } from "@/contexts/CartContext";
// import { CartItems } from "@/features/CartItem";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { user, handleLogout } = useAuthContext();
  const isLoggedIn = !!user;
  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleAccount = () => setIsAccountOpen(!isAccountOpen);
  const { totalQuantity, isLoading } = useCart();
  const router = useRouter();
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  // const cartCount = cartItems.reduce((sum: number, item: CartItems) => sum + item.quantity, 0) || 0;
  return (
    <header className="bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

        {/* Logo + Danh mục */}
        <div className="flex items-center">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-[#E61E4D]">
            TechBox
          </Link>

          {/* Danh mục */}
          <div className="relative ml-8">
            <button
              onClick={toggleMenu}
              className="flex items-center gap-3 text-gray-800 dark:text-gray-200 hover:text-[#E61E4D] font-semibold text-lg transition-colors duration-200 cursor-pointer"
            >
              Danh mục <FaChevronDown size={14} className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {isOpen && (
              <CategoryMenu type="menu" />
            )}
          </div>

        </div>


        {/* Thanh tìm kiếm */}
        <div className="w-100 relative">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
          <input
            type="text"
            placeholder="Tìm kiếm sản phẩm..."
            className="w-full border border-gray-300 dark:border-gray-600 rounded-full pl-10 pr-4 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E61E4D]"
          />
        </div>

        {/* Giỏ hàng + Đăng nhập */}
        <div className="flex items-center gap-4">

          {/* Dark Mode Toggle - Only render after hydration */}
          {mounted && (
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
              title={theme === 'dark' ? 'Chuyển sang chế độ sáng' : 'Chuyển sang chế độ tối'}
              suppressHydrationWarning
            >
              {theme === 'dark' ? <FaSun size={18} /> : <FaMoon size={18} />}
            </button>
          )}

          {/* <button className="relative"> */}
          <Link href="/cart" className="relative">
            <FaShoppingCart size={22} className="text-gray-800 dark:text-gray-200" />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1">
              {totalQuantity}
            </span>
          </Link>
          {/* </button> */}

          {!isLoggedIn ? (
            <Link href="/login">
              <button className="flex items-center gap-1 bg-[#E61E4D] text-white px-4 py-2 rounded-full hover:bg-[#d41b46ff] cursor-pointer transition-colors duration-200">
                <FaUser /> Đăng nhập
              </button>
            </Link>
          ) : (
            <div
              className="relative"
            // onMouseEnter={() => setIsAccountOpen(true)}
            // onMouseLeave={() => setIsAccountOpen(false)}
            >
              <button
                onClick={toggleAccount}
                className="flex items-center gap-2 bg-[#E61E4D] text-white px-4 py-2 rounded-full hover:bg-[#d41b46ff] transition-colors duration-200 cursor-pointer"
              >
                <FaUser /> Xin chào {user.firstName}
                <FaChevronDown
                  size={12}
                  className={`transition-transform duration-200 ${isAccountOpen ? "rotate-180" : ""
                    }`}
                />
              </button>

              {/* Dropdown menu */}
              {isAccountOpen && (
                <div className="absolute right-0 mt-2 w-60 bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-300 dark:border-gray-600 py-2 z-50">
                  <Link
                    href="/account"
                    className="w-full text-left px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
                    onClick={() => setIsAccountOpen(false)}
                  >
                    <FaUser /> Thông tin tài khoản
                  </Link>
                  <Link
                    href="/account/address"
                    className="w-full text-left px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
                    onClick={() => setIsAccountOpen(false)}
                  >
                    <FaMapMarkerAlt /> Sổ địa chỉ
                  </Link>
                  <Link
                    href="/account/orders"
                    className="w-full text-left px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
                    onClick={() => setIsAccountOpen(false)}
                  >
                    <FaBox /> Quản lý đơn hàng
                  </Link>
                  <Link
                    href="/account/change-password"
                    className="w-full text-left px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
                    onClick={() => setIsAccountOpen(false)}
                  >
                    <FaLock /> Đặt lại mật khẩu
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout(); // Gọi hàm đăng xuất
                      setIsAccountOpen(false); // Đóng dropdown khi nhấp
                      router.push("/");
                    }}
                    className="w-full text-left px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2 cursor-pointer"
                  >
                    <FaSignOutAlt /> Đăng xuất
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
