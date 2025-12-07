"use client";

import { useState } from "react";
import { FaLock, FaEnvelope } from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LoginResult, useAuthContext } from "@/contexts/AuthContext";
import { getRedirectPathByRole } from "@/utils/auth";

export default function LoginPage() {
  const { handleLogin } = useAuthContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");
  const router = useRouter();

  async function onSubmit(e: React.FormEvent) {
    // e.preventDefault();
    // setError("");
    // try {
    //   // 1. Login và lấy fresh user data
    //   const { user: freshUser } = await handleLogin({ email, password });

    //   console.log('[LoginPage] Fresh user from login:', freshUser);

    //   // 2. Get redirect path using helper function
    //   const redirectPath = getRedirectPathByRole(freshUser);

    //   console.log('[LoginPage] Redirecting to:', redirectPath);

    //   // 3. Redirect
    //   // Dùng window.location.href để force full reload
    //   // Tránh mount Shop Layout khi redirect sang Admin/Staff
    //   if (redirectPath.startsWith('/admin') || redirectPath.startsWith('/staff')) {
    //     window.location.href = redirectPath;
    //   } else {
    //     router.push(redirectPath);
    //   }
    // } catch (err: any) {
    //   setError(err.message || "Login failed");
    // }


    e.preventDefault();
    setError("");
    setEmailError("");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setEmailError("Vui lòng nhập email");
      return;
    }
    if (!emailRegex.test(email)) {
      setEmailError("Email không hợp lệ. Vui lòng kiểm tra lại");
      return;
    }

    if (!password) {
      setError("Vui lòng nhập mật khẩu");
      return;
    }
    if (password.length < 6) {
      setError("Mật khẩu phải có ít nhất 6 ký tự");
      return;
    }

    const result: LoginResult = await handleLogin({ email, password });

    if (result.error) {
      setError(result.error);
      return;
    }

    if (!result.user) {
      setError("Không thể lấy thông tin người dùng");
      return;
    }

    const redirectPath = getRedirectPathByRole(result.user);
    console.log('[LoginPage] Redirecting to:', redirectPath);

    if (redirectPath.startsWith('/admin') || redirectPath.startsWith('/staff')) {
      window.location.href = redirectPath;
    } else {
      router.push(redirectPath);
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
              Welcome
            </h1>
            <p className="mt-2 text-sm text-gray-600">
              Đăng nhập vào tài khoản của bạn để tiếp tục
            </p>
          </div>

          <form onSubmit={onSubmit} className="space-y-6">
            {/* Username Input */}
            <div className="relative">
              <div className="flex items-center border border-gray-300 rounded-xl px-4 py-3 focus-within:ring-2 focus-within:ring-[#ff6a88] transition">
                <FaEnvelope className="text-gray-400 mr-3" />
                <input
                  type="text"
                  placeholder="Email"
                  className="w-full text-gray-700 placeholder-gray-400 focus:outline-none"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setEmailError(""); }}
                  required
                />
              </div>
              {emailError && (
                <p className="text-red-500 text-sm mt-2">{emailError}</p>
              )}
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
                  onChange={(e) => { setPassword(e.target.value); setError(""); }}
                  required
                />
              </div>

              {error && (
                <p className="text-red-500 text-sm mt-2">{error}</p>
              )}
            </div>

            <p className="text-sm text-gray-600">
              <Link
                href="/forgot-password"
                className="text-[#E61E4D] hover:text-[#ff6a88] font-medium transition"
              >
                Quên mật khẩu?
              </Link>
            </p>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#E61E4D] to-[#ff6a88] hover:opacity-90 text-white font-semibold py-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer"
            >
              Đăng nhập
            </button>

            {/* Sign Up Link */}
            <p className="text-center text-sm text-gray-600">
              Bạn chưa có tài khoản?{" "}
              <Link
                href="/register"
                className="text-[#E61E4D] hover:text-[#ff6a88] font-medium transition"
              >
                Đăng ký ngay
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
