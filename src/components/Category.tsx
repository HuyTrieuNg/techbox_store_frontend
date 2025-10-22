// import { useCategories } from '@/hooks/useProduct';
// import React from 'react';
// import { FaChevronRight } from 'react-icons/fa';

// const CategoryMenu = ({ type = "menu" }) => {

//     const { categories, isLoading, error } = useCategories();
//     if (isLoading) return <div>Loading...</div>;
//     if (error) return <div>Error: {error.message}</div>;
//     if (!categories || categories.length === 0) return <div>No categories found</div>;
//     if (type === "menu") {
//         return (
//             <div className="absolute top-14 left-0 bg-white border border-gray-200 rounded-md w-60 z-10 transition-all duration-300 ease-in-out">
//                 <ul className="flex flex-col py-3">
//                     <li className="group relative">
//                         <button className="group w-full text-left px-6 py-2 text-gray-700 hover:bg-[#E61E4D] hover:text-white font-medium transition-colors duration-150 flex items-center justify-between cursor-pointer">
//                             Laptop <FaChevronRight size={12} className="text-gray-500 group-hover:text-white" />
//                         </button>

//                         {/* Mega menu */}
//                         <div className="absolute left-full top-0 bg-white border border-gray-200 rounded-md hidden group-hover:flex w-[950px] h-[400px] p-6 gap-8 transition-all duration-200 ease-in-out z-50">
//                             {/* Cột 1 */}
//                             <ul className="flex-1">
//                                 <h3 className="font-semibold text-gray-900 mb-2">Thương hiệu</h3>
//                                 <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Macbook</li>
//                                 <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Dell</li>
//                                 <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Asus</li>
//                             </ul>

//                             {/* Cột 2 */}
//                             <ul className="flex-1">
//                                 <h3 className="font-semibold text-gray-900 mb-2">Dòng sản phẩm</h3>
//                                 <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Gaming</li>
//                                 <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Văn phòng</li>
//                                 <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Đồ họa</li>
//                             </ul>

//                             {/* Cột 3 */}
//                             <ul className="flex-1">
//                                 <h3 className="font-semibold text-gray-900 mb-2">Phụ kiện</h3>
//                                 <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Chuột</li>
//                                 <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Bàn phím</li>
//                                 <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Tai nghe</li>
//                             </ul>
//                         </div>
//                     </li>
//                     <li className="group relative">
//                         <button className="group w-full text-left px-6 py-2 text-gray-700 hover:bg-[#E61E4D] hover:text-white font-medium transition-colors duration-150 flex items-center justify-between cursor-pointer">
//                             Laptop <FaChevronRight size={12} className="text-gray-500 group-hover:text-white" />
//                         </button>

//                         {/* Mega menu */}
//                         <div className="absolute left-full top-0 bg-white border border-gray-200 rounded-md hidden group-hover:flex w-[950px] h-[400px] p-6 gap-8 transition-all duration-200 ease-in-out z-50">
//                             {/* Cột 1 */}
//                             <ul className="flex-1">
//                                 <h3 className="font-semibold text-gray-900 mb-2">Thương hiệu</h3>
//                                 <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Macbook</li>
//                                 <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Dell</li>
//                                 <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Asus</li>
//                             </ul>

//                             {/* Cột 2 */}
//                             <ul className="flex-1">
//                                 <h3 className="font-semibold text-gray-900 mb-2">Dòng sản phẩm</h3>
//                                 <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Gaming</li>
//                                 <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Văn phòng</li>
//                                 <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Đồ họa</li>
//                             </ul>

//                             {/* Cột 3 */}
//                             <ul className="flex-1">
//                                 <h3 className="font-semibold text-gray-900 mb-2">Phụ kiện</h3>
//                                 <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Chuột</li>
//                                 <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Bàn phím</li>
//                                 <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Tai nghe</li>
//                             </ul>
//                         </div>
//                     </li>
//                     <li className="group relative">
//                         <button className="group w-full text-left px-6 py-2 text-gray-700 hover:bg-[#E61E4D] hover:text-white font-medium transition-colors duration-150 flex items-center justify-between cursor-pointer">
//                             Laptop <FaChevronRight size={12} className="text-gray-500 group-hover:text-white" />
//                         </button>

