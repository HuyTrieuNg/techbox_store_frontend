import { api } from "@/lib/axios";
import { Category } from "@/features/category";
import { ProductDetail } from "@/features/product";

export class ProductService {
  static async getAllCategories(): Promise<Category[]> {
    return api.get<Category[]>("categories");
  }

  static async getCategoryById(id: number): Promise<Category> {
    return api.get<Category>(`categories/${id}`);
  }

  static async getProductById(id: number): Promise<ProductDetail> {
    try {
      return await api.get<ProductDetail>(`products/${id}`);
    } catch (error: any) {
      if (error.response?.status === 404) {
        throw new Error("Sản phẩm không tồn tại");
      }
      throw new Error(error.response?.data?.message || "Không thể tải sản phẩm");
    }
  }

  static async getProducts(params?: {
    categoryId?: number | string;
    sortBy?: string;
    sortDirection?: "ASC" | "DESC";
    page?: number;
    size?: number;
  }): Promise<{ content: ProductDetail[]; totalPages: number; totalElements: number }> {
    const {
      categoryId = "",
      sortBy = "id",
      sortDirection = "ASC",
      page = 0,
      size = 20,
    } = params || {};

    return api.get("products", {
      params: { categoryId, sortBy, sortDirection, page, size },
    });
  }
}