/**
 * Product Detail Service
 * API calls for product detail page (admin/staff)
 */

import api from '@/lib/axios';
import { ProductDetail, ProductVariation } from '@/features/productDetail';

// Get product detail by ID
export const getProductDetail = async (productId: number): Promise<ProductDetail> => {
  const response = await api.get(`/products/management/${productId}`) as any;
  return response as ProductDetail;
};

// Get product variations by product ID
export const getProductVariations = async (
  productId: number,
  includeDeleted: boolean = false
): Promise<ProductVariation[]> => {
  const response = await api.get(
    `/product-variations/management/product/${productId}`,
    { params: { deleted: includeDeleted } }
  ) as any;
  return response as ProductVariation[];
};

// Delete a variation (soft delete)

// Get a single variation by id
export const getProductVariationById = async (variationId: number) => {
  const response = await api.get(`/product-variations/${variationId}`) as any;
  return response as any;
};
export const deleteVariation = async (variationId: number) => {
  const response = await api.delete(`/product-variations/${variationId}`);
  return response.data;
};

// Restore a previously deleted variation
export const restoreVariation = async (variationId: number) => {
  const response = await api.patch(`/product-variations/${variationId}/restore`);
  return response.data;
};

// Product management operations
export const publishProduct = async (productId: number) => {
  const response = await api.put(`/products/${productId}/publish`);
  return response.data;
};

export const draftProduct = async (productId: number) => {
  const response = await api.put(`/products/${productId}/draft`);
  return response.data;
};

export const deleteProduct = async (productId: number) => {
  const response = await api.delete(`/products/${productId}`);
  return response.data;
};

export const restoreProduct = draftProduct;

// Update product basic information
export const updateProduct = async (productId: number, productData: any) => {
  const response = await api.put(`/products/${productId}`, productData);
  return response.data;
};

// Update product image
export const updateProductImage = async (productId: number, imageUrl: string) => {
  const response = await api.put(`/products/${productId}/image`, { imageUrl });
  return response.data;
};

// Update product variation
export const updateProductVariation = async (variationId: number, variationData: any) => {
  const response = await api.put(`/product-variations/${variationId}`, variationData);
  return response.data;
};

// Create product variation
export const createProductVariation = async (productId: number, variationData: any) => {
  const response = await api.post(`/product-variations`, { ...variationData, productId });
  return response.data;
};
