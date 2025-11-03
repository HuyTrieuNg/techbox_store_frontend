"use client";

import { useEffect, useState } from "react";
import { User, UpdatePasswordData, Address } from "@/features/user";
import { addUserAddress, deleteUserAddress, getCurrentUserProfile, getUserAddresses, updateUserAddress, updateUserProfile } from "@/services/userService";
import { useAuth } from "@/hooks/useAuth";

export function useUser() {
  const { accessToken } = useAuth();
  const [user, setUser] = useState<User | null>(null);
  const [updatePasswordData, setUpdatePasswordData] = useState<UpdatePasswordData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updateLoading, setUpdateLoading] = useState(false); // Trạng thái loading cho update
  const [updateError, setUpdateError] = useState<string | null>(null); // Trạng thái lỗi cho update
  const [addresses, setAddresses] = useState<Address[]>([]);

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

  const handleUpdatePassword = async (userData: Partial<UpdatePasswordData>) => {
    if (!accessToken) {
      // setUpdateError("Chưa đăng nhập");
      return { success: true };
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

  const fetchAddresses = async () => {
    if (!accessToken || !user) return;
    try {
      const data = await getUserAddresses(accessToken, user.id);
      setAddresses(data);
    } catch (err) {
      console.error("Lỗi khi tải địa chỉ:", err);
    }
  };
  useEffect(() => {
    if (user && accessToken) {
      fetchAddresses();
    }
  }, [user, accessToken]);

  const addAddress = async (newAddress: Omit<Address, "id">) => {
    if (!user || !accessToken) return;
    await addUserAddress(accessToken, user.id, newAddress);
    await fetchAddresses(); // reload danh sách
  };

  const deleteAddress = async (addressId: number) => {
    if (!user || !accessToken) return;
    try {
      await deleteUserAddress(accessToken, user.id, addressId);
      await fetchAddresses(); // reload lại danh sách sau khi xóa
    } catch (err) {
      console.error("Lỗi khi xóa địa chỉ:", err);
    }
  };

  const updateAddress = async (addressId: number, updatedData: Omit<Address, "id">) => {
    if (!user || !accessToken) return;
    try {
      await updateUserAddress(accessToken, user.id, addressId, updatedData);
      await fetchAddresses();
    } catch (err) {
      console.error("Lỗi khi cập nhật địa chỉ:", err);
    }
  };


  return {
    user,
    addresses,
    loading,
    error,
    updateLoading, // Trả về trạng thái loading cho update
    updateError,   // Trả về trạng thái lỗi cho update
    setUser,
    handleUpdateProfile,
    handleUpdatePassword,
    addAddress,
    deleteAddress,
    updateAddress,
  };
}


// "use client";

// import { useEffect, useState, useCallback } from "react";
// import { User, Address } from "@/features/user";
// import { UserService } from "@/services/userService";
// import { useAuth } from "@/hooks/useAuth";

// export function useUser() {
//   const { accessToken } = useAuth();

//   const [user, setUser] = useState<User | null>(null);
//   const [addresses, setAddresses] = useState<Address[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [updateLoading, setUpdateLoading] = useState(false);
//   const [updateError, setUpdateError] = useState<string | null>(null);

//   // Tạo service instance khi token thay đổi
//   const service = accessToken ? new UserService(accessToken) : null;

//   // === LẤY PROFILE ===
//   useEffect(() => {
//     const fetchUser = async () => {
//       if (!accessToken || !service) {
//         setError("Chưa đăng nhập");
//         setLoading(false);
//         return;
//       }

//       try {
//         setLoading(true);
//         setError(null);
//         const data = await service.getProfile();
//         setUser(data);
//       } catch (err: any) {
//         const msg = err.response?.data?.message || "Lỗi khi tải thông tin người dùng";
//         setError(msg);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUser();
//   }, [accessToken, service]);

//   // === LẤY ĐỊA CHỈ ===
//   const fetchAddresses = useCallback(async () => {
//     if (!service || !user?.id) return;

//     try {
//       const data = await service.getAddresses(user.id);
//       setAddresses(data);
//     } catch (err: any) {
//       console.error("Lỗi khi tải địa chỉ:", err);
//     }
//   }, [service, user?.id]);

//   useEffect(() => {
//     if (user && service) {
//       fetchAddresses();
//     }
//   }, [user, service, fetchAddresses]);

//   // === CẬP NHẬT PROFILE ===
//   const handleUpdateProfile = async (userData: Partial<User>) => {
//     if (!service) {
//       const msg = "Chưa đăng nhập";
//       setUpdateError(msg);
//       return { success: false, error: msg };
//     }

//     try {
//       setUpdateLoading(true);
//       setUpdateError(null);
//       const updatedUser = await service.updateProfile(userData);
//       setUser(updatedUser);
//       return { success: true, user: updatedUser };
//     } catch (err: any) {
//       const msg = err.response?.data?.message || "Cập nhật thất bại";
//       setUpdateError(msg);
//       return { success: false, error: msg };
//     } finally {
//       setUpdateLoading(false);
//     }
//   };

//   // === CẬP NHẬT MẬT KHẨU (nếu backend hỗ trợ riêng) ===
//   // Nếu backend chưa có API riêng, tạm bỏ hoặc implement sau
//   const handleUpdatePassword = async (passwordData: any) => {
//     // TODO: Gọi API đổi mật khẩu riêng (nếu có)
//     return { success: true };
//   };

//   // === QUẢN LÝ ĐỊA CHỈ ===
//   const addAddress = async (newAddress: Omit<Address, "id">) => {
//     if (!service || !user?.id) return;
//     try {
//       await service.addAddress(user.id, newAddress);
//       await fetchAddresses();
//     } catch (err) {
//       console.error("Lỗi thêm địa chỉ:", err);
//     }
//   };

//   const deleteAddress = async (addressId: number) => {
//     if (!service || !user?.id) return;
//     try {
//       await service.deleteAddress(user.id, addressId);
//       await fetchAddresses();
//     } catch (err) {
//       console.error("Lỗi xóa địa chỉ:", err);
//     }
//   };

//   const updateAddress = async (addressId: number, updatedData: Omit<Address, "id">) => {
//     if (!service || !user?.id) return;
//     try {
//       await service.updateAddress(user.id, addressId, updatedData);
//       await fetchAddresses();
//     } catch (err) {
//       console.error("Lỗi cập nhật địa chỉ:", err);
//     }
//   };

//   return {
//     user,
//     addresses,
//     loading,
//     error,
//     updateLoading,
//     updateError,
//     setUser,
//     handleUpdateProfile,
//     handleUpdatePassword,
//     addAddress,
//     deleteAddress,
//     updateAddress,
//     refetchAddresses: fetchAddresses, // nếu cần gọi thủ công
//   };
// }