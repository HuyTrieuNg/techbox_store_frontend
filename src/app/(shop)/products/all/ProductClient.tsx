"use client";

import { useState, useEffect, useCallback } from "react";

import Pagination from "./Pagination";
import ProductCard from "@/components/ProductCard";
import { ProductFilterParams } from "./Filter";
import ProductFilters from "./Filter";


export type Product = {
  id: number;
  name: string;
  imageUrl: string | null;
  displayOriginalPrice: number | null;
  displaySalePrice: number | null;
  averageRating: number;
  totalRatings: number;
};

export type ProductResponse = {
  content: Product[];
  page: {
    size: number;
    number: number;
    totalElements: number;
    totalPages: number;
  };
};

type Props = {
  initialData: ProductResponse;
  baseUrl: string;
  brands: { id: number; name: string }[];
  categories: { id: number; name: string; displayName?: string }[];
};

export default function ProductsClient({ initialData, baseUrl, brands, categories }: Props) {
  const [data, setData] = useState<ProductResponse>(initialData);
  const [loading, setLoading] = useState(false);

  // Lấy filter từ URL khi load lần đầu (nếu có)
  const [filters, setFilters] = useState<ProductFilterParams>({
    name: "",
    brandId: undefined,
    categoryId: undefined,
    minPrice: undefined,
    maxPrice: undefined,
  });

  const fetchProducts = useCallback(async (newFilters?: ProductFilterParams) => {
    setLoading(true);
    const params = new URLSearchParams();

    const f = newFilters || filters;

    if (f.name) params.append("name", f.name);
    if (f.brandId) params.append("brandId", f.brandId.toString());
    if (f.categoryId) params.append("categoryId", f.categoryId.toString());
    if (f.minPrice !== undefined) params.append("minPrice", f.minPrice.toString());
    if (f.maxPrice !== undefined) params.append("maxPrice", f.maxPrice.toString());

    params.set("page", "0"); // luôn về trang 1 khi lọc
    params.set("size", "20");

    // Sync URL
    const url = `${window.location.pathname}?${params.toString()}`;
    window.history.replaceState({}, "", url);

    try {
      const res = await fetch(`${baseUrl}/products?${params.toString()}`);
      if (res.ok) setData(await res.json());
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [filters, baseUrl]);

  // Khi filter thay đổi → gọi API
  const handleFiltersChange = (newFilters: ProductFilterParams) => {
    setFilters(newFilters);
    fetchProducts(newFilters);
  };

  // Phân trang
  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(window.location.search);
    params.set("page", page.toString());

    window.history.replaceState({}, "", `${window.location.pathname}?${params.toString()}`);
    fetchProducts(); // giữ nguyên filter, chỉ đổi page
  };

  console.log("danh muc", categories);

  return (
    <>
      <ProductFilters
        filters={filters}
        onFiltersChange={handleFiltersChange}
        brands={brands}
        categories={categories}
      />

      {loading && <div className="text-center py-12">Đang tải...</div>}

      {/* Grid sản phẩm */}
      {data.content.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {data.content.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        !loading && <p className="text-center py-12 text-gray-500">Không tìm thấy sản phẩm nào.</p>
      )}

      {/* Pagination */}
      {!loading && data.page && data.page.totalPages > 1 && (
        <Pagination
          currentPage={data.page.number}
          totalPages={data.page.totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </>
  );
}