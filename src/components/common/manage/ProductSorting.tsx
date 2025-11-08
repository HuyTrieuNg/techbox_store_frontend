/**
 * ProductSorting - Sorting Component
 * 
 * Component sắp xếp sản phẩm
 * Hỗ trợ: sortBy (id, name, price, rating, createdAt) + sortDirection (ASC, DESC)
 */

'use client';

import { FiArrowUp, FiArrowDown } from 'react-icons/fi';

export interface ProductSortParams {
  sortBy: 'id' | 'name' | 'displaySalePrice' | 'averageRating' | 'createdAt';
  sortDirection: 'ASC' | 'DESC';
}

interface ProductSortingProps {
  sort: ProductSortParams;
  onSortChange: (sort: ProductSortParams) => void;
}

export default function ProductSorting({ sort, onSortChange }: ProductSortingProps) {
  const sortOptions = [
    { value: 'id', label: 'ID' },
    { value: 'name', label: 'Tên' },
    { value: 'displaySalePrice', label: 'Giá bán' },
    { value: 'averageRating', label: 'Đánh giá' },
    { value: 'createdAt', label: 'Ngày tạo' },
  ];

  const handleSortByChange = (sortBy: ProductSortParams['sortBy']) => {
    onSortChange({ ...sort, sortBy });
  };

  const toggleDirection = () => {
    onSortChange({
      ...sort,
      sortDirection: sort.sortDirection === 'ASC' ? 'DESC' : 'ASC',
    });
  };

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm font-medium text-gray-700">Sắp xếp:</span>
      
      {/* Sort By Select */}
      <select
        value={sort.sortBy}
        onChange={(e) => handleSortByChange(e.target.value as ProductSortParams['sortBy'])}
        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
      >
        {sortOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {/* Direction Toggle Button */}
      <button
        onClick={toggleDirection}
        className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        title={sort.sortDirection === 'ASC' ? 'Tăng dần' : 'Giảm dần'}
      >
        {sort.sortDirection === 'ASC' ? (
          <FiArrowUp className="w-5 h-5 text-gray-600" />
        ) : (
          <FiArrowDown className="w-5 h-5 text-gray-600" />
        )}
      </button>

      <span className="text-xs text-gray-500">
        ({sort.sortDirection === 'ASC' ? 'Tăng dần' : 'Giảm dần'})
      </span>
    </div>
  );
}
