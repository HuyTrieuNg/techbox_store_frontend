import React, { useState } from 'react';
import { Category } from '@/features/category';
import { FiChevronRight, FiChevronDown } from 'react-icons/fi';

interface CategoryTreeProps {
  categories: Category[];
  selectedId: number;
  onSelect: (id: number) => void;
}

const CategoryTree: React.FC<CategoryTreeProps> = ({ categories, selectedId, onSelect }) => {
  const [expanded, setExpanded] = useState<Record<number, boolean>>({});

  const toggleExpand = (id: number) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Function to build path from selected category
  const buildPath = (cats: Category[], targetId: number, currentPath: string[] = []): string[] | null => {
    for (const cat of cats) {
      const newPath = [...currentPath, cat.name];
      if (cat.id === targetId) {
        return newPath;
      }
      if (cat.childCategories && cat.childCategories.length > 0) {
        const childPath = buildPath(cat.childCategories, targetId, newPath);
        if (childPath) return childPath;
      }
    }
    return null;
  };

  const selectedPath = selectedId ? buildPath(categories, selectedId) : null;

  const renderTree = (nodes: Category[], level = 0) => (
    <ul>
      {nodes.map((cat) => {
        const hasChildren = cat.childCategories && Array.isArray(cat.childCategories) && cat.childCategories.length > 0;
        const isExpanded = expanded[cat.id];
        const isSelected = selectedId === cat.id;

        return (
          <li key={cat.id} className="relative">
            <div
              className={`flex items-center p-2 my-1 rounded-lg transition-colors hover:bg-gray-100 cursor-pointer ${
                isSelected ? 'bg-blue-100 border border-blue-300' : ''
              }`}
              style={{ paddingLeft: `${level * 20}px` }}
              onClick={() => onSelect(cat.id)}
            >
              <div className="flex items-center flex-grow">
                {/* Expand/collapse button */}
                {hasChildren ? (
                  <button
                    className={`text-gray-500 hover:text-indigo-600 p-1 rounded-full transition-transform mr-2
                              ${isExpanded ? 'rotate-90' : 'rotate-0'}`}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      toggleExpand(cat.id);
                    }}
                    aria-expanded={isExpanded}
                    type="button"
                  >
                    {isExpanded ? <FiChevronDown size={18} /> : <FiChevronRight size={18} />}
                  </button>
                ) : (
                  <div className="w-8"></div> // Placeholder for alignment
                )}
                {/* Category name */}
                <span className={`flex-grow truncate ${level === 0 ? 'font-bold text-gray-800' : 'text-gray-700'} ${
                  isSelected ? 'text-blue-800 font-semibold' : ''
                }`}>
                  {cat.name}
                </span>
                {isSelected && (
                  <span className="text-blue-600 ml-2">✓</span>
                )}
              </div>
            </div>

            {/* Render children if expanded */}
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
    <div className="border rounded-lg p-4 bg-white">
      <h4 className="text-lg font-semibold mb-2">Chọn Danh Mục</h4>
      {selectedPath && (
        <div className="mb-3 p-2 bg-blue-50 border border-blue-200 rounded text-sm text-blue-800">
          <strong>Đã chọn:</strong> {selectedPath.join(' / ')}
        </div>
      )}
      {categories.length > 0 ? renderTree(categories) : (
        <p className="text-gray-500 italic">Chưa có danh mục nào.</p>
      )}
    </div>
  );
};

export default CategoryTree;