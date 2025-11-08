/**
 * useCategories Hook
 * Hook for fetching and managing categories (with tree flattening) using SWR
 */

import useSWR from 'swr';
import { Category } from '@/features/category';
import { getCategories, flattenCategories } from '@/services/productManagementService';

export function useCategories() {
  const { data, error, isLoading } = useSWR<Category[]>(
    '/categories',
    async () => {
      const data = await getCategories();
      return flattenCategories(data);
    },
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  return {
    categories: data || [],
    isLoading,
    error,
  };
}
