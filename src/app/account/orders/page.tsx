// "use client";
// import SidebarAccount from "@/components/SidebarAccount";
// import { useUser } from "@/hooks/useUser";
// import Link from "next/link";
// import { useEffect, useState } from "react";
// import { FaHome, FaChevronRight } from "react-icons/fa";

// export default function ManageOrderPage() {


//     return (
//         <>
//             <div className="flex items-center text-gray-600 text-base mb-6">
//                 <FaHome className="mr-2 text-gray-500" />
//                 <Link href="/" className="hover:text-[#E61E4D] transition">
//                     Trang chủ
//                 </Link>
//                 <FaChevronRight className="mx-2 text-gray-400" />
//                 <span className="font-medium text-gray-800">Đặt lại mật khẩu</span>
//             </div>
//             <div className="grid grid-cols-4 gap-6 mb-10">
//                 <SidebarAccount />
//                 <main className="col-span-3 relative border border-gray-300 rounded-xl p-8">
//                     <h2 className="text-2xl font-bold text-gray-800 mb-6">
//                         Đơn hàng của bạn
//                     </h2>

//                 </main>
//             </div>
//         </>
//     );
// }

// "use client";
// import SidebarAccount from "@/components/SidebarAccount";
// import Link from "next/link";
// import { useEffect, useState } from "react";
// import { FaHome, FaChevronRight } from "react-icons/fa";

// export default function ManageOrderPage() {
//     interface Order {
//         id: string;
//         name: string;
//         date: string;
//         total: number;
//         status: string;
//     }

//     const [orders, setOrders] = useState<Order[]>([]);

//     // Mock data for orders (replace with actual API call)
//     useEffect(() => {
//         const mockOrders = [
//             {
//                 id: "ORD001",
//                 name: "Sản phẩm A",
//                 date: "2025-10-20",
//                 total: 1500000,
//                 status: "Đã giao",
//             },
//             {
//                 id: "ORD002",
//                 name: "Sản phẩm B",
//                 date: "2025-10-18",
//                 total: 800000,
//                 status: "Đang xử lý",
//             },
//             {
//                 id: "ORD003",
//                 name: "Sản phẩm C",
//                 date: "2025-10-15",
//                 total: 2500000,
//                 status: "Đã hủy",
//             },
//         ];
//         setOrders(mockOrders);
//     }, []);

//     console.log(orders);

//     return (
//         <>
//             <div className="flex items-center text-gray-600 text-base mb-6">
//                 <FaHome className="mr-2 text-gray-500" />
//                 <Link href="/" className="hover:text-[#E61E4D] transition">
//                     Trang chủ
//                 </Link>
//                 <FaChevronRight className="mx-2 text-gray-400" />
//                 <span className="font-medium text-gray-800">Quản lý đơn hàng</span>
//             </div>
//             <div className="grid grid-cols-4 gap-6 mb-10">
//                 <SidebarAccount />
//                 <main className="col-span-3 relative border border-gray-300 rounded-xl p-8">
//                     <h2 className="text-2xl font-bold text-gray-800 mb-6">
//                         Đơn hàng của bạn
//                     </h2>
//                     {orders.length > 0 ? (
//                         <div className="overflow-x-auto">
//                             <table className="w-full text-left border-collapse">
//                                 <thead>
//                                     <tr className="bg-gray-100">
//                                         <th className="p-4 font-semibold text-gray-700">Mã đơn hàng</th>
//                                         <th className="p-4 font-semibold text-gray-700">Sản phẩm</th>
//                                         <th className="p-4 font-semibold text-gray-700">Ngày đặt</th>
//                                         <th className="p-4 font-semibold text-gray-700">Tổng tiền</th>
//                                         <th className="p-4 font-semibold text-gray-700">Trạng thái</th>
//                                     </tr>
//                                 </thead>
//                                 <tbody>
//                                     {orders.map((order) => (

