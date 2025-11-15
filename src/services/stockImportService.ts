import axios from '@/lib/axios';
import {
  StockImport,
  StockImportCreateRequest,
  StockImportPageResponse,
  StockImportParams,
} from '@/features/stockImport';

export const stockImportService = {
  async getStockImports(params?: StockImportParams): Promise<StockImportPageResponse> {
    const response = await axios.get('/stock-imports', { params });
    return response;
  },

  async getStockImportById(id: number): Promise<StockImport> {
    const response = await axios.get(`/stock-imports/${id}`);
    return response;
  },

  async createStockImport(data: StockImportCreateRequest): Promise<StockImport> {
    const response = await axios.post('/stock-imports', data);
    return response;
  },
};