"use client";

import { FaCheck, FaGift } from "react-icons/fa";
import { useCart } from "@/hooks/useCart";
import { CartService } from "@/services/cartService";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/contexts/AuthContext";

export default function ProductInfo({ product, selected, selectedVariation, setSelectedVariation }: any) {
    const { refreshCart } = useCart();
    const { user } = useAuthContext();
    const router = useRouter();

    const requireLoginAddToCart = () => {
        toast.error("Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng!");
        return false;
    };

    const requireLoginBuyNow = () => {
        toast.error("Vui lòng đăng nhập để mua ngay sản phẩm!");
        return false;
    };

    const handleAddToCart = async () => {
        if (!selected) {
            toast.error("Vui lòng chọn phiên bản sản phẩm!");
            return;
        }

        if (!user) {
            requireLoginAddToCart();
            return;
        }

        try {
            await CartService.addItem(selected.id, 1);
            await refreshCart();
            toast.success("Đã thêm vào giỏ hàng!");
        } catch (err: any) {
            // toast.error("Thêm giỏ hàng thất bại!");
            if (err?.response?.status === 401) {
                requireLoginAddToCart();
            } else {
                toast.error("Thêm giỏ hàng thất bại!");
            }
        }
    };

    const handleBuyNow = async () => {
        if (!selected) {
            toast.error("Vui lòng chọn phiên bản sản phẩm!");
            return;
        }

        if (!user) {
            requireLoginBuyNow();
            return;
        }
        await handleAddToCart();
        if (user) { // chỉ push nếu vẫn còn đăng nhập (tránh trường hợp lỗi 401)
            router.push("/cart");
        }
    };

    return (
        <div>
            <h1 className="text-2xl font-bold text-gray-900">{product.name} {" "}
                {selected?.variationName && (
                    <span>
                        {selected.variationName}
                    </span>
                )}
            </h1>
            {product.spu && (
                <p className="text-sm text-gray-500 mb-2">SPU: {product.spu}</p>
            )}

            <p onClick={() => document.getElementById("reviews")?.scrollIntoView({ behavior: "smooth" })}
                className="text-gray-600 mt-3 cursor-pointer hover:text-red-500 transition-colors">
                Xem đánh giá
            </p>

            {/* Cam kết dịch vụ */}
            <div className="mt-6 space-y-2 text-gray-700">
                <p className="flex items-center">
                    <FaCheck className="mr-2" /> Bảo hành chính hãng 12 tháng.
                </p>
                <p className="flex items-center">
                    <FaCheck className="mr-2" /> Hỗ trợ đổi mới trong 7 ngày.
                </p>
                <p className="flex items-center">
                    <FaCheck className="mr-2" /> Giao hàng toàn quốc.
                </p>
            </div>

            {/* Biến thể */}
            {product.variations && product.variations.length > 0 && (
                <div className="mt-6">
                    <h2 className="font-semibold mb-2">Phiên bản</h2>
                    <div className="flex gap-3 flex-wrap">
                        {product.variations.map((v: any) => (
                            <button
                                key={v.id}
                                onClick={() => setSelectedVariation(v.id)}
                                className={`px-4 py-2 rounded-lg border cursor-pointer ${selectedVariation === v.id
                                    ? "bg-[#E61E4D] text-white cursor-pointer"
                                    : "bg-white text-gray-700 border-gray-300"
                                    }`}
                            >
                                {v.variationName || `SKU ${v.sku}`}
                                {/* -{" "} */}
                                {/* {v.price.toLocaleString()}₫ */}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Giá */}
            <div className="mt-6 flex items-center">
                {selected?.discountType && (selected?.discountValue ?? 0) > 0 ? (
                    <>
                        {/* Giá đã giảm */}
                        <span className="text-2xl font-bold text-[#E61E4D]">
                            {selected.salePrice?.toLocaleString("vi-VN")}₫
                        </span>

                        {/* Giá gốc */}
                        <span className="text-gray-500 line-through ml-3 text-lg">
                            {selected.price?.toLocaleString("vi-VN")}₫
                        </span>

                        {/* Phần trăm giảm */}
                        <span className="ml-3 bg-[#E61E4D] text-white text-sm font-semibold px-2 py-1 rounded">
                            -{selected.discountValue}{selected.discountType === "PERCENTAGE" ? "%" : "₫"}
                        </span>
                    </>
                ) : (
                    // Nếu không có giảm giá
                    <span className="text-2xl font-bold text-[#E61E4D]">
                        {selected?.price?.toLocaleString("vi-VN")}₫
                    </span>
                )}
            </div>

            {/* Nút mua */}
            <div className="mt-6 flex gap-4">
                <button
                    onClick={handleAddToCart}
                    className="flex-1 rounded-lg border bg-white text-gray-700 border-gray-300 cursor-pointer hover:bg-gray-100 transition-colors duration-200">
                    Thêm vào giỏ hàng
                </button>
                <button
                    onClick={handleBuyNow}
                    className="flex-1 bg-[#E61E4D] text-white font-semibold py-3 rounded-xl hover:bg-[#d41b46ff] cursor-pointer transition-colors duration-200">
                    Mua ngay
                </button>
            </div>


        </div>
    );
}