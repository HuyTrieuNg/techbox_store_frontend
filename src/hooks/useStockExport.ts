import { useState, useEffect } from 'react';
import { stockExportService } from '@/services/stockExportService';
import {
  StockExport,
  StockExportCreateRequest,
  StockExportPageResponse,
  StockExportParams,
} from '@/features/stockExport';
import toast from 'react-hot-toast';

export const useStockExports = (params?: StockExportParams) => {
  const [data, setData] = useState<StockExportPageResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchStockExports = async (searchParams?: StockExportParams) => {
    setLoading(true);
    setError(null);
    try {
      const result = await stockExportService.getStockExports(searchParams || params);
      setData(result);
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Failed to fetch stock exports';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStockExports();
  }, []);

  return {
    data,
    loading,
    error,
    refetch: fetchStockExports,
  };
};

export const useStockExportDetail = (id: number | null) => {
  const [data, setData] = useState<StockExport | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchStockExport = async (stockExportId: number) => {
    setLoading(true);
    setError(null);
    try {
      const result = await stockExportService.getStockExportById(stockExportId);
      setData(result);
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Failed to fetch stock export detail';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchStockExport(id);
    }
  }, [id]);

  return {
    data,
    loading,
    error,
    refetch: () => id && fetchStockExport(id),
  };
};

export const useCreateStockExport = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createStockExport = async (data: StockExportCreateRequest): Promise<StockExport | null> => {
    setLoading(true);
    setError(null);
    try {
      const result = await stockExportService.createStockExport(data);
      toast.success('Stock export created successfully');
      return result;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Failed to create stock export';
      setError(errorMessage);
      toast.error(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    createStockExport,
    loading,
    error,
  };
};