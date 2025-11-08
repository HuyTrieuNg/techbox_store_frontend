import React, { useState } from 'react';
import { Category } from '@/services/categoryService';
import { 
  FiChevronRight, 
  FiChevronDown, 
  FiEdit, 
  FiTrash2,
  FiLayers // Icon chung cho Danh mục (hoặc FiTag, FiList)
} from 'react-icons/fi';

// Định nghĩa props như cũ
interface CategoryListProps {
  categories: Category[];
  onEdit: (cat: Category) => void;
  onDelete: (cat: Category) => void;
}

const CategoryList: React.FC<CategoryListProps> = ({ categories, onEdit, onDelete }) => {
  const [expanded, setExpanded] = useState<Record<number, boolean>>({});

  const toggleExpand = (id: number) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Hàm đệ quy hiển thị cây danh mục
  const renderTree = (nodes: Category[], level = 0) => (
    // Dùng padding-left để tạo khoảng thụt lề cho cấp độ
    <ul className={`ml-${level === 0 ? 0 : level * 4}`}> 
      {nodes.map((cat) => {
        const hasChildren = cat.childCategories && Array.isArray(cat.childCategories) && cat.childCategories.length > 0;
        const isExpanded = expanded[cat.id];
        
        return (
          <li key={cat.id} className="relative">
            <div 
              className={`flex items-center justify-between p-2 my-1 rounded-lg transition-colors 
                          ${level === 0 ? 'bg-gray-50 border border-gray-200' : 'hover:bg-gray-100'} 
                          ${isExpanded ? 'bg-indigo-50 border-l-4 border-indigo-500' : ''}`}
              style={{ paddingLeft: `${level * 16}px` }} // Thêm khoảng cách thụt lề
            >
              <div className="flex items-center flex-grow">
                {/* 1. Nút mở rộng/thu gọn */}
                {hasChildren ? (
                  <button
                    className={`text-gray-500 hover:text-indigo-600 p-1 rounded-full transition-transform 
                              ${isExpanded ? 'rotate-90' : 'rotate-0'}`}
                    onClick={() => toggleExpand(cat.id)}
                    aria-expanded={isExpanded}
                  >
                    {isExpanded ? <FiChevronDown size={18} /> : <FiChevronRight size={18} />}
                  </button>
                ) : (
                  // Dấu giữ chỗ (placeholder) hoặc icon Danh mục ở cấp thấp nhất
                  <FiLayers size={18} className="text-gray-400 mr-2 ml-1" />
                )}
                
                {/* 2. Tên Danh mục */}
                <span className={`flex-grow truncate ${level === 0 ? 'font-bold text-gray-800' : 'text-gray-700'}`}>
                  {cat.name}
                </span>
              </div>
              
              {/* 3. Nút Hành động */}
              <div className="flex space-x-2 ml-4">
                <button 
                  title="Chỉnh sửa danh mục"
                  className="p-1 text-blue-500 hover:bg-blue-100 rounded transition-colors" 
                  onClick={() => onEdit(cat)}
                >
                  <FiEdit size={18} />
                </button>
                <button 
                  title="Xóa danh mục"
                  className="p-1 text-red-500 hover:bg-red-100 rounded transition-colors" 
                  onClick={() => onDelete(cat)}
                >
                  <FiTrash2 size={18} />
                </button>
              </div>
            </div>
            
            {/* Hiển thị danh mục con nếu được mở rộng */}
            {isExpanded && hasChildren && Array.isArray(cat.childCategories) && (
              <div className="mt-1">
                {renderTree(cat.childCategories, level + 1)}
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );

  return (
    <div className="p-4 bg-white rounded-xl shadow-lg">
      <h3 className="text-xl font-semibold mb-4 text-gray-700 border-b pb-2">Cấu Trúc Danh Mục</h3>
      {categories.length > 0 ? renderTree(categories) : (
        <p className="text-gray-500 italic">Chưa có danh mục nào được tạo.</p>
      )}
    </div>
  );
};

export default CategoryList;
