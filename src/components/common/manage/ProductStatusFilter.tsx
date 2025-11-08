/**
 * ProductStatusFilter - Status Filter Component
 * 
 * Component lọc theo trạng thái sản phẩm (tách riêng)
 * Thứ tự: PUBLISHED, DRAFT, DELETED, ALL (null)
 */

'use client';

export type ProductStatus = 'PUBLISHED' | 'DRAFT' | 'DELETED' | null;

interface ProductStatusFilterProps {
  value: ProductStatus;
  onChange: (status: ProductStatus) => void;
}

export default function ProductStatusFilter({ value, onChange }: ProductStatusFilterProps) {
  const statusOptions = [
    { 
      value: 'PUBLISHED' as const, 
      label: 'Đã xuất bản', 
      color: 'bg-green-100 text-green-800 border-green-300',
      activeColor: 'bg-green-600 text-white border-green-600'
    },
    { 
      value: 'DRAFT' as const, 
      label: 'Bản nháp', 
      color: 'bg-yellow-100 text-yellow-800 border-yellow-300',
      activeColor: 'bg-yellow-600 text-white border-yellow-600'
    },
    { 
      value: 'DELETED' as const, 
      label: 'Đã xóa', 
      color: 'bg-red-100 text-red-800 border-red-300',
      activeColor: 'bg-red-600 text-white border-red-600'
    },
    { 
      value: null, 
      label: 'Tất cả', 
      color: 'bg-gray-100 text-gray-800 border-gray-300',
      activeColor: 'bg-gray-600 text-white border-gray-600'
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
        <span className="text-sm font-medium text-gray-700 whitespace-nowrap">
          Trạng thái:
        </span>
        
        <div className="flex flex-wrap gap-2">
          {statusOptions.map((option) => {
            const isActive = value === option.value;
            
            return (
              <button
                key={option.label}
                onClick={() => onChange(option.value)}
                className={`px-4 py-2 text-sm font-medium rounded-lg border-2 transition-all ${
                  isActive 
                    ? option.activeColor + ' shadow-md transform scale-105' 
                    : option.color + ' hover:shadow-sm hover:scale-102'
                }`}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
