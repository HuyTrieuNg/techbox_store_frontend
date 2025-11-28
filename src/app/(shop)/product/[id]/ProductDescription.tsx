// components/product-detail/ProductDescription.tsx
"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";

export default function ProductDescription({ product, selected }: any) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalType, setModalType] = useState<'description' | 'config'>('description');

    const components = {
        h1: ({ children }: any) => <h1 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-3">{children}</h1>,
        h2: ({ children }: any) => <h2 className="text-base font-semibold text-gray-800 dark:text-gray-200 mb-2">{children}</h2>,
        h3: ({ children }: any) => <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{children}</h3>,
        p: ({ children }: any) => <p className="text-gray-600 dark:text-gray-400 mb-3 leading-relaxed text-sm">{children}</p>,
        ul: ({ children }: any) => <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 mb-3 space-y-1 text-sm">{children}</ul>,
        ol: ({ children }: any) => <ol className="list-decimal list-inside text-gray-600 dark:text-gray-400 mb-3 space-y-1 text-sm">{children}</ol>,
        li: ({ children }: any) => <li className="text-gray-600 dark:text-gray-400 text-sm">{children}</li>,
        strong: ({ children }: any) => <strong className="font-semibold text-gray-900 dark:text-gray-100">{children}</strong>,
        em: ({ children }: any) => <em className="italic text-gray-700 dark:text-gray-300">{children}</em>,
        code: ({ children }: any) => <code className="bg-gray-100 dark:bg-gray-800 text-red-600 dark:text-red-400 px-1 py-0.5 rounded text-xs font-mono">{children}</code>,
        pre: ({ children }: any) => <pre className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg overflow-x-auto text-xs font-mono text-gray-800 dark:text-gray-200 mb-3">{children}</pre>,
        blockquote: ({ children }: any) => <blockquote className="border-l-4 border-gray-300 dark:border-gray-600 pl-3 italic text-gray-700 dark:text-gray-300 mb-3 text-sm">{children}</blockquote>,
        table: ({ children }: any) => <table className="w-full border-collapse border border-gray-300 dark:border-gray-600 mb-3 text-sm">{children}</table>,
        thead: ({ children }: any) => <thead className="bg-gray-100 dark:bg-gray-800">{children}</thead>,
        tbody: ({ children }: any) => <tbody>{children}</tbody>,
        tr: ({ children }: any) => <tr className="border-b border-gray-200 dark:border-gray-700">{children}</tr>,
        th: ({ children }: any) => <th className="px-3 py-2 text-left font-semibold text-gray-900 dark:text-gray-100 text-sm">{children}</th>,
        td: ({ children }: any) => <td className="px-3 py-2 text-gray-600 dark:text-gray-400 text-sm">{children}</td>,
        img: ({ src, alt }: any) => {
            // Prevent empty src attribute error
            if (!src || src === '') return null;
            return <img src={src} alt={alt || ''} className="max-w-full h-auto rounded-lg my-4" />;
        },
    };

    return (
        <div className="max-w-7xl mt-10">
            {/* Layout 2 cột: Thông tin sản phẩm bên trái (rộng hơn), Cấu hình bên phải (hẹp hơn) */}
            <div className="grid md:grid-cols-3 gap-6">
                {/* Phần mô tả sản phẩm - bên trái - chiếm 2 cột */}
                <div className="md:col-span-2 bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">Mô tả sản phẩm</h2>
                    <div className="relative text-gray-700 dark:text-gray-300 text-sm leading-relaxed overflow-hidden h-[500px]">
                        <ReactMarkdown components={components}>{product.description}</ReactMarkdown>
                        {/* Gradient fade effect */}
                        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-50 dark:from-gray-800 to-transparent pointer-events-none" />
                    </div>
                    <div className="flex justify-center mt-4">
                        <button
                            onClick={() => {
                                setModalType('description');
                                setIsModalOpen(true);
                            }}
                            className="text-[#0066FF] hover:text-[#0052CC] cursor-pointer text-sm font-medium transition-colors duration-200 flex items-center gap-1"
                        >
                            Xem thêm
                            <span className="text-lg">▸</span>
                        </button>
                    </div>
                </div>

                {/* Bảng cấu hình - bên phải - chiếm 1 cột */}
                {(product.attributes?.length > 0 || (selected?.attributes ?? []).length > 0) && (
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
                        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                            Cấu hình
                        </h2>

                        <div className="relative h-[500px] overflow-hidden">
                            <table className="w-full border-collapse">
                                <tbody>
                            {/* --- Nhóm thông tin chung --- */}
                            {product.attributes?.length > 0 && (
                                <>
                                    {product.attributes.map((attr: any) => (
                                        <tr
                                            key={`prod-${attr.id}`}
                                            className="border-b border-gray-200 dark:border-gray-700"
                                        >
                                            <td className="w-1/3 px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-900">
                                                {attr.name}
                                            </td>
                                            <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-900">
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
                                            className="border-b border-gray-200 dark:border-gray-700"
                                        >
                                            <td className="w-1/3 px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-900">
                                                {attr.name}
                                            </td>
                                            <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-900">
                                                {attr.value}
                                            </td>
                                        </tr>
                                    ))}
                                </>
                            )}
                        </tbody>
                    </table>
                    {/* Gradient fade effect cho bảng cấu hình */}
                    <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-50 dark:from-gray-800 to-transparent pointer-events-none" />
                        </div>
                        <div className="flex justify-center mt-4">
                            <button
                                onClick={() => {
                                    setModalType('config');
                                    setIsModalOpen(true);
                                }}
                                className="text-[#0066FF] hover:text-[#0052CC] cursor-pointer text-sm font-medium transition-colors duration-200 flex items-center gap-1"
                            >
                                Xem cấu hình chi tiết
                                <span className="text-lg">▸</span>
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Modal hiển thị cấu hình đầy đủ */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0, 0, 0, 0.30)' }} onClick={() => setIsModalOpen(false)}>
                    <div 
                        className={`bg-white dark:bg-gray-900 rounded-2xl ${modalType === 'description' ? 'max-w-4xl' : 'max-w-2xl'} w-full max-h-[85vh] flex flex-col shadow-2xl overflow-hidden`}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-6 py-4 flex justify-between items-center">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                                {modalType === 'description' ? 'Mô tả sản phẩm' : 'Cấu hình chi tiết'}
                            </h3>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-2xl leading-none w-8 h-8 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
                            >
                                ×
                            </button>
                        </div>
                        <div className="overflow-y-auto px-6 py-4 text-sm text-gray-700 dark:text-gray-300 leading-relaxed flex-1">
                            {modalType === 'description' && (
                                <ReactMarkdown components={components}>{product.description}</ReactMarkdown>
                            )}
                            
                            {/* Bảng cấu hình trong modal */}
                            {modalType === 'config' && (product.attributes?.length > 0 || (selected?.attributes ?? []).length > 0) && (
                                <div className="mt-6">
                                    <table className="w-full border-collapse">
                                        <tbody>
                                            {product.attributes?.length > 0 && (
                                                <>
                                                    {product.attributes.map((attr: any) => (
                                                        <tr
                                                            key={`modal-prod-${attr.id}`}
                                                            className="border-b border-gray-200 dark:border-gray-700"
                                                        >
                                                            <td className="w-1/3 px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-300">
                                                                {attr.name}
                                                            </td>
                                                            <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">
                                                                {attr.value}
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </>
                                            )}
                                            {(selected?.attributes ?? []).length > 0 && (
                                                <>
                                                    {selected?.attributes.map((attr: any) => (
                                                        <tr
                                                            key={`modal-var-${attr.id}`}
                                                            className="border-b border-gray-200 dark:border-gray-700"
                                                        >
                                                            <td className="w-1/3 px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-300">
                                                                {attr.name}
                                                            </td>
                                                            <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">
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
                        </div>
                        <div className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 px-6 py-3">
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="w-full bg-[#0066FF] hover:bg-[#0052CC] text-white font-medium py-2.5 rounded-lg transition-colors duration-200 text-sm"
                            >
                                Đóng
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}