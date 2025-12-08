export interface ModuleDetail {
  permissions: string[];
  permissionCount: number;
  actions: string[];
}

export interface ModulePermissions {
  [key: string]: string[];
}

export interface ModuleDetails {
  [key: string]: ModuleDetail;
}

export interface AuthorityResponse {
  username: string;
  authenticated: boolean;
  userId: number;
  userEmail: string;
  firstName: string;
  lastName: string;
  allAuthorities: string[];
  roles: string[];
  permissions: string[];
  authorityCount: number;
  accessibleModules: string[];
  moduleCount: number;
  modulePermissions: ModulePermissions;
  moduleDetails: ModuleDetails;
}
