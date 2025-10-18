import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import Countdown from "./Coundown";
import ProductCardArenaWeek from "./ProductCardArenaWeek";
import Link from "next/link";
import { FaPlay } from "react-icons/fa";

const ArenaWeekSection = ({ products }: { products: any[] }) => {
    return (
        <section className="bg-[#0568d6] rounded-sm">
            {/* Header Flash Sale */}
            <div className="bg-[#003bb8] flex justify-between items-center py-4 px-4 rounded-sm">
                <div className="flex items-center gap-2">
                    <Countdown />
                    <span className="text-[#ffee12] font-extrabold italic text-2xl">⚡ TECHBOX ARENA WEEK</span>
                </div>
                <Link
                    href="/arena-week"
                    className="text-white flex items-center gap-2 font-semibold"
                >
                    Xem chi tiết
                    <FaPlay className="text-white w-3 h-3" />
                </Link>
            </div>

<div className="py-6 px-4">
            {/* Slider and Image side by side */}
            <div className="flex flex-col md:flex-row gap-4">
                {/* Slider sản phẩm */}
                {/* Static image */}
                <div className="w-full md:w-2/6 flex items-center">
                    <img
                        src="https://file.hstatic.net/200000722513/file/gearvn-gaming-gear-deal-hoi-aug-fs.png"
                        alt="Techbox Arena Week Banner"
                        className="w-full h-auto object-cover rounded-md"
                    />
                </div>
                <div className="w-full md:w-4/6">
                    <Swiper
                        modules={[Autoplay]}
                        slidesPerView={4}
                        spaceBetween={10}
                        autoplay={{ delay: 3000 }}
                        loop
                    >
                        {products.map((p) => (
                            <SwiperSlide key={p.id}>
                                <ProductCardArenaWeek product={p} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>

                
            </div>
            </div>
        </section>
    );
};

export default ArenaWeekSection;