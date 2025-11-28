// "use client";

// import { useParams } from "next/navigation";
// import React, { useEffect, useRef, useState } from "react";
// import { FaCheck, FaChevronLeft, FaChevronRight, FaGift, FaHome, FaStar } from "react-icons/fa";
// import Link from "next/link";
// import ProductCard from "@/components/ProductCard";
// import { useProductDetail } from "@/hooks/useProductDetail";
// import ProductList from "@/components/ProductList";
// import { useCart } from "@/hooks/useCart";
// import { CartService } from "@/services/cartService";
// import { toast } from "sonner";
// import { useRouter } from "next/navigation";
// import { useProductReviews } from "@/hooks/useReview";
// import { useReviewSummary } from "@/hooks/useReviewSummary";
// import { ReviewService, ReviewSummary } from "@/services/reviewService";
// import { useAuthContext } from "@/contexts/AuthContext";
// import ReviewModal from "@/components/AddReview";
// import { useMyReview } from "@/hooks/useMyReview";
// import { Delete, Edit, Trash } from "lucide-react";

// export default function ProductDetailPage() {
//     const router = useRouter();
//     const params = useParams();
//     const id = Number(params?.id);
//     const { product, isLoading, error } = useProductDetail(id);
//     const [page, setPage] = useState(0);
//     const size = 5;


//     const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
//     const { user } = useAuthContext();
//     const reviewRef = useRef<HTMLDivElement>(null);

//     const scrollToReview = () => {
//         reviewRef.current?.scrollIntoView({ behavior: "smooth" });
//     };

//     const { summary, isLoading: summaryLoading, mutate: mutateSummary } = useReviewSummary(id);
//     const { reviews, pageInfo, isLoading: reviewsLoading, mutate: mutateReviews } = useProductReviews(id, page, size);
//     const { myReview, isLoading: myReviewLoading, mutate: mutateMyReview } = useMyReview(id);
//     const [editingReview, setEditingReview] = useState<any>(null);
//     // Hàm refresh sau khi gửi đánh giá
//     const handleReviewSuccess = async () => {
//         toast.success("Cảm ơn bạn đã đánh giá!");
//         await mutateReviews();
//         await mutateSummary();
//         setIsReviewModalOpen(false);
//         setPage(0);
//     };
//     const total = summary?.totalReviews ?? 0;
//     const getPercent = (count: number) => (total > 0 ? (count / total) * 100 : 0);

//     const { refreshCart } = useCart();

//     const [selectedVariation, setSelectedVariation] = useState<number | null>(null);
//     const [mainImage, setMainImage] = useState<string>("");
//     //   const [related, setRelated] = useState<Product[]>([]);
//     const [expanded, setExpanded] = useState(false);


//     useEffect(() => {
//         if (product) {
//             setMainImage(product.imageUrl || "/no-image.png");

//             if (product.variations && product.variations.length > 0) {
//                 setSelectedVariation(product.variations[0].id);
//             }
//         }
//     }, [product]);

//     useEffect(() => {
//         if (selectedVariation && product?.variations) {
//             const variation = product.variations.find(v => v.id === selectedVariation);
//             if (variation && variation.images.length > 0) {
//                 // Đổi ảnh chính thành ảnh đầu tiên của biến thể
//                 setMainImage(variation.images[0].imageUrl);
//             } else {
//                 // Nếu biến thể không có ảnh riêng, dùng ảnh mặc định của sản phẩm
//                 setMainImage(product.imageUrl || "/no-image.png");
//             }
//         }
//     }, [selectedVariation, product]);

//     if (!product) {
//         return <p className="text-center text-gray-600 mt-10">Product not found</p>;
//     }

//     const handleAddToCart = async () => {
//         console.log("Adding to cart", selected);
//         if (!selected) {
//             toast.error("Vui lòng chọn phiên bản sản phẩm!");
//             return;
//         }

//         try {
//             await CartService.addItem(selected.id, 1);
//             await refreshCart();
//             toast.success("Đã thêm sản phẩm vào giỏ hàng!");
//         } catch (error) {
//             console.error(error);
//             toast.error("Không thể thêm sản phẩm vào giỏ hàng!");
//         }
//     };

//     const handleBuyNow = async () => {
//         await handleAddToCart();
//         // sau này có thể chuyển hướng đến trang giỏ hàng hoặc thanh toán
//         router.push("/cart");
//     };



