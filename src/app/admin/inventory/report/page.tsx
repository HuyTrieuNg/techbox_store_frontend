'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/UI/card';
import { FiFileText } from 'react-icons/fi';

const ReportPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <FiFileText className="w-8 h-8 text-blue-600" />
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Báo cáo kho</h1>
          <p className="text-gray-600 dark:text-gray-400">Xem báo cáo và thống kê kho hàng</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Chức năng đang phát triển</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 dark:text-gray-400">
            Trang báo cáo kho đang được phát triển. Vui lòng quay lại sau.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReportPage;