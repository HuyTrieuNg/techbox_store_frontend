'use client';

import Link from "next/link";
import { useState } from "react";
import CategoryButton from "./CategoryButton";
import SearchBox from "./SearchBox";
import ThemeToggle from "./ThemeToggle";
import CartButton from "./CartButton";
import WishlistButton from "./WishlistButton";
import AccountMenu from "./AccountMenu";
import { SearchTextModal } from "./search/SearchTextModal";
import { SearchImageModal } from "./search/SearchImageModal";
import { Button } from "./UI/button";


export default function Header() {
  const [isTextSearchOpen, setIsTextSearchOpen] = useState(false);
  const [isImageSearchOpen, setIsImageSearchOpen] = useState(false);

  return (
    <header className="bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

        {/* Logo + Danh mục */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center gap-3">
            <img src="/techbox.png" alt="Techbox" className="h-12 w-auto" />
          </Link>

          <CategoryButton />
        </div>

        {/* Search */}
        <SearchBox />

        {/* Buttons */}
        <div className="flex items-center gap-4">
          {/* AI Search Buttons */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsTextSearchOpen(true)}
            title="Tìm kiếm bằng văn bản AI"
            className="hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <img src="/search_text.png" alt="Text Search" className="h-6 w-6" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsImageSearchOpen(true)}
            title="Tìm kiếm bằng hình ảnh AI"
            className="hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <img src="/search_img.png" alt="Image Search" className="h-6 w-6" />
          </Button>

          <ThemeToggle />
          <CartButton />
          <WishlistButton />
          <AccountMenu />
        </div>

      </div>

      {/* Modals */}
      <SearchTextModal isOpen={isTextSearchOpen} onClose={() => setIsTextSearchOpen(false)} />
      <SearchImageModal isOpen={isImageSearchOpen} onClose={() => setIsImageSearchOpen(false)} />
    </header>
  );
}
