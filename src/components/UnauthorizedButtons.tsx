"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/UI/button";
import { useAuthContext } from "@/contexts/AuthContext";

/**
 * Client Component: Interactive buttons cho unauthorized page
 * 
 * - Luôn hiển thị nút "Quay lại"
 * - Hiển thị nút "Đăng nhập" nếu chưa đăng nhập
 * - Hiển thị nút "Đăng xuất" nếu đã đăng nhập
 */
export default function UnauthorizedButtons() {
  const router = useRouter();
  const { user, isLoading, handleLogout } = useAuthContext();

  const handleGoBack = () => router.back();
  const handleLogin = () => router.push('/login');
  const handleLogoutClick = async () => {
    await handleLogout();
    router.push('/login');
  };

  return (
    <div className="flex items-center justify-center gap-3 flex-wrap">
      <Button variant="outline" onClick={handleGoBack}>← Quay lại</Button>
      {!isLoading && !user && (
        <Button onClick={handleLogin}>Đăng nhập</Button>
      )}
      {!isLoading && user && (
        <Button variant="destructive" onClick={handleLogoutClick}>Đăng xuất</Button>
      )}
    </div>
  );
}
