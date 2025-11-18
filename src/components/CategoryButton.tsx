"use client";

import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
// import CategoryMenuServer from "./CategoryServer";
import CategoryMenu from "./Category";


export default function CategoryButton() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative ml-8">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-3  text-gray-800 dark:text-gray-200 hover:text-[#E61E4D] font-semibold text-lg transition-colors duration-200 cursor-pointer"
      >
        Danh mục
        <FaChevronDown
          size={14}
          className={`${open ? "rotate-180" : ""} transition`}
        />
      </button>

      {open && <CategoryMenu type="menu" />}
    </div>
  );
}