//     const handleEditReview = (review: any) => {
//         setEditingReview(review);
//         setIsReviewModalOpen(true);
//     };

//     const handleDeleteReview = async (reviewId: number) => {
//         if (!confirm("Bạn có chắc muốn xóa đánh giá này?")) return;

//         try {
//             // Cập nhật cache ngay: xóa myReview
//             mutateMyReview(null, false);
//             await ReviewService.deleteReview(id, reviewId);
//             toast.success("Đã xóa đánh giá!");

//             await Promise.all([
//                 mutateReviews(),
//                 mutateSummary(),
//                 mutateMyReview(), // cập nhật lại myReview
//             ]);
//         } catch (error) {
//             toast.error("Không thể xóa đánh giá!");
//         }
//     };

//     const selected = selectedVariation
//         ? product.variations?.find((v) => v.id === selectedVariation)
//         : product.variations?.[0];

//     return (
//         <>
//             {/* Breadcrumb */}
//             <div className="flex items-center text-gray-600 text-base mb-6">
//                 <FaHome className="mr-2 text-gray-500" />
//                 <Link href="/" className="hover:text-[#E61E4D] transition">
//                     Trang chủ
//                 </Link>
//                 <FaChevronRight className="mx-2 text-gray-400" />
//                 <span className="font-medium text-gray-800 capitalize">{product.categoryName}</span>
//                 <FaChevronRight className="mx-2 text-gray-400" />
//                 <span className="font-medium text-gray-800 capitalize">{product.brandName}</span>
//                 <FaChevronRight className="mx-2 text-gray-400" />
//                 <span className="font-medium text-gray-800 capitalize">{product.name}</span>
//             </div>

//             <div className="max-w-7xl grid md:grid-cols-2 gap-10">
//                 {/* Left: Hình ảnh */}
//                 <div className="space-y-6">
//                     {/* Ảnh lớn - HÌNH CHỮ NHẬT, HIỂN THỊ TOÀN BỘ ẢNH */}
//                     <div className="w-full max-w-2xl mx-auto">
//                         <div
//                             className="relative w-full bg-gray-50 rounded-xl shadow-lg overflow-hidden flex items-center justify-center"
//                             style={{ height: '400px' }} // Chiều cao cố định
//                         >
//                             <img
//                                 src={mainImage || "/no-image.png"}
//                                 alt={product.name}
//                                 className="max-w-full max-h-full object-contain rounded-lg"
//                             />
//                         </div>
//                     </div>

//                     {/* Ảnh nhỏ - KHÔNG BỊ CẮT, KÍCH THƯỚC CỐ ĐỊNH, CUỘN NGANG */}
//                     <div className="overflow-x-auto pb-3">
//                         <div className="flex gap-3 min-w-max p-1">
//                             {(selected?.images?.length ? selected.images : [{ imageUrl: product.imageUrl }])
//                                 .filter(i => i?.imageUrl)
//                                 .map((img, idx) => (
//                                     <div
//                                         key={idx}
//                                         onClick={() => setMainImage(img.imageUrl || "/no-image.png")}
//                                         className={`
//               w-20 h-20 rounded-lg border-2 cursor-pointer transition-all duration-200 flex-shrink-0
//               flex items-center justify-center bg-white overflow-hidden
//               ${mainImage === img.imageUrl
//                                                 ? "border-[#E61E4D] shadow-md scale-105"
//                                                 : "border-gray-300 hover:border-gray-400"
//                                             }
//             `}
//                                     >
//                                         <img
//                                             src={img.imageUrl || "/no-image.png"}
//                                             alt={`thumb-${idx}`}
//                                             className="w-full h-full object-contain p-1"
//                                         />
//                                     </div>
//                                 ))}
//                         </div>
//                     </div>
//                 </div>

//                 {/* Right: Thông tin sản phẩm */}
//                 <div>
//                     <h1 className="text-2xl font-bold text-gray-900">{product.name} {" "}
//                         {selected?.variationName && (
//                             <span>
//                                 {selected.variationName}
//                             </span>
//                         )}
//                     </h1>

//                     {/* <p className="text-gray-600 mt-3">{product.description}</p> */}
//                     <p onClick={scrollToReview} className="text-gray-600 mt-3 cursor-pointer hover:text-red-500 transition-colors">Xem đánh giá</p>
//                     {/* 🎁 Quà tặng khuyến mãi */}

