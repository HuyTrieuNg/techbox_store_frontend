import { User, UserCreateRequest, UserResponse } from "@/features/user";
import { api } from "@/lib/axios";

export class UserService {
  static async getUsers(page: number = 0, size: number = 10, sort: string = "id,asc"): Promise<UserResponse> {
    return await api.get<UserResponse>("/users", {
      params: { page, size, sort },
    });
  }

  static async getUserById(id: number): Promise<User> {
    return await api.get<User>(`/users/${id}`);
  }

  static async updateUser(id: number, userData: Partial<User>): Promise<User> {
    return await api.patch<User>(`/users/${id}`, userData);
  }

  static async createUser(userData: Partial<UserCreateRequest>): Promise<User> {
    return await api.post<User>("/users", userData);
  }

  static async deleteUser(id: number): Promise<void> {
    return await api.delete(`/users/${id}`);
  }
}