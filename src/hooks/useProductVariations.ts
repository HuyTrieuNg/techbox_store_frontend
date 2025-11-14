/**
 * useProductVariations Hook
 * Hook for fetching product variations using SWR
 */

import { useState } from 'react';
import useSWR from 'swr';
import { getProductVariations } from '@/services/productDetailService';
import { ProductVariation } from '@/features/productDetail';

export function useProductVariations(productId: number | null) {
  const [includeDeleted, setIncludeDeleted] = useState(false);

  const { data, error, isLoading, mutate } = useSWR<ProductVariation[]>(
    productId ? `/product-variations/management/product/${productId}?deleted=${includeDeleted}` : null,
    productId ? () => getProductVariations(productId, includeDeleted) : null,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  return {
    variations: data || [],
    isLoading,
    error,
    includeDeleted,
    setIncludeDeleted,
    mutate,
  };
}