//                     <div className=" mt-6 col-span-2 bg-white border border-pink-200 rounded-lg shadow overflow-hidden">
//                         <div className="flex items-center  text-[#E61E4D] bg-[#ffe9e9ff] text-white font-semibold py-3 px-6">
//                             <FaGift className="mr-2 text-[#E61E4D]" />
//                             <span className="text-lg font-semibold text-[#E61E4D]">Quà tặng khuyến mãi</span>
//                         </div>

//                         <div>
//                             <ul className="list-disc list-inside space-y-2 text-gray-700 p-4">
//                                 <li>Giảm giá 10% cho đơn hàng tiếp theo.</li>
//                                 <li>Miễn phí vận chuyển cho đơn hàng trên 500.000₫.</li>
//                                 <li>Tặng kèm ốp lưng điện thoại cho mỗi đơn hàng.</li>

//                             </ul>
//                         </div>
//                     </div>


//                     {/* Variations */}
//                     {product.variations && product.variations.length > 0 && (
//                         <div className="mt-6">
//                             <h2 className="font-semibold mb-2">Phiên bản</h2>
//                             <div className="flex gap-3 flex-wrap">
//                                 {product.variations.map((v) => (
//                                     <button
//                                         key={v.id}
//                                         onClick={() => setSelectedVariation(v.id)}
//                                         className={`px-4 py-2 rounded-lg border cursor-pointer ${selectedVariation === v.id
//                                             ? "bg-[#E61E4D] text-white cursor-pointer"
//                                             : "bg-white text-gray-700 border-gray-300"
//                                             }`}
//                                     >
//                                         {v.variationName || `SKU ${v.sku}`}
//                                         {/* -{" "} */}
//                                         {/* {v.price.toLocaleString()}₫ */}
//                                     </button>
//                                 ))}
//                             </div>
//                         </div>
//                     )}

//                     {/* Giá */}
//                     <div className="mt-6 flex items-center">
//                         {selected?.discountType && (selected?.discountValue ?? 0) > 0 ? (
//                             <>
//                                 {/* Giá đã giảm */}
//                                 <span className="text-2xl font-bold text-[#E61E4D]">
//                                     {selected.salePrice?.toLocaleString()}₫
//                                 </span>

//                                 {/* Giá gốc */}
//                                 <span className="text-gray-500 line-through ml-3 text-lg">
//                                     {selected.price?.toLocaleString()}₫
//                                 </span>

//                                 {/* Phần trăm giảm */}
//                                 <span className="ml-3 bg-[#E61E4D] text-white text-sm font-semibold px-2 py-1 rounded">
//                                     -{selected.discountValue}{selected.discountType === "PERCENTAGE" ? "%" : "₫"}
//                                 </span>
//                             </>
//                         ) : (
//                             // Nếu không có giảm giá
//                             <span className="text-2xl font-bold text-[#E61E4D]">
//                                 {selected?.price?.toLocaleString()}₫
//                             </span>
//                         )}
//                     </div>

//                     {/* Nút hành động */}
//                     <div className="mt-6 flex gap-4">
//                         <button
//                             onClick={handleAddToCart}
//                             className="flex-1 rounded-lg border bg-white text-gray-700 border-gray-300 cursor-pointer hover:bg-gray-100 transition-colors duration-200">
//                             Thêm vào giỏ hàng
//                         </button>
//                         <button
//                             onClick={handleBuyNow}
//                             className="flex-1 bg-[#E61E4D] text-white font-semibold py-3 rounded-xl hover:bg-[#d41b46ff] cursor-pointer transition-colors duration-200">
//                             Mua ngay
//                         </button>
//                     </div>

//                     {/* Cam kết dịch vụ */}
//                     <div className="mt-6 space-y-2 text-gray-700 border-b border-gray-300 pb-5">
//                         <p className="flex items-center">
//                             <FaCheck className="mr-2" /> Bảo hành chính hãng 12 tháng.
//                         </p>
//                         <p className="flex items-center">
//                             <FaCheck className="mr-2" /> Hỗ trợ đổi mới trong 7 ngày.
//                         </p>
//                         <p className="flex items-center">
//                             <FaCheck className="mr-2" /> Miễn phí giao hàng toàn quốc.
//                         </p>
//                     </div>

//                     {/* 🎁 Khuyến mãi */}
//                     <div className=" mt-6 col-span-2 bg-white border border-gray-400 rounded-lg shadow overflow-hidden">
//                         <div className="flex items-center bg-gray-100 font-semibold py-3 px-6">
//                             <FaGift className="mr-2" />
//                             <span className="text-lg font-semibold">Khuyến mãi</span>
//                         </div>

