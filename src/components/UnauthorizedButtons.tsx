"use client";

import { useAuthContext } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

/**
 * Client Component: Interactive buttons cho unauthorized page
 * 
 * Tách riêng để trang unauthorized có thể là RSC
 */
export default function UnauthorizedButtons() {
  const { user, getDefaultRedirectPath } = useAuthContext();
  const router = useRouter();

  const handleGoHome = () => {
    // Redirect về trang chủ phù hợp với role
    const homePath = getDefaultRedirectPath();
    router.push(homePath);
  };

  return (
    <div className="space-x-4">
      <button
        onClick={handleGoHome}
        className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        Về trang chủ
      </button>
      {user && (
        <button
          onClick={() => router.push('/account')}
          className="inline-block px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
        >
          Tài khoản của tôi
        </button>
      )}
    </div>
  );
}
