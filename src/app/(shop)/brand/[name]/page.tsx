"use client";
import React, { use } from "react";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";
import { brands } from "@/data/brand";
import { FaChevronRight, FaHome } from "react-icons/fa";
import Link from "next/link";

export default function BrandPage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = use(params);

  // Tìm thương hiệu tương ứng
  const brandObj = brands.find(
    (b) => b.name.toLowerCase() === decodeURIComponent(name).toLowerCase()
  );

  // Lọc sản phẩm theo brand
  const filteredProducts = products.filter((p) => p.brand_id === brandObj?.id);

  return (
    <>
      <div className="flex items-center text-gray-600 text-base mb-6">
        <FaHome className="mr-2 text-gray-500" />
        <Link href="/" className="hover:text-[#E61E4D] transition">
          Trang chủ
        </Link>
        <FaChevronRight className="mx-2 text-gray-400" />
        <span className="font-medium text-gray-800 uppercase">{name}</span>
      </div>

      {/* Tiêu đề */}
      <h1 className="text-2xl font-bold mb-6 uppercase">{name}</h1>

      {/* Danh sách sản phẩm */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500">Không có sản phẩm cho thương hiệu này.</p>
      )}
    </>
  );
}
