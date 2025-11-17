"use client";

import Link from "next/link";
import { FaHeart } from "react-icons/fa";

export default function WishlistButton() {
    return (
        <Link href="/wishlist" className="relative">
            <FaHeart size={22} className="text-gray-800 dark:text-gray-200" />

        </Link>
    );
}
