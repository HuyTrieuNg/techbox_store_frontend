"use client";

import SidebarAccount from "@/components/SidebarAccount";
import Link from "next/link";
import { useState } from "react";
import { FaHome, FaChevronRight, FaCalendarAlt, FaTruck, FaTimes } from "react-icons/fa";
import Image from "next/image";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import InvoicePdfDownload from '@/components/pdf/InvoicePdfDownload';
import { useOrders } from "@/hooks/useOrder";
import axiosInstance from '@/lib/axios';

export default function ManageOrderPage() {
  const { orders, isLoading, isError, mutate } = useOrders(0, 10);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  const [cancellingOrderId, setCancellingOrderId] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const mappedOrders = orders.map((o: any) => ({
    id: o.id,
    orderCode: o.orderCode,
    status: o.status,
    paymentMethod: o.paymentMethod,
    paymentStatus: o.paymentStatus,
    totalAmount: o.totalAmount,
    discountAmount: o.discountAmount,
    shippingFee: o.shippingFee,
    finalAmount: o.finalAmount,
    shippingName: o.shippingName,
    shippingPhone: o.shippingPhone,
    shippingAddress: `${o.shippingAddress}, ${o.shippingWard}, ${o.shippingDistrict}, ${o.shippingCity}`,
    note: o.note,
    date: new Date(o.createdAt).toLocaleDateString("vi-VN"),
    createdAt: new Date(o.createdAt).toLocaleString("vi-VN"),
    updatedAt: new Date(o.updatedAt).toLocaleString("vi-VN"),
    orderItems: o.orderItems || [],
  }));

  const openOrderDetail = (order: any) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

  const handleCancelOrder = (orderId: number) => {
    setCancellingOrderId(orderId);
    setShowCancelConfirm(true);
  };

  const confirmCancelOrder = async () => {
    if (!cancellingOrderId) return;
    
    setIsSubmitting(true);
    try {
      const response = await axiosInstance.put(`/orders/${cancellingOrderId}/cancel`);
      
      // Chỉ hiện alert thành công nếu response OK
      if (response) {
        alert('Hủy đơn hàng thành công!');
        setShowCancelConfirm(false);
        setCancellingOrderId(null);
        setIsModalOpen(false);
        setSelectedOrder(null);
        // Refresh danh sách đơn hàng
        mutate();
      }
    } catch (error: any) {
      console.error('Cancel order error:', error);
      const errorMessage = error.response?.data?.message || error.message || 'Không thể hủy đơn hàng. Vui lòng thử lại!';
      alert(errorMessage);
      // Vẫn đóng modal và refresh nếu lỗi 4xx (đã hủy rồi hoặc không hợp lệ)
      if (error.response?.status >= 400 && error.response?.status < 500) {
        setShowCancelConfirm(false);
        setCancellingOrderId(null);
        setIsModalOpen(false);
        setSelectedOrder(null);
        mutate();
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "PENDING":
        return "bg-amber-100 text-amber-700";
      case "CONFIRMED":
        return "bg-blue-100 text-blue-700";
      case "PROCESSING":
        return "bg-indigo-100 text-indigo-700";
      case "SHIPPING":
        return "bg-yellow-100 text-yellow-800";
      case "DELIVERED":
        return "bg-green-100 text-green-700";
      case "CANCELLED":
        return "bg-red-100 text-red-700";
      case "RETURNED":
        return "bg-orange-100 text-orange-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "PENDING":
        return "Đang xác nhận";
      case "CONFIRMED":
        return "Đã xác nhận";
      case "PROCESSING":
        return "Đang xử lý";
      case "SHIPPING":
        return "Đang giao hàng";
      case "DELIVERED":
        return "Đã giao hàng";
      case "CANCELLED":
        return "Đã hủy";
      case "RETURNED":
        return "Đã trả hàng";
      default:
        return "Không xác định";
    }
  };

  const getStatusPaymentText = (status: string) => {
    switch (status) {
      case "PENDING":
        return "Chờ xử lý";
      case "PROCESSING":
        return "Đang xử lý";
      case "PAID":
        return "Đã thanh toán";
      case "FAILED":
        return "Thanh toán thất bại";
      case "CANCELLED":
        return "Đã hủy";
      case "REFUNDED":
        return "Đã hoàn tiền";
      case "CANCELLED":
        return "Đã hủy";
      default:
        return "Không xác định";
    }
  };

  if (isLoading) return <p className="text-center text-gray-500">Đang tải đơn hàng...</p>;
  if (isError) return <p className="text-center text-red-500">Không thể tải danh sách đơn hàng.</p>;

  return (
    <>
      {/* Breadcrumb */}
      <div className="flex items-center text-gray-600 text-base mb-6">
        <FaHome className="mr-2 text-gray-500" />
        <Link href="/" className="hover:text-[#E61E4D] transition">
          Trang chủ
        </Link>
        <FaChevronRight className="mx-2 text-gray-400" />
        <span className="font-medium text-gray-800">Quản lý đơn hàng</span>
      </div>

      <div className="grid grid-cols-4 gap-6 mb-10">
        <SidebarAccount />
        <main className="col-span-3 border border-gray-300 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Đơn hàng của bạn</h2>

          {mappedOrders.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="p-3 font-semibold text-gray-700 border-b border-gray-200">STT</th>
                    <th className="p-3 font-semibold text-gray-700 border-b border-gray-200">Sản phẩm</th>
                    <th className="p-3 font-semibold text-gray-700 border-b border-gray-200">Ngày đặt</th>
                    <th className="p-3 font-semibold text-gray-700 border-b border-gray-200">Tổng tiền</th>
                    <th className="p-3 font-semibold text-gray-700 border-b border-gray-200 min-w-[160px]">Trạng thái</th>
                  </tr>
                </thead>
                <tbody>
                  {mappedOrders.map((order: any) => (
                    <tr
                      key={order.id}
                      className="border-b border-gray-200 hover:bg-gray-100 cursor-pointer transition"
                      onClick={() => openOrderDetail(order)}
                    >
                      <td className="p-3 text-gray-800 font-medium">{order.id}</td>
                      <td className="p-3 flex items-center gap-3">
                        <span className="block max-w-[400px] truncate">{order.orderItems[0].productName} {order.orderItems[0].productVariationName}</span>
                      </td>
                      <td className="p-3 text-gray-600">{order.date}</td>
                      <td className="p-3 text-gray-600 font-medium">
                        {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(
                          order.finalAmount
                        )}
                      </td>
                      <td className="p-3">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                          {getStatusText(order.status)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-600 text-center py-8">Bạn chưa có đơn hàng nào.</p>
          )}
        </main>
      </div>

      {/* Dialog chi tiết đơn hàng */}
      <Transition appear show={isModalOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={closeModal}>
          {/* Overlay */}
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-200"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-150"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/50" />
          </Transition.Child>

          {/* Nội dung */}
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-6">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 scale-95"
                enterTo="opacity-100 translate-y-0 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 scale-100"
                leaveTo="opacity-0 translate-y-4 scale-95"
              >
                <Dialog.Panel className="w-full max-w-3xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                      <div className="flex justify-between items-center border-b border-gray-300 pb-3 mb-4">
                    <Dialog.Title as="h3" className="text-xl font-bold text-gray-800">
                      Chi tiết đơn hàng #{selectedOrder?.orderCode}
                    </Dialog.Title>
                      <div className="flex items-center gap-2">
                        {selectedOrder?.status === 'DELIVERED' && selectedOrder?.id && (
                          <InvoicePdfDownload id={selectedOrder.id} type="order" />
                        )}
                        <button onClick={closeModal} className="text-gray-500 hover:text-red-500 cursor-pointer transition">
                          <FaTimes size={20} />
                        </button>
                      </div>
                  </div>

                  {/* Thông tin chung */}
                  <div className="space-y-2 text-gray-700 mb-4">
                    <p><strong>Trạng thái:</strong> {getStatusText(selectedOrder?.status)}</p>
                    <p><strong>Ngày đặt:</strong> {selectedOrder?.createdAt}</p>
                    <p><strong>Người nhận:</strong> {selectedOrder?.shippingName} ({selectedOrder?.shippingPhone})</p>
                    <p><strong>Địa chỉ:</strong> {selectedOrder?.shippingAddress}</p>
                    {selectedOrder?.note && <p><strong>Ghi chú:</strong> {selectedOrder.note}</p>}
                  </div>

                  {/* Sản phẩm */}
                  <div className="border-t border-gray-300 pt-3 mb-4">
                    <h4 className="text-lg font-semibold text-gray-800 mb-2">Sản phẩm</h4>
                    <div className="space-y-3">
                      {selectedOrder?.orderItems?.map((item: any) => (
                        <div
                          key={item.id}
                          className="flex justify-between items-center bg-gray-50 p-3 rounded-lg border border-gray-400"
                        >
                          <div>
                            <p className="font-medium">{item.productName}</p>
                            <p className="text-sm text-gray-500">{item.productVariationName}</p>
                            <p className="text-sm">Số lượng: {item.quantity}</p>
                          </div>
                          <p className="font-semibold text-gray-800">

                            {/* {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(
                              item.totalAmount
                            )} */}

                            {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(
                              item.unitPrice * item.quantity
                            )}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tổng tiền */}
                  <div className="border-t border-gray-300 pt-3 text-gray-800">
                    <div className="flex justify-between py-1">
                      <span>Tạm tính:</span>
                      <span>{new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(
                        selectedOrder?.totalAmount
                      )}</span>
                    </div>
                    <div className="flex justify-between py-1 text-green-600">
                      <span>Giảm giá:</span>
                      <span>-{new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(
                        selectedOrder?.discountAmount
                      )}</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span>Phí vận chuyển:</span>
                      <span>{new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(
                        selectedOrder?.shippingFee
                      )}</span>
                    </div>
                    <div className="flex justify-between py-2 border-t border-gray-300 font-bold text-lg">
                      <span>Tổng cộng:</span>
                      <span className="text-[#E61E4D]">
                        {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(
                          selectedOrder?.finalAmount
                        )}
                      </span>
                    </div>
                  </div>

                  {/* Phương thức thanh toán */}
                  <div className="border-t border-gray-300 mt-4 pt-3 text-gray-700">
                    <p><strong>Phương thức thanh toán:</strong> {selectedOrder?.paymentMethod}</p>
                    <p><strong>Trạng thái thanh toán:</strong> {getStatusPaymentText(selectedOrder?.paymentStatus)}</p>
                  </div>

                  {/* Nút hủy đơn hàng */}
                  {(selectedOrder?.status === 'PENDING' || selectedOrder?.status === 'CONFIRMED') && (
                    <div className="border-t border-gray-300 mt-4 pt-4">
                      <button
                        onClick={() => handleCancelOrder(selectedOrder.id)}
                        className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3 rounded-lg transition"
                      >
                        Hủy đơn hàng
                      </button>
                    </div>
                  )}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      {/* Modal xác nhận hủy đơn */}
      <Transition appear show={showCancelConfirm} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={() => !isSubmitting && setShowCancelConfirm(false)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-200"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-150"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/30" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-6">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 scale-95"
                enterTo="opacity-100 translate-y-0 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 scale-100"
                leaveTo="opacity-0 translate-y-4 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title as="h3" className="text-lg font-bold text-gray-900 mb-4">
                    Xác nhận hủy đơn hàng
                  </Dialog.Title>
                  
                  <p className="text-gray-600 mb-6">
                    Bạn có chắc chắn muốn hủy đơn hàng này không? Hành động này không thể hoàn tác.
                  </p>

                  <div className="flex gap-3 justify-end">
                    <button
                      onClick={() => setShowCancelConfirm(false)}
                      disabled={isSubmitting}
                      className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
                    >
                      Không
                    </button>
                    <button
                      onClick={confirmCancelOrder}
                      disabled={isSubmitting}
                      className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 disabled:opacity-50"
                    >
                      {isSubmitting ? 'Đang xử lý...' : 'Xác nhận hủy'}
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
