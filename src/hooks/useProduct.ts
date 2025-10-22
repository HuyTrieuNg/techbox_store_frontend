import { useState, useEffect } from 'react';
import { ProductService } from '@/services/productService';
import { Category } from '@/features/category';

interface UseProductResult {
  categories: Category[] | null;
  isLoading: boolean;
  error: any;
}

// Hook để lấy tất cả categories
export function useCategories(): UseProductResult {
  const [categories, setCategories] = useState<Category[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      setIsLoading(true);
      try {
        const data = await ProductService.getAllCategories();
        setCategories(data);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return { categories, isLoading, error };
}

// Hook để lấy root categories
export function useRootCategories(): UseProductResult {
  const [categories, setCategories] = useState<Category[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const fetchRootCategories = async () => {
      setIsLoading(true);
      try {
        const data = await ProductService.getRootCategories();
        setCategories(data);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRootCategories();
  }, []);

  return { categories, isLoading, error };
}

// Hook để lấy child categories theo parentId
export function useChildCategories(parentId: number | null): UseProductResult {
  const [categories, setCategories] = useState<Category[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const fetchChildCategories = async () => {
      if (!parentId) {
        setCategories([]);
        return;
      }
      setIsLoading(true);
      try {
        const data = await ProductService.getChildCategories(parentId);
        setCategories(data);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchChildCategories();
  }, [parentId]);

  return { categories, isLoading, error };
}