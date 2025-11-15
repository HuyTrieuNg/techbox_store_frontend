// export interface Product {
//   id: number;
//   name: string;
//   price: number;
//   image: string;
// }

// export interface Category {
//   id: number;
//   name: string;
//   subcategories?: Category[];
// }

// export interface Brand {
//   id: number;
//   name: string;
// }

// export interface Product {
//   id: number;
//   name: string;
//   slug?: string;
//   description?: string;
//   category_id: number;
//   brand_id: number;
//   image_url?: string;
//   variations?: ProductVariation[];
//   gallery?: string[];
//   promotions?: string[];
//   ratings?: number[];
//   reviews?: {
//     ratings: number[];
//     comments?: { user: string; comment: string; date: string }[];
//   };
//   specs?: string[];
// }

// export interface ProductVariation {
//   id: number;
//   variation_name?: string;
//   product_id: number;
//   price: number;
//   sku: string;
//   image_url?: string[];
//   quantity: number;
//   attributes?: VariationAttribute[];
// }

// export interface VariationAttribute {
//   attribute_id: number;
//   name: string;
//   value: string | number | boolean;
// }


export interface Product {
  id: number;
  name: string;
  imageUrl: string | null;
  displayOriginalPrice: number | null;
  displaySalePrice: number | null;
  discountType: "PERCENTAGE" | "FIXED" | null;
  discountValue: number | null;
  averageRating: number;
  totalRatings: number;
  // inWishlist: boolean;
}

// Interface cho hình ảnh
export interface ProductImage {
  id: number;
  imageUrl: string;
}

// Interface cho thuộc tính (attributes)
export interface ProductAttribute {
  id: number;
  name: string;
  value: string;
}

// Interface cho phiên bản sản phẩm (variations)
export interface ProductVariation2 {
  id: number;
  variationName: string;
  price: number;
  sku: string;
  availableQuantity: number;
  warrantyMonths: number;
  createdAt: string;
  updatedAt: string;
  salePrice: number;
  discountType: "PERCENTAGE" | "FIXED" | null;
  discountValue: number | null;
  images: ProductImage[];
  attributes: ProductAttribute[];
}

// Interface chính cho sản phẩm
export interface ProductDetail {
  id: number;
  name: string;
  description: string;
  categoryId: number;
  categoryName: string;
  brandId: number;
  brandName: string;
  imageUrl: string | null;
  imagePublicId: string | null;
  averageRating: number;
  totalRatings: number;
  displayOriginalPrice: number | null;
  displaySalePrice: number | null;
  discountType: "PERCENTAGE" | "FIXED" | null;
  discountValue: number | null;
  createdAt: string;
  updatedAt: string;
  inWishlist: boolean;
  attributes: ProductAttribute[];
  variations: ProductVariation2[];
}