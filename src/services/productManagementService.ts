/**
 * Product Management Service
 * API calls for product management (admin/staff)
 */

import axios, { axiosUploadInstance } from '@/lib/axios';
import { Brand, Category } from '@/features/category';
import { Attribute } from '@/types/productCreate';
import { 
  ProductManagementItem, 
  ProductManagementParams, 
  ProductManagementResponse,
} from '@/features/productManagement';
import { ProductVariation } from '@/features/productDetail';

// Re-export types for convenience
export type { 
  ProductManagementItem, 
  ProductManagementParams, 
  ProductManagementResponse,
  Brand,
  Category
};

// Get products for management (requires auth)
export const getProductsForManagement = async (
  params: ProductManagementParams
): Promise<ProductManagementResponse> => {
  const response = await axios.get('/products/management', { params }) as any;
  console.log('API Response:', response);
  return response as ProductManagementResponse; 
};

// Get all brands (public API)
export const getBrands = async (): Promise<Brand[]> => {
  const response = await axios.get('/brands') as any;
  return response as Brand[];
};

// Get all categories (public API)
export const getCategories = async (): Promise<Category[]> => {
  const response = await axios.get('/categories') as any;
  return response as Category[];
};

// Get all attributes (admin API)
export const getAttributes = async (): Promise<Attribute[]> => {
  const response = await axios.get('/attributes') as any;
  return response as Attribute[];
};

// Publish product (DRAFT/DELETED -> PUBLISHED)
export const publishProduct = async (productId: number): Promise<ProductManagementItem> => {
  const response = await axios.put(`/products/${productId}/publish`) as any;
  return response as ProductManagementItem;
};

// Draft product (PUBLISHED -> DRAFT)
export const draftProduct = async (productId: number): Promise<ProductManagementItem> => {
  const response = await axios.put(`/products/${productId}/draft`) as any;
  return response as ProductManagementItem;
};

// Delete product - soft delete (PUBLISHED/DRAFT -> DELETED)
export const deleteProduct = async (productId: number): Promise<ProductManagementItem> => {
  const response = await axios.delete(`/products/${productId}`) as any;
  return response as ProductManagementItem;
};

// Restore product (DELETED -> DRAFT)
export const restoreProduct = async (productId: number): Promise<ProductManagementItem> => {
  const response = await axios.put(`/products/${productId}/draft`) as any;
  return response as ProductManagementItem;
};

// Flatten categories tree into flat list with indentation
export const flattenCategories = (
  categories: Category[],
  level: number = 0
): Category[] => {
  const result: Category[] = [];
  const seenIds = new Set<number>();

  categories.forEach((category) => {
    const indent = '\u00A0\u00A0'.repeat(level); // Non-breaking spaces for indent
    
    // Warn if duplicate ID found
    if (seenIds.has(category.id)) {
      console.warn(`Duplicate category ID found: ${category.id} - ${category.name}`);
      return; // Skip duplicate
    }
    seenIds.add(category.id);
    
    result.push({
      ...category,
      level,
      displayName: level > 0 ? `${indent}${category.name}` : category.name,
    });

    if (category.childCategories && category.childCategories.length > 0) {
      result.push(...flattenCategories(category.childCategories, level + 1));
    }
  });

  return result;
};

// Upload images to Cloudinary
export const uploadImages = async (formData: FormData): Promise<Array<{url: string, publicId: string}>> => {
  const response = await axiosUploadInstance.post('/cloudinary/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    timeout: 120000, // 120 seconds timeout for uploads
  });
  return response.data;
};

// Create product variation with image URLs
export const createProductVariationWithImages = async (variationData: any): Promise<any> => {
  const response = await axios.post('/product-variations', variationData);
  return response;
};

// Get product variations by product ID
export const getProductVariations = async (productId: number): Promise<ProductVariation[]> => {
  const response = await axios.get(`/product-variations/management/product/${productId}`);

  return response.data;
};

// Upload product image to Cloudinary
export const uploadProductImage = async (file: File): Promise<{url: string, publicId: string}> => {
  const formData = new FormData();
  formData.append('files', file);
  formData.append('folderName', 'products');

  const response = await axiosUploadInstance.post('/cloudinary/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    timeout: 30000, // 30 seconds timeout for uploads
  });

  // Backend returns array even for single file, take first element
  const uploadedImages = response.data;
  if (Array.isArray(uploadedImages) && uploadedImages.length > 0) {
    return uploadedImages[0];
  }

  return uploadedImages;
};

// Create product with attributes and image
export const createProductWithAttributes = async (productData: any): Promise<any> => {
  const response = await axios.post('/products', productData);
  return response;
};
