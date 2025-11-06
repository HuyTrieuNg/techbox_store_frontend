"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";
import { FaCheckCircle, FaTimesCircle, FaExclamationTriangle, FaArrowLeft } from "react-icons/fa";
import Link from "next/link";
import { CartService } from "@/services/cartService";

const responseMessages: Record<string, { title: string; message: string; type: "success" | "warning" | "error" }> = {
    "00": { title: "Thanh toán thành công!", message: "Giao dịch của bạn đã được xử lý thành công qua VNPay.", type: "success" },
    "07": { title: "Giao dịch nghi ngờ", message: "Trừ tiền thành công nhưng giao dịch bị nghi ngờ. Vui lòng liên hệ hỗ trợ.", type: "warning" },
    "09": { title: "Thẻ chưa đăng ký InternetBanking", message: "Tài khoản hoặc thẻ của bạn chưa đăng ký InternetBanking.", type: "error" },
    "10": { title: "Xác thực sai quá 3 lần", message: "Bạn đã xác thực sai thông tin thẻ/tài khoản quá 3 lần.", type: "error" },
    "11": { title: "Hết hạn chờ thanh toán", message: "Thời gian thanh toán đã hết. Vui lòng thử lại.", type: "error" },
    "12": { title: "Tài khoản bị khóa", message: "Thẻ hoặc tài khoản của bạn đang bị khóa.", type: "error" },
    "13": { title: "Sai OTP", message: "Bạn đã nhập sai mã OTP. Vui lòng thử lại giao dịch.", type: "error" },
    "24": { title: "Giao dịch bị hủy", message: "Bạn đã hủy giao dịch thanh toán.", type: "error" },
    "51": { title: "Không đủ số dư", message: "Tài khoản của bạn không đủ số dư để thực hiện giao dịch.", type: "error" },
    "65": { title: "Vượt hạn mức giao dịch", message: "Bạn đã vượt hạn mức giao dịch trong ngày.", type: "error" },
    "75": { title: "Ngân hàng đang bảo trì", message: "Ngân hàng thanh toán đang bảo trì. Vui lòng thử lại sau.", type: "warning" },
    "79": { title: "Sai mật khẩu quá số lần quy định", message: "Bạn đã nhập sai mật khẩu thanh toán quá nhiều lần.", type: "error" },
    "99": { title: "Lỗi không xác định", message: "Có lỗi xảy ra trong quá trình xử lý giao dịch.", type: "error" },
};

export default function PaymentResultPage() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const responseCode = searchParams.get("vnp_ResponseCode");

    const result = useMemo(() => {
        if (!responseCode) return { title: "Không có dữ liệu", message: "Không tìm thấy thông tin thanh toán.", type: "error" as const };
        return responseMessages[responseCode] || responseMessages["99"];
    }, [responseCode]);

    useEffect(() => {
        if (responseCode === "00") {
            CartService.clearCart().catch((err) => {
                console.warn("Không thể xóa giỏ hàng:", err);
            });
        }
        // Cuộn lên đầu trang mỗi khi load kết quả
        window.scrollTo(0, 0);
    }, []);

    const renderIcon = () => {
        switch (result.type) {
            case "success": return <FaCheckCircle className="text-green-500 text-6xl mb-4" />;
            case "warning": return <FaExclamationTriangle className="text-yellow-500 text-6xl mb-4" />;
            default: return <FaTimesCircle className="text-red-500 text-6xl mb-4" />;
        }
    };
    return (
        <>
            <div className="bg-gray-50 flex flex-col items-center justify-center px-4">
                <div className="bg-white shadow-lg rounded-2xl p-8 max-w-xl w-full text-center border">
                    {renderIcon()}
                    <h1 className={`text-2xl font-bold mb-3 ${result.type === "success" ? "text-green-600" : result.type === "warning" ? "text-yellow-600" : "text-red-600"}`}>
                        {result.title}
                    </h1>
                    <p className="text-gray-700 mb-6">{result.message}</p>

                    <div className="mt-8 flex justify-center gap-4">
                        {/* <Link
                            href="/account/orders"
                            className="bg-[#E61E4D] text-white px-5 py-2 rounded-lg font-semibold hover:bg-[#d41b46] transition"
                        >
                            Xem đơn hàng
                        </Link> */}
                        {responseCode === "00" && (
                            <Link
                                href="/account/orders"
                                className="bg-[#E61E4D] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#d41b46] transition shadow-md text-center"
                            >
                                Xem đơn hàng
                            </Link>
                        )}
                        <button
                            onClick={() => router.push("/")}
                            className="flex items-center gap-2 px-5 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition cursor-pointer"
                        >
                            <FaArrowLeft /> Quay về trang chủ
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
