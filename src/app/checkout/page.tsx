// "use client";

// import Image from "next/image";
// import Link from "next/link";
// import { useState } from "react";
// import { FaChevronRight, FaHome } from "react-icons/fa";

// export default function CheckoutPage() {
//     const [formData, setFormData] = useState({
//         firstName: "",
//         streetAddress: "",
//         apartment: "",
//         city: "",
//         phone: "",
//         email: "",
//     });

//     const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     const handleSubmit = (e: React.FormEvent) => {
//         e.preventDefault();
//         alert("Order placed successfully!");
//     };

//     return (
//         <>
//             <div className="flex items-center text-gray-600 text-base mb-6">
//                 <FaHome className="mr-2 text-gray-500" />
//                 <Link href="/" className="hover:text-[#E61E4D] transition">
//                     Trang chủ
//                 </Link>
//                 <FaChevronRight className="mx-2 text-gray-400" />
//                 <span className="font-medium text-gray-800">Thanh toán</span>
//             </div>
//             <div className="bg-white px-10 m-10 flex flex-col md:flex-row gap-10 justify-center">
//                 {/* Billing Details */}
//                 <form
//                     onSubmit={handleSubmit}
//                     className="flex-1 max-w-md bg-white rounded-lg"
//                 >
//                     <h2 className="text-2xl font-semibold mb-6">Thông tin giao hàng</h2>

//                     <div className="flex flex-col gap-5">
//                         <div>
//                             <label className="block text-sm text-gray-600 mb-1">
//                                 Họ và tên<span className="text-red-500">*</span>
//                             </label>
//                             <input
//                                 type="text"
//                                 name="firstName"
//                                 value={formData.firstName}
//                                 onChange={handleChange}
//                                 required
//                                 className="w-full border border-gray-300 rounded-md px-3 py-2 bg-gray-50 focus:outline-none focus:ring-1 focus:ring-[#E61E4D]"
//                             />
//                         </div>

//                         <div>
//                             <label className="block text-sm text-gray-600 mb-1">
//                                 Địa chỉ<span className="text-red-500">*</span>
//                             </label>
//                             <input
//                                 type="text"
//                                 name="streetAddress"
//                                 value={formData.streetAddress}
//                                 onChange={handleChange}
//                                 required
//                                 className="w-full border border-gray-300 rounded-md px-3 py-2 bg-gray-50 focus:outline-none focus:ring-1 focus:ring-[#E61E4D]"
//                             />
//                         </div>

//                         <div>
//                             <label className="block text-sm text-gray-600 mb-1">
//                                 Số điện thoại<span className="text-red-500">*</span>
//                             </label>
//                             <input
//                                 type="tel"
//                                 name="phone"
//                                 value={formData.phone}
//                                 onChange={handleChange}
//                                 required
//                                 className="w-full border border-gray-300 rounded-md px-3 py-2 bg-gray-50 focus:outline-none focus:ring-1 focus:ring-[#E61E4D]"
//                             />
//                         </div>

//                         <div>
//                             <label className="block text-sm text-gray-600 mb-1">
//                                 Email<span className="text-red-500">*</span>
//                             </label>
//                             <input
//                                 type="email"
//                                 name="email"
//                                 value={formData.email}
//                                 onChange={handleChange}
//                                 required
//                                 className="w-full border border-gray-300 rounded-md px-3 py-2 bg-gray-50 focus:outline-none focus:ring-1 focus:ring-[#E61E4D]"
//                             />
//                         </div>
//                     </div>
//                 </form>

//                 {/* Order Summary */}
//                 <div className="w-full md:w-[400px] border-t md:border-t-0 md:border-l border-gray-200 md:pl-8">
//                     <div className="space-y-5">
//                         <div className="flex items-center justify-between">
//                             <div className="flex items-center gap-3">
//                                 <img
//                                     src="https://product.hstatic.net/200000722513/product/ava_ded8eaa81f5f4850a4f6fea27adc83b2_master.png"
//                                     alt="H1 Gamepad"
//                                     width={50}
//                                     height={50}
//                                     className="rounded-md"
//                                 />
//                                 <p className="text-gray-700">H1 Gamepad</p>
//                             </div>
//                             <p className="text-gray-800 font-medium">$25000000</p>
//                         </div>

//                         <div className="flex items-center justify-between">
//                             <div className="flex items-center gap-3">
//                                 <img
//                                     src="https://product.hstatic.net/200000722513/product/ava_ded8eaa81f5f4850a4f6fea27adc83b2_master.png"
//                                     alt="H1 Gamepad"
//                                     width={50}
//                                     height={50}
//                                     className="rounded-md"
//                                 />
//                                 <p className="text-gray-700">H1 Gamepad</p>
//                             </div>
//                             <p className="text-gray-800 font-medium">$25000000</p>
//                         </div>

//                         <div className="flex items-center justify-between">
//                             <div className="flex items-center gap-3">
//                                 <img
//                                     src="https://product.hstatic.net/200000722513/product/ava_ded8eaa81f5f4850a4f6fea27adc83b2_master.png"
//                                     alt="LCD Monitor"
//                                     width={50}
//                                     height={50}
//                                     className="rounded-md"
//                                 />
//                                 <p className="text-gray-700">Laptop Lenovo IdeaPad Slim 3 14IRH10 83K00008VN</p>
//                             </div>
//                             <p className="text-gray-800 font-medium">25000000</p>
//                         </div>

