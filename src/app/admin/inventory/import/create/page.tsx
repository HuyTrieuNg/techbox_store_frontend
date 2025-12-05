'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useCreateStockImport } from '@/hooks/useStockImport';
import { useSuppliers } from '@/hooks/useSupplier';
import { useProducts } from '@/hooks/useProduct';
import { useMultipleProductVariations } from '@/hooks/useMultipleProductVariations';
import ProductSelectionModal from '@/components/common/ProductSelectionModal';
import { Button } from '@/components/UI/button';
import { Input } from '@/components/UI/input';
import { Textarea } from '@/components/UI/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/UI/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/UI/card';
import { FiPlus, FiTrash2, FiSave, FiX, FiSearch } from 'react-icons/fi';
import { useCategories } from '@/hooks/useCategories';

// --- Zod Schemas ---
const stockImportItemSchema = z.object({
  productVariationId: z.number().min(1, 'Vui lòng chọn biến thể sản phẩm'),
  quantity: z.number().min(1, 'Số lượng phải lớn hơn 0'),
  costPrice: z.number().min(0, 'Giá nhập phải >= 0'),
  // Các trường bổ trợ để hiển thị UI
  productName: z.string().optional(),
  variationName: z.string().optional(),
  sku: z.string().optional(),
  productId: z.number().optional(),
});

const stockImportSchema = z.object({
  supplierId: z.number().min(1, 'Vui lòng chọn nhà cung cấp'),
  importDate: z.string().min(1, 'Vui lòng chọn ngày nhập'),
  note: z.string().optional(),
  items: z.array(stockImportItemSchema).min(1, 'Phải có ít nhất 1 sản phẩm'),
});

type StockImportFormData = z.infer<typeof stockImportSchema>;

