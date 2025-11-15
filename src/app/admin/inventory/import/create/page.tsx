'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { format } from 'date-fns';
import { useCreateStockImport } from '@/hooks/useStockImport';
import { useSuppliers } from '@/hooks/useSupplier';
import { useProducts } from '@/hooks/useProduct';
import { useProductDetail } from '@/hooks/useProductDetail';
import { Button } from '@/components/UI/button';
import { Input } from '@/components/UI/input';
import { Textarea } from '@/components/UI/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/UI/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/UI/card';
import { FiPlus, FiTrash2, FiSave, FiX, FiSearch } from 'react-icons/fi';
import { toast } from 'react-hot-toast';

const stockImportItemSchema = z.object({
  productVariationId: z.number().min(1, 'Vui lòng chọn sản phẩm'),
  quantity: z.number().min(1, 'Số lượng phải lớn hơn 0'),
  importPrice: z.number().min(0, 'Giá nhập phải >= 0'),
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
  
  // Product search state
  const [productSearchTerm, setProductSearchTerm] = useState('');
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  
  const { products, isLoading: productsLoading } = useProducts({
    page: 0,
    size: 50,
    ...(productSearchTerm && { keyword: productSearchTerm })
  });
  
  const { product: productDetail, isLoading: productDetailLoading } = useProductDetail(selectedProductId || 0);

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
      importDate: format(new Date(), 'yyyy-MM-dd'),
      items: [{ productVariationId: 0, quantity: 1, importPrice: 0 }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'items',
  });

  const watchedItems = watch('items');

  const calculateTotal = () => {
    return watchedItems?.reduce((total, item) => {
      return total + (item.quantity * item.importPrice);
    }, 0) || 0;
  };

  const handleAddItem = () => {
    append({ productVariationId: 0, quantity: 1, importPrice: 0 });
  };

  const handleRemoveItem = (index: number) => {
    if (fields.length > 1) {
      remove(index);
    }
  };

  const onSubmit = async (data: StockImportFormData) => {
    try {
      const result = await createStockImport(data);
      if (result) {
        router.push(`/admin/inventory/import/${result.id}`);
      }
    } catch (error) {
      // Error is handled in the hook
    }
  };

  const handleCancel = () => {
    router.push('/admin/inventory/import');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Tạo phiếu nhập kho
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Tạo phiếu nhập kho mới cho cửa hàng
          </p>
        </div>
        <Button variant="outline" onClick={handleCancel} className="flex items-center gap-2">
          <FiX className="w-4 h-4" />
          Hủy
        </Button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle>Thông tin cơ bản</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Nhà cung cấp *
                </label>
                <Select
                  onValueChange={(value) => setValue('supplierId', parseInt(value))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn nhà cung cấp" />
                  </SelectTrigger>
                  <SelectContent>
                    {suppliers?.map((supplier) => (
                      <SelectItem key={supplier.supplierId} value={supplier.supplierId.toString()}>
                        {supplier.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.supplierId && (
                  <p className="text-red-600 text-sm mt-1">{errors.supplierId.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Ngày nhập *
                </label>
                <Input
                  type="date"
                  {...register('importDate')}
                  className={errors.importDate ? 'border-red-500' : ''}
                />
                {errors.importDate && (
                  <p className="text-red-600 text-sm mt-1">{errors.importDate.message}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Ghi chú
              </label>
              <Textarea
                {...register('note')}
                placeholder="Nhập ghi chú cho phiếu nhập..."
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {/* Items */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Sản phẩm nhập kho</CardTitle>
              <Button type="button" onClick={handleAddItem} className="flex items-center gap-2">
                <FiPlus className="w-4 h-4" />
                Thêm sản phẩm
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {fields.map((field, index) => (
                <div key={field.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-medium">Sản phẩm {index + 1}</h4>
                    {fields.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveItem(index)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <FiTrash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                    {/* Product Search */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Tìm sản phẩm *
                      </label>
                      <div className="relative">
                        <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <Input
                          placeholder="Tìm kiếm sản phẩm..."
                          value={productSearchTerm}
                          onChange={(e) => setProductSearchTerm(e.target.value)}
                          className="pl-10"
                        />
                      </div>
                      {products.length > 0 && (
                        <div className="mt-2 max-h-40 overflow-y-auto border border-gray-200 dark:border-gray-700 rounded-md">
                          {products.map((product) => (
                            <div
                              key={product.id}
                              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer border-b border-gray-100 dark:border-gray-600 last:border-b-0"
                              onClick={() => {
                                setSelectedProductId(product.id);
                                setSelectedProduct(product);
                              }}
                            >
                              <div className="font-medium">{product.name}</div>
                              <div className="text-sm text-gray-500 dark:text-gray-400">
                                ID: {product.id}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                      {productSearchTerm && productsLoading && (
                        <div className="mt-2 text-sm text-gray-500">Đang tìm kiếm...</div>
                      )}
                    </div>

                    {/* Selected Product Display */}
                    {selectedProduct && (
                      <div className="p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-md">
                        <div className="text-sm font-medium text-blue-900 dark:text-blue-100">
                          Sản phẩm đã chọn: {selectedProduct.name}
                        </div>
                        <div className="text-xs text-blue-700 dark:text-blue-300 mt-1">
                          ID: {selectedProduct.id}
                        </div>
                      </div>
                    )}

                    {/* Variation Selection and Quantity/Price */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Biến thể *
                        </label>
                        <Select
                          onValueChange={(value) => setValue(`items.${index}.productVariationId`, parseInt(value))}
                          disabled={!selectedProduct}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder={selectedProduct ? "Chọn biến thể" : "Chọn sản phẩm trước"} />
                          </SelectTrigger>
                          <SelectContent>
                            {selectedProduct && productDetail?.variations?.map((variation: any) => (
                              <SelectItem key={variation.id} value={variation.id.toString()}>
                                {variation.variationName} - {variation.sku}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {errors.items?.[index]?.productVariationId && (
                          <p className="text-red-600 text-sm mt-1">
                            {errors.items[index].productVariationId.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Số lượng *
                        </label>
                        <Input
                          type="number"
                          min="1"
                          {...register(`items.${index}.quantity`, { valueAsNumber: true })}
                          className={errors.items?.[index]?.quantity ? 'border-red-500' : ''}
                          placeholder="Nhập số lượng"
                        />
                        {errors.items?.[index]?.quantity && (
                          <p className="text-red-600 text-sm mt-1">
                            {errors.items[index].quantity.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Giá nhập *
                        </label>
                        <Input
                          type="number"
                          min="0"
                          step="0.01"
                          {...register(`items.${index}.importPrice`, { valueAsNumber: true })}
                          className={errors.items?.[index]?.importPrice ? 'border-red-500' : ''}
                          placeholder="Nhập giá nhập"
                        />
                        {errors.items?.[index]?.importPrice && (
                          <p className="text-red-600 text-sm mt-1">
                            {errors.items[index].importPrice.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                      Thành tiền: {(watchedItems?.[index]?.quantity * watchedItems?.[index]?.importPrice || 0).toLocaleString('vi-VN')}₫
                    </div>
                  </div>
                ))}
              </div>

            {errors.items && typeof errors.items.message === 'string' && (
              <p className="text-red-600 text-sm mt-4">{errors.items.message}</p>
            )}
          </CardContent>
        </Card>

        {/* Summary */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="text-lg font-semibold">
                Tổng giá trị: {calculateTotal().toLocaleString('vi-VN')}₫
              </div>
              <div className="flex gap-4">
                <Button type="button" variant="outline" onClick={handleCancel}>
                  Hủy
                </Button>
                <Button type="submit" disabled={loading} className="flex items-center gap-2">
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Đang tạo...
                    </>
                  ) : (
                    <>
                      <FiSave className="w-4 h-4" />
                      Tạo phiếu nhập
                    </>
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