//                         {/* Mega menu */}
//                         <div className="absolute left-full top-0 bg-white border border-gray-200 rounded-md hidden group-hover:flex w-[950px] h-[400px] p-6 gap-8 transition-all duration-200 ease-in-out z-50">
//                             {/* Cột 1 */}
//                             <ul className="flex-1">
//                                 <h3 className="font-semibold text-gray-900 mb-2">Thương hiệu</h3>
//                                 <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Macbook</li>
//                                 <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Dell</li>
//                                 <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Asus</li>
//                             </ul>

//                             {/* Cột 2 */}
//                             <ul className="flex-1">
//                                 <h3 className="font-semibold text-gray-900 mb-2">Dòng sản phẩm</h3>
//                                 <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Gaming</li>
//                                 <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Văn phòng</li>
//                                 <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Đồ họa</li>
//                             </ul>

//                             {/* Cột 3 */}
//                             <ul className="flex-1">
//                                 <h3 className="font-semibold text-gray-900 mb-2">Phụ kiện</h3>
//                                 <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Chuột</li>
//                                 <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Bàn phím</li>
//                                 <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Tai nghe</li>
//                             </ul>
//                         </div>
//                     </li>
//                     <li className="group relative">
//                         <button className="group w-full text-left px-6 py-2 text-gray-700 hover:bg-[#E61E4D] hover:text-white font-medium transition-colors duration-150 flex items-center justify-between cursor-pointer">
//                             Laptop <FaChevronRight size={12} className="text-gray-500 group-hover:text-white" />
//                         </button>

//                         {/* Mega menu */}
//                         <div className="absolute left-full top-0 bg-white border border-gray-200 rounded-md hidden group-hover:flex w-[950px] h-[400px] p-6 gap-8 transition-all duration-200 ease-in-out z-50">
//                             {/* Cột 1 */}
//                             <ul className="flex-1">
//                                 <h3 className="font-semibold text-gray-900 mb-2">Thương hiệu</h3>
//                                 <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Macbook</li>
//                                 <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Dell</li>
//                                 <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Asus</li>
//                             </ul>

//                             {/* Cột 2 */}
//                             <ul className="flex-1">
//                                 <h3 className="font-semibold text-gray-900 mb-2">Dòng sản phẩm</h3>
//                                 <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Gaming</li>
//                                 <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Văn phòng</li>
//                                 <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Đồ họa</li>
//                             </ul>

//                             {/* Cột 3 */}
//                             <ul className="flex-1">
//                                 <h3 className="font-semibold text-gray-900 mb-2">Phụ kiện</h3>
//                                 <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Chuột</li>
//                                 <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Bàn phím</li>
//                                 <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Tai nghe</li>
//                             </ul>
//                         </div>
//                     </li>
//                     <li className="group relative">
//                         <button className="group w-full text-left px-6 py-2 text-gray-700 hover:bg-[#E61E4D] hover:text-white font-medium transition-colors duration-150 flex items-center justify-between cursor-pointer">
//                             Laptop <FaChevronRight size={12} className="text-gray-500 group-hover:text-white" />
//                         </button>

//                         {/* Mega menu */}
//                         <div className="absolute left-full top-0 bg-white border border-gray-200 rounded-md hidden group-hover:flex w-[950px] h-[400px] p-6 gap-8 transition-all duration-200 ease-in-out z-50">
//                             {/* Cột 1 */}
//                             <ul className="flex-1">
//                                 <h3 className="font-semibold text-gray-900 mb-2">Thương hiệu</h3>
//                                 <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Macbook</li>
//                                 <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Dell</li>
//                                 <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Asus</li>
//                             </ul>

//                             {/* Cột 2 */}
//                             <ul className="flex-1">
//                                 <h3 className="font-semibold text-gray-900 mb-2">Dòng sản phẩm</h3>
//                                 <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Gaming</li>
//                                 <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Văn phòng</li>
//                                 <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Đồ họa</li>
//                             </ul>

