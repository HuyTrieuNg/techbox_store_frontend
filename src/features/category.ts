export interface Category {
  id: number;
  name: string;
  parentCategoryId?: number | null;
  parentCategoryName?: string | null;
  childCategories?: Category[] | null;
  level?: number;
  displayName?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Brand {
  id: number;
  name: string;
  createdAt?: string;
  updatedAt?: string;
}