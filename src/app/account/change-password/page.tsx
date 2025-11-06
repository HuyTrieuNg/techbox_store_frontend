"use client";
import SidebarAccount from "@/components/SidebarAccount";
import { useUser } from "@/hooks/useUser";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaHome, FaChevronRight } from "react-icons/fa";

export default function ChangePasswordPage() {
    const { user, loading, error, updateLoading, updateError, handleUpdatePassword } = useUser();
    const [formData, setFormData] = useState({
        email: user?.email || "",
        password: "",
        newPassword: "",
        confirmNewPassword: "",
    });
    const [formErrors, setFormErrors] = useState({
        password: "",
        newPassword: "",
        confirmNewPassword: "",
    });

    useEffect(() => {
        if (user) {
            setFormData((prev) => ({
                ...prev,
                email: user.email || "",
            }));
        }
    }, [user]);

    const validateForm = () => {
        let isValid = true;
        const errors = {
            password: "",
            newPassword: "",
            confirmNewPassword: "",
        };

        if (!formData.password) {
            errors.password = "Vui lòng nhập mật khẩu cũ";
            isValid = false;
        }

        if (formData.newPassword.length < 8) {
            errors.newPassword = "Mật khẩu mới phải có ít nhất 8 ký tự";
            isValid = false;
        }

        if (formData.newPassword !== formData.confirmNewPassword) {
            errors.confirmNewPassword = "Mật khẩu xác nhận không khớp";
            isValid = false;
        }

        setFormErrors(errors);
        return isValid;
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        // Clear error when user starts typing
        setFormErrors((prev) => ({ ...prev, [name]: "" }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }

        const result = await handleUpdatePassword({
            email: formData.email,
            password: formData.password,
            newPassword: formData.newPassword,
        });

        if (result.success) {
            alert("Cập nhật mật khẩu thành công!");
            setFormData({
                ...formData,
                password: "",
                newPassword: "",
                confirmNewPassword: "",
            });
        } else {
            alert(result.error || "Cập nhật thất bại!");
        }
    };

    if (loading) return <div className="flex justify-center items-center h-64">Đang tải thông tin...</div>;
    if (error) return <p className="text-red-500 text-center py-4">{error}</p>;

    return (
        <>
            <div className="flex items-center text-gray-600 text-base mb-6">
                <FaHome className="mr-2 text-gray-500" />
                <Link href="/" className="hover:text-[#E61E4D] transition">
                    Trang chủ
                </Link>
                <FaChevronRight className="mx-2 text-gray-400" />
                <span className="font-medium text-gray-800">Đặt lại mật khẩu</span>
            </div>
            <div className="grid grid-cols-4 gap-6 mb-10">
                <SidebarAccount />
                <main className="col-span-3 relative border border-gray-300 rounded-xl p-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">
                        Đặt lại mật khẩu
                    </h2>
                    {updateError && (
                        <p className="text-red-500 bg-red-50 p-3 rounded-md mb-6">
                            {updateError}
                        </p>
                    )}
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                            <label className="w-full sm:w-32 text-gray-700 font-medium sm:text-right">
                                Email
                            </label>
                            <div className="flex-1">
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    className="w-full border border-gray-300 rounded-md px-3 py-2 bg-gray-100 cursor-not-allowed"
                                    readOnly
                                />
                            </div>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                            <label className="w-full sm:w-32 text-gray-700 font-medium sm:text-right">
                                Mật khẩu cũ
                            </label>
                            <div className="flex-1">
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    className={`w-full border ${formErrors.password ? 'border-red-500' : 'border-gray-300'} rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#E61E4D]`}
                                />
                                {formErrors.password && (
                                    <p className="text-red-500 text-sm mt-1">{formErrors.password}</p>
                                )}
                            </div>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                            <label className="w-full sm:w-32 text-gray-700 font-medium sm:text-right">
                                Mật khẩu mới
                            </label>
                            <div className="flex-1">
                                <input
                                    type="password"
                                    name="newPassword"
                                    value={formData.newPassword}
                                    onChange={handleInputChange}
                                    className={`w-full border ${formErrors.newPassword ? 'border-red-500' : 'border-gray-300'} rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#E61E4D]`}
                                />
                                {formErrors.newPassword && (
                                    <p className="text-red-500 text-sm mt-1">{formErrors.newPassword}</p>
                                )}
                            </div>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                            <label className="w-full sm:w-32 text-gray-700 font-medium sm:text-right">
                                Nhập lại mật khẩu mới
                            </label>
                            <div className="flex-1">
                                <input
                                    type="password"
                                    name="confirmNewPassword"
                                    value={formData.confirmNewPassword}
                                    onChange={handleInputChange}
                                    className={`w-full border ${formErrors.confirmNewPassword ? 'border-red-500' : 'border-gray-300'} rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#E61E4D]`}
                                />
                                {formErrors.confirmNewPassword && (
                                    <p className="text-red-500 text-sm mt-1">{formErrors.confirmNewPassword}</p>
                                )}
                            </div>
                        </div>
                        <div className="flex justify-start sm:ml-[calc(8rem+1rem)]">
                            <button
                                type="submit"
                                disabled={updateLoading}
                                className={`bg-[#E61E4D] text-white px-6 py-2 rounded-md font-semibold hover:bg-[#c71a44] transition-colors duration-200 ${updateLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                            >
                                {updateLoading ? "Đang lưu..." : "LƯU THAY ĐỔI"}
                            </button>
                        </div>
                    </form>
                </main>
            </div>
        </>
    );
}