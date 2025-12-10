"use client";

import { useRouter } from "next/navigation";
import { useUserManagement } from "@/hooks/useUserManagement";
import { UserFilters } from "@/components/admin/UserFilters";
import { UserTable } from "@/components/admin/UserTable";
import { UserPagination } from "@/components/admin/UserPagination";
import { CreateUserModal } from "@/components/admin/CreateUserModal";
import { ConfirmModal } from "@/components/admin/ConfirmModal";

export default function AdminUsersPage() {
  const router = useRouter();

  const {
    users,
    loading,
    error,
    totalPages,
    totalElements,
    currentPage,
    pageSize,
    selectedRole,
    showDeleted,
    searchTerm,
    sortBy,
    sortDir,
    formData,
    showCreateModal,
    showConfirmModal,
    confirmAction,
    setSearchTerm,
    setFormData,
    setShowCreateModal,
    setShowDeleted,
    resetForm,
    handleCreateUser,
    handleDeleteUser,
    handleRestoreUser,
    handleConfirmAction,
    handleCancelAction,
    handlePageChange,
    handlePageSizeChange,
    handleSort,
    handleRoleChange,
  } = useUserManagement();

  // Handle view order history - chuyển sang trang mới
  const handleViewOrderHistory = (userId: number) => {
    router.push(`/admin/users/orders/${userId}`);
  };

  return (
    <div className="p-8 bg-white dark:bg-gray-900 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Quản Lý Người Dùng</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Tổng số: {totalElements} người dùng
          </p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white px-4 py-2 rounded-lg transition"
        >
          + Thêm Người Dùng
        </button>
      </div>

      {/* Filters */}
      <UserFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedRole={selectedRole}
        handleRoleChange={handleRoleChange}
        showDeleted={showDeleted}
        setShowDeleted={setShowDeleted}
        pageSize={pageSize}
        handlePageSizeChange={handlePageSizeChange}
      />

      {/* Error Message */}
      {error && (
        <div className="bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-600 text-red-700 dark:text-red-200 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {/* Users Table */}
      <UserTable
        users={users}
        loading={loading}
        selectedRole={selectedRole}
        sortBy={sortBy}
        sortDir={sortDir}
        handleSort={handleSort}
        handleDeleteUser={handleDeleteUser}
        handleRestoreUser={handleRestoreUser}
        handleViewOrderHistory={handleViewOrderHistory}
      />

      {/* Pagination */}
      <UserPagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalElements={totalElements}
        pageSize={pageSize}
        handlePageChange={handlePageChange}
      />

      {/* Create User Modal */}
      <CreateUserModal
        showCreateModal={showCreateModal}
        setShowCreateModal={setShowCreateModal}
        formData={formData}
        setFormData={setFormData}
        resetForm={resetForm}
        handleCreateUser={handleCreateUser}
        loading={loading}
      />

      {/* Confirm Modal */}
      <ConfirmModal
        showConfirmModal={showConfirmModal}
        confirmAction={confirmAction}
        handleConfirmAction={handleConfirmAction}
        handleCancelAction={handleCancelAction}
        loading={loading}
      />
    </div>
  );
};