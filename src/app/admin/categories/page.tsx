"use client";
import React, { useEffect, useState } from "react";
import CategoryList from "@/components/admin/category/CategoryList";
import CategoryForm from "@/components/admin/category/CategoryForm";
import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  checkCategoryExists,
  checkCategoryExistsForUpdate,
  Category,
} from "@/services/categoryService";
import { Button } from "@/components/UI/button";
import { toast } from "sonner";

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | undefined>(undefined);
  const [editing, setEditing] = useState<Category | null>(null);
  const [formLoading, setFormLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [isNameValid, setIsNameValid] = useState(true);

  const fetchCategories = async () => {
    setLoading(true);
    setError(undefined);
    try {
      const data = await getCategories();
      console.log("Fetched categories:", data); // Debug log
      setCategories(data);
    } catch (e: any) {
      console.error("Error fetching categories:", e); // Debug log
      const message = e?.response?.data?.message || 'Failed to load categories';
      setError(message);
      toast.error(message);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleAdd = () => {
    setEditing(null);
    setShowForm(true);
  };
  const handleEdit = (cat: Category) => {
    setEditing(cat);
    setShowForm(true);
  };
  const handleDelete = async (cat: Category) => {
    if (!window.confirm("Bạn có chắc muốn xóa danh mục này?")) return;
    setFormLoading(true);
    try {
      await deleteCategory(cat.id);
      fetchCategories();
      toast.success('Category deleted successfully!');
    } catch (e: any) {
      console.error("Error deleting category:", e);
      const message = e?.response?.data?.message || 'Failed to delete category';
      toast.error(message);
    }
    setFormLoading(false);
  };
  const validateCategoryName = async (name: string) => {
    try {
      const exists = await checkCategoryExists(name);
      setIsNameValid(!exists);
    } catch (e) {
      setIsNameValid(false);
    }
  };

  const validateCategoryNameForUpdate = async (name: string, id: number) => {
    try {
      const exists = await checkCategoryExistsForUpdate(name, id);
      setIsNameValid(!exists);
    } catch (e) {
      setIsNameValid(false);
    }
  };

  const handleFormSubmit = async (name: string, parentCategoryId?: number | null) => {
    if (editing && !isNameValid) {
      alert("Tên danh mục đã tồn tại. Vui lòng chọn tên khác.");
      return;
    }
    setFormLoading(true);
    try {
      if (editing) {
        console.log("Updating category:", { id: editing.id, name, parentCategoryId }); // Debug log
        const updated = await updateCategory(editing.id, name, parentCategoryId);
        console.log("Updated category:", updated); // Debug log
        fetchCategories();
        toast.success('Category updated successfully!');
      } else {
        console.log("Creating category:", { name, parentCategoryId }); // Debug log
        await createCategory(name, parentCategoryId);
        fetchCategories();
        toast.success('Category created successfully!');
      }
      setShowForm(false);
      setEditing(null);
    } catch (e: any) {
      console.error("Error saving category:", e); // Debug log
      const message = e?.response?.data?.message || 'Failed to save category';
      toast.error(message);
    }
    setFormLoading(false);
  };


  // Loại bỏ node hiện tại và toàn bộ con cháu khỏi parentOptions khi sửa
  const collectIds = (cat: Category, ids: Set<number>) => {
    ids.add(cat.id);
    if (cat.childCategories && Array.isArray(cat.childCategories)) {
      for (const child of cat.childCategories) {
        collectIds(child, ids);
      }
    }
  };

  // Flatten và loại trùng id
  const flattenCategories = (cats: Category[], arr: Category[] = [], excludeIds: Set<number> = new Set(), seen: Set<number> = new Set()) => {
    console.log("Flattening categories:", { cats, excludeIds }); // Debug log
    for (const c of cats) {
      if (!excludeIds.has(c.id) && !seen.has(c.id)) {
        arr.push({ ...c, childCategories: undefined });
        seen.add(c.id);
        if (c.childCategories && Array.isArray(c.childCategories)) {
          flattenCategories(c.childCategories, arr, excludeIds, seen);
        }
      }
    }
    console.log("Flattened categories:", arr); // Debug log
    return arr;
  };

  return (
    <div className="p-6 mx-auto bg-white dark:bg-gray-900 min-h-screen">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Quản lý Danh mục</h1>
        
        <Button
          onClick={handleAdd}
          disabled={formLoading}
        >
          + Thêm mới
        </Button>
      </div>
      {error && <div className="text-red-500 dark:text-red-400 mb-2">{error}</div>}
      <CategoryList
        categories={categories}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      {showForm && (
        <div className="fixed inset-0 bg-black/50 dark:bg-black/70 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded shadow p-6 min-w-[320px] max-w-[90vw]">
            <CategoryForm
              initial={editing}
              onSubmit={handleFormSubmit}
              onCancel={() => { setShowForm(false); setEditing(null); }}
              loading={formLoading}
              checkExists={checkCategoryExists}
              parentOptions={(() => {
                if (editing) {
                  const excludeIds = new Set<number>();
                  collectIds(editing, excludeIds);
                  return flattenCategories(categories, [], excludeIds, new Set());
                }
                return flattenCategories(categories, [], new Set(), new Set());
              })()}
            />
          </div>
        </div>
      )}
    </div>
  );
}
