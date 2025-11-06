import { api } from "@/lib/axios";
import { Cart } from "@/features/cart";

export class CartService {
  static async getCart(): Promise<Cart> {
    return api.get<Cart>("/cart");
  }

  static async addItem(productVariationId: number, quantity: number): Promise<Cart> {
    return api.post<Cart>("/cart/add", {
      productVariationId,
      quantity,
    });
  }

  static async updateItem(productVariationId: number, quantity: number): Promise<Cart> {
    return api.put<Cart>(`/cart/items/${productVariationId}`, { quantity });
  }

  static async removeItem(productVariationId: number): Promise<Cart> {
    return api.delete<Cart>(`/cart/items/${productVariationId}`);
  }

  static async clearCart(): Promise<void> {
    await api.delete("/cart/clear");
  }
}