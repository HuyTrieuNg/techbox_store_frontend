'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Supplier, SupplierParams } from '@/features/supplier';
import { getSuppliers, deleteSupplier, restoreSupplier } from '@/services/supplierService';
import SupplierList from '@/components/admin/SupplierList';
import { Button } from '@/components/UI/button';
import { Input } from '@/components/UI/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/UI/select';
import { FiPlus, FiSearch } from 'react-icons/fi';
import { toast } from 'react-hot-toast';

const SupplierPage: React.FC = () => {
  const router = useRouter();
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize] = useState(10);
  const [showDeleted, setShowDeleted] = useState(false);

  const fetchSuppliers = async () => {
    try {
      setLoading(true);
      const params: SupplierParams = {
        page: currentPage,
        size: pageSize,
        keyword: searchTerm || undefined,
        includeDeleted: showDeleted,
      };

      const response = await getSuppliers(params);
      setSuppliers(response.content);
      setTotalPages(response.totalPages);
    } catch (error) {
      console.error('Error fetching suppliers:', error);
      toast.error('Không thể tải danh sách nhà cung cấp');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSuppliers();
  }, [currentPage, searchTerm, showDeleted]);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handleDelete = async (supplierId: number) => {
    if (!confirm('Bạn có chắc chắn muốn xóa nhà cung cấp này?')) return;

    try {
      await deleteSupplier(supplierId);
      toast.success('Xóa nhà cung cấp thành công');
      fetchSuppliers();
    } catch (error) {
      console.error('Error deleting supplier:', error);
      toast.error('Không thể xóa nhà cung cấp');
    }
  };

  const handleRestore = async (supplierId: number) => {
    try {
      await restoreSupplier(supplierId);
      toast.success('Khôi phục nhà cung cấp thành công');
      fetchSuppliers();
    } catch (error) {
      console.error('Error restoring supplier:', error);
      toast.error('Không thể khôi phục nhà cung cấp');
    }
  };

  const handleEdit = (supplier: Supplier) => {
    router.push(`/admin/inventory/supplier/${supplier.supplierId}/edit`);
  };

  const handleCreate = () => {
    router.push('/admin/inventory/supplier/create');
  };

  return (
    <>
      <div className=" mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Quản lý nhà cung cấp
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Quản lý danh sách nhà cung cấp của cửa hàng
            </p>
          </div>
          <Button onClick={handleCreate} className="flex items-center gap-2">
            <FiPlus className="w-4 h-4" />
            Thêm nhà cung cấp
          </Button>
        </div>

        <div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-6">
            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <div className="relative flex-1">
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Tìm kiếm nhà cung cấp..."
                  value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="pl-10"
                />
              </div>

              <div className="flex items-center gap-2">
                <label className="text-sm text-gray-600 dark:text-gray-400">
                  Hiển thị:
                </label>
                <Select
                  value={showDeleted ? 'all' : 'active'}
                  onValueChange={(value) => setShowDeleted(value === 'all')}
                >
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Đang hoạt động</SelectItem>
                    <SelectItem value="all">Tất cả</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <SupplierList
            suppliers={suppliers}
            loading={loading}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onRestore={handleRestore}
          />

          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-8">
              <Button
                variant="outline"
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                Trước
              </Button>

              <span className="text-sm text-gray-600 dark:text-gray-400">
                Trang {currentPage} / {totalPages}
              </span>

              <Button
                variant="outline"
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                Sau
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SupplierPage;