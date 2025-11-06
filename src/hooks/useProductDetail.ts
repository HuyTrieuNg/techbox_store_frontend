import { useState, useEffect } from 'react';
import { ProductService } from '@/services/productService';
import { ProductDetail } from '@/features/product';

interface UseProductResult {
  product: ProductDetail | null;
  isLoading: boolean;
  error: any;
}

// Hook để lấy tất cả categories
export function useProductDetail(productId: number): UseProductResult {
  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);

  const fetchProduct = async () => {
    if (!productId || productId <= 0) {
      setError('ID sản phẩm không hợp lệ');
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      const data = await ProductService.getProductById(productId);
      setProduct(data);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [productId]);

  return { product, isLoading, error };
}