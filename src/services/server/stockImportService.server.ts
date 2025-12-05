import { serverApi } from '@/lib/server-api';
import {
  StockImport,
  StockImportCreateRequest,
  StockImportPageResponse,
  StockImportParams,
} from '@/features/stockImport';

export const stockImportServiceServer = {
  async getStockImportById(id: number): Promise<StockImport> {
    const data = await serverApi.get<StockImport>(`/stock-imports/${id}`);
    return data as any;
  }
};

export default stockImportServiceServer;
