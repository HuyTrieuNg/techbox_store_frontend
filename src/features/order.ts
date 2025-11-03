export interface OrderItemRequest {
  productVariationId: number;
  quantity: number;
}

export interface ShippingInfo {
  shippingName: string;
  shippingPhone: string;
  shippingEmail: string;
  shippingAddress: string;
  shippingWard: string;
  shippingDistrict: string;
  shippingCity: string;
  shippingPostalCode: string;
  shippingCountry: string;
  shippingMethod: string;
  deliveryInstructions?: string;
}

export interface PaymentInfo {
  paymentMethod: string;
  paymentTransactionId?: string;
}

export interface OrderRequest {
  orderItems: OrderItemRequest[];
  shippingInfo: ShippingInfo;
  paymentInfo: PaymentInfo;
  note?: string;
  voucherCode?: string;
}

export interface OrderResponse {
  id: number;
  orderCode: string;
  status: string;
  paymentMethod: string;
  paymentStatus: string;
  totalAmount: number;
  discountAmount: number;
  shippingFee: number;
  finalAmount: number;
  shippingName: string;
  shippingPhone: string;
  shippingAddress: string;
  shippingWard: string;
  shippingDistrict: string;
  shippingCity: string;
  note: string;
  paymentTransactionId: string;
  paymentUrl?: string | null;
  createdAt: string;
  updatedAt: string;
  orderItems: {
    id: number;
    productVariationId: number;
    productName: string;
    productVariationName: string;
    quantity: number;
    unitPrice: number;
    totalAmount: number;
    discountAmount: number;
  }[];
}

export interface PaginatedOrders {
  content: OrderResponse[];
  page: {
    size: number;
    number: number;
    totalElements: number;
    totalPages: number;
  };
}
