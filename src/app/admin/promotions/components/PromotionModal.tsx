"use client";

import { useState, useEffect } from 'react';
import { FiX } from 'react-icons/fi';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/UI/dialog';
import { Button } from '@/components/UI/button';
import { promotionService } from '@/services/promotionService';
import { getProductVariations } from '@/services/productManagementService';
import { getProductVariations as getPublicProductVariations } from '@/services/productDetailService';
import PromotionProductSelector from '@/components/promotions/PromotionProductSelector';
import { Promotion, Campaign } from '@/types';
import { useToast } from '@/hooks/use-toast';

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
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
  const [variations, setVariations] = useState<any[]>([]);
  const [isLoadingVariations, setIsLoadingVariations] = useState(false);
  const [variationsError, setVariationsError] = useState<string | null>(null);
  const [selectedVariationId, setSelectedVariationId] = useState<number | null>(promotion?.productVariationId || null);
  // product selector is split into a separate component
  const [forceOpenSelector, setForceOpenSelector] = useState(false);
  const [campaignReadOnly, setCampaignReadOnly] = useState(false);

  const { toast } = useToast();

  // load variations when selectedProduct changes
  const loadVariations = async (overrideProductId?: number) => {
    if (!selectedProduct && !overrideProductId) {
      setVariations([]);
      setVariationsError(null);
      setIsLoadingVariations(false);
      return;
    }
    const productId = overrideProductId ?? selectedProduct?.id;
    let cancelled = false;
    try {
      setIsLoadingVariations(true);
      setVariationsError(null);
      const data = await getProductVariations(Number(productId));
      if (cancelled) return;
      if (data && data.length > 0) {
        setVariations(data || []);
      } else {
        // fallback to public variations
        try {
          const pub = await getPublicProductVariations(Number(productId));
          if (!cancelled) setVariations(pub || []);
        } catch (err) {
          if (!cancelled) setVariations([]);
          console.error('Public variations fetch failed', err);
        }
      }
      if (selectedVariationId && !((data || []).concat([]).some(v => v.id === selectedVariationId))) {
        setSelectedVariationId(null);
      }
    } catch (err: any) {
      if (!cancelled) {
        setVariations([]);
        setVariationsError(err?.message || 'Lỗi khi lấy biến thể');
      }
    } finally {
      if (!cancelled) setIsLoadingVariations(false);
    }
    return () => { cancelled = true; };
  };

  useEffect(() => {
    loadVariations();
  }, [selectedProduct]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Validate variation selection
    const pvId = selectedVariationId || formData.productVariationId || 0;
    if (!pvId || pvId === 0) {
      toast({ title: 'Vui lòng chọn biến thể sản phẩm', variant: 'destructive' });
      return;
    }

    try {
      setLoading(true);
      const payload = {
        campaignId: Number(formData.campaignId),
        productVariationId: Number(pvId),
        discountType: formData.discountType,
        discountValue: Number(formData.discountValue),
        active: !!formData.active,
      };

      if (promotion) {
        await promotionService.update(promotion.id, payload);
        toast({ title: 'Đã cập nhật khuyến mãi' });
      } else {
        await promotionService.create(payload);
        toast({ title: 'Đã tạo khuyến mãi' });
      }
      onClose();
    } catch (err) {
      console.error('Promotion create/update failed', err);
      toast({ title: 'Không thể lưu khuyến mãi', variant: 'destructive' });
    } finally {
      setLoading(false);
    }

  };

  // Auto-select campaign when only one provided (run on mount or when campaigns prop changes)
  useEffect(() => {
    if (campaigns?.length === 1 && (!formData.campaignId || formData.campaignId === 0)) {
      setFormData(prev => ({ ...prev, campaignId: campaigns[0].id }));
      setCampaignReadOnly(true);
    }
  }, [campaigns]);

  const handleSelectProduct = (p: any) => {
    setSelectedProduct(p);
    setSelectedVariationId(null);
  };

  useEffect(() => {
    if (selectedVariationId && selectedVariationId > 0) {
      setFormData(prev => ({ ...prev, productVariationId: Number(selectedVariationId) }));
    }
  }, [selectedVariationId]);

  return (
    <Dialog open={true} onOpenChange={() => { onClose(); }}>
      <DialogContent className="max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <DialogHeader className="p-6 border-b border-gray-200 flex-shrink-0">
          <DialogTitle className="text-2xl font-bold text-gray-900">
            {promotion ? 'Sửa khuyến mãi' : 'Tạo khuyến mãi mới'}
          </DialogTitle>
        </DialogHeader>

        {/* Form - scrollable */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6 min-h-0">
          {/* Campaign */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Chiến dịch <span className="text-red-500">*</span>
            </label>
            {campaignReadOnly ? (
              <div className="px-4 py-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-700">{campaigns[0].name}</div>
            ) : (
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
            )}
          </div>

          {/* Product and Variation Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Sản phẩm & Biến thể <span className="text-red-500">*</span>
            </label>

            {/* Show current variation id if editing and no product selected */}
            {promotion && !selectedProduct && (
              <div className="mb-2 p-3 border rounded-lg bg-gray-50">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-700">Biến thể ID hiện tại: <strong>{promotion.productVariationId}</strong></p>
                    <p className="text-xs text-gray-500">Bạn có thể thay đổi bằng cách chọn sản phẩm và biến thể khác.</p>
                  </div>
                  <div>
                    <button
                      type="button"
                      onClick={() => { setSelectedProduct(null); setForceOpenSelector(true); }}
                      className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      Thay đổi
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* If there's a selected product, show it and the variations to pick */}
            {!selectedProduct ? (
              <div>
                <PromotionProductSelector onSelect={handleSelectProduct} selectedProduct={selectedProduct} forceOpen={forceOpenSelector} onOpenHandled={() => setForceOpenSelector(false)} />
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 border rounded-lg">
                  <img src={selectedProduct.imageUrl || '/placeholder.png'} alt={selectedProduct.name} className="w-14 h-14 object-cover rounded-md" />
                  <div>
                  {/* Variations radio list */}
                  <div className="text-sm text-gray-500">{ !isLoadingVariations && !variationsError && variations.length ? `Tìm thấy ${variations.length} biến thể` : '' }</div>
                    <div className="text-xs text-gray-500">SPU: {selectedProduct.spu} | ID: {selectedProduct.id}</div>
                  </div>
                  <div className="ml-auto">
                    <button type="button" onClick={() => { setSelectedProduct(null); setVariations([]); setSelectedVariationId(null); }} className="text-sm text-red-600 hover:underline">Bỏ chọn</button>
                  </div>
                </div>

                {/* Variations radio list */}
                <div className="grid grid-cols-1 gap-2">
                  {isLoadingVariations ? (
                    <div className="text-sm text-gray-500">Đang tải biến thể...</div>
                  ) : variationsError ? (
                    <div className="text-sm text-red-500">
                      {variationsError}
                      <div>
                        <button className="text-sm text-blue-600 underline" onClick={() => selectedProduct && loadVariations(Number(selectedProduct.id))}>Tải lại biến thể</button>
                      </div>
                    </div>
                  ) : variations.length === 0 ? (
                    <div className="text-sm text-gray-500">Không có biến thể</div>
                  ) : (
                    variations.map((v) => (
                      <label key={v.id} className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer ${selectedVariationId === v.id ? 'border-blue-500 bg-blue-50' : 'hover:border-gray-300'}`}>
                        <input type="radio" name="variation" checked={selectedVariationId === v.id} onChange={() => setSelectedVariationId(v.id)} className="w-4 h-4" />
                        <div className="flex items-center gap-3">
                          <img src={(v.imageUrls && v.imageUrls[0]) || selectedProduct.imageUrl || '/placeholder.png'} alt={v.variationName || v.sku} className="w-12 h-12 object-cover rounded-md" />
                          <div>
                            <div className="font-medium">{v.variationName || v.sku}</div>
                            <div className="text-xs text-gray-500">SKU: {v.sku} | Giá: {v.price ? v.price.toLocaleString('vi-VN') + '₫' : 'N/A'}</div>
                          </div>
                        </div>
                      </label>
                    ))
                  )}
                </div>
              </div>
            )}
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

          {/* Active status removed per request; keeping active value in data for creation/editing */}
        </form>

        {/* Actions - fixed at bottom */}
        <DialogFooter className="flex gap-3 p-6 border-t border-gray-200 flex-shrink-0">
          <Button type="button" variant="outline" onClick={onClose}>Hủy</Button>
          <Button type="submit" onClick={(e) => { e.preventDefault(); handleSubmit(e as any); }} disabled={loading}>{loading ? 'Đang lưu...' : promotion ? 'Cập nhật' : 'Tạo mới'}</Button>
        </DialogFooter>

        {/* Product selection is implemented inline above; no external modal */}
      </DialogContent>
    </Dialog>
  );
}
