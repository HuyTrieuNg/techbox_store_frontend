// "use client";

// import React from "react";
// import ProductCard from "@/components/ProductCard";
// import { useProducts } from "@/hooks/useProduct";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/navigation";
// import "@/styles/SwiperCustom.css";
// import { useWishlist } from "@/hooks/useWishList";

// interface Props {
//   categoryId: number;
// }

// const ProductList: React.FC<Props> = ({ categoryId }) => {
//   const { products, isLoading, error } = useProducts({
//     categoryId,
//     sortBy: "id",
//     sortDirection: "ASC",
//     page: 0,
//     size: 20,
//   });

//   const { wishlistIds } = useWishlist();

//   if (isLoading) return <div className="text-gray-600 dark:text-gray-400">Đang tải sản phẩm...</div>;
//   if (error) return <div className="text-red-500 dark:text-red-400">Lỗi khi tải danh sách sản phẩm.</div>;
//   if (products.length === 0) return <div className="text-gray-600 dark:text-gray-400">Không có sản phẩm nào trong danh mục này.</div>;

//   return (
//     <div className="w-full">
//       <Swiper
//         modules={[Navigation]}
//         slidesPerView={5}
//         spaceBetween={10}
//         navigation={true}
//         loop={true}
//         autoplay={false}
//       >
//         {products.map((product) => (
//           <SwiperSlide key={product.id}>
//             {/* <ProductCard product={product} /> */}
//             <ProductCard
//               key={product.id}
//               product={{
//                 ...product,
//                 inWishlist: wishlistIds.has(product.id),
//               }}
//             />
//           </SwiperSlide>
//         ))}
//       </Swiper>
//     </div>
//   );
// };

// export default ProductList;

"use client";

import React from "react";
import ProductCard from "@/components/ProductCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "@/styles/SwiperCustom.css";
import { useWishlist } from "@/hooks/useWishList";

interface Props {
  products: any[];
  noSwiper?: boolean;
}

const ProductList: React.FC<Props> = ({ products, noSwiper }) => {
  const { wishlistIds } = useWishlist();

  if (!products || products.length === 0)
    return <div className="text-gray-600 dark:text-gray-400">Không có sản phẩm nào.</div>;

  if (noSwiper) {
    return (
      <div className="grid grid-cols-5 gap-2.5">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={{
              ...product,
              inWishlist: wishlistIds.has(product.id),
            }}
          />
        ))}
      </div>
    );
  }
  return (
    <div className="w-full">
      <Swiper
        modules={[Navigation]}
        slidesPerView={5}
        spaceBetween={10}
        navigation
        loop
      >
        {products.map((product) => (
          <SwiperSlide key={product.id}>
            <ProductCard
              product={{
                ...product,
                inWishlist: wishlistIds.has(product.id),
              }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ProductList;
