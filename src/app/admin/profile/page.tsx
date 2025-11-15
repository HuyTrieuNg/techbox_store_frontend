"use client";
import { useUser } from "@/hooks/useUser";
import { useEffect, useState } from "react";

const isValidEmail = (email: string): boolean => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const isValidPhone = (phone: string): boolean => /^(0|\+84)[3|5|7|8|9][0-9]{8}$/.test(phone.replace(/\s/g, ""));
const isFutureDate = (date: string): boolean => date ? new Date(date) > new Date() : false;

export default function AdminProfilePage() {
    const { user, loading, error, updateLoading, updateError, handleUpdateProfile } = useUser();
    const [formData, setFormData] = useState({
        email: user?.email || "",
        firstName: user?.firstName || "",
        lastName: user?.lastName || "",
        phone: user?.phone || "",
        dateOfBirth: user?.dateOfBirth
            ? new Date(user.dateOfBirth).toISOString().split("T")[0]
            : "",
    });

    const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

    useEffect(() => {
        if (user) {
            setFormData({
                email: user.email || "",
                firstName: user.firstName || "",
                lastName: user.lastName || "",
                phone: user.phone || "",
                dateOfBirth: user.dateOfBirth
                    ? new Date(user.dateOfBirth).toISOString().split("T")[0]
                    : "",
            });
            setFieldErrors({});
        }
    }, [user]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));

        if (fieldErrors[name]) {
            setFieldErrors((prev) => {
                const newErrors = { ...prev };
                delete newErrors[name];
                return newErrors;
            });
        }
    };

    const validateForm = (): boolean => {
        const errors: Record<string, string> = {};

        if (!formData.email.trim()) {
            errors.email = "Email là bắt buộc";
        } else if (!isValidEmail(formData.email)) {
            errors.email = "Email không hợp lệ";
        } else if (formData.email.length < 6 || formData.email.length > 32) {
            errors.email = "Email phải có độ dài từ 6 đến 32 ký tự";
        }

        const nameRegex = /^[A-Za-zÀ-ỹ\s]+$/u;
        if (!formData.firstName.trim()) {
            errors.firstName = "Tên là bắt buộc";
        } else if (!nameRegex.test(formData.firstName)) {
            errors.firstName = "Tên không được chứa số hoặc ký tự đặc biệt";
        } else if (formData.firstName.length > 30) {
            errors.firstName = "Tên phải có độ dài nhỏ hơn hoặc bằng 30 ký tự";
        }

        if (!formData.lastName.trim()) {
            errors.lastName = "Họ là bắt buộc";
        } else if (!nameRegex.test(formData.lastName)) {
            errors.lastName = "Họ không được chứa số hoặc ký tự đặc biệt";
        } else if (formData.lastName.length > 30) {
            errors.lastName = "Họ phải có độ dài nhỏ hơn hoặc bằng 30 ký tự";
        }

        const plainPhone = formData.phone.replace(/\s/g, "");
        if (!formData.phone.trim()) {
            errors.phone = "Số điện thoại là bắt buộc";
        } else if (!/^[0-9]+$/.test(plainPhone)) {
            errors.phone = "Số điện thoại chỉ được chứa ký tự số";
        } else if (plainPhone.length < 10 || plainPhone.length > 11) {
            errors.phone = "Số điện thoại phải có từ 10 đến 11 chữ số";
        } else if (!isValidPhone(formData.phone)) {
            errors.phone = "Số điện thoại không hợp lệ";
        }

        if (formData.dateOfBirth && isFutureDate(formData.dateOfBirth)) {
            errors.dateOfBirth = "Ngày sinh không được là tương lai";
        }

        setFieldErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setFieldErrors({});

        // Validate trước khi gửi
        if (!validateForm()) {
            return;
        }

        const updatedFormData = {
            ...formData,
            dateOfBirth: formData.dateOfBirth ? new Date(formData.dateOfBirth) : undefined,
        };
        const result = await handleUpdateProfile(updatedFormData);

        if (!result.success) {
            // Backend error → hiển thị dưới form
            setFieldErrors({ email: "Email này đã tồn tại." });
        }
    };

    if (loading) return <p className="p-8">Đang tải thông tin...</p>;
    if (error) return <p className="text-red-500 p-8">{error}</p>;

    return (
        <div className="p-8 bg-white dark:bg-gray-900 min-h-screen">
            <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Hồ sơ cá nhân</h1>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-8 max-w-3xl">
                {/* Backend error */}
                {updateError && (
                    <p className="text-red-500 mb-4" data-testid="update-error">
                        {updateError}
                    </p>
                )}

                {/* Submit error từ client */}
                {fieldErrors.submit && (
                    <p className="text-red-500 mb-4" data-testid="submit-error">
                        {fieldErrors.submit}
                    </p>
                )}

                <form className="space-y-6" onSubmit={handleSubmit}>
                    {/* Email */}
                    <div className="flex items-start gap-4">
                        <label className="w-32 text-gray-700 dark:text-gray-300 font-medium text-right pt-2">
                            Email
                        </label>
                        <div className="flex-1">
                            <input
                                id="email"
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className="border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            />
                            {fieldErrors.email && (
                                <p className="mt-1 text-xs text-red-500" data-testid="error-email">
                                    {fieldErrors.email}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Họ */}
                    <div className="flex items-start gap-4">
                        <label className="w-32 text-gray-700 dark:text-gray-300 font-medium text-right pt-2">
                            Họ
                        </label>
                        <div className="flex-1">
                            <input
                                id="lastName"
                                type="text"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleInputChange}
                                className="border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            />
                            {fieldErrors.lastName && (
                                <p className="mt-1 text-xs text-red-500" data-testid="error-lastName">
                                    {fieldErrors.lastName}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Tên */}
                    <div className="flex items-start gap-4">
                        <label className="w-32 text-gray-700 dark:text-gray-300 font-medium text-right pt-2">
                            Tên
                        </label>
                        <div className="flex-1">
                            <input
                                id="firstName"
                                type="text"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleInputChange}
                                className="border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            />
                            {fieldErrors.firstName && (
                                <p className="mt-1 text-xs text-red-500" data-testid="error-firstName">
                                    {fieldErrors.firstName}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Số điện thoại */}
                    <div className="flex items-start gap-4">
                        <label className="w-32 text-gray-700 dark:text-gray-300 font-medium text-right pt-2">
                            Số điện thoại
                        </label>
                        <div className="flex-1">
                            <input
                                id="phone"
                                type="text"
                                name="phone"
                                value={formData.phone}
                                onChange={handleInputChange}
                                className="border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            />
                            {fieldErrors.phone && (
                                <p className="mt-1 text-xs text-red-500" data-testid="error-phone">
                                    {fieldErrors.phone}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Ngày sinh */}
                    <div className="flex items-start gap-4">
                        <label className="w-32 text-gray-700 dark:text-gray-300 font-medium text-right pt-2">
                            Ngày sinh
                        </label>
                        <div className="flex-1">
                            <input
                                id="dateOfBirth"
                                type="date"
                                name="dateOfBirth"
                                value={formData.dateOfBirth}
                                onChange={handleInputChange}
                                className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            />
                            {fieldErrors.dateOfBirth && (
                                <p className="mt-1 text-xs text-red-500" data-testid="error-dateOfBirth">
                                    {fieldErrors.dateOfBirth}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Nút lưu */}
                    <div className="flex justify-start ml-[calc(8rem+1rem)]">
                        <button
                            id="update-btn"
                            type="submit"
                            disabled={updateLoading}
                            className={`bg-blue-600 text-white px-6 py-2 rounded-md font-semibold hover:bg-blue-700 transition cursor-pointer ${
                                updateLoading ? "opacity-50 cursor-not-allowed" : ""
                            }`}
                        >
                            {updateLoading ? "Đang lưu..." : "LƯU THAY ĐỔI"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
