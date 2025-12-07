"use client";

import { useState, useEffect } from "react";
import { FaLock } from "react-icons/fa";
import { useSearchParams, useRouter } from "next/navigation";

export default function ResetPasswordPage() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [token, setToken] = useState("");

  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const tokenParam = searchParams.get("token");
    if (tokenParam) {
      setToken(tokenParam);
    } else {
      setMessage("Token không hợp lệ hoặc thiếu.");
    }
  }, [searchParams]);

  async function handleResetPassword(e: React.FormEvent) {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setMessage("Mật khẩu xác nhận không khớp!");
      return;
    }

    if (!token) {
      setMessage("Token không hợp lệ.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token, newPassword }),
      });

      if (response.ok) {
        setMessage("Mật khẩu đã được đặt lại thành công!");
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      } else {
        setMessage("Có lỗi xảy ra.");
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
          alt="Reset Password Illustration"
        />
      </div>

      {/* Right: Form */}
      <div className="flex w-full md:w-1/2 items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 sm:p-10 space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
              Đặt lại mật khẩu
            </h1>
            <p className="mt-2 text-sm text-gray-600">
              Nhập mật khẩu mới của bạn
            </p>
          </div>

          <form onSubmit={handleResetPassword} className="space-y-6">
            <div className="flex items-center border border-gray-300 rounded-xl px-4 py-3 focus-within:ring-2 focus-within:ring-[#ff6a88] transition">
              <FaLock className="text-gray-400 mr-3" />
              <input
                type="password"
                placeholder="Mật khẩu mới"
                className="w-full text-gray-700 placeholder-gray-400 focus:outline-none"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>

            <div className="flex items-center border border-gray-300 rounded-xl px-4 py-3 focus-within:ring-2 focus-within:ring-[#ff6a88] transition">
              <FaLock className="text-gray-400 mr-3" />
              <input
                type="password"
                placeholder="Xác nhận mật khẩu"
                className="w-full text-gray-700 placeholder-gray-400 focus:outline-none"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            {message && (
              <p className={`text-sm text-center ${message.includes("thành công") ? "text-green-600" : "text-red-600"}`}>
                {message}
              </p>
            )}

            <button
              type="submit"
              disabled={loading || !token}
              className="w-full bg-gradient-to-r from-[#E61E4D] to-[#ff6a88] hover:opacity-90 text-white font-semibold py-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer disabled:opacity-50"
            >
              {loading ? "Đang xử lý..." : "Đặt lại mật khẩu"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}