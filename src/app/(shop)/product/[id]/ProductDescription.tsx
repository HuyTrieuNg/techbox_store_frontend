// components/product-detail/ProductDescription.tsx
"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";

export default function ProductDescription({ product, selected }: any) {
    const [expanded, setExpanded] = useState(false);

    const components = {
        h1: ({ children }: any) => <h1 className="text-2xl font-bold text-gray-900 mb-4">{children}</h1>,
        h2: ({ children }: any) => <h2 className="text-xl font-semibold text-gray-800 mb-3">{children}</h2>,
        h3: ({ children }: any) => <h3 className="text-lg font-medium text-gray-700 mb-2">{children}</h3>,
        p: ({ children }: any) => <p className="text-gray-600 mb-4 leading-relaxed">{children}</p>,
        ul: ({ children }: any) => <ul className="list-disc list-inside text-gray-600 mb-4 space-y-1">{children}</ul>,
        ol: ({ children }: any) => <ol className="list-decimal list-inside text-gray-600 mb-4 space-y-1">{children}</ol>,
        li: ({ children }: any) => <li className="text-gray-600">{children}</li>,
        strong: ({ children }: any) => <strong className="font-semibold text-gray-900">{children}</strong>,
        em: ({ children }: any) => <em className="italic text-gray-700">{children}</em>,
        code: ({ children }: any) => <code className="bg-gray-100 text-red-600 px-1 py-0.5 rounded text-sm font-mono">{children}</code>,
        pre: ({ children }: any) => <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto text-sm font-mono text-gray-800 mb-4">{children}</pre>,
        blockquote: ({ children }: any) => <blockquote className="border-l-4 border-gray-300 pl-4 italic text-gray-700 mb-4">{children}</blockquote>,
        table: ({ children }: any) => <table className="w-full border-collapse border border-gray-300 mb-4">{children}</table>,
        thead: ({ children }: any) => <thead className="bg-gray-100">{children}</thead>,
        tbody: ({ children }: any) => <tbody>{children}</tbody>,
        tr: ({ children }: any) => <tr className="border-b border-gray-200">{children}</tr>,
        th: ({ children }: any) => <th className="px-4 py-2 text-left font-semibold text-gray-900">{children}</th>,
        td: ({ children }: any) => <td className="px-4 py-2 text-gray-600">{children}</td>,
        img: ({ src, alt }: any) => {
            // Prevent empty src attribute error
            if (!src || src === '') return null;
            return <img src={src} alt={alt || ''} className="max-w-full h-auto rounded-lg my-4" />;
        },
    };

    return (
        <div className="max-w-7xl mt-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Thông tin sản phẩm</h2>

            <div
                className={`relative text-gray-700 leading-relaxed transition-all duration-200 overflow-hidden ${expanded ? "max-h-[2000px]" : "max-h-[200px]"
                    }`}
            >
                <ReactMarkdown components={components}>{product.description}</ReactMarkdown>
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

                                        {product.attributes.map((attr: any) => (
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
                                        {selected?.attributes.map((attr: any) => (
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