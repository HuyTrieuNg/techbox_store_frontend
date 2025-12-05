import React from 'react';
import { Supplier } from '@/features/supplier';
import { FiEdit, FiTrash2, FiRefreshCw } from 'react-icons/fi';
import { Button } from '@/components/UI/button';

type SupplierListProps = {
  suppliers: Supplier[];
  loading?: boolean;
  onEdit: (supplier: Supplier) => void;
  onDelete: (supplierId: number) => void;
  onRestore: (supplierId: number) => void;
};

const SupplierList: React.FC<SupplierListProps> = ({
  suppliers,
  loading,
  onEdit,
  onDelete,
  onRestore
}) => {
  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="h-16 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
          </div>
        ))}
      </div>
    );
  }

  if (suppliers.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-500 dark:text-gray-400">
          <FiTrash2 className="w-16 h-16 mx-auto mb-4" />
          <p className="text-lg font-medium">Không có nhà cung cấp nào</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {suppliers.map((supplier) => (
        <div
          key={supplier.supplierId}
          className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm border p-6 ${
            supplier.deleted ? 'border-red-200 bg-red-50 dark:bg-red-900/10' : 'border-gray-200 dark:border-gray-700'
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-2">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {supplier.name}
                </h3>
                {supplier.deleted && (
                  <span className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded-full">
                    Đã xóa
                  </span>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 text-sm text-gray-600 dark:text-gray-400">
                <div className="break-words">
                  <span className="font-medium">ID:</span> #{supplier.supplierId}
                </div>

                {supplier.phone && (
                  <div className="break-words">
                    <span className="font-medium">Điện thoại:</span> {supplier.phone}
                  </div>
                )}

                {supplier.email && (
                  <div className="break-words">
                    <span className="font-medium">Email:</span> {supplier.email}
                  </div>
                )}

                {supplier.taxCode && (
                  <div className="break-words">
                    <span className="font-medium">Mã số thuế:</span> {supplier.taxCode}
                  </div>
                )}

                {supplier.address && (
                  <div className="break-words">
                    <span className="font-medium">Địa chỉ:</span> {supplier.address}
                  </div>
                )}
              </div>


              

              <div className="mt-3 text-xs text-gray-500 dark:text-gray-500">
                Tạo: {new Date(supplier.createdAt).toLocaleDateString('vi-VN')} |
                Cập nhật: {new Date(supplier.updatedAt).toLocaleDateString('vi-VN')}
                {supplier.deletedAt && (
                  <> | Xóa: {new Date(supplier.deletedAt).toLocaleDateString('vi-VN')}</>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2 ml-4">
              {!supplier.deleted ? (
                <>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onEdit(supplier)}
                    className="flex items-center gap-2"
                  >
                    <FiEdit className="w-4 h-4" />
                    Chỉnh sửa
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onDelete(supplier.supplierId)}
                    className="flex items-center gap-2 text-red-600 hover:text-red-700 border-red-300 hover:border-red-400"
                  >
                    <FiTrash2 className="w-4 h-4" />
                    Xóa
                  </Button>
                </>
              ) : (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onRestore(supplier.supplierId)}
                  className="flex items-center gap-2 text-green-600 hover:text-green-700 border-green-300 hover:border-green-400"
                >
                  <FiRefreshCw className="w-4 h-4" />
                  Khôi phục
                </Button>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SupplierList;