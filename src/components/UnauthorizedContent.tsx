import UnauthorizedButtons from "@/components/UnauthorizedButtons";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/UI/card';

/**
 * Unauthorized Content Component
 * 
 * Hiển thị thông báo không có quyền truy cập
 * Có thể tái sử dụng trong RouteGuard hoặc error pages
 */
export default function UnauthorizedContent() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-md px-4 w-full">
        <Card className="p-6">
          <CardHeader className="text-center">
            <CardTitle>
              403 - Không có quyền truy cập
            </CardTitle>
            <CardDescription>
              Bạn không có quyền để truy cập trang này. Vui lòng liên hệ quản trị viên nếu bạn cho rằng đây là lỗi.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <svg
                className="mx-auto h-20 w-20 text-red-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>

            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">403 - Không có quyền truy cập</h2>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">Bạn không có quyền để truy cập trang này. Vui lòng liên hệ quản trị viên nếu bạn cho rằng đây là lỗi.</p>
            </div>

            <div className="flex justify-center">
              <UnauthorizedButtons />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
