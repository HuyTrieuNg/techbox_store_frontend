// import axiosClient from "@/api/client";
// import { OrderRequest, OrderResponse } from "@/features/order";

// export class OrderService {
//   static async createOrder(payload: OrderRequest): Promise<OrderResponse> {
//     const response = await axiosClient.post<OrderResponse>("/orders", payload);
//     return response.data;
//   }

//   static async getOrderById(orderId: number): Promise<OrderResponse> {
//     const response = await axiosClient.get<OrderResponse>(`/orders/${orderId}`);
//     return response.data;
//   }

//   static async getAllOrders(): Promise<OrderResponse[]> {
//     const response = await axiosClient.get<OrderResponse[]>("/orders");
//     return response.data;
//   }
// }


import axiosClient from "@/api/client";
import { OrderRequest, OrderResponse, PaginatedOrders } from "@/features/order";

export class OrderService {
  // Tạo đơn hàng mới
  static async createOrder(payload: OrderRequest): Promise<OrderResponse> {
    const response = await axiosClient.post<OrderResponse>("/orders", payload);
    return response.data;
  }

  // Lấy chi tiết đơn hàng theo ID
  static async getOrderById(orderId: number): Promise<OrderResponse> {
    const response = await axiosClient.get<OrderResponse>(`/orders/${orderId}`);
    return response.data;
  }

  // Lấy danh sách đơn hàng (phân trang)
  static async getAllOrders(page: number = 0, size: number = 10): Promise<PaginatedOrders> {
    const response = await axiosClient.get<PaginatedOrders>(`/orders?page=${page}&size=${size}`);
    return response.data;
  }
}