//                         <hr className="border-gray-300" />

//                         <div className="flex justify-between text-gray-700">
//                             <span>Tạm tính:</span>
//                             <span>25000000</span>
//                         </div>
//                         <div className="flex justify-between text-gray-700">
//                             <span>Phí ship:</span>
//                             <span className="text-green-600">Free</span>
//                         </div>

//                         <hr className="border-gray-300" />

//                         <div className="flex justify-between text-lg font-semibold">
//                             <span>Tổng cộng:</span>
//                             <span>$50000000</span>
//                         </div>

//                         <button
//                             type="submit"
//                             onClick={handleSubmit}
//                             className="mt-6 w-full bg-[#E61E4D] text-white font-bold py-3 rounded-lg hover:bg-[#d41b46ff] transition cursor-pointer"
//                         >
//                             Thanh toán
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// }


//ok
// "use client";

// import Image from "next/image";
// import Link from "next/link";
// import { useState } from "react";
// import { FaHome, FaChevronRight, FaTrash } from "react-icons/fa";

// export default function CheckoutPage() {
//     const [coupon, setCoupon] = useState("XRTMAS70");
//     const [sameAddress, setSameAddress] = useState(true);
//     const [createAccount, setCreateAccount] = useState(false);
//     const [shippingMethod, setShippingMethod] = useState("priority");
//     const [paymentMethod, setPaymentMethod] = useState("credit");

//     const handleSubmit = (e: React.FormEvent) => {
//         e.preventDefault();
//         alert("Order placed successfully!");
//     };

//     return (
//         <>
//             {/* Breadcrumb */}
//             <div className="flex items-center text-gray-600 text-base mb-6">
//                 <FaHome className="mr-2 text-gray-500" />
//                 <Link href="/" className="hover:text-[#E61E4D] transition">
//                     Trang chủ
//                 </Link>
//                 <FaChevronRight className="mx-2 text-gray-400" />
//                 <span className="font-medium text-gray-800">Thanh toán</span>
//             </div>

//             <div className="bg-gray-50 min-h-screen">
//                 <div className="max-w-7xl grid grid-cols-1 lg:grid-cols-3 gap-8">
//                     {/* Left Column: Billing & Shipping */}
//                     <div className="lg:col-span-2 space-y-8">
//                         {/* Billing Address */}
//                         <div className="bg-white p-6 rounded-sm shadow-sm">
//                             <h2 className="text-xl font-semibold mb-5">Thông tin giao hàng</h2>
//                             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                                 <div>
//                                     <label className="block text-sm text-gray-600 mb-1">Họ</label>
//                                     <input
//                                         type="text"
//                                         className="w-full border border-gray-300 rounded-md px-3 py-2 bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-500"
//                                     />
//                                 </div>
//                                 <div>
//                                     <label className="block text-sm text-gray-600 mb-1">Tên</label>
//                                     <input
//                                         type="text"
//                                         className="w-full border border-gray-300 rounded-md px-3 py-2 bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-500"
//                                     />
//                                 </div>
//                                 <div className="md:col-span-2">
//                                     <label className="block text-sm text-gray-600 mb-1">Địa chỉ email</label>
//                                     <input
//                                         type="email"
//                                         className="w-full border border-gray-300 rounded-md px-3 py-2 bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-500"
//                                     />
//                                 </div>
//                                 <div className="md:col-span-2">
//                                     <label className="block text-sm text-gray-600 mb-1">Số điện thoại</label>
//                                     <input
//                                         type="email"
//                                         className="w-full border border-gray-300 rounded-md px-3 py-2 bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-500"
//                                     />
//                                 </div>
//                                 <div>
//                                     <label className="block text-sm text-gray-600 mb-1">Tỉnh/ Thành phố</label>
//                                     <select className="w-full border border-gray-300 rounded-md px-3 py-2 bg-gray-50 focus:outline-none">
//                                         <option></option>
//                                     </select>
//                                 </div>
//                                 <div>
//                                     <label className="block text-sm text-gray-600 mb-1">Quận/ Huyện</label>
//                                     <select className="w-full border border-gray-300 rounded-md px-3 py-2 bg-gray-50 focus:outline-none">
//                                         <option></option>
//                                     </select>
//                                 </div>
//                                 <div>
//                                     <label className="block text-sm text-gray-600 mb-1">Phường/ xã</label>
//                                     <select className="w-full border border-gray-300 rounded-md px-3 py-2 bg-gray-50 focus:outline-none">
//                                         <option></option>
//                                     </select>
//                                 </div>
//                                 <div>
//                                     <label className="block text-sm text-gray-600 mb-1">Số nhà</label>
//                                     <input
//                                         type="text"
//                                         defaultValue=""
//                                         className="w-full border border-gray-300 rounded-md px-3 py-2 bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-500"
//                                     />
//                                 </div>
//                             </div>
//                         </div>

