"use client";

import { useState, useEffect } from 'react';
import { FiPlus, FiEdit2, FiTrash2, FiSearch, FiPercent, FiDollarSign } from 'react-icons/fi';
import { promotionService, campaignService } from '@/services/promotionService';
import { Promotion, Campaign } from '@/types';
import PromotionModal from './PromotionModal';
import { toast } from 'sonner';

/**
 * Promotions Tab - Quản lý khuyến mãi sản phẩm
 */
export default function PromotionsTab() {
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedPromotion, setSelectedPromotion] = useState<Promotion | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCampaign, setFilterCampaign] = useState<number | 'all'>('all');
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    loadPromotions();
    loadCampaigns();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const loadPromotions = async () => {
    try {
      setLoading(true);
      const response = await promotionService.getAll({ 
        page, 
        size: 10, 
        sortBy: 'createdAt', 
        sortDir: 'DESC' 
      });
      setPromotions(response.content);
      setTotalPages(response.page.totalPages);
    } catch (error: any) {
      const message = error?.response?.data?.message || 'Failed to load promotions';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const loadCampaigns = async () => {
    try {
      const response = await campaignService.getAll({ page: 0, size: 100 });
      setCampaigns(response.content);
    } catch (error: any) {
      const message = error?.response?.data?.message || 'Failed to load campaigns';
      toast.error(message);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Bạn có chắc muốn xóa khuyến mãi này?')) return;

    try {
      await promotionService.delete(id);
      toast.success('Promotion deleted successfully!');
      loadPromotions();
    } catch (error: any) {
      const message = error?.response?.data?.message || 'Failed to delete promotion';
      toast.error(message);
    }
  };

  const handleEdit = (promotion: Promotion) => {
    setSelectedPromotion(promotion);
    setShowModal(true);
  };

  const handleCreate = () => {
    setSelectedPromotion(null);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setSelectedPromotion(null);
    loadPromotions();
  };

  const filteredPromotions = promotions.filter(promotion => {
    const matchesSearch = 
      promotion.id.toString().includes(searchTerm) ||
      promotion.productVariationId.toString().includes(searchTerm);
    const matchesCampaign = 
      filterCampaign === 'all' || promotion.campaignId === filterCampaign;
    return matchesSearch && matchesCampaign;
  });

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
              placeholder="Tìm theo ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Filter by Campaign */}
          <select
            value={filterCampaign}
            onChange={(e) => setFilterCampaign(e.target.value === 'all' ? 'all' : Number(e.target.value))}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">Tất cả chiến dịch</option>
            {campaigns.map(campaign => (
              <option key={campaign.id} value={campaign.id}>
                {campaign.name}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={handleCreate}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <FiPlus className="w-5 h-5" />
          Tạo khuyến mãi
        </button>
      </div>

      {/* Promotions Table */}
      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Đang tải...</p>
        </div>
      ) : filteredPromotions.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <FiPercent className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">Chưa có khuyến mãi nào</p>
        </div>
      ) : (
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Chiến dịch
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Sản phẩm
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Loại
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Giá trị
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
                {filteredPromotions.map((promotion) => (
                  <tr key={promotion.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      #{promotion.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {promotion.campaignName || campaigns.find(c => c.id === promotion.campaignId)?.name || `#${promotion.campaignId}`}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      ID: {promotion.productVariationId}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {promotion.discountType === 'PERCENTAGE' ? (
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
                      {promotion.discountType === 'PERCENTAGE' 
                        ? `${promotion.discountValue ?? 0}%` 
                        : `${(promotion.discountValue ?? 0).toLocaleString('vi-VN')}đ`}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {promotion.active ? (
                        <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                          Hoạt động
                        </span>
                      ) : (
                        <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">
                          Tắt
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(promotion)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Sửa"
                        >
                          <FiEdit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(promotion.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Xóa"
                        >
                          <FiTrash2 className="w-4 h-4" />
                        </button>
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
      {totalPages > 1 && (
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

      {/* Modal */}
      {showModal && (
        <PromotionModal
          promotion={selectedPromotion}
          campaigns={campaigns}
          onClose={handleModalClose}
        />
      )}
    </div>
  );
}
