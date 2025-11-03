// // app/products/[category]/page.tsx
// "use client";
// import ProductCard from "@/components/ProductCard";
// import { products } from "@/data/products";
// import { categories } from "@/data/category";
// import React from "react";
// import { FaChevronRight, FaHome } from "react-icons/fa";
// import Link from "next/link";

// export default function CategoryPage({
//   params,
// }: {
//   params: Promise<{ category: string }>;
// }) {
//   const { category } = React.use(params);

//   // Lọc sản phẩm theo danh mục
//   const filteredProducts = products.filter(
//     (p) => categories.find((c) => c.id === p.category_id)?.name.toLowerCase() === category.toLowerCase()
//   );

//   return (
//     <>
//     <div className="flex items-center text-gray-600 text-base mb-6">
//       <FaHome className="mr-2 text-gray-500" />
//       <Link href="/" className="hover:text-[#E61E4D] transition">
//         Trang chủ
//       </Link>
//       <FaChevronRight className="mx-2 text-gray-400" />
//       <span className="font-medium text-gray-800 capitalize">{category}</span>
//     </div>

//     {/* Tiêu đề */}
//     <h1 className="text-2xl font-bold mb-6 capitalize">{category}</h1>

//     {/* Danh sách sản phẩm */}
//     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3">
//       {filteredProducts.map((product) => (
//         <ProductCard key={product.id} product={product} />
//       ))}
//     </div>
//     </>
//   );
// }

"use client";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";
import { categories } from "@/data/category";
import React, { useState } from "react";
import { FaChevronRight, FaHome, FaChevronDown, FaChevronUp } from "react-icons/fa";
import Link from "next/link";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

export default function CategoryPage({
  params,
}: {
  params: { category: string };
}) {
  const { category } = params;

  // Lọc theo danh mục
  const categoryProducts = products.filter(
    (p) =>
      categories.find((c) => c.id === p.category_id)?.name.toLowerCase() ===
      category.toLowerCase()
  );

  // Tìm min - max
  const min = Math.min(...categoryProducts.map((p) => p.variations[0].price));
  const max = Math.max(...categoryProducts.map((p) => p.variations[0].price));

  // State
  const [priceRange, setPriceRange] = useState<[number, number]>([min, max]);
  const [showFilter, setShowFilter] = useState(false);

  // Lọc sản phẩm
  const filteredProducts = categoryProducts.filter(
    (p) => p.variations[0].price >= priceRange[0] && p.variations[0].price <= priceRange[1]
  );

  return (
    <>
      {/* Breadcrumb */}
      <div className="flex items-center text-gray-600 text-base mb-6">
        <FaHome className="mr-2 text-gray-500" />
        <Link href="/" className="hover:text-[#E61E4D] transition">
          Trang chủ
        </Link>
        <FaChevronRight className="mx-2 text-gray-400" />
        <span className="font-medium text-gray-800 capitalize">{category}</span>
      </div>

      {/* Tiêu đề */}
      <h1 className="text-2xl font-bold mb-6 capitalize">{category}</h1>

      {/* Nút lọc */}
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => setShowFilter(!showFilter)}
          className="border border-gray-300 rounded-lg px-5 py-2 flex items-center gap-2 hover:bg-gray-100 transition"
        >
          <span className="font-medium text-gray-700">Giá</span>
          {showFilter ? (
            <FaChevronUp className="text-gray-500 text-sm" />
          ) : (
            <FaChevronDown className="text-gray-500 text-sm" />
          )}
        </button>
      </div>

      {/* Bộ lọc giá (ẩn/hiện khi bấm nút) */}
      {showFilter && (
        <div className="mb-8 w-64 bg-white p-5 rounded-xl shadow-sm border border-gray-200 animate-fadeIn">
          <h2 className="text-lg font-semibold mb-4">Lọc theo giá</h2>
          <div className="px-2">
            <Slider
              range
              min={min}
              max={max}
              value={priceRange}
              onChange={(val) => setPriceRange(val as [number, number])}
              trackStyle={[{ backgroundColor: "#E61E4D" }]}
              handleStyle={[
                { borderColor: "#E61E4D" },
                { borderColor: "#E61E4D" },
              ]}
            />
            <div className="flex justify-between mt-3 text-gray-700 text-sm">
              <span>{priceRange[0].toLocaleString("vi-VN")}₫</span>
              <span>{priceRange[1].toLocaleString("vi-VN")}₫</span>
            </div>
          </div>
        </div>
      )}

      {/* Danh sách sản phẩm */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500 italic">Không có sản phẩm nào trong tầm giá này.</p>
      )}
    </>
  );
}
