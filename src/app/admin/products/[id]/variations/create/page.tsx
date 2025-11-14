'use client';

import { useParams } from 'next/navigation';
import ProductVariationCreateForm from '@/components/common/manage/product/ProductVariationCreateForm';

export default function ProductVariationsPage() {
  const params = useParams();
  const productId = Number(params.id);

  if (!productId) {
    return <div>Invalid product ID</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <ProductVariationCreateForm productId={productId} />
    </div>
  );
}