//                         {/* Payment Method */}
//                         <div className="bg-white p-6 rounded-lg shadow-sm">
//                             <h2 className="text-xl font-semibold mb-5">Hình thức thanh toán</h2>

//                             <div className="space-y-4">
//                                 <label className={`flex items-center gap-3 p-4 border rounded-lg cursor-pointer
//                                  ${paymentMethod === "cod" ? "bg-blue-50 border-blue-500 shadow-md" : "bg-gray-50 border border-gray-300"}`}>
//                                     <input
//                                         type="radio"
//                                         name="payment"
//                                         value="cod"
//                                         checked={paymentMethod === "cod"}
//                                         onChange={() => setPaymentMethod("cod")}
//                                         className="w-4 h-4 text-blue-600"
//                                     />
//                                     <span className="font-medium">COD</span>
//                                     <span className="text-xs text-gray-500 ml-auto">
//                                         Bạn sẽ thanh toán khi nhận hàng
//                                     </span>
//                                 </label>

//                                 <label className={`flex flex-col p-4 border rounded-lg cursor-pointer transition-all duration-200 
//     ${paymentMethod === "credit" ? "bg-blue-50 border-blue-500 shadow-md" : "bg-gray-50 border border-gray-300"}`}>
//                                     <div className="flex items-center gap-3 mb-2">
//                                         <input
//                                             type="radio"
//                                             name="payment"
//                                             value="credit"
//                                             checked={paymentMethod === "credit"}
//                                             onChange={() => setPaymentMethod("credit")}
//                                             className="w-4 h-4 text-blue-600"
//                                         />
//                                         <span className="font-medium">VNPay</span>
//                                         <div className="flex gap-1 ml-auto">
//                                             <Image src="https://sandbox.vnpayment.vn/paymentv2/Images/brands/logo.svg" alt="VNPay" width={100} height={30} />
//                                         </div>
//                                     </div>

//                                     {/* Chỉ hiển thị khi chọn VNPay */}
//                                     {paymentMethod === "credit" && (
//                                         <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3 animate-fadeIn">
//                                             <div className="md:col-span-2">
//                                                 <label className="block text-sm text-gray-600 mb-1">Số thẻ</label>
//                                                 <input
//                                                     type="text"
//                                                     placeholder="Nhập số thẻ"
//                                                     className="border border-gray-300 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 w-full"
//                                                 />
//                                             </div>
//                                             <div className="md:col-span-2">
//                                                 <label className="block text-sm text-gray-600 mb-1">Tên chủ thẻ</label>
//                                                 <input
//                                                     type="text"
//                                                     placeholder="Nhập tên chủ thẻ (không dấu)"
//                                                     className="border border-gray-300 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 w-full"
//                                                 />
//                                             </div>
//                                             <div className="md:col-span-2">
//                                                 <label className="block text-sm text-gray-600 mb-1">Ngày phát hành</label>
//                                                 <input
//                                                     type="text"
//                                                     placeholder="MM/YY"
//                                                     className="border border-gray-300 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 w-full"
//                                                 />
//                                             </div>
//                                         </div>
//                                     )}
//                                 </label>
//                             </div>
//                         </div>
//                     </div>

//                     {/* Right Column: Order Review & Summary */}
//                     <div className="space-y-6">
//                         {/* Order Review */}
//                         <div className="bg-white p-6 rounded-lg shadow-sm">
//                             {/* <h3 className="text-lg font-semibold mb-4">Order Review</h3>
//                             <p className="text-sm text-gray-600 mb-4">3 items in cart</p>

//                             <div className="space-y-4">
//                                 {[
//                                     { name: "Amet nunc, tincidunt interdum rhoncus massa", qty: 2, price: 245.78 },
//                                     { name: "Amet nunc, tincidunt interdum rhoncus massa", qty: 2, price: 245.78 },
//                                     { name: "Amet nunc, tincidunt interdum rhoncus massa", qty: 2, price: 245.78 },
//                                 ].map((item, i) => (
//                                     <div key={i} className="flex items-center gap-3 pb-3 border-b last:border-0">
//                                         <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 flex-shrink-0" />
//                                         <div className="flex-1">
//                                             <p className="text-sm text-gray-700 line-clamp-2">{item.name}</p>
//                                             <div className="flex items-center gap-2 mt-1">
//                                                 <button className="w-6 h-6 border rounded flex items-center justify-center text-xs">-</button>
//                                                 <span className="text-sm w-8 text-center">{item.qty}</span>
//                                                 <button className="w-6 h-6 border rounded flex items-center justify-center text-xs">+</button>
//                                             </div>
//                                         </div>
//                                         <div className="text-right">
//                                             <p className="font-medium">${item.price.toFixed(2)}</p>
//                                             <button className="text-red-500 text-xs mt-1">
//                                                 <FaTrash />
//                                             </button>
//                                         </div>
//                                     </div>
//                                 ))}
//                             </div> */}

//                             <div className="space-y-5">
//                                 <div className="flex items-center justify-between">
//                                     <div className="flex items-center gap-3">
//                                         <img
//                                             src="https://product.hstatic.net/200000722513/product/ava_ded8eaa81f5f4850a4f6fea27adc83b2_master.png"
//                                             alt="H1 Gamepad"
//                                             width={50}
//                                             height={50}
//                                             className="rounded-md"
//                                         />
//                                         <p className="text-gray-700">H1 Gamepad</p>
//                                     </div>
//                                     <p className="text-gray-800 font-medium">$25000000</p>
//                                 </div>

