/**
 * ProductSuggestionCard Atom - Compact product card for chat
 */

'use client';

import React from 'react';
import Link from 'next/link';
import { FaStar } from 'react-icons/fa';

interface ProductSuggestionCardProps {
    product: {
        id: string;
        name: string;
        imageUrl: string;
        displaySalePrice?: number;
        displayOriginalPrice?: number;
        averageRating?: number;
        totalRatings?: number;
    };
}

const formatPrice = (price: number) =>
    price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });

export function ProductSuggestionCard({ product }: ProductSuggestionCardProps) {
    return (
        <Link
            href={`/product/${product.id}`}
            className="flex-shrink-0 w-[200px] bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-3 hover:shadow-md transition-shadow"
        >
            <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-[120px] object-contain mb-2"
            />
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white line-clamp-2 mb-1">
                {product.name}
            </h4>

            <div className="space-y-1">
                {product.displaySalePrice ? (
                    <>
                        <p className="text-xs text-gray-400 line-through">
                            {formatPrice(product.displayOriginalPrice || 0)}
                        </p>
                        <p className="text-sm font-bold text-[#E61E4D]">
                            {formatPrice(product.displaySalePrice)}
                        </p>
                    </>
                ) : product.displayOriginalPrice ? (
                    <p className="text-sm font-bold text-[#E61E4D]">
                        {formatPrice(product.displayOriginalPrice)}
                    </p>
                ) : (
                    <p className="text-sm font-bold text-[#E61E4D]">Liên hệ</p>
                )}
            </div>

            {product.averageRating !== undefined && (
                <div className="flex items-center gap-1 mt-2 text-xs text-gray-600 dark:text-gray-400">
                    <FaStar className="text-yellow-400" size={12} />
                    <span>{product.averageRating.toFixed(1)}</span>
                    <span>({product.totalRatings || 0})</span>
                </div>
            )}
        </Link>
    );
}
