/**
 * Product Detail Page
 * Admin/Staff product detail view
 */

'use client';

import { useParams, useRouter } from 'next/navigation';
import { FiArrowLeft, FiEdit2 } from 'react-icons/fi';
import { useState } from 'react';
import { useProductManagementDetail } from '@/hooks/useProductManagementDetail';
import { useProductVariations } from '@/hooks/useProductVariations';
import ProductDetailInfo from '@/components/common/manage/ProductDetailInfo';
import ProductVariationsTable from '@/components/common/manage/ProductVariationsTable';
import ProductVariationCreateForm from '@/components/common/manage/product/ProductVariationCreateForm';
import { publishProduct, draftProduct, deleteProduct, restoreProduct } from '@/services/productDetailService';
import { toast } from 'sonner';
import { Button } from '@/components/UI/button';

export default function ProductManagementDetailContainer() {
  const params = useParams();
  const router = useRouter();
  const productId = params?.id ? Number(params.id) : null;

  // Fetch product detail
  const { product, isLoading: productLoading, error: productError } = useProductManagementDetail(productId);

  // Fetch product variations
  const {
    variations,
    isLoading: variationsLoading,
    includeDeleted,
    setIncludeDeleted,
    mutate: mutateVariations,
  } = useProductVariations(productId);

  const [showVariationModal, setShowVariationModal] = useState(false);

  const handleVariationCreated = () => {
    setShowVariationModal(false);
    mutateVariations(); // Refresh variations list
  };

  // Product action handlers
  const handleEdit = () => {
    router.push(`/admin/products/${productId}/edit`);
  };

  const handlePublish = async () => {
    try {
      await publishProduct(productId!);
      toast.success('Sản phẩm đã được xuất bản');
      // Refresh product data
      window.location.reload();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Không thể xuất bản sản phẩm');
    }
  };

  const handleDraft = async () => {
    try {
      await draftProduct(productId!);
      toast.success('Sản phẩm đã chuyển thành bản nháp');
      // Refresh product data
      window.location.reload();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Không thể chuyển thành bản nháp');
    }
  };

  const handleDelete = async () => {
    if (!confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) return;
    
    try {
      await deleteProduct(productId!);
      toast.success('Sản phẩm đã được xóa');
      router.push('/admin/products');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Không thể xóa sản phẩm');
    }
  };

  const handleRestore = async () => {
    try {
      await restoreProduct(productId!);
      toast.success('Sản phẩm đã được khôi phục');
      // Refresh product data
      window.location.reload();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Không thể khôi phục sản phẩm');
    }
  };

  // Loading state
  if (productLoading) {
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow-md p-6 animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="grid grid-cols-3 gap-6">
            <div className="h-64 bg-gray-200 rounded"></div>
            <div className="col-span-2 space-y-4">
              <div className="h-6 bg-gray-200 rounded"></div>
              <div className="h-6 bg-gray-200 rounded w-2/3"></div>
              <div className="h-32 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (productError || !product) {
    return (
      <div className="bg-white rounded-lg shadow-md p-12 text-center">
        <div className="text-red-500 text-6xl mb-4">⚠️</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Không tìm thấy sản phẩm</h2>
        <p className="text-gray-600 mb-6">Sản phẩm không tồn tại hoặc đã bị xóa</p>
        <button
          onClick={() => router.back()}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Quay lại
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <FiArrowLeft className="w-5 h-5" />
          <span className="font-medium">Quay lại</span>
        </button>

        <div className="flex items-center gap-3">
          <button
            onClick={() => router.push(`/admin/products/${productId}/edit`)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <FiEdit2 className="w-4 h-4" />
            <span>Chỉnh sửa</span>
          </button>
        </div>
      </div>

      {/* Product Info */}
      <ProductDetailInfo 
        product={product} 
        onEdit={handleEdit}
        onPublish={handlePublish}
        onDraft={handleDraft}
        onDelete={handleDelete}
        onRestore={handleRestore}
      />

      {/* Product Variations */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Biến thể sản phẩm</h2>
            <Button
              onClick={() => setShowVariationModal(true)}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              + Thêm biến thể
            </Button>
          </div>
        </div>
        <div className="p-6">
          <ProductVariationsTable
            variations={variations}
            isLoading={variationsLoading}
            includeDeleted={includeDeleted}
            onToggleDeleted={setIncludeDeleted}
            mutate={mutateVariations}
          />
        </div>
      </div>

      {/* Create Variation Modal */}
      {showVariationModal && (
        <div 
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={() => setShowVariationModal(false)}
        >
          <div 
            className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto m-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Thêm biến thể mới</h2>
                <button
                  onClick={() => setShowVariationModal(false)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                >
                  ✕
                </button>
              </div>
              <ProductVariationCreateForm 
                productId={productId!} 
                onVariationCreated={handleVariationCreated}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
