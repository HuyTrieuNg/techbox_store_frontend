"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaSearch, FaTimes } from "react-icons/fa";
import { useDebounce } from "@/hooks/useDebounce";

const baseUrl = (process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080') + '/api';

export default function SearchBox() {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState("");
    const [suggestions, setSuggestions] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [showSuggestions, setShowSuggestions] = useState(false);

    const debouncedQuery = useDebounce(searchQuery, 300);


    useEffect(() => {
        if (!debouncedQuery.trim()) {
            setSuggestions([]);
            setShowSuggestions(false);
            return;
        }

        const fetchSuggestions = async () => {
            setIsLoading(true);
            try {
                const res = await fetch(`${baseUrl}/products?name=${encodeURIComponent(debouncedQuery)}`, {
                    next: { revalidate: 60 }
                });
                if (res.ok) {
                    const data = await res.json();
                    // Giả sử API trả về { content: [...] }
                    const products = data.content || [];
                    setSuggestions(products);
                }
            } catch (error) {
                console.error("Search error:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchSuggestions();
    }, [debouncedQuery]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
            setShowSuggestions(false);
            setSearchQuery("");
        }
    };

    const handleSuggestionClick = (product: any) => {
        router.push(`/product/${product.id}`);
        setShowSuggestions(false);
        setSearchQuery("");
    };

    return (
        <div className="flex-1 max-w-xl mx-8 relative">
            <form onSubmit={handleSearch} className="relative">
                <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" />

                <input
                    type="text"
                    value={searchQuery}
                    onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
                    onChange={(e) => {
                        setSearchQuery(e.target.value);
                        setShowSuggestions(true);
                    }}
                    placeholder="Tìm kiếm sản phẩm..."
                    className="w-full border border-gray-300 dark:border-gray-600 rounded-full pl-10 pr-10 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white  placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E61E4D] transition-all"
                />

                {searchQuery && (
                    <button
                        type="button"
                        onClick={() => {
                            setSearchQuery("");
                            setShowSuggestions(false);
                        }}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                        <FaTimes size={16} />
                    </button>
                )}
            </form>

            {showSuggestions && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-800 rounded-md shadow-xl border border-gray-200 dark:border-gray-700 max-h-96 overflow-y-auto z-50">
                    {isLoading ? (
                        <div className="p-4 text-center text-gray-500">Đang tìm...</div>
                    ) : (!isLoading && suggestions.length === 0) ? (
                        <div className="p-4 text-center text-gray-500 italic">
                            Không tìm thấy sản phẩm...
                        </div>
                    ) : (
                        suggestions.map((product) => (
                            <div
                                key={product.id}
                                onClick={() => handleSuggestionClick(product)}
                                className="flex items-center gap-3 p-3 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors"
                            >
                                <div className="w-10 h-10 bg-gray-200 border rounded-md flex-shrink-0">

                                    <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover rounded-md" />

                                </div>
                                <div className="flex-1 min-w-0">
                                    {/* Tên sản phẩm */}
                                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                                        {product.name}
                                    </p>

                                    {/* Giá */}
                                    <div className="flex items-center gap-2 mt-1 flex-wrap">
                                        {/* Ưu tiên: Có giá giảm → hiện cả 2 */}
                                        {product.displaySalePrice ? (
                                            <>
                                                <span className="text-sm font-bold text-[#E61E4D]">
                                                    {Number(product.displaySalePrice).toLocaleString('vi-VN')}₫
                                                </span>
                                                {product.displayOriginalPrice && (
                                                    <span className="text-xs text-gray-500 line-through">
                                                        {Number(product.displayOriginalPrice).toLocaleString('vi-VN')}₫
                                                    </span>
                                                )}
                                            </>
                                        ) : product.displayOriginalPrice ? (
                                            // Không có giá giảm → hiện giá gốc bình thường
                                            <span className="text-sm font-bold text-[#E61E4D]">
                                                {Number(product.displayOriginalPrice).toLocaleString('vi-VN')}₫
                                            </span>
                                        ) : (
                                            // Không có giá nào
                                            <span className="text-sm text-gray-500 italic">Liên hệ</span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
}
