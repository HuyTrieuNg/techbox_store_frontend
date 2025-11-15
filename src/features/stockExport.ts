export interface StockExportItem {
  id?: number;
  productVariationId: number;
  productName?: string;
  variationName?: string;
  sku?: string;
  quantity: number;
  costPrice: number;
  totalValue: number;
}

export interface StockExport {
  id: number;
  documentCode: string;
  userId: number;
  userName: string | null;
  orderId: number;
  orderCode: string | null;
  exportDate: string;
  totalCogsValue: number;
  note: string;
  createdAt: string;
  totalItems: number;
  items?: StockExportItem[];
}

export interface StockExportCreateRequest {
  orderId: number;
  exportDate: string;
  note?: string;
  items: {
    productVariationId: number;
    quantity: number;
    sellingPrice: number;
  }[];
}

export interface StockExportPageResponse {
  content: StockExport[];
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

export interface StockExportParams {
  page?: number;
  size?: number;
  documentCode?: string;
  startDate?: string;
  endDate?: string;
}