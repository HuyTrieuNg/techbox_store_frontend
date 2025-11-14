"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAdminOrders } from "@/hooks/useAdminOrders";
import { OrderResponse } from "@/features/order";
import { getUserById } from "@/services/userService";
import { UserResponse } from "@/features/user";

const ORDER_STATUS_MESSAGES: Record<string, string> = {
  PENDING: "Đang chờ xử lý",
  CONFIRMED: "Đã xác nhận",
  PROCESSING: "Đang xử lý",
  SHIPPING: "Đang giao hàng",
  DELIVERED: "Đã giao hàng",
  CANCELLED: "Đã hủy",
  RETURNED: "Đã trả hàng",
};

const ORDER_STATUS_COLORS: Record<string, string> = {
  PENDING: "bg-yellow-100 text-yellow-800",
  CONFIRMED: "bg-blue-100 text-blue-800",
  PROCESSING: "bg-orange-100 text-orange-800",
  SHIPPING: "bg-purple-100 text-purple-800",
  DELIVERED: "bg-green-100 text-green-800",
  CANCELLED: "bg-red-100 text-red-800",
  RETURNED: "bg-gray-100 text-gray-800",
};

const PAYMENT_STATUS_MESSAGES: Record<string, string> = {
  PENDING: "Chưa thanh toán",
  SUCCESS: "Đã thanh toán",
  FAILED: "Thanh toán thất bại",
  CANCELLED: "Đã hủy",
};

