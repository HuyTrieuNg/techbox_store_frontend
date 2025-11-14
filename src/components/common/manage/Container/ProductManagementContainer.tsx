/**
 * ProductManagementContainer - Container Component
 */

'use client';

import { useState, useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import ProductStatusFilter from '../ProductStatusFilter';
import ProductFilters from '../ProductFilters';
import ProductSorting from '../ProductSorting';
import ProductTable from '../ProductTable';
import ProductList from '../ProductList';
import ProductPagination from '../ProductPagination';
import ProductCreateForm from '../product/ProductCreateForm';
import { FiGrid, FiList } from 'react-icons/fi';
import { ProductManagementItem } from '@/features/productManagement';
import { useBrands } from '@/hooks/useBrands';
import { useCategories } from '@/hooks/useCategories';
import { useProductManagement } from '@/hooks/useProductManagement';

export default function ProductManagementContainer() {
  const router = useRouter();
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
  const [showCreateModal, setShowCreateModal] = useState(false);

  const handleEdit = useCallback((product: ProductManagementItem) => {
    console.log('Edit product:', product);
  }, []);

  const handleCreateSuccess = useCallback((productId: number) => {
    setShowCreateModal(false);
    router.push(`/admin/products/${productId}`);
  }, [router]);

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
    <div className="space-y-6 bg-white dark:bg-gray-900 min-h-screen p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Quản lý sản phẩm</h1>
        <button 
          onClick={() => setShowCreateModal(true)}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white font-medium rounded-lg transition-colors"
        >
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
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow mb-6 px-6 py-4">
          <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
            <span className="text-sm">Đang tải bộ lọc...</span>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between bg-white dark:bg-gray-800 rounded-lg shadow px-6 py-4">
        <ProductSorting 
          sort={{ sortBy: sortBy || 'id', sortDirection }} 
          onSortChange={handleSortChangeWrapper} 
        />

        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Hiển thị:</span>
          <div className="flex border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden">
            <button
              onClick={() => setViewMode('table')}
              className={`px-3 py-2 flex items-center gap-2 transition-colors ${
                viewMode === 'table'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              <FiList className="w-4 h-4" />
              <span className="text-sm">Bảng</span>
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`px-3 py-2 flex items-center gap-2 border-l border-gray-300 dark:border-gray-600 transition-colors ${
                viewMode === 'grid'
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 border-gray-300 dark:border-gray-600'
              }`}
            >
              <FiGrid className="w-4 h-4" />
              <span className="text-sm">Lưới</span>
            </button>
          </div>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 text-red-800 dark:text-red-200">
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

      {/* Create Product Modal */}
      {showCreateModal && (
        <div 
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={() => setShowCreateModal(false)}
        >
          <div 
            className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto m-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Thêm sản phẩm mới</h2>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                >
                  ✕
                </button>
              </div>
              <ProductCreateForm onSuccess={handleCreateSuccess} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
