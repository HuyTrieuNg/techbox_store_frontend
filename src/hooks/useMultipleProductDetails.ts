import { useState, useEffect } from 'react';
import { ProductService } from '@/services/productService';
import { ProductDetail } from '@/features/product';

interface UseMultipleProductDetailsResult {
  products: (ProductDetail | null)[];
  isLoading: boolean;
  error: any;
}

// Hook để lấy chi tiết nhiều sản phẩm cùng lúc
export function useMultipleProductDetails(productIds: number[]): UseMultipleProductDetailsResult {
  const [products, setProducts] = useState<(ProductDetail | null)[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);

  const fetchProducts = async () => {
    if (!productIds || productIds.length === 0) {
      setProducts([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      const productPromises = productIds.map(id => ProductService.getProductById(id));
      const productData = await Promise.all(productPromises);
      setProducts(productData);
    } catch (err) {
      setError(err);
      setProducts(new Array(productIds.length).fill(null));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [productIds.join(',')]); // Use join to create a stable dependency

  return { products, isLoading, error };
}