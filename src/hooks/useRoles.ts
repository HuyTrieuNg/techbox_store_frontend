import useSWR, { mutate } from "swr";
import {
  getAllRoles,
  getRoleById,
  createRole,
  deleteRole,
  getAllPermissions,
  getPermissionsByModule,
  assignPermissionsToRole,
  addPermissionToRole,
  removePermissionFromRole,
} from "@/services/roleService";
import {
  RoleCreateRequest,
  AssignPermissionsRequest,
  RoleResponse,
  PermissionResponse,
} from "@/types/role";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

// ===== ROLE HOOKS =====

// Get all roles
export const useRoles = () => {
  const { data, error, isLoading } = useSWR<RoleResponse[]>(
    "/roles",
    getAllRoles,
    {
      revalidateOnFocus: false,
    }
  );

  return {
    data: data || [],
    error,
    isLoading,
  };
};

// Get role by ID
export const useRole = (roleId: number | null) => {
  const key = roleId ? `/roles/${roleId}` : null;
  const { data, error, isLoading } = useSWR<RoleResponse | null>(
    key,
    async () => {
      if (!roleId) return null;
      return getRoleById(roleId);
    },
    {
      revalidateOnFocus: false,
    }
  );

  return {
    data,
    error,
    isLoading,
  };
};

// Create role mutation
export const useCreateRole = () => {
  const { toast } = useToast();
  const [isPending, setIsPending] = useState(false);

  const mutateAsync = async (data: RoleCreateRequest) => {
    setIsPending(true);
    try {
      const result = await createRole(data);
      await mutate("/roles");
      toast({
        title: "Thành công",
        description: "Tạo vai trò mới thành công",
      });
      return result;
    } catch (error) {
      const err = error as Error;
      toast({
        title: "Lỗi",
        description: err?.message || "Không thể tạo vai trò",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsPending(false);
    }
  };

  return { mutateAsync, isPending };
};

// Delete role mutation
export const useDeleteRole = () => {
  const { toast } = useToast();
  const [isPending, setIsPending] = useState(false);

  const mutateAsync = async (roleId: number) => {
    setIsPending(true);
    try {
      await deleteRole(roleId);
      await mutate("/roles");
      toast({
        title: "Thành công",
        description: "Xóa vai trò thành công",
      });
    } catch (error) {
      const err = error as Error;
      toast({
        title: "Lỗi",
        description: err?.message || "Không thể xóa vai trò",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsPending(false);
    }
  };

  return { mutateAsync, isPending };
};

// ===== PERMISSION HOOKS =====

// Get all permissions
export const usePermissions = () => {
  const { data, error, isLoading } = useSWR<PermissionResponse[]>(
    "/roles/permissions",
    getAllPermissions,
    {
      revalidateOnFocus: false,
    }
  );

  return {
    data: data || [],
    error,
    isLoading,
  };
};

// Get permissions by module
export const usePermissionsByModule = (module: string | null) => {
  const key = module ? `/roles/permissions/module/${module}` : null;
  const { data, error, isLoading } = useSWR<PermissionResponse[]>(
    key,
    async () => {
      if (!module) return [];
      return getPermissionsByModule(module);
    },
    {
      revalidateOnFocus: false,
    }
  );

  return {
    data: data || [],
    error,
    isLoading,
  };
};

// ===== ROLE-PERMISSION ASSIGNMENT HOOKS =====

// Assign permissions to role
export const useAssignPermissions = () => {
  const { toast } = useToast();
  const [isPending, setIsPending] = useState(false);

  const mutateAsync = async ({
    roleId,
    data,
  }: {
    roleId: number;
    data: AssignPermissionsRequest;
  }) => {
    setIsPending(true);
    try {
      const result = await assignPermissionsToRole(roleId, data);
      await mutate("/roles");
      await mutate(`/roles/${roleId}`);
      toast({
        title: "Thành công",
        description: "Cập nhật quyền cho vai trò thành công",
      });
      return result;
    } catch (error) {
      const err = error as Error;
      toast({
        title: "Lỗi",
        description: err?.message || "Không thể cập nhật quyền",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsPending(false);
    }
  };

  return { mutateAsync, isPending };
};

// Add single permission to role
export const useAddPermission = () => {
  const { toast } = useToast();
  const [isPending, setIsPending] = useState(false);

  const mutateAsync = async ({
    roleId,
    permissionId,
  }: {
    roleId: number;
    permissionId: number;
  }) => {
    setIsPending(true);
    try {
      const result = await addPermissionToRole(roleId, permissionId);
      await mutate("/roles");
      await mutate(`/roles/${roleId}`);
      toast({
        title: "Thành công",
        description: "Thêm quyền thành công",
      });
      return result;
    } catch (error) {
      const err = error as Error;
      toast({
        title: "Lỗi",
        description: err?.message || "Không thể thêm quyền",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsPending(false);
    }
  };

  return { mutateAsync, isPending };
};

// Remove permission from role
export const useRemovePermission = () => {
  const { toast } = useToast();
  const [isPending, setIsPending] = useState(false);

  const mutateAsync = async ({
    roleId,
    permissionId,
  }: {
    roleId: number;
    permissionId: number;
  }) => {
    setIsPending(true);
    try {
      const result = await removePermissionFromRole(roleId, permissionId);
      await mutate("/roles");
      await mutate(`/roles/${roleId}`);
      toast({
        title: "Thành công",
        description: "Xóa quyền thành công",
      });
      return result;
    } catch (error) {
      const err = error as Error;
      toast({
        title: "Lỗi",
        description: err?.message || "Không thể xóa quyền",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsPending(false);
    }
  };

  return { mutateAsync, isPending };
};
