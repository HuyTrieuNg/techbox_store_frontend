// hooks/useWishlist.ts
import useSWR, { useSWRConfig } from "swr";

import { useAuthContext } from "@/contexts/AuthContext";
import { WishlistResponse, WishlistService } from "@/services/wishListService";
import { toast } from "sonner";

export const useWishlist = () => {
  const { user } = useAuthContext();
  const isLoggedIn = !!user;
  const { mutate } = useSWRConfig();

  const {
    data,
    error,
    isLoading,
    mutate: mutateWishlist,
  } = useSWR<WishlistResponse>(
    isLoggedIn ? "/wishlists" : null,
    WishlistService.getWishlist,
    {
      dedupingInterval: 5000, // tránh gọi liên tục
      revalidateOnFocus: true,
      revalidateOnReconnect: true,
    }
  );

  const wishlistIds = new Set(data?.content.map((item) => item.id) || []);
  const totalItems = data?.page.totalElements || 0;

  // Optimistic toggle
  const toggleWishlist = async (productId: number) => {
    const isCurrentlyInWishlist = wishlistIds.has(productId);

    // 1. Optimistic update
    await mutateWishlist(
      (currentData) => {
        if (!currentData) return currentData;

        const newContent = isCurrentlyInWishlist
          ? currentData.content.filter((item) => item.id !== productId)
          : [...currentData.content, { id: productId, name: "" } as any];

        return {
          ...currentData,
          content: newContent,
          page: {
            ...currentData.page,
            totalElements: isCurrentlyInWishlist
              ? currentData.page.totalElements - 1
              : currentData.page.totalElements + 1,
          },
        };
      },
      { revalidate: false } // không gọi API ngay
    );

    try {
      // 2. Gọi API thật
      if (isCurrentlyInWishlist) {
        await WishlistService.removeFromWishlist(productId);
        toast.success('Đã xóa khỏi danh sách yêu thích!');
      } else {
        await WishlistService.addToWishlist(productId);
        toast.success('Đã thêm vào danh sách yêu thích!');
      }

      // 3. Revalidate để đồng bộ chính xác
      mutateWishlist();
    } catch (error) {
      // 4. Lỗi → rollback tự động (SWR sẽ revalidate)
      mutateWishlist();
      throw error;
    }
  };

  return {
    wishlist: data,
    wishlistIds,
    totalItems,
    isLoading,
    isError: error,
    toggleWishlist,
    refreshWishlist: () => mutateWishlist(),
  };
};