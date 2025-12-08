// Common types
export type ID = number | string;

// ===== PROMOTION & VOUCHER TYPES =====

export interface Campaign {
  id: number;
  name: string;
  description?: string;
  startDate: string;
  endDate: string;
  image?: string;
  imageID?: string;
  imageUrl?: string; // Deprecated, use 'image' instead
  isActive: boolean;
  status?: 'ACTIVE' | 'SCHEDULED' | 'EXPIRED';
  createdAt: string;
  updatedAt: string;
  deleted?: boolean;
  promotionCount?: number;
}

export interface Promotion {
  id: number;
  campaignId: number;
  campaignName: string;
  productVariationId: number;
  discountType: 'PERCENTAGE' | 'FIXED';
  discountValue: number;
  createdAt: string;
  updatedAt: string;
  active: boolean;
}

// Response for GET /promotions/campaign/{id}
export interface CampaignPromotion {
  promotionId: number;
  campaignId: number;
  campaignName: string;
  productId: number;
  productName: string;
  productSpu?: string;
  variationId: number;
  sku?: string;
  variationName?: string;
  originalPrice?: number;
  discountedPrice?: number;
  discountType: 'PERCENTAGE' | 'FIXED';
  discountValue: number;
}

export interface Voucher {
  id: number;
  code: string;
  voucherType: 'PERCENTAGE' | 'FIXED_AMOUNT';
  value: number;
  minOrderAmount: number;
  usageLimit: number;
  usedCount: number;
  reservedQuantity: number;
  availableQuantity: number;
  validFrom: string;
  validUntil: string;
  isValid: boolean;
  hasUsageLeft: boolean;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface VoucherValidation {
  isValid: boolean;
  message: string;
  voucher?: {
    id: number;
    code: string;
    voucherType: 'PERCENTAGE' | 'FIXED_AMOUNT';
    value: number;
    minOrderAmount: number;
    usageLimit: number;
    usedCount: number;
    hasUsageLeft: boolean;
  };
  discountAmount: number;
  finalAmount: number;
  discountPercentage?: number;
  errorType?: string;
}

export interface PromotionCalculation {
  productVariationId: number;
  quantity: number;
  originalPrice: number;
  totalOriginalAmount: number;
  promotions: {
    id: number;
    campaignName: string;
    promotionType: 'PERCENTAGE' | 'FIXED_AMOUNT';
    value: number;
    discountAmount: number;
    maxDiscountAmount?: number;
    appliedDiscountAmount: number;
  }[];
  totalPromotionDiscount: number;
  finalPrice: number;
  discountPercentage: number;
}

export interface PaginatedResponse<T> {
  content: T[];
  page: {
    size: number;
    number: number;
    totalElements: number;
    totalPages: number;
  };
}

// Standard Spring Boot pagination response (for Campaign & Voucher)
export interface StandardPaginatedResponse<T> {
  content: T[];
  pageable: {
    pageNumber: number;
    pageSize: number;
    sort?: {
      sorted: boolean;
      orderBy: string;
      direction: string;
    };
  };
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
  numberOfElements: number;
}

// ===== VOUCHER ERROR TYPES =====

export interface VoucherError {
  error: 'VOUCHER_VALIDATION_FAILED';
  message: string;
  voucherCode: string;
  errorType: 'VOUCHER_NOT_FOUND' | 'VOUCHER_EXPIRED' | 'VOUCHER_LIMIT_EXCEEDED' | 'VOUCHER_ALREADY_USED' | 'ORDER_AMOUNT_TOO_LOW';
  timestamp: number;
}

// ===== USER VOUCHER USAGE =====

export interface UserVoucherUsage {
  id: number;
  userId: number;
  voucherCode: string;
  orderId: number;
  usedAt: string;
}

// ===== VOUCHER USAGE COUNT =====

export interface VoucherUsageCount {
  voucherCode: string;
  totalUsageCount: number;
  usageLimit: number;
  remainingCount: number;
  usagePercentage: number;
}
