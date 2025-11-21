import { notFound } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";
import { FaSearch, FaChevronLeft, FaChevronRight, FaHome } from "react-icons/fa";
import BrandProductClient from "../brand/[name]/BrandProduct";

const baseUrl =  (process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080') + '/api';

export default async function SearchPage({
    searchParams,
}: {
    searchParams: { q?: string; page?: string };
}) {
    const query = searchParams.q?.trim() || "";
    const page = parseInt(searchParams.page || "0");
    const size = 20;

    if (!query) {
        notFound(); // Nếu không có từ khóa → 404
    }

    const res = await fetch(
        `${baseUrl}/products?name=${encodeURIComponent(query)}&page=${page}&size=${size}`,
        { cache: "no-store" }
    );

    if (!res.ok) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-12 text-center">
                <p className="text-gray-500">Không thể tải kết quả tìm kiếm. Vui lòng thử lại.</p>
            </div>
        );
    }

    const data = await res.json();
    const products = data.content || [];
    const totalPages = data.page?.totalPages || 1;
    const totalElements = data.page?.totalElements || 0;

    return (
        <>
            <div className="flex items-center text-gray-600 text-base mb-6">
                <FaHome className="mr-2 text-gray-500" />
                <Link href="/" className="hover:text-[#E61E4D] transition">
                    Trang chủ
                </Link>
                <FaChevronRight className="mx-2 text-gray-400" />
                <span className="font-medium text-gray-800 capitalize">Tìm kiếm</span>

            </div>

            {/* Tiêu đề kết quả */}
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    Kết quả tìm kiếm cho: <span className="text-[#E61E4D]">"{query}"</span>
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                    Tìm thấy <strong>{totalElements}</strong> sản phẩm
                </p>
            </div>

            {/* Danh sách sản phẩm */}
            {products.length > 0 ? (
                <BrandProductClient products={products} />
                // <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3 mb-8">
                //     {products.map((product: any) => (
                //         <ProductCard key={product.id} product={product} />
                //     ))}
                // </div>
            ) : (
                <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
                    <FaSearch className="mx-auto text-5xl text-gray-300 dark:text-gray-600 mb-4" />
                    <p className="text-lg text-gray-600 dark:text-gray-400 mb-2">
                        Không tìm thấy sản phẩm nào phù hợp
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-500">
                        Hãy thử từ khóa khác hoặc kiểm tra chính tả
                    </p>
                </div>
            )}

            {/* Phân trang */}
            {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-8">
                    <Link
                        href={`/search?q=${encodeURIComponent(query)}&page=${Math.max(0, page - 1)}`}
                        className={`p-2 rounded-lg border ${page === 0
                            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                            : "bg-white hover:bg-gray-50 text-gray-700"
                            } dark:border-gray-700`}
                        onClick={(e) => page === 0 && e.preventDefault()}
                    >
                        <FaChevronLeft />
                    </Link>

                    <div className="flex gap-1">
                        {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                            const pageNum = i;
                            return (
                                <Link
                                    key={pageNum}
                                    href={`/search?q=${encodeURIComponent(query)}&page=${pageNum}`}
                                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${pageNum === page
                                        ? "bg-[#E61E4D] text-white"
                                        : "bg-white hover:bg-gray-100 text-gray-700"
                                        } dark:bg-gray-800 dark:text-gray-300`}
                                >
                                    {pageNum + 1}
                                </Link>
                            );
                        })}
                        {totalPages > 5 && (
                            <span className="px-3 py-1.5 text-gray-500">...</span>
                        )}
                    </div>

                    <Link
                        href={`/search?q=${encodeURIComponent(query)}&page=${page + 1}`}
                        className={`p-2 rounded-lg border ${page >= totalPages - 1
                            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                            : "bg-white hover:bg-gray-50 text-gray-700"
                            } dark:border-gray-700`}
                        onClick={(e) => page >= totalPages - 1 && e.preventDefault()}
                    >
                        <FaChevronRight />
                    </Link>
                </div>
            )}

        </>
    );
}