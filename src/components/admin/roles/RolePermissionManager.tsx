"use client";

import { useState, useEffect } from "react";
import { RoleResponse, PermissionResponse } from "@/types/role";
import { useAssignPermissions } from "@/hooks/useRoles";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/UI/dialog";
import { Button } from "@/components/UI/button";
import { Badge } from "@/components/UI/badge";
import { Checkbox } from "@/components/UI/checkbox";
import { ScrollArea } from "@/components/UI/scroll-area";
import { Input } from "@/components/UI/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/UI/select";
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
  Search,
} from "lucide-react";

interface RolePermissionManagerProps {
  role: RoleResponse | null;
  allPermissions: PermissionResponse[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
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

export function RolePermissionManager({
  role,
  allPermissions,
  open,
  onOpenChange,
}: RolePermissionManagerProps) {
  const [selectedPermissions, setSelectedPermissions] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedModule, setSelectedModule] = useState<string>("all");
  const assignPermissionsMutation = useAssignPermissions();

  useEffect(() => {
    if (role) {
      setSelectedPermissions(role.permissions.map((p) => p.id));
    }
  }, [role]);

  if (!role) return null;

  // Group permissions by module
  const groupedPermissions = allPermissions.reduce((acc, permission) => {
    if (!acc[permission.module]) {
      acc[permission.module] = [];
    }
    acc[permission.module].push(permission);
    return acc;
  }, {} as Record<string, PermissionResponse[]>);

  const modules = Object.keys(groupedPermissions);

  const handleTogglePermission = (permissionId: number) => {
    setSelectedPermissions((prev) =>
      prev.includes(permissionId)
        ? prev.filter((id) => id !== permissionId)
        : [...prev, permissionId]
    );
  };

  const handleToggleModule = (module: string, checked: boolean) => {
    const modulePermissionIds = groupedPermissions[module].map((p) => p.id);
    
    if (checked) {
      setSelectedPermissions((prev) => [
        ...new Set([...prev, ...modulePermissionIds]),
      ]);
    } else {
      setSelectedPermissions((prev) =>
        prev.filter((id) => !modulePermissionIds.includes(id))
      );
    }
  };

  const handleSave = async () => {
    try {
      await assignPermissionsMutation.mutateAsync({
        roleId: role.id,
        data: {
          roleId: role.id,
          permissionIds: selectedPermissions,
        },
      });
      onOpenChange(false);
    } catch {
      // Error handled in hook
    }
  };

  const filteredPermissions = allPermissions.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredGroupedPermissions = filteredPermissions.reduce((acc, permission) => {
    if (!acc[permission.module]) {
      acc[permission.module] = [];
    }
    acc[permission.module].push(permission);
    return acc;
  }, {} as Record<string, PermissionResponse[]>);

  const isModuleFullySelected = (module: string) => {
    const modulePermissionIds = groupedPermissions[module].map((p) => p.id);
    return modulePermissionIds.every((id) => selectedPermissions.includes(id));
  };

  const isModulePartiallySelected = (module: string) => {
    const modulePermissionIds = groupedPermissions[module].map((p) => p.id);
    const selectedCount = modulePermissionIds.filter((id) =>
      selectedPermissions.includes(id)
    ).length;
    return selectedCount > 0 && selectedCount < modulePermissionIds.length;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>Quản lý quyền - {role.name}</DialogTitle>
          <DialogDescription>
            Chọn các quyền cho vai trò này. Các quyền đã chọn:{" "}
            <Badge variant="secondary">{selectedPermissions.length}</Badge>
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-hidden flex flex-col space-y-4">
          {/* Search and Filter */}
          <div className="flex-shrink-0 flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Tìm kiếm quyền..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={selectedModule} onValueChange={setSelectedModule}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Chọn module" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả module</SelectItem>
                {modules.map((module) => {
                  const Icon = MODULE_ICONS[module] || Package;
                  return (
                    <SelectItem key={module} value={module}>
                      <div className="flex items-center gap-2">
                        <Icon className="h-4 w-4" />
                        {MODULE_LABELS[module] || module}
                      </div>
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>

          {/* Permissions List */}
          <div className="flex-1 overflow-hidden">
            <ScrollArea className="h-full pr-4">
              <div className="space-y-4 pb-4">
                {Object.entries(
                  selectedModule === "all"
                    ? searchQuery
                      ? filteredGroupedPermissions
                      : groupedPermissions
                    : searchQuery
                    ? { [selectedModule]: filteredGroupedPermissions[selectedModule] || [] }
                    : { [selectedModule]: groupedPermissions[selectedModule] || [] }
                ).map(([module, permissions]) => {
                  if (!permissions || permissions.length === 0) return null;
                  const Icon = MODULE_ICONS[module] || Package;
                  return (
                    <div key={module} className="space-y-2">
                      <div className="flex items-center gap-2 border-b pb-2">
                        <Checkbox
                          checked={isModuleFullySelected(module)}
                          onCheckedChange={(checked) =>
                            handleToggleModule(module, checked === true)
                          }
                          className={
                            isModulePartiallySelected(module)
                              ? "data-[state=checked]:bg-primary/50"
                              : ""
                          }
                        />
                        <Icon className="h-4 w-4 text-muted-foreground" />
                        <h3 className="font-semibold">
                          {MODULE_LABELS[module] || module}
                        </h3>
                        <Badge variant="outline">
                          {permissions.length}
                        </Badge>
                      </div>
                      <div className="ml-6 space-y-2">
                        {permissions.map((permission) => (
                          <div
                            key={permission.id}
                            className="flex items-center gap-2 rounded-lg border p-3 hover:bg-accent"
                          >
                            <Checkbox
                              checked={selectedPermissions.includes(
                                permission.id
                              )}
                              onCheckedChange={() =>
                                handleTogglePermission(permission.id)
                              }
                            />
                            <div className="flex-1">
                              <p className="text-sm font-medium">
                                {permission.name}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {permission.description}
                              </p>
                            </div>
                            <Badge variant="secondary">
                              {ACTION_LABELS[permission.action] ||
                                permission.action}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </ScrollArea>
          </div>
        </div>

        <DialogFooter className="flex-shrink-0">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Hủy
          </Button>
          <Button
            onClick={handleSave}
            disabled={assignPermissionsMutation.isPending}
          >
            {assignPermissionsMutation.isPending ? "Đang lưu..." : "Lưu thay đổi"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
