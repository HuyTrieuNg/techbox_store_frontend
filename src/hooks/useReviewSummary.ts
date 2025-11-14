import useSWR, { mutate } from "swr";
import { ReviewService } from "@/services/reviewService";

export const useReviewSummary = (productId: number) => {
  const { data, error, isLoading, mutate } = useSWR(
    productId ? `/products/${productId}/reviews/summary` : null,
    () => ReviewService.getReviewSummary(productId),
    {
      revalidateOnFocus: false,
    }
  );

  return {
    summary: data,
    isLoading,
    isError: error,
    mutate,
  };
};