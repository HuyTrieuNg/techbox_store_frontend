// import { Category } from "@/features/category";
// import { ProductDetail } from "@/features/product";
// import axios, { AxiosInstance } from "axios";

// const API_BASE_URL = "http://localhost:8080/api/";

// const getAuthToken = (): string | null => {
//   return localStorage.getItem("accessToken");
// };

// const axiosInstance: AxiosInstance = axios.create({
//   baseURL: API_BASE_URL,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// // Interceptor để thêm token vào mọi request
// axiosInstance.interceptors.request.use(
//   (config) => {
//     const token = getAuthToken();
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// export class ProductService {
//   // Lấy tất cả categories
//   static async getAllCategories(): Promise<Category[]> {
//     try {
//       const response = await axiosInstance.get("categories");
//       return response.data;
//     } catch (error) {
//       console.error("Error fetching all categories:", error);
//       throw error;
//     }
//   }

//   // Lấy sản phẩm theo ID
//   static async getProductById(id: number): Promise<ProductDetail> {
//     try {
//       const response = await axiosInstance.get<ProductDetail>(`products/${id}`);
//       return response.data;
//     } catch (error: any) {
//       if (error.response?.status === 404) {
//         throw new Error("Sản phẩm không tồn tại");
//       }
//       if (error.response?.data?.message) {
//         throw new Error(error.response.data.message);
//       }
//       throw new Error("Không thể tải thông tin sản phẩm");
//     }
//   }
// }


import axiosClient from "@/api/client";
import { Category } from "@/features/category";
import { ProductDetail } from "@/features/product";

export class ProductService {
  static async getAllCategories(): Promise<Category[]> {
    const response = await axiosClient.get("categories");
    return response.data;
  }

  static async getProductById(id: number): Promise<ProductDetail> {
    try {
      const response = await axiosClient.get<ProductDetail>(`products/${id}`);
      return response.data;
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

    const response = await axiosClient.get("products/search", {
      params: { categoryId, sortBy, sortDirection, page, size },
    });

    return response.data;
  }
}