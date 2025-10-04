// import { User } from "@/features/user";

// export const userService = {
//   async getUsers(): Promise<User[]> {
//     const res = await fetch("/api/users");
//     if (!res.ok) throw new Error("Failed to fetch users");
//     return res.json();
//   },

//   async getUserById(id: number): Promise<User> {
//     const res = await fetch(`/api/users/${id}`);
//     if (!res.ok) throw new Error("Failed to fetch user");
//     return res.json();
//   },

//   async updateUser(id: number, data: Partial<User>): Promise<User> {
//     const res = await fetch(`/api/users/${id}`, {
//       method: "PUT",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(data),
//     });
//     if (!res.ok) throw new Error("Failed to update user");
//     return res.json();
//   },
// };

import { User } from "@/features/user";
import { users } from "@/data/user"; // import từ file user.js bạn đã tạo

export const userService = {
  async getUsers(): Promise<User[]> {
    // giả lập fetch với delay 300ms
    return new Promise((resolve) => {
      setTimeout(() => resolve(users), 300);
    });
  },

  async getUserById(id: number): Promise<User> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const user = users.find((u) => u.id === id);
        if (user) resolve(user);
        else reject(new Error("User not found"));
      }, 300);
    });
  },

  async updateUser(id: number, data: Partial<User>): Promise<User> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = users.findIndex((u) => u.id === id);
        if (index === -1) return reject(new Error("User not found"));

        users[index] = { ...users[index], ...data };
        resolve(users[index]);
      }, 300);
    });
  },
};
