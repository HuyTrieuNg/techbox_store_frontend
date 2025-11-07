"use client";

import { useRouter } from "next/navigation";

/**
 * Client Component: Interactive button cho unauthorized page
 * 
 * Chỉ có nút "Quay lại" để back về trang trước
 */
export default function UnauthorizedButtons() {
  const router = useRouter();

  const handleGoBack = () => {
    // Quay về trang trước
    router.back();
  };

  return (
    <button
      onClick={handleGoBack}
      className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
    >
      ← Quay lại trang trước
    </button>
  );
}
