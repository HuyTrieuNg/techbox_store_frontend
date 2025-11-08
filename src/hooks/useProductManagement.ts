/**
 * useProductManagement Hook
 * Hook for managing products with SWR
 */

import { useState, useCallback } from 'react';
import useSWR from 'swr';
import {
  getProductsForManagement,
  publishProduct,
  draftProduct,
  deleteProduct,
  restoreProduct,
  ProductManagementItem,
  ProductManagementParams,
} from '@/services/productManagementService';
import { ProductStatus } from '@/features/productManagement';

interface UseProductManagementOptions {
  initialPage?: number;
  initialSize?: number;
}

export function useProductManagement({
  initialPage = 0,
  initialSize = 20,
}: UseProductManagementOptions = {}) {
  // Filter state
  const [status, setStatus] = useState<ProductStatus | null>(null);
  const [filters, setFilters] = useState<{
    name?: string;
    spu?: string;
    brandId?: number;
    categoryId?: number;
    minPrice?: number;
    maxPrice?: number;
    minRating?: number;
  }>({});

  // Sort state
  const [sortBy, setSortBy] = useState<ProductManagementParams['sortBy']>('id');
  const [sortDirection, setSortDirection] = useState<'ASC' | 'DESC'>('ASC');

  // Pagination state
  const [page, setPage] = useState(initialPage);
  const [size, setSize] = useState(initialSize);

  // Build SWR key
  const params: ProductManagementParams = {
    status: status || undefined,
    ...filters,
    sortBy,
    sortDirection,
    page,
    size,
  };

  // Create a stable key for SWR
  const swrKey = JSON.stringify(params);

  // Fetch products with SWR
  const { data, error, isLoading, mutate } = useSWR(
    swrKey,
    () => getProductsForManagement(params),
    {
      revalidateOnFocus: false,
      keepPreviousData: true,
    }
  );

  // Product actions with optimistic updates
  const handlePublish = useCallback(
    async (productId: number) => {
      // Optimistic update - update UI immediately
      await mutate(
        async (currentData) => {
          if (!currentData) return currentData;
          
          // Update product status in cache
          return {
            ...currentData,
            content: currentData.content.map((product) =>
              product.id === productId
                ? { ...product, status: 'PUBLISHED' as ProductStatus }
                : product
            ),
          };
        },
        {
          revalidate: false, // Don't revalidate immediately
        }
      );

      // Then call API in background
      try {
        await publishProduct(productId);
        await mutate(); // Revalidate to get fresh data
      } catch (error) {
        console.error('Error publishing product:', error);
        await mutate(); // Rollback on error
        throw error;
      }
    },
    [mutate]
  );

  const handleDraft = useCallback(
    async (productId: number) => {
      // Optimistic update
      await mutate(
        async (currentData) => {
          if (!currentData) return currentData;
          return {
            ...currentData,
            content: currentData.content.map((product) =>
              product.id === productId
                ? { ...product, status: 'DRAFT' as ProductStatus }
                : product
            ),
          };
        },
        { revalidate: false }
      );

      try {
        await draftProduct(productId);
        await mutate();
      } catch (error) {
        console.error('Error drafting product:', error);
        await mutate();
        throw error;
      }
    },
    [mutate]
  );

  const handleDelete = useCallback(
    async (productId: number) => {
      // Optimistic update
      await mutate(
        async (currentData) => {
          if (!currentData) return currentData;
          return {
            ...currentData,
            content: currentData.content.map((product) =>
              product.id === productId
                ? { ...product, status: 'DELETED' as ProductStatus }
                : product
            ),
          };
        },
        { revalidate: false }
      );

      try {
        await deleteProduct(productId);
        await mutate();
      } catch (error) {
        console.error('Error deleting product:', error);
        await mutate();
        throw error;
      }
    },
    [mutate]
  );

  const handleRestore = useCallback(
    async (productId: number) => {
      // Optimistic update
      await mutate(
        async (currentData) => {
          if (!currentData) return currentData;
          return {
            ...currentData,
            content: currentData.content.map((product) =>
              product.id === productId
                ? { ...product, status: 'DRAFT' as ProductStatus }
                : product
            ),
          };
        },
        { revalidate: false }
      );

      try {
        await restoreProduct(productId);
        await mutate();
      } catch (error) {
        console.error('Error restoring product:', error);
        await mutate();
        throw error;
      }
    },
    [mutate]
  );

  // Filter handlers
  const handleStatusChange = useCallback((newStatus: ProductStatus | null) => {
    setStatus(newStatus);
    setPage(0); // Reset to first page
  }, []);

  const handleFiltersChange = useCallback((newFilters: typeof filters) => {
    setFilters(newFilters);
    setPage(0);
  }, []);

  // Sort handlers
  const handleSortChange = useCallback(
    (newSortBy: ProductManagementParams['sortBy'], newSortDirection: 'ASC' | 'DESC') => {
      setSortBy(newSortBy);
      setSortDirection(newSortDirection);
    },
    []
  );

  // Pagination handlers
  const handlePageChange = useCallback((newPage: number) => {
    setPage(newPage);
  }, []);

  const handleSizeChange = useCallback((newSize: number) => {
    setSize(newSize);
    setPage(0);
  }, []);

  const resetFilters = useCallback(() => {
    setFilters({});
    setPage(0);
  }, []);

  return {
    // Data
    products: data?.content || [],
    pagination: {
      page: data?.page.number || 0,
      size: data?.page.size || size,
      totalElements: data?.page.totalElements || 0,
      totalPages: data?.page.totalPages || 0,
    },
    isLoading,
    error,

    // Current state
    status,
    filters,
    sortBy,
    sortDirection,

    // Actions
    handlePublish,
    handleDraft,
    handleDelete,
    handleRestore,

    // State setters
    handleStatusChange,
    handleFiltersChange,
    handleSortChange,
    handlePageChange,
    handleSizeChange,
    resetFilters,
  };
}
