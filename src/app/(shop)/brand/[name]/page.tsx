import React, { use } from "react";
import { FaChevronRight, FaHome } from "react-icons/fa";
import Link from "next/link";
import { notFound } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import BrandProductClient from "./BrandProduct";

const baseUrl = (process.env.SPRING_BACKEND_URL || 'http://localhost:8080') + '/api';

export default async function BrandPage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;
  const nameId = Number(name);
  if (isNaN(nameId)) notFound();

  const [productsRes, brandRes] = await Promise.all([
    fetch(`${baseUrl}/products?brandId=${nameId}`, { cache: "no-store" }),
    fetch(`${baseUrl}/brands/${nameId}`, { cache: "no-store" })
  ]);

  if (!productsRes.ok || !brandRes.ok) notFound();

  const products = await productsRes.json();
  const brand = await brandRes.json();
  return (
    <>
      <div className="flex items-center text-gray-600 text-base mb-6">
        <FaHome className="mr-2 text-gray-500" />
        <Link href="/" className="hover:text-[#E61E4D] transition">
          Trang chủ
        </Link>
        <FaChevronRight className="mx-2 text-gray-400" />
        <span className="font-medium text-gray-800 capitalize">{brand.name}</span>
      </div>
      <h1 className="text-2xl font-bold mb-6 capitalize">{brand.name}</h1>
      {/* {products.content.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3">
          {products.content.map((product: any) => (
            <ProductCard key={product.id} product={{
              ...product,
              inWishlist: wishlistIds.has(product.id),
            }}  />
          ))}
        </div>
      ) : (
        <p className="text-gray-500 italic mb-30">Không có sản phẩm.</p>
      )} */}
      <BrandProductClient products={products.content} />
    </>
  );
}
