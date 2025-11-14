/**
 * useProductManagementDetail Hook
 * Hook for fetching product detail (admin/staff) using SWR
 */

import useSWR from 'swr';
import { getProductDetail } from '@/services/productDetailService';
import { ProductDetail } from '@/features/productDetail';

export function useProductManagementDetail(productId: number | null) {
  const { data, error, isLoading, mutate } = useSWR<ProductDetail>(
    productId ? `/products/management/${productId}` : null,
    productId ? () => getProductDetail(productId) : null,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  return {
    product: data,
    isLoading,
    error,
    mutate,
  };
}
