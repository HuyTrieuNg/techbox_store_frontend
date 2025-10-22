import { User } from "@/features/user";
import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api/users";

// Lấy thông tin người dùng hiện tại
export const getCurrentUserProfile = async (token: string): Promise<User> => {
  const response = await axios.get(`${API_BASE_URL}/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Cập nhật thông tin người dùng
export const updateUserProfile = async (
  token: string,
  userData: Partial<User>
): Promise<User> => {
  const response = await axios.patch(`${API_BASE_URL}/profile`, userData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  return response.data;
};
