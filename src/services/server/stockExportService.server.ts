import { serverApi } from '@/lib/server-api';
import {
  StockExport,
  StockExportCreateRequest,
  StockExportPageResponse,
  StockExportParams,
} from '@/features/stockExport';

export const stockExportServiceServer = {
  async getStockExportById(id: number): Promise<StockExport> {
    const data = await serverApi.get<StockExport>(`/stock-exports/${id}`);
    return data as any;
  }
};

export default stockExportServiceServer;
