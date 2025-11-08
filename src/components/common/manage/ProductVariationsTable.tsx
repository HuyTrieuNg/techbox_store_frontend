/**
 * ProductVariationsTable Component
 * Hiển thị bảng danh sách biến thể (phần dưới)
 */

'use client';

import Image from 'next/image';
import { ProductVariation } from '@/features/productDetail';
import { FiPackage, FiTag, FiPercent, FiClock, FiTrash2, FiRefreshCw } from 'react-icons/fi';
import { deleteVariation, restoreVariation } from '@/services/productDetailService';
import { useState, useEffect } from 'react';

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
  const [imageIndexes, setImageIndexes] = useState<{[id:number]:number}>({});

  useEffect(() => {
    setLocalVariations(Array.isArray(variations) ? variations : []);
  }, [variations]);

  // Auto-slide images for each variation
  useEffect(() => {
    const timers: { [id: number]: NodeJS.Timeout } = {};
    localVariations.forEach(variation => {
      if (variation.images && variation.images.length > 1) {
        timers[variation.id] = setInterval(() => {
          setImageIndexes(prev => ({
            ...prev,
            [variation.id]: ((prev[variation.id] || 0) + 1) % variation.images.length
          }));
        }, 2000);
      }
    });
    return () => {
      Object.values(timers).forEach(clearInterval);
    };
  }, [localVariations]);

  // Filter variations based on includeDeleted
  const filteredVariations = includeDeleted
    ? localVariations.filter(v => v.deletedAt !== null)
    : localVariations.filter(v => v.deletedAt === null);

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-gray-200 rounded w-1/4"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
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
    <div className="bg-white rounded-lg shadow-md">
      {/* Header */}
      <div className="px-6 py-4 border-b flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900">
          Biến thể sản phẩm ({filteredVariations.length})
        </h2>
        
        {/* Toggle Deleted */}
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={includeDeleted}
            onChange={(e) => onToggleDeleted(e.target.checked)}
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <span className="text-sm text-gray-700">Hiển thị biến thể đã xóa</span>
        </label>
      </div>
      {/* Card Layout: each variation is a row */}
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVariations.map((variation) => {
          const images = variation.images || [];
          const imgCount = images.length;
          const imgIdx = imageIndexes[variation.id] || 0;
          const imgSlice = imgCount > 3
            ? images.slice(imgIdx, imgIdx + 3).concat(images.slice(0, Math.max(0, imgIdx + 3 - imgCount)))
            : images;
          return (
            <div key={variation.id} className={`relative rounded-lg shadow border p-4 bg-white flex flex-col gap-2 min-h-[320px] ${variation.deletedAt ? 'bg-red-50 border-red-200' : 'bg-white border-gray-200'}`}>
              {/* Delete/Restore button top-right */}
              <div className="absolute top-2 right-2 z-10">
                {variation.deletedAt ? (
                  <button
                    onClick={() => handleRestore(variation.id)}
                    disabled={processingId === variation.id}
                    className="px-3 py-1 bg-blue-50 text-blue-700 rounded text-xs hover:bg-blue-100 flex items-center gap-1 shadow"
                  >
                    <FiRefreshCw className="w-4 h-4" />
                    Khôi phục
                  </button>
                ) : (
                  <button
                    onClick={() => handleDelete(variation.id)}
                    disabled={processingId === variation.id}
                    className="px-3 py-1 bg-red-50 text-red-700 rounded text-xs hover:bg-red-100 flex items-center gap-1 shadow"
                  >
                    <FiTrash2 className="w-4 h-4" />
                    Xóa
                  </button>
                )}
              </div>
              {/* Row 1: Images */}
              <div className="flex gap-2 justify-center mb-2">
                {imgSlice.length > 0 ? (
                  imgSlice.map((img, idx) => (
                    <div key={img.id + '-' + idx} className="w-16 h-16 relative bg-gray-100 rounded overflow-hidden flex-shrink-0">
                      <Image src={img.imageUrl} alt={`${variation.variationName} - ${idx + 1}`} fill className="object-cover" />
                    </div>
                  ))
                ) : (
                  <div className="w-16 h-16 relative bg-gray-100 rounded overflow-hidden flex items-center justify-center">
                    <FiPackage className="w-10 h-10 text-gray-300" />
                  </div>
                )}
              </div>
              {/* Row 2: Product ID */}
              <div className="text-xs text-gray-400">Product ID: #{variation.productId}</div>
              {/* Row 3: SKU */}
              <div className="text-gray-500 font-mono flex items-center gap-1">
                <FiTag className="w-4 h-4" />
                {variation.sku}
              </div>
              {/* Row 4: Prices */}
              <div className="flex gap-4 items-center">
                <div className="text-sm font-medium text-gray-700">Giá gốc: {variation.price.toLocaleString('vi-VN')}đ</div>
                <div className="font-bold text-blue-600">Giá bán: {variation.salePrice.toLocaleString('vi-VN')}đ</div>
                {variation.price > variation.salePrice && (
                  <div className="text-xs text-green-600">Giảm: {((1 - variation.salePrice / variation.price) * 100).toFixed(1)}%</div>
                )}
              </div>
              {/* Row 5: Stock */}
              <div className="flex gap-4 items-center">
                <span className="text-gray-500 text-xs">Tổng: <span className="font-bold text-gray-900">{variation.stock}</span></span>
                <span className={`font-medium ${variation.reservedQuantity > 0 ? 'text-orange-600' : 'text-gray-400'}`}>Đặt trước: {variation.reservedQuantity}</span>
                <span className={`font-bold ${variation.availableQuantity === 0 ? 'text-red-600' : variation.availableQuantity < 10 ? 'text-yellow-600' : 'text-green-600'}`}>Khả dụng: {variation.availableQuantity}</span>
                {variation.availableQuantity === 0 ? (
                  <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded">Hết hàng</span>
                ) : variation.availableQuantity < 10 ? (
                  <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded">Sắp hết</span>
                ) : (
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">Còn hàng</span>
                )}
              </div>
              {/* Row 6: Timestamps */}
              <div className="flex gap-4 items-center text-xs text-gray-600">
                <span>Tạo: {new Date(variation.createdAt).toLocaleString('vi-VN')}</span>
                <span>Cập nhật: {new Date(variation.updatedAt).toLocaleString('vi-VN')}</span>
                {variation.deletedAt && (
                  <span className="text-red-600">Xóa: {new Date(variation.deletedAt).toLocaleString('vi-VN')}</span>
                )}
              </div>
              {/* Row 7: Promotion */}
              {(variation.promotionName || variation.discountType || variation.promotionId || variation.promotionStartDate || variation.promotionEndDate) && (
                <div className="flex flex-col gap-1 text-xs">
                  {variation.promotionName && (
                    <span className="font-medium text-green-600">{variation.promotionName}</span>
                  )}
                  {variation.discountType && (
                    <span className="flex items-center gap-1 text-red-600 font-semibold">
                      <FiPercent className="w-4 h-4" />
                      {variation.discountType === 'PERCENTAGE'
                        ? `-${variation.discountValue}%`
                        : `-${variation.discountValue?.toLocaleString('vi-VN')}đ`
                      }
                    </span>
                  )}
                  {variation.promotionId && (
                    <span className="text-gray-400">ID: #{variation.promotionId}</span>
                  )}
                  {variation.promotionStartDate && (
                    <span className="text-gray-500 flex items-center gap-1">
                      <FiClock className="w-4 h-4" />
                      Từ: {new Date(variation.promotionStartDate).toLocaleDateString('vi-VN')}
                    </span>
                  )}
                  {variation.promotionEndDate && (
                    <span className="text-gray-500 flex items-center gap-1">
                      <FiClock className="w-4 h-4" />
                      Đến: {new Date(variation.promotionEndDate).toLocaleDateString('vi-VN')}
                    </span>
                  )}
                </div>
              )}
              {/* Row 8: Attributes table */}
              {variation.attributes && variation.attributes.length > 0 && (
                <table className="w-full mt-2 text-xs border border-gray-200 rounded">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-2 py-1 text-left text-gray-500">Tên thuộc tính</th>
                      <th className="px-2 py-1 text-left text-gray-500">Giá trị</th>
                      <th className="px-2 py-1 text-left text-gray-500">ID</th>
                    </tr>
                  </thead>
                  <tbody>
                    {variation.attributes.map(attr => (
                      <tr key={attr.attributeId}>
                        <td className="px-2 py-1">{attr.attributeName}</td>
                        <td className="px-2 py-1">{attr.attributeValue}</td>
                        <td className="px-2 py-1">{attr.attributeId}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          );
        })}
        {filteredVariations.length === 0 && (
          <div className="col-span-full text-center py-12 text-gray-500">
            <FiPackage className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <p className="text-lg font-medium">
              {includeDeleted ? 'Không có biến thể nào' : 'Không có biến thể đang hoạt động'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
