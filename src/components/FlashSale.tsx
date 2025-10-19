"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import ProductCardFlashSale from "./ProductCartFlashSale";
import Countdown from "./Coundown";
import { useRouter } from "next/navigation";

// Format current date to Vietnamese format (DD/MM)
const currentDate = new Date().toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
});

const FlashSaleSection = ({ products }: { products: any[] }) => {
    const router = useRouter();
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
                            <ProductCardFlashSale product={p} variant="swiper"/>
                        </SwiperSlide>
                    ))}
                </Swiper>

                {/* Centered Xem thêm khuyến mãi button */}
                <div className="flex justify-center mt-4">
                    <button onClick={() => router.push("/flashsale")} className="bg-[#00ADEF] text-white px-4 py-2 rounded-md hover:bg-[#0088cc] transition cursor-pointer">
                        Xem thêm khuyến mãi
                    </button>
                </div>
            </div>
        </section>
    );
};

export default FlashSaleSection;