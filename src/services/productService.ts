import { api } from "@/lib/axios";
import { Category } from "@/features/category";
import { ProductDetail } from "@/features/product";
import axiosInstance from "@/lib/axios";
import qs from "qs";

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

  static async getProductVariations(params?: {
    page?: number;
    size?: number;
  }): Promise<{ content: any[]; totalPages: number; totalElements: number }> {
    const { page = 0, size = 20 } = params || {};

    return api.get("product-variations", {
      params: { page, size },
    });
  }

  /**
   * Fetch products by SPU IDs for chatbot suggestions
   * @param spus - Array of SPU IDs
   */
  static async fetchProductsBySpus(spus: string[]): Promise<any[]> {
    if (!spus || spus.length === 0) {
      return [];
    }

    try {
      console.log('[ProductService] Fetching products for SPUs:', spus);

      const response = await axiosInstance.get('/products/by-spus', {
        params: {
          spus: spus,
          size: spus.length,
        },
        paramsSerializer: (params) => {
          return qs.stringify(params, { arrayFormat: 'repeat' });
        },
      });

      console.log('[ProductService] Response from /products/by-spus:', response);

      // The response from axiosInstance is already the data (due to interceptor)
      // API returns paginated response: {content: [...], page: {...}}
      // We need to extract the content array
      let products: any[] = [];
      if (response && typeof response === 'object') {
        if (Array.isArray(response)) {
          products = response;
        } else if (response.content && Array.isArray(response.content)) {
          products = response.content;
        }
      }

      console.log('[ProductService] Returning products:', products);

      return products;
    } catch (error) {
      console.error('[ProductService] Error fetching products by SPUs:', error);
      return [];
    }
  }
}