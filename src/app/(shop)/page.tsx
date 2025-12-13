import React from "react";
import { FaTruck } from "react-icons/fa";
import Link from "next/link";
import 'swiper/css';
import 'swiper/css/pagination';
import CampaignSection from "@/components/Campaign";
import CategoryMenuServer from "@/components/CategoryServer";
import ProductSection from "@/components/ProductSection";
import PersonalizedRecommendation from "@/components/PersonalizedRecommendation";

const HomePage = () => {
  return (
    <>
      {/* Banner + danh mục */}
      <div className="grid grid-cols-5 gap-2 mb-10">
        <div className="col-span-1">
          <CategoryMenuServer type="grid" />
        </div>
        <div className="col-span-4">
          <CampaignSection />
        </div>
      </div>

      {/* Gợi ý cho bạn */}
      <PersonalizedRecommendation />

      {/* Danh sách sản phẩm */}
      <section className="mb-10">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-bold">Laptop bán chạy</h2>
            <div className="flex items-center text-gray-700 text-lg font-medium">
              <span className="mx-2 text-gray-300">|</span>
              <FaTruck className="text-[#E61E4D] mr-3 ml-3" />
              <span>Miễn phí giao hàng</span>
            </div>
          </div>
          <div className="flex gap-8 text-gray-600 font-semibold">
            <Link href="/products/1" className="text-blue-500 hover:text-[#E61E4D] transition">
              Xem tất cả
            </Link>
          </div>
        </div>
        <ProductSection categoryId={1} />
      </section>

      <section className="mb-10">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-bold">Bàn phím bán chạy</h2>
            <div className="flex items-center text-gray-700 text-lg font-medium">
              <span className="mx-2 text-gray-300">|</span>
              <FaTruck className="text-[#E61E4D] mr-3 ml-3" />
              <span>Giao hàng toàn quốc</span>
            </div>
          </div>
          <div className="flex gap-8 text-gray-600 font-semibold">
            <Link href="/products/25" className="text-blue-500 hover:text-[#E61E4D] transition">
              Xem tất cả
            </Link>
          </div>
        </div>
        <ProductSection categoryId={25} />
      </section>

      <section className="mb-10">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-bold">Chuột bán chạy</h2>
            <div className="flex items-center text-gray-700 text-lg font-medium">
              <span className="mx-2 text-gray-300">|</span>
              <FaTruck className="text-[#E61E4D] mr-3 ml-3" />
              <span>Giao hàng toàn quốc</span>
            </div>
          </div>
          <div className="flex gap-8 text-gray-600 font-semibold">
            <Link href="/products/42" className="text-blue-500 hover:text-[#E61E4D] transition">
              Xem tất cả
            </Link>
          </div>
        </div>
        <ProductSection categoryId={42} />
      </section>

      <section className="mb-10">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-bold">Tất cả sản phẩm</h2>
          </div>
        </div>
        <ProductSection noSwiper={true} />
        <div className="flex justify-center mt-8">
          <Link
            href="/products/all"
            className="inline-block px-5 py-2 bg-[#E61E4D] text-white font-medium text-center rounded-md hover:bg-[#c71a3f] transition-colors duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#E61E4D] focus:ring-offset-2"
          >
            Xem tất cả
          </Link>
        </div>
      </section>
    </>
  );
};

export default HomePage;