import React, { useState } from 'react';
import { Category, checkCategoryExistsForUpdate } from '@/services/categoryService';

interface CategoryFormProps {
  initial?: Category | null;
  onSubmit: (name: string, parentCategoryId?: number | null) => Promise<void>;
  onCancel?: () => void;
  loading: boolean;
  checkExists: (name: string) => Promise<boolean>;
  parentOptions?: Category[];
}

const CategoryForm: React.FC<CategoryFormProps> = ({ initial, onSubmit, onCancel, loading, checkExists, parentOptions }) => {
  const [name, setName] = useState(initial?.name || '');
  const [parentId, setParentId] = useState<number | ''>(initial?.parentCategoryId || '');
  const [error, setError] = useState('');
  const [checking, setChecking] = useState(false);

  const checkExistsForUpdate = async (name: string, id?: number) => {
    if (id) {
      return await checkCategoryExistsForUpdate(name, id);
    }
    return await checkExists(name);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!name.trim()) {
      setError('Tên danh mục không được để trống');
      return;
    }
    if (!initial) { // Chỉ kiểm tra khi tạo mới
      setChecking(true);
      const exists = await checkExists(name.trim());
      setChecking(false);
      if (exists) {
        setError('Tên danh mục đã tồn tại');
        return;
      }
    } else { // Kiểm tra khi cập nhật
      setChecking(true);
      const exists = await checkExistsForUpdate(name.trim(), initial.id);
      setChecking(false);
      if (exists) {
        setError('Tên danh mục đã tồn tại');
        return;
      }
    }
    await onSubmit(name.trim(), parentId === '' ? null : Number(parentId));
    setName('');
    setParentId('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3 mt-4">
      <div>
        <label className="block font-medium mb-1">Tên danh mục</label>
        <input
          className="border px-3 py-2 rounded w-full"
          value={name}
          onChange={e => setName(e.target.value)}
          disabled={loading}
        />
      </div>
      <div>
        <label className="block font-medium mb-1">Danh mục cha (tuỳ chọn)</label>
        <select
          className="border px-3 py-2 rounded w-full"
          value={parentId}
          onChange={e => {
            const val = e.target.value;
            setParentId(val === '' ? '' : Number(val));
          }}
          disabled={loading}
        >
          <option value="">-- Không chọn --</option>
          {parentOptions?.map(opt => (
            <option key={opt.id} value={opt.id}>{opt.name}</option>
          ))}
        </select>
      </div>
      {error && (
        <div className="text-red-500 text-sm">
          {error}
        </div>
      )}
      {checking && (
        <div className="text-yellow-500 text-sm">
          Đang kiểm tra tên danh mục...
        </div>
      )}
      <div className="flex gap-2">
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-60"
          disabled={loading || checking}
        >
          {initial ? 'Cập nhật' : 'Thêm mới'}
        </button>
        {onCancel && (
          <button type="button" className="px-4 py-2 border rounded" onClick={onCancel} disabled={loading}>
            Hủy
          </button>
        )}
      </div>
    </form>
  );
};

export default CategoryForm;
