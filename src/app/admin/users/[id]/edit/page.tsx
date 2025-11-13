"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { User } from "@/features/user";
import { UserService } from "@/services/admin/usersService";

const UserEditPage = () => {
  const { id } = useParams(); // lấy id từ URL
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);


  useEffect(() => {
    if (!id) return;
    const fetchUser = async () => {
      try {
        const data = await UserService.getUserById(Number(id));
        setUser(data);
      } catch (error) {
        console.error("Lỗi khi tải user:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!user) return;
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };


  const handleSave = async () => {
    if (!user) return;
    setSaving(true);
    try {
      const payload: any = {
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
        isActive: user.isActive,
        roles: user.roles, // Gửi nguyên mảng
      };

      if (user.dateOfBirth) {
        payload.dateOfBirth = new Date(user.dateOfBirth);
      }

      await UserService.updateUser(Number(id), payload);

      alert("Cập nhật thành công!");
      router.push("/admin/users");
    } catch (error: any) {
      console.error("Lỗi:", error);
      alert(error.response?.data?.message || "Cập nhật thất bại!");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="text-gray-400">Đang tải dữ liệu...</p>;
  if (!user) return <p className="text-red-400">Không tìm thấy user!</p>;

  return (
    <div className="flex-1 overflow-auto relative z-10">
      <div className="max-w-7xl lg:px-2">
        <div className="bg-[#1e1e1e] backdrop-blur-md shadow-lg rounded-xl p-4 sm:p-6 border border-[#1f1f1f] mx-2 sm:mx-0">


          <h2 className="text-2xl font-semibold text-white mb-6">Chỉnh sửa người dùng</h2>

          <div className="space-y-4">
            <div>
              <label className="block text-gray-300 mb-1">Email</label>
              <input
                type="text"
                value={user.email}
                disabled
                className="w-full p-2 rounded-md bg-gray-700 text-gray-400 border border-gray-600"
              />
            </div>

            <div>
              <label className="block text-gray-300 mb-1">First Name</label>
              <input
                name="firstName"
                type="text"
                value={user.firstName ?? ""}
                onChange={handleChange}
                className="w-full p-2 rounded-md bg-gray-800 text-white border border-gray-700"
              />
            </div>

            <div>
              <label className="block text-gray-300 mb-1">Last Name</label>
              <input
                name="lastName"
                type="text"
                value={user.lastName ?? ""}
                onChange={handleChange}
                className="w-full p-2 rounded-md bg-gray-800 text-white border border-gray-700"
              />
            </div>

            <div>
              <label className="block text-gray-300 mb-1">Phone</label>
              <input
                name="phone"
                type="text"
                value={user.phone ?? ""}
                onChange={handleChange}
                className="w-full p-2 rounded-md bg-gray-800 text-white border border-gray-700"
              />
            </div>

            <div>
              <label className="block text-gray-300 mb-1">Date of Birth</label>
              <input
                name="dateOfBirth"
                type="date"
                value={user?.dateOfBirth
                  ? new Date(user.dateOfBirth).toISOString().split("T")[0]
                  : ""}
                onChange={handleChange}
                className="w-full p-2 rounded-md bg-gray-800 text-white border border-gray-700"
              />
            </div>

            <div className="flex items-center gap-2">
              <label className="text-gray-300">Active</label>
              <input
                type="checkbox"
                checked={user.isActive}
                onChange={(e) => setUser({ ...user, isActive: e.target.checked })}
              />
            </div>

            <div>
              <label className="block text-gray-300 mb-2">Roles</label>
              <div className="space-y-2">
                {["ROLE_CUSTOMER", "ROLE_STAFF", "ROLE_ADMIN"].map((role) => (
                  <label key={role} className="flex items-center gap-2 text-gray-300">
                    <input
                      type="checkbox"
                      checked={user.roles.includes(role)}
                      onChange={(e) => {
                        const checked = e.target.checked;
                        setUser({
                          ...user,
                          roles: checked
                            ? [...user.roles, role] // Thêm role
                            : user.roles.filter((r) => r !== role), // Xóa role
                        });
                      }}
                      className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
                    />
                    <span>
                      {role === "ROLE_CUSTOMER"
                        ? "Customer"
                        : role === "ROLE_STAFF"
                          ? "Staff"
                          : "Admin"}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <button
                onClick={() => router.back()}
                className="px-4 py-2 rounded-md bg-gray-700 hover:bg-gray-600 text-gray-200 mr-3"
              >
                Hủy
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-500 text-white disabled:opacity-50"
              >
                {saving ? "Đang lưu..." : "Lưu thay đổi"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserEditPage;
