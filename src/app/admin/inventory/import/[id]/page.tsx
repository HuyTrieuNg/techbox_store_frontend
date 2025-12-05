'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useStockImportDetail } from '@/hooks/useStockImport';
import { Button } from '@/components/UI/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/UI/card';
import { FiArrowLeft } from 'react-icons/fi';
import InvoicePdfDownload from '@/components/pdf/InvoicePdfDownload';
import { format } from 'date-fns';

const StockImportDetailPage: React.FC = () => {
  const params = useParams();
  const router = useRouter();
  const id = parseInt(params.id as string);

  const { data, loading, error } = useStockImportDetail(id);


  const handleBack = () => {
    router.push('/admin/inventory/import');
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
            {error || 'Không tìm thấy phiếu nhập'}
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
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={handleBack} className="flex items-center gap-2">
            <FiArrowLeft className="w-4 h-4" />
            Quay lại
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Chi tiết phiếu nhập
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Mã phiếu: {data.documentCode}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <InvoicePdfDownload id={id} type="import" />
        </div>
      </div>

      {/* Basic Information */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Thông tin phiếu nhập</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Mã phiếu
                </label>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                  {data.documentCode}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Ngày nhập
                </label>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                  {format(new Date(data.importDate), 'dd/MM/yyyy')}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Nhà cung cấp
                </label>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                  {data.supplierName}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Người tạo
                </label>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                  {data.userName}
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
                  Tổng số lượng
                </label>
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {data.totalItems}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Tổng giá trị
                </label>
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {data.totalCostValue.toLocaleString('vi-VN')}₫
                </p>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Ngày tạo
              </label>
              <p className="text-gray-700 dark:text-gray-300">
                {format(new Date(data.createdAt), 'dd/MM/yyyy HH:mm')}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Items Table */}
      <Card>
        <CardHeader>
          <CardTitle>Danh sách sản phẩm</CardTitle>
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
                    Số lượng
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Giá nhập
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Thành tiền
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
                      {item.quantity}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                      {item.costPrice.toLocaleString('vi-VN')}₫
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                      {item.totalValue?.toLocaleString('vi-VN')}₫
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <td colSpan={4} className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white text-right">
                    Tổng cộng:
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900 dark:text-white">
                    {data.totalItems}
                  </td>
                  <td></td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-green-600 dark:text-green-400">
                    {data.totalCostValue.toLocaleString('vi-VN')}₫
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StockImportDetailPage;