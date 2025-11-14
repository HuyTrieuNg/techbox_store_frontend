import { ReactNode } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
// import { CartProvider } from "@/contexts/CartContext";

/**
 * Shop Layout - Server Component
 * 
 * Layout cho tất cả trang shop (customer-facing)
 * - CartProvider: Quản lý giỏ hàng (chỉ cho shop, không cho admin/staff)
 * - Header: Navigation, search, cart
 * - Main: Page content
 * - Footer: Links, info
 */
export default function ShopLayout({ children }: { children: ReactNode }) {
  return (
    <>
      {/* Header - Navigation bar */}
      <Header />
      
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-6">
        {children}
      </main>
      
      {/* Footer */}
      <Footer />
    </>
  );
}
