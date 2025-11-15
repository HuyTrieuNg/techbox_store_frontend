'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { SupplierCreateRequest } from '@/features/supplier';
import { createSupplier } from '@/services/supplierService';
import SupplierForm from '@/components/admin/SupplierForm';
import { toast } from 'react-hot-toast';
import { FiArrowLeft } from 'react-icons/fi';
import { Button } from '@/components/UI/button';

const CreateSupplierPage: React.FC = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (data: SupplierCreateRequest) => {
    try {
      setLoading(true);
      await createSupplier(data);
      toast.success('Thêm nhà cung cấp thành công');
      router.push('/admin/inventory/supplier');
    } catch (error) {
      console.error('Error creating supplier:', error);
      toast.error('Không thể thêm nhà cung cấp');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    router.push('/admin/inventory/supplier');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Button
          variant="ghost"
          onClick={() => router.push('/admin/inventory/supplier')}
          className="flex items-center gap-2 mb-4"
        >
          <FiArrowLeft className="w-4 h-4" />
          Quay lại danh sách
        </Button>

        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Thêm nhà cung cấp mới
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Tạo nhà cung cấp mới cho cửa hàng
        </p>
      </div>

      <SupplierForm
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        loading={loading}
      />
    </div>
  );
};

export default CreateSupplierPage;