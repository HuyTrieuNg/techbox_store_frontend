'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/UI/card';
import { Button } from '@/components/UI/button';
import { Badge } from '@/components/UI/badge';
import { Plus } from 'lucide-react';
import ProductVariationCreateForm from './ProductVariationCreateForm';
import { getProductVariations } from '@/services/productManagementService';

interface ProductVariation {
  id: number;
  variationName: string;
  price: number;
  sku: string;
  stockQuantity: number;
  reservedQuantity: number;
  variationAttributes: Array<{
    attributeId: number;
    value: string;
    attribute?: {
      name: string;
    };
  }>;
  imageUrls: string[];
}

interface ProductVariationListProps {
  productId: number;
}

export default function ProductVariationList({ productId }: ProductVariationListProps) {
  const [variations, setVariations] = useState<ProductVariation[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);

  // Fetch variations for this product
  useEffect(() => {
    const fetchVariations = async () => {
      try {
        const data = await getProductVariations(productId);
        setVariations(data);
      } catch (error) {
        console.error('Failed to fetch variations:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchVariations();
  }, [productId]);

  const handleVariationCreated = async () => {
    setShowCreateForm(false);
    // Refresh variations list
    try {
      const data = await getProductVariations(productId);
      setVariations(data);
    } catch (error) {
      console.error('Failed to refresh variations:', error);
    }
  };

  if (loading) {
    return <div>Loading variations...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Biến Thể Sản Phẩm</h2>
        <Button onClick={() => setShowCreateForm(!showCreateForm)}>
          <Plus className="h-4 w-4 mr-2" />
          {showCreateForm ? 'Hủy' : 'Thêm Biến Thể'}
        </Button>
      </div>

      {showCreateForm && (
        <ProductVariationCreateForm
          productId={productId}
          onVariationCreated={handleVariationCreated}
        />
      )}

      <div className="grid gap-4">
        {variations.length === 0 ? (
          <Card>
            <CardContent className="pt-6">
              <p className="text-center text-gray-500">Chưa có biến thể nào được tạo.</p>
            </CardContent>
          </Card>
        ) : (
          variations.map((variation) => (
            <Card key={variation.id}>
              <CardHeader>
                <CardTitle className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg">{variation.variationName}</h3>
                    <p className="text-sm text-gray-600">SKU: {variation.sku}</p>
                  </div>
                  <Badge variant="secondary">
                    {variation.stockQuantity} trong kho
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div>
                    <p className="text-sm font-medium">Giá</p>
                    <p className="text-lg font-bold text-green-600">
                      {variation.price.toLocaleString('vi-VN')} VNĐ
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Tồn kho</p>
                    <p>{variation.stockQuantity}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Đặt trước</p>
                    <p>{variation.reservedQuantity}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Có sẵn</p>
                    <p>{variation.stockQuantity - variation.reservedQuantity}</p>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-sm font-medium mb-2">Thuộc tính:</p>
                  <div className="flex flex-wrap gap-2">
                    {variation.variationAttributes && variation.variationAttributes.length > 0 ? (
                      variation.variationAttributes.map((attr, index) => (
                        <Badge key={index} variant="outline">
                          {attr.attribute?.name || `Thuộc tính ${attr.attributeId}`}: {attr.value}
                        </Badge>
                      ))
                    ) : (
                      <span className="text-gray-500 text-sm">Không có thuộc tính</span>
                    )}
                  </div>
                </div>

                {variation.imageUrls && variation.imageUrls.length > 0 && (
                  <div>
                    <p className="text-sm font-medium mb-2">Hình ảnh:</p>
                    <div className="grid grid-cols-4 gap-2">
                      {variation.imageUrls.slice(0, 4).map((url, index) => (
                        <img
                          key={index}
                          src={url}
                          alt={`${variation.variationName} ${index + 1}`}
                          className="w-full h-20 object-cover rounded border"
                        />
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}