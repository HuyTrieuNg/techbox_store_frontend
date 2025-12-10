import { api } from "@/lib/axios";
import {
  RoleResponse,
  RoleCreateRequest,
  PermissionResponse,
  AssignPermissionsRequest,
} from "@/types/role";

// ===== ROLE MANAGEMENT =====

// Get all roles
export const getAllRoles = async (): Promise<RoleResponse[]> => {
  return api.get<RoleResponse[]>("/roles");
};

// Get role by ID
export const getRoleById = async (roleId: number): Promise<RoleResponse> => {
  return api.get<RoleResponse>(`/roles/${roleId}`);
};

// Get role by name
export const getRoleByName = async (name: string): Promise<RoleResponse> => {
  return api.get<RoleResponse>(`/roles/name/${name}`);
};

// Create new role
export const createRole = async (
  data: RoleCreateRequest
): Promise<RoleResponse> => {
  return api.post<RoleResponse>("/roles", data);
};

// Delete role (soft delete)
export const deleteRole = async (roleId: number): Promise<void> => {
  return api.delete<void>(`/roles/${roleId}`);
};

// ===== PERMISSION MANAGEMENT =====

// Get all permissions
export const getAllPermissions = async (): Promise<PermissionResponse[]> => {
  return api.get<PermissionResponse[]>("/roles/permissions");
};

// Get permissions by module
export const getPermissionsByModule = async (
  module: string
): Promise<PermissionResponse[]> => {
  return api.get<PermissionResponse[]>(`/roles/permissions/module/${module}`);
};

// Get permission by ID
export const getPermissionById = async (
  permissionId: number
): Promise<PermissionResponse> => {
  return api.get<PermissionResponse>(`/roles/permissions/${permissionId}`);
};

// Delete permission (soft delete)
export const deletePermission = async (permissionId: number): Promise<void> => {
  return api.delete<void>(`/roles/permissions/${permissionId}`);
};

// Create new permission
export const createPermission = async (data: {
  name: string;
  description?: string;
}): Promise<PermissionResponse> => {
  return api.post<PermissionResponse>("/roles/permissions", data);
};

// ===== MODULE PERMISSION MANAGEMENT =====

export interface ModulePermissionResponse {
  moduleName: string;
  description?: string;
  permissions: PermissionResponse[];
  totalPermissions: number;
  createdAt: string;
  updatedAt: string;
}

// Get all module permissions
export const getAllModules = async (): Promise<ModulePermissionResponse[]> => {
  return api.get<ModulePermissionResponse[]>("/roles/modules");
};

// Get module permission by name
export const getModuleByName = async (
  moduleName: string
): Promise<ModulePermissionResponse> => {
  return api.get<ModulePermissionResponse>(`/roles/modules/${moduleName}`);
};

// Create new module permission
export const createModule = async (data: {
  moduleName: string;
  description?: string;
}): Promise<ModulePermissionResponse> => {
  return api.post<ModulePermissionResponse>("/roles/modules", data);
};

// Delete module permission
export const deleteModule = async (moduleName: string): Promise<void> => {
  return api.delete<void>(`/roles/modules/${moduleName}`);
};

// ===== ROLE-PERMISSION ASSIGNMENT =====

// Assign permissions to role (replace all)
export const assignPermissionsToRole = async (
  roleId: number,
  data: AssignPermissionsRequest
): Promise<RoleResponse> => {
  return api.put<RoleResponse>(`/roles/${roleId}/permissions`, data);
};

// Add single permission to role
export const addPermissionToRole = async (
  roleId: number,
  permissionId: number
): Promise<RoleResponse> => {
  return api.post<RoleResponse>(`/roles/${roleId}/permissions/${permissionId}`);
};

// Remove permission from role
export const removePermissionFromRole = async (
  roleId: number,
  permissionId: number
): Promise<RoleResponse> => {
  return api.delete<RoleResponse>(
    `/roles/${roleId}/permissions/${permissionId}`
  );
};
