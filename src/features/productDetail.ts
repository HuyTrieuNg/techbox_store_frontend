/**
 * Product Detail Types
 * Types for product detail page (admin/staff)
 */

export interface ProductDetailAttribute {
  attributeId: number;
  attributeName: string;
  attributeValue: string;
}

export interface ProductDetail {
  id: number;
  spu: string;
  name: string;
  description: string;
  imageUrl: string | null;
  imagePublicId: string | null;
  status: 'PUBLISHED' | 'DRAFT' | 'DELETED';
  warrantyMonths: number | null;
  categoryId: number;
  categoryName: string;
  brandId: number;
  brandName: string;
  attributes: ProductDetailAttribute[];
  displayOriginalPrice: number | null;
  displaySalePrice: number | null;
  averageRating: number;
  totalRatings: number;
  totalVariations: number;
  activeVariations: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface VariationImage {
  id: number;
  imageUrl: string;
  imagePublicId: string;
}

export interface VariationAttribute {
  attributeId: number;
  attributeName: string;
  attributeValue: string;
}

export interface ProductVariation {
  id: number;
  productId: number;
  sku: string;
  variationName: string;
  price: number;
  salePrice: number;
  costPrice: number;
  stock: number;
  reservedQuantity: number;
  availableQuantity: number;
  promotionId: number | null;
  promotionName: string | null;
  discountType: 'PERCENTAGE' | 'FIXED' | null;
  discountValue: number | null;
  promotionStartDate: string | null;
  promotionEndDate: string | null;
  images: VariationImage[];
  attributes: VariationAttribute[];
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}
