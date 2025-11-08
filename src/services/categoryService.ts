import { api } from '@/lib/axios';

export interface Category {
  id: number;
  name: string;
  parentCategoryId?: number | null;
  parentCategoryName?: string | null;
  childCategories?: Category[] | null;
}

export const getCategories = async (): Promise<Category[]> => {
  return await api.get<Category[]>('/categories');
};

export const createCategory = async (name: string, parentCategoryId?: number | null): Promise<Category> => {
  return await api.post<Category>('/categories', parentCategoryId ? { name, parentCategoryId } : { name });
};

export const updateCategory = async (id: number, name: string, parentCategoryId?: number | null): Promise<Category> => {
  return await api.put<Category>(`/categories/${id}`, parentCategoryId !== undefined ? { name, parentCategoryId } : { name });
};

export const deleteCategory = async (id: number): Promise<void> => {
  await api.delete(`/categories/${id}`);
};

export const checkCategoryExists = async (name: string): Promise<boolean> => {
  return await api.get<boolean>(`/categories/exists?name=${encodeURIComponent(name)}`);
};

export const checkCategoryExistsForUpdate = async (name: string, id: number): Promise<boolean> => {
  return await api.get<boolean>(`/categories/exists-for-update?name=${encodeURIComponent(name)}&id=${id}`);
};
