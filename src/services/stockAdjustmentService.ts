import axios from '@/lib/axios';
import {
  StockAdjustment,
  StockAdjustmentCreateRequest,
  StockAdjustmentPageResponse
} from '@/features/stockAdjustment';

const API_BASE_URL = '/stock-adjustments';

export const stockAdjustmentService = {
  // Get paginated list of adjustments
  getAdjustments: async (page = 0, size = 10): Promise<StockAdjustmentPageResponse> => {
    const response = await axios.get(`${API_BASE_URL}?page=${page}&size=${size}`);
    return response;
  },

  // Get adjustment by ID
  getAdjustmentById: async (id: number): Promise<StockAdjustment> => {
    const response = await axios.get(`${API_BASE_URL}/${id}`);
    return response;
  },

  // Create new adjustment
  createAdjustment: async (data: StockAdjustmentCreateRequest): Promise<StockAdjustment> => {
    const response = await axios.post(API_BASE_URL, data);
    return response;
  },

  // Update adjustment
  updateAdjustment: async (id: number, data: Partial<StockAdjustmentCreateRequest>): Promise<StockAdjustment> => {
    const response = await axios.put(`${API_BASE_URL}/${id}`, data);
    return response;
  },

  // Delete adjustment
  deleteAdjustment: async (id: number): Promise<void> => {
    await axios.delete(`${API_BASE_URL}/${id}`);
  },
};