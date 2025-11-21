/**
 * useSupplier Hook
 * Hook for fetching and managing suppliers using SWR
 */

import useSWR from 'swr';
import { Supplier, SupplierPageResponse, SupplierParams } from '@/features/supplier';
import { getSuppliers } from '@/services/supplierService';

export function useSuppliers(params?: SupplierParams) {
  const key = params ? ['suppliers', params] : ['suppliers', {}];

  const fetcher = async () => {
    const response = await getSuppliers(params);
    return response;
  };

  const { data, error, isLoading, mutate } = useSWR(key, fetcher, {
    revalidateOnFocus: false,
    keepPreviousData: true,
  });

  return {
    data,
    suppliers: data?.content || [],
    totalPages: data?.totalPages || 0,
    totalElements: data?.totalElements || 0,
    isLoading,
    error,
    refetch: mutate,
  };
}

export function useSupplier(supplierId: number | null) {
  const key = supplierId ? `supplier-${supplierId}` : null;

  const fetcher = async () => {
    if (!supplierId) return null;
    const response = await getSuppliers({ supplierId, size: 1 });
    return response.content[0] || null;
  };

  const { data, error, isLoading, mutate } = useSWR(key, fetcher, {
    revalidateOnFocus: false,
  });

  return {
    supplier: data,
    isLoading,
    error,
    refetch: mutate,
  };
}