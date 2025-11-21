'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useStockAdjustmentDetail } from '@/hooks/useStockAdjustment';
import { Button } from '@/components/UI/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/UI/card';
import { FiArrowLeft, FiPrinter } from 'react-icons/fi';
import { format } from 'date-fns';

const AdjustmentDetailPage: React.FC = () => {
  const params = useParams();
  const router = useRouter();
  const id = parseInt(params.id as string);

  const { data, loading, error } = useStockAdjustmentDetail(id);

  const handleBack = () => {
    router.push('/admin/inventory/adjustment');
  };

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-2">Đang tải...</span>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p className="text-red-600 dark:text-red-400 mb-4">
            {error || 'Không tìm thấy phiếu kiểm kho'}
          </p>
          <Button onClick={handleBack}>
            <FiArrowLeft className="w-4 h-4 mr-2" />
            Quay lại
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={handleBack}>
            <FiArrowLeft className="w-4 h-4 mr-2" />
            Quay lại
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Chi tiết phiếu kiểm kho
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Mã phiếu: {data.id}
            </p>
          </div>
        </div>

        <Button onClick={handlePrint} className="flex items-center gap-2">
          <FiPrinter className="w-4 h-4" />
          In phiếu
        </Button>
      </div>

      {/* Basic Information */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Thông tin phiếu kiểm kho</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Mã phiếu
                </label>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                  {data.id}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Ngày kiểm kho
                </label>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                  {format(new Date(data.adjustmentDate), 'dd/MM/yyyy')}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Lý do
                </label>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                  {data.checkName}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Người tạo
                </label>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                  {data.userName || 'N/A'}
                </p>
              </div>
            </div>
            {data.note && (
              <div>
                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Ghi chú
                </label>
                <p className="text-gray-700 dark:text-gray-300 mt-1">
                  {data.note}
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tóm tắt</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Tổng số sản phẩm
                </label>
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {data.totalItems || data.items?.length || 0}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Tổng chênh lệch SL
                </label>
                <p className={`text-2xl font-bold ${
                  (data.items?.reduce((total, item) => total + item.diffQty, 0) || 0) > 0
                    ? 'text-green-600 dark:text-green-400'
                    : (data.items?.reduce((total, item) => total + item.diffQty, 0) || 0) < 0
                    ? 'text-red-600 dark:text-red-400'
                    : 'text-gray-900 dark:text-white'
                }`}>
                  {((data.items?.reduce((total, item) => total + item.diffQty, 0) || 0) > 0 ? '+' : '') +
                   (data.items?.reduce((total, item) => total + item.diffQty, 0) || 0)}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Tổng chênh lệch giá trị
                </label>
                <p className={`text-lg font-semibold ${
                  (data.items?.reduce((total, item) => total + item.diffValue, 0) || 0) > 0
                    ? 'text-green-600 dark:text-green-400'
                    : (data.items?.reduce((total, item) => total + item.diffValue, 0) || 0) < 0
                    ? 'text-red-600 dark:text-red-400'
                    : 'text-gray-900 dark:text-white'
                }`}>
                  {((data.items?.reduce((total, item) => total + item.diffValue, 0) || 0) > 0 ? '+' : '') +
                   (data.items?.reduce((total, item) => total + item.diffValue, 0) || 0).toLocaleString('vi-VN')}₫
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Ngày tạo
                </label>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                  {format(new Date(data.createdAt), 'dd/MM/yyyy HH:mm')}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Items Table */}
      <Card>
        <CardHeader>
          <CardTitle>Danh sách sản phẩm kiểm kho</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    STT
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Sản phẩm
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Biến thể
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    SKU
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    SL hệ thống
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    SL thực tế
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Chênh lệch SL
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Giá vốn
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Chênh lệch giá trị
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {data.items?.map((item, index) => (
                  <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                      {item.productName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                      {item.variationName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                      {item.sku}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                      {item.systemQty}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                      {item.realQty}
                    </td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${
                      item.diffQty > 0
                        ? 'text-green-600 dark:text-green-400'
                        : item.diffQty < 0
                        ? 'text-red-600 dark:text-red-400'
                        : 'text-gray-900 dark:text-white'
                    }`}>
                      {item.diffQty > 0 ? '+' : ''}{item.diffQty}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                      {item.costPrice?.toLocaleString('vi-VN')}₫
                    </td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${
                      item.diffValue > 0
                        ? 'text-green-600 dark:text-green-400'
                        : item.diffValue < 0
                        ? 'text-red-600 dark:text-red-400'
                        : 'text-gray-900 dark:text-white'
                    }`}>
                      {item.diffValue > 0 ? '+' : ''}{item.diffValue.toLocaleString('vi-VN')}₫
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdjustmentDetailPage;