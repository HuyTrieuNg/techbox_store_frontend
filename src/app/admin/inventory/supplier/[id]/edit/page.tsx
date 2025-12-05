'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Supplier, SupplierUpdateRequest } from '@/features/supplier';
import { getSupplierById, updateSupplier } from '@/services/supplierService';
import SupplierForm from '@/components/admin/SupplierForm';
import { toast } from 'react-hot-toast';
import { FiArrowLeft } from 'react-icons/fi';
import { Button } from '@/components/UI/button';

const EditSupplierPage: React.FC = () => {
  const router = useRouter();
  const params = useParams();
  const supplierId = parseInt(params.id as string);

  const [supplier, setSupplier] = useState<Supplier | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    const fetchSupplier = async () => {
      try {
        const data = await getSupplierById(supplierId);
        setSupplier(data);
      } catch (error) {
        console.error('Error fetching supplier:', error);
        toast.error('Không thể tải thông tin nhà cung cấp');
        router.push('/admin/inventory/supplier');
      } finally {
        setLoading(false);
      }
    };

    if (supplierId) {
      fetchSupplier();
    }
  }, [supplierId, router]);

  const handleSubmit = async (data: SupplierUpdateRequest) => {
    try {
      setUpdating(true);
      await updateSupplier(supplierId, data);
      toast.success('Cập nhật nhà cung cấp thành công');
      router.push('/admin/inventory/supplier');
    } catch (error) {
      console.error('Error updating supplier:', error);
      toast.error('Không thể cập nhật nhà cung cấp');
    } finally {
      setUpdating(false);
    }
  };

  const handleCancel = () => {
    router.push('/admin/inventory/supplier');
  };

  if (loading) {
    return (
      <div className=" mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-4"></div>
          <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>
      </div>
    );
  }

  if (!supplier) {
    return (
      <div className=" mx-auto px-4 py-8">
        <div className="text-center">
          <p className="text-gray-500 dark:text-gray-400">
            Không tìm thấy nhà cung cấp
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className=" mx-auto px-4 py-8">
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
          Chỉnh sửa nhà cung cấp
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Cập nhật thông tin nhà cung cấp #{supplier.supplierId}
        </p>
      </div>

      <SupplierForm
        supplier={supplier}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        loading={updating}
      />
    </div>
  );
};

export default EditSupplierPage;