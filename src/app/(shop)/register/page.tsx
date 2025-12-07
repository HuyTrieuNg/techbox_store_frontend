"use client";

import { useState } from "react";

import { FaUserAlt, FaLock, FaEnvelope, FaPhoneAlt } from "react-icons/fa";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuthContext } from "@/contexts/AuthContext";
import { toast } from "sonner";

export default function RegisterPage() {
    const { handleRegister } = useAuthContext();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phone, setPhone] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");
    const [phoneError, setPhoneError] = useState("");
    const router = useRouter();

    async function onSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError("");

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email) {
            setEmailError("Vui lòng nhập email");
            return;
        }
        if (!emailRegex.test(email)) {
            setEmailError("Email không hợp lệ. Vui lòng kiểm tra lại");
            return;
        }
        if (!phone) {
            setPhoneError("Vui lòng nhập số điện thoại");
            return;
        } else if (!/^\d{10,11}$/.test(phone)) {
            setPhoneError("Số điện thoại không hợp lệ (10-11 số)");
            return;
        }
        if (!password) {
            setPasswordError("Vui lòng nhập mật khẩu");
            return;
        }
        if (password.length < 6) {
            setPasswordError("Mật khẩu phải có ít nhất 6 ký tự");
            return;
        }
        if (password !== confirmPassword) {
            setConfirmPasswordError("Mật khẩu xác nhận không khớp. Vui lòng kiểm tra lại");
            return;
        }


        // try {
        //     const result = await handleRegister({ email, password, firstName, lastName, phone, roleNames: ["ROLE_CUSTOMER"] });
        //     alert("Register successful!");
        //     router.push("/login");
        // } catch (err: any) {
        //     alert(err.message || "Register failed");
        // }
        const result = await handleRegister({ email, password, firstName, lastName, phone, roleNames: ["ROLE_CUSTOMER"] });

        if (!result.success && result.error) {
            setEmailError(result.error);
            return;
        }
        toast.success("Đăng ký thành công!");
        router.push("/login");
    }

    return (
        <div className="min-h-screen flex">
            {/* Left: image */}
            <div className="hidden md:flex w-1/2 bg-gradient-to-br from-indigo-500 to-red-500 items-center justify-center p-10">
                <img
                    src="https://storage.googleapis.com/devitary-image-host.appspot.com/15848031292911696601-undraw_designer_life_w96d.svg"
                    alt="Register Illustration"
                />
            </div>

            {/* Right: register form */}
            <div className="flex w-full md:w-1/2 items-center justify-center p-6 sm:p-12">
                <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 sm:p-10 space-y-8">
                    <div className="text-center">
                        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                            Đăng ký
                        </h1>
                        <p className="mt-2 text-sm text-gray-600">
                            Tham gia cùng chúng tôi và bắt đầu hành trình của bạn
                        </p>
                    </div>

                    <form onSubmit={onSubmit} className="space-y-6">
                        {/* Email Input */}
                        <div className="relative">
                            <div className="flex items-center border border-gray-300 rounded-xl px-4 py-3 focus-within:ring-2 focus-within:ring-[#ff6a88] transition">
                                <FaEnvelope className="text-gray-400 mr-3" />
                                <input
                                    type="email"
                                    placeholder="Email"
                                    className="w-full text-gray-700 placeholder-gray-400 focus:outline-none"
                                    value={email}
                                    onChange={(e) => { setEmail(e.target.value), setEmailError("") }}
                                    required
                                />
                            </div>
                            {emailError && <p className="text-red-500 text-sm mt-2">{emailError}</p>}
                        </div>

                        <div className="relative">
                            <div className="flex items-center border border-gray-300 rounded-xl px-4 py-3 focus-within:ring-2 focus-within:ring-[#ff6a88] transition">
                                <FaUserAlt className="text-gray-400 mr-3" />
                                <input
                                    type="text"
                                    placeholder="Họ"
                                    className="w-full text-gray-700 placeholder-gray-400 focus:outline-none"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        {/* Firstname Input */}
                        <div className="relative">
                            <div className="flex items-center border border-gray-300 rounded-xl px-4 py-3 focus-within:ring-2 focus-within:ring-[#ff6a88] transition">
                                <FaUserAlt className="text-gray-400 mr-3" />
                                <input
                                    type="text"
                                    placeholder="Tên"
                                    className="w-full text-gray-700 placeholder-gray-400 focus:outline-none"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="relative">
                            <div className="flex items-center border border-gray-300 rounded-xl px-4 py-3 focus-within:ring-2 focus-within:ring-[#ff6a88] transition">
                                <FaPhoneAlt className="text-gray-400 mr-3" />
                                <input
                                    type="text"
                                    placeholder="Số điện thoại"
                                    className="w-full text-gray-700 placeholder-gray-400 focus:outline-none"
                                    value={phone}
                                    onChange={(e) => { setPhone(e.target.value); setPhoneError("") }}
                                    required
                                />
                            </div>
                            {phoneError && <p className="text-red-500 text-sm mt-2">{phoneError}</p>}
                        </div>

                        {/* Password Input */}
                        <div className="relative">
                            <div className="flex items-center border border-gray-300 rounded-xl px-4 py-3 focus-within:ring-2 focus-within:ring-[#ff6a88] transition">
                                <FaLock className="text-gray-400 mr-3" />
                                <input
                                    type="password"
                                    placeholder="Mật khẩu"
                                    className="w-full text-gray-700 placeholder-gray-400 focus:outline-none"
                                    value={password}
                                    onChange={(e) => { setPassword(e.target.value); setPasswordError(""); }}
                                    required
                                />
                            </div>
                            {passwordError && <p className="text-red-500 text-sm mt-2">{passwordError}</p>}
                        </div>
                        {/* Confirm password Input */}
                        <div className="relative">
                            <div className="flex items-center border border-gray-300 rounded-xl px-4 py-3 focus-within:ring-2 focus-within:ring-[#ff6a88] transition">
                                <FaLock className="text-gray-400 mr-3" />
                                <input
                                    type="password"
                                    placeholder="Xác nhận mật khẩu"
                                    className="w-full text-gray-700 placeholder-gray-400 focus:outline-none"
                                    value={confirmPassword}
                                    onChange={(e) => { setConfirmPassword(e.target.value); setConfirmPasswordError(""); }}
                                    required
                                />
                            </div>
                            {confirmPasswordError && <p className="text-red-500 text-sm mt-2">{confirmPasswordError}</p>}
                        </div>

                        {/* Error message */}
                        {error && (
                            <p className="text-red-500 text-sm text-center">{error}</p>
                        )}

                        {/* Signup Button */}
                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-[#E61E4D] to-[#ff6a88] hover:opacity-90 text-white font-semibold py-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer"
                        >
                            Đăng ký
                        </button>

                        {/* Forgot Password Link */}
                        <p className="text-sm text-center text-gray-600">
                            <Link
                                href="/forgot-password"
                                className="text-[#E61E4D] hover:text-[#ff6a88] font-medium transition"
                            >
                                Quên mật khẩu?
                            </Link>
                        </p>

                        {/* Login Link */}
                        <p className="text-sm text-center text-gray-500">
                            Bạn đã có tài khoản?{" "}
                            <Link href="/login" className="text-[#E61E4D] hover:text-[#ff6a88] font-medium transition">
                                Đăng nhập
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}