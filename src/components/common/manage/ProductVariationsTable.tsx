/**
 * ProductVariationsTable Component
 * Hiển thị bảng danh sách biến thể (phần dưới)
 */

'use client';

import Image from 'next/image';
import { ProductVariation } from '@/features/productDetail';
import { FiPackage, FiTag, FiPercent, FiClock, FiTrash2, FiRefreshCw, FiX, FiEdit2 } from 'react-icons/fi';
import { deleteVariation, restoreVariation } from '@/services/productDetailService';
import { useState, useEffect } from 'react';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/UI/hover-card';
import ProductVariationEditForm from '@/components/common/manage/product/ProductVariationEditForm';

interface ProductVariationsTableProps {
  variations: ProductVariation[];
  isLoading?: boolean;
  includeDeleted: boolean;
  onToggleDeleted: (value: boolean) => void;
  mutate?: (data?: any, shouldRevalidate?: boolean) => Promise<any>; // SWR mutate function
}

export default function ProductVariationsTable({
  variations,
  isLoading = false,
  includeDeleted,
  onToggleDeleted,
  mutate, // will be ignored
}: ProductVariationsTableProps) {
  const [processingId, setProcessingId] = useState<number | null>(null);
  const [localVariations, setLocalVariations] = useState<Array<ProductVariation>>([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingVariation, setEditingVariation] = useState<ProductVariation | null>(null);

  useEffect(() => {
    setLocalVariations(Array.isArray(variations) ? variations : []);
  }, [variations]);

  // Filter variations based on includeDeleted
  const filteredVariations = includeDeleted
    ? localVariations.filter(v => v.deletedAt !== null)
    : localVariations.filter(v => v.deletedAt === null);

  if (isLoading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-gray-200 dark:bg-gray-600 rounded w-1/4"></div>
          <div className="h-64 bg-gray-200 dark:bg-gray-600 rounded"></div>
        </div>
      </div>
    );
  }

  // Delete handler
  const handleDelete = async (variationId: number) => {
    setProcessingId(variationId);
    const now = new Date().toISOString();
    // Save previous state for rollback
    const prev = [...localVariations];
    // Optimistically update UI
    setLocalVariations(localVariations.map(v =>
      v.id === variationId ? { ...v, deletedAt: now, updatedAt: now } : v
    ));
    try {
      await deleteVariation(variationId);
      // Success: keep UI
    } catch (error) {
      // Rollback
      setLocalVariations(prev);
    } finally {
      setProcessingId(null);
    }
  };

  // Restore handler
  const handleRestore = async (variationId: number) => {
    setProcessingId(variationId);
    const now = new Date().toISOString();
    const prev = [...localVariations];
    setLocalVariations(localVariations.map(v =>
      v.id === variationId ? { ...v, deletedAt: null, updatedAt: now } : v
    ));
    try {
      await restoreVariation(variationId);
    } catch (error) {
      setLocalVariations(prev);
    } finally {
      setProcessingId(null);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-600 flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          Biến thể sản phẩm ({filteredVariations.length})
        </h2>
        
        {/* Toggle Deleted */}
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={includeDeleted}
            onChange={(e) => onToggleDeleted(e.target.checked)}
            className="w-4 h-4 text-blue-600 border-gray-300 dark:border-gray-600 rounded focus:ring-blue-500"
          />
          <span className="text-sm text-gray-700 dark:text-gray-300">Hiển thị biến thể đã xóa</span>
        </label>
      </div>
      {/* Card Layout: each variation takes full row */}
      <div className="divide-y divide-gray-200 dark:divide-gray-600">
        {filteredVariations.map((variation) => {
          const images = variation.images || [];
          const displayImages = images.slice(0, 3); // Show max 3 images
          const remainingCount = Math.max(0, images.length - 3);

          return (
            <div key={variation.id} className={`p-6 ${variation.deletedAt ? 'bg-red-50 dark:bg-red-900/20' : 'bg-white dark:bg-gray-800'} hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors`}>
              <div className="flex gap-6">
                {/* Images Section */}
                <div className="flex-shrink-0">
                  <HoverCard>
                    <HoverCardTrigger asChild>
                      <div className="flex flex-col gap-2 cursor-pointer">
                        {displayImages.length > 0 ? (
                          <>
                            {displayImages.map((img, idx) => (
                              <div key={img.id} className="w-16 h-16 relative bg-gray-100 dark:bg-gray-600 rounded-lg overflow-hidden flex-shrink-0">
                                <Image
                                  src={img.imageUrl}
                                  alt={`${variation.variationName} - ${idx + 1}`}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                            ))}
                            {remainingCount > 0 && (
                              <div className="w-16 h-16 relative bg-gray-100 dark:bg-gray-600 rounded-lg flex items-center justify-center flex-shrink-0">
                                <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                                  +{remainingCount}
                                </span>
                              </div>
                            )}
                          </>
                        ) : (
                          <div className="w-16 h-16 relative bg-gray-100 dark:bg-gray-600 rounded-lg flex items-center justify-center">
                            <FiPackage className="w-8 h-8 text-gray-400" />
                          </div>
                        )}
                      </div>
                    </HoverCardTrigger>
                    <HoverCardContent side="right" className="w-96 p-4">
                      <div className="space-y-3">
                        <h4 className="font-semibold text-sm">Tất cả ảnh của {variation.variationName}</h4>
                        <div className="grid grid-cols-4 gap-3 max-h-80 overflow-y-auto">
                          {images.map((img, idx) => (
                            <div key={img.id} className="relative group">
                              <div className="aspect-square relative bg-gray-100 dark:bg-gray-600 rounded overflow-hidden">
                                <Image
                                  src={img.imageUrl}
                                  alt={`${variation.variationName} - ${idx + 1}`}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <div className="absolute bottom-1 right-1 bg-black bg-opacity-75 text-white text-xs px-1 py-0.5 rounded">
                                {idx + 1}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </HoverCardContent>
                  </HoverCard>
                </div>

                {/* Content Section */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                        {variation.variationName}
                      </h3>
                      <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                        <span className="flex items-center gap-1">
                          <FiTag className="w-4 h-4" />
                          SKU: {variation.sku}
                        </span>
                        <span>ID: #{variation.id}</span>
                        <span>Product ID: #{variation.productId}</span>
                        <span className={`font-medium px-2 py-1 rounded-full text-xs ${variation.availableQuantity === 0 ? 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400' : variation.availableQuantity < 10 ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400' : 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400'}`}>
                          {variation.availableQuantity === 0 ? 'Hết hàng' : variation.availableQuantity < 10 ? 'Sắp hết' : 'Còn hàng'}
                        </span>
                      </div>
                       
                    </div>

                    {/* Action Button */}
                    <div className="flex-shrink-0 flex items-center gap-2">
                      {!variation.deletedAt && (
                        <button
                          onClick={() => {
                            setEditingVariation(variation);
                            setShowEditModal(true);
                          }}
                          className="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors flex items-center gap-1.5"
                        >
                          <FiEdit2 className="w-4 h-4" />
                          Chỉnh sửa
                        </button>
                      )}
                      {variation.deletedAt ? (
                        <button
                          onClick={() => handleRestore(variation.id)}
                          disabled={processingId === variation.id}
                          className="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors flex items-center gap-1.5 disabled:opacity-50"
                        >
                          <FiRefreshCw className="w-4 h-4" />
                          Khôi phục
                        </button>
                      ) : (
                        <button
                          onClick={() => handleDelete(variation.id)}
                          disabled={processingId === variation.id}
                          className="px-3 py-1.5 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700 transition-colors flex items-center gap-1.5 disabled:opacity-50"
                        >
                          <FiTrash2 className="w-4 h-4" />
                          Xóa
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Price Information */}
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
                    {/* 1. GIÁ NHẬP - MÀU CAM (Cost/Expense) */}
                    <div className="bg-orange-50 dark:bg-orange-900/20 p-3 rounded-lg border border-orange-100 dark:border-orange-800">
                      <div className="text-xs text-orange-600 dark:text-orange-400 mb-1">
                        Giá nhập trung bình
                      </div>
                      <div className="text-sm font-medium text-orange-700 dark:text-orange-300">
                        {variation.costPrice.toLocaleString("vi-VN")}đ
                      </div>
                    </div>

                    {/* 2. GIÁ GỐC - MÀU TÍM (Reference) */}
                    <div className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded-lg border border-purple-100 dark:border-purple-800">
                      <div className="text-xs text-purple-600 dark:text-purple-400 mb-1">
                        Giá gốc
                      </div>
                      <div className="text-sm font-medium text-purple-700 dark:text-purple-300">
                        {variation.price.toLocaleString("vi-VN")}đ
                      </div>
                    </div>

                    {/* 3. GIÁ BÁN - MÀU XANH DƯƠNG (Primary Revenue) */}
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg border border-blue-100 dark:border-blue-800">
                      <div className="text-xs text-blue-600 dark:text-blue-400 mb-1">
                        Giá bán
                      </div>
                      <div className="text-sm font-bold text-blue-700 dark:text-blue-300">
                        {variation.salePrice.toLocaleString("vi-VN")}đ
                      </div>
                    </div>

                    {/* 4. GIẢM GIÁ - MÀU XANH NGỌC (Deal/Info) */}
                    <div className="bg-teal-50 dark:bg-teal-900/20 p-3 rounded-lg border border-teal-100 dark:border-teal-800">
                      <div className="text-xs text-teal-600 dark:text-teal-400 mb-1">
                        Giảm giá
                      </div>
                      <div className="text-sm font-medium text-teal-700 dark:text-teal-300">
                        {variation.price > variation.salePrice
                          ? `${((1 - variation.salePrice / variation.price) * 100).toFixed(1)}%`
                          : "0%"}
                      </div>
                    </div>

                      {/* 5. TỒN KHO - LOGIC ĐỎ/VÀNG/XANH LÁ (Status) */}
                    <div
                      className={`p-3 rounded-lg border ${
                        variation.availableQuantity === 0
                          ? "bg-red-50 dark:bg-red-900/20 border-red-100 dark:border-red-800"
                          : variation.availableQuantity < 10
                          ? "bg-yellow-50 dark:bg-yellow-900/20 border-yellow-100 dark:border-yellow-800"
                          : "bg-emerald-50 dark:bg-emerald-900/20 border-emerald-100 dark:border-emerald-800"
                      }`}
                    >
                      <div
                        className={`text-xs mb-1 ${
                          variation.availableQuantity === 0
                            ? "text-red-600 dark:text-red-400"
                            : variation.availableQuantity < 10
                            ? "text-yellow-600 dark:text-yellow-400"
                            : "text-emerald-600 dark:text-emerald-400"
                        }`}
                      >
                        Tồn kho
                      </div>
                      <div
                        className={`text-sm font-bold ${
                          variation.availableQuantity === 0
                            ? "text-red-700 dark:text-red-300"
                            : variation.availableQuantity < 10
                            ? "text-yellow-700 dark:text-yellow-300"
                            : "text-emerald-700 dark:text-emerald-300"
                        }`}
                      >
                        {variation.availableQuantity}/{variation.stock}
                      </div>
                    </div>
                  </div>

                 

                  {/* Attributes */}
                  {variation.attributes && variation.attributes.length > 0 && (
                    <div className="mb-4">
                      <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Thuộc tính:</div>
                      <div className="flex flex-wrap gap-2">
                        {variation.attributes.map(attr => (
                          <span key={attr.attributeId} className="px-2 py-1 bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-300 text-xs rounded-md">
                            {attr.attributeName}: {attr.attributeValue}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Promotion */}
                  {(variation.promotionName || variation.discountType) && (
                    <div className="mb-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                      <div className="flex items-center gap-2 mb-2">
                        <FiPercent className="w-4 h-4 text-green-600" />
                        <span className="text-sm font-medium text-green-700 dark:text-green-300">
                          {variation.promotionName || 'Khuyến mãi'}
                        </span>
                      </div>
                      {variation.discountType && (
                        <div className="text-sm text-green-600 dark:text-green-400">
                          Giảm: {variation.discountType === 'PERCENTAGE'
                            ? `${variation.discountValue}%`
                            : `${variation.discountValue?.toLocaleString('vi-VN')}đ`
                          }
                        </div>
                      )}
                      {variation.promotionStartDate && variation.promotionEndDate && (
                        <div className="text-xs text-green-500 dark:text-green-400 mt-1">
                          {new Date(variation.promotionStartDate).toLocaleDateString('vi-VN')} - {new Date(variation.promotionEndDate).toLocaleDateString('vi-VN')}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Timestamps */}
                  <div className="text-xs text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-600 pt-3">
                    Tạo: {new Date(variation.createdAt).toLocaleString('vi-VN')} |
                    Cập nhật: {new Date(variation.updatedAt).toLocaleString('vi-VN')}
                    {variation.deletedAt && (
                      <> | Xóa: {new Date(variation.deletedAt).toLocaleString('vi-VN')}</>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        {filteredVariations.length === 0 && (
          <div className="text-center py-12 text-gray-500 dark:text-gray-400">
            <FiPackage className="w-16 h-16 mx-auto mb-4 text-gray-300 dark:text-gray-600" />
            <p className="text-lg font-medium">
              {includeDeleted ? 'Không có biến thể nào' : 'Không có biến thể đang hoạt động'}
            </p>
          </div>
        )}
      </div>

      {/* Edit Variation Modal */}
      {showEditModal && editingVariation && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-7xl w-full max-h-[90vh] overflow-hidden">
            <div className="p-6 border-b border-gray-200 dark:border-gray-600">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Chỉnh sửa biến thể: {editingVariation.variationName}
                </h3>
                <button
                  onClick={() => {
                    setShowEditModal(false);
                    setEditingVariation(null);
                  }}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <FiX className="w-6 h-6" />
                </button>
              </div>
            </div>
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
              <ProductVariationEditForm
                variation={editingVariation}
                onSuccess={() => {
                  setShowEditModal(false);
                  setEditingVariation(null);
                  mutate?.(); // Refresh variations list
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
