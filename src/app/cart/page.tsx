// "use client";

// import { useCart } from "@/contexts/CartContext";
// import CartItem from "@/components/CartItem";
// import Link from "next/link";
// import { CartItems } from "@/features/CartItem";

// export default function CartPage() {
//   const { cartItems, totalPrice } = useCart();

//   if (cartItems.length === 0) {
//     return (
//       <div className="text-center py-20">
//         <h2 className="text-2xl font-semibold mb-4">Giỏ hàng của bạn trống</h2>
//         <Link
//           href="/"
//           className="text-[#E61E4D] font-semibold hover:underline"
//         >
//           Tiếp tục mua sắm
//         </Link>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-7xl mx-auto grid grid-cols-3 gap-8 py-10 px-6">
//       {/* Danh sách sản phẩm */}
//       <div className="col-span-2 bg-white p-6 rounded-lg shadow">
//         <h2 className="text-xl font-bold mb-4">Giỏ hàng</h2>
//         {cartItems.map((item:CartItems) => (
//           <CartItem key={item.id} item={item} />
//         ))}
//       </div>

//       {/* Tổng tiền */}
//       <div className="bg-white p-6 rounded-lg shadow h-fit">
//         <h3 className="text-lg font-semibold mb-4">Tóm tắt đơn hàng</h3>
//         <div className="flex justify-between mb-2">
//           <span>Tạm tính:</span>
//           <span>{totalPrice.toLocaleString()} ₫</span>
//         </div>
//         <div className="flex justify-between font-semibold text-lg border-t pt-2">
//           <span>Tổng cộng:</span>
//           <span className="text-[#E61E4D]">
//             {totalPrice.toLocaleString()} ₫
//           </span>
//         </div>
//         <button className="mt-6 w-full bg-[#E61E4D] text-white py-2 rounded-lg hover:bg-[#d41b46] transition-colors">
//           Thanh toán
//         </button>
//       </div>
//     </div>
//   );
// }
// "use client";

// import { useCart } from "@/contexts/CartContext";
// import Link from "next/link";
// import { CartItems } from "@/features/CartItem";
// import Image from "next/image";

// export default function CartPage() {
//   const { cartItems, totalPrice } = useCart();

//   if (cartItems.length === 0) {
//     return (
//       <div className="text-center py-20">
//         <h2 className="text-2xl font-semibold mb-4">Giỏ hàng của bạn trống</h2>
//         <Link
//           href="/"
//           className="text-[#E61E4D] font-semibold hover:underline"
//         >
//           Tiếp tục mua sắm
//         </Link>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-7xl mx-auto grid grid-cols-3 gap-8 py-10 px-6">
//       {/* Bảng sản phẩm */}
//       <div className="col-span-2 bg-white rounded-lg shadow overflow-hidden">
//         <div className="bg-[#E61E4D] text-white grid grid-cols-4 font-semibold py-3 px-6">
//           <span>Sản phẩm</span>
//           <span className="text-center">Giá</span>
//           <span className="text-center">Số lượng</span>
//           <span className="text-right">Tổng</span>
//         </div>

//         <div>
//           {cartItems.map((item: CartItems) => (
//             <div
//               key={item.id}
//               className="grid grid-cols-4 items-center py-4 px-6 border-b hover:bg-gray-50 transition"
//             >
//               {/* Cột sản phẩm */}
//               <div className="flex items-center space-x-3">
//                 <button className="text-gray-400 hover:text-[#E61E4D] text-lg">
//                   ×
//                 </button>
//                 <div className="w-14 h-14 bg-gray-100 flex items-center justify-center overflow-hidden rounded">
//                   {item.image ? (
//                     <img
//                       src={item.image}
//                       alt={item.name}
//                       width={56}
//                       height={56}
//                       className="object-cover"
//                     />
//                   ) : (
//                     <span className="text-gray-400 text-sm">No Image</span>
//                   )}
//                 </div>
//                 <span className="text-gray-800 font-medium">{item.name}</span>
//               </div>

//               {/* Giá */}
//               <div className="text-center text-gray-700">
//                 {item.price.toLocaleString()} ₫
//               </div>

