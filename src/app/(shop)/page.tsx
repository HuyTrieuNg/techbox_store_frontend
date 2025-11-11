// import Image from "next/image";

"use client";
import CategoryMenu from "@/components/Category";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ProductCard from "@/components/ProductCard";
import React, { useState } from "react";
import { FaChevronLeft, FaChevronRight, FaTruck } from "react-icons/fa";
import { products } from "@/data/products";
import ProductList from "@/components/ProductList";
import Link from "next/link";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import FlashSaleSection from "@/components/FlashSale";
import ArenaWeekSection from "@/components/ArenaWeek";
import CategorySection from "@/components/CategorySection";

const images = [
  "https://cdn2.cellphones.com.vn/insecure/rs:fill:690:300/q:90/plain/https://dashboard.cellphones.com.vn/storage/690x300_iPhone_Air_opensale.png",
  "https://cdn2.cellphones.com.vn/insecure/rs:fill:690:300/q:90/plain/https://dashboard.cellphones.com.vn/storage/app3-home.jpg",
  "https://cdn2.cellphones.com.vn/insecure/rs:fill:690:300/q:90/plain/https://dashboard.cellphones.com.vn/storage/galaxy-s25-fe-home-0925.png",
];

const HomePage = () => {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const brands = ["MSI", "Asus", "Acer", "Dell"];

  return (
    <>
      {/* Banner + danh mục */}
      <div className="grid grid-cols-5 gap-2 mb-10">
        {/* Cột trái: Danh mục */}
        <div className="col-span-1">
          <CategoryMenu type="grid" />
        </div>

        {/* Cột phải: Banner quảng cáo */}
        <div className="col-span-4 grid grid-cols-3 grid-rows-2 gap-2">
          {/* Ảnh lớn chiếm 2 cột và 2 hàng */}
          {/* <div className="col-span-2 row-span-2 rounded-xl overflow-hidden shadow-lg">
            <img
              src="https://cdn.hstatic.net/files/200000722513/file/gearvn-pc-gvn-t9-slider.png"
              alt="Laptop Office"
              className="w-full h-full object-cover"
            />
          </div> */}
          <div className="col-span-2 row-span-2 rounded-md overflow-hidden shadow-lg">
            <Swiper
              modules={[Autoplay, Pagination]}
              spaceBetween={0}
              slidesPerView={1}
              autoplay={{
                delay: 3000, // Chuyển slide sau 3 giây
                disableOnInteraction: false, // Tiếp tục autoplay sau khi user tương tác
              }}
              loop={true} // Loop vô tận
              pagination={{
                clickable: true,
                dynamicBullets: true,
              }}
              className="h-full" // Đảm bảo swiper full height
            >
              <SwiperSlide>
                <img
                  src="https://cdn.hstatic.net/files/200000722513/file/gearvn-pc-gvn-t9-slider.png"
                  alt="Slide 1"
                  className="w-full h-full object-cover"
                />
              </SwiperSlide>
              <SwiperSlide>
                <img
                  src="https://cdn.hstatic.net/files/200000722513/file/gearvn-laptop-van-phong-slider-t10.jpg" // Thay bằng hình slide 2 của bạn
                  alt="Slide 2"
                  className="w-full h-full object-cover"
                />
              </SwiperSlide>
              <SwiperSlide>
                <img
                  src="https://cdn.hstatic.net/files/200000722513/file/gearvn-man-hinh-t10-slider.jpg" // Thay bằng hình slide 3 của bạn
                  alt="Slide 3"
                  className="w-full h-full object-cover"
                />
              </SwiperSlide>
              <SwiperSlide>
                <img
                  src="https://cdn.hstatic.net/files/200000722513/file/gearvn-laptop-msi-slider-t10.jpeg" // Thay bằng hình slide 3 của bạn
                  alt="Slide 4"
                  className="w-full h-full object-cover"
                />
              </SwiperSlide>
              <SwiperSlide>
                <img
                  src="https://file.hstatic.net/200000722513/file/gearvn-gaming-gear-deal-hoi-slider-t8-jpg.jpg" // Thay bằng hình slide 3 của bạn
                  alt="Slide 5"
                  className="w-full h-full object-cover"
                />
              </SwiperSlide>
            </Swiper>
          </div>
          {/* Ảnh nhỏ 1 */}
          <div className="rounded-md overflow-hidden shadow-lg">
            <img
              src="https://cdn.hstatic.net/files/200000722513/file/gearvn-pc-gvn-t9-slider.png"
              alt="Build PC"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Ảnh nhỏ 2 */}
          <div className="rounded-md overflow-hidden shadow-lg">
            <img
              src="https://cdn.hstatic.net/files/200000722513/file/gearvn-pc-gvn-t9-slider.png"
              alt="Phím cơ"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Ảnh nhỏ 3 */}
          <div className="rounded-md overflow-hidden shadow-lg">
            <img
              src="https://cdn.hstatic.net/files/200000722513/file/gearvn-pc-gvn-t9-slider.png"
              alt="Laptop Gaming"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Ảnh nhỏ 4 */}
          <div className="rounded-md overflow-hidden shadow-lg">
            <img
              src="https://cdn.hstatic.net/files/200000722513/file/gearvn-pc-gvn-t9-slider.png"
              alt="PC giảm giá"
              className="w-full h-full object-cover"
            />
          </div>
          {/* Ảnh nhỏ 4 */}
          <div className="rounded-md overflow-hidden shadow-lg">
            <img
              src="https://cdn.hstatic.net/files/200000722513/file/gearvn-pc-gvn-t9-slider.png"
              alt="PC giảm giá"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Flash Sale */}
      <div className="mb-10">
        <FlashSaleSection products={products} />
      </div>

      {/* Arena Week */}
      <div className="mb-10">
        <ArenaWeekSection products={products} />
      </div>

      {/* Danh sách sản phẩm */}
      <section className="mb-10">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-bold">Laptop gaming bán chạy</h2>
            <div className="flex items-center text-gray-700 text-lg font-medium">
              <span className="mx-2 text-gray-300">|</span>
              <FaTruck className="text-[#E61E4D] mr-3 ml-3" />
              <span>Miễn phí giao hàng</span>
            </div>
          </div>
          {/* <h2 className="text-2xl font-bold">Laptop bán chạy</h2> */}
          <div className="flex gap-8 text-gray-600 font-semibold">
            {/* {brands.map((brand, index) => (
              <Link
                key={index}
                href={`/brand/${brand.toLowerCase()}`}
                className="uppercase text-black hover:text-[#E61E4D] transition"
              >
                {brand}
              </Link>
            ))} */}

            <Link href="/products/2" className="text-blue-500 hover:text-[#E61E4D] transition">
              Xem tất cả
            </Link>
          </div>
        </div>

        {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div> */}
        <ProductList categoryId={2} />
      </section>
      <section className="mb-10">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-bold">Điện thoại bán chạy</h2>
            <div className="flex items-center text-gray-700 text-lg font-medium">
              <span className="mx-2 text-gray-300">|</span>
              <FaTruck className="text-[#E61E4D] mr-3 ml-3" />
              <span>Giao hàng toàn quốc</span>
            </div>
          </div>
          {/* <h2 className="text-2xl font-bold">Máy tính bán chạy</h2> */}
          {/* Nhóm các link thương hiệu */}
          <div className="flex gap-8 text-gray-600 font-semibold">
            {/* {brands.map((brand, index) => (
              <Link
                key={index}
                href={`/brand/${brand.toLowerCase()}`}
                className="uppercase text-black hover:text-[#E61E4D] transition"
              >
                {brand}
              </Link>
            ))} */}

            <Link href="/products/1" className="text-blue-500 hover:text-[#E61E4D] transition">
              Xem tất cả
            </Link>
          </div>


        </div>
        <ProductList categoryId={1} />
      </section>
      <section className="mb-10">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-bold">Tai nghe bán chạy</h2>
            <div className="flex items-center text-gray-700 text-lg font-medium">
              <span className="mx-2 text-gray-300">|</span>
              <FaTruck className="text-[#E61E4D] mr-3 ml-3" />
              <span>Giao hàng toàn quốc</span>
            </div>
          </div>
          {/* <h2 className="text-2xl font-bold">Điện thoại bán chạy</h2> */}
          <div className="flex gap-8 text-gray-600 font-semibold">
            {/* {brands.map((brand, index) => (
              <Link
                key={index}
                href={`/brand/${brand.toLowerCase()}`}
                className="uppercase text-black hover:text-[#E61E4D] transition"
              >
                {brand}
              </Link>
            ))} */}

            <Link href="/products/4" className="text-blue-500 hover:text-[#E61E4D] transition">
              Xem tất cả
            </Link>
          </div>
        </div>
        <ProductList categoryId={4} />
      </section>

      <CategorySection />
    </>
  );
};

export default HomePage;