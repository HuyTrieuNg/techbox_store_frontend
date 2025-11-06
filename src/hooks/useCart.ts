import useSWR from "swr";
import { CartService } from "@/services/cartService";
import { Cart } from "@/features/cart";
import { useAuthContext } from "@/contexts/AuthContext";

export const useCart = () => {
  const { user } = useAuthContext();
  const isLoggedIn = !!user;

  // Chỉ fetch cart khi đã login
  const { data, error, mutate, isLoading } = useSWR<Cart>(
    isLoggedIn ? "/cart" : null,
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