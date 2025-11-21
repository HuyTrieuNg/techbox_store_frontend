'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useCreateStockAdjustment } from '@/hooks/useStockAdjustment';
import { useMultipleProductVariations } from '@/hooks/useMultipleProductVariations';
import { Button } from '@/components/UI/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/UI/card';
import { Input } from '@/components/UI/input';
import { Textarea } from '@/components/UI/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/UI/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/UI/form';
import { FiArrowLeft, FiPlus, FiCheck, FiSquare } from 'react-icons/fi';
import { format } from 'date-fns';
import ProductSelectionModal from '@/components/common/ProductSelectionModal';

const adjustmentVariantSchema = z.object({
  productVariationId: z.number(),
  productId: z.number(),
  productName: z.string(),
  variationName: z.string(),
  sku: z.string(),
  currentStock: z.number(),
  actualQuantity: z.number().min(0, 'Số lượng thực tế không được âm'),
  isChecked: z.boolean(),
});

const adjustmentSchema = z.object({
  adjustmentDate: z.string().min(1, 'Vui lòng chọn ngày điều chỉnh'),
  reason: z.string().min(1, 'Vui lòng chọn lý do chính'),
  note: z.string().optional(),
  variants: z.array(adjustmentVariantSchema).min(1, 'Vui lòng chọn ít nhất một biến thể để kiểm kho'),
});

type AdjustmentFormData = z.infer<typeof adjustmentSchema>;