//                                         <tr key={order.id} className="border-b hover:bg-gray-50">
//                                             <td className="p-4 text-gray-800">{order.id}</td>
//                                             <td className="p-4 text-gray-600">{order.name}</td>
//                                             <td className="p-4 text-gray-600">{order.date}</td>
//                                             <td className="p-4 text-gray-600">
//                                                 {new Intl.NumberFormat("vi-VN", {
//                                                     style: "currency",
//                                                     currency: "VND",
//                                                 }).format(order.total)}
//                                             </td>
//                                             <td className="p-4">
//                                                 <span
//                                                     className={`px-3 py-1 rounded-full text-sm font-medium ${order.status === "Đã giao"
//                                                             ? "bg-green-100 text-green-700"
//                                                             : order.status === "Đang xử lý"
//                                                                 ? "bg-yellow-100 text-yellow-700"
//                                                                 : "bg-red-100 text-red-700"
//                                                         }`}
//                                                 >
//                                                     {order.status}
//                                                 </span>
//                                             </td>
//                                         </tr>
//                                     ))}
//                                 </tbody>
//                             </table>
//                         </div>
//                     ) : (
//                         <p className="text-gray-600">Bạn chưa có đơn hàng nào.</p>
//                     )}
//                 </main>
//             </div>
//         </>
//     );
// }


// "use client";
// import SidebarAccount from "@/components/SidebarAccount";
// import Link from "next/link";
// import { useEffect, useState } from "react";
// import { FaHome, FaChevronRight, FaTimes, FaTruck, FaCalendarAlt } from "react-icons/fa";
// import Image from "next/image";

// interface Order {
//   id: string;
//   name: string;
//   image: string;
//   date: string;
//   deliveryDate: string;
//   total: number;
//   status: "Đã giao" | "Đang xử lý" | "Đã hủy" | "Đang giao";
//   items: {
//     name: string;
//     quantity: number;
//     price: number;
//     image: string;
//   }[];
//   shippingAddress: string;
//   paymentMethod: string;
// }

// export default function ManageOrderPage() {
//   const [orders, setOrders] = useState<Order[]>([]);
//   const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   // Mock data
//   useEffect(() => {
//     const mockOrders: Order[] = [
//       {
//         id: "ORD001",
//         name: "H1 Gamepad",
//         image: "https://product.hstatic.net/200000722513/product/ava_ded8eaa81f5f4850a4f6fea27adc83b2_master.png",
//         date: "2025-10-20",
//         deliveryDate: "2025-10-25",
//         total: 1500000,
//         status: "Đã giao",
//         items: [
//           { name: "Áo thun nam cao cấp", quantity: 2, price: 750000, image: "/images/product-a.jpg" },
//         ],
//         shippingAddress: "123 Đường Láng, Đống Đa, Hà Nội",
//         paymentMethod: "Thanh toán khi nhận hàng (COD)",
//       },
//       {
//         id: "ORD002",
//         name: "H1 Gamepad",
//         image: "https://product.hstatic.net/200000722513/product/ava_ded8eaa81f5f4850a4f6fea27adc83b2_master.png",
//         date: "2025-10-18",
//         deliveryDate: "",
//         total: 800000,
//         status: "Đang giao",
//         items: [
//           { name: "Giày thể thao XYZ adsaf ea frg fdg fdgf f g", quantity: 1, price: 800000, image: "/images/product-b.jpg" },
//         ],
//         shippingAddress: "456 Nguyễn Trãi, Thanh Xuân, Hà Nội",
//         paymentMethod: "Chuyển khoản ngân hàng",
//       },
//       {
//         id: "ORD003",
//         name: "Tai nghe Bluetooth Pro",
//         image: "https://product.hstatic.net/200000722513/product/ava_ded8eaa81f5f4850a4f6fea27adc83b2_master.png",
//         date: "2025-10-15",
//         deliveryDate: "",
//         total: 2500000,
//         status: "Đã hủy",
//         items: [
//           { name: "Tai nghe Bluetooth Pro", quantity: 1, price: 2500000, image: "/images/product-c.jpg" },
//         ],
//         shippingAddress: "789 Cầu Giấy, Hà Nội",
//         paymentMethod: "Ví điện tử Momo",
//       },
//     ];
//     setOrders(mockOrders);
//   }, []);

//   const openOrderDetail = (order: Order) => {
//     setSelectedOrder(order);
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//     setSelectedOrder(null);
//   };

