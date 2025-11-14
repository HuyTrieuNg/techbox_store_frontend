import React from "react";
import Link from "next/link";
import { FaStar } from "react-icons/fa";

const formatPrice = (price: number) =>
    price.toLocaleString("vi-VN", { style: "currency", currency: "VND" });

interface ProductCardFlashSaleProps {
    product: any;
    variant?: "swiper" | "default";
}

const ProductCardFlashSale: React.FC<ProductCardFlashSaleProps> = ({ product, variant = "swiper" }) => {
    const price = product.variations[0].price;
    const originalPrice = product.variations[0].price;
    const sold = product.sold ?? 0;
    const shortSpecs = product.specs ?? ["i5 12400F", "16GB", "15.6 inch FHD", "RTX 3050", "144 Hz"];

    if (variant === "swiper") {
        return (
            <div className="bg-white dark:bg-gray-800 rounded-md border border-gray-200 dark:border-gray-600 overflow-hidden shadow-md hover:shadow-lg transition">
                <div className="relative flex justify-center items-center pt-7"> {/* Increased pt-8 for frame space */}
                    <img
                        src={product.image_url}
                        alt={product.name}
                        className="w-3/4 h-40 object-contain z-0" // Centered with w-3/4
                    />
                    {/* Frame image */}
                    <img
                        src="https://file.hstatic.net/200000722513/file/frame-flash-sale-10h.png"
                        alt="Flash Sale Frame"
                        className="absolute top-0 left-0 w-full h-auto z-10"
                    />
                </div>

                <div className="p-3 pt-2"> {/* Reduced pt-2 to bring title closer */}
                    <Link href={`/product/${product.slug}`}>
                        <h3 className="font-semibold text-gray-800 dark:text-white text-sm line-clamp-2">{product.name}</h3>
                    </Link>

                    {/* Giá */}
                    <div className="mt-1">
                        <p className="text-gray-400 dark:text-gray-500 line-through text-xs">{formatPrice(originalPrice)}</p>
                        <p className="text-[#E61E4D] font-bold text-lg">{formatPrice(price)}</p>
                    </div>

                    {/* Rating + đã bán */}
                    <div className="flex items-center gap-1 text-xs text-gray-600 dark:text-gray-400 mt-1">
                        <FaStar className="text-yellow-400" />
                        <span>5.0</span>
                        <span>({product.review_count ?? 0} đánh giá)</span>
                    </div>

                    {/* Thanh đã bán */}
                    {sold > 0 ? (
                        <div className="mt-2 bg-[#ff8c99] h-4 rounded-full overflow-hidden">
                            <div
                                className="bg-[#E61E4D] h-full flex items-center justify-center text-white text-[10px] font-bold px-1 truncate"
                                style={{ width: '80%' }}
                            >
                                Đã bán: {sold}
                            </div>
                        </div>
                    ) : (
                        <div className="mt-2 bg-[#ff8c99] h-4 rounded-full overflow-hidden">
                            <div
                                className="bg-[#ff8c99] h-full flex items-center justify-center text-white text-[10px] font-bold px-1 truncate"
                                style={{ width: '100%' }}
                            >
                                Vừa mở bán
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    }
    return (
        <div className="bg-white dark:bg-gray-800 rounded-md border border-gray-200 dark:border-gray-600 overflow-hidden shadow-md hover:shadow-lg transition">
            <div className="relative flex justify-center items-center pt-7"> {/* Increased pt-8 for frame space */}
                <img
                    src={product.image_url}
                    alt={product.name}
                    className="w-3/4 h-50 object-contain z-0" // Centered with w-3/4
                />
                {/* Frame image */}
                <img
                    src="https://file.hstatic.net/200000722513/file/frame-flash-sale-10h.png"
                    alt="Flash Sale Frame"
                    className="absolute top-0 left-0 w-full h-auto z-10"
                />
            </div>

            <div className="p-3 pt-6"> {/* Reduced pt-2 to bring title closer */}
                <Link href={`/product/${product.slug}`}>
                    <h3 className="font-semibold text-gray-800 dark:text-white text-sm line-clamp-2">{product.name}</h3>
                </Link>

                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 mb-2">
                    <span className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-md inline-block">
                        {shortSpecs.join(" | ")}
                    </span>
                </p>

                {/* Giá */}
                <div className="mt-1">
                    <p className="text-gray-400 dark:text-gray-500 line-through text-xs">{formatPrice(originalPrice)}</p>
                    <p className="text-[#E61E4D] font-bold text-lg">{formatPrice(price)}</p>
                </div>

                {/* Rating + đã bán */}
                <div className="flex items-center gap-1 text-xs text-gray-600 dark:text-gray-400 mt-1">
                    <FaStar className="text-yellow-400" />
                    <span>5.0</span>
                    <span>({product.review_count ?? 0} đánh giá)</span>
                </div>

            </div>
        </div>
    );

};

export default ProductCardFlashSale;