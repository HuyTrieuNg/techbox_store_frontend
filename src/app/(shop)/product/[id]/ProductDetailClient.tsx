"use client";

import { useState, useEffect, useRef } from "react";
import { FaHome, FaChevronRight } from "react-icons/fa";
import Link from "next/link";

import ReviewModal from "@/components/AddReview";
import { useAuthContext } from "@/contexts/AuthContext";
import { toast } from "sonner";
import ProductImages from "./ProductImage";
import ProductInfo from "./ProductInfo";
import ProductDescription from "./ProductDescription";
import ProductReviewsSection from "./ProductReview";
import { useProductReviews } from "@/hooks/useReview";
import { useMyReview } from "@/hooks/useMyReview";
import { useReviewSummary } from "@/hooks/useReviewSummary";
import PersonalizedRecommendation from "@/components/PersonalizedRecommendation";

export default function ProductDetailClient({ initialProduct }: { initialProduct: any }) {
    const { user } = useAuthContext();
    const [selectedVariation, setSelectedVariation] = useState<number | null>(null);
    const [mainImage, setMainImage] = useState<string>("");
    const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
    const [editingReview, setEditingReview] = useState<any>(null);
    const [page, setPage] = useState(0);
    const reviewRef = useRef<HTMLDivElement>(null);

    const product = initialProduct;

    const { reviews, pageInfo, isLoading: reviewsLoading, mutate: mutateReviews } = useProductReviews(product.id, page, 5);
    const { myReview, mutate: mutateMyReview } = useMyReview(product.id);
    const { summary, isLoading: summaryLoading, mutate: mutateSummary } = useReviewSummary(product.id);

    useEffect(() => {
        if (product) {
            setMainImage(product.imageUrl || "/no-image.png");

            if (product.variations && product.variations.length > 0) {
                setSelectedVariation(product.variations[0].id);
            }
        }
    }, [product]);

    useEffect(() => {
        if (selectedVariation && product?.variations) {
            const variation = product.variations.find((v: any) => v.id === selectedVariation);
            if (variation && variation.images.length > 0) {
                // Đổi ảnh chính thành ảnh đầu tiên của biến thể
                setMainImage(variation.images[0].imageUrl);
            } else {
                // Nếu biến thể không có ảnh riêng, dùng ảnh mặc định của sản phẩm
                setMainImage(product.imageUrl || "/no-image.png");
            }
        }
    }, [selectedVariation, product]);

    const selected = selectedVariation
        ? product.variations?.find((v: any) => v.id === selectedVariation)
        : product.variations?.[0];

    const openReviewModal = () => {
        if (!user) return toast.error("Vui lòng đăng nhập để đánh giá!");
        if (myReview) return toast.info("Bạn đã đánh giá sản phẩm này rồi!");
        setIsReviewModalOpen(true);
    };

    const handleReviewSuccess = async () => {
        await Promise.all([mutateReviews(), mutateSummary(), mutateMyReview()]);
        setIsReviewModalOpen(false);
        setEditingReview(null);
        setPage(0);
    };

    return (
        <>
            {/* Breadcrumb */}
            <div className="flex items-center text-gray-600 text-base mb-6">
                <FaHome className="mr-2 text-gray-500" />
                <Link href="/" className="hover:text-[#E61E4D] transition">Trang chủ</Link>
                <FaChevronRight className="mx-2 text-gray-400" />
                <span className="font-medium text-gray-700 hover:text-[#E61E4D] capitalize"><Link href={`/products/${product.categoryId}`}>{product.categoryName}</Link></span>
                <FaChevronRight className="mx-2 text-gray-400" />
                <span className="font-medium text-gray-700 hover:text-[#E61E4D] capitalize"><Link href={`/brand/${product.brandId}`}>{product.brandName}</Link></span>
                <FaChevronRight className="mx-2 text-gray-400" />
                <span className="font-medium text-gray-700 capitalize">{product.name}</span>
            </div>

            {/* Main Grid */}
            <div className="max-w-7xl grid md:grid-cols-2 gap-10">
                <ProductImages
                    product={product}
                    selected={selected}
                    mainImage={mainImage}
                    setMainImage={setMainImage}
                />

                <ProductInfo
                    product={product}
                    selected={selected}
                    selectedVariation={selectedVariation}
                    setSelectedVariation={setSelectedVariation}
                />
            </div>

            {/* Mô tả & Thông số */}
            <ProductDescription product={product} selected={selected} />

            {/* Đánh giá */}
            <div ref={reviewRef}>
                <ProductReviewsSection
                    summary={summary}
                    summaryLoading={summaryLoading}
                    reviews={reviews}
                    reviewsLoading={reviewsLoading}
                    pageInfo={pageInfo}
                    myReview={myReview}
                    page={page}
                    setPage={setPage}
                    onOpenReview={openReviewModal}
                    onEditReview={(r) => {
                        setEditingReview(r);
                        setIsReviewModalOpen(true);
                    }}
                    onDeleteSuccess={async () => {
                        mutateMyReview(null, { revalidate: false });

                        await Promise.all([
                            mutateReviews(),
                            mutateSummary(),
                            mutateMyReview(),
                        ]);
                    }}
                />
            </div>

            {/* Modal viết/sửa đánh giá */}
            <ReviewModal
                productId={product.id}
                isOpen={isReviewModalOpen}
                onClose={() => {
                    setIsReviewModalOpen(false);
                    setEditingReview(null);
                }}
                onSuccess={handleReviewSuccess}
                initialData={editingReview}

            />

            {/* Gợi ý cho bạn */}
            <PersonalizedRecommendation currentSpu={product.spu} />
        </>
    );
}