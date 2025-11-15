export interface Supplier {
  supplierId: number;
  name: string;
  phone?: string;
  email?: string;
  address?: string;
  taxCode?: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;
  deleted: boolean;
}

export interface SupplierCreateRequest {
  name: string;
  phone?: string;
  email?: string;
  address?: string;
  taxCode?: string;
}

export interface SupplierUpdateRequest {
  name?: string;
  phone?: string;
  email?: string;
  address?: string;
  taxCode?: string;
}

export interface SupplierPageResponse {
  content: Supplier[];
  pageable: {
    pageNumber: number;
    pageSize: number;
    sort: {
      sorted: boolean;
      unsorted: boolean;
      empty: boolean;
    };
    offset: number;
    paged: boolean;
    unpaged: boolean;
  };
  totalPages: number;
  totalElements: number;
  last: boolean;
  first: boolean;
  numberOfElements: number;
  size: number;
  number: number;
  sort: {
    sorted: boolean;
    unsorted: boolean;
    empty: boolean;
  };
  empty: boolean;
}

export interface SupplierParams {
  page?: number;
  size?: number;
  keyword?: string;
  includeDeleted?: boolean;
}