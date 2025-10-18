// // components/FlashSaleSection.tsx
// import React from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import { Autoplay } from "swiper/modules";
// import ProductCardFlashSale from "./ProductCartFlashSale";
// import Countdown from "./Coundown";

// const FlashSaleSection = ({ products }: { products: any[] }) => {
//     return (
//         <section className="bg-[#0568d6] py-6 px-4 rounded-sm">
//             {/* Header Flash Sale */}
//             <div className="flex justify-between items-center mb-4">
//                 <div className="flex items-center gap-2">
//                     {/* <div className="flex gap-2 bg-white text-black px-3 py-1 rounded-md font-semibold">
//                         <span>00</span>:<span>22</span>:<span>16</span>:<span>31</span>
//                     </div> */}
//                     <Countdown />
//                     <span className="text-yellow-400 font-bold text-lg">⚡ FLASH SALE 10H MỖI NGÀY</span>
//                 </div>
//                 <button className="bg-white text-black px-4 py-2 rounded-md">
//                     15/10
//                 </button>
//             </div>

//             {/* Slider sản phẩm */}
//             <Swiper
//                 modules={[Autoplay]}
//                 slidesPerView={5}
//                 spaceBetween={16}
//                 autoplay={{ delay: 3000 }}
//                 loop
//             >
//                 {products.map((p) => (
//                     <SwiperSlide key={p.id}>
//                         <ProductCardFlashSale product={p} />
//                     </SwiperSlide>
//                 ))}
//             </Swiper>

//             <div className="flex justify-center mt-4">
//                 <button className="bg-[#00ADEF] text-white px-4 py-2 rounded-md hover:bg-[#0088cc] transition">
//                     Xem thêm khuyến mãi
//                 </button>
//             </div>
//         </section>
//     );
// };

// export default FlashSaleSection;


import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import ProductCardFlashSale from "./ProductCartFlashSale";
import Countdown from "./Coundown";

// Format current date to Vietnamese format (DD/MM)
const currentDate = new Date().toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
});

const FlashSaleSection = ({ products }: { products: any[] }) => {
    return (
        <section className="bg-[#0568d6] rounded-sm">
            {/* Header Flash Sale */}
            <div className="bg-[#003bb8] flex justify-between items-center py-4 px-4 rounded-sm">
                <div className="flex items-center gap-2">
                    <Countdown />
                    <span className="text-[#ffee12] font-extrabold italic text-2xl">⚡ FLASH SALE 10H MỖI NGÀY</span>
                </div>
                <button className="bg-white text-black px-4 py-2 rounded-md">
                    {currentDate}
                </button>
            </div>

            <div className="py-6 px-4">


                {/* Slider sản phẩm */}
                <Swiper
                    modules={[Autoplay]}
                    slidesPerView={6}
                    spaceBetween={10}
                    autoplay={{ delay: 3000 }}
                    loop
                >
                    {products.map((p) => (
                        <SwiperSlide key={p.id}>
                            <ProductCardFlashSale product={p} />
                        </SwiperSlide>
                    ))}
                </Swiper>

                {/* Centered Xem thêm khuyến mãi button */}
                <div className="flex justify-center mt-4">
                    <button className="bg-[#00ADEF] text-white px-4 py-2 rounded-md hover:bg-[#0088cc] transition cursor-pointer">
                        Xem thêm khuyến mãi
                    </button>
                </div>
            </div>
        </section>
    );
};

export default FlashSaleSection;