import { Address, User } from "@/features/user";
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

export const getUserAddresses = async (
  token: string,
  userId: number
): Promise<Address[]> => {
  const response = await axios.get(`${API_BASE_URL}/${userId}/addresses`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data; // trả về mảng Address[]
};

export const addUserAddress = async (
  token: string,
  userId: number,
  addressData: Omit<Address, "id">
): Promise<Address> => {
  const response = await axios.post(
    `${API_BASE_URL}/${userId}/addresses`,
    addressData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const deleteUserAddress = async (
  token: string,
  userId: number,
  addressId: number
): Promise<void> => {
  await axios.delete(`${API_BASE_URL}/${userId}/addresses/${addressId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateUserAddress = async (
  token: string,
  userId: number,
  addressId: number,
  addressData: Omit<Address, "id">
): Promise<void> => {
  await axios.patch(`${API_BASE_URL}/${userId}/addresses/${addressId}`, addressData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};


// import { Address, User } from "@/features/user";
// import { createApiClient } from "@/api/client";

// const USER_API = "/users";

// export class UserService {
//   private client;

//   constructor(token: string) {
//     this.client = createApiClient(token);
//   }

//   // === PROFILE ===
//   getProfile = async (): Promise<User> => {
//     const { data } = await this.client.get<User>(`${USER_API}/profile`);
//     return data;
//   };

//   updateProfile = async (userData: Partial<User>): Promise<User> => {
//     const { data } = await this.client.patch<User>(`${USER_API}/profile`, userData);
//     return data;
//   };

//   // === ADDRESSES ===
//   getAddresses = async (userId: number): Promise<Address[]> => {
//     const { data } = await this.client.get<Address[]>(`${USER_API}/${userId}/addresses`);
//     return data;
//   };

//   addAddress = async (userId: number, addressData: Omit<Address, "id">): Promise<Address> => {
//     const { data } = await this.client.post<Address>(`${USER_API}/${userId}/addresses`, addressData);
//     return data;
//   };

//   deleteAddress = async (userId: number, addressId: number): Promise<void> => {
//     await this.client.delete(`${USER_API}/${userId}/addresses/${addressId}`);
//   };

//   updateAddress = async (
//     userId: number,
//     addressId: number,
//     addressData: Omit<Address, "id">
//   ): Promise<void> => {
//     await this.client.patch(`${USER_API}/${userId}/addresses/${addressId}`, addressData);
//   };
// }