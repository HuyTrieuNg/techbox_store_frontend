"use client";

import ProductCard from "@/components/ProductCard";
import Link from "next/link";
import { FaChevronRight, FaHeart, FaHome, FaShoppingCart } from "react-icons/fa";
import { useWishlist } from "@/hooks/useWishList";
import { useAuthContext } from "@/contexts/AuthContext";

export default function WishlistPage() {
    const { wishlist, isLoading, isError, refreshWishlist } = useWishlist();
    const { user } = useAuthContext();

    if (!user) {
        return (
            <div className="text-center py-20">
                <h2 className="text-2xl font-semibold mb-4 text-red-500">
                    Bạn cần đăng nhập để xem Wishlist
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

    // === TRẠNG THÁI LOADING ===
    if (isLoading) {
        return <WishlistSkeleton />;
    }

    // === LỖI ===
    if (isError) {
        return (
            <div className="text-center py-20">
                <p className="text-red-500 text-xl">Lỗi tải danh sách yêu thích</p>
                <button
                    onClick={() => refreshWishlist()}
                    className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                    Thử lại
                </button>
            </div>
        );
    }

    // === RỖNG ===
    if (!wishlist?.content?.length) {
        return <EmptyWishlist />;
    }

    // === CÓ DỮ LIỆU ===
    return (
        <>
            {/* Breadcrumb */}
            <div className="flex items-center text-gray-600 text-base mb-6">
                <FaHome className="mr-2 text-gray-500" />
                <Link href="/" className="hover:text-[#E61E4D] transition">
                    Trang chủ
                </Link>
                <FaChevronRight className="mx-2 text-gray-400" />
                <span className="font-medium text-gray-800 capitalize"> Các sản phẩm yêu thích</span>
            </div>

            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                <h1 className="text-2xl font-bold flex items-center gap-2">
                    <FaHeart className="text-red-500" />
                    Yêu thích ({wishlist.page.totalElements})
                </h1>
            </div>

            {/* Danh sách sản phẩm */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3">
                {wishlist.content.map((product: any) => (
                    <div key={product.id} className="relative group">
                        {/* Tái sử dụng ProductCard */}
                        <ProductCard product={{ ...product, inWishlist: true }} />
                    </div>
                ))}
            </div>

        </>
    );
}

// === SKELETON ===
function WishlistSkeleton() {
    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="h-8 bg-gray-200 rounded w-64 mb-8 animate-pulse" />
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
                {[...Array(10)].map((_, i) => (
                    <div key={i} className="bg-gray-100 border rounded-lg p-3 animate-pulse">
                        <div className="bg-gray-300 h-40 rounded mb-3" />
                        <div className="h-5 bg-gray-300 rounded mb-2" />
                        <div className="h-4 bg-gray-300 rounded w-3/4" />
                    </div>
                ))}
            </div>
        </div>
    );
}

// === TRẠNG THÁI RỖNG ===
function EmptyWishlist() {
    return (
        <div className="text-center py-20">
            <FaHeart className="mx-auto text-gray-300 text-7xl mb-6" />
            <h2 className="text-2xl font-bold text-gray-700 mb-3">Danh sách yêu thích trống</h2>
            <p className="text-gray-500 mb-8">Bạn chưa thêm sản phẩm nào vào danh sách yêu thích</p>
            <Link
                href="/"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#E61E4D] text-white rounded-lg hover:bg-red-600 transition"
            >
                <FaShoppingCart /> Khám phá ngay
            </Link>
        </div>
    );
}