//                         <div>
//                             <ul className="list-disc list-inside space-y-2 text-gray-700 p-4">
//                                 <li>Giảm 10% khi thanh toán qua VNPAY-QR</li>
//                                 <li>Giảm thêm 300.000đ khi mua kèm Office 365</li>
//                                 <li>Tặng Balo Laptop cao cấp Techbox trị giá 350.000đ</li>
//                             </ul>
//                         </div>
//                     </div>

//                 </div>
//             </div>

//             <div className="max-w-7xl mt-12">
//                 <h2 className="text-2xl font-bold text-gray-900 mb-6">
//                     Sản phẩm tương tự
//                 </h2>
//                 {/* <ProductList categoryId={product.categoryId} /> */}
//             </div>

//             <div className="max-w-7xl mt-10">
//                 <h2 className="text-2xl font-bold text-gray-900 mb-4">
//                     Thông tin sản phẩm
//                 </h2>

//                 <div
//                     className={`relative text-gray-700 leading-relaxed transition-all duration-200 overflow-hidden ${expanded ? "max-h-[2000px]" : "max-h-[200px]"
//                         }`}
//                 >
//                     <p className="text-gray-600">{product.description}</p>
//                     {/* --- Bảng thông tin tổng hợp --- */}
//                     {(product.attributes?.length > 0 || (selected?.attributes ?? []).length > 0) && (
//                         <div className="mt-6">
//                             <h3 className="text-xl font-semibold text-gray-800 mb-3">
//                                 Thông số kỹ thuật chi tiết:
//                             </h3>

//                             <table className="w-full border border-gray-300  border-collapse rounded-lg">
//                                 <tbody>


//                                     {/* --- Nhóm thông tin chung --- */}
//                                     {product.attributes?.length > 0 && (
//                                         <>

//                                             {product.attributes.map((attr) => (
//                                                 <tr
//                                                     key={`prod-${attr.id}`}
//                                                     className="border border-gray-200 hover:bg-gray-50 transition"
//                                                 >
//                                                     <td className="w-1/3 px-4 py-2 font-medium text-gray-700 bg-gray-100">
//                                                         {attr.name}
//                                                     </td>
//                                                     <td className="px-4 py-2 text-gray-600">
//                                                         {attr.value}
//                                                     </td>
//                                                 </tr>
//                                             ))}
//                                         </>
//                                     )}
//                                     {/* --- Nhóm thông tin biến thể (nếu có) --- */}
//                                     {(selected?.attributes ?? []).length > 0 && (
//                                         <>
//                                             {selected?.attributes.map((attr) => (
//                                                 <tr
//                                                     key={`var-${attr.id}`}
//                                                     className="border border-gray-200 hover:bg-gray-50 transition"
//                                                 >
//                                                     <td className="w-1/3 px-4 py-2 font-medium text-gray-700 bg-gray-100">
//                                                         {attr.name}
//                                                     </td>
//                                                     <td className="px-4 py-2 text-gray-600">
//                                                         {attr.value}
//                                                     </td>
//                                                 </tr>
//                                             ))}
//                                         </>
//                                     )}
//                                 </tbody>
//                             </table>
//                         </div>
//                     )}

//                     {/* Gradient fade effect khi chưa mở rộng */}
//                     {!expanded && (
//                         <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent pointer-events-none" />
//                     )}
//                 </div>

//                 <div className="flex justify-center mt-4">
//                     <span
//                         onClick={() => setExpanded(!expanded)}
//                         className="text-[#E61E4D] hover:text-[#d41b46ff] cursor-pointer text-base font-medium transition-colors duration-200"
//                     >
//                         {expanded ? "Thu gọn" : "Xem thêm"}
//                     </span>
//                 </div>

//                 {/* Danh sách bình luận */}
//                 <div ref={reviewRef} className="max-w-7xl mt-10">
//                     <h2 className="text-2xl font-bold text-gray-900 mb-6">Đánh giá & Nhận xét</h2>

//                     <div className="grid md:grid-cols-3 gap-10">
//                         {/* CỘT TRÁI: Tổng quan */}
//                         <div className="md:col-span-1">
//                             {summaryLoading ? (
//                                 <p>Đang tải...</p>
//                             ) : (
//                                 <>
//                                     {/* Rating Tổng */}
//                                     <div className="text-center mb-6">
//                                         <div className="text-5xl font-bold text-[#E61E4D]">
//                                             {summary?.averageRating.toFixed(1) ?? "0.0"}
//                                         </div>

