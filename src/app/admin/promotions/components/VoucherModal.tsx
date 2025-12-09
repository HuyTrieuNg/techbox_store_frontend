"use client";

import { useState } from 'react';
import { FiX, FiCheck } from 'react-icons/fi';
import { voucherService } from '@/services/promotionService';
import { Voucher } from '@/types';

interface VoucherModalProps {
  voucher: Voucher | null;
  onClose: () => void;
}

/**
 * Voucher Modal - Tạo/Sửa mã giảm giá
 */
export default function VoucherModal({ voucher, onClose }: VoucherModalProps) {
  const [formData, setFormData] = useState({
    code: voucher?.code || '',
    voucherType: voucher?.voucherType || 'PERCENTAGE' as 'PERCENTAGE' | 'FIXED_AMOUNT',
    value: voucher?.value || 0,
    minOrderAmount: voucher?.minOrderAmount || 0,
    usageLimit: voucher?.usageLimit || 100,
    validFrom: voucher?.validFrom ? new Date(voucher.validFrom).toISOString().slice(0, 16) : '',
    validUntil: voucher?.validUntil ? new Date(voucher.validUntil).toISOString().slice(0, 16) : '',
  });
  const [loading, setLoading] = useState(false);
  const [checkingCode, setCheckingCode] = useState(false);
  const [codeAvailable, setCodeAvailable] = useState<boolean | null>(null);

  const handleCodeChange = async (code: string) => {
    setFormData({ ...formData, code: code.toUpperCase() });
    
    if (!voucher && code.length >= 3) {
      setCheckingCode(true);
      try {
        const exists = await voucherService.checkCodeExists(code);
        setCodeAvailable(!exists);
      } catch (error) {
        console.error('Error checking code:', error);
      } finally {
        setCheckingCode(false);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (voucher) {
        // UPDATE: Không gửi code trong body vì đã có trong URL
        const updateData = {
          voucherType: formData.voucherType,
          value: Number(formData.value),
          minOrderAmount: Number(formData.minOrderAmount),
          usageLimit: Number(formData.usageLimit),
          validFrom: new Date(formData.validFrom).toISOString(),
          validUntil: new Date(formData.validUntil).toISOString(),
        };
        await voucherService.update(voucher.code, updateData);
        alert('Đã cập nhật voucher');
      } else {
        // CREATE: Cần gửi code trong body
        const createData = {
          code: formData.code,
          voucherType: formData.voucherType,
          value: Number(formData.value),
          minOrderAmount: Number(formData.minOrderAmount),
          usageLimit: Number(formData.usageLimit),
          validFrom: new Date(formData.validFrom).toISOString(),
          validUntil: new Date(formData.validUntil).toISOString(),
        };
        await voucherService.create(createData);
        alert('Đã tạo voucher mới');
      }

      onClose();
    } catch (error: unknown) {
      console.error('Error saving voucher:', error);
      const errorMessage = (error as { response?: { data?: { message?: string } }; message?: string })?.response?.data?.message 
        || (error as { message?: string })?.message 
        || 'Có lỗi xảy ra khi lưu voucher';
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">
            {voucher ? 'Sửa voucher' : 'Tạo voucher mới'}
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
          {/* Code */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Mã Code <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                required
                disabled={!!voucher}
                value={formData.code}
                onChange={(e) => handleCodeChange(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono uppercase disabled:bg-gray-100"
                placeholder="Ví dụ: SAVE20"
              />
              {checkingCode && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
                </div>
              )}
              {!checkingCode && codeAvailable !== null && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  {codeAvailable ? (
                    <FiCheck className="w-5 h-5 text-green-600" />
                  ) : (
                    <FiX className="w-5 h-5 text-red-600" />
                  )}
                </div>
              )}
            </div>
            {!voucher && codeAvailable === false && (
              <p className="mt-1 text-sm text-red-600">Mã code này đã tồn tại</p>
            )}
            {!voucher && codeAvailable === true && (
              <p className="mt-1 text-sm text-green-600">Mã code khả dụng</p>
            )}
          </div>

          {/* Voucher Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Loại voucher <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-2 gap-4">
              <label className={`
                flex items-center justify-center gap-2 p-4 border-2 rounded-lg cursor-pointer transition-all
                ${formData.voucherType === 'PERCENTAGE' 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-300 hover:border-gray-400'}
              `}>
                <input
                  type="radio"
                  name="voucherType"
                  value="PERCENTAGE"
                  checked={formData.voucherType === 'PERCENTAGE'}
                  onChange={(e) => setFormData({ ...formData, voucherType: e.target.value as 'PERCENTAGE' })}
                  className="w-4 h-4"
                />
                <span className="font-medium">Phần trăm (%)</span>
              </label>
              <label className={`
                flex items-center justify-center gap-2 p-4 border-2 rounded-lg cursor-pointer transition-all
                ${formData.voucherType === 'FIXED_AMOUNT' 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-300 hover:border-gray-400'}
              `}>
                <input
                  type="radio"
                  name="voucherType"
                  value="FIXED_AMOUNT"
                  checked={formData.voucherType === 'FIXED_AMOUNT'}
                  onChange={(e) => setFormData({ ...formData, voucherType: e.target.value as 'FIXED_AMOUNT' })}
                  className="w-4 h-4"
                />
                <span className="font-medium">Cố định (VNĐ)</span>
              </label>
            </div>
          </div>

          {/* Value */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Giá trị {formData.voucherType === 'PERCENTAGE' ? '(%)' : '(VNĐ)'} <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              required
              min="0"
              step={formData.voucherType === 'PERCENTAGE' ? '0.01' : '1000'}
              value={formData.value || ''}
              onChange={(e) => setFormData({ ...formData, value: Number(e.target.value) })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder={formData.voucherType === 'PERCENTAGE' ? 'Ví dụ: 20' : 'Ví dụ: 100000'}
            />
          </div>

          {/* Min Order Amount */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Giá trị đơn hàng tối thiểu (VNĐ) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              required
              min="0"
              step="1000"
              value={formData.minOrderAmount || ''}
              onChange={(e) => setFormData({ ...formData, minOrderAmount: Number(e.target.value) })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Ví dụ: 100000"
            />
          </div>

          {/* Usage Limit */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Số lần sử dụng tối đa <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              required
              min="1"
              value={formData.usageLimit || ''}
              onChange={(e) => setFormData({ ...formData, usageLimit: Number(e.target.value) })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Ví dụ: 100"
            />
          </div>

          {/* Date Range */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Có hiệu lực từ <span className="text-red-500">*</span>
              </label>
              <input
                type="datetime-local"
                required
                value={formData.validFrom}
                onChange={(e) => setFormData({ ...formData, validFrom: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Hết hạn lúc <span className="text-red-500">*</span>
              </label>
              <input
                type="datetime-local"
                required
                value={formData.validUntil}
                onChange={(e) => setFormData({ ...formData, validUntil: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
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
              disabled={loading || (!voucher && codeAvailable === false)}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Đang lưu...' : voucher ? 'Cập nhật' : 'Tạo mới'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
