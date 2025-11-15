"use client";
import React, { useEffect, useState } from "react";
import BrandList from "@/components/admin/BrandList";
import { api } from "@/lib/axios";
import { Brand } from "@/features/category";
import BrandForm from "@/components/admin/BrandForm";
import { toast } from "sonner";
import { Button } from "@/components/UI/button";
import { Plus } from "lucide-react";


const AdminBrandsPage = () => {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | undefined>(undefined);
  const [editing, setEditing] = useState<Brand | null>(null);
  const [formLoading, setFormLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const fetchBrands = async () => {
    setLoading(true);
    setError(undefined);
    try {
      const data = await api.get<Brand[]>('/brands');
      setBrands(data);
    } catch (error: any) {
      const message = error?.response?.data?.message || 'Failed to load brands';
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBrands();
  }, []);

  const handleAdd = () => {
    setEditing(null);
    setShowForm(true);
  };

  const handleEdit = (brand: Brand) => {
    setEditing(brand);
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this brand?")) return;

    setFormLoading(true);
    try {
      await api.delete(`/brands/${id}`);
      setBrands(brands.filter((b) => b.id !== id));
      toast.success('Brand deleted successfully!');
    } catch (error: any) {
      const message = error?.response?.data?.message || 'Failed to delete brand';
      toast.error(message);
    } finally {
      setFormLoading(false);
    }
  };

  const handleFormSubmit = async (name: string) => {
    setFormLoading(true);

    try {
      if (editing) {
        const updated = await api.put<Brand>(`/brands/${editing.id}`, { name });
        setBrands(brands.map((b) => (b.id === updated.id ? updated : b)));
        toast.success('Brand updated successfully!');
      } else {
        const created = await api.post<Brand>('/brands', { name });
        setBrands([created, ...brands]);
        toast.success('Brand created successfully!');
      }
      setShowForm(false);
      setEditing(null);
    } catch (error: any) {
      const message = error?.response?.data?.message || 'Failed to save brand';
      toast.error(message);
    } finally {
      setFormLoading(false);
    }
  };

  const checkBrandNameExists = async (name: string): Promise<boolean> => {
    try {
      const response = await api.get<boolean>(`/brands/exists/?name=${encodeURIComponent(name)}`);
      return response;
    } catch (error) {
      return false; // Assume it doesn't exist if check fails
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto bg-white dark:bg-gray-900 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Brand Management</h1>
        <Button
          onClick={handleAdd}
          disabled={formLoading}
          className="flex items-center gap-2"
        >
          <Plus size={16} />
          Add Brand
        </Button>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
          <p className="text-red-600 dark:text-red-400">{error}</p>
        </div>
      )}

      <BrandList
        brands={brands}
        loading={loading}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {showForm && (
        <div className="fixed inset-0 bg-black/50 dark:bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 min-w-[320px] max-w-[90vw] max-h-[90vh] overflow-y-auto">
            <BrandForm
              initial={editing ? { name: editing.name } : undefined}
              onSubmit={handleFormSubmit}
              onCancel={() => {
                setShowForm(false);
                setEditing(null);
              }}
              loading={formLoading}
              checkExists={checkBrandNameExists}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminBrandsPage;
