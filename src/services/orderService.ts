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

  // Lấy danh sách đơn hàng của user hiện tại
  static async getUserOrders(page: number = 0, size: number = 10): Promise<PaginatedOrders> {
    return api.get<PaginatedOrders>(`/orders/user?page=${page}&size=${size}`);
  }

  // Lấy danh sách tất cả đơn hàng (Admin)
  static async getAllOrders(page: number = 0, size: number = 10, status?: string): Promise<PaginatedOrders> {
    let url = `/orders/all?page=${page}&size=${size}`;
    if (status) {
      url += `&status=${status}`;
    }
    return api.get<PaginatedOrders>(url);
  }

  // Lấy đơn hàng theo user ID (Admin)
  static async getOrdersByUserId(userId: number, page: number = 0, size: number = 10): Promise<PaginatedOrders> {
    return api.get<PaginatedOrders>(`/orders/user/${userId}?page=${page}&size=${size}`);
  }

  // Lấy đơn hàng theo trạng thái của user hiện tại
  static async getUserOrdersByStatus(status: string, page: number = 0, size: number = 10): Promise<PaginatedOrders> {
    return api.get<PaginatedOrders>(`/orders/user/status/${status}?page=${page}&size=${size}`);
  }

  // Lấy đơn hàng theo mã
  static async getOrderByCode(orderCode: string): Promise<OrderResponse> {
    return api.get<OrderResponse>(`/orders/code/${orderCode}`);
  }

  // Cập nhật trạng thái đơn hàng
  static async updateOrderStatus(orderId: number, status: string): Promise<OrderResponse> {
    return api.put<OrderResponse>(`/orders/${orderId}/status`, { status });
  }

  // Hủy đơn hàng (chỉ khi status = PENDING)
  static async cancelOrder(orderId: number): Promise<OrderResponse> {
    return api.put<OrderResponse>(`/orders/${orderId}/cancel`);
  }
}