//   const getStatusColor = (status: string) => {
//     switch (status) {
//       case "Đã giao":
//         return "bg-green-100 text-green-700";
//       case "Đang giao":
//         return "bg-yellow-100 text-yellow-700";
//       case "Đang xử lý":
//         return "bg-blue-100 text-blue-700";
//       case "Đã hủy":
//         return "bg-red-100 text-red-700";
//       default:
//         return "bg-gray-100 text-gray-700";
//     }
//   };

//   return (
//     <>
//       {/* Breadcrumb */}
//       <div className="flex items-center text-gray-600 text-base mb-6">
//         <FaHome className="mr-2 text-gray-500" />
//         <Link href="/" className="hover:text-[#E61E4D] transition">
//           Trang chủ
//         </Link>
//         <FaChevronRight className="mx-2 text-gray-400" />
//         <span className="font-medium text-gray-800">Quản lý đơn hàng</span>
//       </div>

//       <div className="grid grid-cols-4 gap-6 mb-10">
//         <SidebarAccount />
//         <main className="col-span-3 relative border border-gray-300 rounded-xl p-8">
//           <h2 className="text-2xl font-bold text-gray-800 mb-6">Đơn hàng của bạn</h2>

//           {orders.length > 0 ? (
//             <div className="overflow-x-auto">
//               <table className="w-full text-left border-collapse">
//                 <thead>
//                   <tr className="bg-gray-100">
//                     <th className="p-4 font-semibold text-gray-700">Mã đơn</th>
//                     <th className="p-4 font-semibold text-gray-700">Sản phẩm</th>
//                     <th className="p-4 font-semibold text-gray-700">Ngày đặt</th>
//                     <th className="p-4 font-semibold text-gray-700">Ngày giao</th>
//                     <th className="p-4 font-semibold text-gray-700">Tổng tiền</th>
//                     <th className="p-4 font-semibold text-gray-700">Trạng thái</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {orders.map((order) => (
//                     <tr
//                       key={order.id}
//                       className="border-b hover:bg-gray-50 cursor-pointer transition"
//                       onClick={() => openOrderDetail(order)}
//                     >
//                       <td className="p-4 text-gray-800 font-medium">{order.id}</td>
//                       <td className="p-4">
//                         <div className="flex items-center gap-3">
//                           <div className="relative w-12 h-12 rounded-lg overflow-hidden">
//                             <img src={order.image}
//                               alt={order.name}
//                               className="object-cover"
//                             />
//                           </div>
//                           <span className="text-gray-600">{order.name}</span>
//                         </div>
//                       </td>
//                       <td className="p-4 text-gray-600">{order.date}</td>
//                       <td className="p-4 text-gray-600">
//                         <div className="flex items-center gap-1">
//                           <span>{order.deliveryDate}</span>
//                         </div>
//                       </td>
//                       <td className="p-4 text-gray-600 font-medium">
//                         {new Intl.NumberFormat("vi-VN", {
//                           style: "currency",
//                           currency: "VND",
//                         }).format(order.total)}
//                       </td>
//                       <td className="p-4">
//                         <span
//                           className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
//                             order.status
//                           )}`}
//                         >
//                           {order.status}
//                         </span>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           ) : (
//             <p className="text-gray-600 text-center py-8">Bạn chưa có đơn hàng nào.</p>
//           )}
//         </main>
//       </div>

//       {/* Modal Chi tiết đơn hàng */}
//       {isModalOpen && selectedOrder && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
//           <div className="bg-white rounded-xl shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
//             <div className="sticky top-0 bg-white border-b p-6 flex justify-between items-center">
//               <h3 className="text-xl font-bold text-gray-800">
//                 Chi tiết đơn hàng #{selectedOrder.id}
//               </h3>
//               <button
//                 onClick={closeModal}
//                 className="text-gray-500 hover:text-gray-700 transition"
//               >
//                 <FaTimes className="text-xl" />
//               </button>
//             </div>

