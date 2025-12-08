import { useState } from "react";
import { useAdminUsers } from "@/hooks/useAdminUsers";
import { UserCreateRequest } from "@/features/user";

export const useUserManagement = () => {
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
    roleNames: ["ROLE_STAFF"], // Default role
  });

  // Reset form khi đóng modal
  const resetForm = () => {
    setFormData({
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      phone: "",
      roleNames: ["ROLE_STAFF"],
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

  // Filter users theo search term
  const filteredUsers = users.filter((user) => {
    const matchSearch =
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchTerm.toLowerCase());

    return matchSearch;
  });

  return {
    // Data
    users: filteredUsers,
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

    // Actions
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
  };
};