"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaChevronRight, FaHome } from "react-icons/fa";

export default function CheckoutPage() {
    const [formData, setFormData] = useState({
        firstName: "",
        streetAddress: "",
        apartment: "",
        city: "",
        phone: "",
        email: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert("Order placed successfully!");
    };

    return (
        <>
            <div className="flex items-center text-gray-600 text-base mb-6">
                <FaHome className="mr-2 text-gray-500" />
                <Link href="/" className="hover:text-[#E61E4D] transition">
                    Trang chủ
                </Link>
                <FaChevronRight className="mx-2 text-gray-400" />
                <span className="font-medium text-gray-800">Thanh toán</span>
            </div>
            <div className="bg-white px-10 m-10 flex flex-col md:flex-row gap-10 justify-center">
                {/* Billing Details */}
                <form
                    onSubmit={handleSubmit}
                    className="flex-1 max-w-md bg-white rounded-lg"
                >
                    <h2 className="text-2xl font-semibold mb-6">Thông tin giao hàng</h2>

                    <div className="flex flex-col gap-5">
                        <div>
                            <label className="block text-sm text-gray-600 mb-1">
                                Họ và tên<span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                required
                                className="w-full border border-gray-300 rounded-md px-3 py-2 bg-gray-50 focus:outline-none focus:ring-1 focus:ring-[#E61E4D]"
                            />
                        </div>

                        <div>
                            <label className="block text-sm text-gray-600 mb-1">
                                Địa chỉ<span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="streetAddress"
                                value={formData.streetAddress}
                                onChange={handleChange}
                                required
                                className="w-full border border-gray-300 rounded-md px-3 py-2 bg-gray-50 focus:outline-none focus:ring-1 focus:ring-[#E61E4D]"
                            />
                        </div>

                        <div>
                            <label className="block text-sm text-gray-600 mb-1">
                                Số điện thoại<span className="text-red-500">*</span>
                            </label>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                                className="w-full border border-gray-300 rounded-md px-3 py-2 bg-gray-50 focus:outline-none focus:ring-1 focus:ring-[#E61E4D]"
                            />
                        </div>

                        <div>
                            <label className="block text-sm text-gray-600 mb-1">
                                Email<span className="text-red-500">*</span>
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full border border-gray-300 rounded-md px-3 py-2 bg-gray-50 focus:outline-none focus:ring-1 focus:ring-[#E61E4D]"
                            />
                        </div>
                    </div>
                </form>

                {/* Order Summary */}
                <div className="w-full md:w-[400px] border-t md:border-t-0 md:border-l border-gray-200 md:pl-8">
                    <div className="space-y-5">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <img
                                    src="https://product.hstatic.net/200000722513/product/ava_ded8eaa81f5f4850a4f6fea27adc83b2_master.png"
                                    alt="H1 Gamepad"
                                    width={50}
                                    height={50}
                                    className="rounded-md"
                                />
                                <p className="text-gray-700">H1 Gamepad</p>
                            </div>
                            <p className="text-gray-800 font-medium">$25000000</p>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <img
                                    src="https://product.hstatic.net/200000722513/product/ava_ded8eaa81f5f4850a4f6fea27adc83b2_master.png"
                                    alt="H1 Gamepad"
                                    width={50}
                                    height={50}
                                    className="rounded-md"
                                />
                                <p className="text-gray-700">H1 Gamepad</p>
                            </div>
                            <p className="text-gray-800 font-medium">$25000000</p>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <img
                                    src="https://product.hstatic.net/200000722513/product/ava_ded8eaa81f5f4850a4f6fea27adc83b2_master.png"
                                    alt="LCD Monitor"
                                    width={50}
                                    height={50}
                                    className="rounded-md"
                                />
                                <p className="text-gray-700">Laptop Lenovo IdeaPad Slim 3 14IRH10 83K00008VN</p>
                            </div>
                            <p className="text-gray-800 font-medium">25000000</p>
                        </div>

                        <hr className="border-gray-300" />

                        <div className="flex justify-between text-gray-700">
                            <span>Tạm tính:</span>
                            <span>25000000</span>
                        </div>
                        <div className="flex justify-between text-gray-700">
                            <span>Phí ship:</span>
                            <span className="text-green-600">Free</span>
                        </div>

                        <hr className="border-gray-300" />

                        <div className="flex justify-between text-lg font-semibold">
                            <span>Tổng cộng:</span>
                            <span>$50000000</span>
                        </div>

                        <button
                            type="submit"
                            onClick={handleSubmit}
                            className="mt-6 w-full bg-[#E61E4D] text-white font-bold py-3 rounded-lg hover:bg-[#d41b46ff] transition cursor-pointer"
                        >
                            Thanh toán
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
