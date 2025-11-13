import React, { useState } from 'react';
import { FiLoader, FiX } from 'react-icons/fi'; // Import icons for loading and cancel

type BrandFormProps = {
  initial?: { name: string };
  onSubmit: (name: string) => void;
  onCancel: () => void;
  loading: boolean;
  checkExists: (name: string) => Promise<boolean>;
};

const BrandForm: React.FC<BrandFormProps> = ({ initial, onSubmit, onCancel, loading, checkExists }) => {
  const [name, setName] = useState(initial?.name || '');
  const [error, setError] = useState<string | null>(null);

  const isEditing = !!initial;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name.trim()) {
      setError('Tên thương hiệu là bắt buộc.');
      return;
    }

    // Only check existence if the name has changed or it's a new brand
    if (!isEditing || (isEditing && initial?.name !== name)) {
      const exists = await checkExists(name);
      if (exists) {
        setError('Tên thương hiệu này đã tồn tại.');
        return;
      }
    }

    onSubmit(name);
  };

  return (
    <div className="relative">
      <h2 className="text-xl font-semibold mb-4 border-b pb-2">
        {isEditing ? "Chỉnh sửa Thương hiệu" : "Thêm Thương hiệu mới"}
      </h2>
      <button 
        type="button" 
        onClick={onCancel} 
        disabled={loading}
        className="absolute top-0 right-0 p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors"
      >
        <FiX size={20} />
      </button>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Tên Thương hiệu
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={loading}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Nhập tên thương hiệu"
          />
        </div>
        
        {error && <p className="text-sm text-red-500 mb-4">{error}</p>}
        
        <div className="flex justify-end space-x-3 mt-6">
          <button 
            type="button" 
            onClick={onCancel} 
            disabled={loading}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
          >
            Hủy
          </button>
          <button 
            type="submit" 
            disabled={loading}
            className="inline-flex justify-center items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-75 disabled:cursor-not-allowed"
          >
            {loading ? (
              <FiLoader size={18} className="animate-spin mr-2" />
            ) : null}
            {isEditing ? "Cập nhật" : "Thêm mới"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BrandForm;