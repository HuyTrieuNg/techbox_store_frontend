import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';
import { stockAdjustmentService } from '@/services/stockAdjustmentService';
import { StockAdjustment, StockAdjustmentCreateRequest } from '@/features/stockAdjustment';

// Hook for getting paginated adjustments
export const useStockAdjustments = (page = 0, size = 10) => {
  const { data, error, isLoading, mutate } = useSWR(
    ['stock-adjustments', page, size],
    () => stockAdjustmentService.getAdjustments(page, size)
  );

  return {
    data,
    loading: isLoading,
    error,
    mutate,
  };
};

// Hook for getting single adjustment
export const useStockAdjustmentDetail = (id: number) => {
  const { data, error, isLoading, mutate } = useSWR(
    id ? ['stock-adjustment', id] : null,
    () => stockAdjustmentService.getAdjustmentById(id)
  );

  return {
    data,
    loading: isLoading,
    error,
    mutate,
  };
};

// Hook for creating adjustment
export const useCreateStockAdjustment = () => {
  const { trigger, isMutating, error } = useSWRMutation(
    'stock-adjustments',
    (_, { arg }: { arg: StockAdjustmentCreateRequest }) =>
      stockAdjustmentService.createAdjustment(arg),
    {
      onSuccess: () => {
        // Invalidate and refetch adjustments list
        // This would need to be handled by the component using this hook
      },
    }
  );

  return {
    createAdjustment: trigger,
    loading: isMutating,
    error,
  };
};

// Hook for updating adjustment
export const useUpdateStockAdjustment = () => {
  const { trigger, isMutating, error } = useSWRMutation(
    'stock-adjustments',
    (_, { arg }: { arg: { id: number; data: Partial<StockAdjustmentCreateRequest> } }) =>
      stockAdjustmentService.updateAdjustment(arg.id, arg.data)
  );

  return {
    updateAdjustment: trigger,
    loading: isMutating,
    error,
  };
};

// Hook for deleting adjustment
export const useDeleteStockAdjustment = () => {
  const { trigger, isMutating, error } = useSWRMutation(
    'stock-adjustments',
    (_, { arg }: { arg: number }) => stockAdjustmentService.deleteAdjustment(arg)
  );

  return {
    deleteAdjustment: trigger,
    loading: isMutating,
    error,
  };
};