//             <div className="p-6 space-y-6">
//               {/* Thông tin chung */}
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div>
//                   <h4 className="font-semibold text-gray-700 mb-2">Thông tin giao hàng</h4>
//                   <p className="text-gray-600">{selectedOrder.shippingAddress}</p>
//                   <p className="text-gray-600 flex items-center gap-2 mt-2">
//                     <FaCalendarAlt className="text-sm" />
//                     Dự kiến: <strong>{selectedOrder.deliveryDate}</strong>
//                   </p>
//                 </div>
//                 <div>
//                   <h4 className="font-semibold text-gray-700 mb-2">Thanh toán</h4>
//                   <p className="text-gray-600">{selectedOrder.paymentMethod}</p>
//                   <p className="text-lg font-bold text-[#E61E4D] mt-2">
//                     {new Intl.NumberFormat("vi-VN", {
//                       style: "currency",
//                       currency: "VND",
//                     }).format(selectedOrder.total)}
//                   </p>
//                 </div>
//               </div>

//               {/* Danh sách sản phẩm */}
//               <div>
//                 <h4 className="font-semibold text-gray-700 mb-4">Sản phẩm</h4>
//                 <div className="space-y-3">
//                   {selectedOrder.items.map((item, idx) => (
//                     <div
//                       key={idx}
//                       className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg"
//                     >
//                       <div className="relative w-16 h-16 rounded-lg overflow-hidden border">
//                         <Image
//                           src={item.image}
//                           alt={item.name}
//                           fill
//                           className="object-cover"
//                         />
//                       </div>
//                       <div className="flex-1">
//                         <p className="font-medium text-gray-800">{item.name}</p>
//                         <p className="text-sm text-gray-600">
//                           {item.quantity} x{" "}
//                           {new Intl.NumberFormat("vi-VN", {
//                             style: "currency",
//                             currency: "VND",
//                           }).format(item.price)}
//                         </p>
//                       </div>
//                       <p className="font-semibold text-gray-800">
//                         {new Intl.NumberFormat("vi-VN", {
//                           style: "currency",
//                           currency: "VND",
//                         }).format(item.price * item.quantity)}
//                       </p>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               {/* Trạng thái */}
//               <div className="flex justify-between items-center pt-4 border-t">
//                 <span className="font-medium text-gray-700">Trạng thái đơn hàng:</span>
//                 <span
//                   className={`px-4 py-2 rounded-full text-sm font-bold ${getStatusColor(
//                     selectedOrder.status
//                   )}`}
//                 >
//                   {selectedOrder.status}
//                 </span>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }



// "use client";
// import SidebarAccount from "@/components/SidebarAccount";
// import Link from "next/link";
// import { useState } from "react";
// import { FaHome, FaChevronRight, FaTimes, FaCalendarAlt } from "react-icons/fa";
// import Image from "next/image";
// import { useOrders } from "@/hooks/useOrder"; // đổi path theo thực tế

// export default function ManageOrderPage() {
//   const { orders, isLoading, isError } = useOrders(0, 10);
//   const [selectedOrder, setSelectedOrder] = useState<any>(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const mappedOrders = orders.map((o: any) => ({
//     id: o.orderCode,
//     name: o.orderItems[0]?.productName || "Sản phẩm",
//     image: o.orderItems[0]?.image || "/no-image.png",
//     date: new Date(o.createdAt).toLocaleDateString("vi-VN"),
//     deliveryDate: "", // nếu backend có trường
//     total: o.finalAmount,
//     status: o.status,
//     items: o.orderItems.map((i: any) => ({
//       name: i.productName,
//       quantity: i.quantity,
//       price: i.unitPrice,
//       image: "/no-image.png",
//     })),
//     shippingAddress: `${o.shippingAddress}, ${o.shippingWard}, ${o.shippingDistrict}, ${o.shippingCity}`,
//     paymentMethod: o.paymentMethod,
//   }));

//   const openOrderDetail = (order: any) => {
//     setSelectedOrder(order);
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//     setSelectedOrder(null);
//   };

//   const getStatusColor = (status: string) => {
//     switch (status) {
//       case "PENDING":
//         return "bg-amber-100 text-amber-700";
//       case "CONFIRMED":
//         return "bg-blue-100 text-blue-700";
//       case "PROCESSING":
//         return "bg-indigo-100 text-indigo-700";
//       case "SHIPPING":
//         return "bg-yellow-100 text-yellow-800";
//       case "DELIVERED":
//         return "bg-green-100 text-green-700";
//       case "CANCELLED":
//         return "bg-red-100 text-red-700";
//       case "RETURNED":
//         return "bg-orange-100 text-orange-700";
//       default:
//         return "bg-gray-100 text-gray-700";
//     }
//   };