//                                         <div className="flex justify-center mt-2">
//                                             {Array.from({ length: 5 }).map((_, i) => (
//                                                 <FaStar
//                                                     key={i}
//                                                     size={20}
//                                                     className={
//                                                         i < Math.round(summary?.averageRating ?? 0)
//                                                             ? "text-yellow-400 fill-yellow-400"
//                                                             : "text-gray-300"
//                                                     }
//                                                 />
//                                             ))}
//                                         </div>

//                                         <p className="text-gray-500 mt-1">
//                                             Dựa trên <span className="font-semibold">{summary?.totalReviews ?? 0}</span> đánh giá
//                                         </p>
//                                     </div>

//                                     {/* Biểu đồ rating */}
//                                     <div className="space-y-2">
//                                         {[5, 4, 3, 2, 1].map((star) => {
//                                             const count = summary?.[`rating${star}Count` as keyof ReviewSummary] as number;
//                                             const percent = getPercent(count);

//                                             return (
//                                                 <div key={star} className="flex items-center gap-2 text-sm">
//                                                     <span className="w-12 font-medium">{star} sao</span>

//                                                     <div className="flex-1 bg-gray-200 rounded-full h-2 overflow-hidden">
//                                                         <div
//                                                             className="bg-yellow-400 h-full transition-all duration-300"
//                                                             style={{ width: `${percent}%` }}
//                                                         />
//                                                     </div>

//                                                     <span className="w-10 text-right text-gray-600">{percent.toFixed(2)}%</span>
//                                                 </div>
//                                             );
//                                         })}
//                                     </div>
//                                 </>
//                             )}
//                         </div>

//                         {/* CỘT PHẢI: Danh sách đánh giá */}
//                         <div className="md:col-span-2">
//                             {/* NÚT VIẾT ĐÁNH GIÁ */}
//                             {/* <button
//                                 onClick={() => {
//                                     if (!user) {
//                                         toast.error("Vui lòng đăng nhập để đánh giá!");
//                                         // router.push("/login");
//                                         return;
//                                     }
//                                     setIsReviewModalOpen(true);
//                                 }}
//                                 className="px-5 py-2 bg-[#E61E4D] text-white rounded-lg hover:bg-[#d41b46] transition text-sm font-medium cursor-pointer mb-6"
//                             >
//                                 Viết đánh giá
//                             </button> */}
//                             <button
//                                 onClick={() => {
//                                     if (!user) {
//                                         toast.error("Vui lòng đăng nhập để đánh giá!");
//                                         return;
//                                     }
//                                     if (myReview) {
//                                         toast.info("Bạn đã đánh giá sản phẩm này rồi!");
//                                         return;
//                                     }
//                                     setIsReviewModalOpen(true);
//                                 }}
//                                 disabled={!!myReview || !user}
//                                 className={`
//     px-5 py-2 rounded-lg transition text-sm font-medium cursor-pointer mb-6
//     ${myReview || !user
//                                         ? "bg-gray-300 text-gray-500 cursor-not-allowed"
//                                         : "bg-[#E61E4D] text-white hover:bg-[#d41b46]"
//                                     }
//   `}
//                             >
//                                 {myReview ? "Đã đánh giá" : "Viết đánh giá"}
//                             </button>
//                             {reviewsLoading ? (
//                                 <p>Đang tải đánh giá...</p>
//                             ) : reviews.length === 0 ? (
//                                 <p className="text-gray-500 italic">Chưa có đánh giá nào.</p>
//                             ) : (
//                                 <div className="space-y-6">
//                                     {reviews.map((r) => {
//                                         const isMyReview = myReview?.id === r.id;

