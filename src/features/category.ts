export interface Category {
  id: number;
  name: string;
  parentCategoryId?: number; 
  parentCategoryName?: string;      // map với parent_category_id
  parentCategory?: Category;       // map với parentCategory
  childCategories?: Category[];    // map với childCategories
  createdAt?: string;              // ISO string từ LocalDateTime
  updatedAt?: string;              // ISO string từ LocalDateTime
}

export interface Brand {
  id: number;
  name: string;
}