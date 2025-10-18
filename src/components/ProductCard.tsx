import React from "react";
import { Product } from "@/features/product";
import { FaStar } from "react-icons/fa";
import Link from "next/link";

interface Props {
  product: Product;
}
const formatPrice = (price: number) =>
  price.toLocaleString("vi-VN", { style: "currency", currency: "VND" });

const ProductCard: React.FC<Props> = ({ product }) => {
  const averageRating =
    product.ratings && product.ratings.length > 0
      ? product.ratings.reduce((sum, r) => sum + r, 0) / product.ratings.length
      : 0;

  const shortSpecs = product.specs ?? ["i5 12400F", "16GB", "15.6 inch FHD", "RTX 3050", "144 Hz"];
  return (
    <div className="bg-white border border-gray-300 rounded-md shadow-md p-3 flex flex-col hover:shadow-lg transition cursor-pointer">
      <Link href={`/product/${product.slug}`}>
      <img
        src={product.image_url}
        alt={product.name}
        className="w-full h-48 object-contain mb-3"
      />
      <h3 className="text-gray-800 font-bold text-lg">{product.name}</h3>
      {/* Thông số ngắn gọn */}
      <p className="text-sm text-gray-600 mt-1 mb-2">
        <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded-md inline-block">
          {shortSpecs.join(" | ")}
        </span>
      </p>
      <p className="text-[#E61E4D] font-bold mt-2">
        {product.variations && product.variations.length > 0
          ? formatPrice(product.variations[0].price)
          : "Liên hệ"}</p>
      {/* Rating */}
      {/* <div className="flex items-center gap-1 mt-2 mb-2">
        {[...Array(5)].map((_, i) => (
          <FaStar
            key={i}
            className={i < 4 ? "text-yellow-400" : "text-gray-300"}
          />
        ))}
        <span className="text-sm text-gray-500 ml-1">(120)</span>
      </div> */}
      {/* Rating (1 sao + số trung bình) */}
      <div className="flex items-center gap-1 mt-2 mb-2">
        <span className="text-sm text-gray-700 font-medium">{averageRating.toFixed(1)}</span>
        <FaStar size={13} className="text-yellow-400" />
        <span className="text-sm text-gray-500 ml-1">(120 đánh giá)</span>
      </div>
      {/* <button className="mt-auto bg-[#E61E4D] text-white py-2 rounded-lg hover:bg-[#c71a3f] transition cursor-pointer">
        Thêm vào giỏ
      </button> */}
      </Link>
    </div>
  );
};

export default ProductCard;