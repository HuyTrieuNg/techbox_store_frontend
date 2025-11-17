import Link from "next/link";
import CategoryButton from "./CategoryButton";
import SearchBox from "./SearchBox";
import ThemeToggle from "./ThemeToggle";
import CartButton from "./CartButton";
import WishlistButton from "./WishlistButton";
import AccountMenu from "./AccountMenu";


export default function Header() {
  return (
    <header className="bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

        {/* Logo + Danh mục */}
        <div className="flex items-center">
          <Link href="/" className="text-2xl font-bold text-[#E61E4D]">
            TechBox
          </Link>

          <CategoryButton />
        </div>

        {/* Search */}
        <SearchBox />

        {/* Buttons */}
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <CartButton />
          <WishlistButton />
          <AccountMenu />
        </div>

      </div>
    </header>
  );
}
