
// import { userService } from "@/services/userService";

// export function useUser(id: number) {
//   const [user, setUser] = useState<User | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     if (!id) return;

//     userService.getUserById(id)
//       .then(setUser)
//       .catch((err) => setError(err.message))
//       .finally(() => setLoading(false));
//   }, [id]);

//   return { user, loading, error, setUser };
// }

// src/hooks/useUser.ts
"use client";

import { useEffect, useState } from "react";
import { User } from "@/features/user";
import { getCurrentUserProfile, updateUserProfile } from "@/services/userService";
import { useAuth } from "@/hooks/useAuth";

export function useUser() {
  const { accessToken } = useAuth();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updateLoading, setUpdateLoading] = useState(false); // Trạng thái loading cho update
  const [updateError, setUpdateError] = useState<string | null>(null); // Trạng thái lỗi cho update

  useEffect(() => {
    const fetchUser = async () => {
      const savedAccessToken = localStorage.getItem("accessToken");
      if (!savedAccessToken) {
        setError("Chưa đăng nhập");
        setLoading(false);
        return;
      }
      try {
        const data = await getCurrentUserProfile(savedAccessToken);
        setUser(data);
      } catch (err: any) {
        setError(err.response?.data?.message || "Lỗi khi tải thông tin người dùng");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [accessToken]); // chạy lại khi token thay đổi

  // Hàm cập nhật thông tin người dùng
  const handleUpdateProfile = async (userData: Partial<User>) => {
    if (!accessToken) {
      setUpdateError("Chưa đăng nhập");
      return { success: false, error: "Chưa đăng nhập" };
    }
    try {
      setUpdateLoading(true);
      setUpdateError(null);
      const updatedUser = await updateUserProfile(accessToken, userData);
      setUser(updatedUser);
      return { success: true, user: updatedUser };
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || "Cập nhật thất bại";
      setUpdateError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setUpdateLoading(false);
    }
  };

  return {
    user,
    loading,
    error,
    updateLoading, // Trả về trạng thái loading cho update
    updateError,   // Trả về trạng thái lỗi cho update
    setUser,
    handleUpdateProfile,
  };
}
