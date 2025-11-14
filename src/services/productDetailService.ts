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
