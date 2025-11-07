import UnauthorizedButtons from "@/components/UnauthorizedButtons";

/**
 * Unauthorized Content Component
 * 
 * Hiển thị thông báo không có quyền truy cập
 * Có thể tái sử dụng trong RouteGuard hoặc error pages
 */
export default function UnauthorizedContent() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="text-center max-w-md px-4">
        <div className="mb-8">
          <svg
            className="mx-auto h-24 w-24 text-red-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          403 - Không có quyền truy cập
        </h1>
        
        <p className="text-gray-600 mb-8">
          Bạn không có quyền để truy cập trang này. 
          Vui lòng liên hệ quản trị viên nếu bạn cho rằng đây là lỗi.
        </p>
        
        <UnauthorizedButtons />
      </div>
    </div>
  );
}
