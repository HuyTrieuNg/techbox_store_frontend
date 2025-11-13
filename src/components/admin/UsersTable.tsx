import { useUsers } from "@/hooks/useUsers";
import { UserService } from "@/services/admin/usersService";
import { Edit, Search, Trash, UserPlus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const UsersTable = () => {
    const router = useRouter();
    const [page, setPage] = useState(0);
    const { users, pagination, isLoading, refreshUsers } = useUsers(page, 10);

    if (isLoading) return <p>Đang tải...</p>;

    const handleEdit = (id: number) => {
        router.push(`/admin/users/${id}/edit`);
    };

    const handleDelete = async (id: number) => {
        if (!confirm(`Xóa user ${id}?`)) return;

        try {
            await UserService.deleteUser(id);
            refreshUsers();
            alert("Xóa thành công!");
        } catch (err) {
            alert("Xóa thất bại!");
        }
    };

    const getRoleColor = (roles: string) => {
        switch (roles) {
            case "ROLE_ADMIN":
                return "bg-purple-500/20 text-purple-400 border border-purple-500/30";
            case "ROLE_STAFF":
                return "bg-blue-500/20 text-blue-400 border border-blue-500/30";
            case "ROLE_CUSTOMER":
                return "bg-green-500/20 text-green-400 border border-green-500/30";
            default:
                return "bg-gray-500/20 text-gray-300 border border-gray-500/30";
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case "Active":
                return "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30";
            case "Inactive":
                return "bg-red-500/20 text-red-400 border border-red-500/30";
            default:
                return "bg-gray-500/20 text-gray-300 border border-gray-500/30";
        }
    };
    return (
        <div className="bg-[#1e1e1e] backdrop-blur-md shadow-lg rounded-xl p-4 sm:p-6 border border-[#1f1f1f] mx-2 sm:mx-0">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4 sm:gap-0">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-100 text-center sm:text-left">
                    Users
                </h2>

                {/* <div className="relative w-full sm:w-auto">
                    <input
                        type="text"
                        placeholder="Search users..."
                        className="bg-[#2f2f2f] text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-200 text-sm"
                    />
                    <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
                </div> */}
                <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
                    <div className="relative w-full sm:w-64">
                        <input
                            type="text"
                            placeholder="Search users..."
                            className="bg-[#2f2f2f] text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-200 text-sm"
                        />
                        <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
                    </div>

                    <button
                        className="flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded-lg shadow-md transition-all duration-200 text-sm font-medium cursor-pointer"
                        onClick={() => router.push("/admin/users/add")}
                    >
                        <UserPlus size={18} />
                        Add User
                    </button>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-700">
                    <thead>
                        <tr>
                            {["ID", "Name", "Email", "Phone", "Role", "Status", "Actions"].map((header) => (
                                <th key={header} className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider hidden sm:table-cell">
                                    {header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                        {users.map((user) => (
                            <tr key={user.id} className="flex flex-col sm:table-row sm:flex-row mb-4 sm:mb-0 border-b sm:border-b-0 bg-gray-700 sm:bg-transparent p-2 sm:p-0">
                                {/* Mobile view */}
                                <td className="sm:hidden px-3 py-2">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            <div className="ml-3">
                                                <div className="text-sm font-medium text-gray-100">{user.firstName}</div>
                                                <div className="text-xs text-gray-400">{user.email}</div>
                                            </div>
                                        </div>
                                        <div className="flex space-x-1 -mt-5 -mr-4">
                                            <button className="text-indigo-500 hover:text-indigo-300">
                                                <Edit size={16} />
                                            </button>
                                            <button className="text-red-500 hover:text-red-300">
                                                <Trash size={16} />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="mt-2 text-xs text-gray-300">
                                        <div>Phone: {user.phone}</div>
                                        <div>Role: {user.roles}</div>
                                    </div>
                                </td>

                                {/* Desktop view */}
                                <td className="hidden sm:table-cell px-6 py-4 whitespace-nowrap text-sm text-gray-300">{user.id}</td>
                                <td className="hidden sm:table-cell px-6 py-4 whitespace-nowrap text-sm text-gray-300">{user.lastName} {user.firstName} </td>
                                <td className="hidden sm:table-cell px-6 py-4 whitespace-nowrap text-sm text-gray-300">{user.email}</td>
                                <td className="hidden sm:table-cell px-6 py-4 whitespace-nowrap text-sm text-gray-300">{user.phone}</td>
                                <td className="hidden sm:table-cell px-6 py-4 whitespace-nowrap text-sm">
                                    <div className="gap-1">
                                        {user.roles.map((role) => (
                                            <span
                                                key={role}
                                                className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${getRoleColor(role)}`}
                                            >
                                                {role.replace("ROLE_", "")}
                                            </span>
                                        ))}
                                    </div>
                                </td>
                                <td className="hidden sm:table-cell px-6 py-4 whitespace-nowrap text-sm">
                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(user.isActive ? "Active" : "Inactive")}`}>
                                        {user.isActive ? "Active" : "Inactive"}
                                    </span>
                                </td>
                                {/* <td className="hidden sm:table-cell px-6 py-4 whitespace-nowrap text-sm text-gray-300">{user.createdAt}</td> */}
                                <td className="hidden sm:table-cell px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                    <div className="flex space-x-1 -ml-2">
                                        <button onClick={() => handleEdit(user.id)} className="text-indigo-500 hover:text-indigo-300 mr-1 cursor-pointer">
                                            <Edit size={18} />
                                        </button>
                                        <button onClick={() => handleDelete(user.id)} className="text-red-500 hover:text-red-300 cursor-pointer">
                                            <Trash size={18} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {pagination && pagination.totalPages > 1 && (
                    <div className="flex justify-center items-center gap-3 mt-6">
                        <button
                            onClick={() => setPage((p) => Math.max(p - 1, 0))}
                            disabled={page === 0}
                            className={`px-4 py-2 rounded-lg text-sm font-medium cursor-pointer ${page === 0
                                ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                                : "bg-gray-800 hover:bg-gray-700 text-white"
                                }`}
                        >
                            ← Previous
                        </button>

                        <span className="text-gray-300 text-sm">
                            Page <span className="font-semibold">{page + 1}</span> /{" "}
                            {pagination.totalPages}
                        </span>

                        <button
                            onClick={() =>
                                setPage((p) =>
                                    pagination && p + 1 < pagination.totalPages ? p + 1 : p
                                )
                            }
                            disabled={page + 1 >= pagination.totalPages}
                            className={`px-4 py-2 rounded-lg text-sm font-medium cursor-pointer ${page + 1 >= (pagination.totalPages ?? 1)
                                ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                                : "bg-gray-800 hover:bg-gray-700 text-white"
                                }`}
                        >
                            Next →
                        </button>
                    </div>
                )}
            </div>
        </div>
    );

};
export default UsersTable;