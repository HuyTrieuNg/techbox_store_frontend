// "use client";

// import { useState } from "react";
// import { FaEnvelope } from "react-icons/fa";
// import Link from "next/link";

// export default function ForgotPasswordPage() {
//   const [email, setEmail] = useState("");
//   const [sent, setSent] = useState(false);
//   const [loading, setLoading] = useState(false);

//   async function onSubmit(e: React.FormEvent) {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       // Tạm mock – sau này thay bằng API
//       await new Promise((resolve) => setTimeout(resolve, 1000));
//       setSent(true);
//     } catch (err) {
//       alert("Something went wrong, please try again.");
//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
//     <div className="h-screen flex">
//       {/* Left: Image */}
//       <div className="hidden md:flex w-1/2 bg-gradient-to-br from-indigo-500 to-red-500 items-center justify-center p-10">
//         <img
//           src="https://storage.googleapis.com/devitary-image-host.appspot.com/15848031292911696601-undraw_designer_life_w96d.svg"
//           alt="Forgot Password Illustration"
//         />
//       </div>

//       {/* Right: Form */}
//       <div className="flex w-full md:w-1/2 items-center justify-center p-6 sm:p-12">
//         <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 sm:p-10 space-y-8">
//           <div className="text-center">
//             <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
//               Forgot Password
//             </h1>
//             <p className="mt-2 text-sm text-gray-600">
//               Enter your email to reset your password
//             </p>
//           </div>

//           {!sent ? (
//             <form onSubmit={onSubmit} className="space-y-6">
//               <div className="relative">
//                 <div className="flex items-center border border-gray-300 rounded-xl px-4 py-3 focus-within:ring-2 focus-within:ring-[#ff6a88] transition">
//                   <FaEnvelope className="text-gray-400 mr-3" />
//                   <input
//                     type="email"
//                     placeholder="Enter your email"
//                     className="w-full text-gray-700 placeholder-gray-400 focus:outline-none"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     required
//                   />
//                 </div>
//               </div>

//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="w-full bg-gradient-to-r from-[#E61E4D] to-[#ff6a88] hover:opacity-90 text-white font-semibold py-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer"
//               >
//                 {loading ? "Sending..." : "Send OTP"}
//               </button>

//               <p className="text-center text-sm text-gray-600">
//                 Remember your password?{" "}
//                 <Link
//                   href="/login"
//                   className="text-[#E61E4D] hover:text-[#ff6a88] font-medium transition"
//                 >
//                   Back to Login
//                 </Link>
//               </p>
//             </form>
//           ) : (
//             <div className="text-center space-y-4">
//               <p className="text-green-600 font-medium">
//                 A reset link has been sent to <strong>{email}</strong>
//               </p>
//               <Link
//                 href="/login"
//                 className="text-[#E61E4D] hover:text-[#ff6a88] font-medium transition"
//               >
//                 Back to Login
//               </Link>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }
"use client";

import { useState } from "react";
import { FaEnvelope, FaLock, FaKey } from "react-icons/fa";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [step, setStep] = useState<"email" | "reset">("email");
  const [loading, setLoading] = useState(false);

  async function handleSendOtp(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      // Mock API gửi OTP
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setStep("reset"); // chuyển sang bước nhập OTP + mật khẩu mới
    } catch (err) {
      alert("Something went wrong, please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function handleResetPassword(e: React.FormEvent) {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    setLoading(true);
    try {
      // Mock API reset password
      await new Promise((resolve) => setTimeout(resolve, 1000));
      alert("Password reset successfully!");
      window.location.href = "/login";
    } catch (err) {
      alert("Failed to reset password.");
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
              Forgot Password
            </h1>
            <p className="mt-2 text-sm text-gray-600">
              {step === "email"
                ? "Enter your email to receive OTP"
                : "Enter OTP and set your new password"}
            </p>
          </div>

          {step === "email" ? (
            <form onSubmit={handleSendOtp} className="space-y-6">
              <div className="relative">
                <div className="flex items-center border border-gray-300 rounded-xl px-4 py-3 focus-within:ring-2 focus-within:ring-[#ff6a88] transition">
                  <FaEnvelope className="text-gray-400 mr-3" />
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full text-gray-700 placeholder-gray-400 focus:outline-none"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-[#E61E4D] to-[#ff6a88] hover:opacity-90 text-white font-semibold py-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer"
              >
                {loading ? "Sending..." : "Send OTP"}
              </button>

              <p className="text-center text-sm text-gray-600">
                Remember your password?{" "}
                <Link
                  href="/login"
                  className="text-[#E61E4D] hover:text-[#ff6a88] font-medium transition"
                >
                  Back to Login
                </Link>
              </p>
            </form>
          ) : (
            <form onSubmit={handleResetPassword} className="space-y-6">
              <div className="flex items-center border border-gray-300 rounded-xl px-4 py-3 focus-within:ring-2 focus-within:ring-[#ff6a88] transition">
                <FaKey className="text-gray-400 mr-3" />
                <input
                  type="text"
                  placeholder="Enter OTP"
                  className="w-full text-gray-700 placeholder-gray-400 focus:outline-none"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                />
              </div>

              <div className="flex items-center border border-gray-300 rounded-xl px-4 py-3 focus-within:ring-2 focus-within:ring-[#ff6a88] transition">
                <FaLock className="text-gray-400 mr-3" />
                <input
                  type="password"
                  placeholder="New Password"
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
                  placeholder="Confirm Password"
                  className="w-full text-gray-700 placeholder-gray-400 focus:outline-none"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-[#E61E4D] to-[#ff6a88] hover:opacity-90 text-white font-semibold py-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer"
              >
                {loading ? "Resetting..." : "Reset Password"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
