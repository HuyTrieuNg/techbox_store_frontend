// hooks/useMyReview.ts
import useSWR from "swr";
import { ReviewService, Review } from "@/services/reviewService";

export const useMyReview = (productId: number) => {
  const { data, error, mutate, isLoading } = useSWR<Review | null>(
    productId ? `/products/${productId}/reviews/me` : null,
    () => ReviewService.getMyReview(productId),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  return {
    myReview: data,
    isLoading,
    isError: error,
    mutate,
  };
};