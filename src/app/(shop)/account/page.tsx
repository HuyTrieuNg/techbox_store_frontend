"use client";
import SidebarAccount from "@/components/SidebarAccount";
import { useUser } from "@/hooks/useUser";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaHome, FaChevronRight } from "react-icons/fa";

const isValidEmail = (email: string): boolean => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const isValidPhone = (phone: string): boolean => /^(0|\+84)[3|5|7|8|9][0-9]{8}$/.test(phone.replace(/\s/g, ""));
const isFutureDate = (date: string): boolean => date ? new Date(date) > new Date() : false;

export default function AccountPage() {
    // const [gender, setGender] = useState("Nam");
    const { user, loading, error, updateLoading, updateError, handleUpdateProfile } = useUser();
    const [formData, setFormData] = useState({
        email: user?.email || "",
        firstName: user?.firstName || "",
        lastName: user?.lastName || "",
        phone: user?.phone || "",
        // address: user?.address || "",
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
                // address: user.address || "",
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


        if (formData.phone.trim()) {
        const plainPhone = formData.phone.replace(/\s/g, "");

        if (!/^[0-9]+$/.test(plainPhone)) {
            errors.phone = "Số điện thoại chỉ được chứa ký tự số";
        } else if (plainPhone.length < 10 || plainPhone.length > 11) {
            errors.phone = "Số điện thoại phải có từ 10 đến 11 chữ số";
        } else if (!isValidPhone(formData.phone)) {
            errors.phone = "Số điện thoại không hợp lệ";
        }
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
        // if (result.success) {
        //     alert("Cập nhật thông tin thành công!");
        // } else {
        //     alert(result.error || "Cập nhật thất bại!");
        // }

        if (!result.success) {
            // Backend error → hiển thị dưới form
            setFieldErrors({ email: "Email này đã tồn tại." });
        }
    };
    if (loading) return <p>Đang tải thông tin...</p>;
    if (error) return <p className="text-red-500">{error}</p>;


    return (

        //   <div className="bg-white shadow-md rounded-md flex w-[1000px] overflow-hidden">
        <>
            <div className="flex items-center text-gray-600 text-base mb-6">
                <FaHome className="mr-2 text-gray-500" />
                <Link href="/" className="hover:text-[#E61E4D] transition">
                    Trang chủ
                </Link>
                <FaChevronRight className="mx-2 text-gray-400" />
                <span className="font-medium text-gray-800">Thông tin tài khoản</span>
            </div>
            <div className="grid grid-cols-4 gap-6 mb-10">
                {/* Sidebar */}
                <SidebarAccount />
                {/* Main content */}
                <main className="col-span-3 relative border border-gray-300 rounded-xl p-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">
                        Thông tin tài khoản
                    </h2>
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
                        <div className="flex items-center gap-4">
                            <label className="w-32 text-gray-700 font-medium text-right">
                                Email
                            </label>
                            <div className="flex-1">
                                <input
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none"
                                    readOnly
                                />
                                {/* <span className="ml-2 text-green-600 font-bold">✔</span> */}
                                {fieldErrors.email && (
                                    <p className="mt-1 text-xs text-red-500" data-testid="error-email">
                                        {fieldErrors.email}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Họ tên */}
                        <div className="flex items-center gap-4">
                            <label className="w-32 text-gray-700 font-medium text-right">
                                Họ
                            </label>
                            <div className="flex-1">
                                <input
                                    id="lastName"
                                    type="text"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleInputChange}
                                    className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-1 focus:ring-[#E61E4D]"
                                />
                                {fieldErrors.lastName && (
                                    <p className="mt-1 text-xs text-red-500" data-testid="error-lastName">
                                        {fieldErrors.lastName}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <label className="w-32 text-gray-700 font-medium text-right">
                                Tên
                            </label>
                            <div className="flex-1">
                                <input
                                    id="firstName"
                                    type="text"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleInputChange}
                                    className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-1 focus:ring-[#E61E4D]"
                                />
                                {fieldErrors.firstName && (
                                    <p className="mt-1 text-xs text-red-500" data-testid="error-firstName">
                                        {fieldErrors.firstName}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Giới tính */}
                        {/* <div className="flex items-center gap-4">
                            <label className="w-32 text-gray-700 font-medium text-right">
                                Giới tính
                            </label>
                            <div className="flex gap-6 flex-1">
                                <label className="flex items-center gap-2">
                                    <input
                                        type="radio"
                                        checked={gender === "Nam"}
                                        onChange={() => setGender("Nam")}
                                    />
                                    Nam
                                </label>
                                <label className="flex items-center gap-2">
                                    <input
                                        type="radio"
                                        checked={gender === "Nữ"}
                                        onChange={() => setGender("Nữ")}
                                    />
                                    Nữ
                                </label>
                            </div>
                        </div> */}

                        {/* Số điện thoại */}
                        <div className="flex items-center gap-4">
                            <label className="w-32 text-gray-700 font-medium text-right">
                                Số điện thoại
                            </label>
                            <div className="flex-1">
                                <input
                                    id="phone"
                                    type="text"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-1 focus:ring-[#E61E4D]"
                                />
                                {fieldErrors.phone && (
                                    <p className="mt-1 text-xs text-red-500" data-testid="error-phone">
                                        {fieldErrors.phone}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* <div className="flex items-center gap-4">
                            <label className="w-32 text-gray-700 font-medium text-right">
                                Địa chỉ
                            </label>
                            <div className="flex items-center gap-3 flex-1">
                                <input
                                    type="text"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleInputChange}
                                    className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-1 focus:ring-[#E61E4D]"
                                />
                            </div>
                        </div> */}


                        {/* Ngày sinh */}
                        <div className="flex items-center gap-4">
                            <label className="w-32 text-gray-700 font-medium text-right">Ngày sinh</label>
                            <div className="flex-1">
                                <input
                                    id="dateOfBirth"
                                    type="date"
                                    name="dateOfBirth"
                                    value={formData.dateOfBirth}
                                    onChange={handleInputChange}
                                    className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#E61E4D]"
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
                            {/* 8rem là w-32, +1rem là gap-4 */}
                            <button
                                id="update-btn"
                                type="submit"
                                disabled={updateLoading}
                                className={`bg-[#E61E4D] text-white px-6 py-2 rounded-md font-semibold hover:bg-[#c71a44] transition cursor-pointer ${updateLoading ? "opacity-50 cursor-not-allowed" : ""
                                    }`}
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