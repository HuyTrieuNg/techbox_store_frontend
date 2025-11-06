// import { useState, useEffect } from 'react';
// import { ProductService } from '@/services/productService';
// import { Category } from '@/features/category';

// interface UseProductResult {
//   categories: Category[] | null;
//   isLoading: boolean;
//   error: any;
// }

// // Hook để lấy tất cả categories
// export function useCategories(): UseProductResult {
//   const [categories, setCategories] = useState<Category[] | null>(null);
//   const [isLoading, setIsLoading] = useState<boolean>(false);
//   const [error, setError] = useState<any>(null);

//   useEffect(() => {
//     const fetchCategories = async () => {
//       setIsLoading(true);
//       try {
//         const data = await ProductService.getAllCategories();
//         const rootCategories = data.filter(cat => cat.parentCategoryId === null);
//         setCategories(rootCategories);
//       } catch (err) {
//         setError(err);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchCategories();
//   }, []);

//   return { categories, isLoading, error };
// }


import useSWR from "swr";
import { ProductService } from "@/services/productService";
import { Category } from "@/features/category";

export function useCategories() {
  const { data, error, isLoading } = useSWR<Category[]>(
    "categories",
    ProductService.getAllCategories
  );

  const rootCategories = data?.filter((cat:any) => cat.parentCategoryId === null) ?? [];

  return {
    categories: rootCategories,
    isLoading,
    error,
  };
}