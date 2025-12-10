"use client";

import { useState, useEffect } from 'react';
import { FiPlus, FiEdit2, FiTrash2, FiRefreshCw, FiCalendar, FiImage, FiSearch } from 'react-icons/fi';
import Link from 'next/link';
import { campaignService } from '@/services/promotionService';
import { Campaign, StandardPaginatedResponse } from '@/types';
import CampaignModal from './CampaignModal';

/**
 * Campaigns Tab - Quản lý chiến dịch khuyến mãi
 */
export default function CampaignsTab() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  const [filter, setFilter] = useState<'all' | 'active' | 'scheduled' | 'expired'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    loadCampaigns();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter, page]);

  const loadCampaigns = async () => {
    try {
      setLoading(true);
      let data: Campaign[] | StandardPaginatedResponse<Campaign>;

      if (filter === 'all') {
        const response = await campaignService.getAll({ page, size: 10, sortBy: 'createdAt', sortDir: 'DESC' });
        data = response;
        setCampaigns(response.content);
        setTotalPages(response.totalPages);
      } else if (filter === 'active') {
        data = await campaignService.getActive();
        setCampaigns(data);
      } else if (filter === 'scheduled') {
        data = await campaignService.getScheduled();
        setCampaigns(data);
      } else {
        data = await campaignService.getExpired();
        setCampaigns(data);
      }
    } catch (error) {
      console.error('Error loading campaigns:', error);
      alert('Không thể tải danh sách chiến dịch');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Bạn có chắc muốn xóa chiến dịch này?')) return;

    try {
      await campaignService.delete(id);
      alert('Đã xóa chiến dịch');
      loadCampaigns();
    } catch (error) {
      console.error('Error deleting campaign:', error);
      alert('Không thể xóa chiến dịch');
    }
  };

  const handleRestore = async (id: number) => {
    try {
      await campaignService.restore(id);
      alert('Đã khôi phục chiến dịch');
      loadCampaigns();
    } catch (error) {
      console.error('Error restoring campaign:', error);
      alert('Không thể khôi phục chiến dịch');
    }
  };

  const handleEdit = (campaign: Campaign) => {
    setSelectedCampaign(campaign);
    setShowModal(true);
  };

  const handleCreate = () => {
    setSelectedCampaign(null);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setSelectedCampaign(null);
    loadCampaigns();
  };

  const getStatusBadge = (campaign: Campaign) => {
    const now = new Date();
    const start = new Date(campaign.startDate);
    const end = new Date(campaign.endDate);

    if (now < start) {
      return <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">Đã lên lịch</span>;
    } else if (now > end) {
      return <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">Đã hết hạn</span>;
    } else {
      return <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">Đang hoạt động</span>;
    }
  };

  const filteredCampaigns = campaigns.filter(campaign =>
    campaign.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    campaign.description?.toLowerCase().includes(searchTerm.toLowerCase())
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
              placeholder="Tìm kiếm chiến dịch..."
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
            <option value="active">Đang hoạt động</option>
            <option value="scheduled">Đã lên lịch</option>
            <option value="expired">Đã hết hạn</option>
          </select>
        </div>

        <button
          onClick={handleCreate}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <FiPlus className="w-5 h-5" />
          Tạo chiến dịch
        </button>
      </div>

      {/* Campaigns Grid */}
      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Đang tải...</p>
        </div>
      ) : filteredCampaigns.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <FiCalendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">Chưa có chiến dịch nào</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCampaigns.map((campaign) => (
            <div
              key={campaign.id}
              className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
            >
              {/* Image */}
              {(campaign.image || campaign.imageUrl) ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={campaign.image || campaign.imageUrl}
                  alt={campaign.name}
                  className="w-full h-48 object-cover"
                />
              ) : (
                <div className="w-full h-48 bg-gray-100 flex items-center justify-center">
                  <FiImage className="w-12 h-12 text-gray-400" />
                </div>
              )}

              {/* Content - clickable */}
              <Link href={`/admin/promotions/${campaign.id}`} className="block">
                <div className="p-4 space-y-3">
                  <div className="flex items-start justify-between">
                    <h3 className="font-semibold text-lg text-gray-900">{campaign.name}</h3>
                    {getStatusBadge(campaign)}
                  </div>

                  {campaign.description && (
                    <p className="text-sm text-gray-600 line-clamp-2">{campaign.description}</p>
                  )}

                  <div className="space-y-1 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <FiCalendar className="w-4 h-4" />
                      <span>Bắt đầu: {new Date(campaign.startDate).toLocaleDateString('vi-VN')}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FiCalendar className="w-4 h-4" />
                      <span>Kết thúc: {new Date(campaign.endDate).toLocaleDateString('vi-VN')}</span>
                    </div>
                  </div>
                </div>
              </Link>

              {/* Actions */}
              <div className="p-4 pt-0 flex gap-2">
                <button
                  onClick={(e) => { e.stopPropagation(); handleEdit(campaign); }}
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                >
                  <FiEdit2 className="w-4 h-4" />
                  Sửa
                </button>
                {campaign.deleted ? (
                  <button
                    onClick={(e) => { e.stopPropagation(); handleRestore(campaign.id); }}
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors"
                  >
                    <FiRefreshCw className="w-4 h-4" />
                    Khôi phục
                  </button>
                ) : (
                  <button
                    onClick={(e) => { e.stopPropagation(); handleDelete(campaign.id); }}
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                  >
                    <FiTrash2 className="w-4 h-4" />
                    Xóa
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {filter === 'all' && totalPages > 1 && (
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
        <CampaignModal
          campaign={selectedCampaign}
          onClose={handleModalClose}
        />
      )}
    </div>
  );
}
