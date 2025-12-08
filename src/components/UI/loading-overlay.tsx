import * as React from "react"
import { Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface LoadingOverlayProps extends React.HTMLAttributes<HTMLDivElement> {
  show?: boolean           // Trạng thái hiển thị (true/false)
  fullScreen?: boolean     // true: phủ toàn màn hình, false: chỉ phủ thẻ cha
  message?: string         // Dòng chữ hiển thị dưới spinner
}

export function LoadingOverlay({
  show = false,
  fullScreen = false,
  message,
  className,
  ...props
}: LoadingOverlayProps) {
  if (!show) return null

  return (
    <div
      className={cn(
        // Căn giữa nội dung, tạo nền mờ (backdrop-blur) chuẩn Shadcn
        "flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm z-50",
        // Nếu fullScreen thì dùng fixed, ngược lại dùng absolute (phủ lên cha)
        fullScreen ? "fixed inset-0 w-screen h-screen" : "absolute inset-0",
        className
      )}
      {...props}
    >
      {/* Icon xoay */}
      <Loader2 className="h-10 w-10 animate-spin text-primary" />
      
      {/* Text thông báo (nếu có) */}
      {message && (
        <p className="mt-4 text-sm font-medium text-muted-foreground animate-pulse">
          {message}
        </p>
      )}
    </div>
  )
}