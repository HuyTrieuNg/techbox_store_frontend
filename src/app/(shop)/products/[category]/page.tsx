// "use client";
// import ProductCard from "@/components/ProductCard";
// import { products } from "@/data/products";
// import { categories } from "@/data/category";
// import React, { useState } from "react";
// import { FaChevronRight, FaHome, FaChevronDown, FaChevronUp } from "react-icons/fa";
// import Link from "next/link";
// import Slider from "rc-slider";
// import "rc-slider/assets/index.css";

// export default async function CategoryPage({
//   params,
// }: {
//   params: Promise<{ category: string }>;
// }) {
//   const { category } = await params;

//   // Lọc theo danh mục
//   const categoryProducts = products.filter(
//     (p) =>
//       categories.find((c) => c.id === p.category_id)?.name.toLowerCase() ===
//       category.toLowerCase()
//   );

//   // Tìm min - max
//   const min = Math.min(...categoryProducts.map((p) => p.variations[0].price));
//   const max = Math.max(...categoryProducts.map((p) => p.variations[0].price));

//   // State
//   const [priceRange, setPriceRange] = useState<[number, number]>([min, max]);
//   const [showFilter, setShowFilter] = useState(false);

//   // Lọc sản phẩm
//   const filteredProducts = categoryProducts.filter(
//     (p) => p.variations[0].price >= priceRange[0] && p.variations[0].price <= priceRange[1]
//   );

//   return (
//     <>
//       {/* Breadcrumb */}
//       <div className="flex items-center text-gray-600 text-base mb-6">
//         <FaHome className="mr-2 text-gray-500" />
//         <Link href="/" className="hover:text-[#E61E4D] transition">
//           Trang chủ
//         </Link>
//         <FaChevronRight className="mx-2 text-gray-400" />
//         <span className="font-medium text-gray-800 capitalize">{category}</span>
//       </div>

//       {/* Tiêu đề */}
//       <h1 className="text-2xl font-bold mb-6 capitalize">{category}</h1>

//       {/* Nút lọc */}
//       <div className="flex items-center gap-4 mb-6">
//         <button
//           onClick={() => setShowFilter(!showFilter)}
//           className="border border-gray-300 rounded-lg px-5 py-2 flex items-center gap-2 hover:bg-gray-100 transition"
//         >
//           <span className="font-medium text-gray-700">Giá</span>
//           {showFilter ? (
//             <FaChevronUp className="text-gray-500 text-sm" />
//           ) : (
//             <FaChevronDown className="text-gray-500 text-sm" />
//           )}
//         </button>
//       </div>

//       {/* Bộ lọc giá (ẩn/hiện khi bấm nút) */}
//       {showFilter && (
//         <div className="mb-8 w-64 bg-white p-5 rounded-xl shadow-sm border border-gray-200 animate-fadeIn">
//           <h2 className="text-lg font-semibold mb-4">Lọc theo giá</h2>
//           <div className="px-2">
//             <Slider
//               range
//               min={min}
//               max={max}
//               value={priceRange}
//               onChange={(val) => setPriceRange(val as [number, number])}
//               trackStyle={[{ backgroundColor: "#E61E4D" }]}
//               handleStyle={[
//                 { borderColor: "#E61E4D" },
//                 { borderColor: "#E61E4D" },
//               ]}
//             />
//             <div className="flex justify-between mt-3 text-gray-700 text-sm">
//               <span>{priceRange[0].toLocaleString("vi-VN")}₫</span>
//               <span>{priceRange[1].toLocaleString("vi-VN")}₫</span>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Danh sách sản phẩm */}
//       {filteredProducts.length > 0 ? (
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3">
//           {filteredProducts.map((product) => (
//             <ProductCard key={product.id} product={product} />
//           ))}
//         </div>
//       ) : (
//         <p className="text-gray-500 italic">Không có sản phẩm nào trong tầm giá này.</p>
//       )}
//     </>
//   );
// }

"use client";
import ProductCard from "@/components/ProductCard";
import { useProducts } from "@/hooks/useProduct";
import React, { useState } from "react";
import { FaChevronRight, FaHome, FaChevronDown, FaChevronUp } from "react-icons/fa";
import Link from "next/link";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { useCategories } from "@/hooks/useCategory";

export default function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = React.use(params);
  const categoryId = Number(category);
  const { getCategoryById } = useCategories();
  const categoryDetail = getCategoryById(categoryId);

  const { getBreadcrumbPath, isLoading: loadingCategories } = useCategories();
  const breadcrumb = getBreadcrumbPath(categoryId);
  const { products, isLoading, error } = useProducts({
    categoryId: categoryId,
    sortBy: "id",
    sortDirection: "ASC",
    page: 0,
    size: 20,
  });
if (breadcrumb.length === 0) return <div className="text-center py-10 text-red-500">Danh mục không tồn tại</div>;

  return (
    <>
      {/* Breadcrumb */}
      <div className="flex items-center text-gray-600 text-base mb-6">
        <FaHome className="mr-2 text-gray-500" />
        <Link href="/" className="hover:text-[#E61E4D] transition">
          Trang chủ
        </Link>
        {/* <FaChevronRight className="mx-2 text-gray-400" />
        <span className="font-medium text-gray-800 capitalize">{categoryDetail?.parentCategoryName}</span>
        <FaChevronRight className="mx-2 text-gray-400" />
        <span className="font-medium text-gray-800 capitalize">{categoryDetail?.name}</span> */}
        {breadcrumb.map((cat, index) => (
          <React.Fragment key={cat.id}>
            <FaChevronRight className="mx-2 text-gray-400 flex-shrink-0" />
            {index === breadcrumb.length - 1 ? (
              <span className="font-medium text-gray-800">{cat.name}</span>
            ) : (
              <Link
                href={`/products/${cat.id}`}
                className="hover:text-[#E61E4D] transition"
              >
                {cat.name}
              </Link>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Tiêu đề */}
      <h1 className="text-2xl font-bold mb-6 capitalize">{categoryDetail?.name}</h1>

      {/* Danh sách sản phẩm */}
      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500 italic">Không có sản phẩm.</p>
      )}
    </>
  );
}
