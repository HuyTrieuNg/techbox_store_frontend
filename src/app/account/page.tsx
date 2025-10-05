"use client";
import SidebarAccount from "@/components/SidebarAccount";
import Link from "next/link";
import { useState } from "react";
import { FaUser, FaMapMarkerAlt, FaBox, FaEye, FaSignOutAlt, FaHome, FaChevronRight } from "react-icons/fa";

export default function AccountPage() {
    const [gender, setGender] = useState("Nam");

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

                    <form className="space-y-6">
                        {/* Họ tên */}
                        <div className="flex items-center gap-4">
                            <label className="w-32 text-gray-700 font-medium text-right">
                                Họ và tên
                            </label>
                            <input
                                type="text"
                                defaultValue=""
                                className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#E61E4D]"
                            />
                        </div>

                        {/* Giới tính */}
                        <div className="flex items-center gap-4">
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
                        </div>

                        {/* Số điện thoại */}
                        <div className="flex items-center gap-4">
                            <label className="w-32 text-gray-700 font-medium text-right">
                                Số điện thoại
                            </label>
                            <div className="flex items-center gap-3 flex-1">
                                <input
                                    type="text"
                                    placeholder="Số điện thoại"
                                    className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-1 focus:ring-[#E61E4D]"
                                />
                            </div>
                        </div>

                        {/* Email */}
                        <div className="flex items-center gap-4">
                            <label className="w-32 text-gray-700 font-medium text-right">
                                Email
                            </label>
                            <div className="flex items-center flex-1">
                                <input
                                    type="email"
                                    defaultValue="abc@gmail.com"
                                    className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none"
                                    readOnly
                                />
                                <span className="ml-2 text-green-600 font-bold">✔</span>
                            </div>
                        </div>
                        {/* Ngày sinh */}
                        <div className="flex items-center gap-4">
                            <label className="w-32 text-gray-700 font-medium text-right">Ngày sinh</label>
                            <div className="flex items-center flex-1">
                                <input
                                    type="date"
                                    className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>

                        {/* Nút lưu */}
                        <div className="flex justify-start ml-[calc(8rem+1rem)]">
                            {/* 8rem là w-32, +1rem là gap-4 */}
                            <button
                                type="submit"
                                className="bg-[#E61E4D] text-white px-6 py-2 rounded-md font-semibold hover:bg-[#c71a44] transition"
                            >
                                LƯU THAY ĐỔI
                            </button>
                        </div>
                    </form>
                </main>
            </div>
        </>
    );
}