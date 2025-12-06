"use client";

import { useState } from "react";
import { useDeleteRole } from "@/hooks/useRoles";
import { RoleResponse } from "@/types/role";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/UI/alert-dialog";
import { Button } from "@/components/UI/button";
import { Trash2 } from "lucide-react";

interface DeleteRoleDialogProps {
  role: RoleResponse;
}

const PROTECTED_ROLES = ["ROLE_ADMIN", "ROLE_STAFF", "ROLE_CUSTOMER"];

export function DeleteRoleDialog({ role }: DeleteRoleDialogProps) {
  const [open, setOpen] = useState(false);
  const deleteRoleMutation = useDeleteRole();

  const isProtected = PROTECTED_ROLES.includes(role.name);

  const handleDelete = async () => {
    try {
      await deleteRoleMutation.mutateAsync(role.id);
      setOpen(false);
    } catch {
      // Error handled in hook
    }
  };

  if (isProtected) {
    return (
      <Button variant="ghost" size="sm" disabled title="Không thể xóa vai trò hệ thống">
        <Trash2 className="h-4 w-4 text-muted-foreground" />
      </Button>
    );
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" size="sm">
          <Trash2 className="h-4 w-4 text-red-500" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Xác nhận xóa vai trò</AlertDialogTitle>
          <AlertDialogDescription>
            Bạn có chắc chắn muốn xóa vai trò <strong>{role.name}</strong>?
            <br />
            <br />
            Hành động này không thể hoàn tác. Nếu vai trò đang được gán cho người dùng,
            bạn sẽ không thể xóa.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Hủy</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={deleteRoleMutation.isPending}
            className="bg-red-500 hover:bg-red-600"
          >
            {deleteRoleMutation.isPending ? "Đang xóa..." : "Xóa vai trò"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
