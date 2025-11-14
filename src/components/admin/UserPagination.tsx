import React from "react";

interface UserPaginationProps {
  currentPage: number;
  totalPages: number;
  handlePageChange: (page: number) => void;
}

export const UserPagination: React.FC<UserPaginationProps> = ({
  currentPage,
  totalPages,
  handlePageChange,
}) => {
  // Validate inputs to prevent NaN
  const safeCurrentPage = Math.max(0, Math.floor(currentPage || 0));
  const safeTotalPages = Math.max(1, Math.floor(totalPages || 1));

  if (safeTotalPages <= 1) return null;

  return (
    <div className="bg-gray-50 dark:bg-gray-700 px-6 py-4 flex items-center justify-between border-t border-gray-200 dark:border-gray-600">
      <div className="text-sm text-gray-700 dark:text-gray-300">
        Trang {safeCurrentPage + 1} / {safeTotalPages}
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => handlePageChange(safeCurrentPage - 1)}
          disabled={safeCurrentPage === 0}
          className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-gray-600 transition text-gray-700 dark:text-gray-300"
        >
          Trước
        </button>
        {Array.from({ length: Math.min(safeTotalPages, 5) }, (_, i) => {
          let pageNum;
          if (safeTotalPages <= 5) {
            pageNum = i;
          } else if (safeCurrentPage < 3) {
            pageNum = i;
          } else if (safeCurrentPage > safeTotalPages - 3) {
            pageNum = safeTotalPages - 5 + i;
          } else {
            pageNum = safeCurrentPage - 2 + i;
          }

          // Ensure pageNum is always a valid number
          pageNum = Math.max(0, Math.min(safeTotalPages - 1, Math.floor(pageNum)));

          return (
            <button
              key={pageNum}
              onClick={() => handlePageChange(pageNum)}
              className={`px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg transition ${
                safeCurrentPage === pageNum
                  ? "bg-blue-600 text-white"
                  : "hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300"
              }`}
            >
              {pageNum + 1}
            </button>
          );
        })}
        <button
          onClick={() => handlePageChange(safeCurrentPage + 1)}
          disabled={safeCurrentPage >= safeTotalPages - 1}
          className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-gray-600 transition text-gray-700 dark:text-gray-300"
        >
          Sau
        </button>
      </div>
    </div>
  );
};