"use client";

import ProductCard from "@/components/ProductCard";
import { useWishlist } from "@/hooks/useWishList";

export default function BrandProductClient({ products }: { products: any[] }) {
  const { wishlistIds } = useWishlist();

  if (products.length === 0) {
    return <p className="text-gray-500 italic mb-30">Không có sản phẩm.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={{
            ...product,
            inWishlist: wishlistIds.has(product.id),
          }}
        />
      ))}
    </div>
  );
}
