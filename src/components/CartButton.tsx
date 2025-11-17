"use client";

import Link from "next/link";
import { FaShoppingCart } from "react-icons/fa";
import { useCart } from "@/hooks/useCart";

export default function CartButton() {
    const { totalQuantity } = useCart();

    return (
        <Link href="/cart" className="relative">
            <FaShoppingCart size={22} className="text-gray-800 dark:text-gray-200" />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1">
                {totalQuantity}
            </span>
        </Link>
    );
}
