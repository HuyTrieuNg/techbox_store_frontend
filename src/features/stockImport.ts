export interface StockImportItem {
  id?: number;
  productVariationId: number;
  productName?: string;
  variationName?: string;
  sku?: string;
  quantity: number;
  costPrice: number;
  totalValue?: number;
}

export interface StockImport {
  id: number;
  documentCode: string;
  userId: number;
  userName: string;
  importDate: string;
  supplierId: number;
  supplierName: string;
  totalCostValue: number;
  note: string;
  createdAt: string;
  totalItems: number;
  items?: StockImportItem[];
}

export interface StockImportCreateRequest {
  supplierId: number;
  importDate: string;
  note?: string;
  items: {
    productVariationId: number;
    quantity: number;
    costPrice: number;
  }[];
}

export interface StockImportPageResponse {
  content: StockImport[];
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

export interface StockImportParams {
  page?: number;
  size?: number;
  fromDate?: string;
  toDate?: string;
  supplierId?: number;
  userId?: number;
  documentCode?: string;
}