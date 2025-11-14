"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { UserService } from "@/services/admin/usersService";
import { UserCreateRequest } from "@/features/user";

const UserAddPage = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // Form state
    const [form, setForm] = useState<UserCreateRequest>({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        phone: "",
        dateOfBirth: new Date(),
        roles: [],
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        // Nếu là input date → convert sang Date object
        if (name === "dateOfBirth") {
            setForm((prev) => ({ ...prev, [name]: new Date(value) }));
        } else {
            setForm((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleRoleChange = (role: string, checked: boolean) => {
        setForm((prev) => ({
            ...prev,
            roles: checked
                ? [...prev.roles, role]
                : prev.roles.filter((r) => r !== role),
        }));
    };


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.email || !form.password || !form.firstName) {
            setError("Vui lòng điền đầy đủ thông tin bắt buộc");
            return;
        }

        setLoading(true);
        setError("");
        const payload = {
            ...form,
            dateOfBirth: form.dateOfBirth || new Date(),
        };
console.log("Payload gửi lên:", payload);
        try {
            await UserService.createUser(payload);
            alert("Tạo người dùng thành công!");
            router.push("/admin/users");
        } catch (err: any) {
            setError(err.response?.data?.message || "Tạo thất bại!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex-1 overflow-auto relative z-10">
            <div className="max-w-7xl lg:px-2">
                <div className="bg-[#1e1e1e] backdrop-blur-md shadow-lg rounded-xl p-4 sm:p-6 border border-[#1f1f1f] mx-2 sm:mx-0">

                    <h2 className="text-2xl font-semibold text-white mb-6">Tạo người dùng mới</h2>

                    {error && <p className="text-red-400 mb-4">{error}</p>}

                    <form onSubmit={handleSubmit} className="space-y-6">

                        {/* Thông tin cơ bản */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-gray-300 mb-1">Email *</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full p-2 rounded-md bg-gray-800 text-white border border-gray-700"
                                />
                            </div>

                            <div>
                                <label className="block text-gray-300 mb-1">Mật khẩu *</label>
                                <input
                                    type="password"
                                    name="password"
                                    value={form.password}
                                    onChange={handleChange}
                                    required
                                    className="w-full p-2 rounded-md bg-gray-800 text-white border border-gray-700"
                                />
                            </div>

                            <div>
                                <label className="block text-gray-300 mb-1">Họ *</label>
                                <input
                                    type="text"
                                    name="firstName"
                                    value={form.firstName}
                                    onChange={handleChange}
                                    required
                                    className="w-full p-2 rounded-md bg-gray-800 text-white border border-gray-700"
                                />
                            </div>

                            <div>
                                <label className="block text-gray-300 mb-1">Tên *</label>
                                <input
                                    type="text"
                                    name="lastName"
                                    value={form.lastName}
                                    onChange={handleChange}
                                    required
                                    className="w-full p-2 rounded-md bg-gray-800 text-white border border-gray-700"
                                />
                            </div>

                            <div>
                                <label className="block text-gray-300 mb-1">Số điện thoại</label>
                                <input
                                    type="text"
                                    name="phone"
                                    value={form.phone}
                                    onChange={handleChange}
                                    className="w-full p-2 rounded-md bg-gray-800 text-white border border-gray-700"
                                />
                            </div>

                            <div>
                                <label className="block text-gray-300 mb-1">Ngày sinh</label>
                                <input
                                    type="date"
                                    name="dateOfBirth"
                                    value={form.dateOfBirth ? form.dateOfBirth.toISOString().split("T")[0] : ""}
                                    onChange={handleChange}
                                    className="w-full p-2 rounded-md bg-gray-800 text-white border border-gray-700"
                                />
                            </div>
                        </div>

                        {/* Vai trò */}
                        <div>
                            <label className="block text-gray-300 mb-2">Vai trò</label>
                            <div className="space-y-2">
                                {["ROLE_CUSTOMER", "ROLE_STAFF", "ROLE_ADMIN"].map((role) => (
                                    <label key={role} className="flex items-center gap-2 text-gray-300">
                                        <input
                                            type="checkbox"
                                            checked={form.roles.includes(role)}
                                            onChange={(e) => handleRoleChange(role, e.target.checked)}
                                            className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded"
                                        />
                                        <span>{role.replace("ROLE_", "")}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Nút hành động */}
                        <div className="flex justify-end gap-3 mt-8">
                            <button
                                type="button"
                                onClick={() => router.back()}
                                className="px-4 py-2 rounded-md bg-gray-700 hover:bg-gray-600 text-gray-200"
                            >
                                Hủy
                            </button>
                            <button
                                type="submit"
                                disabled={loading}
                                className="px-4 py-2 rounded-md bg-green-600 hover:bg-green-500 text-white disabled:opacity-50"
                            >
                                {loading ? "Đang tạo..." : "Tạo người dùng"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UserAddPage;