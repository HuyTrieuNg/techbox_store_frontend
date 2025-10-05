// 'use client';

// import { useState } from 'react';

// export default function Header() {
//   const [searchQuery, setSearchQuery] = useState('');

//   return (
//     <header className="flex justify-between items-center p-4 bg-white shadow-md">
//       <div className="flex items-center space-x-4">
//         <div className="flex items-center">
//           <span className="text-blue-600 font-bold text-xl">N</span>
//           <span className="text-gray-800 font-bold text-xl">extMerce</span>
//         </div>
//         <div className="relative">
//           <select className="p-2 border rounded-lg text-gray-700 bg-white">
//             <option>All Categories</option>
//             {/* Add more categories as needed */}
//           </select>
//         </div>
//       </div>
//       <div className="flex-1 mx-4">
//         <input
//           type="text"
//           placeholder="I am shopping for..."
//           className="w-full p-2 border rounded-lg text-gray-700"
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//         />
//       </div>
//       <div className="flex items-center space-x-4">
//         <div className="relative">
//           <span className="text-gray-600">ACCOUNT</span>
//           <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">0</span>
//         </div>
//         <div className="relative">
//           <span className="text-gray-600">Sign In / Register</span>
//         </div>
//         <div className="relative">
//           <span className="text-blue-600">❤️</span>
//           <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">0</span>
//         </div>
//         <div>
//           <span className="text-gray-600">🔔</span>
//           <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">0</span>
//         </div>
//       </div>
//     </header>
//   );
// }

"use client";

import { useState } from "react";
import Link from "next/link";
import { FaShoppingCart, FaUser, FaChevronDown, FaSearch, FaChevronRight, FaSignOutAlt, FaBox, FaMapMarkerAlt } from "react-icons/fa";
import CategoryMenu from "./Category";
import { useAuthContext } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { CartItems } from "@/features/CartItem";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const { accessToken, handleLogout } = useAuthContext();
  const isLoggedIn = !!accessToken;
  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleAccount = () => setIsAccountOpen(!isAccountOpen);
  const { cartItems } = useCart();
// In Header.tsx, update the cartCount line:
const cartCount = cartItems.reduce((sum: number, item: CartItems) => sum + item.quantity, 0) || 0;
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
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
              className="flex items-center gap-3 text-gray-800 hover:text-[#E61E4D] font-semibold text-lg transition-colors duration-200 cursor-pointer"
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
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Tìm kiếm sản phẩm..."
            className="w-full border rounded-full pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#E61E4D]"
          />
        </div>

        {/* Giỏ hàng + Đăng nhập */}
        <div className="flex items-center gap-4">
          
            {/* <button className="relative"> */}
              <Link href="/cart" className="relative">
              <FaShoppingCart size={22} />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1">
                {cartCount}
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
            // Phần hiển thị khi đã đăng nhập (tùy chỉnh theo nhu cầu)
            // <button
            //   onClick={handleLogout}
            //   className="flex items-center gap-1 bg-gray-500 text-white px-4 py-2 rounded-full hover:bg-gray-600 cursor-pointer transition-colors duration-200"
            // >
            //   <FaUser /> Xin chào
            //   <FaSignOutAlt className="ml-1" size={12} />
            // </button>
            <div
              className="relative"
              onMouseEnter={() => setIsAccountOpen(true)}
              onMouseLeave={() => setIsAccountOpen(false)}
            >
              <button
                onClick={toggleAccount}
                className="flex items-center gap-2 bg-[#E61E4D] text-white px-4 py-2 rounded-full hover:bg-[#d41b46ff] transition-colors duration-200 cursor-pointer"
              >
                <FaUser /> Xin chào
                <FaChevronDown
                  size={12}
                  className={`transition-transform duration-200 ${isAccountOpen ? "rotate-180" : ""
                    }`}
                />
              </button>

              {/* Dropdown menu */}
              {isAccountOpen && (
                <div className="absolute right-0 mt-2 w-60 bg-white rounded-md shadow-lg border border-gray-300 py-2 z-50">
                  <Link
                    href="/account"
                    className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                  >
                    <FaUser /> Thông tin tài khoản
                  </Link>
                  <Link
                    href="/account/address"
                    className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                  >
                    <FaMapMarkerAlt /> Sổ địa chỉ
                  </Link>
                  <Link
                    href="/account/orders"
                    className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                  >
                    <FaBox /> Quản lý đơn hàng
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center gap-2 cursor-pointer"
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
