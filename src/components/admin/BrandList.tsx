import React from 'react';
import { Brand } from '@/features/category';
import { FiEdit, FiTrash2 } from 'react-icons/fi'; // Import icons

type BrandListProps = {
  brands: Brand[];
  onEdit: (brand: Brand) => void;
  onDelete: (id: number) => void;
};

const BrandList: React.FC<BrandListProps> = ({ brands, onEdit, onDelete }) => {
  if (brands.length === 0) {
    return (
      <div className="p-6 bg-white rounded-lg shadow-md text-center text-gray-500">
        Chưa có thương hiệu nào. Hãy thêm một thương hiệu mới!
      </div>
    );
  }

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/12"
            >
              ID
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-4/12"
            >
              Tên Thương hiệu
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-2/12"
            >
              Ngày tạo
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-2/12"
            >
              Cập nhật
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider w-3/12"
            >
              Hành động
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {brands.map((brand) => (
            <tr key={brand.id} className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {brand.id}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                {brand.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {brand.createdAt ? new Date(brand.createdAt).toLocaleDateString('vi-VN') : '-'}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {brand.updatedAt ? new Date(brand.updatedAt).toLocaleDateString('vi-VN') : '-'}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div className="space-x-2 inline-flex">
                  <button
                    title="Chỉnh sửa"
                    onClick={() => onEdit(brand)}
                    className="text-indigo-600 hover:text-indigo-900 p-1 rounded-full hover:bg-indigo-50 transition-colors"
                  >
                    <FiEdit size={16} />
                  </button>
                  <button
                    title="Xóa"
                    onClick={() => onDelete(brand.id)}
                    className="text-red-600 hover:text-red-900 p-1 rounded-full hover:bg-red-50 transition-colors"
                  >
                    <FiTrash2 size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BrandList;