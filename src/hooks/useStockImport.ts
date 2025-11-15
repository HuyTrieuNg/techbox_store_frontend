import { useState, useEffect } from 'react';
import { stockImportService } from '@/services/stockImportService';
import {
  StockImport,
  StockImportCreateRequest,
  StockImportPageResponse,
  StockImportParams,
} from '@/features/stockImport';
import toast from 'react-hot-toast';

export const useStockImports = (params?: StockImportParams) => {
  const [data, setData] = useState<StockImportPageResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchStockImports = async (searchParams?: StockImportParams) => {
    setLoading(true);
    setError(null);
    try {
      const result = await stockImportService.getStockImports(searchParams || params);
      setData(result);
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Failed to fetch stock imports';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStockImports();
  }, []);

  return {
    data,
    loading,
    error,
    refetch: fetchStockImports,
  };
};

export const useStockImportDetail = (id: number | null) => {
  const [data, setData] = useState<StockImport | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchStockImport = async (stockImportId: number) => {
    setLoading(true);
    setError(null);
    try {
      const result = await stockImportService.getStockImportById(stockImportId);
      setData(result);
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Failed to fetch stock import detail';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchStockImport(id);
    }
  }, [id]);

  return {
    data,
    loading,
    error,
    refetch: () => id && fetchStockImport(id),
  };
};

export const useCreateStockImport = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createStockImport = async (data: StockImportCreateRequest): Promise<StockImport | null> => {
    setLoading(true);
    setError(null);
    try {
      const result = await stockImportService.createStockImport(data);
      toast.success('Stock import created successfully');
      return result;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Failed to create stock import';
      setError(errorMessage);
      toast.error(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    createStockImport,
    loading,
    error,
  };
};