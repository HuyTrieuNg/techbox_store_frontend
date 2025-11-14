/**
 * useBrands Hook
 * Hook for fetching and managing brands using SWR
 */

import useSWR from 'swr';
import { Brand } from '@/features/category';
import { getBrands } from '@/services/productManagementService';

export function useBrands() {
  const { data, error, isLoading } = useSWR<Brand[]>(
    '/brands',
    getBrands,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  return {
    brands: data || [],
    isLoading,
    error,
  };
}
