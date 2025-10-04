"use client";

import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Product } from "@/features/product"; // import interface
import { products } from "@/data/products"; // mock data
import { FaCheck, FaChevronLeft, FaChevronRight, FaGift, FaHome, FaStar } from "react-icons/fa";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = React.use(params);
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedVariation, setSelectedVariation] = useState<number | null>(null);
  const [mainImage, setMainImage] = useState<string>("");
  const [related, setRelated] = useState<Product[]>([]);
  const [index, setIndex] = useState(0); // vị trí hiện tại
  const [expanded, setExpanded] = useState(false);
  const [reviews, setReviews] = useState([
    { id: 1, name: "Nguyễn Văn A", rating: 5, comment: "Sản phẩm rất tốt, đáng tiền!", date: "28/09/2025" },
    { id: 2, name: "Trần Thị B", rating: 4, comment: "Hàng ok, giao nhanh, đóng gói cẩn thận.", date: "29/09/2025" },
  ]);

  useEffect(() => {
    const p = products.find((item) => item.slug === name);
    if (p) {
      setProduct(p);
      setMainImage(p.image_url || "/no-image.png");

      // mặc định chọn variation đầu tiên nếu có
      if (p.variations && p.variations.length > 0) {
        setSelectedVariation(p.variations[0].id);
      }

      // sản phẩm tương tự theo category
      const rel = products.filter(
        (item) => item.category_id === p.category_id && item.id !== p.id
      );
      setRelated(rel);
    }
  }, [name]);

  // if (!product) {
  //   return <p className="text-center text-gray-600 mt-10">Product not found</p>;
  // }
  //   const relatedProducts = products.filter(
  //   (p) => p.category_id === product.category_id && p.id !== product.id
  // );

  if (!product) {
    return <p className="text-center text-gray-600 mt-10">Product not found</p>;
  }
  const relatedProducts = products.filter(
    (p) => p.category_id === product.category_id && p.id !== product.id
  );


  const itemsPerPage = 4;

  const maxIndex = Math.max(0, relatedProducts.length - itemsPerPage);

  const nextSlide = () => {
    setIndex((prev) => Math.min(prev + 1, maxIndex));
  };

  const prevSlide = () => {
    setIndex((prev) => Math.max(prev - 1, 0));
  };

  if (!relatedProducts.length) return null;

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
        <span className="font-medium text-gray-800 capitalize">{product.name}</span>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-10 grid md:grid-cols-2 gap-10">
        {/* Left: Hình ảnh */}
        <div>
          {/* Ảnh lớn */}
          <img
            src={mainImage}
            alt={product.name}
            className="rounded-xl shadow-lg w-full mb-4"
          />

          {/* Ảnh nhỏ (thumbnail) */}
          <div className="flex gap-3">
            {[product.image_url, ...(product.gallery || [])].map((img, idx) => (
              <img
                key={idx}
                src={img || "/no-image.png"}
                alt={`thumb-${idx}`}
                onClick={() => setMainImage(img || "/no-image.png")}
                className={`w-20 h-20 object-cover rounded-lg border cursor-pointer transition ${mainImage === img
                  ? "border-[#E61E4D] shadow-md"
                  : "border-gray-300"
                  }`}
              />
            ))}
          </div>
        </div>

        {/* Right: Thông tin sản phẩm */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
          {/* <p className="text-gray-600 mt-3">{product.description}</p> */}
          <p className="text-gray-600 mt-3">Xem đánh giá</p>
          {/* 🎁 Quà tặng khuyến mãi */}
          {product.promotions && product.promotions.length > 0 && (
            <div className="mt-6 bg-[#ffe9e9ff] border border-pink-200 rounded-xl p-4">
              <div className="flex items-center text-[#E61E4D] mb-3">
                <FaGift className="mr-2" />
                <h2 className="text-lg font-semibold">Quà tặng khuyến mãi</h2>
              </div>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                {product.promotions.map((gift, idx) => (
                  <li key={idx}>{gift}</li>
                ))}
              </ul>
            </div>
          )}

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
                    {v.variation_name || `SKU ${v.sku}`} -{" "}
                    {v.price.toLocaleString()}₫
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Giá */}
          <div className="mt-6">
            <span className="text-2xl font-bold text-[#E61E4D]">
              {selectedVariation
                ? product.variations
                  ?.find((v) => v.id === selectedVariation)
                  ?.price.toLocaleString()
                : product.variations?.[0]?.price.toLocaleString()}
              ₫
            </span>
          </div>

          {/* Nút hành động */}
          <div className="mt-6 flex gap-4">
            <button className="flex-1 rounded-lg border bg-white text-gray-700 border-gray-300 cursor-pointer hover:bg-gray-100 transition-colors duration-200">
              Thêm vào giỏ hàng
            </button>
            <button className="flex-1 bg-[#E61E4D] text-white font-semibold py-3 rounded-xl hover:bg-[#d41b46ff] cursor-pointer transition-colors duration-200">
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
          {product.promotions && product.promotions.length > 0 && (
            <div className="mt-6  bg-grey-100 border border-[#E61E4D] rounded-xl p-4">
              <div className="flex items-center text-[#E61E4D] mb-3">
                <FaGift className="mr-2" />
                <h2 className="text-lg font-semibold">Khuyến mãi</h2>
              </div>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                {product.promotions.map((gift, idx) => (
                  <li key={idx}>{gift}</li>
                ))}
              </ul>
            </div>
          )}


        </div>
      </div>
      {/* 🔥 Sản phẩm tương tự */}
      {/* {related.length > 0 && (
        <div className="max-w-6xl mx-auto px-6 mt-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">
            Sản phẩm tương tự
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {related.map((item) => (
              <Link
                key={item.id}
                href={`/product/${item.name}`}
                className="border rounded-xl p-4 hover:shadow-md transition bg-white"
              >
                <img
                  src={item.image_url || "/no-image.png"}
                  alt={item.name}
                  className="rounded-lg w-full h-40 object-cover mb-3"
                />
                <h3 className="font-medium text-gray-800 line-clamp-2">
                  {item.name}
                </h3>
                <p className="text-[#E61E4D] font-bold mt-2">
                  {item.variations?.[0]?.price.toLocaleString()}₫
                </p>
              </Link>
            ))}
          </div>
        </div>
      )} */}
      {/* Sản phẩm tương tự */}
      {/* {relatedProducts.length > 0 && (
        <div className="max-w-6xl mx-auto px-6 mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Sản phẩm tương tự
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {relatedProducts.map((rp) => (
              <ProductCard key={rp.id} product={rp} />
            ))}
          </div>
        </div>
      )} */}

      <div className="max-w-6xl mx-auto px-6 mt-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Sản phẩm tương tự
        </h2>

        <div className="relative">
          {/* Nút trái */}
          {index > 0 && (
            <button
              onClick={prevSlide}
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-white shadow-md p-3 rounded-full z-10 hover:bg-gray-100"
            >
              <FaChevronLeft />
            </button>
          )}

          {/* Container */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500"
              style={{ transform: `translateX(-${index * (100 / itemsPerPage)}%)` }}
            >
              {relatedProducts.map((rp) => (
                <div key={rp.id} className="min-w-[25%] px-2">
                  <ProductCard product={rp} />
                </div>
              ))}
            </div>
          </div>

          {/* Nút phải */}
          {index < maxIndex && (
            <button
              onClick={nextSlide}
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-white shadow-md p-3 rounded-full z-10 hover:bg-gray-100"
            >
              <FaChevronRight />
            </button>
          )}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 mt-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Thông tin sản phẩm
        </h2>

        <div
          className={`relative text-gray-700 leading-relaxed transition-all duration-200 overflow-hidden ${expanded ? "max-h-[2000px]" : "max-h-[200px]"
            }`}
        >
          <p className="text-gray-600">{product.description}</p>
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
        <div className="max-w-6xl mx-auto mt-10">
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
                          className={i < r.rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}
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