//                                 <div className="flex items-center justify-between">
//                                     <div className="flex items-center gap-3">
//                                         <img
//                                             src="https://product.hstatic.net/200000722513/product/ava_ded8eaa81f5f4850a4f6fea27adc83b2_master.png"
//                                             alt="H1 Gamepad"
//                                             width={50}
//                                             height={50}
//                                             className="rounded-md"
//                                         />
//                                         <p className="text-gray-700">H1 Gamepad</p>
//                                     </div>
//                                     <p className="text-gray-800 font-medium">$25000000</p>
//                                 </div>

//                                 <div className="flex items-center justify-between">
//                                     <div className="flex items-center gap-3">
//                                         <img
//                                             src="https://product.hstatic.net/200000722513/product/ava_ded8eaa81f5f4850a4f6fea27adc83b2_master.png"
//                                             alt="LCD Monitor"
//                                             width={50}
//                                             height={50}
//                                             className="rounded-md"
//                                         />
//                                         <p className="text-gray-700">Laptop Lenovo IdeaPad Slim 3 14IRH10 83K00008VN</p>
//                                     </div>
//                                     <p className="text-gray-800 font-medium">$25000000</p>
//                                 </div>

//                                 <hr className="border-gray-300" />

//                                 <div className="flex justify-between text-gray-700">
//                                     <span>Tạm tính:</span>
//                                     <span>25000000</span>
//                                 </div>
//                                 <div className="flex justify-between text-gray-700">
//                                     <span>Phí ship:</span>
//                                     <span className="text-green-600">Free</span>
//                                 </div>

//                                 <hr className="border-gray-300" />

//                                 <div className="flex justify-between text-lg font-semibold">
//                                     <span>Tổng cộng:</span>
//                                     <span>$50000000</span>
//                                 </div>

//                                 <button
//                                     type="submit"
//                                     onClick={handleSubmit}
//                                     className="mt-6 w-full bg-[#E61E4D] text-white font-bold py-3 rounded-lg hover:bg-[#d41b46ff] transition cursor-pointer"
//                                 >
//                                     Thanh toán
//                                 </button>
//                             </div>


//                         </div>

//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// }



