// src/components/ReviewModal.tsx
"use client";

import { useEffect, useState } from "react";
import { FaStar, FaTimes } from "react-icons/fa";
import { toast } from "sonner";
import { ReviewService } from "@/services/reviewService";


interface ReviewModalProps {
    productId: number;
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
    initialData?: {
        id: number;
        rating: number;
        content: string;
    } | null; // Thêm prop này
}

// export default function ReviewModal({ productId, isOpen, onClose, onSuccess }: ReviewModalProps) {
//     const [rating, setRating] = useState(0);
//     const [content, setContent] = useState("");
//     const [loading, setLoading] = useState(false);

//     if (!isOpen) return null;

//     const handleSubmit = async () => {
//         if (rating === 0) {
//             toast.error("Vui lòng chọn số sao!");
//             return;
//         }
//         if (!content.trim()) {
//             toast.error("Vui lòng nhập nội dung đánh giá!");
//             return;
//         }

//         setLoading(true);
//         console.log("Submitting review:", { rating, content });
//         try {
//             await ReviewService.addReview(productId, { rating, content });
//             toast.success("Cảm ơn bạn đã đánh giá!");
//             onSuccess(); // Refresh
//             onClose();
//             setRating(0);
//             setContent("");
//         } catch (error: any) {
//             console.log("ERROR:", error.response?.data);

//             toast.error("You have already reviewed this product.");
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
//             <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 relative">
//                 <button
//                     onClick={onClose}
//                     className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
//                 >
//                     <FaTimes size={20} />
//                 </button>

//                 <h3 className="text-xl font-bold text-gray-900 mb-4">Đánh giá sản phẩm</h3>

//                 {/* Chọn sao */}
//                 <div className="mb-6">
//                     <p className="text-sm text-gray-700 mb-2">Chọn số sao:</p>
//                     <div className="flex gap-2 justify-center">
//                         {[1, 2, 3, 4, 5].map((star) => (
//                             <button
//                                 key={star}
//                                 onClick={() => setRating(star)}
//                                 className="transition-transform hover:scale-110"
//                             >
//                                 <FaStar
//                                     size={36}
//                                     className={
//                                         star <= rating
//                                             ? "text-yellow-400 fill-yellow-400"
//                                             : "text-gray-300"
//                                     }
//                                 />
//                             </button>
//                         ))}
//                     </div>
//                 </div>

//                 {/* Nội dung */}
//                 <div className="mb-6">
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                         Nhận xét của bạn
//                     </label>
//                     <textarea
//                         value={content}
//                         onChange={(e) => setContent(e.target.value)}
//                         placeholder="Chia sẻ trải nghiệm của bạn..."
//                         rows={4}
//                         className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E61E4D] focus:border-transparent outline-none transition"
//                     />
//                 </div>

//                 {/* Nút */}
//                 <div className="flex gap-3">
//                     <button
//                         onClick={onClose}
//                         className="flex-1 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
//                     >
//                         Hủy
//                     </button>
//                     <button
//                         onClick={handleSubmit}
//                         disabled={loading}
//                         className="flex-1 bg-[#E61E4D] text-white font-medium py-2 rounded-lg hover:bg-[#d41b46] disabled:opacity-70 transition"
//                     >
//                         {loading ? "Đang gửi..." : "Gửi đánh giá"}
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// }

export default function ReviewModal({ 
    productId, 
    isOpen, 
    onClose, 
    onSuccess, 
    initialData 
}: ReviewModalProps) {
    const isEditMode = !!initialData;

    const [rating, setRating] = useState(initialData?.rating || 0);
    const [content, setContent] = useState(initialData?.content || "");
    const [loading, setLoading] = useState(false);

    // Reset khi mở modal mới
    useEffect(() => {
        if (isOpen) {
            setRating(initialData?.rating || 0);
            setContent(initialData?.content || "");
        }
    }, [isOpen, initialData]);

    if (!isOpen) return null;

    const handleSubmit = async () => {
        if (rating === 0) {
            toast.error("Vui lòng chọn số sao!");
            return;
        }
        if (!content.trim()) {
            toast.error("Vui lòng nhập nội dung đánh giá!");
            return;
        }

        setLoading(true);
        try {
            if (isEditMode) {
                // Gọi API PUT để cập nhật
                await ReviewService.updateReview(productId, initialData!.id, { rating, content });
                toast.success("Cập nhật đánh giá thành công!");
            } else {
                // Gọi API POST để thêm
                await ReviewService.addReview(productId, { rating, content });
                toast.success("Cảm ơn bạn đã đánh giá!");
            }

            onSuccess(); // Refresh danh sách + summary + myReview
            onClose();
        } catch (error: any) {
            const msg = error.response?.data?.message || "Đã có lỗi xảy ra!";
            toast.error(msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4 bg-black/50">
            <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 relative">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                >
                    <FaTimes size={20} />
                </button>

                <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {isEditMode ? "Chỉnh sửa đánh giá" : "Đánh giá sản phẩm"}
                </h3>

                {/* Chọn sao */}
                <div className="mb-6">
                    <p className="text-sm text-gray-700 mb-2">Chọn số sao:</p>
                    <div className="flex gap-2 justify-center">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <button
                                key={star}
                                onClick={() => setRating(star)}
                                className="transition-transform hover:scale-110"
                            >
                                <FaStar
                                    size={36}
                                    className={
                                        star <= rating
                                            ? "text-yellow-400 fill-yellow-400"
                                            : "text-gray-300"
                                    }
                                />
                            </button>
                        ))}
                    </div>
                </div>

                {/* Nội dung */}
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nhận xét của bạn
                    </label>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Chia sẻ trải nghiệm của bạn..."
                        rows={4}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E61E4D] focus:border-transparent outline-none transition"
                    />
                </div>

                {/* Nút */}
                <div className="flex gap-3">
                    <button
                        onClick={onClose}
                        className="flex-1 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
                    >
                        Hủy
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="flex-1 bg-[#E61E4D] text-white font-medium py-2 rounded-lg hover:bg-[#d41b46] disabled:opacity-70 transition"
                    >
                        {loading ? "Đang xử lý..." : isEditMode ? "Cập nhật" : "Gửi đánh giá"}
                    </button>
                </div>
            </div>
        </div>
    );
}