"use client";
import React, { useEffect, useState } from "react";
import BrandList from "@/components/admin/BrandList";
import brandService from "@/services/brandService";
import { Brand } from "@/features/category";
import BrandForm from "@/components/admin/BrandForm";


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
      const data = await brandService.getAllBrands();
      setBrands(data);
    } catch (e: any) {
      setError("Không thể tải danh sách thương hiệu");
    }
    setLoading(false);
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
    if (!window.confirm("Bạn có chắc muốn xóa thương hiệu này?")) return;
    setFormLoading(true);
    try {
      await brandService.deleteBrand(id);
      setBrands(brands.filter((b) => b.id !== id));
    } catch {
      alert("Xóa thất bại");
    }
    setFormLoading(false);
  };

  const handleFormSubmit = async (name: string) => {
    setFormLoading(true);
    try {
      if (editing) {
        const updated = await brandService.updateBrand(editing.id, { name });
        setBrands(brands.map((b) => (b.id === updated.id ? updated : b)));
      } else {
        const created = await brandService.createBrand({ name });
        setBrands([created, ...brands]);
      }
      setShowForm(false);
      setEditing(null);
    } catch {
      alert("Lưu thất bại");
    }
    setFormLoading(false);
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Quản lý Thương hiệu</h1>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={handleAdd}
          disabled={formLoading}
        >
          Thêm mới
        </button>
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <BrandList
        brands={brands}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      {showForm && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white rounded shadow p-6 min-w-[320px] max-w-[90vw]">
            <BrandForm
              initial={editing ? { name: editing.name } : undefined}
              onSubmit={handleFormSubmit}
              onCancel={() => {
                setShowForm(false);
                setEditing(null);
              }}
              loading={formLoading}
              checkExists={brandService.checkBrandNameExists}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminBrandsPage;
