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

"use client";
import SidebarAccount from "@/components/SidebarAccount";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaHome, FaChevronRight } from "react-icons/fa";

export default function ManageOrderPage() {
    interface Order {
        id: string;
        name: string;
        date: string;
        total: number;
        status: string;
    }

    const [orders, setOrders] = useState<Order[]>([]);

    // Mock data for orders (replace with actual API call)
    useEffect(() => {
        const mockOrders = [
            {
                id: "ORD001",
                name: "Sản phẩm A",
                date: "2025-10-20",
                total: 1500000,
                status: "Đã giao",
            },
            {
                id: "ORD002",
                name: "Sản phẩm B",
                date: "2025-10-18",
                total: 800000,
                status: "Đang xử lý",
            },
            {
                id: "ORD003",
                name: "Sản phẩm C",
                date: "2025-10-15",
                total: 2500000,
                status: "Đã hủy",
            },
        ];
        setOrders(mockOrders);
    }, []);

    console.log(orders);

    return (
        <>
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
                <main className="col-span-3 relative border border-gray-300 rounded-xl p-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">
                        Đơn hàng của bạn
                    </h2>
                    {orders.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-gray-100">
                                        <th className="p-4 font-semibold text-gray-700">Mã đơn hàng</th>
                                        <th className="p-4 font-semibold text-gray-700">Sản phẩm</th>
                                        <th className="p-4 font-semibold text-gray-700">Ngày đặt</th>
                                        <th className="p-4 font-semibold text-gray-700">Tổng tiền</th>
                                        <th className="p-4 font-semibold text-gray-700">Trạng thái</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.map((order) => (
                                        
                                        <tr key={order.id} className="border-b hover:bg-gray-50">
                                            <td className="p-4 text-gray-800">{order.id}</td>
                                            <td className="p-4 text-gray-600">{order.name}</td>
                                            <td className="p-4 text-gray-600">{order.date}</td>
                                            <td className="p-4 text-gray-600">
                                                {new Intl.NumberFormat("vi-VN", {
                                                    style: "currency",
                                                    currency: "VND",
                                                }).format(order.total)}
                                            </td>
                                            <td className="p-4">
                                                <span
                                                    className={`px-3 py-1 rounded-full text-sm font-medium ${order.status === "Đã giao"
                                                            ? "bg-green-100 text-green-700"
                                                            : order.status === "Đang xử lý"
                                                                ? "bg-yellow-100 text-yellow-700"
                                                                : "bg-red-100 text-red-700"
                                                        }`}
                                                >
                                                    {order.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <p className="text-gray-600">Bạn chưa có đơn hàng nào.</p>
                    )}
                </main>
            </div>
        </>
    );
}