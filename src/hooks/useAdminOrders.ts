import { useState, useEffect, useCallback } from "react";
import { OrderResponse, PaginatedOrders } from "@/features/order";
import { api } from "@/lib/axios";

interface ErrorResponse {
  response?: {
    data?: {
      message?: string;
    };
  };
}

export const useAdminOrders = (autoFetch: boolean = true) => {
  const [orders, setOrders] = useState<OrderResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [selectedStatus, setSelectedStatus] = useState<string>("ALL");

  // Lấy danh sách đơn hàng
  const fetchOrders = useCallback(
    async (
      page: number = 0,
      size: number = 10,
      status?: string
    ) => {
      setLoading(true);
      setError(null);
      try {
        let url = `/orders/all?page=${page}&size=${size}`;
        if (status && status !== "ALL") {
          url += `&status=${status}`;
        }
        
        const response = await api.get<PaginatedOrders>(url);
        setOrders(response.content);
        setTotalPages(response.page.totalPages);
        setTotalElements(response.page.totalElements);
        setCurrentPage(response.page.number);
        setPageSize(response.page.size);
      } catch (err) {
        const error = err as ErrorResponse;
        setError(error?.response?.data?.message || "Failed to fetch orders");
        console.error("Error fetching orders:", err);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // Lấy đơn hàng theo user ID
  const fetchOrdersByUserId = useCallback(
    async (userId: number, page: number = 0, size: number = 10) => {
      setLoading(true);
      setError(null);
      try {
        const response = await api.get<PaginatedOrders>(
          `/orders/user/${userId}?page=${page}&size=${size}`
        );
        setOrders(response.content);
        setTotalPages(response.page.totalPages);
        setTotalElements(response.page.totalElements);
        setCurrentPage(response.page.number);
        setPageSize(response.page.size);
      } catch (err) {
        const error = err as ErrorResponse;
        setError(error?.response?.data?.message || "Failed to fetch user orders");
        console.error("Error fetching user orders:", err);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // Cập nhật trạng thái đơn hàng
  const updateOrderStatus = async (
    orderId: number,
    status: string
  ): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      await api.put(`/orders/${orderId}/status`, { status });
      // Refresh danh sách sau khi cập nhật
      await fetchOrders(currentPage, pageSize, selectedStatus !== "ALL" ? selectedStatus : undefined);
      return true;
    } catch (err) {
      const error = err as ErrorResponse;
      setError(error?.response?.data?.message || "Failed to update order status");
      console.error("Error updating order status:", err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Lấy chi tiết đơn hàng
  const fetchOrderById = async (orderId: number): Promise<OrderResponse | null> => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get<OrderResponse>(`/orders/${orderId}`);
      return response;
    } catch (err) {
      const error = err as ErrorResponse;
      setError(error?.response?.data?.message || "Failed to fetch order");
      console.error("Error fetching order:", err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Load dữ liệu khi component mount hoặc dependencies thay đổi
  // Chỉ auto-fetch khi autoFetch = true (trang quản lý đơn hàng chung)
  useEffect(() => {
    if (autoFetch) {
      fetchOrders(0, pageSize, selectedStatus !== "ALL" ? selectedStatus : undefined);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedStatus, pageSize, autoFetch]);

  return {
    orders,
    loading,
    error,
    totalPages,
    totalElements,
    currentPage,
    pageSize,
    selectedStatus,
    fetchOrders,
    fetchOrdersByUserId,
    updateOrderStatus,
    fetchOrderById,
    setPageSize,
    setSelectedStatus,
  };
};
