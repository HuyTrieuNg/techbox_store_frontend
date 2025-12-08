/**
 * Hook for Product Update
 */

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { ProductWithAttributesRequest, ProductAttribute, Attribute } from '@/types/productCreate';
import { getBrands, getCategories, getAttributes, flattenCategories } from '@/services/productManagementService';
import { Brand, Category } from '@/features/category';
import axios from '@/lib/axios';
import { useRouter } from 'next/navigation';

// Zod schema for validation based on ProductUpdateRequest DTO
const productUpdateSchema = z.object({
  name: z.string().max(255, 'Tên sản phẩm không được vượt quá 255 ký tự').optional(),
  description: z.string().max(5000, 'Mô tả không được vượt quá 5000 ký tự').optional(),
  categoryId: z.number().min(1, 'Danh mục là bắt buộc').optional(),
  brandId: z.number().min(1, 'Thương hiệu là bắt buộc').optional(),
  warrantyMonths: z.number().int().min(0, 'Thời gian bảo hành phải >= 0').optional(),
  attributes: z.array(z.object({
    attributeId: z.number().min(1, 'ID thuộc tính là bắt buộc'),
    value: z.string().min(1, 'Giá trị thuộc tính là bắt buộc'),
  })).optional(),
});

type ProductUpdateFormData = z.infer<typeof productUpdateSchema>;

export const useProductUpdate = (productId: number, onSuccess?: () => void) => {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [flattenedCategories, setFlattenedCategories] = useState<Category[]>([]);
  const [attributes, setAttributes] = useState<Attribute[]>([]);
  const [initialLoading, setInitialLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const form = useForm<ProductUpdateFormData>({
    resolver: zodResolver(productUpdateSchema),
    defaultValues: {
      name: '',
      description: '',
      categoryId: 0,
      brandId: 0,
      warrantyMonths: 0,
      attributes: [],
    },
  });

  // Fetch initial data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [brandsData, categoriesData, attributesData] = await Promise.all([
          getBrands(),
          getCategories(),
          getAttributes(),
        ]);
        setBrands(brandsData);
        setCategories(categoriesData);
        setFlattenedCategories(flattenCategories(categoriesData));
        setAttributes(attributesData);
      } catch (error) {
        console.error('Failed to fetch data:', error);
        // Toast error is handled globally in axios interceptor
      }
      finally {
        setInitialLoading(false);
      }
    };
    fetchData();
  }, []);

  const addAttribute = () => {
    const currentAttributes = form.getValues('attributes') || [];
    form.setValue('attributes', [...currentAttributes, { attributeId: 0, value: '' }]);
  };

  const removeAttribute = (index: number) => {
    const currentAttributes = form.getValues('attributes') || [];
    if (currentAttributes.length > 0) {
      form.setValue('attributes', currentAttributes.filter((_, i) => i !== index));
    }
  };

  const onSubmit = async (data: ProductUpdateFormData) => {
    setLoading(true);
    try {
      // Prepare product data for update
      const productData = {
        ...(data.name !== undefined && { name: data.name }),
        ...(data.description !== undefined && { description: data.description }),
        ...(data.categoryId !== undefined && { categoryId: data.categoryId }),
        ...(data.brandId !== undefined && { brandId: data.brandId }),
        ...(data.warrantyMonths !== undefined && { warrantyMonths: data.warrantyMonths }),
        ...(data.attributes !== undefined && data.attributes.length > 0 && { attributes: data.attributes }),
      };

      // PUT request to update product
      const response = await axios.put(`/products/${productId}`, productData);

      console.log('Product updated:', response.data);
      toast.success('Sản phẩm đã được cập nhật thành công!');

      // Call success callback or redirect to product detail page
      if (onSuccess) {
        onSuccess();
      } else {
        router.push(`/admin/products/${productId}`);
      }
    } catch (error: any) {
      console.error('Failed to update product:', error);

      // Show detailed error message
      let errorMessage = 'Không thể cập nhật sản phẩm. Vui lòng thử lại.';
      if (error?.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error?.message) {
        errorMessage = error.message;
      }

      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return {
    form,
    brands,
    categories,
    flattenedCategories,
    attributes,
    loading,
    addAttribute,
    removeAttribute,
    onSubmit,
    appendAvailableAttribute: (attr: Attribute) => setAttributes(prev => [attr, ...prev.filter(a => a.id !== attr.id)]),
    initialLoading,
  };
};