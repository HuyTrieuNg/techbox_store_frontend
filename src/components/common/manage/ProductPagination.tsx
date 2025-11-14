/**
 * ProductPagination - Pagination Component
 * 
 * Component phân trang cho danh sách sản phẩm
 * Hỗ trợ: page (0-based), size, totalElements, totalPages
 */

'use client';

import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

export interface PaginationParams {
  page: number;      // 0-based index
  size: number;      // Items per page
}

export interface PaginationInfo extends PaginationParams {
  totalElements: number;
  totalPages: number;
}

interface ProductPaginationProps {
  pagination: PaginationInfo;
  onPageChange: (page: number) => void;
  onSizeChange: (size: number) => void;
}

export default function ProductPagination({
  pagination,
  onPageChange,
  onSizeChange,
}: ProductPaginationProps) {
  const { page, size, totalElements, totalPages } = pagination;

  const startItem = totalElements === 0 ? 0 : page * size + 1;
  const endItem = Math.min((page + 1) * size, totalElements);

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 7; // Maximum number of page buttons to show

    if (totalPages <= maxVisible) {
      // Show all pages if total is small
      for (let i = 0; i < totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(0);

      if (page <= 3) {
        // Near start: show first 5 pages + ... + last
        for (let i = 1; i < 5; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages - 1);
      } else if (page >= totalPages - 4) {
        // Near end: show first + ... + last 5 pages
        pages.push('...');
        for (let i = totalPages - 5; i < totalPages; i++) pages.push(i);
      } else {
        // Middle: show first + ... + current-1, current, current+1 + ... + last
        pages.push('...');
        pages.push(page - 1);
        pages.push(page);
        pages.push(page + 1);
        pages.push('...');
        pages.push(totalPages - 1);
      }
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="bg-white rounded-lg shadow px-6 py-4">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Info Text */}
        <div className="text-sm text-gray-700">
          Hiển thị <span className="font-medium">{startItem}</span> đến{' '}
          <span className="font-medium">{endItem}</span> trong tổng số{' '}
          <span className="font-medium">{totalElements}</span> sản phẩm
        </div>

        <div className="flex items-center gap-4">
          {/* Page Size Selector */}
          <div className="flex items-center gap-2">
            <label htmlFor="pageSize" className="text-sm text-gray-700">
              Hiển thị:
            </label>
            <select
              id="pageSize"
              value={size}
              onChange={(e) => onSizeChange(Number(e.target.value))}
              className="px-3 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            >
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
          </div>

          {/* Pagination Buttons */}
          <nav className="flex items-center gap-1">
            {/* Previous Button */}
            <button
              onClick={() => onPageChange(page - 1)}
              disabled={page === 0}
              className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white transition-colors"
              aria-label="Trang trước"
            >
              <FiChevronLeft className="w-5 h-5 text-gray-600" />
            </button>

            {/* Page Numbers */}
            {pageNumbers.map((pageNum, index) => (
              <div key={index}>
                {pageNum === '...' ? (
                  <span className="px-3 py-2 text-gray-500">...</span>
                ) : (
                  <button
                    onClick={() => onPageChange(pageNum as number)}
                    className={`min-w-[40px] px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      page === pageNum
                        ? 'bg-blue-600 text-white'
                        : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {(pageNum as number) + 1}
                  </button>
                )}
              </div>
            ))}

            {/* Next Button */}
            <button
              onClick={() => onPageChange(page + 1)}
              disabled={page >= totalPages - 1}
              className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white transition-colors"
              aria-label="Trang sau"
            >
              <FiChevronRight className="w-5 h-5 text-gray-600" />
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
}
