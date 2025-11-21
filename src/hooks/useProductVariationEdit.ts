/**
 * Hook for Product Variation Editing
 */

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { ProductVariation, VariationImage } from '@/features/productDetail';
import { getAttributes, uploadImages } from '@/services/productManagementService';
import { updateProductVariation } from '@/services/productDetailService';
import { Attribute } from '@/types/productCreate';

// Zod schema for validation
const variationEditSchema = z.object({
  variationName: z.string().max(255, 'Tên biến thể không được vượt quá 255 ký tự'),
  price: z.number().int().min(0, 'Giá phải >= 0'),
  sku: z.string().max(255, 'SKU không được vượt quá 255 ký tự'),
  variationAttributes: z.array(z.object({
    attributeId: z.number().min(1, 'ID thuộc tính là bắt buộc'),
    value: z.string().min(1, 'Giá trị thuộc tính là bắt buộc'),
  })).min(1, 'Phải có ít nhất một thuộc tính biến thể'),
});

type VariationEditFormData = z.infer<typeof variationEditSchema>;

export const useProductVariationEdit = (variation: ProductVariation) => {
  const [attributes, setAttributes] = useState<Attribute[]>([]);
  const [loading, setLoading] = useState(false);
  const [existingImages, setExistingImages] = useState<VariationImage[]>([]);
  const [newImageFiles, setNewImageFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [imagesToDelete, setImagesToDelete] = useState<string[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);

  const form = useForm<VariationEditFormData>({
    resolver: zodResolver(variationEditSchema),
    defaultValues: {
      variationName: variation.variationName,
      price: variation.price,
      sku: variation.sku,
      variationAttributes: variation.attributes?.map(attr => ({
        attributeId: attr.attributeId,
        value: attr.attributeValue,
      })) || [],
    },
  });

  // Initialize existing images
  useEffect(() => {
    setExistingImages(variation.images || []);
  }, [variation.images]);

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

    // Check total limit (existing + new)
    const totalImages = existingImages.length - imagesToDelete.length + newImageFiles.length + files.length;
    if (totalImages > 10) {
      toast.error('Tối đa chỉ được có 10 ảnh');
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
      setNewImageFiles(prev => [...prev, ...validFiles]);
      const newPreviews = validFiles.map(file => URL.createObjectURL(file));
      setImagePreviews(prev => [...prev, ...newPreviews]);
    }

    // Reset input
    e.target.value = '';
  };

  const removeExistingImage = (imageId: number) => {
    const image = existingImages.find(img => img.id === imageId);
    if (image) {
      setImagesToDelete(prev => [...prev, image.imagePublicId]);
      setExistingImages(prev => prev.filter(img => img.id !== imageId));
    }
  };

  const removeNewImage = (index: number) => {
    const newFiles = newImageFiles.filter((_, i) => i !== index);
    const newPreviews = imagePreviews.filter((_, i) => i !== index);
    setNewImageFiles(newFiles);
    setImagePreviews(newPreviews);
    // Revoke the removed preview URL
    URL.revokeObjectURL(imagePreviews[index]);
  };

  const onSubmit = async (data: VariationEditFormData): Promise<any> => {
    setLoading(true);
    try {
      // Step 1: Upload new images first
      let uploadedImages: { url: string; publicId: string }[] = [];
      if (newImageFiles.length > 0) {
        const uploadFormData = new FormData();
        newImageFiles.forEach((file) => {
          uploadFormData.append('files', file);
        });
        uploadFormData.append('folderName', `product-variations/${variation.productId}`);

        const uploadResponse = await uploadImages(uploadFormData);
        uploadedImages = uploadResponse;
        console.log('New images uploaded:', uploadedImages);
      }

      // Step 2: Prepare update data according to the DTO
      const updateData = {
        variationName: data.variationName,
        price: data.price,
        sku: data.sku,
        imageUrls: uploadedImages.map(img => img.url), // New image URLs
        imagePublicIds: uploadedImages.map(img => img.publicId), // New Cloudinary public IDs
        deleteImageIds: imagesToDelete, // Public IDs of images to delete
        variationAttributes: data.variationAttributes,
      };

      console.log('Update data:', updateData);

      // Step 3: Update variation
      const response = await updateProductVariation(variation.id, updateData);

      console.log('Variation updated:', response);
      toast.success('Biến thể đã được cập nhật thành công!');

      // Reset form state
      setNewImageFiles([]);
      setImagePreviews([]);
      setImagesToDelete([]);

      return response;
    } catch (error) {
      console.error('Failed to update variation:', error);
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

    // Check total limit (existing + new)
    const totalImages = existingImages.length - imagesToDelete.length + newImageFiles.length + files.length;
    if (totalImages > 10) {
      toast.error('Tối đa chỉ được có 10 ảnh');
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
      setNewImageFiles(prev => [...prev, ...validFiles]);
      const newPreviews = validFiles.map(file => URL.createObjectURL(file));
      setImagePreviews(prev => [...prev, ...newPreviews]);
    }
  };

  return {
    form,
    attributes,
    loading,
    existingImages,
    newImageFiles,
    imagePreviews,
    imagesToDelete,
    isDragOver,
    handleImageChange,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    removeExistingImage,
    removeNewImage,
    addVariationAttribute,
    removeVariationAttribute,
    onSubmit,
  };
};