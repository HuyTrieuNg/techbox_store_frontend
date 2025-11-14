/**
 * ProductDetailInfo Component
 * Hiển thị thông tin chi tiết sản phẩm (phần trên)
 */

'use client';

import { useState } from 'react';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import { ProductDetail } from '@/features/productDetail';
import { FiTag, FiPackage, FiStar, FiClock, FiShield, FiChevronDown, FiChevronUp } from 'react-icons/fi';

interface ProductDetailInfoProps {
  product: ProductDetail;
  onEdit?: (p: ProductDetail) => void;
  onDelete?: (p: ProductDetail) => void;
  onPublish?: (p: ProductDetail) => void;
  onDraft?: (p: ProductDetail) => void;
  onRestore?: (p: ProductDetail) => void;
}

export default function ProductDetailInfo({ product, onEdit, onDelete, onPublish, onDraft, onRestore }: ProductDetailInfoProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'PUBLISHED':
        return { bg: 'bg-green-100', text: 'text-green-800', label: 'Đã xuất bản' };
      case 'DRAFT':
        return { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'Bản nháp' };
      case 'DELETED':
        return { bg: 'bg-red-100', text: 'text-red-800', label: 'Đã xóa' };
      default:
        return { bg: 'bg-gray-100', text: 'text-gray-800', label: status };
    }
  };

  const statusBadge = getStatusBadge(product.status);
  
  // Check if description is long (more than 300 characters)
  const isLongDescription = product.description && product.description.length > 300;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Image */}
        <div className="lg:col-span-1">
          <div className="relative w-full aspect-square bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden">
            {product.imageUrl ? (
              <Image
                src={product.imageUrl}
                alt={product.name}
                fill
                quality={100}
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <FiPackage className="w-24 h-24 text-gray-300 dark:text-gray-600" />
              </div>
            )}
          </div>
        </div>

        {/* Right: Info */}
        <div className="lg:col-span-2 space-y-4">
          {/* Header */}
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{product.name}</h1>
              <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                <span className="flex items-center gap-1">
                  <FiTag className="w-4 h-4" />
                  <span className="font-mono">{product.spu}</span>
                </span>
                <span>ID: #{product.id}</span>
              </div>
              <span className={`px-3 py-1 text-sm font-semibold rounded-full ${statusBadge.bg} ${statusBadge.text}`}>
                {statusBadge.label}
              </span>
            </div>

            <div className="flex items-center gap-3">
              

              {/* Actions based on status */}
              <div className="flex items-center gap-2">
                {/* Edit always available */}
                <button
                  onClick={() => onEdit?.(product)}
                  className="px-3 py-1 bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-100 dark:hover:bg-gray-600 text-sm"
                >
                  Chỉnh sửa
                </button>

                {product.status === 'PUBLISHED' && (
                  <>
                    <button
                      onClick={() => onDraft?.(product)}
                      className="px-3 py-1 bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400 rounded hover:bg-yellow-100 dark:hover:bg-yellow-900/30 text-sm"
                    >
                      Đặt nháp
                    </button>
                    <button
                      onClick={() => onDelete?.(product)}
                      className="px-3 py-1 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 rounded hover:bg-red-100 dark:hover:bg-red-900/30 text-sm"
                    >
                      Xóa
                    </button>
                  </>
                )}

                {product.status === 'DRAFT' && (
                  <>
                    <button
                      onClick={() => onPublish?.(product)}
                      className="px-3 py-1 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 rounded hover:bg-green-100 dark:hover:bg-green-900/30 text-sm"
                    >
                      Xuất bản
                    </button>
                    <button
                      onClick={() => onDelete?.(product)}
                      className="px-3 py-1 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 rounded hover:bg-red-100 dark:hover:bg-red-900/30 text-sm"
                    >
                      Xóa
                    </button>
                  </>
                )}

                {product.status === 'DELETED' && (
                  <>
                    <button
                      onClick={() => onRestore?.(product)}
                      className="px-3 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 rounded hover:bg-blue-100 dark:hover:bg-blue-900/30 text-sm"
                    >
                      Khôi phục
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Category & Brand */}
          <div className="grid grid-cols-2 gap-4 py-4 border-y border-gray-200 dark:border-gray-600">
            <div>
              <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Danh mục</div>
              <div className="font-medium text-gray-900 dark:text-white">{product.categoryName}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500 mb-1">Thương hiệu</div>
              <div className="font-medium text-gray-900">{product.brandName}</div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{product.totalVariations}</div>
              <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">Tổng biến thể</div>
            </div>
            <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">{product.activeVariations}</div>
              <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">Đang hoạt động</div>
            </div>
            <div className="text-center p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
              <div className="flex items-center justify-center gap-1 text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                <FiStar className="w-5 h-5 fill-current" />
                {product.averageRating.toFixed(1)}
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">{product.totalRatings} đánh giá</div>
            </div>
            <div className="text-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <div className="flex items-center justify-center gap-1 text-xl font-bold text-purple-600 dark:text-purple-400">
                <FiShield className="w-5 h-5" />
                {product.warrantyMonths || 0} tháng
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">Bảo hành</div>
            </div>
          </div>

          {/* Price Range */}
          {product.displaySalePrice && (
            <div className="flex items-baseline gap-3 py-3 border-t border-gray-200 dark:border-gray-600">
              <span className="text-sm text-gray-500">Giá hiển thị:</span>
              <span className="text-2xl font-bold text-blue-600">
                {product.displaySalePrice.toLocaleString('vi-VN')}đ
              </span>
              {product.displayOriginalPrice && product.displayOriginalPrice > product.displaySalePrice && (
                <span className="text-lg text-gray-400 line-through">
                  {product.displayOriginalPrice.toLocaleString('vi-VN')}đ
                </span>
              )}
            </div>
          )}

          {/* Attributes */}
          {product.attributes && product.attributes.length > 0 && (
            <div className="space-y-2">
              <h3 className="font-semibold text-gray-900">Thuộc tính sản phẩm</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {product.attributes.map((attr) => (
                  <div key={attr.attributeId} className="flex items-center gap-2 text-sm">
                    <span className="text-gray-600">{attr.attributeName}:</span>
                    <span className="font-medium text-gray-900">{attr.attributeValue}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Timestamps */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-4 border-t text-xs text-gray-500">
            <div className="flex items-center gap-2">
              <FiClock className="w-4 h-4" />
              <div>
                <div className="font-medium">Tạo</div>
                <div>{new Date(product.createdAt).toLocaleString('vi-VN')}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <FiClock className="w-4 h-4" />
              <div>
                <div className="font-medium">Cập nhật</div>
                <div>{new Date(product.updatedAt).toLocaleString('vi-VN')}</div>
              </div>
            </div>
            {product.deletedAt && (
              <div className="flex items-center gap-2 text-red-600">
                <FiClock className="w-4 h-4" />
                <div>
                  <div className="font-medium">Xóa</div>
                  <div>{new Date(product.deletedAt).toLocaleString('vi-VN')}</div>
                </div>
              </div>
            )}
          </div>

          {/* Description - Moved to bottom for better expandability */}
          {product.description && (
            <div className="border border-gray-200 dark:border-gray-600 rounded-lg p-4 bg-gray-50 dark:bg-gray-700 mt-4">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Mô tả sản phẩm</h3>
              <div 
                className={`prose prose-sm max-w-none text-gray-700 dark:text-gray-300 ${
                  isLongDescription && !isExpanded ? 'line-clamp-6' : ''
                }`}
              >
                <ReactMarkdown
                  components={{
                    // Custom styling for markdown elements
                    h1: ({node, ...props}) => <h1 className="text-xl font-bold mt-4 mb-2" {...props} />,
                    h2: ({node, ...props}) => <h2 className="text-lg font-bold mt-3 mb-2" {...props} />,
                    h3: ({node, ...props}) => <h3 className="text-base font-bold mt-2 mb-1" {...props} />,
                    p: ({node, ...props}) => <p className="mb-2" {...props} />,
                    ul: ({node, ...props}) => <ul className="list-disc list-inside mb-2 space-y-1" {...props} />,
                    ol: ({node, ...props}) => <ol className="list-decimal list-inside mb-2 space-y-1" {...props} />,
                    li: ({node, ...props}) => <li className="ml-4" {...props} />,
                    strong: ({node, ...props}) => <strong className="font-semibold text-gray-900" {...props} />,
                    em: ({node, ...props}) => <em className="italic" {...props} />,
                    code: ({node, ...props}) => <code className="bg-gray-200 px-1 py-0.5 rounded text-sm font-mono" {...props} />,
                    blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-gray-300 pl-4 italic my-2" {...props} />,
                  }}
                >
                  {product.description}
                </ReactMarkdown>
              </div>
              {isLongDescription && (
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="mt-2 flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors"
                >
                  {isExpanded ? (
                    <>
                      <FiChevronUp className="w-4 h-4" />
                      Thu gọn
                    </>
                  ) : (
                    <>
                      <FiChevronDown className="w-4 h-4" />
                      Xem thêm
                    </>
                  )}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
