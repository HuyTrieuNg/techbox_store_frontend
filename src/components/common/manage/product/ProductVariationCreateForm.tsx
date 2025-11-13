'use client';

/**
 * Product Variation Create Form Component
 */

import { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/UI/button';
import { Input } from '@/components/UI/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/UI/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/UI/card';
import { Label } from '@/components/UI/label';
import { useProductVariationCreate } from '@/hooks/useProductVariationCreate';
import { Plus, Trash2, X, Upload, Image as ImageIcon } from 'lucide-react';

// Zod schema for validation
const variationSchema = z.object({
  variationName: z.string().min(1, 'Tên biến thể là bắt buộc'),
  price: z.number().min(0, 'Giá phải >= 0'),
  sku: z.string().min(1, 'SKU là bắt buộc'),
  avgCostPrice: z.number().min(0, 'Giá vốn trung bình phải >= 0'),
  stockQuantity: z.number().min(0, 'Số lượng tồn kho phải >= 0'),
  reservedQuantity: z.number().min(0, 'Số lượng đặt trước phải >= 0'),
  variationAttributes: z.array(z.object({
    attributeId: z.number().min(1, 'ID thuộc tính là bắt buộc'),
    value: z.string().min(1, 'Giá trị thuộc tính là bắt buộc'),
  })).min(1, 'Phải có ít nhất một thuộc tính biến thể'),
});

type VariationFormData = z.infer<typeof variationSchema>;

interface ProductVariationCreateFormProps {
  productId: number;
  onVariationCreated?: () => void;
}

export default function ProductVariationCreateForm({ productId, onVariationCreated }: ProductVariationCreateFormProps) {
  const {
    form,
    attributes,
    loading,
    imageFiles,
    imagePreviews,
    isDragOver,
    handleImageChange,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    removeImage,
    addVariationAttribute,
    removeVariationAttribute,
    onSubmit,
  } = useProductVariationCreate(productId);

  const { control, handleSubmit, formState: { errors }, watch } = form;

  const handleFormSubmit = async (data: VariationFormData) => {
    try {
      await onSubmit(data);
      onVariationCreated?.();
    } catch (error) {
      // Error is handled in hook
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Tạo Biến Thể Sản Phẩm</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
          {/* Variation Name */}
          <div>
            <Label htmlFor="variationName">Tên biến thể</Label>
            <Controller
              name="variationName"
              control={control}
              render={({ field }) => (
                <Input id="variationName" {...field} placeholder="Nhập tên biến thể" />
              )}
            />
            {errors.variationName && <p className="text-red-500 text-sm">{errors.variationName.message}</p>}
          </div>

          {/* Price and SKU in same row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Price */}
            <div>
              <Label htmlFor="price">Giá (VNĐ)</Label>
              <Controller
                name="price"
                control={control}
                render={({ field }) => (
                  <Input
                    id="price"
                    type="number"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                    onInput={(e) => {
                      const value = e.currentTarget.value;
                      // Chỉ cho phép số và không bắt đầu bằng 0 (trừ số 0)
                      if (value.startsWith('0') && value.length > 1) {
                        e.currentTarget.value = value.replace(/^0+/, '');
                      }
                    }}
                    placeholder="Nhập giá sản phẩm"
                  />
                )}
              />
              {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
            </div>

            {/* SKU */}
            <div>
              <Label htmlFor="sku">SKU</Label>
              <Controller
                name="sku"
                control={control}
                render={({ field }) => (
                  <Input id="sku" {...field} placeholder="Nhập SKU" />
                )}
              />
              {errors.sku && <p className="text-red-500 text-sm">{errors.sku.message}</p>}
            </div>
          </div>

          {/* Variation Attributes */}
          <div>
            <Label>Thuộc tính biến thể</Label>
            {watch('variationAttributes').map((_, index) => (
              <div key={index} className="flex items-center space-x-2 mt-2">
                <Controller
                  name={`variationAttributes.${index}.attributeId`}
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={(value) => field.onChange(Number(value))} value={field.value.toString()}>
                      <SelectTrigger className="w-1/2">
                        <SelectValue placeholder="--chọn thuộc tính--" />
                      </SelectTrigger>
                      <SelectContent>
                        {attributes.map((attr) => (
                          <SelectItem key={Math.random()} value={attr.id.toString()}>
                            {attr.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                <Controller
                  name={`variationAttributes.${index}.value`}
                  control={control}
                  render={({ field }) => (
                    <Input {...field} placeholder="Giá trị" className="flex-1" />
                  )}
                />
                {watch('variationAttributes').length > 1 && (
                  <Button type="button" variant="outline" size="sm" onClick={() => removeVariationAttribute(index)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
            <Button type="button" variant="outline" onClick={addVariationAttribute} className="mt-2">
              <Plus className="h-4 w-4 mr-2" />
              Thêm thuộc tính biến thể
            </Button>
            {errors.variationAttributes && <p className="text-red-500 text-sm">{errors.variationAttributes.message}</p>}
          </div>

          {/* Images */}
          <div>
            <Label>Hình ảnh biến thể (tùy chọn)</Label>
            
            {/* Upload Area */}
            <div
              className={`mt-2 border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                isDragOver 
                  ? 'border-blue-400 bg-blue-50' 
                  : 'border-gray-300 hover:border-gray-400'
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <div className="flex flex-col items-center space-y-2">
                <Upload className={`h-8 w-8 ${isDragOver ? 'text-blue-500' : 'text-gray-400'}`} />
                <div className="text-sm text-gray-600">
                  <p>Kéo thả hình ảnh vào đây hoặc</p>
                  <label htmlFor="images" className="text-blue-600 hover:text-blue-800 cursor-pointer font-medium">
                    chọn từ máy tính
                  </label>
                </div>
                <p className="text-xs text-gray-500">
                  Hỗ trợ: JPG, PNG, GIF (tối đa 10MB mỗi ảnh) • Tối đa 10 ảnh
                  {imageFiles.length > 0 && ` • Đã chọn ${imageFiles.length}/10`}
                </p>
              </div>
              <Input 
                id="images" 
                type="file" 
                accept="image/*" 
                multiple 
                onChange={handleImageChange}
                className="hidden"
              />
            </div>

            {/* Image Previews */}
            {imagePreviews.length > 0 && (
              <div className="mt-4">
                <div className="flex items-center justify-between mb-2">
                  <Label className="text-sm font-medium">Xem trước:</Label>
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="sm"
                    onClick={() => {
                      const input = document.getElementById('images') as HTMLInputElement;
                      input?.click();
                    }}
                  >
                    <Plus className="h-3 w-3 mr-1" />
                    Thêm ảnh
                  </Button>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {imagePreviews.map((preview, index) => (
                    <div key={index} className="relative group">
                      <div className="aspect-square rounded-lg overflow-hidden border bg-gray-50">
                        <img 
                          src={preview} 
                          alt={`Preview ${index + 1}`} 
                          className="w-full h-full object-cover" 
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600 shadow-lg"
                      >
                        <X className="h-3 w-3" />
                      </button>
                      <div className="absolute bottom-1 left-1 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
                        {index + 1}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Submit */}
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? 'Đang tạo...' : 'Tạo biến thể'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}