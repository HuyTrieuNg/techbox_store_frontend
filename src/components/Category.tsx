// import React, { useState } from 'react';
// import { FaChevronDown, FaChevronRight } from 'react-icons/fa';

// const CategoryMenu = () => {
//     const [isOpen, setIsOpen] = useState(false);

//     const toggleMenu = () => {
//         setIsOpen(!isOpen);
//     };

//     return (
//         <div className="relative ml-8">
//             <button
//                 onClick={toggleMenu}
//                 className="flex items-center gap-3 text-gray-800 hover:text-[#E61E4D] font-semibold text-lg transition-colors duration-200"
//             >
//                 Danh mục <FaChevronDown size={14} className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
//             </button>

//             {isOpen && (
//                 <div className="absolute top-14 left-0 bg-white border border-gray-200 rounded-xl shadow-xl w-72 z-10 transition-all duration-300 ease-in-out">
//                     <ul className="flex flex-col py-3">
//                         <li className="group relative">
//                             <button className="group w-full text-left px-6 py-2 text-gray-700 hover:bg-[#E61E4D] hover:text-white font-medium transition-colors duration-150 flex items-center justify-between cursor-pointer">
//                                 Điện thoại <FaChevronRight size={12} className="text-gray-500 group-hover:text-white" />
//                             </button>
//                             <ul className="absolute left-[calc(100%+0.5rem)] top-0 bg-white border border-gray-200 rounded-xl shadow-xl hidden group-hover:block w-64 transition-all duration-200 ease-in-out">
//                                 <li className="px-6 py-2 text-gray-700 hover:bg-[#E61E4D] hover:text-white transition-colors duration-150 cursor-pointer">iPhone</li>
//                                 <li className="px-6 py-2 text-gray-700 hover:bg-[#E61E4D] hover:text-white transition-colors duration-150 cursor-pointer">Samsung</li>
//                                 <li className="px-6 py-2 text-gray-700 hover:bg-[#E61E4D] hover:text-white transition-colors duration-150 cursor-pointer">Xiaomi</li>
//                             </ul>
//                         </li>
//                         <li className="group relative">
//                             <button className="group w-full text-left px-6 py-2 text-gray-700 hover:bg-[#E61E4D] hover:text-white font-medium transition-colors duration-150 flex items-center justify-between cursor-pointer">
//                                 Laptop <FaChevronRight size={12} className="text-gray-500 group-hover:text-white" />
//                             </button>
//                             <ul className="absolute left-[calc(100%+0.5rem)] top-0 bg-white border border-gray-200 rounded-xl shadow-xl hidden group-hover:block w-64 transition-all duration-200 ease-in-out">
//                                 <li className="px-6 py-2 text-gray-700 hover:bg-[#E61E4D] hover:text-white transition-colors duration-150 cursor-pointer">Macbook</li>
//                                 <li className="px-6 py-2 text-gray-700 hover:bg-[#E61E4D] hover:text-white transition-colors duration-150 cursor-pointer">Dell</li>
//                                 <li className="px-6 py-2 text-gray-700 hover:bg-[#E61E4D] hover:text-white transition-colors duration-150 cursor-pointer">Asus</li>
//                             </ul>
//                         </li>
//                         <li className="px-6 py-2 text-gray-700 hover:bg-[#E61E4D] hover:text-white font-medium transition-colors duration-150 cursor-pointer">
//                             Phụ kiện
//                         </li>
//                     </ul>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default CategoryMenu;

// import React from 'react';
// import { FaChevronRight } from 'react-icons/fa';

