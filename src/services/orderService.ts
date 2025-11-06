import { api } from "@/lib/axios";
import { OrderRequest, OrderResponse, PaginatedOrders } from "@/features/order";

export class OrderService {
  // Tạo đơn hàng mới
  static async createOrder(payload: OrderRequest): Promise<OrderResponse> {
    return api.post<OrderResponse>("/orders", payload);
  }

  // Lấy chi tiết đơn hàng theo ID
  static async getOrderById(orderId: number): Promise<OrderResponse> {
    return api.get<OrderResponse>(`/orders/${orderId}`);
  }

  // Lấy danh sách đơn hàng (phân trang)
  static async getAllOrders(page: number = 0, size: number = 10): Promise<PaginatedOrders> {
    return api.get<PaginatedOrders>(`/orders?page=${page}&size=${size}`);
  }
}