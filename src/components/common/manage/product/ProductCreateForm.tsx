'use client';

/**
 * Product Create Form Component
 */

import { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/UI/button';
import { Input } from '@/components/UI/input';
import { Textarea } from '@/components/UI/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/UI/select';
import { Label } from '@/components/UI/label';
import { useProductCreate } from '@/hooks/useProductCreate';
import { Plus, Trash2 } from 'lucide-react';
import CategoryTree from './CategoryTree';
import MDEditor from '@uiw/react-md-editor';
import '@uiw/react-md-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';

// Zod schema for validation
const productSchema = z.object({
  name: z.string().min(1, 'Tên sản phẩm là bắt buộc'),
  description: z.string().min(1, 'Mô tả là bắt buộc'),
  categoryId: z.number().min(1, 'Danh mục là bắt buộc'),
  brandId: z.number().min(1, 'Thương hiệu là bắt buộc'),
  warrantyMonths: z.number().min(0, 'Thời gian bảo hành phải >= 0'),
  attributes: z.array(z.object({
    attributeId: z.number().min(1, 'ID thuộc tính là bắt buộc'),
    value: z.string().min(1, 'Giá trị thuộc tính là bắt buộc'),
  })).min(1, 'Phải có ít nhất một thuộc tính'),
});

type ProductFormData = z.infer<typeof productSchema>;

type ProductCreateFormProps = {
  onSuccess?: (productId: number) => void;
};

export default function ProductCreateForm({ onSuccess }: ProductCreateFormProps) {
  const {
    form,
    brands,
    categories,
    flattenedCategories,
    attributes,
    loading,
    imageFile,
    setImageFile,
    addAttribute,
    removeAttribute,
    onSubmit,
  } = useProductCreate(onSuccess);

  const { control, handleSubmit, formState: { errors }, watch } = form;
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  return (
    <div className="w-full">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Tạo Sản Phẩm Mới</h3>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Name */}
          <div>
            <Label htmlFor="name">Tên sản phẩm</Label>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <Input id="name" {...field} placeholder="Nhập tên sản phẩm" />
              )}
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>

          {/* Description */}
          <div>
            <Label htmlFor="description">Mô tả</Label>
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <MDEditor
                  value={field.value}
                  onChange={(value) => field.onChange(value || '')}
                  preview="edit"
                  hideToolbar={false}
                  data-color-mode="light"
                />
              )}
            />
            {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
          </div>

          {/* Brand and Warranty in same row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Brand */}
            <div>
              <Label htmlFor="brandId">Thương hiệu</Label>
              <Controller
                name="brandId"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={(value) => field.onChange(Number(value))} value={field.value.toString()}>
                    <SelectTrigger className="hover:bg-gray-50 transition-colors w-full">
                      <SelectValue placeholder="--chọn thương hiệu--" />
                    </SelectTrigger>
                    <SelectContent>
                      {brands.map((brand) => (
                        <SelectItem key={`brand-${brand.id}`} value={brand.id.toString()}>
                          {brand.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.brandId && <p className="text-red-500 text-sm">{errors.brandId.message}</p>}
            </div>

            {/* Warranty Months */}
            <div>
              <Label htmlFor="warrantyMonths">Thời gian bảo hành (tháng)</Label>
              <Controller
                name="warrantyMonths"
                control={control}
                render={({ field }) => (
                  <Input
                    id="warrantyMonths"
                    type="number"
                    step="1"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                    placeholder="Nhập số tháng bảo hành"
                  />
                )}
              />
              {errors.warrantyMonths && <p className="text-red-500 text-sm">{errors.warrantyMonths.message}</p>}
            </div>
          </div>

          {/* Attributes */}
          <div>
            <Label>Thuộc tính</Label>
            {watch('attributes').map((_, index) => (
              <div key={`attribute-${index}`} className="flex items-center space-x-2 mt-2">
                <Controller
                  name={`attributes.${index}.attributeId`}
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={(value) => field.onChange(Number(value))} value={field.value.toString()}>
                      <SelectTrigger className="w-1/2">
                        <SelectValue placeholder="Chọn thuộc tính" />
                      </SelectTrigger>
                      <SelectContent>
                        {attributes.map((attr) => (
                          <SelectItem key={`attr-${attr.id}`} value={attr.id.toString()}>
                            {attr.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                <Controller
                  name={`attributes.${index}.value`}
                  control={control}
                  render={({ field }) => (
                    <Input {...field} placeholder="Giá trị" className="flex-1" />
                  )}
                />
                {watch('attributes').length > 1 && (
                  <Button type="button" variant="outline" size="sm" onClick={() => removeAttribute(index)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
            <Button type="button" variant="outline" onClick={addAttribute} className="mt-2">
              <Plus className="h-4 w-4 mr-2" />
              Thêm thuộc tính
            </Button>
            {errors.attributes && <p className="text-red-500 text-sm">{errors.attributes.message}</p>}
          </div>

          {/* Image */}
          <div>
            <Label htmlFor="image">Hình ảnh (tùy chọn)</Label>
            <Input id="image" type="file" accept="image/*" onChange={handleImageChange} />
            {imageFile && <p className="text-sm text-gray-600">Đã chọn: {imageFile.name}</p>}
            {imagePreview && (
              <div className="mt-2 flex justify-center">
                <img src={imagePreview} alt="Preview" className="max-w-xs max-h-48 object-contain border rounded" />
              </div>
            )}
          </div>

          {/* Category */}
          <div>
            <Label htmlFor="categoryId">Danh mục</Label>
            <Controller
              name="categoryId"
              control={control}
              render={({ field }) => (
                <CategoryTree
                  categories={categories}
                  selectedId={field.value}
                  onSelect={field.onChange}
                />
              )}
            />
            {errors.categoryId && <p className="text-red-500 text-sm">{errors.categoryId.message}</p>}
          </div>

          {/* Submit */}
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? 'Đang tạo...' : 'Tạo sản phẩm'}
          </Button>
        </form>
      </div>
  );
}