// const CategoryMenu = () => {
//     return (
//         <div className="absolute top-14 left-0 bg-white border border-gray-200 rounded-xl shadow-xl w-72 z-10 transition-all duration-300 ease-in-out">
//             <ul className="flex flex-col py-3">
//                 <li className="group relative">
//                     <button className="group w-full text-left px-6 py-2 text-gray-700 hover:bg-[#E61E4D] hover:text-white font-medium transition-colors duration-150 flex items-center justify-between cursor-pointer">
//                         Điện thoại <FaChevronRight size={12} className="text-gray-500 group-hover:text-white" />
//                     </button>
//                     <ul className="absolute left-[calc(100%+0.5rem)] top-0 bg-white border border-gray-200 rounded-xl shadow-xl hidden group-hover:block w-64 transition-all duration-200 ease-in-out">
//                         <li className="px-6 py-2 text-gray-700 hover:bg-[#E61E4D] hover:text-white transition-colors duration-150 cursor-pointer">iPhone</li>
//                         <li className="px-6 py-2 text-gray-700 hover:bg-[#E61E4D] hover:text-white transition-colors duration-150 cursor-pointer">Samsung</li>
//                         <li className="px-6 py-2 text-gray-700 hover:bg-[#E61E4D] hover:text-white transition-colors duration-150 cursor-pointer">Xiaomi</li>
//                     </ul>
//                 </li>
//                 <li className="group relative">
//                     <button className="group w-full text-left px-6 py-2 text-gray-700 hover:bg-[#E61E4D] hover:text-white font-medium transition-colors duration-150 flex items-center justify-between cursor-pointer">
//                         Laptop <FaChevronRight size={12} className="text-gray-500 group-hover:text-white" />
//                     </button>
//                     <ul className="absolute left-[calc(100%+0.5rem)] top-0 bg-white border border-gray-200 rounded-xl shadow-xl hidden group-hover:block w-64 transition-all duration-200 ease-in-out">
//                         <li className="px-6 py-2 text-gray-700 hover:bg-[#E61E4D] hover:text-white transition-colors duration-150 cursor-pointer">Macbook</li>
//                         <li className="px-6 py-2 text-gray-700 hover:bg-[#E61E4D] hover:text-white transition-colors duration-150 cursor-pointer">Dell</li>
//                         <li className="px-6 py-2 text-gray-700 hover:bg-[#E61E4D] hover:text-white transition-colors duration-150 cursor-pointer">Asus</li>
//                     </ul>
//                 </li>
//                 <li className="px-6 py-2 text-gray-700 hover:bg-[#E61E4D] hover:text-white font-medium transition-colors duration-150 cursor-pointer">
//                     Phụ kiện
//                 </li>
//             </ul>
//         </div>
//     );
// };

// export default CategoryMenu;


import React from 'react';
import { FaChevronRight } from 'react-icons/fa';

