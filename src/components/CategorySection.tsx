import React from "react";
import Link from "next/link";
import { useCategories } from '@/hooks/useCategory';

const CategorySection = () => {
    const { categories, error } = useCategories();
    // const categories = [
    //     { name: "Laptop", image: "https://file.hstatic.net/200000636033/file/icon1_ce115f32db874a8e9b5af39517176e96.png" },
    //     { name: "PC", image: "https://file.hstatic.net/200000636033/file/icon1_ce115f32db874a8e9b5af39517176e96.png" },
    //     { name: "Màn hình", image: "https://file.hstatic.net/200000636033/file/icon1_ce115f32db874a8e9b5af39517176e96.png" },
    //     { name: "Mainboard", image: "https://file.hstatic.net/200000636033/file/icon1_ce115f32db874a8e9b5af39517176e96.png" },
    //     { name: "CPU", image: "https://file.hstatic.net/200000636033/file/icon1_ce115f32db874a8e9b5af39517176e96.png" },
    //     { name: "VGA", image: "https://file.hstatic.net/200000636033/file/icon1_ce115f32db874a8e9b5af39517176e96.png" },
    //     { name: "RAM", image: "https://file.hstatic.net/200000636033/file/icon1_ce115f32db874a8e9b5af39517176e96.png" },
    //     { name: "Ổ cứng", image: "https://file.hstatic.net/200000636033/file/icon1_ce115f32db874a8e9b5af39517176e96.png" },
    //     { name: "Case", image: "https://file.hstatic.net/200000636033/file/icon1_ce115f32db874a8e9b5af39517176e96.png" },
    //     { name: "Tản nhiệt", image: "https://file.hstatic.net/200000636033/file/icon1_ce115f32db874a8e9b5af39517176e96.png" },
    //     { name: "Nguồn", image: "https://file.hstatic.net/200000636033/file/icon1_ce115f32db874a8e9b5af39517176e96.png" },
    //     { name: "Bàn phím", image: "https://file.hstatic.net/200000636033/file/icon1_ce115f32db874a8e9b5af39517176e96.png" },
    //     { name: "Chuột", image: "https://file.hstatic.net/200000636033/file/icon1_ce115f32db874a8e9b5af39517176e96.png" },
    //     { name: "Ghế", image: "https://file.hstatic.net/200000636033/file/icon1_ce115f32db874a8e9b5af39517176e96.png" },
    //     { name: "Tai nghe", image: "https://file.hstatic.net/200000636033/file/icon1_ce115f32db874a8e9b5af39517176e96.png" },
    //     { name: "Loa", image: "https://file.hstatic.net/200000636033/file/icon1_ce115f32db874a8e9b5af39517176e96.png" },
    //     { name: "Console", image: "https://file.hstatic.net/200000636033/file/icon1_ce115f32db874a8e9b5af39517176e96.png" },
    //     { name: "Phụ kiện", image: "https://file.hstatic.net/200000636033/file/icon1_ce115f32db874a8e9b5af39517176e96.png" },
    // ];

    if (error) return <div>Error: {error.message}</div>;

    return (
        <section className="bg-gray-100  rounded-sm">
            <h2 className="text-2xl font-semibold py-4 px-4 border-b border-gray-300">
                Danh mục sản phẩm
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-10 gap-4 py-4 px-4">
                {categories?.map((category, index) => (
                    <Link href={`/category/${category.name.toLowerCase().replace(/ /g, "-")}`} key={index} className="flex flex-col items-center text-center text-gray-800 hover:text-gray-600 transition">
                        <img
                            // src={category.image}
                            src="https://file.hstatic.net/200000636033/file/icon1_ce115f32db874a8e9b5af39517176e96.png"
                            alt={category.name}
                            className="w-18 h-18 object-contain mb-2"
                        />
                        <span className="text-sm">{category.name}</span>
                    </Link>
                ))}
            </div>
        </section>
    );
};

export default CategorySection;