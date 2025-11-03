import useSWR from "swr";
import { ProductService } from "@/services/productService";
import { ProductDetail } from "@/features/product";

interface UseProductsParams {
  categoryId?: number | string;
  sortBy?: string;
  sortDirection?: "ASC" | "DESC";
  page?: number;
  size?: number;
}

export function useProducts(params?: UseProductsParams) {
  // Dùng key động để SWR tự cache theo điều kiện
  const key = params
    ? ["products/search", params]
    : ["products/search", {}];

  const fetcher = async () => {
    const res = await ProductService.getProducts(params);
    return res;
  };

  const { data, error, isLoading } = useSWR(key, fetcher, {
    revalidateOnFocus: false, // tránh refetch khi chuyển tab
    keepPreviousData: true, // giữ data cũ khi đổi trang
  });

  return {
    products: data?.content || [],
    totalPages: data?.totalPages || 0,
    totalElements: data?.totalElements || 0,
    isLoading,
    error,
  };
}