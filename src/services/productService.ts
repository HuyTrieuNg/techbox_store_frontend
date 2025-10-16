import { Product } from "@/features/product";

export const productService = {
  async getProducts(): Promise<Product[]> {
    const res = await fetch("/api/products");
    if (!res.ok) throw new Error("Failed to fetch products");
    return res.json();
  },

  async getProductById(id: number): Promise<Product> {
    const res = await fetch(`/api/products/${id}`);
    if (!res.ok) throw new Error("Failed to fetch product");
    return res.json();
  },
};