//   const getStatusText = (status: string) => {
//     switch (status) {
//       case "PENDING":
//         return "Đang xác nhận";
//       case "CONFIRMED":
//         return "Đã xác nhận";
//       case "PROCESSING":
//         return "Đang xử lý";
//       case "SHIPPING":
//         return "Đang giao hàng";
//       case "DELIVERED":
//         return "Đã giao hàng";
//       case "CANCELLED":
//         return "Đã hủy";
//       case "RETURNED":
//         return "Đã trả hàng";
//       default:
//         return "bg-gray-100 text-gray-700";
//     }
//   };

//   if (isLoading) return <p className="text-center text-gray-500">Đang tải đơn hàng...</p>;
//   if (isError) return <p className="text-center text-red-500">Không thể tải danh sách đơn hàng.</p>;

//   return (
//     <>
//       {/* Breadcrumb */}
//       <div className="flex items-center text-gray-600 text-base mb-6">
//         <FaHome className="mr-2 text-gray-500" />
//         <Link href="/" className="hover:text-[#E61E4D] transition">
//           Trang chủ
//         </Link>
//         <FaChevronRight className="mx-2 text-gray-400" />
//         <span className="font-medium text-gray-800">Quản lý đơn hàng</span>
//       </div>

//       <div className="grid grid-cols-4 gap-6 mb-10">
//         <SidebarAccount />
//         <main className="col-span-3 relative border border-gray-300 rounded-xl p-8">
//           <h2 className="text-2xl font-bold text-gray-800 mb-6">Đơn hàng của bạn</h2>

//           {mappedOrders.length > 0 ? (
//             <div className="overflow-x-auto">
//               <table className="w-full text-left border-collapse">
//                 <thead>
//                   <tr className="bg-gray-100">
//                     <th className="p-4 font-semibold text-gray-700">Mã đơn</th>
//                     <th className="p-4 font-semibold text-gray-700">Sản phẩm</th>
//                     <th className="p-4 font-semibold text-gray-700">Ngày đặt</th>
//                     <th className="p-4 font-semibold text-gray-700">Tổng tiền</th>
//                     <th className="p-4 font-semibold text-gray-700">Trạng thái</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {mappedOrders.map((order: any) => (
//                     <tr
//                       key={order.id}
//                       className="border-b hover:bg-gray-50 cursor-pointer transition"
//                       onClick={() => openOrderDetail(order)}
//                     >
//                       <td className="p-4 text-gray-800 font-medium">{order.id}</td>
//                       <td className="p-4 flex items-center gap-3">
//                         <img src={order.image} alt={order.name} className="w-12 h-12 rounded-lg object-cover" />
//                         <span>{order.name}</span>
//                       </td>
//                       <td className="p-4 text-gray-600">{order.date}</td>
//                       <td className="p-4 text-gray-600 font-medium">
//                         {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(order.total)}
//                       </td>
//                       <td className="p-4">
//                         <span
//                           className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}
//                         >
//                           {getStatusText(order.status)}
//                         </span>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           ) : (
//             <p className="text-gray-600 text-center py-8">Bạn chưa có đơn hàng nào.</p>
//           )}
//         </main>
//       </div>
//     </>
//   );
// }


"use client";

import SidebarAccount from "@/components/SidebarAccount";
import Link from "next/link";
import { useState } from "react";
import { FaHome, FaChevronRight, FaCalendarAlt, FaTruck, FaTimes } from "react-icons/fa";
import Image from "next/image";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { useOrders } from "@/hooks/useOrder";

export default function ManageOrderPage() {
  const { orders, isLoading, isError } = useOrders(0, 10);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
                    <th className="p-3 font-semibold text-gray-700 border-b border-gray-200">Trạng thái</th>
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
                    <button onClick={closeModal} className="text-gray-500 hover:text-red-500 cursor-pointer transition">
                      <FaTimes size={20} />
                    </button>
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
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
