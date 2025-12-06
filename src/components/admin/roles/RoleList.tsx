"use client";

import { RoleResponse } from "@/types/role";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/UI/table";
import { Badge } from "@/components/UI/badge";
import { Button } from "@/components/UI/button";
import { DeleteRoleDialog } from "./DeleteRoleDialog";
import { Shield, Edit, Calendar } from "lucide-react";
import { format } from "date-fns";
import { vi } from "date-fns/locale";

interface RoleListProps {
  roles: RoleResponse[];
  onSelectRole: (role: RoleResponse) => void;
}

export function RoleList({ roles, onSelectRole }: RoleListProps) {
  const getRoleBadgeVariant = (roleName: string) => {
    if (roleName === "ROLE_ADMIN") return "destructive";
    if (roleName === "ROLE_STAFF") return "default";
    if (roleName === "ROLE_CUSTOMER") return "secondary";
    return "outline";
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Vai trò</TableHead>
            <TableHead>Mô tả</TableHead>
            <TableHead className="text-center">Số quyền</TableHead>
            <TableHead>Ngày tạo</TableHead>
            <TableHead className="text-right">Thao tác</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {roles.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center text-muted-foreground">
                Không có vai trò nào
              </TableCell>
            </TableRow>
          ) : (
            roles.map((role) => (
              <TableRow key={role.id}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-muted-foreground" />
                    <Badge variant={getRoleBadgeVariant(role.name)}>
                      {role.name}
                    </Badge>
                  </div>
                </TableCell>
                <TableCell className="max-w-md">
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {role.description || "Không có mô tả"}
                  </p>
                </TableCell>
                <TableCell className="text-center">
                  <Badge variant="outline">{role.permissions.length}</Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    {format(new Date(role.createdAt), "dd/MM/yyyy", {
                      locale: vi,
                    })}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onSelectRole(role)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <DeleteRoleDialog role={role} />
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