//                             {/* Cột 3 */}
//                             <ul className="flex-1">
//                                 <h3 className="font-semibold text-gray-900 mb-2">Phụ kiện</h3>
//                                 <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Chuột</li>
//                                 <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Bàn phím</li>
//                                 <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Tai nghe</li>
//                             </ul>
//                         </div>
//                     </li>
//                     <li className="group relative">
//                         <button className="group w-full text-left px-6 py-2 text-gray-700 hover:bg-[#E61E4D] hover:text-white font-medium transition-colors duration-150 flex items-center justify-between cursor-pointer">
//                             Laptop <FaChevronRight size={12} className="text-gray-500 group-hover:text-white" />
//                         </button>

//                         {/* Mega menu */}
//                         <div className="absolute left-full top-0 bg-white border border-gray-200 rounded-md hidden group-hover:flex w-[950px] h-[400px] p-6 gap-8 transition-all duration-200 ease-in-out z-50">
//                             {/* Cột 1 */}
//                             <ul className="flex-1">
//                                 <h3 className="font-semibold text-gray-900 mb-2">Thương hiệu</h3>
//                                 <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Macbook</li>
//                                 <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Dell</li>
//                                 <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Asus</li>
//                             </ul>

//                             {/* Cột 2 */}
//                             <ul className="flex-1">
//                                 <h3 className="font-semibold text-gray-900 mb-2">Dòng sản phẩm</h3>
//                                 <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Gaming</li>
//                                 <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Văn phòng</li>
//                                 <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Đồ họa</li>
//                             </ul>

//                             {/* Cột 3 */}
//                             <ul className="flex-1">
//                                 <h3 className="font-semibold text-gray-900 mb-2">Phụ kiện</h3>
//                                 <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Chuột</li>
//                                 <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Bàn phím</li>
//                                 <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Tai nghe</li>
//                             </ul>
//                         </div>
//                     </li>
//                     <li className="group relative">
//                         <button className="group w-full text-left px-6 py-2 text-gray-700 hover:bg-[#E61E4D] hover:text-white font-medium transition-colors duration-150 flex items-center justify-between cursor-pointer">
//                             Laptop <FaChevronRight size={12} className="text-gray-500 group-hover:text-white" />
//                         </button>

//                         {/* Mega menu */}
//                         <div className="absolute left-full top-0 bg-white border border-gray-200 rounded-md hidden group-hover:flex w-[950px] h-[400px] p-6 gap-8 transition-all duration-200 ease-in-out z-50">
//                             {/* Cột 1 */}
//                             <ul className="flex-1">
//                                 <h3 className="font-semibold text-gray-900 mb-2">Thương hiệu</h3>
//                                 <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Macbook</li>
//                                 <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Dell</li>
//                                 <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Asus</li>
//                             </ul>

//                             {/* Cột 2 */}
//                             <ul className="flex-1">
//                                 <h3 className="font-semibold text-gray-900 mb-2">Dòng sản phẩm</h3>
//                                 <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Gaming</li>
//                                 <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Văn phòng</li>
//                                 <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Đồ họa</li>
//                             </ul>

//                             {/* Cột 3 */}
//                             <ul className="flex-1">
//                                 <h3 className="font-semibold text-gray-900 mb-2">Phụ kiện</h3>
//                                 <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Chuột</li>
//                                 <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Bàn phím</li>
//                                 <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Tai nghe</li>
//                             </ul>
//                         </div>
//                     </li>
//                     <li className="group relative">
//                         <button className="group w-full text-left px-6 py-2 text-gray-700 hover:bg-[#E61E4D] hover:text-white font-medium transition-colors duration-150 flex items-center justify-between cursor-pointer">
//                             Laptop <FaChevronRight size={12} className="text-gray-500 group-hover:text-white" />
//                         </button>

