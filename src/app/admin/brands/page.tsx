'use client';

import React, { useEffect, useState } from 'react';
import { api } from '@/lib/axios';
import BrandList from '@/components/BrandList';
import { Brand } from '@/features/category';

const BrandsAdminPage = () => {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const data = await api.get<Brand[]>('/brands');
        setBrands(data);
      } catch (error) {
        console.error('Failed to fetch brands:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBrands();
  }, []);

  const handleEdit = (brand: Brand) => {
    console.log('Edit brand:', brand);
  };

  const handleDelete = async (id: number) => {
    try {
      await api.delete(`/brands/${id}`);
      setBrands((prev) => prev.filter((brand) => brand.id !== id));
    } catch (error) {
      console.error('Failed to delete brand:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Manage Brands</h1>
      <BrandList brands={brands} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
};

export default BrandsAdminPage;