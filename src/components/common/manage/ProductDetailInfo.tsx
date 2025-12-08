/**
 * ProductDetailInfo Component
 * Hiển thị thông tin chi tiết sản phẩm (phần trên)
 */

'use client';

import { useState } from 'react';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ProductDetail } from '@/features/productDetail';
import { FiTag, FiPackage, FiStar, FiClock, FiShield, FiChevronDown, FiChevronUp, FiEdit2, FiTrash2, FiRefreshCw, FiUpload, FiFileText, FiX, FiCamera } from 'react-icons/fi';
import ProductUpdateForm from './product/ProductUpdateForm';
import { uploadProductImage } from '@/services/productManagementService';
import axiosInstance from '@/lib/axios';
import { toast } from 'sonner';

interface ProductDetailInfoProps {
  product: ProductDetail;
  onEdit?: (p: ProductDetail) => void;
  onDelete?: (p: ProductDetail) => void;
  onPublish?: (p: ProductDetail) => void;
  onDraft?: (p: ProductDetail) => void;
  onRestore?: (p: ProductDetail) => void;
  actionLoading?: string | null;
}

export default function ProductDetailInfo({ product, onEdit, onDelete, onPublish, onDraft, onRestore, actionLoading }: ProductDetailInfoProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [showDescriptionModal, setShowDescriptionModal] = useState(false);
  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleImageFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImageFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageUpload = async () => {
    if (!selectedImageFile || !product) return;

    setIsUploading(true);
    try {
      // First upload image to Cloudinary
      const uploadResult = await uploadProductImage(selectedImageFile);

      // Then update product with new image URL
      await axiosInstance.put(`/products/${product.id}`, {
        imageUrl: uploadResult.url,
        imagePublicId: uploadResult.publicId,
      });

      toast.success('Product image updated successfully');
      setShowImageModal(false);
      setSelectedImageFile(null);
      setImagePreview(null);
      // Refresh product data
      onEdit?.(product);
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error('Failed to upload image');
    } finally {
      setIsUploading(false);
    }
  };

  const closeImageModal = () => {
    setShowImageModal(false);
    setSelectedImageFile(null);
    setImagePreview(null);
  };
  
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
          <div className="relative w-full aspect-square bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden group cursor-pointer">
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
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-200 flex items-center justify-center">
              <button
                onClick={() => setShowImageModal(true)}
                className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-white rounded-full p-3 shadow-lg hover:bg-gray-100"
              >
                <FiCamera className="w-6 h-6 text-gray-700" />
              </button>
            </div>
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
                  onClick={() => setShowEditModal(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium shadow-sm"
                >
                  <FiEdit2 className="w-4 h-4" />
                  Chỉnh sửa
                </button>

                {product.status === 'PUBLISHED' && (
                  <>
                    <button
                      onClick={() => onDraft?.(product)}
                      disabled={actionLoading === 'draft'}
                      className="flex items-center gap-2 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors text-sm font-medium shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <FiFileText className="w-4 h-4" />
                      {actionLoading === 'draft' ? 'Đang xử lý...' : 'Đặt nháp'}
                    </button>
                    <button
                      onClick={() => onDelete?.(product)}
                      disabled={actionLoading === 'delete'}
                      className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <FiTrash2 className="w-4 h-4" />
                      {actionLoading === 'delete' ? 'Đang xử lý...' : 'Xóa'}
                    </button>
                  </>
                )}

                {product.status === 'DRAFT' && (
                  <>
                    <button
                      onClick={() => onPublish?.(product)}
                      disabled={actionLoading === 'publish'}
                      className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <FiUpload className="w-4 h-4" />
                      {actionLoading === 'publish' ? 'Đang xử lý...' : 'Xuất bản'}
                    </button>
                    <button
                      onClick={() => onDelete?.(product)}
                      disabled={actionLoading === 'delete'}
                      className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <FiTrash2 className="w-4 h-4" />
                      {actionLoading === 'delete' ? 'Đang xử lý...' : 'Xóa'}
                    </button>
                  </>
                )}

                {product.status === 'DELETED' && (
                  <>
                    <button
                      onClick={() => onRestore?.(product)}
                      disabled={actionLoading === 'restore'}
                      className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <FiRefreshCw className="w-4 h-4" />
                      {actionLoading === 'restore' ? 'Đang xử lý...' : 'Khôi phục'}
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
                  isLongDescription ? 'line-clamp-6' : ''
                }`}
              >
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    h1: ({ children }) => <h1 className="text-2xl font-bold text-gray-900 dark:text-white mt-6 mb-4 first:mt-0">{children}</h1>,
                    h2: ({ children }) => <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-5 mb-3">{children}</h2>,
                    h3: ({ children }) => <h3 className="text-lg font-semibold text-gray-900 dark:text-white mt-4 mb-2">{children}</h3>,
                    h4: ({ children }) => <h4 className="text-base font-semibold text-gray-900 dark:text-white mt-3 mb-2">{children}</h4>,
                    h5: ({ children }) => <h5 className="text-sm font-semibold text-gray-900 dark:text-white mt-3 mb-1">{children}</h5>,
                    h6: ({ children }) => <h6 className="text-sm font-medium text-gray-900 dark:text-white mt-2 mb-1">{children}</h6>,
                    p: ({ children }) => <p className="text-gray-700 dark:text-gray-300 mb-3 leading-relaxed">{children}</p>,
                    ul: ({ children }) => <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mb-3 space-y-1 ml-4">{children}</ul>,
                    ol: ({ children }) => <ol className="list-decimal list-inside text-gray-700 dark:text-gray-300 mb-3 space-y-1 ml-4">{children}</ol>,
                    li: ({ children }) => <li className="text-gray-700 dark:text-gray-300">{children}</li>,
                    blockquote: ({ children }) => <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-600 dark:text-gray-400 my-4 bg-blue-50 dark:bg-blue-900/20 py-2 px-3 rounded-r">{children}</blockquote>,
                    code: ({ children }) => <code className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-2 py-1 rounded text-sm font-mono">{children}</code>,
                    pre: ({ children }) => <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto mb-3">{children}</pre>,
                    strong: ({ children }) => <strong className="font-semibold text-gray-900 dark:text-white">{children}</strong>,
                    em: ({ children }) => <em className="italic text-gray-700 dark:text-gray-300">{children}</em>,
                    a: ({ href, children }) => <a href={href} className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">{children}</a>,
                    hr: () => <hr className="border-gray-300 dark:border-gray-600 my-6" />,
                    table: ({ children }) => <table className="w-full border-collapse border border-gray-300 dark:border-gray-600 mb-3">{children}</table>,
                    thead: ({ children }) => <thead className="bg-gray-50 dark:bg-gray-700">{children}</thead>,
                    tbody: ({ children }) => <tbody>{children}</tbody>,
                    tr: ({ children }) => <tr className="border-b border-gray-200 dark:border-gray-600">{children}</tr>,
                    th: ({ children }) => <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left font-semibold text-gray-900 dark:text-white">{children}</th>,
                    td: ({ children }) => <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-gray-700 dark:text-gray-300">{children}</td>,
                  }}
                >
                  {product.description}
                </ReactMarkdown>
              </div>
              {isLongDescription && (
                <button
                  onClick={() => setShowDescriptionModal(true)}
                  className="mt-2 flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors"
                >
                  <FiChevronDown className="w-4 h-4" />
                  Xem thêm
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Edit Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-7xl w-full max-h-[90vh] overflow-hidden">
            <div className="p-6 border-b border-gray-200 dark:border-gray-600">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Chỉnh sửa sản phẩm
                </h3>
                <button
                  onClick={() => setShowEditModal(false)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <FiX className="w-6 h-6" />
                </button>
              </div>
            </div>
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
              <ProductUpdateForm
                product={product}
                onSuccess={() => {
                  setShowEditModal(false);
                  // Refresh the product data
                  onEdit?.(product);
                }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Image Upload Modal */}
      {showImageModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full mx-4">
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Upload Product Image
              </h3>
              <button
                onClick={closeImageModal}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <FiX className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div className="flex justify-center">
                  <label className="cursor-pointer">
                    <div className="w-32 h-32 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg flex items-center justify-center hover:border-blue-500 transition-colors">
                      {imagePreview ? (
                        <Image
                          src={imagePreview}
                          alt="Preview"
                          width={128}
                          height={128}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      ) : (
                        <div className="text-center">
                          <FiCamera className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                          <span className="text-sm text-gray-500">Click to select image</span>
                        </div>
                      )}
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageFileSelect}
                      className="hidden"
                    />
                  </label>
                </div>

                {selectedImageFile && (
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Selected: {selectedImageFile.name}
                  </div>
                )}

                <div className="flex gap-3">
                  <button
                    onClick={closeImageModal}
                    className="flex-1 px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleImageUpload}
                    disabled={!selectedImageFile || isUploading}
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isUploading ? 'Uploading...' : 'Upload'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Description Modal */}
      {showDescriptionModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-7xl w-full max-h-[90vh] overflow-hidden">
            <div className="p-6 border-b border-gray-200 dark:border-gray-600">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Mô tả sản phẩm
                </h3>
                <button
                  onClick={() => setShowDescriptionModal(false)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <FiX className="w-6 h-6" />
                </button>
              </div>
            </div>
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
              <div className="prose prose-sm max-w-none text-gray-700 dark:text-gray-300">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    h1: ({ children }) => <h1 className="text-2xl font-bold text-gray-900 dark:text-white mt-6 mb-4 first:mt-0">{children}</h1>,
                    h2: ({ children }) => <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-5 mb-3">{children}</h2>,
                    h3: ({ children }) => <h3 className="text-lg font-semibold text-gray-900 dark:text-white mt-4 mb-2">{children}</h3>,
                    h4: ({ children }) => <h4 className="text-base font-semibold text-gray-900 dark:text-white mt-3 mb-2">{children}</h4>,
                    h5: ({ children }) => <h5 className="text-sm font-semibold text-gray-900 dark:text-white mt-3 mb-1">{children}</h5>,
                    h6: ({ children }) => <h6 className="text-sm font-medium text-gray-900 dark:text-white mt-2 mb-1">{children}</h6>,
                    p: ({ children }) => <p className="text-gray-700 dark:text-gray-300 mb-3 leading-relaxed">{children}</p>,
                    ul: ({ children }) => <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mb-3 space-y-1 ml-4">{children}</ul>,
                    ol: ({ children }) => <ol className="list-decimal list-inside text-gray-700 dark:text-gray-300 mb-3 space-y-1 ml-4">{children}</ol>,
                    li: ({ children }) => <li className="text-gray-700 dark:text-gray-300">{children}</li>,
                    blockquote: ({ children }) => <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-600 dark:text-gray-400 my-4 bg-blue-50 dark:bg-blue-900/20 py-2 px-3 rounded-r">{children}</blockquote>,
                    code: ({ children }) => <code className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-2 py-1 rounded text-sm font-mono">{children}</code>,
                    pre: ({ children }) => <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto mb-3">{children}</pre>,
                    strong: ({ children }) => <strong className="font-semibold text-gray-900 dark:text-white">{children}</strong>,
                    em: ({ children }) => <em className="italic text-gray-700 dark:text-gray-300">{children}</em>,
                    a: ({ href, children }) => <a href={href} className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">{children}</a>,
                    hr: () => <hr className="border-gray-300 dark:border-gray-600 my-6" />,
                    table: ({ children }) => <table className="w-full border-collapse border border-gray-300 dark:border-gray-600 mb-3">{children}</table>,
                    thead: ({ children }) => <thead className="bg-gray-50 dark:bg-gray-700">{children}</thead>,
                    tbody: ({ children }) => <tbody>{children}</tbody>,
                    tr: ({ children }) => <tr className="border-b border-gray-200 dark:border-gray-600">{children}</tr>,
                    th: ({ children }) => <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left font-semibold text-gray-900 dark:text-white">{children}</th>,
                    td: ({ children }) => <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-gray-700 dark:text-gray-300">{children}</td>,
                  }}
                >
                  {product.description}
                </ReactMarkdown>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
