import { useCategories } from '@/hooks/useCategory';
import Link from 'next/link';
import React from 'react';
import { FaChevronRight } from 'react-icons/fa';

interface CategoryMenuProps {
    type?: 'menu' | 'grid';
}

const CategoryMenu: React.FC<CategoryMenuProps> = ({ type = 'menu' }) => {
    const { categories, error } = useCategories();
    console.log("Categories data:", categories);

    if (error) return <div>Error: {error.message}</div>;

    // Menu cấp 2
    const renderMegaMenu = (category: any) => {
        return (
            <div className="absolute left-full top-0 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md hidden group-hover:flex w-60 gap-8 transition-all duration-200 ease-in-out z-50">
                <div className="flex-1">
                    <ul className="flex flex-col divide-y divide-gray-100 dark:divide-gray-700">
                        {category?.childCategories?.map((brand: any) => (

                            <li key={brand.id} className="group/brand relative">
                                <Link href={`/products/${brand.id}`} key={brand.id}>
                                    <div
                                        className="w-full text-left px-6 py-3 text-gray-800 dark:text-gray-200 
                                               transition-all duration-200 flex items-center justify-between 
                                               cursor-pointer rounded-md 
                                               group-hover/brand:text-[#E61E4D]"
                                    >
                                        {brand.name}
                                        {brand.childCategories && brand.childCategories.length > 0 && (
                                            <FaChevronRight
                                                size={12}
                                                className="text-gray-500 dark:text-gray-400 group-hover/brand:text-[#E61E4D] transition-colors"
                                            />
                                        )}
                                    </div>
                                </Link>

                                {/* Menu cấp 3 */}
                                {brand.childCategories && brand.childCategories.length > 0 && (
                                    <div
                                        className="absolute left-full top-0 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 
                                                   rounded-md w-60 hidden group-hover/brand:block 
                                                   z-50 transition-all duration-200 ease-in-out"
                                    >
                                        <ul className="flex flex-col divide-y divide-gray-100 dark:divide-gray-700">
                                            {brand.childCategories.map((series: any) => (

                                                <li
                                                    key={series.id}
                                                // className="text-gray-600 hover:text-[#E61E4D] px-6 py-3 cursor-pointer transition-colors duration-150"
                                                >
                                                    <Link href={`/products/${series.id}`} key={series.id}>
                                                        <div className="w-full text-left px-6 py-3 text-gray-800 dark:text-gray-200 transition-all duration-200 flex items-center justify-between cursor-pointer rounded-md hover:text-[#E61E4D]"
                                                        >
                                                            {series.name}
                                                        </div>
                                                    </Link>
                                                </li>

                                            ))}
                                        </ul>
                                    </div>
                                )}

                            </li>

                        ))}
                    </ul>
                </div>
            </div>
        );
    };

    // Menu cấp 1
    const renderMenu = () => (
        <div
            className={`${type === 'grid' ? '' : 'absolute'} 
                        top-14 left-0 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md w-60
                        z-20 transition-all duration-200 ease-in-out`}
        >
            <ul className="flex flex-col divide-y divide-gray-100 dark:divide-gray-700">
                {categories?.map((category) => (

                    <li key={category.id} className="group relative">
                        <Link href={`/products/${category.id}`} key={category.id}>
                            {/* Khi hover vào cả cha hoặc con, màu vẫn giữ */}
                            <div
                                className="w-full text-left px-6 py-3 text-gray-800 dark:text-gray-200 
                                       transition-all duration-200 flex items-center justify-between 
                                       cursor-pointer rounded-md 
                                       group-hover:bg-[#E61E4D]/90 group-hover:text-white"
                            >
                                {category.name}
                                {category.childCategories && category.childCategories.length > 0 && (
                                    <FaChevronRight
                                        size={12}
                                        className="text-gray-500 dark:text-gray-400 group-hover:text-white transition-colors"
                                    />
                                )}
                            </div>
                        </Link>
                        {renderMegaMenu(category)}
                    </li>

                ))}
            </ul>
        </div>
    );

    return type === 'menu' || type === 'grid' ? renderMenu() : null;
};

export default CategoryMenu;