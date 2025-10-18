// // components/ProductCardFlashSale.tsx
// import React from "react";
// import Link from "next/link";
// import { FaStar, FaFire } from "react-icons/fa";

// const formatPrice = (price: number) =>
//     price.toLocaleString("vi-VN", { style: "currency", currency: "VND" });

// const ProductCardFlashSale = ({ product }: { product: any }) => {
//     const price = product.variations[0].price;
//     const originalPrice = product.variations[0].price;
//     const sold = product.sold ?? 0;

//     return (
//         <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-md hover:shadow-lg transition">
//             <div className="relative pt-6"> {/* Thêm pt-4 (padding-top 1rem ~ height nhãn) */}
//                 <img
//                     src={product.image_url}
//                     alt={product.name}
//                     className="w-full h-40 object-contain" // Giữ nguyên, ảnh sẽ dịch xuống
//                 />
//                 {/* Nhãn FLASH SALE - chiếm full width góc trên */}
//                 <div className="absolute top-0 left-0 w-full bg-[#E61E4D] text-white text-sm font-bold px-2 py-1 flex items-center justify-between z-10">
//                     <span>⚡ FLASH SALE</span>
//                     {/* Nếu muốn thêm icon phải, ví dụ: <span>10h</span> */}
//                 </div>
//             </div>

//             <div className="p-3">
//                 <Link href={`/product/${product.slug}`}>
//                     <h3 className="font-semibold text-gray-800 text-sm line-clamp-2">{product.name}</h3>
//                 </Link>

//                 {/* Giá */}
//                 <div className="mt-1">
//                     <p className="text-gray-400 line-through text-xs">{formatPrice(originalPrice)}</p>
//                     <p className="text-[#E61E4D] font-bold text-lg">{formatPrice(price)}</p>
//                 </div>

//                 {/* Rating + đã bán */}
//                 <div className="flex items-center gap-1 text-xs text-gray-600 mt-1">
//                     <FaStar className="text-yellow-400" />
//                     <span>5.0</span>
//                     <span>({product.review_count ?? 0} đánh giá)</span>
//                 </div>

//                 {/* Thanh đã bán */}
//                 {/* <div className="mt-2 bg-gray-200 h-3 rounded-full overflow-hidden">
//           <div
//             className="bg-[#E61E4D] h-full flex items-center justify-center text-white text-[10px] font-bold"
//             style={{ width: `80%` }}
//           >
//             {sold > 0 ? `Đã bán: ${sold}` : "Vừa mở bán"}
//           </div>
//         </div> */}

//                 {sold > 0 ? (
//                     <div className="mt-2 bg-[#ff8c99] h-4 rounded-full overflow-hidden">
//                         <div
//                             className="bg-[#E61E4D] h-full flex items-center justify-center text-white text-[10px] font-bold px-1 truncate"
//                             style={{ width: '80%' }} // Cố định 80%, không scale theo sold
//                         >
//                             Đã bán: {sold}
//                         </div>
//                     </div>
//                 ) : (
//                     <div className="mt-2 bg-[#ff8c99] h-4 rounded-full overflow-hidden">
//                         <div
//                             className="bg-[#ff8c99] h-full flex items-center justify-center text-white text-[10px] font-bold px-1 truncate"
//                             style={{ width: '100%' }} // Cố định 80%, không scale theo sold
//                         >
//                             Vừa mở bán
//                         </div>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default ProductCardFlashSale;


import React from "react";
import Link from "next/link";
import { FaStar } from "react-icons/fa";

const formatPrice = (price: number) =>
    price.toLocaleString("vi-VN", { style: "currency", currency: "VND" });

const ProductCardFlashSale = ({ product }: { product: any }) => {
    const price = product.variations[0].price;
    const originalPrice = product.variations[0].price;
    const sold = product.sold ?? 0;

    return (
        <div className="bg-white rounded-md border border-gray-200 overflow-hidden shadow-md hover:shadow-lg transition">
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
                    <h3 className="font-semibold text-gray-800 text-sm line-clamp-2">{product.name}</h3>
                </Link>

                {/* Giá */}
                <div className="mt-1">
                    <p className="text-gray-400 line-through text-xs">{formatPrice(originalPrice)}</p>
                    <p className="text-[#E61E4D] font-bold text-lg">{formatPrice(price)}</p>
                </div>

                {/* Rating + đã bán */}
                <div className="flex items-center gap-1 text-xs text-gray-600 mt-1">
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
};

export default ProductCardFlashSale;