import React, { useState, useEffect, useCallback } from 'react';
import { FiLoader, FiX, FiCheck, FiX as FiXIcon } from 'react-icons/fi'; // Import icons for loading and cancel

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
  const [checkingName, setCheckingName] = useState(false);
  const [nameValid, setNameValid] = useState<boolean | null>(null);

  const isEditing = !!initial;

  // Debounced name checking function
  const checkNameAvailability = useCallback(async (nameToCheck: string) => {
    if (!nameToCheck.trim()) {
      setNameValid(null);
      setError(null);
      return;
    }

    // Skip check if editing and name hasn't changed
    if (isEditing && initial?.name === nameToCheck) {
      setNameValid(true);
      setError(null);
      return;
    }

    setCheckingName(true);
    try {
      const exists = await checkExists(nameToCheck);
      setNameValid(!exists);
      setError(exists ? 'Tên thương hiệu này đã tồn tại.' : null);
    } catch (err) {
      setNameValid(null);
      setError('Không thể kiểm tra tên thương hiệu.');
    } finally {
      setCheckingName(false);
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
      setError(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name.trim()) {
      setError('Tên thương hiệu là bắt buộc.');
      return;
    }

    // Name validation is already done in real-time, just check if it's valid
    if (nameValid === false) {
      setError('Tên thương hiệu này đã tồn tại.');
      return;
    }

    if (nameValid === null) {
      setError('Đang kiểm tra tên thương hiệu...');
      return;
    }

    onSubmit(name);
  };

  return (
    <div className="relative">
      <h2 className="text-xl font-semibold mb-4 border-b pb-2 text-gray-900 dark:text-white border-gray-200 dark:border-gray-700">
        {isEditing ? "Chỉnh sửa Thương hiệu" : "Thêm Thương hiệu mới"}
      </h2>
      <button 
        type="button" 
        onClick={onCancel} 
        disabled={loading}
        className="absolute top-0 right-0 p-2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
      >
        <FiX size={20} />
      </button>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Tên Thương hiệu
          </label>
          <div className="relative">
            <input
              id="name"
              type="text"
              value={name}
              onChange={handleNameChange}
              disabled={loading}
              className={`mt-1 block w-full px-3 py-2 pr-10 border rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                nameValid === true
                  ? 'border-green-300 dark:border-green-600 focus:ring-green-500 focus:border-green-500'
                  : nameValid === false
                  ? 'border-red-300 dark:border-red-600 focus:ring-red-500 focus:border-red-500'
                  : 'border-gray-300 dark:border-gray-600'
              }`}
              placeholder="Nhập tên thương hiệu"
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
              {checkingName ? (
                <FiLoader size={18} className="animate-spin text-gray-400" />
              ) : nameValid === true ? (
                <FiCheck size={18} className="text-green-500" />
              ) : nameValid === false ? (
                <FiXIcon size={18} className="text-red-500" />
              ) : null}
            </div>
          </div>
        </div>
        
        {error && <p className="text-sm text-red-500 dark:text-red-400 mb-4">{error}</p>}
        
        <div className="flex justify-end space-x-3 mt-6">
          <button 
            type="button" 
            onClick={onCancel} 
            disabled={loading}
            className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
          >
            Hủy
          </button>
          <button 
            type="submit" 
            disabled={loading || checkingName || nameValid === false || nameValid === null}
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