export default function UserOrdersPage() {
  const params = useParams();
  const router = useRouter();
  const userId = Number(params.userId);

  // Tắt auto-fetch vì chúng ta chỉ muốn fetch orders của user cụ thể
  const { fetchOrdersByUserId, orders, loading, totalPages, totalElements, currentPage, pageSize } = useAdminOrders(false);
  const [user, setUser] = useState<UserResponse | null>(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<OrderResponse | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  const loadUserInfo = async () => {
    setLoadingUser(true);
    try {
      const userData = await getUserById(userId);
      setUser(userData);
    } catch (error) {
      console.error("Error loading user:", error);
    } finally {
      setLoadingUser(false);
    }
  };

  const loadOrders = async (page: number) => {
    await fetchOrdersByUserId(userId, page, pageSize);
  };

  useEffect(() => {
    if (userId) {
      loadUserInfo();
      loadOrders(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 0 && newPage < totalPages) {
      loadOrders(newPage);
    }
  };

  const handleViewDetail = (order: OrderResponse) => {
    setSelectedOrder(order);
    setShowDetailModal(true);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("vi-VN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-6">
        <button
          onClick={() => router.push("/admin/users")}
          className="flex items-center text-blue-600 hover:text-blue-800 mb-4"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Quay lại danh sách người dùng
        </button>

        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold">Lịch sử mua hàng</h1>
            {loadingUser ? (
              <p className="text-gray-600 mt-1">Đang tải thông tin khách hàng...</p>
            ) : user ? (
              <>
                <p className="text-gray-600 mt-1">
                  Khách hàng: <span className="font-semibold">{user.firstName} {user.lastName}</span>
                </p>
                <p className="text-gray-600">
                  Email: <span className="font-semibold">{user.email}</span>
                </p>
                <p className="text-gray-600">
                  SĐT: <span className="font-semibold">{user.phone}</span>
                </p>
              </>
            ) : (
              <p className="text-red-600 mt-1">Không tìm thấy thông tin khách hàng</p>
            )}
            <p className="text-gray-600 mt-2">
              Tổng số đơn hàng: <span className="font-semibold">{totalElements}</span>
            </p>
          </div>
        </div>
      </div>

      {/* Loading */}
      {loading && (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="mt-2 text-gray-600">Đang tải...</p>
        </div>
      )}

      {/* Orders List */}
      {!loading && (
        <>
          {orders.length === 0 ? (
            <div className="bg-white rounded-lg shadow p-8 text-center text-gray-500">
              Người dùng này chưa có đơn hàng nào
            </div>
          ) : (
            <>
              <div className="space-y-4 mb-6">
                {orders.map((order) => (
                  <div
                    key={order.id}
                    className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-semibold text-lg">
                          Đơn hàng #{order.orderCode}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {formatDate(order.createdAt)}
                        </p>
                      </div>
                      <div className="text-right">
                        <span
                          className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            ORDER_STATUS_COLORS[order.status]
                          }`}
                        >
                          {ORDER_STATUS_MESSAGES[order.status]}
                        </span>
                        <p className="text-sm text-gray-600 mt-1">
                          {PAYMENT_STATUS_MESSAGES[order.paymentStatus]}
                        </p>
                      </div>
                    </div>

                    {/* Order Items Preview */}
                    <div className="mb-4 space-y-2">
                      {order.orderItems.slice(0, 3).map((item) => (
                        <div
                          key={item.id}
                          className="flex justify-between text-sm pb-2 border-b last:border-0"
                        >
                          <span className="text-gray-700">
                            {item.productName} - {item.productVariationName} x{" "}
                            {item.quantity}
                          </span>
                          <span className="font-medium">
                            {formatCurrency(item.totalAmount)}
                          </span>
                        </div>
                      ))}
                      {order.orderItems.length > 3 && (
                        <p className="text-sm text-gray-500 pt-2">
                          ... và {order.orderItems.length - 3} sản phẩm khác
                        </p>
                      )}
                    </div>

                    {/* Summary */}
                    <div className="flex justify-between items-center pt-4 border-t">
                      <div className="text-sm text-gray-600">
                        <p>Thanh toán: <span className="font-medium">{order.paymentMethod}</span></p>
                        <p>Địa chỉ: <span className="font-medium">{order.shippingAddress}</span></p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-sm text-gray-600">Tổng tiền</p>
                          <p className="text-xl font-bold text-blue-600">
                            {formatCurrency(order.finalAmount)}
                          </p>
                        </div>
                        <button
                          onClick={() => handleViewDetail(order)}
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                        >
                          Chi tiết
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="bg-white rounded-lg shadow p-4 flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-700">
                      Hiển thị{" "}
                      <span className="font-medium">
                        {currentPage * pageSize + 1}
                      </span>{" "}
                      đến{" "}
                      <span className="font-medium">
                        {Math.min((currentPage + 1) * pageSize, totalElements)}
                      </span>{" "}
                      trong tổng số{" "}
                      <span className="font-medium">{totalElements}</span> đơn hàng
                    </p>
                  </div>
                  <div>
                    <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                      <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 0}
                        className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Trước
                      </button>
                      {[...Array(Math.min(totalPages, 5))].map((_, index) => {
                        let pageNum;
                        if (totalPages <= 5) {
                          pageNum = index;
                        } else if (currentPage < 2) {
                          pageNum = index;
                        } else if (currentPage > totalPages - 3) {
                          pageNum = totalPages - 5 + index;
                        } else {
                          pageNum = currentPage - 2 + index;
                        }

                        return (
                          <button
                            key={pageNum}
                            onClick={() => handlePageChange(pageNum)}
                            className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                              currentPage === pageNum
                                ? "z-10 bg-blue-50 border-blue-500 text-blue-600"
                                : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
                            }`}
                          >
                            {pageNum + 1}
                          </button>
                        );
                      })}
                      <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages - 1}
                        className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Sau
                      </button>
                    </nav>
                  </div>
                </div>
              )}
            </>
          )}
        </>
      )}

      {/* Detail Modal */}
      {showDetailModal && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold">
                  Chi tiết đơn hàng #{selectedOrder.orderCode}
                </h2>
                <button
                  onClick={() => {
                    setShowDetailModal(false);
                    setSelectedOrder(null);
                  }}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {/* Order Info */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <h3 className="font-semibold mb-2">Thông tin giao hàng</h3>
                  <p className="text-sm">
                    <span className="text-gray-600">Tên:</span>{" "}
                    {selectedOrder.shippingName}
                  </p>
                  <p className="text-sm">
                    <span className="text-gray-600">SĐT:</span>{" "}
                    {selectedOrder.shippingPhone}
                  </p>
                  <p className="text-sm">
                    <span className="text-gray-600">Địa chỉ:</span>{" "}
                    {selectedOrder.shippingAddress}
                  </p>
                  {selectedOrder.shippingWard && (
                    <p className="text-sm">
                      <span className="text-gray-600">Phường/Xã:</span>{" "}
                      {selectedOrder.shippingWard}
                    </p>
                  )}
                  {selectedOrder.shippingDistrict && (
                    <p className="text-sm">
                      <span className="text-gray-600">Quận/Huyện:</span>{" "}
                      {selectedOrder.shippingDistrict}
                    </p>
                  )}
                  {selectedOrder.shippingCity && (
                    <p className="text-sm">
                      <span className="text-gray-600">Thành phố:</span>{" "}
                      {selectedOrder.shippingCity}
                    </p>
                  )}
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Thông tin đơn hàng</h3>
                  <p className="text-sm">
                    <span className="text-gray-600">Trạng thái:</span>{" "}
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        ORDER_STATUS_COLORS[selectedOrder.status]
                      }`}
                    >
                      {ORDER_STATUS_MESSAGES[selectedOrder.status]}
                    </span>
                  </p>
                  <p className="text-sm mt-1">
                    <span className="text-gray-600">Thanh toán:</span>{" "}
                    {selectedOrder.paymentMethod}
                  </p>
                  <p className="text-sm">
                    <span className="text-gray-600">TT thanh toán:</span>{" "}
                    {PAYMENT_STATUS_MESSAGES[selectedOrder.paymentStatus]}
                  </p>
                  <p className="text-sm">
                    <span className="text-gray-600">Ngày tạo:</span>{" "}
                    {formatDate(selectedOrder.createdAt)}
                  </p>
                  {selectedOrder.note && (
                    <p className="text-sm">
                      <span className="text-gray-600">Ghi chú:</span>{" "}
                      {selectedOrder.note}
                    </p>
                  )}
                </div>
              </div>

              {/* Order Items */}
              <div className="mb-6">
                <h3 className="font-semibold mb-2">Sản phẩm</h3>
                <div className="border rounded-lg overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">
                          Sản phẩm
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">
                          Đơn giá
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">
                          SL
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">
                          Giảm giá
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">
                          Thành tiền
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {selectedOrder.orderItems.map((item) => (
                        <tr key={item.id}>
                          <td className="px-4 py-2">
                            <div className="text-sm font-medium text-gray-900">
                              {item.productName}
                            </div>
                            <div className="text-sm text-gray-500">
                              {item.productVariationName}
                            </div>
                          </td>
                          <td className="px-4 py-2 text-sm">
                            {formatCurrency(item.unitPrice)}
                          </td>
                          <td className="px-4 py-2 text-sm">{item.quantity}</td>
                          <td className="px-4 py-2 text-sm">
                            {formatCurrency(item.discountAmount)}
                          </td>
                          <td className="px-4 py-2 text-sm font-medium">
                            {formatCurrency(item.totalAmount)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Order Summary */}
              <div className="border-t pt-4">
                <div className="flex justify-end">
                  <div className="w-64">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600">Tạm tính:</span>
                      <span>{formatCurrency(selectedOrder.totalAmount)}</span>
                    </div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600">Giảm giá:</span>
                      <span className="text-red-600">
                        -{formatCurrency(selectedOrder.discountAmount)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600">Phí vận chuyển:</span>
                      <span>{formatCurrency(selectedOrder.shippingFee)}</span>
                    </div>
                    <div className="flex justify-between text-lg font-bold border-t pt-2">
                      <span>Tổng cộng:</span>
                      <span className="text-blue-600">
                        {formatCurrency(selectedOrder.finalAmount)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