const CreateAdjustmentPage: React.FC = () => {
  const router = useRouter();
  const { createAdjustment, loading } = useCreateStockAdjustment();

  const [showProductModal, setShowProductModal] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState<any[]>([]);
  const [customReason, setCustomReason] = useState('');

  // Get product variations for all selected products
  const { variations: productVariations, isLoading: variationsLoading } = useMultipleProductVariations(
    selectedProducts.map(p => p.id)
  );

  const form = useForm<AdjustmentFormData>({
    resolver: zodResolver(adjustmentSchema),
    defaultValues: {
      adjustmentDate: (() => {
        const now = new Date();
        return now.getUTCFullYear() + '-' +
               String(now.getUTCMonth() + 1).padStart(2, '0') + '-' +
               String(now.getUTCDate()).padStart(2, '0') + 'T' +
               String(now.getUTCHours()).padStart(2, '0') + ':' +
               String(now.getUTCMinutes()).padStart(2, '0');
      })(),
      reason: '',
      note: '',
      variants: [],
    },
  });

  const { register, control, handleSubmit, watch, setValue, formState: { errors } } = form;
  const { fields, append, remove, replace } = useFieldArray({
    control,
    name: 'variants',
  });

  const watchedVariants = watch('variants');

  const handleProductSelection = (products: any[]) => {
    setSelectedProducts(products);
    // The productDetailQueries will update automatically when selectedProducts changes
  };

  // Effect to create variant entries when product variations are loaded
  React.useEffect(() => {
    if (selectedProducts.length > 0 && !variationsLoading && Object.keys(productVariations).length > 0) {
      const variantEntries: any[] = [];

      selectedProducts.forEach((product) => {
        const variations = productVariations[product.id] || [];
        variations.forEach((variation: any) => {
          variantEntries.push({
            productVariationId: Number(variation.id),
            productId: Number(product.id),
            productName: product.name,
            variationName: variation.variationName,
            sku: variation.sku,
            currentStock: Number(variation.availableQuantity || 0),
            actualQuantity: Number(variation.availableQuantity || 0),
            isChecked: true,
          });
        });
      });

      replace(variantEntries);
    }
  }, [selectedProducts, variationsLoading, productVariations, replace]);

  const toggleVariantCheck = (index: number) => {
    const currentValue = watchedVariants[index]?.isChecked;
    setValue(`variants.${index}.isChecked`, !currentValue);
  };

  const onSubmit = async (data: AdjustmentFormData) => {
    try {
      const finalReason = data.reason === 'other' ? customReason : data.reason;
      // Convert datetime-local to UTC ISO string
      const utcDate = new Date(data.adjustmentDate).toISOString();

      // Only include checked variants
      const checkedVariants = data.variants.filter(v => v.isChecked);

      // Transform to the API format expected by createAdjustment
      const adjustmentData = {
        checkName: finalReason,
        adjustmentDate: utcDate,
        note: data.note,
        items: checkedVariants.map(variant => {
          // Find the original variation data to get the price
          const variationsForProduct = productVariations[variant.productId] || [];
          const originalVariation = variationsForProduct.find((v: any) => v.id === variant.productVariationId);

          return {
            productVariationId: variant.productVariationId,
            realQty: variant.actualQuantity,
            costPrice: originalVariation?.price || 0, // Using price as costPrice - may need to adjust based on API requirements
          };
        }),
      };

      await createAdjustment(adjustmentData);
      router.push('/admin/inventory/adjustment');
    } catch (error) {
      console.error('Error creating adjustment:', error);
    }
  };

  const adjustmentReasons = [
    { value: 'damaged_goods', label: 'Hàng hỏng' },
    { value: 'lost_goods', label: 'Hàng thất lạc' },
    { value: 'inventory_count', label: 'Kiểm kê kho' },
    { value: 'supplier_return', label: 'Trả nhà cung cấp' },
    { value: 'customer_return', label: 'Hàng trả lại từ khách' },
    { value: 'system_error', label: 'Lỗi hệ thống' },
    { value: 'other', label: 'Khác' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          onClick={() => router.push('/admin/inventory/adjustment')}
        >
          <FiArrowLeft className="w-4 h-4 mr-2" />
          Quay lại
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Tạo phiếu kiểm kho</h1>
          <p className="text-gray-600 dark:text-gray-400">Tạo phiếu kiểm kho tồn kho</p>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Thông tin cơ bản</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Ngày kiểm kho *
                  </label>
                  <Input
                    type="datetime-local"
                    {...register('adjustmentDate')}
                    className={errors.adjustmentDate ? 'border-red-500' : ''}
                  />
                  {errors.adjustmentDate && (
                    <p className="text-red-600 text-sm mt-1">{errors.adjustmentDate.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Lý do chính *
                  </label>
                  <Select onValueChange={(value) => {
                    setValue('reason', value);
                    if (value !== 'other') {
                      setCustomReason('');
                    }
                  }}>
                    <SelectTrigger className={errors.reason ? 'border-red-500' : ''}>
                      <SelectValue placeholder="Chọn lý do" />
                    </SelectTrigger>
                    <SelectContent>
                      {adjustmentReasons.map((reason) => (
                        <SelectItem key={reason.value} value={reason.value}>
                          {reason.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {watch('reason') === 'other' && (
                    <Input
                      placeholder="Nhập lý do khác..."
                      value={customReason}
                      onChange={(e) => setCustomReason(e.target.value)}
                      className="mt-2"
                    />
                  )}
                  {errors.reason && (
                    <p className="text-red-600 text-sm mt-1">{errors.reason.message}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Ghi chú
                </label>
                <Textarea
                  {...register('note')}
                  placeholder="Nhập ghi chú cho phiếu kiểm kho..."
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Product Selection */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Sản phẩm kiểm kho</CardTitle>
                <Button type="button" onClick={() => setShowProductModal(true)}>
                  <FiPlus className="w-4 h-4 mr-2" />
                  Chọn sản phẩm
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {selectedProducts.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Chưa có sản phẩm nào được chọn
                  </p>
                  <Button type="button" onClick={() => setShowProductModal(true)}>
                    Chọn sản phẩm để kiểm kho
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Đã chọn {selectedProducts.length} sản phẩm ({fields.length} biến thể)
                    </p>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setShowProductModal(true)}
                    >
                      Thay đổi lựa chọn
                    </Button>
                  </div>

                  {/* Variants Table */}
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-200 dark:border-gray-700">
                      <thead>
                        <tr className="bg-gray-50 dark:bg-gray-800">
                          <th className="border border-gray-200 dark:border-gray-700 px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider w-12">
                            Kiểm kê
                          </th>
                          <th className="border border-gray-200 dark:border-gray-700 px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Tên sản phẩm
                          </th>
                          <th className="border border-gray-200 dark:border-gray-700 px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Tên biến thể
                          </th>
                          <th className="border border-gray-200 dark:border-gray-700 px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Mã SKU
                          </th>
                          <th className="border border-gray-200 dark:border-gray-700 px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Tồn kho hiện tại
                          </th>
                          <th className="border border-gray-200 dark:border-gray-700 px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Số lượng thực tế *
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                        {fields.map((field, index) => (
                          <tr key={field.id} className={!watchedVariants[index]?.isChecked ? 'opacity-50' : ''}>
                            <td className="border border-gray-200 dark:border-gray-700 px-4 py-2">
                              <button
                                type="button"
                                onClick={() => toggleVariantCheck(index)}
                                className="flex items-center justify-center w-5 h-5"
                              >
                                {watchedVariants[index]?.isChecked ? (
                                  <FiCheck className="w-5 h-5 text-blue-600" />
                                ) : (
                                  <FiSquare className="w-5 h-5 text-gray-400" />
                                )}
                              </button>
                            </td>
                            <td className="border border-gray-200 dark:border-gray-700 px-4 py-2 text-sm">
                              {field.productName}
                            </td>
                            <td className="border border-gray-200 dark:border-gray-700 px-4 py-2 text-sm">
                              {field.variationName}
                            </td>
                            <td className="border border-gray-200 dark:border-gray-700 px-4 py-2 text-sm font-mono">
                              {field.sku}
                            </td>
                            <td className="border border-gray-200 dark:border-gray-700 px-4 py-2 text-sm text-center">
                              {field.currentStock}
                            </td>
                            <td className="border border-gray-200 dark:border-gray-700 px-4 py-2">
                              <Controller
                                name={`variants.${index}.actualQuantity`}
                                control={control}
                                render={({ field }) => (
                                  <Input
                                    type="number"
                                    min="0"
                                    {...field}
                                    value={field.value || ''}
                                    onChange={(e) => field.onChange(Number(e.target.value) || 0)}
                                    className={`w-24 ${errors.variants?.[index]?.actualQuantity ? 'border-red-500' : ''}`}
                                  />
                                )}
                              />
                              {errors.variants?.[index]?.actualQuantity && (
                                <p className="text-red-600 text-xs mt-1">
                                  {errors.variants[index].actualQuantity.message}
                                </p>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {errors.variants && (
                    <p className="text-red-600 text-sm">{errors.variants.message}</p>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Submit */}
          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push('/admin/inventory/adjustment')}
            >
              Hủy
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Đang tạo...' : 'Tạo phiếu kiểm kho'}
            </Button>
          </div>
        </form>
      </Form>

      <ProductSelectionModal
        isOpen={showProductModal}
        onClose={() => setShowProductModal(false)}
        onConfirm={handleProductSelection}
        initialSelectedProducts={selectedProducts}
      />
    </div>
  );
};

export default CreateAdjustmentPage;