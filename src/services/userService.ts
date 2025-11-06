import { api } from "@/lib/axios";
import { Address, User } from "@/features/user";

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