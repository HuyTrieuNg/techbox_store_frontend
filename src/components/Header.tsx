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
import { FaShoppingCart, FaUser, FaChevronDown, FaSearch, FaChevronRight } from "react-icons/fa";
import CategoryMenu from "./Category";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

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
              // <div className="absolute top-14 left-0 bg-white border border-gray-200 rounded-xl shadow-xl w-72 z-10 transition-all duration-300 ease-in-out">
              //   <ul className="flex flex-col py-3">
              //     <li className="group relative">
              //       <button className="group w-full text-left px-6 py-4 text-gray-700 hover:bg-[#E61E4D] hover:text-white font-medium transition-colors duration-150 flex items-center justify-between cursor-pointer">
              //         Điện thoại <FaChevronRight size={12} className="text-gray-500 group-hover:text-white" />
              //       </button>
              //       <ul className="absolute left-[calc(100%+0.5rem)] top-0 bg-white border border-gray-200 rounded-xl shadow-xl hidden group-hover:block w-64 transition-all duration-200 ease-in-out">
              //         <li className="px-6 py-4 text-gray-700 hover:bg-[#E61E4D] hover:text-white transition-colors duration-150 cursor-pointer">iPhone</li>
              //         <li className="px-6 py-4 text-gray-700 hover:bg-[#E61E4D] hover:text-white transition-colors duration-150 cursor-pointer">Samsung</li>
              //         <li className="px-6 py-4 text-gray-700 hover:bg-[#E61E4D] hover:text-white transition-colors duration-150 cursor-pointer">Xiaomi</li>
              //       </ul>
              //     </li>
              //     <li className="group relative">
              //       <button className="group w-full text-left px-6 py-4 text-gray-700 hover:bg-[#E61E4D] hover:text-white font-medium transition-colors duration-150 flex items-center justify-between cursor-pointer">
              //         Laptop <FaChevronRight size={12} className="text-gray-500 group-hover:text-white" />
              //       </button>
              //       <ul className="absolute left-[calc(100%+0.5rem)] top-0 bg-white border border-gray-200 rounded-xl shadow-xl hidden group-hover:block w-64 transition-all duration-200 ease-in-out">
              //         <li className="px-6 py-4 text-gray-700 hover:bg-[#E61E4D] hover:text-white transition-colors duration-150 cursor-pointer">Macbook</li>
              //         <li className="px-6 py-4 text-gray-700 hover:bg-[#E61E4D] hover:text-white transition-colors duration-150 cursor-pointer">Dell</li>
              //         <li className="px-6 py-4 text-gray-700 hover:bg-[#E61E4D] hover:text-white transition-colors duration-150 cursor-pointer">Asus</li>
              //       </ul>
              //     </li>
              //     <li className="px-6 py-4 text-gray-700 hover:bg-[#E61E4D] hover:text-white font-medium transition-colors duration-150 cursor-pointer">
              //       Phụ kiện
              //     </li>
              //   </ul>
              // </div>
              <CategoryMenu type="menu"/>
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
          <button className="relative">
            <FaShoppingCart size={22} />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1">
              2
            </span>
          </button>
          <Link href="/login">
            <button className="flex items-center gap-1 bg-[#E61E4D] text-white px-4 py-2 rounded-full hover:bg-[#d41b46ff] cursor-pointer transition-colors duration-200">
              <FaUser /> Đăng nhập
            </button>
          </Link>
        </div>
      </div>
    </header>
  );
}
