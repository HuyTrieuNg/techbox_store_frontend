"use client";

import { PermissionResponse } from "@/types/role";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/UI/card";
import { Badge } from "@/components/UI/badge";
import { ScrollArea } from "@/components/UI/scroll-area";
import {
  Users,
  Package,
  ShoppingCart,
  Ticket,
  Megaphone,
  Tag,
  Star,
  Archive,
  FileText,
  LucideIcon,
} from "lucide-react";

interface PermissionListProps {
  permissions: PermissionResponse[];
}

const MODULE_ICONS: Record<string, LucideIcon> = {
  USER: Users,
  PRODUCT: Package,
  ORDER: ShoppingCart,
  VOUCHER: Ticket,
  CAMPAIGN: Megaphone,
  PROMOTION: Tag,
  REVIEW: Star,
  INVENTORY: Archive,
  REPORT: FileText,
};

const MODULE_LABELS: Record<string, string> = {
  USER: "Người dùng",
  PRODUCT: "Sản phẩm",
  ORDER: "Đơn hàng",
  VOUCHER: "Voucher",
  CAMPAIGN: "Chiến dịch",
  PROMOTION: "Khuyến mãi",
  REVIEW: "Đánh giá",
  INVENTORY: "Kho hàng",
  REPORT: "Báo cáo",
};

const ACTION_LABELS: Record<string, string> = {
  READ: "Xem",
  WRITE: "Tạo",
  UPDATE: "Sửa",
  DELETE: "Xóa",
  READ_ALL: "Xem tất cả",
  REPORT: "Báo cáo",
  GENERATE: "Tạo",
};

export function PermissionList({ permissions }: PermissionListProps) {
  // Group permissions by module
  const groupedPermissions = permissions.reduce((acc, permission) => {
    if (!acc[permission.module]) {
      acc[permission.module] = [];
    }
    acc[permission.module].push(permission);
    return acc;
  }, {} as Record<string, PermissionResponse[]>);

  return (
    <ScrollArea className="h-[600px] pr-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {Object.entries(groupedPermissions).map(([module, perms]) => {
          const Icon = MODULE_ICONS[module] || Package;
          return (
            <Card key={module}>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Icon className="h-5 w-5" />
                  {MODULE_LABELS[module] || module}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {perms.map((permission) => (
                    <div
                      key={permission.id}
                      className="flex items-center justify-between rounded-lg border p-2 text-sm"
                    >
                      <div className="flex-1">
                        <p className="font-medium">{permission.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {permission.description}
                        </p>
                      </div>
                      <Badge variant="secondary" className="ml-2">
                        {ACTION_LABELS[permission.action] || permission.action}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </ScrollArea>
  );
}
