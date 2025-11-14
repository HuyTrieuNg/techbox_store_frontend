"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { FaHome, FaChevronRight } from "react-icons/fa";
import { useCart } from "@/hooks/useCart";
import { useCreateOrder } from "@/hooks/useOrder";
import { useUser } from "@/hooks/useUser";               // <-- NEW
import { useRouter } from "next/navigation";
import { CartService } from "@/services/cartService";

export default function CheckoutPage() {
  const router = useRouter();

  /* ------------------- HOOKS ------------------- */
  const { cart, isLoading: cartLoading, isError: cartError } = useCart();
  const { createOrder, isSubmitting, error: orderError } = useCreateOrder();
  const { refreshCart } = useCart();

  const { user, addresses, loading: userLoading } = useUser();   // <-- NEW

  /* ------------------- STATE ------------------- */
  const [paymentMethod, setPaymentMethod] = useState<"COD" | "VNPAY">("COD");
  const [shippingFee, setShippingFee] = useState(30000);

  // Controlled form data
  const [formData, setFormData] = useState({
    shippingName: "",
    shippingPhone: "",
    shippingEmail: "",
    shippingAddress: "",
    shippingWard: "",
    shippingDistrict: "",
    shippingCity: "",
    shippingPostalCode: "",
    shippingCountry: "Việt Nam",
    shippingMethod: "STANDARD",
    deliveryInstructions: "",
  });

  /* ------------------- EFFECTS ------------------- */
  // 1. Điền sẵn từ user profile
  useEffect(() => {
    if (user && !userLoading) {
      const fullName = `${user.firstName || ""} ${user.lastName || ""}`.trim();

      setFormData((prev) => ({
        ...prev,
        shippingName: fullName || prev.shippingName,
        shippingPhone: user.phone || prev.shippingPhone,
        shippingEmail: user.email || prev.shippingEmail,
      }));
    }
  }, [user, userLoading]);

  // 2. Điền sẵn địa chỉ mặc định (hoặc địa chỉ đầu tiên)
  const defaultAddress = addresses.find((a) => a.isDefault) ?? addresses[0];
  useEffect(() => {
    if (defaultAddress) {
      setFormData((prev) => ({
        ...prev,
        shippingAddress: defaultAddress.streetAddress || prev.shippingAddress,
        shippingWard: defaultAddress.ward || prev.shippingWard,
        shippingDistrict: defaultAddress.district || prev.shippingDistrict,
        shippingCity: defaultAddress.city || prev.shippingCity,
        shippingPostalCode: defaultAddress.postalCode || prev.shippingPostalCode,
      }));
    }
  }, [defaultAddress]);

  /* ------------------- HANDLERS ------------------- */
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Cập nhật phí vận chuyển khi thay đổi shippingMethod
    if (name === "shippingMethod") {
      handleShippingChange(value);
    }
  };

  const handleShippingChange = (method: string) => {
    switch (method) {
      case "STANDARD":
        setShippingFee(30000);
        break;
      case "EXPRESS":
        setShippingFee(60000);
        break;
      case "SAME_DAY":
        setShippingFee(100000);
        break;
      default:
        setShippingFee(0);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!cart || cart.items.length === 0) return;

    // Validation
    const required: (keyof typeof formData)[] = [
      "shippingName",
      "shippingPhone",
      "shippingEmail",
      "shippingAddress",
      "shippingWard",
      "shippingDistrict",
      "shippingCity",
    ];
    for (const field of required) {
      if (!formData[field]) {
        alert(
          `Vui lòng nhập ${field === "shippingName"
            ? "họ tên"
            : field.replace("shipping", "").toLowerCase()
          }`
        );
        return;
      }
    }

    const orderItems = cart.items.map((item) => ({
      productVariationId: item.productVariationId,
      quantity: item.quantity,
    }));

    const shippingInfo = {
      shippingName: formData.shippingName,
      shippingPhone: formData.shippingPhone,
      shippingEmail: formData.shippingEmail,
      shippingAddress: formData.shippingAddress,
      shippingWard: formData.shippingWard,
      shippingDistrict: formData.shippingDistrict,
      shippingCity: formData.shippingCity,
      shippingPostalCode: formData.shippingPostalCode,
      shippingCountry: formData.shippingCountry,
      shippingMethod: formData.shippingMethod,
      deliveryInstructions: formData.deliveryInstructions || undefined,
    };

    const payload = {
      orderItems,
      shippingInfo,
      paymentInfo: { paymentMethod },
      note: formData.deliveryInstructions,
    };

    try {
      if (paymentMethod === "VNPAY") {
        // Gọi API chỉ để lấy paymentUrl, KHÔNG tạo đơn hàng
        const { paymentUrl } = await createOrder(payload); // API phải trả { paymentUrl }
        if (paymentUrl) {
          console.log("Chuyển hướng đến VNPay:", paymentUrl);
          window.location.href = paymentUrl;
          return; // Dừng lại, không làm gì thêm
        }
      }

      // COD: tạo đơn ngay
      const response = await createOrder(payload);
      alert(`Đặt hàng thành công! Mã đơn: ${response.orderCode}`);
      await CartService.clearCart();
      refreshCart();
      router.push(`/account/orders`);
    } catch (err: any) {
      alert(err.message || "Đặt hàng thất bại");
    }
  };

  /* ------------------- LOADING / ERROR ------------------- */
  if (cartLoading || userLoading) {
    return <p className="text-center py-20">Đang tải thông tin...</p>;
  }
  if (cartError || !cart) {
    return <p className="text-center py-20 text-red-600">Lỗi khi tải giỏ hàng.</p>;
  }
  if (cart.items.length === 0) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-semibold mb-4">Giỏ hàng trống</h2>
        <Link href="/" className="text-[#E61E4D] font-semibold hover:underline">
          Quay lại mua sắm
        </Link>
      </div>
    );
  }

  const total = cart.subtotal + shippingFee;

  /* ------------------- RENDER ------------------- */
  return (
    <>
      {/* Breadcrumb */}
      <div className="flex items-center text-gray-600 text-base mb-6">
        <FaHome className="mr-2 text-gray-500" />
        <Link href="/" className="hover:text-[#E61E4D] transition">
          Trang chủ
        </Link>
        <FaChevronRight className="mx-2 text-gray-400" />
        <span className="font-medium text-gray-800">Thanh toán</span>
      </div>

      <form onSubmit={handleSubmit} className="bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT: Form */}
          <div className="lg:col-span-2 space-y-8">
            {/* Shipping Info */}
            <div className="bg-white p-8 rounded-lg border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <svg
                  className="w-6 h-6 text-[#E61E4D]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                  />
                </svg>
                Thông tin giao hàng
              </h2>

              {/* OPTIONAL: Chọn địa chỉ đã lưu */}
              {/* Hiển thị thông báo nếu có địa chỉ mặc định */}
              {/* {defaultAddress && (
                <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-800">
                  <strong>Địa chỉ mặc định:</strong> {defaultAddress.streetAddress || defaultAddress.streetAddress}, {defaultAddress.ward}, {defaultAddress.district}, {defaultAddress.city}
                </div>
              )} */}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Họ và tên */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Họ và tên *</label>
                  <input
                    required
                    type="text"
                    name="shippingName"
                    value={formData.shippingName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Email *</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                      </svg>
                    </div>
                    <input
                      required
                      type="email"
                      name="shippingEmail"
                      value={formData.shippingEmail}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200"
                    />
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Số điện thoại *</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <input
                      required
                      type="tel"
                      name="shippingPhone"
                      value={formData.shippingPhone}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200"
                    />
                  </div>
                </div>

                {/* Tỉnh/Thành phố - INPUT TEXT */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Tỉnh / Thành phố *</label>
                  <input
                    required
                    type="text"
                    name="shippingCity"
                    value={formData.shippingCity}
                    onChange={handleInputChange}
                    placeholder="VD: TP. Hồ Chí Minh"
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200"
                  />
                </div>

                {/* Quận/Huyện - INPUT TEXT */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Quận / Huyện *</label>
                  <input
                    required
                    type="text"
                    name="shippingDistrict"
                    value={formData.shippingDistrict}
                    onChange={handleInputChange}
                    placeholder="VD: Quận 1"
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200"
                  />
                </div>

                {/* Phường/Xã - INPUT TEXT */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Phường / Xã *</label>
                  <input
                    required
                    type="text"
                    name="shippingWard"
                    value={formData.shippingWard}
                    onChange={handleInputChange}
                    placeholder="VD: Phường Bến Nghé"
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200"
                  />
                </div>

                {/* Địa chỉ cụ thể */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Địa chỉ (số nhà, tên đường) *</label>
                  <input
                    required
                    type="text"
                    name="shippingAddress"
                    value={formData.shippingAddress}
                    onChange={handleInputChange}
                    placeholder="VD: 123 Nguyễn Huệ"
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200"
                  />
                </div>

                {/* Mã bưu điện */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Mã bưu điện</label>
                  <input
                    type="text"
                    name="shippingPostalCode"
                    value={formData.shippingPostalCode}
                    onChange={handleInputChange}
                    placeholder="VD: 700000"
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200"
                  />
                </div>

                {/* Quốc gia */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Quốc gia *</label>
                  <input
                    type="text"
                    name="shippingCountry"
                    value={formData.shippingCountry}
                    readOnly
                    className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-lg text-gray-600 cursor-not-allowed"
                  />
                </div>

                {/* Phương thức vận chuyển */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Phương thức vận chuyển
                  </label>
                  <div className="space-y-3 bg-gray-50 p-4 rounded-lg border border-gray-200">
                    {[
                      { value: "STANDARD", label: "Tiêu chuẩn (3–5 ngày)", price: "30.000 ₫" },
                      { value: "EXPRESS", label: "Nhanh (1–2 ngày)", price: "60.000 ₫" },
                      { value: "SAME_DAY", label: "Trong ngày (trước 24h)", price: "100.000 ₫" },
                    ].map((method) => (
                      <label
                        key={method.value}
                        className="flex items-center justify-between p-3 rounded-lg border border-gray-300 bg-white hover:bg-blue-50 cursor-pointer transition-all duration-200 has-[:checked]:border-blue-200 has-[:checked]:bg-blue-50"
                      >
                        <div className="flex items-center gap-3">
                          <input
                            required
                            type="radio"
                            name="shippingMethod"
                            value={method.value}
                            checked={formData.shippingMethod === method.value}
                            onChange={handleInputChange}
                            className="w-5 h-5 text-blue-600 border-gray-300 focus:ring-blue-500"
                          />
                          <span className="font-medium text-gray-800">{method.label}</span>
                        </div>
                        <span className="text-sm font-semibold text-gray-700">
                          {method.price}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Ghi chú */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Ghi chú cho đơn hàng
                  </label>
                  <textarea
                    name="deliveryInstructions"
                    placeholder="Ví dụ: Gọi trước khi giao, để ở quầy bảo vệ..."
                    rows={4}
                    value={formData.deliveryInstructions}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200 resize-none"
                  />
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold mb-5">Phương thức thanh toán</h2>
              <div className="space-y-4">
                <label
                  className={`flex items-center gap-3 p-4 border rounded-lg cursor-pointer transition ${paymentMethod === "COD"
                    ? "bg-blue-50 border-blue-200 shadow-md"
                    : "bg-gray-50 border-gray-300"
                    }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="COD"
                    checked={paymentMethod === "COD"}
                    onChange={() => setPaymentMethod("COD")}
                    className="w-5 h-5"
                  />
                  <span className="font-medium">Thanh toán khi nhận hàng (COD)</span>
                </label>

                <label
                  className={`flex flex-col p-4 border rounded-lg cursor-pointer transition ${paymentMethod === "VNPAY"
                    ? "bg-blue-50 border-blue-200 shadow-md"
                    : "bg-gray-50 border-gray-300"
                    }`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <input
                      type="radio"
                      name="payment"
                      value="VNPAY"
                      checked={paymentMethod === "VNPAY"}
                      onChange={() => setPaymentMethod("VNPAY")}
                      className="w-5 h-5"
                    />
                    <span className="font-medium">Thanh toán qua VNPay</span>
                    <Image
                      src="https://sandbox.vnpayment.vn/paymentv2/Images/brands/logo.svg"
                      alt="VNPAY"
                      width={100}
                      height={30}
                    />
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* RIGHT: Order Summary */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm sticky top-20">
              <h3 className="text-lg font-semibold mb-4">Đơn hàng của bạn</h3>

              <div className="space-y-4 max-h-96 overflow-y-auto">
                {cart.items.map((item) => (
                  <div key={item.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img
                        src={item.productImage || "/no-image.png"}
                        alt={item.productName}
                        width={50}
                        height={50}
                        className="rounded-md object-cover"
                      />
                      <div>
                        <p className="text-gray-800 text-sm font-medium">
                          {item.productName}
                        </p>
                        <p className="text-gray-500 text-xs">{item.variantName}</p>
                        <p className="text-gray-500 text-xs">Số lượng: {item.quantity}</p>
                      </div>
                    </div>

                    <p className="text-gray-800 font-medium">
                      {item.unitPrice.toLocaleString()} ₫
                    </p>
                  </div>
                ))}
              </div>

              <hr className="my-4 border-gray-300" />

              <div className="space-y-2 text-gray-700">
                <div className="flex justify-between">
                  <span>Tạm tính:</span>
                  <span>{cart.subtotal.toLocaleString()} ₫</span>
                </div>
                <div className="flex justify-between">
                  <span>Phí vận chuyển:</span>
                  <span className="text-green-600">{shippingFee.toLocaleString()} ₫</span>
                </div>
              </div>

              <hr className="my-4 border-gray-300" />

              <div className="flex justify-between text-lg font-semibold">
                <span>Tổng cộng:</span>
                <span className="text-[#E61E4D]">{total.toLocaleString()} ₫</span>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`mt-6 w-full font-bold py-3 rounded-lg transition flex items-center justify-center
                  ${isSubmitting ? "bg-gray-400 text-gray-200 cursor-not-allowed" : "bg-[#E61E4D] text-white hover:bg-[#d41b46]"}`}
              >
                {isSubmitting ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Đang xử lý...
                  </>
                ) : (
                  "Thanh toán"
                )}
              </button>

              {/* Error Message */}
              {orderError && (
                <div className="mt-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
                  {orderError}
                </div>
              )}
            </div>
          </div>
        </div>
      </form>
    </>
  );
}