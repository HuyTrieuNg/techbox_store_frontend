"use client";

import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaCheck, FaChevronLeft, FaChevronRight, FaGift, FaHome, FaStar } from "react-icons/fa";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { useProductDetail } from "@/hooks/useProductDetail";
import ProductList from "@/components/ProductList";
import { useCart } from "@/hooks/useCart";
import { CartService } from "@/services/cartService";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function ProductDetailPage() {
    const router = useRouter();
    const params = useParams();
    const id = Number(params?.id);
    const { product, isLoading, error } = useProductDetail(id);

    const { refreshCart } = useCart();

    const [selectedVariation, setSelectedVariation] = useState<number | null>(null);
    const [mainImage, setMainImage] = useState<string>("");
    //   const [related, setRelated] = useState<Product[]>([]);
    const [expanded, setExpanded] = useState(false);
    const [reviews, setReviews] = useState([
        { id: 1, name: "Nguyễn Văn A", rating: 5, comment: "Sản phẩm rất tốt, đáng tiền!", date: "28/09/2025" },
        { id: 2, name: "Trần Thị B", rating: 4, comment: "Hàng ok, giao nhanh, đóng gói cẩn thận.", date: "29/09/2025" },
    ]);


    useEffect(() => {
        if (product) {
            setMainImage(product.imageUrl || "/no-image.png");

            if (product.variations && product.variations.length > 0) {
                setSelectedVariation(product.variations[0].id);
            }

            // sản phẩm tương tự theo category
            // const rel = products.filter(
            //     (item) => item.category_id === p.category_id && item.id !== p.id
            // );
            // setRelated(rel);
        }
    }, [product]);

    useEffect(() => {
        if (selectedVariation && product?.variations) {
            const variation = product.variations.find(v => v.id === selectedVariation);
            if (variation && variation.images.length > 0) {
                // Đổi ảnh chính thành ảnh đầu tiên của biến thể
                setMainImage(variation.images[0].imageUrl);
            } else {
                // Nếu biến thể không có ảnh riêng, dùng ảnh mặc định của sản phẩm
                setMainImage(product.imageUrl || "/no-image.png");
            }
        }
    }, [selectedVariation, product]);

    if (!product) {
        return <p className="text-center text-gray-600 mt-10">Product not found</p>;
    }
    // const relatedProducts = products.filter(
    //     (p) => p.category_id === product.category_id && p.id !== product.id
    // );


    // const itemsPerPage = 4;

    // const maxIndex = Math.max(0, relatedProducts.length - itemsPerPage);

    // const nextSlide = () => {
    //     setIndex((prev) => Math.min(prev + 1, maxIndex));
    // };

    // const prevSlide = () => {
    //     setIndex((prev) => Math.max(prev - 1, 0));
    // };

    // if (!relatedProducts.length) return null;

    const handleAddToCart = async () => {
        console.log("Adding to cart", selected);
        if (!selected) {
            toast.error("Vui lòng chọn phiên bản sản phẩm!");
            return;
        }

        try {
            await CartService.addItem(selected.id, 1);
            await refreshCart();
            toast.success("Đã thêm sản phẩm vào giỏ hàng!");
        } catch (error) {
            console.error(error);
            toast.error("Không thể thêm sản phẩm vào giỏ hàng!");
        }
    };

    const handleBuyNow = async () => {
        await handleAddToCart();
        // sau này có thể chuyển hướng đến trang giỏ hàng hoặc thanh toán
        router.push("/cart");
    };

    const selected = selectedVariation
        ? product.variations?.find((v) => v.id === selectedVariation)
        : product.variations?.[0];

    const averageRating =
        reviews.reduce((acc, r) => acc + r.rating, 0) / (reviews.length || 1);

    return (
        <>
            {/* Breadcrumb */}
            <div className="flex items-center text-gray-600 text-base mb-6">
                <FaHome className="mr-2 text-gray-500" />
                <Link href="/" className="hover:text-[#E61E4D] transition">
                    Trang chủ
                </Link>
                <FaChevronRight className="mx-2 text-gray-400" />
                <span className="font-medium text-gray-800 capitalize">{product.categoryName}</span>
                <FaChevronRight className="mx-2 text-gray-400" />
                <span className="font-medium text-gray-800 capitalize">{product.brandName}</span>
                <FaChevronRight className="mx-2 text-gray-400" />
                <span className="font-medium text-gray-800 capitalize">{product.name}</span>
            </div>

            <div className="max-w-7xl grid md:grid-cols-2 gap-10">
                {/* Left: Hình ảnh */}
                {/* <div>
                    
                    <img
                        src={mainImage || "/no-image.png"}
                        alt={product.name}
                        className="rounded-xl shadow-lg w-full mb-4"
                    />

                    
                    <div className="flex gap-3">
                        {(selected?.images?.length ? selected.images : [{ imageUrl: product.imageUrl }])
                            .filter(i => i?.imageUrl)
                            .map((img, idx) => (
                                <img
                                    key={idx}
                                    src={img.imageUrl || "/no-image.png"}
                                    alt={`thumb-${idx}`}
                                    onClick={() => setMainImage(img.imageUrl || "/no-image.png")}
                                    className={`w-20 h-20 object-cover rounded-lg border cursor-pointer transition ${mainImage === img.imageUrl ? "border-[#E61E4D] shadow-md" : "border-gray-300"
                                        }`}
                                />
                            ))}
                    </div>
                </div> */}

                {/* Left: Hình ảnh */}
                <div className="space-y-6">
                    {/* Ảnh lớn - HÌNH CHỮ NHẬT, HIỂN THỊ TOÀN BỘ ẢNH */}
                    <div className="w-full max-w-2xl mx-auto">
                        <div
                            className="relative w-full bg-gray-50 rounded-xl shadow-lg overflow-hidden flex items-center justify-center"
                            style={{ height: '400px' }} // Chiều cao cố định
                        >
                            <img
                                src={mainImage || "/no-image.png"}
                                alt={product.name}
                                className="max-w-full max-h-full object-contain rounded-lg"
                            />
                        </div>
                    </div>

                    {/* Ảnh nhỏ - KHÔNG BỊ CẮT, KÍCH THƯỚC CỐ ĐỊNH, CUỘN NGANG */}
                    <div className="overflow-x-auto pb-3">
                        <div className="flex gap-3 min-w-max p-1">
                            {(selected?.images?.length ? selected.images : [{ imageUrl: product.imageUrl }])
                                .filter(i => i?.imageUrl)
                                .map((img, idx) => (
                                    <div
                                        key={idx}
                                        onClick={() => setMainImage(img.imageUrl || "/no-image.png")}
                                        className={`
              w-20 h-20 rounded-lg border-2 cursor-pointer transition-all duration-200 flex-shrink-0
              flex items-center justify-center bg-white overflow-hidden
              ${mainImage === img.imageUrl
                                                ? "border-[#E61E4D] shadow-md scale-105"
                                                : "border-gray-300 hover:border-gray-400"
                                            }
            `}
                                    >
                                        <img
                                            src={img.imageUrl || "/no-image.png"}
                                            alt={`thumb-${idx}`}
                                            className="w-full h-full object-contain p-1"
                                        />
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>

                {/* Right: Thông tin sản phẩm */}
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">{product.name} {" "}
                        {selected?.variationName && (
                            <span>
                                {selected.variationName}
                            </span>
                        )}
                    </h1>

                    {/* <p className="text-gray-600 mt-3">{product.description}</p> */}
                    <p className="text-gray-600 mt-3">Xem đánh giá</p>
                    {/* 🎁 Quà tặng khuyến mãi */}

                    <div className=" mt-6 col-span-2 bg-white border border-pink-200 rounded-lg shadow overflow-hidden">
                        <div className="flex items-center  text-[#E61E4D] bg-[#ffe9e9ff] text-white font-semibold py-3 px-6">
                            <FaGift className="mr-2 text-[#E61E4D]" />
                            <span className="text-lg font-semibold text-[#E61E4D]">Quà tặng khuyến mãi</span>
                        </div>

                        <div>
                            <ul className="list-disc list-inside space-y-2 text-gray-700 p-4">
                                <li>Giảm giá 10% cho đơn hàng tiếp theo.</li>
                                <li>Miễn phí vận chuyển cho đơn hàng trên 500.000₫.</li>
                                <li>Tặng kèm ốp lưng điện thoại cho mỗi đơn hàng.</li>

                            </ul>
                        </div>
                    </div>


                    {/* Variations */}
                    {product.variations && product.variations.length > 0 && (
                        <div className="mt-6">
                            <h2 className="font-semibold mb-2">Phiên bản</h2>
                            <div className="flex gap-3 flex-wrap">
                                {product.variations.map((v) => (
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
                                    {selected.salePrice?.toLocaleString()}₫
                                </span>

                                {/* Giá gốc */}
                                <span className="text-gray-500 line-through ml-3 text-lg">
                                    {selected.price?.toLocaleString()}₫
                                </span>

                                {/* Phần trăm giảm */}
                                <span className="ml-3 bg-[#E61E4D] text-white text-sm font-semibold px-2 py-1 rounded">
                                    -{selected.discountValue}%
                                </span>
                            </>
                        ) : (
                            // Nếu không có giảm giá
                            <span className="text-2xl font-bold text-[#E61E4D]">
                                {selected?.price?.toLocaleString()}₫
                            </span>
                        )}
                    </div>

                    {/* Nút hành động */}
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

                    {/* Cam kết dịch vụ */}
                    <div className="mt-6 space-y-2 text-gray-700 border-b border-gray-300 pb-5">
                        <p className="flex items-center">
                            <FaCheck className="mr-2" /> Bảo hành chính hãng 12 tháng.
                        </p>
                        <p className="flex items-center">
                            <FaCheck className="mr-2" /> Hỗ trợ đổi mới trong 7 ngày.
                        </p>
                        <p className="flex items-center">
                            <FaCheck className="mr-2" /> Miễn phí giao hàng toàn quốc.
                        </p>
                    </div>

                    {/* 🎁 Khuyến mãi */}
                    <div className=" mt-6 col-span-2 bg-white border border-gray-400 rounded-lg shadow overflow-hidden">
                        <div className="flex items-center bg-gray-100 font-semibold py-3 px-6">
                            <FaGift className="mr-2" />
                            <span className="text-lg font-semibold">Khuyến mãi</span>
                        </div>

                        <div>
                            <ul className="list-disc list-inside space-y-2 text-gray-700 p-4">
                                <li>Giảm 10% khi thanh toán qua VNPAY-QR</li>
                                <li>Giảm thêm 300.000đ khi mua kèm Office 365</li>
                                <li>Tặng Balo Laptop cao cấp Techbox trị giá 350.000đ</li>
                            </ul>
                        </div>
                    </div>

                </div>
            </div>

            <div className="max-w-7xl mt-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    Sản phẩm tương tự
                </h2>
                <ProductList categoryId={product.categoryId} />
            </div>

            <div className="max-w-7xl mt-10">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    Thông tin sản phẩm
                </h2>

                <div
                    className={`relative text-gray-700 leading-relaxed transition-all duration-200 overflow-hidden ${expanded ? "max-h-[2000px]" : "max-h-[200px]"
                        }`}
                >
                    <p className="text-gray-600">{product.description}</p>
                    {/* --- Bảng thông tin tổng hợp --- */}
                    {(product.attributes?.length > 0 || (selected?.attributes ?? []).length > 0) && (
                        <div className="mt-6">
                            <h3 className="text-xl font-semibold text-gray-800 mb-3">
                                Thông số kỹ thuật chi tiết:
                            </h3>

                            <table className="w-full border border-gray-300  border-collapse rounded-lg">
                                <tbody>


                                    {/* --- Nhóm thông tin chung --- */}
                                    {product.attributes?.length > 0 && (
                                        <>

                                            {product.attributes.map((attr) => (
                                                <tr
                                                    key={`prod-${attr.id}`}
                                                    className="border border-gray-200 hover:bg-gray-50 transition"
                                                >
                                                    <td className="w-1/3 px-4 py-2 font-medium text-gray-700 bg-gray-100">
                                                        {attr.name}
                                                    </td>
                                                    <td className="px-4 py-2 text-gray-600">
                                                        {attr.value}
                                                    </td>
                                                </tr>
                                            ))}
                                        </>
                                    )}
                                    {/* --- Nhóm thông tin biến thể (nếu có) --- */}
                                    {(selected?.attributes ?? []).length > 0 && (
                                        <>
                                            {selected?.attributes.map((attr) => (
                                                <tr
                                                    key={`var-${attr.id}`}
                                                    className="border border-gray-200 hover:bg-gray-50 transition"
                                                >
                                                    <td className="w-1/3 px-4 py-2 font-medium text-gray-700 bg-gray-100">
                                                        {attr.name}
                                                    </td>
                                                    <td className="px-4 py-2 text-gray-600">
                                                        {attr.value}
                                                    </td>
                                                </tr>
                                            ))}
                                        </>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {/* Gradient fade effect khi chưa mở rộng */}
                    {!expanded && (
                        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent pointer-events-none" />
                    )}
                </div>

                <div className="flex justify-center mt-4">
                    <span
                        onClick={() => setExpanded(!expanded)}
                        className="text-[#E61E4D] hover:text-[#d41b46ff] cursor-pointer text-base font-medium transition-colors duration-200"
                    >
                        {expanded ? "Thu gọn" : "Xem thêm"}
                    </span>
                </div>

                {/* Phần thống kê đánh giá */}
                <div className="border-b border-gray-300 pb-4 mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Đánh giá & Nhận xét</h2>
                    <div className="flex items-center gap-4">
                        <div className="text-3xl font-bold">{averageRating.toFixed(1)}/5</div>
                        <div className="flex">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <FaStar
                                    key={i}
                                    size={15}
                                    className={i < Math.round(averageRating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
                                />
                            ))}
                        </div>
                        <span className="text-gray-600">({reviews.length} đánh giá)</span>
                    </div>
                </div>
                {/* Danh sách bình luận */}
                <div className="max-w-7xl mt-10">
                    <h3 className="font-semibold mb-4">Nhận xét từ khách hàng</h3>
                    {reviews.length === 0 ? (
                        <p className="text-gray-500">Chưa có nhận xét nào.</p>
                    ) : (
                        <div className="space-y-4">
                            {reviews.map((r) => (
                                <div key={r.id} className="border-b border-gray-300 pb-3">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="font-semibold">{r.name}</span>
                                        <div className="flex">
                                            {Array.from({ length: 5 }).map((_, i) => (
                                                <FaStar
                                                    key={i}
                                                    size={16}
                                                    className={i < r.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                    <p className="text-gray-700">{r.comment}</p>
                                    <span className="text-sm text-gray-400">{r.date}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

            </div>

        </>
    );
}