// import useSWR from "swr";
// import { OrderService } from "@/services/orderService";
// import { OrderRequest, OrderResponse } from "@/features/order";
// import { useState } from "react";

// export const useOrders = () => {
//   const { data, error, isLoading, mutate } = useSWR<OrderResponse[]>(
//     "/orders",
//     OrderService.getAllOrders
//   );

//   return {
//     orders: data ?? [],
//     isLoading,
//     isError: error,
//     refreshOrders: mutate,
//   };
// };

// export const useCreateOrder = () => {
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [order, setOrder] = useState<OrderResponse | null>(null);
//   const [error, setError] = useState<string | null>(null);

//   const createOrder = async (payload: OrderRequest) => {
//     try {
//       setIsSubmitting(true);
//       const response = await OrderService.createOrder(payload);
//       setOrder(response);
//       setError(null);
//       return response;
//     } catch (err: any) {
//       const message =
//         err.response?.data?.message || "Không thể tạo đơn hàng, vui lòng thử lại";
//       setError(message);
//       throw new Error(message);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return {
//     createOrder,
//     order,
//     isSubmitting,
//     error,
//   };
// };


import useSWR from "swr";
import { OrderService } from "@/services/orderService";
import { OrderRequest, OrderResponse, PaginatedOrders } from "@/features/order";
import { useState } from "react";

// Lấy danh sách đơn hàng của user hiện tại (phân trang)
export const useOrders = (page: number = 0, size: number = 10) => {
  const { data, error, isLoading, mutate } = useSWR<PaginatedOrders>(
    [`/orders?page=${page}&size=${size}`, page, size],
    () => OrderService.getUserOrders(page, size)
  );

  return {
    orders: data?.content ?? [],
    pagination: data?.page,
    isLoading,
    isError: error,
    refreshOrders: mutate,
  };
};

// Tạo đơn hàng mới
export const useCreateOrder = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [order, setOrder] = useState<OrderResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const createOrder = async (payload: OrderRequest) => {
    try {
      setIsSubmitting(true);
      const response = await OrderService.createOrder(payload);
      setOrder(response);
      setError(null);
      return response;
    } catch (err: any) {
      const message =
        err.response?.data?.message || "Không thể tạo đơn hàng, vui lòng thử lại.";
      setError(message);
      throw new Error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    createOrder,
    order,
    isSubmitting,
    error,
  };
};