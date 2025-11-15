import { useState, useEffect } from 'react';
import { getProductVariations } from '@/services/productDetailService';
import { ProductVariation } from '@/features/productDetail';

interface UseMultipleProductVariationsResult {
  variations: Record<number, ProductVariation[]>;
  isLoading: boolean;
  error: any;
}

// Hook để lấy biến thể của nhiều sản phẩm cùng lúc
export function useMultipleProductVariations(productIds: number[]): UseMultipleProductVariationsResult {
  const [variations, setVariations] = useState<Record<number, ProductVariation[]>>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);

  const fetchVariations = async () => {
    if (!productIds || productIds.length === 0) {
      setVariations({});
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      const variationPromises = productIds.map(async (productId) => {
        const data = await getProductVariations(productId, false); // deleted=false
        return { productId, variations: data };
      });

      const results = await Promise.all(variationPromises);
      const variationsMap: Record<number, ProductVariation[]> = {};

      results.forEach(({ productId, variations: productVariations }) => {
        variationsMap[productId] = productVariations;
      });

      setVariations(variationsMap);
    } catch (err) {
      setError(err);
      setVariations({});
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchVariations();
  }, [productIds.join(',')]); // Use join to create a stable dependency

  return { variations, isLoading, error };
}