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
import { SuggestionInput } from '@/components/UI/recommend-input';
import { searchAttributeValues } from '@/services/productManagementService';
import { Textarea } from '@/components/UI/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/UI/select';
import { ComboboxWithCreate } from '@/components/UI/ComboboxWithCreate';
import { Label } from '@/components/UI/label';
import { useProductCreate } from '@/hooks/useProductCreate';
import { Plus, Trash2, Sparkles, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
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
  })).optional(),
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
    appendAvailableAttribute,
    initialLoading,
  } = useProductCreate(onSuccess);

  const { control, handleSubmit, formState: { errors }, watch, setValue } = form;
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  const handleGenerateDescription = async () => {
    const currentDescription = watch('description');
    if (!currentDescription || currentDescription.trim().length === 0) {
      toast.error('Vui lòng nhập nội dung thô để tạo mô tả');
      return;
    }

    setIsGenerating(true);
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ rawDescription: currentDescription }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate content');
      }

      const data = await response.json();
      if (data.data) {
        setValue('description', data.data);
        toast.success('Đã tạo mô tả thành công');
      } else {
        toast.error('Không nhận được nội dung từ AI');
      }
    } catch (error) {
      console.error('Error generating description:', error);
      toast.error('Có lỗi xảy ra khi tạo mô tả');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto">
      {/* Create forms don't need a blocking loading overlay; user can continue filling while data fetches */}
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
          <div className="flex items-center justify-between mb-2">
            <Label htmlFor="description">Mô tả</Label>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleGenerateDescription}
              disabled={isGenerating}
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Đang tạo...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 mr-2" />
                  Generate AI
                </>
              )}
            </Button>
          </div>
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
          {(watch('attributes') || []).map((_, index) => (
            <div key={`attribute-${index}`} className="flex items-center space-x-2 mt-2 min-w-0">
              <Controller
                name={`attributes.${index}.attributeId`}
                control={control}
                render={({ field }) => (
                  <div className="flex-none w-40 md:w-1/3 min-w-[150px]">
                    <ComboboxWithCreate
                      value={field.value ? Number(field.value) : null}
                      onChange={(id) => field.onChange(id ?? undefined)}
                      placeholder="Chọn thuộc tính"
                      className="w-full"
                      items={attributes}
                      onCreate={appendAvailableAttribute}
                    />
                  </div>
                )}
              />
              <div className="flex-1 min-w-0">
                <Controller
                name={`attributes.${index}.value`}
                control={control}
                render={({ field }) => {
                  const attributeId = watch(`attributes.${index}.attributeId`);
                  return (
                    <SuggestionInput
                      data={[]}
                      value={field.value || ''}
                      onChange={field.onChange}
                      placeholder="Giá trị"
                      fetchSuggestions={(val) => {
                        if (!attributeId || attributeId === 0) return Promise.resolve([]);
                        return searchAttributeValues(Number(attributeId), val);
                      }}
                      minQueryLength={1}
                      debounceMs={250}
                      className="w-full"
                    />
                  )
                }}
              />
              </div>
              {(watch('attributes') || []).length > 0 && (
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