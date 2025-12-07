"use client";

import { useState } from "react";
import { FaEnvelope } from "react-icons/fa";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSendEmail(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Email đã được gửi! Vui lòng kiểm tra hộp thư của bạn.");
      } else {
        setMessage(data.error || "Có lỗi xảy ra.");
      }
    } catch (err) {
      setMessage("Có lỗi xảy ra, vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="h-screen flex">
      {/* Left: Image */}
      <div className="hidden md:flex w-1/2 bg-gradient-to-br from-indigo-500 to-red-500 items-center justify-center p-10">
        <img
          src="https://storage.googleapis.com/devitary-image-host.appspot.com/15848031292911696601-undraw_designer_life_w96d.svg"
          alt="Forgot Password Illustration"
        />
      </div>

      {/* Right: Form */}
      <div className="flex w-full md:w-1/2 items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 sm:p-10 space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
              Quên mật khẩu
            </h1>
            <p className="mt-2 text-sm text-gray-600">
              Nhập email của bạn để nhận liên kết đặt lại mật khẩu
            </p>
          </div>

          <form onSubmit={handleSendEmail} className="space-y-6">
            <div className="relative">
              <div className="flex items-center border border-gray-300 rounded-xl px-4 py-3 focus-within:ring-2 focus-within:ring-[#ff6a88] transition">
                <FaEnvelope className="text-gray-400 mr-3" />
                <input
                  type="email"
                  placeholder="Nhập email của bạn"
                  className="w-full text-gray-700 placeholder-gray-400 focus:outline-none"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            {message && (
              <p className={`text-sm text-center ${message.includes("thành công") ? "text-green-600" : "text-red-600"}`}>
                {message}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-[#E61E4D] to-[#ff6a88] hover:opacity-90 text-white font-semibold py-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer"
            >
              {loading ? "Đang gửi..." : "Gửi liên kết đặt lại mật khẩu"}
            </button>

            <p className="text-center text-sm text-gray-600">
              Nhớ mật khẩu của bạn?{" "}
              <Link
                href="/login"
                className="text-[#E61E4D] hover:text-[#ff6a88] font-medium transition"
              >
                Trở lại đăng nhập
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}