"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaHome, FaChevronRight } from "react-icons/fa";
import { useCart } from "@/hooks/useCart";
import { useCreateOrder } from "@/hooks/useOrder";
import { useRouter } from "next/navigation";
import { CartService } from "@/services/cartService";

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, isLoading: cartLoading, isError: cartError } = useCart();
  const { createOrder, isSubmitting, error: orderError } = useCreateOrder();

  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [shippingFee, setShippingFee] = useState(30000);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!cart || cart.items.length === 0) return;

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    // Validation cơ bản
    const requiredFields = ["shippingName", "shippingPhone", "shippingEmail", "shippingAddress", "shippingCity", "shippingDistrict", "shippingWard"];
    for (const field of requiredFields) {
      if (!formData.get(field)) {
        alert(`Vui lòng nhập ${field === "shippingName" ? "họ tên" : field.replace("shipping", "").toLowerCase()}`);
        return;
      }
    }

    const orderItems = cart.items.map((item) => ({
      productVariationId: item.productVariationId,
      quantity: item.quantity,
    }));

    const shippingInfo = {
      shippingName: formData.get("shippingName") as string,
      shippingPhone: formData.get("shippingPhone") as string,
      shippingEmail: formData.get("shippingEmail") as string,
      shippingAddress: formData.get("shippingAddress") as string,
      shippingWard: formData.get("shippingWard") as string,
      shippingDistrict: formData.get("shippingDistrict") as string,
      shippingCity: formData.get("shippingCity") as string,
      shippingPostalCode: (formData.get("shippingPostalCode") as string) || "",
      shippingCountry: formData.get("shippingCountry") as string,
      shippingMethod: formData.get("shippingMethod") as string,
      deliveryInstructions: (formData.get("deliveryInstructions") as string) || undefined,
    };

    const payload = {
      orderItems,
      shippingInfo,
      paymentInfo: { paymentMethod },
      note: shippingInfo.deliveryInstructions,
    };

    try {
      const response = await createOrder(payload);
      
      if (paymentMethod === "VNPAY" && response.paymentUrl) {
        // Chuyển hướng đến VNPay
        window.location.href = response.paymentUrl;
      } else {
        // COD thành công
        alert(`Đặt hàng thành công! Mã đơn: ${response.orderCode}`);
        await CartService.clearCart();
        router.push(`/account/orders`);
      }
    } catch (err) {
      // Lỗi đã được xử lý trong hook
      console.error("Order failed:", err);
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



  if (cartLoading) return <p className="text-center py-20">Đang tải giỏ hàng...</p>;
  if (cartError || !cart) return <p className="text-center py-20 text-red-600">Lỗi khi tải giỏ hàng.</p>;

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

  return (
    <>
      {/* Breadcrumb */}
      <div className="flex items-center text-gray-600 text-base mb-6">
        <FaHome className="mr-2 text-gray-500" />
        <Link href="/" className="hover:text-[#E61E4D] transition">Trang chủ</Link>
        <FaChevronRight className="mx-2 text-gray-400" />
        <span className="font-medium text-gray-800">Thanh toán</span>
      </div>

      <form onSubmit={handleSubmit} className="bg-gray-50 min-h-screen py-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT: Form */}
          <div className="lg:col-span-2 space-y-8">
            {/* Shipping Info */}
            <div className="bg-white p-8 rounded-lg border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <svg className="w-6 h-6 text-[#E61E4D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
                Thông tin giao hàng
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Họ và tên */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Họ và tên *</label>
                  <input
                    required
                    type="text"
                    name="shippingName"
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
                      className="w-full pl-10 pr-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200"
                    />
                  </div>
                </div>

                {/* Tỉnh/Thành phố */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Tỉnh / Thành phố *</label>
                  <select
                    required
                    name="shippingCity"
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200 appearance-none cursor-pointer"
                    style={{ backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`, backgroundPosition: 'right 0.5rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.5em' }}
                  >
                    <option value="">-- Chọn tỉnh / thành phố --</option>
                    <option value="TP.HCM">TP. Hồ Chí Minh</option>
                    <option value="Hà Nội">Hà Nội</option>
                    <option value="Đà Nẵng">Đà Nẵng</option>
                  </select>
                </div>

                {/* Quận/Huyện */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Quận / Huyện *</label>
                  <select
                    required
                    name="shippingDistrict"
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200 appearance-none cursor-pointer"
                    style={{ backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`, backgroundPosition: 'right 0.5rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.5em' }}
                  >
                    <option value="">-- Chọn quận / huyện --</option>
                    <option value="TP.HCM">TP. Hồ Chí Minh</option>
                    <option value="Hà Nội">Hà Nội</option>
                    <option value="Đà Nẵng">Đà Nẵng</option>
                  </select>
                </div>

                {/* Phường/Xã */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Phường / Xã *</label>
                  <select
                    required
                    name="shippingWard"
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200 appearance-none cursor-pointer"
                    style={{ backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`, backgroundPosition: 'right 0.5rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.5em' }}
                  >
                    <option value="">-- Chọn phường / xã --</option>
                    <option value="TP.HCM">TP. Hồ Chí Minh</option>
                    <option value="Hà Nội">Hà Nội</option>
                    <option value="Đà Nẵng">Đà Nẵng</option>
                  </select>
                </div>

                {/* Địa chỉ cụ thể */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Địa chỉ (số nhà, tên đường) *</label>
                  <input
                    required
                    type="text"
                    name="shippingAddress"
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200"
                  />
                </div>

                {/* Mã bưu điện */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Mã bưu điện *</label>
                  <input
                    type="text"
                    name="shippingPostalCode"
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200"
                  />
                </div>

                {/* Quốc gia */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Quốc gia *</label>
                  <input
                    type="text"
                    name="shippingCountry"
                    defaultValue="Việt Nam"
                    readOnly
                    className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-lg text-gray-600 cursor-not-allowed"
                  />
                </div>

                {/* Phương thức vận chuyển */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-3">Phương thức vận chuyển</label>
                  <div className="space-y-3 bg-gray-50 p-4 rounded-lg border border-gray-200">
                    {[
                      { value: "STANDARD", label: "Tiêu chuẩn (3–5 ngày)", price: "30.000 ₫" },
                      { value: "EXPRESS", label: "Nhanh (1–2 ngày)", price: "60.000 ₫" },
                      { value: "SAME_DAY", label: "Trong ngày (trước 24h)", price: "100.000 ₫" }
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
                            defaultChecked={method.value === "STANDARD"}
                            onChange={() => handleShippingChange(method.value)}
                            className="w-5 h-5 text-blue-600 border-gray-300 focus:ring-blue-500"
                          />

                          <span className="font-medium text-gray-800">{method.label}</span>
                        </div>
                        <span className="text-sm font-semibold text-gray-700">{method.price}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Ghi chú */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Ghi chú cho đơn hàng</label>
                  <textarea
                    name="deliveryInstructions"
                    placeholder="Ví dụ: Gọi trước khi giao, để ở quầy bảo vệ..."
                    rows={4}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200 resize-none"
                  ></textarea>
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold mb-5">Phương thức thanh toán</h2>
              <div className="space-y-4">
                <label className={`flex items-center gap-3 p-4 border rounded-lg cursor-pointer transition ${paymentMethod === "COD" ? "bg-blue-50 border-blue-200 shadow-md" : "bg-gray-50 border-gray-300"}`}>
                  <input type="radio" name="payment" value="COD" checked={paymentMethod === "COD"} onChange={() => setPaymentMethod("COD")} className="w-5 h-5" />
                  <span className="font-medium">Thanh toán khi nhận hàng (COD)</span>
                </label>

                <label className={`flex flex-col p-4 border rounded-lg cursor-pointer transition ${paymentMethod === "VNPAY" ? "bg-blue-50 border-blue-200 shadow-md" : "bg-gray-50 border-gray-300"}`}>
                  <div className="flex items-center gap-3 mb-2">
                    <input type="radio" name="payment" value="VNPAY" checked={paymentMethod === "VNPAY"} onChange={() => setPaymentMethod("VNPAY")} className="w-5 h-5" />
                    <span className="font-medium">Thanh toán qua VNPay</span>
                    <Image src="https://sandbox.vnpayment.vn/paymentv2/Images/brands/logo.svg" alt="VNPAY" width={100} height={30} />
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* RIGHT: Order Summary */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm sticky top-6">
              <h3 className="text-lg font-semibold mb-4">Đơn hàng của bạn</h3>

              <div className="space-y-4 max-h-96 overflow-y-auto">
                {cart.items.map((item) => (
                  <div key={item.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img src={item.productImage || "/no-image.png"} alt={item.productName} width={50} height={50} className="rounded-md object-cover" />
                      <div>
                        <p className="text-gray-800 text-sm font-medium">{item.productName}</p>
                        <p className="text-gray-500 text-xs">Số lượng: {item.quantity}</p>
                      </div>
                    </div>
                    <p className="text-gray-800 font-medium">{item.unitPrice.toLocaleString()} ₫</p>
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
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
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





// "use client";

// import Image from "next/image";
// import Link from "next/link";
// import { useState } from "react";
// import { FaChevronRight, FaHome, FaUser, FaTruck, FaCreditCard } from "react-icons/fa";

// export default function CheckoutPage() {
//     const [formData, setFormData] = useState({
//         // Thông tin khách hàng
//         fullName: "",
//         phone: "",
//         email: "",
//         // Địa chỉ giao hàng
//         streetAddress: "",
//         ward: "",
//         district: "",
//         province: "",
//         // Hóa đơn VAT (tùy chọn)
//         invoiceCompany: "",
//         invoiceTaxCode: "",
//         invoiceAddress: "",
//         // Lựa chọn
//         shippingMethod: "standard",
//         paymentMethod: "cod",
//         // Đăng nhập (mock)
//         isLoggedIn: false,
//     });

//     const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     const handleShippingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         setFormData({ ...formData, shippingMethod: e.target.value });
//     };

//     const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         setFormData({ ...formData, paymentMethod: e.target.value });
//     };

//     const handleSubmit = (e: React.FormEvent) => {
//         e.preventDefault();
//         // Validation cơ bản
//         if (!formData.fullName || !formData.phone || !formData.streetAddress || !formData.province) {
//             alert("Vui lòng điền đầy đủ thông tin bắt buộc (*)");
//             return;
//         }
//         // Xử lý theo phương thức (mock như Fahasa)
//         if (formData.paymentMethod === "zalopay" || formData.paymentMethod === "vnpay") {
//             alert("Chuyển hướng đến cổng thanh toán ZaloPay/VNPay...");
//         } else {
//             alert("Đơn hàng đã được xác nhận! Chúng tôi sẽ liên hệ qua " + formData.phone);
//         }
//     };

//     const shippingOptions = [
//         { value: "standard", label: "Giao hàng tiêu chuẩn (2-4 ngày)", price: 30000 },
//         { value: "express", label: "Giao hàng nhanh (1-2 ngày)", price: 50000 },
//         { value: "cod-post", label: "COD qua bưu điện (3-5 ngày)", price: 0 },
//     ];

//     const paymentOptions = [
//         { value: "cod", label: "Thanh toán khi nhận hàng (COD)", icon: "💰", desc: "Trả tiền mặt khi nhận hàng" },
//         { value: "zalopay", label: "ZaloPay (QR Scan)", icon: "📱", desc: "Quét mã QR để thanh toán nhanh" },
//         { value: "card", label: "Thẻ ATM/Visa/Master/Internet Banking", icon: "💳", desc: "Thanh toán qua ngân hàng" },
//         { value: "vnpay", label: "VNPay", icon: "🔗", desc: "Chuyển hướng đến VNPay" },
//     ];

//     return (
//         <>
//             {/* Breadcrumb như Fahasa */}
//             <nav className="flex items-center text-gray-600 text-sm mb-6 bg-gray-50 p-4 rounded-md">
//                 <FaHome className="mr-2 text-gray-500" />
//                 <Link href="/" className="hover:text-blue-600 transition">Trang chủ</Link>
//                 <FaChevronRight className="mx-2 text-gray-400" />
//                 <Link href="/cart" className="hover:text-blue-600 transition">Giỏ hàng</Link>
//                 <FaChevronRight className="mx-2 text-gray-400" />
//                 <span className="font-medium text-gray-800">Thanh toán</span>
//             </nav>

//             <div className="max-w-6xl mx-auto px-4 py-8">
//                 <h1 className="text-3xl font-bold text-gray-800 mb-8">Thông tin thanh toán</h1>

//                 <form onSubmit={handleSubmit} className="space-y-8">
//                     {/* Phần đăng nhập tùy chọn như Fahasa */}
//                     <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
//                         <h3 className="text-lg font-semibold mb-2 flex items-center"><FaUser className="mr-2" /> Đăng nhập để nhanh hơn</h3>
//                         <p className="text-sm text-gray-600 mb-4">Nếu bạn đã là thành viên Fahasa, đăng nhập để lưu địa chỉ và theo dõi đơn hàng.</p>
//                         <button type="button" className="text-blue-600 hover:underline text-sm">Đăng nhập ngay</button>
//                     </div>

//                     {/* Cột trái: Thông tin khách hàng & Vận chuyển */}
//                     <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//                         <div className="space-y-6">
//                             {/* Thông tin khách hàng */}
//                             <div className="bg-white p-6 rounded-lg shadow-sm border">
//                                 <h2 className="text-xl font-semibold mb-4 flex items-center"><FaUser className="mr-2 text-blue-600" /> Thông tin người nhận</h2>
//                                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                                     <div>
//                                         <label className="block text-sm font-medium text-gray-700 mb-1">Họ và tên *</label>
//                                         <input
//                                             type="text"
//                                             name="fullName"
//                                             value={formData.fullName}
//                                             onChange={handleChange}
//                                             required
//                                             className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#E61E4D]"
//                                         />
//                                     </div>
//                                     <div>
//                                         <label className="block text-sm font-medium text-gray-700 mb-1">Số điện thoại *</label>
//                                         <input
//                                             type="tel"
//                                             name="phone"
//                                             value={formData.phone}
//                                             onChange={handleChange}
//                                             required
//                                             className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                         />
//                                     </div>
//                                     <div className="md:col-span-2">
//                                         <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
//                                         <input
//                                             type="email"
//                                             name="email"
//                                             value={formData.email}
//                                             onChange={handleChange}
//                                             required
//                                             className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                         />
//                                     </div>
//                                 </div>
//                             </div>

//                             {/* Địa chỉ giao hàng */}
//                             <div className="bg-white p-6 rounded-lg shadow-sm border">
//                                 <h2 className="text-xl font-semibold mb-4 flex items-center"><FaTruck className="mr-2 text-blue-600" /> Địa chỉ giao hàng</h2>
//                                 <div className="space-y-4">
//                                     <div>
//                                         <label className="block text-sm font-medium text-gray-700 mb-1">Địa chỉ cụ thể *</label>
//                                         <input
//                                             type="text"
//                                             name="streetAddress"
//                                             value={formData.streetAddress}
//                                             onChange={handleChange}
//                                             placeholder="Số nhà, đường phố"
//                                             required
//                                             className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                         />
//                                     </div>
//                                     <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                                         <div>
//                                             <label className="block text-sm font-medium text-gray-700 mb-1">Xã/Phường *</label>
//                                             <input
//                                                 type="text"
//                                                 name="ward"
//                                                 value={formData.ward}
//                                                 onChange={handleChange}
//                                                 required
//                                                 className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                             />
//                                         </div>
//                                         <div>
//                                             <label className="block text-sm font-medium text-gray-700 mb-1">Quận/Huyện *</label>
//                                             <input
//                                                 type="text"
//                                                 name="district"
//                                                 value={formData.district}
//                                                 onChange={handleChange}
//                                                 required
//                                                 className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                             />
//                                         </div>
//                                         <div>
//                                             <label className="block text-sm font-medium text-gray-700 mb-1">Tỉnh/Thành phố *</label>
//                                             <input
//                                                 type="text"
//                                                 name="province"
//                                                 value={formData.province}
//                                                 onChange={handleChange}
//                                                 required
//                                                 className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                             />
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>

//                             {/* Phương thức vận chuyển như Fahasa */}
//                             <div className="bg-white p-6 rounded-lg shadow-sm border">
//                                 <h2 className="text-xl font-semibold mb-4 flex items-center"><FaTruck className="mr-2 text-blue-600" /> Phương thức vận chuyển</h2>
//                                 <div className="space-y-3">
//                                     {shippingOptions.map((option) => (
//                                         <label key={option.value} className="flex items-center gap-3 p-3 border rounded-md hover:bg-gray-50 cursor-pointer">
//                                             <input
//                                                 type="radio"
//                                                 name="shippingMethod"
//                                                 value={option.value}
//                                                 checked={formData.shippingMethod === option.value}
//                                                 onChange={handleShippingChange}
//                                                 className="text-blue-600 focus:ring-blue-500"
//                                             />
//                                             <div>
//                                                 <div className="font-medium text-gray-700">{option.label}</div>
//                                                 <div className="text-sm text-gray-500">
//                                                     Phí: {option.price === 0 ? "Miễn phí" : `${option.price.toLocaleString()} VNĐ`}
//                                                 </div>
//                                             </div>
//                                         </label>
//                                     ))}
//                                 </div>
//                             </div>

//                             {/* Hóa đơn VAT tùy chọn */}
//                             <div className="bg-white p-6 rounded-lg shadow-sm border">
//                                 <h3 className="text-lg font-semibold mb-4">Hóa đơn VAT (tùy chọn)</h3>
//                                 <div className="space-y-3 text-sm">
//                                     <input
//                                         type="text"
//                                         name="invoiceCompany"
//                                         value={formData.invoiceCompany}
//                                         onChange={handleChange}
//                                         placeholder="Tên công ty"
//                                         className="w-full border border-gray-300 rounded-md px-3 py-2"
//                                     />
//                                     <input
//                                         type="text"
//                                         name="invoiceTaxCode"
//                                         value={formData.invoiceTaxCode}
//                                         onChange={handleChange}
//                                         placeholder="Mã số thuế"
//                                         className="w-full border border-gray-300 rounded-md px-3 py-2"
//                                     />
//                                     <input
//                                         type="text"
//                                         name="invoiceAddress"
//                                         value={formData.invoiceAddress}
//                                         onChange={handleChange}
//                                         placeholder="Địa chỉ ghi hóa đơn"
//                                         className="w-full border border-gray-300 rounded-md px-3 py-2"
//                                     />
//                                 </div>
//                                 <p className="text-xs text-gray-500 mt-2">Hóa đơn sẽ được gửi kèm hàng nếu điền thông tin.</p>
//                             </div>
//                         </div>

//                         {/* Cột phải: Tóm tắt đơn hàng & Thanh toán - như Fahasa */}
//                         <div className="lg:sticky lg:top-8 space-y-6">
//                             <div className="bg-white p-6 rounded-lg shadow-sm border">
//                                 <h2 className="text-xl font-semibold mb-4 flex items-center"><FaCreditCard className="mr-2 text-blue-600" /> Phương thức thanh toán</h2>
//                                 <div className="space-y-3">
//                                     {paymentOptions.map((option) => (
//                                         <label key={option.value} className="flex items-center gap-3 p-3 border rounded-md hover:bg-gray-50 cursor-pointer">
//                                             <input
//                                                 type="radio"
//                                                 name="paymentMethod"
//                                                 value={option.value}
//                                                 checked={formData.paymentMethod === option.value}
//                                                 onChange={handlePaymentChange}
//                                                 className="text-blue-600 focus:ring-blue-500"
//                                             />
//                                             <div>
//                                                 <div className="font-medium text-gray-700 flex items-center">
//                                                     <span className="mr-2 text-lg">{option.icon}</span>
//                                                     {option.label}
//                                                 </div>
//                                                 <div className="text-sm text-gray-500">{option.desc}</div>
//                                             </div>
//                                         </label>
//                                     ))}
//                                 </div>
//                             </div>

//                             <div className="bg-white p-6 rounded-lg shadow-sm border">
//                                 <h2 className="text-xl font-semibold mb-4">Tóm tắt đơn hàng</h2>
//                                 <div className="space-y-3">
//                                     {/* Sản phẩm mẫu - có thể dynamic */}
//                                     <div className="flex items-center justify-between py-2 border-b">
//                                         <div className="flex items-center gap-3">
//                                             <img
//                                                 src="https://product.hstatic.net/200000722513/product/ava_ded8eaa81f5f4850a4f6fea27adc83b2_master.png"
//                                                 alt="Sản phẩm"
//                                                 width={50}
//                                                 height={50}
//                                                 className="rounded-md"
//                                             />
//                                             <div>
//                                                 <p className="text-gray-700">H1 Gamepad x2</p>
//                                                 <p className="text-sm text-gray-500">25.000.000 VNĐ</p>
//                                             </div>
//                                         </div>
//                                         <p className="font-medium">50.000.000 VNĐ</p>
//                                     </div>
//                                     <div className="flex items-center justify-between py-2 border-b">
//                                         <div className="flex items-center gap-3">
//                                             <img
//                                                 src="https://product.hstatic.net/200000722513/product/ava_ded8eaa81f5f4850a4f6fea27adc83b2_master.png"
//                                                 alt="Sản phẩm"
//                                                 width={50}
//                                                 height={50}
//                                                 className="rounded-md"
//                                             />
//                                             <div>
//                                                 <p className="text-gray-700">Laptop Lenovo IdeaPad</p>
//                                                 <p className="text-sm text-gray-500">25.000.000 VNĐ</p>
//                                             </div>
//                                         </div>
//                                         <p className="font-medium">25.000.000 VNĐ</p>
//                                     </div>
//                                 </div>

//                                 <hr className="my-4 border-gray-200" />

//                                 <div className="space-y-2 text-sm">
//                                     <div className="flex justify-between">
//                                         <span>Tạm tính:</span>
//                                         <span>75.000.000 VNĐ</span>
//                                     </div>
//                                     <div className="flex justify-between text-green-600 font-medium">
//                                         <span>Phí vận chuyển ({formData.shippingMethod}):</span>
//                                         <span>
//                                             {shippingOptions.find(s => s.value === formData.shippingMethod)?.price === 0
//                                                 ? "Miễn phí"
//                                                 : `${shippingOptions.find(s => s.value === formData.shippingMethod)?.price?.toLocaleString()} VNĐ`
//                                             }
//                                         </span>
//                                     </div>
//                                 </div>

//                                 <hr className="my-4 border-gray-200" />

//                                 <div className="flex justify-between text-lg font-bold text-gray-800">
//                                     <span>Tổng cộng:</span>
//                                     <span className="text-blue-600">75.000.000 VNĐ</span>
//                                 </div>

//                                 <button
//                                     type="submit"
//                                     className="w-full mt-6 bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition"
//                                 >
//                                     Xác nhận đơn hàng
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                 </form>
//             </div>
//         </>
//     );
// }