// import React from "react";
// import { Product } from "@/features/product";
// import { FaStar } from "react-icons/fa";
// import Link from "next/link";

// interface Props {
//   product: Product;
// }
// const formatPrice = (price: number) =>
//   price.toLocaleString("vi-VN", { style: "currency", currency: "VND" });

// const ProductCard: React.FC<Props> = ({ product }) => {
//   return (
//     <div className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-md p-3 flex flex-col hover:shadow-lg transition cursor-pointer">
//       <Link href={`/product/${product.id}`}>
//         <img
//           src={product.imageUrl || "/images/placeholder.png"}
//           alt={product.name}
//           className="w-full h-48 object-contain mb-3"
//         />
//         <h3 className="text-gray-800 dark:text-white font-bold mt-2 line-clamp-2">{product.name}</h3>

//         {/* Thông số ngắn gọn */}
//         {/* <p className="text-sm text-gray-600 mt-1 mb-2">
//         <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded-md inline-block">
//           {shortSpecs.join(" | ")}
//         </span>
//       </p> */}

//         <p className="text-gray-400 dark:text-gray-500 line-through text-xs mt-2"> {product.displayOriginalPrice
//           ? formatPrice(product.displayOriginalPrice)
//           : ""}</p>
//         <p className="text-[#E61E4D] font-bold mt-2">
//           {/* {product.variations && product.variations.length > 0
//           ? formatPrice(product.variations[0].price)
//           : "Liên hệ"} */}
//           {product.displaySalePrice
//             ? formatPrice(product.displaySalePrice)
//             : "Liên hệ"}
//         </p>

//         {/* Rating */}
//         {/* <div className="flex items-center gap-1 mt-2 mb-2">
//         {[...Array(5)].map((_, i) => (
//           <FaStar
//             key={i}
//             className={i < 4 ? "text-yellow-400" : "text-gray-300"}
//           />
//         ))}
//         <span className="text-sm text-gray-500 ml-1">(120)</span>
//       </div> */}
//         {/* Rating (1 sao + số trung bình) */}
//         {/* <div className="flex items-center gap-1 mt-2 mb-2">
//           <span className="text-sm text-gray-700 font-medium">{product.averageRating.toFixed(1)}</span>
//           <FaStar size={13} className="text-yellow-400" />
//           <span className="text-sm text-gray-500 ml-1">({product.totalRatings} đánh giá)</span>
//         </div> */}
//         <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400 mt-2 mb-2">
//           <FaStar className="text-yellow-400" />
//           <span>{product.averageRating.toFixed(1)}</span>
//           <span>({product.totalRatings} đánh giá)</span>
//         </div>
//         {/* <button className="mt-auto bg-[#E61E4D] text-white py-2 rounded-lg hover:bg-[#c71a3f] transition cursor-pointer">
//         Thêm vào giỏ
//       </button> */}
//       </Link>
//     </div>
//   );
// };

// export default ProductCard;


// components/ProductCard.tsx
import React from "react";
import { Product } from "@/features/product";
import { FaStar, FaHeart, FaRegHeart } from "react-icons/fa";
import Link from "next/link";
import { useWishlist } from "@/hooks/useWishList";


// Nếu bạn truyền inWishlist từ ngoài vào (Server Component) thì dùng interface này
// interface Props { product: Product & { inWishlist?: boolean }; }

// Nếu dùng hook (Client Component) thì không cần inWishlist trong props
// interface Props {
//   product: Product;
// }
interface Props {
  product: any & { inWishlist?: boolean }; // Nhận từ ProductList
}

const formatPrice = (price: number) =>
  price.toLocaleString("vi-VN", { style: "currency", currency: "VND" });

const ProductCard: React.FC<Props> = ({ product }) => {
  // ------------------- 2. DỮ LIỆU WISHLIST -------------------
  const { wishlistIds, toggleWishlist, isLoading } = useWishlist(); // <-- LẤY STATE
  const isInWishlist = wishlistIds.has(product.id);               // <-- KIỂM TRA

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-md p-3 flex flex-col hover:shadow-lg transition cursor-pointer relative">
      {/* ------------------- 3. NÚT TRÁI TIM ------------------- */}
      <button
        onClick={(e) => {
          e.preventDefault();   // ngăn Link chuyển trang
          e.stopPropagation();
          if (!isLoading) toggleWishlist(product.id);
        }}
        disabled={isLoading}
        className="absolute top-2 right-2 p-2 rounded-full bg-white shadow-md hover:scale-110 transition disabled:opacity-50 cursor-pointer"
        aria-label={isInWishlist ? "Xóa khỏi wishlist" : "Thêm vào wishlist"}
      >
        {isLoading ? (
          <div className="w-5 h-5 border-2 border-gray-300 border-t-red-500 rounded-full animate-spin" />
        ) : isInWishlist ? (
          <FaHeart className="text-red-500" size={18} />
        ) : (
          <FaRegHeart className="text-gray-600" size={18} />
        )}
      </button>

      {/* ------------------- NỘI DUNG SẢN PHẨM ------------------- */}
      <Link href={`/product/${product.id}`} className="flex flex-col flex-1">
        <img
          src={product.imageUrl || "/images/placeholder.png"}
          alt={product.name}
          className="w-full h-48 object-contain mb-3"
        />
        <h3 className="text-gray-800 dark:text-white font-bold mt-2 line-clamp-2">
          {product.name}
        </h3>

        <p className="text-gray-400 dark:text-gray-500 line-clamp-1 text-xs mt-2">
          {product.displayOriginalPrice ? formatPrice(product.displayOriginalPrice) : ""}
        </p>

        <p className="text-[#E61E4D] font-bold mt-2">
          {product.displaySalePrice ? formatPrice(product.displaySalePrice) : "Liên hệ"}
        </p>

        <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400 mt-2 mb-2">
          <FaStar className="text-yellow-400" />
          <span>{product.averageRating.toFixed(1)}</span>
          <span>({product.totalRatings} đánh giá)</span>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;