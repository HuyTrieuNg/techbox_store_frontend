"use client";

import { FaStar, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Edit, Trash } from "lucide-react";
import { toast } from "sonner";
import { ReviewService } from "@/services/reviewService";

interface Props {
    summary: any;
    summaryLoading: boolean;
    reviews: any[];
    reviewsLoading: boolean;
    pageInfo: any;
    myReview: any;
    page: number;
    setPage: (page: number) => void;
    onOpenReview: () => void;
    onEditReview: (review: any) => void;
    onDeleteSuccess: () => Promise<any>;
}

export default function ProductReviewsSection({
    summary,
    summaryLoading,
    reviews,
    reviewsLoading,
    pageInfo,
    myReview,
    page,
    setPage,
    onOpenReview,
    onEditReview,
    onDeleteSuccess,
}: Props) {
    const total = summary?.totalReviews ?? 0;
    const avgRating = summary?.averageRating ?? 0;
    const getPercent = (count: number) => (total > 0 ? (count / total) * 100 : 0);

    const handleDelete = async (reviewId: number) => {
        if (!confirm("Xóa đánh giá này?")) return;
        try {
            await ReviewService.deleteReview(summary.productId || reviews[0]?.productId, reviewId);
            await onDeleteSuccess();
            
            toast.success("Đã xóa đánh giá!");
            
        } catch {
            toast.error("Xóa thất bại!");
        }
    };

    return (
        <div id="reviews" className="max-w-7xl mt-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Đánh giá & Nhận xét</h2>

            <div className="grid md:grid-cols-3 gap-10">
                {/* Tổng quan */}
                <div className="md:col-span-1">
                    {summaryLoading ? (
                        <p>Đang tải...</p>
                    ) : (
                        <>
                            <div className="text-center mb-6">
                                <div className="text-5xl font-bold text-[#E61E4D]">{avgRating.toFixed(1) ?? "0.0"}</div>
                                <div className="flex justify-center mt-2">
                                    {[...Array(5)].map((_, i) => (
                                        <FaStar key={i} size={20} className={i < Math.round(avgRating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"} />
                                    ))}
                                </div>
                                <p className="text-gray-500 mt-1">{total.toLocaleString()} đánh giá</p>

                                <div className="space-y-2">
                                    {[5, 4, 3, 2, 1].map((star) => {
                                        const count = summary?.[`rating${star}Count` as keyof typeof summary] ?? 0;
                                        const percent = getPercent(count);
                                        return (
                                            <div key={star} className="flex items-center gap-2 text-sm">
                                                <span className="w-12 font-medium">{star} sao</span>
                                                <div className="flex-1 bg-gray-200 rounded-full h-2 overflow-hidden">
                                                    <div  className="bg-yellow-400 h-full transition-all duration-300" style={{ width: `${percent}%` }} />
                                                </div>
                                                <span className="w-10 text-right text-gray-500">{percent.toFixed(2)}%</span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </>
                    )}
                </div>

                {/* Danh sách */}
                <div className="md:col-span-2">
                    <button
                        onClick={onOpenReview}
                        disabled={!!myReview}
                        className={`px-5 py-2 rounded-lg transition text-sm font-medium cursor-pointer mb-6 ${myReview
                            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                            : "bg-[#E61E4D] text-white hover:bg-[#d41b46]"
                            }`}
                    >
                        {myReview ? "Bạn đã đánh giá sản phẩm này" : "Viết đánh giá của bạn"}
                    </button>

                    <div className="space-y-6">
                        {reviewsLoading ? (
                            <div className="space-y-6">
                                {[...Array(3)].map((_, i) => (
                                    <div key={i} className="h-32 bg-gray-100 animate-pulse rounded-xl" />
                                ))}
                            </div>
                        ) : reviews.length === 0 ? (
                            <div className="text-center py-20 text-gray-500">
                                <p className="text-2xl font-medium">Chưa có đánh giá nào</p>
                                <p className="mt-3">Hãy là người đầu tiên chia sẻ trải nghiệm của bạn!</p>
                            </div>
                        ) : (
                            reviews.map((r: any) => {
                                const isMy = myReview?.id === r.id;
                                return (
                                    <div key={r.id} className="bg-gray-50 rounded-xl p-6 border">
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <h4 className="font-bold text-gray-900">{r.userFullName}</h4>
                                                <div className="flex gap-1 mt-2">
                                                    {[...Array(5)].map((_, i) => (
                                                        <FaStar key={i} size={18} className={i < r.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"} />
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-4 text-sm text-gray-500">
                                                {isMy && (
                                                    <>
                                                        <button onClick={() => onEditReview(r)} className="text-blue-600 hover:text-blue-800">
                                                            <Edit size={18} />
                                                        </button>
                                                        <button onClick={() => handleDelete(r.id)} className="text-red-600 hover:text-red-800">
                                                            <Trash size={18} />
                                                        </button>
                                                    </>
                                                )}
                                                <span>{new Date(r.createdAt).toLocaleDateString("vi-VN")}</span>
                                            </div>
                                        </div>
                                        <p className="text-gray-700 leading-relaxed">{r.content}</p>
                                    </div>
                                );
                            })
                        )}
                    </div>

                    {/* Phân trang */}
                    {pageInfo?.totalPages > 1 && (
                        <div className="flex justify-center items-center gap-6 mt-12">
                            <button
                                onClick={() => setPage(Math.max(0, page - 1))}
                                disabled={page === 0}
                                className="p-3 rounded-full border hover:bg-gray-50 disabled:opacity-50 transition"
                            >
                                <FaChevronLeft size={20} />
                            </button>
                            <span className="font-semibold text-gray-700">
                                Trang {page + 1} / {pageInfo.totalPages}
                            </span>
                            <button
                                onClick={() => setPage(Math.min(pageInfo.totalPages - 1, page + 1))}
                                disabled={page >= pageInfo.totalPages - 1}
                                className="p-3 rounded-full border hover:bg-gray-50 disabled:opacity-50 transition"
                            >
                                <FaChevronRight size={20} />
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}