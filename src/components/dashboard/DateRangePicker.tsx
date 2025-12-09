'use client';

import React, { useState } from 'react';
import { Button } from '@/components/UI/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/UI/card';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import {
  getStartOfMonth,
  getEndOfMonth,
  getStartOf30Days,
  getTodayEnd,
  formatDateRangeDisplay,
  formatToISODateStart,
  formatToISODateEnd,
} from '@/utils/dateUtils';

export interface DateRangePickerProps {
  onDateRangeChange: (startDate: string, endDate: string) => void;
  defaultRange?: 'today' | 'month' | '30days' | 'custom';
  showPresets?: boolean;
  minDate?: Date;
  maxDate?: Date;
}

/**
 * DateRangePicker Component
 * Allows users to select a date range for dashboard reports
 * 
 * @example
 * ```tsx
 * <DateRangePicker
 *   onDateRangeChange={(start, end) => {
 *     setStartDate(start);
 *     setEndDate(end);
 *   }}
 *   defaultRange="month"
 *   showPresets={true}
 * />
 * ```
 */
export function DateRangePicker({
  onDateRangeChange,
  defaultRange = 'month',
  showPresets = true,
  minDate,
  maxDate,
}: DateRangePickerProps) {
  const [startDate, setStartDate] = useState<Date>(
    defaultRange === 'today'
      ? new Date()
      : defaultRange === '30days'
      ? getStartOf30Days()
      : getStartOfMonth()
  );

  const [endDate, setEndDate] = useState<Date>(
    defaultRange === 'today' ? getTodayEnd() : getEndOfMonth()
  );

  const [showPicker, setShowPicker] = useState(false);

  const handleApply = () => {
    const isoStartDate = formatToISODateStart(startDate);
    const isoEndDate = formatToISODateEnd(endDate);

    if (new Date(isoEndDate) < new Date(isoStartDate)) {
      alert('End date must be after start date');
      return;
    }

    onDateRangeChange(isoStartDate, isoEndDate);
    setShowPicker(false);
  };

  const handlePreset = (preset: 'today' | 'month' | '30days') => {
    let newStartDate: Date;
    let newEndDate: Date;

    switch (preset) {
      case 'today':
        newStartDate = new Date();
        newStartDate.setHours(0, 0, 0, 0);
        newEndDate = getTodayEnd();
        break;
      case 'month':
        newStartDate = getStartOfMonth();
        newEndDate = getEndOfMonth();
        break;
      case '30days':
        newStartDate = getStartOf30Days();
        newEndDate = getTodayEnd();
        break;
    }

    setStartDate(newStartDate);
    setEndDate(newEndDate);

    // Apply immediately
    const isoStartDate = formatToISODateStart(newStartDate);
    const isoEndDate = formatToISODateEnd(newEndDate);
    onDateRangeChange(isoStartDate, isoEndDate);
    setShowPicker(false);
  };

  const handleDateChange = (
    type: 'start' | 'end',
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newDate = new Date(event.target.value + 'T00:00:00');
    if (type === 'start') {
      setStartDate(newDate);
    } else {
      setEndDate(newDate);
    }
  };

  const handleOffsetDays = (offset: number) => {
    const newStartDate = new Date(startDate);
    const newEndDate = new Date(endDate);

    newStartDate.setDate(newStartDate.getDate() + offset);
    newEndDate.setDate(newEndDate.getDate() + offset);

    setStartDate(newStartDate);
    setEndDate(newEndDate);
  };

  const formatDateInput = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  return (
    <div className="relative">
      <Button
        variant="outline"
        className="w-full sm:w-auto"
        onClick={() => setShowPicker(!showPicker)}
      >
        <Calendar className="mr-2 h-4 w-4" />
        {formatDateRangeDisplay(startDate, endDate)}
      </Button>

      {showPicker && (
        <Card className="absolute right-0 mt-2 z-50 w-96 shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg">Chọn khoảng thời gian</CardTitle>
            <CardDescription>Chọn ngày bắt đầu và kết thúc</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Date Range Navigation */}
            <div className="flex items-center justify-between">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleOffsetDays(-7)}
                title="Quay lại 7 ngày"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>

              <div className="text-sm font-medium text-gray-600 dark:text-gray-400">
                {formatDateRangeDisplay(startDate, endDate)}
              </div>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleOffsetDays(7)}
                title="Tiến 7 ngày"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>

            {/* Date Inputs */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Từ ngày</label>
                <input
                  type="date"
                  value={formatDateInput(startDate)}
                  onChange={(e) => handleDateChange('start', e)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-600"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Đến ngày</label>
                <input
                  type="date"
                  value={formatDateInput(endDate)}
                  onChange={(e) => handleDateChange('end', e)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-600"
                />
              </div>
            </div>

            {/* Presets */}
            {showPresets && (
              <div className="border-t pt-4 space-y-2">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Cài đặt nhanh</p>
                <div className="grid grid-cols-3 gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePreset('today')}
                    className="text-xs"
                  >
                    Hôm nay
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePreset('30days')}
                    className="text-xs"
                  >
                    30 ngày
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePreset('month')}
                    className="text-xs"
                  >
                    Tháng này
                  </Button>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="border-t pt-4 flex gap-2">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setShowPicker(false)}
              >
                Hủy
              </Button>
              <Button className="flex-1 bg-blue-600 hover:bg-blue-700" onClick={handleApply}>
                Áp dụng
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export default DateRangePicker;
