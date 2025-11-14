/**
 * Hook for Product Creation
 */

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { ProductWithAttributesRequest, ProductAttribute, Attribute } from '@/types/productCreate';
import { getBrands, getCategories, getAttributes, flattenCategories, uploadProductImage, createProductWithAttributes } from '@/services/productManagementService';
import { Brand, Category } from '@/features/category';
import axios from '@/lib/axios';
import { useRouter } from 'next/navigation';
import { sampleAttributes } from '@/components/common/manage/product/dump';

// Zod schema for validation
const productSchema = z.object({
  name: z.string().min(1, 'Tên sản phẩm là bắt buộc'),
  description: z.string().min(1, 'Mô tả là bắt buộc'),
  categoryId: z.number().min(1, 'Danh mục là bắt buộc'),
  brandId: z.number().min(1, 'Thương hiệu là bắt buộc'),
  warrantyMonths: z.number().int().min(0, 'Thời gian bảo hành phải >= 0'),
  attributes: z.array(z.object({
    attributeId: z.number().min(1, 'ID thuộc tính là bắt buộc'),
    value: z.string().min(1, 'Giá trị thuộc tính là bắt buộc'),
  })).min(1, 'Phải có ít nhất một thuộc tính'),
});

type ProductFormData = z.infer<typeof productSchema>;

export const useProductCreate = () => {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [flattenedCategories, setFlattenedCategories] = useState<Category[]>([]);
  const [attributes, setAttributes] = useState<Attribute[]>([]);
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const router = useRouter();

  const form = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: '',
      description: '',
      categoryId: 0,
      brandId: 0,
      warrantyMonths: 0,
      attributes: [{ attributeId: 0, value: '' }],
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
    };
    fetchData();
  }, []);

  const addAttribute = () => {
    const currentAttributes = form.getValues('attributes');
    form.setValue('attributes', [...currentAttributes, { attributeId: 0, value: '' }]);
  };

  const removeAttribute = (index: number) => {
    const currentAttributes = form.getValues('attributes');
    if (currentAttributes.length > 1) {
      form.setValue('attributes', currentAttributes.filter((_, i) => i !== index));
    }
  };

  const onSubmit = async (data: ProductFormData) => {
    setLoading(true);
    try {
      // Step 1: Upload image first if exists
      let uploadedImage: { url: string; publicId: string } | null = null;
      if (imageFile) {
        const uploadResponse = await uploadProductImage(imageFile);
        uploadedImage = uploadResponse;
        console.log('Image uploaded:', uploadedImage);
      }

      // Step 2: Create product with image URLs
      const productData = {
        name: data.name,
        description: data.description,
        categoryId: data.categoryId,
        brandId: data.brandId,
        warrantyMonths: data.warrantyMonths,
        imageUrl: uploadedImage?.url || null,
        imagePublicId: uploadedImage?.publicId || null,
        attributes: data.attributes,
      };

      const response = await createProductWithAttributes(productData);

      console.log('Product created:', response);
      toast.success('Sản phẩm đã được tạo thành công!');

      // Redirect to create variation page
      if (response && response.id) {
        router.push(`/admin/products/${response.id}/variations/create`);
      }
    } catch (error) {
      console.error('Failed to create product:', error);
      // Toast error is handled globally in axios interceptor
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
    imageFile,
    setImageFile,
    addAttribute,
    removeAttribute,
    onSubmit,
  };
};