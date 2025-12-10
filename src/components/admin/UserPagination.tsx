import React from "react";

interface UserPaginationProps {
  currentPage: number;
  totalPages: number;
  totalElements: number;
  pageSize: number;
  handlePageChange: (page: number) => void;
}

export const UserPagination: React.FC<UserPaginationProps> = ({
  currentPage,
  totalPages,
  totalElements,
  pageSize,
  handlePageChange,
}) => {
  // Validate inputs to prevent NaN
  const safeCurrentPage = Math.max(0, Math.floor(currentPage || 0));
  const safeTotalPages = Math.max(1, Math.floor(totalPages || 1));

  if (safeTotalPages <= 1) return null;

  // Generate pagination numbers with ellipsis
  const getPaginationRange = () => {
    const delta = 2; // Số trang hiển thị xung quanh trang hiện tại
    const range: (number | string)[] = [];
    const rangeWithDots: (number | string)[] = [];

    for (
      let i = Math.max(0, safeCurrentPage - delta);
      i <= Math.min(safeTotalPages - 1, safeCurrentPage + delta);
      i++
    ) {
      range.push(i);
    }

    let prev = -1;
    for (const i of range) {
      if (typeof i === 'number') {
        if (i - prev === 2) {
          rangeWithDots.push(prev + 1);
        } else if (i - prev !== 1) {
          rangeWithDots.push('...');
        }
        rangeWithDots.push(i);
        prev = i;
      }
    }

    // Luôn thêm trang đầu
    if (!rangeWithDots.includes(0)) {
      rangeWithDots.unshift(0);
      if (rangeWithDots[1] !== 1) {
        rangeWithDots.splice(1, 0, '...');
      }
    }

    // Luôn thêm trang cuối
    if (!rangeWithDots.includes(safeTotalPages - 1)) {
      if (rangeWithDots[rangeWithDots.length - 1] !== safeTotalPages - 2) {
        rangeWithDots.push('...');
      }
      rangeWithDots.push(safeTotalPages - 1);
    }

    return rangeWithDots;
  };

  return (
    <div className="bg-white dark:bg-gray-800 px-4 py-3 flex items-center justify-between border-t border-gray-200 dark:border-gray-600 sm:px-6">
      <div className="flex-1 flex justify-between sm:hidden">
        <button
          onClick={() => handlePageChange(safeCurrentPage - 1)}
          disabled={safeCurrentPage === 0}
          className="relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Trước
        </button>
        <button
          onClick={() => handlePageChange(safeCurrentPage + 1)}
          disabled={safeCurrentPage === safeTotalPages - 1}
          className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Sau
        </button>
      </div>
      <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            Hiển thị{" "}
            <span className="font-medium">
              {safeCurrentPage * pageSize + 1}
            </span>{" "}
            đến{" "}
            <span className="font-medium">
              {Math.min((safeCurrentPage + 1) * pageSize, totalElements)}
            </span>{" "}
            trong tổng số{" "}
            <span className="font-medium">{totalElements}</span> người dùng
          </p>
        </div>
        <div>
          <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
            <button
              onClick={() => handlePageChange(safeCurrentPage - 1)}
              disabled={safeCurrentPage === 0}
              className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Trước
            </button>
            {getPaginationRange().map((pageNum, idx) => (
              pageNum === '...' ? (
                <span
                  key={`ellipsis-${idx}`}
                  className="relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  ...
                </span>
              ) : (
                <button
                  key={pageNum}
                  onClick={() => handlePageChange(pageNum as number)}
                  className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                    safeCurrentPage === pageNum
                      ? "z-10 bg-blue-50 dark:bg-blue-900 border-blue-500 dark:border-blue-400 text-blue-600 dark:text-blue-300"
                      : "bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-600"
                  }`}
                >
                  {(pageNum as number) + 1}
                </button>
              )
            ))}
            <button
              onClick={() => handlePageChange(safeCurrentPage + 1)}
              disabled={safeCurrentPage === safeTotalPages - 1}
              className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Sau
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
};