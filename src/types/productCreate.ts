/**
 * Types for Product Creation
 */

export interface ProductAttribute {
  attributeId: number;
  value: string;
}

export interface ProductWithAttributesRequest {
  name: string;
  description: string;
  categoryId: number;
  brandId: number;
  warrantyMonths: number;
  imageUrl?: string | null;
  imagePublicId?: string | null;
  attributes: ProductAttribute[];
}

export interface Attribute {
  id: number;
  name: string;
  // Add other fields if needed
}

// Product Variation Types
export interface VariationAttribute {
  attributeId: number;
  value: string;
}

export interface ProductVariationWithImagesRequest {
  variationName: string;
  productId: number;
  price: number;
  sku: string;
  avgCostPrice: number;
  stockQuantity: number;
  reservedQuantity: number;
  variationAttributes: VariationAttribute[];
}

export interface ProductVariationCreateRequest {
  variationName: string;
  productId: number;
  price: number;
  sku: string;
  avgCostPrice: number;
  stockQuantity: number;
  reservedQuantity: number;
  variationAttributes: VariationAttribute[];
  imageUrls: string[];
  imagePublicIds: string[];
}