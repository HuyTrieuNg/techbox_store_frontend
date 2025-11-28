/**
 * ProductSuggestionList Molecule - Horizontal scrollable product list
 */

'use client';

import React from 'react';
import { ProductSuggestionCard } from '@/components/chatbot/atoms/ProductSuggestionCard';

interface ProductSuggestionListProps {
    products: any[];
}

export function ProductSuggestionList({ products }: ProductSuggestionListProps) {
    if (!products || products.length === 0) {
        return null;
    }

    return (
        <div className="mb-4 ml-0">
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-2 ml-1">
                Sản phẩm gợi ý:
            </p>
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700">
                {products.map((product) => (
                    <ProductSuggestionCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
}
