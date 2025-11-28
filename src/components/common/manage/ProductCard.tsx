/**
 * ProductCard - UI Component
 * 
 * Hiển thị thông tin sản phẩm trong dạng card
 * Dùng cho cả Admin và Staff
 */

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FiEdit2, FiTrash2, FiStar, FiCheckCircle, FiFileText, FiRotateCcw, FiEye } from 'react-icons/fi';
import { ProductManagementItem } from '@/features/productManagement';

interface ProductCardProps {
  product: ProductManagementItem;
  onEdit?: (product: ProductManagementItem) => void;
  onPublish?: (product: ProductManagementItem) => void;
  onDraft?: (product: ProductManagementItem) => void;
  onDelete?: (product: ProductManagementItem) => void;
  onRestore?: (product: ProductManagementItem) => void;
  showActions?: boolean;
}

export default function ProductCard({
  product,
  onEdit,
  onDelete,
  onPublish,
  onDraft,
  onRestore,
  showActions = true,
}: ProductCardProps) {
  const pathname = usePathname();
  const baseUrl = pathname?.startsWith('/staff') ? '/staff' : '/admin';
  
  const hasDiscount = product.displaySalePrice && product.displayOriginalPrice && 
                      product.displaySalePrice < product.displayOriginalPrice;

  // Get status badge color
  const getStatusBadge = (status?: string) => {
    switch (status) {
      case 'PUBLISHED':
        return { bg: 'bg-green-100', text: 'text-green-800', label: 'Đã xuất bản' };
      case 'DRAFT':
        return { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'Bản nháp' };
      case 'DELETED':
        return { bg: 'bg-red-100', text: 'text-red-800', label: 'Đã xóa' };
      default:
        return { bg: 'bg-gray-100', text: 'text-gray-800', label: 'N/A' };
    }
  };

  const statusBadge = getStatusBadge(product.status);

  return (
    <div
      className="bg-white rounded-lg shadow hover:shadow-md transition-shadow duration-200 cursor-pointer group"
      onClick={() => window.location.assign(`${baseUrl}/products/${product.id}`)}
    >
      {/* Image */}
      <div className="relative w-full h-48 bg-gray-100 rounded-t-lg overflow-hidden">
        {product.imageUrl ? (
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-100">
            <svg className="w-16 h-16 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
          </div>
        )}
        
        {/* Discount Badge */}
        {hasDiscount && (
          <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">
            {product.discountType === 'PERCENTAGE' 
              ? `-${product.discountValue}%`
              : `-${product.discountValue?.toLocaleString('vi-VN')}đ`
            }
          </div>
        )}
        
        {/* Status Badge */}
        {product.status && (
          <div className={`absolute top-2 left-2 ${statusBadge.bg} ${statusBadge.text} px-2 py-1 rounded text-xs font-semibold`}>
            {statusBadge.label}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Product Name */}
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 min-h-[3rem] break-words" title={product.name}>
          {product.name}
        </h3>

        {/* Price */}
        <div className="mb-3">
          {product.displaySalePrice ? (
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-bold text-blue-600">
                {product.displaySalePrice.toLocaleString('vi-VN')}đ
              </span>
              {hasDiscount && (
                <span className="text-sm text-gray-400 line-through">
                  {product.displayOriginalPrice?.toLocaleString('vi-VN')}đ
                </span>
              )}
            </div>
          ) : (
            <span className="text-sm text-gray-500">Chưa có giá</span>
          )}
        </div>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center gap-1">
            <FiStar className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-sm font-medium text-gray-700">
              {product.averageRating.toFixed(1)}
            </span>
          </div>
          <span className="text-xs text-gray-400">
            ({product.totalRatings} đánh giá)
          </span>
        </div>

        {/* SPU */}
        <div className="text-xs text-gray-500 mb-3">
          SPU: {product.spu}
        </div>

        {/* Product ID */}
        <div className="text-xs text-gray-400 mb-3">
          ID: #{product.id}
        </div>

        {/* Timestamps */}
        <div className="text-xs text-gray-500 space-y-1 mb-3 pb-3 border-b">
          <div className="flex items-center gap-1">
            <span className="font-medium">Tạo:</span>
            <span>{new Date(product.createdAt).toLocaleString('vi-VN')}</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="font-medium">Cập nhật:</span>
            <span>{new Date(product.updatedAt).toLocaleString('vi-VN')}</span>
          </div>
          {product.deleteAt && (
            <div className="flex items-center gap-1 text-red-600">
              <span className="font-medium">Xóa:</span>
              <span>{new Date(product.deleteAt).toLocaleString('vi-VN')}</span>
            </div>
          )}
        </div>

        {/* Actions: only status change buttons, not edit/view */}
        {showActions && (
          <div className="space-y-2 pt-3 border-t" onClick={e => e.stopPropagation()}>
            {/* PUBLISHED: Draft, Delete */}
            {product.status === 'PUBLISHED' && (
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => onDraft?.(product)}
                  className="flex items-center justify-center gap-2 px-3 py-2 bg-yellow-50 text-yellow-600 rounded hover:bg-yellow-100 transition-colors"
                >
                  <FiFileText className="w-4 h-4" />
                  <span className="text-sm font-medium">Draft</span>
                </button>
                <button
                  onClick={() => onDelete?.(product)}
                  className="flex items-center justify-center gap-2 px-3 py-2 bg-red-50 text-red-600 rounded hover:bg-red-100 transition-colors"
                >
                  <FiTrash2 className="w-4 h-4" />
                  <span className="text-sm font-medium">Xóa</span>
                </button>
              </div>
            )}

            {/* DRAFT: Publish, Delete */}
            {product.status === 'DRAFT' && (
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => onPublish?.(product)}
                  className="flex items-center justify-center gap-2 px-3 py-2 bg-green-50 text-green-600 rounded hover:bg-green-100 transition-colors"
                >
                  <FiCheckCircle className="w-4 h-4" />
                  <span className="text-sm font-medium">Xuất bản</span>
                </button>
                <button
                  onClick={() => onDelete?.(product)}
                  className="flex items-center justify-center gap-2 px-3 py-2 bg-red-50 text-red-600 rounded hover:bg-red-100 transition-colors"
                >
                  <FiTrash2 className="w-4 h-4" />
                  <span className="text-sm font-medium">Xóa</span>
                </button>
              </div>
            )}

            {/* DELETED: Restore to Draft */}
            {product.status === 'DELETED' && (
              <button
                onClick={() => onRestore?.(product)}
                className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-yellow-50 text-yellow-600 rounded hover:bg-yellow-100 transition-colors"
              >
                <FiRotateCcw className="w-4 h-4" />
                <span className="text-sm font-medium">Khôi phục về Draft</span>
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
