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

export interface Product {
  id: number;
  name: string;
  slug?: string;
  description?: string;
  category_id: number;
  brand_id: number;
  image_url?: string;
  variations?: ProductVariation[];
  gallery?: string[];
  promotions?: string[];
  ratings?: number[];
  reviews?: {
    ratings: number[];
    comments?: { user: string; comment: string; date: string }[];
  };
  specs?: string[];
}

export interface ProductVariation {
  id: number;
  variation_name?: string;
  product_id: number;
  price: number;
  sku: string;
  image_url?: string[];
  quantity: number;
  attributes?: VariationAttribute[];
}

export interface VariationAttribute {
  attribute_id: number;
  name: string;
  value: string | number | boolean;
}