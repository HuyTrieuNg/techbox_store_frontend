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
