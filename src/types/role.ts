// Role & Permission Types

export interface PermissionResponse {
  id: number;
  name: string;
  description: string;
  module: string;
  action: string;
  createdAt: string;
  updatedAt: string;
}

export interface RoleResponse {
  id: number;
  name: string;
  description: string;
  permissions: PermissionResponse[];
  createdAt: string;
  updatedAt: string;
}

export interface RoleCreateRequest {
  name: string;
  description?: string;
}

export interface RoleUpdateRequest {
  name?: string;
  description?: string;
}

export interface AssignPermissionsRequest {
  roleId: number;
  permissionIds: number[];
}

// Permission Modules
export enum PermissionModule {
  USER = 'USER',
  PRODUCT = 'PRODUCT',
  ORDER = 'ORDER',
  VOUCHER = 'VOUCHER',
  CAMPAIGN = 'CAMPAIGN',
  PROMOTION = 'PROMOTION',
  REVIEW = 'REVIEW',
  INVENTORY = 'INVENTORY',
  REPORT = 'REPORT'
}

// Permission Actions
export enum PermissionAction {
  READ = 'READ',
  WRITE = 'WRITE',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
  READ_ALL = 'READ_ALL',
  REPORT = 'REPORT',
  GENERATE = 'GENERATE'
}

// Grouped Permissions by Module
export interface GroupedPermissions {
  [module: string]: PermissionResponse[];
}
