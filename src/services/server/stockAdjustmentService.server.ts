import { serverApi } from '@/lib/server-api';
import {
  StockAdjustment,
  StockAdjustmentCreateRequest,
  StockAdjustmentPageResponse,
} from '@/features/stockAdjustment';

const API_BASE_URL = '/stock-adjustments';

/**
 * Server-only service: only provide the GET-by-id helper for PDF generation.
 * This keeps server-side usage minimal and ensures token + cookies are read correctly
 * via the `server-api` utility (which reads cookies from next/headers).
 */
export const stockAdjustmentServiceServer = {
  getAdjustmentById: async (id: number): Promise<StockAdjustment | null> => {
    // Use the server API helper which attaches auth cookie (accessToken) automatically.
    const data = await serverApi.get<StockAdjustment>(`${API_BASE_URL}/${id}`);
    return data as any;
  },
};

export default stockAdjustmentServiceServer;
