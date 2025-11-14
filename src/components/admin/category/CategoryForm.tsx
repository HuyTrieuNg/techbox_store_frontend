import React, { useState, useEffect, useCallback } from 'react';
import { FiLoader, FiCheck, FiX as FiXIcon } from 'react-icons/fi';
import { Category } from '@/services/categoryService';

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
  const [nameValid, setNameValid] = useState<boolean | null>(null);

  const isEditing = !!initial;

  // Debounced name checking function
  const checkNameAvailability = useCallback(async (nameToCheck: string) => {
    if (!nameToCheck.trim()) {
      setNameValid(null);
      setError('');
      return;
    }

    // Skip check if editing and name hasn't changed
    if (isEditing && initial?.name === nameToCheck) {
      setNameValid(true);
      setError('');
      return;
    }

    setChecking(true);
    try {
      const exists = await checkExists(nameToCheck);
      setNameValid(!exists);
      setError(exists ? 'Tên danh mục đã tồn tại' : '');
    } catch (err) {
      setNameValid(null);
      setError('Không thể kiểm tra tên danh mục');
    } finally {
      setChecking(false);
    }
  }, [checkExists, isEditing, initial?.name]);

  // Debounce name checking
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      checkNameAvailability(name);
    }, 500); // Wait 500ms after user stops typing

    return () => clearTimeout(timeoutId);
  }, [name, checkNameAvailability]);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    // Clear previous validation state when user starts typing
    if (nameValid !== null || error) {
      setNameValid(null);
      setError('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name.trim()) {
      setError('Tên danh mục không được để trống');
      return;
    }

    // Name validation is already done in real-time, just check if it's valid
    if (nameValid === false) {
      setError('Tên danh mục đã tồn tại');
      return;
    }

    if (nameValid === null) {
      setError('Đang kiểm tra tên danh mục...');
      return;
    }

    await onSubmit(name.trim(), parentId === '' ? null : Number(parentId));
    setName('');
    setParentId('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3 mt-4">
      <div>
        <label className="block font-medium mb-1">Tên danh mục</label>
        <div className="relative">
          <input
            className={`border px-3 py-2 pr-10 rounded w-full ${
              nameValid === true
                ? 'border-green-500 focus:ring-green-500'
                : nameValid === false
                ? 'border-red-500 focus:ring-red-500'
                : 'border-gray-300'
            }`}
            value={name}
            onChange={handleNameChange}
            disabled={loading}
          />
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            {checking ? (
              <FiLoader size={18} className="animate-spin text-gray-400" />
            ) : nameValid === true ? (
              <FiCheck size={18} className="text-green-500" />
            ) : nameValid === false ? (
              <FiXIcon size={18} className="text-red-500" />
            ) : null}
          </div>
        </div>
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
      {error && <div className="text-red-500 text-sm">{error}</div>}
      <div className="flex gap-2">
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-60"
          disabled={loading || checking || nameValid === false || nameValid === null}
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