//                         {/* Mega menu */}
//                         <div className="absolute left-full top-0 bg-white border border-gray-200 rounded-md hidden group-hover:flex w-[950px] h-[400px] p-6 gap-8 transition-all duration-200 ease-in-out z-50">
//                             {/* Cột 1 */}
//                             <ul className="flex-1">
//                                 <h3 className="font-semibold text-gray-900 mb-2">Thương hiệu</h3>
//                                 <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Macbook</li>
//                                 <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Dell</li>
//                                 <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Asus</li>
//                             </ul>

//                             {/* Cột 2 */}
//                             <ul className="flex-1">
//                                 <h3 className="font-semibold text-gray-900 mb-2">Dòng sản phẩm</h3>
//                                 <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Gaming</li>
//                                 <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Văn phòng</li>
//                                 <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Đồ họa</li>
//                             </ul>
//                             {/* Cột 3 */}
//                             <ul className="flex-1">
//                                 <h3 className="font-semibold text-gray-900 mb-2">Phụ kiện</h3>
//                                 <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Chuột</li>
//                                 <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Bàn phím</li>
//                                 <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Tai nghe</li>
//                             </ul>
//                         </div>
//                     </li>

//                 </ul>
//             </div>
//         );
//     }
//     if (type === "grid") {
//         return (
//             <div className="top-14 left-0 bg-white border border-gray-300 rounded-md w-60 z-10 transition-all duration-300 ease-in-out">
//                 <ul className="flex flex-col py-3">
//                     <li className="group relative">
//                         <button className="group w-full text-left px-6 py-2 text-gray-700 hover:bg-[#E61E4D] hover:text-white font-medium transition-colors duration-150 flex items-center justify-between cursor-pointer">
//                             Laptop <FaChevronRight size={12} className="text-gray-500 group-hover:text-white" />
//                         </button>

//                         {/* Mega menu */}
//                         <div className="absolute left-full top-0 bg-white border border-gray-200 rounded-md hidden group-hover:flex w-[950px] h-[400px] p-6 gap-8 transition-all duration-200 ease-in-out z-50">
//                             {/* Cột 1 */}
//                             <ul className="flex-1">
//                                 <h3 className="font-semibold text-gray-900 mb-2">Thương hiệu</h3>
//                                 <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Macbook</li>
//                                 <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Dell</li>
//                                 <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Asus</li>
//                             </ul>

//                             {/* Cột 2 */}
//                             <ul className="flex-1">
//                                 <h3 className="font-semibold text-gray-900 mb-2">Dòng sản phẩm</h3>
//                                 <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Gaming</li>
//                                 <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Văn phòng</li>
//                                 <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Đồ họa</li>
//                             </ul>

//                             {/* Cột 3 */}
//                             <ul className="flex-1">
//                                 <h3 className="font-semibold text-gray-900 mb-2">Phụ kiện</h3>
//                                 <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Chuột</li>
//                                 <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Bàn phím</li>
//                                 <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Tai nghe</li>
//                             </ul>
//                         </div>
//                     </li>
//                     <li className="group relative">
//                         <button className="group w-full text-left px-6 py-2 text-gray-700 hover:bg-[#E61E4D] hover:text-white font-medium transition-colors duration-150 flex items-center justify-between cursor-pointer">
//                             Laptop <FaChevronRight size={12} className="text-gray-500 group-hover:text-white" />
//                         </button>

//                         {/* Mega menu */}
//                         <div className="absolute left-full top-0 bg-white border border-gray-200 rounded-md hidden group-hover:flex w-[950px] h-[400px] p-6 gap-8 transition-all duration-200 ease-in-out z-50">
//                             {/* Cột 1 */}
//                             <ul className="flex-1">
//                                 <h3 className="font-semibold text-gray-900 mb-2">Thương hiệu</h3>
//                                 <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Macbook</li>
//                                 <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Dell</li>
//                                 <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Asus</li>
//                             </ul>

//                             {/* Cột 2 */}
//                             <ul className="flex-1">
//                                 <h3 className="font-semibold text-gray-900 mb-2">Dòng sản phẩm</h3>
//                                 <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Gaming</li>
//                                 <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Văn phòng</li>
//                                 <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Đồ họa</li>
//                             </ul>

