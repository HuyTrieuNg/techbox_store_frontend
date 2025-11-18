'use client';

import { useState, useEffect, useMemo, JSX } from 'react';
import { FiFilter, FiX } from 'react-icons/fi';
import { Brand, Category } from '@/features/category';

export interface ProductFilterParams {
    name?: string;
    spu?: string;
    brandId?: number;
    categoryId?: number;
    parentCategoryId?: number; // thêm dòng này
    minPrice?: number;
    maxPrice?: number;
    minRating?: number;
}

interface ProductFiltersProps {
    filters: ProductFilterParams;
    onFiltersChange: (filters: ProductFilterParams) => void;
    brands?: Brand[];
    categories?: Category[];
}

export default function ProductFilters({
    filters,
    onFiltersChange,
    brands = [],
    categories = [],
}: ProductFiltersProps) {
    const [localFilters, setLocalFilters] = useState<ProductFilterParams>(filters);

    // Sync localFilters when filters prop changes
    useEffect(() => {
        setLocalFilters(filters);
    }, [filters]);

    const handleFilterChange = (key: keyof ProductFilterParams, value: any) => {
        setLocalFilters(prev => ({ ...prev, [key]: value }));
    };

    const applyFilters = () => {
        onFiltersChange(localFilters);
    };

    const resetFilters = () => {
        const emptyFilters: ProductFilterParams = {};
        setLocalFilters(emptyFilters);
        onFiltersChange(emptyFilters);
    };

    const hasActiveFilters = useMemo(() => {
        return Object.keys(localFilters).some(key => {
            const value = localFilters[key as keyof ProductFilterParams];
            return value !== undefined && value !== '';
        });
    }, [localFilters]);

    return (
        <details className="bg-white rounded-lg shadow mb-6 border">
            <summary className="px-6 py-4 cursor-pointer flex items-center justify-between hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-2">
                    <FiFilter className="w-5 h-5 text-gray-600" />
                    <span className="font-semibold text-gray-900">Bộ lọc</span>
                    {hasActiveFilters && (
                        <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                            Đang lọc
                        </span>
                    )}
                </div>
            </summary>

            <div className="px-6 py-4 border-t space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                            Tên sản phẩm
                        </label>
                        <input
                            type="text"
                            id="name"
                            value={localFilters.name || ''}
                            onChange={(e) => handleFilterChange('name', e.target.value || undefined)}
                            placeholder="Tìm theo tên..."
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                    <div>
                        <label htmlFor="brandId" className="block text-sm font-medium text-gray-700 mb-2">
                            Thương hiệu
                        </label>
                        <select
                            id="brandId"
                            value={localFilters.brandId || ''}
                            onChange={(e) => handleFilterChange('brandId', e.target.value ? Number(e.target.value) : undefined)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            <option value="">Tất cả</option>
                            {brands.map((brand) => (
                                <option key={brand.id} value={brand.id}>
                                    {brand.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Danh mục
                        </label>
                        <select
                            value={localFilters.categoryId || ''}
                            onChange={(e) =>
                                handleFilterChange(
                                    "categoryId",
                                    e.target.value ? Number(e.target.value) : undefined
                                )
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                        >
                            <option value="">Tất cả danh mục</option>

                            {categories.map((rootCategory) => {
                                const renderOptions = (cat: any, depth = 0): JSX.Element[] => {
                                    const prefix = "\u00A0\u00A0\u00A0".repeat(depth);

                                    const option = (
                                        <option key={cat.id} value={cat.id}>
                                            {prefix}{cat.name}
                                        </option>
                                    );

                                    const children = cat.childCategories?.flatMap((child: any) =>
                                        renderOptions(child, depth + 1)
                                    ) || [];

                                    return [option, ...children];
                                };

                                return renderOptions(rootCategory);
                            })}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Khoảng giá
                        </label>
                        <div className="flex items-center gap-2">
                            <input
                                type="number"
                                min="0"
                                step="1000"
                                value={localFilters.minPrice || ''}
                                onChange={(e) => handleFilterChange('minPrice', e.target.value ? Number(e.target.value) : undefined)}
                                placeholder="Từ"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                            <span className="text-gray-500">-</span>
                            <input
                                type="number"
                                min="0"
                                step="1000"
                                value={localFilters.maxPrice || ''}
                                onChange={(e) => handleFilterChange('maxPrice', e.target.value ? Number(e.target.value) : undefined)}
                                placeholder="Đến"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t">
                    <button
                        onClick={applyFilters}
                        className="px-6 py-2 bg-[#E61E4D] text-white font-medium rounded-md  hover:bg-[#c71a3f] transition-colors cursor-pointer"
                    >
                        Áp dụng
                    </button>
                    <button
                        onClick={resetFilters}
                        className="px-6 py-2 bg-gray-100 text-gray-700 font-medium rounded-md hover:bg-gray-200 transition-colors flex items-center gap-2 cursor-pointer"
                    >
                        <FiX className="w-4 h-4" />
                        Xóa bộ lọc
                    </button>
                </div>
            </div>
        </details>
    );
}
