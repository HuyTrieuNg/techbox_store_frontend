/**
 * Product Management Types
 * Types for admin/staff product management system
 */

export type ProductStatus = 'PUBLISHED' | 'DRAFT' | 'DELETED';

export interface ProductManagementItem {
  id: number;
  name: string;
  imageUrl: string | null;
  spu: string;
  displayOriginalPrice: number | null;
  displaySalePrice: number | null;
  discountType: 'PERCENTAGE' | 'FIXED' | null;
  discountValue: number | null;
  averageRating: number;
  totalRatings: number;
  status: ProductStatus;
  createdAt: string;
  updatedAt: string;
  deleteAt: string | null;
}

export interface ProductManagementParams {
  status?: ProductStatus | null;
  name?: string;
  spu?: string;
  brandId?: number;
  categoryId?: number;
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  sortBy?: 'id' | 'name' | 'displaySalePrice' | 'averageRating' | 'createdAt';
  sortDirection?: 'ASC' | 'DESC';
  page?: number;
  size?: number;
}

export interface ProductManagementResponse {
  content: ProductManagementItem[];
  page: {
    size: number;
    number: number; // Current page (0-based)
    totalElements: number;
    totalPages: number;
  };
}
