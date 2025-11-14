/**
 * ProductTable - UI Component
 * 
 * Hiển thị danh sách sản phẩm dạng bảng (table view)
 * Dùng cho Admin và Staff khi muốn xem nhiều thông tin hơn
 */

'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { FiEdit2, FiTrash2, FiStar, FiCheckCircle, FiFileText, FiRotateCcw, FiEye } from 'react-icons/fi';
import { ProductManagementItem } from '@/features/productManagement';

interface ProductTableProps {
  products: ProductManagementItem[];
  onEdit?: (product: ProductManagementItem) => void;
  onDelete?: (product: ProductManagementItem) => void;
  onPublish?: (product: ProductManagementItem) => void;
  onDraft?: (product: ProductManagementItem) => void;
  onRestore?: (product: ProductManagementItem) => void;
  showActions?: boolean;
  isLoading?: boolean;
}

export default function ProductTable({
  products,
  onEdit,
  onDelete,
  onPublish,
  onDraft,
  onRestore,
  showActions = true,
  isLoading = false,
}: ProductTableProps) {
  const pathname = usePathname();
  const router = useRouter();
  const baseUrl = pathname?.startsWith('/staff') ? '/staff' : '/admin';

  // Loading skeleton
  if (isLoading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Sản phẩm</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Giá gốc</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Giá bán</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Giảm giá</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Đánh giá</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">SPU</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Trạng thái</th>
              {showActions && (
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Thao tác</th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {[1, 2, 3, 4, 5].map((i) => (
              <tr key={i} className="animate-pulse">
                <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-12"></div></td>
                <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-32"></div></td>
                <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-20"></div></td>
                <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-20"></div></td>
                <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-16"></div></td>
                <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-16"></div></td>
                <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-16"></div></td>
                <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-20"></div></td>
                {showActions && (
                  <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-24"></div></td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  // Empty state
  if (products.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-12 text-center text-gray-500">
        <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
          <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
          </svg>
        </div>
        <p className="text-lg font-medium">Không có sản phẩm nào</p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Sản phẩm
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Giá gốc
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Giá bán
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Giảm giá
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Đánh giá
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                SPU
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Trạng thái
              </th>
              {showActions && (
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Thao tác
                </th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {products.map((product) => {
              const hasDiscount = product.displaySalePrice && product.displayOriginalPrice && 
                                product.displaySalePrice < product.displayOriginalPrice;

              // Get status badge
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
                <tr key={product.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
                  {/* ID */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    #{product.id}
                  </td>

                  {/* Product Info */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div
                      className="flex items-center cursor-pointer group"
                      onClick={() => router.push(`${baseUrl}/products/${product.id}`)}
                    >
                      <div className="relative w-12 h-12 bg-gray-100 dark:bg-gray-600 rounded overflow-hidden flex-shrink-0">
                        {product.imageUrl ? (
                          <Image
                            src={product.imageUrl}
                            alt={product.name}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-600">
                            <svg className="w-6 h-6 text-gray-300 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                            </svg>
                          </div>
                        )}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900 dark:text-white max-w-xs truncate group-hover:underline">
                          {product.name}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Original Price */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {product.displayOriginalPrice 
                      ? `${product.displayOriginalPrice.toLocaleString('vi-VN')}đ`
                      : '-'
                    }
                  </td>

                  {/* Sale Price */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {product.displaySalePrice ? (
                      <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                        {product.displaySalePrice.toLocaleString('vi-VN')}đ
                      </span>
                    ) : (
                      <span className="text-sm text-gray-500 dark:text-gray-400">-</span>
                    )}
                  </td>

                  {/* Discount */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    {hasDiscount ? (
                      <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-400">
                        {product.discountType === 'PERCENTAGE' 
                          ? `-${product.discountValue}%`
                          : `-${product.discountValue?.toLocaleString('vi-VN')}đ`
                        }
                      </span>
                    ) : (
                      <span className="text-sm text-gray-500">-</span>
                    )}
                  </td>

                  {/* Rating */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-1">
                      <FiStar className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        {product.averageRating.toFixed(1)}
                      </span>
                      <span className="text-xs text-gray-400 dark:text-gray-500">
                        ({product.totalRatings})
                      </span>
                    </div>
                  </td>

                  {/* SPU */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400 font-mono">
                    {product.spu}
                  </td>

                  {/* Status */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${statusBadge.bg} ${statusBadge.text}`}>
                      {statusBadge.label}
                    </span>
                  </td>

                  {/* Actions */}
                  {showActions && (
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex gap-2" onClick={e => e.stopPropagation()}>
                        {/* PUBLISHED: Draft, Delete */}
                        {product.status === 'PUBLISHED' && (
                          <>
                            <button
                              onClick={() => onDraft?.(product)}
                              className="text-yellow-600 hover:text-yellow-900 dark:hover:text-yellow-400 flex items-center gap-1"
                              title="Chuyển về Draft"
                            >
                              <FiFileText className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => onDelete?.(product)}
                              className="text-red-600 hover:text-red-900 dark:hover:text-red-400 flex items-center gap-1"
                              title="Xóa"
                            >
                              <FiTrash2 className="w-4 h-4" />
                            </button>
                          </>
                        )}
                        {/* DRAFT: Publish, Delete */}
                        {product.status === 'DRAFT' && (
                          <>
                            <button
                              onClick={() => onPublish?.(product)}
                              className="text-green-600 hover:text-green-900 dark:hover:text-green-400 flex items-center gap-1"
                              title="Xuất bản"
                            >
                              <FiCheckCircle className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => onDelete?.(product)}
                              className="text-red-600 hover:text-red-900 dark:hover:text-red-400 flex items-center gap-1"
                              title="Xóa"
                            >
                              <FiTrash2 className="w-4 h-4" />
                            </button>
                          </>
                        )}
                        {/* DELETED: Restore to Draft */}
                        {product.status === 'DELETED' && (
                          <button
                            onClick={() => onRestore?.(product)}
                            className="text-yellow-600 hover:text-yellow-900 dark:hover:text-yellow-400 flex items-center gap-1"
                            title="Khôi phục về Draft"
                          >
                            <FiRotateCcw className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
