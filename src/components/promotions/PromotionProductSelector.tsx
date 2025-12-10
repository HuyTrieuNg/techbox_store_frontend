'use client';

import React, { useState } from 'react';
import useSWR from 'swr';
import { getProductsForManagement } from '@/services/productManagementService';
import { useBrands } from '@/hooks/useBrands';
import { useCategories } from '@/hooks/useCategories';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/UI/popover';

interface PromotionProductSelectorProps {
  onSelect: (product: any) => void;
  selectedProduct?: any | null;
  forceOpen?: boolean;
  onOpenHandled?: () => void;
}

export default function PromotionProductSelector({ onSelect, selectedProduct, forceOpen, onOpenHandled }: PromotionProductSelectorProps) {
  const { brands } = useBrands();
  const { categories } = useCategories();

  const [open, setOpen] = useState(false);
  // If parent wants to force open the selector
  React.useEffect(() => {
    if (forceOpen) {
      setOpen(true);
      if (onOpenHandled) onOpenHandled();
    }
  }, [forceOpen]);
  const [filter, setFilter] = useState({ name: '', spu: '', brandId: undefined as number | undefined, categoryId: undefined as number | undefined });

  const { data, isLoading } = useSWR(
    ['promotions-products', filter],
    () => getProductsForManagement({ page: 0, size: 50, name: filter.name || undefined, spu: filter.spu || undefined, brandId: filter.brandId, categoryId: filter.categoryId }),
    { revalidateOnFocus: false }
  );

  const products = data?.content || [];

  return (
    <div>
      <div className="flex items-center gap-3">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <button type="button" className="px-3 py-2 border rounded-md">
              {open ? 'Đóng danh sách sản phẩm' : (selectedProduct ? 'Thay đổi sản phẩm' : 'Chọn sản phẩm')}
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-[600px] p-4 z-[60]" align="start" side="top" onWheel={(e) => e.stopPropagation()}>
            <div className="grid grid-cols-3 gap-3 mb-3">
              <input placeholder="Tìm theo tên..." value={filter.name} onChange={(e) => setFilter({ ...filter, name: e.target.value })} className="px-3 py-2 border rounded-md" />
              <input placeholder="SPU" value={filter.spu} onChange={(e) => setFilter({ ...filter, spu: e.target.value })} className="px-3 py-2 border rounded-md" />
              <div className="flex gap-2">
                <select value={filter.brandId ?? ''} onChange={(e) => setFilter({ ...filter, brandId: e.target.value ? Number(e.target.value) : undefined })} className="px-3 py-2 border rounded-md w-full">
                  <option value="">Thương hiệu</option>
                  {brands?.map((b) => <option key={b.id} value={b.id}>{b.name}</option>)}
                </select>
                <select value={filter.categoryId ?? ''} onChange={(e) => setFilter({ ...filter, categoryId: e.target.value ? Number(e.target.value) : undefined })} className="px-3 py-2 border rounded-md w-full">
                  <option value="">Danh mục</option>
                  {categories?.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>
            </div>

            <div className="space-y-2 max-h-64 overflow-y-auto">
              {isLoading ? (
                <div className="text-sm text-gray-500">Đang tải...</div>
              ) : products.length === 0 ? (
                <div className="text-sm text-gray-500">Không tìm thấy sản phẩm</div>
              ) : (
                products.map((p) => (
                  <div key={p.id} className="flex items-center gap-3 p-2 border rounded-md hover:bg-gray-50">
                    <div className="w-12 h-12 bg-gray-100 rounded overflow-hidden">
                      {p.imageUrl && <img src={p.imageUrl} alt={p.name} className="w-full h-full object-cover" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="truncate font-medium">{p.name}</div>
                      <div className="text-xs text-gray-500">SPU: {p.spu} | ID: {p.id}</div>
                    </div>
                      <div className="flex items-center gap-2">
                        <button type="button" onClick={() => { onSelect(p); setOpen(false); }} className="px-2 py-1 bg-blue-600 text-white rounded">Chọn</button>
                      </div>
                  </div>
                ))
              )}
            </div>
          </PopoverContent>
        </Popover>
        <div className="text-sm text-gray-500">{selectedProduct ? selectedProduct.name : 'Chưa chọn sản phẩm'}</div>
      </div>

      {open && (
        <div className="absolute top-full left-0 z-[60] w-[600px] bg-white border rounded-lg p-4 shadow-lg max-h-96 overflow-y-auto">
          <div className="grid grid-cols-3 gap-3 mb-3">
            <input placeholder="Tìm theo tên..." value={filter.name} onChange={(e) => setFilter({ ...filter, name: e.target.value })} className="px-3 py-2 border rounded-md" />
            <input placeholder="SPU" value={filter.spu} onChange={(e) => setFilter({ ...filter, spu: e.target.value })} className="px-3 py-2 border rounded-md" />
            <div className="flex gap-2">
              <select value={filter.brandId ?? ''} onChange={(e) => setFilter({ ...filter, brandId: e.target.value ? Number(e.target.value) : undefined })} className="px-3 py-2 border rounded-md w-full">
                <option value="">Thương hiệu</option>
                {brands?.map((b) => <option key={b.id} value={b.id}>{b.name}</option>)}
              </select>
              <select value={filter.categoryId ?? ''} onChange={(e) => setFilter({ ...filter, categoryId: e.target.value ? Number(e.target.value) : undefined })} className="px-3 py-2 border rounded-md w-full">
                <option value="">Danh mục</option>
                {categories?.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
          </div>

          <div className="space-y-2 max-h-64 overflow-y-auto">
            {isLoading ? (
              <div className="text-sm text-gray-500">Đang tải...</div>
            ) : products.length === 0 ? (
              <div className="text-sm text-gray-500">Không tìm thấy sản phẩm</div>
            ) : (
              products.map((p) => (
                <div key={p.id} className="flex items-center gap-3 p-2 border rounded-md hover:bg-gray-50">
                  <div className="w-12 h-12 bg-gray-100 rounded overflow-hidden">
                    {p.imageUrl && <img src={p.imageUrl} alt={p.name} className="w-full h-full object-cover" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="truncate font-medium">{p.name}</div>
                    <div className="text-xs text-gray-500">SPU: {p.spu} | ID: {p.id}</div>
                  </div>
                    <div className="flex items-center gap-2">
                      <button type="button" onClick={() => { onSelect(p); setOpen(false); }} className="px-2 py-1 bg-blue-600 text-white rounded">Chọn</button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