//                             {/* Cột 3 */}
//                             <ul className="flex-1">
//                                 <h3 className="font-semibold text-gray-900 mb-2">Phụ kiện</h3>
//                                 <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Chuột</li>
//                                 <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Bàn phím</li>
//                                 <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Tai nghe</li>
//                             </ul>
//                         </div>
//                     </li>
//                     <li className="group relative">
//                         <button className="group w-full text-left px-6 py-2 text-gray-700 hover:bg-[#E61E4D] hover:text-white font-medium transition-colors duration-150 flex items-center justify-between cursor-pointer">
//                             Laptop <FaChevronRight size={12} className="text-gray-500 group-hover:text-white" />
//                         </button>

//                         {/* Mega menu */}
//                         <div className="absolute left-full top-0 bg-white border border-gray-200 rounded-md hidden group-hover:flex w-[950px] h-[400px] p-6 gap-8 transition-all duration-200 ease-in-out z-50">
//                             {/* Cột 1 */}
//                             <ul className="flex-1">
//                                 <h3 className="font-semibold text-gray-900 mb-2">Thương hiệu</h3>
//                                 <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Macbook</li>
//                                 <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Dell</li>
//                                 <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Asus</li>
//                             </ul>

//                             {/* Cột 2 */}
//                             <ul className="flex-1">
//                                 <h3 className="font-semibold text-gray-900 mb-2">Dòng sản phẩm</h3>
//                                 <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Gaming</li>
//                                 <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Văn phòng</li>
//                                 <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Đồ họa</li>
//                             </ul>

//                             {/* Cột 3 */}
//                             <ul className="flex-1">
//                                 <h3 className="font-semibold text-gray-900 mb-2">Phụ kiện</h3>
//                                 <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Chuột</li>
//                                 <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Bàn phím</li>
//                                 <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Tai nghe</li>
//                             </ul>
//                         </div>
//                     </li>
//                     <li className="group relative">
//                         <button className="group w-full text-left px-6 py-2 text-gray-700 hover:bg-[#E61E4D] hover:text-white font-medium transition-colors duration-150 flex items-center justify-between cursor-pointer">
//                             Laptop <FaChevronRight size={12} className="text-gray-500 group-hover:text-white" />
//                         </button>

//                         {/* Mega menu */}
//                         <div className="absolute left-full top-0 bg-white border border-gray-200 rounded-md hidden group-hover:flex w-[950px] h-[400px] p-6 gap-8 transition-all duration-200 ease-in-out z-50">
//                             {/* Cột 1 */}
//                             <ul className="flex-1">
//                                 <h3 className="font-semibold text-gray-900 mb-2">Thương hiệu</h3>
//                                 <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Macbook</li>
//                                 <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Dell</li>
//                                 <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Asus</li>
//                             </ul>

//                             {/* Cột 2 */}
//                             <ul className="flex-1">
//                                 <h3 className="font-semibold text-gray-900 mb-2">Dòng sản phẩm</h3>
//                                 <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Gaming</li>
//                                 <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Văn phòng</li>
//                                 <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Đồ họa</li>
//                             </ul>

//                             {/* Cột 3 */}
//                             <ul className="flex-1">
//                                 <h3 className="font-semibold text-gray-900 mb-2">Phụ kiện</h3>
//                                 <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Chuột</li>
//                                 <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Bàn phím</li>
//                                 <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Tai nghe</li>
//                             </ul>
//                         </div>
//                     </li>
//                     <li className="group relative">
//                         <button className="group w-full text-left px-6 py-2 text-gray-700 hover:bg-[#E61E4D] hover:text-white font-medium transition-colors duration-150 flex items-center justify-between cursor-pointer">
//                             Laptop <FaChevronRight size={12} className="text-gray-500 group-hover:text-white" />
//                         </button>

