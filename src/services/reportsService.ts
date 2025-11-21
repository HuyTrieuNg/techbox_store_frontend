/**
 * Reports API Service
 * Provides methods to fetch statistics and reports from the backend
 */

import { api } from '@/lib/axios';

// Type definitions
export interface CustomerStatsDTO {
  totalCustomers: number;
  newCustomersToday: number;
  newCustomersThisWeek: number;
  newCustomersThisMonth: number;
  growthRate: number;
  topCustomers: TopCustomerDTO[];
  growthTrends: CustomerGrowthDTO[];
}

export interface TopCustomerDTO {
  userId: number;
  firstName: string;
  lastName: string;
  email: string;
  totalOrders: number;
  totalSpent: number;
  lastOrderDate: string;
}

export interface CustomerGrowthDTO {
  period: string;
  newCustomers: number;
  totalCustomers: number;
}

export interface ProductStatsDTO {
  totalProducts: number;
  activeProducts: number;
  draftProducts: number;
  deletedProducts: number;
  productsByCategory: ProductByCategoryDTO[];
  topSellingProducts: TopSellingProductDTO[];
  lowStockProducts: LowStockProductDTO[];
  averageProductRating: number;
}

export interface ProductByCategoryDTO {
  categoryId: number;
  categoryName: string;
  productCount: number;
}

export interface TopSellingProductDTO {
  productId: number;
  productName: string;
  spu: string;
  imageUrl: string;
  totalSold: number;
  revenue: number;
  averageRating: number;
}

export interface LowStockProductDTO {
  productId: number;
  productName: string;
  spu: string;
  variationId: number;
  variationSku: string;
  currentStock: number;
  threshold: number;
}

export interface InventoryStatsDTO {
  totalInventoryValue: number;
  totalStockImports: number;
  totalStockExports: number;
  totalProductVariations: number;
  lowStockVariations: number;
  recentMovements: StockMovementDTO[];
}

export interface StockMovementDTO {
  type: 'IMPORT' | 'EXPORT';
  transactionId: number;
  transactionDate: string;
  totalItems: number;
  totalValue: number;
  supplierName: string;
  note: string;
}

export interface OrderStatsDTO {
  totalOrders: number;
  pendingOrders: number;
  processingOrders: number;
  shippedOrders: number;
  deliveredOrders: number;
  cancelledOrders: number;
  totalRevenue: number;
  averageOrderValue: number;
  ordersByStatus: OrderByStatusDTO[];
  revenueTrends: RevenueTrendDTO[];
}

export interface OrderByStatusDTO {
  status: string;
  count: number;
}

export interface RevenueTrendDTO {
  period: string;
  orderCount: number;
  revenue: number;
}

// Customer Statistics
export const getCustomerStats = async (): Promise<CustomerStatsDTO> => {
  return api.get<CustomerStatsDTO>('/reports/customers/overview');
};

export const getCustomerGrowth = async (
  startDate: string,
  endDate: string,
  groupBy: 'day' | 'week' | 'month' = 'month'
): Promise<CustomerGrowthDTO[]> => {
  return api.get<CustomerGrowthDTO[]>(
    `/reports/customers/growth?startDate=${startDate}&endDate=${endDate}&groupBy=${groupBy}`
  );
};

export const getTopCustomers = async (limit: number = 10): Promise<TopCustomerDTO[]> => {
  return api.get<TopCustomerDTO[]>(`/reports/customers/top?limit=${limit}`);
};

// Product Statistics
export const getProductStats = async (): Promise<ProductStatsDTO> => {
  return api.get<ProductStatsDTO>('/reports/products/overview');
};

export const getProductsByCategory = async (): Promise<ProductByCategoryDTO[]> => {
  return api.get<ProductByCategoryDTO[]>('/reports/products/by-category');
};

export const getTopSellingProducts = async (limit: number = 10): Promise<TopSellingProductDTO[]> => {
  return api.get<TopSellingProductDTO[]>(`/reports/products/top-selling?limit=${limit}`);
};

export const getLowStockProducts = async (threshold: number = 10): Promise<LowStockProductDTO[]> => {
  return api.get<LowStockProductDTO[]>(`/reports/products/low-stock?threshold=${threshold}`);
};

export interface PagedLowStockProductDTO {
  content: LowStockProductDTO[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  last: boolean;
}

export const getLowStockProductsPaged = async (
  threshold?: number,
  page: number = 0,
  size: number = 10
): Promise<PagedLowStockProductDTO> => {
  const params = new URLSearchParams({
    page: page.toString(),
    size: size.toString(),
  });

  if (threshold !== undefined) {
    params.append('threshold', threshold.toString());
  }

  return api.get<PagedLowStockProductDTO>(`/reports/products/low-stock/paged?${params.toString()}`);
};

export interface InventoryConfigDTO {
  minStockThreshold: number;
}

export const getInventoryConfig = async (): Promise<InventoryConfigDTO> => {
  return api.get<InventoryConfigDTO>('/reports/products/config');
};

// Inventory Statistics
export const getInventoryStats = async (): Promise<InventoryStatsDTO> => {
  return api.get<InventoryStatsDTO>('/reports/inventory/overview');
};

export const getStockMovements = async (
  startDate: string,
  endDate: string
): Promise<StockMovementDTO[]> => {
  return api.get<StockMovementDTO[]>(
    `/reports/inventory/movements?startDate=${startDate}&endDate=${endDate}`
  );
};

// Order Statistics
export const getOrderStats = async (): Promise<OrderStatsDTO> => {
  return api.get<OrderStatsDTO>('/reports/orders/overview');
};

export const getRevenue = async (startDate: string, endDate: string): Promise<number> => {
  return api.get<number>(`/reports/orders/revenue?startDate=${startDate}&endDate=${endDate}`);
};

export const getRevenueTrends = async (
  startDate: string,
  endDate: string,
  groupBy: 'day' | 'week' | 'month' = 'month'
): Promise<RevenueTrendDTO[]> => {
  return api.get<RevenueTrendDTO[]>(
    `/reports/orders/trends?startDate=${startDate}&endDate=${endDate}&groupBy=${groupBy}`
  );
};
