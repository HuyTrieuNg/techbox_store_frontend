import React from "react";
import { useRouter } from "next/navigation";

interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  roles: string[];
  isActive: boolean;
}

interface UserTableProps {
  users: User[];
  loading: boolean;
  selectedRole: string;
  sortBy: string;
  sortDir: "asc" | "desc";
  handleSort: (field: string) => void;
  handleDeleteUser: (id: number, name: string) => void;
  handleRestoreUser: (id: number, name: string) => void;
  handleViewOrderHistory: (userId: number) => void;
  handleEditUser: (userId: number) => void;
}

export const UserTable: React.FC<UserTableProps> = ({
  users,
  loading,
  selectedRole,
  sortBy,
  sortDir,
  handleSort,
  handleDeleteUser,
  handleRestoreUser,
  handleViewOrderHistory,
  handleEditUser,
}) => {
  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
            <tr>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600"
                onClick={() => handleSort("id")}
              >
                ID {sortBy === "id" && (sortDir === "asc" ? "↑" : "↓")}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                Người dùng
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600"
                onClick={() => handleSort("email")}
              >
                Email {sortBy === "email" && (sortDir === "asc" ? "↑" : "↓")}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                Số điện thoại
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                Vai trò
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                Trạng thái
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                Thao tác
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
            {users.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  className="px-6 py-8 text-center text-gray-500 dark:text-gray-400"
                >
                  Không tìm thấy người dùng
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    #{user.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                        {user.firstName.charAt(0)}
                        {user.lastName.charAt(0)}
                      </div>
                      <div className="ml-4">
                        {selectedRole === "CUSTOMER" && user.isActive !== false ? (
                          <button
                            onClick={() => handleViewOrderHistory(user.id)}
                            className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300 hover:underline text-left"
                            title="Xem lịch sử mua hàng"
                          >
                            {user.firstName} {user.lastName}
                          </button>
                        ) : (
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {user.firstName} {user.lastName}
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {selectedRole === "CUSTOMER" && user.isActive !== false ? (
                      <button
                        onClick={() => handleViewOrderHistory(user.id)}
                        className="text-blue-600 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300 hover:underline"
                        title="Xem lịch sử mua hàng"
                      >
                        {user.email}
                      </button>
                    ) : (
                      user.email
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {user.phone}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex gap-1">
                      {user.roles?.map((role, idx) => (
                        <span
                          key={idx}
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            role.includes("ADMIN")
                              ? "bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200"
                              : role.includes("STAFF")
                              ? "bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200"
                              : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                          }`}
                        >
                          {role.replace("ROLE_", "")}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        user.isActive === false
                          ? "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200"
                          : "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200"
                      }`}
                    >
                      {user.isActive === false ? "Đã xóa" : "Hoạt động"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-3">
                      {selectedRole !== "ADMIN" && (
                        <button
                          onClick={() => handleEditUser(user.id)}
                          className="text-blue-600 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300"
                        >
                          Sửa
                        </button>
                      )}
                      {user.isActive === false ? (
                        <button
                          onClick={() => handleRestoreUser(user.id, `${user.firstName} ${user.lastName}`)}
                          className="text-green-600 dark:text-green-400 hover:text-green-900 dark:hover:text-green-300"
                        >
                          Khôi phục
                        </button>
                      ) : selectedRole === "ADMIN" ? (
                        <span className="text-gray-400 dark:text-gray-500">-</span>
                      ) : (
                        <button
                          onClick={() => handleDeleteUser(user.id, `${user.firstName} ${user.lastName}`)}
                          className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300"
                        >
                          Xóa
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};