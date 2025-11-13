"use client";

import { useState } from 'react';
import { FiX } from 'react-icons/fi';
import { promotionService } from '@/services/promotionService';
import { Promotion, Campaign } from '@/types';

interface PromotionModalProps {
  promotion: Promotion | null;
  campaigns: Campaign[];
  onClose: () => void;
}

/**
 * Promotion Modal - Tạo/Sửa khuyến mãi sản phẩm
 */
export default function PromotionModal({ promotion, campaigns, onClose }: PromotionModalProps) {
  const [formData, setFormData] = useState({
    campaignId: promotion?.campaignId || 0,
    productVariationId: promotion?.productVariationId || 0,
    discountType: promotion?.discountType || 'PERCENTAGE' as 'PERCENTAGE' | 'FIXED',
    discountValue: promotion?.discountValue || 0,
    active: promotion?.active ?? true,
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = {
        campaignId: formData.campaignId,
        productVariationId: formData.productVariationId,
        discountType: formData.discountType,
        discountValue: formData.discountValue,
        active: formData.active,
      };

      if (promotion) {
        await promotionService.update(promotion.id, data);
        alert('Đã cập nhật khuyến mãi');
      } else {
        await promotionService.create(data);
        alert('Đã tạo khuyến mãi mới');
      }

      onClose();
    } catch (error) {
      console.error('Error saving promotion:', error);
      alert('Có lỗi xảy ra khi lưu khuyến mãi');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">
            {promotion ? 'Sửa khuyến mãi' : 'Tạo khuyến mãi mới'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <FiX className="w-6 h-6" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Campaign */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Chiến dịch <span className="text-red-500">*</span>
            </label>
            <select
              required
              value={formData.campaignId}
              onChange={(e) => setFormData({ ...formData, campaignId: Number(e.target.value) })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value={0}>Chọn chiến dịch</option>
              {campaigns.map(campaign => (
                <option key={campaign.id} value={campaign.id}>
                  {campaign.name}
                </option>
              ))}
            </select>
          </div>

          {/* Product Variation ID */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              ID Biến thể sản phẩm <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              required
              min="1"
              value={formData.productVariationId || ''}
              onChange={(e) => setFormData({ ...formData, productVariationId: Number(e.target.value) })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Nhập ID biến thể sản phẩm"
            />
          </div>

          {/* Discount Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Loại khuyến mãi <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-2 gap-4">
              <label className={`
                flex items-center justify-center gap-2 p-4 border-2 rounded-lg cursor-pointer transition-all
                ${formData.discountType === 'PERCENTAGE' 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-300 hover:border-gray-400'}
              `}>
                <input
                  type="radio"
                  name="discountType"
                  value="PERCENTAGE"
                  checked={formData.discountType === 'PERCENTAGE'}
                  onChange={(e) => setFormData({ ...formData, discountType: e.target.value as 'PERCENTAGE' })}
                  className="w-4 h-4"
                />
                <span className="font-medium">Phần trăm (%)</span>
              </label>
              <label className={`
                flex items-center justify-center gap-2 p-4 border-2 rounded-lg cursor-pointer transition-all
                ${formData.discountType === 'FIXED' 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-300 hover:border-gray-400'}
              `}>
                <input
                  type="radio"
                  name="discountType"
                  value="FIXED"
                  checked={formData.discountType === 'FIXED'}
                  onChange={(e) => setFormData({ ...formData, discountType: e.target.value as 'FIXED' })}
                  className="w-4 h-4"
                />
                <span className="font-medium">Cố định (VNĐ)</span>
              </label>
            </div>
          </div>

          {/* Discount Value */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Giá trị {formData.discountType === 'PERCENTAGE' ? '(%)' : '(VNĐ)'} <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              required
              min="0"
              step={formData.discountType === 'PERCENTAGE' ? '0.01' : '1000'}
              value={formData.discountValue || ''}
              onChange={(e) => setFormData({ ...formData, discountValue: Number(e.target.value) })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder={formData.discountType === 'PERCENTAGE' ? 'Ví dụ: 20' : 'Ví dụ: 100000'}
            />
          </div>

          {/* Active Status */}
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="active"
              checked={formData.active}
              onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
              className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="active" className="text-sm font-medium text-gray-700 cursor-pointer">
              Kích hoạt khuyến mãi ngay
            </label>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Đang lưu...' : promotion ? 'Cập nhật' : 'Tạo mới'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
