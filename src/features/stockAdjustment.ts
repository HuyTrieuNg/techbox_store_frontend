export interface StockAdjustmentItem {
  id?: number;
  productVariationId: number;
  productName?: string;
  variationName?: string;
  sku?: string;
  systemQty: number;
  realQty: number;
  diffQty: number;
  costPrice: number;
  diffValue: number;
}

export interface StockAdjustment {
  id: number;
  userId: number;
  userName: string | null;
  documentCode: string;
  checkName: string;
  adjustmentDate: string;
  note: string;
  createdAt: string;
  totalItems: number;
  items?: StockAdjustmentItem[];
}

export interface StockAdjustmentCreateRequest {
  checkName: string;
  adjustmentDate: string;
  note?: string;
  items: {
    productVariationId: number;
    realQty: number;
    costPrice: number;
  }[];
}

export interface StockAdjustmentPageResponse {
  content: StockAdjustment[];
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
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
  size: number;
  number: number;
  sort: {
    sorted: boolean;
    unsorted: boolean;
    empty: boolean;
  };
  numberOfElements: number;
  empty: boolean;
}