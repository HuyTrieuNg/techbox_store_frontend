/**
 * ProductList - UI Component
 * 
 * Hiển thị danh sách sản phẩm dạng grid
 * Dùng cho cả Admin và Staff
 */

import ProductCard from './ProductCard';
import { ProductManagementItem } from '@/features/productManagement';

interface ProductListProps {
  products: ProductManagementItem[];
  onEdit?: (product: ProductManagementItem) => void;
  onDelete?: (product: ProductManagementItem) => void;
  onPublish?: (product: ProductManagementItem) => void;
  onDraft?: (product: ProductManagementItem) => void;
  onRestore?: (product: ProductManagementItem) => void;
  showActions?: boolean;
  isLoading?: boolean;
  emptyMessage?: string;
}

export default function ProductList({
  products,
  onEdit,
  onDelete,
  onPublish,
  onDraft,
  onRestore,
  showActions = true,
  isLoading = false,
  emptyMessage = 'Không có sản phẩm nào',
}: ProductListProps) {
  // Loading skeleton
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <div key={i} className="bg-white rounded-lg shadow animate-pulse">
            <div className="w-full h-48 bg-gray-200 rounded-t-lg"></div>
            <div className="p-4">
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3 mb-3"></div>
              <div className="h-6 bg-gray-200 rounded w-1/2 mb-3"></div>
              <div className="h-4 bg-gray-200 rounded w-1/3"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Empty state
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-gray-500 bg-white rounded-lg shadow">
        <div className="w-24 h-24 mb-4 bg-gray-100 rounded-full flex items-center justify-center">
          <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
          </svg>
        </div>
        <p className="text-lg font-medium">{emptyMessage}</p>
      </div>
    );
  }

  // Product grid
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onEdit={onEdit}
          onDelete={onDelete}
          onPublish={onPublish}
          onDraft={onDraft}
          onRestore={onRestore}
          showActions={showActions}
        />
      ))}
    </div>
  );
}
