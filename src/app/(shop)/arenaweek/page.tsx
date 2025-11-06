"use client";
import React from "react";
import { FaChevronRight, FaHome } from "react-icons/fa";
import Link from "next/link";
import ProductCardFlashSale from "@/components/ProductCartFlashSale";
import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";

export default function ArenaWeekPage() {

  return (
    <>
      <div className="flex items-center text-gray-600 text-base mb-6">
        <FaHome className="mr-2 text-gray-500" />
        <Link href="/" className="hover:text-[#E61E4D] transition">
          Trang chủ
        </Link>
        <FaChevronRight className="mx-2 text-gray-400" />
        <span className="font-medium text-gray-800 capitalize">Gaming giá hời - Deal mới mỗi tuần</span>
      </div>

      {/* Danh sách sản phẩm */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3">
        {products.map((p) => (
          <ProductCard key={p.id} product={p}/>
        ))}
      </div>
    </>
  );
}