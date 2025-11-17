"use client";

import { useAuthContext } from "@/contexts/AuthContext";
import Link from "next/link";
import { useState } from "react";
import { FaUser, FaChevronDown, FaSignOutAlt, FaBox, FaMapMarkerAlt } from "react-icons/fa";
import { useRouter } from "next/navigation";

export default function AccountMenu() {
    const { user, handleLogout } = useAuthContext();
    const [isAccountOpen, setIsAccountOpen] = useState(false);
    const toggleAccount = () => setIsAccountOpen(!isAccountOpen);
    const isLoggedIn = !!user;
    const router = useRouter();

    return (
        <>
            {!isLoggedIn ? (
                <Link href="/login">
                    <button className="flex items-center gap-1 bg-[#E61E4D] text-white px-4 py-2 rounded-full hover:bg-[#d41b46ff] transition-colors duration-200 cursor-pointer">
                        <FaUser /> Đăng nhập
                        
                    </button>
                </Link>
            ) : (
                <div
                    className="relative"
                >
                    <button
                        onClick={toggleAccount}
                        className="flex items-center gap-2 bg-[#E61E4D] text-white px-4 py-2 rounded-full hover:bg-[#d41b46ff] transition-colors duration-200 cursor-pointer"
                    >
                        <FaUser /> {user.firstName}
                        <FaChevronDown
                            size={12}
                            className={`transition-transform duration-200 ${isAccountOpen ? "rotate-180" : ""
                                }`}
                        />
                    </button>

                    {/* Dropdown menu */}
                    {isAccountOpen && (
                        <div className="absolute right-0 mt-2 w-60 bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-300 dark:border-gray-600 py-2 z-50">
                            <Link
                                href="/account"
                                className="w-full text-left px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
                                onClick={() => setIsAccountOpen(false)}
                            >
                                <FaUser /> Thông tin tài khoản
                            </Link>
                            <Link
                                href="/account/address"
                                className="w-full text-left px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
                                onClick={() => setIsAccountOpen(false)}
                            >
                                <FaMapMarkerAlt /> Sổ địa chỉ
                            </Link>
                            <Link
                                href="/account/orders"
                                className="w-full text-left px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
                                onClick={() => setIsAccountOpen(false)}
                            >
                                <FaBox /> Quản lý đơn hàng
                            </Link>
                            <button
                                onClick={() => {
                                    handleLogout();
                                    setIsAccountOpen(false);
                                    router.push("/");
                                }}
                                className="w-full text-left px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2 cursor-pointer"
                            >
                                <FaSignOutAlt /> Đăng xuất
                            </button>
                        </div>
                    )}
                </div>
            )}
        </>
    );
}
