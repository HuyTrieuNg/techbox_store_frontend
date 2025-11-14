"use client";

import { useState, useEffect } from 'react';
import { FiPlus, FiEdit2, FiTrash2, FiRefreshCw, FiSearch, FiPercent, FiDollarSign, FiClock, FiAlertCircle } from 'react-icons/fi';
import { voucherService } from '@/services/promotionService';
import { Voucher, StandardPaginatedResponse } from '@/types';
import VoucherModal from './VoucherModal';

/**
 * Vouchers Tab - Quản lý mã giảm giá
 */
export default function VouchersTab() {
  const [vouchers, setVouchers] = useState<Voucher[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedVoucher, setSelectedVoucher] = useState<Voucher | null>(null);
  const [filter, setFilter] = useState<'all' | 'valid' | 'expired' | 'expiring'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    loadVouchers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter, page]);

  const loadVouchers = async () => {
    try {
      setLoading(true);
      let data: Voucher[] | StandardPaginatedResponse<Voucher>;

      if (filter === 'all') {
        const response = await voucherService.getAll({ page, size: 10, sortBy: 'createdAt', sortDir: 'DESC' });
        data = response;
        setVouchers(response.content);
        setTotalPages(response.totalPages);
      } else if (filter === 'valid') {
        const response = await voucherService.getValid({ page, size: 10 });
        data = response;
        setVouchers(response.content);
        setTotalPages(response.totalPages);
      } else if (filter === 'expired') {
        data = await voucherService.getExpired();
        setVouchers(data);
      } else {
        data = await voucherService.getExpiringSoon(7);
        setVouchers(data);
      }
    } catch (error) {
      console.error('Error loading vouchers:', error);
      alert('Không thể tải danh sách voucher');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (code: string) => {
    if (!confirm('Bạn có chắc muốn xóa voucher này?')) return;

    try {
      await voucherService.delete(code);
      alert('Đã xóa voucher');
      loadVouchers();
    } catch (error) {
      console.error('Error deleting voucher:', error);
      alert('Không thể xóa voucher');
    }
  };

  const handleRestore = async (code: string) => {
    try {
      await voucherService.restore(code);
      alert('Đã khôi phục voucher');
      loadVouchers();
    } catch (error) {
      console.error('Error restoring voucher:', error);
      alert('Không thể khôi phục voucher');
    }
  };

  const handleEdit = (voucher: Voucher) => {
    setSelectedVoucher(voucher);
    setShowModal(true);
  };

  const handleCreate = () => {
    setSelectedVoucher(null);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setSelectedVoucher(null);
    loadVouchers();
  };

  const getVoucherStatus = (voucher: Voucher) => {
    const now = new Date();
    const start = new Date(voucher.validFrom);
    const end = new Date(voucher.validUntil);

    if (voucher.isDeleted) {
      return <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full">Đã xóa</span>;
    }
    if (!voucher.hasUsageLeft) {
      return <span className="px-2 py-1 text-xs font-medium bg-orange-100 text-orange-800 rounded-full">Hết lượt</span>;
    }
    if (now < start) {
      return <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">Chưa bắt đầu</span>;
    }
    if (now > end) {
      return <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">Hết hạn</span>;
    }
    return <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">Còn hiệu lực</span>;
  };

  const filteredVouchers = vouchers.filter(voucher =>
    voucher.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Actions Bar */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4 flex-1">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Tìm kiếm mã voucher..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Filter */}
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as typeof filter)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">Tất cả</option>
            <option value="valid">Còn hiệu lực</option>
            <option value="expiring">Sắp hết hạn</option>
            <option value="expired">Đã hết hạn</option>
          </select>
        </div>

        <button
          onClick={handleCreate}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <FiPlus className="w-5 h-5" />
          Tạo voucher
        </button>
      </div>

      {/* Vouchers Table */}
      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Đang tải...</p>
        </div>
      ) : filteredVouchers.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <FiPercent className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">Chưa có voucher nào</p>
        </div>
      ) : (
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Mã Code
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Loại
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Giá trị
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Đơn tối thiểu
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Sử dụng
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Hiệu lực
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Trạng thái
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Thao tác
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredVouchers.map((voucher) => (
                  <tr key={voucher.code} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <code className="px-2 py-1 bg-blue-50 text-blue-700 rounded font-mono font-semibold">
                          {voucher.code}
                        </code>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {voucher.voucherType === 'PERCENTAGE' ? (
                        <span className="flex items-center gap-1 text-sm text-purple-600">
                          <FiPercent className="w-4 h-4" />
                          Phần trăm
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-sm text-green-600">
                          <FiDollarSign className="w-4 h-4" />
                          Cố định
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {voucher.voucherType === 'PERCENTAGE' 
                        ? `${voucher.value ?? 0}%` 
                        : `${(voucher.value ?? 0).toLocaleString('vi-VN')}đ`}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {(voucher.minOrderAmount ?? 0).toLocaleString('vi-VN')}đ
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm">
                        <span className={`font-medium ${!voucher.hasUsageLeft ? 'text-red-600' : 'text-gray-900'}`}>
                          {voucher.usedCount ?? 0}
                        </span>
                        <span className="text-gray-500"> / {voucher.usageLimit ?? 0}</span>
                        {voucher.reservedQuantity > 0 && (
                          <div className="text-xs text-orange-600">
                            Đang giữ: {voucher.reservedQuantity}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <FiClock className="w-4 h-4" />
                        <div>
                          <div>{new Date(voucher.validFrom).toLocaleDateString('vi-VN')}</div>
                          <div className="text-xs text-gray-500">
                            đến {new Date(voucher.validUntil).toLocaleDateString('vi-VN')}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getVoucherStatus(voucher)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(voucher)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Sửa"
                        >
                          <FiEdit2 className="w-4 h-4" />
                        </button>
                        {voucher.isDeleted ? (
                          <button
                            onClick={() => handleRestore(voucher.code)}
                            className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                            title="Khôi phục"
                          >
                            <FiRefreshCw className="w-4 h-4" />
                          </button>
                        ) : (
                          <button
                            onClick={() => handleDelete(voucher.code)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Xóa"
                          >
                            <FiTrash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Pagination */}
      {(filter === 'all' || filter === 'valid') && totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          <button
            onClick={() => setPage(Math.max(0, page - 1))}
            disabled={page === 0}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Trước
          </button>
          <span className="px-4 py-2">
            Trang {page + 1} / {totalPages}
          </span>
          <button
            onClick={() => setPage(Math.min(totalPages - 1, page + 1))}
            disabled={page >= totalPages - 1}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Sau
          </button>
        </div>
      )}

      {/* Alert for expiring vouchers */}
      {filter === 'expiring' && filteredVouchers.length > 0 && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-start gap-3">
          <FiAlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-medium text-yellow-900">Vouchers sắp hết hạn</h4>
            <p className="text-sm text-yellow-700 mt-1">
              Có {filteredVouchers.length} voucher sẽ hết hạn trong 7 ngày tới. Hãy xem xét gia hạn hoặc tạo mới.
            </p>
          </div>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <VoucherModal
          voucher={selectedVoucher}
          onClose={handleModalClose}
        />
      )}
    </div>
  );
}
