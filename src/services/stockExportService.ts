import axios from '@/lib/axios';
import {
  StockExport,
  StockExportCreateRequest,
  StockExportPageResponse,
  StockExportParams,
} from '@/features/stockExport';

export const stockExportService = {
  async getStockExports(params?: StockExportParams): Promise<StockExportPageResponse> {
    const response = await axios.get('/stock-exports', { params });
    return response;
  },

  async getStockExportById(id: number): Promise<StockExport> {
    const response = await axios.get(`/stock-exports/${id}`);
    return response;
  },

  async createStockExport(data: StockExportCreateRequest): Promise<StockExport> {
    const response = await axios.post('/stock-exports', data);
    return response;
  },
};