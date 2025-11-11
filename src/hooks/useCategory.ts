import useSWR from "swr";
import { ProductService } from "@/services/productService";
import { Category } from "@/features/category";

export function useCategories() {
  const { data, error, isLoading } = useSWR<Category[]>(
    "categories",
    ProductService.getAllCategories
  );

  const categoryMap = new Map<number, Category>();
  if (data) {
    const traverse = (cats: Category[]) => {
      cats.forEach((cat) => {
        categoryMap.set(cat.id, cat);
        if (cat.childCategories) {
          traverse(cat.childCategories);
        }
      });
    };
    traverse(data);
  }

  const rootCategories = data?.filter((cat: any) => cat.parentCategoryId === null) ?? [];
  
  // Hàm lấy category theo ID từ cache
  const getCategoryById = (id: number): Category | undefined => {
    return categoryMap.get(id);
  };

  const getBreadcrumbPath = (id: number): Category[] => {
    const path: Category[] = [];
    let current = categoryMap.get(id);

    while (current) {
      path.unshift(current); // Thêm vào đầu mảng → cha trước, con sau
      if (!current.parentCategoryId) break;
      current = categoryMap.get(current.parentCategoryId);
    }

    return path; // Ví dụ: [Điện thoại, iPhone, iPhone 15 Series]
  };
  return {
    categories: rootCategories,
    allCategories: data ?? [],
    getCategoryById,           // Hàm tiện ích
    getBreadcrumbPath,     // Hàm tiện ích
    categoryMap,
    isLoading,
    error,
  };
}