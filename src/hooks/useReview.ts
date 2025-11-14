import useSWR from "swr";
import { ReviewService, ReviewPage } from "@/services/reviewService";

export const useProductReviews = (productId: number, page: number = 0, size: number = 10) => {
  const { data, error, mutate, isLoading } = useSWR<ReviewPage>(
    productId ? [`/products/${productId}/reviews`, page, size] : null,
    () => ReviewService.getProductReviews(productId, page, size),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  return {
    reviews: data?.content ?? [],
    pageInfo: data?.page,
    isLoading,
    isError: error,
    mutate,
  };
};