// dùng hook để lấy dữ liệu từ API
// import React from "react";
// import ProductCard from "@/components/ProductCard";
// import { useProducts } from "@/hooks/useProduct";

// const ProductList: React.FC = () => {
//   const { products, loading, error } = useProducts();

//   if (loading) return <p>Đang tải sản phẩm...</p>;
//   if (error) return <p className="text-red-500">Lỗi: {error}</p>;

//   return (
//     <div className="grid grid-cols-4 gap-4">
//       {products.map((product) => (
//         <ProductCard key={product.id} product={product} />
//       ))}
//     </div>
//   );
// };

// export default ProductList;


// dùng dữ liệu mẫu
import React, { useEffect, useState } from "react";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products"; // dữ liệu mẫu
import { Product } from "@/features/product";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "@/styles/SwiperCustom.css";

interface Props {
  category_id: number;
}

const ProductList: React.FC<Props> = ({ category_id }) => {
  const filteredProducts = products.filter(
    (p: Product) => p.category_id === category_id
  );

  return (
    // <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
    //   {filteredProducts.map((product) => (
    //     <ProductCard key={product.id} product={product} />
    //   ))}
    // </div>

    <Swiper
      modules={[Navigation]}
      slidesPerView={5}
      spaceBetween={10}
      navigation={true }
      loop={true}
      autoplay={false}
    >
      {filteredProducts.map((product) => (
        <SwiperSlide key={product.id}>
          <ProductCard product={product} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};


export default ProductList;
