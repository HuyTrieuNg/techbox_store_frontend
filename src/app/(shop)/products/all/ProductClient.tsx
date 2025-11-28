"use client";

import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "next/navigation";

import Pagination from "./Pagination";
import ProductCard from "@/components/ProductCard";
import { ProductFilterParams } from "./Filter";
import ProductFilters from "./Filter";
import { useWishlist } from "@/hooks/useWishList";
import { ProductService } from "@/services/productService";


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
  const searchParams = useSearchParams();
  const [data, setData] = useState<ProductResponse>(initialData);
  const [loading, setLoading] = useState(false);
  const [isAISearch, setIsAISearch] = useState(false);
  const { wishlistIds } = useWishlist();

  const [filters, setFilters] = useState<ProductFilterParams>({
    name: "",
    brandId: undefined,
    categoryId: undefined,
    minPrice: undefined,
    maxPrice: undefined,
  });

  // Check for AI search params on mount
  useEffect(() => {
    const searchType = searchParams.get('search_type');
    const spus = searchParams.get('spus');
    const query = searchParams.get('query');

    if (searchType && spus) {
      setIsAISearch(true);
      fetchAISearchResults(spus.split(','), searchType, query || '');
    }
  }, [searchParams]);

  const fetchAISearchResults = async (spus: string[], searchType: string, query: string) => {
    setLoading(true);
    try {
      const products = await ProductService.fetchProductsBySpus(spus);

      setData({
        content: products,
        page: {
          size: products.length,
          number: 0,
          totalElements: products.length,
          totalPages: 1,
        },
      });
    } catch (error) {
      console.error('Error fetching AI search results:', error);
      setData({ content: [], page: { size: 0, number: 0, totalElements: 0, totalPages: 0 } });
    } finally {
      setLoading(false);
    }
  };

  const fetchProducts = useCallback(async (newFilters?: ProductFilterParams) => {
    setLoading(true);
    const params = new URLSearchParams();

    const f = newFilters || filters;

    if (f.name) params.append("name", f.name);
    if (f.brandId) params.append("brandId", f.brandId.toString());
    if (f.categoryId) params.append("categoryId", f.categoryId.toString());
    if (f.minPrice !== undefined) params.append("minPrice", f.minPrice.toString());
    if (f.maxPrice !== undefined) params.append("maxPrice", f.maxPrice.toString());

    params.set("page", "0");
    params.set("size", "20");

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

  const handleFiltersChange = (newFilters: ProductFilterParams) => {
    setIsAISearch(false);
    setFilters(newFilters);
    fetchProducts(newFilters);
  };

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(window.location.search);
    params.set("page", page.toString());

    window.history.replaceState({}, "", `${window.location.pathname}?${params.toString()}`);
    fetchProducts();
  };

  const searchType = searchParams.get('search_type');
  const searchQuery = searchParams.get('query');

  return (
    <>
      {/* AI Search Header */}
      {isAISearch && (
        <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
          <h2 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-1">
            🔍 Kết quả tìm kiếm AI {searchType === 'text' ? 'bằng văn bản' : 'bằng hình ảnh'}
          </h2>
          {searchQuery && searchType === 'text' && (
            <p className="text-sm text-blue-700 dark:text-blue-300">
              Truy vấn: "{searchQuery}"
            </p>
          )}
          <p className="text-sm text-blue-600 dark:text-blue-400 mt-1">
            Tìm thấy {data.content.length} sản phẩm phù hợp
          </p>
        </div>
      )}

      {!isAISearch && (
        <ProductFilters
          filters={filters}
          onFiltersChange={handleFiltersChange}
          brands={brands}
          categories={categories}
        />
      )}

      {loading && <div className="text-center py-12">Đang tải...</div>}

      {/* Grid sản phẩm */}
      {data.content.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {data.content.map((product) => (
            <ProductCard key={product.id} product={{
              ...product,
              inWishlist: wishlistIds.has(product.id),
            }} />
          ))}
        </div>
      ) : (
        !loading && <p className="text-center py-12 text-gray-500">Không tìm thấy sản phẩm nào.</p>
      )}

      {/* Pagination */}
      {!loading && !isAISearch && data.page && data.page.totalPages > 1 && (
        <Pagination
          currentPage={data.page.number}
          totalPages={data.page.totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </>
  );
}