//                                         return (
//                                             <div key={r.id} className="border-b border-gray-200 pb-4 last:border-0">
//                                                 <div className="flex items-center justify-between mb-1">
//                                                     <div className="flex items-center gap-2">
//                                                         <span className="font-semibold">{r.userFullName}</span>
//                                                         <div className="flex">
//                                                             {Array.from({ length: 5 }).map((_, i) => (
//                                                                 <FaStar
//                                                                     key={i}
//                                                                     size={13}
//                                                                     className={
//                                                                         i < r.rating
//                                                                             ? "text-yellow-400 fill-yellow-400"
//                                                                             : "text-gray-300"
//                                                                     }
//                                                                 />
//                                                             ))}
//                                                         </div>
//                                                     </div>
//                                                     <div className="flex items-center gap-2">
//                                                         {/* Nút Chỉnh sửa & Xóa chỉ hiện nếu là review của mình */}
//                                                         {isMyReview && (
//                                                             <div className="flex gap-1">
//                                                                 <button
//                                                                     onClick={() => handleEditReview(r)}
//                                                                     className="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1 cursor-pointer"
//                                                                 >
//                                                                     <Edit size={15} />
//                                                                 </button>
//                                                                 <button
//                                                                     onClick={() => handleDeleteReview(r.id)}
//                                                                     className="text-red-600 hover:text-red-800 text-sm flex items-center gap-1 cursor-pointer"
//                                                                 >
//                                                                     <Trash size={15} />
//                                                                 </button>
//                                                             </div>
//                                                         )}
//                                                         <span className="text-xs text-gray-400">
//                                                             {new Date(r.createdAt).toLocaleDateString("vi-VN")}
//                                                         </span>


//                                                     </div>
//                                                 </div>
//                                                 <p className="text-gray-700 text-sm leading-relaxed">{r.content}</p>
//                                             </div>
//                                         );
//                                     })}
//                                 </div>
//                             )}

//                             {/* PHÂN TRANG */}
//                             {pageInfo && pageInfo.totalPages > 1 && (
//                                 <div className="flex justify-center items-center gap-4 mt-10">
//                                     <button
//                                         onClick={() => setPage((p) => Math.max(0, p - 1))}
//                                         disabled={page === 0}
//                                         className="
//                             p-2 rounded-lg border bg-white 
//                             hover:bg-gray-50 
//                             disabled:opacity-50 disabled:cursor-not-allowed
//                         "
//                                     >
//                                         <FaChevronLeft size={16} />
//                                     </button>

//                                     <span className="text-sm font-medium text-gray-700">
//                                         Trang {page + 1} / {pageInfo.totalPages}
//                                     </span>

//                                     <button
//                                         onClick={() =>
//                                             setPage((p) => Math.min(pageInfo.totalPages - 1, p + 1))
//                                         }
//                                         disabled={page >= pageInfo.totalPages - 1}
//                                         className="
//                             p-2 rounded-lg border bg-white 
//                             hover:bg-gray-50 
//                             disabled:opacity-50 disabled:cursor-not-allowed
//                         "
//                                     >
//                                         <FaChevronRight size={16} />
//                                     </button>
//                                 </div>
//                             )}
//                         </div>
//                     </div>
//                 </div>

//             </div>
//             {/* <ReviewModal
//                 productId={id}
//                 isOpen={isReviewModalOpen}
//                 onClose={() => setIsReviewModalOpen(false)}
//                 onSuccess={handleReviewSuccess}
//             /> */}
//             <ReviewModal
//                 productId={id}
//                 isOpen={isReviewModalOpen}
//                 onClose={() => {
//                     setIsReviewModalOpen(false);
//                     setEditingReview(null);
//                 }}
//                 onSuccess={async () => {
//                     toast.success(editingReview ? "Cập nhật thành công!" : "Cảm ơn bạn đã đánh giá!");
//                     await Promise.all([
//                         mutateReviews(),
//                         mutateSummary(),
//                         mutateMyReview(),
//                     ]);
//                     setIsReviewModalOpen(false);
//                     setEditingReview(null);
//                     setPage(0);
//                 }}
//                 initialData={editingReview}
//             />
//         </>
//     );
// }


import { notFound } from 'next/navigation';
import ProductDetailClient from './ProductDetailClient';
import React from 'react';
import ProductSection from '@/components/ProductSection';

const baseUrl =  (process.env.SPRING_BACKEND_URL || 'http://localhost:8080') + '/api';

export default async function ProductDetailPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    const productId = Number(id);
    if (isNaN(productId)) notFound();

    const res = await fetch(`${baseUrl}/products/${id}`, {
        cache: 'no-store'
    });
    const product = await res.json();

    if (!product) notFound();
    return (
        <>
            <ProductDetailClient initialProduct={product} />

            <div className="max-w-7xl mt-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    Sản phẩm tương tự
                </h2>
                <ProductSection categoryId={product.categoryId} />
            </div>
        </>
    );
}