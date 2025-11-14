import { useState, useEffect, useCallback } from "react";
import {
  getUsersByRole,
  getUserById,
  createUser,
  deleteUser,
  restoreUser,
} from "@/services/userService";
import {
  UserResponse,
  PagedUserResponse,
  UserCreateRequest,
} from "@/features/user";

interface ErrorResponse {
  response?: {
    data?: {
      message?: string;
    };
  };
}

export const useAdminUsers = () => {
  const [users, setUsers] = useState<UserResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [selectedRole, setSelectedRole] = useState<string>("CUSTOMER");
  const [showDeleted, setShowDeleted] = useState(false);

  // Lấy danh sách người dùng theo role
  const fetchUsers = useCallback(
    async (
      role: string,
      page: number = 0,
      size: number = 10,
      sortBy: string = "id",
      sortDir: "asc" | "desc" = "asc",
      includeDeleted: boolean = false
    ) => {
      setLoading(true);
      setError(null);
      try {
        const response: PagedUserResponse = await getUsersByRole(
          role,
          page,
          size,
          sortBy,
          sortDir,
          includeDeleted
        );
        setUsers(response.content);
        setTotalPages(response.totalPages);
        setTotalElements(response.totalElements);
        setCurrentPage(response.number);
        setPageSize(response.size);
      } catch (err) {
        const error = err as ErrorResponse;
        setError(error?.response?.data?.message || "Failed to fetch users");
        console.error("Error fetching users:", err);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // Lấy thông tin một người dùng
  const fetchUserById = async (id: number): Promise<UserResponse | null> => {
    setLoading(true);
    setError(null);
    try {
      const user = await getUserById(id);
      return user;
    } catch (err) {
      const error = err as ErrorResponse;
      setError(error?.response?.data?.message || "Failed to fetch user");
      console.error("Error fetching user:", err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Tạo người dùng mới
  const createNewUser = async (
    userData: UserCreateRequest
  ): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      await createUser(userData);
      // Refresh danh sách sau khi tạo
      await fetchUsers(selectedRole, currentPage, pageSize, "id", "asc", showDeleted);
      return true;
    } catch (err) {
      const error = err as ErrorResponse;
      setError(error?.response?.data?.message || "Failed to create user");
      console.error("Error creating user:", err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Xóa người dùng
  const removeUser = async (id: number): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      await deleteUser(id);
      // Refresh danh sách sau khi xóa
      await fetchUsers(selectedRole, currentPage, pageSize, "id", "asc", showDeleted);
      return true;
    } catch (err) {
      const error = err as ErrorResponse;
      setError(error?.response?.data?.message || "Failed to delete user");
      console.error("Error deleting user:", err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Khôi phục người dùng
  const recoverUser = async (id: number): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      await restoreUser(id);
      // Refresh danh sách sau khi khôi phục
      await fetchUsers(selectedRole, currentPage, pageSize, "id", "asc", showDeleted);
      return true;
    } catch (err) {
      const error = err as ErrorResponse;
      setError(error?.response?.data?.message || "Failed to restore user");
      console.error("Error restoring user:", err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Load users khi component mount hoặc khi thay đổi role
  useEffect(() => {
    fetchUsers(selectedRole, 0, pageSize, "id", "asc", showDeleted);
  }, [selectedRole, pageSize, showDeleted, fetchUsers]);

  return {
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
    fetchUserById,
    createNewUser,
    removeUser,
    recoverUser,
    setPageSize,
    setSelectedRole,
    setShowDeleted,
  };
};
