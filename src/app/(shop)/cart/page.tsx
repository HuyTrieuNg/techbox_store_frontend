"use client";

import CartItem from "@/components/CartItem";
import Link from "next/link";
import { FaChevronRight, FaHome } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useCart } from "@/hooks/useCart";
import { useAuthContext } from "@/contexts/AuthContext";

export default function CartPage() {
  const { user } = useAuthContext();
  const router = useRouter();
  const { cart, isLoading, isError, totalAmount } = useCart();

  if (!user) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-semibold mb-4 text-red-500">
          Bạn cần đăng nhập để xem giỏ hàng
        </h2>

        <Link
          href="/login"
          className="inline-block bg-[#E61E4D] text-white px-5 py-3 rounded-lg font-medium hover:bg-[#c71a3f] transition"
        >
          Đăng nhập ngay
        </Link>
      </div>
    );
  }

  // Tính tổng tiền giảm
  const totalDiscount = cart?.items.reduce((sum, item) => {
    return sum + (item.originalPrice - item.unitPrice) * item.quantity;
  }, 0) || 0;

  const totalSubtotal = cart ? cart.subtotal + totalDiscount : 0;
  const finalTotal = totalSubtotal - totalDiscount;


  if (isLoading) return <p className="text-center py-10">Đang tải giỏ hàng...</p>;
  if (isError) return <p className="text-center py-10 text-red-500">Lỗi khi tải giỏ hàng.</p>;

  if (cart?.empty) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-semibold mb-4">Giỏ hàng của bạn đang trống</h2>
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[#E61E4D] font-semibold hover:underline"
        >
          <FaHome /> Tiếp tục mua sắm
        </Link>
      </div>
    );
  }

  return (
    <>
      {/* Breadcrumb */}
      <div className="flex items-center text-gray-600 text-base mb-6">
        <FaHome className="mr-2 text-gray-500" />
        <Link href="/" className="hover:text-[#E61E4D] transition">
          Trang chủ
        </Link>
        <FaChevronRight className="mx-2 text-gray-400" />
        <span className="font-medium text-gray-800">Giỏ hàng</span>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 m-5 lg:m-10">
        {/* Bảng sản phẩm */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow overflow-hidden">
          <div className="bg-[#E61E4D] text-white grid grid-cols-[2fr_2fr_1fr_2fr] font-semibold py-3 px-6">
            <span>Sản phẩm</span>
            <span className="text-center">Giá</span>
            <span className="text-center">Số lượng</span>
            <span className="text-right">Tổng</span>
          </div>
          <div>
            {cart?.items.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>
        </div>

        {/* Tổng đơn hàng */}
        <div className="bg-white rounded-lg shadow overflow-hidden h-fit">
          <div className="bg-[#E61E4D] text-white font-semibold py-3 px-6">
            Tổng đơn hàng
          </div>
          <div className="p-6 space-y-3">
            <div className="flex justify-between text-sm">
              <span>Tạm tính:</span>
              <span>{totalSubtotal.toLocaleString("vi-VN")} ₫</span>
            </div>

            <div className="flex justify-between border-b pb-3">
              <span>Giảm giá:</span>
              {totalDiscount > 0 ? (
                <span className="text-green-600 font-medium">
                  -{totalDiscount.toLocaleString("vi-VN")} ₫
                </span>
              ) : (
                <span className="text-gray-400">---</span>
              )}
            </div>

            <div className="flex justify-between font-semibold text-lg">
              <span>Tổng cộng:</span>
              <span className="text-[#E61E4D]">
                {(finalTotal).toLocaleString("vi-VN")} ₫
              </span>
            </div>

            <button
              className="mt-6 w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition duration-200 cursor-pointer"
              onClick={() => router.push("/checkout")}
            >
              Tiến hành thanh toán
            </button>
          </div>
        </div>
      </div>
    </>
  );
}