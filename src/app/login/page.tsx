"use client";

import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { FaUserAlt, FaLock } from "react-icons/fa";
import router from "next/router";
import Link from "next/link";

export default function LoginPage() {
  const { handleLogin } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    try {
      await handleLogin({ username, password });
      alert("Login successful!");
      router.push("/dashboard");
    } catch (err: any) {
      alert(err.message || "Login failed");
    }
  }

  return (
    <div className="h-screen flex">
      {/* Left: image */}
      <div className="hidden md:flex w-1/2 bg-gradient-to-br from-indigo-500 to-red-500 items-center justify-center p-10">
        <img
          src="https://storage.googleapis.com/devitary-image-host.appspot.com/15848031292911696601-undraw_designer_life_w96d.svg"
          alt="Login Illustration"
        // className="w-4/5 h-auto rounded-lg shadow-lg"
        />
      </div>

      {/* Right: Login Form */}
      <div className="flex w-full md:w-1/2 items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 sm:p-10 space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
              Welcome Back
            </h1>
            <p className="mt-2 text-sm text-gray-600">
              Sign in to your account to continue
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

            {/* Error Message */}
            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#E61E4D] to-[#ff6a88] hover:opacity-90 text-white font-semibold py-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer"
            >
              Sign In
            </button>

            {/* Sign Up Link */}
            <p className="text-center text-sm text-gray-600">
              Don’t have an account?{" "}
              <Link
                href="/register"
                className="text-[#E61E4D] hover:text-[#ff6a88] font-medium transition"
              >
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
