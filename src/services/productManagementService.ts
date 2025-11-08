/**
 * Product Management Service
 * API calls for product management (admin/staff)
 */

import axios from '@/lib/axios';
import { Brand, Category } from '@/features/category';
import { 
  ProductManagementItem, 
  ProductManagementParams, 
  ProductManagementResponse,
} from '@/features/productManagement';

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
