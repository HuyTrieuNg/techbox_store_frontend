"use client";

import { useState } from "react";
import { useAdminUsers } from "@/hooks/useAdminUsers";
import { UserCreateRequest } from "@/features/user";
import { useRouter } from "next/navigation";

export default function AdminUsers() {
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
    fetchUsers,
    createNewUser,
    removeUser,
    recoverUser,
    setPageSize,
    setSelectedRole,
    setShowDeleted,
  } = useAdminUsers();

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmAction, setConfirmAction] = useState<{
    type: "delete" | "restore";
    userId: number;
    userName: string;
  } | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("id");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");

  // Form states
  const [formData, setFormData] = useState<UserCreateRequest>({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    phone: "",
    roles: ["ROLE_STAFF"], // Default role
  });

  // Reset form khi đóng modal
  const resetForm = () => {
    setFormData({
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      phone: "",
      roles: ["ROLE_STAFF"],
    });
  };

  // Xử lý tạo người dùng
  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await createNewUser(formData);
    if (success) {
      setShowCreateModal(false);
      resetForm();
    }
  };

  // Xử lý xóa người dùng
  const handleDeleteUser = async (id: number, userName: string) => {
    setConfirmAction({ type: "delete", userId: id, userName });
    setShowConfirmModal(true);
  };

  // Xử lý khôi phục người dùng
  const handleRestoreUser = async (id: number, userName: string) => {
    setConfirmAction({ type: "restore", userId: id, userName });
    setShowConfirmModal(true);
  };

  // Xác nhận thực hiện action
  const handleConfirmAction = async () => {
    if (!confirmAction) return;

    if (confirmAction.type === "delete") {
      await removeUser(confirmAction.userId);
    } else {
      await recoverUser(confirmAction.userId);
    }

    setShowConfirmModal(false);
    setConfirmAction(null);
  };

  // Hủy action
  const handleCancelAction = () => {
    setShowConfirmModal(false);
    setConfirmAction(null);
  };

  // Handle view order history - chuyển sang trang mới
  const handleViewOrderHistory = (userId: number) => {
    router.push(`/admin/users/${userId}/orders`);
  };

  // Xử lý phân trang
  const handlePageChange = (newPage: number) => {
    if (newPage >= 0 && newPage < totalPages) {
      fetchUsers(selectedRole, newPage, pageSize, sortBy, sortDir, showDeleted);
    }
  };

  // Xử lý thay đổi số lượng mỗi trang
  const handlePageSizeChange = (newSize: number) => {
    setPageSize(newSize);
    fetchUsers(selectedRole, 0, newSize, sortBy, sortDir, showDeleted);
  };

  // Xử lý sắp xếp
  const handleSort = (field: string) => {
    const newDir = sortBy === field && sortDir === "asc" ? "desc" : "asc";
    setSortBy(field);
    setSortDir(newDir);
    fetchUsers(selectedRole, currentPage, pageSize, field, newDir, showDeleted);
  };

  // Xử lý thay đổi role
  const handleRoleChange = (role: string) => {
    setSelectedRole(role);
  };

  // Filter users theo search term (không cần filter deleted nữa vì API đã làm)
  const filteredUsers = users.filter((user) => {
    const matchSearch =
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchTerm.toLowerCase());

    return matchSearch;
  });

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Quản Lý Người Dùng</h1>
          <p className="text-gray-600 mt-1">
            Tổng số: {totalElements} người dùng
          </p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          + Thêm Người Dùng
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <div className="flex gap-4 items-center flex-wrap">
          {/* Search */}
          <input
            type="text"
            placeholder="Tìm kiếm theo email, tên..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 min-w-[200px] px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Role Filter */}
          <select
            value={selectedRole}
            onChange={(e) => handleRoleChange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="CUSTOMER">Khách hàng</option>
            <option value="STAFF">Nhân viên</option>
            <option value="ADMIN">Quản trị viên</option>
          </select>

          {/* Status Filter - Đổi từ checkbox thành select */}
          <select
            value={showDeleted ? "deleted" : "active"}
            onChange={(e) => setShowDeleted(e.target.value === "deleted")}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="active">Đang hoạt động</option>
            <option value="deleted">Đã xóa</option>
          </select>

          {/* Page Size */}
          <select
            value={pageSize}
            onChange={(e) => handlePageSizeChange(Number(e.target.value))}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value={5}>5 / trang</option>
            <option value={10}>10 / trang</option>
            <option value={20}>20 / trang</option>
            <option value={50}>50 / trang</option>
          </select>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {/* Users Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase cursor-pointer hover:bg-gray-100"
                      onClick={() => handleSort("id")}
                    >
                      ID {sortBy === "id" && (sortDir === "asc" ? "↑" : "↓")}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Người dùng
                    </th>
                    <th
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase cursor-pointer hover:bg-gray-100"
                      onClick={() => handleSort("email")}
                    >
                      Email {sortBy === "email" && (sortDir === "asc" ? "↑" : "↓")}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Số điện thoại
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Vai trò
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Trạng thái
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Thao tác
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredUsers.length === 0 ? (
                    <tr>
                      <td
                        colSpan={7}
                        className="px-6 py-8 text-center text-gray-500"
                      >
                        Không tìm thấy người dùng
                      </td>
                    </tr>
                  ) : (
                    filteredUsers.map((user) => (
                      <tr key={user.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          #{user.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                              {user.firstName.charAt(0)}
                              {user.lastName.charAt(0)}
                            </div>
                            <div className="ml-4">
                              {selectedRole === "CUSTOMER" && user.isActive !== false ? (
                                <button
                                  onClick={() => handleViewOrderHistory(user.id)}
                                  className="text-sm font-medium text-blue-600 hover:text-blue-900 hover:underline text-left"
                                  title="Xem lịch sử mua hàng"
                                >
                                  {user.firstName} {user.lastName}
                                </button>
                              ) : (
                                <div className="text-sm font-medium text-gray-900">
                                  {user.firstName} {user.lastName}
                                </div>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {selectedRole === "CUSTOMER" && user.isActive !== false ? (
                            <button
                              onClick={() => handleViewOrderHistory(user.id)}
                              className="text-blue-600 hover:text-blue-900 hover:underline"
                              title="Xem lịch sử mua hàng"
                            >
                              {user.email}
                            </button>
                          ) : (
                            user.email
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {user.phone}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex gap-1">
                            {user.roles?.map((role, idx) => (
                              <span
                                key={idx}
                                className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                  role.includes("ADMIN")
                                    ? "bg-purple-100 text-purple-800"
                                    : role.includes("STAFF")
                                    ? "bg-blue-100 text-blue-800"
                                    : "bg-gray-100 text-gray-800"
                                }`}
                              >
                                {role.replace("ROLE_", "")}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              user.isActive === false
                                ? "bg-red-100 text-red-800"
                                : "bg-green-100 text-green-800"
                            }`}
                          >
                            {user.isActive === false ? "Đã xóa" : "Hoạt động"}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          {/* Xóa/Khôi phục */}
                          {user.isActive === false ? (
                            <button
                              onClick={() => handleRestoreUser(user.id, `${user.firstName} ${user.lastName}`)}
                              className="text-green-600 hover:text-green-900"
                            >
                              Khôi phục
                            </button>
                          ) : selectedRole === "ADMIN" ? (
                            <span className="text-gray-400">-</span>
                          ) : (
                            <button
                              onClick={() => handleDeleteUser(user.id, `${user.firstName} ${user.lastName}`)}
                              className="text-red-600 hover:text-red-900"
                            >
                              Xóa
                            </button>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="bg-gray-50 px-6 py-4 flex items-center justify-between border-t">
                <div className="text-sm text-gray-700">
                  Trang {currentPage + 1} / {totalPages}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 0}
                    className="px-4 py-2 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition"
                  >
                    Trước
                  </button>
                  {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                    // Show max 5 page numbers
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i;
                    } else if (currentPage < 3) {
                      pageNum = i;
                    } else if (currentPage > totalPages - 3) {
                      pageNum = totalPages - 5 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }
                    
                    return (
                      <button
                        key={pageNum}
                        onClick={() => handlePageChange(pageNum)}
                        className={`px-4 py-2 border rounded-lg transition ${
                          currentPage === pageNum
                            ? "bg-blue-600 text-white"
                            : "hover:bg-gray-100"
                        }`}
                      >
                        {pageNum + 1}
                      </button>
                    );
                  })}
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage >= totalPages - 1}
                    className="px-4 py-2 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition"
                  >
                    Sau
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Create User Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
            <h2 className="text-2xl font-bold mb-6">Tạo Người Dùng Mới</h2>
            <form onSubmit={handleCreateUser}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Mật khẩu
                  </label>
                  <input
                    type="password"
                    required
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Họ
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={(e) =>
                      setFormData({ ...formData, firstName: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tên
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={(e) =>
                      setFormData({ ...formData, lastName: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Số điện thoại
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Vai trò
                  </label>
                  <select
                    required
                    value={formData.roles?.[0] || "ROLE_STAFF"}
                    onChange={(e) =>
                      setFormData({ ...formData, roles: [e.target.value] })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="ROLE_STAFF">Nhân viên</option>
                    <option value="ROLE_ADMIN">Quản trị viên</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-4 mt-6">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
                >
                  {loading ? "Đang tạo..." : "Tạo người dùng"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowCreateModal(false);
                    resetForm();
                  }}
                  className="flex-1 bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400"
                >
                  Hủy
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Confirm Modal */}
      {showConfirmModal && confirmAction && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
            <h2 className="text-2xl font-bold mb-4">
              {confirmAction.type === "delete" ? "Xác nhận xóa" : "Xác nhận khôi phục"}
            </h2>
            <p className="text-gray-600 mb-6">
              {confirmAction.type === "delete" 
                ? `Bạn có chắc chắn muốn xóa người dùng "${confirmAction.userName}"?`
                : `Bạn có chắc chắn muốn khôi phục người dùng "${confirmAction.userName}"?`
              }
            </p>
            <div className="flex gap-4">
              <button
                onClick={handleConfirmAction}
                disabled={loading}
                className={`flex-1 text-white px-4 py-2 rounded-lg disabled:opacity-50 ${
                  confirmAction.type === "delete"
                    ? "bg-red-600 hover:bg-red-700"
                    : "bg-green-600 hover:bg-green-700"
                }`}
              >
                {loading 
                  ? "Đang xử lý..." 
                  : confirmAction.type === "delete" 
                    ? "Xóa" 
                    : "Khôi phục"
                }
              </button>
              <button
                onClick={handleCancelAction}
                disabled={loading}
                className="flex-1 bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 disabled:opacity-50"
              >
                Hủy
              </button>
            </div>
          </div>
        </div>
      )}
    </div>

  );
};
export default UsersPage;