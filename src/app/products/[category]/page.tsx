// app/products/[category]/page.tsx
"use client";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";
import { categories } from "@/data/category";
import React from "react";
import { FaChevronRight, FaHome } from "react-icons/fa";
import Link from "next/link";

export default function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = React.use(params);

  // Lọc sản phẩm theo danh mục
  const filteredProducts = products.filter(
    (p) => categories.find((c) => c.id === p.category_id)?.name.toLowerCase() === category.toLowerCase()
  );

  return (
    <>
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

    {/* Danh sách sản phẩm */}
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3">
      {filteredProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
    </>
  );
}