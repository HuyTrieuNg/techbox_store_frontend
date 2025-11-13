'use client';

import { useParams } from 'next/navigation';
import ProductVariationList from '@/components/common/manage/product/ProductVariationList';

export default function ProductVariationsPage() {
  const params = useParams();
  const productId = Number(params.id);

  if (!productId) {
    return <div>Invalid product ID</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <ProductVariationList productId={productId} />
    </div>
  );
}