//               {/* Số lượng */}
//               <div className="flex items-center justify-center space-x-2">
//                 <button className="border rounded-full w-7 h-7 flex items-center justify-center hover:bg-gray-200">
//                   −
//                 </button>
//                 <span className="w-6 text-center">{item.quantity}</span>
//                 <button className="border rounded-full w-7 h-7 flex items-center justify-center hover:bg-gray-200">
//                   +
//                 </button>
//               </div>

//               {/* Tổng */}
//               <div className="text-right text-gray-800 font-semibold">
//                 {(item.price * item.quantity).toLocaleString()} ₫
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Tổng đơn hàng */}
//       <div className="bg-white rounded-lg shadow overflow-hidden h-fit">
//         <div className="bg-[#E61E4D] text-white font-semibold py-3 px-6">
//           Tóm tắt đơn hàng
//         </div>
//         <div className="p-6 space-y-3">
//           <div className="flex justify-between">
//             <span>Tạm tính:</span>
//             <span>{totalPrice.toLocaleString()} ₫</span>
//           </div>
//           <div className="flex justify-between border-b pb-3">
//             <span>Giảm giá:</span>
//             <span>---</span>
//           </div>
//           <div className="flex justify-between font-semibold text-lg">
//             <span>Tổng cộng:</span>
//             <span className="text-[#E61E4D]">
//               {totalPrice.toLocaleString()} ₫
//             </span>
//           </div>

//           <button className="mt-6 w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition">
//             Tiến hành thanh toán
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import { useCart } from "@/contexts/CartContext";
import CartItem from "@/components/CartItem";
import Link from "next/link";
import { CartItems } from "@/features/CartItem";
import { FaChevronRight, FaHome } from "react-icons/fa";
import { useRouter } from "next/navigation";

export default function CartPage() {
    const { cartItems, totalPrice } = useCart();
    const router = useRouter();
    if (cartItems.length === 0) {
        return (
            <div className="text-center py-20">
                <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
                <Link
                    href="/"
                    className="text-red-500 font-semibold hover:underline"
                >
                    Continue shopping
                </Link>
            </div>
        );
    }

    return (
        <>
            <div className="flex items-center text-gray-600 text-base mb-6">
                <FaHome className="mr-2 text-gray-500" />
                <Link href="/" className="hover:text-[#E61E4D] transition">
                    Trang chủ
                </Link>
                <FaChevronRight className="mx-2 text-gray-400" />
                <span className="font-medium text-gray-800">Giỏ hàng</span>
            </div>
            <div className="max-w-7xl mx-auto grid grid-cols-3 gap-8 m-10">
                {/* Bảng sản phẩm */}
                <div className="col-span-2 bg-white rounded-lg shadow overflow-hidden">
                    <div className="bg-[#E61E4D] text-white grid grid-cols-4 font-semibold py-3 px-6">
                        <span>Sản phẩm</span>
                        <span className="text-center">Giá</span>
                        <span className="text-center">Số lượng</span>
                        <span className="text-right">Tổng</span>
                    </div>

                    <div>
                        {cartItems.map((item: CartItems) => (
                            <CartItem key={item.id} item={item} />
                        ))}
                    </div>
                </div>

                {/* Cart Total */}
                <div className="bg-white rounded-lg shadow overflow-hidden h-fit">
                    <div className="bg-[#E61E4D] text-white font-semibold py-3 px-6">
                        Tổng đơn hàng
                    </div>
                    <div className="p-6 space-y-3">
                        <div className="flex justify-between">
                            <span>Tạm tính:</span>
                            <span>{totalPrice.toLocaleString()} ₫</span>
                        </div>
                        <div className="flex justify-between border-b pb-3">
                            <span>Giảm giá:</span>
                            <span>---</span>
                        </div>
                        <div className="flex justify-between font-semibold text-lg">
                            <span>Tổng cộng:</span>
                            <span className="text-[#E61E4D]">
                                {totalPrice.toLocaleString()} ₫
                            </span>
                        </div>
                        <button
                            className="mt-6 w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition cursor-pointer"
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