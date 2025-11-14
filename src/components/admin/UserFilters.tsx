import React from "react";

interface UserFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedRole: string;
  handleRoleChange: (role: string) => void;
  showDeleted: boolean;
  setShowDeleted: (show: boolean) => void;
  pageSize: number;
  handlePageSizeChange: (size: number) => void;
}

export const UserFilters: React.FC<UserFiltersProps> = ({
  searchTerm,
  setSearchTerm,
  selectedRole,
  handleRoleChange,
  showDeleted,
  setShowDeleted,
  pageSize,
  handlePageSizeChange,
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 mb-6">
      <div className="flex gap-4 items-center flex-wrap">
        {/* Search */}
        <input
          type="text"
          placeholder="Tìm kiếm theo email, tên..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 min-w-[200px] px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        />

        {/* Role Filter */}
        <select
          value={selectedRole}
          onChange={(e) => handleRoleChange(e.target.value)}
          className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        >
          <option value="CUSTOMER">Khách hàng</option>
          <option value="STAFF">Nhân viên</option>
          <option value="ADMIN">Quản trị viên</option>
        </select>

        {/* Status Filter */}
        <select
          value={showDeleted ? "deleted" : "active"}
          onChange={(e) => setShowDeleted(e.target.value === "deleted")}
          className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        >
          <option value="active">Đang hoạt động</option>
          <option value="deleted">Đã xóa</option>
        </select>

        {/* Page Size */}
        <select
          value={pageSize}
          onChange={(e) => handlePageSizeChange(Number(e.target.value))}
          className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        >
          <option value={5}>5 / trang</option>
          <option value={10}>10 / trang</option>
          <option value={20}>20 / trang</option>
          <option value={50}>50 / trang</option>
        </select>
      </div>
    </div>
  );
};