//                         {/* Mega menu */}
//                         <div className="absolute left-full top-0 bg-white border border-gray-200 rounded-md hidden group-hover:flex w-[950px] h-[400px] p-6 gap-8 transition-all duration-200 ease-in-out z-50">
//                             {/* Cột 1 */}
//                             <ul className="flex-1">
//                                 <h3 className="font-semibold text-gray-900 mb-2">Thương hiệu</h3>
//                                 <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Macbook</li>
//                                 <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Dell</li>
//                                 <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Asus</li>
//                             </ul>

//                             {/* Cột 2 */}
//                             <ul className="flex-1">
//                                 <h3 className="font-semibold text-gray-900 mb-2">Dòng sản phẩm</h3>
//                                 <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Gaming</li>
//                                 <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Văn phòng</li>
//                                 <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Đồ họa</li>
//                             </ul>

//                             {/* Cột 3 */}
//                             <ul className="flex-1">
//                                 <h3 className="font-semibold text-gray-900 mb-2">Phụ kiện</h3>
//                                 <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Chuột</li>
//                                 <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Bàn phím</li>
//                                 <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Tai nghe</li>
//                             </ul>
//                         </div>
//                     </li>
//                     <li className="group relative">
//                         <button className="group w-full text-left px-6 py-2 text-gray-700 hover:bg-[#E61E4D] hover:text-white font-medium transition-colors duration-150 flex items-center justify-between cursor-pointer">
//                             Laptop <FaChevronRight size={12} className="text-gray-500 group-hover:text-white" />
//                         </button>

//                         {/* Mega menu */}
//                         <div className="absolute left-full top-0 bg-white border border-gray-200 rounded-md hidden group-hover:flex w-[950px] h-[400px] p-6 gap-8 transition-all duration-200 ease-in-out z-50">
//                             {/* Cột 1 */}
//                             <ul className="flex-1">
//                                 <h3 className="font-semibold text-gray-900 mb-2">Thương hiệu</h3>
//                                 <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Macbook</li>
//                                 <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Dell</li>
//                                 <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Asus</li>
//                             </ul>

//                             {/* Cột 2 */}
//                             <ul className="flex-1">
//                                 <h3 className="font-semibold text-gray-900 mb-2">Dòng sản phẩm</h3>
//                                 <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Gaming</li>
//                                 <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Văn phòng</li>
//                                 <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Đồ họa</li>
//                             </ul>

//                             {/* Cột 3 */}
//                             <ul className="flex-1">
//                                 <h3 className="font-semibold text-gray-900 mb-2">Phụ kiện</h3>
//                                 <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Chuột</li>
//                                 <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Bàn phím</li>
//                                 <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Tai nghe</li>
//                             </ul>
//                         </div>
//                     </li>
//                     <li className="group relative">
//                         <button className="group w-full text-left px-6 py-2 text-gray-700 hover:bg-[#E61E4D] hover:text-white font-medium transition-colors duration-150 flex items-center justify-between cursor-pointer">
//                             Laptop <FaChevronRight size={12} className="text-gray-500 group-hover:text-white" />
//                         </button>

//                         {/* Mega menu */}
//                         <div className="absolute left-full top-0 bg-white border border-gray-200 rounded-md hidden group-hover:flex w-[950px] h-[400px] p-6 gap-8 transition-all duration-200 ease-in-out z-50">
//                             {/* Cột 1 */}
//                             <ul className="flex-1">
//                                 <h3 className="font-semibold text-gray-900 mb-2">Thương hiệu</h3>
//                                 <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Macbook</li>
//                                 <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Dell</li>
//                                 <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Asus</li>
//                             </ul>

//                             {/* Cột 2 */}
//                             <ul className="flex-1">
//                                 <h3 className="font-semibold text-gray-900 mb-2">Dòng sản phẩm</h3>
//                                 <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Gaming</li>
//                                 <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Văn phòng</li>
//                                 <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Đồ họa</li>
//                             </ul>