const StockImportCreatePage: React.FC = () => {
  const router = useRouter();
  const { createStockImport, loading } = useCreateStockImport();
  const { suppliers } = useSuppliers({ size: 100 });
  const { categories } = useCategories({ size: 100 });

  // --- States ---
  const [productSearchTerm, setProductSearchTerm] = useState('');
  const [showProductModal, setShowProductModal] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState<any[]>([]); // List sản phẩm cha đã chọn từ Modal
  const [selectedVariationIds, setSelectedVariationIds] = useState<Set<number>>(new Set()); // Để checkbox chọn hàng loạt biến thể

  // Lấy danh sách sản phẩm cho ô search nhanh (nếu cần)
  const { products, isLoading: productsLoading } = useProducts({
    page: 0,
    size: 20,
    ...(productSearchTerm && { keyword: productSearchTerm }),
  });

  // Load biến thể của các sản phẩm đã chọn
  const { variations: productVariations } = useMultipleProductVariations(selectedProducts.map(p => p.id));

  // --- Form Hook ---
  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<StockImportFormData>({
    resolver: zodResolver(stockImportSchema),
    defaultValues: {
      importDate: new Date().toISOString().slice(0, 16), // Format cho input datetime-local
      items: [],
    },
  });

  const { fields, append, remove } = useFieldArray({ control, name: 'items' });
  const watchedItems = watch('items');

  // --- Handlers ---

  const calculateTotal = () => {
    return watchedItems?.reduce((total, item) => {
      return total + ((item.quantity || 0) * (item.costPrice || 0));
    }, 0) || 0;
  };

  // Xử lý khi Modal xác nhận xong -> Lưu sản phẩm cha vào state để load biến thể
  const handleModalSelection = (products: any[]) => {
    setSelectedProducts(products || []);
    // Lưu ý: Không tự động append vào fields nữa vì người dùng cần chọn biến thể cụ thể
  };

  // Thêm một dòng trống vào bảng (nếu nhập tay)
  const handleAddEmptyRow = () => {
    append({ productVariationId: 0, quantity: 1, costPrice: 0 });
  };

  const handleRemoveItem = (index: number) => {
    remove(index);
  };

  const onSubmit = async (data: StockImportFormData) => {
    try {
      const utcDate = new Date(data.importDate).toISOString();
      
      const submitData = {
        supplierId: data.supplierId,
        importDate: utcDate,
        note: data.note,
        items: data.items.map((it: any) => ({
          productVariationId: it.productVariationId,
          quantity: it.quantity,
          costPrice: it.costPrice,
        })),
      };

      const result = await createStockImport(submitData);
      if (result) {
        router.push(`/admin/inventory/import/${result.id}`);
      }
    } catch (error) {
      console.error("Error creating import:", error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header Page */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Tạo phiếu nhập kho</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Tạo phiếu nhập kho mới cho cửa hàng</p>
        </div>
        <Button variant="outline" onClick={() => router.push('/admin/inventory/import')} className="flex items-center gap-2">
          <FiX className="w-4 h-4" /> Hủy
        </Button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* 1. Thông tin chung */}
        <Card>
          <CardHeader>
            <CardTitle>Thông tin cơ bản</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Nhà cung cấp *</label>
                <Select onValueChange={(value) => setValue('supplierId', parseInt(value))}>
                  <SelectTrigger><SelectValue placeholder="Chọn nhà cung cấp" /></SelectTrigger>
                  <SelectContent>
                    {suppliers?.map((supplier) => (
                      <SelectItem key={supplier.supplierId} value={supplier.supplierId.toString()}>
                        {supplier.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.supplierId && <p className="text-red-600 text-sm mt-1">{errors.supplierId.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Ngày nhập *</label>
                <Input 
                  type="datetime-local" 
                  {...register('importDate')} 
                  className={errors.importDate ? 'border-red-500' : ''} 
                />
                {errors.importDate && <p className="text-red-600 text-sm mt-1">{errors.importDate.message}</p>}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Ghi chú</label>
              <Textarea {...register('note')} placeholder="Nhập ghi chú..." rows={3} />
            </div>
          </CardContent>
        </Card>

        {/* 2. Chọn sản phẩm & biến thể */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Chọn sản phẩm</CardTitle>
              <Button type="button" onClick={() => setShowProductModal(true)} className="flex items-center gap-2">
                <FiSearch className="w-4 h-4"/> Mở danh sách sản phẩm
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {/* Khu vực hiển thị sản phẩm đã chọn từ Modal và danh sách biến thể của chúng */}
            {selectedProducts.length > 0 ? (
              <div className="space-y-4">
                <div className="flex justify-between items-center bg-blue-50 p-3 rounded text-blue-800 text-sm">
                  <span>Đang chọn từ {selectedProducts.length} sản phẩm. Hãy chọn biến thể cụ thể bên dưới để thêm vào phiếu nhập.</span>
                  <Button size="sm" variant="ghost" className="text-blue-800 hover:text-blue-900" onClick={() => setSelectedProducts([])}>Xóa tất cả</Button>
                </div>

                <div className="max-h-[400px] overflow-y-auto border rounded-md divide-y">
                  {selectedProducts.map((p) => (
                    <div key={p.id} className="p-4 bg-white dark:bg-gray-800">
                      <div className="font-bold text-gray-900 dark:text-white mb-2">{p.name} <span className="text-gray-400 font-normal text-xs">(ID: {p.id})</span></div>
                      
                      <div className="pl-4 space-y-2">
                        {(productVariations[p.id] || []).length === 0 ? (
                          <div className="text-sm text-gray-500 italic">Đang tải biến thể hoặc không có biến thể...</div>
                        ) : (
                          (productVariations[p.id] || []).map((v: any) => {
                             const isAdded = fields.some(f => f.productVariationId === v.id);
                             return (
                              <div key={v.id} className="flex items-center justify-between gap-4 p-2 bg-gray-50 dark:bg-gray-700/50 rounded hover:bg-gray-100">
                                <div className="text-sm">
                                  <span className="font-medium">{v.variationName}</span>
                                  <span className="mx-2 text-gray-400">|</span>
                                  <span className="font-mono text-gray-500">{v.sku}</span>
                                  <span className="mx-2 text-gray-400">|</span>
                                  <span className="text-gray-500">Giá gốc: {v.price?.toLocaleString()}đ</span>
                                </div>
                                <Button 
                                  size="sm" 
                                  disabled={isAdded}
                                  variant={isAdded ? "secondary" : "default"}
                                  onClick={() => {
                                    if (!isAdded) {
                                      append({ 
                                        productVariationId: Number(v.id), 
                                        quantity: 1, 
                                        costPrice: Number(v.price || 0), 
                                        productId: p.id, 
                                        productName: p.name, 
                                        variationName: v.variationName, 
                                        sku: v.sku 
                                      });
                                    }
                                  }}
                                >
                                  {isAdded ? "Đã thêm" : "Thêm vào phiếu"}
                                </Button>
                              </div>
                             );
                          })
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500 border-2 border-dashed rounded-lg">
                Chưa chọn sản phẩm nào. Bấm "Mở danh sách sản phẩm" để bắt đầu.
              </div>
            )}
            
            {/* Modal Component */}
            <ProductSelectionModal 
              isOpen={showProductModal} 
              onClose={() => setShowProductModal(false)} 
              onConfirm={handleModalSelection} 
              initialSelectedProducts={selectedProducts} 
            />
          </CardContent>
        </Card>

        {/* 3. Bảng chi tiết phiếu nhập (Table) */}
        <Card>
          <CardHeader>
             <div className="flex items-center justify-between">
                <CardTitle>Chi tiết phiếu nhập ({fields.length} mục)</CardTitle>
                <Button type="button" variant="outline" size="sm" onClick={handleAddEmptyRow}>
                  <FiPlus className="w-4 h-4 mr-1"/> Thêm dòng trống
                </Button>
             </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-800 text-xs uppercase text-gray-500 font-medium border-b">
                    <th className="px-4 py-3 text-left w-[25%]">Sản phẩm</th>
                    <th className="px-4 py-3 text-left w-[20%]">Biến thể / SKU</th>
                    <th className="px-4 py-3 text-left w-[15%]">Số lượng</th>
                    <th className="px-4 py-3 text-left w-[20%]">Giá nhập</th>
                    <th className="px-4 py-3 text-right w-[15%]">Thành tiền</th>
                    <th className="px-4 py-3 text-center w-[5%]">Xóa</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {fields.length === 0 && (
                     <tr>
                       <td colSpan={6} className="px-4 py-8 text-center text-gray-500">
                         Chưa có sản phẩm nào trong phiếu nhập.
                       </td>
                     </tr>
                  )}
                  {fields.map((field, index) => {
                    return (
                      <tr key={field.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                        {/* Tên SP */}
                        <td className="px-4 py-2">
                           <div className="font-medium text-sm">{field.productName || 'Sản phẩm chưa chọn'}</div>
                        </td>
                        
                        {/* Biến thể */}
                        <td className="px-4 py-2 text-sm text-gray-600">
                          <div>{field.variationName || '—'}</div>
                          <div className="text-xs font-mono text-gray-400">{field.sku}</div>
                          {/* Input hidden để form submit giá trị ID */}
                          <input type="hidden" {...register(`items.${index}.productVariationId`, { valueAsNumber: true })} />
                        </td>

                        {/* Số lượng */}
                        <td className="px-4 py-2">
                          <Input 
                            type="number" 
                            min={1} 
                            {...register(`items.${index}.quantity`, {valueAsNumber: true})} 
                            className={errors.items?.[index]?.quantity ? 'border-red-500' : ''} 
                          />
                          {errors.items?.[index]?.quantity && <p className="text-red-600 text-xs mt-1">Lỗi SL</p>}
                        </td>

                        {/* Giá nhập */}
                        <td className="px-4 py-2">
                          <Input 
                            type="number" 
                            min={0} 
                            {...register(`items.${index}.costPrice`, {valueAsNumber: true})} 
                            className={errors.items?.[index]?.costPrice ? 'border-red-500' : ''} 
                          />
                          {errors.items?.[index]?.costPrice && <p className="text-red-600 text-xs mt-1">Lỗi giá</p>}
                        </td>

                        {/* Thành tiền */}
                        <td className="px-4 py-2 text-right font-medium">
                          {((watchedItems?.[index]?.quantity || 0) * (watchedItems?.[index]?.costPrice || 0)).toLocaleString('vi-VN')}₫
                        </td>

                        {/* Action */}
                        <td className="px-4 py-2 text-center">
                          <Button type="button" variant="ghost" size="sm" onClick={() => handleRemoveItem(index)}>
                            <FiTrash2 className="w-4 h-4 text-red-500" />
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Footer Actions */}
        <Card className="sticky bottom-4 border-t shadow-lg z-10">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="text-xl font-bold text-blue-600">
                Tổng cộng: {calculateTotal().toLocaleString('vi-VN')}₫
              </div>
              <div className="flex gap-4">
                <Button type="button" variant="outline" onClick={() => router.push('/admin/inventory/import')}>Hủy bỏ</Button>
                <Button type="submit" disabled={loading} className="flex items-center gap-2 min-w-[150px]">
                  {loading ? (
                    <><div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div> Lưu...</>
                  ) : (
                    <><FiSave className="w-4 h-4" /> Hoàn tất</>
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
};

export default StockImportCreatePage;