"use client";

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { FiPlus, FiEdit2, FiTrash2, FiRefreshCw, FiCheck, FiX } from 'react-icons/fi';
import { useToast } from '@/hooks/use-toast';
import { campaignService, promotionService } from '@/services/promotionService';
import { Campaign, Promotion, CampaignPromotion } from '@/types';
import PromotionModal from '../components/PromotionModal';
import { Button } from '@/components/UI/button';

export default function CampaignDetailPage() {
  const { campaignId } = useParams() as { campaignId: string };
  const router = useRouter();

  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [promotions, setPromotions] = useState<CampaignPromotion[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedPromotion, setSelectedPromotion] = useState<Promotion | null>(null);
  const [editingPromotionId, setEditingPromotionId] = useState<number | null>(null);
  const [editingDiscountType, setEditingDiscountType] = useState<'PERCENTAGE'|'FIXED'>('PERCENTAGE');
  const [editingDiscountValue, setEditingDiscountValue] = useState<number>(0);
  const [editingLoading, setEditingLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (!campaignId) return;
    loadCampaign();
    loadPromotions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [campaignId]);

  const loadCampaign = async () => {
    try {
      setLoading(true);
      const c = await campaignService.getById(Number(campaignId));
      setCampaign(c);
      // campaign loaded
    } catch (error) {
      console.error('Error loading campaign:', error);
      toast({ title: 'Không thể tải thông tin chiến dịch', variant: 'destructive' });
      router.back();
    } finally {
      setLoading(false);
    }
  };

  const loadPromotions = async () => {
    try {
      setLoading(true);
      const p = await promotionService.getByCampaign(Number(campaignId));
      setPromotions(p);
    } catch (error) {
      console.error('Error loading promotions:', error);
      toast({ title: 'Không thể tải danh sách khuyến mãi', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!campaign) {
      toast({ title: 'Chiến dịch chưa tải xong, vui lòng chờ', variant: 'destructive' });
      return;
    }
    setSelectedPromotion(null);
    setShowModal(true);
  };

  const handleEdit = (promo: Promotion) => {
    // Open inline edit for discount type/value
    setEditingPromotionId(promo.id);
    setEditingDiscountType(promo.discountType);
    setEditingDiscountValue(promo.discountValue);
  };

  const handleCancelEdit = () => {
    setEditingPromotionId(null);
    setEditingDiscountType('PERCENTAGE');
    setEditingDiscountValue(0);
  };

  const handleSaveInline = async (id: number) => {
    try {
      setEditingLoading(true);
      await promotionService.update(id, { discountType: editingDiscountType, discountValue: editingDiscountValue });
      toast({ title: 'Đã cập nhật khuyến mãi' });
      await loadPromotions();
      setEditingPromotionId(null);
    } catch (error) {
      console.error('Error updating promotion', error);
      toast({ title: 'Không thể cập nhật khuyến mãi', variant: 'destructive' });
    } finally {
      setEditingLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Bạn có chắc muốn xóa khuyến mãi này?')) return;
    try {
      await promotionService.delete(id);
      toast({ title: 'Đã xóa khuyến mãi' });
      loadPromotions();
    } catch (error) {
      console.error('Error deleting promotion:', error);
      toast({ title: 'Không thể xóa khuyến mãi', variant: 'destructive' });
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    setSelectedPromotion(null);
    loadPromotions();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Chi tiết chiến dịch</h1>
          <p className="text-sm text-gray-600">Thông tin chiến dịch và danh sách khuyến mãi liên quan</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => router.push('/admin/promotions')}
            className="px-4 py-2 bg-gray-100 rounded-lg"
          >Quay lại</button>
          <Button onClick={handleCreate} ><FiPlus /> Thêm khuyến mãi</Button>
        </div>
      </div>

      {/* Campaign Card */}
      {campaign && (
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex gap-4">
            {(campaign.image || campaign.imageUrl) ? (
              <img src={campaign.image || campaign.imageUrl} alt={campaign.name} className="w-36 h-24 object-cover rounded-md" />
            ) : (
              <div className="w-36 h-24 bg-gray-100 rounded-md" />
            )}
            <div className="flex-1">
              <h2 className="text-lg font-semibold">{campaign.name}</h2>
              <p className="text-sm text-gray-600 line-clamp-2 mt-1">{campaign.description}</p>
              <div className="flex gap-4 mt-3 text-sm text-gray-600">
                <div>Bắt đầu: {new Date(campaign.startDate).toLocaleDateString('vi-VN')}</div>
                <div>Kết thúc: {new Date(campaign.endDate).toLocaleDateString('vi-VN')}</div>
                <div>{campaign.promotionCount ?? 0} khuyến mãi</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Promotions Table */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <h3 className="text-lg font-semibold mb-4">Danh sách khuyến mãi</h3>
        {loading ? (
          <div className="text-center py-6">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto" />
            <p className="mt-2 text-gray-600">Đang tải...</p>
          </div>
        ) : promotions.length === 0 ? (
          <div className="text-gray-600">Không có khuyến mãi nào</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left table-auto border-collapse">
              <thead>
                <tr className="text-sm text-gray-600 border-b">
                  <th className="py-2 px-3">ID</th>
                  <th className="py-2 px-3">Sản phẩm</th>
                  <th className="py-2 px-3">Biến thể (SKU)</th>
                  <th className="py-2 px-3">Giá gốc</th>
                  <th className="py-2 px-3">Giá giảm</th>
                  <th className="py-2 px-3">Loại/giá trị</th>
                  <th className="py-2 px-3">Hành động</th>
                </tr>
              </thead>
              <tbody>
                {promotions.map((p) => (
                  <tr key={p.promotionId} className="border-b last:border-b-0">
                    <td className="py-2 px-3 text-sm text-gray-900">{p.promotionId}</td>
                    <td className="py-2 px-3 text-sm text-gray-600">
                      <div className="font-medium">{p.productName}</div>
                      <div className="text-sm text-gray-500">SPU: {p.productSpu ?? p.productId}</div>
                    </td>
                    <td className="py-2 px-3 text-sm text-gray-600">{p.variationName} <div className="text-xs text-gray-500">{p.sku}</div></td>
                    <td className="py-2 px-3 text-sm text-gray-600">{p.originalPrice ? p.originalPrice.toLocaleString('vi-VN') + ' ₫' : '-'}</td>
                    <td className="py-2 px-3 text-sm text-gray-600">{p.discountedPrice ? p.discountedPrice.toLocaleString('vi-VN') + ' ₫' : '-'}</td>
                    <td className="py-2 px-3 text-sm text-gray-600">
                      {editingPromotionId === p.promotionId ? (
                        <div className="flex items-center gap-2">
                          <select value={editingDiscountType} onChange={(e) => setEditingDiscountType(e.target.value as 'PERCENTAGE'|'FIXED') } className="px-2 py-1 border rounded-md">
                            <option value="PERCENTAGE">Phần trăm (%)</option>
                            <option value="FIXED">Cố định (VNĐ)</option>
                          </select>
                          <input type="number" value={editingDiscountValue} min={0} step={editingDiscountType === 'PERCENTAGE' ? 0.01 : 1000} onChange={(e) => setEditingDiscountValue(Number(e.target.value))} className="px-2 py-1 border rounded-md w-28" />
                        </div>
                      ) : (
                        <div>{p.discountType} {p.discountValue ? `· ${p.discountValue}${p.discountType === 'PERCENTAGE' ? '%' : ' ₫'}` : ''}</div>
                      )}
                    </td>
                    <td className="py-2 px-3 text-sm flex gap-2">
                      {editingPromotionId === p.promotionId ? (
                        <>
                          <button onClick={() => handleSaveInline(p.promotionId)} disabled={editingLoading} className="px-2 py-1 bg-green-50 text-green-600 rounded-md flex items-center gap-1"><FiCheck /></button>
                          <button onClick={() => handleCancelEdit()} disabled={editingLoading} className="px-2 py-1 bg-gray-50 text-gray-600 rounded-md flex items-center gap-1"><FiX /></button>
                        </>
                      ) : (
                        <>
                          <button onClick={() => handleEdit({
                            id: p.promotionId,
                            campaignId: p.campaignId,
                            campaignName: p.campaignName,
                            productVariationId: p.variationId,
                            discountType: p.discountType,
                            discountValue: p.discountValue,
                            createdAt: '',
                            updatedAt: '',
                            active: true,
                          })} className="px-2 py-1 bg-blue-50 text-blue-600 rounded-md"><FiEdit2 /></button>
                          <button onClick={() => handleDelete(p.promotionId)} className="px-2 py-1 bg-red-50 text-red-600 rounded-md"><FiTrash2 /></button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Promotion Modal */}
      {showModal ? (
        <PromotionModal promotion={selectedPromotion} campaigns={campaign ? [campaign] : []} onClose={handleModalClose} />
      ) : null}
    </div>
  );
}
