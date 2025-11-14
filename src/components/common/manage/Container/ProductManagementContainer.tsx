/**
 * ProductManagementContainer - Container Component
 */

'use client';

import { useState, useCallback, useMemo } from 'react';
import ProductStatusFilter from '../ProductStatusFilter';
import ProductFilters from '../ProductFilters';
import ProductSorting from '../ProductSorting';
import ProductTable from '../ProductTable';
import ProductList from '../ProductList';
import ProductPagination from '../ProductPagination';
import { FiGrid, FiList } from 'react-icons/fi';
import { ProductManagementItem } from '@/features/productManagement';
import { useBrands } from '@/hooks/useBrands';
import { useCategories } from '@/hooks/useCategories';
import { useProductManagement } from '@/hooks/useProductManagement';

export default function ProductManagementContainer() {
  const { brands, isLoading: brandsLoading } = useBrands();
  const { categories, isLoading: categoriesLoading } = useCategories();

  const {
    products,
    pagination,
    isLoading,
    error,
    status,
    filters,
    sortBy,
    sortDirection,
    handleStatusChange,
    handleFiltersChange,
    handleSortChange,
    handlePageChange,
    handleSizeChange,
    resetFilters,
    handlePublish: publishById,
    handleDraft: draftById,
    handleDelete: deleteById,
    handleRestore: restoreById,
  } = useProductManagement();

  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');

  const handleEdit = useCallback((product: ProductManagementItem) => {
    console.log('Edit product:', product);
  }, []);

  // Wrapper functions to adapt hook handlers to component interface (memoized)
  const handlePublish = useCallback((product: ProductManagementItem) => {
    publishById(product.id);
  }, [publishById]);

  const handleDraft = useCallback((product: ProductManagementItem) => {
    draftById(product.id);
  }, [draftById]);

  const handleDelete = useCallback((product: ProductManagementItem) => {
    deleteById(product.id);
  }, [deleteById]);

  const handleRestore = useCallback((product: ProductManagementItem) => {
    restoreById(product.id);
  }, [restoreById]);

  // Wrapper for sort change (memoized)
  const handleSortChangeWrapper = useCallback((sort: { sortBy: string; sortDirection: 'ASC' | 'DESC' }) => {
    handleSortChange(sort.sortBy as any, sort.sortDirection);
  }, [handleSortChange]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Quản lý sản phẩm</h1>
        <button className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors">
          + Thêm sản phẩm
        </button>
      </div>

      <ProductStatusFilter value={status} onChange={handleStatusChange} />

      {/* Only render filters when data is ready */}
      {!brandsLoading && !categoriesLoading ? (
        <ProductFilters
          filters={filters}
          onFiltersChange={handleFiltersChange}
          brands={brands}
          categories={categories}
        />
      ) : (
        <div className="bg-white rounded-lg shadow mb-6 px-6 py-4">
          <div className="flex items-center gap-2 text-gray-500">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
            <span className="text-sm">Đang tải bộ lọc...</span>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between bg-white rounded-lg shadow px-6 py-4">
        <ProductSorting 
          sort={{ sortBy: sortBy || 'id', sortDirection }} 
          onSortChange={handleSortChangeWrapper} 
        />

        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-700">Hiển thị:</span>
          <div className="flex border border-gray-300 rounded-lg overflow-hidden">
            <button
              onClick={() => setViewMode('table')}
              className={`px-3 py-2 flex items-center gap-2 transition-colors ${
                viewMode === 'table'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              <FiList className="w-4 h-4" />
              <span className="text-sm">Bảng</span>
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`px-3 py-2 flex items-center gap-2 border-l transition-colors ${
                viewMode === 'grid'
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border-gray-300'
              }`}
            >
              <FiGrid className="w-4 h-4" />
              <span className="text-sm">Lưới</span>
            </button>
          </div>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-800">
          <p className="font-medium">Lỗi tải dữ liệu</p>
          <p className="text-sm mt-1">{error.message}</p>
        </div>
      )}

      {viewMode === 'table' ? (
        <ProductTable
          products={products}
          onEdit={handleEdit}
          onPublish={handlePublish}
          onDraft={handleDraft}
          onDelete={handleDelete}
          onRestore={handleRestore}
          isLoading={isLoading}
        />
      ) : (
        <ProductList
          products={products}
          onEdit={handleEdit}
          onPublish={handlePublish}
          onDraft={handleDraft}
          onDelete={handleDelete}
          onRestore={handleRestore}
          isLoading={isLoading}
        />
      )}

      <ProductPagination
        pagination={pagination}
        onPageChange={handlePageChange}
        onSizeChange={handleSizeChange}
      />
    </div>
  );
}