const CategoryMenu = ({ type = "menu" }) => {
    if (type === "menu") {
        return (
            <div className="absolute top-14 left-0 bg-white border border-gray-200 rounded-xl w-72 z-10 transition-all duration-300 ease-in-out">
                <ul className="flex flex-col py-3">
                    <li className="group relative">
                        <button className="group w-full text-left px-6 py-2 text-gray-700 hover:bg-[#E61E4D] hover:text-white font-medium transition-colors duration-150 flex items-center justify-between cursor-pointer">
                            Laptop <FaChevronRight size={12} className="text-gray-500 group-hover:text-white" />
                        </button>

                        {/* Mega menu */}
                        <div className="absolute left-full top-0 bg-white border border-gray-200 rounded-xl hidden group-hover:flex w-[950px] h-[400px] p-6 gap-8 transition-all duration-200 ease-in-out z-50">
                            {/* Cột 1 */}
                            <ul className="flex-1">
                                <h3 className="font-semibold text-gray-900 mb-2">Thương hiệu</h3>
                                <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Macbook</li>
                                <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Dell</li>
                                <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Asus</li>
                            </ul>

                            {/* Cột 2 */}
                            <ul className="flex-1">
                                <h3 className="font-semibold text-gray-900 mb-2">Dòng sản phẩm</h3>
                                <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Gaming</li>
                                <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Văn phòng</li>
                                <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Đồ họa</li>
                            </ul>

                            {/* Cột 3 */}
                            <ul className="flex-1">
                                <h3 className="font-semibold text-gray-900 mb-2">Phụ kiện</h3>
                                <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Chuột</li>
                                <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Bàn phím</li>
                                <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Tai nghe</li>
                            </ul>
                        </div>
                    </li>
                    <li className="group relative">
                        <button className="group w-full text-left px-6 py-2 text-gray-700 hover:bg-[#E61E4D] hover:text-white font-medium transition-colors duration-150 flex items-center justify-between cursor-pointer">
                            Laptop <FaChevronRight size={12} className="text-gray-500 group-hover:text-white" />
                        </button>

                        {/* Mega menu */}
                        <div className="absolute left-full top-0 bg-white border border-gray-200 rounded-xl hidden group-hover:flex w-[950px] h-[400px] p-6 gap-8 transition-all duration-200 ease-in-out z-50">
                            {/* Cột 1 */}
                            <ul className="flex-1">
                                <h3 className="font-semibold text-gray-900 mb-2">Thương hiệu</h3>
                                <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Macbook</li>
                                <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Dell</li>
                                <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Asus</li>
                            </ul>

                            {/* Cột 2 */}
                            <ul className="flex-1">
                                <h3 className="font-semibold text-gray-900 mb-2">Dòng sản phẩm</h3>
                                <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Gaming</li>
                                <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Văn phòng</li>
                                <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Đồ họa</li>
                            </ul>

                            {/* Cột 3 */}
                            <ul className="flex-1">
                                <h3 className="font-semibold text-gray-900 mb-2">Phụ kiện</h3>
                                <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Chuột</li>
                                <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Bàn phím</li>
                                <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Tai nghe</li>
                            </ul>
                        </div>
                    </li>
                    <li className="group relative">
                        <button className="group w-full text-left px-6 py-2 text-gray-700 hover:bg-[#E61E4D] hover:text-white font-medium transition-colors duration-150 flex items-center justify-between cursor-pointer">
                            Laptop <FaChevronRight size={12} className="text-gray-500 group-hover:text-white" />
                        </button>

                        {/* Mega menu */}
                        <div className="absolute left-full top-0 bg-white border border-gray-200 rounded-xl hidden group-hover:flex w-[950px] h-[400px] p-6 gap-8 transition-all duration-200 ease-in-out z-50">
                            {/* Cột 1 */}
                            <ul className="flex-1">
                                <h3 className="font-semibold text-gray-900 mb-2">Thương hiệu</h3>
                                <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Macbook</li>
                                <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Dell</li>
                                <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Asus</li>
                            </ul>

                            {/* Cột 2 */}
                            <ul className="flex-1">
                                <h3 className="font-semibold text-gray-900 mb-2">Dòng sản phẩm</h3>
                                <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Gaming</li>
                                <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Văn phòng</li>
                                <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Đồ họa</li>
                            </ul>

                            {/* Cột 3 */}
                            <ul className="flex-1">
                                <h3 className="font-semibold text-gray-900 mb-2">Phụ kiện</h3>
                                <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Chuột</li>
                                <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Bàn phím</li>
                                <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Tai nghe</li>
                            </ul>
                        </div>
                    </li>
                    <li className="group relative">
                        <button className="group w-full text-left px-6 py-2 text-gray-700 hover:bg-[#E61E4D] hover:text-white font-medium transition-colors duration-150 flex items-center justify-between cursor-pointer">
                            Laptop <FaChevronRight size={12} className="text-gray-500 group-hover:text-white" />
                        </button>

                        {/* Mega menu */}
                        <div className="absolute left-full top-0 bg-white border border-gray-200 rounded-xl hidden group-hover:flex w-[950px] h-[400px] p-6 gap-8 transition-all duration-200 ease-in-out z-50">
                            {/* Cột 1 */}
                            <ul className="flex-1">
                                <h3 className="font-semibold text-gray-900 mb-2">Thương hiệu</h3>
                                <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Macbook</li>
                                <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Dell</li>
                                <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Asus</li>
                            </ul>

                            {/* Cột 2 */}
                            <ul className="flex-1">
                                <h3 className="font-semibold text-gray-900 mb-2">Dòng sản phẩm</h3>
                                <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Gaming</li>
                                <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Văn phòng</li>
                                <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Đồ họa</li>
                            </ul>

                            {/* Cột 3 */}
                            <ul className="flex-1">
                                <h3 className="font-semibold text-gray-900 mb-2">Phụ kiện</h3>
                                <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Chuột</li>
                                <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Bàn phím</li>
                                <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Tai nghe</li>
                            </ul>
                        </div>
                    </li>
                    <li className="group relative">
                        <button className="group w-full text-left px-6 py-2 text-gray-700 hover:bg-[#E61E4D] hover:text-white font-medium transition-colors duration-150 flex items-center justify-between cursor-pointer">
                            Laptop <FaChevronRight size={12} className="text-gray-500 group-hover:text-white" />
                        </button>

                        {/* Mega menu */}
                        <div className="absolute left-full top-0 bg-white border border-gray-200 rounded-xl hidden group-hover:flex w-[950px] h-[400px] p-6 gap-8 transition-all duration-200 ease-in-out z-50">
                            {/* Cột 1 */}
                            <ul className="flex-1">
                                <h3 className="font-semibold text-gray-900 mb-2">Thương hiệu</h3>
                                <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Macbook</li>
                                <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Dell</li>
                                <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Asus</li>
                            </ul>

                            {/* Cột 2 */}
                            <ul className="flex-1">
                                <h3 className="font-semibold text-gray-900 mb-2">Dòng sản phẩm</h3>
                                <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Gaming</li>
                                <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Văn phòng</li>
                                <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Đồ họa</li>
                            </ul>

                            {/* Cột 3 */}
                            <ul className="flex-1">
                                <h3 className="font-semibold text-gray-900 mb-2">Phụ kiện</h3>
                                <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Chuột</li>
                                <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Bàn phím</li>
                                <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Tai nghe</li>
                            </ul>
                        </div>
                    </li>
                    <li className="group relative">
                        <button className="group w-full text-left px-6 py-2 text-gray-700 hover:bg-[#E61E4D] hover:text-white font-medium transition-colors duration-150 flex items-center justify-between cursor-pointer">
                            Laptop <FaChevronRight size={12} className="text-gray-500 group-hover:text-white" />
                        </button>

                        {/* Mega menu */}
                        <div className="absolute left-full top-0 bg-white border border-gray-200 rounded-xl hidden group-hover:flex w-[950px] h-[400px] p-6 gap-8 transition-all duration-200 ease-in-out z-50">
                            {/* Cột 1 */}
                            <ul className="flex-1">
                                <h3 className="font-semibold text-gray-900 mb-2">Thương hiệu</h3>
                                <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Macbook</li>
                                <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Dell</li>
                                <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Asus</li>
                            </ul>

                            {/* Cột 2 */}
                            <ul className="flex-1">
                                <h3 className="font-semibold text-gray-900 mb-2">Dòng sản phẩm</h3>
                                <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Gaming</li>
                                <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Văn phòng</li>
                                <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Đồ họa</li>
                            </ul>

                            {/* Cột 3 */}
                            <ul className="flex-1">
                                <h3 className="font-semibold text-gray-900 mb-2">Phụ kiện</h3>
                                <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Chuột</li>
                                <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Bàn phím</li>
                                <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Tai nghe</li>
                            </ul>
                        </div>
                    </li>
                    <li className="group relative">
                        <button className="group w-full text-left px-6 py-2 text-gray-700 hover:bg-[#E61E4D] hover:text-white font-medium transition-colors duration-150 flex items-center justify-between cursor-pointer">
                            Laptop <FaChevronRight size={12} className="text-gray-500 group-hover:text-white" />
                        </button>

                        {/* Mega menu */}
                        <div className="absolute left-full top-0 bg-white border border-gray-200 rounded-xl hidden group-hover:flex w-[950px] h-[400px] p-6 gap-8 transition-all duration-200 ease-in-out z-50">
                            {/* Cột 1 */}
                            <ul className="flex-1">
                                <h3 className="font-semibold text-gray-900 mb-2">Thương hiệu</h3>
                                <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Macbook</li>
                                <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Dell</li>
                                <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Asus</li>
                            </ul>

                            {/* Cột 2 */}
                            <ul className="flex-1">
                                <h3 className="font-semibold text-gray-900 mb-2">Dòng sản phẩm</h3>
                                <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Gaming</li>
                                <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Văn phòng</li>
                                <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Đồ họa</li>
                            </ul>

                            {/* Cột 3 */}
                            <ul className="flex-1">
                                <h3 className="font-semibold text-gray-900 mb-2">Phụ kiện</h3>
                                <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Chuột</li>
                                <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Bàn phím</li>
                                <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Tai nghe</li>
                            </ul>
                        </div>
                    </li>
                    <li className="group relative">
                        <button className="group w-full text-left px-6 py-2 text-gray-700 hover:bg-[#E61E4D] hover:text-white font-medium transition-colors duration-150 flex items-center justify-between cursor-pointer">
                            Laptop <FaChevronRight size={12} className="text-gray-500 group-hover:text-white" />
                        </button>

                        {/* Mega menu */}
                        <div className="absolute left-full top-0 bg-white border border-gray-200 rounded-xl hidden group-hover:flex w-[950px] h-[400px] p-6 gap-8 transition-all duration-200 ease-in-out z-50">
                            {/* Cột 1 */}
                            <ul className="flex-1">
                                <h3 className="font-semibold text-gray-900 mb-2">Thương hiệu</h3>
                                <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Macbook</li>
                                <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Dell</li>
                                <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Asus</li>
                            </ul>

                            {/* Cột 2 */}
                            <ul className="flex-1">
                                <h3 className="font-semibold text-gray-900 mb-2">Dòng sản phẩm</h3>
                                <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Gaming</li>
                                <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Văn phòng</li>
                                <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Đồ họa</li>
                            </ul>
                            {/* Cột 3 */}
                            <ul className="flex-1">
                                <h3 className="font-semibold text-gray-900 mb-2">Phụ kiện</h3>
                                <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Chuột</li>
                                <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Bàn phím</li>
                                <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Tai nghe</li>
                            </ul>
                        </div>
                    </li>
                    
                </ul>
            </div>
        );
    }
    if (type === "grid") {
        return (
            <div className="top-14 left-0 bg-white border border-gray-300 rounded-xl w-72 z-10 transition-all duration-300 ease-in-out">
                <ul className="flex flex-col py-3">
                    <li className="group relative">
                        <button className="group w-full text-left px-6 py-2 text-gray-700 hover:bg-[#E61E4D] hover:text-white font-medium transition-colors duration-150 flex items-center justify-between cursor-pointer">
                            Laptop <FaChevronRight size={12} className="text-gray-500 group-hover:text-white" />
                        </button>

                        {/* Mega menu */}
                        <div className="absolute left-full top-0 bg-white border border-gray-200 rounded-xl hidden group-hover:flex w-[950px] h-[400px] p-6 gap-8 transition-all duration-200 ease-in-out z-50">
                            {/* Cột 1 */}
                            <ul className="flex-1">
                                <h3 className="font-semibold text-gray-900 mb-2">Thương hiệu</h3>
                                <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Macbook</li>
                                <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Dell</li>
                                <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Asus</li>
                            </ul>

                            {/* Cột 2 */}
                            <ul className="flex-1">
                                <h3 className="font-semibold text-gray-900 mb-2">Dòng sản phẩm</h3>
                                <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Gaming</li>
                                <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Văn phòng</li>
                                <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Đồ họa</li>
                            </ul>

                            {/* Cột 3 */}
                            <ul className="flex-1">
                                <h3 className="font-semibold text-gray-900 mb-2">Phụ kiện</h3>
                                <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Chuột</li>
                                <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Bàn phím</li>
                                <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Tai nghe</li>
                            </ul>
                        </div>
                    </li>
                    <li className="group relative">
                        <button className="group w-full text-left px-6 py-2 text-gray-700 hover:bg-[#E61E4D] hover:text-white font-medium transition-colors duration-150 flex items-center justify-between cursor-pointer">
                            Laptop <FaChevronRight size={12} className="text-gray-500 group-hover:text-white" />
                        </button>

                        {/* Mega menu */}
                        <div className="absolute left-full top-0 bg-white border border-gray-200 rounded-xl hidden group-hover:flex w-[950px] h-[400px] p-6 gap-8 transition-all duration-200 ease-in-out z-50">
                            {/* Cột 1 */}
                            <ul className="flex-1">
                                <h3 className="font-semibold text-gray-900 mb-2">Thương hiệu</h3>
                                <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Macbook</li>
                                <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Dell</li>
                                <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Asus</li>
                            </ul>

                            {/* Cột 2 */}
                            <ul className="flex-1">
                                <h3 className="font-semibold text-gray-900 mb-2">Dòng sản phẩm</h3>
                                <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Gaming</li>
                                <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Văn phòng</li>
                                <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Đồ họa</li>
                            </ul>

                            {/* Cột 3 */}
                            <ul className="flex-1">
                                <h3 className="font-semibold text-gray-900 mb-2">Phụ kiện</h3>
                                <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Chuột</li>
                                <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Bàn phím</li>
                                <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Tai nghe</li>
                            </ul>
                        </div>
                    </li>
                    <li className="group relative">
                        <button className="group w-full text-left px-6 py-2 text-gray-700 hover:bg-[#E61E4D] hover:text-white font-medium transition-colors duration-150 flex items-center justify-between cursor-pointer">
                            Laptop <FaChevronRight size={12} className="text-gray-500 group-hover:text-white" />
                        </button>

                        {/* Mega menu */}
                        <div className="absolute left-full top-0 bg-white border border-gray-200 rounded-xl hidden group-hover:flex w-[950px] h-[400px] p-6 gap-8 transition-all duration-200 ease-in-out z-50">
                            {/* Cột 1 */}
                            <ul className="flex-1">
                                <h3 className="font-semibold text-gray-900 mb-2">Thương hiệu</h3>
                                <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Macbook</li>
                                <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Dell</li>
                                <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Asus</li>
                            </ul>

                            {/* Cột 2 */}
                            <ul className="flex-1">
                                <h3 className="font-semibold text-gray-900 mb-2">Dòng sản phẩm</h3>
                                <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Gaming</li>
                                <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Văn phòng</li>
                                <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Đồ họa</li>
                            </ul>

                            {/* Cột 3 */}
                            <ul className="flex-1">
                                <h3 className="font-semibold text-gray-900 mb-2">Phụ kiện</h3>
                                <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Chuột</li>
                                <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Bàn phím</li>
                                <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Tai nghe</li>
                            </ul>
                        </div>
                    </li>
                    <li className="group relative">
                        <button className="group w-full text-left px-6 py-2 text-gray-700 hover:bg-[#E61E4D] hover:text-white font-medium transition-colors duration-150 flex items-center justify-between cursor-pointer">
                            Laptop <FaChevronRight size={12} className="text-gray-500 group-hover:text-white" />
                        </button>

                        {/* Mega menu */}
                        <div className="absolute left-full top-0 bg-white border border-gray-200 rounded-xl hidden group-hover:flex w-[950px] h-[400px] p-6 gap-8 transition-all duration-200 ease-in-out z-50">
                            {/* Cột 1 */}
                            <ul className="flex-1">
                                <h3 className="font-semibold text-gray-900 mb-2">Thương hiệu</h3>
                                <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Macbook</li>
                                <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Dell</li>
                                <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Asus</li>
                            </ul>

                            {/* Cột 2 */}
                            <ul className="flex-1">
                                <h3 className="font-semibold text-gray-900 mb-2">Dòng sản phẩm</h3>
                                <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Gaming</li>
                                <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Văn phòng</li>
                                <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Đồ họa</li>
                            </ul>

                            {/* Cột 3 */}
                            <ul className="flex-1">
                                <h3 className="font-semibold text-gray-900 mb-2">Phụ kiện</h3>
                                <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Chuột</li>
                                <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Bàn phím</li>
                                <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Tai nghe</li>
                            </ul>
                        </div>
                    </li>
                    <li className="group relative">
                        <button className="group w-full text-left px-6 py-2 text-gray-700 hover:bg-[#E61E4D] hover:text-white font-medium transition-colors duration-150 flex items-center justify-between cursor-pointer">
                            Laptop <FaChevronRight size={12} className="text-gray-500 group-hover:text-white" />
                        </button>

                        {/* Mega menu */}
                        <div className="absolute left-full top-0 bg-white border border-gray-200 rounded-xl hidden group-hover:flex w-[950px] h-[400px] p-6 gap-8 transition-all duration-200 ease-in-out z-50">
                            {/* Cột 1 */}
                            <ul className="flex-1">
                                <h3 className="font-semibold text-gray-900 mb-2">Thương hiệu</h3>
                                <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Macbook</li>
                                <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Dell</li>
                                <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Asus</li>
                            </ul>

                            {/* Cột 2 */}
                            <ul className="flex-1">
                                <h3 className="font-semibold text-gray-900 mb-2">Dòng sản phẩm</h3>
                                <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Gaming</li>
                                <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Văn phòng</li>
                                <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Đồ họa</li>
                            </ul>

                            {/* Cột 3 */}
                            <ul className="flex-1">
                                <h3 className="font-semibold text-gray-900 mb-2">Phụ kiện</h3>
                                <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Chuột</li>
                                <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Bàn phím</li>
                                <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Tai nghe</li>
                            </ul>
                        </div>
                    </li>
                    <li className="group relative">
                        <button className="group w-full text-left px-6 py-2 text-gray-700 hover:bg-[#E61E4D] hover:text-white font-medium transition-colors duration-150 flex items-center justify-between cursor-pointer">
                            Laptop <FaChevronRight size={12} className="text-gray-500 group-hover:text-white" />
                        </button>

                        {/* Mega menu */}
                        <div className="absolute left-full top-0 bg-white border border-gray-200 rounded-xl hidden group-hover:flex w-[950px] h-[400px] p-6 gap-8 transition-all duration-200 ease-in-out z-50">
                            {/* Cột 1 */}
                            <ul className="flex-1">
                                <h3 className="font-semibold text-gray-900 mb-2">Thương hiệu</h3>
                                <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Macbook</li>
                                <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Dell</li>
                                <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Asus</li>
                            </ul>

                            {/* Cột 2 */}
                            <ul className="flex-1">
                                <h3 className="font-semibold text-gray-900 mb-2">Dòng sản phẩm</h3>
                                <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Gaming</li>
                                <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Văn phòng</li>
                                <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Đồ họa</li>
                            </ul>

                            {/* Cột 3 */}
                            <ul className="flex-1">
                                <h3 className="font-semibold text-gray-900 mb-2">Phụ kiện</h3>
                                <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Chuột</li>
                                <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Bàn phím</li>
                                <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Tai nghe</li>
                            </ul>
                        </div>
                    </li>
                    <li className="group relative">
                        <button className="group w-full text-left px-6 py-2 text-gray-700 hover:bg-[#E61E4D] hover:text-white font-medium transition-colors duration-150 flex items-center justify-between cursor-pointer">
                            Laptop <FaChevronRight size={12} className="text-gray-500 group-hover:text-white" />
                        </button>

                        {/* Mega menu */}
                        <div className="absolute left-full top-0 bg-white border border-gray-200 rounded-xl hidden group-hover:flex w-[950px] h-[400px] p-6 gap-8 transition-all duration-200 ease-in-out z-50">
                            {/* Cột 1 */}
                            <ul className="flex-1">
                                <h3 className="font-semibold text-gray-900 mb-2">Thương hiệu</h3>
                                <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Macbook</li>
                                <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Dell</li>
                                <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Asus</li>
                            </ul>

                            {/* Cột 2 */}
                            <ul className="flex-1">
                                <h3 className="font-semibold text-gray-900 mb-2">Dòng sản phẩm</h3>
                                <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Gaming</li>
                                <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Văn phòng</li>
                                <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Đồ họa</li>
                            </ul>

                            {/* Cột 3 */}
                            <ul className="flex-1">
                                <h3 className="font-semibold text-gray-900 mb-2">Phụ kiện</h3>
                                <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Chuột</li>
                                <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Bàn phím</li>
                                <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Tai nghe</li>
                            </ul>
                        </div>
                    </li>
                    <li className="group relative">
                        <button className="group w-full text-left px-6 py-2 text-gray-700 hover:bg-[#E61E4D] hover:text-white font-medium transition-colors duration-150 flex items-center justify-between cursor-pointer">
                            Laptop <FaChevronRight size={12} className="text-gray-500 group-hover:text-white" />
                        </button>

                        {/* Mega menu */}
                        <div className="absolute left-full top-0 bg-white border border-gray-200 rounded-xl hidden group-hover:flex w-[950px] h-[400px] p-6 gap-8 transition-all duration-200 ease-in-out z-50">
                            {/* Cột 1 */}
                            <ul className="flex-1">
                                <h3 className="font-semibold text-gray-900 mb-2">Thương hiệu</h3>
                                <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Macbook</li>
                                <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Dell</li>
                                <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Asus</li>
                            </ul>

                            {/* Cột 2 */}
                            <ul className="flex-1">
                                <h3 className="font-semibold text-gray-900 mb-2">Dòng sản phẩm</h3>
                                <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Gaming</li>
                                <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Văn phòng</li>
                                <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Đồ họa</li>
                            </ul>
                            {/* Cột 3 */}
                            <ul className="flex-1">
                                <h3 className="font-semibold text-gray-900 mb-2">Phụ kiện</h3>
                                <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Chuột</li>
                                <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Bàn phím</li>
                                <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Tai nghe</li>
                            </ul>
                        </div>
                    </li>
                    
                </ul>
            </div>
        );
    }
};

export default CategoryMenu;