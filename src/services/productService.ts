// import { Category } from "@/features/category";
// import axios from "axios";
// const API_BASE_URL = "http://localhost:8080/api/categories";

// export class ProductService {
//   // Lấy tất cả categories
//   static async getAllCategories(): Promise<Category[]> {
//     try {
//       const response = await axios.get(`${API_BASE_URL}/categories`);
//       return response.data;
//     } catch (error) {
//       console.error('Error fetching all categories:', error);
//       throw error;
//     }
//   }

//   // Lấy danh sách root categories (không có parent)
//   static async getRootCategories(): Promise<Category[]> {
//     try {
//       const response = await axios.get(`${API_BASE_URL}/categories/root`);
//       return response.data;
//     } catch (error) {
//       console.error('Error fetching root categories:', error);
//       throw error;
//     }
//   }

//   // Lấy danh sách child categories theo parentId
//   static async getChildCategories(parentId: number): Promise<Category[]> {
//     try {
//       const response = await axios.get(`${API_BASE_URL}/categories/${parentId}/children`);
//       return response.data;
//     } catch (error) {
//       console.error(`Error fetching child categories for parentId ${parentId}:`, error);
//       throw error;
//     }
//   }

//   // Kiểm tra xem tên category có tồn tại không
//   static async checkCategoryNameExists(name: string): Promise<boolean> {
//     try {
//       const response = await axios.get(`${API_BASE_URL}/categories/exists`, {
//         params: { name },
//       });
//       return response.data;
//     } catch (error) {
//       console.error('Error checking category name exists:', error);
//       throw error;
//     }
//   }
// }


import { Category } from "@/features/category";
import axios, { AxiosInstance } from "axios";

const API_BASE_URL = "http://localhost:8080/api/categories";

const getAuthToken = (): string | null => {
  return localStorage.getItem("accessToken");
};

const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor để thêm token vào mọi request
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export class ProductService {
  // Lấy tất cả categories
  static async getAllCategories(): Promise<Category[]> {
    try {
      const response = await axiosInstance.get("");
      return response.data;
    } catch (error) {
      console.error("Error fetching all categories:", error);
      throw error;
    }
  }

  // Lấy danh sách root categories (không có parent)
  static async getRootCategories(): Promise<Category[]> {
    try {
      const response = await axiosInstance.get("/categories/root");
      return response.data;
    } catch (error) {
      console.error("Error fetching root categories:", error);
      throw error;
    }
  }

  // Lấy danh sách child categories theo parentId
  static async getChildCategories(parentId: number): Promise<Category[]> {
    try {
      const response = await axiosInstance.get(`/categories/${parentId}/children`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching child categories for parentId ${parentId}:`, error);
      throw error;
    }
  }

  // Kiểm tra xem tên category có tồn tại không
  static async checkCategoryNameExists(name: string): Promise<boolean> {
    try {
      const response = await axiosInstance.get("/categories/exists", {
        params: { name },
      });
      return response.data;
    } catch (error) {
      console.error("Error checking category name exists:", error);
      throw error;
    }
  }
}