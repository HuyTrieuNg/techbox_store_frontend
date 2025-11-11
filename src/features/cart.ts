export interface CartItem {
  id: number;
  productVariationId: number;
  productName: string;
  productImage: string;
  variantName: string;
  quantity: number;
  originalPrice: number;
  unitPrice: number;
  totalPrice: number;
  discountType: string | null;
  discountValue: number | null;
  addedAt: string;
  updatedAt: string;
  sku: string;
  stockQuantity: number;
  available: boolean;
}

export interface CartSummary {
  totalQuantity: number;
  totalAmount: number;
  uniqueItems: number;
  hasUnavailableItems: boolean;
}

export interface Cart {
  id: number;
  userId: number;
  items: CartItem[];
  totalItems: number;
  subtotal: number;
  createdAt: string;
  updatedAt: string;
  summary: CartSummary;
  empty: boolean;
}