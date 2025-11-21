'use client';

import { useState, useEffect, useMemo } from 'react';
import { FiFilter, FiX, FiSearch, FiCheck, FiSquare } from 'react-icons/fi';
import { Brand, Category } from '@/features/category';
import { useBrands } from '@/hooks/useBrands';
import { useCategories } from '@/hooks/useCategories';
import useSWR from 'swr';
import { getProductsForManagement } from '@/services/productManagementService';
import { ProductManagementParams } from '@/features/productManagement';

export interface ProductFilterParams {
  name?: string;
  spu?: string;
  brandId?: number;
  categoryId?: number;
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
}

interface ProductSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (selectedProducts: any[]) => void;
  initialSelectedProducts?: any[];
}

export default function ProductSelectionModal({
  isOpen,
  onClose,
  onConfirm,
  initialSelectedProducts = []
}: ProductSelectionModalProps) {
  const { brands, isLoading: brandsLoading } = useBrands();
  const { categories, isLoading: categoriesLoading } = useCategories();

  const [filters, setFilters] = useState<ProductFilterParams>({});
  const [selectedProductIds, setSelectedProductIds] = useState<Set<number>>(
    new Set(initialSelectedProducts.map(p => p.id))
  );

  const { data: productsData, isLoading: productsLoading } = useSWR(
    ['products-management', filters, 0, 100], // page 0, size 100 for selection
    () => getProductsForManagement({
      page: 0,
      size: 100,
      name: filters.name,
      spu: filters.spu,
      brandId: filters.brandId,
      categoryId: filters.categoryId,
      minPrice: filters.minPrice,
      maxPrice: filters.maxPrice,
      minRating: filters.minRating,
    }),
    {
      revalidateOnFocus: false,
      keepPreviousData: true,
    }
  );

  const products = productsData?.content || [];

  const handleFilterChange = (key: keyof ProductFilterParams, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => {
    setFilters({});
  };

  const toggleProductSelection = (productId: number) => {
    setSelectedProductIds(prev => {
      const newSet = new Set(prev);
      if (newSet.has(productId)) {
        newSet.delete(productId);
      } else {
        newSet.add(productId);
      }
      return newSet;
    });
  };

  const selectAllProducts = () => {
    if (products) {
      setSelectedProductIds(new Set(products.map(p => p.id)));
    }
  };

  const clearSelection = () => {
    setSelectedProductIds(new Set());
  };

  const handleConfirm = () => {
    const selectedProducts = products?.filter(p => selectedProductIds.has(p.id)) || [];
    onConfirm(selectedProducts);
    onClose();
  };

  const hasActiveFilters = useMemo(() => {
    return Object.keys(filters).some(key => {
      const value = filters[key as keyof ProductFilterParams];
      return value !== undefined && value !== '';
    });
  }, [filters]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-6xl w-full mx-4 max-h-[100vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Chọn sản phẩm để kiểm kho
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
          >
            <FiX className="w-6 h-6" />
          </button>
        </div>

        <div className="flex h-[calc(90vh-120px)]">
          {/* Filters Sidebar */}
          <div className="w-80 border-r p-4 overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                <FiFilter className="w-4 h-4" />
                Bộ lọc sản phẩm
              </h3>
              {hasActiveFilters && (
                <button
                  onClick={resetFilters}
                  className="text-sm text-red-600 hover:text-red-800 flex items-center gap-1"
                >
                  <FiX className="w-3 h-3" />
                  Xóa
                </button>
              )}
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Tên sản phẩm
                </label>
                <input
                  type="text"
                  value={filters.name || ''}
                  onChange={(e) => handleFilterChange('name', e.target.value || undefined)}
                  placeholder="Tìm theo tên..."
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Mã SPU
                </label>
                <input
                  type="text"
                  value={filters.spu || ''}
                  onChange={(e) => handleFilterChange('spu', e.target.value || undefined)}
                  placeholder="VD: PRD-XXXXX"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white font-mono text-sm"
                />
              </div>

              {!brandsLoading && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Thương hiệu
                  </label>
                  <select
                    value={filters.brandId || ''}
                    onChange={(e) => handleFilterChange('brandId', e.target.value ? Number(e.target.value) : undefined)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  >
                    <option value="">Tất cả</option>
                    {brands?.map((brand) => (
                      <option key={brand.id} value={brand.id}>
                        {brand.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {!categoriesLoading && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Danh mục
                  </label>
                  <select
                    value={filters.categoryId || ''}
                    onChange={(e) => handleFilterChange('categoryId', e.target.value ? Number(e.target.value) : undefined)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  >
                    <option value="">Tất cả</option>
                    {categories?.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.displayName || category.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Khoảng giá
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min="0"
                    step="1000"
                    value={filters.minPrice || ''}
                    onChange={(e) => handleFilterChange('minPrice', e.target.value ? Number(e.target.value) : undefined)}
                    placeholder="Từ"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  />
                  <span className="text-gray-500">-</span>
                  <input
                    type="number"
                    min="0"
                    step="1000"
                    value={filters.maxPrice || ''}
                    onChange={(e) => handleFilterChange('maxPrice', e.target.value ? Number(e.target.value) : undefined)}
                    placeholder="Đến"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Đánh giá tối thiểu
                </label>
                <select
                  value={filters.minRating || ''}
                  onChange={(e) => handleFilterChange('minRating', e.target.value ? Number(e.target.value) : undefined)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                >
                  <option value="">Tất cả</option>
                  <option value="1">1 sao trở lên</option>
                  <option value="2">2 sao trở lên</option>
                  <option value="3">3 sao trở lên</option>
                  <option value="4">4 sao trở lên</option>
                </select>
              </div>
            </div>
          </div>

          {/* Product List */}
          <div className="flex-1 p-4 overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Đã chọn: {selectedProductIds.size} sản phẩm
                </span>
                <button
                  onClick={selectAllProducts}
                  className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200"
                >
                  Chọn tất cả
                </button>
                {selectedProductIds.size > 0 && (
                  <button
                    onClick={clearSelection}
                    className="text-sm text-red-600 hover:text-red-800"
                  >
                    Xóa chọn
                  </button>
                )}
              </div>
            </div>

            {productsLoading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-2 text-gray-600 dark:text-gray-400">Đang tải sản phẩm...</p>
              </div>
            ) : products?.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-600 dark:text-gray-400">Không tìm thấy sản phẩm nào</p>
              </div>
            ) : (
              <div className="space-y-2">
                {products?.map((product) => (
                  <div
                    key={product.id}
                    className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition-colors ${
                      selectedProductIds.has(product.id)
                        ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800'
                        : 'bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600'
                    }`}
                    onClick={() => toggleProductSelection(product.id)}
                  >
                    <div className="flex-shrink-0">
                      {selectedProductIds.has(product.id) ? (
                        <FiCheck className="w-5 h-5 text-blue-600" />
                      ) : (
                        <FiSquare className="w-5 h-5 text-gray-400" />
                      )}
                    </div>
                    <div className="flex-shrink-0 w-16 h-16 bg-gray-100 dark:bg-gray-600 rounded-lg overflow-hidden">
                      {product.imageUrl && (
                        <img
                          src={product.imageUrl}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-gray-900 dark:text-white truncate">
                        {product.name}
                      </h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        ID: {product.id} | SPU: {product.spu}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="flex flex-col items-end">
                        {product.displaySalePrice && product.displayOriginalPrice && product.displaySalePrice < product.displayOriginalPrice ? (
                          <>
                            <p className="font-medium text-red-600 dark:text-red-400">
                              {product.displaySalePrice.toLocaleString('vi-VN')}₫
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-400 line-through">
                              {product.displayOriginalPrice.toLocaleString('vi-VN')}₫
                            </p>
                            {product.discountType === 'PERCENTAGE' && product.discountValue && (
                              <p className="text-xs text-green-600 dark:text-green-400">
                                -{product.discountValue}%
                              </p>
                            )}
                          </>
                        ) : (
                          <p className="font-medium text-gray-900 dark:text-white">
                            {product.displayOriginalPrice ? product.displayOriginalPrice.toLocaleString('vi-VN') + '₫' : 'N/A'}
                          </p>
                        )}
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        {product.averageRating ? product.averageRating.toFixed(1) : '0.0'} ⭐ ({product.totalRatings || 0})
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-end gap-3 p-6 border-t bg-gray-50 dark:bg-gray-800">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            Hủy
          </button>
          <button
            onClick={handleConfirm}
            disabled={selectedProductIds.size === 0}
            className="w-full sm:w-auto px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            Tiến hành kiểm kho ({selectedProductIds.size} sản phẩm)
          </button>
        </div>
      </div>
    </div>
  );
}