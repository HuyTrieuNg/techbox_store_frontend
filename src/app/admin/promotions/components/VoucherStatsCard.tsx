"use client";

import { FiAlertCircle, FiCheckCircle, FiClock } from 'react-icons/fi';
import { Voucher } from '@/types';

interface VoucherStatsCardProps {
  vouchers: Voucher[];
}

/**
 * Voucher Stats Card - Hiển thị thống kê tổng quan vouchers
 */
export default function VoucherStatsCard({ vouchers }: VoucherStatsCardProps) {
  const stats = {
    total: vouchers.length,
    active: vouchers.filter(v => v.isValid && v.hasUsageLeft && !v.isDeleted).length,
    expired: vouchers.filter(v => !v.isValid).length,
    depleted: vouchers.filter(v => !v.hasUsageLeft).length,
    deleted: vouchers.filter(v => v.isDeleted).length,
  };

  const totalUsed = vouchers.reduce((sum, v) => sum + (v.usedCount ?? 0), 0);
  const totalLimit = vouchers.reduce((sum, v) => sum + (v.usageLimit ?? 0), 0);
  const usageRate = totalLimit > 0 ? ((totalUsed / totalLimit) * 100).toFixed(1) : '0.0';

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      {/* Tổng số voucher */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-50 rounded-lg">
            <FiCheckCircle className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <p className="text-sm text-gray-600">Tổng số</p>
            <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
          </div>
        </div>
      </div>

      {/* Đang hoạt động */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-green-50 rounded-lg">
            <FiCheckCircle className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <p className="text-sm text-gray-600">Hoạt động</p>
            <p className="text-2xl font-bold text-green-900">{stats.active}</p>
          </div>
        </div>
      </div>

      {/* Đã hết hạn */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gray-50 rounded-lg">
            <FiClock className="w-5 h-5 text-gray-600" />
          </div>
          <div>
            <p className="text-sm text-gray-600">Hết hạn</p>
            <p className="text-2xl font-bold text-gray-900">{stats.expired}</p>
          </div>
        </div>
      </div>

      {/* Tỷ lệ sử dụng */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-purple-50 rounded-lg">
            <FiAlertCircle className="w-5 h-5 text-purple-600" />
          </div>
          <div>
            <p className="text-sm text-gray-600">Tỷ lệ dùng</p>
            <p className="text-2xl font-bold text-purple-900">{usageRate}%</p>
          </div>
        </div>
      </div>
    </div>
  );
}
