"use client";

import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { FaUserAlt, FaLock, FaEnvelope } from "react-icons/fa";
import router from "next/router";
import Link from "next/link";

export default function RegisterPage() {
    const { handleRegister } = useAuth();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    async function onSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError("");
        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        try {
            await handleRegister({ username, email, password });
            alert("Register successful!");
            router.push("/login");
        } catch (err: any) {
            alert(err.message || "Register failed");
        }
    }

    return (
        <div className="h-screen flex">
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
                            Create Account
                        </h1>
                        <p className="mt-2 text-sm text-gray-600">
                            Join us and start your journey
                        </p>
                    </div>

                    <form onSubmit={onSubmit} className="space-y-6">
                        {/* Username Input */}
                        <div className="relative">
                            <div className="flex items-center border border-gray-300 rounded-xl px-4 py-3 focus-within:ring-2 focus-within:ring-[#ff6a88] transition">
                                <FaUserAlt className="text-gray-400 mr-3" />
                                <input
                                    type="text"
                                    placeholder="Username"
                                    className="w-full text-gray-700 placeholder-gray-400 focus:outline-none"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        {/* Email Input */}
                        <div className="relative">
                            <div className="flex items-center border border-gray-300 rounded-xl px-4 py-3 focus-within:ring-2 focus-within:ring-[#ff6a88] transition">
                                <FaEnvelope className="text-gray-400 mr-3" />
                                <input
                                    type="email"
                                    placeholder="Email"
                                    className="w-full text-gray-700 placeholder-gray-400 focus:outline-none"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        {/* Password Input */}
                        <div className="relative">
                            <div className="flex items-center border border-gray-300 rounded-xl px-4 py-3 focus-within:ring-2 focus-within:ring-[#ff6a88] transition">
                                <FaLock className="text-gray-400 mr-3" />
                                <input
                                    type="password"
                                    placeholder="Password"
                                    className="w-full text-gray-700 placeholder-gray-400 focus:outline-none"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        {/* Confirm password Input */}
                        <div className="relative">
                            <div className="flex items-center border border-gray-300 rounded-xl px-4 py-3 focus-within:ring-2 focus-within:ring-[#ff6a88] transition">
                                <FaLock className="text-gray-400 mr-3" />
                                <input
                                    type="password"
                                    placeholder="Confirm Password"
                                    className="w-full text-gray-700 placeholder-gray-400 focus:outline-none"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                />
                            </div>
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
                            Register
                        </button>

                        {/* Login Link */}
                        <p className="text-sm text-center text-gray-500">
                            Already have an account?{" "}
                            <Link href="/login" className="text-[#E61E4D] hover:text-[#ff6a88] font-medium transition">
                                Login
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}