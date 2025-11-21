// components/product-detail/ProductDescription.tsx
"use client";

import { useState } from "react";

export default function ProductDescription({ product, selected }: any) {
    const [expanded, setExpanded] = useState(false);

    return (
        <div className="max-w-7xl mt-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Thông tin sản phẩm</h2>

            <div
                className={`relative text-gray-700 leading-relaxed transition-all duration-200 overflow-hidden ${expanded ? "max-h-[2000px]" : "max-h-[200px]"
                    }`}
            >
                <p className="text-gray-600">{product.description}</p>
                {/* --- Bảng thông tin tổng hợp --- */}
                {(product.attributes?.length > 0 || (selected?.attributes ?? []).length > 0) && (
                    <div className="mt-6">
                        <h3 className="text-xl font-semibold text-gray-800 mb-3">
                            Thông số kỹ thuật chi tiết:
                        </h3>

                        <table className="w-full border border-gray-300  border-collapse rounded-lg">
                            <tbody>


                                {/* --- Nhóm thông tin chung --- */}
                                {product.attributes?.length > 0 && (
                                    <>

                                        {product.attributes.map((attr:any) => (
                                            <tr
                                                key={`prod-${attr.id}`}
                                                className="border border-gray-200 hover:bg-gray-50 transition"
                                            >
                                                <td className="w-1/3 px-4 py-2 font-medium text-gray-700 bg-gray-100">
                                                    {attr.name}
                                                </td>
                                                <td className="px-4 py-2 text-gray-600">
                                                    {attr.value}
                                                </td>
                                            </tr>
                                        ))}
                                    </>
                                )}
                                {/* --- Nhóm thông tin biến thể (nếu có) --- */}
                                {(selected?.attributes ?? []).length > 0 && (
                                    <>
                                        {selected?.attributes.map((attr:any) => (
                                            <tr
                                                key={`var-${attr.id}`}
                                                className="border border-gray-200 hover:bg-gray-50 transition"
                                            >
                                                <td className="w-1/3 px-4 py-2 font-medium text-gray-700 bg-gray-100">
                                                    {attr.name}
                                                </td>
                                                <td className="px-4 py-2 text-gray-600">
                                                    {attr.value}
                                                </td>
                                            </tr>
                                        ))}
                                    </>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* Gradient fade effect khi chưa mở rộng */}
                {!expanded && (
                    <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent pointer-events-none" />
                )}
            </div>

            <div className="flex justify-center mt-4">
                    <span
                        onClick={() => setExpanded(!expanded)}
                        className="text-[#E61E4D] hover:text-[#d41b46ff] cursor-pointer text-base font-medium transition-colors duration-200"
                    >
                        {expanded ? "Thu gọn" : "Xem thêm"}
                    </span>
                </div>
        </div>
    );
}