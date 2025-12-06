"use client";

import { useState } from "react";
import { useRoles, usePermissions } from "@/hooks/useRoles";
import { RoleResponse } from "@/types/role";
import { CreateRoleDialog } from "@/components/admin/roles/CreateRoleDialog";
import { RoleList } from "@/components/admin/roles/RoleList";
import { PermissionList } from "@/components/admin/roles/PermissionList";
import { RolePermissionManager } from "@/components/admin/roles/RolePermissionManager";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/UI/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/UI/tabs";
import { Skeleton } from "@/components/UI/skeleton";
import { Shield, Key, Settings } from "lucide-react";

export default function RolesPage() {
  const [selectedRole, setSelectedRole] = useState<RoleResponse | null>(null);
  const [permissionDialogOpen, setPermissionDialogOpen] = useState(false);

  const { data: roles, isLoading: rolesLoading } = useRoles();
  const { data: permissions, isLoading: permissionsLoading } = usePermissions();

  const handleSelectRole = (role: RoleResponse) => {
    setSelectedRole(role);
    setPermissionDialogOpen(true);
  };

  if (rolesLoading || permissionsLoading) {
    return (
      <div className="container mx-auto space-y-6 p-6">
        <div className="space-y-2">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-4 w-96" />
        </div>
        <Skeleton className="h-[600px] w-full" />
      </div>
    );
  }

  return (
    <div className="container mx-auto space-y-6 p-6">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Shield className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold">Quản lý vai trò & quyền</h1>
        </div>
        <p className="text-muted-foreground">
          Quản lý vai trò người dùng và phân quyền truy cập hệ thống
        </p>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="roles" className="space-y-4">
        <TabsList>
          <TabsTrigger value="roles">
            <Shield className="mr-2 h-4 w-4" />
            Vai trò
          </TabsTrigger>
          <TabsTrigger value="permissions">
            <Key className="mr-2 h-4 w-4" />
            Quyền hạn
          </TabsTrigger>
        </TabsList>

        {/* Roles Tab */}
        <TabsContent value="roles" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Danh sách vai trò</CardTitle>
                  <CardDescription>
                    Quản lý các vai trò trong hệ thống và phân quyền cho từng vai trò
                  </CardDescription>
                </div>
                <CreateRoleDialog />
              </div>
            </CardHeader>
            <CardContent>
              {roles && <RoleList roles={roles} onSelectRole={handleSelectRole} />}
            </CardContent>
          </Card>

          {/* Statistics */}
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Tổng số vai trò
                </CardTitle>
                <Shield className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{roles?.length || 0}</div>
                <p className="text-xs text-muted-foreground">
                  Vai trò trong hệ thống
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Tổng số quyền
                </CardTitle>
                <Key className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {permissions?.length || 0}
                </div>
                <p className="text-xs text-muted-foreground">
                  Quyền có thể gán
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Vai trò hệ thống
                </CardTitle>
                <Settings className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3</div>
                <p className="text-xs text-muted-foreground">
                  Admin, Staff, Customer
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Permissions Tab */}
        <TabsContent value="permissions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Danh sách quyền hạn</CardTitle>
              <CardDescription>
                Xem tất cả các quyền có sẵn trong hệ thống, được nhóm theo module
              </CardDescription>
            </CardHeader>
            <CardContent>
              {permissions && <PermissionList permissions={permissions} />}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Role Permission Manager Dialog */}
      {selectedRole && permissions && (
        <RolePermissionManager
          role={selectedRole}
          allPermissions={permissions}
          open={permissionDialogOpen}
          onOpenChange={setPermissionDialogOpen}
        />
      )}
    </div>
  );
}