//                             {/* Cột 3 */}
//                             <ul className="flex-1">
//                                 <h3 className="font-semibold text-gray-900 mb-2">Phụ kiện</h3>
//                                 <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Chuột</li>
//                                 <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Bàn phím</li>
//                                 <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Tai nghe</li>
//                             </ul>
//                         </div>
//                     </li>
//                     <li className="group relative">
//                         <button className="group w-full text-left px-6 py-2 text-gray-700 hover:bg-[#E61E4D] hover:text-white font-medium transition-colors duration-150 flex items-center justify-between cursor-pointer">
//                             Laptop <FaChevronRight size={12} className="text-gray-500 group-hover:text-white" />
//                         </button>

//                         {/* Mega menu */}
//                         <div className="absolute left-full top-0 bg-white border border-gray-200 rounded-md hidden group-hover:flex w-[950px] h-[400px] p-6 gap-8 transition-all duration-200 ease-in-out z-50">
//                             {/* Cột 1 */}
//                             <ul className="flex-1">
//                                 <h3 className="font-semibold text-gray-900 mb-2">Thương hiệu</h3>
//                                 <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Macbook</li>
//                                 <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Dell</li>
//                                 <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Asus</li>
//                             </ul>

//                             {/* Cột 2 */}
//                             <ul className="flex-1">
//                                 <h3 className="font-semibold text-gray-900 mb-2">Dòng sản phẩm</h3>
//                                 <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Gaming</li>
//                                 <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Văn phòng</li>
//                                 <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Đồ họa</li>
//                             </ul>
//                             {/* Cột 3 */}
//                             <ul className="flex-1">
//                                 <h3 className="font-semibold text-gray-900 mb-2">Phụ kiện</h3>
//                                 <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Chuột</li>
//                                 <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Bàn phím</li>
//                                 <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Tai nghe</li>
//                             </ul>
//                         </div>
//                     </li>

//                 </ul>
//             </div>
//         );
//     }
// };

// export default CategoryMenu;

import { useCategories, useChildCategories } from '@/hooks/useProduct';
import React from 'react';
import { FaChevronRight } from 'react-icons/fa';

interface CategoryMenuProps {
    type?: 'menu' | 'grid';
}

const CategoryMenu: React.FC<CategoryMenuProps> = ({ type = 'menu' }) => {
    const { categories, error } = useCategories();

    if (error) return <div>Error: {error.message}</div>;

    const renderMegaMenu = (categoryId: number) => {
        // const { categories: childCategories } = useChildCategories(categoryId);
        return (
            <div className="absolute left-full top-0 bg-white border border-gray-200 rounded-md hidden group-hover:flex w-[950px] h-[400px] p-6 gap-8 transition-all duration-200 ease-in-out z-50">
                <ul className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-2">Thương hiệu</h3>
                    <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Macbook</li>
                    <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Dell</li>
                    <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Asus</li>
                </ul>
                <ul className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-2">Dòng sản phẩm</h3>
                    <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Gaming</li>
                    <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Văn phòng</li>
                    <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Đồ họa</li>
                </ul>
                <ul className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-2">Phụ kiện</h3>
                    <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Chuột</li>
                    <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Bàn phím</li>
                    <li className="py-1 text-gray-700 hover:text-[#E61E4D] cursor-pointer">Tai nghe</li>
                </ul>
            </div>
        );
    };

    const renderMenu = () => (
        <div
            className={`${type === 'grid' ? '' : 'absolute'
                } top-14 left-0 bg-white border border-gray-300 rounded-md w-60 z-10 transition-all`}
        >
            <ul className="flex flex-col py-3">
                {categories?.map((category) => (
                    <li key={category.id} className="group relative">
                        <button className="group w-full text-left px-6 py-2 text-gray-700 hover:bg-[#E61E4D] hover:text-white font-medium transition-colors duration-150 flex items-center justify-between cursor-pointer">
                            {category.name}{' '}
                            <FaChevronRight size={12} className="text-gray-500 group-hover:text-white" />
                        </button>
                        {renderMegaMenu(category.id)}
                    </li>
                ))}
            </ul>
        </div>
    );

    return type === 'menu' || type === 'grid' ? renderMenu() : null;
};

export default CategoryMenu;