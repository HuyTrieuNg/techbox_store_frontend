import useSWR from "swr";
import { CartService } from "@/services/cartService";
import { Cart } from "@/features/cart";

export const useCart = () => {
  const { data, error, mutate, isLoading } = useSWR<Cart>(
    "/cart",
    CartService.getCart
  );

  return {
    cart: data,
    isLoading,
    isError: error,
    refreshCart: mutate,
    totalQuantity: data?.summary.totalQuantity ?? 0,
    totalAmount: data?.summary.totalAmount ?? 0,
  };
};