import axiosClient from "@/api/client";
import { Cart } from "@/features/cart";

export class CartService {
  static async getCart(): Promise<Cart> {
    const response = await axiosClient.get<Cart>("/cart");
    return response.data;
  }

  static async addItem(productVariationId: number, quantity: number): Promise<Cart> {
    const response = await axiosClient.post<Cart>("/cart/add", {
      productVariationId,
      quantity,
    });
    return response.data;
  }

  static async updateItem(productVariationId: number, quantity: number): Promise<Cart> {
    const response = await axiosClient.put<Cart>(`/cart/items/${productVariationId}`, { quantity });
    return response.data;
  }

  static async removeItem(productVariationId: number): Promise<Cart> {
    const response = await axiosClient.delete<Cart>(`/cart/items/${productVariationId}`);
    return response.data;
  }

  static async clearCart(): Promise<void> {
    await axiosClient.delete("/cart/clear");
  }
}