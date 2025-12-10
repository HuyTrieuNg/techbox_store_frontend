/**
 * Promotion Service - API calls cho Campaign, Promotion, Voucher
 */

import axiosInstance from '@/lib/axios';
import {
  Campaign,
  Promotion,
  Voucher,
  VoucherValidation,
  PromotionCalculation,
  PaginatedResponse,
  StandardPaginatedResponse,
  UserVoucherUsage,
  VoucherUsageCount,
} from '@/types';

// ===== CAMPAIGN APIs =====

export const campaignService = {
  // Tạo campaign mới
  create: async (formData: FormData): Promise<Campaign> => {
    return axiosInstance.post('/campaigns', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },

  // Cập nhật campaign
  update: async (id: number, formData: FormData): Promise<Campaign> => {
    return axiosInstance.put(`/campaigns/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },

  // Lấy tất cả campaigns
  getAll: async (params?: {
    page?: number;
    size?: number;
    sortBy?: string;
    sortDir?: 'ASC' | 'DESC';
  }): Promise<StandardPaginatedResponse<Campaign>> => {
    return axiosInstance.get('/campaigns', { params });
  },

  // Lấy campaign theo ID
  getById: async (id: number): Promise<Campaign> => {
    return axiosInstance.get(`/campaigns/${id}/admin`);
  },

  // Lấy campaigns đang hoạt động
  getActive: async (): Promise<Campaign[]> => {
    return axiosInstance.get('/campaigns/active');
  },

  // Lấy campaigns đã lên lịch
  getScheduled: async (): Promise<Campaign[]> => {
    return axiosInstance.get('/campaigns/scheduled');
  },

  // Lấy campaigns đã hết hạn
  getExpired: async (): Promise<Campaign[]> => {
    return axiosInstance.get('/campaigns/expired');
  },

  // Xóa campaign
  delete: async (id: number): Promise<void> => {
    return axiosInstance.delete(`/campaigns/${id}`);
  },

  // Khôi phục campaign
  restore: async (id: number): Promise<Campaign> => {
    return axiosInstance.post(`/campaigns/${id}/restore`);
  },
};

// ===== PROMOTION APIs =====

export const promotionService = {
  // Tạo promotion mới
  create: async (data: {
    campaignId: number;
    productVariationId: number;
    discountType: 'PERCENTAGE' | 'FIXED';
    discountValue: number;
    active: boolean;
  }): Promise<Promotion> => {
    return axiosInstance.post('/promotions', data);
  },

  // Cập nhật promotion
  update: async (
    id: number,
    data: Partial<{
      campaignId: number;
      productVariationId: number;
      discountType: 'PERCENTAGE' | 'FIXED';
      discountValue: number;
      active: boolean;
    }>
  ): Promise<Promotion> => {
    return axiosInstance.put(`/promotions/${id}`, data);
  },

  // Lấy tất cả promotions
  getAll: async (params?: {
    page?: number;
    size?: number;
    sortBy?: string;
    sortDir?: 'ASC' | 'DESC';
  }): Promise<PaginatedResponse<Promotion>> => {
    return axiosInstance.get('/promotions', { params });
  },

  // Lấy promotion theo ID
  getById: async (id: number): Promise<Promotion> => {
    return axiosInstance.get(`/promotions/${id}`);
  },

  // Lấy promotions theo campaign (trả về chi tiết sản phẩm/variation)
  getByCampaign: async (campaignId: number): Promise<import('@/types').CampaignPromotion[]> => {
    return axiosInstance.get(`/promotions/campaign/${campaignId}/admin`);
  },

  // Lấy promotions theo sản phẩm
  getByProductVariation: async (productVariationId: number): Promise<Promotion[]> => {
    return axiosInstance.get(`/promotions/product-variation/${productVariationId}`);
  },

  // Tính toán promotion
  calculate: async (data: {
    productVariationId: number;
    quantity: number;
    originalPrice: number;
  }): Promise<PromotionCalculation> => {
    return axiosInstance.post('/promotions/calculate', data);
  },

  // Xóa promotion
  delete: async (id: number): Promise<void> => {
    return axiosInstance.delete(`/promotions/${id}`);
  },
};

// ===== VOUCHER APIs =====

export const voucherService = {
  // Tạo voucher mới
  create: async (data: {
    code: string;
    voucherType: 'PERCENTAGE' | 'FIXED_AMOUNT';
    value: number;
    minOrderAmount: number;
    usageLimit: number;
    validFrom: string;
    validUntil: string;
  }): Promise<Voucher> => {
    return axiosInstance.post('/vouchers', data);
  },

  // Cập nhật voucher
  update: async (
    code: string,
    data: Partial<{
      code: string;
      voucherType: 'PERCENTAGE' | 'FIXED_AMOUNT';
      value: number;
      minOrderAmount: number;
      usageLimit: number;
      validFrom: string;
      validUntil: string;
    }>
  ): Promise<Voucher> => {
    return axiosInstance.put(`/vouchers/${code}`, data);
  },

  // Lấy tất cả vouchers
  getAll: async (params?: {
    page?: number;
    size?: number;
    sortBy?: string;
    sortDir?: 'ASC' | 'DESC';
  }): Promise<StandardPaginatedResponse<Voucher>> => {
    return axiosInstance.get('/vouchers', { params });
  },

  // Lấy vouchers còn hiệu lực
  getValid: async (params?: {
    page?: number;
    size?: number;
    sortBy?: string;
    sortDir?: 'ASC' | 'DESC';
  }): Promise<StandardPaginatedResponse<Voucher>> => {
    return axiosInstance.get('/vouchers/valid', { params });
  },

  // Lấy voucher theo code
  getByCode: async (code: string): Promise<Voucher> => {
    return axiosInstance.get(`/vouchers/${code}`);
  },

  // Kiểm tra code tồn tại
  checkCodeExists: async (code: string): Promise<boolean> => {
    return axiosInstance.get(`/vouchers/code/exists`, { params: { code } });
  },

  // Validate voucher
  validate: async (data: {
    code: string;
    userId: number;
    orderAmount: number;
  }): Promise<VoucherValidation> => {
    return axiosInstance.post('/vouchers/validate', data);
  },

  // Lấy vouchers đã hết hạn
  getExpired: async (): Promise<Voucher[]> => {
    return axiosInstance.get('/vouchers/expired');
  },

  // Lấy vouchers sắp hết hạn
  getExpiringSoon: async (days: number = 7): Promise<Voucher[]> => {
    return axiosInstance.get('/vouchers/expiring-soon', { params: { days } });
  },

  // Lấy lịch sử sử dụng của user
  getUserUsage: async (userId: number): Promise<UserVoucherUsage[]> => {
    return axiosInstance.get(`/vouchers/usage/user/${userId}`);
  },

  // Lấy số lần sử dụng
  getUsageCount: async (code: string): Promise<VoucherUsageCount> => {
    return axiosInstance.get(`/vouchers/${code}/usage-count`);
  },

  // Xóa voucher
  delete: async (code: string): Promise<void> => {
    return axiosInstance.delete(`/vouchers/${code}`);
  },

  // Khôi phục voucher
  restore: async (code: string): Promise<Voucher> => {
    return axiosInstance.post(`/vouchers/${code}/restore`);
  },
};
