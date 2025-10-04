// import Image from "next/image";

"use client";
import CategoryMenu from "@/components/Category";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ProductCard from "@/components/ProductCard";
import React, { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { products } from "@/data/products";
import ProductList from "@/components/ProductList";
import Link from "next/link";

// export default function Home() {
//   return (
//     <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
//       <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
//         <Image
//           className="dark:invert"
//           src="/next.svg"
//           alt="Next.js logo"
//           width={180}
//           height={38}
//           priority
//         />
//         <ol className="font-mono list-inside list-decimal text-sm/6 text-center sm:text-left">
//           <li className="mb-2 tracking-[-.01em]">
//             Get started by editing{" "}
//             <code className="bg-black/[.05] dark:bg-white/[.06] font-mono font-semibold px-1 py-0.5 rounded">
//               src/app/page.tsx
//             </code>
//             .
//           </li>
//           <li className="tracking-[-.01em]">
//             Save and see your changes instantly.
//           </li>
//         </ol>

//         <div className="flex gap-4 items-center flex-col sm:flex-row">
//           <a
//             className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
//             href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             <Image
//               className="dark:invert"
//               src="/vercel.svg"
//               alt="Vercel logomark"
//               width={20}
//               height={20}
//             />
//             Deploy now
//           </a>
//           <a
//             className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"
//             href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             Read our docs
//           </a>
//         </div>
//       </main>
//       <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
//         <a
//           className="flex items-center gap-2 hover:underline hover:underline-offset-4"
//           href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <Image
//             aria-hidden
//             src="/file.svg"
//             alt="File icon"
//             width={16}
//             height={16}
//           />
//           Learn
//         </a>
//         <a
//           className="flex items-center gap-2 hover:underline hover:underline-offset-4"
//           href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <Image
//             aria-hidden
//             src="/window.svg"
//             alt="Window icon"
//             width={16}
//             height={16}
//           />
//           Examples
//         </a>
//         <a
//           className="flex items-center gap-2 hover:underline hover:underline-offset-4"
//           href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <Image
//             aria-hidden
//             src="/globe.svg"
//             alt="Globe icon"
//             width={16}
//             height={16}
//           />
//           Go to nextjs.org →
//         </a>
//       </footer>
//     </div>
//   );
// }


// export default function Home() {
//   return (
//     <div>
//     <Header/>
//     <main className="max-w-7xl mx-auto px-6 py-6 grid grid-cols-4 gap-6">
//       {/* Cột trái: Danh mục */}
//       <div className="col-span-1">
//         <CategoryMenu />
//       </div>

//       {/* Cột phải: Banner quảng cáo */}
//       <div className="col-span-3">
//         <div className="relative w-full h-[400px] rounded-xl overflow-hidden shadow-lg">
//           {/* Ảnh chạy (slideshow đơn giản) */}
//           <div className="w-full h-full">
//             <img
//               src="https://cdn2.cellphones.com.vn/insecure/rs:fill:690:300/q:90/plain/https://dashboard.cellphones.com.vn/storage/galaxy-s25-fe-home-0925.png"
//               alt="Quảng cáo 1"
//               className="w-full h-full object-cover"
//             />
//           </div>
//         </div>
//       </div>
//     </main>
//     <Footer/>
//     </div>

//   );
// }

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
      {/* <Header /> */}
      {/* <main className="max-w-7xl mx-auto px-6 py-6"> */}
      {/* Banner + danh mục */}
      <div className="grid grid-cols-4 gap-6 mb-10">
        {/* Cột trái: Danh mục */}
        <div className="col-span-1">
          <CategoryMenu type="grid" />
        </div>

        {/* Cột phải: Banner quảng cáo */}
        <div className="col-span-3 relative">
          <div className="w-full h-[400px] rounded-xl overflow-hidden shadow-lg">
            <img
              src={images[current]}
              alt={`Banner ${current + 1}`}
              className="w-full h-full object-cover transition-all duration-500"
            />
          </div>

          {/* Nút điều hướng */}
          <button
            onClick={prevSlide}
            className="absolute top-1/2 left-4 -translate-y-1/2 bg-black/40 text-white p-2 rounded-full hover:bg-black/60 transition"
          >
            <FaChevronLeft size={20} />
          </button>

          <button
            onClick={nextSlide}
            className="absolute top-1/2 right-4 -translate-y-1/2 bg-black/40 text-white p-2 rounded-full hover:bg-black/60 transition"
          >
            <FaChevronRight size={20} />
          </button>

          {/* Dấu chấm (pagination) */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrent(index)}
                className={`w-3 h-3 rounded-full ${current === index ? "bg-[#E61E4D]" : "bg-gray-300"
                  }`}
              ></button>
            ))}
          </div>
        </div>
      </div>

      {/* Danh sách sản phẩm */}
      <section className="mb-10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Laptop bán chạy</h2>
          <div className="flex gap-8 text-gray-600 font-semibold">
            {brands.map((brand, index) => (
              <Link
                key={index}
                href={`/products/desktop?brand=${brand.toLowerCase()}`}
                className="text-black hover:text-[#E61E4D] transition"
              >
                {brand}
              </Link>
            ))}

            <Link href="/products/laptop" className="text-blue-500 hover:text-[#E61E4D] transition">
              Xem tất cả
            </Link>
          </div>
        </div>

        {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div> */}
        <ProductList category_id={1} />
      </section>
      <section className="mb-10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Máy tính bán chạy</h2>
          {/* Nhóm các link thương hiệu */}
          <div className="flex gap-8 text-gray-600 font-semibold">
            {brands.map((brand, index) => (
              <Link
                key={index}
                href={`/products/desktop?brand=${brand.toLowerCase()}`}
                className="text-black hover:text-[#E61E4D] transition"
              >
                {brand}
              </Link>
            ))}

            <Link href="/products/pc" className="text-blue-500 hover:text-[#E61E4D] transition">
              Xem tất cả
            </Link>
          </div>


        </div>
        <ProductList category_id={1} />
      </section>
      <section className="mb-10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Điện thoại bán chạy</h2>
          <div className="flex gap-8 text-gray-600 font-semibold">
            {brands.map((brand, index) => (
              <Link
                key={index}
                href={`/products/desktop?brand=${brand.toLowerCase()}`}
                className="text-black hover:text-[#E61E4D] transition"
              >
                {brand}
              </Link>
            ))}

            <Link href="/products/pc" className="text-blue-500 hover:text-[#E61E4D] transition">
              Xem tất cả
            </Link>
          </div>
        </div>
        <ProductList category_id={1} />
      </section>
      {/* </main> */}
      {/* <Footer /> */}
    </>
  );
};

export default HomePage;