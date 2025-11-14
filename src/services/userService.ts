import { api } from "@/lib/axios";
import { 
  Address, 
  User, 
  UserResponse, 
  PagedUserResponse, 
  UserCreateRequest, 
  UserUpdateRequest 
} from "@/features/user";

// Lấy thông tin người dùng hiện tại
export const getCurrentUserProfile = async (): Promise<User> => {
  return api.get<User>("/users/profile");
};

// Cập nhật thông tin người dùng
export const updateUserProfile = async (
  userData: Partial<User>
): Promise<User> => {
  return api.patch<User>("/users/profile", userData);
};

// ===== ADMIN USER MANAGEMENT =====

// Lấy danh sách người dùng (phân trang)
export const getUsers = async (
  page: number = 0,
  size: number = 10,
  sortBy: string = "id",
  sortDir: "asc" | "desc" = "asc",
  includeDeleted: boolean = false
): Promise<PagedUserResponse> => {
  return api.get<PagedUserResponse>("/users", {
    params: { page, size, sortBy, sortDir, includeDeleted }
  });
};

// Lấy danh sách người dùng theo role (phân trang)
export const getUsersByRole = async (
  roleName: string,
  page: number = 0,
  size: number = 10,
  sortBy: string = "id",
  sortDir: "asc" | "desc" = "asc",
  includeDeleted: boolean = false
): Promise<PagedUserResponse> => {
  return api.get<PagedUserResponse>(`/users/by-role/${roleName}`, {
    params: { page, size, sortBy, sortDir, includeDeleted }
  });
};

// Lấy thông tin một người dùng theo ID
export const getUserById = async (id: number): Promise<UserResponse> => {
  return api.get<UserResponse>(`/users/${id}`);
};

// Tạo người dùng mới
export const createUser = async (
  userData: UserCreateRequest
): Promise<UserResponse> => {
  return api.post<UserResponse>("/users", userData);
};

// Cập nhật thông tin người dùng
export const updateUser = async (
  id: number,
  userData: UserUpdateRequest
): Promise<UserResponse> => {
  return api.patch<UserResponse>(`/users/${id}`, userData);
};

// Xóa người dùng (soft delete)
export const deleteUser = async (id: number): Promise<void> => {
  await api.delete(`/users/${id}`);
};

// Khôi phục người dùng đã xóa
export const restoreUser = async (id: number): Promise<UserResponse> => {
  return api.patch<UserResponse>(`/users/${id}/restore`);
};

// ===== ADDRESS MANAGEMENT =====

export const getUserAddresses = async (
  userId: number
): Promise<Address[]> => {
  return api.get<Address[]>(`/users/${userId}/addresses`);
};

export const addUserAddress = async (
  userId: number,
  addressData: Omit<Address, "id">
): Promise<Address> => {
  return api.post<Address>(`/users/${userId}/addresses`, addressData);
};

export const deleteUserAddress = async (
  userId: number,
  addressId: number
): Promise<void> => {
  await api.delete(`/users/${userId}/addresses/${addressId}`);
};

export const updateUserAddress = async (
  userId: number,
  addressId: number,
  addressData: Omit<Address, "id">
): Promise<void> => {
  await api.patch(`/users/${userId}/addresses/${addressId}`, addressData);
};