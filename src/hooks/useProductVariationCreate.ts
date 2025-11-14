/**
 * Hook for Product Variation Creation
 */

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { ProductVariationWithImagesRequest, VariationAttribute } from '@/types/productCreate';
import { getAttributes, uploadImages, createProductVariationWithImages } from '@/services/productManagementService';
import { Attribute } from '@/features/category';
import axios from '@/lib/axios';

// Zod schema for validation
const variationSchema = z.object({
  variationName: z.string().min(1, 'Tên biến thể là bắt buộc'),
  price: z.number().int().min(0, 'Giá phải >= 0'),
  sku: z.string().min(1, 'SKU là bắt buộc'),
  variationAttributes: z.array(z.object({
    attributeId: z.number().min(1, 'ID thuộc tính là bắt buộc'),
    value: z.string().min(1, 'Giá trị thuộc tính là bắt buộc'),
  })).min(1, 'Phải có ít nhất một thuộc tính biến thể'),
});

type VariationFormData = z.infer<typeof variationSchema>;

export const useProductVariationCreate = (productId: number) => {
  const [attributes, setAttributes] = useState<Attribute[]>([]);
  const [loading, setLoading] = useState(false);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);

  const form = useForm<VariationFormData>({
    resolver: zodResolver(variationSchema),
    defaultValues: {
      variationName: '',
      price: 0,
      sku: '',
      variationAttributes: [{ attributeId: 0, value: '' }],
    },
  });

  // Fetch attributes
  useEffect(() => {
    const fetchAttributes = async () => {
      try {
        const data = await getAttributes();
        setAttributes(data);
      } catch (error) {
        console.error('Failed to fetch attributes:', error);
      }
    };
    fetchAttributes();
  }, []);

  // Cleanup image previews
  useEffect(() => {
    return () => {
      imagePreviews.forEach(preview => URL.revokeObjectURL(preview));
    };
  }, [imagePreviews]);

  const addVariationAttribute = () => {
    const currentAttributes = form.getValues('variationAttributes');
    form.setValue('variationAttributes', [...currentAttributes, { attributeId: 0, value: '' }]);
  };

  const removeVariationAttribute = (index: number) => {
    const currentAttributes = form.getValues('variationAttributes');
    if (currentAttributes.length > 1) {
      form.setValue('variationAttributes', currentAttributes.filter((_, i) => i !== index));
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    
    // Check total limit
    if (imageFiles.length + files.length > 10) {
      toast.error('Tối đa chỉ được upload 10 ảnh');
      return;
    }
    
    // Validate files
    const validFiles = files.filter(file => {
      if (!file.type.startsWith('image/')) {
        toast.error(`${file.name} không phải là file ảnh hợp lệ`);
        return false;
      }
      if (file.size > 10 * 1024 * 1024) { // 10MB
        toast.error(`${file.name} quá lớn (tối đa 10MB)`);
        return false;
      }
      return true;
    });

    if (validFiles.length > 0) {
      setImageFiles(prev => [...prev, ...validFiles]);
      const newPreviews = validFiles.map(file => URL.createObjectURL(file));
      setImagePreviews(prev => [...prev, ...newPreviews]);
    }
    
    // Reset input
    e.target.value = '';
  };

  const removeImage = (index: number) => {
    const newFiles = imageFiles.filter((_, i) => i !== index);
    const newPreviews = imagePreviews.filter((_, i) => i !== index);
    setImageFiles(newFiles);
    setImagePreviews(newPreviews);
    // Revoke the removed preview URL
    URL.revokeObjectURL(imagePreviews[index]);
  };

  const onSubmit = async (data: VariationFormData) => {
    setLoading(true);
    try {
      // Step 1: Upload images first
      let uploadedImages: { url: string; publicId: string }[] = [];
      if (imageFiles.length > 0) {
        const uploadFormData = new FormData();
        imageFiles.forEach((file) => {
          uploadFormData.append('files', file);
        });
        uploadFormData.append('folderName', `product-variations/${productId}`);

        const uploadResponse = await uploadImages(uploadFormData);
        uploadedImages = uploadResponse;
        console.log('Images uploaded:', uploadedImages);
      }

      // Step 2: Create variation with image URLs
      const variationData = {
        variationName: data.variationName,
        productId,
        price: data.price,
        sku: data.sku,
        imageUrls: uploadedImages.map(img => img.url),
        imagePublicIds: uploadedImages.map(img => img.publicId),
        variationAttributes: data.variationAttributes,
      };

      const response = await createProductVariationWithImages(variationData);

      console.log('Variation created:', response.data);
      toast.success('Biến thể đã được tạo thành công!');

      // Reset form
      form.reset();
      setImageFiles([]);
      setImagePreviews([]);

      return response.data;
    } catch (error) {
      console.error('Failed to create variation:', error);
      // Toast error is handled globally in axios interceptor
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    
    // Check total limit
    if (imageFiles.length + files.length > 10) {
      toast.error('Tối đa chỉ được upload 10 ảnh');
      return;
    }
    
    // Validate files
    const validFiles = files.filter(file => {
      if (!file.type.startsWith('image/')) {
        toast.error(`${file.name} không phải là file ảnh hợp lệ`);
        return false;
      }
      if (file.size > 10 * 1024 * 1024) { // 10MB
        toast.error(`${file.name} quá lớn (tối đa 10MB)`);
        return false;
      }
      return true;
    });

    if (validFiles.length > 0) {
      setImageFiles(prev => [...prev, ...validFiles]);
      const newPreviews = validFiles.map(file => URL.createObjectURL(file));
      setImagePreviews(prev => [...prev, ...newPreviews]);
    }
  };

  return {
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
  };
};